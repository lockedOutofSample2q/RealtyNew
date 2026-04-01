"use client";
import { useState, useMemo, useEffect } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { Bed, Bath, Maximize2, Search } from "lucide-react";
import type { Property } from "@/types";

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

const BED_FILTERS = ["All", "1 Bed", "2 Bed", "3 Bed", "4+ Bed"];

export default function OffPlanClient({ properties }: Props) {
  const [bedFilter, setBedFilter] = useState("All");
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [leafletReady, setLeafletReady] = useState(false);

  useEffect(() => {
    // Leaflet needs the CSS too
    import("leaflet/dist/leaflet.css" as any);
    setLeafletReady(true);
  }, []);

  const filtered = useMemo(() => {
    return properties.filter((p) => {
      if (bedFilter !== "All") {
        if (bedFilter === "4+ Bed") {
          if ((p.bedrooms ?? 0) < 4) return false;
        } else {
          const n = parseInt(bedFilter);
          if (p.bedrooms !== n) return false;
        }
      }
      if (maxPrice && p.price > maxPrice && p.price > 0) return false;
      if (search) {
        const q = search.toLowerCase();
        if (
          !p.title.toLowerCase().includes(q) &&
          !p.community?.toLowerCase().includes(q) &&
          !p.location?.toLowerCase().includes(q) &&
          !p.developer?.toLowerCase().includes(q)
        )
          return false;
      }
      return true;
    });
  }, [properties, bedFilter, maxPrice, search]);

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

        {/* Filter bar */}
        <div className="relative z-10 mt-8 bg-white rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.25)] px-4 py-3 flex items-center gap-2 flex-wrap max-w-2xl w-[90%]">
          {BED_FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setBedFilter(f)}
              className={`px-4 py-2 rounded-xl text-[13px] font-medium transition-colors whitespace-nowrap ${
                bedFilter === f
                  ? "bg-black text-white"
                  : "bg-black/5 text-black/60 hover:bg-black/10"
              }`}
            >
              {f}
            </button>
          ))}

          <select
            value={maxPrice ?? ""}
            onChange={(e) => setMaxPrice(e.target.value ? Number(e.target.value) : null)}
            className="ml-auto px-3 py-2 rounded-xl bg-black/5 text-[13px] text-black/60 border-none focus:outline-none cursor-pointer"
          >
            <option value="">Price Range</option>
            <option value="1000000">Under AED 1M</option>
            <option value="2000000">Under AED 2M</option>
            <option value="5000000">Under AED 5M</option>
            <option value="10000000">Under AED 10M</option>
          </select>

          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-black/30" />
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8 pr-3 py-2 rounded-xl bg-black/5 text-[13px] text-black placeholder:text-black/30 focus:outline-none w-32"
            />
          </div>
        </div>
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
                onClick={() => { setBedFilter("All"); setMaxPrice(null); setSearch(""); }}
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
