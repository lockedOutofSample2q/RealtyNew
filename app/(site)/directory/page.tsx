import type { Metadata } from "next";
import Link from "next/link";
import { createAdminClient } from "@/lib/supabase";
import { siteConfig } from "@/config/site";
import { allPosts } from "contentlayer/generated";
import { slugify } from "@/lib/utils";
import { enrichProperty } from "@/lib/property-utils";
import type { Property } from "@/types";
import { Navigation, Building2, BookOpen, Compass, ShieldAlert, BadgePercent } from "lucide-react";

export const revalidate = 3600; // Cache for 1 hour

export const metadata: Metadata = {
  title: "Website Directory & Site Index | Realty Holding and Management Consultants",
  description: "Complete index of verified builders, cooperative societies, sector intelligence, property listings, and investment guides for Mohali & Tricity.",
  alternates: {
    canonical: "https://www.realtyconsultants.in/directory",
  },
};

interface DirectoryData {
  sectors: Array<{ slug: string; name: string }>;
  builders: Array<{ slug: string; name: string; isCoop: boolean; count: number }>;
  posts: Array<{ slug: string; title: string; category: string }>;
  listings: Array<{ slug: string; title: string; segment: string; type: string }>;
}

async function getDirectoryData(): Promise<DirectoryData> {
  const supabase = createAdminClient();

  // 1. Fetch Sector SEO pages
  let sectors: Array<{ slug: string; name: string }> = [];
  try {
    const { data: seoData } = await supabase
      .from("sector_seo")
      .select("sector_slug");
    
    if (seoData) {
      // Deduplicate slugs
      const slugs = Array.from(new Set((seoData as any[]).map((item: any) => item.sector_slug)));
      sectors = slugs.map((slug: any) => {
        const sectorNum = slug.replace(/^sector-/i, "").trim().toUpperCase();
        return {
          slug,
          name: `Sector ${sectorNum} Directory`,
        };
      }).sort((a, b) => a.name.localeCompare(b.name));
    }
  } catch (error) {
    console.error("Directory: Failed to fetch sectors:", error);
  }

  // 2. Fetch all properties to aggregate developers and listings
  let properties: Property[] = [];
  try {
    const [aptsRes, landsRes, housesRes] = await Promise.all([
      supabase.from("properties").select("*").eq("entity_type", "apartment"),
      supabase.from("properties").select("*").eq("entity_type", "land"),
      supabase.from("properties").select("*").eq("entity_type", "house"),
    ]);

    const apartments = (aptsRes.data || []).map((p: any) =>
      enrichProperty({ ...p, entity_type: "apartment" })
    );
    const lands = (landsRes.data || []).map((p: any) =>
      enrichProperty({ ...p, entity_type: "land" })
    );
    const houses = (housesRes.data || []).map((p: any) =>
      enrichProperty({ ...p, entity_type: "house" })
    );

    properties = [...apartments, ...lands, ...houses] as Property[];
  } catch (error) {
    console.error("Directory: Failed to fetch properties:", error);
  }

  // Aggregate builders
  const devMap = new Map<string, { name: string; isCoop: boolean; count: number }>();
  properties.forEach((p) => {
    if (!p.developer) return;
    const rawDev = p.developer.trim();
    if (rawDev === "Independent" || rawDev === "") return;

    const slug = slugify(rawDev);
    if (!devMap.has(slug)) {
      const isCoop = rawDev.toLowerCase().includes("cooperative") || 
                     rawDev.toLowerCase().includes("co-operative") || 
                     rawDev.toLowerCase().includes("society");
      devMap.set(slug, {
        name: rawDev,
        isCoop,
        count: 0
      });
    }
    devMap.get(slug)!.count += 1;
  });

  const builders = Array.from(devMap.entries()).map(([slug, data]) => ({
    slug,
    name: data.name,
    isCoop: data.isCoop,
    count: data.count,
  })).sort((a, b) => a.name.localeCompare(b.name));

  // Dynamic listings (Filter apartments & houses which have detail pages)
  const listings = properties
    .filter((p) => p.entity_type === "apartment" || p.entity_type === "house")
    .map((p) => ({
      slug: p.slug || "",
      title: p.title || "Property Listing",
      segment: p.entity_type === "house" ? "houses" : "flats",
      type: p.entity_type === "house" ? "Independent House" : "Apartment",
    }))
    .sort((a, b) => a.title.localeCompare(b.title));

  // 3. Blog posts from Contentlayer
  const posts = allPosts.map((post) => ({
    slug: post.slug || "",
    title: post.title,
    category: post.category,
  })).sort((a, b) => a.title.localeCompare(b.title));

  return {
    sectors,
    builders,
    posts,
    listings,
  };
}

export default async function DirectoryPage() {
  const { sectors, builders, posts, listings } = await getDirectoryData();

  return (
    <div className="pt-[var(--nav-height)] min-h-screen bg-[#FDFDFD]">
      {/* Directory Hero Banner */}
      <div className="bg-white pt-20 pb-16 border-b border-black/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-black/[0.01] via-transparent to-transparent pointer-events-none" />
        <div className="container-site relative z-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-medium text-charcoal mb-4 leading-tight tracking-tight">
            Site Directory & Index
          </h1>
          <p className="font-body text-base text-black/60 max-w-3xl leading-relaxed">
            Welcome to the complete index of the Realty Holding & Management Consultants portal. This directory provides direct crawl nodes for all RERA-registered developers, cooperative societies, sector intelligence pages, active property briefs, and legal guides in Mohali.
          </p>
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="container-site py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Sitemaps & Sub-Pages */}
          <div className="lg:col-span-8 space-y-16">
            
            {/* Section 1: Developer & Builder Portfolios */}
            <section className="bg-white border border-black/5 rounded-[32px] p-8 md:p-10 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold">
                  <Building2 size={20} />
                </div>
                <div>
                  <h2 className="font-display text-2xl font-semibold text-charcoal">Developer & Builder Portfolios</h2>
                  <p className="font-body text-xs text-black/45 mt-0.5">Independent reviews, RERA numbers, and active inventories</p>
                </div>
              </div>
              
              <div className="space-y-8">
                {/* Commercial Developers */}
                <div>
                  <h3 className="font-display text-sm uppercase tracking-wider text-black/45 font-bold mb-4">Commercial Developers ({builders.filter(b => !b.isCoop).length})</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {builders.filter(b => !b.isCoop).map((b) => (
                      <Link
                        key={b.slug}
                        href={`/properties/builders/${b.slug}`}
                        className="flex items-center justify-between p-4 rounded-2xl bg-black/[0.01] border border-black/5 hover:border-black/15 hover:bg-white hover:shadow-sm transition-all"
                      >
                        <span className="font-display text-sm font-medium text-charcoal">{b.name}</span>
                        <span className="font-body text-[10px] uppercase font-bold text-black/35 bg-black/[0.03] px-2 py-0.5 rounded-full">{b.count} {b.count === 1 ? "unit" : "units"}</span>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Cooperative Societies */}
                <div>
                  <h3 className="font-display text-sm uppercase tracking-wider text-black/45 font-bold mb-4">Cooperative Housing Societies ({builders.filter(b => b.isCoop).length})</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {builders.filter(b => b.isCoop).map((b) => (
                      <Link
                        key={b.slug}
                        href={`/properties/builders/${b.slug}`}
                        className="flex items-center justify-between p-4 rounded-2xl bg-blue-50/20 border border-blue-500/10 hover:border-blue-500/30 hover:bg-white hover:shadow-sm transition-all"
                      >
                        <span className="font-display text-sm font-medium text-charcoal">{b.name}</span>
                        <span className="font-body text-[10px] uppercase font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">Society</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Section 2: Sector Intelligence Directories */}
            <section className="bg-white border border-black/5 rounded-[32px] p-8 md:p-10 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold">
                  <Navigation size={20} />
                </div>
                <div>
                  <h2 className="font-display text-2xl font-semibold text-charcoal">Sector Intelligence Directories</h2>
                  <p className="font-body text-xs text-black/45 mt-0.5">Micro-market reports, pricing charts, and RERA reviews</p>
                </div>
              </div>

              {sectors.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {sectors.map((sec) => (
                    <Link
                      key={sec.slug}
                      href={`/properties/flats/${sec.slug}`}
                      className="flex items-center justify-between p-4 rounded-2xl bg-black/[0.01] border border-black/5 hover:border-black/15 hover:bg-white hover:shadow-sm transition-all"
                    >
                      <span className="font-display text-sm font-medium text-charcoal">{sec.name}</span>
                      <span className="font-body text-[10px] uppercase font-bold text-gold bg-gold/5 border border-gold/15 px-2 py-0.5 rounded-full">Explore</span>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-black/45 text-sm font-body italic">No sector directories are currently configured in database.</p>
              )}
            </section>

            {/* Section 3: Active Property Briefs */}
            <section className="bg-white border border-black/5 rounded-[32px] p-8 md:p-10 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold">
                  <Compass size={20} />
                </div>
                <div>
                  <h2 className="font-display text-2xl font-semibold text-charcoal">Active Property Briefs</h2>
                  <p className="font-body text-xs text-black/45 mt-0.5">Verified residential apartments and independent houses</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {listings.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/properties/${item.segment}/${item.slug}`}
                    className="flex flex-col p-4 rounded-2xl bg-black/[0.01] border border-black/5 hover:border-black/15 hover:bg-white hover:shadow-sm transition-all"
                  >
                    <span className="font-display text-sm font-medium text-charcoal line-clamp-1">{item.title}</span>
                    <span className="font-body text-[10px] uppercase font-bold text-black/35 mt-1">{item.type}</span>
                  </Link>
                ))}
              </div>
            </section>

            {/* Section 4: Market Insights & Legal Guides */}
            <section className="bg-white border border-black/5 rounded-[32px] p-8 md:p-10 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold">
                  <BookOpen size={20} />
                </div>
                <div>
                  <h2 className="font-display text-2xl font-semibold text-charcoal">Market Insights & Legal Guides</h2>
                  <p className="font-body text-xs text-black/45 mt-0.5">Topical analysis on RERA rules, loading factors, and registry laws</p>
                </div>
              </div>

              <div className="space-y-4">
                {posts.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="flex flex-col md:flex-row md:items-center justify-between p-5 rounded-2xl bg-black/[0.01] border border-black/5 hover:border-black/15 hover:bg-white hover:shadow-sm transition-all gap-2"
                  >
                    <div>
                      <span className="font-display text-sm font-medium text-charcoal block">{post.title}</span>
                      <span className="font-body text-[10px] text-black/40 mt-1 block">Slug: /blog/{post.slug}</span>
                    </div>
                    <span className="font-body text-[10px] uppercase font-bold text-black/45 bg-black/[0.04] px-3 py-1 rounded-full shrink-0 self-start md:self-auto">{post.category}</span>
                  </Link>
                ))}
              </div>
            </section>

          </div>

          {/* Right Column: Static Hubs & Tools Index */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* Main Directories Hub */}
            <div className="bg-charcoal text-white rounded-[32px] p-8 border border-white/5">
              <h3 className="font-display text-xl font-medium mb-6">Main Portal Hubs</h3>
              <ul className="space-y-4">
                <li>
                  <Link href="/" className="flex items-center justify-between font-body text-sm text-white/70 hover:text-white transition-colors">
                    <span>Home Page</span>
                    <span>/</span>
                  </Link>
                </li>
                <li>
                  <Link href="/properties" className="flex items-center justify-between font-body text-sm text-white/70 hover:text-white transition-colors">
                    <span>Properties Hub</span>
                    <span>/properties</span>
                  </Link>
                </li>
                <li>
                  <Link href="/properties/flats" className="flex items-center justify-between font-body text-sm text-white/70 hover:text-white transition-colors">
                    <span>Flats Directory</span>
                    <span>/properties/flats</span>
                  </Link>
                </li>
                <li>
                  <Link href="/properties/houses" className="flex items-center justify-between font-body text-sm text-white/70 hover:text-white transition-colors">
                    <span>Houses Directory</span>
                    <span>/properties/houses</span>
                  </Link>
                </li>
                <li>
                  <Link href="/properties/lands" className="flex items-center justify-between font-body text-sm text-white/70 hover:text-white transition-colors">
                    <span>Lands Directory</span>
                    <span>/properties/lands</span>
                  </Link>
                </li>
                <li>
                  <Link href="/properties/builders" className="flex items-center justify-between font-body text-sm text-white/70 hover:text-white transition-colors">
                    <span>Builders Index</span>
                    <span>/properties/builders</span>
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="flex items-center justify-between font-body text-sm text-white/70 hover:text-white transition-colors">
                    <span>Market Insights Hub</span>
                    <span>/blog</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Calculations & Tools Hub */}
            <div className="bg-white border border-black/5 rounded-[32px] p-8 shadow-sm">
              <h3 className="font-display text-xl font-medium text-charcoal mb-6">Calculators & Tools</h3>
              <ul className="space-y-4">
                <li>
                  <Link href="/tools" className="flex items-center justify-between font-body text-sm text-black/50 hover:text-charcoal transition-colors">
                    <span>Tools Hub</span>
                    <span>/tools</span>
                  </Link>
                </li>
                <li>
                  <Link href="/tools/mortgage-calculator" className="flex items-center justify-between font-body text-sm text-black/50 hover:text-charcoal transition-colors">
                    <span>EMI Calculator</span>
                    <span>/tools/mortgage-calculator</span>
                  </Link>
                </li>
                <li>
                  <Link href="/tools/loan-eligibility" className="flex items-center justify-between font-body text-sm text-black/50 hover:text-charcoal transition-colors">
                    <span>Loan Eligibility</span>
                    <span>/tools/loan-eligibility</span>
                  </Link>
                </li>
                <li>
                  <Link href="/tools/price-trend" className="flex items-center justify-between font-body text-sm text-black/50 hover:text-charcoal transition-colors">
                    <span>Price Trends</span>
                    <span>/tools/price-trend</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Info Pages Index */}
            <div className="bg-white border border-black/5 rounded-[32px] p-8 shadow-sm">
              <h3 className="font-display text-xl font-medium text-charcoal mb-6">Company Information</h3>
              <ul className="space-y-4">
                <li>
                  <Link href="/about" className="flex items-center justify-between font-body text-sm text-black/50 hover:text-charcoal transition-colors">
                    <span>About Us</span>
                    <span>/about</span>
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="flex items-center justify-between font-body text-sm text-black/50 hover:text-charcoal transition-colors">
                    <span>Contact Us</span>
                    <span>/contact</span>
                  </Link>
                </li>
                <li>
                  <Link href="/appointments" className="flex items-center justify-between font-body text-sm text-black/50 hover:text-charcoal transition-colors">
                    <span>Book Strategy Call</span>
                    <span>/appointments</span>
                  </Link>
                </li>
                <li>
                  <Link href="/list-your-property" className="flex items-center justify-between font-body text-sm text-black/50 hover:text-charcoal transition-colors">
                    <span>List Your Property</span>
                    <span>/list-your-property</span>
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="flex items-center justify-between font-body text-sm text-black/50 hover:text-charcoal transition-colors">
                    <span>Full FAQ Database</span>
                    <span>/faq</span>
                  </Link>
                </li>
              </ul>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
