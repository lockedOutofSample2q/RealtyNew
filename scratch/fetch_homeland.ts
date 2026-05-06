
import { createAdminClient } from "../lib/supabase";

async function fetchHomeland() {
  const supabase = createAdminClient();
  
  console.log("Fetching Homeland Regalia...");
  const { data, error } = await supabase
    .from("apartments")
    .select("*")
    .eq("slug", "homeland-regalia-mohali")
    .single();

  if (error) {
    console.error("Error fetching Homeland Regalia:", error);
    return;
  }

  console.log("Homeland Regalia data:", JSON.stringify(data, null, 2));
}

fetchHomeland();
