import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

const supabase = createClient(supabaseUrl, serviceKey, { auth: { persistSession: false } });

async function inspectLandsTable() {
  console.log("Fetching first row from lands table...");
  const { data, error } = await supabase
    .from("lands")
    .select("*")
    .limit(1);

  if (error) {
    console.error("Error fetching lands:", error);
    return;
  }

  if (data && data.length > 0) {
    console.log("Columns in lands table:");
    console.log(Object.keys(data[0]).join(", "));
  } else {
    console.log("No data found in lands table.");
  }
}

inspectLandsTable();
