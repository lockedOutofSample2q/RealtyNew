/**
 * Property Detail Page
 * Context File: /content/properties/[slug].md
 */
import { createAdminClient } from "@/lib/supabase";

import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import type { Metadata } from "next";
import {
  ChevronLeft, ChevronRight, Share2, MapPin, Check,
  Waves, Dumbbell, Flame, Activity, Droplets, Users,
  Car, Leaf, Building2, Target, Thermometer, Briefcase,
  Film, Bell, Shield, ExternalLink, Images, ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { Property, NearbyLandmark } from "@/types";
import InquiryForm, { PropertyGallery } from "./InquiryForm";
import PriceDisplay from "./PriceDisplay";
import PropertyPriceInline from "./PropertyPriceInline";
import PropertyDetailMapClient from "./PropertyDetailMapClient";
import PropertyCard from "@/components/ui/PropertyCard";
import { AmenityIcon } from "@/components/ui/AmenityIcons";

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  try {
    const supabase = createAdminClient();
    const { data } = await supabase.from("properties").select("slug");
    return (data ?? []).map((p: { slug: string }) => ({ slug: p.slug }));
  } catch {
    return [];
  }
}

async function getProperty(slug: string): Promise<Property | null> {
  try {
    const supabase = createAdminClient();
    
    // 1. Fetch from properties view/table (primary source)
    const { data: property, error } = await supabase
      .from("properties")
      .select("*")
      .eq("slug", slug)
      .single();
    
    if (error || !property) {
      if (error) console.error(`Error fetching property [${slug}]:`, error);
      return null;
    }

    // 2. If it's an apartment, enrich with data from apartments table
    if (property.type === 'apartment' || property.entity_type === 'apartment') {
      const { data: aptData } = await supabase
        .from("apartments")
        .select("*")
        .eq("slug", slug)
        .single();
      
      if (aptData) {
        return { ...property, ...aptData } as Property;
      }
    }

    return property as Property | null;
  } catch (err) {
    console.error(`Runtime error fetching property [${slug}]:`, err);
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
      .or(`community.eq."${property.community}",type.eq."${property.type}"`)
      .limit(4);
    
    if (error) {
      console.error("Error fetching related properties:", error);
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
  return {
    title: `${p.title} | Monte Real Estate`,
    description: p.description?.slice(0, 160),
    openGraph: { images: p.images?.[0] ? [{ url: p.images[0] }] : [] },
  };
}

export const revalidate = 60;

// Icon component is now imported from @/components/ui/AmenityIcons

// ── Transport label ───────────────────────────────────────────
function transportLabel(t: NearbyLandmark["transport"]) {
  return { car: "BY CAR", walk: "BY WALK", metro: "BY METRO", bus: "BY BUS" }[t];
}

// ── Progress bar ──────────────────────────────────────────────
function PaymentBar({ pct }: { pct: number }) {
  return (
    <div className="h-[3px] bg-black/10 rounded-full w-full mt-2">
      <div className="h-full bg-black rounded-full transition-all" style={{ width: `${Math.min(pct, 100)}%` }} />
    </div>
  );
}

import { enrichProperty } from "@/lib/property-utils";

export default async function PropertyDetailPage(props: Props) {
  const params = await props.params;
  const rawProperty = await getProperty(params.slug);
  if (!rawProperty) notFound();

  const property = enrichProperty(rawProperty);
  const related = await getRelatedProperties(property);

  const backHref = property.listing_type === "lands" ? "/lands" : "/properties";
  const backLabel = property.listing_type === "lands" ? "Lands" : "Properties";
  const listingLabel =
    property.listing_type === "properties" ? "Properties For Sale" :
    property.listing_type === "lands" ? "Lands For Sale" : "For Sale";

  const bedroomsDisplay =
    property.bedrooms_max && property.bedrooms_max !== property.bedrooms
      ? `${property.bedrooms}-${property.bedrooms_max}`
      : property.bedrooms === 0 ? "Studio" : String(property.bedrooms ?? "—");

  const price = property.price;

  return (
    <div className="bg-white min-h-screen pt-[var(--nav-height)]">

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

      {/* ── Gallery (Now Interactive) ──────────────────── */}
      <div className="container-site">
        <PropertyGallery 
          images={property.images} 
          videos={property.videos}
          title={property.title}
          imageCountOverride={property.image_count}
        />
      </div>

      {/* ── Content ─────────────────────────────────────── */}
      <div className="container-site pb-24">
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

            {/* Description */}
            <p className="text-[15px] text-black/60 leading-relaxed mb-8">{property.description}</p>

            {/* Stats */}
            <div className="flex items-center gap-5 sm:gap-10 flex-wrap border-y border-black/8 py-6 mb-8">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-black/35 mb-1 font-bold">Size</p>
                <p className="text-[17px] font-bold text-black font-display">{property.area_sqft ? `${property.area_sqft.toLocaleString()} sqft` : 'N/A'}</p>
              </div>
              {property.bedrooms !== null && (
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-black/35 mb-1 font-bold">Bedrooms</p>
                  <p className="text-[17px] font-bold text-black font-display">{bedroomsDisplay}</p>
                </div>
              )}
              <div>
                <p className="text-[10px] uppercase tracking-widest text-black/35 mb-1 font-bold">Bathrooms</p>
                <p className="text-[17px] font-bold text-black font-display">{property.bathrooms}</p>
              </div>
              {property.rera_number && (
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-black/35 mb-1 font-bold">RERA No.</p>
                  <p className="text-[14px] font-bold text-black font-display">{property.rera_number}</p>
                </div>
              )}
            </div>

            {/* Timeline / Status / Forensics */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-y-8 gap-x-12 mb-10 pb-8 border-b border-black/8">
              <div className="flex flex-col">
                <span className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-orange-500 font-bold mb-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                  {property.status === 'off-plan' ? 'Under Construction' : property.status}
                </span>
                <p className="text-[14px] font-bold text-black font-display">Development</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-black/35 mb-1 font-bold">Completion</p>
                <p className="text-[14px] font-bold text-black font-display">{property.completion_date || 'TBA'}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-black/35 mb-1 font-bold">Handover</p>
                <p className="text-[14px] font-bold text-black font-display">{property.handover_date || property.completion_date || 'TBA'}</p>
              </div>
              {(property.tower_count || property.floor_count) && (
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-black/35 mb-1 font-bold">Scale</p>
                  <p className="text-[14px] font-bold text-black font-display">
                    {property.tower_count ? `${property.tower_count} Towers` : ''}
                    {property.tower_count && property.floor_count ? ', ' : ''}
                    {property.floor_count ? `${property.floor_count} Floors` : ''}
                  </p>
                </div>
              )}
            </div>

            {/* Project Highlights */}
            {(property.highlights?.length ?? 0) > 0 && (
              <section className="mb-12">
                <div className="flex items-baseline justify-between mb-6">
                  <h2 className="text-[20px] font-bold text-black font-display">Project Highlights</h2>
                  {(property.tower_count || property.floor_count) && (
                    <span className="text-[12px] text-black/40 font-medium">
                      {property.tower_count ? `${property.tower_count} Towers` : ''}
                      {property.tower_count && property.floor_count ? ' • ' : ''}
                      {property.floor_count ? `${property.floor_count} Floors` : ''}
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {property.highlights!.map((h) => (
                    <div key={h} className="flex items-center gap-3 bg-black/[0.02] border border-black/5 rounded-xl p-4 transition-colors hover:bg-black/[0.04]">
                      <div className="w-8 h-8 rounded-full bg-black/5 flex items-center justify-center shrink-0">
                        <Check size={14} className="text-black" />
                      </div>
                      <span className="text-[14px] text-black/75 font-medium leading-tight">{h}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Off Plan Details */}
            {(property.type || property.building_name || (property.interior_features?.length ?? 0) > 0) && (
              <section className="mb-10">
                <h2 className="text-[18px] font-bold text-black mb-5 font-display">Off Plan Details</h2>
                <div className="border border-black/8 rounded-2xl p-6">
                  <div className="grid grid-cols-2 gap-6 mb-5">
                    {property.type && (
                      <div>
                        <p className="text-[10px] uppercase tracking-widest text-black/35 mb-1.5">Type</p>
                        <p className="text-[14px] font-semibold text-black capitalize">{property.type}</p>
                      </div>
                    )}
                    {property.building_name && (
                      <div>
                        <p className="text-[10px] uppercase tracking-widest text-black/35 mb-1.5">Building</p>
                        <p className="text-[14px] font-semibold text-black">{property.building_name}</p>
                      </div>
                    )}
                  </div>
                  {(property.interior_features?.length ?? 0) > 0 && (
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-black/35 mb-1.5">Interior</p>
                      <p className="text-[13px] text-black/65 leading-relaxed">
                        {property.interior_features!.join(", ")}
                      </p>
                    </div>
                  )}
                </div>
              </section>
            )}

            {/* Community Amenities */}
            {(property.amenities?.length ?? 0) > 0 && (
              <section className="mb-10">
                <h2 className="text-[18px] font-bold text-black mb-6 font-display">Community Amenities</h2>
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

            {/* Community Amenities Gallery */}
            {(property.amenities_gallery?.length ?? 0) > 0 && (
              <section className="mb-10">
                <h2 className="text-[18px] font-bold text-black mb-5 font-display">Community Amenities Gallery</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {property.amenities_gallery!.map((src, i) => (
                    <div key={i} className="relative aspect-square rounded-2xl overflow-hidden bg-black/5">
                      <Image src={src} alt={`Amenity ${i + 1}`} fill className="object-cover" />
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* ── TECHNICAL OVERVIEW (Redesigned) ───────────────── */}
            {(property.payment_plan || property.unit_types_image || (property.documents?.length ?? 0) > 0) && (
              <section className="mb-14">
                <h2 className="text-[18px] font-bold text-black mb-6 font-display">Property Overview</h2>
                
                <div className="flex flex-col gap-5">
                  {/* Row 1: Payment Plan & Unit Types */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* 1. Payment Plan */}
                    {property.payment_plan && (
                      <div className="bg-white border border-black/8 rounded-[24px] p-8 flex flex-col justify-between min-h-[440px]">
                        <div>
                          <h3 className="text-[17px] font-bold text-black mb-8 font-display">Payment Plan</h3>

                          <div className="grid grid-cols-2 gap-y-10 gap-x-6">
                            <div>
                              <p className="text-[10px] uppercase tracking-widest text-black/35 font-bold mb-1">Down Payment</p>
                              <p className="text-[34px] font-bold text-black leading-none font-display">{property.payment_plan.down_payment}%</p>
                              <p className="text-[12px] text-black/40 mt-1.5">Upon booking</p>
                            </div>
                            <div>
                              <p className="text-[10px] uppercase tracking-widest text-black/35 font-bold mb-1">During Construction</p>
                              <p className="text-[34px] font-bold text-black leading-none font-display">{property.payment_plan.during_construction}%</p>
                              <p className="text-[12px] text-black/40 mt-1.5">In installments</p>
                            </div>
                            <div className="col-span-2">
                               <div className="h-[1px] bg-black/5 w-full my-2" />
                              <p className="text-[10px] uppercase tracking-widest text-black/35 font-bold mb-1">On Handover</p>
                              <p className="text-[34px] font-bold text-black leading-none font-display">{property.payment_plan.on_handover}%</p>
                              <p className="text-[12px] text-black/40 mt-1.5">Final payment</p>
                            </div>
                          </div>
                        </div>

                        <div className="border-t border-black/8 pt-6 mt-8">
                          <p className="text-[10px] uppercase tracking-widest text-black/35 font-bold mb-1">Total Investment</p>
                          <PropertyPriceInline price={price} className="text-[20px] font-bold text-black font-display" />
                        </div>
                      </div>
                    )}

                    {/* 2. Unit Types & Sizes */}
                    <div className="relative rounded-[24px] overflow-hidden min-h-[440px] group cursor-pointer">
                      <Image
                        src={property.unit_types_image || property.images?.[0] || "/assets/images/home/about.jpg"}
                        alt="Unit Types & Sizes"
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/20" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-8">
                        <p className="text-white font-bold text-[24px] mb-3 leading-tight font-display">Unit Types & Sizes</p>
                        <span className="inline-flex items-center gap-2 text-[11px] bg-white/20 backdrop-blur-md text-white border border-white/30 font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
                          {property.unit_types_coming_soon ? 'AVAILABLE ON REQUEST' : 'VIEW DETAILS'}
                        </span>
                      </div>
                      {/* Icon corner */}
                      <div className="absolute bottom-8 right-8 w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
                         <Images size={20} className="text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Row 2: Resources (Same Line, Healthy Space) */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {[
                      { name: "Floor Plan Download", status: "AVAILABLE", href: "#" },
                      { name: "Documents & Brochure", status: "DOWNLOAD NOW", href: "#" },
                      { name: "Technical Specifications", status: "VIEW PDF", href: "#" }
                    ].map((doc, idx) => (
                      <div
                        key={idx}
                        className="bg-white border border-black/8 rounded-[24px] p-8 flex items-center justify-between group hover:border-black/20 transition-all cursor-pointer min-h-[140px]"
                      >
                        <div className="flex flex-col gap-1.5">
                          <span className="text-[17px] font-bold text-black/80 group-hover:text-black transition-colors font-display leading-tight">{doc.name}</span>
                          <span className="text-[10px] text-black/30 font-bold tracking-widest">{doc.status}</span>
                        </div>
                        <div className="w-11 h-11 rounded-full border border-black/5 flex items-center justify-center text-black/20 group-hover:text-black group-hover:border-black/10 transition-all shrink-0 ml-4">
                          <ArrowRight size={20} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )}

            <section className="mb-14">
              <div className="grid grid-cols-1 md:grid-cols-[1fr_minmax(300px,420px)] gap-8 md:gap-10">
                <div className="flex flex-col">
                  <h2 className="text-[18px] font-bold text-black mb-5 font-display">Location</h2>
                  <div className="flex-1 min-h-[340px] rounded-[32px] overflow-hidden border border-black/8 shadow-sm">
                    {property.latitude && property.longitude ? (
                        <PropertyDetailMapClient
                        lat={property.latitude}
                        lng={property.longitude}
                        title={property.title}
                      />
                    ) : (
                      <div className="w-full h-full bg-[#f8f8f8] flex items-center justify-center">
                        <p className="text-[13px] text-black/30">Map coordinates missing</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Nearby Landmarks */}
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

            {/* ── INVESTMENT FAQ ───────────────────────────────── */}
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
            {(property.upcoming_infrastructure?.length ?? 0) > 0 && (
              <section className="mt-14 pt-14 border-t border-black/5">
                <h2 className="text-[18px] font-bold text-black mb-8 font-display">Upcoming Infrastructure & Projects</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {property.upcoming_infrastructure!.map((item, i) => (
                    <div key={i} className="flex items-start gap-4 p-6 bg-[#FBFBFB] border border-black/[0.03] rounded-[24px]">
                      <div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center shrink-0">
                         <Building2 size={18} className="text-black/40" />
                      </div>
                      <div>
                        <p className="text-black font-semibold text-[15px] mb-1">{item}</p>
                        <p className="text-black/40 text-[13px] leading-relaxed">Future development set to enhance connectivity and community value in this area.</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* ── RIGHT STICKY SIDEBAR ──────────────────────── */}
          <aside className="order-first lg:order-last lg:sticky lg:top-24">
            <div className="border border-black/10 rounded-2xl overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.06)] bg-white">

              {/* Price */}
              <PriceDisplay price={price} listingLabel={listingLabel} />

              {/* Inquiry Form */}
              <div className="p-5 border-b border-black/8">
                <p className="text-[13px] font-semibold text-black mb-4">Request Information</p>
                <InquiryForm 
                  propertyId={property.id} 
                  propertyTitle={property.title} 
                  entityType={property.entity_type}
                />
              </div>

              {/* Agent */}
              <div className="p-5 border-b border-black/8">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-black/35">Contact Agent</p>
                  <p className="text-[9px] uppercase tracking-widest text-black/25 text-right max-w-[150px]">Realty Holding and Management Consultants</p>
                </div>
                <div className="flex items-start gap-4">
                  <Link href="/about" className="relative w-14 h-14 rounded-full overflow-hidden bg-black/5 shrink-0 border border-black/5 group hover:ring-2 ring-black/5 transition-all">
                    <Image 
                      src="/assets/images/leadership/amritpal.jpg" 
                      alt="Amritpal Singh" 
                      fill 
                      className="object-cover" 
                    />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <Link href="/about" className="block group">
                      <p className="text-[15px] font-bold text-black leading-tight mb-0.5 group-hover:underline">Amritpal Singh</p>
                      <p className="text-[12px] text-black/45 mb-3 font-medium">Founder & CEO</p>
                    </Link>
                    
                    <div className="space-y-1.5">
                      <a href="mailto:hello@realtyconsultants.in" className="flex items-center gap-2 text-[13px] text-black/60 hover:text-black transition-colors bg-black/[0.03] px-3 py-2 rounded-lg group">
                        <span className="truncate">hello@realtyconsultants.in</span>
                      </a>
                      <a href="tel:+917814613916" className="flex items-center gap-2 text-[13px] text-black/60 hover:text-black transition-colors bg-black/[0.03] px-3 py-2 rounded-lg">
                        <span className="font-semibold">+91 78146 13916</span>
                      </a>
                    </div>

                    <div className="mt-4 flex items-center gap-2 flex-wrap">
                      <span className="text-[9px] text-black/30 uppercase tracking-wider font-bold">Languages</span>
                      {["English", "Punjabi", "Hindi"].map((l) => (
                        <span key={l} className="text-[10px] bg-black/5 px-2 py-0.5 rounded-md text-black/60 font-medium">
                          {l}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Developer */}
              {property.developer && (
                <div className="p-5">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-black/35 mb-3">Developer</p>
                  <div className="border border-black/10 rounded-xl px-4 py-2 mb-3">
                    <p className="text-[13px] font-bold text-black/60 uppercase tracking-widest text-center">
                      {property.developer}
                    </p>
                  </div>
                  <p className="text-[14px] font-semibold text-black mb-1">{property.developer}</p>
                  {property.developer_website && (
                    <Link
                      href={property.developer_website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-[12px] text-black/50 hover:text-black transition-colors"
                    >
                      Visit Website <ExternalLink size={11} />
                    </Link>
                  )}
                </div>
              )}

            </div>
          </aside>

        </div>

        {/* ── RELATED PROPERTIES ────────────────────────── */}
        {related.length > 0 && (
          <section className="mt-24 pt-24 border-t border-black/5">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="text-[24px] md:text-[32px] font-bold text-black tracking-tight font-display">Similar Properties</h2>
                <p className="text-black/40 text-[14px] mt-1">Discover other exceptional opportunities in {property.community}.</p>
              </div>
              <Link href={backHref} className="hidden md:flex items-center gap-2 text-[14px] font-semibold text-black hover:gap-3 transition-all">
                View all {backLabel} <ArrowRight size={16} />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>

            <div className="mt-10 md:hidden">
              <Link href={backHref} className="flex items-center justify-center gap-2 text-[14px] font-semibold text-black border border-black/10 rounded-xl py-4">
                View all {backLabel} <ArrowRight size={16} />
              </Link>
            </div>
          </section>
        )}

      </div>
    </div>
  );
}
