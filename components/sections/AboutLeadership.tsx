"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { leadership } from "@/config/about";

export default function AboutLeadership() {
  return (
    <section className="bg-black py-[12vh] w-full">
      <div className="w-[95%] max-w-[1200px] mx-auto px-[2%]">

        <div className="flex flex-row gap-[6vw] items-center">      

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="w-[45%] h-[80vh] relative overflow-hidden shrink-0 rounded-lg"
          >
            <Image
              src={leadership.image}
              alt={`${leadership.name} - ${leadership.title}`}
              fill
              className="object-cover object-top"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: '2vw' }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-[50%] flex flex-col justify-center"
          >
            <div className="flex items-center gap-[1vw] mb-[4%]">
              <span className="w-[0.4vw] h-[0.4vw] min-w-[4px] min-h-[4px] rounded-full bg-white opacity-60" />
              <span className="text-white/60 text-[clamp(8px,0.8vw,12px)] font-bold tracking-[0.1em] uppercase">
                {leadership.eyebrow}
              </span>
            </div>
            
            <h2 className="text-white text-[clamp(2.5rem,4vw,4rem)] font-light leading-[1.1] tracking-tight mb-[2vh]">
              {leadership.name}
            </h2>

            <p className="text-white/60 text-[clamp(14px,1.2vw,18px)] font-light">
              {leadership.title}
            </p>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
