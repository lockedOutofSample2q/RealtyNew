import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createAdminClient } from "@/lib/supabase";
import { siteConfig } from "@/config/site";
import { enrichProperty } from "@/lib/property-utils";
import { slugify } from "@/lib/utils";
import { Property } from "@/types";
import BuilderProfileClient from "./BuilderProfileClient";

export const revalidate = 3600; // Cache for 1 hour

interface Props {
  params: Promise<{ slug: string }>;
}

async function getAllProperties(): Promise<Property[]> {
  try {
    const supabase = createAdminClient();
    
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
    console.error("Builder Profile Page: Error fetching properties:", err);
    return [];
  }
}

// Generate static params for pre-rendering
export async function generateStaticParams() {
  const allProperties = await getAllProperties();
  const uniqueSlugs = new Set<string>();

  allProperties.forEach((p) => {
    if (!p.developer) return;
    const rawDev = p.developer.trim();
    if (rawDev === "Independent" || rawDev === "") return;
    uniqueSlugs.add(slugify(rawDev));
  });

  return Array.from(uniqueSlugs).map((slug) => ({
    slug,
  }));
}

// Dynamic metadata generation
export async function generateMetadata(props: Props): Promise<Metadata> {
  const { slug } = await props.params;
  const allProperties = await getAllProperties();
  
  // Find properties matching the slug to get the developer's exact name
  const matchingProperties = allProperties.filter((p) => {
    if (!p.developer) return false;
    return slugify(p.developer.trim()) === slug;
  });

  if (matchingProperties.length === 0) {
    return {
      title: "Builder Portfolio Not Found | Realty Consultants",
      description: "The requested builder portfolio could not be found.",
    };
  }

  const developerName = matchingProperties[0].developer!.trim();
  const isCoop = developerName.toLowerCase().includes("cooperative") || 
                 developerName.toLowerCase().includes("co-operative") || 
                 developerName.toLowerCase().includes("society");

  const title = isCoop
    ? `${developerName} Inventory & Projects in Mohali | Realty Consultants`
    : `${developerName} Projects, Inventory & Portfolio in Mohali | Realty Consultants`;

  const description = `Browse all active properties, inventory lists, starting prices, and construction updates for ${developerName} in Mohali. All listings are 100% RERA verified.`;

  return {
    title,
    description,
    alternates: {
      canonical: `${siteConfig.url}/properties/builders/${slug}`,
    },
  };
}

export default async function BuilderProfilePage(props: Props) {
  const { slug } = await props.params;
  const allProperties = await getAllProperties();

  // Filter properties matching this builder's slug
  const matchingProperties = allProperties.filter((p) => {
    if (!p.developer) return false;
    return slugify(p.developer.trim()) === slug;
  });

  if (matchingProperties.length === 0) {
    notFound();
  }

  // Aggregate stats
  const firstProp = matchingProperties[0];
  const developerName = firstProp.developer!.trim();
  const website = firstProp.developer_website || null;
  const isCoop = developerName.toLowerCase().includes("cooperative") || 
                 developerName.toLowerCase().includes("co-operative") || 
                 developerName.toLowerCase().includes("society");

  let minPrice = Infinity;
  let maxPrice = -Infinity;
  const locations = new Set<string>();
  const types = new Set<string>();

  matchingProperties.forEach((p) => {
    if (p.price && p.price > 0) {
      if (p.price < minPrice) minPrice = p.price;
      if (p.price > maxPrice) maxPrice = p.price;
    }
    if (p.location) {
      locations.add(p.location);
    }
    if (p.entity_type) {
      const typeStr = p.entity_type === "apartment" ? "Apartments" :
                      p.entity_type === "land" ? "Land Plots" : "Houses";
      types.add(typeStr);
    }
  });

  const builderData = {
    name: developerName,
    website,
    slug,
    minPrice: minPrice === Infinity ? 0 : minPrice,
    maxPrice: maxPrice === -Infinity ? 0 : maxPrice,
    locations: Array.from(locations),
    isCoop,
    propertyCount: matchingProperties.length,
    types: Array.from(types),
  };

  // Structured Data (JSON-LD)
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": siteConfig.url },
          { "@type": "ListItem", "position": 2, "name": "Properties", "item": `${siteConfig.url}/properties` },
          { "@type": "ListItem", "position": 3, "name": "Builders", "item": `${siteConfig.url}/properties/builders` },
          { "@type": "ListItem", "position": 4, "name": developerName, "item": `${siteConfig.url}/properties/builders/${slug}` }
        ]
      },
      {
        "@type": isCoop ? "Organization" : "RealEstateAgent",
        "@id": `${siteConfig.url}/properties/builders/${slug}#organization`,
        "name": developerName,
        "url": website || `${siteConfig.url}/properties/builders/${slug}`,
        "description": `Official inventory and verified portfolio directory of ${developerName} listings in Mohali.`,
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Mohali",
          "addressRegion": "Punjab",
          "addressCountry": "IN"
        }
      },
      {
        "@type": "ItemList",
        "name": `Properties developed by ${developerName}`,
        "numberOfItems": matchingProperties.length,
        "itemListElement": matchingProperties.map((p, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "url": `${siteConfig.url}/properties/${p.slug}`
        }))
      }
    ]
  };

  return (
    <>
      <h1 className="sr-only">Properties by {developerName} in Mohali</h1>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BuilderProfileClient builder={builderData} properties={matchingProperties} />
    </>
  );
}
