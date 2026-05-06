import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
const supabase = createClient(supabaseUrl, serviceKey, { auth: { persistSession: false } });

async function checkTags() {
  console.log("Fetching a few apartments...");
  const { data: apts } = await supabase
    .from("apartments")
    .select("slug, og_title, og_description")
    .neq("slug", "homeland-regalia-mohali")
    .limit(3);

  console.log(JSON.stringify(apts, null, 2));

  console.log("\nFetching a few lands...");
  const { data: lands } = await supabase
    .from("lands")
    .select("slug, og_title, og_description")
    .limit(3);

  console.log(JSON.stringify(lands, null, 2));
}

checkTags();
