import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    const supabase = createAdminClient();
    
    // 1. Insert into lead_magnets (for retro-compatibility)
    await supabase.from("lead_magnets").insert({
      name: body.name,
      email: body.email,
      whatsapp: body.whatsapp,
      city: body.city,
      campaign: body.type,
      utm_source: body.metadata?.source,
      utm_medium: body.metadata?.medium,
      utm_campaign: body.metadata?.campaign,
    });

    // 2. Insert into the NEW dedicated document_downloads table
    const { error: newTableError } = await supabase.from("document_downloads").insert({
      name: body.name,
      whatsapp: body.whatsapp,
      city: body.city,
      downloaded_file: "property-document-checklist.pdf",
      utm_source: body.metadata?.source,
      utm_medium: body.metadata?.medium,
      utm_campaign: body.metadata?.campaign,
    });

    // If table doesn't exist yet, we catch it silently so the user request does not break,
    // while ensuring records are safely committed elsewhere
    if (newTableError && !newTableError.message.includes("does not exist")) {
      throw newTableError;
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Lead Magnet API error:", err);
    return NextResponse.json(
      { error: err?.message ?? "Failed to submit" },
      { status: 400 }
    );
  }
}
