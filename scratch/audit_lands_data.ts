import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";
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

async function auditLands() {
  console.log("Fetching all land listings...");
  const { data, error } = await supabase
    .from("lands")
    .select("*");

  if (error) {
    console.error("Error fetching lands:", error);
    return;
  }

  if (data) {
    fs.writeFileSync("scratch/lands_audit_raw.json", JSON.stringify(data, null, 2));
    console.log(`Successfully fetched ${data.length} land listings and saved to scratch/lands_audit_raw.json`);
  } else {
    console.log("No data found in lands table.");
  }
}

auditLands();
