import type { Metadata } from "next";
import { createAdminClient } from "@/lib/supabase";
import type { Property } from "@/types";

import LandsClient from "./LandsClient";

export const metadata: Metadata = {
  title: "Land and Plot Listings in Punjab: GMADA, Licensed, and Agricultural",
  description: "GMADA plots, licensed residential plots, and agricultural land in Mohali and Punjab. Verified title and licensing status. Honest assessment of every listing.",
};

export const revalidate = 60;

async function getProperties(): Promise<Property[]> {
  try {
    const supabase = createAdminClient();
    const { data } = await supabase
      .from("properties")
      .select("*")
      .in("listing_type", ["sale", "lands", "off-plan"])
      .order("featured", { ascending: false })
      .order("created_at", { ascending: false });
    const live = (data ?? []) as Property[];
    return live.length > 0 ? live : [];
  } catch {
    return [];
  }
}

export default async function LandsPage() {
  const properties = await getProperties();
  return <LandsClient properties={properties} />;
}
