"use client";
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap, ZoomControl } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Link from "next/link";
import { useCurrency } from "@/context/CurrencyContext";
import type { Property } from "@/types";

// Fix Leaflet marker icons
const icon = L.icon({
  iconUrl: "/assets/marker-icon.png",
  shadowUrl: "/assets/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

// ── COMMUNITY COORDINATES ──────────────────────────────────
// Community-level coordinates for Mohali and Tricity areas
const COMMUNITY_COORDS: Record<string, [number, number]> = {
  "Aerocity": [30.6619, 76.7412],
  "IT City": [30.6550, 76.7250],
  "Sector 82": [30.6650, 76.7350],
  "Sector 88": [30.6973, 76.6903],
  "Mohali Phase 8A": [30.6973, 76.6903],
  "Sector 66": [30.6750, 76.7450],
  "Sector 67": [30.6850, 76.7550],
  "Sector 70": [30.7050, 76.7350],
  "New Chandigarh": [30.7850, 76.7250],
  "Zirakpur": [30.6450, 76.8250],
};

const DEFAULT_CENTER: [number, number] = [30.6973, 76.6903]; // Mohali center

function MapResizer() {
  const map = useMap();
  useEffect(() => {
    // Small delay to ensure container is rendered
    const timer = setTimeout(() => { 
      map.invalidateSize(); 
    }, 400);
    return () => clearTimeout(timer);
  }, [map]);
  return null;
}

export default function PropertiesMap({ 
  properties, 
  onPropertyClick, 
  hoveredId, 
  onHover 
}: { 
  properties: Property[], 
  onPropertyClick?: (p: Property) => void,
  hoveredId?: string | null,
  onHover?: (id: string | null) => void
}) {
  const { formatPrice } = useCurrency();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const [mapId] = useState(() => "map-" + Math.random().toString(36).substring(7));

  if (!isMounted) return null;

  return (
    <div className="w-full h-full rounded-[40px] overflow-hidden border border-black/5">
      <MapContainer
        id={mapId}
        center={DEFAULT_CENTER}
        zoom={12}
        style={{ height: "100%", width: "100%" }}
        scrollWheelZoom={false}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        <ZoomControl position="topleft" />
        <MapResizer />

        {properties.map((p) => {
          const isHovered = hoveredId === p.id;
          const position: [number, number] = (p.latitude && p.longitude)
            ? [p.latitude, p.longitude]
            : (COMMUNITY_COORDS[p.community] || DEFAULT_CENTER);

          // Create a custom icon that changes based on hover
          const iconColor = isHovered ? '#ef4444' : 'black'; // Red if hovered, black otherwise
          const iconScale = isHovered ? 'scale(1.3)' : 'scale(1)';
          
          const customIcon = L.divIcon({
            className: 'custom-div-icon',
            html: `<div style="background-color: ${iconColor}; color: white; border-radius: 50%; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; font-size: 10px; font-weight: bold; border: 2px solid white; transition: all 0.3s ease; transform: ${iconScale}; z-index: ${isHovered ? 1000 : 1};">1</div>`,
            iconSize: [32, 32],
            iconAnchor: [16, 16],
          });

          return (
            <Marker 
              key={p.id} 
              position={position} 
              icon={customIcon}
              eventHandlers={{
                mouseover: () => onHover?.(p.id),
                mouseout: () => onHover?.(null),
              }}
            >
              <Popup className="property-popup">
                <div className="p-1 min-w-[180px]">
                  {p.images?.[0] && (
                    <div className="relative w-full h-24 mb-3 rounded-lg overflow-hidden">
                      <img src={p.images[0]} alt={p.title} className="object-cover w-full h-full" />
                    </div>
                  )}
                  <h4 className="font-display font-bold text-sm mb-1 leading-tight">{p.title}</h4>
                  <p className="text-[11px] text-gray-500 mb-2">{p.community}</p>
                  <div className="flex items-center justify-between gap-4 border-t border-gray-100 pt-2">
                    <span className="font-body font-bold text-xs">{formatPrice(p.price)}</span>
                    {onPropertyClick ? (
                      <button
                        onClick={() => onPropertyClick(p)}
                        className="text-[10px] font-bold text-black hover:underline uppercase tracking-wider text-right"
                      >
                        Enquire
                      </button>
                    ) : (
                      <Link
                        href={`/properties/${p.slug}`}
                        className="text-[10px] font-bold text-blue-600 hover:underline uppercase tracking-wider"
                      >
                        Details
                      </Link>
                    )}
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
