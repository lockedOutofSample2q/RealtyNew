// types/index.ts - TEST EDIT

export interface NearbyLandmark {
  name: string;
  time: number;
  transport: "car" | "walk" | "metro" | "bus";
}

export interface PaymentPlan {
  down_payment: number;
  during_construction: number;
  on_handover: number;
}

export interface PropertyDocument {
  name: string;
  url?: string;
  coming_soon?: boolean;
}

// ── Property ─────────────────────────────────────────────────
export interface Agent {
  id: string;
  name: string;
  title?: string;
  email?: string;
  phone?: string;
  photo_url?: string;
  languages?: string[];
  bio?: string;
  active?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface Property {
  id: string;
  title: string;
  slug: string;
  type: "apartment" | "villa" | "penthouse" | "townhouse" | "studio";
  status: "available" | "sold" | "rented" | "off-plan";
  listing_type: "sale" | "rent" | "off-plan";
  price: number;
  price_currency: "AED" | "USD" | "EUR";
  bedrooms: number | null;
  bedrooms_max?: number | null;
  bathrooms: number;
  area_sqft: number;
  location: string;
  community: string;
  developer?: string;
  developer_website?: string;
  furnishing: "furnished" | "unfurnished" | "semi-furnished";
  description: string;
  features: string[];
  images: string[];
  image_count?: number;
  videos?: string[];
  featured: boolean;

  // Extended fields
  building_name?: string;
  address?: string;
  highlights?: string[];
  amenities?: string[];
  amenities_gallery?: string[];
  interior_features?: string[];
  nearby_landmarks?: NearbyLandmark[];
  latitude?: number;
  longitude?: number;
  payment_plan?: PaymentPlan;
  documents?: PropertyDocument[];
  unit_types_image?: string;
  unit_types_coming_soon?: boolean;

  // Agent
  agent_id?: string;
  agent_name?: string;
  agent_title?: string;
  agent_email?: string;
  agent_phone?: string;
  agent_photo?: string;
  agent_languages?: string[];

  // Upcoming infrastructure
  upcoming_infrastructure?: string[];

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
  property_id?: string;
  status: "new" | "contacted" | "qualified" | "closed";
  created_at: string;
}

// ── Blog (from Contentlayer) ─────────────────────────────────
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
    calendly?: string;
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
