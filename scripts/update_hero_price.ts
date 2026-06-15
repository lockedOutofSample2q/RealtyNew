import { createClient } from "@supabase/supabase-js";
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

async function updateHeroPrices() {
  const slug = "hero-homes";
  
  // 1290 sqft is the minimum size from unit types
  // 4700 sqft is the max size
  // Current rate: ₹10,500/sqft
  // Upcoming rate: ₹12,000/sqft
  
  const newPrice = 1290 * 10500; // 13,545,000
  const newPriceMax = 4700 * 12000; // 56,400,000 (or we could use 10500 for 49,350,000)

  const { data, error } = await supabase
    .from("apartments")
    .update({
      price: newPrice,
      price_max: newPriceMax,
      updated_at: new Date().toISOString()
    })
    .eq("slug", slug);

  if (error) {
    console.error("Error updating prices:", error);
  } else {
    console.log(`Successfully updated prices! Min: ₹${newPrice}, Max: ₹${newPriceMax}`);
  }
}

updateHeroPrices();
