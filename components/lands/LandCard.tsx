"use client";
import Image from "next/image";
import { MapPin, ArrowRight } from "lucide-react";
import type { Property } from "@/types";
import { cn } from "@/lib/utils";

interface LandCardProps {
  property: Property;
  onClick: (property: Property) => void;
  isHovered?: boolean;
  onHover?: (isHovering: boolean) => void;
  className?: string;
}

export default function LandCard({ property, onClick, isHovered, onHover, className }: LandCardProps) {
  const image = property.images?.[0] || "/assets/images/home/hero-bg.jpg"; 

  return (
    <div 
      onClick={() => onClick(property)}
      onMouseEnter={() => onHover?.(true)}
      onMouseLeave={() => onHover?.(false)}
      className={cn(
        "group relative cursor-pointer overflow-hidden rounded-2xl aspect-[4/3] bg-charcoal-50 transition-all duration-500 border border-black/5",
        isHovered && "ring-2 ring-black ring-offset-2 scale-[1.02] z-10",
        className
      )}
    >
      <Image
        src={image}
        alt={property.title}
        fill
        className="object-cover group-hover:scale-110 transition-transform duration-[2s] ease-out opacity-80"
        sizes="(max-width: 768px) 100vw, 400px"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
      
      {/* Content */}
      <div className="absolute inset-0 p-6 flex flex-col justify-end">
        <div className="flex items-center gap-2 text-white/60 mb-2">
          <MapPin size={12} className="text-white/40" />
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold">{property.community || "Mohali, India"}</span>
        </div>
        
        <h3 className="font-display text-xl text-white font-medium mb-3 leading-snug line-clamp-2">
          {property.title}
        </h3>
        
        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <span className="text-xs text-white/50 font-body uppercase tracking-widest font-bold">Enquire Details</span>
          <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-all duration-300">
            <ArrowRight size={14} className="group-hover:-rotate-45 transition-transform" />
          </div>
        </div>
      </div>

      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
        <div className="bg-white text-black px-6 py-2.5 rounded-full font-body text-xs font-bold uppercase tracking-widest scale-90 group-hover:scale-100 transition-transform duration-500">
          Enquire Now
        </div>
      </div>
    </div>
  );
}
