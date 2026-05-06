import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

const supabase = createClient(supabaseUrl, serviceKey, { auth: { persistSession: false } });

async function inspectTable(tableName: string) {
  const { data, error } = await supabase
    .from(tableName)
    .select("*")
    .limit(1);

  if (error) {
    console.error(`Error fetching ${tableName}:`, error);
    return;
  }

  if (data && data.length > 0) {
    console.log(`Columns in ${tableName} table:`);
    console.log(Object.keys(data[0]).join(", "));
  } else {
    console.log(`No data found in ${tableName} table.`);
  }
}

async function main() {
  await inspectTable("houses");
  await inspectTable("apartments");
}
main();
