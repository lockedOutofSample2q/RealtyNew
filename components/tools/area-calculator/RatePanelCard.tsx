// components/tools/area-calculator/RatePanelCard.tsx
"use client";

import { useState } from "react";
import { DollarSign, ArrowLeftRight, Calculator } from "lucide-react";
import {
  convertArea,
  formatCurrencyINR,
  formatValue,
  UNITS,
  SystemId,
  REGIONS,
} from "@/lib/area-units";

interface RatePanelCardProps {
  inputValue: number;
  fromUnitId: string;
  systemId: SystemId;
}

export function RatePanelCard({ inputValue, fromUnitId, systemId }: RatePanelCardProps) {
  const [ratePerUnit, setRatePerUnit] = useState<string>("4500000");
  const [rateUnitId, setRateUnitId] = useState<string>(fromUnitId || "bigha");
  const [overrideTotalPrice, setOverrideTotalPrice] = useState<string>("");
  const [mode, setMode] = useState<"rate" | "total">("rate");

  const rateNum = parseFloat(ratePerUnit) || 0;
  const totalNum = parseFloat(overrideTotalPrice) || 0;

  // Calculate current area in rateUnit
  const areaInRateUnit = convertArea(inputValue, fromUnitId, rateUnitId, systemId);
  const sqftArea = convertArea(inputValue, fromUnitId, "sqft", systemId);

  // Total price calculation
  let computedTotalPrice = 0;
  let effectiveRatePerSqft = 0;

  if (mode === "rate") {
    computedTotalPrice = areaInRateUnit * rateNum;
    effectiveRatePerSqft = convertArea(1, rateUnitId, "sqft", systemId) > 0
      ? rateNum / convertArea(1, rateUnitId, "sqft", systemId)
      : 0;
  } else {
    computedTotalPrice = totalNum;
    effectiveRatePerSqft = sqftArea > 0 ? totalNum / sqftArea : 0;
  }

  const formattedTotal = formatCurrencyINR(computedTotalPrice);
  const activeRegion = REGIONS[systemId];

  // Rate table units to display
  const tableUnits = [
    { id: "sqft", name: "per sq ft" },
    { id: "sqyd", name: "per sq yd (gaj)" },
    { id: "marla", name: "per marla" },
    { id: "kanal", name: "per kanal" },
    { id: "bigha", name: `per bigha (${activeRegion.shortName})` },
    { id: "acre", name: "per acre / killa" },
    { id: "murabba", name: "per murabba" },
  ];

  return (
    <div className="w-full bg-white border border-black/15 rounded-xl p-6 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-black/10 pb-4">
        <div>
          <h2 className="font-display text-xl font-semibold text-black flex items-center gap-2">
            <Calculator className="w-5 h-5 text-black/70" />
            Land Rate & Total Price Panel
          </h2>
          <p className="text-xs text-black/60 mt-0.5">
            Convert seller quotes per bigha/marla into rate per sq ft and total deal value.
          </p>
        </div>

        {/* Mode Toggle */}
        <div className="flex items-center bg-black/5 p-1 rounded-lg border border-black/10">
          <button
            type="button"
            onClick={() => setMode("rate")}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
              mode === "rate"
                ? "bg-white text-black shadow-sm"
                : "text-black/60 hover:text-black"
            }`}
          >
            Enter Rate
          </button>
          <button
            type="button"
            onClick={() => setMode("total")}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
              mode === "total"
                ? "bg-white text-black shadow-sm"
                : "text-black/60 hover:text-black"
            }`}
          >
            Reverse (Enter Total Price)
          </button>
        </div>
      </div>

      {mode === "rate" ? (
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
          <div className="sm:col-span-7">
            <label htmlFor="rate-input" className="block text-xs font-semibold uppercase tracking-wider text-black/60 mb-2">
              Quoted Land Rate (INR)
            </label>
            <input
              id="rate-input"
              type="number"
              value={ratePerUnit}
              onChange={(e) => setRatePerUnit(e.target.value)}
              placeholder="e.g. 4500000"
              className="w-full bg-white border border-black/20 rounded-md px-4 py-3 text-lg font-display font-semibold text-black focus:outline-none focus:ring-2 focus:ring-black/20"
            />
          </div>
          <div className="sm:col-span-5">
            <label htmlFor="rate-unit-select" className="block text-xs font-semibold uppercase tracking-wider text-black/60 mb-2">
              Per Unit
            </label>
            <select
              id="rate-unit-select"
              value={rateUnitId}
              onChange={(e) => setRateUnitId(e.target.value)}
              className="w-full bg-white border border-black/20 rounded-md px-4 py-3 text-base font-medium text-black focus:outline-none focus:ring-2 focus:ring-black/20 cursor-pointer"
            >
              {UNITS.filter((u) => u.group === "punjab" || u.group === "universal").map((u) => (
                <option key={u.id} value={u.id}>
                  Per {u.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      ) : (
        <div>
          <label htmlFor="total-price-input" className="block text-xs font-semibold uppercase tracking-wider text-black/60 mb-2">
            Total Deal Value / Target Price (INR)
          </label>
          <input
            id="total-price-input"
            type="number"
            value={overrideTotalPrice}
            onChange={(e) => setOverrideTotalPrice(e.target.value)}
            placeholder="e.g. 33750000"
            className="w-full bg-white border border-black/20 rounded-md px-4 py-3 text-lg font-display font-semibold text-black focus:outline-none focus:ring-2 focus:ring-black/20"
          />
        </div>
      )}

      {/* Output A: Total Price Display */}
      <div className="bg-black text-white p-5 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-md">
        <div>
          <div className="text-xs uppercase tracking-wider text-white/60 font-semibold mb-1">
            Total Deal Value for {inputValue} {fromUnitId} ({activeRegion.shortName})
          </div>
          <div className="text-2xl sm:text-3xl font-display font-bold tracking-tight">
            {formattedTotal.formatted}
          </div>
        </div>
        <div className="px-4 py-2 bg-white/10 rounded-lg text-right">
          <span className="text-xs text-white/60 block">In Words</span>
          <span className="text-xl font-display font-bold text-amber-400">
            {formattedTotal.wordForm}
          </span>
        </div>
      </div>

      {/* Output B: Equivalent Rate Table */}
      <div className="space-y-3 pt-2">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-black/60 flex items-center gap-1.5">
          <ArrowLeftRight className="w-3.5 h-3.5" />
          Equivalent Rates Across Units
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {tableUnits.map((u) => {
            const sqftPerUnit = convertArea(1, u.id, "sqft", systemId);
            const rateForUnit = effectiveRatePerSqft * sqftPerUnit;
            const formattedRate = formatCurrencyINR(rateForUnit);

            return (
              <div key={u.id} className="p-3 bg-black/[0.02] border border-black/10 rounded-lg">
                <div className="text-xs text-black/50 font-medium capitalize">{u.name}</div>
                <div className="text-sm font-display font-semibold text-black mt-0.5">
                  {rateForUnit > 0 ? formattedRate.formatted : "—"}
                </div>
                {rateForUnit >= 100000 && (
                  <div className="text-[11px] font-medium text-amber-700">
                    ({formattedRate.wordForm})
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
