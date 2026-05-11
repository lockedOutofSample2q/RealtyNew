
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

async function verify() {
  console.log('--- Checking Apartments ---');
  const { data: apts, error: aptErr } = await supabase
    .from('apartments')
    .select('slug, alternate_names')
    .not('alternate_names', 'is', null);
  
  if (aptErr) console.error('Apt Error:', aptErr.message);
  else console.log('Updated Apartments count:', apts.length);

  console.log('\n--- Checking Lands ---');
  const { data: lands, error: landErr } = await supabase
    .from('lands')
    .select('slug, alternate_names')
    .not('alternate_names', 'is', null);

  if (landErr) console.error('Land Error:', landErr.message);
  else console.log('Updated Lands count:', lands.length);

  console.log('\n--- Sample (Beverly Golf Avenue) ---');
  const beverly = apts?.find(a => a.slug === 'beverly-golf-avenue');
  console.log(beverly);
}

verify();
