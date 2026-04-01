"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { formatDate } from "@/lib/utils";
import { Search } from "lucide-react";

export default function BlogClient({ posts }: { posts: any[] }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const categories = ["All", "Market News", "Investment Tips", "Community Spotlight", "Legal Updates", "Lifestyle"];
  
  const featured = posts.find((p) => p.featured) ?? posts[0];
  const rest = posts.filter((p) => p._id !== featured?._id);

  const filteredPosts = activeCategory === "All" 
    ? rest 
    : rest.filter(post => post.category === activeCategory);

  return (
    <div className="w-[95%] max-w-[1200px] mx-auto px-[2%] pb-[12vh]">
      
      {/* Header */}
      <div className="flex flex-col items-center text-center mb-[8vh]">
        <motion.div
          initial={{ opacity: 0, y: '2vh' }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block border border-black/20 rounded-full px-[1vw] py-[0.5vh] text-black text-[clamp(10px,0.8vw,12px)] font-bold tracking-[0.1em] uppercase mb-[3vh]">
            BLOG
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: '2vh' }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-black text-[clamp(2.5rem,4vw,4rem)] font-medium tracking-tight mb-[2vh]"
        >
          Latest News & Insights
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: '2vh' }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-black/60 text-[clamp(14px,1.2vw,18px)] max-w-[50%]"   
        >
          Stay informed about Dubai&apos;s real estate market, investment tips, and community spotlights
        </motion.p>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-row justify-between items-center mb-[4vh] shrink-0">
        <div className="flex flex-row gap-[0.8vw]">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-[1.2vw] py-[1vh] rounded-[0.5vw] text-[clamp(10px,0.9vw,14px)] font-medium transition-colors whitespace-nowrap shrink-0 border ${  
                activeCategory === cat
                  ? "bg-black text-white border-black"
                  : "bg-white text-black/60 border-black/10 hover:border-black/30"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-[20%] shrink-0">
          <div className="absolute inset-y-0 left-[0.8vw] flex items-center pointer-events-none">
            <Search className="w-[1.2vw] h-[1.2vw] text-black/40" />
          </div>
          <input
            type="text"
            placeholder="Search articles..."
            className="w-full bg-white border border-black/10 rounded-[0.5vw] py-[1vh] pl-[2.8vw] pr-[1vw] text-[clamp(12px,1vw,14px)] text-black focus:outline-none focus:border-black/30 transition-colors"
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
            className="flex flex-row w-full bg-white rounded-[1.5vw] border border-black/10 overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_12px_40px_rgb(0,0,0,0.08)] transition-shadow"
          >
            <div className="w-[50%] relative aspect-[4/3] shrink-0 border-r border-black/5 overflow-hidden">
              <Image
                src={featured.coverImage || "/assets/images/home/about.jpg"}
                alt={featured.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="w-[50%] flex flex-col justify-center p-[4vw]">
              <div className="flex items-center gap-[1vw] mb-[3vh]">
                <span className="bg-black text-white px-[1vw] py-[0.5vh] rounded-full text-[clamp(8px,0.7vw,10px)] font-bold tracking-[0.1em] uppercase shrink-0">
                  FEATURED
                </span>
                <span className="text-black/40 text-[clamp(10px,0.9vw,12px)] font-medium border-l border-black/10 pl-[1vw] ml-[0.5vw]">
                  {featured.category}
                </span>
                <span className="text-black/40 text-[clamp(10px,0.9vw,12px)] font-medium border-l border-black/10 pl-[1vw] ml-[0.5vw]">
                  {formatDate(featured.date)}
                </span>
              </div>

              <h2 className="text-black text-[clamp(1.5rem,2.5vw,2.5rem)] font-semibold leading-[1.2] tracking-tight mb-[2.5vh]">
                {featured.title}
              </h2>

              <p className="text-black/60 text-[clamp(12px,1.1vw,16px)] leading-relaxed mb-[4vh] line-clamp-3">
                {featured.excerpt}
              </p>

              <span className="inline-flex items-center gap-[0.5vw] text-black font-semibold text-[clamp(12px,1vw,14px)]">
                Read More <span className="group-hover:translate-x-[0.5vw] transition-transform">→</span>
              </span>
            </div>
          </motion.div>
        </Link>
      )}

      {/* Grid */}
      <div className="grid grid-cols-3 gap-[2%] align-top shrink-0">
        {filteredPosts.map((post, idx) => (
          <Link
            key={post._id}
            href={post.url}
            className="flex flex-col bg-white rounded-[1vw] border border-black/10 overflow-hidden shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all group h-full"
          >
            <div className="relative w-full aspect-[4/3] shrink-0 overflow-hidden">
              <Image
                src={post.coverImage || "/assets/images/home/about.jpg"}        
                alt={post.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-[5%] left-[5%] bg-white/90 backdrop-blur-sm px-[0.8vw] py-[0.5vh] rounded-[0.4vw]">
                <span className="text-black text-[clamp(8px,0.7vw,10px)] font-bold tracking-[0.1em] uppercase">
                  {post.category}
                </span>
              </div>
            </div>

            <div className="p-[2.5vw] flex flex-col flex-1">
              <span className="text-black/40 text-[clamp(9px,0.8vw,12px)] font-medium mb-[1.5vh]">
                {formatDate(post.date)}
              </span>

              <h3 className="text-black text-[clamp(1.1rem,1.5vw,1.8rem)] font-semibold leading-[1.2] tracking-tight mb-[2vh] group-hover:text-black/70 transition-colors line-clamp-2">
                {post.title}
              </h3>

              <p className="text-black/60 text-[clamp(12px,1vw,15px)] leading-relaxed mb-[3vh] line-clamp-3">
                {post.excerpt}
              </p>

              <div className="mt-auto">
                <span className="inline-flex items-center gap-[0.5vw] text-black font-semibold text-[clamp(11px,0.9vw,14px)]">
                  Read More <span className="group-hover:translate-x-[0.5vw] transition-transform">→</span>
                </span>
              </div>
            </div>
          </Link>
        ))}
        {filteredPosts.length === 0 && (
          <div className="col-span-3 text-center py-[10vh]">
             <p className="text-black/40 text-[clamp(14px,1.2vw,18px)]">No articles found in this category.</p>
          </div>
        )}
      </div>

    </div>
  );
}
