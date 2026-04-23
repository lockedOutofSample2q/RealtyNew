import type { Metadata } from "next";
import { createAdminClient } from "@/lib/supabase";
import type { Property } from "@/types";
import { propertiesPage } from "@/config/site";

import PropertiesClient from "./PropertiesClient";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: propertiesPage.metadata.title,
  description: propertiesPage.metadata.description,
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
    
    if (error) {
      console.error("Properties Fetch Error:", error);
      return [];
    }
    
    return (data ?? []) as Property[];
  } catch (err) {
    console.error("Properties Runtime Error:", err);
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
