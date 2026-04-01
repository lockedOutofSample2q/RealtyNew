// POST /api/seed-properties
// One-time seed endpoint — call once to insert 3 demo off-plan properties.
// DELETE this file after seeding.

import { createAdminClient } from "@/lib/supabase";
import { NextResponse } from "next/server";

const DEMO_PROPERTIES = [
  {
    title: "The Alba Residences",
    slug: "the-alba-residences",
    type: "apartment",
    status: "off-plan",
    listing_type: "off-plan",
    price: 2850000,
    price_currency: "AED",
    bedrooms: 2,
    bathrooms: 3,
    area_sqft: 1640,
    location: "Dubai Marina",
    community: "Dubai Marina",
    developer: "OMNIYAT",
    furnishing: "furnished",
    description: "Ultra-luxury living managed by Dorchester Collection. Breathtaking sea views, private plunge pools, and bespoke concierge services in the heart of Dubai Marina.",
    features: ["Sea View", "Private Pool", "Concierge", "Gym", "Spa", "Valet Parking"],
    images: [
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200",
      "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=1200",
    ],
    featured: true,
  },
  {
    title: "Creek Horizon Tower",
    slug: "creek-horizon-tower",
    type: "apartment",
    status: "off-plan",
    listing_type: "off-plan",
    price: 1490000,
    price_currency: "AED",
    bedrooms: 1,
    bathrooms: 2,
    area_sqft: 780,
    location: "Dubai Creek Harbour",
    community: "Creek Harbour",
    developer: "Emaar Properties",
    furnishing: "unfurnished",
    description: "Contemporary 1-bedroom residences overlooking the iconic Dubai Creek Tower. Premium finishes, smart home technology, and world-class amenities.",
    features: ["Creek View", "Smart Home", "Infinity Pool", "Rooftop Terrace", "Children's Play Area"],
    images: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200",
      "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=1200",
    ],
    featured: false,
  },
  {
    title: "Tilal Al Ghaf Villas",
    slug: "tilal-al-ghaf-villas",
    type: "villa",
    status: "off-plan",
    listing_type: "off-plan",
    price: 0,
    price_currency: "AED",
    bedrooms: 4,
    bathrooms: 5,
    area_sqft: 4200,
    location: "Tilal Al Ghaf",
    community: "Tilal Al Ghaf",
    developer: "Majid Al Futtaim",
    furnishing: "unfurnished",
    description: "Exclusive lakeside villas in Tilal Al Ghaf, Dubai's newest lifestyle destination. Private gardens, lagoon access, and resort-style amenities.",
    features: ["Lagoon Access", "Private Garden", "Maid's Room", "4-Car Garage", "Smart Home", "Community Pool"],
    images: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200",
    ],
    featured: true,
  },
];

export async function POST() {
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("properties")
      .upsert(DEMO_PROPERTIES, { onConflict: "slug" })
      .select();

    if (error) throw error;
    return NextResponse.json({ success: true, inserted: data?.length ?? 0 });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
