"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function AboutText() {
  return (
    <section className="bg-black py-[12vh] w-full">
      <div className="w-[95%] max-w-[1200px] mx-auto px-[2%]">
        <div className="flex flex-row justify-between gap-[6vw] items-start">       

          <div className="w-[65%]">
            <motion.div
              initial={{ opacity: 0, y: '2vh' }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex items-center gap-[1vw] mb-[4%]"
            >
              <span className="w-[0.5vw] h-[0.5vw] min-w-[4px] min-h-[4px] rounded-full bg-white opacity-60" />
              <span className="text-white/60 text-[clamp(8px,0.8vw,12px)] font-bold tracking-[0.1em] uppercase whitespace-nowrap">
                About Us
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: '3vh' }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-white text-[clamp(2.5rem,5vw,5rem)] font-light leading-[1.1] mb-[6%] tracking-tight"
            >
              We shape<br />structures that<br />shape lives
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: '2vh' }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-white/70 text-[clamp(14px,1.2vw,18px)] font-light leading-relaxed max-w-[80%]"
            >
              Founded on the principle that exceptional properties deserve exceptional service, Monte Real Estate has become a trusted name in Dubai&apos;s dynamic real estate market. We specialize in connecting discerning clients with premium properties across the UAE.
            </motion.p>
          </div>

          <div className="w-[20%] flex justify-end pt-[8vh]">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <Link
                href="/about"
                className="inline-flex items-center justify-center border border-white/20 text-white text-[clamp(10px,0.8vw,14px)] hover:bg-white hover:text-black transition-colors duration-300 px-[15%] py-[6%] tracking-widest font-medium whitespace-nowrap"  
              >
                Read More
              </Link>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
