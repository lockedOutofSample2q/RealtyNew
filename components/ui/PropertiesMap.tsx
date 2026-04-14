"use client";
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Link from "next/link";
import { useCurrency } from "@/context/CurrencyContext";
import type { Property } from "@/types";

// Fix Leaflet marker icons
const icon = L.icon({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
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
    setTimeout(() => { map.invalidateSize(); }, 400);
  }, [map]);
  return null;
}

export default function PropertiesMap({ properties }: { properties: Property[] }) {
  const { formatPrice } = useCurrency();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return <div className="w-full h-full bg-slate-50" />;

  return (
    <div className="w-full h-full rounded-2xl overflow-hidden shadow-inner border border-black/5">
      <MapContainer
        center={DEFAULT_CENTER}
        zoom={12}
        style={{ height: "100%", width: "100%" }}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapResizer />

        {properties.map((p) => {
          // Use property lat/lng if available, otherwise fallback to community coords
          const position: [number, number] = (p.latitude && p.longitude)
            ? [p.latitude, p.longitude]
            : (COMMUNITY_COORDS[p.community] || DEFAULT_CENTER);

          return (
            <Marker key={p.id} position={position} icon={icon}>
              <Popup className="property-popup">
                <div className="p-1 min-w-[180px]">
                  <h4 className="font-display font-bold text-sm mb-1 leading-tight">{p.title}</h4>
                  <p className="text-[11px] text-gray-500 mb-2">{p.community}</p>
                  <div className="flex items-center justify-between gap-4 border-t border-gray-100 pt-2">
                    <span className="font-body font-bold text-xs">{formatPrice(p.price)}</span>
                    <Link
                      href={`/${p.slug}`}
                      className="text-[10px] font-bold text-blue-600 hover:underline uppercase tracking-wider"
                    >
                      Details
                    </Link>
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
