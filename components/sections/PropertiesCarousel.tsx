"use client";
// components/sections/PropertiesCarousel.tsx
// ============================================================
// PROPERTIES CAROUSEL — used twice on home (sale + rent)
// EDIT: pass properties from page.tsx (fetched from Supabase)
// ============================================================

import { useRef } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import Link from "next/link";
import PropertyCard from "@/components/ui/PropertyCard";
import type { Property } from "@/types";

interface Props {
  title: string;
  subtitle: string;
  properties: Property[];
  type: "sale" | "rent";
  inverted?: boolean;
}

// Placeholder cards shown when DB has no data yet
const PLACEHOLDERS: Partial<Property>[] = Array.from({ length: 4 }, (_, i) => ({
  id: `placeholder-${i}`,
  title: "Luxury Residence",
  slug: "#",
  type: "apartment",
  status: "available",
  listing_type: "sale",
  price: 2500000 + i * 500000,
  price_currency: "AED",
  bedrooms: i + 1,
  bathrooms: 2,
  area_sqft: 1200 + i * 200,
  location: "Dubai",
  community: "Downtown Dubai",
  furnishing: "furnished",
  description: "",
  features: [],
  images: [],
  featured: false,
  created_at: "",
  updated_at: "",
}));

export default function PropertiesCarousel({
  title,
  subtitle,
  properties,
  type,
  inverted = false,
}: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const items = properties.length > 0 ? properties : (PLACEHOLDERS as Property[]);
  const href = type === "rent" ? "/rentals" : "/off-plan";

  function scroll(dir: "left" | "right") {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: dir === "right" ? 380 : -380,
      behavior: "smooth",
    });
  }

  return (
    <section
      className={`section-padding ${inverted ? "bg-[#0A0A0A]" : "bg-[#0D0D0D]"}`}
    >
      <div className="container-site">
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="font-body text-xs tracking-widest uppercase text-[var(--gold)] mb-3 block">
              {subtitle}
            </span>
            <h2 className="font-display font-light text-white">{title}</h2>
          </div>
          <div className="flex items-center gap-4">
            {/* Arrow controls */}
            <div className="hidden sm:flex items-center gap-2">
              <button
                onClick={() => scroll("left")}
                className="w-10 h-10 border border-white/15 text-white/60 hover:border-[var(--gold)] hover:text-[var(--gold)] transition-all flex items-center justify-center"
                aria-label="Previous"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() => scroll("right")}
                className="w-10 h-10 border border-white/15 text-white/60 hover:border-[var(--gold)] hover:text-[var(--gold)] transition-all flex items-center justify-center"
                aria-label="Next"
              >
                <ChevronRight size={18} />
              </button>
            </div>
            <Link
              href={href}
              className="hidden sm:flex items-center gap-2 font-body text-sm text-[var(--gold)] hover:text-[var(--gold-light)] transition-colors"
            >
              View all <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        {/* Scroll container */}
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto scrollbar-hide pb-2 -mx-4 px-4 snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {items.map((p, i) => (
            <div
              key={p.id}
              className="snap-start shrink-0 w-[300px] sm:w-[340px]"
            >
              <PropertyCard property={p} />
            </div>
          ))}
        </div>

        {/* Mobile view all */}
        <div className="flex justify-center mt-8 sm:hidden">
          <Link
            href={href}
            className="flex items-center gap-2 font-body text-sm text-[var(--gold)] border border-[var(--gold)] px-6 py-3"
          >
            View all properties <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
