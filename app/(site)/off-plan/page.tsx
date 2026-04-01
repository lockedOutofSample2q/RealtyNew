import type { Metadata } from "next";
import { createAdminClient } from "@/lib/supabase";
import type { Property } from "@/types";
import { DEMO_PROPERTIES } from "@/lib/demo-properties";
import OffPlanClient from "./OffPlanClient";

export const metadata: Metadata = {
  title: "Off Plan Properties",
  description: "Browse Dubai's best off-plan developments. Flexible payment plans, Golden Visa-eligible projects, and early-bird pricing — curated by Monter.",
};

export const revalidate = 60;

async function getProperties(): Promise<Property[]> {
  try {
    const supabase = createAdminClient();
    const { data } = await supabase
      .from("properties")
      .select("*")
      .eq("listing_type", "off-plan")
      .order("featured", { ascending: false })
      .order("created_at", { ascending: false });
    const live = (data ?? []) as Property[];
    return live.length > 0 ? live : DEMO_PROPERTIES;
  } catch {
    return DEMO_PROPERTIES;
  }
}

export default async function OffPlanPage() {
  const properties = await getProperties();
  return <OffPlanClient properties={properties} />;
}
