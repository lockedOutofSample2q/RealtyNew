import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

const slug = "homeland-heights-mohali";

const description = `Homeland Heights represents the most significant vertical asset in the Mohali micro-market. Situated at the strategic convergence of the 200ft Himalaya Marg (Airport Road) and Sector 70, the project serves as a socio-economic anchor for the region. Developed on GMADA-auctioned land, the project carries a clean title profile, a rarity in the Punjab high-rise segment. Designed by the internationally acclaimed Hafeez Contractor, the architecture utilizes a contemporary oval-elevation silhouette that minimizes wind resistance while maximizing the "Skyline Identity" of the occupants.

Acoustic & Privacy Hierarchy:
Our field analysis identifies a distinct value hierarchy within the five towers. Towers 4 and 5 are identified as the "Prime Quiet Zones." Being buffered by the SCL Society and the Jubilee Walk commercial block, these towers experience significantly lower decibel levels compared to Towers 1, 2, and 3, which maintain high visibility facing the Himalaya Marg.

Resident Logistical Strategy:
While the primary access point faces the main Airport Road, peak-hour congestion at the Mataur junction is a reality. Savvy residents utilize the service lane on the Jubilee Walk road. Although narrow, it provides a crucial bypass into the internal sector linking roads, allowing for seamless navigation to Chandigarh without being tethered to the Airport Road's heavy logistics traffic.`;

const highlights = [
  "Designed by Hafeez Contractor",
  "Earthquake-resistant RCC Framed Structure",
  "Low-density G+17 configuration (276 units)",
  "100% GMADA-auctioned land",
  "Regarded as the region's 'Billionaires Club'"
];

const unit_types = [
  { bhk: "3 BHK + Servant", size_min: 1788, size_max: 1982, price: "₹2.85 Cr – ₹3.25 Cr" },
  { bhk: "4 BHK + Servant", size_min: 2409, size_max: 4310, price: "₹4.10 Cr – ₹6.80 Cr" },
  { bhk: "Ultra-Luxury Penthouses", size_min: 4057, price: "₹7.25 Cr+" }
];

const faqs = [
  { 
    question: "Is Homeland Heights Mohali a secure investment for 2026?", 
    answer: "Yes. Given its zero-litigation GMADA land status and its position at the gateway of Mohali, it remains the most liquid high-rise asset in the secondary market." 
  },
  { 
    question: "What is the actual maintenance cost at Homeland Heights?", 
    answer: "Currently, maintenance is pegged at ₹4.00 per sq. ft., which is higher than Sector 70 averages but justified by the 50,000 sq. ft. clubhouse and hospitality-grade facility management." 
  },
  { 
    question: "How does the 'Transfer Trap' affect resales here?", 
    answer: "Unlike many cooperative societies in Mohali, Homeland is a direct allotment project. Transfers are streamlined through GMADA/RERA protocols, avoiding the multi-year litigation risks found in aging cooperative assets." 
  }
];

const nearby_landmarks = [
  { name: "Jubilee Walk (Commercial Hub)", time: 2, transport: "walk" },
  { name: "Fortis Hospital", time: 5, transport: "car" },
  { name: "PCA Cricket Stadium", time: 8, transport: "car" },
  { name: "Chandigarh International Airport", time: 15, transport: "car" },
  { name: "Chandigarh Sector 17", time: 12, transport: "car" }
];

const upcoming_infrastructure = [
  "Sector 70-71 Roundabout Expansion: GMADA plans for a signal-free corridor to ease Airport Road peak traffic.",
  "Smart City Integration: Installation of the centralized Mohali command center for enhanced surveillance.",
  "PR-7 Connection: Future flyover links scheduled to reduce travel time to Aerocity by 7 minutes."
];

const images = [
  "/assets/images/apartments/homeland-heights/Homeland heights Mohali - realty holding and management consultants 1.jpg",
  "/assets/images/apartments/homeland-heights/Homeland heights Mohali - realty holding and management consultants 2.jpg",
  "/assets/images/apartments/homeland-heights/Homeland heights Mohali - realty holding and management consultants 3.jpg",
  "/assets/images/apartments/homeland-heights/Homeland heights Mohali - realty holding and management consultants 4.jpg",
  "/assets/images/apartments/homeland-heights/Homeland heights Mohali - realty holding and management consultants 5.jpg",
  "/assets/images/apartments/homeland-heights/Homeland heights Mohali - realty holding and management consultants 6.jpg",
  "/assets/images/apartments/homeland-heights/Homeland heights Mohali - realty holding and management consultants 7.jpg",
  "/assets/images/apartments/homeland-heights/Homeland heights Mohali - realty holding and management consultants 8.jpg",
  "/assets/images/apartments/homeland-heights/Homeland heights Mohali - realty holding and management consultants 9.jpg"
];

const documents = [
  { name: "Official Brochure", url: "https://www.homelandgroup.org/wp-content/uploads/2022/01/homeland-heights-6926_compressed.pdf" },
  { name: "Floor Plans (Full Set)", coming_soon: true },
  { name: "Technical Specifications", coming_soon: true }
];

async function updateHomelandHeights() {
  console.log(`Starting update for ${slug}...`);

  const { data, error } = await supabase
    .from("apartments")
    .update({
      title: "Homeland Heights Sector 70 Mohali | 2026 Resale Inventory & Asset Report",
      meta_description: "Verified listing for Homeland Heights Mohali. Explore 3/4 BHK premium inventory in Sector 70. Featuring forensic tower analysis, 2026 resale trends, and resident-only transit hacks.",
      description: description,
      address: "Himalaya Marg, Sector 70, Mohali, Punjab 160071",
      developer: "Homeland Group",
      developer_website: "https://www.homelandgroup.org",
      highlights: highlights,
      images: images,
      unit_types: unit_types as any,
      faqs: faqs as any,
      nearby_landmarks: nearby_landmarks as any,
      upcoming_infrastructure: upcoming_infrastructure,
      documents: documents as any,
      maintenance_fee_psft: 4.00,
      tower_count: 5,
      floor_count: 17,
      total_units: 276,
      latitude: 30.7011,
      longitude: 76.7115,
      status: "available", // Set to available for display
      listing_type: "sale",
      type: "apartment"
    })
    .eq("slug", slug);

  if (error) {
    console.error("Error updating Homeland Heights:", error);
  } else {
    console.log("Successfully updated Homeland Heights with full data!");
  }
}

updateHomelandHeights();
