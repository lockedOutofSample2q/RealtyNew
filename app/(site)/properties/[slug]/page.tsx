// app/site/properties/[slug]/page.tsx  →  /properties/:slug
import { createAdminClient } from "@/lib/supabase";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { MapPin, Bed, Bath, Maximize, Check, ArrowLeft } from "lucide-react";
import ContactSection from "@/components/sections/ContactSection";
import type { Property } from "@/types";

interface Props {
  params: { slug: string };
}

async function getProperty(slug: string): Promise<Property | null> {
  try {
    const supabase = createAdminClient();
    const { data } = await supabase
      .from("properties")
      .select("*")
      .eq("slug", slug)
      .single();
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

export default async function PropertyDetailPage({ params }: Props) {
  const property = await getProperty(params.slug);
  if (!property) notFound();

  const backHref =
    property.listing_type === "rent"
      ? "/rentals"
      : property.listing_type === "off-plan"
      ? "/off-plan"
      : "/off-plan";

  const backLabel =
    property.listing_type === "rent" ? "Rentals" : "Off Plan";

  return (
    <div className="pt-[var(--nav-height)] min-h-screen bg-[#0D0D0D]">
      {/* ── Image gallery ─────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-1 h-[60vh] min-h-[400px] overflow-hidden">
        {/* Main image */}
        <div className="relative h-full">
          <Image
            src={property.images?.[0] ?? "/images/property-placeholder.jpg"}
            alt={property.title}
            fill
            className="object-cover"
            priority
          />
        </div>
        {/* Secondary images grid */}
        <div className="hidden md:grid grid-cols-2 gap-1">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="relative">
              {property.images?.[i] ? (
                <Image
                  src={property.images[i]}
                  alt={`${property.title} view ${i}`}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-[#141414]" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── Content ───────────────────────────────────── */}
      <div className="container-site py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main info */}
          <div className="lg:col-span-2">
            {/* Back link */}
            <Link
              href={backHref}
              className="inline-flex items-center gap-2 font-body text-sm text-white/40 hover:text-white mb-6 transition-colors"
            >
              <ArrowLeft size={14} /> Back to {backLabel}
            </Link>

            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-3 py-1 bg-[var(--gold)] text-black font-body text-xs font-medium uppercase tracking-wide">
                {property.listing_type === "off-plan" ? "Off Plan" : property.listing_type === "rent" ? "For Rent" : "For Sale"}
              </span>
              <span className="px-3 py-1 bg-white/5 text-white/60 font-body text-xs capitalize">
                {property.type}
              </span>
              <span className="px-3 py-1 bg-white/5 text-white/60 font-body text-xs capitalize">
                {property.furnishing}
              </span>
            </div>

            <h1 className="font-display text-4xl text-white font-light mb-3">
              {property.title}
            </h1>

            {property.developer && (
              <p className="font-body text-sm text-[var(--gold)] mb-2">
                By {property.developer}
              </p>
            )}

            <div className="flex items-center gap-2 text-white/50 mb-8">
              <MapPin size={14} className="text-[var(--gold)]" />
              <span className="font-body text-sm">{property.community}, {property.location}</span>
            </div>

            {/* Specs row */}
            <div className="flex flex-wrap gap-8 py-6 border-y border-white/5 mb-8">
              {property.bedrooms !== null && (
                <div className="flex items-center gap-3">
                  <Bed size={20} className="text-[var(--gold)]" strokeWidth={1.5} />
                  <div>
                    <div className="font-display text-xl text-white font-light">
                      {property.bedrooms === 0 ? "Studio" : property.bedrooms}
                    </div>
                    <div className="font-body text-xs text-white/40">Bedrooms</div>
                  </div>
                </div>
              )}
              <div className="flex items-center gap-3">
                <Bath size={20} className="text-[var(--gold)]" strokeWidth={1.5} />
                <div>
                  <div className="font-display text-xl text-white font-light">{property.bathrooms}</div>
                  <div className="font-body text-xs text-white/40">Bathrooms</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Maximize size={20} className="text-[var(--gold)]" strokeWidth={1.5} />
                <div>
                  <div className="font-display text-xl text-white font-light">
                    {property.area_sqft.toLocaleString()}
                  </div>
                  <div className="font-body text-xs text-white/40">Sq Ft</div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-10">
              <h2 className="font-display text-2xl text-white font-light mb-4">About this property</h2>
              <p className="font-body text-white/60 leading-relaxed whitespace-pre-wrap">
                {property.description}
              </p>
            </div>

            {/* Features */}
            {property.features?.length > 0 && (
              <div>
                <h2 className="font-display text-2xl text-white font-light mb-5">Features & Amenities</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {property.features.map((f) => (
                    <div key={f} className="flex items-center gap-2">
                      <Check size={14} className="text-[var(--gold)] shrink-0" />
                      <span className="font-body text-sm text-white/60">{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ── Sticky sidebar ──────────────────────────── */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-[#141414] border border-[rgba(201,168,76,0.12)] p-6">
              <div className="mb-5">
                <div className="font-body text-xs text-white/40 uppercase tracking-wide mb-1">
                  {property.listing_type === "rent" ? "Annual Rent" : "Price"}
                </div>
                <div className="font-display text-3xl text-[var(--gold)] font-light">
                  {property.price_currency} {property.price.toLocaleString()}
                </div>
                {property.listing_type === "rent" && (
                  <div className="font-body text-xs text-white/40 mt-1">per year</div>
                )}
              </div>

              <div className="space-y-3 mb-6 pb-6 border-b border-white/5">
                <div className="flex justify-between font-body text-sm">
                  <span className="text-white/40">Status</span>
                  <span className="text-white capitalize">{property.status}</span>
                </div>
                {property.developer && (
                  <div className="flex justify-between font-body text-sm">
                    <span className="text-white/40">Developer</span>
                    <span className="text-white">{property.developer}</span>
                  </div>
                )}
                <div className="flex justify-between font-body text-sm">
                  <span className="text-white/40">Furnishing</span>
                  <span className="text-white capitalize">{property.furnishing}</span>
                </div>
              </div>

              {/* Inquiry form (inline mini) */}
              <InquiryForm propertyId={property.id} propertyTitle={property.title} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Mini inquiry form ───────────────────────────────────────
function InquiryForm({ propertyId, propertyTitle }: { propertyId: string; propertyTitle: string }) {
  // This is a server component wrapper — the actual form is client
  return <InquiryFormClient propertyId={propertyId} propertyTitle={propertyTitle} />;
}

// This needs to be a separate client component file in a real build
// For simplicity, inlined here with a note
function InquiryFormClient({ propertyId, propertyTitle }: { propertyId: string; propertyTitle: string }) {
  // NOTE: In production, extract to components/ui/InquiryForm.tsx
  // and add "use client" + useState hooks
  return (
    <form action="/api/contact" method="POST" className="space-y-3">
      <input type="hidden" name="source" value="property" />
      <input type="hidden" name="property_id" value={propertyId} />
      <input type="hidden" name="message" value={`Inquiry about: ${propertyTitle}`} />
      <input
        type="text"
        name="name"
        placeholder="Your Name"
        required
        className="w-full bg-[#0D0D0D] border border-white/10 text-white font-body text-sm px-3 py-2.5 outline-none focus:border-[var(--gold)] placeholder:text-white/30 transition-colors"
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        required
        className="w-full bg-[#0D0D0D] border border-white/10 text-white font-body text-sm px-3 py-2.5 outline-none focus:border-[var(--gold)] placeholder:text-white/30 transition-colors"
      />
      <input
        type="tel"
        name="phone"
        placeholder="Phone / WhatsApp"
        className="w-full bg-[#0D0D0D] border border-white/10 text-white font-body text-sm px-3 py-2.5 outline-none focus:border-[var(--gold)] placeholder:text-white/30 transition-colors"
      />
      <button
        type="submit"
        className="w-full py-3 bg-[var(--gold)] text-black font-body font-medium text-sm hover:bg-[var(--gold-light)] transition-colors"
      >
        Request Info
      </button>
      <p className="font-body text-xs text-white/25 text-center">
        No spam. We respond within the hour.
      </p>
    </form>
  );
}
