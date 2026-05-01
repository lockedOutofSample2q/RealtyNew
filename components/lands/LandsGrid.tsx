"use client";
import LandCard from "./LandCard";
import type { Property } from "@/types";

interface LandsGridProps {
  properties: Property[];
  onEnquire: (property: Property) => void;
  hoveredId: string | null;
  onHover: (id: string | null) => void;
}

export default function LandsGrid({ properties, onEnquire, hoveredId, onHover }: LandsGridProps) {
  return (
    <div className="order-2 md:order-1 w-full md:w-[55%] p-4 md:p-8 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 content-start bg-white">

      {properties.map((p) => (
        <LandCard 
          key={p.id} 
          property={p} 
          onClick={onEnquire} 
          isHovered={hoveredId === p.id}
          onHover={(isHovering) => onHover(isHovering ? p.id : null)}
        />
      ))}

      {properties.length === 0 && (
        <div className="col-span-full py-24 text-center border-2 border-dashed border-black/5 rounded-3xl">
          <p className="text-black/30 font-body">No land listings found in this area.</p>
        </div>
      )}
    </div>
  );
}
