"use client";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import { cn } from "@/lib/utils";

const PIN = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export default function PropertyDetailMap({
  lat,
  lng,
  title,
}: {
  lat: number;
  lng: number;
  title: string;
}) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    L.Marker.prototype.options.icon = PIN;
    setIsMounted(true);
  }, []);

  if (!isMounted) return <div className="w-full h-full bg-slate-50" />;
  return (
    <div className="w-full h-full relative">
      <MapContainer
        center={[lat, lng]}
        zoom={14}
        style={{ width: "100%", height: "100%" }}
        zoomControl={true}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        <Marker position={[lat, lng]} icon={PIN}>
          <Popup>
            <div className="p-1">
              <p className="font-bold mb-1">{title}</p>
              <a 
                href={`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] font-bold text-blue-600 hover:underline uppercase tracking-wider"
              >
                Open on Map
              </a>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
