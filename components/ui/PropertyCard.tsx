// components/ui/PropertyCard.tsx
"use client";
import Image from "next/image";
import Link from "next/link";
import { Bed, Bath, Maximize, MapPin, ArrowRight } from "lucide-react";
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
          "group relative block overflow-hidden rounded-[24px] aspect-[4/5] bg-gray-100",
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
            <span className="font-body text-[10px] uppercase tracking-widest text-white font-bold">
              {isLands ? "For Rent" : "For Sale"}
            </span>
          </div>

          {property.featured && (
            <div className="bg-emerald-500/80 backdrop-blur-md px-3 py-1.5 rounded-full">
              <span className="font-body text-[10px] uppercase tracking-widest text-white font-bold">
                Featured
              </span>
            </div>
          )}
        </div>

        {/* Glassmorphism Details Card */}
        <div className="absolute inset-x-4 bottom-4 bg-white/10 backdrop-blur-xl border border-white/20 p-5 rounded-[20px] shadow-[0_8px_32px_rgba(0,0,0,0.2)] flex flex-col justify-end translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
          <h3 className="font-display text-xl text-white font-medium mb-1 line-clamp-1">
            {property.title}
          </h3>
          <div className="flex items-center gap-1.5 text-white/80 mb-4">
            <span className="font-body text-xs">{property.community}, {property.location}</span>
          </div>
          
          <div className="flex items-center justify-between pt-4 border-t border-white/20">
            <div className="font-display text-lg text-white font-semibold flex items-baseline">
              {property.price > 0 ? (
                <>
                  {formatPrice(property.price)}
                  {isLands && <span className="font-body text-[11px] text-white/70 ml-1">/yr</span>}
                </>
              ) : (
                <span className="text-sm text-white/60 italic font-normal">Price on request</span>
              )}
            </div>
            <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center group-hover:-rotate-45 transition-transform duration-500 shrink-0">
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
        "group flex flex-col bg-white rounded-[24px] overflow-hidden border border-black/5 hover:shadow-[0_20px_40px_rgba(0,0,0,0.04)] hover:border-black/10 transition-all duration-500",
        className
      )}
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-[4/3] rounded-[20px] m-2 group-hover:m-1 transition-all duration-500">
        <Image
          src={image}
          alt={property.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-[1.5s] ease-out"
          sizes="(max-width: 768px) 100vw, 400px"
        />
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full shadow-lg">
          <span className="font-body text-[10px] uppercase tracking-widest text-black font-bold">
            {isLands ? "Rent" : "Buy"}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 pt-4">
        <h3 className="font-display text-[22px] leading-tight text-black font-medium mb-1 line-clamp-1">
          {property.title}
        </h3>
        <p className="font-body text-sm text-gray-500 mb-5 line-clamp-1">
          {property.community}, {property.location}
        </p>

        {/* Specs */}
        <div className="flex items-center gap-5 mb-5 opacity-80">
          {property.bedrooms !== null && (
            <div className="flex items-center gap-2 text-black">
              <span className="font-body text-[13px] font-bold tracking-wide">
                {property.bedrooms === 0 ? "Studio" : property.bedrooms} BEDS
              </span>
            </div>
          )}
          <div className="w-1 h-1 rounded-full bg-gray-300" />
          <div className="flex items-center gap-2 text-black">
            <span className="font-body text-[13px] font-bold tracking-wide">{property.bathrooms} BATHS</span>
          </div>
          <div className="w-1 h-1 rounded-full bg-gray-300" />
          <div className="flex items-center gap-2 text-black">
            <span className="font-body text-[13px] font-bold tracking-wide">{property.area_sqft.toLocaleString()} SQFT</span>
          </div>
        </div>

        {/* Footer (Price & Button) */}
        <div className="flex items-center justify-between pt-5 border-t border-black/5">
          <div className="font-display text-[22px] text-black font-medium tracking-tight">
            {formatPrice(property.price)}
            {isLands && <span className="font-body text-sm text-gray-500 font-normal ml-1">/yr</span>}
          </div>
          <div className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all duration-300 shrink-0 shadow-sm">
            <ArrowRight size={16} className="group-hover:-rotate-45 transition-transform duration-300" />
          </div>
        </div>
      </div>
    </Link>
  );
}
