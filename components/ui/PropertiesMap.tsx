"use client";
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap, ZoomControl } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Link from "next/link";
import { useCurrency } from "@/context/CurrencyContext";
import type { Property } from "@/types";
import { cn } from "@/lib/utils";

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
  const [mapTheme, setMapTheme] = useState<"light" | "satellite">("light");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const [mapId] = useState(() => "map-" + Math.random().toString(36).substring(7));

  if (!isMounted) return null;

  return (
    <div className="w-full h-full rounded-[40px] overflow-hidden border border-black/5 relative group">
      <MapContainer
        id={mapId}
        center={DEFAULT_CENTER}
        zoom={12}
        style={{ height: "100%", width: "100%" }}
        scrollWheelZoom={false}
        zoomControl={false}
      >
        <TileLayer
          key={mapTheme}
          attribution={
            mapTheme === "light"
              ? '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
              : 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
          }
          url={
            mapTheme === "light"
              ? "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
              : "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          }
        />
        <ZoomControl position="topleft" />
        <MapResizer />

        {/* Theme Toggle Button */}
        <div className="absolute bottom-6 right-6 z-[1000]">
          <button
            onClick={() => setMapTheme(mapTheme === "light" ? "satellite" : "light")}
            className="flex items-center gap-2 px-4 py-2.5 bg-white/90 backdrop-blur-md border border-black/10 rounded-full shadow-lg hover:bg-white transition-all group/btn"
          >
            <div className={cn(
              "w-6 h-6 rounded-md overflow-hidden border border-black/5 transition-transform group-hover/btn:scale-110",
              mapTheme === "light" ? "bg-black/5" : "bg-blue-500"
            )}>
              <img 
                src={mapTheme === "light" ? "/assets/images/lands/cholta-khurd-satellite-pin.png" : "/assets/images/home/hero.jpg"} 
                className="w-full h-full object-cover opacity-80"
                alt="Theme Preview"
              />
            </div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-black">
              {mapTheme === "light" ? "Satellite View" : "Map View"}
            </span>
          </button>
        </div>

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
                  <div className="border-t border-gray-100 pt-2 space-y-2">
                    <div className="flex items-center justify-between gap-4">
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
                    <a 
                      href={`https://www.google.com/maps/search/?api=1&query=${position[0]},${position[1]}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-[10px] font-bold text-black/30 hover:text-black hover:underline uppercase tracking-wider"
                    >
                      Open on Map
                    </a>
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
