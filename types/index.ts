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
  type: "apartment" | "villa" | "penthouse" | "townhouse" | "studio" | "residential" | "commercial" | "agricultural" | "industrial" | "land" | "plot";
  status: "available" | "sold" | "rented" | "off-plan";
  listing_type: "sale" | "lands" | "properties";
  price: number;
  price_max?: number;
  price_currency: "INR" | "USD" | "CAD" | "AUD";
  bedrooms: number | null;
  bedrooms_max?: number | null;
  bathrooms: number;
  bathrooms_max?: number | null;
  area_sqft: number;
  area_sqft_max?: number;
  location: string;
  address?: string;
  community: string;
  developer: string;
  developer_website?: string;

  // Rich Apartment Forensics
  rera_number?: string;
  completion_date?: string;
  handover_date?: string;
  price_sqft_min?: number;
  price_sqft_max?: number;
  tower_count?: number;
  floor_count?: number;
  total_units?: number;
  project_area_acres?: number;

  transfer_trap_analysis?: string;
  lifestyle_tax_analysis?: string;
  maintenance_fee_psft?: number;
  utility_analysis?: string;

  unit_types?: Array<{
    bhk: string; // e.g. "3+1BHK"
    type_count?: number; // e.g. 5 (for "5 Types")
    size_min: number;
    size_max?: number;
    price?: string;
  }>;
  payment_plan_notes?: string;
  furnishing: "furnished" | "unfurnished" | "semi-furnished";
  description: string;
  meta_description?: string;
  features: string[];
  images: string[];
  featured_sections?: string[];
  image_count?: number;
  videos?: string[];
  featured: boolean;

  // Extended fields
  building_name?: string;
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

  // Split tables support
  entity_type?: "apartment" | "house" | "land";

  // Upcoming infrastructure
  upcoming_infrastructure?: string[];

  faqs?: Array<{ question: string; answer: string }>;

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
  apartment_id?: string;
  house_id?: string;
  land_id?: string;
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
    mapUrl: string;
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
  children?: { label: string; href: string }[];
}

// ── Search Filters ────────────────────────────────────────────
export interface PropertyFilters {
  listingType?: "sale" | "lands" | "properties";
  location?: string;
  propertyType?: string;
  bedrooms?: string;
  furnishing?: string;
  minPrice?: number;
  maxPrice?: number;
  currency?: "INR" | "USD" | "CAD" | "AUD";
}
