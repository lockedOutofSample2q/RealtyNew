import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

async function getColumns() {
  const tables = ['apartments', 'houses', 'lands'];
  const report: Record<string, string[]> = {};

  for (const table of tables) {
    const { data, error } = await supabase
      .from(table)
      .select('*')
      .limit(1);

    if (error) {
      console.error(`Error fetching columns for ${table}:`, error);
      report[table] = [];
    } else if (data && data.length > 0) {
      report[table] = Object.keys(data[0]);
    } else {
      // If table is empty, we might need another way or just try to select 1 row
       const { data: cols } = await supabase.rpc('get_table_columns', { table_name: table });
       // Note: get_table_columns might not exist, but let's try a direct query if possible
       // Actually, the easiest way to see columns is to select * from table limit 0
       const { data: dummy, error: err } = await supabase.from(table).select().limit(0);
       // This doesn't return keys if empty.
       // Let's use the error message trick or just assume if it fails.
       report[table] = []; 
    }
  }

  console.log(JSON.stringify(report, null, 2));
}

getColumns();
