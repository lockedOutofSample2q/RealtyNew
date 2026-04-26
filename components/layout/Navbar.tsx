// components/layout/Navbar.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig, navItems, footerLinks } from "@/config/site";
import { cn } from "@/lib/utils";
import { useCurrency, type Currency } from "@/context/CurrencyContext";

const CURRENCIES: Currency[] = ["INR", "USD", "CAD", "AUD"];

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
  const darkHeaderPages = ["/", "/properties", "/lands", "/about", "/booking", "/relocation"];
  
  // Robust check if current page is in the dark header list
  const isDarkHeroPage = darkHeaderPages.some(page => {
    if (page === "/") return pathname === "/";
    // Check if the current pathname starts with any of the dark header pages
    return pathname?.startsWith(page);
  });

  const useDarkText = !isDarkHeroPage && !isOpen;

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
        className={cn(
          "absolute top-0 left-0 right-0 z-[60] py-6 transition-all duration-300 border-b",
          useDarkText ? "bg-white/95 backdrop-blur-md border-black/5" : "bg-transparent border-transparent"
        )}
      >
        <div className="container-site flex items-center justify-between">
          
          {/* -- Logo --------------------------------------- */}
          <Link href="/" onClick={() => setIsOpen(false)} className="flex items-center gap-2 group z-50">
            <div className="relative h-28 sm:h-36 aspect-[1756/925]">
              <img 
                src="/assets/logo-light-theme.svg" 
                alt={siteConfig.name} 
                className={cn(
                  "absolute inset-0 h-full w-full object-contain object-left transition-opacity duration-300",
                  useDarkText ? "opacity-100" : "opacity-0"
                )} 
              />
              <img 
                src="/assets/logo-dark-theme.svg" 
                alt={siteConfig.name} 
                className={cn(
                  "absolute inset-0 h-full w-full object-contain object-left transition-opacity duration-300",
                  !useDarkText ? "opacity-100" : "opacity-0"
                )} 
              />
            </div>
          </Link>

          {/* -- Controls (EN + Hamburger/Close) ------------ */}
          <div className="flex items-center gap-8 z-50">
            {/* Currency selector */}
            <div className="hidden sm:block relative" ref={currencyRef}>
              <button
                type="button"
                onClick={() => setCurrencyOpen(!currencyOpen)}
                aria-label={`Select currency (current: ${currency})`}
                aria-expanded={currencyOpen}
                aria-haspopup="listbox"
                className={cn(
                  "flex items-center gap-1 cursor-pointer transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-charcoal rounded-sm",
                  useDarkText ? "text-charcoal/80 hover:text-charcoal" : "text-white/80 hover:text-white"
                )}
              >
                <span className="font-body text-xs font-semibold tracking-widest uppercase leading-none">{currency}</span>
                <ChevronDown size={14} className={cn("opacity-70 shrink-0 transition-transform duration-200", currencyOpen && "rotate-180")} />
              </button>

              <AnimatePresence>
                {currencyOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    transition={{ duration: 0.15 }}
                    role="listbox"
                    className="absolute right-0 top-[calc(100%+8px)] bg-white rounded-lg shadow-medium border border-border overflow-hidden z-[200] min-w-[80px]"
                  >
                    {CURRENCIES.map((c) => (
                      <button
                        key={c}
                        type="button"
                        role="option"
                        aria-selected={currency === c}
                        aria-label={`Change currency to ${c}`}
                        onClick={() => { handleCurrencyChange(c); setCurrencyOpen(false); }}
                        className={cn(
                          "w-full text-left px-4 py-3 font-body text-xs font-semibold tracking-widest uppercase transition-colors outline-none",
                          currency === c
                            ? "bg-charcoal text-white"
                            : "text-charcoal/60 hover:bg-black/5 hover:text-charcoal focus:bg-black/5"
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
              className={cn("hover:opacity-70 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-charcoal rounded-sm", useDarkText ? "text-charcoal" : "text-white")}
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X size={28} strokeWidth={1.5} />
              ) : (
                <div className="flex flex-col gap-[6px] w-[24px]">
                  <div className={cn("w-full h-[1.5px] rounded-full", useDarkText ? "bg-charcoal" : "bg-white")}></div>
                  <div className={cn("w-full h-[1.5px] rounded-full", useDarkText ? "bg-charcoal" : "bg-white")}></div>
                </div>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* -- Full Screen Overlay Menu ----------------------- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="exit"
            className="fixed inset-0 z-[50] w-full h-full bg-charcoal/95 backdrop-blur-2xl"
          >
            <div className="relative z-10 h-screen container-site flex flex-col pt-32 pb-12">
              {/* Main content grid */}
              <div className="flex-1 flex flex-col justify-center">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 ml-0 md:ml-[min(5vw,60px)]">
                  {/* Left Column: Main Nav */}
                  <nav className="flex flex-col gap-4 md:gap-6">
                    {navItems.filter(item => item.label !== "Tools").map((item, i) => (
                      <motion.div
                        custom={i}
                        variants={linkVariants}
                        initial="closed"
                        animate="open"
                        key={item.label}
                      >
                        <Link
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          className="group flex items-baseline w-full"
                        >
                          <span className="font-display text-2xl sm:text-3xl md:text-5xl text-white/80 group-hover:text-white transition-colors whitespace-nowrap">
                            {item.label}
                          </span>
                        </Link>
                      </motion.div>
                    ))}
                  </nav>

                  {/* Right Column: Tools */}
                  <motion.div
                    custom={navItems.length}
                    variants={linkVariants}
                    initial="closed"
                    animate="open"
                    className="flex flex-col justify-center"
                  >
                    <p className="font-body text-[10px] uppercase tracking-[0.2em] text-white/30 mb-8">Free Tools</p>
                    <div className="flex flex-col gap-1">
                      {navItems.find(item => item.label === "Tools")?.children?.map((tool) => (
                        <Link
                          key={tool.label}
                          href={tool.href}
                          onClick={() => setIsOpen(false)}
                          className="group flex flex-col"
                        >
                          <span className="font-display text-base sm:text-lg md:text-xl text-white/60 group-hover:text-white transition-colors">
                            {tool.label}
                          </span>
                          <span className="font-body text-[9px] text-white/20 uppercase tracking-widest mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                            View Tool
                          </span>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Bottom section (Contact + Legal) */}
              <motion.div 
                className="flex flex-col md:flex-row md:items-end justify-between gap-8 ml-0 md:ml-[min(5vw,60px)]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                <div className="flex flex-col gap-1">
                  <p className="font-body text-[10px] uppercase tracking-[0.2em] text-white/30 mb-2">Get in touch</p>
                  <a href={`tel:${siteConfig.contact.phone}`} className="font-body text-lg md:text-xl text-white/70 hover:text-white transition-colors">
                    {siteConfig.contact.phone}
                  </a>
                  <a href={`mailto:${siteConfig.contact.email}`} className="font-body text-lg md:text-xl text-white/70 hover:text-white transition-colors">
                    {siteConfig.contact.email}
                  </a>
                </div>
                <div className="flex flex-wrap gap-x-6 gap-y-2 border-t md:border-t-0 border-white/10 pt-6 md:pt-0">
                  {footerLinks.legal.map(link => (
                     <Link key={link.label} href={link.href} onClick={() => setIsOpen(false)} className="font-body text-[10px] md:text-xs uppercase tracking-widest text-white/40 hover:text-white transition-colors">
                       {link.label}
                     </Link>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
