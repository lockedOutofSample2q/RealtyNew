// components/tools/area-calculator/CompositeBreakdown.tsx
"use client";

import {
  convertArea,
  getUrbanBreakdown,
  getAgriBreakdown,
  getRevenueBreakdown,
  SystemId,
  REGIONS,
} from "@/lib/area-units";
import { Layers, Building, Tractor, FileText } from "lucide-react";

interface CompositeBreakdownProps {
  inputValue: number;
  fromUnitId: string;
  systemId: SystemId;
}

export function CompositeBreakdown({ inputValue, fromUnitId, systemId }: CompositeBreakdownProps) {
  const sqft = convertArea(inputValue, fromUnitId, "sqft", systemId);

  const urban = getUrbanBreakdown(sqft, systemId);
  const agri = getAgriBreakdown(sqft, systemId);
  const revenue = getRevenueBreakdown(sqft, systemId);
  const activeRegion = REGIONS[systemId];

  return (
    <div className="w-full bg-black/[0.02] border border-black/10 rounded-xl p-5 space-y-4">
      <div className="flex items-center gap-2 border-b border-black/10 pb-3">
        <Layers className="w-4 h-4 text-black/60" />
        <h3 className="text-sm font-semibold uppercase tracking-wider text-black">
          Composite Land Breakdown
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Urban Notation */}
        <div className="bg-white border border-black/10 p-4 rounded-lg space-y-1.5 shadow-sm">
          <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-black/50">
            <Building className="w-3.5 h-3.5" />
            Urban Notation
          </div>
          <div className="text-base font-display font-semibold text-black">
            {sqft <= 0 ? "0 marla" : urban.formatted}
          </div>
          <p className="text-[11px] text-black/50 leading-normal">
            Standard residential plot format used across urban colonies & GMADA sectors.
          </p>
        </div>

        {/* Agricultural Notation */}
        <div className="bg-white border border-black/10 p-4 rounded-lg space-y-1.5 shadow-sm">
          <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-black/50">
            <Tractor className="w-3.5 h-3.5" />
            Agricultural Form
          </div>
          <div className="text-base font-display font-semibold text-black">
            {sqft <= 0 ? "0 killa" : agri.formatted}
          </div>
          <p className="text-[11px] text-black/50 leading-normal">
            Farmland standard (36×40 karam rect). 1 killa = 8 kanal (43,560 sq ft).
          </p>
        </div>

        {/* Revenue Record Form */}
        <div className="bg-white border border-black/10 p-4 rounded-lg space-y-1.5 shadow-sm">
          <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-black/50">
            <FileText className="w-3.5 h-3.5" />
            Revenue-Record Form
          </div>
          <div className="text-base font-display font-semibold text-black">
            {sqft <= 0 ? "0 bigha" : revenue.formatted}
          </div>
          <p className="text-[11px] text-black/50 leading-normal">
            Jamabandi tehsil record notation based on active region ({activeRegion.shortName}).
          </p>
        </div>
      </div>
    </div>
  );
}
