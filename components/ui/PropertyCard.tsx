// components/ui/PropertyCard.tsx
"use client";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Property } from "@/types";
import { cn } from "@/lib/utils";
import { useCurrency } from "@/context/CurrencyContext";

interface PropertyCardProps {
  property: Property;
  className?: string;
  variant?: "standard" | "image-bg";
}

export default function PropertyCard({ property, className, variant = "standard" }: PropertyCardProps) {
  const { formatPrice } = useCurrency();
  const image = property.images?.[0] ?? "/assets/images/home/about.jpg";
  const isLands = property.listing_type === "lands";
  if (variant === "image-bg") {
    return (
      <Link
        href={`/properties/${property.slug}`}
        className={cn(
          "group relative block overflow-hidden rounded-xl aspect-[4/5] bg-charcoal-50",
          className
        )}
      >
        <Image
          src={image}
          alt={property.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-[1.5s] ease-out"
          sizes="(max-width: 768px) 100vw, 400px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />

        {/* Top Badges */}
        <div className="absolute top-5 left-5 right-5 flex justify-between items-start">
          <div className="bg-white/20 backdrop-blur-md border border-white/20 px-3 py-1.5 rounded-full">
            <span className="font-body text-xs uppercase tracking-widest text-white font-bold">
              {isLands ? "For Rent" : "For Sale"}
            </span>
          </div>

          {property.featured && (
            <div className="bg-charcoal/80 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-full">
              <span className="font-body text-xs uppercase tracking-widest text-white font-bold">
                Featured
              </span>
            </div>
          )}
        </div>

        {/* Glassmorphism Details Card */}
        <div className="absolute inset-x-4 bottom-4 bg-white/10 backdrop-blur-xl border border-white/20 p-5 rounded-lg shadow-hover flex flex-col justify-end translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
          <h3 className="font-display text-xl text-white font-medium mb-1 line-clamp-1">
            {property.title}
          </h3>
          <div className="flex items-center gap-2 text-white/80 mb-4">
            <span className="font-body text-sm">{property.community}, {property.location}</span>
          </div>
          
          <div className="flex items-center justify-between pt-4 border-t border-white/20">
            <div className="font-display text-lg text-white font-semibold flex items-baseline">
              {property.price > 0 ? (
                <>
                  {formatPrice(property.price)}
                  {isLands && <span className="font-body text-xs text-white/70 ml-1">/yr</span>}
                </>
              ) : (
                <span className="text-sm text-white/60 italic font-normal">Price on request</span>
              )}
            </div>
            <div className="w-8 h-8 rounded-full bg-white text-charcoal flex items-center justify-center group-hover:-rotate-45 transition-transform duration-500 shrink-0">
               <ArrowRight size={14} />
            </div>
          </div>
        </div>
      </Link>
    );
  }

  // Standard Variant
  return (
    <Link
      href={`/properties/${property.slug}`}
      className={cn(
        "group flex flex-col bg-white rounded-xl overflow-hidden border border-border shadow-subtle hover:shadow-hover transition-all duration-500",
        className
      )}
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-[4/3] rounded-t-xl group-hover:opacity-90 transition-opacity duration-500">
        <Image
          src={image}
          alt={property.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-[1.5s] ease-out"
          sizes="(max-width: 768px) 100vw, 400px"
        />
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full shadow-subtle">
          <span className="font-body text-xs uppercase tracking-widest text-charcoal font-bold">
            {isLands ? "Rent" : "Buy"}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="font-display text-xl leading-tight text-charcoal font-medium mb-2 line-clamp-1">
          {property.title}
        </h3>
        <p className="font-body text-sm text-muted mb-4 line-clamp-1">
          {property.community}, {property.location}
        </p>

        {/* Specs */}
        <div className="flex items-center justify-start gap-4 mb-6 opacity-80 flex-wrap">
          {property.bedrooms != null && (
            <div className="flex items-center gap-2 text-charcoal">
              <span className="font-body text-xs font-semibold tracking-wide">
                {property.bedrooms === 0 ? "Studio" : property.bedrooms} BEDS
              </span>
            </div>
          )}
          {property.bedrooms != null && property.bathrooms != null && (
            <div className="w-1 h-1 rounded-full bg-border" />
          )}
          {property.bathrooms != null && (
            <div className="flex items-center gap-2 text-charcoal">
              <span className="font-body text-xs font-semibold tracking-wide">{property.bathrooms} BATHS</span>
            </div>
          )}
          {(property.bedrooms != null || property.bathrooms != null) && property.area_sqft != null && (
            <div className="w-1 h-1 rounded-full bg-border" />
          )}
          {property.area_sqft != null && (
            <div className="flex items-center gap-2 text-charcoal">
              <span className="font-body text-xs font-semibold tracking-wide">{property.area_sqft.toLocaleString()} SQFT</span>
            </div>
          )}
        </div>

        {/* Footer (Price & Button) */}
        <div className="flex items-center justify-between pt-4 border-t border-white/20">
          <div className="font-display text-xl text-charcoal font-medium tracking-tight">
            {formatPrice(property.price)}
            {isLands && <span className="font-body text-sm text-muted font-normal ml-1">/yr</span>}
          </div>
          <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center group-hover:bg-charcoal group-hover:text-white transition-all duration-300 shrink-0 shadow-subtle">
            <ArrowRight size={16} className="group-hover:-rotate-45 transition-transform duration-300" />
          </div>
        </div>
      </div>
    </Link>
  );
}

