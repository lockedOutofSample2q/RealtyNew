"use client";
import React from "react";
import { motion } from "framer-motion";

const STATS = [
  { value: "8+", label: "Years in Dubai" },
  { value: "150+", label: "Curated Properties" },
  { value: "50+", label: "Skilled Professionals" },
  { value: "100+", label: "Happy Clients" },
];

export default function AboutStats() {
  return (
    <section className="bg-black py-[8vh] w-full">
      <div className="w-[95%] max-w-[1200px] mx-auto px-[2%]">
        <div className="flex flex-row justify-between gap-0 divide-x divide-white/20">
          {STATS.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
              className="flex flex-col items-start px-[4%] text-left border-l first:border-0 border-white/20 w-[25%]"
            >
              <div className="text-white text-[clamp(2.5rem,5vw,4.5rem)] font-light mb-[2%] tracking-tighter">
                {stat.value}
              </div>
              <div className="text-white text-[clamp(10px,1vw,14px)] font-light mt-[4%] opacity-80 whitespace-nowrap">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
