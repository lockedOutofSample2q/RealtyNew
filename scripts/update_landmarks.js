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

async function updateLandmarks() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const supabase = createClient(supabaseUrl, supabaseKey);

  const slug = 'homeland-regalia-mohali';
  
  const nearby_landmarks = [
    { name: "CP 67 Mall", time: "5", transport: "car" },
    { name: "PCA Stadium", time: "10", transport: "car" },
    { name: "Fortis Hospital", time: "12", transport: "car" },
    { name: "Railway Station", time: "15", transport: "car" },
    { name: "Quark City", time: "15", transport: "car" },
    { name: "International Airport", time: "20", transport: "car" }
  ];

  console.log(`Updating landmarks for ${slug}...`);

  const { error } = await supabase
    .from('apartments')
    .update({ nearby_landmarks })
    .eq('slug', slug);
  
  if (error) console.error('Error:', error.message);
  else console.log('✅ Successfully updated nearby landmarks.');
}

updateLandmarks();
