// app/site/blog/[slug]/page.tsx
import { allPosts } from "contentlayer/generated";
import { notFound } from "next/navigation";
import { useMDXComponent } from "next-contentlayer/hooks";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { formatDate } from "@/lib/utils";
import { Clock, ArrowLeft } from "lucide-react";
import { siteConfig } from "@/config/site";

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

// MDX components — customize how MDX elements render
function MDXContent({ code }: { code: string }) {
  const Component = useMDXComponent(code);
  return (
    <Component
      components={{
        // Custom MDX component overrides
        img: ({ src, alt }: any) => (
          <div className="my-8 overflow-hidden">
            <Image
              src={src}
              alt={alt ?? ""}
              width={800}
              height={450}
              className="w-full object-cover"
            />
          </div>
        ),
        // Add more custom components here
      }}
    />
  );
}

export default function BlogPostPage({ params }: Props) {
  const post = allPosts.find((p) => p.slug === params.slug);
  if (!post) notFound();

  return (
    <article className="pt-[var(--nav-height)] min-h-screen bg-[#0D0D0D]">
      {/* Hero image */}
      <div className="relative h-[50vh] min-h-[400px] overflow-hidden">
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-black/30 to-black/40" />
        <div className="absolute bottom-0 left-0 right-0 container-site pb-12">
          <span className="font-body text-xs text-[var(--gold)] uppercase tracking-widest mb-3 block">
            {post.category}
          </span>
          <h1 className="font-display text-4xl md:text-5xl text-white font-light max-w-3xl">
            {post.title}
          </h1>
        </div>
      </div>

      {/* Meta bar */}
      <div className="border-b border-[rgba(201,168,76,0.08)]">
        <div className="container-site py-5 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-6 font-body text-sm text-white/50">
            <span>{post.author}</span>
            <span>{formatDate(post.date)}</span>
            <span className="flex items-center gap-1.5">
              <Clock size={14} />
              {post.readingTime}
            </span>
          </div>
          <Link
            href="/blog"
            className="flex items-center gap-2 font-body text-sm text-white/40 hover:text-white transition-colors"
          >
            <ArrowLeft size={14} /> Back to Blog
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="container-site py-16">
        <div className="max-w-[70ch] mx-auto prose-monter">
          <MDXContent code={post.body.code} />
        </div>
      </div>

      {/* CTA */}
      <div className="border-t border-[rgba(201,168,76,0.08)] bg-[#080808]">
        <div className="container-site py-16 text-center">
          <p className="font-body text-white/50 mb-2 text-sm">Ready to act on what you've read?</p>
          <h3 className="font-display text-3xl text-white font-light mb-6">
            Talk to an Advisor
          </h3>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 px-8 py-4 bg-[var(--gold)] text-black font-body font-medium text-sm tracking-wide hover:bg-[var(--gold-light)] transition-colors"
          >
            Book a Free Consultation
          </Link>
        </div>
      </div>
    </article>
  );
}
