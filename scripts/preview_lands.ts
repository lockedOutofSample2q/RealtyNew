import { createClient } from "@supabase/supabase-js";
import * as fs from "fs";

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

const supabase = createClient(supabaseUrl, serviceKey, { auth: { persistSession: false } });

async function preview() {
  const { data: lands } = await supabase.from("lands").select("id, slug, title, og_title, location, community, zoning");
  if (lands) {
    lands.forEach((l) => {
      console.log(`Slug: ${l.slug}\n  Title: "${l.title}"\n  OG Title: "${l.og_title}"\n  Loc: "${l.location}"\n  Comm: "${l.community}"\n  Zoning: "${l.zoning}"`);
    });
  }
}
preview();
