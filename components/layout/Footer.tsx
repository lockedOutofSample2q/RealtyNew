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

      {/* -- Main Footer Grid (Links & Brand) ------------------------------- */}
      <div className="container-site py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Brand */}
        <div className="lg:col-span-1">
          <Link href="/" className="inline-block mb-6">
            <div className="relative h-28 sm:h-36 w-auto">
              <img src="/assets/logo-dark-theme.svg" alt={siteConfig.name} className="h-full w-auto object-contain" />
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

        {/* Legal Links (Moved Up) */}
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
      </div>

      {/* -- Centered Map & Contact Section ---------------------------- */}
      <div className="border-t border-white/10 bg-white/[0.02]">
        <div className="container-site py-20 flex flex-col items-center text-center">
          <div className="max-w-2xl w-full">
            <h4 className="font-display text-3xl font-medium mb-10">Visit Our Office</h4>
            
            {/* Map Container */}
            <div className="w-full aspect-[21/9] rounded-[32px] overflow-hidden border border-white/10 mb-12 grayscale invert opacity-80 hover:grayscale-0 hover:invert-0 hover:opacity-100 transition-all duration-700">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3430.563724816155!2d76.70295847614534!3d30.70258168709325!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390fef95b706c9a9%3A0x6a2c262a74c2e6f!2sIndustrial%20Area%20Phase%208A%2C%20Mohali%2C%20Punjab!5e0!3m2!1sen!2sin!4v1714578000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mb-4 text-white/60">
                   <Phone size={18} />
                </div>
                <a href={`tel:${siteConfig.contact.phone}`} className="font-body text-sm text-white/50 hover:text-white transition-colors">
                  {siteConfig.contact.phone}
                </a>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mb-4 text-white/60">
                   <Mail size={18} />
                </div>
                <a href={`mailto:${siteConfig.contact.email}`} className="font-body text-sm text-white/50 hover:text-white transition-colors">
                  {siteConfig.contact.email}
                </a>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mb-4 text-white/60">
                   <MapPin size={18} />
                </div>
                <p className="font-body text-sm text-white/50 leading-relaxed mb-4">
                  {siteConfig.contact.address}
                </p>
                <Button 
                  asChild
                  variant="outline" 
                  size="sm"
                  className="border-white/20 text-white hover:bg-white hover:text-charcoal transition-all rounded-full"
                >
                  <a href={siteConfig.contact.mapUrl} target="_blank" rel="noopener noreferrer">
                    Visit Us
                  </a>
                </Button>
              </div>
            </div>
          </div>
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
          <span className="font-body text-xs text-white/40">© {year} {siteConfig.name}. All rights reserved.</span>
        </div>
      </div>
    </footer>

  );
}

