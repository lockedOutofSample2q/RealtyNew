// components/tools/area-calculator/PlotDimensionHelper.tsx
"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Ruler, Sparkles } from "lucide-react";
import { SystemId, REGIONS } from "@/lib/area-units";

interface PlotDimensionHelperProps {
  onApplyAreaSqft: (sqft: number) => void;
  systemId: SystemId;
}

export function PlotDimensionHelper({ onApplyAreaSqft, systemId }: PlotDimensionHelperProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [length, setLength] = useState<string>("198");
  const [width, setWidth] = useState<string>("220");
  const [unit, setUnit] = useState<"ft" | "m" | "karam">("ft");

  const lNum = parseFloat(length) || 0;
  const wNum = parseFloat(width) || 0;

  const karamInches = REGIONS[systemId]?.karamInches ?? 66;
  const karamFeet = karamInches / 12;

  let totalSqft = 0;
  if (unit === "ft") {
    totalSqft = lNum * wNum;
  } else if (unit === "m") {
    totalSqft = lNum * wNum * 10.763910416709722;
  } else if (unit === "karam") {
    totalSqft = lNum * wNum * karamFeet * karamFeet;
  }

  const handleApply = () => {
    if (totalSqft > 0) {
      onApplyAreaSqft(totalSqft);
    }
  };

  const handlePresetKilla = () => {
    setLength("198");
    setWidth("220");
    setUnit("ft");
    onApplyAreaSqft(43560);
  };

  return (
    <div className="w-full border border-black/15 rounded-xl bg-white overflow-hidden shadow-sm">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 bg-black/[0.02] hover:bg-black/[0.04] transition-colors text-left"
      >
        <div className="flex items-center gap-2">
          <Ruler className="w-4 h-4 text-black/70" />
          <span className="text-sm font-semibold text-black">
            Calculate Area from Length & Width Dimensions
          </span>
        </div>
        {isOpen ? (
          <ChevronUp className="w-4 h-4 text-black/50" />
        ) : (
          <ChevronDown className="w-4 h-4 text-black/50" />
        )}
      </button>

      {isOpen && (
        <div className="p-4 border-t border-black/10 space-y-4 animate-fade-in">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label htmlFor="dimension-length" className="block text-xs font-semibold uppercase tracking-wider text-black/60 mb-1.5">
                Length
              </label>
              <input
                id="dimension-length"
                type="number"
                value={length}
                onChange={(e) => setLength(e.target.value)}
                placeholder="e.g. 198"
                className="w-full bg-white border border-black/20 rounded-md px-3 py-2 text-sm text-black focus:outline-none focus:ring-2 focus:ring-black/20"
              />
            </div>
            <div>
              <label htmlFor="dimension-width" className="block text-xs font-semibold uppercase tracking-wider text-black/60 mb-1.5">
                Width
              </label>
              <input
                id="dimension-width"
                type="number"
                value={width}
                onChange={(e) => setWidth(e.target.value)}
                placeholder="e.g. 220"
                className="w-full bg-white border border-black/20 rounded-md px-3 py-2 text-sm text-black focus:outline-none focus:ring-2 focus:ring-black/20"
              />
            </div>
            <div>
              <label htmlFor="dimension-unit-select" className="block text-xs font-semibold uppercase tracking-wider text-black/60 mb-1.5">
                Dimension Unit
              </label>
              <select
                id="dimension-unit-select"
                value={unit}
                onChange={(e) => setUnit(e.target.value as any)}
                className="w-full bg-white border border-black/20 rounded-md px-3 py-2 text-sm text-black focus:outline-none focus:ring-2 focus:ring-black/20"
              >
                <option value="ft">Feet (ft)</option>
                <option value="m">Metres (m)</option>
                <option value="karam">Karam ({karamInches} in)</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-black/10">
            <div className="text-sm font-medium text-black">
              Resulting Area:{" "}
              <span className="font-semibold font-display">
                {totalSqft > 0 ? `${Math.round(totalSqft).toLocaleString()} sq ft` : "0 sq ft"}
              </span>
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                type="button"
                onClick={handlePresetKilla}
                className="px-3 py-2 text-xs font-semibold text-black/70 bg-black/5 hover:bg-black/10 rounded-md transition-colors flex items-center gap-1"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Preset: 1 Killa (198' × 220')
              </button>
              <button
                type="button"
                onClick={handleApply}
                className="px-4 py-2 text-xs font-semibold text-white bg-black hover:bg-black/80 rounded-md transition-colors shadow-sm"
              >
                Use in Converter
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
