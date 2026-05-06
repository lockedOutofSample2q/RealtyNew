import { createClient } from "@supabase/supabase-js";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function loadEnv() {
  const envPath = path.resolve(__dirname, "../.env.local");
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

async function checkRegalia() {
  const { data, error } = await supabase
    .from("apartments")
    .select("slug, title, images")
    .eq("slug", "homeland-regalia-mohali")
    .single();

  if (error) {
    console.error("Error:", error.message);
  } else {
    console.log("Record found:", JSON.stringify(data, null, 2));
  }
}

checkRegalia();
