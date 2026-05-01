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
  source: z.enum(["contact", "property", "list-property", "newsletter", "relocation", "land_listing"]),
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
    
    const leadData: any = {
      name: fullName,
      email: data.email,
      phone: data.phone ?? "",
      message: finalMessage,
      source: data.source,
      status: "new",
    };

    // Handle split tables IDs
    if (body.entityType === "apartment" || body.apartment_id) {
      leadData.apartment_id = body.apartment_id || data.property_id;
    } else if (body.entityType === "house" || body.house_id) {
      leadData.house_id = body.house_id || data.property_id;
    } else if (body.entityType === "land" || body.land_id) {
      leadData.land_id = body.land_id || data.property_id;
    } else if (data.property_id) {
      // Fallback: Try to find entity type from VIEW
      const { data: prop } = await supabase
        .from("properties")
        .select("entity_type")
        .eq("id", data.property_id)
        .single();
      
      if (prop?.entity_type === "apartment") leadData.apartment_id = data.property_id;
      else if (prop?.entity_type === "house") leadData.house_id = data.property_id;
      else if (prop?.entity_type === "land") leadData.land_id = data.property_id;
      else leadData.property_id = data.property_id; // For properties_old or other cases
    }

    const { error } = await supabase.from("leads").insert(leadData);

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
