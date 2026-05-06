import type { Metadata } from "next";
import { createAdminClient } from "@/lib/supabase";
import type { Property } from "@/types";
import { propertiesPage, siteConfig } from "@/config/site";

import PropertiesClient from "./PropertiesClient";
import { Suspense } from "react";
import { enrichProperty } from "@/lib/property-utils";

export async function generateMetadata({ searchParams }: { searchParams: Promise<{ tab?: string }> }): Promise<Metadata> {
  const params = await searchParams;
  const tab = params.tab || "flats";
  
  let title = propertiesPage.metadata.title;
  let description = propertiesPage.metadata.description;
  
  if (tab === "flats") {
    title = "Buy Flat in Mohali | Realty Holding and Management Consultants";
    description = "Looking to buy flat in Mohali? Browse verified listings — pre-launch, resale & ready possession. RERA compliant. Trusted consultants in Tricity. Call now.";
  } else if (tab === "houses") {
    title = "Buy house in Mohali with Realty Holding And Management Consultants";
  } else if (tab === "lands") {
    title = "Buy land in Mohali with Realty Holding And Management Consultants";
  }
  
  return {
    title: {
      absolute: title,
    },
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: "https://www.realtyconsultants.in/og-properties.jpg",
          width: 1200,
          height: 630,
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["https://www.realtyconsultants.in/og-properties.jpg"]
    },
    alternates: {
      canonical: "https://www.realtyconsultants.in/properties",
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

  let filteredProperties = properties;
  if (initialTab === "flats") {
    filteredProperties = properties.filter((p: any) => p.entity_type === 'apartment');
  } else if (initialTab === "houses") {
    filteredProperties = properties.filter((p: any) => p.entity_type === 'house');
  } else if (initialTab === "lands") {
    filteredProperties = properties.filter((p: any) => p.entity_type === 'land');
  }

  const siteUrl = siteConfig.url;
  const canonicalUrl = `${siteUrl}/properties${initialTab !== "flats" ? `?tab=${initialTab}` : ""}`;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": siteUrl
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Properties",
        "item": `${siteUrl}/properties`
      }
    ]
  };

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": filteredProperties.map((prop, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "url": `${siteUrl}/properties/${prop.slug}`
    }))
  };

  const collectionPageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": initialTab === "flats" ? "Buy Flat in Mohali" : (initialTab === "houses" ? "Buy House in Mohali" : "Buy Land in Mohali"),
    "description": propertiesPage.metadata.description,
    "url": canonicalUrl,
    "mainEntity": itemListSchema
  };

  const jsonLd = [breadcrumbSchema, collectionPageSchema];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Suspense fallback={null}>
        <PropertiesClient properties={properties} initialTab={initialTab} />
      </Suspense>
    </>
  );
}
