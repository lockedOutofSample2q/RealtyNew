"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function AboutLeadership() {
  return (
    <section className="bg-black py-[12vh] w-full">
      <div className="w-[95%] max-w-[1200px] mx-auto px-[2%]">

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-[6vw] items-center">

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="w-full lg:w-[45%] h-[50vh] lg:h-[80vh] relative overflow-hidden shrink-0 rounded-lg"
          >
            <Image
              src="/assets/images/about/ceo.png"
              alt="Amritpal Singh - Founder"
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
            className="w-full lg:w-[50%] flex flex-col justify-center"
          >
            <div className="flex items-center gap-[1vw] mb-[4%]">
              <span className="w-[0.4vw] h-[0.4vw] min-w-[4px] min-h-[4px] rounded-full bg-white opacity-60" />
              <span className="text-white/60 text-[clamp(8px,0.8vw,12px)] font-bold tracking-[0.1em] uppercase">
                The Advisor Behind the Advisory
              </span>
            </div>
            
            <h2 className="text-white text-[clamp(1.5rem,2.5vw,3rem)] font-light leading-[1.3] tracking-tight mb-[4vh] italic">
              "I have been a developer who built projects and a buyer who fought to protect one. I have sat across the table from every type of problem this market can create. When I advise a client, I am not reading from a playbook. I am telling them what I have learned from being on the inside of every one of these situations. That is not something I was born with. It cost time, money, and in some cases years. It is also why clients trust me with decisions that cost crores."
            </h2>

            <p className="text-white text-[clamp(18px,1.5vw,24px)] font-light mb-[0.5vh]">
              Amritpal Singh
            </p>
            <p className="text-white/60 text-[clamp(14px,1.2vw,18px)] font-light">
              Founder
            </p>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
