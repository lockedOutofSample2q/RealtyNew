"use client";
import { useState, useMemo, useEffect } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Bed, Bath, Maximize2 } from "lucide-react";
import type { Property } from "@/types";
import PropertySearchBar from "@/components/search/PropertySearchBar";
import {
  DEFAULT_PROPERTY_FILTERS,
  type PropertySearchFilters,
  type SearchTab,
} from "@/components/search/propertySearchOptions";

// Leaflet must not SSR
const PropertiesMap = dynamic(() => import("@/components/ui/PropertiesMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-[#e8e0d8] flex items-center justify-center">
      <span className="text-sm text-black/40">Loading map…</span>
    </div>
  ),
});

// ── Property Card ─────────────────────────────────────────────
function PropertyCard({ property }: { property: Property }) {
  const image = property.images?.[0] ?? "/assets/images/home/about.jpg";
  const hasPrice = property.price > 0;

  return (
    <Link
      href={`/properties/${property.slug}`}
      className="group bg-white border border-black/8 overflow-hidden hover:shadow-[0_8px_32px_rgba(0,0,0,0.1)] transition-shadow duration-300 block"
    >
      {/* Image */}
      <div className="relative w-full aspect-[4/3] overflow-hidden bg-black/5">
        <Image
          src={image}
          alt={property.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700"
          sizes="(max-width: 768px) 100vw, 350px"
        />
        {property.featured && (
          <span className="absolute top-3 left-3 bg-emerald-500 text-white text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full">
            Featured
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-black text-[15px] leading-snug mb-1 line-clamp-1">
          {property.title}
        </h3>
        <p className="text-[12px] text-black/45 mb-3 line-clamp-2 leading-relaxed">
          {property.description || `${property.community}, ${property.location}`}
        </p>

        {/* Specs */}
        <div className="flex items-center gap-3 text-[12px] text-black/50 mb-3">
          {property.bedrooms !== null && (
            <span className="flex items-center gap-1">
              <Bed size={12} />
              {property.bedrooms === 0 ? "Studio" : property.bedrooms}
            </span>
          )}
          <span className="flex items-center gap-1">
            <Bath size={12} />
            {property.bathrooms}
          </span>
          <span className="flex items-center gap-1">
            <Maximize2 size={12} />
            {property.area_sqft.toLocaleString()} sqft
          </span>
        </div>

        {/* Price */}
        <div className="border-t border-black/6 pt-3">
          {hasPrice ? (
            <p className="text-[14px] font-bold text-black">
              {property.price_currency} {property.price.toLocaleString()}
            </p>
          ) : (
            <p className="text-[13px] text-black/40 italic">Price on request</p>
          )}
        </div>
      </div>
    </Link>
  );
}

// ── Main Client Component ─────────────────────────────────────
interface Props {
  properties: Property[];
}

function parseMaxPrice(priceLabel: string): number | null {
  if (!priceLabel) return null;
  const digits = priceLabel.replace(/[^\d]/g, "");
  if (!digits) return null;
  const n = Number(digits);
  return Number.isFinite(n) && n > 0 ? n : null;
}

function normalize(text: string | undefined | null): string {
  return (text ?? "").toLowerCase().replace(/[-\s]+/g, " ").trim();
}

export default function OffPlanClient({ properties }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [tab, setTab] = useState<SearchTab>(searchParams.get("listingType") === "rent" ? "rent" : "buy");
  const [filters, setFilters] = useState<PropertySearchFilters>({
    ...DEFAULT_PROPERTY_FILTERS,
    location: searchParams.get("location") ?? "",
    type: searchParams.get("type") ?? "",
    bedrooms: searchParams.get("bedrooms") ?? "",
    furnishing: searchParams.get("furnishing") ?? "",
    price: searchParams.get("price") ?? "",
    currency: searchParams.get("currency") ?? "AED",
  });
  const [leafletReady, setLeafletReady] = useState(false);

  useEffect(() => {
    setTab(searchParams.get("listingType") === "rent" ? "rent" : "buy");
    setFilters({
      ...DEFAULT_PROPERTY_FILTERS,
      location: searchParams.get("location") ?? "",
      type: searchParams.get("type") ?? "",
      bedrooms: searchParams.get("bedrooms") ?? "",
      furnishing: searchParams.get("furnishing") ?? "",
      price: searchParams.get("price") ?? "",
      currency: searchParams.get("currency") ?? "AED",
    });
  }, [searchParams]);

  useEffect(() => {
    // Leaflet needs the CSS too
    import("leaflet/dist/leaflet.css" as any);
    setLeafletReady(true);
  }, []);

  const filtered = useMemo(() => {
    const maxPrice = parseMaxPrice(filters.price);
    const desiredType = normalize(filters.type);
    const desiredLocation = normalize(filters.location);
    const desiredFurnishing = normalize(filters.furnishing);

    return properties.filter((p) => {
      if (filters.bedrooms) {
        if (filters.bedrooms === "Studio") {
          if ((p.bedrooms ?? 0) !== 0) return false;
        } else if (filters.bedrooms === "5+") {
          if ((p.bedrooms ?? 0) < 5) return false;
        } else {
          const n = Number(filters.bedrooms);
          if (Number.isFinite(n) && p.bedrooms !== n) return false;
        }
      }

      if (maxPrice && p.price > maxPrice && p.price > 0) return false;

      if (desiredType && desiredType !== "all") {
        if (normalize(p.type) !== desiredType) return false;
      }

      if (desiredLocation && desiredLocation !== "all") {
        const inLocation = normalize(p.location).includes(desiredLocation);
        const inCommunity = normalize(p.community).includes(desiredLocation);
        if (!inLocation && !inCommunity) return false;
      }

      if (desiredFurnishing && desiredFurnishing !== "all furnishings") {
        const propertyFurnishing = normalize(
          p.furnishing === "semi-furnished" ? "partly furnished" : p.furnishing
        );
        if (propertyFurnishing !== desiredFurnishing) return false;
      }

      return true;
    });
  }, [properties, filters]);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams({
      listingType: tab,
      ...(filters.location && { location: filters.location }),
      ...(filters.type && { type: filters.type }),
      ...(filters.bedrooms && { bedrooms: filters.bedrooms }),
      ...(filters.furnishing && { furnishing: filters.furnishing }),
      ...(filters.price && { price: filters.price }),
      ...(filters.currency && { currency: filters.currency }),
    });

    const page = tab === "rent" ? "/rentals" : "/off-plan";
    router.push(`${page}?${params.toString()}`);
  }

  return (
    <div className="min-h-screen bg-white">
      {/* ── Hero ──────────────────────────────────────────── */}
      <div className="relative w-full h-[52vh] min-h-[360px] flex flex-col items-center justify-center pt-[var(--nav-height)]">
        {/* Background image */}
        <Image
          src="/assets/images/home/hero-bg.jpg"
          alt="Off plan properties"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/55" />

        {/* Text */}
        <div className="relative z-10 text-center px-4">
          <h1 className="text-white font-semibold text-[clamp(1.8rem,4vw,3rem)] leading-[1.2] tracking-tight max-w-2xl mx-auto mb-3">
            Check on all off plan<br />properties we have available
          </h1>
          <p className="text-white/60 text-[clamp(13px,1.2vw,15px)] max-w-lg mx-auto">
            Filter and find your perfect home in the United Arab Emirates
          </p>
        </div>

        <PropertySearchBar
          tab={tab}
          setTab={setTab}
          filters={filters}
          setFilters={setFilters}
          onSubmit={handleSearch}
          className="relative z-10 mt-8 w-[90%] max-w-[1100px] bg-white/10 backdrop-blur-3xl rounded-[28px] px-6 py-5 shadow-2xl shadow-black/10 border border-white/20"
        />
      </div>

      {/* ── Results bar ───────────────────────────────────── */}
      <div className="border-b border-black/6 px-6 py-3 flex items-center">
        <span className="text-[13px] text-black/50 font-medium">
          {filtered.length} {filtered.length === 1 ? "property" : "properties"}
        </span>
      </div>

      {/* ── Cards + Map ───────────────────────────────────── */}
      <div className="flex">
        {/* Left: scrollable property grid */}
        <div className="w-[58%] p-6 grid grid-cols-2 gap-5 content-start">
          {filtered.map((p) => (
            <PropertyCard key={p.id} property={p} />
          ))}
          {filtered.length === 0 && (
            <div className="col-span-2 py-24 text-center">
              <p className="text-black/40 text-sm">No properties match your filters.</p>
              <button
                onClick={() => setFilters(DEFAULT_PROPERTY_FILTERS)}
                className="mt-3 text-sm text-black underline"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>

        {/* Right: sticky map */}
        <div className="w-[42%] sticky top-[var(--nav-height)] h-[calc(100vh-var(--nav-height))] shrink-0">
          {leafletReady && <PropertiesMap properties={filtered} />}
        </div>
      </div>
    </div>
  );
}
