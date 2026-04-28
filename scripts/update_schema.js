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

async function updateSchema() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const supabase = createClient(supabaseUrl, supabaseKey);

  console.log('Adding meta_description and updating properties view...');

  const sql = `
    ALTER TABLE apartments ADD COLUMN IF NOT EXISTS meta_description text;
    ALTER TABLE houses ADD COLUMN IF NOT EXISTS meta_description text;
    ALTER TABLE lands ADD COLUMN IF NOT EXISTS meta_description text;
    
    ALTER TABLE apartments ADD COLUMN IF NOT EXISTS faqs jsonb DEFAULT '[]';
    ALTER TABLE houses ADD COLUMN IF NOT EXISTS faqs jsonb DEFAULT '[]';
    ALTER TABLE lands ADD COLUMN IF NOT EXISTS faqs jsonb DEFAULT '[]';

    DROP VIEW IF EXISTS properties;
    CREATE VIEW properties AS
    SELECT 
        id, title, slug, type, status, listing_type, price, price_max, price_currency, 
        bedrooms, bedrooms_max, bathrooms, bathrooms_max, area_sqft, area_sqft_max,
        location, community, developer, developer_website, furnishing, 
        description, meta_description, features, images, image_count, featured, featured_sections, 
        display_sections, highlights, amenities, amenities_gallery, 
        interior_features, nearby_landmarks, latitude, longitude,
        payment_plan, documents, unit_types_image, unit_types,
        agent_name, agent_title, agent_email, agent_phone, agent_photo, agent_languages,
        upcoming_infrastructure, address, completion_date, handover_date,
        maintenance_fee_psft, tower_count, floor_count, total_units,
        faqs,
        'apartment' AS entity_type
    FROM apartments
    UNION ALL
    SELECT 
        id, title, slug, type, status, listing_type, price, NULL::numeric AS price_max, price_currency, 
        bedrooms, bedrooms_max, bathrooms, bathrooms_max, area_sqft, area_sqft_max,
        location, community, developer, developer_website, furnishing, 
        description, meta_description, features, images, image_count, featured, featured_sections, 
        display_sections, highlights, amenities, amenities_gallery, 
        interior_features, nearby_landmarks, latitude, longitude,
        payment_plan, documents, unit_types_image, NULL::jsonb AS unit_types,
        agent_name, agent_title, agent_email, agent_phone, agent_photo, agent_languages,
        upcoming_infrastructure, address, completion_date, handover_date,
        NULL::numeric AS maintenance_fee_psft, NULL::integer AS tower_count, NULL::integer AS floor_count, NULL::integer AS total_units,
        faqs,
        'house' AS entity_type
    FROM houses
    UNION ALL
    SELECT 
        id, title, slug, type, status, listing_type, price, NULL::numeric AS price_max, price_currency, 
        NULL::integer AS bedrooms, NULL::integer AS bedrooms_max, NULL::integer AS bathrooms, NULL::integer AS bathrooms_max, area_sqft, area_sqft_max,
        location, community, developer, developer_website, 'unfurnished' AS furnishing, 
        description, meta_description, features, images, image_count, featured, featured_sections, 
        display_sections, highlights, '{}'::text[] AS amenities, '{}'::text[] AS amenities_gallery, 
        '{}'::text[] AS interior_features, nearby_landmarks, latitude, longitude,
        NULL::jsonb AS payment_plan, '[]'::jsonb AS documents, NULL::text AS unit_types_image, NULL::jsonb AS unit_types,
        agent_name, agent_title, agent_email, agent_phone, agent_photo, agent_languages,
        upcoming_infrastructure, address, NULL::text AS completion_date, NULL::text AS handover_date,
        NULL::numeric AS maintenance_fee_psft, NULL::integer AS tower_count, NULL::integer AS floor_count, NULL::integer AS total_units,
        faqs,
        'lands' AS entity_type
    FROM lands;
  `;

  const { error } = await supabase.rpc('exec_sql', { sql_query: sql });

  if (error) {
    console.error('Error updating schema:', error);
  } else {
    console.log('✅ Successfully updated schema and properties view.');
  }
}

updateSchema();
