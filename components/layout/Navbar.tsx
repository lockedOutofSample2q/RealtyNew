"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { useCurrency, type Currency } from "@/context/CurrencyContext";

const CURRENCIES: Currency[] = ["INR", "USD", "CAD", "AUD"];

const MENU_LINKS = [
  { label: "Home", href: "/" },
  { label: "Properties", href: "/properties" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const MENU_TOP_POSITIONS = ["18vh", "27vh", "36vh", "45vh", "54vh", "63vh"];

const UTILITY_LINKS = [
  { label: "Relocation", href: "/relocation" },
  { label: "Mortgage Calculator", href: "/mortgage-calculator" },
  { label: "Book a Consultation", href: "/booking" },
  { label: "List Property", href: "/list-your-property" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const currencyRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { currency, setCurrency: setGlobalCurrency } = useCurrency();

  const handleCurrencyChange = (c: Currency) => {
    setGlobalCurrency(c);
    
    // Sync with URL if on a listing page
    const isListingPage = ["/properties", "/lands", "/properties"].includes(pathname || "");
    if (isListingPage) {
      const params = new URLSearchParams(searchParams?.toString());
      params.set("currency", c);
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    }
  };

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (currencyRef.current && !currencyRef.current.contains(e.target as Node)) {
        setCurrencyOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isListingPage = ["/properties", "/lands", "/properties"].includes(pathname || "");
  
  // These specific pages have dark hero sections at the top
  const darkHeaderPages = ["/", "/properties", "/lands", "/properties", "/about", "/contact", "/booking", "/blog"];
  
  // All other pages (like property detail /[slug], /blog, /mortgage-calculator, etc) start with white backgrounds
  const isLightPage = !darkHeaderPages.includes(pathname || "");

  const useDarkText = isLightPage && !isOpen;

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
            <div className={cn("flex flex-col items-center leading-none font-display", useDarkText ? "text-black" : "text-white")}>
              <span className="text-2xl font-light tracking-wider lowercase flex items-center gap-1.5">
                m <span className="opacity-40 font-thin text-[28px] -translate-y-[2px]">|</span> monte
              </span>
              <span className="text-[8px] tracking-[0.4em] font-medium opacity-70 uppercase -translate-y-1 pl-1">REAL ESTATE</span>
            </div>
          </Link>

          {/* ── Controls (EN + Hamburger/Close) ──────────── */}
          <div className="flex items-center gap-6 z-50">
            {/* Currency selector */}
            <div className="hidden sm:block relative" ref={currencyRef}>
              <button
                type="button"
                onClick={() => setCurrencyOpen(!currencyOpen)}
                className={cn(
                  "flex items-center gap-1 cursor-pointer transition-colors whitespace-nowrap shrink-0 focus:outline-none",
                  useDarkText ? "text-black/90 hover:text-black" : "text-white/90 hover:text-white"
                )}
              >
                <span className="font-body text-[11px] font-bold tracking-widest uppercase leading-none">{currency}</span>
                <ChevronDown size={11} className={cn("opacity-70 shrink-0 transition-transform duration-200", currencyOpen && "rotate-180")} />
              </button>

              <AnimatePresence>
                {currencyOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-[calc(100%+8px)] bg-white rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.15)] border border-black/5 overflow-hidden z-[200] min-w-[80px]"
                  >
                    {CURRENCIES.map((c) => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => { handleCurrencyChange(c); setCurrencyOpen(false); }}
                        className={cn(
                          "w-full text-left px-4 py-2.5 font-body text-[12px] font-bold tracking-widest uppercase transition-colors",
                          currency === c
                            ? "bg-black text-white"
                            : "text-black/60 hover:bg-black/5 hover:text-black"
                        )}
                      >
                        {c}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className={cn("hover:opacity-70 transition-opacity focus:outline-none", useDarkText ? "text-black" : "text-white")}
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X size={24} strokeWidth={1.5} />
              ) : (
                <div className="flex flex-col gap-[6px] w-[22px]">
                  <div className={cn("w-full h-[1.5px] rounded-full", useDarkText ? "bg-black" : "bg-white")}></div>
                  <div className={cn("w-full h-[1.5px] rounded-full", useDarkText ? "bg-black" : "bg-white")}></div>
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
            className="fixed inset-0 z-[50] w-full h-full bg-[#111111]/96 backdrop-blur-2xl"
          >
            {/* Dark gradient overlay for that dim room feel from screenshot */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-black/18 pointer-events-none" />

            <div className="relative z-10 h-screen px-6 md:px-12">

              {/* Main vertical links (each item has frame-relative anchor) */}
              <nav className="absolute left-[6.25rem] md:left-[7.75rem] top-0 w-[min(560px,80vw)] h-screen">
                {MENU_LINKS.map((item, i) => (
                  <motion.div
                    custom={i}
                    variants={linkVariants}
                    initial="closed"
                    animate="open"
                    key={item.label}
                    className="absolute left-0"
                    style={{ top: MENU_TOP_POSITIONS[i] }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "font-display font-light text-[clamp(37px,4.55vw,75px)] leading-[1.12] [letter-spacing:calc(0.015em+1pt)] transition-colors duration-400 block w-max max-w-full",
                        pathname === item.href
                          ? "text-white"
                          : "text-white/50 hover:text-white/80"
                      )}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Bottom section inside same full-screen frame (frame-relative anchors) */}
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                transition={{ delay: 0.8, duration: 0.5 }}
                className="absolute left-[6.25rem] md:left-[7.75rem] bottom-[3.8vh] w-[min(760px,88vw)] flex flex-col gap-6"
              >
                <div className="flex flex-wrap items-center gap-6">
                  {UTILITY_LINKS.map((util) => (
                    <Link
                      key={util.label}
                      href={util.href}
                      onClick={() => setIsOpen(false)}
                      className="font-body text-[11px] md:text-[12px] font-normal text-white/60 hover:text-white transition-colors"
                    >
                      {util.label}
                    </Link>
                  ))}
                </div>

                {/* Contact Info */}
                <div className="flex flex-col gap-1 font-body text-[13px] md:text-[14px] text-white/60 tracking-wide">
                  <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-white transition-colors">
                    {siteConfig.contact.email}
                  </a>
                  <a href={`tel:${siteConfig.contact.phone}`} className="hover:text-white transition-colors">
                    {siteConfig.contact.phone}
                  </a>
                </div>
              </motion.div>

              <div className="absolute right-[6.25rem] md:right-[7.75rem] bottom-[3.8vh] font-body text-[11px] uppercase tracking-[0.16em] text-white/50">
                Dubai, UAE
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
