"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

const MENU_LINKS = [
  { label: "Home", href: "/" },
  { label: "Off Plan", href: "/off-plan" },
  { label: "Rentals", href: "/rentals" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const UTILITY_LINKS = [
  { label: "Relocation", href: "#" },
  { label: "Mortgage Calculator", href: "#" },
  { label: "List Property", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  const menuVariants = {
    closed: { opacity: 0, y: "-100%" },
    open: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
    exit: { opacity: 0, y: "-50%", transition: { duration: 0.4, ease: "easeInOut" } }
  };

  const linkVariants = {
    closed: { opacity: 0, y: 30 },
    open: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.2 + i * 0.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] }
    })
  };

  return (
    <>
      <header
        className="absolute top-0 left-0 right-0 z-[60] bg-transparent py-4 md:py-6"
      >
        <div className="px-6 md:px-12 flex items-center justify-between">
          
          {/* ── Logo ─────────────────────────────────────── */}
          <Link href="/" onClick={() => setIsOpen(false)} className="flex items-center gap-2 group z-50">
            <div className="flex flex-col items-center leading-none text-white font-display">
              <span className="text-2xl font-light tracking-wider lowercase flex items-center gap-1.5">
                m <span className="opacity-40 font-thin text-[28px] -translate-y-[2px]">|</span> monte
              </span>
              <span className="text-[8px] tracking-[0.4em] font-medium opacity-70 uppercase -translate-y-1 pl-1">REAL ESTATE</span>
            </div>
          </Link>

          {/* ── Controls (EN + Hamburger/Close) ──────────── */}
          <div className="flex items-center gap-6 z-50">
            <div className="hidden sm:flex items-center gap-1.5 text-white/90 hover:text-white cursor-pointer transition-colors">
              <span className="font-body text-[11px] font-bold tracking-widest uppercase">EN</span>
              <ChevronDown size={12} className="opacity-70" />
            </div>
            
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:opacity-70 transition-opacity focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X size={24} strokeWidth={1.5} />
              ) : (
                <div className="flex flex-col gap-[6px] w-[22px]">
                  <div className="w-full h-[1.5px] bg-white rounded-full"></div>
                  <div className="w-full h-[1.5px] bg-white rounded-full"></div>
                </div>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* ── Full Screen Overlay Menu ─────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="exit"
            className="fixed inset-0 z-[50] w-full h-full bg-[#111111]/98 backdrop-blur-3xl overflow-y-auto"
          >
            {/* Dark gradient overlay for that dim room feel from screenshot */}
            <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-transparent to-black/40 pointer-events-none" />

            <div className="relative z-10 min-h-full px-6 md:px-12 pt-[12vh] pb-[6vh] flex flex-col justify-between">
              
              {/* Massive Main Links */}
              <nav className="flex flex-col mt-2">
                {MENU_LINKS.map((item, i) => (
                  <motion.div custom={i} variants={linkVariants} initial="closed" animate="open" key={item.label}>
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "font-display font-light text-[clamp(32px,10vh,120px)] md:text-[clamp(40px,11.5vh,150px)] leading-[1.1] tracking-tight transition-colors duration-400 block w-max max-w-full",
                        pathname === item.href
                          ? "text-white"
                          : "text-white/30 hover:text-white/70"
                      )}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Bottom Footer Section inside the menu */}
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                transition={{ delay: 0.8, duration: 0.5 }}
                className="mt-[6vh] pt-8 border-t border-white/10 grid grid-cols-1 md:grid-cols-3 gap-8 items-end w-full"
              >
                {/* Utilities */}
                <div className="flex flex-wrap items-center gap-6">
                  {UTILITY_LINKS.map((util) => (
                    <Link 
                      key={util.label}
                      href={util.href}
                      onClick={() => setIsOpen(false)}
                      className="font-body text-[11px] font-bold uppercase tracking-widest text-white/40 hover:text-white transition-colors"
                    >
                      {util.label}
                    </Link>
                  ))}
                </div>

                {/* Contact Info */}
                <div className="flex flex-col gap-2 font-body text-[13px] text-white/50 tracking-wide md:text-center">
                  <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-white transition-colors">
                    {siteConfig.contact.email}
                  </a>
                  <a href={`tel:${siteConfig.contact.phone}`} className="hover:text-white transition-colors">
                    {siteConfig.contact.phone}
                  </a>
                </div>

                {/* Location */}
                <div className="font-body text-[11px] font-bold uppercase tracking-widest text-white/40 md:text-right">
                  DUBAI, UAE
                </div>
              </motion.div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
