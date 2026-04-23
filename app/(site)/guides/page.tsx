import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, FileText, ShieldCheck, Map } from "lucide-react";

export const metadata: Metadata = {
  title: "Real Estate Guides Mohali | Realty Holding & Management Consultants",
  description: "Comprehensive guides for real estate investment in Mohali. Learn about property documents, market cycles, and RERA compliance.",
};

const guides = [
  {
    title: "Property Document Verification",
    description: "A complete checklist of documents you must verify before buying any property in Punjab.",
    href: "/guides/property-documents",
    icon: FileText,
  },
  {
    title: "Understanding RERA Punjab",
    description: "How to use the RERA portal to verify developer claims and project timelines.",
    href: "/blog",
    icon: ShieldCheck,
  },
  {
    title: "Mohali Market Cycle 2026",
    description: "In-depth analysis of current supply vs demand in residential and commercial sectors.",
    href: "/blog",
    icon: BookOpen,
  },
  {
    title: "GMADA Allotment Guide",
    description: "Everything you need to know about GMADA plot auctions and allotment processes.",
    href: "/blog",
    icon: Map,
  },
];

export default function GuidesPage() {
  return (
    <div className="pt-[var(--nav-height)] min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-charcoal py-24 text-white">
        <div className="container-site">
          <h1 className="text-5xl md:text-7xl font-display font-semibold mb-6">Investment Guides</h1>
          <p className="text-xl text-white/60 max-w-2xl">
            Empowering investors with deep local knowledge and transparent data.
          </p>
        </div>
      </div>

      {/* Guides List */}
      <div className="container-site py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {guides.map((guide) => (
            <Link
              key={guide.title}
              href={guide.href}
              className="group block"
            >
              <div className="aspect-[16/9] rounded-[32px] bg-black/5 overflow-hidden mb-8 relative">
                 <div className="absolute inset-0 flex items-center justify-center text-black/10 group-hover:text-black/20 transition-colors">
                    <guide.icon size={120} strokeWidth={1} />
                 </div>
              </div>
              <h2 className="text-3xl font-display font-medium mb-4 group-hover:underline">{guide.title}</h2>
              <p className="text-lg text-black/60 leading-relaxed max-w-md">
                {guide.description}
              </p>
            </Link>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-black text-white py-24">
        <div className="container-site flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="max-w-xl">
            <h2 className="text-3xl md:text-5xl font-display font-medium mb-6">Want a customized strategy?</h2>
            <p className="text-xl text-white/60">
              Our guides provide the foundation. Our consultations provide the specific roadmap for your portfolio.
            </p>
          </div>
          <Link
            href="/contact"
            className="bg-white text-charcoal px-12 py-5 rounded-full font-body font-bold uppercase tracking-widest text-sm hover:bg-white/90 transition-colors shrink-0"
          >
            Book a Strategy Call
          </Link>
        </div>
      </div>
    </div>
  );
}
