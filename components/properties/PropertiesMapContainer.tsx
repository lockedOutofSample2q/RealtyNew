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
    <div className="order-1 md:order-2 w-full md:w-[42%] h-[45vw] min-h-[260px] max-h-[380px] md:h-[80vh] md:min-h-[600px] md:sticky md:top-[calc(10vh+var(--nav-height)/2)] self-center shrink-0 z-0 relative">
      {leafletReady && <PropertiesMap properties={properties} />}
    </div>
  );
}
