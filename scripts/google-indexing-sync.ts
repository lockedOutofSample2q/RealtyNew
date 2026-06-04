// scripts/google-indexing-sync.ts
// ============================================================
// SITEMAP URL SYNC SCRIPT (CLI)
// ============================================================
// Parses URLs from the platform's dynamic Next.js sitemap and
// syncs them into the google_indexing_status Supabase table.
// ============================================================

import dotenv from "dotenv";
import path from "path";

// Load local environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

import { generateSitemapUrls } from "../lib/sitemap-generator";
import { createAdminClient } from "../lib/supabase";

async function main() {
  console.log("=== SITEMAP URL SYNC STARTED ===");
  
  // 1. Instantiate DB client
  let supabase;
  try {
    supabase = createAdminClient();
  } catch (err) {
    console.error("FATAL: Failed to initialize Supabase client. Make sure .env.local has SUPABASE_SERVICE_ROLE_KEY.");
    console.error(err);
    process.exit(1);
  }

  // 2. Fetch sitemap URLs programmatically
  console.log("Generating sitemap routes...");
  let sitemapUrls;
  try {
    sitemapUrls = await generateSitemapUrls();
  } catch (err) {
    console.error("FATAL: Failed to execute sitemap generator.");
    console.error(err);
    process.exit(1);
  }

  console.log(`Successfully generated sitemap with ${sitemapUrls.length} URLs.`);

  // 3. Sync URLs into database one by one or in small batches
  let newCount = 0;
  let existCount = 0;
  let errorCount = 0;

  for (const url of sitemapUrls) {
    if (!url) continue;

    try {
      // Check if URL is already tracked
      const { data, error: selectError } = await supabase
        .from("google_indexing_status")
        .select("url, status")
        .eq("url", url)
        .maybeSingle();

      if (selectError) {
        console.error(`Error querying database for ${url}:`, selectError.message);
        errorCount++;
        continue;
      }

      if (!data) {
        // Insert new URL with status 'pending'
        const { error: insertError } = await supabase
          .from("google_indexing_status")
          .insert({
            url: url,
            status: "pending",
            submit_count: 0
          });

        if (insertError) {
          console.error(`Error inserting new URL ${url}:`, insertError.message);
          errorCount++;
        } else {
          console.log(`[NEW] Added URL to index list: ${url}`);
          newCount++;
        }
      } else {
        existCount++;
      }
    } catch (err) {
      console.error(`Unexpected error processing ${url}:`, err);
      errorCount++;
    }
  }

  console.log("=== SITEMAP URL SYNC SUMMARY ===");
  console.log(`- New URLs added: ${newCount}`);
  console.log(`- Existing URLs verified: ${existCount}`);
  console.log(`- Failures: ${errorCount}`);
  console.log("=================================");
}

main().catch((err) => {
  console.error("Unhandled CLI execution error:", err);
  process.exit(1);
});
