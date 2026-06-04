// scripts/google-indexing-submit.ts
// ============================================================
// GOOGLE INDEXING API SUBMISSION SCRIPT (CLI)
// ============================================================
// Queries up to 200 pending URLs and submits them to the
// Google Indexing API to request immediate indexing/crawling.
// ============================================================

import dotenv from "dotenv";
import path from "path";

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

import { getGoogleAccessToken } from "../lib/google-auth";
import { createAdminClient } from "../lib/supabase";

const INDEXING_SCOPE = ["https://www.googleapis.com/auth/indexing"];
const GOOGLE_INDEXING_ENDPOINT = "https://indexing.googleapis.com/v3/urlNotifications:publish";
const BATCH_LIMIT = 200; // Daily Google quota limit

async function main() {
  console.log("=== GOOGLE INDEXING SUBMISSION STARTED ===");

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

  // 2. Fetch pending URLs (prioritize pending over error, sort by oldest/least submitted)
  const { data: urlsToSubmit, error: queryError } = await supabase
    .from("google_indexing_status")
    .select("*")
    .in("status", ["pending", "error"])
    .order("submit_count", { ascending: true })
    .order("updated_at", { ascending: true })
    .limit(BATCH_LIMIT);

  if (queryError) {
    console.error("FATAL: Failed to fetch URLs from database:", queryError.message);
    process.exit(1);
  }

  if (!urlsToSubmit || urlsToSubmit.length === 0) {
    console.log("No pending or error status URLs found in database. Nothing to submit.");
    console.log("========================================");
    return;
  }

  console.log(`Found ${urlsToSubmit.length} URLs to submit (Limit: ${BATCH_LIMIT} per day).`);

  // 3. Authenticate with Google
  let token = "";
  if (!dryRun) {
    try {
      console.log("Authenticating with Google API Service Account...");
      token = await getGoogleAccessToken(INDEXING_SCOPE);
      console.log("Authentication successful.");
    } catch (err) {
      console.error("FATAL: Google Service Account authentication failed.");
      console.error(err);
      process.exit(1);
    }
  }

  // 4. Submit each URL
  let successCount = 0;
  let failCount = 0;

  for (const item of urlsToSubmit) {
    console.log(`Submitting: ${item.url} (Current submit count: ${item.submit_count})`);

    if (dryRun) {
      successCount++;
      continue;
    }

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
        throw new Error(`Status ${response.status}: ${errText}`);
      }

      const resData = await response.json();
      console.log(`[SUCCESS] Indexed queued: ${item.url}`);
      
      // Update DB to status 'submitted'
      const { error: updateError } = await supabase
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
    } catch (err) {
      const errMsg = err instanceof Error ? err.message : String(err);
      console.error(`[FAILED] Submission failed for ${item.url}:`, errMsg);

      // Update DB to status 'error'
      const { error: updateError } = await supabase
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
    }
  }

  console.log("=== SUBMISSION SUMMARY ===");
  console.log(`- Submissions Succeeded: ${successCount}`);
  console.log(`- Submissions Failed: ${failCount}`);
  console.log("==========================");
}

main().catch((err) => {
  console.error("Unhandled CLI execution error:", err);
  process.exit(1);
});
