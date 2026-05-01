import type { Metadata } from "next";
import { createAdminClient } from "@/lib/supabase";
import type { Property } from "@/types";
import { Suspense } from "react";
import PropertiesClient from "../properties/PropertiesClient";
import { enrichProperty } from "@/lib/property-utils";

export const metadata: Metadata = {
  title: "Villas & Houses in Mohali | Realty Holding & Management Consultants",
  description: "Browse premium villas and houses for sale in Mohali. Independent homes in gated communities and prime sectors.",
};

export const revalidate = 60;

async function getProperties(): Promise<Property[]> {
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("houses")
      .select("*")
      .order("featured", { ascending: false })
      .order("created_at", { ascending: false });
    
    if (error) return [];
    return (data ?? []).map((p: any) => enrichProperty({ ...p, entity_type: 'house' })) as Property[];
  } catch {
    return [];
  }
}

export default async function HousesPage() {
  const properties = await getProperties();
  return (
    <Suspense fallback={null}>
      <PropertiesClient properties={properties} initialTab="houses" />
    </Suspense>
  );
}
