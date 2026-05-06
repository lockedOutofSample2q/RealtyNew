import type { Metadata } from "next";
import { createAdminClient } from "@/lib/supabase";
import type { Property } from "@/types";
import { Suspense } from "react";
import PropertiesClient from "../properties/PropertiesClient";
import { enrichProperty } from "@/lib/property-utils";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Premium Flats in Mohali | Realty Holding & Management Consultants",
  description: "Explore luxury flats for sale in Mohali. Verified listings with detailed floor plans, pricing, and amenities.",
  alternates: {
    canonical: "/flats",
  },
};

export const revalidate = 604800; // 1 week

async function getProperties(): Promise<Property[]> {
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("apartments")
      .select("*")
      .order("featured", { ascending: false })
      .order("created_at", { ascending: false });
    
    if (error) return [];
    return (data ?? []).map((p: any) => enrichProperty({ ...p, entity_type: 'apartment' })) as Property[];
  } catch {
    return [];
  }
}

export default async function ApartmentsPage() {
  const properties = await getProperties();

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${siteConfig.url}/flats`,
        name: "Premium Flats in Mohali | Realty Holding & Management Consultants",
        description: "Explore luxury flats for sale in Mohali. Verified listings with detailed floor plans, pricing, and amenities.",
        url: `${siteConfig.url}/flats`,
        isPartOf: {
          "@id": `${siteConfig.url}/#website`,
        },
        about: {
          "@id": `${siteConfig.url}/#organization`,
        },
      },
      {
        "@type": "ItemList",
        itemListElement: properties.map((prop, index) => ({
          "@type": "ListItem",
          position: index + 1,
          url: `${siteConfig.url}/properties/${prop.slug}`,
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: siteConfig.url,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Flats",
            item: `${siteConfig.url}/flats`,
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <Suspense fallback={null}>
        <PropertiesClient properties={properties} initialTab="flats" />
      </Suspense>
    </>
  );
}
