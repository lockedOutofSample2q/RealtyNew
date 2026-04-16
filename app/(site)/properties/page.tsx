import type { Metadata } from "next";
import { createAdminClient } from "@/lib/supabase";
import type { Property } from "@/types";

import PropertiesClient from "./PropertiesClient";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Properties in Mohali and Tricity: Verified, Evaluated, Honestly Presented",
  description: "Verified property listings in Mohali and Tricity: pre-launch, resale, and ready possession. Evaluated for RERA compliance, developer track record, and fair pricing.",
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
  return (
    <Suspense fallback={null}>
      <PropertiesClient properties={properties} />
    </Suspense>
  );
}
