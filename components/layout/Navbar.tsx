// components/layout/Navbar.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { X, ChevronDown, ChevronRight, Phone, MessageSquare, PlusCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig, navItems, footerLinks } from "@/config/site";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useCurrency, type Currency } from "@/context/CurrencyContext";
import { useHeader } from "@/context/HeaderContext";

const CURRENCIES: Currency[] = ["INR", "USD", "CAD", "AUD"];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const [expandedNav, setExpandedNav] = useState<string | null>(null);
  const currencyRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { currency, setCurrency: setGlobalCurrency } = useCurrency();
  const { isTransparentOverride } = useHeader();

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

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
    setExpandedNav(null);
  }, [pathname]);

  // Handle ESC key to close menu or dropdown (equivalent to clicking the cross button)
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" || e.key === "Esc") {
        if (currencyOpen) {
          setCurrencyOpen(false);
        }
        if (isOpen) {
          setIsOpen(false);
          setExpandedNav(null);
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, currencyOpen]);

  const darkHeaderPages = ["/", "/properties", "/properties/flats", "/properties/houses", "/properties/lands", "/about"];
  
  const isDarkHeroPage = isTransparentOverride !== null 
    ? isTransparentOverride 
    : darkHeaderPages.some(page => {
        if (page === "/") return pathname === "/";
        const isListingIndex = ["/properties", "/properties/flats", "/properties/houses", "/properties/lands"].includes(page);
        if (isListingIndex) return pathname === page || pathname === `${page}/`;
        return pathname === page || pathname?.startsWith(`${page}/`);
      });

  const useDarkText = !isDarkHeroPage && !isOpen;
  const showLightLogo = useDarkText;

  // Prevent background scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const toggleAccordion = (label: string) => {
    setExpandedNav(prev => (prev === label ? null : label));
  };

  const toolsChildren = navItems.find((item) => item.label === "Tools")?.children || [];

  return (
    <>
      <header
        className={cn(
          "absolute top-0 left-0 right-0 z-[60] py-4 sm:py-6 transition-all duration-300 border-b",
          isOpen
            ? "bg-black border-transparent"
            : useDarkText
            ? "bg-white/95 backdrop-blur-md border-black/5 shadow-sm"
            : "bg-transparent border-transparent"
        )}
      >
        <div className="w-[92%] max-w-7xl mx-auto flex items-center justify-between">
          
          {/* -- Logo --------------------------------------- */}
          <Link href="/" onClick={() => setIsOpen(false)} className="flex items-center gap-2 group z-50">
            <div className="relative h-12 xs:h-14 sm:h-16 md:h-20 w-44 xs:w-52 sm:w-60 md:w-72 aspect-[1756/925]">
              <Image 
                src="/assets/logo-light-theme.svg" 
                alt={siteConfig.name} 
                width={1756}
                height={925}
                priority
                className={cn(
                  "absolute inset-0 h-full w-full object-contain object-left transition-opacity duration-300",
                  showLightLogo ? "opacity-100" : "opacity-0"
                )} 
              />
              <Image 
                src="/assets/logo-dark-theme.svg" 
                alt={siteConfig.name} 
                width={1756}
                height={925}
                priority
                className={cn(
                  "absolute inset-0 h-full w-full object-contain object-left transition-opacity duration-300",
                  !showLightLogo ? "opacity-100" : "opacity-0"
                )} 
              />
            </div>
          </Link>

          {/* -- Controls (Currency + Hamburger Toggle) ------------ */}
          <div className="flex items-center gap-3 sm:gap-6 z-50">
            {/* Currency selector (Desktop & Mobile Header) */}
            <div className="relative" ref={currencyRef}>
              <button
                type="button"
                onClick={() => setCurrencyOpen(!currencyOpen)}
                aria-label={`Select currency (current: ${currency})`}
                aria-expanded={currencyOpen}
                aria-haspopup="listbox"
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs sm:text-sm font-bold tracking-wider uppercase transition-all duration-200 border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40",
                  useDarkText 
                    ? "text-charcoal border-black/15 bg-black/5 hover:bg-black/10" 
                    : "text-white border-white/20 bg-white/10 hover:bg-white/20"
                )}
              >
                <span>{currency}</span>
                <ChevronDown className={cn("w-3.5 h-3.5 opacity-70 transition-transform duration-200", currencyOpen && "rotate-180")} />
              </button>

              <AnimatePresence>
                {currencyOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 4, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    role="listbox"
                    className={cn(
                      "absolute right-0 top-full mt-2 rounded-2xl shadow-2xl border overflow-hidden z-[200] min-w-[120px] py-1.5",
                      useDarkText
                        ? "bg-white text-charcoal border-black/10"
                        : "bg-[#141414] text-white border-white/15"
                    )}
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
                          "w-full text-left px-5 py-2.5 font-body text-xs sm:text-sm font-bold tracking-widest uppercase transition-colors outline-none flex items-center justify-between",
                          useDarkText
                            ? (currency === c ? "bg-charcoal text-white" : "text-charcoal/70 hover:bg-black/5 hover:text-charcoal")
                            : (currency === c ? "bg-white/15 text-white" : "text-white/70 hover:bg-white/10 hover:text-white")
                        )}
                      >
                        <span>{c}</span>
                        {currency === c && <span className={cn("w-2 h-2 rounded-full", useDarkText ? "bg-charcoal" : "bg-gold")}></span>}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Hamburger / Close Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={cn(
                "p-2 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40",
                useDarkText 
                  ? "text-charcoal hover:bg-black/5" 
                  : "text-white hover:bg-white/10"
              )}
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? (
                <X className="w-6 h-6 sm:w-7 sm:h-7 text-white" strokeWidth={2.2} />
              ) : (
                <div className="w-6 h-5 flex flex-col justify-between items-end">
                  <span className={cn("w-full h-0.5 rounded-full transition-transform duration-300", useDarkText ? "bg-charcoal" : "bg-white")} />
                  <span className={cn("w-4/5 h-0.5 rounded-full transition-transform duration-300", useDarkText ? "bg-charcoal" : "bg-white")} />
                  <span className={cn("w-3/5 h-0.5 rounded-full transition-transform duration-300", useDarkText ? "bg-charcoal" : "bg-white")} />
                </div>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* -- Mobile & Desktop Overlay Drawer ----------------------- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[50] w-full h-dvh bg-black text-white flex flex-col justify-between overflow-hidden pt-16 sm:pt-24 pb-6 px-6 sm:px-12 lg:px-20 xl:px-28"
          >
            {/* Frame bounded container scaled to screen edges */}
            <div className="w-full max-w-none mx-auto h-full flex flex-col justify-between">
              
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-20 xl:gap-28 my-auto items-center">
                
                {/* Main Navigation Items (Left Column) */}
                <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-1 lg:gap-2">
                  <p className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-white/40 font-bold mb-1">
                    Navigation
                  </p>
                  
                  {navItems.map((item, index) => {
                    const hasChildren = item.children && item.children.length > 0;
                    const isExpanded = expandedNav === item.label;
                    const isTools = item.label === "Tools";

                    return (
                      <motion.div
                        key={item.label}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.05 + index * 0.03, duration: 0.3 }}
                        className={cn("py-1 lg:py-2.5", isTools && "lg:hidden")}
                      >
                        {hasChildren ? (
                          <div>
                            <div className="inline-flex items-center gap-3 group">
                              <Link
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                                className="font-display text-2xl xs:text-3xl sm:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl text-white hover:text-white/80 transition-colors font-medium leading-tight"
                              >
                                {item.label}
                              </Link>
                              <button
                                type="button"
                                onClick={() => toggleAccordion(item.label)}
                                className="p-1.5 text-white/80 hover:text-white rounded-full transition-colors"
                                aria-label={`Toggle ${item.label} sub-menu`}
                              >
                                <ChevronDown className={cn("w-5 h-5 lg:w-7 lg:h-7 transition-transform duration-300", isExpanded && "rotate-180 text-white")} />
                              </button>
                            </div>

                            {/* Sub-menu accordion */}
                            <AnimatePresence>
                              {isExpanded && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.25 }}
                                  className="overflow-hidden pl-4 mt-1.5 flex flex-col gap-1.5 py-1"
                                >
                                  {item.children?.map((child) => (
                                    <Link
                                      key={child.label}
                                      href={child.href}
                                      onClick={() => setIsOpen(false)}
                                      className="font-body text-sm sm:text-base lg:text-xl text-white/80 hover:text-white transition-colors flex items-center gap-2 py-0.5 font-medium"
                                    >
                                      <ChevronRight className="w-3.5 h-3.5 text-white/50 shrink-0" />
                                      <span>{child.label}</span>
                                    </Link>
                                  ))}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        ) : (
                          <Link
                            href={item.href}
                            onClick={() => setIsOpen(false)}
                            className="font-display text-2xl xs:text-3xl sm:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl text-white hover:text-white/80 transition-colors inline-block font-medium leading-tight"
                          >
                            {item.label}
                          </Link>
                        )}
                      </motion.div>
                    );
                  })}
                </div>

                {/* Right Column: Tools List (DESKTOP ONLY) + Quick Connect + Legal */}
                <div className="lg:col-span-5 xl:col-span-4 flex flex-col justify-center gap-6 lg:gap-8 lg:pl-10">
                  
                  {/* Tools List - ONLY ON DESKTOP */}
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="hidden lg:flex flex-col gap-2"
                  >
                    <p className="text-xs uppercase tracking-[0.25em] text-white/40 font-bold mb-2">
                      Tools
                    </p>
                    <div className="flex flex-col gap-2">
                      {toolsChildren.map((tool) => (
                        <Link
                          key={tool.label}
                          href={tool.href}
                          onClick={() => setIsOpen(false)}
                          className="font-body text-base lg:text-lg xl:text-xl text-white/50 hover:text-white transition-colors leading-tight flex items-center justify-between group py-1.5 font-medium"
                        >
                          <span>{tool.label}</span>
                          <ChevronRight className="w-4 h-4 text-white/30 group-hover:text-white group-hover:translate-x-1 transition-all" />
                        </Link>
                      ))}
                    </div>
                  </motion.div>

                  {/* Quick CTAs as small icon buttons */}
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                    className="flex flex-col gap-2.5"
                  >
                    <p className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-white/40 font-bold">
                      Quick Connect
                    </p>
                    <div className="flex items-center gap-3">
                      <a
                        href={`https://wa.me/${siteConfig.contact.whatsapp.replace(/[^0-9]/g, "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="WhatsApp Advisory"
                        className="w-11 h-11 lg:w-12 lg:h-12 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/15 backdrop-blur-md flex items-center justify-center shrink-0"
                      >
                        <MessageSquare className="w-4 h-4 lg:w-5 lg:h-5 text-white/90" />
                      </a>
                      <a
                        href={`tel:${siteConfig.contact.phone}`}
                        aria-label="Call Direct"
                        className="w-11 h-11 lg:w-12 lg:h-12 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/15 backdrop-blur-md flex items-center justify-center shrink-0"
                      >
                        <Phone className="w-4 h-4 lg:w-5 lg:h-5 text-white/90" />
                      </a>
                      <Link
                        href="/list-your-property"
                        onClick={() => setIsOpen(false)}
                        aria-label="List Property in Mohali"
                        className="w-11 h-11 lg:w-12 lg:h-12 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/15 backdrop-blur-md flex items-center justify-center shrink-0"
                      >
                        <PlusCircle className="w-4 h-4 lg:w-5 lg:h-5 text-white/90" />
                      </Link>
                    </div>
                  </motion.div>

                  {/* Legal links */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.35 }}
                    className="flex flex-wrap gap-x-5 gap-y-2 pt-1"
                  >
                    {footerLinks.legal.map(link => (
                      <Link 
                        key={link.label} 
                        href={link.href} 
                        onClick={() => setIsOpen(false)} 
                        className="hover:text-white transition-colors text-[10px] sm:text-xs uppercase tracking-wider font-medium text-white/50"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </motion.div>

                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
