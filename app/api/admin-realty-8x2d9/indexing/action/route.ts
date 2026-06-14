import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase";
import { createServerDbClient } from "@/lib/supabase-server";
import { getGoogleAccessToken } from "@/lib/google-auth";

const INDEXING_SCOPE = ["https://www.googleapis.com/auth/indexing"];
const GOOGLE_INDEXING_ENDPOINT = "https://indexing.googleapis.com/v3/urlNotifications:publish";

export async function POST(request: NextRequest) {
  const supabase = await createServerDbClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { ids, actionType } = body;

  if (!ids || !Array.isArray(ids) || ids.length === 0) {
    return NextResponse.json({ error: "No URLs selected." }, { status: 400 });
  }

  if (actionType !== "URL_UPDATED" && actionType !== "URL_DELETED") {
    return NextResponse.json({ error: "Invalid action type." }, { status: 400 });
  }

  const adminDb = createAdminClient();

  // Fetch the actual URLs from the DB based on the provided IDs
  const { data: urlsData, error: queryError } = await adminDb
    .from("google_indexing_status")
    .select("id, url, submit_count")
    .in("id", ids);

  if (queryError || !urlsData) {
    return NextResponse.json({ error: "Failed to fetch URLs from database." }, { status: 500 });
  }

  // Authenticate with Google
  let token = "";
  try {
    token = await getGoogleAccessToken(INDEXING_SCOPE);
  } catch (err) {
    return NextResponse.json({ error: `Google Auth Error: ${err instanceof Error ? err.message : String(err)}` }, { status: 500 });
  }

  let successCount = 0;
  let failCount = 0;
  const results = [];

  for (const item of urlsData) {
    try {
      const response = await fetch(GOOGLE_INDEXING_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          url: item.url,
          type: actionType
        })
      });

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(`Google API ${response.status}: ${errText}`);
      }

      // If removed, we might want to set status to 'not_indexed' or 'error' 
      // For now, let's keep it 'submitted' to indicate we took an action, but reset last_inspected so it gets picked up again
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
      console.error(`Action ${actionType} failed for ${item.url}:`, errMsg);

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

    // Small delay to prevent rate issues
    await new Promise((resolve) => setTimeout(resolve, 300));
  }

  return NextResponse.json({
    success: true,
    message: `Processed ${urlsData.length} URLs. Success: ${successCount}, Failed: ${failCount}.`,
    successCount,
    failCount,
    results
  });
}
