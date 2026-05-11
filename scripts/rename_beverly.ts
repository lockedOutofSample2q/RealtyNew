
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

function getEnv() {
  const envPath = path.resolve(process.cwd(), '.env.local');
  const envContent = fs.readFileSync(envPath, 'utf8');
  const env: Record<string, string> = {};
  envContent.split('\n').forEach(line => {
    const [key, ...value] = line.split('=');
    if (key && value) {
      env[key.trim()] = value.join('=').trim().replace(/^"|"$/g, '');
    }
  });
  return env;
}

const env = getEnv();
const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL || "";
const serviceKey = env.SUPABASE_SERVICE_ROLE_KEY || "";

const supabase = createClient(supabaseUrl, serviceKey, { auth: { persistSession: false } });

async function renameProperty() {
  const oldSlug = 'beverly-golf-hills';
  const newSlug = 'beverly-golf-avenue';
  const newTitle = 'Beverly Golf Avenue';

  console.log(`Renaming ${oldSlug} to ${newSlug}...`);

  const { data, error } = await supabase
    .from('apartments')
    .update({
      slug: newSlug,
      title: newTitle,
      og_title: `${newTitle} Mohali | 3 & 4 BHK + Golf Range, Sector 65`,
      building_name: newTitle
    })
    .eq('slug', oldSlug);

  if (error) {
    console.error('Error renaming property:', error.message);
  } else {
    console.log('Successfully renamed property and updated slug.');
  }
}

renameProperty();
