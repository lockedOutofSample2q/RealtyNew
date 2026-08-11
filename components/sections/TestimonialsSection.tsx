"use client";
import { Quote } from "lucide-react";
import { motion } from "framer-motion";

const testimonials = [
  {
    quote: "A client discovered after paying 65% that the builder had already cancelled both plots the seller sold him. We chased the reinstatement for 8 months, negotiated reallocation of adjacent plots, and completed the transfer. He paid us nothing extra for it. That is what post-sale advisory means.",
    role: "Plot purchase",
    type: "Mohali. Details anonymised."
  },
  {
    quote: "A ground-floor buyer inherited years of unpaid property tax spread across a whole building. We brought all three floor owners to one table, drafted an MOU splitting the liability, generated separate property IDs for each floor, and completed the GMADA transfer in 3 months.",
    role: "Multi-floor building",
    type: "Mohali. Details anonymised."
  },
  {
    quote: "Commercial units near Sector 82 were trading at Rs 3 to 4 crore. Our client seated at Rs 11 crore when the market said 6.5 to 7. Today those units trade at Rs 12 to 16 crore. If you move without vision, you buy at the wrong price.",
    role: "Commercial",
    type: "Airport Road corridor."
  }
];

export default function TestimonialsSection() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container-site">
        <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-16">
          <div className="max-w-xl">
            <h2 className="font-display text-4xl md:text-6xl font-medium leading-tight mb-6">
              Real Case Studies
            </h2>
            <p className="font-body text-black/60 text-lg">
              What post-sale advisory actually looks like in practice.
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
                <p className="font-body text-xs text-black/40 uppercase tracking-widest">
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
