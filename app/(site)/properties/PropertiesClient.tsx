"use client";
import { useState, useEffect } from "react";
import type { Property } from "@/types";
import { usePropertyFilters } from "@/hooks/usePropertyFilters";
import { SearchTab } from "@/components/search/propertySearchOptions";
import { PropertiesHero } from "@/components/properties/PropertiesHero";
import { MobileSearchModal } from "@/components/properties/MobileSearchModal";
import { PropertiesResultsBar } from "@/components/properties/PropertiesResultsBar";
import { PropertiesGrid } from "@/components/properties/PropertiesGrid";
import { PropertiesMapContainer } from "@/components/properties/PropertiesMapContainer";
import LandsGrid from "@/components/lands/LandsGrid";
import ContactModal from "@/components/lands/ContactModal";

interface Props {
  properties: Property[];
  initialTab?: SearchTab;
}

export default function PropertiesClient({ properties, initialTab }: Props) {
  const {
    tab,
    filters,
    setFilters,
    filtered,
    handleSearch,
    handleTabChange,
    resetFilters,
  } = usePropertyFilters(properties, initialTab);

  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [leafletReady, setLeafletReady] = useState(false);
  const [selectedLand, setSelectedLand] = useState<Property | null>(null);
  const [isLandModalOpen, setIsLandModalOpen] = useState(false);
  const [hoveredPropertyId, setHoveredPropertyId] = useState<string | null>(null);

  useEffect(() => {
    // Leaflet needs the CSS too
    import("leaflet/dist/leaflet.css");
    setLeafletReady(true);
  }, []);

  const handleLandEnquire = (p: Property) => {
    setSelectedLand(p);
    setIsLandModalOpen(true);
  };

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
        {tab === "lands" ? (
          <LandsGrid 
            properties={filtered} 
            onEnquire={handleLandEnquire} 
            hoveredId={hoveredPropertyId}
            onHover={setHoveredPropertyId}
          />
        ) : (
          <PropertiesGrid
            properties={filtered}
            onResetFilters={resetFilters}
            hoveredId={hoveredPropertyId}
            onHover={setHoveredPropertyId}
          />
        )}
        <PropertiesMapContainer
          properties={filtered}
          leafletReady={leafletReady}
          onPropertyClick={tab === "lands" ? handleLandEnquire : undefined}
          hoveredId={hoveredPropertyId}
          onHover={setHoveredPropertyId}
          tab={tab}
        />
      </div>

      <ContactModal
        isOpen={isLandModalOpen}
        property={selectedLand}
        onClose={() => setIsLandModalOpen(false)}
      />
    </div>
  );
}
