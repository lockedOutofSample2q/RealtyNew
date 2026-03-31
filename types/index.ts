// types/index.ts
// ============================================================
// SHARED TYPE DEFINITIONS
// Add new types here as the project grows.
// ============================================================

// ── Property ─────────────────────────────────────────────────
export interface Property {
  id: string;
  title: string;
  slug: string;
  type: "apartment" | "villa" | "penthouse" | "townhouse" | "studio";
  status: "available" | "sold" | "rented" | "off-plan";
  listing_type: "sale" | "rent" | "off-plan";
  price: number;
  price_currency: "AED" | "USD" | "EUR";
  bedrooms: number | null; // null = studio
  bathrooms: number;
  area_sqft: number;
  location: string;
  community: string;
  developer?: string;
  furnishing: "furnished" | "unfurnished" | "semi-furnished";
  description: string;
  features: string[];
  images: string[]; // array of Supabase storage URLs
  featured: boolean;
  created_at: string;
  updated_at: string;
}

// ── Lead / Inquiry ───────────────────────────────────────────
export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  message?: string;
  source: "contact" | "property" | "list-property" | "newsletter" | "relocation";
  property_id?: string; // if inquiry about specific property
  status: "new" | "contacted" | "qualified" | "closed";
  created_at: string;
}

// ── Blog (from Contentlayer) ─────────────────────────────────
// Contentlayer auto-generates these from MDX frontmatter.
// This is a manual mirror for non-Contentlayer use.
export interface BlogPost {
  title: string;
  slug: string;
  url: string;
  date: string;
  excerpt: string;
  author: string;
  category: BlogCategory;
  coverImage: string;
  featured: boolean;
  tags: string[];
  readingTime: string;
  body: { raw: string; html: string };
}

export type BlogCategory =
  | "Market Insights"
  | "Off Plan"
  | "Rentals"
  | "Investment"
  | "Lifestyle"
  | "News";

// ── Site Config ───────────────────────────────────────────────
export interface SiteConfig {
  name: string;
  tagline: string;
  description: string;
  url: string;
  contact: {
    phone: string;
    email: string;
    address: string;
    whatsapp: string;
  };
  social: {
    instagram?: string;
    facebook?: string;
    linkedin?: string;
    youtube?: string;
  };
}

// ── Navigation ────────────────────────────────────────────────
export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

// ── Search Filters ────────────────────────────────────────────
export interface PropertyFilters {
  listingType?: "sale" | "rent" | "off-plan";
  location?: string;
  propertyType?: string;
  bedrooms?: string;
  furnishing?: string;
  minPrice?: number;
  maxPrice?: number;
  currency?: "AED" | "USD" | "EUR";
}
