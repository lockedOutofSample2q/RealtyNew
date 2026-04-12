"use client";
import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import Link from "next/link";
import type { Property } from "@/types";
import { useCurrency } from "@/context/CurrencyContext";

// Fix leaflet default marker icons (broken in webpack/Next.js)
const DefaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Community-level coordinates for Dubai areas
const COMMUNITY_COORDS: Record<string, [number, number]> = {
  "Downtown Dubai": [25.1972, 55.2744],
  "Dubai Marina": [25.0805, 55.1403],
  "Palm Jumeirah": [25.1124, 55.1390],
  "Business Bay": [25.1866, 55.2635],
  "JVC": [25.0499, 55.2069],
  "Jumeirah Village Circle": [25.0499, 55.2069],
  "Jumeirah": [25.2048, 55.2382],
  "DIFC": [25.2131, 55.2818],
  "Dubai Hills": [25.1066, 55.2464],
  "Dubai Hills Estate": [25.1066, 55.2464],
  "Creek Harbour": [25.2024, 55.3490],
  "Dubai Creek Harbour": [25.2024, 55.3490],
  "Al Barari": [25.1018, 55.3076],
  "Emaar Beachfront": [25.0792, 55.1302],
  "Palm Jebel Ali": [24.9958, 55.0145],
  "Dubai South": [24.8963, 55.1545],
  "MBR City": [25.1698, 55.3117],
  "Mohammed Bin Rashid City": [25.1698, 55.3117],
  "Arabian Ranches": [25.0544, 55.2697],
  "Dubai Land": [25.0765, 55.3095],
  "Meydan": [25.1687, 55.3015],
  "Al Furjan": [25.0273, 55.1511],
  "Town Square": [24.9964, 55.2418],
  "Sobha Hartland": [25.1905, 55.3282],
  "Tilal Al Ghaf": [25.0352, 55.2338],
};

function getCoords(property: Property): [number, number] | null {
  const key = Object.keys(COMMUNITY_COORDS).find(
    (k) =>
      property.community?.toLowerCase().includes(k.toLowerCase()) ||
      k.toLowerCase().includes(property.community?.toLowerCase())
  );
  return key ? COMMUNITY_COORDS[key] : null;
}

// Slight jitter to avoid exact overlapping pins
function jitter(coord: [number, number], index: number): [number, number] {
  const offset = 0.002;
  return [
    coord[0] + (Math.sin(index * 2.4) * offset),
    coord[1] + (Math.cos(index * 2.4) * offset),
  ];
}

function FitBounds({ coords }: { coords: [number, number][] }) {
  const map = useMap();
  useEffect(() => {
    if (coords.length > 0) {
      const bounds = L.latLngBounds(coords);
      map.fitBounds(bounds, { padding: [60, 60] });
    }
  }, [map, coords]);
  return null;
}

interface Props {
  properties: Property[];
}

export default function PropertiesMap({ properties }: Props) {
  const { formatPrice } = useCurrency();
  useEffect(() => {
    L.Marker.prototype.options.icon = DefaultIcon;
  }, []);

  const mapped = properties
    .map((p, i) => {
      const raw = getCoords(p);
      if (!raw) return null;
      return { property: p, coords: jitter(raw, i) };
    })
    .filter(Boolean) as { property: Property; coords: [number, number] }[];

  const allCoords = mapped.map((m) => m.coords);
  const officeCoords: [number, number] = [25.2048, 55.2382]
  const center: [number, number] = allCoords.length > 0 ? allCoords[0] : officeCoords

  return (
    <MapContainer
      center={center}
      zoom={11}
      style={{ width: "100%", height: "100%" }}
      zoomControl={true}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {allCoords.length > 0 && <FitBounds coords={allCoords} />}
      {mapped.map(({ property, coords }) => (
        <Marker key={property.id} position={coords} icon={DefaultIcon}>
          <Popup maxWidth={220}>
            <div className="text-xs">
              <p className="font-bold text-black text-sm leading-tight mb-1">{property.title}</p>
              <p className="text-gray-500 mb-2">{property.community}, {property.location}</p>
              <p className="font-semibold text-black">
                {property.price > 0
                  ? formatPrice(property.price)
                  : "Price on request"}
              </p>
              <Link
                href={`/${property.slug}`}
                className="inline-block mt-2 text-xs text-black underline"
              >
                View property →
              </Link>
            </div>
          </Popup>
        </Marker>
      ))}

      {/* Office marker fallback */}
      <Marker key="office" position={officeCoords} icon={DefaultIcon}>
        <Popup maxWidth={220}>
          <div className="text-xs">
            <p className="font-bold text-black text-sm leading-tight mb-1">Montere Real Estate</p>
            <p className="text-gray-500 mb-2">Office</p>
            <Link href="/contact" className="inline-block mt-2 text-xs text-black underline">Contact us →</Link>
          </div>
        </Popup>
      </Marker>
    </MapContainer>
  );
}
