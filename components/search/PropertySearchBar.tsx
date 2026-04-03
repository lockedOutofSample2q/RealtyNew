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
    <div className={className ?? "w-full bg-white/10 backdrop-blur-3xl rounded-[28px] px-6 py-5 shadow-2xl shadow-black/10 border border-white/20"}>
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
          options={PRICES}
          onChange={(price) => setFilters({ ...filters, price })}
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
  );
}
