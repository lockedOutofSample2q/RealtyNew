import { createClient } from "@supabase/supabase-js";
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

const slug = "hero-homes-mohali-sector-88";

const newAmenities = [
  "Squash Court",
  "Swimming Pool and Toddler’s Pool",
  "Cricket Pitch",
  "Table Tennis",
  "Multi-indoor Games Facilities",
  "Multiple Kids Play Areas",
  "Yoga Centre",
  "Gym",
  "Spa and Jacuzzi",
  "Tennis Court & Basketball Court",
  "Skating Rink",
  "Terrace Area for Events",
  "Shopping Centre adjacent to the Clubhouse",
  "Board Games",
  "Billiards and Pool",
  "Mini Theater",
  "Open Roof Garden",
  "Elaborate Terrace Garden"
];

const newNearbyLocations = [
  { name: "Chandigarh International Airport", distance: "13 kms", time: 13, transport: "car" },
  { name: "Railway Station SAS Nagar", distance: "8 kms", time: 8, transport: "car" },
  { name: "ISBT Chandigarh", distance: "9 kms", time: 9, transport: "car" },
  { name: "Mini Secretariat", distance: "0 kms", time: 1, transport: "walk" },
  { name: "PCA Stadium", distance: "5 kms", time: 5, transport: "car" },
  { name: "Judicial Courts Complex", distance: "0.5 kms", time: 2, transport: "walk" },
  { name: "ISB & IISER", distance: "3 kms", time: 3, transport: "car" },
  { name: "Fortis Hospital", distance: "5 kms", time: 5, transport: "car" },
  { name: "North Country Mall", distance: "5 kms", time: 5, transport: "car" },
  { name: "Chandigarh Engg. College", distance: "2 kms", time: 2, transport: "car" },
  { name: "City Center (Sec-87)", distance: "0 kms", time: 1, transport: "walk" },
  { name: "VR Punjab Mall", distance: "8 kms", time: 8, transport: "car" }
];

const newUnitTypes = [
  { bhk: "2 BHK", size_min: 1095, size_max: 1095 },
  { bhk: "2 BHK + Study", size_min: 1290, size_max: 1290 },
  { bhk: "3 BHK", size_min: 1565, size_max: 1565 },
  { bhk: "3 BHK + Store", size_min: 1481, size_max: 1661 },
  { bhk: "3 BHK + 3WR + Store", size_min: 1661, size_max: 1661 },
  { bhk: "3 BHK + 3WR + Store + Utility", size_min: 1926, size_max: 1926 },
  { bhk: "3 BHK + Store + Servant", size_min: 1950, size_max: 1950 },
  { bhk: "3 BHK + 3T + Utility + Store", size_min: 2065, size_max: 2065 },
  // Keeping the previously discussed new types as well, to avoid losing them
  { bhk: "4 BHK + Servant", size_min: 3490, size_max: 3490 },
  { bhk: "4+1 BHK Penthouse", size_min: 4700, size_max: 4700 }
];

async function updateHeroData2() {
  const { data: existingData } = await supabase
    .from("apartments")
    .select("highlights")
    .eq("slug", slug)
    .single();

  const currentHighlights = existingData?.highlights || [];
  const newHighlights = [
    ...currentHighlights.filter((h: string) => !h.includes("Rera Registered") && !h.includes("Home loan approved")),
    "Rera Registered- (PBRERA-SAS81-PR0114)",
    "Home loan approved by SBI, PNB, HDFC and staff can avail dept loan from RBI."
  ];

  const { data, error } = await supabase
    .from("apartments")
    .update({
      amenities: newAmenities,
      nearby_landmarks: newNearbyLocations,
      unit_types: newUnitTypes,
      highlights: newHighlights,
      updated_at: new Date().toISOString()
    })
    .eq("slug", slug);

  if (error) {
    console.error("Error updating Hero Homes:", error);
  } else {
    console.log("Successfully replaced amenities, nearby locations, unit types, and highlights!");
  }
}

updateHeroData2();
