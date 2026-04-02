"use client";
import React from "react";
import { motion } from "framer-motion";
import { aboutValues } from "@/config/about";

export default function AboutValues() {
  return (
    <section className="bg-black py-[12vh] w-full">
      <div className="w-[95%] max-w-[1200px] mx-auto px-[2%]">

        <div className="flex flex-col items-center text-center mb-[8%]">        
          <motion.h2
            initial={{ opacity: 0, y: '2vh' }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-white text-[clamp(2rem,3vw,3rem)] font-light mb-[2vh]"
          >
            {aboutValues.heading}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: '2vh' }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-white/60 text-[clamp(12px,1.2vw,15px)]"
          >
            {aboutValues.subheading}
          </motion.p>
        </div>

        <div className="grid grid-cols-3 border-t border-l border-white/10 w-full">
          {aboutValues.items.map((val, idx) => (
            <motion.div
              key={val.title}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-[8%] border-b border-r border-white/10 flex flex-col"
            >
              <h3 className="text-white text-[clamp(1.2rem,1.5vw,1.8rem)] font-light mb-[8%] tracking-wide">
                {val.title}
              </h3>
              <p className="text-white/60 text-[clamp(12px,1vw,14px)] leading-relaxed font-light">
                {val.text}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
