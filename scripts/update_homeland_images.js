const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function updateImages() {
  const dirPath = path.join(__dirname, '../public/images/properties/homeland-regalia');
  const files = fs.readdirSync(dirPath);
  
  const imageUrls = files.map(file => `/images/properties/homeland-regalia/${file}`);
  
  console.log(`Updating Homeland Regalia with ${imageUrls.length} images...`);

  const { error } = await supabase
    .from('apartments')
    .update({ images: imageUrls })
    .eq('slug', 'homeland-regalia');

  if (error) {
    console.error('Error updating images:', error);
  } else {
    console.log('Successfully updated Homeland Regalia images in database.');
  }
}

updateImages();
