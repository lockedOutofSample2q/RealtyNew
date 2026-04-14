"use client";
// components/ui/PropertyGrid.tsx
// ============================================================
// PROPERTY GRID WITH FILTERS
// Reused on /off-plan and /rentals pages
// Filters are client-side for instant UX; URL params persist search state
// ============================================================

import { useState, useMemo } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { SlidersHorizontal, X, Search } from "lucide-react";
import PropertyCard from "./PropertyCard";
import type { Property, PropertyFilters } from "@/types";
import { cn } from "@/lib/utils";

interface Props {
  properties: Property[];
  listingType: "sale" | "rent" | "off-plan";
}

const LOCATIONS = [
  "All Locations",
  "Downtown Dubai",
  "Dubai Marina",
  "Palm Jumeirah",
  "Business Bay",
  "JVC",
  "DIFC",
  "Dubai Hills",
  "Creek Harbour",
  "Emaar Beachfront",
  "JBR",
  "MBR City",
];

const PROPERTY_TYPES = ["All Types", "Apartment", "Villa", "Penthouse", "Townhouse", "Studio"];
const BEDROOMS = ["Any", "Studio", "1", "2", "3", "4", "5+"];
const FURNISHING = ["Any", "Furnished", "Unfurnished", "Semi-Furnished"];

const SORT_OPTIONS = [
  { value: "newest", label: "Newest First" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "area-asc", label: "Area: Small to Large" },
];

export default function PropertyGrid({ properties, listingType }: Props) {
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<PropertyFilters>({});
  const [sort, setSort] = useState("newest");
  const [search, setSearch] = useState("");

  // ── Filter + Sort logic ───────────────────────────────────
  const filtered = useMemo(() => {
    let list = [...properties];

    // Text search
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.community.toLowerCase().includes(q) ||
          p.location.toLowerCase().includes(q) ||
          (p.developer ?? "").toLowerCase().includes(q)
      );
    }

    // Location
    if (filters.location) {
      list = list.filter((p) =>
        p.community.toLowerCase().includes(filters.location!.toLowerCase()) ||
        p.location.toLowerCase().includes(filters.location!.toLowerCase())
      );
    }

    // Property type
    if (filters.propertyType) {
      list = list.filter((p) => p.type === filters.propertyType);
    }

    // Bedrooms
    if (filters.bedrooms) {
      if (filters.bedrooms === "studio") {
        list = list.filter((p) => p.bedrooms === 0 || p.bedrooms === null);
      } else if (filters.bedrooms === "5+") {
        list = list.filter((p) => (p.bedrooms ?? 0) >= 5);
      } else {
        list = list.filter((p) => p.bedrooms === parseInt(filters.bedrooms!));
      }
    }

    // Furnishing
    if (filters.furnishing) {
      list = list.filter((p) =>
        p.furnishing.toLowerCase().includes(filters.furnishing!.toLowerCase())
      );
    }

    // Price
    if (filters.minPrice) list = list.filter((p) => p.price >= filters.minPrice!);
    if (filters.maxPrice) list = list.filter((p) => p.price <= filters.maxPrice!);

    // Sort
    switch (sort) {
      case "price-asc": list.sort((a, b) => a.price - b.price); break;
      case "price-desc": list.sort((a, b) => b.price - a.price); break;
      case "area-asc": list.sort((a, b) => a.area_sqft - b.area_sqft); break;
      default: list.sort((a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    }

    return list;
  }, [properties, filters, sort, search]);

  const activeFilterCount = Object.values(filters).filter(Boolean).length;

  function clearFilters() {
    setFilters({});
    setSearch("");
  }

  const selectClass =
    "bg-[#141414] border border-white/10 text-white/70 font-body text-sm px-3 py-2.5 outline-none focus:border-[var(--gold)] transition-colors w-full";

  return (
    <div>
      {/* ── Search + Filter Bar ─────────────────────────── */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        {/* Search input */}
        <div className="relative flex-1 max-w-sm">
          <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
          <input
            type="text"
            placeholder="Search by name, community..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#141414] border border-white/10 text-white font-body text-sm pl-9 pr-4 py-2.5 outline-none focus:border-[var(--gold)] transition-colors placeholder:text-white/30"
          />
        </div>

        <div className="flex items-center gap-3 ml-auto">
          {/* Sort */}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="bg-[#141414] border border-white/10 text-white/70 font-body text-sm px-3 py-2.5 outline-none focus:border-[var(--gold)] transition-colors"
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>

          {/* Filter toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={cn(
              "flex items-center gap-2 px-4 py-2.5 border font-body text-sm transition-all",
              showFilters || activeFilterCount > 0
                ? "border-[var(--gold)] text-[var(--gold)]"
                : "border-white/15 text-white/60 hover:border-white/30 hover:text-white"
            )}
          >
            <SlidersHorizontal size={14} />
            Filters
            {activeFilterCount > 0 && (
              <span className="bg-[var(--gold)] text-black text-xs rounded-full w-4 h-4 flex items-center justify-center font-medium">
                {activeFilterCount}
              </span>
            )}
          </button>

          {/* Clear */}
          {(activeFilterCount > 0 || search) && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-1.5 font-body text-xs text-white/40 hover:text-white transition-colors"
            >
              <X size={12} /> Clear
            </button>
          )}
        </div>
      </div>

      {/* ── Filter Panel ────────────────────────────────── */}
      {showFilters && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-6 p-5 bg-[#141414] border border-white/5">
          {/* Location */}
          <div>
            <label className="block font-body text-xs text-white/40 uppercase tracking-wide mb-1.5">Location</label>
            <select
              value={filters.location ?? ""}
              onChange={(e) => setFilters({ ...filters, location: e.target.value || undefined })}
              className={selectClass}
            >
              {LOCATIONS.map((l) => (
                <option key={l} value={l === "All Locations" ? "" : l}>{l}</option>
              ))}
            </select>
          </div>

          {/* Type */}
          <div>
            <label className="block font-body text-xs text-white/40 uppercase tracking-wide mb-1.5">Type</label>
            <select
              value={filters.propertyType ?? ""}
              onChange={(e) => setFilters({ ...filters, propertyType: e.target.value || undefined })}
              className={selectClass}
            >
              {PROPERTY_TYPES.map((t) => (
                <option key={t} value={t === "All Types" ? "" : t.toLowerCase()}>{t}</option>
              ))}
            </select>
          </div>

          {/* Bedrooms */}
          <div>
            <label className="block font-body text-xs text-white/40 uppercase tracking-wide mb-1.5">Bedrooms</label>
            <select
              value={filters.bedrooms ?? ""}
              onChange={(e) => setFilters({ ...filters, bedrooms: e.target.value || undefined })}
              className={selectClass}
            >
              {BEDROOMS.map((b) => (
                <option key={b} value={b === "Any" ? "" : b.toLowerCase()}>{b === "Any" ? "Any" : `${b} Bed`}</option>
              ))}
            </select>
          </div>

          {/* Furnishing */}
          <div>
            <label className="block font-body text-xs text-white/40 uppercase tracking-wide mb-1.5">Furnishing</label>
            <select
              value={filters.furnishing ?? ""}
              onChange={(e) => setFilters({ ...filters, furnishing: e.target.value || undefined })}
              className={selectClass}
            >
              {FURNISHING.map((f) => (
                <option key={f} value={f === "Any" ? "" : f.toLowerCase()}>{f}</option>
              ))}
            </select>
          </div>

          {/* Max Price */}
          <div>
            <label className="block font-body text-xs text-white/40 uppercase tracking-wide mb-1.5">Max Price (INR)</label>
            <select
              value={filters.maxPrice ?? ""}
              onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value ? +e.target.value : undefined })}
              className={selectClass}
            >
              <option value="">Any</option>
              {[500000, 1000000, 2000000, 3000000, 5000000, 10000000].map((p) => (
                <option key={p} value={p}>INR {p.toLocaleString()}</option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* ── Results count ───────────────────────────────── */}
      <div className="flex items-center justify-between mb-6">
        <p className="font-body text-sm text-white/40">
          {filtered.length} {filtered.length === 1 ? "property" : "properties"} found
        </p>
      </div>

      {/* ── Grid ────────────────────────────────────────── */}
      {filtered.length === 0 ? (
        <div className="py-20 text-center border border-white/5">
          <p className="font-body text-white/30 text-sm">No properties match your filters.</p>
          <button onClick={clearFilters} className="mt-3 font-body text-xs text-[var(--gold)] hover:text-[var(--gold-light)]">
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p) => (
            <PropertyCard key={p.id} property={p} />
          ))}
        </div>
      )}
    </div>
  );
}
