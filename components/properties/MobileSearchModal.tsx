"use client";
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import PillSelect from "@/components/ui/PillSelect";
import PillMultiSelect from "@/components/ui/PillMultiSelect";
import {
  CITIES,
  SECTORS_BY_CITY,
  PROPERTY_TYPES,
  BEDROOMS,
  FURNISHING,
  type PropertySearchFilters,
  type SearchTab,
} from "@/components/search/propertySearchOptions";

interface MobileSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  tab: SearchTab;
  onTabChange: (tab: SearchTab) => void;
  filters: PropertySearchFilters;
  setFilters: (filters: PropertySearchFilters) => void;
  onSearch: (e?: React.FormEvent) => void;
  onReset: () => void;
}

export function MobileSearchModal({
  isOpen,
  onClose,
  tab,
  onTabChange,
  filters,
  setFilters,
  onSearch,
  onReset,
}: MobileSearchModalProps) {
  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[2000]"
          />
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 bg-[#F3F4F6] rounded-t-2xl z-[2001] p-6 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-display text-2xl font-semibold text-black">Filter</h2>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md active:scale-90 transition-transform"
              >
                <X size={20} className="text-black" />
              </button>
            </div>

            <div className="flex bg-white rounded-2xl p-1 mb-8 shadow-sm">
              {(["flats", "houses", "lands"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => onTabChange(t)}
                  className={`flex-1 py-3.5 text-sm font-semibold rounded-xl transition-all ${
                    tab === t ? "bg-black text-white shadow-lg" : "text-black/40"
                  }`}
                >
                  {t === "flats" ? "Flats" : t === "houses" ? "Houses" : "Lands"}
                </button>
              ))}
            </div>

            <form
              onSubmit={(e) => {
                onSearch(e);
                onClose();
              }}
              className="flex flex-col gap-10"
            >
              <PillSelect
                label="City"
                value={filters.city}
                options={CITIES}
                onChange={(city) => setFilters({ ...filters, city: city, sector: [] })}
                placeholder="All Cities"
              />
              <PillMultiSelect
                label="Sector / Area"
                value={filters.sector}
                options={filters.city && SECTORS_BY_CITY[filters.city] ? SECTORS_BY_CITY[filters.city] : ["All"]}
                onChange={(sector) => setFilters({ ...filters, sector })}
                placeholder="All Areas"
              />
              <PillSelect
                label="Property Type"
                value={filters.type}
                options={PROPERTY_TYPES}
                onChange={(type) => setFilters({ ...filters, type })}
                placeholder="All Types"
              />
              <PillSelect
                label="Bedrooms"
                value={filters.bedrooms}
                options={BEDROOMS}
                onChange={(beds) => setFilters({ ...filters, bedrooms: beds })}
                placeholder="Any"
              />
              <PillSelect
                label="Furnishing"
                value={filters.furnishing}
                options={FURNISHING}
                onChange={(furn) => setFilters({ ...filters, furnishing: furn })}
                placeholder="All"
              />

              <div className="mt-4 flex flex-col gap-4 border-t border-black/5 pt-8">
                <button
                  type="button"
                  onClick={onReset}
                  className="text-center font-body text-[13px] font-bold uppercase tracking-widest text-black/40 hover:text-black"
                >
                  Reset filters
                </button>
                <button
                  type="submit"
                  className="w-full bg-black text-white py-5 rounded-2xl font-bold text-[15px] shadow-xl active:scale-[0.98] transition-transform"
                >
                  Show results
                </button>
              </div>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
