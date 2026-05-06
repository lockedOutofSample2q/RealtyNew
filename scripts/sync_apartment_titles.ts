import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
const supabase = createClient(supabaseUrl, serviceKey, { auth: { persistSession: false } });

async function syncTitles() {
  console.log("Fetching all apartments...");
  const { data: apartments, error: fetchError } = await supabase
    .from("apartments")
    .select("id, slug, title, og_title");

  if (fetchError) {
    console.error("Error fetching apartments:", fetchError);
    return;
  }

  console.log(`Found ${apartments.length} apartments.`);

  for (const apt of apartments) {
    if (apt.og_title && apt.og_title !== apt.title) {
      console.log(`Updating ${apt.slug}...`);
      console.log(`  Old Title: ${apt.title}`);
      console.log(`  New Title: ${apt.og_title}`);
      
      const { error: updateError } = await supabase
        .from("apartments")
        .update({ title: apt.og_title })
        .eq("id", apt.id);
        
      if (updateError) {
        console.error(`Failed to update ${apt.slug}:`, updateError);
      }
    } else {
      console.log(`Skipping ${apt.slug} - og_title is empty or already matches title.`);
    }
  }

  console.log("Finished syncing titles.");
}

syncTitles();
