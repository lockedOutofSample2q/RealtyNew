"use client";
// components/sections/FaqSection.tsx
// EDIT questions in config/site.ts → faqs

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { faqs } from "@/config/site";

export default function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="section-padding bg-[#0D0D0D]">
      <div className="container-site max-w-3xl">
        <div className="text-center mb-14">
          <span className="font-body text-xs tracking-widest uppercase text-[var(--gold)] mb-4 block">
            Common Questions
          </span>
          <h2 className="font-display font-light text-white">
            Everything You Need to Know
          </h2>
        </div>

        <div className="space-y-px">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="border border-[rgba(201,168,76,0.1)] overflow-hidden"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-[#141414] transition-colors group"
              >
                <span className="font-body text-white/80 font-medium pr-8 group-hover:text-white transition-colors">
                  {faq.question}
                </span>
                <span className="text-[var(--gold)] shrink-0">
                  {open === i ? <Minus size={18} /> : <Plus size={18} />}
                </span>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  open === i ? "max-h-96" : "max-h-0"
                }`}
              >
                <p className="px-6 pb-6 font-body text-sm text-white/55 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
