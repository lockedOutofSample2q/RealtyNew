"use client";
import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Prime Tower, Business Bay
const position: [number, number] = [25.1866, 55.2635];

const CustomIcon = L.divIcon({
  className: "bg-transparent border-none",
  html: `<div style="width:24px;height:24px;background-color:black;border-radius:50%;border:4px solid white;box-shadow:0 4px 12px rgba(0,0,0,0.3);"></div>`,
  iconSize: [24, 24],
  iconAnchor: [12, 12],
});

export default function ContactMap() {
  return (
    <div style={{ padding: "0", margin: "0", width: "100%", height: "100%" }}>
      <MapContainer
        center={position}
        zoom={14}
        style={{ width: "100%", height: "100%", zIndex: 1 }}
        zoomControl={true}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />
        <Marker position={position} icon={CustomIcon}>
          <Popup>
            <div className="font-body text-sm font-semibold">Monte Real Estate</div>
            <div className="font-body text-xs text-black/60">Prime Tower, Business Bay</div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
