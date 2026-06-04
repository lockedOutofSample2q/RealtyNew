// app/api/admin-realty-8x2d9/indexing/route.ts
// ============================================================
// INDEXING CONSOLE - BASE API
// ============================================================
// Returns indexing status counts and a paginated list of URLs.
// ============================================================

import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase";
import { createServerDbClient } from "@/lib/supabase-server";;

export async function GET(request: NextRequest) {
  // 1. Verify Authentication
  const supabase = await createServerDbClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "25", 10);
  const search = searchParams.get("search") || "";
  const statusFilter = searchParams.get("status") || "";
  const verdictFilter = searchParams.get("verdict") || "";

  const offset = (page - 1) * limit;

  // We use createAdminClient (service role) to query indexing status bypass RLS for admin actions
  const adminDb = createAdminClient();

  try {
    // 2. Fetch counts for overview cards
    const [
      { count: totalCount },
      { count: pendingCount },
      { count: submittedCount },
      { count: indexedCount },
      { count: notIndexedCount },
      { count: errorCount }
    ] = await Promise.all([
      adminDb.from("google_indexing_status").select("*", { count: "exact", head: true }),
      adminDb.from("google_indexing_status").select("*", { count: "exact", head: true }).eq("status", "pending"),
      adminDb.from("google_indexing_status").select("*", { count: "exact", head: true }).eq("status", "submitted"),
      adminDb.from("google_indexing_status").select("*", { count: "exact", head: true }).eq("status", "indexed"),
      adminDb.from("google_indexing_status").select("*", { count: "exact", head: true }).eq("status", "not_indexed"),
      adminDb.from("google_indexing_status").select("*", { count: "exact", head: true }).eq("status", "error")
    ]);

    // 3. Build query for paginated list
    let query = adminDb
      .from("google_indexing_status")
      .select("*", { count: "exact" });

    if (search) {
      query = query.ilike("url", `%${search}%`);
    }
    if (statusFilter) {
      query = query.eq("status", statusFilter);
    }
    if (verdictFilter) {
      query = query.eq("inspection_verdict", verdictFilter);
    }

    const { data: urls, count: totalFiltered, error: queryError } = await query
      .order("updated_at", { ascending: false })
      .range(offset, offset + limit - 1);

    if (queryError) {
      throw queryError;
    }

    return NextResponse.json({
      counts: {
        total: totalCount || 0,
        pending: pendingCount || 0,
        submitted: submittedCount || 0,
        indexed: indexedCount || 0,
        notIndexed: notIndexedCount || 0,
        error: errorCount || 0
      },
      urls: urls || [],
      pagination: {
        page,
        limit,
        total: totalFiltered || 0,
        totalPages: Math.ceil((totalFiltered || 0) / limit)
      }
    });

  } catch (err) {
    console.error("API Error in GET /api/admin-realty-8x2d9/indexing:", err);
    return NextResponse.json(
      { error: "Failed to retrieve indexing status data." },
      { status: 500 }
    );
  }
}
