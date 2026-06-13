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
    mapUrl: "https://maps.app.goo.gl/3xNnTgRUkC5eKcRG6",
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
  { 
    label: "Properties", 
    href: "/properties",
    children: [
      { label: "Flats in Mohali", href: "/properties/flats" },
      { label: "Houses in Mohali", href: "/properties/houses" },
      { label: "Plots & Land", href: "/properties/lands" },
    ]
  },
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

  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "List Property", href: "/list-your-property" },
];

// ── Footer Links ─────────────────────────────────────────────
export const footerLinks = {
  quick: [
    { label: "All Properties", href: "/properties" },
    { label: "Flats", href: "/properties/flats" },
    { label: "Houses", href: "/properties/houses" },
    { label: "Lands", href: "/properties/lands" },
    { label: "Market Blog", href: "/blog" },
    { label: "Site Directory", href: "/directory" },
  ],
  tools: [
    { label: "Mortgage Calculator", href: "/tools/mortgage-calculator" },
    { label: "Price Trends", href: "/tools/price-trend" },
    { label: "Loan Eligibility", href: "/tools/loan-eligibility" },
    { label: "Sector Maps", href: "/properties" },
  ],
  legal: [
    { label: "Builders", href: "/properties/builders" },
    { label: "FAQ", href: "/faq" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
  ],
};

// ── Hero Section ─────────────────────────────────────────────
// EDIT: Change the hero headline, subline, and background
export const heroContent = {
  headline: "Find Your Home\nin Mohali",
  subline:
    "Mohali real estate Investments and Luxury assets, curated for those who know exactly what they want.",
  ctaPrimary: { label: "Explore Properties", href: "/properties" },
  ctaSecondary: { label: "Talk to an Advisor", href: "/contact" },
  // Background image (place in /public/images/hero.jpg or use Supabase URL)
  backgroundImage: "/assets/images/home/hero.webp",
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
    title: "Marbella Royce",
    location: "IT City, Sector 82A, Mohali",
    description: "Palatial 3/4 BHK residences in the heart of IT City. Known for double-height ceilings, massive private decks, and an Olympic-sized swimming pool.",
    price: "INR 35,000,000",
    badges: ["Olympic Pool", "Private Decks", "Prime Sector"],
    image: "/assets/images/home/marbella-royce.avif",
  },
  {
    title: "Homeland Regalia",
    location: "Sector 77, Airport Road, Mohali",
    description: "Ultra-luxury landmark designed by Hafeez Contractor. Offers 90+ world-class amenities and 24/7 concierge services in Punjab's most powerful address.",
    price: "INR 25,000,000",
    badges: ["Hafeez Contractor", "90+ Amenities", "Sky Lounge"],
    image: "/assets/images/home/regalia.jpg",
  },
  {
    title: "Evoq Antalia",
    location: "Sector 66, Airport Road, Mohali",
    description: "An exclusive enclave of 180 apartments across 4.4 acres. Features a 50,000 sq. ft. Novotel-managed clubhouse and standard VRV air conditioning.",
    price: "INR 43,700,000",
    badges: ["Novotel Clubhouse", "VRV AC", "Low Density"],
    image: "/assets/images/home/evoq.webp",
  },
];

// ── Services (Home Page) ─────────────────────────────────────
export const services = [
  {
    title: "Property Advisory",
    description: "Independent evaluation of any property before you commit: developer track record, RERA verification, payment plan analysis, and honest shortlisting. I will tell you what I would do in your position, including when the answer is not to buy.",
    image: "/assets/images/home/real-estate-advisory-mohali.webp"
  },
  {
    title: "Land & Plot Advisory",
    description: "From GMADA plot allotment to agricultural land reinvestment after an acquisition payout: guidance on licensed vs unlicensed status, capital gains implications, and which land in which location makes financial sense for your specific situation.",
    image: "/assets/images/home/land-and-plot-investments-punjab.webp"
  },
  {
    title: "NRI & Remote Advisory",
    description: "End-to-end property advisory for NRI investors buying from the UK, Canada, Gulf, or Australia: FEMA compliance, POA structuring, video-verified site walkthroughs, and post-purchase support without you needing to be here.",
    image: "/assets/images/home/nri-property-consultant-india.webp"
  }
];

// ── FAQ (Home Page) ──────────────────────────────────────────
// EDIT: Add, remove, or edit FAQ items here.
export const faqs = [
  {
    question: "Can anyone buy property in Mohali, including people outside Punjab?",
    answer: "Yes, absolutely. Unlike certain states with restrictive agricultural land laws, there are no domicile or residency restrictions for purchasing residential or commercial property in Mohali, Punjab. Indian citizens from any state, Non-Resident Indians (NRIs), and Overseas Citizens of India (OCIs) can freely invest in flats, villas, and commercial plots here. For NRIs and OCIs, the transaction must strictly comply with Foreign Exchange Management Act (FEMA) guidelines. This means payments cannot be made via foreign currency or traveler's cheques; funds must be routed inward through normal banking channels or paid via balances held in NRE, NRO, or FCNR accounts. Agricultural land, farmhouse plots, and plantation property remain restricted for NRIs and foreign nationals unless inherited. The process for legally cleared, RERA-approved urban real estate in Mohali is highly streamlined, offering out-of-state investors and the global Punjabi diaspora a transparent, high-appreciation asset class without bureaucratic friction."
  },
  {
    question: "How does a pre-launch booking actually work, and what is the real risk?",
    answer: "In a pre-launch booking, investors secure units at a significantly discounted introductory price before formal construction or public marketing begins. Typically, this involves an upfront payment of 10% to 25%, with the remaining balance tied to a construction-linked payment plan (CLP). The financial upside is very real, often yielding substantial appreciation by the time possession is offered. However, the risk is equally substantial. The primary dangers include developer cash-flow mismanagement, delayed execution, and stalled regulatory approvals. This is why strict due diligence is non-negotiable. Before committing any capital to a pre-launch project in Mohali, you must meticulously verify the developer's historical delivery record, assess their debt-to-equity ratio, and confirm that all necessary GMADA approvals and RERA (Real Estate Regulatory Authority) registrations are fully secured. An authentic, verified pre-launch is an excellent wealth-building tool, but entering one blindly without an independent consultant's evaluation exposes your capital to unnecessary risk."
  },
  {
    question: "What should I do with a land acquisition payout in Punjab?",
    answer: "When you receive a substantial payout from a government land acquisition or highway expansion project in Punjab, your immediate priority should be strategic tax planning. Under Section 54F of the Income Tax Act, you have a strict 24-month window to reinvest those funds into residential property, or up to 36 months if you are constructing a new home, to legally avoid severe capital gains taxes. Until you finalize an investment, the funds must be parked securely in a designated Capital Gains Account Scheme (CGAS)—never in a standard fixed deposit, which loses purchasing power against inflation. Your reinvestment options, whether ranging from ₹50 lakh to over ₹5 crore, require careful allocation. Moving from agricultural land into high-yield commercial assets on Airport Road or licensed residential plots in GMADA-approved sectors requires an understanding of zoning laws, market liquidity, and rental yields. The goal is to transform a one-time payout into generational, tax-efficient wealth."
  },
  {
    question: "What returns can I realistically expect from Mohali real estate?",
    answer: "Realistic returns in Mohali depend entirely on the asset class and your entry timing. Historically, strategic growth corridors such as Airport Road, IT City, and Aerocity have delivered exceptional appreciation. For example, commercial units on Airport Road that were initially acquired for ₹3–4 crore a few years ago are now actively trading between ₹12–16 crore. Similarly, prime industrial land investments have seen values double from ₹18.70 lakh to over ₹45 lakh per vigha in short 6-to-12-month windows. However, these outsized returns belong to investors who acquire assets before the infrastructure matures, not after the market peaks. For residential assets like luxury apartments and builder floors, expect steady capital appreciation of 8% to 12% annually, supplemented by rental yields of 3% to 5%. Achieving these numbers requires strict avoidance of oversupplied sectors and prioritizing RERA-approved developments with strong connectivity to the upcoming Chandigarh international airport expansions and major highway networks."
  }
];

// ── SEO Defaults ─────────────────────────────────────────────
export const seoDefaults = {
  titleTemplate: "%s | Realty Holding and Management Consultants",
  defaultTitle: "Buy Flats & Land in Mohali | Realty Holding and Management Consultants",
  description: "Realty Holding & Management Consultants: Your trusted advisory for luxury flats, premium houses, and verified land investments in Mohali & Tricity.",
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
    headline: "Find Your Home\nin Mohali",
    subline: "Investments and luxury assets, curated for those who know exactly what they want.",
    backgroundImage: "/assets/images/home/hero.webp",
  }
};
