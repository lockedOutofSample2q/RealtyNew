"use client";

import dynamic from "next/dynamic";
import React from "react";

const PropertyDetailMap = dynamic(() => import("./PropertyDetailMap"), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-[#e8f0e8] animate-pulse rounded-xl" />,
});

export default function PropertyDetailMapClient(props: any) {
  return <PropertyDetailMap {...props} />;
}
