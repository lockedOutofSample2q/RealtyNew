"use client";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { faqs } from "@/config/site";
import { motion, AnimatePresence } from "framer-motion";

export default function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="section-padding bg-white">
      <div className="container-site max-w-4xl flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-block border border-black/10 rounded-full px-5 py-2 text-[11px] tracking-widest uppercase text-black font-bold mb-6">
            FAQ
          </span>
          <h2 className="font-display font-medium text-black text-3xl md:text-5xl lg:text-[56px] tracking-tight">
            Frequently Asked Question
          </h2>
        </motion.div>

        <div className="w-full">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="border-b border-gray-100/80 overflow-hidden"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between py-6 text-left hover:bg-gray-50/50 transition-colors group px-2 rounded-xl"
              >
                <div className="flex gap-6 md:gap-10 items-center font-display text-black md:text-xl font-medium pr-8">
                  <span className="text-gray-300 font-body text-sm font-bold tracking-widest">{String(i + 1).padStart(2, '0')}</span>
                  {faq.question}
                </div>
                <div className="w-9 h-9 rounded-full border border-gray-200 text-gray-400 flex items-center justify-center shrink-0 group-hover:border-black group-hover:text-black transition-colors">
                  {open === i ? <Minus size={16} /> : <Plus size={16} />}
                </div>
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="px-16 md:px-20 pb-8 font-body text-[15px] text-gray-500 leading-relaxed max-w-2xl">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
