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

export function usePropertyFilters(
  properties: Property[],
  initialTab?: SearchTab,
  initialFilters?: Partial<PropertySearchFilters>
) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [tab, setTab] = useState<SearchTab>(
    initialTab || (searchParams.get("tab") as SearchTab) || "flats"
  );

  const [filters, setFilters] = useState<PropertySearchFilters>({
    ...DEFAULT_PROPERTY_FILTERS,
    city: searchParams.get("city") ?? initialFilters?.city ?? "",
    sector: searchParams.getAll("sector").filter(Boolean).length > 0 
      ? searchParams.getAll("sector").filter(Boolean) 
      : initialFilters?.sector ?? [],
    type: searchParams.get("type") ?? initialFilters?.type ?? "",
    bedrooms: searchParams.get("bedrooms") ?? initialFilters?.bedrooms ?? "",
    furnishing: searchParams.get("furnishing") ?? initialFilters?.furnishing ?? "",
    price: searchParams.get("price") ?? initialFilters?.price ?? "",
    currency: searchParams.get("currency") ?? initialFilters?.currency ?? "INR",
  });

  useEffect(() => {
    const tabFromUrl = searchParams.get("tab") as SearchTab;
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
    
    // Only update from search params if they exist, otherwise keep current filters 
    // to preserve initialFilters if we are on a clean URL.
    if (Array.from(searchParams.keys()).length > 0) {
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
    }
  }, [searchParams]);

  // Dynamically compute available sectors based on the loaded properties, selected city, and current tab
  const availableSectors = useMemo(() => {
    const sectors = new Set<string>();
    
    properties.forEach(p => {
      // Filter by current tab (entity_type) first
      if (tab === "flats" && p.entity_type !== 'apartment') return;
      if (tab === "houses" && p.entity_type !== 'house') return;
      if (tab === "lands" && p.entity_type !== 'land') return;

      const loc = p.location || p.community || "";
      
      // If a city is selected, only consider properties in that city
      if (filters.city && filters.city !== "All") {
        if (!normalize(loc).includes(normalize(filters.city))) {
          return;
        }
      }
      
      if (p.community) {
        sectors.add(p.community);
      } else if (p.location) {
        const parts = p.location.split(',').map(s => s.trim());
        if (parts.length > 0) {
          sectors.add(parts[0]);
        }
      }
    });
    
    return ["All", ...Array.from(sectors).sort()];
  }, [properties, filters.city, tab]);

  const filtered = useMemo(() => {
    const maxPrice = parseMaxPrice(filters.price);
    const desiredType = normalize(filters.type);
    const desiredCity = normalize(filters.city);
    const desiredSector = filters.sector;
    const desiredFurnishing = normalize(filters.furnishing);

    return properties.filter((p) => {
      // ── TYPE/TAB LOGIC (Strictly based on entity_type) ──────
      if (tab === "flats") {
        if (p.entity_type !== 'apartment') return false;
      } 
      else if (tab === "houses") {
        if (p.entity_type !== 'house') return false;
      } 
      else if (tab === "lands") {
        if (p.entity_type !== 'land') return false;
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

    // Check if ONLY a single sector is selected (and no other complex filters that require query params)
    // For now, if there's exactly one sector, and it's for 'flats', we can route to the clean URL.
    const isCleanSectorRoute = activeTab === "flats" && filters.sector.length === 1 && filters.sector[0] !== "All" && filters.sector[0] !== "all";
    
    if (isCleanSectorRoute) {
      const sectorSlug = filters.sector[0].toLowerCase().replace(/\s+/g, '-');
      // If there are other filters, append them as query params to the clean URL
      const params = new URLSearchParams();
      if (filters.city) params.set("city", filters.city);
      if (filters.type) params.set("type", filters.type);
      if (filters.bedrooms) params.set("bedrooms", filters.bedrooms);
      if (filters.furnishing) params.set("furnishing", filters.furnishing);
      if (filters.price) params.set("price", filters.price);
      if (filters.currency && filters.currency !== "INR") params.set("currency", filters.currency);
      
      const queryString = params.toString();
      const path = `/flats/${sectorSlug}`;
      router.push(queryString ? `${path}?${queryString}` : path);
      return;
    }

    const params = new URLSearchParams();
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

    const queryString = params.toString();
    const path = `/properties/${activeTab}`;
    router.push(queryString ? `${path}?${queryString}` : path);
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
    availableSectors,
    handleSearch,
    handleTabChange,
    resetFilters: () => setFilters(DEFAULT_PROPERTY_FILTERS),
  };
}
