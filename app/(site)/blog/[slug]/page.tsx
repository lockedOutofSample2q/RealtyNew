import React from "react";
import { allPosts } from "../../../../.contentlayer/generated";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { formatDate } from "@/lib/utils";
import { Clock, ChevronRight } from "lucide-react";
import { siteConfig } from "@/config/site";
import BlogSidebar from "./BlogSidebar";
import MDXContent from "./MDXContent";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return allPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = allPosts.find((p) => p.slug === params.slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.coverImage }],
    },
  };
}

export default function BlogPostPage({ params }: Props) {
  const post = allPosts.find((p) => p.slug === params.slug);
  if (!post) notFound();

  // Related posts: same category first, then fill from others
  const sameCat = allPosts.filter(
    (p) => p.slug !== post.slug && p.category === post.category
  );
  const others = allPosts.filter(
    (p) => p.slug !== post.slug && p.category !== post.category
  );
  const related = [...sameCat, ...others].slice(0, 3);

  const postUrl = `${siteConfig.url}/blog/${post.slug}`;

  return (
    <article className="min-h-screen bg-white pt-[var(--nav-height)]">

      {/* ── Header ───────────────────────────────────────── */}
      <div className="container-site pt-14 pb-10">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-[13px] text-black/40 mb-7 font-body">
          <Link href="/blog" className="hover:text-black transition-colors">Blog</Link>
          <ChevronRight size={13} />
          <span className="text-black/60">{post.category}</span>
        </nav>

        {/* Category badge */}
        <span className="inline-block border border-black/15 rounded-full px-4 py-1.5 text-[11px] font-semibold tracking-[0.12em] uppercase text-black/50 mb-6">
          {post.category}
        </span>

        {/* Title */}
        <h1 className="font-body text-[clamp(2rem,4vw,3.2rem)] font-semibold text-black leading-[1.15] tracking-tight max-w-3xl mb-6">
          {post.title}
        </h1>

        {/* Meta */}
        <div className="flex items-center gap-5 text-[14px] text-black/40 font-body">
          <span>{formatDate(post.date)}</span>
          <span className="flex items-center gap-1.5">
            <Clock size={14} />
            {post.readingTime}
          </span>
        </div>
      </div>

      {/* ── Cover Image ──────────────────────────────────── */}
      <div className="container-site pb-12">
        <div className="relative w-full h-[clamp(320px,50vw,600px)] overflow-hidden rounded-2xl bg-black/5">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* ── Content + Sidebar ────────────────────────────── */}
      <div className="container-site pb-24">
        <div className="flex gap-8 lg:gap-16 items-start">

          {/* Main content */}
          <div className="flex-1 min-w-0">
            <div className="prose-monter">
              <MDXContent code={post.body.code} />
            </div>
          </div>

          {/* Sidebar */}
          <aside className="w-72 shrink-0 hidden lg:block sticky top-28">
            <BlogSidebar postUrl={postUrl} postTitle={post.title} />
          </aside>

        </div>
      </div>

      {/* ── Related Articles ─────────────────────────────── */}
      {related.length > 0 && (
        <div className="bg-[#f7f7f7] border-t border-black/5">
          <div className="container-site py-16">
            <h2 className="font-body text-[clamp(1.3rem,2vw,1.6rem)] font-semibold text-black tracking-tight mb-10">
              Related Articles
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  href={p.url}
                  className="group bg-white border border-black/8 overflow-hidden hover:shadow-[0_4px_24px_rgba(0,0,0,0.08)] transition-shadow"
                >
                  <div className="relative w-full aspect-[16/9] overflow-hidden bg-black/5">
                    <Image
                      src={p.coverImage}
                      alt={p.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5">
                    <span className="text-[10px] font-semibold tracking-[0.12em] uppercase text-black/35 block mb-2">
                      {p.category}
                    </span>
                    <h3 className="font-body text-[14px] font-semibold text-black leading-snug mb-2 line-clamp-2 group-hover:text-black/70 transition-colors">
                      {p.title}
                    </h3>
                    <span className="text-[12px] text-black/35">{formatDate(p.date)}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

    </article>
  );
}
