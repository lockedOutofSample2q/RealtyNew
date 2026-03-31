// components/sections/AboutSection.tsx
import { aboutSnippet } from "@/config/site";
import Link from "next/link";

export default function AboutSection() {
  return (
    <section className="section-padding bg-[#0D0D0D] relative overflow-hidden">
      {/* Gold accent line */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[var(--gold)] to-transparent opacity-30" />

      <div className="container-site grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Text */}
        <div>
          <span className="font-body text-xs tracking-widest uppercase text-[var(--gold)] mb-5 block">
            About Monter
          </span>
          <h2 className="font-display font-light text-white mb-6">
            {aboutSnippet.headline.split("\n").map((line, i) => (
              <span key={i} className="block">{line}</span>
            ))}
          </h2>
          <p className="font-body text-white/60 leading-relaxed mb-8 max-w-md">
            {aboutSnippet.body}
          </p>
          <Link
            href="/about"
            className="inline-flex items-center gap-3 font-body text-sm text-[var(--gold)] border-b border-[var(--gold-dark)] pb-1 hover:text-[var(--gold-light)] transition-colors"
          >
            Our Story →
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-6">
          {aboutSnippet.stats.map((stat) => (
            <div
              key={stat.label}
              className="border border-[rgba(201,168,76,0.12)] p-6 hover:border-[rgba(201,168,76,0.3)] transition-colors"
            >
              <div className="font-display text-4xl text-[var(--gold)] font-light mb-2">
                {stat.value}
              </div>
              <div className="font-body text-sm text-white/50 tracking-wide">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
