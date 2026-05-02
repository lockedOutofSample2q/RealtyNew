"use client";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from "react-leaflet";
import { siteConfig } from "@/config/site";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// E328 Industrial area phase 8A, Mohali
const position: [number, number] = [30.697598112132287, 76.69033031116615];

const CustomIcon = L.divIcon({
  className: "bg-transparent border-none",
  html: `<div style="width:24px;height:24px;background-color:black;border-radius:50%;border:4px solid white;box-shadow:0 4px 12px rgba(0,0,0,0.3);"></div>`,
  iconSize: [24, 24],
  iconAnchor: [12, 12],
});

export default function ContactMap() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  if (!isMounted) return <div className="w-full h-full bg-slate-50" />;

  return (
    <div className="w-full h-full relative group">
      <style jsx global>{`
        .leaflet-control-zoom {
          border: none !important;
          margin: 24px !important;
          box-shadow: 0 10px 30px rgba(0,0,0,0.15) !important;
        }
        .leaflet-control-zoom-in, .leaflet-control-zoom-out {
          background-color: #1A1A1A !important;
          color: white !important;
          border: 1px solid rgba(255,255,255,0.1) !important;
          width: 44px !important;
          height: 44px !important;
          line-height: 44px !important;
          font-size: 20px !important;
          transition: all 0.3s ease !important;
        }
        .leaflet-control-zoom-in {
          border-radius: 12px 12px 0 0 !important;
        }
        .leaflet-control-zoom-out {
          border-radius: 0 0 12px 12px !important;
        }
        .leaflet-control-zoom-in:hover, .leaflet-control-zoom-out:hover {
          background-color: #333 !important;
          color: #C9A84C !important;
        }
      `}</style>
      <MapContainer
        center={position}
        zoom={14}
        style={{ width: "100%", height: "100%", zIndex: 10 }}
        zoomControl={false}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />
        <ZoomControl position="topright" />
        <Marker position={position} icon={CustomIcon}>
          <Popup>
            <div className="font-body text-sm font-semibold mb-1">Realty Holding & Management Consultants</div>
            <div className="font-body text-xs text-black/60 mb-2">{siteConfig.contact.address}</div>
            <a 
              href={siteConfig.contact.mapUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-xs text-blue-600 font-medium hover:underline inline-flex items-center"
            >
              Open in Google Maps <span className="ml-1">→</span>
            </a>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
