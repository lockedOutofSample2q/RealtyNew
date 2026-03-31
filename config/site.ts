// config/site.ts
// ============================================================
// SITE CONFIGURATION — Edit everything here
// This is the single source of truth for:
//   - Brand name, tagline, description
//   - Contact details (phone, email, WhatsApp)
//   - Social media links
//   - Navigation items
//   - SEO defaults
//
// Changes here propagate across the entire site automatically.
// ============================================================

import type { SiteConfig, NavItem } from "@/types";

export const siteConfig: SiteConfig = {
  name: "Realty Holding and Management Consultants",
  tagline: "Curated Estate in Mohali",
  description:
    "Mohali's trusted real estate consultancy. Off-plan investments, Commercial Plotting, Residential Delights — handled with precision.",
  url: "https://www.realtyconsultants.in",

  contact: {
    phone: "+91 7814613916",         // ← EDIT: main phone
    whatsapp: "+917814613916",          // ← EDIT: WhatsApp number (no spaces)
    email: "support@realtyconsultants.in",   // ← EDIT: primary email
    address: "Phase 8B Mohali, India",              // ← EDIT: full office address
  },

  social: {
    instagram: "https://instagram.com/amritrealty",  // ← EDIT
    facebook: "https://facebook.com/amritrealty",    // ← EDIT
    linkedin: "",   // ← EDIT or leave empty to hide
    youtube: "https://www.youtube.com/channel/UCKnMj6sQl_HSAqkCQZeEQyA/",    // ← EDIT or leave empty to hide
  },
};

// ── Navigation Items ─────────────────────────────────────────
// EDIT: Add, remove, or reorder nav items here.
export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Off Plan", href: "/off-plan" },
  { label: "Rentals", href: "/rentals" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

// ── Footer Links ─────────────────────────────────────────────
export const footerLinks = {
  quick: [
    { label: "Off Plan Properties", href: "/off-plan" },
    { label: "Rentals", href: "/rentals" },
    { label: "List Your Property", href: "/list-property" },
    { label: "Mortgage Calculator", href: "/mortgage-calculator" },
    { label: "Relocation Services", href: "/relocation" },
    { label: "Blog", href: "/blog" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
  ],
};

// ── Hero Section ─────────────────────────────────────────────
// EDIT: Change the hero headline, subline, and background
export const heroContent = {
  headline: "Find Your Place\nin Mohali",
  subline:
    "Off-plan investments and luxury rentals, curated for those who know exactly what they want.",
  ctaPrimary: { label: "Explore Properties", href: "/off-plan" },
  ctaSecondary: { label: "Talk to an Advisor", href: "/contact" },
  // Background image (place in /public/images/hero.jpg or use Supabase URL)
  backgroundImage: "/images/hero.jpg",
};

// ── About Snippet (Home Page) ────────────────────────────────
export const aboutSnippet = {
  headline: "Ten Years of Trusted\nDeals in Dubai",
  body: "Monter was built on one principle: you deserve straight answers. No inflated valuations, no pressure tactics — just honest advice on where Dubai's best opportunities actually are.",
  stats: [
    { value: "4+", label: "Years in Mohali" },
    { value: "39+", label: "Properties Sold" },
    { value: "INR 20Cr+", label: "In Transactions" },
    { value: "4.9★", label: "Client Rating" },
  ],
};

// ── Services (Home Page) ─────────────────────────────────────
export const services = [
  {
    icon: "building",
    title: "Real Estate Sales",
    description:
      "Off-plan and secondary market properties across Dubai's most valuable communities.",
  },
  {
    icon: "key",
    title: "Property Rentals",
    description:
      "Short-term and long-term rentals. We handle everything from listing to key handover.",
  },
  {
    icon: "palette",
    title: "Interior Design",
    description:
      "From concept to completion. Spaces designed to maximise rental yield and lifestyle.",
  },
  {
    icon: "sparkles",
    title: "Decoration",
    description:
      "Turnkey furnishing and staging that commands premium rents and faster closings.",
  },
];

// ── FAQ (Home Page) ──────────────────────────────────────────
// EDIT: Add, remove, or edit FAQ items here.
export const faqs = [
  {
    question: "Can foreigners buy property in Dubai?",
    answer:
      "Yes. Foreigners can purchase freehold properties in designated areas across Dubai. This includes apartments, villas, and townhouses with full ownership rights.",
  },
  {
    question: "What is the process for buying off-plan in Dubai?",
    answer:
      "You select the development, pay a reservation fee (typically 5–10%), sign the SPA, and follow a payment plan tied to construction milestones. We guide you through every step.",
  },
  {
    question: "How much do I need to invest to get a UAE Golden Visa?",
    answer:
      "A property investment of AED 2 million or more qualifies you for the 10-year Golden Visa. We can recommend projects that meet this threshold with strong ROI.",
  },
  {
    question: "What are the typical rental yields in Dubai?",
    answer:
      "Dubai averages 5–8% gross rental yield depending on the community and property type — significantly higher than London, Singapore, or New York.",
  },
  {
    question: "Do you handle property management after purchase?",
    answer:
      "Yes. We offer end-to-end property management including tenant sourcing, rent collection, maintenance coordination, and Ejari registration.",
  },
];

// ── SEO Defaults ─────────────────────────────────────────────
export const seoDefaults = {
  titleTemplate: "%s | Monter Real Estate",
  defaultTitle: "Realty Holding & Management Consultants — Curated Estates in Mohali",
  description: siteConfig.description,
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [
      {
        url: `${siteConfig.url}/images/og-default.jpg`,
        width: 1200,
        height: 630,
        alt: "Realty Holding and Management Consultants",
      },
    ],
  },
};
