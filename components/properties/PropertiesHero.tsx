"use client";
import Image from "next/image";
import { Search } from "lucide-react";
import PropertySearchBar from "@/components/search/PropertySearchBar";
import { propertiesPage } from "@/config/site";
import type { PropertySearchFilters, SearchTab } from "@/components/search/propertySearchOptions";

interface PropertiesHeroProps {
  tab: SearchTab;
  onTabChange: (tab: SearchTab) => void;
  filters: PropertySearchFilters;
  setFilters: (filters: PropertySearchFilters) => void;
  onSearch: (e?: React.FormEvent) => void;
  onOpenMobileSearch: () => void;
}

export function PropertiesHero({
  tab,
  onTabChange,
  filters,
  setFilters,
  onSearch,
  onOpenMobileSearch,
}: PropertiesHeroProps) {
  const isFilterActive = [
    filters.city,
    ...(Array.isArray(filters.sector) ? filters.sector : []),
    filters.type,
    filters.bedrooms,
    filters.furnishing,
    filters.price
  ].some(Boolean);

  return (
    <div className="relative w-full h-[52vh] min-h-[360px] flex flex-col items-center justify-center pt-[calc(var(--nav-height)+2rem)]">
      <Image
        src="/assets/images/home/hero-bg.jpg"
        alt="Properties properties"
        fill
        className="object-cover"
        priority
        quality={100}
      />
      <div className="absolute inset-0 bg-black/55" />

      <div className="relative z-10 text-center px-4">
        <h1 className="text-white font-semibold text-[clamp(1.8rem,4vw,3rem)] leading-[1.2] tracking-tight max-w-2xl mx-auto mb-3">
          {propertiesPage.hero.headline}
        </h1>
        <p className="text-white/60 text-[clamp(13px,1.2vw,15px)] max-w-lg mx-auto">
          {propertiesPage.hero.subline}
        </p>
      </div>

      <button
        onClick={onOpenMobileSearch}
        className="md:hidden relative z-10 mt-6 w-[90%] max-w-[400px] bg-white text-black py-4 px-6 rounded-2xl flex items-center gap-3 shadow-xl font-body font-medium active:scale-95 transition-transform"
      >
        <Search size={20} className="text-black/50 shrink-0" />
        <span className="flex-1 text-left text-[15px]">
          {isFilterActive ? "Filters active — tap to edit" : "Search properties"}
        </span>
      </button>

      <PropertySearchBar
        tab={tab}
        setTab={onTabChange}
        filters={filters}
        setFilters={setFilters}
        onSubmit={onSearch}
        className="hidden md:block relative z-10 mt-8 w-[90%] max-w-[1100px]"
      />
    </div>
  );
}
