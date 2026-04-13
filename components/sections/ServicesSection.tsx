"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const services = [
  {
    title: "Property Advisory",
    description: "Independent evaluation of any property before you commit: developer track record, RERA verification, payment plan analysis, and honest shortlisting. I will tell you what I would do in your position, including when the answer is not to buy.",
    image: "/assets/images/home/about.jpg"
  },
  {
    title: "Land & Plot Advisory",
    description: "From GMADA plot allotment to agricultural land reinvestment after an acquisition payout: guidance on licensed vs unlicensed status, capital gains implications, and which land in which location makes financial sense for your specific situation.",
    image: "/assets/images/home/hero-bg.jpg"
  },
  {
    title: "NRI & Remote Advisory",
    description: "End-to-end property advisory for NRI investors buying from the UK, Canada, Gulf, or Australia: FEMA compliance, POA structuring, video-verified site walkthroughs, and post-purchase support without you needing to be here.",
    image: "/assets/images/home/services.jpg"
  }
];

export default function ServicesSection() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  // Determine which image to show: hover preview or active selection
  const displayIndex = hoverIndex !== null ? hoverIndex : activeIndex;
  // Fallback to a default if somehow undefined
  const currentImage = services[displayIndex]?.image || "/assets/images/home/services.jpg";

  return (
    <section className="bg-[#0A0A0A] text-white pt-32 pb-32">
      <div className="container-site">
        {/* Top Split Section */}
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start mb-32">
          
          {/* Left Side: Text and Accordion */}
          <div className="flex-1 w-full lg:max-w-xl">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block tracking-[0.2em] uppercase text-white/50 text-[10px] font-medium mb-8 font-body"
            >
              OUR SERVICES
            </motion.span>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-display font-light text-4xl md:text-5xl lg:text-[56px] leading-[1.1] mb-16 tracking-tight text-white/90"
            >
              Exceptional<br />
              Service.<br />
              Seamless Process.<br />
              Outstanding<br />
              Results.
            </motion.h2>

            {/* Accordion List */}
            <div className="flex flex-col border-t border-white/10" onMouseLeave={() => setHoverIndex(null)}>
              {services.map((service, i) => {
                const isActive = activeIndex === i;

                return (
                  <div
                    key={service.title}
                    className="border-b border-white/10"
                    onMouseEnter={() => setHoverIndex(i)}
                  >
                    <button
                      onClick={() => setActiveIndex(i)}
                      className="w-full flex items-center justify-between py-6 md:py-8 text-left group outline-none"
                    >
                      <div className="flex gap-8 items-center">
                        <span className="font-body text-white/40 text-[11px] tracking-wider font-light">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className={`font-display text-2xl md:text-[28px] tracking-wide transition-colors duration-300 ${
                          isActive ? "text-white" : "text-white/60 group-hover:text-white"
                        }`}>
                          {service.title}
                        </span>
                      </div>
                      <div className={`transition-transform duration-500 ease-in-out ${
                        isActive ? "rotate-45 text-white" : "rotate-0 text-white/40 group-hover:text-white/80"
                      }`}>
                        <ArrowUpRight strokeWidth={1} size={22} className={isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100 transition-opacity"} />
                        {!isActive && (
                           <div className="absolute inset-0 flex items-center justify-center opacity-100 group-hover:opacity-0 transition-opacity">
                             {/* An up arrow when inactive to match reference */}
                             <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                               <line x1="12" y1="19" x2="12" y2="5"></line>
                               <polyline points="5 12 12 5 19 12"></polyline>
                             </svg>
                           </div>
                        )}
                      </div>
                    </button>

                    {/* Accordion Content */}
                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="pb-10 pl-6 md:pl-14 flex flex-col gap-6">
                            {/* Mobile Image (Inline) */}
                            <div className="block lg:hidden w-full aspect-[16/10] relative rounded-2xl overflow-hidden mb-2">
                              <Image
                                src={service.image}
                                alt={service.title}
                                fill
                                className="object-cover"
                              />
                            </div>

                            <p className="font-body text-white/60 leading-relaxed text-[14px] md:text-[15px] max-w-[95%] font-light">
                              {service.description}
                            </p>
                            
                            {/* Sub-bullets */}
                            {service.bullets && (
                              <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-6">
                                {service.bullets.map((bullet, idx) => (
                                  <li key={idx} className="font-body text-[12px] md:text-[13px] text-white/80 font-medium flex items-start gap-2.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-white/20 mt-1.5 shrink-0" />
                                    {bullet}
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Side: dynamic image preview */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:flex-1 shrink-0 sticky top-32 h-[85vh] max-h-[900px] min-h-[600px] hidden lg:block"
          >
            <div className="relative w-full h-full rounded-[24px] overflow-hidden bg-gray-900">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.div
                  key={displayIndex}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0"
                >
                  <Image
                    src={currentImage}
                    alt={services[displayIndex]?.title || "Service"}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />
                </motion.div>
              </AnimatePresence>
              {/* Subtle dark gradient overlay to ensure it feels premium */}
              <div className="absolute inset-0 bg-black/10 mix-blend-overlay pointer-events-none" />
            </div>
          </motion.div>
          
        </div>

        {/* Bottom CTA Block */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center flex flex-col items-center pt-16"
        >
          {/* Removing redundant big bottom CTA since it's not in the screenshot right now. 
              The layout just scrolls to the next section organically. */}
        </motion.div>
      </div>
    </section>
  );
}
