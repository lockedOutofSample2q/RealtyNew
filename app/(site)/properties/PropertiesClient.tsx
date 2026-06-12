"use client";
import { useState, useEffect } from "react";
import type { Property } from "@/types";
import { usePropertyFilters } from "@/hooks/usePropertyFilters";
import { SearchTab, type PropertySearchFilters } from "@/components/search/propertySearchOptions";
import { PropertiesHero } from "@/components/properties/PropertiesHero";
import { MobileSearchModal } from "@/components/properties/MobileSearchModal";
import { PropertiesResultsBar } from "@/components/properties/PropertiesResultsBar";
import { PropertiesGrid } from "@/components/properties/PropertiesGrid";
import dynamic from "next/dynamic";
import LandsGrid from "@/components/lands/LandsGrid";

const PropertiesMapContainer = dynamic(
  () => import("@/components/properties/PropertiesMapContainer").then(mod => mod.PropertiesMapContainer),
  { ssr: false, loading: () => <div className="hidden lg:flex w-full h-full bg-slate-50 items-center justify-center font-body text-black/40 text-sm">Loading map...</div> }
);
import ContactModal from "@/components/lands/ContactModal";
import HeaderTransparency from "@/components/layout/HeaderTransparency";

interface Props {
  properties: Property[];
  initialTab?: SearchTab;
  initialFilters?: Partial<PropertySearchFilters>;
  seoData?: { h1_heading?: string; intro_paragraph?: string };
}

export default function PropertiesClient({ properties, initialTab, initialFilters, seoData }: Props) {
  const {
    tab,
    filters,
    setFilters,
    filtered,
    availableSectors,
    handleSearch,
    handleTabChange,
    resetFilters,
  } = usePropertyFilters(properties, initialTab, initialFilters);

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

  useEffect(() => {
    let title = "Properties in Mohali and Tricity: Verified, Evaluated, Honestly Presented";
    if (tab === "flats") {
      title = "Buy Flat in Mohali | Realty Holding and Management Consultants";
    } else if (tab === "houses") {
      title = "Buy house in Mohali with Realty Holding And Management Consultants";
    } else if (tab === "lands") {
      title = "Buy land in Mohali with Realty Holding And Management Consultants";
    }
    document.title = title;
  }, [tab]);

  const handleLandEnquire = (p: Property) => {
    setSelectedLand(p);
    setIsLandModalOpen(true);
  };

  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Flats for Sale in Mohali",
    "description": "Browse verified flats for sale in Mohali. Pre-launch, resale and ready possession listings by Realty Holding and Management Consultants.",
    "url": "https://www.realtyconsultants.in/properties/",
    "itemListElement": filtered.map((p, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": `${p.title} — ${p.bedrooms ? `${p.bedrooms_max && p.bedrooms_max !== p.bedrooms ? `${p.bedrooms}-${p.bedrooms_max}` : p.bedrooms} BHK ` : ''}Flat for Sale, ${p.location || 'Mohali'}`,
      "url": `https://www.realtyconsultants.in/properties/${p.entity_type === "house" ? "houses" : "flats"}/${p.slug}`
    }))
  };

  return (
    <div className="min-h-screen bg-white">
      <HeaderTransparency transparent={true} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <PropertiesHero
        tab={tab}
        onTabChange={handleTabChange}
        filters={filters}
        setFilters={setFilters}
        onSearch={handleSearch}
        onOpenMobileSearch={() => setIsSearchModalOpen(true)}
        availableSectors={availableSectors}
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
        availableSectors={availableSectors}
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
