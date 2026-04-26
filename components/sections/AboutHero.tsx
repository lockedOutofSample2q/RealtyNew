"use client";
import React from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const PANELS = [
  { id: 1, image: "/assets/images/about/hero-1.png", title: "The Background\nNo Other Advisor\nIn Mohali Can Claim.", tag: "ABOUT US" },
  { id: 2, image: "/assets/images/about/hero-2.png", title: "", tag: "" },      
  { id: 3, image: "/assets/images/about/hero-3.png", title: "", tag: "" },      
  { id: 4, image: "/assets/images/about/hero-4.png", title: "", tag: "" },      
];

export default function AboutHero() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  return (
    <section ref={containerRef} className="relative w-full pt-[calc(var(--nav-height)+4vh)] pb-[6vh] bg-black overflow-hidden flex flex-col justify-start" style={{ minHeight: '90vh' }}>
      <div className="w-[95%] mx-auto h-[50vh] sm:h-[60vh] lg:h-[68vh] flex flex-col">
        <div className="flex flex-row w-full h-full gap-[1%]">
          {PANELS.map((panel, idx) => (
            <motion.div
              key={panel.id}
              initial={{ opacity: 0, y: '5vh' }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1.2,
                ease: [0.16, 1, 0.3, 1],
                delay: idx * 0.15
              }}
              className={`relative group overflow-hidden bg-white/5 h-full shrink-0 ${
                idx === 0
                  ? "flex-1"
                  : "hidden sm:block sm:w-[24.25%]"
              }`}
            >
              <motion.div
                style={{ scale }}
                className="absolute inset-0 w-full h-full"
              >
                <Image
                  src={panel.image}
                  alt={panel.title || "About Monte"}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 640px) 100vw, 25vw"
                />
              </motion.div>

              {panel.title && (
                <div className="absolute inset-0 bg-black/40 flex flex-col justify-end pb-[10%] px-[8%]">
                  <motion.div
                    initial={{ opacity: 0, x: '-2vw' }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="flex items-center gap-[0.5vw] mb-[4%]"
                  >
                    <span className="w-[0.4vw] h-[0.4vw] rounded-full bg-white opacity-60 min-w-[4px] min-h-[4px]" />
                    <span className="text-white text-[clamp(8px,1vw,12px)] font-bold tracking-[0.15em] uppercase opacity-80">
                      {panel.tag}
                    </span>
                  </motion.div>

                  <h1 className="text-white text-[clamp(1.5rem,4vw,4rem)] font-light leading-[1.2] tracking-tight whitespace-pre-line z-10">
                    {panel.title}
                  </h1>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
