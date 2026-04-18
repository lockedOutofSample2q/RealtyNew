"use client";
import { useState, useEffect } from "react";
import type { Property } from "@/types";
import { usePropertyFilters } from "@/hooks/usePropertyFilters";
import { PropertiesHero } from "@/components/properties/PropertiesHero";
import { MobileSearchModal } from "@/components/properties/MobileSearchModal";
import { PropertiesResultsBar } from "@/components/properties/PropertiesResultsBar";
import { PropertiesGrid } from "@/components/properties/PropertiesGrid";
import { PropertiesMapContainer } from "@/components/properties/PropertiesMapContainer";

interface Props {
  properties: Property[];
}

export default function PropertiesClient({ properties }: Props) {
  const {
    tab,
    filters,
    setFilters,
    filtered,
    handleSearch,
    handleTabChange,
    resetFilters,
  } = usePropertyFilters(properties);

  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [leafletReady, setLeafletReady] = useState(false);

  useEffect(() => {
    // Leaflet needs the CSS too
    import("leaflet/dist/leaflet.css");
    setLeafletReady(true);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <PropertiesHero
        tab={tab}
        onTabChange={handleTabChange}
        filters={filters}
        setFilters={setFilters}
        onSearch={handleSearch}
        onOpenMobileSearch={() => setIsSearchModalOpen(true)}
      />

      <MobileSearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        tab={tab}
        onTabChange={handleTabChange}
        filters={filters}
        setFilters={setFilters}
        onSearch={handleSearch}
        onReset={resetFilters}
      />

      <PropertiesResultsBar count={filtered.length} />

      <div className="flex flex-col md:flex-row">
        <PropertiesGrid
          properties={filtered}
          onResetFilters={resetFilters}
        />
        <PropertiesMapContainer
          properties={filtered}
          leafletReady={leafletReady}
        />
      </div>
    </div>
  );
}
