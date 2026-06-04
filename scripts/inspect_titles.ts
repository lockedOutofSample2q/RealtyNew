import { createClient } from "@supabase/supabase-js";
import * as fs from "fs";

// Load from .env.local
if (fs.existsSync(".env.local")) {
  const envFile = fs.readFileSync(".env.local", "utf8");
  envFile.split("\n").forEach((line) => {
    const [key, ...value] = line.split("=");
    if (key && value.length > 0) {
      process.env[key.trim()] = value.join("=").trim().replace(/^"|"$/g, "");
    }
  });
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

if (!supabaseUrl || !serviceKey) {
  console.error("Missing Supabase credentials");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceKey, { auth: { persistSession: false } });

async function inspectTitles() {
  console.log("--- APARTMENTS ---");
  const { data: apts, error: aptError } = await supabase.from("apartments").select("id, slug, title, bedrooms, location");
  if (aptError) {
    console.error("Error fetching apartments:", aptError);
  } else if (apts) {
    apts.forEach((apt) => {
      console.log(`[Apartment] Length: ${apt.title.length} | Slug: ${apt.slug} | Title: "${apt.title}"`);
    });
  }

  console.log("\n--- LANDS ---");
  const { data: lands, error: landError } = await supabase.from("lands").select("id, slug, title, location, community");
  if (landError) {
    console.error("Error fetching lands:", landError);
  } else if (lands) {
    lands.forEach((land) => {
      console.log(`[Land] Length: ${land.title.length} | Slug: ${land.slug} | Title: "${land.title}"`);
    });
  }
}

inspectTitles();
