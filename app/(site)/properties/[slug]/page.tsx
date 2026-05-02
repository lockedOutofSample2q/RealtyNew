/**
 * Property Detail Page - Standardized Route
 */
import { createAdminClient } from "@/lib/supabase";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import {
  ChevronLeft, ChevronRight, Share2, MapPin, Check,
  Waves, Dumbbell, Flame, Activity, Droplets, Users,
  Car, Leaf, Building2, Target, Thermometer, Briefcase,
  Film, Bell, Shield, ExternalLink, Images, ArrowRight,
} from "lucide-react";
import type { Property, NearbyLandmark } from "@/types";
import { enrichProperty } from "@/lib/property-utils";
import InquiryForm, { PropertyGallery } from "./InquiryForm";
import PriceDisplay from "./PriceDisplay";
import PropertyPriceInline from "./PropertyPriceInline";
import PropertyDetailMapClient from "./PropertyDetailMapClient";
import { siteConfig } from "@/config/site";

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  try {
    const supabase = createAdminClient();
    const { data } = await supabase.from("properties").select("slug");
    return (data ?? []).map((p: any) => ({ slug: p.slug }));
  } catch {
    return [];
  }
}

async function getProperty(slug: string): Promise<Property | null> {
  try {
    const supabase = createAdminClient();
    const { data } = await supabase.from("properties").select("*").eq("slug", slug).single();
    if (!data) return null;
    return enrichProperty(data as Property);
  } catch {
    return null;
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
    alternates: {
      canonical: `/properties/${p.slug}`,
    },
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

export default async function PropertyDetailPage(props: Props) {
  const params = await props.params;
  const property = await getProperty(params.slug);
  if (!property) notFound();

  const backHref = property.listing_type === "lands" ? "/properties?tab=lands" : "/properties";
  const backLabel = property.listing_type === "lands" ? "Lands" : "Properties";
  const listingLabel =
    property.entity_type === 'land' ? 'Land For Sale' :
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
            <span className="inline-block text-[11px] text-black/40 border border-black/10 rounded px-2 py-0.5 mb-5 uppercase tracking-wider">
              {listingLabel}
            </span>

            {/* Description */}
            <div className="space-y-4 mb-8">
              {property.description?.split('\n').map((para, i) => (
                para.trim() && (
                  <p key={i} className="text-[15px] text-black/60 leading-relaxed">
                    {para.trim()}
                  </p>
                )
              ))}
            </div>

            {/* Stats */}
            <div className="flex items-center gap-5 sm:gap-14 flex-wrap py-6 mb-8 border-y border-black/5">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-black/35 mb-1.5 font-bold">Size</p>
                <p className="text-[17px] font-bold text-black font-display">
                  {property.area_sqft ? `${property.area_sqft.toLocaleString()} sqft` : 'N/A'}
                </p>
              </div>
              {property.bedrooms !== null && (
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-black/35 mb-1.5 font-bold">Bedrooms</p>
                  <p className="text-[17px] font-bold text-black font-display">{bedroomsDisplay}</p>
                </div>
              )}
              {property.type && (
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-black/35 mb-1.5 font-bold">Type</p>
                  <p className="text-[17px] font-bold text-black font-display capitalize">{property.type}</p>
                </div>
              )}
              {property.tower_count && (
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-black/35 mb-1.5 font-bold">Towers</p>
                  <p className="text-[17px] font-bold text-black font-display">{property.tower_count}</p>
                </div>
              )}
            </div>

            {/* Highlights */}
            {(property.highlights?.length ?? 0) > 0 && (
              <section className="mb-10">
                <h2 className="text-[18px] font-bold text-black mb-6">Property Highlights</h2>
                <div className="grid grid-cols-2 gap-x-8 gap-y-3">
                  {property.highlights!.map((h) => (
                    <div key={h} className="flex items-start gap-2.5">
                      <Check size={13} className="text-black shrink-0 mt-1" />
                      <span className="text-[13px] text-black/65 leading-relaxed">{h}</span>
                    </div>
                  ))}
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

            {/* Amenities Gallery */}
            {(property.amenities_gallery?.length ?? 0) > 0 && (
              <section className="mb-10">
                <h2 className="text-[18px] font-bold text-black mb-5">Amenities Gallery</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {property.amenities_gallery!.filter(s => s && s.trim() !== "").map((src, i) => (
                    <div key={i} className="relative aspect-square rounded-2xl overflow-hidden bg-black/5">
                      <Image src={src} alt={`Amenity ${i + 1}`} fill className="object-cover" />
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* ── TECHNICAL OVERVIEW ───────────────────────────── */}
            {(property.payment_plan || property.unit_types_image || (property.documents?.length ?? 0) > 0) && (
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
                            <p className="text-[12px] text-black/40 mt-1.5">Upon booking</p>
                          </div>
                          <div>
                            <p className="text-[10px] uppercase tracking-widest text-black/35 font-bold mb-1">During Construction</p>
                            <p className="text-[34px] font-bold text-black leading-none">{property.payment_plan.during_construction}%</p>
                            <p className="text-[12px] text-black/40 mt-1.5">In installments</p>
                          </div>
                          <div className="col-span-2">
                             <div className="h-[1px] bg-black/5 w-full my-2" />
                            <p className="text-[10px] uppercase tracking-widest text-black/35 font-bold mb-1">On Handover</p>
                            <p className="text-[34px] font-bold text-black leading-none">{property.payment_plan.on_handover}%</p>
                            <p className="text-[12px] text-black/40 mt-1.5">Final payment</p>
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-black/8 pt-6 mt-8">
                        <p className="text-[10px] uppercase tracking-widest text-black/35 font-bold mb-1">Total Investment</p>
                        <PropertyPriceInline price={price} className="text-[20px] font-bold text-black" />
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
                      <p className="text-white font-bold text-[20px] mb-3 leading-tight">Unit Types & Sizes</p>
                      <span className="inline-flex items-center gap-2 text-[11px] bg-white/20 backdrop-blur-md text-white border border-white/30 font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
                        {property.unit_types_coming_soon ? "COMING SOON" : "AVAILABLE"}
                      </span>
                    </div>
                    {/* Icon corner */}
                    <div className="absolute bottom-8 right-8 w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
                       <Images size={18} className="text-white" />
                    </div>
                  </div>

                  {/* 3. Resources / Links */}
                  <div className="flex flex-col gap-3">
                    {(property.documents || []).filter(doc => doc.url && doc.url.trim() !== "").map((doc, idx) => (
                      <a
                        key={idx}
                        href={doc.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-white border border-black/8 rounded-[24px] p-8 flex items-center justify-between group hover:border-black/20 transition-all cursor-pointer"
                      >
                        <div className="flex flex-col gap-1">
                          <span className="text-[16px] font-bold text-black/70 group-hover:text-black transition-colors">{doc.name}</span>
                          <span className="text-[10px] text-black/30 font-bold tracking-widest">{doc.coming_soon ? "COMING SOON" : "DOWNLOAD"}</span>
                        </div>
                        <div className="w-10 h-10 rounded-full border border-black/5 flex items-center justify-center text-black/20 group-hover:text-black group-hover:border-black/10 transition-all">
                          <ArrowRight size={18} />
                        </div>
                      </a>
                    ))}
                  </div>

                </div>
              </section>
            )}

            <section>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
                <div>
                  <h2 className="text-[18px] font-bold text-black mb-5">Location</h2>
                  <div className="h-[240px] rounded-2xl overflow-hidden border border-black/8">
                    {property.latitude && property.longitude ? (
                        <PropertyDetailMapClient
                        lat={property.latitude}
                        lng={property.longitude}
                        title={property.title}
                      />
                    ) : (
                      <div className="w-full h-full bg-[#e8f0e8] flex items-center justify-center">
                        <p className="text-[13px] text-black/30">Map unavailable</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Nearby Landmarks */}
                {(property.nearby_landmarks?.length ?? 0) > 0 && (
                  <div>
                    <h2 className="text-[18px] font-bold text-black mb-5">Nearby Landmarks</h2>
                    <div className="grid grid-cols-2 gap-3">
                      {property.nearby_landmarks!.map((lm) => (
                        <div key={lm.name} className="bg-black/[0.03] rounded-xl p-3 text-left">
                          <p className="text-[12px] font-semibold text-black mb-1 leading-tight">{lm.name}</p>
                          <p className="text-[22px] font-bold text-black leading-none">{lm.time}</p>
                          <p className="text-[10px] text-black/35 mt-0.5">min</p>
                          <p className="text-[10px] uppercase tracking-widest text-black/30 mt-1">
                            {transportLabel(lm.transport)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* ── UPCOMING INFRASTRUCTURE ─────────────────────── */}
            {(property.upcoming_infrastructure?.length ?? 0) > 0 && (
              <section className="mt-14 pt-14 border-t border-black/5">
                <h2 className="text-[18px] font-bold text-black mb-8">Upcoming Infrastructure & Projects</h2>
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

            {/* ── FAQS ───────────────────────────────────────── */}
            {(property.faqs?.length ?? 0) > 0 && (
              <section className="mt-14 pt-14 border-t border-black/5">
                <h2 className="text-[18px] font-bold text-black mb-8">Investment FAQ</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                  {property.faqs!.map((faq, i) => (
                    <div key={i} className="group">
                      <h3 className="text-[16px] font-bold text-black mb-3 group-hover:text-black transition-colors leading-tight">
                        {faq.question}
                      </h3>
                      <p className="text-black/60 text-[14px] leading-relaxed">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* ── RIGHT STICKY SIDEBAR ──────────────────────── */}
          <aside className="order-first lg:order-last lg:sticky lg:top-[var(--nav-height)] lg:pt-10 transition-all">
            <div className="border border-black/10 rounded-2xl overflow-hidden bg-white">

              {/* Price */}
              <PriceDisplay price={price} price_max={property.price_max} listingLabel={listingLabel} />

              {/* Inquiry Form */}
              <div className="p-5 border-b border-black/8">
                <p className="text-[13px] font-semibold text-black mb-4">Request Information</p>
                <InquiryForm 
                  propertyId={property.id} 
                  propertyTitle={property.title} 
                  entityType={
                    property.entity_type === 'apartment' ? 'apartment' :
                    property.entity_type === 'house' ? 'house' :
                    'land'
                  }
                />
              </div>

              {/* Agent */}
              <div className="p-5 border-b border-black/8">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-black/35">Contact Agent</p>
                  <p className="text-[9px] uppercase tracking-widest text-black/25">Realty Holding and Management Consultants</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="relative w-11 h-11 rounded-full overflow-hidden bg-black/10 shrink-0">
                    <Image src="/assets/images/leadership/amritpal.jpg" alt="Amritpal Singh" fill className="object-cover" />
                  </div>
                  <div>
                    <p className="text-[14px] font-semibold text-black leading-tight">Amritpal Singh</p>
                    <p className="text-[12px] text-black/45 mb-1.5">MD</p>
                    <p className="text-[12px] text-black/45">{siteConfig.contact.email}</p>
                    <p className="text-[12px] text-black/45 mb-2">{siteConfig.contact.phone}</p>
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
      </div>
    </div>
  );
}
