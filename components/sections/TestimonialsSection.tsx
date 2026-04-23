"use client";
import { Quote } from "lucide-react";
import { motion } from "framer-motion";

const testimonials = [
  {
    quote: "Realty Holding provided a level of transparency I hadn't seen in the Mohali market. Their advice on GMADA plots saved us from a very expensive mistake.",
    author: "Rajesh Sharma",
    role: "NRI Investor, Canada",
    type: "Land Investment"
  },
  {
    quote: "The team's local expertise is unmatched. They found us an off-market villa in Sector 66 that was exactly what we were looking for, at a fair price.",
    author: "Sandeep Kaur",
    role: "Homeowner",
    type: "Luxury Villa"
  },
  {
    quote: "Professional, data-driven, and honest. They don't just sell properties; they provide a comprehensive investment strategy. Highly recommended.",
    author: "Amit Malhotra",
    role: "Business Owner",
    type: "Commercial Portfolio"
  }
];

export default function TestimonialsSection() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container-site">
        <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-16">
          <div className="max-w-xl">
            <h2 className="font-display text-4xl md:text-6xl font-medium leading-tight mb-6">
              What Our Clients Say
            </h2>
            <p className="font-body text-black/60 text-lg">
              Trust is the foundation of every transaction we manage.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-black/5 rounded-[32px] p-10 flex flex-col justify-between"
            >
              <div>
                <Quote className="text-black/10 mb-8" size={48} />
                <p className="text-xl font-display font-medium leading-relaxed mb-8">
                  "{t.quote}"
                </p>
              </div>
              <div>
                <p className="font-body font-bold text-black">{t.author}</p>
                <p className="font-body text-xs text-black/40 uppercase tracking-widest mt-1">
                  {t.role} • {t.type}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
