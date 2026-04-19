"use client";
import { useState, useMemo, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { Property } from "@/types";
import {
  DEFAULT_PROPERTY_FILTERS,
  type PropertySearchFilters,
  type SearchTab,
} from "@/components/search/propertySearchOptions";

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

export function usePropertyFilters(properties: Property[]) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [tab, setTab] = useState<SearchTab>(
    (searchParams.get("tab") as SearchTab) || "apartments"
  );
  const [filters, setFilters] = useState<PropertySearchFilters>({
    ...DEFAULT_PROPERTY_FILTERS,
    city: searchParams.get("city") ?? "",
    sector: searchParams.getAll("sector").filter(Boolean) || [],
    type: searchParams.get("type") ?? "",
    bedrooms: searchParams.get("bedrooms") ?? "",
    furnishing: searchParams.get("furnishing") ?? "",
    price: searchParams.get("price") ?? "",
    currency: searchParams.get("currency") ?? "INR",
  });

  useEffect(() => {
    setTab((searchParams.get("tab") as SearchTab) || "apartments");
    setFilters({
      ...DEFAULT_PROPERTY_FILTERS,
      city: searchParams.get("city") ?? "",
      sector: searchParams.getAll("sector").filter(Boolean) || [],
      type: searchParams.get("type") ?? "",
      bedrooms: searchParams.get("bedrooms") ?? "",
      furnishing: searchParams.get("furnishing") ?? "",
      price: searchParams.get("price") ?? "",
      currency: searchParams.get("currency") ?? "INR",
    });
  }, [searchParams]);

  const filtered = useMemo(() => {
    const maxPrice = parseMaxPrice(filters.price);
    const desiredType = normalize(filters.type);
    const desiredCity = normalize(filters.city);
    const desiredSector = filters.sector;
    const desiredFurnishing = normalize(filters.furnishing);

    return properties.filter((p) => {
      // ── TYPE/TAB LOGIC ──────────────────────────────────────
      const pType = normalize(p.type);
      if (tab === "apartments") {
        if (!["apartment", "studio", "penthouse"].includes(pType)) return false;
      } else if (tab === "houses") {
        if (!["villa", "townhouse"].includes(pType)) return false;
      } else if (tab === "lands") {
        const isLandType = ["residential", "commercial", "agricultural", "industrial", "land", "plot"].includes(pType);
        const hasLandKeywords = 
          normalize(p.title).includes("land") || 
          normalize(p.title).includes("plot") || 
          normalize(p.description).includes("land") || 
          normalize(p.description).includes("plot") ||
          normalize(p.slug).includes("land") ||
          normalize(p.slug).includes("plot");
        
        if (!isLandType && !hasLandKeywords) return false;
      }

      if (filters.bedrooms && tab !== "lands") {
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

      if (desiredCity && desiredCity !== "all") {
        const inLocation = normalize(p.location).includes(desiredCity);
        const inCommunity = normalize(p.community).includes(desiredCity);
        if (!inLocation && !inCommunity) return false;
      }

      if (desiredSector && desiredSector.length > 0 && !desiredSector.includes("All") && !desiredSector.includes("all")) {
        const inSector = desiredSector.some(sec => {
          const normSec = normalize(sec);
          return normalize(p.location).includes(normSec) || normalize(p.community).includes(normSec);
        });
        if (!inSector) return false;
      }

      if (desiredFurnishing && desiredFurnishing !== "all furnishings") {
        const propertyFurnishing = normalize(
          p.furnishing === "semi-furnished" ? "partly furnished" : p.furnishing
        );
        if (propertyFurnishing !== desiredFurnishing) return false;
      }

      return true;
    });
  }, [properties, filters, tab]);

  function handleSearch(e?: React.FormEvent, forcedTab?: SearchTab) {
    if (e) e.preventDefault();
    const activeTab = forcedTab || tab;

    const params = new URLSearchParams();
    params.set("tab", activeTab);
    if (filters.city) params.set("city", filters.city);
    if (filters.sector && filters.sector.length > 0) {
      if (typeof filters.sector === "string") {
        params.append("sector", filters.sector as string);
      } else {
        (filters.sector as string[]).forEach(s => params.append("sector", s));
      }
    }
    if (filters.type) params.set("type", filters.type);
    if (filters.bedrooms && activeTab !== "lands") params.set("bedrooms", filters.bedrooms);
    if (filters.furnishing && activeTab !== "lands") params.set("furnishing", filters.furnishing);
    if (filters.price) params.set("price", filters.price);
    if (filters.currency) params.set("currency", filters.currency);

    router.push(`/properties?${params.toString()}`);
  }

  const handleTabChange = (newTab: SearchTab) => {
    setTab(newTab);
    handleSearch(undefined, newTab);
  };

  return {
    tab,
    setTab,
    filters,
    setFilters,
    filtered,
    handleSearch,
    handleTabChange,
    resetFilters: () => setFilters(DEFAULT_PROPERTY_FILTERS),
  };
}
