import type { Metadata } from "next";
import { createAdminClient } from "@/lib/supabase";
import type { Property } from "@/types";
import { propertiesPage, siteConfig } from "@/config/site";
import PropertiesClient from "../PropertiesClient";
import { Suspense } from "react";
import { enrichProperty } from "@/lib/property-utils";

export const metadata: Metadata = {
  title: "Plots & Lands for Sale in Mohali",
  description: "Invest in GMADA plots and agricultural land in Mohali. High-growth investment opportunities. Expert advisory.",
  alternates: {
    canonical: `${siteConfig.url}/properties/lands`,
  },
};

export const revalidate = 3600;

async function getLands(): Promise<Property[]> {
  try {
    const supabase = createAdminClient();
    const { data } = await supabase.from("lands").select("*");
    return (data ?? []).map((p: any) => enrichProperty({ ...p, entity_type: 'land' })) as Property[];
  } catch (err) {
    console.error("Lands Fetch Error:", err);
    return [];
  }
}

export default async function LandsCategoryPage() {
  const properties = await getLands();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": siteConfig.url },
          { "@type": "ListItem", "position": 2, "name": "Properties", "item": `${siteConfig.url}/properties` },
          { "@type": "ListItem", "position": 3, "name": "Lands", "item": `${siteConfig.url}/properties/lands` }
        ]
      },
      {
        "@type": "CollectionPage",
        "name": "Buy Land in Mohali",
        "description": "Investment-grade plots and land in Mohali growth corridors.",
        "url": `${siteConfig.url}/properties/lands`,
        "mainEntity": {
          "@type": "ItemList",
          "itemListElement": properties.map((p, i) => ({
            "@type": "ListItem",
            "position": i + 1,
            "url": `${siteConfig.url}/properties/lands`
          }))
        }
      }
    ]
  };

  return (
    <>
      <h1 className="sr-only">Plots & Agricultural Land for Sale in Punjab</h1>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Suspense fallback={null}>
        <PropertiesClient properties={properties} initialTab="lands" />
      </Suspense>
    </>
  );
}
