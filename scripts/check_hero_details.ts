import { createClient } from "@supabase/supabase-js";
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

async function fixUnitsAndCheck() {
  const slug = "hero-homes-mohali-sector-88";

  // First fetch current data
  const { data: existingData } = await supabase
    .from("apartments")
    .select("unit_types, description, faqs")
    .eq("slug", slug)
    .single();

  console.log("DESCRIPTION:", existingData?.description);
  console.log("FAQS:", JSON.stringify(existingData?.faqs, null, 2));

  // The user says "don't add a range to 3bhk+store. use the value i gave recently and remove any prev value"
  // Let's filter out 3 BHK + Store and only keep the recent one 
  const oldUnitTypes = existingData?.unit_types || [];
  
  // They said use the value I gave recently. Recent was 1661 sqft.
  const newUnitTypes = oldUnitTypes.filter((u: any) => u.bhk !== "3 BHK + Store");
  newUnitTypes.push({ bhk: "3 BHK + Store", size_min: 1661, size_max: 1661 });
  
  // update
  const { error } = await supabase
    .from("apartments")
    .update({ unit_types: newUnitTypes })
    .eq("slug", slug);

  if (error) console.error("Error updating unit types:", error);
  else console.log("Updated 3 BHK + Store to exactly 1661 sqft.");
}

fixUnitsAndCheck();
