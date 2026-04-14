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
    <footer className="bg-[#080808] border-t border-white/5">
      {/* ── Newsletter Banner ───────────────────────────────── */}
      <div className="border-b border-white/[0.06]">
        <div className="container-site py-16 flex flex-col md:flex-row items-start justify-between gap-10">
          <div className="max-w-sm">
            <h3 className="font-display text-3xl text-white font-medium leading-tight mb-3">
              {siteConfig.tagline}
            </h3>
            <p className="font-body text-sm text-white/50 mt-1 leading-relaxed">
              Stay informed about the latest outcomes in {siteConfig.contact.address.split(',').slice(-2, -1)[0].trim()}. Subscribe to our newsletter for exclusive insights.
            </p>
          </div>
          <form
            action="/api/subscribe"
            method="POST"
            className="flex gap-3 w-full max-w-md mt-2"
          >
            <input
              type="email"
              name="email"
              placeholder="Enter your email address"
              required
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-sm font-body text-white placeholder:text-white/30 outline-none focus:border-white/30 transition-colors"
            />
            <button
              type="submit"
              className="px-6 py-3.5 bg-white text-black text-sm font-body font-semibold rounded-xl hover:bg-gray-100 transition-colors whitespace-nowrap flex items-center gap-2"
            >
              Subscribe →
            </button>
          </form>
        </div>
      </div>

      {/* ── Main Footer Grid ─────────────────────────────── */}
      <div className="container-site py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="lg:col-span-1">
          <Link href="/" className="inline-block mb-5">
            <div className="flex flex-col leading-none font-display">
              <span className="text-xl font-bold tracking-tighter uppercase text-white">
                {siteConfig.name.split(' ')[0]}<span className="opacity-50 font-medium">{siteConfig.name.split(' ').slice(1).join(' ')}</span>
              </span>
              <span className="text-[8px] tracking-[0.4em] font-medium opacity-70 uppercase mt-1 text-white">
                {siteConfig.tagline}
              </span>
            </div>
          </Link>
          <p className="font-body text-sm text-white/50 leading-relaxed mb-6 max-w-[220px]">
            {siteConfig.description}
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
              <a href={siteConfig.contact.mapUrl} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--gold)] transition-colors">
                {siteConfig.contact.address}
              </a>
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
      <div className="border-t border-white/[0.05]">
        <div className="container-site py-5 flex flex-col sm:flex-row items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-1.5 opacity-70 hover:opacity-100 transition-opacity">
              <span className="font-display text-sm font-light text-white lowercase tracking-wider">
                {siteConfig.name.split(' ').map(w => w[0]).join('').toLowerCase()} | {siteConfig.name.split(' ')[0].toLowerCase()}
              </span>
            </Link>
            <span className="font-body text-xs text-white/30">© {year} {siteConfig.name}. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-4 flex-wrap">
            {footerLinks.legal.map((l) => (
              <Link key={l.href} href={l.href} className="font-body text-[11px] text-white/25 hover:text-white/60 transition-colors">
                {l.label}
              </Link>
            ))}
            <Link href="/sitemap.xml" className="font-body text-[11px] text-white/25 hover:text-white/60 transition-colors">
              Sitemap
            </Link>
            <Link href="/admin" className="font-body text-[11px] text-white/25 hover:text-white/60 transition-colors">
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
