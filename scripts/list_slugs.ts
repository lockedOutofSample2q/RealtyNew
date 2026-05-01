import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

async function listProperties() {
  const { data: apartments } = await supabase.from("apartments").select("slug, title");
  const { data: houses } = await supabase.from("houses").select("slug, title");
  const { data: lands } = await supabase.from("lands").select("slug, title");

  console.log("Apartments:", JSON.stringify(apartments, null, 2));
  console.log("Houses:", JSON.stringify(houses, null, 2));
  console.log("Lands:", JSON.stringify(lands, null, 2));
}

listProperties();
