"use client";
import dynamic from "next/dynamic";
import type { Property } from "@/types";

const PropertiesMap = dynamic(() => import("@/components/ui/PropertiesMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-[#e8e0d8] flex items-center justify-center">
      <span className="text-sm text-black/40">Loading map…</span>
    </div>
  ),
});

interface PropertiesMapContainerProps {
  properties: Property[];
  leafletReady: boolean;
  onPropertyClick?: (p: Property) => void;
  hoveredId?: string | null;
  onHover?: (id: string | null) => void;
}

export function PropertiesMapContainer({ properties, leafletReady, onPropertyClick, hoveredId, onHover }: PropertiesMapContainerProps) {
  return (
    <div className="order-1 md:order-2 w-full md:w-[45%] h-[50vh] md:h-[94vh] md:sticky md:top-[3vh] self-start shrink-0 z-0 relative p-4 md:pl-0 md:pr-6">
      {leafletReady && (
        <PropertiesMap 
          properties={properties} 
          onPropertyClick={onPropertyClick} 
          hoveredId={hoveredId}
          onHover={onHover}
        />
      )}
    </div>
  );
}
