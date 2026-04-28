/**
 * Property Detail Page - Lands
 */
import { createAdminClient } from "@/lib/supabase";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import {
  ChevronLeft, ChevronRight, Share2, MapPin, Check,
  Building2, ExternalLink, Images, ArrowRight,
} from "lucide-react";
import type { Property, NearbyLandmark } from "@/types";
import { AmenityIcon } from "@/components/ui/AmenityIcons";
import { enrichProperty } from "@/lib/property-utils";
import { cn } from "@/lib/utils";
import InquiryForm, { PropertyGallery } from "../../properties/[slug]/InquiryForm";
import PriceDisplay from "../../properties/[slug]/PriceDisplay";
import PropertyPriceInline from "../../properties/[slug]/PropertyPriceInline";
import PropertyDetailMapClient from "../../properties/[slug]/PropertyDetailMapClient";
import PropertyCard from "@/components/ui/PropertyCard";

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  try {
    const supabase = createAdminClient();
    const { data } = await supabase.from("lands").select("slug");
    return (data ?? []).map((p: { slug: string }) => ({ slug: p.slug }));
  } catch {
    return [];
  }
}

async function getProperty(slug: string): Promise<Property | null> {
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("properties")
      .select("*")
      .eq("slug", slug)
      .single();
    
    if (error) {
      console.error(`Error fetching land [${slug}]:`, error);
      return null;
    }
    return data as Property | null;
  } catch (err) {
    console.error(`Runtime error fetching land [${slug}]:`, err);
    return null;
  }
}

async function getRelatedProperties(property: Property): Promise<Property[]> {
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("properties")
      .select("*")
      .neq("id", property.id)
      .eq("entity_type", "lands")
      .limit(4);
    
    if (error) {
      console.error("Error fetching related lands:", error);
      return [];
    }
    return (data ?? []) as Property[];
  } catch {
    return [];
  }
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const p = await getProperty(params.slug);
  if (!p) return {};
  
  const cleanTitle = p.title.replace(/\s*\|\s*Monte Real Estate/gi, '').replace(/\s*\|\s*Realty Holding and Management Consultants/gi, '');

  return {
    title: { absolute: cleanTitle },
    description: p.meta_description || p.description?.slice(0, 160),
    openGraph: { images: p.images?.[0] ? [{ url: p.images[0] }] : [] },
    twitter: { card: 'summary_large_image', images: p.images?.[0] ? [p.images[0]] : [] },
    other: {
      thumbnail: p.images?.[0] || '/favicon.ico'
    }
  };
}

export const revalidate = 60;

export default async function LandDetailPage(props: Props) {
  const params = await props.params;
  const rawProperty = await getProperty(params.slug);
  if (!rawProperty) notFound();

  const property = enrichProperty(rawProperty);
  const related = await getRelatedProperties(property);

  const backHref = "/lands";
  const backLabel = "Lands";
  const listingLabel = "Land For Sale";

  const price = property.price;

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
              </div>
              <span className="inline-block text-[11px] text-black/40 border border-black/10 rounded px-2 py-0.5 mb-5">
                {listingLabel}
              </span>

              {/* Description */}
              <p className="text-[15px] text-black/60 leading-relaxed mb-8">{property.description}</p>

              {/* Stats (Cleaned) */}
              <div className="flex items-center gap-5 sm:gap-14 flex-wrap py-6 mb-8 border-y border-black/5">
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-black/35 mb-1.5">Total Area</p>
                  <p className="text-[17px] font-bold text-black font-display">
                    {property.area_sqft 
                      ? property.area_sqft_max && property.area_sqft_max !== property.area_sqft
                        ? `${property.area_sqft.toLocaleString()} - ${property.area_sqft_max.toLocaleString()} sqft`
                        : `${property.area_sqft.toLocaleString()} sqft`
                      : 'N/A'}
                  </p>
                </div>
                {property.type && (
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-black/35 mb-1.5">Zoning</p>
                    <p className="text-[17px] font-bold text-black font-display capitalize">{property.type}</p>
                  </div>
                )}
              </div>

              {/* Forensic Analysis (If available for lands) */}
              {(property.transfer_trap_analysis || property.lifestyle_tax_analysis) && (
                <section className="mb-16">
                  <h2 className="text-[22px] font-bold text-black mb-8 font-display">Investment Audit & Forensics</h2>
                  <div className="grid grid-cols-1 gap-8">
                    {property.transfer_trap_analysis && (
                      <div className="bg-orange-50/30 border border-orange-100 rounded-3xl p-8">
                        <h3 className="text-[11px] font-black text-orange-700 uppercase tracking-[0.2em] mb-4">Title Analysis</h3>
                        <p className="text-[15px] text-orange-900/80 leading-relaxed font-medium">{property.transfer_trap_analysis}</p>
                      </div>
                    )}
                    {property.lifestyle_tax_analysis && (
                      <div className="bg-blue-50/30 border border-blue-100 rounded-3xl p-8">
                        <h3 className="text-[11px] font-black text-blue-700 uppercase tracking-[0.2em] mb-4">Market Potential</h3>
                        <p className="text-[15px] text-blue-900/80 leading-relaxed font-medium">{property.lifestyle_tax_analysis}</p>
                      </div>
                    )}
                  </div>
                </section>
              )}

              {/* Property Highlights */}
              {(property.highlights?.length ?? 0) > 0 && (
                <section className="mb-16">
                  <h2 className="text-[22px] font-bold text-black mb-8 font-display">Land Highlights</h2>
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

              {/* Amenities (if any for land) */}
              {(property.amenities?.length ?? 0) > 0 && (
                <section className="mb-10">
                  <h2 className="text-[18px] font-bold text-black mb-6 font-display">Utilities & Amenities</h2>
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
                        <h3 className="text-[16px] font-bold text-black mb-3 group-hover:text-orange-600 transition-colors leading-tight">
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
            </div>

            {/* ── RIGHT SIDEBAR ────────────────────────────── */}
            <aside className="lg:sticky lg:top-24 transition-all">
              <div className="border border-black/10 rounded-2xl overflow-hidden bg-white shadow-sm">
                <PriceDisplay price={price} listingLabel={listingLabel} />
                
                <div className="p-6 border-b border-black/5">
                  <p className="text-sm font-bold text-black mb-4 font-display">Inquire About This Land</p>
                  <InquiryForm 
                    propertyId={property.id} 
                    propertyTitle={property.title} 
                    entityType="land"
                  />
                </div>

                <div className="p-6">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-black/35 mb-4">Assigned Advisor</p>
                  <Link href="/about" className="flex items-center gap-4 group">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-black/5 relative ring-0 group-hover:ring-2 ring-black/5 transition-all">
                      <Image src="/assets/images/leadership/amritpal.jpg" alt="Amritpal Singh" fill className="object-cover" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-black group-hover:underline">Amritpal Singh</p>
                      <p className="text-[11px] text-black/40">Founder & CEO</p>
                    </div>
                  </Link>
                </div>
              </div>
            </aside>
          </div>

          {/* ── RELATED ────────────────────────────────────── */}
          {related.length > 0 && (
            <section className="mt-20 pt-20 border-t border-black/5">
              <h2 className="text-2xl font-bold text-black mb-8 font-display">Similar Lands</h2>
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
