// components/tools/area-calculator/DynamicResultsGrid.tsx
"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { UNITS, convertArea, formatValue, SystemId, UnitDefinition } from "@/lib/area-units";

interface DynamicResultsGridProps {
  inputValue: number;
  fromUnitId: string;
  systemId: SystemId;
}

export function DynamicResultsGrid({ inputValue, fromUnitId, systemId }: DynamicResultsGridProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const activeUnits = UNITS.filter(
    (u) => u.group === "universal" || (u.group === "punjab" && u.id !== "murabba")
  );

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-black/60">
          Converted Values
        </h3>
        <span className="text-xs text-black/40">Keystroke Live Update</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {activeUnits.map((unit) => {
          const rawVal = convertArea(inputValue, fromUnitId, unit.id, systemId);
          const formatted = formatValue(rawVal);
          const isFromUnit = unit.id === fromUnitId;
          const copyText = `${formatted} ${unit.plural}`;

          return (
            <div
              key={unit.id}
              className={`flex items-center justify-between p-3.5 rounded-lg border transition-all ${
                isFromUnit
                  ? "bg-black/5 border-black/30 shadow-sm"
                  : "bg-white border-black/10 hover:border-black/25"
              }`}
            >
              <div className="min-w-0 pr-2">
                <div className="text-xs text-black/50 font-medium truncate">{unit.name}</div>
                <div className="text-lg font-display font-semibold text-black tracking-tight truncate">
                  {inputValue === 0 ? "—" : formatted}
                </div>
              </div>
              <button
                type="button"
                onClick={() => handleCopy(copyText, unit.id)}
                title={`Copy ${copyText}`}
                className="p-2 rounded-md hover:bg-black/5 text-black/40 hover:text-black transition-colors shrink-0"
              >
                {copiedId === unit.id ? (
                  <Check className="w-4 h-4 text-emerald-600" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
