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
  const [mapTheme, setMapTheme] = useState<"light" | "satellite">("light");

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
          key={mapTheme}
          attribution={
            mapTheme === "light"
              ? '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              : 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
          }
          url={
            mapTheme === "light"
              ? "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
              : "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          }
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

      {/* Theme Toggle Button */}
      <div className="absolute bottom-6 right-6 z-[1000]">
        <button
          onClick={() => setMapTheme(mapTheme === "light" ? "satellite" : "light")}
          className="flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-md border border-black/10 rounded-full shadow-lg hover:bg-white transition-all group/btn"
        >
          <div className={cn(
            "w-5 h-5 rounded-md overflow-hidden border border-black/5 transition-transform group-hover/btn:scale-110",
            mapTheme === "light" ? "bg-black/5" : "bg-blue-500"
          )}>
            <img 
              src={mapTheme === "light" ? "/assets/images/lands/cholta-khurd-satellite-pin.png" : "/assets/images/home/hero.jpg"} 
              className="w-full h-full object-cover opacity-80"
              alt="Theme Preview"
            />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-black">
            {mapTheme === "light" ? "Satellite" : "Map"}
          </span>
        </button>
      </div>
    </div>
  );
}
