const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const envPath = path.resolve(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
  const envFile = fs.readFileSync(envPath, 'utf8');
  envFile.split('\n').forEach(line => {
    const match = line.match(/^([^#=]+)=(.*)$/);
    if (match) {
      const key = match[1].trim();
      const value = match[2].trim().replace(/^['"]|['"]$/g, '');
      process.env[key] = value;
    }
  });
}

async function inspectData() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const supabase = createClient(supabaseUrl, supabaseKey);

  const slug = 'homeland-regalia-mohali';
  
  const { data, error } = await supabase
    .from('apartments')
    .select('title, latitude, longitude, description')
    .eq('slug', slug)
    .single();
  
  if (error) {
    console.error('Error:', error.message);
  } else {
    console.log('Database Data for', slug);
    console.log('Latitude:', data.latitude);
    console.log('Longitude:', data.longitude);
    console.log('Description Snippet:', data.description.substring(0, 100));
  }
}

inspectData();
