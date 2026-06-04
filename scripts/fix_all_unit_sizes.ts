import { createClient } from "@supabase/supabase-js";
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

const updates = [
  {
    slug: "hero-homes",
    unit_types: [
      { bhk: "3 BHK", size_min: 1290, size_max: 1661, type_count: 5 },
      { bhk: "4 BHK", size_min: 2326, size_max: 2500, type_count: 5 }
    ]
  },
  {
    slug: "ambika-la-parisian",
    unit_types: [
      { bhk: "2 BHK + Study", size_min: 1455, type_count: 5 },
      { bhk: "3 BHK", size_min: 1785, type_count: 5 },
      { bhk: "3 BHK + Servant", size_min: 2217, type_count: 5 }
    ]
  },
  {
    slug: "jubilee-city-gardens",
    unit_types: [
      { bhk: "1 BHK", size_min: 802, type_count: 5 },
      { bhk: "3 BHK", size_min: 1500, type_count: 5 }
    ]
  },
  {
    slug: "marbella-royce",
    unit_types: [
      { bhk: "4 BHK", size_min: 3120, size_max: 3300, type_count: 5 },
      { bhk: "5 BHK", size_min: 4123, size_max: 4300, type_count: 5 }
    ]
  },
  {
    slug: "marbella-grand",
    unit_types: [
      { bhk: "3 BHK + Servant", size_min: 2601, type_count: 5 },
      { bhk: "4 BHK + Servant", size_min: 3672, type_count: 5 },
      { bhk: "5 BHK", size_min: 7111, type_count: 5 },
      { bhk: "Penthouse", size_min: 5000, size_max: 7111, type_count: 2 }
    ]
  },
  {
    slug: "joy-grand",
    unit_types: [
      { bhk: "3+1 BHK", size_min: 2866, size_max: 3192, type_count: 5 },
      { bhk: "4+1 BHK", size_min: 3667, size_max: 4055, type_count: 5 }
    ]
  }
];

async function runFixes() {
  console.log("Starting unit_types data fix...");
  for (const item of updates) {
    console.log(`Updating unit_types for ${item.slug}...`);
    const { data, error } = await supabase
      .from("apartments")
      .update({ unit_types: item.unit_types as any })
      .eq("slug", item.slug);

    if (error) {
      console.error(`Error updating ${item.slug}:`, error.message);
    } else {
      console.log(`Successfully updated ${item.slug}`);
    }
  }
  console.log("All unit_types fixes complete!");
}

runFixes();
