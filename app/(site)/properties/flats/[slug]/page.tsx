/**
 * Consolidated Sector SEO / Apartment Detail Page
 */
import { createAdminClient } from "@/lib/supabase";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import {
  ChevronLeft, ChevronRight, Share2, MapPin, Check,
  Building2, ExternalLink, Images, ArrowRight, FileText, Download
} from "lucide-react";
import type { Property, NearbyLandmark } from "@/types";
import { AmenityIcon } from "@/components/ui/AmenityIcons";
import { enrichProperty } from "@/lib/property-utils";
import { cn } from "@/lib/utils";
import InquiryForm, { PropertyGallery } from "../../[slug]/InquiryForm";
import PriceDisplay from "../../[slug]/PriceDisplay";
import PropertyPriceInline from "../../[slug]/PropertyPriceInline";
import PropertyDetailMapClient from "../../[slug]/PropertyDetailMapClient";
import PropertyCard from "@/components/ui/PropertyCard";
import PropertiesClient from "../../PropertiesClient";
import { Suspense, cache } from "react";

interface Props { params: Promise<{ slug: string }> }

// ── Cache / Memoize Supabase queries to eliminate duplicate database calls ──
const getSectorSeo = cache(async (sectorSlug: string) => {
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
});

const getProperty = cache(async (slug: string): Promise<Property | null> => {
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("apartments")
      .select("*")
      .eq("slug", slug)
      .single();
    
    if (error) {
      console.error(`Error fetching apartment [${slug}]:`, error);
      return null;
    }
    return data as Property | null;
  } catch (err) {
    console.error(`Runtime error fetching apartment [${slug}]:`, err);
    return null;
  }
});

const getRelatedProperties = cache(async (property: Property): Promise<Property[]> => {
  try {
    const supabase = createAdminClient();
    
    const isCoop = property.title.toLowerCase().includes('coop') || 
                   property.title.toLowerCase().includes('co-op') || 
                   property.title.toLowerCase().includes('society') || 
                   (property.community && property.community.toLowerCase().includes('coop')) ||
                   (property.builder && property.builder.toLowerCase().includes('coop'));

    let query = supabase
      .from("properties")
      .select("*")
      .neq("id", property.id)
      .eq("entity_type", "apartment");

    if (isCoop) {
      query = query.or('title.ilike.%coop%,title.ilike.%society%,community.ilike.%coop%,community.ilike.%society%,builder.ilike.%coop%');
    } else {
      if (property.builder) {
        query = query.ilike("builder", `%${property.builder}%`);
      }
      if (property.price) {
        const minPrice = property.price * 0.8;
        const maxPrice = property.price * 1.2;
        query = query.gte("price", minPrice).lte("price", maxPrice);
      }
    }

    const { data, error } = await query.limit(4);
    
    if (error) return [];
    
    // Fallback if no exact matches
    if (!data || data.length === 0) {
      const fallback = await supabase
        .from("properties")
        .select("*")
        .neq("id", property.id)
        .eq("entity_type", "apartment")
        .limit(4);
      return (fallback.data ?? []) as Property[];
    }
    
    return data as Property[];
  } catch {
    return [];
  }
});

const getAllFlats = cache(async (): Promise<Property[]> => {
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("apartments")
      .select("*")
      .order("featured", { ascending: false })
      .order("created_at", { ascending: false });
    
    if (error) return [];
    return (data ?? []).map((p: any) => enrichProperty({ ...p, entity_type: 'apartment' })) as Property[];
  } catch {
    return [];
  }
});

// Helper to decode sector slug for labels
function decodeSectorSlug(slug: string) {
  return slug
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export async function generateStaticParams() {
  try {
    const supabase = createAdminClient();
    const [sectorsRes, apartmentsRes] = await Promise.all([
      supabase.from("sector_seo").select("sector_slug"),
      supabase.from("apartments").select("slug")
    ]);
    
    const params = [];
    if (sectorsRes.data) {
      params.push(...sectorsRes.data.map((item: any) => ({ slug: item.sector_slug })));
    }
    if (apartmentsRes.data) {
      params.push(...apartmentsRes.data.map((item: any) => ({ slug: item.slug })));
    }
    return params;
  } catch {
    return [];
  }
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const slug = params.slug;

  // 1. Check if it is a Sector SEO page
  const seoData = await getSectorSeo(slug);
  if (seoData) {
    const decodedSector = decodeSectorSlug(slug);
    return {
      title: seoData.meta_title || `Flats in ${decodedSector} Mohali | Realty Consultants`,
      description: seoData.meta_description || `Explore luxury flats and apartments in ${decodedSector}, Mohali. Verified listings with price, floor plans, and amenities.`,
      alternates: {
        canonical: `/properties/flats/${slug}`,
      },
    };
  }

  // 2. Check if it is an Apartment detail page
  const p = await getProperty(slug);
  if (p) {
    const cleanTitle = p.title.replace(/\s*\|\s*Monte Real Estate/gi, '').replace(/\s*\|\s*Realty Holding and Management Consultants/gi, '');
    const titleStr = p.og_title || cleanTitle;
    const descStr = p.og_description || p.meta_description || p.description?.slice(0, 160);

    return {
      title: { absolute: titleStr },
      description: descStr,
      openGraph: {
        title: titleStr,
        description: descStr,
        url: `${siteConfig.url}/properties/flats/${p.slug}`,
        siteName: "Realty Holding & Management Consultants",
        type: "website",
        images: p.images?.[0] ? [{ url: p.images[0] }] : undefined,
      },
      other: {
        thumbnail: p.images?.[0] || '/favicon.ico'
      },
      alternates: {
        canonical: `${siteConfig.url}/properties/flats/${p.slug}`,
      }
    };
  }

  return {};
}

// Enable weekly caching (ISR every 7 days)
export const revalidate = 3600;

export default async function ApartmentOrSectorDetailPage(props: Props) {
  const params = await props.params;
  const slug = params.slug;

  // ── BRANCH A: Render Sector SEO page ────────────────────────
  const seoData = await getSectorSeo(slug);
  if (seoData) {
    const decodedSector = decodeSectorSlug(slug);
    const properties = await getAllFlats();
    const sectorProperties = properties.filter((p) => {
      const loc = p.location?.toLowerCase() || "";
      const com = p.community?.toLowerCase() || "";
      const sec = decodedSector.toLowerCase();
      return loc.includes(sec) || com.includes(sec);
    });

    const schema = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "CollectionPage",
          "@id": `${siteConfig.url}/properties/flats/${slug}`,
          name: seoData?.meta_title || `Flats in ${decodedSector} Mohali | Realty Consultants`,
          description: seoData?.meta_description || `Explore luxury flats and apartments in ${decodedSector}, Mohali. Verified listings with price, floor plans, and amenities.`,
          url: `${siteConfig.url}/properties/flats/${slug}`,
          isPartOf: {
            "@id": `${siteConfig.url}/#website`,
          },
          about: {
            "@id": `${siteConfig.url}/#organization`,
          },
        },
        {
          "@type": "ItemList",
          itemListElement: sectorProperties.map((prop, index) => ({
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
              item: `${siteConfig.url}/properties/flats`,
            },
            {
              "@type": "ListItem",
              position: 3,
              name: decodedSector,
              item: `${siteConfig.url}/properties/flats/${slug}`,
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
        <Suspense fallback={null}>
          <PropertiesClient 
            properties={properties} 
            initialTab="flats" 
            initialFilters={{ sector: [decodedSector] }}
            seoData={{
              h1_heading: seoData?.h1_heading || `Flats in ${decodedSector}`,
              intro_paragraph: seoData?.intro_paragraph || undefined
            }}
          />
        </Suspense>
      </>
    );
  }

  // ── BRANCH B: Render Apartment Detail page ──────────────────
  const rawProperty = await getProperty(slug);
  if (!rawProperty) {
    notFound();
  }

  const property = enrichProperty(rawProperty);
  const related = await getRelatedProperties(property);

  const backHref = "/properties/flats";
  const backLabel = "Flats";
  const listingLabel = "Apartment For Sale";

  const bedroomsDisplay =
    property.bedrooms_max && property.bedrooms_max !== property.bedrooms
      ? `${property.bedrooms}-${property.bedrooms_max}`
      : property.bedrooms === 0 ? "Studio" : String(property.bedrooms ?? "—");

  const price = property.price;

  const getAbsoluteUrl = (url?: string) => {
    if (!url) return undefined;
    return url.startsWith('http') ? url : `${siteConfig.url}${url}`;
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": siteConfig.url
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Flats",
        "item": `${siteConfig.url}/properties/flats`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": property.title,
        "item": `${siteConfig.url}/properties/flats/${property.slug}`
      }
    ]
  };

  // Generate Schema.org markup
  const propertySchema = {
    "@context": "https://schema.org",
    "@type": ["RealEstateListing", "Apartment"],
    "name": property.title,
    "description": property.meta_description || property.description,
    "url": `${siteConfig.url}/properties/flats/${property.slug}`,
    "image": (property.images || []).map(img => getAbsoluteUrl(img)),
    "address": {
      "@type": "PostalAddress",
      "streetAddress": property.address,
      "addressLocality": "Mohali",
      "addressRegion": "Punjab",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": property.latitude,
      "longitude": property.longitude
    },
    "offers": property.price_max ? {
      "@type": "AggregateOffer",
      "lowPrice": property.price,
      "highPrice": property.price_max,
      "priceCurrency": property.price_currency || "INR",
      "availability": property.status === "available" ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      "offerCount": 1,
      "url": `${siteConfig.url}/properties/flats/${property.slug}`
    } : {
      "@type": "Offer",
      "price": property.price,
      "priceCurrency": property.price_currency || "INR",
      "availability": property.status === "available" ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      "url": `${siteConfig.url}/properties/flats/${property.slug}`
    },
    "amenityFeature": [
      ...(property.nearby_landmarks || []).map(lm => ({
        "@type": "LocationFeatureSpecification",
        "name": lm.name,
        "value": `${lm.time} min by ${lm.transport}`,
        "hoursAvailable": null
      })),
      ...(property.upcoming_infrastructure || []).map(item => ({
        "@type": "LocationFeatureSpecification",
        "name": `Upcoming: ${item}`,
        "value": "Future Development",
        "hoursAvailable": null
      })),
      ...(property.amenities || []).map(amenity => ({
        "@type": "LocationFeatureSpecification",
        "name": amenity,
        "value": true,
        "hoursAvailable": null
      }))
    ],
    "subjectOf": [
      {
        "@type": "FloorPlan",
        "name": `${property.title} - Floor Plan`,
        "layoutImage": getAbsoluteUrl(property.unit_types_image || property.images?.[0]),
        "numberOfRooms": property.bedrooms,
        "floorSize": {
          "@type": "QuantitativeValue",
          "value": property.area_sqft,
          "unitText": "sq.ft"
        }
      },
      ...(property.documents || [])
        .filter(doc => doc.name.toLowerCase().includes("floor plan") || doc.name.toLowerCase().includes("site plan"))
        .map(doc => ({
          "@type": "DigitalDocument",
          "name": doc.name,
          "url": getAbsoluteUrl(doc.url),
          "fileFormat": "application/pdf"
        })),
      ...(property.videos || []).map(videoUrl => ({
        "@type": "VideoObject",
        "name": `${property.title} - Property Video`,
        "description": `Video tour of ${property.title}`,
        "thumbnailUrl": getAbsoluteUrl(property.images?.[0]),
        "contentUrl": videoUrl,
        "uploadDate": property.created_at || new Date().toISOString()
      }))
    ],
    "provider": property.developer ? {
      "@type": "Organization",
      "name": property.developer,
      "url": property.developer_website
    } : null,
    "broker": {
      "@type": "Person",
      "name": "Amritpal Singh",
      "jobTitle": "Managing Director",
      "worksFor": {
        "@type": "RealEstateAgent",
        "name": "Realty Holding and Management Consultants",
        "url": siteConfig.url
      }
    },
    "numberOfBedrooms": property.bedrooms,
    "numberOfBathrooms": property.bathrooms,
    "floorSize": {
      "@type": "QuantitativeValue",
      "value": property.area_sqft,
      "unitCode": "FTK"
    }
  };

  let faqSchema = null;
  if ((property.faqs?.length ?? 0) > 0) {
    faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": property.faqs!.map((faq) => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    };
  }

  return (
    <>
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(propertySchema) }}
      />
      <meta name="thumbnail" content={property.images?.[0] || "/favicon.ico"} />
      <main className="bg-white min-h-screen pt-[var(--nav-height)]">

        {/* ── Breadcrumb ──────────────────────────────────── */}
        <div className="border-b border-black/6">
          <div className="container-site py-3 flex items-center gap-1.5 text-[13px] text-black/40">
            <Link href={backHref} className="flex items-center gap-1 hover:text-black transition-colors">
              <ChevronLeft size={14} /> Back
            </Link>
            <ChevronRight size={12} className="text-black/20" />
            <Link href="/" className="hover:text-black transition-colors">Home</Link>
            <ChevronRight size={12} className="text-black/20" />
            <Link href={backHref} className="hover:text-black transition-colors">{backLabel}</Link>
            <ChevronRight size={12} className="text-black/20" />
            <span className="text-black/70 truncate max-w-[200px]">{property.title}</span>
            <button className="ml-auto flex items-center gap-1.5 text-[12px] border border-black/10 rounded-full px-3 py-1 hover:bg-black/5 transition-colors">
              <Share2 size={12} /> Share
            </button>
          </div>
        </div>

        {/* ── Gallery ─────────────────────────────────────── */}
        <div className="container-site">
          <PropertyGallery 
            images={property.images} 
            videos={property.videos}
            title={property.title}
            imageCountOverride={property.image_count}
          />
        </div>

        {/* ── Content ─────────────────────────────────────── */}
        <article className="container-site pb-24">
          {/* Address */}
          {property.address && (
            <p className="text-[12px] text-black/40 mb-4 flex items-center gap-1">
              <MapPin size={11} />
              {property.address}
            </p>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8 lg:gap-12 items-start">

            {/* ── LEFT CONTENT ──────────────────────────────── */}
            <div>
              {/* Title row */}
              <div className="flex flex-col sm:flex-row items-start justify-between gap-4 mb-3">
                <h1 className="text-[clamp(1.8rem,3vw,2.6rem)] font-bold text-black leading-tight tracking-tight font-display">
                  {property.title}
                </h1>
                {property.developer && (
                  <div className="flex items-center gap-3 bg-black/[0.03] border border-black/5 rounded-2xl p-2 pr-4 mt-1">
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center p-1.5 shadow-sm">
                      <Building2 size={24} className="text-black/20" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] text-black/35 font-medium uppercase tracking-wider leading-none mb-0.5">Developed by</span>
                      <span className="text-[14px] font-bold text-black leading-none font-display">{property.developer}</span>
                    </div>
                  </div>
                )}
              </div>
              <span className="inline-block text-[11px] text-black/40 border border-black/10 rounded px-2 py-0.5 mb-5">
                {listingLabel}
              </span>

              {/* Description (Multi-paragraph support) */}
              <div className="space-y-4 mb-8">
                {property.description?.split('\n').map((para, i) => (
                  para.trim() && (
                    <p key={i} className="text-[15px] text-black/60 leading-relaxed">
                      {para.trim()}
                    </p>
                  )
                ))}
              </div>

              {/* Stats (Cleaned) */}
              <div className="flex items-center gap-5 sm:gap-14 flex-wrap py-6 mb-8 border-y border-black/5">
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-black/35 mb-1.5 font-bold">Size</p>
                  <p className="text-[17px] font-bold text-black font-display">
                    {property.area_sqft 
                      ? property.area_sqft_max && property.area_sqft_max !== property.area_sqft
                        ? `${property.area_sqft.toLocaleString()} - ${property.area_sqft_max.toLocaleString()} sqft`
                        : `${property.area_sqft.toLocaleString()} sqft`
                      : 'N/A'}
                  </p>
                </div>
                {property.bedrooms !== null && (
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-black/35 mb-1.5 font-bold">Bedrooms</p>
                    <p className="text-[17px] font-bold text-black font-display">{bedroomsDisplay}</p>
                  </div>
                )}
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-black/35 mb-1.5 font-bold">Bathrooms</p>
                  <p className="text-[17px] font-bold text-black font-display">
                    {property.bathrooms}
                    {property.bathrooms_max && property.bathrooms_max !== property.bathrooms && ` - ${property.bathrooms_max}`}
                  </p>
                </div>
                {property.tower_count && (
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-black/35 mb-1.5 font-bold">Towers</p>
                    <p className="text-[17px] font-bold text-black font-display">{property.tower_count}</p>
                  </div>
                )}
              </div>

              {/* Forensic Analysis */}
              {(property.transfer_trap_analysis || property.lifestyle_tax_analysis) && (
                <section className="mb-16">
                  <h2 className="text-[22px] font-bold text-black mb-8 font-display">Structural Audit & Forensics</h2>
                  <div className="grid grid-cols-1 gap-8">
                    {property.transfer_trap_analysis && (
                      <div className="bg-orange-50/30 border border-orange-100 rounded-3xl p-8">
                        <h3 className="text-[11px] font-black text-orange-700 uppercase tracking-[0.2em] mb-4">The Transfer Trap</h3>
                        <p className="text-[15px] text-orange-900/80 leading-relaxed font-medium">{property.transfer_trap_analysis}</p>
                      </div>
                    )}
                    {property.lifestyle_tax_analysis && (
                      <div className="bg-blue-50/30 border border-blue-100 rounded-3xl p-8">
                        <h3 className="text-[11px] font-black text-blue-700 uppercase tracking-[0.2em] mb-4">The Lifestyle Tax</h3>
                        <p className="text-[15px] text-blue-900/80 leading-relaxed font-medium">{property.lifestyle_tax_analysis}</p>
                        {property.maintenance_fee_psft && (
                          <div className="mt-6 pt-6 border-t border-blue-100 flex items-center justify-between">
                            <span className="text-[11px] font-bold text-blue-700 uppercase tracking-widest">Est. Maintenance</span>
                            <span className="text-[18px] font-bold text-blue-900">₹{property.maintenance_fee_psft} / sq. ft.</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </section>
              )}

              {/* Project Highlights */}
              {(property.highlights?.length ?? 0) > 0 && (
                <section className="mb-16">
                  <div className="flex items-baseline justify-between mb-8">
                    <h2 className="text-[22px] font-bold text-black font-display">Project Highlights</h2>
                    {(property.tower_count || property.floor_count) && (
                      <span className="text-[12px] text-black/40 font-medium">
                        {property.tower_count ? `${property.tower_count} Towers` : ''}
                        {property.tower_count && property.floor_count ? ' • ' : ''}
                        {property.floor_count ? `${property.floor_count} Floors` : ''}
                      </span>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-5">
                    {property.highlights!.map((h) => (
                      <div key={h} className="flex items-start gap-4">
                        <span className="text-black text-sm mt-0.5 opacity-60">✓</span>
                        <span className="text-[15px] text-black/70 leading-snug">{h}</span>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Unit Types & Sizes */}
              {(property.unit_types?.length ?? 0) > 0 && (
                <section className="mb-16">
                  <div className="flex items-center justify-between mb-10">
                    <h2 className="text-[22px] font-bold text-black font-display">Unit Types & Sizes</h2>
                    <div className="flex bg-black/[0.04] p-1 rounded-xl">
                      <button className="px-4 py-1.5 text-[11px] font-bold rounded-lg bg-white shadow-sm text-black uppercase tracking-wider">sqft</button>
                      <button className="px-4 py-1.5 text-[11px] font-bold text-black/30 uppercase tracking-wider">m²</button>
                    </div>
                  </div>
                  <div className="space-y-0">
                    {property.unit_types!.map((unit, idx) => (
                      <div key={idx} className={cn(
                        "flex items-center justify-between py-6 transition-colors hover:bg-black/[0.01]",
                        idx !== property.unit_types!.length - 1 && "border-b border-black/[0.06]"
                      )}>
                        <div className="flex items-center gap-6">
                          <span className="text-[17px] font-bold text-black font-display">{unit.bhk}</span>
                          {unit.type_count && (
                            <span className="text-[11px] font-bold text-black/30 bg-black/[0.04] px-3 py-1 rounded-full uppercase tracking-wider">
                              {unit.type_count} Types
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-[17px] font-bold text-black font-display">
                            {unit.size_min.toLocaleString()} 
                            {unit.size_max && unit.size_max !== unit.size_min && ` – ${unit.size_max.toLocaleString()}`}
                          </span>
                          <span className="text-[15px] text-black/30">sqft</span>
                          <ChevronRight size={18} className="text-black/10 ml-4" />
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Amenities */}
              {(property.amenities?.length ?? 0) > 0 && (
                <section className="mb-10">
                  <h2 className="text-[18px] font-bold text-black mb-6 font-display">Amenities</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-4">
                    {property.amenities!.map((a) => (
                      <div key={a} className="flex items-center gap-2.5">
                        <AmenityIcon name={a} />
                        <span className="text-[13px] text-black/65">{a}</span>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Map & Landmarks */}
              <section className="mt-14">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="flex flex-col">
                    <h2 className="text-[18px] font-bold text-black mb-5 font-display">Location</h2>
                    <div className="flex-1 min-h-[300px] rounded-2xl overflow-hidden border border-black/8 shadow-sm">
                      {property.latitude && property.longitude ? (
                        <PropertyDetailMapClient
                          lat={property.latitude}
                          lng={property.longitude}
                          title={property.title}
                        />
                      ) : (
                        <div className="w-full h-full bg-black/5 flex items-center justify-center text-black/20 text-sm">Map Unavailable</div>
                      )}
                    </div>
                  </div>

                  {property.nearby_landmarks && property.nearby_landmarks.length > 0 && (
                    <div className="flex flex-col">
                      <h2 className="text-[18px] font-bold text-black mb-5 font-display">Nearby Landmarks</h2>
                      <div className="grid grid-cols-2 lg:grid-cols-3 border border-black/5 rounded-2xl overflow-hidden bg-[#FBFBFB]">
                        {property.nearby_landmarks.map((lm, i) => (
                          <div key={lm.name} className={cn(
                            "p-6 text-left border-black/5 transition-all hover:bg-white group",
                            i % 3 !== 2 ? "lg:border-r" : "",
                            i < 3 ? "lg:border-b" : "",
                            i % 2 !== 1 ? "max-lg:border-r" : "",
                            i < 4 ? "max-lg:border-b" : ""
                          )}>
                            <p className="text-[12px] font-medium text-black/50 mb-3 group-hover:text-black transition-colors leading-tight min-h-[32px]">
                              {lm.name}
                            </p>
                            <div className="flex items-baseline gap-1 mb-2">
                              <p className="text-[32px] font-bold text-black leading-none font-display tabular-nums">
                                {lm.time}
                              </p>
                              <p className="text-[12px] font-bold text-black">min</p>
                            </div>
                            <p className="text-[10px] uppercase tracking-[0.1em] text-black/30 font-bold">
                              BY {lm.transport.toUpperCase()}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </section>

              {/* Investment FAQ */}
              {(property.faqs?.length ?? 0) > 0 && (
                <section className="mt-14 pt-14 border-t border-black/5">
                  <h2 className="text-[22px] font-bold text-black mb-8 font-display">Investment FAQ</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                    {property.faqs!.map((faq, i) => (
                      <div key={i} className="group">
                        <h3 className="text-[16px] font-bold text-black mb-3 group-hover:text-orange-600 transition-colors leading-tight font-display">
                          {faq.question}
                        </h3>
                        <p className="text-black/60 text-[14px] leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Project Assets & Documents */}
              {(property.documents?.length ?? 0) > 0 && (
                <section className="mt-14 pt-14 border-t border-black/5">
                  <h2 className="text-[22px] font-bold text-black mb-8 font-display">Project Assets & Documents</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {property.documents!.map((doc, i) => (
                      <a 
                        key={i} 
                        href={doc.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-5 bg-black/[0.02] border border-black/5 rounded-2xl hover:bg-black/[0.04] transition-all group"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm border border-black/5">
                            <FileText size={20} className="text-black/40 group-hover:text-black transition-colors" />
                          </div>
                          <div>
                            <p className="text-[14px] font-bold text-black font-display">{doc.name}</p>
                            <p className="text-[11px] text-black/30 uppercase tracking-widest font-bold">PDF Document</p>
                          </div>
                        </div>
                        <Download size={18} className="text-black/20 group-hover:text-black transition-colors" />
                      </a>
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* ── RIGHT SIDEBAR ────────────────────────────── */}
            <aside className="lg:sticky lg:top-[max(2rem,calc(50vh-380px))] transition-all">
              <div className="border border-black/10 rounded-2xl overflow-hidden bg-white shadow-sm">
                <PriceDisplay price={price} price_max={property.price_max} listingLabel={listingLabel} />
                
                <div className="p-6 border-b border-black/5">
                  <p className="text-sm font-bold text-black mb-4 font-display">Inquire About This Property</p>
                  <InquiryForm 
                    propertyId={property.id} 
                    propertyTitle={property.title} 
                    entityType="apartment"
                  />
                </div>

                <div className="p-6">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-black/35 mb-4">Assigned Advisor</p>
                  <Link href="/about" className="flex items-center gap-4 group">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-black/5 relative ring-0 group-hover:ring-2 ring-black/5 transition-all">
                      <Image src="/assets/images/leadership/amritpal.jpg" alt="Amritpal Singh" fill className="object-cover" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-black group-hover:underline font-display">Amritpal Singh</p>
                      <p className="text-[11px] text-black/40">MD</p>
                    </div>
                  </Link>
                </div>
              </div>
            </aside>
          </div>

          {/* ── RELATED ────────────────────────────────────── */}
          {related.length > 0 && (
            <section className="mt-20 pt-20 border-t border-black/5">
              <h2 className="text-2xl font-bold text-black mb-8 font-display">Similar Apartments</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {related.map((p) => (
                  <PropertyCard key={p.id} property={enrichProperty(p)} />
                ))}
              </div>
            </section>
          )}
        </article>
      </main>
    </>
  );
}
