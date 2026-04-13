import type { Metadata } from "next";
import { createAdminClient } from "@/lib/supabase";
import type { Property } from "@/types";

import PropertiesClient from "./PropertiesClient";

export const metadata: Metadata = {
  title: "Properties Properties",
  description: "Browse Dubai's best off-plan developments. Flexible payment plans, Golden Visa-eligible projects, and early-bird pricing — curated by Monter.",
};

export const revalidate = 60;

async function getProperties(): Promise<Property[]> {
  try {
    const supabase = createAdminClient();
    const { data } = await supabase
      .from("properties")
      .select("*")
      .eq("listing_type", "properties")
      .order("featured", { ascending: false })
      .order("created_at", { ascending: false });
    const live = (data ?? []) as Property[];
    return live.length > 0 ? live : [];
  } catch {
    return [];
  }
}

export default async function PropertiesPage() {
  const properties = await getProperties();
  return <PropertiesClient properties={properties} />;
}
