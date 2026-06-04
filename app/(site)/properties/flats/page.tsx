import type { Metadata } from "next";
import { createAdminClient } from "@/lib/supabase";
import type { Property } from "@/types";
import { propertiesPage, siteConfig } from "@/config/site";
import PropertiesClient from "../PropertiesClient";
import { Suspense } from "react";
import { enrichProperty } from "@/lib/property-utils";

export const metadata: Metadata = {
  title: "Buy Flats & Apartments in Mohali",
  description: "Looking to buy flat in Mohali? Browse verified listings — pre-launch, resale & ready possession. RERA compliant. Trusted consultants in Tricity. Call now.",
  alternates: {
    canonical: `${siteConfig.url}/properties/flats`,
  },
};

export const revalidate = 3600;

async function getFlats(): Promise<Property[]> {
  try {
    const supabase = createAdminClient();
    const { data } = await supabase.from("apartments").select("*");
    return (data ?? []).map((p: any) => enrichProperty({ ...p, entity_type: 'apartment' })) as Property[];
  } catch (err) {
    console.error("Flats Fetch Error:", err);
    return [];
  }
}

export default async function FlatsCategoryPage() {
  const properties = await getFlats();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": siteConfig.url },
          { "@type": "ListItem", "position": 2, "name": "Properties", "item": `${siteConfig.url}/properties` },
          { "@type": "ListItem", "position": 3, "name": "Flats", "item": `${siteConfig.url}/properties/flats` }
        ]
      },
      {
        "@type": "CollectionPage",
        "name": "Buy Flat in Mohali",
        "description": "Verified flats for sale in Mohali. 2BHK, 3BHK, 4BHK apartments.",
        "url": `${siteConfig.url}/properties/flats`,
        "mainEntity": {
          "@type": "ItemList",
          "itemListElement": properties.map((p, i) => ({
            "@type": "ListItem",
            "position": i + 1,
            "url": `${siteConfig.url}/properties/flats/${p.slug}`
          }))
        }
      }
    ]
  };

  return (
    <>
      <h1 className="sr-only">Buy Luxury Flats & Apartments in Mohali</h1>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Suspense fallback={null}>
        <PropertiesClient properties={properties} initialTab="flats" />
      </Suspense>
    </>
  );
}
