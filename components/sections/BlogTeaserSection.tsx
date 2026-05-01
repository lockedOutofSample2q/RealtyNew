"use client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

const posts = [
  {
    title: "Why Your Mohali Real Estate Strategy Is Already Outdated: The Vision Premium of 2026",
    category: "Investment Strategy",
    date: "May 01, 2026",
    href: "/blog/mohali-real-estate-investment-strategy-2026",
    image: "/assets/images/blog/holographic-2026-mohali-master-plan-realty-holding-management-consultants.webp"
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
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
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
