"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { formatDate } from "@/lib/utils";
import { Search, ArrowRight } from "lucide-react";

export default function BlogClient({ posts }: { posts: any[] }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const categories = [
    "All",
    "Market News",
    "Investment Tips",
    "Community Spotlight",
    "Legal Updates",
    "Lifestyle",
    "Market Analysis",
    "Buyer Guide",
  ];
  
  const featured = posts.find((p) => p.featured) ?? posts[0];
  const rest = posts.filter((p) => p._id !== featured?._id);

  const filteredPosts = activeCategory === "All" 
    ? rest 
    : rest.filter(post => post.category === activeCategory);

  return (
    <div className="w-[95%] max-w-[1240px] mx-auto px-[2%] pb-[12vh]">
      
      {/* Header */}
      <div className="flex flex-col items-center text-center mb-[8vh]">
        <motion.div
          initial={{ opacity: 0, y: '2vh' }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block border border-black/10 rounded-full px-5 py-2 text-black text-[11px] font-bold tracking-widest uppercase mb-6">
            Blog
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: '2vh' }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-black text-[clamp(2.5rem,4vw,4rem)] font-display font-medium tracking-tight mb-[2vh]"
        >
          Mohali Real Estate, Explained by Someone Who Has Seen it Through.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: '2vh' }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-[#6D6B66] text-[clamp(15px,1.2vw,18px)] max-w-xl mx-auto leading-relaxed"
        >
          Written from experience, Learnt from being.
        </motion.p>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6 mb-[4vh] border-b border-black/5 pb-6">
        <div className="flex flex-row gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar select-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2.5 rounded-full text-[13px] font-semibold transition-all duration-300 whitespace-nowrap shrink-0 border ${
                activeCategory === cat
                  ? "bg-white/40 backdrop-blur-md border-white/60 text-black shadow-[0_8px_32px_rgba(0,0,0,0.08)] scale-105"
                  : "bg-transparent border-transparent text-black/40 hover:text-black hover:bg-black/5"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-[280px] shrink-0">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <Search className="w-4 h-4 text-black/40" />
          </div>
          <input
            type="text"
            placeholder="Search articles..."
            className="w-full bg-white border border-black/5 rounded-full py-3 pl-11 pr-4 text-[14px] text-black focus:outline-none focus:border-black/20 focus:ring-1 focus:ring-black/10 transition-shadow shadow-sm"
          />
        </div>
      </div>

      {/* Featured Post */}
      {featured && (
        <Link href={featured.url} className="block mb-[8vh] shrink-0 group">
          <motion.div
            initial={{ opacity: 0, y: '4vh' }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col lg:flex-row w-full bg-white rounded-[32px] overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] transition-all"
          >
            <div className="w-full lg:w-[50%] relative aspect-[16/9] lg:aspect-[4/3] shrink-0 overflow-hidden bg-[#F3F4F6]">
              <Image
                src={featured.coverImage || "/assets/images/home/about.jpg"}
                alt={featured.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="w-full lg:w-[50%] flex flex-col justify-center p-8 lg:p-12">
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className="bg-black text-white px-3 py-1.5 rounded-md text-[10px] font-bold tracking-widest uppercase shrink-0">
                  FEATURED
                </span>
                <span className="text-black/50 text-[12px] font-medium pl-3 border-l border-black/10">
                  {featured.category}
                </span>
                <span className="text-black/50 text-[12px] font-medium pl-3 border-l border-black/10">
                  {formatDate(featured.date)}
                </span>
              </div>

              <h2 className="text-black text-[clamp(1.8rem,2.5vw,2.5rem)] font-display font-semibold leading-[1.2] tracking-tight mb-6 group-hover:text-black/80 transition-colors">
                {featured.title}
              </h2>

              <p className="text-[#6D6B66] text-[15px] leading-relaxed mb-8 line-clamp-3">
                {featured.excerpt}
              </p>

              <div className="inline-flex items-center gap-2 text-black font-semibold text-[14px]">
                Read More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </motion.div>
        </Link>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPosts.map((post, idx) => (
          <Link
            key={post._id}
            href={post.url}
            className="flex flex-col bg-white rounded-[32px] overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 group h-full"
          >
            <div className="relative w-full aspect-[4/3] shrink-0 overflow-hidden bg-[#F3F4F6]">
              <Image
                src={post.coverImage || "/assets/images/home/about.jpg"}        
                alt={post.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-5 left-5 bg-black px-3 py-1.5 rounded-md shadow-sm">
                <span className="text-white text-[10px] font-bold tracking-widest uppercase">
                  {post.category}
                </span>
              </div>
            </div>

            <div className="p-8 flex flex-col flex-1">
              <span className="text-black/40 text-[12px] font-medium mb-4">
                {formatDate(post.date)}
              </span>

              <h3 className="text-black text-[clamp(1.2rem,1.5vw,1.5rem)] font-display font-semibold leading-[1.3] tracking-tight mb-4 group-hover:text-black/70 transition-colors line-clamp-2">
                {post.title}
              </h3>

              <p className="text-[#6D6B66] text-[14px] leading-relaxed mb-8 line-clamp-3">
                {post.excerpt}
              </p>

              <div className="mt-auto">
                <span className="inline-flex items-center gap-2 text-black font-semibold text-[13px]">
                  Read More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          </Link>
        ))}
        {filteredPosts.length === 0 && (
          <div className="col-span-1 sm:col-span-2 lg:col-span-3 text-center py-20 bg-white rounded-[32px] shadow-sm">
             <p className="text-[#6D6B66] text-lg font-medium">No articles found in this category.</p>
          </div>
        )}
      </div>

    </div>
  );
}
