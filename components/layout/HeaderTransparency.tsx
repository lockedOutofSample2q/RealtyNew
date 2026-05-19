"use client";
import { useEffect } from "react";
import { useHeader } from "@/context/HeaderContext";

export default function HeaderTransparency({ transparent }: { transparent: boolean }) {
  const { setTransparentOverride } = useHeader();
  
  useEffect(() => {
    setTransparentOverride(transparent);
    return () => setTransparentOverride(null);
  }, [transparent, setTransparentOverride]);
  
  return null;
}
