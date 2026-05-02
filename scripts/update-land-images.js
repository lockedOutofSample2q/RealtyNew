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

const imageDir = 'public/assets/images/lands';
const files = fs.readdirSync(imageDir);

async function updateLands() {
  for (const file of files) {
    const id = file.replace('.png', '');
    if (id.length === 36) { // Basic UUID check
      const imagePath = `/assets/images/lands/${file}`;
      console.log(`Updating ${id} with ${imagePath}`);
      const { error } = await supabase
        .from('lands')
        .update({ 
          images: [imagePath],
          image_count: 1
        })
        .eq('id', id);
      if (error) console.error(`Error updating ${id}:`, error);
    }
  }
}

updateLands();
