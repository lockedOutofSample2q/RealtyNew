import type { Metadata } from "next";
import { createAdminClient } from "@/lib/supabase";
import type { Property } from "@/types";
import { Suspense } from "react";
import PropertiesClient from "../../properties/PropertiesClient";
import { enrichProperty } from "@/lib/property-utils";
import { siteConfig } from "@/config/site";

export const revalidate = 604800; // 1 week

interface SectorPageProps {
  params: Promise<{
    sector: string;
  }>;
}

async function getSectorSeo(sectorSlug: string) {
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("sector_seo")
      .select("*")
      .eq("sector_slug", sectorSlug)
      .single();
    if (error) return null;
    return data;
  } catch {
    return null;
  }
}

function decodeSectorSlug(slug: string) {
  return slug
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

async function getSectorProperties(decodedSector: string): Promise<Property[]> {
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("apartments")
      .select("*")
      .or(`location.ilike.%${decodedSector}%,community.ilike.%${decodedSector}%`)
      .order("featured", { ascending: false })
      .order("created_at", { ascending: false });
    
    if (error) return [];
    return (data ?? []).map((p: any) => enrichProperty({ ...p, entity_type: 'apartment' })) as Property[];
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: SectorPageProps): Promise<Metadata> {
  const { sector } = await params;
  const seoData = await getSectorSeo(sector);
  const decodedSector = decodeSectorSlug(sector);

  if (seoData) {
    return {
      title: seoData.meta_title || `Flats in ${decodedSector} Mohali | Realty Consultants`,
      description: seoData.meta_description || `Explore luxury flats and apartments in ${decodedSector}, Mohali. Verified listings with price, floor plans, and amenities.`,
      alternates: {
        canonical: `/flats/${sector}`,
      },
    };
  }

  return {
    title: `Flats in ${decodedSector} Mohali | Realty Consultants`,
    description: `Explore luxury flats and apartments in ${decodedSector}, Mohali. Verified listings with price, floor plans, and amenities.`,
    alternates: {
      canonical: `/flats/${sector}`,
    },
  };
}

export async function generateStaticParams() {
  const supabase = createAdminClient();
  const { data, error } = await supabase.from("sector_seo").select("sector_slug");
  
  if (error || !data) {
    return [];
  }
  
  return data.map((item: { sector_slug: string }) => ({
    sector: item.sector_slug,
  }));
}

export default async function SectorFlatsPage({ params }: SectorPageProps) {
  const { sector } = await params;
  const decodedSector = decodeSectorSlug(sector);
  const [properties, seoData] = await Promise.all([
    getSectorProperties(decodedSector),
    getSectorSeo(sector)
  ]);

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${siteConfig.url}/flats/${sector}`,
        name: seoData?.meta_title || `Flats in ${decodedSector} Mohali | Realty Consultants`,
        description: seoData?.meta_description || `Explore luxury flats and apartments in ${decodedSector}, Mohali. Verified listings with price, floor plans, and amenities.`,
        url: `${siteConfig.url}/flats/${sector}`,
        isPartOf: {
          "@id": `${siteConfig.url}/#website`,
        },
        about: {
          "@id": `${siteConfig.url}/#organization`,
        },
      },
      {
        "@type": "ItemList",
        itemListElement: properties.map((prop, index) => ({
          "@type": "ListItem",
          position: index + 1,
          url: `${siteConfig.url}/properties/${prop.slug}`,
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: siteConfig.url,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Flats",
            item: `${siteConfig.url}/flats`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: decodedSector,
            item: `${siteConfig.url}/flats/${sector}`,
          },
        ],
      },
      ...(seoData?.faq_json ? [seoData.faq_json] : [])
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div className="container mx-auto px-4 pt-8 pb-4">
        {seoData?.h1_heading && (
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{seoData.h1_heading}</h1>
        )}
        {seoData?.intro_paragraph && (
          <p className="text-muted-foreground text-lg mb-8 max-w-4xl">{seoData.intro_paragraph}</p>
        )}
        {!seoData?.h1_heading && (
          <h1 className="text-3xl md:text-4xl font-bold mb-8">Flats in {decodedSector}</h1>
        )}
      </div>
      <Suspense fallback={null}>
        <PropertiesClient properties={properties} initialTab="flats" initialFilters={{ sector: [decodedSector] }} />
      </Suspense>
    </>
  );
}
