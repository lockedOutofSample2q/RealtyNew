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
  name: "Realty Holding & Management Consultants",
  tagline: "Invest in Mohali",
  description:
    "Mohali's non-conventional real estate consultancy. Luxury investments .",
  url: "https://www.realtyconsultants.in",

  contact: {
    phone: "+91 7814613916",
    whatsapp: "+917814613916",
    email: "hello@realtyconsultants.in",
    address: "E328 Industrial area phase 8A, Mohali, Punjab",
  },

  social: {
    instagram: "https://instagram.com/amritrealty",
    facebook: "https://facebook.com/amritrealty",
    linkedin: "https://linkedin.com/company/realtyholdingandmanagementconsultants",
    youtube: "https://www.youtube.com/@AmritRealty",
  },
};

// ── Navigation Items ─────────────────────────────────────────
// EDIT: Add, remove, or reorder nav items here.
export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Properties", href: "/properties" },
  
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

// ── Footer Links ─────────────────────────────────────────────
export const footerLinks = {
  quick: [
    { label: "Properties", href: "/properties" },
    
    { label: "List Your Property", href: "/list-your-property" },
    { label: "Mortgage Calculator", href: "/mortgage-calculator" },
    { label: "Book a Consultation", href: "/booking" },
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
    "Off-market investments and luxury assets, curated for those who know exactly what they want.",
  ctaPrimary: { label: "Explore Properties", href: "/properties" },
  ctaSecondary: { label: "Talk to an Advisor", href: "/contact" },
  // Background image (place in /public/images/hero.jpg or use Supabase URL)
  backgroundImage: "/images/hero.jpg",
};

// ── About Snippet (Home Page) ────────────────────────────────
export const aboutSnippet = {
  headline: "We're your trusted partner in real estate. With 10 years of experience in Punjab Real Estate, our team of experts is dedicated to providing personalised service and achieving the best possible results.",
  body: "From finding your dream in Mohali to selling your property at the right price, we're here to guide you every step of the way.",
  stats: [
    { value: "4+", label: "Years in Mohali" },
    { value: "125+", label: "Properties Sold" },
    { value: "INR 84Cr+", label: "In Transactions" },
    { value: "4.9★", label: "Client Rating" },
  ],
};

// ── About Carousel Items ─────────────────────────────────────
export const aboutCarouselItems = [
  {
    title: "ENARA by OMNIYAT",
    location: "Dubai Marina, Dubai",
    description: "Luxury waterfront residences with unparalleled views of Dubai Marina. Premium finishes and world-class amenities in the heart of Dubai.",
    price: "AED 12,500,000",
    badges: ["Marina View", "Premium Finishes", "Sky Lounge"],
    image: "/assets/images/home/about.jpg",
  },
  {
    title: "The Alba Residences",
    location: "Dorchester Collection, Dubai",
    description: "Ultra-luxury living managed by Dorchester Collection. Breathtaking sea views, private plunge pools, and bespoke concierge services.",
    price: "AED 15,800,000",
    badges: ["Infinity Pool", "Sky Terrace", "Beach Access"],
    image: "/assets/images/home/hero-bg.jpg",
  },
  {
    title: "Playa del Sol",
    location: "Beachfront Paradise, Dubai",
    description: "Island living perfected. Embrace a vibrant way of life where each moment is filled with pure serenity and the rhythm of island living.",
    price: "AED 9,750,000",
    badges: ["Ocean View", "Beach Access", "Resort Style"],
    image: "/assets/images/home/services.jpg",
  },
];

// ── Services (Home Page) ─────────────────────────────────────
export const services = [
  {
    icon: "building",
    title: "Real Estate Sales",
    description: "Discover our exclusive portfolio of high-end properties for sale. Each residence is meticulously selected for its prime location, luxury amenities, and exceptional investment potential.",
    bullets: [
      "Luxury Villas & Penthouses",
      "Waterfront Properties",
      "Investment Opportunities",
      "Off-Plan Developments",
      "Prime Location Estates"
    ],
    image: "/assets/images/home/about.jpg"
  },
  {
    icon: "key",
    title: "Property Rentals",
    description: "Short-term and long-term luxury rentals. We handle everything from listing and marketing to tenant screening and key handover, ensuring a seamless experience for landlords and tenants alike.",
    bullets: [
      "Long-Term Leases",
      "Short-Term Holiday Homes",
      "Tenant Screening",
      "Property Management",
      "Rental Yield Optimization"
    ],
    image: "/assets/images/home/hero-bg.jpg"
  },
  {
    icon: "palette",
    title: "Interior Design",
    description: "From concept to completion. Spaces designed to maximise rental yield and elevate lifestyle. Our award-winning designers create bespoke environments tailored to your taste and property architecture.",
    bullets: [
      "Bespoke Concept Design",
      "Space Planning & Layouts",
      "Material Selection",
      "Custom Furniture Sourcing",
      "Project Management"
    ],
    image: "/assets/images/home/services.jpg"
  },
  {
    icon: "sparkles",
    title: "Decoration",
    description: "Turnkey furnishing and staging that commands premium rents and faster closings. We transform empty spaces into captivating homes that appeal to high-net-worth buyers and premium tenants.",
    bullets: [
      "Turnkey Furnishing",
      "Home Staging for Sale",
      "Art & Accessory Curation",
      "Window Treatments",
      "Lighting Design"
    ],
    image: "/assets/images/home/about.jpg"
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
  titleTemplate: "%s | Monte Real Estate",
  defaultTitle: "Dubai Luxury Real Estate | Off-Plan Properties & Investments | Monte Real Estate",
  description: siteConfig.description,
  openGraph: {
    type: "website",
    locale: "en_AE",
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [
      {
        url: `${siteConfig.url}/images/og-default.jpg`,
        width: 1200,
        height: 630,
        alt: "Monte Real Estate - Dubai Luxury Properties",
      },
    ],
  },
};
