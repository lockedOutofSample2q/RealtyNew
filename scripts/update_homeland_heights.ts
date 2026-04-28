import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

const descriptionText = `Homeland Heights represents the most significant vertical asset in the Mohali micro-market. Situated at the strategic convergence of the 200ft Himalaya Marg (Airport Road) and Sector 70, the project serves as a socio-economic anchor for the region. Developed on GMADA-auctioned land, the project carries a clean title profile, a rarity in the Punjab high-rise segment. Designed by the internationally acclaimed Hafeez Contractor, the architecture utilizes a contemporary oval-elevation silhouette that minimizes wind resistance while maximizing the "Skyline Identity" of the occupants.

Acoustic & Privacy Hierarchy:
Our field analysis identifies a distinct value hierarchy within the five towers. Towers 4 and 5 are identified as the "Prime Quiet Zones." Being buffered by the SCL Society and the Jubilee Walk commercial block, these towers experience significantly lower decibel levels compared to Towers 1, 2, and 3, which maintain high visibility facing the Himalaya Marg.

Resident Logistical Strategy:
While the primary access point faces the main Airport Road, peak-hour congestion at the Mataur junction is a reality. Savvy residents utilize the service lane on the Jubilee Walk road. Although narrow, it provides a crucial bypass into the internal sector linking roads, allowing for seamless navigation to Chandigarh without being tethered to the Airport Road's heavy logistics traffic.

**Brochure:** https://www.homelandgroup.org/wp-content/uploads/2022/01/homeland-heights-6926_compressed.pdf`;

const highlights = [
  "Architectural Pedigree: Designed by Hafeez Contractor; Landscaping by Taib Studios (Singapore).",
  "Structural Integrity: Earthquake-resistant RCC Framed Structure with premium toughened glass glazing.",
  "Density Profile: Low-density G+17 configuration with only 276 total units across 5 towers.",
  "Title Security: 100% GMADA-auctioned land with PBRERA-MHL-250-2020 certification.",
  "Social Capital: Famously regarded as the 'Billionaires Club,' hosting the region's top industrial and media personalities."
];

const unit_types = [
  { bhk: "3 BHK + Servant", size_min: 1788, size_max: 1982, price: "₹2.85 Cr – ₹3.25 Cr" },
  { bhk: "4 BHK + Servant", size_min: 2409, size_max: 4310, price: "₹4.10 Cr – ₹6.80 Cr" },
  { bhk: "Ultra-Luxury Penthouses", size_min: 4057, price: "₹7.25 Cr+" }
];

const amenities = [
  "Clubhouse (50,000+ Sq. Ft.)",
  "Mini Theatre",
  "Squash Court",
  "Tennis Court",
  "Gymnasium",
  "Dispensary",
  "ATM",
  "Grocery"
];

async function updateProperty() {
  const { error } = await supabase
    .from("apartments")
    .update({
      title: "Homeland Heights Sector 70 Mohali | 2026 Resale Inventory & Asset Report",
      description: descriptionText,
      highlights: highlights,
      unit_types: unit_types as any,
      amenities: amenities,
      latitude: 30.7011,
      longitude: 76.7115,
      maintenance_fee_psft: 4.00,
      tower_count: 5,
      floor_count: 17,
      total_units: 276
    })
    .eq("slug", "homeland-heights-mohali");

  if (error) {
    console.error("Error updating property:", error);
  } else {
    console.log("Successfully updated Homeland Heights in apartments table!");
  }
}

updateProperty();
