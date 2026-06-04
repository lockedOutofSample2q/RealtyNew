// app/api/admin-realty-8x2d9/indexing/analytics/route.ts
// ============================================================
// INDEXING CONSOLE - SEARCH PERFORMANCE ANALYTICS API
// ============================================================
// Queries the Search Console API for performance metrics and
// calculates "quick-win" keywords (high impressions, low CTR, pos 8-20).
// ============================================================

import { NextRequest, NextResponse } from "next/server";
import { createServerDbClient } from "@/lib/supabase-server";
import { getGoogleAccessToken } from "@/lib/google-auth";

const SEARCH_CONSOLE_SCOPE = ["https://www.googleapis.com/auth/webmasters.readonly"];

interface GscRow {
  keys: string[]; // [query, page]
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

export async function GET(request: NextRequest) {
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

  // 2. Compute date range: last 30 days
  const endDateObj = new Date();
  endDateObj.setDate(endDateObj.getDate() - 1); // Yesterday to ensure Google has processed data
  const startDateObj = new Date();
  startDateObj.setDate(startDateObj.getDate() - 31); // 30 days before that

  const formatDate = (d: Date) => d.toISOString().split("T")[0];
  const startDate = formatDate(startDateObj);
  const endDate = formatDate(endDateObj);

  // 3. Authenticate with Google
  let token = "";
  try {
    token = await getGoogleAccessToken(SEARCH_CONSOLE_SCOPE);
  } catch (err) {
    console.error("Google Auth failed for analytics:", err);
    return NextResponse.json(
      { error: `Google Auth Error: ${err instanceof Error ? err.message : String(err)}` },
      { status: 500 }
    );
  }

  // 4. Query Search Console API
  // Note: GSC API requires the siteUrl to exactly match. If it is url prefix, it must be URL-encoded.
  // GSC endpoint: https://www.googleapis.com/webmasters/v3/sites/SITE_URL/searchAnalytics/query
  const urlEncodedSite = encodeURIComponent(siteUrl);
  const apiEndpoint = `https://www.googleapis.com/webmasters/v3/sites/${urlEncodedSite}/searchAnalytics/query`;

  try {
    const response = await fetch(apiEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        startDate,
        endDate,
        dimensions: ["query", "page"],
        rowLimit: 2000
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      // Handle the case where the property is not registered or owned
      if (response.status === 403) {
        return NextResponse.json(
          { error: `Access Denied: Service account does not have permissions for Search Console property "${siteUrl}". Ensure you added the client email from your Service Account JSON credentials as an Owner in Search Console settings.` },
          { status: 403 }
        );
      }
      throw new Error(`Google GSC API status ${response.status}: ${errText}`);
    }

    const resData = await response.json();
    const rows: GscRow[] = resData.rows || [];

    // 5. Calculate summary metrics
    let totalClicks = 0;
    let totalImpressions = 0;
    let sumCtr = 0;
    let sumPosition = 0;

    const quickWins: any[] = [];
    const topKeywordsMap = new Map<string, { clicks: number; impressions: number; ctr: number; position: number }>();
    const topPagesMap = new Map<string, { clicks: number; impressions: number; ctr: number; position: number }>();

    rows.forEach((row) => {
      totalClicks += row.clicks;
      totalImpressions += row.impressions;
      sumCtr += row.ctr;
      sumPosition += row.position;

      const query = row.keys[0] || "Unknown query";
      const page = row.keys[1] || "Unknown page";

      // Group metrics by keyword
      const existingKeyword = topKeywordsMap.get(query);
      if (existingKeyword) {
        existingKeyword.clicks += row.clicks;
        existingKeyword.impressions += row.impressions;
        existingKeyword.ctr = existingKeyword.clicks / existingKeyword.impressions;
      } else {
        topKeywordsMap.set(query, { clicks: row.clicks, impressions: row.impressions, ctr: row.ctr, position: row.position });
      }

      // Group metrics by page
      const existingPage = topPagesMap.get(page);
      if (existingPage) {
        existingPage.clicks += row.clicks;
        existingPage.impressions += row.impressions;
        existingPage.ctr = existingPage.clicks / existingPage.impressions;
      } else {
        topPagesMap.set(page, { clicks: row.clicks, impressions: row.impressions, ctr: row.ctr, position: row.position });
      }

      // Calculate Quick Wins:
      // - Position is between 8 and 20 (on the cusp of Page 1 or top of Page 2)
      // - CTR is low (less than 4%)
      // - High visibility (at least 20 impressions)
      if (row.position >= 8 && row.position <= 20 && row.ctr < 0.04 && row.impressions >= 10) {
        quickWins.push({
          query,
          page,
          clicks: row.clicks,
          impressions: row.impressions,
          ctr: row.ctr,
          position: Math.round(row.position * 10) / 10
        });
      }
    });

    // Sort Quick Wins by impressions (descending) to show highest volume targets first
    quickWins.sort((a, b) => b.impressions - a.impressions);

    // Get Top Keywords sorted by clicks
    const topKeywords = Array.from(topKeywordsMap.entries())
      .map(([query, data]) => ({ query, ...data }))
      .sort((a, b) => b.clicks - a.clicks)
      .slice(0, 10);

    // Get Top Pages sorted by clicks
    const topPages = Array.from(topPagesMap.entries())
      .map(([page, data]) => ({ page, ...data }))
      .sort((a, b) => b.clicks - a.clicks)
      .slice(0, 10);

    return NextResponse.json({
      startDate,
      endDate,
      summary: {
        clicks: totalClicks,
        impressions: totalImpressions,
        ctr: rows.length ? totalClicks / totalImpressions : 0,
        position: rows.length ? sumPosition / rows.length : 0
      },
      topKeywords,
      topPages,
      quickWins: quickWins.slice(0, 15) // Return top 15 quick-wins
    });

  } catch (err) {
    console.error("API Error in GET /api/admin-realty-8x2d9/indexing/analytics:", err);
    return NextResponse.json(
      { error: `Search Console Analytics failed: ${err instanceof Error ? err.message : String(err)}` },
      { status: 500 }
    );
  }
}
