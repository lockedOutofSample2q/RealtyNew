// components/layout/Footer.tsx
import Link from "next/link";
import { Instagram, Facebook, Linkedin, Youtube, Mail, Phone, MapPin } from "lucide-react";
import { siteConfig, footerLinks } from "@/config/site";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function Footer() {
  const year = new Date().getFullYear();
  const hasSocial = Object.values(siteConfig.social).some(Boolean);

  return (
    <footer className="bg-charcoal text-white border-t border-white/10">
      {/* -- Newsletter Banner --------------------------------- */}
      <div className="border-b border-white/10">
        <div className="container-site py-16 flex flex-col md:flex-row items-start justify-between gap-10">
          <div className="max-w-sm">
            <h3 className="font-display text-3xl font-medium leading-tight mb-3">
              {siteConfig.tagline}
            </h3>
            <p className="font-body text-sm text-white/60 mt-1 leading-relaxed">
              Stay informed about the latest outcomes in {siteConfig.contact.address.split(',').slice(-2, -1)[0]?.trim() || ''}. Subscribe to our newsletter for exclusive insights.
            </p>
          </div>
          <form
            action="/api/subscribe"
            method="POST"
            className="flex flex-col sm:flex-row gap-4 w-full max-w-md mt-2"
          >
            <Input
              type="email"
              name="email"
              placeholder="Enter your email address"
              required
              className="flex-1 bg-transparent border-white/20 text-white placeholder:text-white/40 focus-visible:border-white h-12"
            />
            <Button
              type="submit"
              variant="secondary"
              className="bg-white text-charcoal border-white hover:bg-white/90 h-12 px-6"
            >
              Subscribe
            </Button>
          </form>
        </div>
      </div>

      {/* -- Main Footer Grid ------------------------------- */}
      <div className="container-site py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Brand */}
        <div className="lg:col-span-1">
          <Link href="/" className="inline-block mb-6">
            <div className="relative h-28 sm:h-36 w-auto">
              <img src="/assets/logo-light-theme.svg" alt={siteConfig.name} className="h-full w-auto object-contain" />
            </div>
          </Link>
          <p className="font-body text-sm text-white/50 leading-relaxed mb-6 max-w-[220px]">
            {siteConfig.description}
          </p>

          {/* Social Icons */}
          {hasSocial && (
            <div className="flex items-center gap-4">
              {siteConfig.social.instagram && (
                <a 
                  href={siteConfig.social.instagram} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label="Follow us on Instagram"
                  className="text-white/40 hover:text-white transition-colors"
                >
                  <Instagram size={20} />
                </a>
              )}
              {siteConfig.social.facebook && (
                <a 
                  href={siteConfig.social.facebook} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label="Follow us on Facebook"
                  className="text-white/40 hover:text-white transition-colors"
                >
                  <Facebook size={20} />
                </a>
              )}
              {siteConfig.social.linkedin && (
                <a 
                  href={siteConfig.social.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label="Follow us on LinkedIn"
                  className="text-white/40 hover:text-white transition-colors"
                >
                  <Linkedin size={20} />
                </a>
              )}
              {siteConfig.social.youtube && (
                <a 
                  href={siteConfig.social.youtube} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label="Subscribe to our YouTube channel"
                  className="text-white/40 hover:text-white transition-colors"
                >
                  <Youtube size={20} />
                </a>
              )}
            </div>
          )}
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-body text-xs tracking-widest uppercase text-white/80 mb-6">
            Explore
          </h4>
          <ul className="space-y-4">
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

        {/* Tools */}
        <div>
          <h4 className="font-body text-xs tracking-widest uppercase text-white/80 mb-6">
            Free Tools
          </h4>
          <ul className="space-y-4">
            {footerLinks.tools.map((link) => (
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
          <h4 className="font-body text-xs tracking-widest uppercase text-white/80 mb-6">
            Contact
          </h4>
          <ul className="space-y-4">
            <li>
              <a
                href={`tel:${siteConfig.contact.phone}`}
                className="flex items-start gap-3 font-body text-sm text-white/50 hover:text-white transition-colors"
              >
                <Phone size={16} className="mt-0.5 shrink-0 text-white/80" />
                {siteConfig.contact.phone}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="flex items-start gap-3 font-body text-sm text-white/50 hover:text-white transition-colors"
              >
                <Mail size={16} className="mt-0.5 shrink-0 text-white/80" />
                {siteConfig.contact.email}
              </a>
            </li>
            <li className="flex items-start gap-3 font-body text-sm text-white/50">
              <MapPin size={16} className="mt-0.5 shrink-0 text-white/80" />
              <a href={siteConfig.contact.mapUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors leading-relaxed">
                {siteConfig.contact.address}
              </a>
            </li>
            <li>
              <Link href="/faq" className="font-body text-sm text-white/50 hover:text-white transition-colors">
                FAQ
              </Link>
            </li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h4 className="font-body text-xs tracking-widest uppercase text-white/80 mb-6">
            Legal
          </h4>
          <ul className="space-y-4">
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

      {/* -- Bottom Bar ------------------------------------- */}
      <div className="border-t border-white/10">
        <div className="container-site py-6 flex flex-col sm:flex-row items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-1.5 opacity-60 hover:opacity-100 transition-opacity">
              <span className="font-display text-sm text-white uppercase tracking-widest">
                {siteConfig.name}
              </span>
            </Link>
          </div>
          <span className="font-body text-xs text-white/40">� {year} {siteConfig.name}. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}

