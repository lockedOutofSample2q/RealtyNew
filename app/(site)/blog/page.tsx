import { allPosts } from "contentlayer/generated";
import Link from "next/link";
import Image from "next/image";
import { format, parseISO } from "date-fns";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Market Insights | Realty Holding & Management Consultants",
  description: "The go-to blog for everything related to real estate in Mohali, strategic property guides, and off-market trends by Realty Holding & Management Consultants.",
};

export default function BlogPage() {
  const posts = allPosts.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return (
    <div className="min-h-screen bg-white pt-[var(--nav-height)]">
      <div className="container-site py-section">
        <div className="max-w-2xl mb-16">
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-medium text-charcoal mb-6">
            Market Insights
          </h1>
          <p className="font-body text-muted text-lg leading-loose">
            Latest news, strategic property guides, and off-market real estate trends in Mohali carefully curated by our advisory board.
          </p>
        </div>

        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {posts.map((post) => (
              <article key={post._id} className="group flex flex-col h-full">
                <Link href={post.url} className="relative aspect-[16/10] overflow-hidden rounded-2xl mb-6 bg-charcoal/5 block">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </Link>
                <div className="flex flex-col flex-grow">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gold bg-gold/10 px-2.5 py-1 rounded-full">
                      {post.category}
                    </span>
                    <time dateTime={post.date} className="text-xs text-muted font-body">
                      {format(parseISO(post.date), "MMMM dd, yyyy")}
                    </time>
                  </div>
                  <Link href={post.url} className="group-hover:text-gold transition-colors">
                    <h2 className="font-display text-2xl font-medium mb-4 leading-tight">
                      {post.title}
                    </h2>
                  </Link>
                  <p className="font-body text-muted text-sm line-clamp-3 mb-6 flex-grow leading-loose">
                    {post.excerpt}
                  </p>
                  <Link 
                    href={post.url} 
                    className="font-body text-xs font-bold uppercase tracking-widest flex items-center gap-2 group-hover:translate-x-1 transition-transform"
                  >
                    Read More <span className="text-lg">→</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center py-24 border border-border/50 rounded-2xl bg-charcoal/5">
            <div className="text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mx-auto shadow-subtle mb-4">
                <svg className="w-5 h-5 text-charcoal/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5L18.5 7H20" />
                </svg>
              </div>
              <h3 className="font-display text-2xl text-charcoal font-medium">No posts published yet</h3>
              <p className="font-body text-sm text-muted">Stay tuned. Our first market insight report is coming soon.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
