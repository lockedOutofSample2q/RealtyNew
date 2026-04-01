import { createAdminClient } from "@/lib/supabase";
import { DEMO_PROPERTIES } from "@/lib/demo-properties";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import type { Metadata } from "next";
import {
  ChevronLeft, ChevronRight, Share2, MapPin, Check,
  Waves, Dumbbell, Flame, Activity, Droplets, Users,
  Car, Leaf, Building2, Target, Thermometer, Briefcase,
  Film, Bell, Shield, ExternalLink, Images,
} from "lucide-react";
import type { Property, NearbyLandmark } from "@/types";
import InquiryForm from "./InquiryForm";

const PropertyDetailMap = dynamic(() => import("./PropertyDetailMap"), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-[#e8f0e8] animate-pulse rounded-xl" />,
});

interface Props { params: { slug: string } }

async function getProperty(slug: string): Promise<Property | null> {
  // Check demo first (so page works without Supabase)
  const demo = DEMO_PROPERTIES.find((p) => p.slug === slug);
  if (demo) return demo;
  try {
    const supabase = createAdminClient();
    const { data } = await supabase.from("properties").select("*").eq("slug", slug).single();
    return data as Property | null;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = await getProperty(params.slug);
  if (!p) return {};
  return {
    title: p.title,
    description: p.description?.slice(0, 160),
    openGraph: { images: p.images?.[0] ? [{ url: p.images[0] }] : [] },
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

// ── Progress bar ──────────────────────────────────────────────
function PaymentBar({ pct }: { pct: number }) {
  return (
    <div className="h-[3px] bg-black/10 rounded-full w-full mt-2">
      <div className="h-full bg-black rounded-full transition-all" style={{ width: `${Math.min(pct, 100)}%` }} />
    </div>
  );
}

export default async function PropertyDetailPage({ params }: Props) {
  const property = await getProperty(params.slug);
  if (!property) notFound();

  const backHref = property.listing_type === "rent" ? "/rentals" : "/off-plan";
  const backLabel = property.listing_type === "rent" ? "Rentals" : "Off Plan";
  const listingLabel =
    property.listing_type === "off-plan" ? "Off Plan For Sale" :
    property.listing_type === "rent" ? "For Rent" : "For Sale";

  const bedroomsDisplay =
    property.bedrooms_max && property.bedrooms_max !== property.bedrooms
      ? `${property.bedrooms}-${property.bedrooms_max}`
      : property.bedrooms === 0 ? "Studio" : String(property.bedrooms ?? "—");

  const priceDisplay =
    property.price > 0
      ? `${property.price_currency} ${property.price.toLocaleString()}`
      : "Price on Request";

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

      {/* ── Gallery ─────────────────────────────────────── */}
      <div className="container-site py-4">
        <div className="flex gap-1 h-[420px]">
          {/* Main image */}
          <div className="relative flex-1 overflow-hidden rounded-l-2xl bg-black/5">
            <Image
              src={property.images?.[0] ?? "/assets/images/home/about.jpg"}
              alt={property.title}
              fill
              className="object-cover"
              priority
            />
          </div>
          {/* 2×2 thumbnails */}
          <div className="grid grid-cols-2 gap-1 w-[340px] shrink-0">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className={`relative overflow-hidden bg-black/5 ${i === 2 ? "rounded-tr-2xl" : ""} ${i === 4 ? "rounded-br-2xl" : ""}`}>
                {property.images?.[i] ? (
                  <Image
                    src={property.images[i]}
                    alt={`${property.title} ${i}`}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-black/5" />
                )}
                {/* View all overlay on last thumb */}
                {i === 4 && (property.image_count ?? 0) > 5 && (
                  <div className="absolute inset-0 bg-black/45 flex flex-col items-center justify-center gap-1">
                    <Images size={18} className="text-white" />
                    <span className="text-white text-[12px] font-semibold">
                      View all {property.image_count}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
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

        <div className="grid grid-cols-[1fr_340px] gap-12 items-start">

          {/* ── LEFT CONTENT ──────────────────────────────── */}
          <div>
            {/* Title row */}
            <div className="flex items-start justify-between gap-4 mb-3">
              <h1 className="text-[clamp(1.8rem,3vw,2.6rem)] font-bold text-black leading-tight tracking-tight">
                {property.title}
              </h1>
              {property.developer && (
                <span className="shrink-0 text-[12px] text-black/50 border border-black/15 px-3 py-1.5 rounded-lg mt-1">
                  by {property.developer}
                </span>
              )}
            </div>
            <span className="inline-block text-[11px] text-black/40 border border-black/10 rounded px-2 py-0.5 mb-5">
              {listingLabel}
            </span>

            {/* Description */}
            <p className="text-[15px] text-black/60 leading-relaxed mb-8">{property.description}</p>

            {/* Stats */}
            <div className="flex items-center gap-10 border-y border-black/8 py-6 mb-10">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-black/35 mb-1">Size</p>
                <p className="text-[17px] font-bold text-black">{property.area_sqft.toLocaleString()} sqft</p>
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

            {/* Off Plan Highlights */}
            {(property.highlights?.length ?? 0) > 0 && (
              <section className="mb-10">
                <h2 className="text-[18px] font-bold text-black mb-6">Off Plan Highlights</h2>
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

            {/* Off Plan Details */}
            {(property.type || property.building_name || (property.interior_features?.length ?? 0) > 0) && (
              <section className="mb-10">
                <h2 className="text-[18px] font-bold text-black mb-5">Off Plan Details</h2>
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
                <h2 className="text-[18px] font-bold text-black mb-6">Community Amenities</h2>
                <div className="grid grid-cols-3 gap-x-6 gap-y-4">
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
                <h2 className="text-[18px] font-bold text-black mb-5">Community Amenities Gallery</h2>
                <div className="grid grid-cols-3 gap-3">
                  {property.amenities_gallery!.map((src, i) => (
                    <div key={i} className="relative aspect-square rounded-2xl overflow-hidden bg-black/5">
                      <Image src={src} alt={`Amenity ${i + 1}`} fill className="object-cover" />
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Payment Plan + Unit Types + Documents */}
            {(property.payment_plan || property.unit_types_image || (property.documents?.length ?? 0) > 0) && (
              <section className="mb-10">
                <div className="grid grid-cols-3 gap-5">

                  {/* Payment Plan */}
                  {property.payment_plan && (
                    <div className="border border-black/8 rounded-2xl p-5">
                      <p className="text-[15px] font-bold text-black mb-5">Payment Plan</p>

                      <div className="mb-4">
                        <p className="text-[10px] uppercase tracking-widest text-black/35">Down Payment</p>
                        <p className="text-[26px] font-bold text-black leading-none mt-0.5">
                          {property.payment_plan.down_payment}%
                        </p>
                        <p className="text-[12px] text-black/40 mt-0.5">Upon booking</p>
                        <PaymentBar pct={property.payment_plan.down_payment} />
                      </div>

                      <div className="mb-4">
                        <p className="text-[10px] uppercase tracking-widest text-black/35">During Construction</p>
                        <p className="text-[26px] font-bold text-black leading-none mt-0.5">
                          {property.payment_plan.during_construction}%
                        </p>
                        <p className="text-[12px] text-black/40 mt-0.5">In installments</p>
                        <PaymentBar pct={property.payment_plan.during_construction} />
                      </div>

                      <div className="mb-6">
                        <p className="text-[10px] uppercase tracking-widest text-black/35">On Handover</p>
                        <p className="text-[26px] font-bold text-black leading-none mt-0.5">
                          {property.payment_plan.on_handover}%
                        </p>
                        <p className="text-[12px] text-black/40 mt-0.5">Final payment</p>
                        <PaymentBar pct={property.payment_plan.on_handover} />
                      </div>

                      <div className="border-t border-black/8 pt-4">
                        <p className="text-[10px] uppercase tracking-widest text-black/35 mb-1">Total Investment</p>
                        <p className="text-[17px] font-bold text-black">{priceDisplay}</p>
                      </div>
                    </div>
                  )}

                  {/* Unit Types & Sizes */}
                  {property.unit_types_image && (
                    <div className="relative rounded-2xl overflow-hidden aspect-auto min-h-[320px]">
                      <Image
                        src={property.unit_types_image}
                        alt="Unit Types & Sizes"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <p className="text-white font-semibold text-[15px] mb-2">Unit Types & Sizes</p>
                        {property.unit_types_coming_soon && (
                          <span className="text-[10px] bg-amber-400 text-black font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
                            COMING SOON
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Documents */}
                  {(property.documents?.length ?? 0) > 0 && (
                    <div className="flex flex-col gap-3">
                      {property.documents!.map((doc) => (
                        <div
                          key={doc.name}
                          className={`border border-black/8 rounded-2xl p-4 flex items-center justify-between ${doc.url && !doc.coming_soon ? "bg-black/[0.03]" : ""}`}
                        >
                          <span className="text-[13px] font-medium text-black leading-snug">{doc.name}</span>
                          <div className="flex items-center gap-1.5 shrink-0 ml-2">
                            {doc.coming_soon && (
                              <span className="text-[10px] text-black/30 uppercase tracking-wide whitespace-nowrap">
                                COMING SOON
                              </span>
                            )}
                            <ExternalLink size={13} className={doc.coming_soon ? "text-black/20" : "text-black/50"} />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                </div>
              </section>
            )}

            {/* Location + Nearby Landmarks */}
            <section>
              <div className="grid grid-cols-2 gap-10">
                {/* Map */}
                <div>
                  <h2 className="text-[18px] font-bold text-black mb-5">Location</h2>
                  <div className="h-[240px] rounded-2xl overflow-hidden border border-black/8">
                    {property.latitude && property.longitude ? (
                      <PropertyDetailMap
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
                        <div key={lm.name} className="bg-black/[0.03] rounded-xl p-3">
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
          </div>

          {/* ── RIGHT STICKY SIDEBAR ──────────────────────── */}
          <aside className="sticky top-[calc(var(--nav-height)+1rem)]">
            <div className="border border-black/10 rounded-2xl overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.06)]">

              {/* Price */}
              <div className="p-5 border-b border-black/8">
                <p className="text-[20px] font-bold text-black mb-0.5">{priceDisplay}</p>
                <p className="text-[11px] text-black/40 mb-1">{listingLabel}</p>
                {property.price === 0 && (
                  <p className="text-[12px] text-black/40">Contact us for pricing information</p>
                )}
              </div>

              {/* Inquiry Form */}
              <div className="p-5 border-b border-black/8">
                <p className="text-[13px] font-semibold text-black mb-4">Request Information</p>
                <InquiryForm propertyId={property.id} propertyTitle={property.title} />
              </div>

              {/* Agent */}
              <div className="p-5 border-b border-black/8">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-black/35">Contact Agent</p>
                  <p className="text-[9px] uppercase tracking-widest text-black/25">Monte Real Estate</p>
                </div>
                {property.agent_name && (
                  <div className="flex items-start gap-3">
                    <div className="relative w-11 h-11 rounded-full overflow-hidden bg-black/10 shrink-0">
                      {property.agent_photo && (
                        <Image src={property.agent_photo} alt={property.agent_name} fill className="object-cover" />
                      )}
                    </div>
                    <div>
                      <p className="text-[14px] font-semibold text-black leading-tight">{property.agent_name}</p>
                      {property.agent_title && (
                        <p className="text-[12px] text-black/45 mb-1.5">{property.agent_title}</p>
                      )}
                      {property.agent_email && (
                        <p className="text-[12px] text-black/45">{property.agent_email}</p>
                      )}
                      {property.agent_phone && (
                        <p className="text-[12px] text-black/45 mb-2">{property.agent_phone}</p>
                      )}
                      {(property.agent_languages?.length ?? 0) > 0 && (
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="text-[10px] text-black/30">Languages</span>
                          {property.agent_languages!.map((l) => (
                            <span key={l} className="text-[10px] bg-black/5 px-1.5 py-0.5 rounded text-black/60">
                              {l}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
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
