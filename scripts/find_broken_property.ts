import { createClient } from "@supabase/supabase-js";
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

async function findBroken() {
  console.log("Searching apartments...");
  const { data: apartments, error: aptError } = await supabase.from("apartments").select("slug, title, unit_types");
  if (aptError) {
    console.error("Error fetching apartments:", aptError);
  } else {
    for (const apt of apartments || []) {
      if (apt.unit_types) {
        console.log(`Apartment [${apt.slug}]:`, JSON.stringify(apt.unit_types));
      }
    }
  }

  console.log("\nSearching houses...");
  const { data: houses, error: houseError } = await supabase.from("houses").select("slug, title, unit_types");
  if (houseError) {
    console.error("Error fetching houses:", houseError);
  } else {
    for (const house of houses || []) {
      if (house.unit_types) {
        console.log(`House [${house.slug}]:`, JSON.stringify(house.unit_types));
      }
    }
  }
}

findBroken();
