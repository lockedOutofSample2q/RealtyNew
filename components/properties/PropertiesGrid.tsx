"use client";
import PropertyCard from "@/components/ui/PropertyCard";
import type { Property } from "@/types";

interface PropertiesGridProps {
  properties: Property[];
  onResetFilters: () => void;
}

export function PropertiesGrid({ properties, onResetFilters }: PropertiesGridProps) {
  return (
    <div className="order-2 md:order-1 w-full md:w-[58%] p-4 md:p-6 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5 content-start">
      {properties.map((p) => (
        <PropertyCard key={p.id} property={p} variant="image-bg" />
      ))}
      {properties.length === 0 && (
        <div className="col-span-1 sm:col-span-2 py-24 text-center">
          <p className="text-black/40 text-sm">No properties match your filters.</p>
          <button
            onClick={onResetFilters}
            className="mt-3 text-sm text-black underline"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
