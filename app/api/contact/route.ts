// app/api/contact/route.ts
// ============================================================
// CONTACT FORM API
// POST /api/contact → saves lead to Supabase leads table
// ============================================================

import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string().optional(),
  source: z.enum(["contact", "property", "list-property", "newsletter", "relocation"]),
  property_id: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = schema.parse(body);

    const supabase = createAdminClient();
    const { error } = await supabase.from("leads").insert({
      name: data.name,
      email: data.email,
      phone: data.phone ?? "",
      message: data.message ?? null,
      source: data.source,
      property_id: data.property_id ?? null,
      status: "new",
    } as any);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Contact API error:", err);
    return NextResponse.json(
      { error: err?.message ?? "Failed to submit" },
      { status: 400 }
    );
  }
}
