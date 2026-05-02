import { createClient } from "@supabase/supabase-js";
import * as fs from "fs";
import * as path from "path";

// Manually parse .env.local
const envPath = path.join(process.cwd(), ".env.local");
const envContent = fs.readFileSync(envPath, "utf-8");
const env: Record<string, string> = {};
envContent.split("\n").forEach(line => {
  const match = line.match(/^([^#=]+)=(.*)$/);
  if (match) {
    env[match[1].trim()] = match[2].trim();
  }
});

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase URL or Service Role Key in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const newLand = {
  title: "Prime Land at Cholta Khurd, Kurali Bypass Corridor",
  slug: "land-kurali-bypass-cholta-khurd",
  type: "agricultural",
  status: "available",
  listing_type: "lands",
  price: 0,
  price_currency: "INR",
  area_sqft: 43560,
  location: "Cholta Khurd, Kurali Bypass Corridor",
  community: "Kurali",
  developer: "Independent",
  description: "Strategically located land parcel on the Kurali Bypass Corridor near Office Cholta Khurd. Ideal for investment or agricultural use with excellent highway connectivity.",
  images: ["/images/lands/kurali-bypass-cholta-khurd.png"],
  latitude: 30.712041644018132,
  longitude: 76.5998653208568,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString()
};

async function addLand() {
  console.log("Adding land to Supabase...");
  
  const { data, error } = await supabase
    .from("lands")
    .upsert(newLand, { onConflict: "slug" })
    .select();

  if (error) {
    console.error("Error adding land:", error);
  } else {
    console.log("Successfully added land:", data);
  }
}

addLand();

