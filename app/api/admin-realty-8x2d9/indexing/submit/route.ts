// app/api/admin-realty-8x2d9/indexing/submit/route.ts
// ============================================================
// INDEXING CONSOLE - BATCH SUBMIT ENDPOINT
// ============================================================
// Submits a batch of pending/error URLs to the Google Indexing
// API and updates database records.
// ============================================================

import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase";
import { createServerDbClient } from "@/lib/supabase-server";;
import { getGoogleAccessToken } from "@/lib/google-auth";

const INDEXING_SCOPE = ["https://www.googleapis.com/auth/indexing"];
const GOOGLE_INDEXING_ENDPOINT = "https://indexing.googleapis.com/v3/urlNotifications:publish";
const API_BATCH_LIMIT = 30; // Safer batch limit for web UI to prevent gateway timeout

export async function POST(request: NextRequest) {
  // 1. Verify Authentication
  const supabase = await createServerDbClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const adminDb = createAdminClient();

  // 2. Fetch pending or errored URLs
  const { data: urlsToSubmit, error: queryError } = await adminDb
    .from("google_indexing_status")
    .select("*")
    .in("status", ["pending", "error"])
    .order("submit_count", { ascending: true })
    .order("updated_at", { ascending: true })
    .limit(API_BATCH_LIMIT);

  if (queryError) {
    return NextResponse.json({ error: queryError.message }, { status: 500 });
  }

  if (!urlsToSubmit || urlsToSubmit.length === 0) {
    return NextResponse.json({
      success: true,
      message: "No pending or error URLs found to submit.",
      submitted: 0
    });
  }

  // 3. Authenticate with Google
  let token = "";
  try {
    token = await getGoogleAccessToken(INDEXING_SCOPE);
  } catch (err) {
    console.error("Google Authentication error:", err);
    return NextResponse.json(
      { error: `Google Auth Error: ${err instanceof Error ? err.message : String(err)}` },
      { status: 500 }
    );
  }

  // 4. Process submissions
  let successCount = 0;
  let failCount = 0;
  const results = [];

  for (const item of urlsToSubmit) {
    try {
      const response = await fetch(GOOGLE_INDEXING_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          url: item.url,
          type: "URL_UPDATED"
        })
      });

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(`Google API ${response.status}: ${errText}`);
      }

      // Update DB to status 'submitted'
      const { error: updateError } = await adminDb
        .from("google_indexing_status")
        .update({
          status: "submitted",
          last_submitted_at: new Date().toISOString(),
          submit_count: (item.submit_count || 0) + 1,
          error_message: null
        })
        .eq("id", item.id);

      if (updateError) {
        console.error(`DB Update Error for ${item.url}:`, updateError.message);
      }

      successCount++;
      results.push({ url: item.url, success: true });
    } catch (err) {
      const errMsg = err instanceof Error ? err.message : String(err);
      console.error(`Submission failed for ${item.url}:`, errMsg);

      // Update DB to status 'error'
      const { error: updateError } = await adminDb
        .from("google_indexing_status")
        .update({
          status: "error",
          error_message: errMsg
        })
        .eq("id", item.id);

      if (updateError) {
        console.error(`DB Update Error for ${item.url}:`, updateError.message);
      }

      failCount++;
      results.push({ url: item.url, success: false, error: errMsg });
    }
  }

  return NextResponse.json({
    success: true,
    message: `Batch submission completed.`,
    submitted: urlsToSubmit.length,
    successes: successCount,
    failures: failCount,
    results
  });
}
