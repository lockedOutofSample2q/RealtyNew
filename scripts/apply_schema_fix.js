const { createClient } = require('@supabase/supabase-js');

async function fixSchema() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase credentials');
    process.exit(1);
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  console.log('Attempting to apply schema fix via SQL...');

  const sql = `
    -- 1. Add all missing columns to base tables
    DO $$ 
    BEGIN
      -- APARTMENTS
      IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='apartments' AND column_name='agent_email') THEN
        ALTER TABLE apartments ADD COLUMN agent_email text;
      END IF;
      IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='apartments' AND column_name='agent_phone') THEN
        ALTER TABLE apartments ADD COLUMN agent_phone text;
      END IF;
      IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='apartments' AND column_name='agent_name') THEN
        ALTER TABLE apartments ADD COLUMN agent_name text;
      END IF;
      IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='apartments' AND column_name='completion_date') THEN
        ALTER TABLE apartments ADD COLUMN completion_date text;
      END IF;
      IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='apartments' AND column_name='handover_date') THEN
        ALTER TABLE apartments ADD COLUMN handover_date text;
      END IF;
      IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='apartments' AND column_name='payment_plan') THEN
        ALTER TABLE apartments ADD COLUMN payment_plan jsonb;
      END IF;
      IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='apartments' AND column_name='nearby_landmarks') THEN
        ALTER TABLE apartments ADD COLUMN nearby_landmarks jsonb DEFAULT '[]';
      END IF;

      -- HOUSES (similar columns)
      IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='houses' AND column_name='agent_email') THEN
        ALTER TABLE houses ADD COLUMN agent_email text;
      END IF;
      IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='houses' AND column_name='completion_date') THEN
        ALTER TABLE houses ADD COLUMN completion_date text;
      END IF;
      IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='houses' AND column_name='payment_plan') THEN
        ALTER TABLE houses ADD COLUMN payment_plan jsonb;
      END IF;
      IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='houses' AND column_name='nearby_landmarks') THEN
        ALTER TABLE houses ADD COLUMN nearby_landmarks jsonb DEFAULT '[]';
      END IF;

      -- LANDS
      IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='lands' AND column_name='agent_email') THEN
        ALTER TABLE lands ADD COLUMN agent_email text;
      END IF;
    END $$;

    -- 2. Drop and Recreate VIEW
    DROP VIEW IF EXISTS properties;
    CREATE OR REPLACE VIEW properties AS
    SELECT 
        id, title, slug, type, status, listing_type, price, price_currency, 
        bedrooms, bathrooms, area_sqft, location, community, developer, furnishing, 
        description, features, images, featured, featured_sections, highlights, 
        amenities, latitude, longitude, created_at, updated_at,
        completion_date, handover_date, payment_plan, nearby_landmarks,
        agent_name, agent_phone, agent_email,
        'apartment' AS entity_type
    FROM apartments
    UNION ALL
    SELECT 
        id, title, slug, type, status, listing_type, price, price_currency, 
        bedrooms, bathrooms, area_sqft, location, community, developer, furnishing, 
        description, features, images, featured, featured_sections, highlights, 
        amenities, latitude, longitude, created_at, updated_at,
        completion_date, NULL as handover_date, payment_plan, nearby_landmarks,
        NULL as agent_name, NULL as agent_phone, agent_email,
        'house' AS entity_type
    FROM houses
    UNION ALL
    SELECT 
        id, title, slug, type, status, listing_type, price, price_currency, 
        NULL::integer AS bedrooms, NULL::integer AS bathrooms, area_sqft, location, community, developer, 'unfurnished' AS furnishing, 
        description, features, images, featured, featured_sections, highlights, 
        '{}'::text[] AS amenities, latitude, longitude, created_at, updated_at,
        NULL as completion_date, NULL as handover_date, NULL::jsonb as payment_plan, nearby_landmarks,
        NULL as agent_name, NULL as agent_phone, agent_email,
        'lands' AS entity_type
    FROM lands;
  `;

  console.log('--- PLEASE RUN THE FOLLOWING SQL IN YOUR SUPABASE SQL EDITOR ---');
  console.log(sql);
}

fixSchema();
