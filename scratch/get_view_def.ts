import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
const supabase = createClient(supabaseUrl, serviceKey, { auth: { persistSession: false } });

async function getViewDef() {
  const { data, error } = await supabase
    .from('views')
    .select('view_definition')
    .eq('table_schema', 'public')
    .eq('table_name', 'properties');
    
  if (error) {
    // try another way
    const { data: data2, error: error2 } = await supabase.rpc('get_view_def');
    console.error("Error fetching view from views:", error);
  } else {
    console.log("View definition:");
    console.log(data);
  }
}

getViewDef();
