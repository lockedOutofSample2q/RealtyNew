import { createClient } from "@supabase/supabase-js";
import * as fs from "fs";
import * as path from "path";

function loadEnv() {
  const envPath = "./.env.local";
  if (!fs.existsSync(envPath)) return;
  const content = fs.readFileSync(envPath, "utf8");
  content.split("\n").forEach(line => {
    const [key, ...value] = line.split("=");
    if (key && value.length > 0) {
      process.env[key.trim()] = value.join("=").trim().replace(/^["']|["']$/g, "");
    }
  });
}

loadEnv();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkDataQuality() {
  const { data: properties, error } = await supabase
    .from("properties")
    .select("slug, title, price, price_max, price_currency, images, description, status")
    .limit(20);

  if (error) {
    console.error("Error fetching properties:", error);
    return;
  }

  console.log("Property Data Quality Audit:");
  console.log("============================");
  
  properties.forEach(p => {
    const hasPrice = p.price !== null && p.price !== undefined;
    const hasImages = p.images && p.images.length > 0;
    const hasDescription = p.description && p.description.length > 50;
    const isValid = hasPrice && hasImages && hasDescription;

    console.log(`\nSlug: ${p.slug}`);
    console.log(`Title: ${p.title}`);
    console.log(`- Price: ${p.price} (Max: ${p.price_max}) [${hasPrice ? "OK" : "MISSING"}]`);
    console.log(`- Images: ${p.images?.length || 0} [${hasImages ? "OK" : "MISSING"}]`);
    if (hasImages) {
      console.log(`  First Image: ${p.images[0]}`);
      const isAbsolute = p.images[0].startsWith("http");
      console.log(`  Absolute: ${isAbsolute ? "YES" : "NO"}`);
    }
    console.log(`- Description: ${p.description?.length || 0} chars [${hasDescription ? "OK" : "SHORT"}]`);
    console.log(`- Status: ${p.status}`);
    console.log(`- Schema Ready: ${isValid ? "YES" : "NO"}`);
  });
}

checkDataQuality();
