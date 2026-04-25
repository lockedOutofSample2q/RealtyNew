import type { Metadata } from "next";
import Link from "next/link";
import { Calculator, TrendingUp, UserCheck, Map } from "lucide-react";

export const metadata: Metadata = {
  title: "Free Real Estate Tools | Realty Holding & Management Consultants",
  description: "Suite of free tools for real estate buyers in Mohali: EMI calculator, price trends, and loan eligibility checker.",
};

const tools = [
  {
    title: "EMI / Home Loan Calculator",
    description: "Plan your investment with our easy-to-use mortgage calculator.",
    href: "/mortgage-calculator",
    icon: Calculator,
  },
  {
    title: "Price Trends Mohali",
    description: "Analyze sector-wise price growth and market demand in Mohali.",
    href: "/tools/price-trend",
    icon: TrendingUp,
  },
  {
    title: "Loan Eligibility Checker",
    description: "Check your home loan eligibility instantly based on your income.",
    href: "/tools/loan-eligibility",
    icon: UserCheck,
  },
  {
    title: "Sector Maps",
    description: "Detailed maps of Mohali sectors and upcoming infrastructure.",
    href: "/properties",
    icon: Map,
  },
];

export default function ToolsPage() {
  return (
    <div className="pt-[var(--nav-height)] min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-white py-24 text-black border-b border-black/10">
        <div className="container-site text-center">
          <h1 className="text-5xl md:text-7xl font-display font-semibold mb-6">Free Tools</h1>
          <p className="text-xl text-black/60 max-w-2xl mx-auto">
            Easy-to-use tools for real estate buyers, investors, and homeowners in Mohali.
          </p>
        </div>
      </div>

      {/* Tools Grid */}
      <div className="container-site py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {tools.map((tool) => (
            <Link
              key={tool.title}
              href={tool.href}
              className="group border border-black/10 rounded-[32px] p-10 hover:border-black transition-all flex flex-col justify-between aspect-[4/3] md:aspect-square"
            >
              <div>
                <div className="w-16 h-16 rounded-2xl bg-black/5 flex items-center justify-center mb-8 group-hover:bg-charcoal group-hover:text-white transition-colors">
                  <tool.icon size={32} />
                </div>
                <h2 className="text-3xl font-display font-medium mb-4">{tool.title}</h2>
                <p className="text-lg text-black/60 leading-relaxed">
                  {tool.description}
                </p>
              </div>
              <div className="flex items-center gap-2 font-body font-bold uppercase tracking-widest text-xs mt-8">
                Explore Tool
                <span className="w-8 h-[1px] bg-black/20 group-hover:w-12 group-hover:bg-charcoal transition-all" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-black/5 py-24 text-center">
        <div className="container-site">
          <h2 className="text-3xl md:text-5xl font-display font-medium mb-8 text-charcoal">Need personalized advice?</h2>
          <p className="text-xl text-black/60 mb-12 max-w-xl mx-auto">
            Our advisors can provide custom investment analysis based on your financial goals.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-charcoal text-white px-12 py-5 rounded-full font-body font-bold uppercase tracking-widest text-sm hover:bg-black transition-colors"
          >
            Talk to an Advisor
          </Link>
        </div>
      </div>
    </div>
  );
}
