import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";
import path from "path";

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
  const slug = "jlpl-galaxy-heights-sector-66a-mohali";
  
  const faqs = [
    {
      question: "What are the lifestyle and connectivity advantages of living in JLPL Galaxy Heights?",
      answer: "JLPL Galaxy Heights offers unparalleled connectivity due to its prime location in Sector 66A, Mohali. It is situated right on the 200-foot-wide International Airport Road, providing seamless access to Chandigarh and major highways. Residents enjoy proximity to premium IT hubs like the Wipro SEZ, top educational institutions, and healthcare facilities. The community itself features beautifully landscaped greens, dedicated play areas, and a tranquil environment away from the city's hustle while remaining close to all modern conveniences."
    },
    {
      question: "Is JLPL Galaxy Heights a ready-to-move-in project or under construction?",
      answer: "JLPL Galaxy Heights is a completely ready-to-move-in residential project. It has been fully delivered by the developer and is currently operational with a high occupancy rate. Buyers can immediately move in or rent out their apartments without facing the uncertainties or delays often associated with under-construction properties."
    },
    {
      question: "What are the different 2 BHK floor plan configurations available?",
      answer: "The project offers a variety of 2 BHK layouts to suit different family needs. The floor plans start from a compact 710 sq. ft. design, which is ideal for small families or investors. There is also a mid-sized 850 sq. ft. layout offering better spatial distribution, and spacious 1045 to 1050 sq. ft. corner or premium units that provide extensive living areas, large balconies, and maximum natural light."
    },
    {
      question: "What are the monthly maintenance charges and what do they cover?",
      answer: "The monthly maintenance cost at JLPL Galaxy Heights is approximately ₹2.5 to ₹4 per square foot of the apartment's super area. These charges are essential for the upkeep of the premium amenities, including the 24/7 multi-tier security system, maintenance of the landscaped gardens, power backup, high-speed elevators, and the cleaning of all common residential areas."
    }
  ];

  const nearby_landmarks = [
    { name: "Manav Rachna International School", time: "5", transport: "car" },
    { name: "Wipro SEZ", time: "3", transport: "car" },
    { name: "Bestech Square Mall", time: "5", transport: "car" },
    { name: "Mohali Railway Station", time: "9", transport: "car" },
    { name: "CP67 Mall", time: "10", transport: "car" },
    { name: "ISBT 43 Chandigarh", time: "12", transport: "car" },
    { name: "International Airport", time: "15", transport: "car" },
  ];

  const updateData = {
    faqs: faqs,
    nearby_landmarks: nearby_landmarks
  };

  console.log(`Updating ${slug} FAQs...`);
  const { data, error } = await supabase
    .from("apartments")
    .update(updateData)
    .eq("slug", slug)
    .select();

  if (error) {
    console.error("Error updating property:", error);
  } else {
    console.log("Successfully updated FAQs for:", data?.[0]?.slug);
  }
}

main().catch(console.error);
