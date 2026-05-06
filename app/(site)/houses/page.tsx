import type { Metadata } from "next";
import { createAdminClient } from "@/lib/supabase";
import type { Property } from "@/types";
import { Suspense } from "react";
import PropertiesClient from "../properties/PropertiesClient";
import { enrichProperty } from "@/lib/property-utils";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Villas & Houses in Mohali | Realty Holding & Management Consultants",
  description: "Browse premium villas and houses for sale in Mohali. Independent homes in gated communities and prime sectors.",
  alternates: {
    canonical: "/houses",
  },
};

export const revalidate = 604800; // 1 week

async function getProperties(): Promise<Property[]> {
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("houses")
      .select("*")
      .order("featured", { ascending: false })
      .order("created_at", { ascending: false });
    
    if (error) return [];
    return (data ?? []).map((p: any) => enrichProperty({ ...p, entity_type: 'house' })) as Property[];
  } catch {
    return [];
  }
}

export default async function HousesPage() {
  const properties = await getProperties();

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": siteConfig.url,
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Houses & Villas",
        "item": `${siteConfig.url}/houses`,
      },
    ],
  };

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Villas & Houses in Mohali",
    "description": "Browse premium villas and houses for sale in Mohali. Independent homes in gated communities and prime sectors.",
    "url": `${siteConfig.url}/houses`,
    "isPartOf": {
      "@type": "WebSite",
      "url": siteConfig.url,
    },
  };

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Houses & Villas for Sale in Mohali",
    "url": `${siteConfig.url}/houses`,
    "numberOfItems": properties.length,
    "itemListElement": properties.map((property, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "url": `${siteConfig.url}/properties/${property.slug}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([breadcrumbSchema, collectionSchema, itemListSchema]),
        }}
      />
      <Suspense fallback={null}>
        <PropertiesClient properties={properties} initialTab="houses" />
      </Suspense>
    </>
  );
}
