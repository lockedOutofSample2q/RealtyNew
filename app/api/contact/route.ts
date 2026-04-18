// app/api/contact/route.ts
// ============================================================
// CONTACT FORM API
// POST /api/contact → saves lead to Supabase leads table
// ============================================================

import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase";
import { z } from "zod";

const schema = z.object({
  name: z.string().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string().optional(),
  source: z.enum(["contact", "property", "list-property", "newsletter", "relocation"]),
  property_id: z.string().optional(),
  // Extra fields from various forms
  company: z.string().optional(),
  projectType: z.string().optional(),
  contactMethod: z.string().optional(),
  preferredTime: z.string().optional(),
  subject: z.string().optional(),
}).passthrough();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = schema.parse(body);

    // Construct full name if firstName/lastName provided
    const fullName = data.name || [data.firstName, data.lastName].filter(Boolean).join(" ") || "Inquiry";

    // Combine extra metadata into message for database storage
    let finalMessage = data.message || "";
    const metadataParts = [];
    if (data.subject) metadataParts.push(`Subject: ${data.subject}`);
    if (data.company) metadataParts.push(`Company: ${data.company}`);
    if (data.projectType) metadataParts.push(`Project Type: ${data.projectType}`);
    if (data.contactMethod) metadataParts.push(`Method: ${data.contactMethod}`);
    if (data.preferredTime) metadataParts.push(`Time: ${data.preferredTime}`);

    if (metadataParts.length > 0) {
      finalMessage = `${metadataParts.join(" | ")}\n\n${finalMessage}`;
    }

    const supabase = createAdminClient();
    const { error } = await supabase.from("leads").insert({
      name: fullName,
      email: data.email,
      phone: data.phone ?? "",
      message: finalMessage,
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
