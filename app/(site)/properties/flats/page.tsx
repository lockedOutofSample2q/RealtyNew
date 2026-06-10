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
      <div className="sr-only">
        <h1>Buy Luxury Flats & Apartments in Mohali</h1>
        <p>
          Buy flat in Mohali with verified listings from Realty Consultants.
          Explore 2 BHK, 3 BHK, and 4 BHK flats for sale in Mohali across
          top sectors including Sector 82A, 66B, 78, and the GMADA IT City
          corridor. All properties evaluated for RERA compliance, builder
          track record, and fair pricing. Whether you are looking for a
          pre-launch flat in Mohali, a resale apartment, or ready possession,
          our consultants guide you through every step.
        </p>
        <p>
          Buy flat in Mohali with Realty Consultants — Mohali's trusted real 
          estate advisory for luxury and investment-grade properties. Whether 
          you want to buy a 2 BHK, 3 BHK, or 4 BHK flat in Mohali, we offer 
          verified listings across Sector 66, 70, 77, 82A, 83A, 88, and 117. 
          Every flat for sale in Mohali on our platform is evaluated for RERA 
          compliance, builder track record, and fair market pricing. Browse 
          pre-launch flats in Mohali, resale apartments, and ready possession 
          units — all in one place. Looking to buy property in Mohali or the 
          wider Tricity region of Chandigarh, Panchkula, and Mohali? Our 
          consultants offer end-to-end guidance from site visits to 
          registration. Explore the best flats in Mohali today.
        </p>
      </div>
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
