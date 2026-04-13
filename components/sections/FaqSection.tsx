"use client";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    question: "Can anyone buy property in Mohali, including people outside Punjab?",
    answer: "Yes. There are no residency or domicile restrictions on buying property in Mohali or Punjab. Indian residents from any state, NRIs, and in certain cases foreign nationals can purchase here. NRIs must route payment through an NRO or NRE account and comply with FEMA guidelines. The process is straightforward with the right preparation."
  },
  {
    question: "How does a pre-launch booking actually work, and what is the real risk?",
    answer: "In a pre-launch, you book at an early price before construction begins, typically paying 25% upfront with the balance on a construction-linked schedule. The discount over possession-stage pricing is real. So is the risk. Developer cash flow health, RERA registration status, approval completeness, and past delivery record all need to be verified before paying a single rupee. I evaluate all of these before I recommend a pre-launch to any client."
  },
  {
    question: "What should I do with a land acquisition payout in Punjab?",
    answer: "The 24-month capital gains reinvestment window under Section 54F gives you time to make a considered decision. Not unlimited time. The money should be parked in a Capital Gains Account Scheme while you decide, not in an FD that looks safe but loses value in real terms after inflation. The options from ₹50 lakh to ₹5 crore are genuinely different, and which one makes sense depends on your goals, your family's needs, and the specific market conditions right now. This is exactly the kind of conversation we have in a free consultation."
  },
  {
    question: "What returns can I realistically expect from Mohali real estate?",
    answer: "In growth corridors like E328 Industrial area phase 8A, the Airport Road commercial belt, and the Bharatmala-linked industrial zones near Rajpura, appreciation has been significant. Commercial units on Airport Road that were available at ₹3–4 crore some years ago now trade at ₹12–16 crore. Industrial land purchased at ₹18.70 lakh per vigha was valued at ₹45 lakh per vigha six months later. But these outcomes came from buying before the infrastructure was visible. Not after. I will tell you where the next vision corridor is, and I will tell you when I think a market is overpriced. Both equally."
  }
];

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
