import type { Metadata } from "next";
import { createAdminClient } from "@/lib/supabase";
import { siteConfig } from "@/config/site";
import { enrichProperty } from "@/lib/property-utils";
import { slugify } from "@/lib/utils";
import { Property } from "@/types";
import BuildersClient from "./BuildersClient";

export const metadata: Metadata = {
  title: "Top Real Estate Builders & Developers in Mohali | Realty Consultants",
  description: "Browse verified portfolios, inventories, and track records of leading builders (ATS, Jubilee, JLPL, Marbella) and Cooperative Housing Societies in Mohali.",
  alternates: {
    canonical: `${siteConfig.url}/properties/builders`,
  },
};

export const revalidate = 3600; // Cache for 1 hour

async function getAllProperties(): Promise<Property[]> {
  try {
    const supabase = createAdminClient();
    
    // Fetch all listings to group by developer
    const [aptsRes, landsRes, housesRes] = await Promise.all([
      supabase.from("apartments").select("*"),
      supabase.from("lands").select("*"),
      supabase.from("houses").select("*"),
    ]);

    const apartments = (aptsRes.data || []).map((p: any) =>
      enrichProperty({ ...p, entity_type: "apartment" })
    );
    const lands = (landsRes.data || []).map((p: any) =>
      enrichProperty({ ...p, entity_type: "land" })
    );
    const houses = (housesRes.data || []).map((p: any) =>
      enrichProperty({ ...p, entity_type: "house" })
    );

    return [...apartments, ...lands, ...houses] as Property[];
  } catch (err) {
    console.error("Builders Page: Error fetching properties:", err);
    return [];
  }
}

export default async function BuildersLandingPage() {
  const allProperties = await getAllProperties();

  // Aggregate developer stats
  const devMap = new Map<string, {
    name: string;
    website: string | null;
    slug: string;
    properties: Property[];
    minPrice: number;
    maxPrice: number;
    locations: Set<string>;
    isCoop: boolean;
  }>();

  allProperties.forEach((p) => {
    if (!p.developer) return;
    const rawDev = p.developer.trim();
    if (rawDev === "Independent" || rawDev === "") return;

    const slug = slugify(rawDev);
    if (!devMap.has(slug)) {
      const isCoop = rawDev.toLowerCase().includes("cooperative") || 
                     rawDev.toLowerCase().includes("co-operative") || 
                     rawDev.toLowerCase().includes("society");
                     
      devMap.set(slug, {
        name: rawDev,
        website: p.developer_website || null,
        slug: slug,
        properties: [],
        minPrice: Infinity,
        maxPrice: -Infinity,
        locations: new Set<string>(),
        isCoop: isCoop,
      });
    }

    const devInfo = devMap.get(slug)!;
    devInfo.properties.push(p);
    
    if (p.price && p.price > 0) {
      if (p.price < devInfo.minPrice) devInfo.minPrice = p.price;
      if (p.price > devInfo.maxPrice) devInfo.maxPrice = p.price;
    }
    if (p.location) {
      devInfo.locations.add(p.location);
    }
  });

  const builders = Array.from(devMap.values()).map((b) => ({
    ...b,
    minPrice: b.minPrice === Infinity ? 0 : b.minPrice,
    maxPrice: b.maxPrice === -Infinity ? 0 : b.maxPrice,
    locations: Array.from(b.locations),
  })).sort((a, b) => b.properties.length - a.properties.length); // Sort by active properties

  // Build JSON-LD dynamic Schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": siteConfig.url },
          { "@type": "ListItem", "position": 2, "name": "Properties", "item": `${siteConfig.url}/properties` },
          { "@type": "ListItem", "position": 3, "name": "Builders", "item": `${siteConfig.url}/properties/builders` }
        ]
      },
      {
        "@type": "CollectionPage",
        "name": "Builders & Developers in Mohali",
        "description": "Verified directories and inventories of real estate builders and cooperative societies in Mohali and Tricity.",
        "url": `${siteConfig.url}/properties/builders`,
        "mainEntity": {
          "@type": "ItemList",
          "itemListElement": builders.map((b, i) => ({
            "@type": "ListItem",
            "position": i + 1,
            "url": `${siteConfig.url}/properties/builders/${b.slug}`
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
      <BuildersClient builders={builders} />
    </>
  );
}
