"use client";
import React from "react";
import { motion } from "framer-motion";

const VALUES = [
  {
    title: "Excellence",
    text: "Excellence is not just a goal, it's our standard. We strive for the highest quality in every project, ensuring every detail is perfect and every client's dream is realized."
  },
  {
    title: "Achievement",
    text: "We measure our success by the milestones we reach and the impact we make in Mohali's real estate market. Each completed project is a testament to our team's relentless drive for achievement."
  },
  {
    title: "Commitment",
    text: "Our commitment to our clients and their visions is unwavering. From the first sketch to the final handover, we are dedicated to bringing your real estate aspirations to life with integrity and professionalism."
  },
  {
    title: "Innovation",
    text: "We embrace cutting-edge technology and creative solutions to deliver exceptional real estate experiences that set new standards in Mohali's property market."
  },
  {
    title: "Teamwork",
    text: "Our success is built on collaboration and shared expertise. Working together, we combine diverse skills and perspectives to achieve outstanding results for every client."
  },
  {
    title: "Growth",
    text: "We continuously evolve and adapt to the dynamic real estate landscape, growing alongside our clients and the communities we serve in Mohali and Punjab."
  }
];

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
            Our Core Values
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: '2vh' }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-white/60 text-[clamp(12px,1.2vw,15px)]"
          >
            The principles that guide everything we do
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-t border-l border-white/10 w-full">
          {VALUES.map((val, idx) => (
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
