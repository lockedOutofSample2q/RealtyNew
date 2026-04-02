// app/admin/properties/[id]/page.tsx
// Edit property — loads property by ID from Supabase, then renders full-page form

import { createAdminClient } from "@/lib/supabase";
import { notFound } from "next/navigation";
import PropertyForm from "../_components/PropertyForm";
import type { Property } from "@/types";

export const dynamic = "force-dynamic";

async function getProperty(id: string): Promise<Property | null> {
  try {
    const supabase = createAdminClient();
    const { data, error } = await (supabase.from("properties") as any)
      .select("*")
      .eq("id", id)
      .single();
    if (error || !data) return null;
    return data as Property;
  } catch {
    return null;
  }
}

export default async function EditPropertyPage({
  params,
}: {
  params: { id: string };
}) {
  const property = await getProperty(params.id);
  if (!property) notFound();

  return <PropertyForm property={property} />;
}
