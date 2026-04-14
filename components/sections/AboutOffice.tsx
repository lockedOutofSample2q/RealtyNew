"use client";
import React from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";
import { useRef } from "react";
import { siteConfig } from "@/config/site";

export default function AboutOffice() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  return (
    <section ref={containerRef} className="bg-black py-[12vh] w-full">
      <div className="w-[95%] max-w-[1200px] mx-auto px-[2%]">

        <div className="flex flex-col items-center text-center mb-[8%]">        
          <motion.h2
            initial={{ opacity: 0, y: '2vh' }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-white text-[clamp(2rem,3vw,3rem)] font-light tracking-tight"
          >
            Visit Our Office
          </motion.h2>
        </div>

        <div className="flex flex-col lg:flex-row justify-between gap-8 lg:gap-[6%] items-center w-full">

          <div className="flex flex-col gap-[4vh] w-full lg:w-[40%]">

            <motion.div
              initial={{ opacity: 0, x: '-2vw' }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="flex gap-[4%]"
            >
              <MapPin className="text-white shrink-0 mt-[1%]" style={{ width: 'clamp(16px, 1.5vw, 24px)', height: 'clamp(16px, 1.5vw, 24px)' }} strokeWidth={1.5} />
              <div className="flex flex-col gap-[2px]">
                <span className="text-white/60 text-[clamp(8px,0.8vw,12px)] font-bold tracking-[0.1em] uppercase">LOCATION</span>
                <span className="text-white text-[clamp(14px,1vw,18px)] font-light leading-relaxed max-w-[200px]">
                  {siteConfig.contact.address}</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: '-2vw' }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex gap-[4%]"
            >
              <Phone className="text-white shrink-0 mt-[1%]" style={{ width: 'clamp(16px, 1.5vw, 24px)', height: 'clamp(16px, 1.5vw, 24px)' }} strokeWidth={1.5} />
              <div className="flex flex-col gap-[2px]">
                <span className="text-white/60 text-[clamp(8px,0.8vw,12px)] font-bold tracking-[0.1em] uppercase">PHONE</span>
                <span className="text-white text-[clamp(14px,1vw,18px)] font-light">
                  {siteConfig.contact.phone}
                </span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: '-2vw' }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex gap-[4%]"
            >
              <Mail className="text-white shrink-0 mt-[1%]" style={{ width: 'clamp(16px, 1.5vw, 24px)', height: 'clamp(16px, 1.5vw, 24px)' }} strokeWidth={1.5} />
              <div className="flex flex-col gap-[2px]">
                <span className="text-white/60 text-[clamp(8px,0.8vw,12px)] font-bold tracking-[0.1em] uppercase">EMAIL</span>
                <span className="text-white text-[clamp(14px,1vw,18px)] font-light">
                  {siteConfig.contact.email}
                </span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: '2vh' }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-[4%]"
            >
              <Link
                href="/contact"
                className="inline-flex items-center justify-center border border-white/20 text-white text-[clamp(10px,0.8vw,14px)] hover:bg-white hover:text-black transition-colors duration-300 px-[8%] py-[3%] tracking-widest font-medium group"
              >
                Contact Us <span className="ml-[5px] group-hover:translate-x-[5px] transition-transform">→</span>
              </Link>
            </motion.div>

          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full lg:w-[50%] h-[40vh] lg:h-[50vh] rounded-2xl overflow-hidden grayscale contrast-125 opacity-80 shrink-0 group cursor-pointer"
          >
            <a href={siteConfig.contact.mapUrl} target="_blank" rel="noopener noreferrer" className="block w-full h-full">
              <motion.div style={{ scale }} className="absolute inset-0 w-full h-full">
                <Image
                  src="/assets/images/home/about.jpg"
                  alt="Office Location Map"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </motion.div>
            </a>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
