
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

async function updateBeverly() {
  // Update Beverly Golf Hills with correct price range and unit types
  const payload = {
    price: 20500000,
    price_max: 42000000,
    unit_types: [
      { bhk: "3 BHK", size_min: 2050, size_max: 2250, price: "₹2.05Cr - ₹2.25Cr" },
      { bhk: "4 BHK", size_min: 3390, size_max: 3500, price: "₹3.39Cr - ₹3.50Cr" },
      { bhk: "Penthouse", size_min: 4200, size_max: 4500, price: "₹4.20Cr" }
    ],
    // Ensure slug is stable and title includes keywords
    og_title: "Beverly Hills Mohali | Beverly Golf Hills – 3 & 4 BHK, Sector 65",
    meta_description: "Beverly Hills Mohali (Beverly Golf Hills) — 424 Vastu-compliant 3 & 4 BHK in Sector 65, 0 km from Chandigarh. RERA: PR0111 & PR0451. ₹2.00Cr – ₹3.39Cr."
  };

  const { data, error } = await supabase
    .from('apartments')
    .update(payload)
    .eq('slug', 'beverly-golf-hills');

  if (error) {
    console.error('Error updating Beverly:', error.message);
  } else {
    console.log('Successfully updated Beverly Golf Hills');
  }
}

updateBeverly();
