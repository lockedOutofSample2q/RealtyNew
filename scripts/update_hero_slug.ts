import { createClient } from "@supabase/supabase-js";
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

async function updateSlug() {
  const { data, error } = await supabase
    .from("apartments")
    .update({ slug: "hero-homes-mohali-sector-88", updated_at: new Date().toISOString() })
    .eq("slug", "hero-homes");

  if (error) console.error("Error:", error);
  else console.log("Success updating slug");
}
updateSlug();
