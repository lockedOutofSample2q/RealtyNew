// components/sections/CtaSection.tsx
import Link from "next/link";
import { siteConfig } from "@/config/site";

export default function CtaSection() {
  return (
    <section className="py-24 bg-[var(--gold)] relative overflow-hidden">
      {/* Texture overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 10px,
            rgba(0,0,0,0.3) 10px,
            rgba(0,0,0,0.3) 11px
          )`,
        }}
      />
      <div className="container-site relative z-10 text-center">
        <h2 className="font-display text-4xl md:text-5xl text-black font-light mb-5">
          Ready to find your<br />dream property?
        </h2>
        <p className="font-body text-black/70 text-lg mb-10 max-w-lg mx-auto">
          Talk to an advisor today. No sales pitch — just straight answers about where Dubai's best opportunities are right now.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/contact"
            className="px-10 py-4 bg-black text-white font-body font-medium text-sm tracking-wide hover:bg-[#1a1a1a] transition-colors"
          >
            Book a Free Consultation
          </Link>
          <a
            href={`https://wa.me/${siteConfig.contact.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-10 py-4 border-2 border-black text-black font-body font-medium text-sm tracking-wide hover:bg-black/10 transition-colors"
          >
            WhatsApp Us Directly
          </a>
        </div>
      </div>
    </section>
  );
}
