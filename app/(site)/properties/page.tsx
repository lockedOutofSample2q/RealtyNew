import type { Metadata } from "next";
import { createAdminClient } from "@/lib/supabase";
import type { Property } from "@/types";
import { DEMO_PROPERTIES } from "@/lib/demo-properties";
import PropertiesClient from "./PropertiesClient";

export const metadata: Metadata = {
  title: "Properties in Dubai",
  description: "Browse Dubai's best properties for sale and rent.",
};

export const revalidate = 60;

async function getProperties(): Promise<Property[]> {
  try {
    const supabase = createAdminClient();
    const { data } = await supabase
      .from("properties")
      .select("*")
      .in("listing_type", ["sale", "rent", "off-plan"])
      .order("featured", { ascending: false })
      .order("created_at", { ascending: false });
    const live = (data ?? []) as Property[];
    return live.length > 0 ? live : DEMO_PROPERTIES;
  } catch {
    return DEMO_PROPERTIES;
  }
}

export default async function PropertiesPage() {
  const properties = await getProperties();
  return <PropertiesClient properties={properties} />;
}
