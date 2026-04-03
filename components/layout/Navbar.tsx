"use client";
// components/layout/Navbar.tsx
// ============================================================
// NAVIGATION BAR
// EDIT: navItems in config/site.ts to change menu links
// EDIT: logo text/image below
// ============================================================

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone } from "lucide-react";
import { navItems, siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isSolid = scrolled || pathname !== "/";

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isSolid
          ? "bg-[#0D0D0D]/95 backdrop-blur-md border-b border-[rgba(201,168,76,0.1)] py-3"
          : "bg-transparent py-5"
      )}
    >
      <div className="container-site flex items-center justify-between">
        {/* ── Logo ─────────────────────────────────────── */}
        <Link href="/" className="group flex items-center gap-1">
          {/* EDIT: Replace with <Image> for a logo file */}
          <span className="font-display text-2xl font-light tracking-widest text-white lowercase">
            mont
          </span>
          <span className="font-display text-2xl font-light tracking-widest text-[var(--gold)] lowercase">
            er
          </span>
        </Link>

        {/* ── Desktop Nav ──────────────────────────────── */}
        <nav className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "font-body text-sm tracking-wide transition-colors duration-300",
                pathname === item.href
                  ? "text-[var(--gold)]"
                  : "text-white/70 hover:text-white"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* ── CTA + Hamburger ──────────────────────────── */}
        <div className="flex items-center gap-4">
          <a
            href={`https://wa.me/${siteConfig.contact.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:flex items-center gap-2 px-5 py-2 border border-[var(--gold)] text-[var(--gold)] text-sm font-body tracking-wide hover:bg-[var(--gold)] hover:text-black transition-all duration-300"
          >
            <Phone size={14} />
            WhatsApp Us
          </a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-white/80 hover:text-white"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* ── Mobile Menu ──────────────────────────────────── */}
      <div
        className={cn(
          "lg:hidden overflow-hidden transition-all duration-400",
          isOpen ? "max-h-screen" : "max-h-0"
        )}
      >
        <div className="bg-[#0D0D0D] border-t border-[rgba(201,168,76,0.1)] px-6 py-6 flex flex-col gap-5">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className={cn(
                "font-body text-base tracking-wide transition-colors",
                pathname === item.href
                  ? "text-[var(--gold)]"
                  : "text-white/70"
              )}
            >
              {item.label}
            </Link>
          ))}
          <a
            href={`https://wa.me/${siteConfig.contact.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 flex items-center justify-center gap-2 px-5 py-3 bg-[var(--gold)] text-black text-sm font-body font-medium tracking-wide"
          >
            <Phone size={14} />
            WhatsApp Us
          </a>
        </div>
      </div>
    </header>
  );
}
