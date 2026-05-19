import { createClient } from "@supabase/supabase-js";
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
  const { data, error } = await supabase.from('properties').select('id, images');
  if (error) throw error;
  
  for (const p of data) {
    if (!p.images) continue;
    let changed = false;
    const newImages = p.images.map((img: string) => {
      if (img.includes('realty-holding-and-management-consultants-ambika-la-parisian-mohali-sector-66b-06.jpg')) {
        changed = true; return img.replace('.jpg', '.webp');
      }
      if (img.includes('realty-holding-and-management-consultants-ambika-la-parisian-mohali-sector-66b-12.jpg')) {
        changed = true; return img.replace('.jpg', '.webp');
      }
      if (img.includes('realty-holding-and-management-consultants-ambika-la-parisian-mohali-sector-66b-13.jpg')) {
        changed = true; return img.replace('.jpg', '.webp');
      }
      if (img.includes('Homeland heights Mohali') && img.endsWith('.jpg')) {
        changed = true; return img.replace('.jpg', '.webp');
      }
      return img;
    });
    
    if (changed) {
      console.log('Updating DB for', p.id);
      await supabase.from('properties').update({ images: newImages }).eq('id', p.id);
    }
  }
  console.log("Done");
}

main().catch(console.error);
