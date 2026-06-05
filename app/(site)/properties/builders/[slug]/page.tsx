import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createAdminClient } from "@/lib/supabase";
import { siteConfig } from "@/config/site";
import { enrichProperty } from "@/lib/property-utils";
import { slugify } from "@/lib/utils";
import { Property } from "@/types";
import BuilderProfileClient from "./BuilderProfileClient";
import buildersData from "@/config/builders-data.json";

export const revalidate = 3600; // Cache for 1 hour

interface Props {
  params: Promise<{ slug: string }>;
}

// Indian currency formatter helper
function formatIndianCurrency(price: number): string {
  if (!price || price <= 0) return "Price on Request";
  if (price >= 10000000) {
    const cr = price / 10000000;
    return `₹${cr.toFixed(2).replace(/\.00$/, "")} Crore`;
  }
  if (price >= 100000) {
    const lakh = price / 100000;
    return `₹${lakh.toFixed(2).replace(/\.00$/, "")} Lakh`;
  }
  return `₹${price.toLocaleString("en-IN")}`;
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
      title: "Builder Portfolio Not Found",
      description: "The requested builder portfolio could not be found.",
    };
  }

  const developerName = matchingProperties[0].developer!.trim();
  const builderConfig = (buildersData.builders as any)[slug] || null;
  const commonName = builderConfig?.commonName || developerName;

  // Extract variables for SEO formulas
  let minPrice = Infinity;
  let maxPrice = -Infinity;
  const locations = new Set<string>();

  matchingProperties.forEach((p) => {
    if (p.price && p.price > 0) {
      if (p.price < minPrice) minPrice = p.price;
      if (p.price > maxPrice) maxPrice = p.price;
    }
    if (p.location) {
      locations.add(p.location.trim());
    }
  });

  const priceRangeStr = minPrice === Infinity ? "pricing on request" : `${formatIndianCurrency(minPrice)} - ${formatIndianCurrency(maxPrice)}`;
  const sectorsStr = locations.size > 0 ? `Sectors ${Array.from(locations).join(", ")}` : "Mohali";

  const title = `${commonName} Projects & Flats in Mohali | RERA Verified`;
  const description = `Browse all ${matchingProperties.length} RERA-verified ${commonName} properties in Mohali. ${priceRangeStr}. ${sectorsStr}. Expert advisory by Realty Holding & Management Consultants — Mohali's trusted real estate desk.`;

  return {
    title,
    description,
    alternates: {
      canonical: `${siteConfig.url}/properties/builders/${slug}`,
    },
    openGraph: {
      title,
      description,
      url: `${siteConfig.url}/properties/builders/${slug}`,
      type: "website",
    }
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
  const reraIds = new Set<string>();
  let dbFaqs: Array<{ question: string; answer: string }> = [];

  matchingProperties.forEach((p) => {
    if (p.price && p.price > 0) {
      if (p.price < minPrice) minPrice = p.price;
      if (p.price > maxPrice) maxPrice = p.price;
    }
    if (p.location) {
      locations.add(p.location.trim());
    }
    if (p.rera_number) {
      reraIds.add(p.rera_number.trim());
    }
    if (p.entity_type) {
      const typeStr = p.entity_type === "apartment" ? "Apartments" :
                      p.entity_type === "land" ? "Land Plots" : "Houses";
      types.add(typeStr);
    }
    if (p.faqs && Array.isArray(p.faqs)) {
      dbFaqs = [...dbFaqs, ...p.faqs];
    }
  });

  // Deduplicate and collect FAQs from database
  const uniqueFaqsMap = new Map<string, string>();
  dbFaqs.forEach((f) => {
    if (f.question && f.answer) {
      uniqueFaqsMap.set(f.question.trim(), f.answer.trim());
    }
  });
  const collectedDbFaqs = Array.from(uniqueFaqsMap.entries()).map(([q, a]) => ({ q, a })).slice(0, 5);

  const builderConfig = (buildersData.builders as any)[slug] || null;
  const commonName = builderConfig?.commonName || developerName;
  const legalName = builderConfig?.legalName || developerName;
  const founded = builderConfig?.founded || "N/A";
  const headquarters = builderConfig?.headquarters || "Mohali, Punjab";
  const reraReg = reraIds.size > 0 ? Array.from(reraIds).join(", ") : (builderConfig?.reraReg || "Verified");
  const sectorsActive = locations.size > 0 ? Array.from(locations) : (builderConfig?.sectorsActive || ["Mohali"]);
  const priceRange = minPrice !== Infinity ? `${formatIndianCurrency(minPrice)} - ${formatIndianCurrency(maxPrice)}` : (builderConfig?.priceRange || "On request");
  const buyerProfile = builderConfig?.buyerProfile || "Mid-segment to premium";
  const finalWebsite = website || builderConfig?.website || null;

  // Programmatic placeholder engine: Synthesize Section A, C1, C2, and FAQs if not specified in JSON
  const advisoryVerdict = builderConfig?.advisoryVerdict || 
    `${commonName} is a prominent real estate developer active in Mohali's ${buyerProfile.toLowerCase()} housing segments. Managing a portfolio across Sectors ${sectorsActive.join(", ")}, they specialize in ${Array.from(types).join(" and ") || "properties"} ranging from ${priceRange}. Our advisory desk recommends evaluating their verified RERA registrations (${reraReg}) and execution schedules before committing. Connect with our portfolio desk for a tailored inventory brief.`;

  const background = builderConfig?.background || {
    c1: isCoop 
      ? `${legalName} is a registered cooperative society operating under the Punjab Cooperative Societies Act. Ownership is organized through member-allocated share certificates rather than standard individual land registry deeds.`
      : `${legalName} has established a residential and commercial footprint in Mohali's growth sectors. They focus on delivering properties suited for ${buyerProfile.toLowerCase()} requirements, prioritizing layout efficiency and structural standard certifications.`,
    c2: `${commonName}'s presence is centered in Sector(s) ${sectorsActive.join(", ")} Mohali. Positioned along major transit roads like the Airport Road and commercial centers, their developments (including projects like ${matchingProperties.slice(0, 3).map(p => p.title).join(", ")}) provide high resale liquidity and connectivity to local schools.`
  };

  const advisoryBreakdown = builderConfig?.advisoryBreakdown || {
    rightFor: [
      `End-use buyers seeking a ${buyerProfile.toLowerCase()} address in Sector(s) ${sectorsActive.join(", ")}`,
      "Investors looking for robust rental yields near tech clusters and transit roads",
      "Buyers valuing verified RERA properties under transparent pricing schedules"
    ],
    lookElsewhere: [
      "Buyers seeking extremely low-density layouts with extensive private gardens",
      "Buyers looking for sub-₹40L budget options (see entry-level cooperative plots)"
    ],
    ratings: {
      delivery: 8,
      quality: 8,
      appreciation: 8,
      friendliness: 8
    }
  };

  const editorialNotes = builderConfig?.editorialNotes || {};
  const comparables = builderConfig?.comparables || [];
  
  // FAQs merging: Pull from DB first, back-fill from config if less than 5
  let faqs = collectedDbFaqs.map(f => ({ question: f.q, answer: f.a }));
  if (faqs.length < 5) {
    const configFaqs = builderConfig?.faqs || [];
    configFaqs.forEach((cf: any) => {
      if (faqs.length < 5 && !faqs.some(f => f.question.toLowerCase() === cf.q.toLowerCase())) {
        faqs.push({ question: cf.q, answer: cf.a });
      }
    });
  }

  // If still fewer than 5, backfill with default builder FAQs
  const defaultFaqs = [
    {
      question: `Is ${commonName} RERA verified in Mohali?`,
      answer: `Yes, all active projects by ${commonName} listed on our desk are registered under Punjab RERA with verified registrations: ${reraReg}.`
    },
    {
      question: `What is the price range for ${commonName} properties?`,
      answer: `Currently, verified properties by ${commonName} range from ${priceRange}.`
    },
    {
      question: `Which sectors is ${commonName} active in Mohali?`,
      answer: `${commonName} has developments concentrated in Sectors ${sectorsActive.join(", ")} of Mohali.`
    },
    {
      question: `Is ${commonName} a good choice for real estate investment?`,
      answer: `Yes, their properties in Sectors ${sectorsActive.join(", ")} benefit from high rental demand due to proximity to Chandigarh and Airport Road connectivity.`
    },
    {
      question: `How do I book a unit developed by ${commonName}?`,
      answer: `Connect with our portfolio advisory desk on this page. We work directly with sales committees and resale channels to negotiate optimal deals.`
    }
  ];

  while (faqs.length < 5) {
    const defFaq = defaultFaqs[faqs.length];
    if (!faqs.some(f => f.question.toLowerCase() === defFaq.question.toLowerCase())) {
      faqs.push(defFaq);
    }
  }

  // Load Sector Context paragraphs
  const sectorContexts = sectorsActive.map((sectorName: string) => {
    const normalized = sectorName.replace(/^Sector\s+/i, "").trim();
    const ctx = (buildersData.sectors as any)[normalized] || "";
    return ctx ? { sector: sectorName, text: ctx } : null;
  }).filter(Boolean);

  const builderData = {
    name: legalName,
    commonName,
    website: finalWebsite,
    slug,
    minPrice: minPrice === Infinity ? 0 : minPrice,
    maxPrice: maxPrice === -Infinity ? 0 : maxPrice,
    locations: sectorsActive,
    isCoop,
    propertyCount: matchingProperties.length,
    types: Array.from(types),
    founded,
    headquarters,
    reraReg,
    reraStatus: builderConfig?.reraStatus || "Verified",
    buyerProfile,
    advisoryVerdict,
    background,
    advisoryBreakdown,
    editorialNotes,
    comparables,
    faqs,
    sectorContexts
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
          { "@type": "ListItem", "position": 4, "name": commonName, "item": `${siteConfig.url}/properties/builders/${slug}` }
        ]
      },
      {
        "@type": isCoop ? "Organization" : "RealEstateAgent",
        "@id": `${siteConfig.url}/properties/builders/${slug}#organization`,
        "name": legalName,
        "url": finalWebsite || `${siteConfig.url}/properties/builders/${slug}`,
        "description": `Official inventory and verified portfolio directory of ${legalName} listings in Mohali.`,
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Mohali",
          "addressRegion": "Punjab",
          "addressCountry": "IN"
        },
        ...(isCoop ? {} : {
          "areaServed": sectorsActive.map((sec: string) => ({
            "@type": "AdministrativeArea",
            "name": `Sector ${sec}, Mohali`
          }))
        })
      },
      {
        "@type": "FAQPage",
        "mainEntity": faqs.map(faq => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer
          }
        }))
      },
      {
        "@type": "ItemList",
        "name": `Properties developed by ${legalName}`,
        "numberOfItems": matchingProperties.length,
        "itemListElement": matchingProperties.map((p, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "url": `${siteConfig.url}/properties/${p.entity_type === "house" ? "houses" : "flats"}/${p.slug}`
        }))
      }
    ]
  };

  return (
    <>
      <h1 className="sr-only">Properties by {legalName} in Mohali</h1>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BuilderProfileClient builder={builderData as any} properties={matchingProperties} />
    </>
  );
}
