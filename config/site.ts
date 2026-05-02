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
    address: "Phase 8A, E328, Industrial Area, Sector 75, Sahibzada Ajit Singh Nagar, Punjab 160055",
    mapUrl: "https://www.google.com/maps?q=30.697598112132287,76.69033031116615",
  },

  social: {
    instagram: "https://instagram.com/amritrealty",
    facebook: "https://facebook.com/amritrealty",
    linkedin: "https://in.linkedin.com/company/reality-holding-and-management-consultants",
    youtube: "https://www.youtube.com/@AmritRealty",
  },
};

// ── Navigation Items ─────────────────────────────────────────
// EDIT: Add, remove, or reorder nav items here.
export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Properties", href: "/properties" },
  { label: "Blog", href: "/blog" },
  {
    label: "Tools",
    href: "/tools",
    children: [
      { label: "Mortgage Calculator", href: "/tools/mortgage-calculator" },
      { label: "Price Trends", href: "/tools/price-trend" },
      { label: "Loan Eligibility", href: "/tools/loan-eligibility" },
      { label: "Sector Maps", href: "/properties" },
    ]
  },
  { label: "Guides", href: "/guides" },

  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "List Property", href: "/list-your-property" },
];

// ── Footer Links ─────────────────────────────────────────────
export const footerLinks = {
  quick: [
    { label: "Properties", href: "/properties" },
    { label: "Flats", href: "/apartments" },
    { label: "Houses", href: "/houses" },
    { label: "Lands", href: "/properties?tab=lands" },
    { label: "Market Blog", href: "/blog" },
  ],
  tools: [
    { label: "Mortgage Calculator", href: "/tools/mortgage-calculator" },
    { label: "Price Trends", href: "/tools/price-trend" },
    { label: "Loan Eligibility", href: "/tools/loan-eligibility" },
    { label: "Sector Maps", href: "/properties" },
  ],
  legal: [
    { label: "FAQ", href: "/faq" },
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
    "Mohali real estate Investments and Luxury assets, curated for those who know exactly what they want.",
  ctaPrimary: { label: "Explore Properties", href: "/properties" },
  ctaSecondary: { label: "Talk to an Advisor", href: "/contact" },
  // Background image (place in /public/images/hero.jpg or use Supabase URL)
  backgroundImage: "/assets/images/home/hero.jpg",
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
    price: "INR 12,500,000",
    badges: ["Marina View", "Premium Finishes", "Sky Lounge"],
    image: "/assets/images/home/about.jpg",
  },
  {
    title: "The Alba Residences",
    location: "Dorchester Collection, Dubai",
    description: "Ultra-luxury living managed by Dorchester Collection. Breathtaking sea views, private plunge pools, and bespoke concierge services.",
    price: "INR 15,800,000",
    badges: ["Infinity Pool", "Sky Terrace", "Beach Access"],
    image: "/assets/images/home/hero-bg.jpg",
  },
  {
    title: "Playa del Sol",
    location: "Beachfront Paradise, Dubai",
    description: "Island living perfected. Embrace a vibrant way of life where each moment is filled with pure serenity and the rhythm of island living.",
    price: "INR 9,750,000",
    badges: ["Ocean View", "Beach Access", "Resort Style"],
    image: "/assets/images/home/services.jpg",
  },
];

// ── Services (Home Page) ─────────────────────────────────────
export const services = [
  {
    title: "Property Advisory",
    description: "Independent evaluation of any property before you commit: developer track record, RERA verification, payment plan analysis, and honest shortlisting. I will tell you what I would do in your position, including when the answer is not to buy.",
    image: "/assets/images/home/about.jpg"
  },
  {
    title: "Land & Plot Advisory",
    description: "From GMADA plot allotment to agricultural land reinvestment after an acquisition payout: guidance on licensed vs unlicensed status, capital gains implications, and which land in which location makes financial sense for your specific situation.",
    image: "/assets/images/home/hero-bg.jpg"
  },
  {
    title: "NRI & Remote Advisory",
    description: "End-to-end property advisory for NRI investors buying from the UK, Canada, Gulf, or Australia: FEMA compliance, POA structuring, video-verified site walkthroughs, and post-purchase support without you needing to be here.",
    image: "/assets/images/home/services.jpg"
  }
];

// ── FAQ (Home Page) ──────────────────────────────────────────
// EDIT: Add, remove, or edit FAQ items here.
export const faqs = [
  {
    question: "Can anyone buy property in Mohali, including people outside Punjab?",
    answer: "Yes. There are no residency or domicile restrictions on buying property in Mohali or Punjab. Indian residents from any state, NRIs, and in certain cases foreign nationals can purchase here. NRIs must route payment through an NRO or NRE account and comply with FEMA guidelines. The process is straightforward with the right preparation."
  },
  {
    question: "How does a pre-launch booking actually work, and what is the real risk?",
    answer: "In a pre-launch, you book at an early price before construction begins, typically paying 25% upfront with the balance on a construction-linked schedule. The discount over possession-stage pricing is real. So is the risk. Developer cash flow health, RERA registration status, approval completeness, and past delivery record all need to be verified before paying a single rupee. I evaluate all of these before I recommend a pre-launch to any client."
  },
  {
    question: "What should I do with a land acquisition payout in Punjab?",
    answer: "The 24-month capital gains reinvestment window under Section 54F gives you time to make a considered decision. Not unlimited time. The money should be parked in a Capital Gains Account Scheme while you decide, not in an FD that looks safe but loses value in real terms after inflation. The options from ₹50 lakh to ₹5 crore are genuinely different, and which one makes sense depends on your goals, your family's needs, and the specific market conditions right now. This is exactly the kind of conversation we have in a free consultation."
  },
  {
    question: "What returns can I realistically expect from Mohali real estate?",
    answer: "In growth corridors like Phase 8A, E328, Industrial Area, Sector 75, Sahibzada Ajit Singh Nagar, Punjab 160055, the Airport Road commercial belt, and the Bharatmala-linked industrial zones near Rajpura, appreciation has been significant. Commercial units on Airport Road that were available at ₹3–4 crore some years ago now trade at ₹12–16 crore. Industrial land purchased at ₹18.70 lakh per vigha was valued at ₹45 lakh per vigha six months later. But these outcomes came from buying before the infrastructure was visible. Not after. I will tell you where the next vision corridor is, and I will tell you when I think a market is overpriced. Both equally."
  }
];

// ── SEO Defaults ─────────────────────────────────────────────
export const seoDefaults = {
  titleTemplate: "%s | Realty Holding and Management Consultants",
  defaultTitle: "Realty Holding and Management Consultants for all Mohali realestate needs",
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
        alt: "Realty Holding and Management Consultants, Mohali",
      },
    ],
  },
};


export const homeCarousels = {
  properties: {
    title: "Properties Worth Looking At",
    subtitle: "A curated selection of verified residential and commercial listings across Mohali and Tricity: pre-launch, resale, and ready possession."
  },
  lands: {
    title: "Land Listings in Punjab",
    subtitle: "GMADA plots, licensed residential plots, and agricultural land across Mohali, lifestyle meritorious, and resale liquidity."
  }
};

// ── Properties Page ──────────────────────────────────────────
export const propertiesPage = {
  metadata: {
    title: "Properties in Mohali and Tricity: Verified, Evaluated, Honestly Presented",
    description: "Verified property listings in Mohali and Tricity: pre-launch, resale, and ready possession. Evaluated for RERA compliance, developer track record, and fair pricing.",
  },
  hero: {
    headline: "Find Your Place\nin Mohali",
    subline: "Investments and luxury assets, curated for those who know exactly what they want.",
    backgroundImage: "/assets/images/home/hero.jpg",
  }
};
