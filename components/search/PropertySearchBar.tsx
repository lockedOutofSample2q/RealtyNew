"use client";

import { motion } from "framer-motion";
import { Search } from "lucide-react";
import CustomSelect from "@/components/ui/CustomSelect";
import {
  BEDROOMS,
  FURNISHING,
  LOCATIONS,
  PRICES,
  PROPERTY_TYPES,
  type PropertySearchFilters,
  type SearchTab,
} from "@/components/search/propertySearchOptions";
import { useCurrency } from "@/context/CurrencyContext";
import { cn } from "@/lib/utils";

interface PropertySearchBarProps {
  tab: SearchTab;
  setTab: (tab: SearchTab) => void;
  filters: PropertySearchFilters;
  setFilters: (filters: PropertySearchFilters) => void;
  onSubmit: (e: React.FormEvent) => void;
  className?: string;
}

export default function PropertySearchBar({
  tab,
  setTab,
  filters,
  setFilters,
  onSubmit,
  className,
}: PropertySearchBarProps) {
  const { currency } = useCurrency();
  return (
    <div className={cn("relative", className ?? "w-full")}>
      <div className="absolute inset-0 z-0 bg-white/10 backdrop-blur-[64px] border border-white/20 rounded-[28px] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] pointer-events-none transform-gpu" />
      
      <div className="relative z-10 px-6 py-5">
        <div className="flex gap-6 mb-5 px-1">
        {(["buy", "rent"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`relative font-body text-[14px] font-medium transition-colors pb-1 ${
              tab === t ? "text-white" : "text-white/35 hover:text-white/60"
            }`}
            type="button"
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
            {tab === t && (
              <motion.div
                layoutId="activeTabHero"
                className="absolute left-0 right-0 bottom-0 h-[1.5px] bg-white rounded-full"
              />
            )}
          </button>
        ))}
      </div>

      <form onSubmit={onSubmit} className="flex flex-col md:flex-row items-end gap-3 w-full">
        <CustomSelect
          label="Location"
          value={filters.location}
          options={LOCATIONS}
          onChange={(location) => setFilters({ ...filters, location })}
          placeholder="All"
        />

        <CustomSelect
          label="Property Type"
          value={filters.type}
          options={PROPERTY_TYPES}
          onChange={(type) => setFilters({ ...filters, type })}
          placeholder="All"
        />

        <CustomSelect
          label="Bedrooms"
          value={filters.bedrooms}
          options={BEDROOMS}
          onChange={(bedrooms) => setFilters({ ...filters, bedrooms })}
          placeholder="Any"
        />

        <CustomSelect
          label="Furnishing"
          value={filters.furnishing}
          options={FURNISHING}
          onChange={(furnishing) => setFilters({ ...filters, furnishing })}
          placeholder="All furnishings"
          className="flex-[1.2]"
        />

        <CustomSelect
          label={`Price (${currency})`}
          value={filters.price}
          options={PRICES.map(p => p === "Any Price" ? p : `${p} ${currency}`)}
          onChange={(price) => setFilters({ ...filters, price: price.split(' ')[0].replace(/,/g, '') })}
          placeholder="Any Price"
          className="flex-[1.5]"
        />

        <div className="pt-[22px] w-full md:w-auto shrink-0">
          <button
            type="submit"
            className="flex items-center justify-center gap-2 bg-[#9A9590]/80 backdrop-blur-sm text-white font-body font-medium text-[13px] rounded-xl hover:bg-[#9A9590] hover:scale-[1.02] active:scale-[0.98] transition-all py-[13px] px-5 w-full md:w-auto shadow-lg border border-white/10"
          >
            <Search size={15} className="shrink-0" />
            Search properties
          </button>
        </div>
      </form>
      </div>
    </div>
  );
}
