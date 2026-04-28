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
import InquiryForm, { PropertyGallery } from "../../properties/[slug]/InquiryForm";
import PriceDisplay from "../../properties/[slug]/PriceDisplay";
import PropertyPriceInline from "../../properties/[slug]/PropertyPriceInline";
import PropertyDetailMapClient from "../../properties/[slug]/PropertyDetailMapClient";
import PropertyCard from "@/components/ui/PropertyCard";

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  try {
    const supabase = createAdminClient();
    const { data } = await supabase.from("houses").select("slug");
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
      console.error(`Error fetching house [${slug}]:`, error);
      return null;
    }
    return data as Property | null;
  } catch (err) {
    console.error(`Runtime error fetching house [${slug}]:`, err);
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
      .eq("entity_type", "house")
      .or(`community.eq."${property.community}",type.eq."${property.type}"`)
      .limit(4);
    
    if (error) {
      console.error("Error fetching related houses:", error);
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
  
  // Strip any existing brand names from the DB title so they don't get double-appended
  const cleanTitle = p.title.replace(/\s*\|\s*Monte Real Estate/gi, '').replace(/\s*\|\s*Realty Holding and Management Consultants/gi, '');

  return {
    title: { absolute: cleanTitle },
    description: p.meta_description || p.description?.slice(0, 160),
    openGraph: { images: p.images?.[0] ? [{ url: p.images[0] }] : [] },
    twitter: { card: 'summary_large_image', images: p.images?.[0] ? [p.images[0]] : [] },
    icons: { icon: p.images?.[0] || '/favicon.ico', apple: p.images?.[0] || '/favicon.ico' },
    other: {
      thumbnail: p.images?.[0] || '/favicon.ico'
    }
  };
}

export const revalidate = 60;

// ── Amenity icon lookup ───────────────────────────────────────
const AMENITY_ICON_MAP: Record<string, React.ElementType> = {
  pool: Waves, "swimming pool": Waves, "infinity pool": Waves,
  gym: Dumbbell, fitness: Dumbbell,
  spa: Bell, concierge: Bell,
  "bbq": Flame, "bbq area": Flame,
  jogging: Activity, "jogging track": Activity, "running track": Activity,
  "kids pool": Droplets, "kids' pool": Droplets, "dedicated kids' pool": Droplets,
  "function room": Users,
  parking: Car, "covered parking": Car, "valet parking": Car,
  garden: Leaf, nature: Leaf,
  "beach access": Waves, beach: Waves, "lagoon access": Waves,
  "rooftop": Building2, "rooftop terrace": Building2,
  tennis: Target, "tennis court": Target,
  sauna: Thermometer,
  "business center": Briefcase,
  cinema: Film, "cinema room": Film,
  security: Shield,
};

function AmenityIcon({ name }: { name: string }) {
  const Icon = AMENITY_ICON_MAP[name.toLowerCase()] ?? Check;
  return <Icon size={16} strokeWidth={1.5} className="text-black/50 shrink-0" />;
}

// ── Transport label ───────────────────────────────────────────
function transportLabel(t: NearbyLandmark["transport"]) {
  return { car: "BY CAR", walk: "BY WALK", metro: "BY METRO", bus: "BY BUS" }[t];
}

import { enrichProperty } from "@/lib/property-utils";

export default async function HouseDetailPage(props: Props) {
  const params = await props.params;
  const rawProperty = await getProperty(params.slug);
  if (!rawProperty) notFound();

  const property = enrichProperty(rawProperty);
  const related = await getRelatedProperties(property);

  const backHref = "/houses";
  const backLabel = "Houses";
  const listingLabel = "House For Sale";

  const bedroomsDisplay =
    property.bedrooms_max && property.bedrooms_max !== property.bedrooms
      ? `${property.bedrooms}-${property.bedrooms_max}`
      : property.bedrooms === 0 ? "Studio" : String(property.bedrooms ?? "—");

  const price = property.price;

  
  // Generate FAQ Schema
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
        
        <script type="application/ld+json"
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
            <div className="flex items-start justify-between gap-4 mb-3">
              <h1 className="text-[clamp(1.8rem,3vw,2.6rem)] font-bold text-black leading-tight tracking-tight">
                {property.title}
              </h1>
              {property.developer && (
                <div className="flex items-center gap-3 bg-black/[0.03] border border-black/5 rounded-2xl p-2 pr-4 mt-1">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center p-1.5 shadow-sm">
                    <Building2 size={24} className="text-black/20" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-black/35 font-medium uppercase tracking-wider leading-none mb-0.5">Developed by</span>
                    <span className="text-[14px] font-bold text-black leading-none">{property.developer}</span>
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
                <p className="text-[10px] uppercase tracking-widest text-black/35 mb-1">Size</p>
                <p className="text-[17px] font-bold text-black">{property.area_sqft ? `${property.area_sqft.toLocaleString()} sqft` : 'N/A'}</p>
              </div>
              {property.bedrooms !== null && (
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-black/35 mb-1">Bedrooms</p>
                  <p className="text-[17px] font-bold text-black">{bedroomsDisplay}</p>
                </div>
              )}
              <div>
                <p className="text-[10px] uppercase tracking-widest text-black/35 mb-1">Bathrooms</p>
                <p className="text-[17px] font-bold text-black">{property.bathrooms}</p>
              </div>
            </div>

            {/* Timeline / Status */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-10 pb-8 border-b border-black/8">
              <div className="flex flex-col">
                <span className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-orange-500 font-bold mb-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                  {property.status === 'off-plan' ? 'Under Construction' : property.status}
                </span>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-black/35 mb-1">Completion</p>
                <p className="text-[14px] font-bold text-black">{property.completion_date || 'TBA'}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-black/35 mb-1">Handover</p>
                <p className="text-[14px] font-bold text-black">{property.handover_date || property.completion_date || 'TBA'}</p>
              </div>
            </div>

            {/* Highlights */}
            {(property.highlights?.length ?? 0) > 0 && (
              <section className="mb-12">
                <h2 className="text-[20px] font-bold text-black mb-6">Property Highlights</h2>
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

            {/* Details */}
            {(property.type || property.building_name || (property.interior_features?.length ?? 0) > 0) && (
              <section className="mb-10">
                <h2 className="text-[18px] font-bold text-black mb-5">House Details</h2>
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
                        <p className="text-[10px] uppercase tracking-widest text-black/35 mb-1.5">Community/Complex</p>
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

            {/* Amenities */}
            {(property.amenities?.length ?? 0) > 0 && (
              <section className="mb-10">
                <h2 className="text-[18px] font-bold text-black mb-6">Amenities</h2>
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

            {/* Overview */}
            <section className="mb-14">
              <h2 className="text-[18px] font-bold text-black mb-6">Property Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {/* 1. Payment Plan */}
                {property.payment_plan && (
                  <div className="bg-white border border-black/8 rounded-[24px] p-8 flex flex-col justify-between min-h-[440px]">
                    <div>
                      <h3 className="text-[17px] font-bold text-black mb-8">Payment Plan</h3>
                      <div className="grid grid-cols-2 gap-y-10 gap-x-6">
                        <div>
                          <p className="text-[10px] uppercase tracking-widest text-black/35 font-bold mb-1">Down Payment</p>
                          <p className="text-[34px] font-bold text-black leading-none">{property.payment_plan.down_payment}%</p>
                        </div>
                        <div>
                          <p className="text-[10px] uppercase tracking-widest text-black/35 font-bold mb-1">During Construction</p>
                          <p className="text-[34px] font-bold text-black leading-none">{property.payment_plan.during_construction}%</p>
                        </div>
                        <div className="col-span-2">
                          <p className="text-[10px] uppercase tracking-widest text-black/35 font-bold mb-1">On Handover</p>
                          <p className="text-[34px] font-bold text-black leading-none">{property.payment_plan.on_handover}%</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. Unit Image */}
                <div className="relative rounded-[24px] overflow-hidden min-h-[440px]">
                  <Image
                    src={property.unit_types_image || property.images?.[0] || "/assets/images/home/about.jpg"}
                    alt="House Plans"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40" />
                  <div className="absolute bottom-8 left-8 right-8">
                    <p className="text-white font-bold text-[20px]">Floor Plans & Models</p>
                    <span className="text-[10px] text-white/60 font-bold uppercase tracking-widest">Available on Request</span>
                  </div>
                </div>

                {/* 3. Resources */}
                <div className="flex flex-col gap-3">
                  {["Floor Plans", "Brochure", "Site Plan"].map((doc) => (
                    <div key={doc} className="flex-1 bg-white border border-black/8 rounded-[24px] p-6 flex items-center justify-between">
                      <span className="font-bold text-black/70">{doc}</span>
                      <ArrowRight size={18} className="text-black/20" />
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Map & Landmarks */}
            <section>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div>
                  <h2 className="text-[18px] font-bold text-black mb-5">Location</h2>
                  <div className="h-[300px] rounded-2xl overflow-hidden border border-black/8">
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

            {/* ── FAQs ─────────────────────────────────────── */}
            {property.faqs && property.faqs.length > 0 && (
              <section className="mt-14 pt-14 border-t border-black/5">
                <h2 className="text-[22px] font-bold text-black mb-8 font-display">Investment FAQ</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                  {property.faqs.map((faq, i) => (
                    <div key={i} className="group">
                      <h3 className="text-[16px] font-bold text-black mb-3 group-hover:text-orange-600 transition-colors leading-tight">
                        {faq.question}
                      </h3>
                      <p className="text-[14px] text-black/60 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* ── RIGHT SIDEBAR ────────────────────────────── */}
          <aside className="lg:sticky lg:top-24">
            <div className="border border-black/10 rounded-2xl overflow-hidden bg-white shadow-sm">
              <PriceDisplay price={price} listingLabel={listingLabel} />
              
              <div className="p-6 border-b border-black/5">
                <p className="text-sm font-bold text-black mb-4">Inquire About This House</p>
                <InquiryForm 
                  propertyId={property.id} 
                  propertyTitle={property.title} 
                  entityType="house"
                />
              </div>

              <div className="p-6">
                <p className="text-[10px] font-bold uppercase tracking-widest text-black/30 mb-4">Assigned Advisor</p>
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
            <h2 className="text-2xl font-bold text-black mb-8">Similar Houses</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          </section>
        )}
      </article>
    </main>
    </>
  );
}
