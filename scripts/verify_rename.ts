
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
  const { data: apt, error: aptErr } = await supabase.from('apartments').select('slug').eq('slug', 'beverly-golf-avenue').single();
  console.log('Apartment:', apt, aptErr?.message);

  const { data: prop, error: propErr } = await supabase.from('properties').select('slug').eq('slug', 'beverly-golf-avenue').single();
  console.log('Property (View/Table):', prop, propErr?.message);
}

verify();
