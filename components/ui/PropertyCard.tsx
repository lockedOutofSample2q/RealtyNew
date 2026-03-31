"use client";
// components/ui/PropertyCard.tsx
// ============================================================
// PROPERTY CARD — used in carousels, grids, search results
// ============================================================

import Image from "next/image";
import Link from "next/link";
import { Bed, Bath, Maximize, MapPin } from "lucide-react";
import type { Property } from "@/types";
import { cn } from "@/lib/utils";

interface PropertyCardProps {
  property: Property;
  className?: string;
}

function formatPrice(price: number, currency: string) {
  const formatted = new Intl.NumberFormat("en-AE", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
  return `${currency} ${formatted}`;
}

export default function PropertyCard({ property, className }: PropertyCardProps) {
  const image = property.images?.[0] ?? "/images/property-placeholder.jpg";
  const isRent = property.listing_type === "rent";

  return (
    <Link
      href={`/properties/${property.slug}`}
      className={cn(
        "group block bg-[var(--card)] border border-[rgba(201,168,76,0.08)] hover:border-[rgba(201,168,76,0.25)] transition-all duration-400 overflow-hidden",
        className
      )}
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-[4/3]">
        <Image
          src={image}
          alt={property.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700"
          sizes="(max-width: 768px) 100vw, 400px"
        />
        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="px-2.5 py-1 bg-[var(--gold)] text-black font-body text-xs font-medium uppercase tracking-wide">
            {property.listing_type === "off-plan"
              ? "Off Plan"
              : isRent
              ? "Rent"
              : "For Sale"}
          </span>
          {property.featured && (
            <span className="px-2.5 py-1 bg-black/70 text-[var(--gold)] font-body text-xs uppercase tracking-wide backdrop-blur-sm">
              Featured
            </span>
          )}
        </div>
        {/* Price overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          <div className="font-display text-xl text-white font-light">
            {formatPrice(property.price, property.price_currency)}
            {isRent && (
              <span className="font-body text-sm text-white/60 ml-1">/yr</span>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-display text-lg text-white font-light mb-1 group-hover:text-[var(--gold)] transition-colors line-clamp-1">
          {property.title}
        </h3>
        <div className="flex items-center gap-1.5 text-white/50 mb-4">
          <MapPin size={12} className="text-[var(--gold)]" />
          <span className="font-body text-xs">{property.community}, {property.location}</span>
        </div>

        {/* Specs */}
        <div className="flex items-center gap-4 pt-4 border-t border-white/5">
          {property.bedrooms !== null && (
            <div className="flex items-center gap-1.5 text-white/50">
              <Bed size={14} />
              <span className="font-body text-xs">
                {property.bedrooms === 0 ? "Studio" : `${property.bedrooms} Bed`}
              </span>
            </div>
          )}
          <div className="flex items-center gap-1.5 text-white/50">
            <Bath size={14} />
            <span className="font-body text-xs">{property.bathrooms} Bath</span>
          </div>
          <div className="flex items-center gap-1.5 text-white/50">
            <Maximize size={14} />
            <span className="font-body text-xs">{property.area_sqft.toLocaleString()} sqft</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
