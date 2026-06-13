// app/api/admin-realty-8x2d9/indexing/inspect/route.ts
// ============================================================
// INDEXING CONSOLE - BATCH INSPECT ENDPOINT
// ============================================================
// Checks the live indexing status of a batch of submitted URLs
// using the Google URL Inspection API.
// ============================================================

import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase";
import { createServerDbClient } from "@/lib/supabase-server";;
import { getGoogleAccessToken } from "@/lib/google-auth";

const SEARCH_CONSOLE_SCOPE = ["https://www.googleapis.com/auth/webmasters.readonly"];
const INSPECTION_ENDPOINT = "https://searchconsole.googleapis.com/v1/urlInspection/index:inspect";
const API_BATCH_LIMIT = 15; // Lower limit to prevent serverless function timeout

export async function POST(request: NextRequest) {
  // 1. Verify Authentication
  const supabase = await createServerDbClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const siteUrl = process.env.GOOGLE_PROPERTY_URL;
  if (!siteUrl) {
    return NextResponse.json(
      { error: "GOOGLE_PROPERTY_URL environment variable is not configured." },
      { status: 500 }
    );
  }

  const adminDb = createAdminClient();

  // 2. Fetch URLs to inspect (pending, submitted, not_indexed, error)
  const { data: urlsToInspect, error: queryError } = await adminDb
    .from("google_indexing_status")
    .select("*")
    .in("status", ["pending", "submitted", "not_indexed", "error"])
    .order("last_inspected_at", { ascending: true, nullsFirst: true })
    .limit(API_BATCH_LIMIT);

  if (queryError) {
    return NextResponse.json({ error: queryError.message }, { status: 500 });
  }

  if (!urlsToInspect || urlsToInspect.length === 0) {
    return NextResponse.json({
      success: true,
      message: "No submitted URLs found needing inspection.",
      inspected: 0
    });
  }

  // 3. Authenticate with Google
  let token = "";
  try {
    token = await getGoogleAccessToken(SEARCH_CONSOLE_SCOPE);
  } catch (err) {
    console.error("Google Authentication error:", err);
    return NextResponse.json(
      { error: `Google Auth Error: ${err instanceof Error ? err.message : String(err)}` },
      { status: 500 }
    );
  }

  // 4. Process live inspections
  let indexedCount = 0;
  let notIndexedCount = 0;
  let errorCount = 0;
  const results = [];

  for (const item of urlsToInspect) {
    try {
      const response = await fetch(INSPECTION_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          inspectionUrl: item.url,
          siteUrl: siteUrl
        })
      });

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(`Google API ${response.status}: ${errText}`);
      }

      const resData = await response.json();
      const inspectResult = resData.inspectionResult;
      
      if (!inspectResult || !inspectResult.indexStatusResult) {
        throw new Error(`Invalid outcome structure: ${JSON.stringify(resData)}`);
      }

      const statusResult = inspectResult.indexStatusResult;
      const verdict = statusResult.verdict; // PASS, NEUTRAL, FAIL
      const coverageState = statusResult.coverageState || "Unknown coverage";
      const lastCrawlTime = statusResult.lastCrawlTime || null;
      const robotsTxtStatus = statusResult.robotsTxtState || "Unknown robots.txt";
      const pageFetchStatus = statusResult.pageFetchState || "Unknown fetch";

      let newStatus = item.status;
      if (verdict === "PASS") {
        newStatus = "indexed";
        indexedCount++;
      } else {
        newStatus = "not_indexed";
        notIndexedCount++;
      }

      // Update database
      const { error: updateError } = await adminDb
        .from("google_indexing_status")
        .update({
          status: newStatus,
          last_inspected_at: new Date().toISOString(),
          inspection_verdict: verdict,
          inspection_coverage_state: coverageState,
          last_crawl_time: lastCrawlTime,
          robots_txt_status: robotsTxtStatus,
          page_fetch_status: pageFetchStatus,
          error_message: null
        })
        .eq("id", item.id);

      if (updateError) {
        console.error(`DB Update Error for ${item.url}:`, updateError.message);
      }

      results.push({ url: item.url, success: true, verdict, coverageState });
    } catch (err) {
      const errMsg = err instanceof Error ? err.message : String(err);
      console.error(`Inspection failed for ${item.url}:`, errMsg);

      // Keep status as 'submitted' but save error details
      const { error: updateError } = await adminDb
        .from("google_indexing_status")
        .update({
          last_inspected_at: new Date().toISOString(),
          error_message: `Inspection Error: ${errMsg}`
        })
        .eq("id", item.id);

      if (updateError) {
        console.error(`DB Update Error for ${item.url}:`, updateError.message);
      }

      errorCount++;
      results.push({ url: item.url, success: false, error: errMsg });
    }

    // Small delay to prevent rate issues
    await new Promise((resolve) => setTimeout(resolve, 300));
  }

  return NextResponse.json({
    success: true,
    message: `Batch inspection completed.`,
    inspected: urlsToInspect.length,
    indexed: indexedCount,
    notIndexed: notIndexedCount,
    failures: errorCount,
    results
  });
}
