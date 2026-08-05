import type { Metadata } from "next";
import Link from "next/link";
import { Calculator, TrendingUp, UserCheck, Map, CheckSquare } from "lucide-react";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Real Estate Tools",
  description: "Suite of free tools for real estate buyers in Mohali: property document checklist, EMI calculator, price trends, and loan eligibility checker.",
};

const tools = [
  {
    title: "Punjab Land Area Calculator",
    description: "Convert marla, kanal, bigha, gaj, killa, and acre across all six Punjab revenue systems.",
    href: "/tools/area-calculator",
    icon: Calculator,
  },
  {
    title: "Property Document Verification Checklist",
    description: "Verify all 25 property documents step-by-step before buying in India & Punjab.",
    href: "/tools/property-document-checklist",
    icon: CheckSquare,
  },
  {
    title: "EMI / Home Loan Calculator",
    description: "Plan your investment with our easy-to-use mortgage calculator.",
    href: "/tools/mortgage-calculator",
    icon: Calculator,
  },
  {
    title: "Loan Eligibility Checker",
    description: "Check your home loan eligibility instantly based on your income.",
    href: "/tools/loan-eligibility",
    icon: UserCheck,
  },
];

export default function ToolsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${siteConfig.url}/tools#webpage`,
        "url": `${siteConfig.url}/tools`,
        "name": "Free Real Estate Tools | Realty Holding and Management Consultants",
        "description": "Suite of free tools for real estate buyers in Mohali: EMI calculator, price trends, and loan eligibility checker.",
        "isPartOf": {
          "@id": `${siteConfig.url}/#website`
        },
        "about": {
          "@type": "ItemList",
          "itemListElement": tools
            .filter(tool => tool.href.startsWith('/tools/'))
            .map((tool, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "url": `${siteConfig.url}${tool.href}`,
              "name": tool.title
            }))
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${siteConfig.url}/tools#breadcrumb`,
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
            "name": "Tools",
            "item": `${siteConfig.url}/tools`
          }
        ]
      }
    ]
  };

  return (
    <div className="pt-[var(--nav-height)] min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Hero */}
      <div className="bg-white py-10 sm:py-14 text-charcoal border-b border-black/10">
        <div className="container-site text-center max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-semibold text-charcoal mb-4 tracking-tight">Real Estate Tools</h1>
          <p className="text-base sm:text-lg text-charcoal/70 max-w-xl mx-auto font-body">
            Free, ungated calculators and verification tools for property buyers, investors, and owners in Mohali &amp; Punjab.
          </p>
        </div>
      </div>

      {/* Tools Grid */}
      <div className="container-site py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tools.map((tool) => (
            <Link
              key={tool.title}
              href={tool.href}
              className="group border border-black/10 rounded-2xl p-6 bg-white hover:border-gold/50 hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-black/5 flex items-center justify-center mb-5 group-hover:bg-charcoal group-hover:text-gold transition-colors text-charcoal">
                  <tool.icon size={22} />
                </div>
                <h2 className="text-xl font-display font-semibold text-charcoal mb-2 leading-snug group-hover:text-gold transition-colors">
                  {tool.title}
                </h2>
                <p className="text-xs sm:text-sm text-charcoal/70 leading-relaxed font-body">
                  {tool.description}
                </p>
              </div>
              <div className="flex items-center gap-2 font-display font-bold uppercase tracking-wider text-xs text-gold mt-6 pt-4 border-t border-black/5">
                <span>Explore Tool</span>
                <span className="w-5 h-[1.5px] bg-gold group-hover:w-8 transition-all" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-black/[0.02] py-14 border-t border-black/10 text-center">
        <div className="container-site max-w-2xl mx-auto space-y-4">
          <h2 className="text-2xl md:text-3xl font-display font-semibold text-charcoal">Need personalized advisory on your property file?</h2>
          <p className="text-base text-charcoal/70 font-body">
            Our principal advisory team in Phase 8A, Mohali provides direct title reviews, GMADA verification, and legal due diligence before you pay token money.
          </p>
          <div className="pt-2">
            <Link
              href="/contact"
              className="inline-block bg-charcoal text-white px-8 py-3.5 rounded-xl font-display text-xs font-bold uppercase tracking-widest hover:bg-gold hover:text-charcoal transition-all shadow-md"
            >
              Talk to an Advisor &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
