"use client";
import React from "react";
import { motion } from "framer-motion";

export default function AboutText() {
  return (
    <section className="bg-black py-[12vh] w-full">
      <div className="w-[95%] max-w-[1200px] mx-auto px-[2%]">
        <div className="flex flex-col lg:flex-row justify-between gap-8 lg:gap-[6vw] items-start">

          <div className="w-full lg:w-[40%]">
            <motion.div
              initial={{ opacity: 0, y: '2vh' }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex items-center gap-[1vw] mb-[4%]"
            >
              <span className="w-[0.5vw] h-[0.5vw] min-w-[4px] min-h-[4px] rounded-full bg-white opacity-60" />
              <span className="text-white/60 text-[clamp(8px,0.8vw,12px)] font-bold tracking-[0.1em] uppercase whitespace-nowrap">
                Philosophy & Story
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: '3vh' }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-white text-[clamp(2rem,3.5vw,4rem)] font-light leading-[1.1] mb-[6%] tracking-tight"
            >
              The Advisor<br />Behind The<br />Advisory
            </motion.h2>
          </div>

          <div className="w-full lg:w-[60%] flex flex-col gap-6 pt-0 lg:pt-[2vh]">
            <motion.p
              initial={{ opacity: 0, y: '2vh' }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-white/70 text-[clamp(14px,1.2vw,18px)] font-light leading-relaxed max-w-full"
            >
              Amritpal Singh did not begin as a real estate consultant in the conventional sense. Before advising clients on what to buy, he had already been a capital markets professional: AMFI certified in mutual funds, NCFM certified in derivatives through NSE Academy, a practicing stock broker, and an insurance professional at a leading insurer. He understood how money moves, how it compounds, and what "safe returns" actually mean after inflation and tax. When he entered real estate, he brought a financial discipline that most property advisors simply do not have.
            </motion.p>
            
            <motion.p
              initial={{ opacity: 0, y: '2vh' }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-white/70 text-[clamp(14px,1.2vw,18px)] font-light leading-relaxed max-w-full"
            >
              He then became a developer, not as a passive investor, but as a director and sales head of a RERA-approved private limited company. He managed land acquisition, completed documentation for regulatory approvals, handled sales operations, and personally liaised with five Punjab government bodies: PUDA, PSPCL, the Forest and Conservation Authorities, the Municipal Committee, and the Industrial Departments. He knows what an approval actually involves. He knows what it costs when one doesn't come through. One project he worked on faced a forest department approval cancellation. He navigated that outcome personally. That experience is not in any textbook. It is not available from any other advisory in Mohali.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: '2vh' }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-white/70 text-[clamp(14px,1.2vw,18px)] font-light leading-relaxed max-w-full"
            >
              After years as a developer and navigating legal disputes that most people walk away from, Amritpal returned to advisory with a complete view of the market that is simply not available from anyone who has stayed on one side of it. He has been a consultant, a developer, a litigant, a newspaper editor, and a media partner for real estate exhibitions. He has closed 180+ transactions personally across every property category: residential flats, GMADA plots, agricultural land, industrial properties, commercial SCOs, and pre-launch bookings. Geographically this spans Mohali, Chandigarh, Panchkula, Banga, and Anandpur Sahib. He founded this practice on one principle: he will tell you what he would actually do with your money. Even if that means telling you not to spend it.
            </motion.p>
          </div>

        </div>
      </div>
    </section>
  );
}
