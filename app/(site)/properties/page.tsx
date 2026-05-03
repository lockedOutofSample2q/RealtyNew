import type { Metadata } from "next";
import { createAdminClient } from "@/lib/supabase";
import type { Property } from "@/types";
import { propertiesPage } from "@/config/site";

import PropertiesClient from "./PropertiesClient";
import { Suspense } from "react";
import { enrichProperty } from "@/lib/property-utils";

export async function generateMetadata({ searchParams }: { searchParams: Promise<{ tab?: string }> }): Promise<Metadata> {
  const params = await searchParams;
  const tab = params.tab || "flats";
  
  let title = propertiesPage.metadata.title;
  
  if (tab === "flats") {
    title = "Buy flat in Mohali with Realty Holding And Management Consultants";
  } else if (tab === "houses") {
    title = "Buy house in Mohali with Realty Holding And Management Consultants";
  } else if (tab === "lands") {
    title = "Buy land in Mohali with Realty Holding And Management Consultants";
  }
  
  return {
    title: {
      absolute: title,
    },
    description: propertiesPage.metadata.description,
    openGraph: {
      title,
      description: propertiesPage.metadata.description,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: propertiesPage.metadata.description,
    },
    alternates: {
      canonical: "/properties",
    },
  };
}

// Enable weekly caching (ISR every 7 days)
export const revalidate = 604800;

async function getProperties(): Promise<Property[]> {
  try {
    const supabase = createAdminClient();
    
    // Fetch from all three tables
    const [apartmentsRes, housesRes, landsRes] = await Promise.all([
      supabase.from("apartments").select("*"),
      supabase.from("houses").select("*"),
      supabase.from("lands").select("*")
    ]);

    const apartments = (apartmentsRes.data ?? []).map((p: any) => enrichProperty({ ...p, entity_type: 'apartment' }));
    const houses = (housesRes.data ?? []).map((p: any) => enrichProperty({ ...p, entity_type: 'house' }));
    const lands = (landsRes.data ?? []).map((p: any) => enrichProperty({ ...p, entity_type: 'land' }));

    // Combine and sort by featured and created_at
    const all = [...apartments, ...houses, ...lands] as Property[];
    
    return all.sort((a, b) => {
      if (a.featured !== b.featured) return a.featured ? -1 : 1;
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });
  } catch (err) {
    console.error("Properties Fetch Error:", err);
    return [];
  }
}

export default async function PropertiesPage({ searchParams }: { searchParams: Promise<{ tab?: string }> }) {
  const params = await searchParams;
  const properties = await getProperties();
  const initialTab = (params.tab as any) || "flats";
  
  return (
    <Suspense fallback={null}>
      <PropertiesClient properties={properties} initialTab={initialTab} />
    </Suspense>
  );
}
