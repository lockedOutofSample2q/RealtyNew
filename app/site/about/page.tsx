// app/site/about/page.tsx  →  /about
import type { Metadata } from "next";
import Link from "next/link";
import { aboutSnippet, siteConfig, services } from "@/config/site";
import { Building2, Key, Palette, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "About",
  description: "Ten years of honest real estate advice in Dubai. Learn about the Monter story, our values, and the team behind every deal.",
};

const ICONS: Record<string, React.ReactNode> = {
  building: <Building2 size={22} strokeWidth={1.2} />,
  key: <Key size={22} strokeWidth={1.2} />,
  palette: <Palette size={22} strokeWidth={1.2} />,
  sparkles: <Sparkles size={22} strokeWidth={1.2} />,
};

const VALUES = [
  {
    title: "Honesty above commissions",
    body: "If a property isn't right for you, we'll say so — even if it costs us the deal. Our business is repeat clients and referrals. That only works with straight talk.",
  },
  {
    title: "Precision over volume",
    body: "We don't list 2,000 properties and hope one sticks. We curate. Every listing on Monter has been assessed for genuine investment merit.",
  },
  {
    title: "Advice, not sales",
    body: "There's a difference between an agent who wants to close and an advisor who wants you to win. We operate as the latter. Every time.",
  },
  {
    title: "No bad-faith dealings",
    body: "No manufactured urgency. No inflated valuations. No kickbacks from developers that compromise our recommendations. This is non-negotiable.",
  },
];

export default function AboutPage() {
  return (
    <div className="pt-[var(--nav-height)] min-h-screen bg-[#0D0D0D]">
      {/* Hero */}
      <section className="section-padding border-b border-[rgba(201,168,76,0.08)]">
        <div className="container-site max-w-4xl">
          <span className="font-body text-xs tracking-widest uppercase text-[var(--gold)] mb-5 block">
            Our Story
          </span>
          <h1 className="font-display font-light text-white mb-6 leading-tight">
            Built on one principle:<br />
            <em className="text-[var(--gold-light)]">you deserve straight answers.</em>
          </h1>
          <p className="font-body text-white/60 text-lg leading-relaxed max-w-2xl">
            Monter was founded in Dubai in 2014 by a team that had seen enough of the other kind of agency —
            the kind that inflates valuations to win listings, recommends projects they're being paid to push,
            and disappears after the sale.
          </p>
          <p className="font-body text-white/50 text-base leading-relaxed max-w-2xl mt-4">
            We built the firm we wished existed. Ten years later, most of our business comes from referrals.
            That's the only metric we track.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 border-b border-[rgba(201,168,76,0.08)]">
        <div className="container-site grid grid-cols-2 lg:grid-cols-4 gap-px bg-[rgba(201,168,76,0.06)]">
          {aboutSnippet.stats.map((stat) => (
            <div key={stat.label} className="bg-[#0D0D0D] p-8 text-center">
              <div className="font-display text-4xl text-[var(--gold)] font-light mb-2">{stat.value}</div>
              <div className="font-body text-xs text-white/40 uppercase tracking-wide">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="section-padding border-b border-[rgba(201,168,76,0.08)]">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <span className="font-body text-xs tracking-widest uppercase text-[var(--gold)] mb-5 block">
                What We Stand For
              </span>
              <h2 className="font-display font-light text-white">
                The way we work
              </h2>
            </div>
            <div className="space-y-8">
              {VALUES.map((v) => (
                <div key={v.title} className="border-l border-[var(--gold)] pl-6">
                  <h3 className="font-display text-xl text-white font-light mb-2">{v.title}</h3>
                  <p className="font-body text-sm text-white/55 leading-relaxed">{v.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section-padding border-b border-[rgba(201,168,76,0.08)]">
        <div className="container-site">
          <div className="text-center mb-12">
            <span className="font-body text-xs tracking-widest uppercase text-[var(--gold)] mb-4 block">
              What We Do
            </span>
            <h2 className="font-display font-light text-white">Our Services</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[rgba(201,168,76,0.06)]">
            {services.map((s) => (
              <div key={s.title} className="bg-[#0D0D0D] p-8 hover:bg-[#141414] transition-colors">
                <div className="text-[var(--gold)] mb-5">{ICONS[s.icon]}</div>
                <h3 className="font-display text-lg text-white font-light mb-2">{s.title}</h3>
                <p className="font-body text-xs text-white/50 leading-relaxed">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="container-site text-center">
          <h2 className="font-display font-light text-white mb-4">
            Ready to work together?
          </h2>
          <p className="font-body text-white/50 mb-8 max-w-md mx-auto">
            A 15-minute call is all it takes to know if we're the right fit.
            No pressure, no pitch — just a direct conversation about your situation.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 px-10 py-4 bg-[var(--gold)] text-black font-body font-medium text-sm tracking-wide hover:bg-[var(--gold-light)] transition-colors"
          >
            Book a Free Consultation
          </Link>
        </div>
      </section>
    </div>
  );
}
