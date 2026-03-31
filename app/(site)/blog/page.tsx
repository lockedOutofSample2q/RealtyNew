// app/site/blog/page.tsx  →  /blog
import { allPosts } from "../../../.contentlayer/generated";
import { compareDesc } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { formatDate } from "@/lib/utils";
import { Clock, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog | Market Insights",
  description: "Dubai real estate market insights, investment guides, and community spotlights from the Monter team.",
};

export default function BlogPage() {
  const posts = allPosts.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date))
  );

  const featured = posts.find((p) => p.featured) ?? posts[0];
  const rest = posts.filter((p) => p._id !== featured?._id);

  return (
    <div className="pt-[var(--nav-height)] min-h-screen bg-[#0D0D0D]">
      {/* Hero */}
      <div className="section-padding border-b border-[rgba(201,168,76,0.08)]">
        <div className="container-site">
          <span className="font-body text-xs tracking-widest uppercase text-[var(--gold)] mb-4 block">
            Monter Blog
          </span>
          <h1 className="font-display font-light text-white mb-4">
            Market Intelligence
          </h1>
          <p className="font-body text-white/50 max-w-xl">
            Straight talk on Dubai's real estate market — no filler, no fluff.
          </p>
        </div>
      </div>

      <div className="container-site py-16">
        {posts.length === 0 ? (
          <div className="text-center py-24">
            <p className="font-body text-white/40">No posts yet.</p>
            <p className="font-body text-white/25 text-sm mt-2">
              Push an .mdx file to content/blog/ to get started.
            </p>
          </div>
        ) : (
          <>
            {/* Featured post */}
            {featured && (
              <Link
                href={featured.url}
                className="group grid grid-cols-1 lg:grid-cols-2 gap-0 border border-[rgba(201,168,76,0.12)] hover:border-[rgba(201,168,76,0.3)] transition-all mb-14 overflow-hidden"
              >
                <div className="relative aspect-[16/9] lg:aspect-auto">
                  <Image
                    src={featured.coverImage}
                    alt={featured.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="p-10 bg-[#0D0D0D] flex flex-col justify-center">
                  <span className="font-body text-xs text-[var(--gold)] uppercase tracking-widest mb-4">
                    {featured.category} · Featured
                  </span>
                  <h2 className="font-display text-3xl text-white font-light mb-4 group-hover:text-[var(--gold)] transition-colors">
                    {featured.title}
                  </h2>
                  <p className="font-body text-sm text-white/55 leading-relaxed mb-6">
                    {featured.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-white/40 font-body text-xs">
                    <span>{formatDate(featured.date)}</span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} /> {featured.readingTime}
                    </span>
                  </div>
                </div>
              </Link>
            )}

            {/* Post grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {rest.map((post) => (
                <Link
                  key={post._id}
                  href={post.url}
                  className="group border border-[rgba(201,168,76,0.08)] hover:border-[rgba(201,168,76,0.25)] transition-all overflow-hidden"
                >
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-6">
                    <span className="font-body text-xs text-[var(--gold)] uppercase tracking-widest mb-3 block">
                      {post.category}
                    </span>
                    <h3 className="font-display text-xl text-white font-light mb-3 group-hover:text-[var(--gold)] transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="font-body text-xs text-white/50 line-clamp-2 mb-4">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="font-body text-xs text-white/30">
                        {formatDate(post.date)}
                      </span>
                      <span className="font-body text-xs text-[var(--gold)] flex items-center gap-1 group-hover:gap-2 transition-all">
                        Read <ArrowRight size={12} />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
