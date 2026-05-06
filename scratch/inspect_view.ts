import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

const supabase = createClient(supabaseUrl, serviceKey, { auth: { persistSession: false } });

async function inspectPropertiesView() {
  console.log("Fetching first row from properties view...");
  const { data, error } = await supabase
    .from("properties")
    .select("*")
    .limit(1);

  if (error) {
    console.error("Error fetching properties:", error);
    return;
  }

  if (data && data.length > 0) {
    console.log("Columns in properties view:");
    console.log(Object.keys(data[0]).join(", "));
  } else {
    console.log("No data found in properties view.");
  }
}

inspectPropertiesView();
