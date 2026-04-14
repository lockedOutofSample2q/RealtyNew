"use client";
import React from "react";
import { motion } from "framer-motion";

import { siteConfig } from "@/config/site";

const PHILOSOPHY = [
  { id: "01", title: "Insight & Analysis", description: "Every project begins with a deep forensic dive into market dynamics and architectural potential." },
  { id: "02", title: "Meticulous Planning", description: "We navigate the complex landscape of Mohali and Punjab real estate with surgical precision and strategic intent." },
  { id: "03", title: "Tailored Solutions", description: "Our approach is never generic. We curate solutions that align with your unique legacy and financial goals." },
  { id: "04", title: "Quality Execution", description: "From the first meeting to the final handover, our standard is uncompromising excellence." },
];

export default function AboutPhilosophy() {
  return (
    <section className="bg-black py-24 md:py-32 border-t border-white/5">
      <div className="container-site">
        <div className="max-w-4xl mx-auto flex flex-col items-center mb-16 px-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-3 mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            <span className="text-white text-[11px] font-bold tracking-[0.2em] uppercase opacity-60">
              PHILOSOPHY
            </span>
          </motion.div>
          
          <h2 className="font-display text-white text-4xl md:text-5xl lg:text-[56px] font-medium tracking-tight mb-6 text-center uppercase">
            The {siteConfig.name.split(' ')[0]} Way
          </h2>
          <p className="font-body text-white/50 text-base md:text-lg text-center max-w-xl mx-auto leading-relaxed">
            Our methodology is built on a decade of refined real estate intelligence and a relentless pursuit of architectural quality.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 px-6">
          {PHILOSOPHY.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
              className="flex flex-col group"
            >
              <div className="font-display text-white text-3xl font-medium mb-4 opacity-30 group-hover:opacity-100 transition-opacity duration-500">
                {item.id}
              </div>
              <h3 className="font-display text-white text-xl font-medium mb-3">
                {item.title}
              </h3>
              <p className="font-body text-white/40 text-sm leading-relaxed group-hover:text-white/60 transition-colors duration-500">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
