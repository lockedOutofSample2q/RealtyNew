import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Market Insights | Realty Holding & Management Consultants",
  description: "The go to blog for everything reltaed to real estate in Mohali, by the best real estate consultant, Amritpal Singh. ",
};

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-white pt-[var(--nav-height)]">
      <div className="container-site py-section">
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-medium text-charcoal mb-4">
          Blog
        </h1>
        <p className="font-body text-muted text-lg max-w-2xl mb-12 leading-relaxed">
          Latest news, strategic property guides, and off-market real estate trends in Mohali carefully curated by our advisory board.
        </p>
        
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
      </div>
    </div>
  );
}
