import Link from "next/link";
import { siteConfig } from "@/config/site";

export default function FunnelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white">
      {/* Minimal Header */}
      <header className="py-6 border-b border-black/5">
        <div className="container-site flex items-center justify-between">
          <Link href="/" className="group">
             <span className="font-display text-2xl font-light tracking-widest text-charcoal lowercase">
               realty<span className="text-black/40">holding</span>
             </span>
          </Link>
          <div className="hidden sm:block">
            <a href={`tel:${siteConfig.contact.phone}`} className="font-body text-sm font-medium text-charcoal hover:text-black transition-colors">
              {siteConfig.contact.phone}
            </a>
          </div>
        </div>
      </header>

      <main>{children}</main>

      {/* Minimal Footer */}
      <footer className="py-12 border-t border-black/5 bg-gray-50">
        <div className="container-site">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-[13px] text-muted font-body">
            <div className="flex items-center gap-6">
              <Link href="/privacy" className="hover:text-charcoal transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-charcoal transition-colors">Terms of Service</Link>
            </div>
            <p>© {new Date().getFullYear()} Realty Holding & Management Consultants. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
