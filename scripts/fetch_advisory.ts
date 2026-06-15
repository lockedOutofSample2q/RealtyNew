import { createClient } from "@supabase/supabase-js";
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkAdvisory() {
  const { data, error } = await supabase
    .from("apartments")
    .select("expert_take")
    .eq("slug", "hero-homes-mohali-sector-88")
    .single();

  if (error) console.error(error);
  else console.log(JSON.stringify(data, null, 2));
}

checkAdvisory();
