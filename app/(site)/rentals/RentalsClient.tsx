"use client";
import { useState, useMemo, useEffect } from "react";
import { createPortal } from "react-dom";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { Property } from "@/types";
import PropertySearchBar from "@/components/search/PropertySearchBar";
import PillSelect from "@/components/ui/PillSelect";
import PropertyCard from "@/components/ui/PropertyCard";
import { useCurrency } from "@/context/CurrencyContext";
import {
  DEFAULT_PROPERTY_FILTERS,
  LOCATIONS,
  PROPERTY_TYPES,
  BEDROOMS,
  FURNISHING,
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

export default function RentalsClient({ properties }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  // Default to rent for this page
  const [tab, setTab] = useState<SearchTab>(searchParams.get("listingType") === "buy" ? "buy" : "rent");
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
    setTab(searchParams.get("listingType") === "buy" ? "buy" : "rent");
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
    import("leaflet/dist/leaflet.css" as any);
    setLeafletReady(true);
  }, []);

  useEffect(() => {
    if (isSearchModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isSearchModalOpen]);

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

  function handleTabChange(newTab: SearchTab) {
    setTab(newTab);
    if (newTab === "buy") {
      router.push("/off-plan");
    }
  }

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
          alt="Rental properties"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/55" />

        {/* Text */}
        <div className="relative z-10 text-center px-4">
          <h1 className="text-white font-semibold text-[clamp(1.8rem,4vw,3rem)] leading-[1.2] tracking-tight max-w-2xl mx-auto mb-3">
            Discover Top Rental<br />Properties in Dubai
          </h1>
          <p className="text-white/60 text-[clamp(13px,1.2vw,15px)] max-w-lg mx-auto">
            Find your next home with flexible leasing options and prime locations.
          </p>
        </div>

        {/* Mobile: pill button */}
        <button
          onClick={() => setIsSearchModalOpen(true)}
          className="md:hidden relative z-10 mt-6 w-[90%] max-w-[400px] bg-white text-black py-4 px-6 rounded-2xl flex items-center gap-3 shadow-xl font-body font-medium active:scale-95 transition-transform"
        >
          <Search size={20} className="text-black/50 shrink-0" />
          <span className="flex-1 text-left text-[15px]">
            {[filters.location, filters.type, filters.bedrooms, filters.furnishing, filters.price].some(Boolean) ? "Filters active — tap to edit" : "Search properties"}
          </span>
        </button>

        {/* Desktop: full inline bar */}
        <PropertySearchBar
          tab={tab}
          setTab={handleTabChange}
          filters={filters}
          setFilters={setFilters}
          onSubmit={handleSearch}
          className="hidden md:block relative z-10 mt-8 w-[90%] max-w-[1100px] bg-white/10 backdrop-blur-3xl rounded-[28px] px-6 py-5 shadow-2xl shadow-black/10 border border-white/20"
        />
      </div>

      {/* ── Mobile Search Bottom Sheet ─────────────────────── */}
      {leafletReady && createPortal(<AnimatePresence>
        {isSearchModalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSearchModalOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[999]"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 bg-[#F3F4F6] rounded-t-[32px] z-[1000] p-6 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="font-display text-2xl font-semibold text-black">Filter</h2>
                <button
                  onClick={() => setIsSearchModalOpen(false)}
                  className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md active:scale-90 transition-transform"
                >
                  <X size={20} className="text-black" />
                </button>
              </div>

              <div className="flex bg-white rounded-2xl p-1 mb-8 shadow-sm">
                {(["buy", "rent"] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => handleTabChange(t)}
                    type="button"
                    className={`flex-1 py-3.5 text-sm font-semibold rounded-xl transition-all ${
                      tab === t ? "bg-black text-white shadow-lg" : "text-black/40"
                    }`}
                  >
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </button>
                ))}
              </div>

              <form onSubmit={(e) => { handleSearch(e); setIsSearchModalOpen(false); }} className="flex flex-col gap-10">
                <PillSelect
                  label="Location"
                  value={filters.location}
                  options={LOCATIONS}
                  onChange={(loc) => setFilters({ ...filters, location: loc })}
                  placeholder="All Dubai"
                />
                <PillSelect
                  label="Property Type"
                  value={filters.type}
                  options={PROPERTY_TYPES}
                  onChange={(type) => setFilters({ ...filters, type })}
                  placeholder="All Types"
                />
                <PillSelect
                  label="Bedrooms"
                  value={filters.bedrooms}
                  options={BEDROOMS}
                  onChange={(beds) => setFilters({ ...filters, bedrooms: beds })}
                  placeholder="Any"
                />
                <PillSelect
                  label="Furnishing"
                  value={filters.furnishing}
                  options={FURNISHING}
                  onChange={(furn) => setFilters({ ...filters, furnishing: furn })}
                  placeholder="All"
                />

                <div className="mt-4 flex flex-col gap-4 border-t border-black/5 pt-8">
                  <button
                    type="button"
                    onClick={() => setFilters(DEFAULT_PROPERTY_FILTERS)}
                    className="text-center font-body text-[13px] font-bold uppercase tracking-widest text-black/40 hover:text-black"
                  >
                    Reset filters
                  </button>
                  <button
                    type="submit"
                    className="w-full bg-black text-white py-5 rounded-2xl font-bold text-[15px] shadow-xl active:scale-[0.98] transition-transform"
                  >
                    Show results
                  </button>
                </div>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>, document.body)}

      {/* ── Cards + Map ───────────────────────────────────── */}
      <div className="flex flex-col md:flex-row bg-[#F9FAFB]">
        {/* Left: scrollable property grid — on mobile appears after map via order */}
        <div className="order-2 md:order-1 w-full md:w-[58%] p-4 md:p-8 grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 content-start">
            <div className="col-span-1 sm:col-span-2 border-t border-black/5 pt-8 md:hidden mt-2 mb-2 flex items-center justify-between">
               <h2 className="font-display text-3xl font-bold text-black tracking-tight">Listings</h2>
               <span className="font-body text-xs font-bold uppercase tracking-widest text-black/50">{filtered.length} found</span>
            </div>
          {filtered.map((p) => (
            <PropertyCard key={p.id} property={p} />
          ))}
          {filtered.length === 0 && (
            <div className="col-span-1 sm:col-span-2 py-24 text-center">
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

        {/* Map â€” large floating card on mobile, sticky sidebar on desktop */}
        <div className="order-1 md:order-2 w-[calc(100%-2rem)] mx-auto mt-6 mb-2 h-[55vh] min-h-[400px] rounded-[32px] md:w-[42%] md:m-0 md:h-[calc(100vh-var(--nav-height))] md:max-h-none relative md:sticky top-auto md:top-[var(--nav-height)] z-10 shrink-0 overflow-hidden md:rounded-none md:rounded-l-[32px] border border-black/10 md:border-y-0 md:border-r-0 md:border-l shadow-2xl md:shadow-sm">
          {leafletReady && <PropertiesMap properties={filtered} />}
        </div>
      </div>
    </div>
  );
}



