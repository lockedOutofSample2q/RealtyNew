// components/sections/FeaturedProperty.tsx
import Image from "next/image";
import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import type { Property } from "@/types";

export function FeaturedProperty({ property }: { property: Property }) {
  const image = property.images?.[0] ?? "/images/property-placeholder.jpg";
  return (
    <section className="section-padding bg-[#080808]">
      <div className="container-site">
        <span className="font-body text-xs tracking-widest uppercase text-[var(--gold)] mb-3 block">
          Featured Development
        </span>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border border-[rgba(201,168,76,0.12)] overflow-hidden">
          <div className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[500px]">
            <Image src={image} alt={property.title} fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/30" />
          </div>
          <div className="p-10 lg:p-14 flex flex-col justify-center bg-[#0D0D0D]">
            {property.developer && (
              <span className="font-body text-xs tracking-widest uppercase text-[var(--gold)] mb-4">
                By {property.developer}
              </span>
            )}
            <h2 className="font-display text-4xl lg:text-5xl text-white font-light mb-4">
              {property.title}
            </h2>
            <div className="flex items-center gap-2 text-white/50 mb-6">
              <MapPin size={14} className="text-[var(--gold)]" />
              <span className="font-body text-sm">{property.community}, {property.location}</span>
            </div>
            <p className="font-body text-white/60 leading-relaxed mb-8 line-clamp-4">
              {property.description}
            </p>
            <div className="flex items-center gap-6 mb-8 pt-6 border-t border-white/5">
              <div>
                <div className="font-body text-xs text-white/40 uppercase tracking-wide mb-1">Starting From</div>
                <div className="font-display text-2xl text-[var(--gold)] font-light">
                  {property.price_currency} {property.price.toLocaleString()}
                </div>
              </div>
              {property.area_sqft && (
                <div>
                  <div className="font-body text-xs text-white/40 uppercase tracking-wide mb-1">Area</div>
                  <div className="font-display text-2xl text-white font-light">
                    {property.area_sqft.toLocaleString()} <span className="text-base">sqft</span>
                  </div>
                </div>
              )}
            </div>
            <Link
              href={`/properties/${property.slug}`}
              className="inline-flex items-center gap-3 px-8 py-4 bg-[var(--gold)] text-black font-body font-medium text-sm tracking-wide hover:bg-[var(--gold-light)] transition-colors self-start"
            >
              View Development <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FeaturedProperty;
