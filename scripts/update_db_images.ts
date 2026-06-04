import { createClient } from "@supabase/supabase-js";
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

async function updateTableImages(tableName: string) {
  console.log(`Fetching from ${tableName}...`);
  const { data, error } = await supabase.from(tableName).select('id, images');
  if (error) {
    console.error(`Error fetching from ${tableName}:`, error.message);
    return;
  }
  
  let totalUpdated = 0;
  for (const p of data) {
    if (!p.images || !Array.isArray(p.images)) continue;
    let changed = false;
    const newImages = p.images.map((img: string) => {
      const lower = img.toLowerCase();
      if (lower.endsWith('.jpg') || lower.endsWith('.jpeg') || lower.endsWith('.png')) {
        changed = true;
        return img.replace(/\.(jpg|jpeg|png)$/i, '.webp');
      }
      return img;
    });
    
    if (changed) {
      const { error: updateError } = await supabase
        .from(tableName)
        .update({ images: newImages })
        .eq('id', p.id);
      if (updateError) {
        console.error(`Error updating row ${p.id} in ${tableName}:`, updateError.message);
      } else {
        totalUpdated++;
      }
    }
  }
  console.log(`Finished ${tableName}. Updated ${totalUpdated} rows.`);
}

async function main() {
  const tables = ['properties', 'apartments', 'houses', 'lands'];
  for (const table of tables) {
    await updateTableImages(table);
  }
  console.log("All tables updated successfully.");
}

main().catch(console.error);

