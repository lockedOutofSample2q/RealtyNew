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

async function checkMissing() {
  const { data, error } = await supabase.from('lands').select('id, title, images');
  if (error) {
    console.error(error);
  } else {
    const missing = data.filter(r => !r.images || r.images.length === 0);
    console.log(JSON.stringify(missing, null, 2));
  }
}

checkMissing();
