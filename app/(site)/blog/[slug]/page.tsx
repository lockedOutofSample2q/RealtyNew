import { allPosts } from "contentlayer/generated";
import { notFound } from "next/navigation";
import Image from "next/image";
import { format, parseISO } from "date-fns";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import MdxContent from "@/components/blog/MdxContent";
import { siteConfig } from "@/config/site";

interface PostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: PostPageProps) {
  const { slug } = await params;
  const post = allPosts.find((post) => post.slug === slug);
  if (!post) return {};

  const titleText = post.metaTitle || post.title;
  const descText = post.metaDescription || post.excerpt;

  const imageUrl = post.coverImage
    ? (post.coverImage.startsWith("http") ? post.coverImage : `${siteConfig.url}${post.coverImage.startsWith("/") ? post.coverImage : `/${post.coverImage}`}`)
    : undefined;

  return {
    title: titleText,
    description: descText,
    alternates: {
      canonical: `${siteConfig.url}/blog/${post.slug}`,
    },
    openGraph: {
      title: titleText,
      description: descText,
      type: "article",
      url: `${siteConfig.url}/blog/${post.slug}`,
      images: imageUrl ? [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: titleText,
      description: descText,
      images: imageUrl ? [imageUrl] : [],
    },
  };
}

export async function generateStaticParams() {
  return allPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = allPosts.find((post) => post.slug === slug);

  if (!post) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${siteConfig.url}${post.url}/#blogposting`,
        "mainEntityOfPage": `${siteConfig.url}${post.url}`,
        "headline": post.title,
        "name": post.title,
        "description": post.excerpt,
        "datePublished": post.date,
        "dateModified": post.date, // Using same date as modified if not available
        "author": (post.author === "Realty Holding and Management Consultants" || post.author === "Realty Holding & Management Consultants" || post.author.includes("Realty Holding"))
          ? {
              "@type": "Organization",
              "@id": `${siteConfig.url}/#organization`,
              "name": "Realty Holding & Management Consultants",
              "url": siteConfig.url
            }
          : {
              "@type": "Person",
              "@id": post.author_url || `${siteConfig.url}/#person`,
              "name": post.author,
              "url": post.author_url || siteConfig.url
            },
        "publisher": {
          "@type": "Organization",
          "@id": `${siteConfig.url}/#organization`,
          "name": siteConfig.name,
          "logo": {
            "@type": "ImageObject",
            "url": `${siteConfig.url}/icon.png`
          }
        },
        "image": post.coverImage.startsWith('http') ? post.coverImage : `${siteConfig.url}${post.coverImage.startsWith('/') ? post.coverImage : `/${post.coverImage}`}`
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${siteConfig.url}${post.url}/#breadcrumb`,
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": siteConfig.url
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Blog",
            "item": `${siteConfig.url}/blog`
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": post.title,
            "item": `${siteConfig.url}${post.url}`
          }
        ]
      }
    ]
  };

  return (
    <article className="min-h-screen bg-white pt-[var(--nav-height)] pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {post.schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: post.schema }}
        />
      )}
      <div className="container-site">
        <div className="max-w-3xl mx-auto">
          <Link 
            href="/blog" 
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted hover:text-charcoal transition-colors mb-12"
          >
            <ArrowLeft size={16} /> Back to Insights
          </Link>

          <header className="mb-16">
            <div className="flex items-center gap-4 mb-8">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-gold border border-gold/20 px-4 py-1.5 rounded-full bg-gold/5">
                {post.category}
              </span>
              <div className="flex items-center gap-2 text-muted text-[11px] font-medium uppercase tracking-widest">
                <span>{format(parseISO(post.date), "MMMM dd, yyyy")}</span>
                <span className="w-1 h-1 rounded-full bg-gold/30" />
                <span>{post.readingTime}</span>
              </div>
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl font-medium text-charcoal mb-10 leading-[1.1] tracking-tight">
              {post.title}
            </h1>
            <div className="flex items-center gap-5 p-1 pr-6 bg-charcoal/5 rounded-full w-fit border border-black/5">
              <div className="w-10 h-10 rounded-full bg-white p-1.5 flex items-center justify-center shadow-xl border border-black/5 overflow-hidden">
                <Image 
                  src="/icon.png" 
                  alt="Realty Holding & Management Consultants" 
                  width={40} 
                  height={40}
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-widest text-muted font-bold">Author</span>
                <span className="font-display text-base text-charcoal leading-none">{post.author}</span>
              </div>
            </div>
          </header>

          <div className="relative aspect-[16/9] rounded-3xl overflow-hidden mb-16 shadow-2xl">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1200px) 100vw, 1200px"
            />
          </div>

          <div className="prose prose-lg prose-charcoal max-w-none prose-headings:font-serif">
            <MdxContent source={post.body.raw} />
          </div>

          <div className="mt-16 p-8 bg-[#F8F9FA] rounded-2xl border border-black/5 text-center">
            <h3 className="font-display text-2xl font-semibold mb-4 text-charcoal">Planning a property purchase in Mohali?</h3>
            <p className="text-black/70 mb-6">
              Use our free <Link href="/tools/mortgage-calculator" className="text-blue-600 font-semibold hover:underline">EMI Calculator for Mohali property</Link> to estimate your monthly payments before you visit the site &rarr;
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
