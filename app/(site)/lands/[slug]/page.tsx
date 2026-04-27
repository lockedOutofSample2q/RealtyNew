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
  return {
    title: `${p.title} | Lands & Plots in Mohali`,
    description: p.description?.slice(0, 160),
    openGraph: { images: p.images?.[0] ? [{ url: p.images[0] }] : [] },
  };
}

export const revalidate = 60;

// ── Amenity icon lookup ───────────────────────────────────────
const AMENITY_ICON_MAP: Record<string, React.ElementType> = {
  parking: Car,
  security: Shield,
  garden: Leaf,
};

function AmenityIcon({ name }: { name: string }) {
  const Icon = AMENITY_ICON_MAP[name.toLowerCase()] ?? Check;
  return <Icon size={16} strokeWidth={1.5} className="text-black/50 shrink-0" />;
}

// ── Transport label ───────────────────────────────────────────
function transportLabel(t: NearbyLandmark["transport"]) {
  return { car: "BY CAR", walk: "BY WALK", metro: "BY METRO", bus: "BY BUS" }[t];
}

export default async function LandDetailPage(props: Props) {
  const params = await props.params;
  const property = await getProperty(params.slug);
  if (!property) notFound();

  const related = await getRelatedProperties(property);

  const backHref = "/lands";
  const backLabel = "Lands";
  const listingLabel = "Land For Sale";

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
            </div>
            <span className="inline-block text-[11px] text-black/40 border border-black/10 rounded px-2 py-0.5 mb-5">
              {listingLabel}
            </span>

            {/* Description */}
            <p className="text-[15px] text-black/60 leading-relaxed mb-8">{property.description}</p>

            {/* Stats */}
            <div className="flex items-center gap-5 sm:gap-10 flex-wrap border-y border-black/8 py-6 mb-8">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-black/35 mb-1">Total Area</p>
                <p className="text-[17px] font-bold text-black">{property.area_sqft ? `${property.area_sqft.toLocaleString()} sqft` : 'N/A'}</p>
              </div>
              {property.type && (
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-black/35 mb-1">Zoning</p>
                  <p className="text-[17px] font-bold text-black capitalize">{property.type}</p>
                </div>
              )}
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
                  <div>
                    <h2 className="text-[18px] font-bold text-black mb-5">Connectivity</h2>
                    <div className="grid grid-cols-2 gap-4">
                      {property.nearby_landmarks.map((lm) => (
                        <div key={lm.name} className="bg-black/[0.02] p-4 rounded-xl">
                          <p className="text-[11px] font-bold text-black/40 uppercase mb-1">{lm.name}</p>
                          <p className="text-xl font-bold text-black">{lm.time} min</p>
                          <p className="text-[9px] uppercase tracking-widest text-black/20 mt-1">{transportLabel(lm.transport)}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </section>
          </div>

          {/* ── RIGHT SIDEBAR ────────────────────────────── */}
          <aside className="lg:sticky lg:top-24">
            <div className="border border-black/10 rounded-2xl overflow-hidden bg-white shadow-sm">
              <PriceDisplay price={price} listingLabel={listingLabel} />
              
              <div className="p-6 border-b border-black/5">
                <p className="text-sm font-bold text-black mb-4">Inquire About This Land</p>
                <InquiryForm 
                  propertyId={property.id} 
                  propertyTitle={property.title} 
                  entityType="land"
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
            <h2 className="text-2xl font-bold text-black mb-8">Similar Lands</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
