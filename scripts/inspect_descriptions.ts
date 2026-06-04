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

async function inspectDescriptions() {
  const { data: apts } = await supabase.from("apartments").select("slug, title, meta_description, description");
  const { data: lands } = await supabase.from("lands").select("slug, title, meta_description, description");

  console.log("--- APARTMENT DESCRIPTIONS ---");
  let totalTooLong = 0;
  let totalTooShort = 0;
  let totalOk = 0;

  (apts || []).forEach((apt) => {
    const desc = apt.meta_description || apt.description || "";
    const len = desc.length;
    let category = "OK";
    if (len > 160) {
      category = "TOO LONG (>160)";
      totalTooLong++;
    } else if (len < 50 && len > 0) {
      category = "TOO SHORT (<50)";
      totalTooShort++;
    } else {
      totalOk++;
    }
    console.log(`[Apartment] Slug: ${apt.slug} | MetaDesc Length: ${apt.meta_description?.length || 0} | FullDesc Length: ${apt.description?.length || 0} | Status: ${category}`);
  });

  console.log("\n--- LAND DESCRIPTIONS ---");
  (lands || []).forEach((land) => {
    const desc = land.meta_description || land.description || "";
    const len = desc.length;
    let category = "OK";
    if (len > 160) {
      category = "TOO LONG (>160)";
      totalTooLong++;
    } else if (len < 50 && len > 0) {
      category = "TOO SHORT (<50)";
      totalTooShort++;
    } else {
      totalOk++;
    }
    console.log(`[Land] Slug: ${land.slug} | MetaDesc Length: ${land.meta_description?.length || 0} | FullDesc Length: ${land.description?.length || 0} | Status: ${category}`);
  });

  console.log(`\nSummary: Too Long = ${totalTooLong}, Too Short = ${totalTooShort}, OK = ${totalOk}`);
}

inspectDescriptions();
