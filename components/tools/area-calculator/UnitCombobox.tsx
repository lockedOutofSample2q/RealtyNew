// components/tools/area-calculator/UnitCombobox.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { Search, ChevronDown, Check } from "lucide-react";
import { UNITS, UnitDefinition, SystemId } from "@/lib/area-units";

interface UnitComboboxProps {
  value: string;
  onChange: (unitId: string) => void;
  systemId: SystemId;
  label?: string;
  id?: string;
}

export function UnitCombobox({ value, onChange, systemId, label, id }: UnitComboboxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedUnit = UNITS.find((u) => u.id === value) || UNITS[0];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredUnits = UNITS.filter((u) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase().trim();
    return (
      u.name.toLowerCase().includes(q) ||
      u.plural.toLowerCase().includes(q) ||
      u.aliases.some((a) => a.toLowerCase().includes(q))
    );
  });

  const punjabUnits = filteredUnits.filter((u) => u.group === "punjab");
  const universalUnits = filteredUnits.filter((u) => u.group === "universal");
  const regionalUnits = filteredUnits.filter((u) => u.group === "regional");

  const handleSelect = (unitId: string) => {
    onChange(unitId);
    setIsOpen(false);
    setSearch("");
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      {label && (
        <label htmlFor={id} className="block text-xs font-semibold uppercase tracking-wider text-black/60 mb-2">
          {label}
        </label>
      )}
      <button
        type="button"
        id={id}
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between bg-white border border-black/20 rounded-md px-4 py-3 text-left text-base font-medium text-black hover:border-black/40 focus:outline-none focus:ring-2 focus:ring-black/20 transition-all shadow-sm"
      >
        <span className="truncate">{selectedUnit.name}</span>
        <ChevronDown className="w-4 h-4 text-black/50 ml-2 shrink-0" />
      </button>

      {isOpen && (
        <div className="absolute z-50 left-0 right-0 mt-2 bg-white border border-black/15 rounded-lg shadow-xl overflow-hidden max-h-80 flex flex-col animate-fade-in">
          {/* Search bar */}
          <div className="p-2 border-b border-black/10 sticky top-0 bg-white z-10">
            <div className="relative flex items-center">
              <Search className="w-4 h-4 text-black/40 absolute left-3 pointer-events-none" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search unit or alias (e.g. bigha, marla, gaj)..."
                className="w-full pl-9 pr-3 py-2 text-sm border border-black/10 rounded-md focus:outline-none focus:border-black/30 bg-black/[0.02]"
                autoFocus
              />
            </div>
          </div>

          {/* Grouped Options list */}
          <div className="overflow-y-auto flex-1 p-1">
            {filteredUnits.length === 0 ? (
              <div className="p-4 text-center text-sm text-black/50">No units matching "{search}"</div>
            ) : (
              <>
                {punjabUnits.length > 0 && (
                  <div className="mb-2">
                    <div className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-black/40 bg-black/[0.02] rounded">
                      Punjab & Tricity Units
                    </div>
                    {punjabUnits.map((unit) => (
                      <button
                        key={unit.id}
                        type="button"
                        onClick={() => handleSelect(unit.id)}
                        className={`w-full flex items-center justify-between px-3 py-2.5 text-sm rounded-md text-left transition-colors ${
                          unit.id === value ? "bg-black text-white font-medium" : "hover:bg-black/5 text-black"
                        }`}
                      >
                        <div>
                          <div>{unit.name}</div>
                          {unit.note && (
                            <div className={`text-xs ${unit.id === value ? "text-white/70" : "text-black/50"}`}>
                              {unit.note}
                            </div>
                          )}
                        </div>
                        {unit.id === value && <Check className="w-4 h-4 shrink-0 ml-2" />}
                      </button>
                    ))}
                  </div>
                )}

                {universalUnits.length > 0 && (
                  <div className="mb-2">
                    <div className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-black/40 bg-black/[0.02] rounded">
                      Universal Units
                    </div>
                    {universalUnits.map((unit) => (
                      <button
                        key={unit.id}
                        type="button"
                        onClick={() => handleSelect(unit.id)}
                        className={`w-full flex items-center justify-between px-3 py-2.5 text-sm rounded-md text-left transition-colors ${
                          unit.id === value ? "bg-black text-white font-medium" : "hover:bg-black/5 text-black"
                        }`}
                      >
                        <div>{unit.name}</div>
                        {unit.id === value && <Check className="w-4 h-4 shrink-0 ml-2" />}
                      </button>
                    ))}
                  </div>
                )}

                {regionalUnits.length > 0 && (
                  <div>
                    <div className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-black/40 bg-black/[0.02] rounded">
                      Other Regional State Units
                    </div>
                    {regionalUnits.map((unit) => (
                      <button
                        key={unit.id}
                        type="button"
                        onClick={() => handleSelect(unit.id)}
                        className={`w-full flex items-center justify-between px-3 py-2.5 text-sm rounded-md text-left transition-colors ${
                          unit.id === value ? "bg-black text-white font-medium" : "hover:bg-black/5 text-black"
                        }`}
                      >
                        <div>
                          <div>{unit.name}</div>
                          {unit.note && (
                            <div className={`text-xs ${unit.id === value ? "text-white/70" : "text-black/50"}`}>
                              {unit.note}
                            </div>
                          )}
                        </div>
                        {unit.id === value && <Check className="w-4 h-4 shrink-0 ml-2" />}
                      </button>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
