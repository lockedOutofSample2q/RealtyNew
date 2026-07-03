// components/layout/Footer.tsx
import Link from "next/link";
import { Instagram, Facebook, Linkedin, Youtube, Mail, Phone, MapPin } from "lucide-react";
import { siteConfig, footerLinks } from "@/config/site";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import Image from "next/image";
import dynamic from "next/dynamic";

const FooterMapWrapper = dynamic(() => import("./FooterMapWrapper"), {
  loading: () => <div className="w-full h-full bg-white/5 animate-pulse" />
});

export default function Footer() {
  const year = new Date().getFullYear();
  const hasSocial = Object.values(siteConfig.social).some(Boolean);

  return (
    <footer className="bg-charcoal text-white border-t border-white/10">
      {/* -- Lead Magnet Banner --------------------------------- */}
      <div className="border-b border-white/10">
        <div className="container-site py-16 flex flex-col md:flex-row items-start justify-between gap-10">
          <div className="max-w-xl">
            <h3 className="font-display text-3xl font-medium leading-tight mb-3">
              Free: The 9-Point Pre-Launch Checklist
            </h3>
            <p className="font-body text-sm text-white/80 mt-1 leading-relaxed max-w-md">
              The exact checks I run before any client puts money into a pre-launch project in Mohali. Developer track record, RERA status, payment plan traps, exit clauses. Written from 180+ closed transactions.
            </p>
          </div>
          <div className="flex w-full max-w-md mt-2 md:justify-end">
            <Button
              asChild
              variant="secondary"
              className="bg-white text-charcoal border-white hover:bg-white/90 h-12 px-8 font-bold"
            >
              <a href="https://wa.me/917814613916?text=CHECKLIST" target="_blank" rel="noopener noreferrer">
                Get it on WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* -- Main Footer Content ------------------------------- */}
      <div className="container-site py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-6">
              <div className="relative h-28 sm:h-36 w-auto">
                <Image src="/assets/logo-dark-theme.svg" alt={siteConfig.name} width={1756} height={925} className="h-full w-auto object-contain" />
              </div>
            </Link>
            <p className="font-body text-sm text-white/70 leading-relaxed mb-6 max-w-[220px]">
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
                    className="text-white/60 hover:text-white transition-colors"
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
                    className="text-white/60 hover:text-white transition-colors"
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
                    className="text-white/60 hover:text-white transition-colors"
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
                    className="text-white/60 hover:text-white transition-colors"
                  >
                    <Youtube size={20} />
                  </a>
                )}
                {siteConfig.social.reddit && (
                  <a 
                    href={siteConfig.social.reddit} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    aria-label="Follow us on Reddit"
                    className="text-white/60 hover:text-white transition-colors flex items-center justify-center"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M24 11.779c0-1.459-1.192-2.645-2.657-2.645-.715 0-1.363.275-1.84.734-1.805-1.198-4.315-1.982-7.129-2.08l1.458-6.236 4.385.947c.026 1.054.897 1.905 1.96 1.905 1.082 0 1.959-.87 1.959-1.942 0-1.071-.877-1.94-1.959-1.94-.852 0-1.58.54-1.843 1.29l-4.757-1.026c-.161-.035-.325.044-.378.197l-1.636 7.001c-2.883.053-5.46 1.01-7.3 2.215-.472-.423-1.087-.678-1.758-.678-1.465 0-2.656 1.187-2.656 2.646 0 .97.533 1.811 1.317 2.271-.052.282-.086.567-.086.857 0 3.911 5.244 7.09 11.714 7.09s11.714-3.179 11.714-7.09c0-.274-.029-.544-.075-.81.827-.442 1.39-1.282 1.39-2.257zm-15.688 3.52c0-.986.798-1.785 1.785-1.785s1.785.799 1.785 1.785-.798 1.785-1.785 1.785-1.785-.799-1.785-1.785zm8.995 3.518c-1.32.962-3.16.962-4.48 0-.17-.124-.222-.363-.116-.534.106-.17.34-.223.51-.118.983.716 2.502.716 3.485 0 .17-.124.404-.071.51.101.107.172.055.412-.115.536h.006zm-1.127-1.733c-.987 0-1.785-.799-1.785-1.785s.798-1.785 1.785-1.785 1.785.799 1.785 1.785-.798 1.785-1.785 1.785z"/>
                    </svg>
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
                    className="font-body text-sm text-white/70 hover:text-white transition-colors"
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
                    className="font-body text-sm text-white/70 hover:text-white transition-colors"
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
                    className="font-body text-sm text-white/70 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* -- Unified Visit Section ---------------------------- */}
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <h4 className="font-display text-3xl font-medium mb-10">Visit Our Office</h4>
          
          {/* Map Container */}
          <div className="w-full aspect-[21/9] rounded-[32px] overflow-hidden border border-white/10 mb-12 opacity-90 hover:opacity-100 transition-all duration-700 bg-white/5">
            <FooterMapWrapper />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start w-full">
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mb-4 text-white/60">
                 <Phone size={18} />
              </div>
              <a href={`tel:${siteConfig.contact.phone}`} className="font-body text-sm text-white/70 hover:text-white transition-colors">
                {siteConfig.contact.phone}
              </a>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mb-4 text-white/60">
                 <Mail size={18} />
              </div>
              <a href={`mailto:${siteConfig.contact.email}`} className="font-body text-sm text-white/70 hover:text-white transition-colors">
                {siteConfig.contact.email}
              </a>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mb-4 text-white/60">
                 <MapPin size={18} />
              </div>
              <p className="font-body text-sm text-white/70 leading-relaxed mb-4">
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
          <span className="font-body text-xs text-white/60">© {year} {siteConfig.name}. All rights reserved.</span>
        </div>
      </div>
    </footer>

  );
}

