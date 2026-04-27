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

async function updatePreciseCoordinates() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const supabase = createClient(supabaseUrl, supabaseKey);

  const slug = 'homeland-regalia-mohali';
  
  // Precise project coordinates provided by user
  const latitude = 30.698256593747015;
  const longitude = 76.70678732459825;

  console.log(`Updating precise project coordinates for ${slug}...`);

  const { error } = await supabase
    .from('apartments')
    .update({ latitude, longitude })
    .eq('slug', slug);
  
  if (error) console.error('Error:', error.message);
  else console.log('✅ Successfully updated project coordinates to precise location.');
}

updatePreciseCoordinates();
