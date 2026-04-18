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
    <>
      {/* Map — full width on mobile (above listings), sticky sidebar on desktop */}
      <div className="order-1 md:order-2 w-full h-[45vw] min-h-[260px] max-h-[380px] md:hidden">
        {leafletReady && <PropertiesMap properties={properties} />}
      </div>
      <div className="hidden md:block order-2 md:w-[42%] sticky top-[var(--nav-height)] h-[calc(100vh-var(--nav-height))] shrink-0">
        {leafletReady && <PropertiesMap properties={properties} />}
      </div>
    </>
  );
}
