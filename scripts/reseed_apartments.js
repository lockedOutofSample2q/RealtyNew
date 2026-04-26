const { createClient } = require('@supabase/supabase-js');

async function reseed() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase credentials');
    process.exit(1);
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  const homelandRegaliaImages = [
    "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200",
    "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1200",
    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200",
    "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=1200",
    "https://images.unsplash.com/photo-1600585153490-76fb20a32601?w=1200",
    "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200",
    "https://images.unsplash.com/photo-1600585154526-990dced4ea0a?w=1200",
    "https://images.unsplash.com/photo-1600607688969-a5bfcd64bd28?w=1200",
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200"
  ];

  const apartments = [
    {
      title: "Homeland Regalia Ultra-Luxury 4 & 5 BHK",
      slug: "homeland-regalia-sector-77-mohali",
      type: "apartment",
      status: "off-plan",
      listing_type: "sale",
      price: 42000000,
      price_currency: "INR",
      bedrooms: 4,
      bedrooms_max: 5,
      bathrooms: 5,
      area_sqft: 3400,
      location: "Mohali",
      community: "Sector 77",
      building_name: "Homeland Regalia",
      developer: "Homeland Group",
      latitude: 30.696103744735183,
      longitude: 76.70589230394643,
      furnishing: "semi-furnished",
      description: "Homeland Regalia is the pinnacle of ultra-luxury in Mohali's Sector 77. Designed for the elite, these 4 and 5 BHK residences offer unmatched privacy, towering architecture, and panoramic views of the cityscape. Located directly on the Airport Road, it ensures instant access to Tricity's major hubs.",
      features: ["Smart Home Automation", "Private Elevators", "VRV Air Conditioning", "Grand Lobbies"],
      highlights: ["Airport Road frontage, Sector 77, Mohali", "Exclusive HNI community", "Unobstructed views", "Modern sanctuary"],
      amenities: ["Rooftop Infinity Pool", "State-of-the-art Gym", "Concierge Service", "Spa & Salon", "BBQ Area", "Kids Pool"],
      images: homelandRegaliaImages,
      agent_name: "Amritpal Singh",
      agent_phone: "+91 7814613916",
      agent_email: "hello@realtyconsultants.in",
      featured: true,
      featured_sections: ["home_hero", "home_latest"]
    },
    {
      title: "Marbella Grand IT City Premium Residences",
      slug: "marbella-grand-it-city-mohali-new",
      type: "apartment",
      status: "available",
      listing_type: "sale",
      price: 35000000,
      price_currency: "INR",
      bedrooms: 3,
      bedrooms_max: 5,
      bathrooms: 4,
      area_sqft: 2800,
      location: "Mohali",
      community: "IT City",
      building_name: "Marbella Grand",
      developer: "Marbella Group",
      latitude: 30.6655,
      longitude: 76.7322,
      furnishing: "semi-furnished",
      description: "Marbella Grand offers a unique blend of sophisticated design and modern luxury. These premium apartments are situated in the heart of IT City, Mohali, providing residents with world-class facilities and unmatched connectivity to the airport and business hubs.",
      features: ["Skywalk", "Expansive Clubhouses", "Italian Marble", "Smart Living"],
      highlights: ["IT City, Sector 82A, Mohali", "Prime Airport Road connectivity", "High-growth investment area", "Global design standards"],
      amenities: ["Swimming Pool", "Jogging Track", "Mini Theatre", "Tennis Court", "Dedicated Kids Area"],
      images: homelandRegaliaImages.slice(0, 8),
      agent_name: "Amritpal Singh",
      agent_phone: "+91 7814613916",
      agent_email: "hello@realtyconsultants.in",
      featured: true,
      featured_sections: ["home_latest"]
    },
    {
      title: "Noble Callista Luxury Lifestyle",
      slug: "noble-callista-sector-66b-mohali-new",
      type: "apartment",
      status: "off-plan",
      listing_type: "sale",
      price: 39000000,
      price_currency: "INR",
      bedrooms: 4,
      bedrooms_max: 5,
      bathrooms: 4,
      area_sqft: 3100,
      location: "Mohali",
      community: "Sector 66B",
      building_name: "Noble Callista",
      developer: "Noble Ventures",
      latitude: 30.6721,
      longitude: 76.7451,
      furnishing: "semi-furnished",
      description: "Experience the zenith of elegant living at Noble Callista. These carefully crafted residences offer panoramic views, high-end amenities, and a sustainable living environment in one of Mohali's most sought-after sectors.",
      features: ["Green Building", "Double Height Lobbies", "Grand Entrance"],
      highlights: ["Sector 66B, IT City Road, Mohali", "Immediate Airport access", "Elite neighborhood", "Secure gated community"],
      amenities: ["Infinity Pool", "Business Lounge", "Sauna", "Spa", "Yoga Area"],
      images: homelandRegaliaImages.slice(2, 10),
      agent_name: "Amritpal Singh",
      agent_phone: "+91 7814613916",
      agent_email: "hello@realtyconsultants.in",
      featured: false
    }
  ];

  console.log('Adding individual apartment listings to Supabase...');

  const { error } = await supabase
    .from('apartments')
    .insert(apartments);

  if (error) {
    console.error('Error inserting apartments:', error);
    process.exit(1);
  }

  console.log('Successfully added individual apartment listings.');
}

reseed();
