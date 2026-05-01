// components/sections/PropertiesCarousel.tsx
"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight, ArrowRight, ArrowDown } from "lucide-react";
import Link from "next/link";
import PropertyCard from "@/components/ui/PropertyCard";
import type { Property } from "@/types";
import { motion } from "framer-motion";

interface Props {
  title: string;
  subtitle: string;
  properties: Property[];
  type: "sale" | "lands" | "properties";
  inverted?: boolean;
}

const PLACEHOLDERS: Partial<Property>[] = Array.from({ length: 4 }, (_, i) => ({
  id: `placeholder-${i}`,
  title: "Luxury Residence",
  slug: "#",
  type: "apartment",
  status: "available",
  listing_type: "sale",
  price: 2500000 + i * 500000,
  price_currency: "INR",
  bedrooms: i + 1,
  bathrooms: 2,
  area_sqft: 1200 + i * 200,
  location: "Dubai",
  community: "Downtown Dubai",
  details: "",
  features: [],
  images: ["/assets/images/home/about.jpg"],
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
  const href = type === "lands" ? "/properties?tab=lands&currency=INR" : "/properties";

  function scroll(dir: "left" | "right") {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: dir === "right" ? 380 : -380,
      behavior: "smooth",
    });
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  // --- RENTALS LAYOUT (Image BG Cards, Centered Header) ---
  if (type === "lands") {
    return (
      <section className="section-padding bg-[#FAFAFA] overflow-hidden">
        <div className="container-site flex flex-col items-center">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16 mt-8"
          >
            <span className="inline-block border border-black/10 rounded-full px-5 py-2 text-[11px] tracking-widest uppercase text-black font-bold mb-6">
              Rentals
            </span>
            <h2 className="font-display font-medium text-black text-[clamp(2rem,5vw,4rem)] tracking-tight">
              Land Listings in Punjab
            </h2>
          </motion.div>

          {/* Cards Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full"
          >
            {items.slice(0, 3).map((p) => (
              <motion.div key={p.id} variants={itemVariants}>
                <PropertyCard 
                  property={p} 
                  variant="image-bg" 
                  customHref="/properties?tab=lands&currency=INR"
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Down Arrow / View More Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-16 text-center"
          >
            <Link
              href={href}
              className="font-body text-[14px] font-bold text-black uppercase tracking-widest hover:text-gray-500 transition-colors border-b border-black/30 hover:border-gray-500 pb-1 inline-flex items-center gap-2"
            >
              Search more <ArrowRight size={14} className="-rotate-45" />
            </Link>
          </motion.div>
        </div>
      </section>
    );
  }

  // --- LATEST LAYOUT (Standard Cards, Left Text + Right Carousel) ---
  return (
    <section className="section-padding bg-white overflow-hidden">
      <div className="container-site pt-12">
        {/* Header - Centered Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block border border-black/10 rounded-full px-5 py-2 text-[11px] tracking-widest uppercase text-black font-bold mb-6">
            Latest
          </span>
          <h2 className="font-display font-medium text-black text-[clamp(2rem,5vw,4rem)] tracking-tight">
            Properties Worth Looking At
          </h2>
        </motion.div>

        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-10">
          {/* Left Text Box */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-[320px] shrink-0 bg-[#F9FAFB] rounded-[32px] p-8 md:p-10 border border-black/[0.03] flex flex-col h-[480px] shadow-sm"
          >
            <h3 className="font-display font-medium text-[28px] leading-tight text-black mb-6">
              Find Property with us
            </h3>
            <p className="font-body text-gray-500 mb-auto leading-relaxed text-sm">
              Explore a wide range of properties tailored to your lifestyle and budget. From luxurious apartments to family homes.
            </p>
            <div className="mt-8">
              <span className="block font-body text-[13px] font-bold text-gray-400 mb-3 tracking-wide">View all 1,200+</span>
              <div className="flex items-center gap-4">
                <Link
                  href={href}
                  className="font-body text-[13px] font-bold text-black uppercase tracking-widest hover:text-gray-500 transition-colors border-b border-black/30 hover:border-gray-500 pb-1 inline-flex items-center gap-2"
                >
                  Search more <ArrowRight size={14} className="-rotate-45" />
                </Link>
                {/* Arrow controls for carousel */}
                <div className="flex gap-2 ml-auto">
                   <button
                    onClick={() => scroll("left")}
                    className="w-11 h-11 border border-gray-200 rounded-full text-black hover:bg-white hover:shadow-sm transition-all flex items-center justify-center bg-gray-50"
                  >
                    <ChevronLeft size={20} className="text-gray-500" />
                  </button>
                  <button
                    onClick={() => scroll("right")}
                    className="w-11 h-11 border border-gray-200 rounded-full text-black hover:bg-white hover:shadow-sm transition-all flex items-center justify-center bg-gray-50"
                  >
                    <ChevronRight size={20} className="text-gray-500" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Scroll Carousel */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 pt-2 -mx-4 px-4 lg:mx-0 lg:px-0 w-full"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {items.map((p) => (
              <motion.div key={p.id} variants={itemVariants} className="snap-start shrink-0 w-[300px] md:w-[360px]">
                <PropertyCard property={p} variant="standard" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
