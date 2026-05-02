const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const env = fs.readFileSync('.env.local', 'utf8');
const config = {};
env.split('\n').forEach(line => {
  const [key, ...value] = line.split('=');
  if (key && value.length > 0) {
    config[key.trim()] = value.join('=').trim().replace(/^"|"$/g, '');
  }
});

const supabaseUrl = config.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = config.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function countEverything() {
  const { count: props } = await supabase.from('properties').select('id', { count: 'exact', head: true });
  const { count: aparts } = await supabase.from('apartments').select('id', { count: 'exact', head: true });
  const { count: houses } = await supabase.from('houses').select('id', { count: 'exact', head: true });
  const { count: lands } = await supabase.from('lands').select('id', { count: 'exact', head: true });
  
  console.log('Properties:', props);
  console.log('Apartments:', aparts);
  console.log('Houses:', houses);
  console.log('Lands:', lands);
}

countEverything();
