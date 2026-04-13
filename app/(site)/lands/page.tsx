import type { Metadata } from "next";
import { createAdminClient } from "@/lib/supabase";
import type { Property } from "@/types";

import LandsClient from "./LandsClient";

export const metadata: Metadata = {
  title: "Lands",
  description: "Furnished and unfurnished Lands across Dubai's best communities.",
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
