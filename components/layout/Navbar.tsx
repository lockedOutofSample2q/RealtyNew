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
    const isListingPage = ["/properties"].includes(pathname || "");
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

  const isListingPage = ["/properties"].includes(pathname || "");
  
  // These specific pages have dark hero sections at the top
  const darkHeaderPages = ["/", "/properties", "/apartments", "/houses", "/about", "/booking"];
  
  // Robust check if current page is in the dark header list
  const isDarkHeroPage = darkHeaderPages.some(page => {
    if (page === "/") return pathname === "/";
    
    // For listing categories, only the index pages are dark hero. 
    // Detail pages (/properties/[slug], etc) are light/white.
    const isListingIndex = ["/properties", "/apartments", "/houses"].includes(page);
    if (isListingIndex) return pathname === page;

    return pathname === page || pathname?.startsWith(`${page}/`);
  });

  const useDarkText = !isDarkHeroPage && !isOpen;
  const showLightLogo = useDarkText;

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
          "absolute top-0 left-0 right-0 z-[60] py-4 sm:py-6 transition-all duration-300 border-b",
          useDarkText ? "bg-white/95 backdrop-blur-md border-black/5" : "bg-transparent border-transparent"
        )}
      >
        <div className="w-[94%] mx-auto flex items-center justify-between">
          
          {/* -- Logo --------------------------------------- */}
          <Link href="/" onClick={() => setIsOpen(false)} className="flex items-center gap-2 group z-50">
            <div className="relative h-10 sm:h-14 aspect-[1756/925]">
              <img 
                src="/assets/logo-light-theme.svg" 
                alt={siteConfig.name} 
                className={cn(
                  "absolute inset-0 h-full w-full object-contain object-left transition-opacity duration-300",
                  showLightLogo ? "opacity-100" : "opacity-0"
                )} 
              />
              <img 
                src="/assets/logo-dark-theme.svg" 
                alt={siteConfig.name} 
                className={cn(
                  "absolute inset-0 h-full w-full object-contain object-left transition-opacity duration-300",
                  !showLightLogo ? "opacity-100" : "opacity-0"
                )} 
              />
            </div>
          </Link>

          {/* -- Controls (EN + Hamburger/Close) ------------ */}
          <div className="flex items-center gap-[2.5vw] z-50">
            {/* Currency selector */}
            <div className="hidden sm:block relative" ref={currencyRef}>
              <button
                type="button"
                onClick={() => setCurrencyOpen(!currencyOpen)}
                aria-label={`Select currency (current: ${currency})`}
                aria-expanded={currencyOpen}
                aria-haspopup="listbox"
                className={cn(
                  "flex items-center gap-[0.4vw] cursor-pointer transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-charcoal rounded-sm",
                  useDarkText ? "text-charcoal/80 hover:text-charcoal" : "text-white/80 hover:text-white"
                )}
              >
                <span className="font-body text-[1vw] font-semibold tracking-widest uppercase leading-none">{currency}</span>
                <ChevronDown className={cn("w-[1.2vw] h-[1.2vw] opacity-70 shrink-0 transition-transform duration-200", currencyOpen && "rotate-180")} />
              </button>

              <AnimatePresence>
                {currencyOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: "0.5vw" }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: "0.4vw" }}
                    transition={{ duration: 0.15 }}
                    role="listbox"
                    className="absolute right-0 top-[calc(100%+0.8vw)] bg-white rounded-[0.8vw] shadow-medium border border-border overflow-hidden z-[200] min-w-[6vw]"
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
                          "w-full text-left px-[1.2vw] py-[0.8vw] font-body text-[0.8vw] font-semibold tracking-widest uppercase transition-colors outline-none",
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
                <X className="w-[3vw] h-[3vw] sm:w-[1.8vw] sm:h-[1.8vw]" strokeWidth={1.5} />
              ) : (
                <div className="flex flex-col gap-[0.5vw] sm:gap-[0.4vw] w-[3.5vw] sm:w-[1.8vw]">
                  <div className={cn("w-full h-[0.35vw] sm:h-[0.1vw] rounded-full", useDarkText ? "bg-charcoal" : "bg-white")}></div>
                  <div className={cn("w-full h-[0.35vw] sm:h-[0.1vw] rounded-full", useDarkText ? "bg-charcoal" : "bg-white")}></div>
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
            <div className="relative z-10 h-screen w-[92%] mx-auto flex flex-col pt-[10vw] pb-[5vw]">
              {/* Main content grid */}
              <div className="flex-1 flex flex-col justify-center">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-[5vw] ml-0 md:ml-[4vw]">
                  {/* Left Column: Main Nav */}
                  <nav className="flex flex-col gap-[1.2vw]">
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
                          <span className="font-display text-[6vw] sm:text-[4.5vw] md:text-[2.8vw] text-white/80 group-hover:text-white transition-colors whitespace-nowrap leading-none">
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
                    <p className="font-body text-[0.8vw] uppercase tracking-[0.2em] text-white/30 mb-[1.8vw]">Free Tools</p>
                    <div className="flex flex-col gap-[0.7vw]">
                      {navItems.find(item => item.label === "Tools")?.children?.map((tool) => (
                        <Link
                          key={tool.label}
                          href={tool.href}
                          onClick={() => setIsOpen(false)}
                          className="group flex flex-col"
                        >
                          <span className="font-display text-[2.8vw] sm:text-[2vw] md:text-[1.2vw] text-white/60 group-hover:text-white transition-colors">
                            {tool.label}
                          </span>
                          <span className="font-body text-[0.65vw] text-white/20 uppercase tracking-widest mt-[0.1vw] opacity-0 group-hover:opacity-100 transition-opacity">
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
                className="flex flex-col md:flex-row md:items-end justify-between gap-[3vw] ml-0 md:ml-[4vw]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                <div className="flex flex-col gap-[0.4vw]">
                  <p className="font-body text-[0.8vw] uppercase tracking-[0.2em] text-white/30 mb-[0.7vw]">Get in touch</p>
                  <a href={`tel:${siteConfig.contact.phone}`} className="font-body text-[2.2vw] sm:text-[1.8vw] md:text-[1.1vw] text-white/70 hover:text-white transition-colors">
                    {siteConfig.contact.phone}
                  </a>
                  <a href={`mailto:${siteConfig.contact.email}`} className="font-body text-[2.2vw] sm:text-[1.8vw] md:text-[1.1vw] text-white/70 hover:text-white transition-colors">
                    {siteConfig.contact.email}
                  </a>
                </div>
                <div className="flex flex-wrap gap-x-[2.2vw] gap-y-[0.7vw] border-t md:border-t-0 border-white/10 pt-[2.2vw] md:pt-0">
                  {footerLinks.legal.map(link => (
                     <Link key={link.label} href={link.href} onClick={() => setIsOpen(false)} className="font-body text-[0.9vw] sm:text-[0.8vw] md:text-[0.6vw] uppercase tracking-widest text-white/40 hover:text-white transition-colors">
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
