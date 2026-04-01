"use client";
import React, { useState, useRef } from "react";
import { aboutSnippet, aboutCarouselItems } from "@/config/site";
import Image from "next/image";
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

export default function AboutSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const textContainerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: textContainerRef,
    offset: ["start 80%", "end 40%"]
  });

  const textColor = useTransform(
    scrollYProgress,
    [0, 1],
    ["rgba(156, 163, 175, 1)", "rgba(17, 24, 39, 1)"] // Tailwind gray-400 to gray-900 (black-ish)
  );

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % aboutCarouselItems.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? aboutCarouselItems.length - 1 : prev - 1));
  };

  const currentItem = aboutCarouselItems[currentIndex];

  return (
    <section className="section-padding bg-white relative overflow-hidden pt-12 pb-24">
      <div className="container-site flex flex-col items-center">

        {/* About Intro */}
        <div ref={textContainerRef} className="text-center max-w-5xl mx-auto mb-20 px-4">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block border border-black/10 rounded-full px-5 py-2 text-[11px] tracking-widest uppercase text-black font-bold mb-10"
          >
            About
          </motion.span>
          <motion.p 
            style={{ color: textColor }}
            className="font-body font-semibold text-[26px] md:text-3xl lg:text-4xl leading-[1.3] max-w-4xl mx-auto tracking-tight transition-colors duration-75"
          >
            {aboutSnippet.headline}
          </motion.p>
          <motion.p 
            style={{ color: textColor }}
            className="font-body font-semibold text-[26px] md:text-3xl lg:text-4xl leading-[1.3] mt-8 max-w-4xl mx-auto tracking-tight transition-colors duration-75"
          >
            {aboutSnippet.body}
          </motion.p>
        </div>

        {/* Premium Showcase Image Block (Carousel) */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full relative rounded-[32px] overflow-hidden aspect-[3/4] md:aspect-[21/9] bg-gray-100 mt-4 group"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <Image
                src={currentItem.image}
                alt={currentItem.title}
                fill
                className="object-cover"
                priority
              />
            </motion.div>
          </AnimatePresence>
          
          {/* Subtle dark gradient for edge legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 opacity-80 pointer-events-none" />

          {/* Floating Badges - Vertical stack on Top-Right */}
          <div className="absolute top-6 right-6 md:top-8 md:right-8 flex flex-col gap-2 z-10">
            <AnimatePresence mode="popLayout">
              {currentItem.badges.map((label, idx) => (
                <motion.div
                  key={`${currentIndex}-${label}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: idx * 0.1, duration: 0.4 }}
                  className="bg-white/95 backdrop-blur-md px-4 py-2 rounded-full shadow-lg flex items-center gap-2 w-max self-end"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-black/80 shrink-0" />
                  <span className="font-body font-semibold text-[11px] text-black uppercase tracking-wider whitespace-nowrap">
                    {label}
                  </span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Bottom Left Card */}
          <div className="absolute bottom-4 left-4 right-4 md:bottom-10 md:left-10 md:right-auto md:w-[480px] z-10">
            <motion.div 
              layout
              className="bg-white/95 backdrop-blur-md rounded-2xl md:rounded-3xl p-5 md:p-8 shadow-2xl flex flex-col gap-4 md:gap-6 border border-white/20"
            >
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.div 
                  key={currentIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col gap-2 md:gap-3"
                >
                  <h3 className="font-display font-semibold text-[18px] md:text-2xl text-black">
                    {currentItem.title}
                  </h3>
                  
                  <div className="flex items-center gap-1.5 text-black/50">
                    <MapPin size={12} className="md:w-[14px] md:h-[14px]" />
                    <span className="font-body text-[11px] md:text-[13px] font-medium tracking-wide">
                      {currentItem.location}
                    </span>
                  </div>

                  <p className="font-body text-[13px] md:text-[14px] leading-relaxed text-black/60 pt-1 line-clamp-2 md:line-clamp-none">
                    {currentItem.description}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* Card Footer: Controls & Price */}
              <div className="flex items-center justify-between pt-4 border-t border-black/5">
                
                {/* Navigation */}
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={handlePrev}
                      className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center hover:bg-black/5 transition-colors"
                      aria-label="Previous Property"
                    >
                      <ChevronLeft size={18} strokeWidth={1.5} className="text-black" />
                    </button>
                    <button 
                      onClick={handleNext}
                      className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center hover:bg-black/80 transition-colors"
                      aria-label="Next Property"
                    >
                      <ChevronRight size={18} strokeWidth={1.5} />
                    </button>
                  </div>
                  
                  {/* Pagination Dots */}
                  <div className="hidden sm:flex items-center gap-1.5">
                    {aboutCarouselItems.map((_, i) => (
                      <div 
                        key={i} 
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          i === currentIndex ? "w-6 bg-black" : "w-1.5 bg-black/20"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Price */}
                <div className="font-body font-bold text-[15px] text-black">
                  <AnimatePresence mode="popLayout">
                    <motion.span
                      key={currentIndex}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="inline-block"
                    >
                      {currentItem.price}
                    </motion.span>
                  </AnimatePresence>
                </div>

              </div>
            </motion.div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
