"use client";
import React from "react";
import { motion } from "framer-motion";

const PROCESS = [
  {
    num: "01",
    title: "Insight & Analysis",
    text: "Deep market analysis and understanding of your unique requirements to identify perfect opportunities."
  },
  {
    num: "02",
    title: "Meticulous Planning",
    text: "Strategic planning tailored to your goals, timeline, and investment objectives."
  },
  {
    num: "03",
    title: "Tailored Solutions",
    text: "Customized property solutions that align perfectly with your vision and lifestyle."
  },
  {
    num: "04",
    title: "Quality Execution",
    text: "Seamless execution with attention to every detail, ensuring a smooth transition experience."
  }
];

export default function AboutProcess() {
  return (
    <section className="bg-white py-[12vh] w-full">
      <div className="w-[95%] max-w-[900px] mx-auto px-[2%]">

        <div className="flex flex-col items-center text-center mb-[10%]">       
          <motion.h2
            initial={{ opacity: 0, y: '2vh' }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-black text-[clamp(2.5rem,4vw,4rem)] font-light mb-[3%] tracking-tight"
          >
            Our Process
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: '2vh' }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-black/60 text-[clamp(12px,1.2vw,15px)]"
          >
            A systematic approach ensuring excellence at every step
          </motion.p>
        </div>

        <div className="flex flex-col gap-[6vh]">
          {PROCESS.map((item, idx) => (
            <motion.div
              key={item.num}
              initial={{ opacity: 0, x: '-2vw' }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
              className="flex flex-row items-center gap-[4vw]"
            >
              <div className="text-black/10 text-[clamp(5rem,8vw,8rem)] font-light tracking-tighter w-[12vw] shrink-0">
                {item.num}
              </div>
              <div className="flex flex-col gap-[1vh]">
                <h3 className="text-black text-[clamp(1.2rem,2vw,2rem)] font-light tracking-wide">
                  {item.title}
                </h3>
                <p className="text-black/60 text-[clamp(12px,1.2vw,16px)] leading-relaxed font-light">
                  {item.text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
