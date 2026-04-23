import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    const supabase = createAdminClient();
    
    const { error } = await supabase.from("lead_magnets").insert({
      name: body.name,
      email: body.email,
      whatsapp: body.whatsapp,
      city: body.city,
      campaign: body.type,
      utm_source: body.metadata?.source,
      utm_medium: body.metadata?.medium,
      utm_campaign: body.metadata?.campaign,
    });

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Lead Magnet API error:", err);
    return NextResponse.json(
      { error: err?.message ?? "Failed to submit" },
      { status: 400 }
    );
  }
}
