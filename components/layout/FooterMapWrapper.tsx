"use client";
import dynamic from "next/dynamic";

const ContactMap = dynamic(() => import("@/components/ui/ContactMap"), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-white/5 animate-pulse" />
});

export default function FooterMapWrapper() {
  return <ContactMap />;
}
