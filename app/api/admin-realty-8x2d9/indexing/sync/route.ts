// app/api/admin-realty-8x2d9/indexing/sync/route.ts
// ============================================================
// INDEXING CONSOLE - SYNC SITEMAP ENDPOINT
// ============================================================
// Triggers sitemap compilation and imports new URLs into the
// google_indexing_status table.
// ============================================================

import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase";
import { createServerDbClient } from "@/lib/supabase-server";;
import { generateSitemapUrls } from "@/lib/sitemap-generator";

export async function POST(request: NextRequest) {
  // 1. Verify Authentication
  const supabase = await createServerDbClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const adminDb = createAdminClient();

  try {
    console.log("Generating sitemap programmatically...");
    const sitemapUrls = await generateSitemapUrls();
    console.log(`Generated ${sitemapUrls.length} sitemap URLs.`);

    let newCount = 0;
    let existCount = 0;
    let errorCount = 0;

    for (const url of sitemapUrls) {
      if (!url) continue;

      try {
        // Check if URL already exists
        const { data, error: selectError } = await adminDb
          .from("google_indexing_status")
          .select("url")
          .eq("url", url)
          .maybeSingle();

        if (selectError) {
          console.error(`Select error for ${url}:`, selectError.message);
          errorCount++;
          continue;
        }

        if (!data) {
          // Insert new URL as pending
          const { error: insertError } = await adminDb
            .from("google_indexing_status")
            .insert({
              url: url,
              status: "pending",
              submit_count: 0
            });

          if (insertError) {
            console.error(`Insert error for ${url}:`, insertError.message);
            errorCount++;
          } else {
            newCount++;
          }
        } else {
          existCount++;
        }
      } catch (err) {
        console.error(`Unexpected sync error for ${url}:`, err);
        errorCount++;
      }
    }

    return NextResponse.json({
      success: true,
      message: `Sitemap sync completed successfully.`,
      newUrls: newCount,
      existingUrls: existCount,
      errors: errorCount
    });

  } catch (err) {
    console.error("API Error in POST /api/admin-realty-8x2d9/indexing/sync:", err);
    return NextResponse.json(
      { error: "Failed to compile sitemap or sync with database." },
      { status: 500 }
    );
  }
}
