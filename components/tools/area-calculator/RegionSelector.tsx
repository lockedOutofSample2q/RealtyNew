// components/tools/area-calculator/RegionSelector.tsx
"use client";

import { REGIONS, SystemId } from "@/lib/area-units";
import { MapPin } from "lucide-react";

interface RegionSelectorProps {
  value: SystemId;
  onChange: (region: SystemId) => void;
}

export function RegionSelector({ value, onChange }: RegionSelectorProps) {
  const selectedRegion = REGIONS[value];

  return (
    <div className="w-full space-y-2">
      <label htmlFor="region-select" className="block text-xs font-semibold uppercase tracking-wider text-black/60 flex items-center gap-1.5">
        <MapPin className="w-3.5 h-3.5 text-black/60" />
        Where is the land?
      </label>
      <select
        id="region-select"
        value={value}
        onChange={(e) => onChange(e.target.value as SystemId)}
        className="w-full bg-white border border-black/20 rounded-md px-4 py-3 text-sm font-medium text-black focus:outline-none focus:ring-2 focus:ring-black/20 transition-all shadow-sm cursor-pointer"
      >
        {Object.values(REGIONS).map((region) => (
          <option key={region.id} value={region.id}>
            {region.name}
          </option>
        ))}
      </select>

      {/* Persistent Inline Note when region is not Mohali/Standard System A */}
      {selectedRegion.note && (
        <div className="p-3.5 bg-amber-50 border border-amber-200/80 rounded-md text-xs text-amber-900 leading-relaxed font-body animate-fade-in mt-3">
          <strong className="font-semibold block mb-0.5">Regional Revenue Note:</strong>
          {selectedRegion.note}
        </div>
      )}
    </div>
  );
}
