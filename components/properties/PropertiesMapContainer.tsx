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
}

export function PropertiesMapContainer({ properties, leafletReady }: PropertiesMapContainerProps) {
  return (
    <div className="order-1 md:order-2 w-full md:w-[45%] h-[45vw] min-h-[260px] max-h-[380px] md:h-[96vh] md:min-h-[600px] md:sticky md:top-[2vh] self-start shrink-0 z-0 relative p-4 md:pl-0 md:pr-6">
      {leafletReady && <PropertiesMap properties={properties} />}
    </div>
  );
}
