
import { createAdminClient } from "../lib/supabase";

async function inspectTable() {
  const supabase = createAdminClient();
  
  console.log("Fetching first row from apartments table...");
  const { data, error } = await supabase
    .from("apartments")
    .select("*")
    .limit(1);

  if (error) {
    console.error("Error fetching apartments:", error);
    return;
  }

  if (data && data.length > 0) {
    console.log("Columns in apartments table:", Object.keys(data[0]));
    console.log("Sample data:", JSON.stringify(data[0], null, 2));
  } else {
    console.log("No data found in apartments table.");
  }
}

inspectTable();
