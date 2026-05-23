import type { Metadata } from "next";
import { createAdminClient } from "@/lib/supabase";
import type { Property } from "@/types";
import { propertiesPage, siteConfig } from "@/config/site";
import PropertiesClient from "../PropertiesClient";
import { Suspense } from "react";
import { enrichProperty } from "@/lib/property-utils";

export const metadata: Metadata = {
  title: "Villas & Independent Houses in Mohali",
  description: "Looking to buy a house or independent villa in Mohali? Explore premium properties in luxury sectors. Verified listings.",
  alternates: {
    canonical: `${siteConfig.url}/properties/houses`,
  },
};

export const revalidate = 3600;

async function getHouses(): Promise<Property[]> {
  try {
    const supabase = createAdminClient();
    const { data } = await supabase.from("houses").select("*");
    return (data ?? []).map((p: any) => enrichProperty({ ...p, entity_type: 'house' })) as Property[];
  } catch (err) {
    console.error("Houses Fetch Error:", err);
    return [];
  }
}

export default async function HousesCategoryPage() {
  const properties = await getHouses();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": siteConfig.url },
          { "@type": "ListItem", "position": 2, "name": "Properties", "item": `${siteConfig.url}/properties` },
          { "@type": "ListItem", "position": 3, "name": "Houses", "item": `${siteConfig.url}/properties/houses` }
        ]
      },
      {
        "@type": "CollectionPage",
        "name": "Buy House in Mohali",
        "description": "Premium houses and villas for sale in Mohali.",
        "url": `${siteConfig.url}/properties/houses`,
        "mainEntity": {
          "@type": "ItemList",
          "itemListElement": properties.map((p, i) => ({
            "@type": "ListItem",
            "position": i + 1,
            "url": `${siteConfig.url}/properties/houses/${p.slug}`
          }))
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Suspense fallback={null}>
        <PropertiesClient properties={properties} initialTab="houses" />
      </Suspense>
    </>
  );
}
