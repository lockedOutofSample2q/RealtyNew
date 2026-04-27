const { createClient } = require('@supabase/supabase-js');

async function fixSchema() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase credentials');
    process.exit(1);
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  console.log('Updating table schemas for apartments, houses, and lands...');

  // SQL to add missing columns to split tables and update view
  const sql = `
    -- Add missing columns to apartments
    ALTER TABLE apartments ADD COLUMN IF NOT EXISTS address text;
    ALTER TABLE apartments ADD COLUMN IF NOT EXISTS bedrooms_max integer;
    ALTER TABLE apartments ADD COLUMN IF NOT EXISTS completion_date text;
    ALTER TABLE apartments ADD COLUMN IF NOT EXISTS handover_date text;
    ALTER TABLE apartments ADD COLUMN IF NOT EXISTS amenities_gallery text[] DEFAULT '{}';
    ALTER TABLE apartments ADD COLUMN IF NOT EXISTS interior_features text[] DEFAULT '{}';
    ALTER TABLE apartments ADD COLUMN IF NOT EXISTS nearby_landmarks jsonb DEFAULT '[]';
    ALTER TABLE apartments ADD COLUMN IF NOT EXISTS developer_website text;
    ALTER TABLE apartments ADD COLUMN IF NOT EXISTS image_count integer;
    ALTER TABLE apartments ADD COLUMN IF NOT EXISTS payment_plan jsonb;
    ALTER TABLE apartments ADD COLUMN IF NOT EXISTS documents jsonb DEFAULT '[]';
    ALTER TABLE apartments ADD COLUMN IF NOT EXISTS unit_types_image text;
    ALTER TABLE apartments ADD COLUMN IF NOT EXISTS agent_name text;
    ALTER TABLE apartments ADD COLUMN IF NOT EXISTS agent_title text;
    ALTER TABLE apartments ADD COLUMN IF NOT EXISTS agent_email text;
    ALTER TABLE apartments ADD COLUMN IF NOT EXISTS agent_phone text;
    ALTER TABLE apartments ADD COLUMN IF NOT EXISTS agent_photo text;
    ALTER TABLE apartments ADD COLUMN IF NOT EXISTS agent_languages text[] DEFAULT '{}';
    ALTER TABLE apartments ADD COLUMN IF NOT EXISTS upcoming_infrastructure text[] DEFAULT '{}';

    -- Add missing columns to houses
    ALTER TABLE houses ADD COLUMN IF NOT EXISTS address text;
    ALTER TABLE houses ADD COLUMN IF NOT EXISTS bedrooms_max integer;
    ALTER TABLE houses ADD COLUMN IF NOT EXISTS completion_date text;
    ALTER TABLE houses ADD COLUMN IF NOT EXISTS handover_date text;
    ALTER TABLE houses ADD COLUMN IF NOT EXISTS amenities_gallery text[] DEFAULT '{}';
    ALTER TABLE houses ADD COLUMN IF NOT EXISTS interior_features text[] DEFAULT '{}';
    ALTER TABLE houses ADD COLUMN IF NOT EXISTS nearby_landmarks jsonb DEFAULT '[]';
    ALTER TABLE houses ADD COLUMN IF NOT EXISTS developer_website text;
    ALTER TABLE houses ADD COLUMN IF NOT EXISTS image_count integer;
    ALTER TABLE houses ADD COLUMN IF NOT EXISTS payment_plan jsonb;
    ALTER TABLE houses ADD COLUMN IF NOT EXISTS documents jsonb DEFAULT '[]';
    ALTER TABLE houses ADD COLUMN IF NOT EXISTS unit_types_image text;
    ALTER TABLE houses ADD COLUMN IF NOT EXISTS agent_name text;
    ALTER TABLE houses ADD COLUMN IF NOT EXISTS agent_title text;
    ALTER TABLE houses ADD COLUMN IF NOT EXISTS agent_email text;
    ALTER TABLE houses ADD COLUMN IF NOT EXISTS agent_phone text;
    ALTER TABLE houses ADD COLUMN IF NOT EXISTS agent_photo text;
    ALTER TABLE houses ADD COLUMN IF NOT EXISTS agent_languages text[] DEFAULT '{}';
    ALTER TABLE houses ADD COLUMN IF NOT EXISTS upcoming_infrastructure text[] DEFAULT '{}';

    -- Add missing columns to lands
    ALTER TABLE lands ADD COLUMN IF NOT EXISTS address text;
    ALTER TABLE lands ADD COLUMN IF NOT EXISTS nearby_landmarks jsonb DEFAULT '[]';
    ALTER TABLE lands ADD COLUMN IF NOT EXISTS developer_website text;
    ALTER TABLE lands ADD COLUMN IF NOT EXISTS image_count integer;
    ALTER TABLE lands ADD COLUMN IF NOT EXISTS agent_name text;
    ALTER TABLE lands ADD COLUMN IF NOT EXISTS agent_title text;
    ALTER TABLE lands ADD COLUMN IF NOT EXISTS agent_email text;
    ALTER TABLE lands ADD COLUMN IF NOT EXISTS agent_phone text;
    ALTER TABLE lands ADD COLUMN IF NOT EXISTS agent_photo text;
    ALTER TABLE lands ADD COLUMN IF NOT EXISTS agent_languages text[] DEFAULT '{}';
    ALTER TABLE lands ADD COLUMN IF NOT EXISTS upcoming_infrastructure text[] DEFAULT '{}';

    -- Drop and Recreate VIEW with all columns
    DROP VIEW IF EXISTS properties;
    CREATE VIEW properties AS
    SELECT 
        id, title, slug, type, status, listing_type, price, price_currency, 
        bedrooms, bedrooms_max, bathrooms, area_sqft, location, community, developer, developer_website, furnishing, 
        description, features, images, image_count, featured, featured_sections, display_sections, highlights, 
        amenities, amenities_gallery, interior_features, nearby_landmarks, latitude, longitude,
        payment_plan, documents, unit_types_image,
        agent_name, agent_title, agent_email, agent_phone, agent_photo, agent_languages,
        upcoming_infrastructure, address, completion_date, handover_date,
        'apartment' AS entity_type
    FROM apartments
    UNION ALL
    SELECT 
        id, title, slug, type, status, listing_type, price, price_currency, 
        bedrooms, bedrooms_max, bathrooms, area_sqft, location, community, developer, developer_website, furnishing, 
        description, features, images, image_count, featured, featured_sections, display_sections, highlights, 
        amenities, amenities_gallery, interior_features, nearby_landmarks, latitude, longitude,
        payment_plan, documents, unit_types_image,
        agent_name, agent_title, agent_email, agent_phone, agent_photo, agent_languages,
        upcoming_infrastructure, address, completion_date, handover_date,
        'house' AS entity_type
    FROM houses
    UNION ALL
    SELECT 
        id, title, slug, type, status, listing_type, price, price_currency, 
        NULL::integer AS bedrooms, NULL::integer AS bedrooms_max, NULL::integer AS bathrooms, area_sqft, location, community, developer, developer_website, 'unfurnished' AS furnishing, 
        description, features, images, image_count, featured, featured_sections, display_sections, highlights, 
        '{}'::text[] AS amenities, '{}'::text[] AS amenities_gallery, '{}'::text[] AS interior_features, nearby_landmarks, latitude, longitude,
        NULL::jsonb AS payment_plan, '[]'::jsonb AS documents, NULL::text AS unit_types_image,
        agent_name, agent_title, agent_email, agent_phone, agent_photo, agent_languages,
        upcoming_infrastructure, address, NULL::text AS completion_date, NULL::text AS handover_date,
        'lands' AS entity_type
    FROM lands;
  `;

  // We need to use RPC or a different method to run raw SQL if possible, 
  // but standard JS client doesn't support raw SQL easily without a function.
  // I will use a different approach: I will check if there's an 'exec_sql' RPC function.
  
  const { error } = await supabase.rpc('exec_sql', { sql_query: sql });

  if (error) {
    console.warn('exec_sql RPC might not exist, trying fallback or advising user...');
    console.error(error);
    console.log('\n--- PLEASE RUN THIS SQL IN YOUR SUPABASE SQL EDITOR ---\n');
    console.log(sql);
    process.exit(1);
  }

  console.log('Successfully updated schema and view.');
}

fixSchema();
