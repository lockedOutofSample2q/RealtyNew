// components/layout/Footer.tsx
// ============================================================
// FOOTER
// EDIT: Links and content in config/site.ts
// ============================================================

import Link from "next/link";
import { Instagram, Facebook, Linkedin, Youtube, Mail, Phone, MapPin } from "lucide-react";
import { siteConfig, footerLinks } from "@/config/site";

export default function Footer() {
  const year = new Date().getFullYear();
  const hasSocial = Object.values(siteConfig.social).some(Boolean);

  return (
    <footer className="bg-[#080808] border-t border-[rgba(201,168,76,0.1)]">
      {/* ── Newsletter Banner ────────────────────────────── */}
      <div className="border-b border-[rgba(201,168,76,0.08)]">
        <div className="container-site py-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-display text-2xl text-white font-light">
              Stay ahead of Dubai's market.
            </h3>
            <p className="font-body text-sm text-white/50 mt-1">
              Monthly insights. No spam. Unsubscribe anytime.
            </p>
          </div>
          <form
            action="/api/subscribe"
            method="POST"
            className="flex gap-0 w-full max-w-sm"
          >
            <input
              type="email"
              name="email"
              placeholder="your@email.com"
              required
              className="flex-1 bg-[#141414] border border-[rgba(201,168,76,0.2)] border-r-0 px-4 py-3 text-sm font-body text-white placeholder:text-white/30 outline-none focus:border-[var(--gold)] transition-colors"
            />
            <button
              type="submit"
              className="px-5 py-3 bg-[var(--gold)] text-black text-sm font-body font-medium tracking-wide hover:bg-[var(--gold-light)] transition-colors whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* ── Main Footer Grid ─────────────────────────────── */}
      <div className="container-site py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="lg:col-span-1">
          <Link href="/" className="inline-block mb-5">
            <span className="font-display text-2xl font-light tracking-widest text-white lowercase">
              mont
            </span>
            <span className="font-display text-2xl font-light tracking-widest text-[var(--gold)] lowercase">
              er
            </span>
          </Link>
          <p className="font-body text-sm text-white/50 leading-relaxed mb-6 max-w-[220px]">
            Dubai's trusted real estate consultancy since 2014.
          </p>

          {/* Social Icons */}
          {hasSocial && (
            <div className="flex items-center gap-4">
              {siteConfig.social.instagram && (
                <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-[var(--gold)] transition-colors">
                  <Instagram size={18} />
                </a>
              )}
              {siteConfig.social.facebook && (
                <a href={siteConfig.social.facebook} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-[var(--gold)] transition-colors">
                  <Facebook size={18} />
                </a>
              )}
              {siteConfig.social.linkedin && (
                <a href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-[var(--gold)] transition-colors">
                  <Linkedin size={18} />
                </a>
              )}
              {siteConfig.social.youtube && (
                <a href={siteConfig.social.youtube} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-[var(--gold)] transition-colors">
                  <Youtube size={18} />
                </a>
              )}
            </div>
          )}
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-body text-xs tracking-widest uppercase text-[var(--gold)] mb-5">
            Explore
          </h4>
          <ul className="space-y-3">
            {footerLinks.quick.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="font-body text-sm text-white/50 hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-body text-xs tracking-widest uppercase text-[var(--gold)] mb-5">
            Contact
          </h4>
          <ul className="space-y-4">
            <li>
              <a
                href={`tel:${siteConfig.contact.phone}`}
                className="flex items-start gap-3 font-body text-sm text-white/50 hover:text-white transition-colors"
              >
                <Phone size={14} className="mt-0.5 shrink-0 text-[var(--gold)]" />
                {siteConfig.contact.phone}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="flex items-start gap-3 font-body text-sm text-white/50 hover:text-white transition-colors"
              >
                <Mail size={14} className="mt-0.5 shrink-0 text-[var(--gold)]" />
                {siteConfig.contact.email}
              </a>
            </li>
            <li className="flex items-start gap-3 font-body text-sm text-white/50">
              <MapPin size={14} className="mt-0.5 shrink-0 text-[var(--gold)]" />
              {siteConfig.contact.address}
            </li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h4 className="font-body text-xs tracking-widest uppercase text-[var(--gold)] mb-5">
            Legal
          </h4>
          <ul className="space-y-3">
            {footerLinks.legal.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="font-body text-sm text-white/50 hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ── Bottom Bar ───────────────────────────────────── */}
      <div className="border-t border-[rgba(255,255,255,0.04)]">
        <div className="container-site py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-body text-xs text-white/30">
            © {year} {siteConfig.name}. All rights reserved.
          </p>
          <p className="font-body text-xs text-white/20">
            RERA Licensed — Dubai Land Department
          </p>
        </div>
      </div>
    </footer>
  );
}
