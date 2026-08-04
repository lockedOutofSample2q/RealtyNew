// components/tools/area-calculator/AreaCalculatorClient.tsx
"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { UnitCombobox } from "./UnitCombobox";
import { RegionSelector } from "./RegionSelector";
import { DynamicResultsGrid } from "./DynamicResultsGrid";
import { CompositeBreakdown } from "./CompositeBreakdown";
import { PlotDimensionHelper } from "./PlotDimensionHelper";
import { RatePanelCard } from "./RatePanelCard";
import { SystemId, REGIONS, UNITS, convertArea } from "@/lib/area-units";
import { Calculator, RotateCcw } from "lucide-react";

export interface AreaCalculatorClientProps {
  initialValue?: number;
  initialFromUnit?: string;
  initialRegion?: SystemId;
}

function AreaCalculatorInner({ initialValue = 1, initialFromUnit = "bigha", initialRegion = "mohali" }: AreaCalculatorClientProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const paramV = searchParams.get("v");
  const paramFrom = searchParams.get("from");
  const paramRegion = searchParams.get("region");

  const [value, setValue] = useState<number>(() => {
    if (paramV && !isNaN(parseFloat(paramV))) return parseFloat(paramV);
    return initialValue;
  });

  const [fromUnit, setFromUnit] = useState<string>(() => {
    if (paramFrom && UNITS.some((u) => u.id === paramFrom)) return paramFrom;
    return initialFromUnit;
  });

  const [region, setRegion] = useState<SystemId>(() => {
    if (paramRegion && REGIONS[paramRegion as SystemId]) return paramRegion as SystemId;
    return initialRegion;
  });

  // Sync state to query parameters without page reload
  useEffect(() => {
    const params = new URLSearchParams();
    if (value !== 1) params.set("v", value.toString());
    if (fromUnit !== "bigha") params.set("from", fromUnit);
    if (region !== "mohali") params.set("region", region);

    const queryString = params.toString();
    const newUrl = queryString ? `${pathname}?${queryString}` : pathname;
    
    // Replace URL silently
    window.history.replaceState(null, "", newUrl);
  }, [value, fromUnit, region, pathname]);

  const handleReset = () => {
    setValue(1);
    setFromUnit("bigha");
    setRegion("mohali");
  };

  const handleApplyAreaFromHelper = (sqft: number) => {
    const converted = convertArea(sqft, "sqft", fromUnit, region);
    setValue(Number(converted.toFixed(4)));
  };

  return (
    <div className="space-y-8">
      {/* Interactive Tool Grid: Stack on mobile, two-column desktop */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Left Column: Inputs */}
        <div className="md:col-span-5 bg-white border border-black/15 rounded-xl p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-black/10 pb-4">
            <h2 className="font-display text-lg font-semibold text-black flex items-center gap-2">
              <Calculator className="w-5 h-5 text-black/70" />
              Area Input & Region
            </h2>
            <button
              type="button"
              onClick={handleReset}
              className="text-xs text-black/50 hover:text-black flex items-center gap-1 transition-colors"
              title="Reset inputs to default"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset
            </button>
          </div>

          {/* Area Value Input */}
          <div className="space-y-2">
            <label htmlFor="area-value-input" className="block text-xs font-semibold uppercase tracking-wider text-black/60">
              Land Area Value
            </label>
            <input
              id="area-value-input"
              type="number"
              step="any"
              min="0"
              max="1e12"
              value={value === 0 ? "" : value}
              onChange={(e) => {
                const val = parseFloat(e.target.value);
                setValue(isNaN(val) ? 0 : val);
              }}
              placeholder="Enter number (e.g. 1, 42.5)"
              className="w-full bg-white border border-black/20 rounded-md px-4 py-3 text-2xl font-display font-semibold text-black focus:outline-none focus:ring-2 focus:ring-black/20 shadow-sm"
              autoFocus
            />
          </div>

          {/* Unit Combobox */}
          <UnitCombobox
            id="unit-combobox"
            label="Convert From Unit"
            value={fromUnit}
            onChange={setFromUnit}
            systemId={region}
          />

          {/* Region Selector */}
          <RegionSelector value={region} onChange={setRegion} />
        </div>

        {/* Right Column: Live Results */}
        <div className="md:col-span-7 bg-white border border-black/15 rounded-xl p-6 shadow-sm space-y-6">
          <DynamicResultsGrid inputValue={value} fromUnitId={fromUnit} systemId={region} />
        </div>
      </div>

      {/* Plot Dimension Helper */}
      <PlotDimensionHelper onApplyAreaSqft={handleApplyAreaFromHelper} systemId={region} />

      {/* Composite Breakdown */}
      <CompositeBreakdown inputValue={value} fromUnitId={fromUnit} systemId={region} />

      {/* Rate Panel */}
      <RatePanelCard inputValue={value} fromUnitId={fromUnit} systemId={region} />
    </div>
  );
}

export function AreaCalculatorClient(props: AreaCalculatorClientProps) {
  return (
    <Suspense fallback={<div className="p-8 text-center text-black/50 animate-pulse">Loading Land Calculator...</div>}>
      <AreaCalculatorInner {...props} />
    </Suspense>
  );
}
