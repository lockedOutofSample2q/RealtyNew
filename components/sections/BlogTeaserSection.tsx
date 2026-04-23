"use client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const posts = [
  {
    title: "The Rise of Mohali's IT City Corridor",
    category: "Market Trends",
    date: "April 15, 2026",
    href: "/blog"
  },
  {
    title: "Commercial Property: Airport Road vs Aerocity",
    category: "Investment Advisory",
    date: "April 10, 2026",
    href: "/blog"
  },
  {
    title: "RERA Punjab: A Guide for NRI Buyers",
    category: "Legal & Compliance",
    date: "April 05, 2026",
    href: "/blog"
  }
];

export default function BlogTeaserSection() {
  return (
    <section className="py-24 bg-white">
      <div className="container-site">
        <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-16">
          <div className="max-w-xl">
            <h2 className="font-display text-4xl md:text-6xl font-medium leading-tight mb-6">
              Market Insights
            </h2>
            <p className="font-body text-black/60 text-lg">
              Stay ahead with the latest analysis on Mohali real estate.
            </p>
          </div>
          <Link
            href="/blog"
            className="flex items-center gap-2 font-body font-bold uppercase tracking-widest text-xs hover:opacity-70 transition-opacity"
          >
            View All Posts <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link href={post.href} className="group block">
                <div className="aspect-video rounded-[24px] bg-black/5 mb-6 overflow-hidden relative">
                   <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/5 transition-colors" />
                </div>
                <p className="font-body text-[10px] font-bold uppercase tracking-widest text-black/40 mb-3">
                  {post.category} • {post.date}
                </p>
                <h3 className="text-2xl font-display font-medium group-hover:underline leading-tight">
                  {post.title}
                </h3>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
