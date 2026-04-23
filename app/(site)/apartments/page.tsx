import type { Metadata } from "next";
import { createAdminClient } from "@/lib/supabase";
import type { Property } from "@/types";
import { Suspense } from "react";
import PropertiesClient from "../properties/PropertiesClient";

export const metadata: Metadata = {
  title: "Apartments & Flats in Mohali | Realty Holding & Management Consultants",
  description: "Explore luxury apartments and flats for sale in Mohali. Verified listings with detailed floor plans, pricing, and amenities.",
};

export const revalidate = 60;

async function getProperties(): Promise<Property[]> {
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("properties")
      .select("*")
      .order("featured", { ascending: false })
      .order("created_at", { ascending: false });
    
    if (error) return [];
    return (data ?? []) as Property[];
  } catch {
    return [];
  }
}

export default async function ApartmentsPage() {
  const properties = await getProperties();
  return (
    <Suspense fallback={null}>
      <PropertiesClient properties={properties} initialTab="apartments" />
    </Suspense>
  );
}
