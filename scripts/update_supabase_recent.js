const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

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

async function updateRecentProperties() {
  const jsonPath = path.join(__dirname, '../scratch/recent_13_parsed.json');
  if (!fs.existsSync(jsonPath)) {
    console.error('Error: Parsed JSON file does not exist at', jsonPath);
    return;
  }

  const properties = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  console.log(`Starting Supabase update for ${properties.length} properties...`);

  let successCount = 0;
  let failureCount = 0;

  for (const property of properties) {
    const { id, slug, created_at, ...payload } = property;

    if (!slug) {
      console.warn(`Warning: Property with ID ${id} is missing a slug. Skipping.`);
      failureCount++;
      continue;
    }

    console.log(`\n------------------------------------------------------------`);
    console.log(`Updating property: "${property.title}"`);
    console.log(`Slug: "${slug}"`);

    // Add/Update the updated_at timestamp
    payload.updated_at = new Date().toISOString();

    const { data, error } = await supabase
      .from('apartments')
      .update(payload)
      .eq('slug', slug)
      .select('id, slug, title');

    if (error) {
      console.error(`Error updating "${slug}":`, error.message);
      failureCount++;
    } else {
      console.log(`SUCCESS: Successfully updated "${slug}" in Supabase!`);
      if (data && data.length > 0) {
        console.log(`Database Confirmed: [${data[0].id}] ${data[0].slug} -> ${data[0].title}`);
      } else {
        console.warn(`Warning: No rows were updated. Does the slug "${slug}" exist in the database?`);
        failureCount++;
        continue;
      }
      successCount++;
    }
  }

  console.log(`\n============================================================`);
  console.log(`Update Process Complete!`);
  console.log(`Successfully updated: ${successCount} properties.`);
  console.log(`Failed/Skipped: ${failureCount} properties.`);
}

updateRecentProperties();
