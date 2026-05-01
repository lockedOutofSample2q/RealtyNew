import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkView() {
  // Try raw query to see all data in 'properties'
  const { data: sample, error } = await supabase.from('properties').select('title, type, entity_type');
  if (error) {
    console.error(error);
  } else {
    console.log(JSON.stringify(sample, null, 2));
  }
}

checkView();
