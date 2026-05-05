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
    "description": "Browse verified flats for sale in Mohali. Pre-launch, resale and ready possession listings by Realty Consultants.",
    "url": "https://www.realtyconsultants.in/properties/",
    "itemListElement": filtered.map((p, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": `${p.title} — ${p.bedrooms ? `${p.bedrooms_max && p.bedrooms_max !== p.bedrooms ? `${p.bedrooms}-${p.bedrooms_max}` : p.bedrooms} BHK ` : ''}Flat for Sale, ${p.location || 'Mohali'}`,
      "url": `https://www.realtyconsultants.in/properties/${p.slug}`
    }))
  };

  return (
    <div className="min-h-screen bg-white">
      {tab === "flats" && (
        <div className="sr-only">
          <h1>Buy Flat in Mohali</h1>
          <p>
            Buy flat in Mohali with verified listings from Realty Consultants.
            Explore 2 BHK, 3 BHK, and 4 BHK flats for sale in Mohali across
            top sectors including Sector 82A, 66B, 78, and the GMADA IT City
            corridor. All properties evaluated for RERA compliance, builder
            track record, and fair pricing. Whether you are looking for a
            pre-launch flat in Mohali, a resale apartment, or ready possession,
            our consultants guide you through every step.
          </p>
          <p>
            Buy flat in Mohali with Realty Consultants — Mohali's trusted real 
            estate advisory for luxury and investment-grade properties. Whether 
            you want to buy a 2 BHK, 3 BHK, or 4 BHK flat in Mohali, we offer 
            verified listings across Sector 66, 70, 77, 82A, 83A, 88, and 117. 
            Every flat for sale in Mohali on our platform is evaluated for RERA 
            compliance, builder track record, and fair market pricing. Browse 
            pre-launch flats in Mohali, resale apartments, and ready possession 
            units — all in one place. Looking to buy property in Mohali or the 
            wider Tricity region of Chandigarh, Panchkula, and Mohali? Our 
            consultants offer end-to-end guidance from site visits to 
            registration. Explore the best flats in Mohali today.
          </p>
        </div>
      )}
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
