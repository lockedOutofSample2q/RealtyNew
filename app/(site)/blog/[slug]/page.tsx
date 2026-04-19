import React from "react";
import { allPosts } from "contentlayer/generated";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { formatDate } from "@/lib/utils";
import { Clock, ChevronRight } from "lucide-react";
import { siteConfig } from "@/config/site";
import { getBlogLabel } from "@/lib/blog-utils";
import BlogSidebar from "./BlogSidebar";
import MDXContent from "./MDXContent";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return allPosts.flatMap((p: any) => [
    { slug: p._raw.flattenedPath.replace(/^blog[\\/]/, "") },
    ...(p.slug && p.slug !== p._raw.flattenedPath.replace(/^blog[\\/]/, "") ? [{ slug: p.slug }] : [])
  ]);
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const post = allPosts.find((p: any) => 
    p._raw.flattenedPath.replace(/^blog[\\/]/, "") === params.slug || 
    (p as any).slug === params.slug
  );
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

export default async function BlogPostPage(props: Props) {
  const params = await props.params;
  const post = allPosts.find((p: any) => 
    p._raw.flattenedPath.replace(/^blog[\\/]/, "") === params.slug || 
    (p as any).slug === params.slug
  );
  if (!post) notFound();

  // Related posts: same category first, then fill from others
  const sameCat = allPosts.filter(
    (p: any) => p.slug !== post.slug && p.category === post.category
  );
  const others = allPosts.filter(
    (p: any) => p.slug !== post.slug && p.category !== post.category
  );
  const related = [...sameCat, ...others].slice(0, 3);

  const postUrl = `${siteConfig.url}/blog/${post.slug}`;

  return (
    <article className="min-h-screen bg-white">
      
      {/* ── White Hero Header ────────────────────────────────── */}
      <div className="bg-white text-black pt-[calc(var(--nav-height)+2rem)] md:pt-[calc(var(--nav-height)+4rem)] pb-24 px-6 relative overflow-hidden border-b border-black/[0.03]">
        <div className="container-site relative z-10">
          
          {/* Breadcrumb for SEO & Navigation */}
          <nav className="flex items-center gap-2 text-[11px] md:text-[13px] text-black/35 mb-8 md:mb-12 font-body">
            <Link href="/" className="hover:text-black transition-colors">Home</Link>
            <ChevronRight size={10} />
            <Link href="/blog" className="hover:text-black transition-colors">Blog</Link>
            <ChevronRight size={10} />
            <span className="text-black/60 line-clamp-1 max-w-[200px] md:max-w-none">{post.title}</span>
          </nav>

          <div className="max-w-4xl">
            <span className="inline-block border border-black/10 bg-black/[0.02] rounded-full px-4 py-1.5 text-[11px] font-semibold tracking-[0.12em] uppercase text-black/50 mb-6">
              {getBlogLabel(post.category)}
            </span>
            <h1 className="font-display text-[clamp(2.5rem,5vw,4.2rem)] font-medium leading-[1.1] mb-8 text-black">
              {post.title}
            </h1>
            <div className="flex items-center gap-5 text-[14px] text-black/40 font-body">
              <span>{formatDate(post.date)}</span>
              <span className="flex items-center gap-1.5">
                <Clock size={14} />
                {post.readingTime}
              </span>
            </div>
          </div>
        </div>

        {/* Subtle decorative element for the white room feel */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-black/[0.01] to-transparent pointer-events-none" />
      </div>

      {/* ── Cover Image (Overlapping) ────────────────────── */}
      <div className="container-site -mt-16 relative z-20 pb-16">
        <div className="relative w-full h-[clamp(320px,50vw,700px)] overflow-hidden rounded-[32px] shadow-2xl bg-black/5">
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
                      {getBlogLabel(p.category)}
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
