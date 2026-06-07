import type { Metadata } from "next";
import { createAdminClient } from "@/lib/supabase";
import { siteConfig } from "@/config/site";
import { enrichProperty } from "@/lib/property-utils";
import { slugify } from "@/lib/utils";
import { Property } from "@/types";
import BuildersClient from "./BuildersClient";

export const metadata: Metadata = {
  title: {
    absolute: "Top Real Estate Builders in Mohali | RERA Verified Developers | Realty Consultants"
  },
  description: "RERA-verified builders and cooperative housing societies in Mohali — from JLPL and Bestech to Jubilee and GMADA. Prices from ₹45L to ₹9.19Cr. Independently reviewed by Realty Holding & Management Consultants.",
  alternates: {
    canonical: "https://www.realtyconsultants.in/properties/builders",
  },
  openGraph: {
    title: "Top Real Estate Builders in Mohali | RERA Verified Developers | Realty Consultants",
    description: "28 RERA-verified builders and cooperative housing societies in Mohali — from JLPL and Bestech to Jubilee and GMADA. Prices from ₹45L to ₹9.19Cr. Independently reviewed by Realty Holding & Management Consultants.",
    url: "https://www.realtyconsultants.in/properties/builders",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Top Real Estate Builders in Mohali | RERA Verified | Realty Consultants",
    description: "28 RERA-verified builders in Mohali reviewed by our advisory desk — corporate developers and cooperative housing societies. Prices ₹45L–₹9.19Cr.",
  }
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
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.realtyconsultants.in/" },
          { "@type": "ListItem", "position": 2, "name": "Properties", "item": "https://www.realtyconsultants.in/properties" },
          { "@type": "ListItem", "position": 3, "name": "Builders & Developers", "item": "https://www.realtyconsultants.in/properties/builders" }
        ]
      },
      {
        "@type": "ItemList",
        "name": "Top Real Estate Builders and Developers in Mohali",
        "description": "28 RERA-verified builders and cooperative housing societies in Mohali, Tricity — independently reviewed by Realty Holding & Management Consultants",
        "numberOfItems": builders.length,
        "itemListElement": builders.map((b, i) => ({
          "@type": "ListItem",
          "position": i + 1,
          "name": b.name,
          "url": `https://www.realtyconsultants.in/properties/builders/${b.slug}`
        }))
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Which builders in Mohali have the most active listings?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "JLPL, Jubilee Group, and Marbella Group each have three active RERA-verified listings — the highest count of any developers in the Realty Consultants directory. JLPL operates in Sector 66A, Jubilee Group spans Sectors 91 and 112, and Marbella covers New Chandigarh (Mullanpur)."
            }
          },
          {
            "@type": "Question",
            "name": "What is the lowest starting price for a flat from a RERA-verified builder in Mohali?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Jubilee Group offers the lowest entry price among listed corporate builders at ₹45 lakh for their Sector 91 project. Among cooperative societies, Mundi Cooperative and Shri Guru Teg Bahadur Society start at ₹55 lakh in Sector 70."
            }
          },
          {
            "@type": "Question",
            "name": "What is GMADA and is it the same as a private builder?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "GMADA (Greater Mohali Area Development Authority) is the Punjab Government's statutory development body. It plans sectors, develops infrastructure, and allots residential and commercial plots. It is not a private builder and does not construct apartments. GMADA properties typically offer the strongest land-title security of any category."
            }
          },
          {
            "@type": "Question",
            "name": "What is the difference between a cooperative housing society and a RERA-verified builder in Mohali?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A cooperative housing society is registered under the Punjab Cooperative Societies Act. Ownership is structured as a society membership — the land title vests in the society collectively. A RERA-verified builder delivers a registered sale deed directly to the buyer. Cooperative societies in Mohali typically carry lower price points but require buyers to understand the membership and transfer process."
            }
          },
          {
            "@type": "Question",
            "name": "How do I check if a builder is RERA registered in Mohali?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Visit hrera.org.in — Punjab's official RERA portal — and search by project name or promoter. All corporate builders listed by Realty Consultants are RERA registered. Cooperative housing societies operate under the Punjab Cooperative Societies Act and are not required to register under RERA."
            }
          },
          {
            "@type": "Question",
            "name": "Which sectors in Mohali have the most builder activity?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Sector 66A, Sector 88, Sector 112, Sector 121, and Sector 126 have the highest concentration of active RERA listings. New Chandigarh (Mullanpur) is the fastest-growing premium zone, anchored by Marbella Group's three active projects."
            }
          }
        ]
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
