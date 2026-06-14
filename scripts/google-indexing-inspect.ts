// scripts/google-indexing-inspect.ts
// ============================================================
// GOOGLE URL INSPECTION API SCRIPT (CLI)
// ============================================================
// Queries submitted URLs and checks their indexing verdict,
// coverage state, last crawl date, and robots/fetch status.
// ============================================================

import dotenv from "dotenv";
import path from "path";

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

import { getGoogleAccessToken } from "../lib/google-auth";
import { createAdminClient } from "../lib/supabase";

const SEARCH_CONSOLE_SCOPE = ["https://www.googleapis.com/auth/webmasters.readonly"];
const INSPECTION_ENDPOINT = "https://searchconsole.googleapis.com/v1/urlInspection/index:inspect";
const BATCH_LIMIT = 100; // Inspect up to 100 URLs in a single run (Daily limit is 2,000)

async function main() {
  console.log("=== URL INSPECTION API STARTED ===");

  const dryRun = process.argv.includes("--dry-run");
  if (dryRun) {
    console.log("[DRY-RUN MODE] No API requests or database updates will be committed.");
  }

  // 1. Initialize Supabase
  let supabase;
  try {
    supabase = createAdminClient();
  } catch (err) {
    console.error("FATAL: Failed to initialize Supabase client.");
    console.error(err);
    process.exit(1);
  }

  // 2. Fetch GSC Property URL (trailing slash trap check)
  const siteUrl = process.env.GOOGLE_PROPERTY_URL;
  if (!siteUrl) {
    console.error("FATAL: GOOGLE_PROPERTY_URL environment variable is not configured in .env.local.");
    process.exit(1);
  }
  console.log(`Using GSC Site Property URL: "${siteUrl}"`);

  // 3. Fetch URLs that need inspection (pending, submitted, not_indexed, error)
  const { data: urlsToInspect, error: queryError } = await supabase
    .from("google_indexing_status")
    .select("*")
    .in("status", ["pending", "submitted", "not_indexed", "error"])
    .order("last_inspected_at", { ascending: true, nullsFirst: true })
    .limit(BATCH_LIMIT);

  if (queryError) {
    console.error("FATAL: Failed to fetch URLs from database:", queryError.message);
    process.exit(1);
  }

  if (!urlsToInspect || urlsToInspect.length === 0) {
    console.log("No URLs found needing inspection.");
    console.log("========================================");
    return;
  }

  console.log(`Found ${urlsToInspect.length} URLs to inspect.`);

  // 4. Authenticate with Google
  let token = "";
  if (!dryRun) {
    try {
      console.log("Authenticating with Google API Service Account...");
      token = await getGoogleAccessToken(SEARCH_CONSOLE_SCOPE);
      console.log("Authentication successful.");
    } catch (err) {
      console.error("FATAL: Google Service Account authentication failed.");
      console.error(err);
      process.exit(1);
    }
  }

  // 5. Inspect each URL
  let indexedCount = 0;
  let notIndexedCount = 0;
  let errorCount = 0;

  for (const item of urlsToInspect) {
    console.log(`Inspecting URL: ${item.url}`);

    if (dryRun) {
      continue;
    }

    try {
      const response = await fetch(INSPECTION_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          inspectionUrl: item.url.startsWith('http') ? item.url : new URL(item.url, siteUrl).toString(),
          siteUrl: siteUrl
        })
      });

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(`Status ${response.status}: ${errText}`);
      }

      const resData = await response.json();
      const inspectResult = resData.inspectionResult;
      
      if (!inspectResult || !inspectResult.indexStatusResult) {
        throw new Error(`Inspection outcome structure is invalid: ${JSON.stringify(resData)}`);
      }

      const statusResult = inspectResult.indexStatusResult;
      const verdict = statusResult.verdict; // PASS, NEUTRAL, FAIL
      const coverageState = statusResult.coverageState || "Unknown coverage";
      const lastCrawlTime = statusResult.lastCrawlTime || null;
      const robotsTxtStatus = statusResult.robotsTxtState || "Unknown robots.txt";
      const pageFetchStatus = statusResult.pageFetchState || "Unknown fetch";

      console.log(`[OUTCOME] Verdict: ${verdict} | Coverage: ${coverageState}`);

      // Map GSC verdict to status
      let newStatus = item.status;
      if (verdict === "PASS") {
        newStatus = "indexed";
        indexedCount++;
      } else if (verdict === "FAIL") {
        newStatus = "not_indexed";
        notIndexedCount++;
      } else {
        // NEUTRAL might index later, keep as submitted or mark as not_indexed
        newStatus = "not_indexed";
        notIndexedCount++;
      }

      // Update database
      const { error: updateError } = await supabase
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

    } catch (err) {
      const errMsg = err instanceof Error ? err.message : String(err);
      console.error(`[ERROR] Inspection failed for ${item.url}:`, errMsg);

      // Keep status as 'submitted' but record error
      const { error: updateError } = await supabase
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
    }

    // Delay slightly to prevent rate limits / hitting endpoint too fast
    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  console.log("=== INSPECTION SUMMARY ===");
  console.log(`- Marked Indexed (PASS): ${indexedCount}`);
  console.log(`- Marked Not Indexed (FAIL/NEUTRAL): ${notIndexedCount}`);
  console.log(`- Errors: ${errorCount}`);
  console.log("==========================");
}

main().catch((err) => {
  console.error("Unhandled CLI execution error:", err);
  process.exit(1);
});
