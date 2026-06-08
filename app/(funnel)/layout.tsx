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
      <header className="py-3 border-b border-black/5">
        <div className="container-site flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative h-16 sm:h-20 aspect-[1756/925]">
              <img 
                src="/assets/logo-light-theme.svg" 
                alt={siteConfig.name} 
                width={1756}
                height={925}
                className="h-full w-full object-contain object-left" 
              />
            </div>
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
