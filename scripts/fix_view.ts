import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

const sql = `
DROP VIEW IF EXISTS properties;
CREATE VIEW properties AS
SELECT 
    id, title, slug, type, status, listing_type, price, price_max, price_currency, 
    bedrooms, bedrooms_max, bathrooms, bathrooms_max, area_sqft, area_sqft_max, 
    location, address, community, developer, developer_website, furnishing, 
    description, meta_description, features, images, image_count, videos, 
    featured, featured_sections, display_sections, highlights, amenities, 
    amenities_gallery, interior_features, nearby_landmarks, latitude, longitude, 
    payment_plan, documents, unit_types_image, unit_types, 
    agent_name, agent_title, agent_email, agent_phone, agent_photo, agent_languages, 
    upcoming_infrastructure, completion_date, handover_date, 
    maintenance_fee_psft, tower_count, floor_count, total_units, faqs,
    created_at, updated_at,
    'apartment' AS entity_type 
FROM apartments
UNION ALL
SELECT 
    id, title, slug, type, status, listing_type, price, price_max, price_currency, 
    bedrooms, bedrooms_max, bathrooms, bathrooms_max, area_sqft, area_sqft_max, 
    location, address, community, developer, developer_website, furnishing, 
    description, meta_description, features, images, image_count, videos, 
    featured, featured_sections, display_sections, highlights, amenities, 
    amenities_gallery, interior_features, nearby_landmarks, latitude, longitude, 
    payment_plan, documents, unit_types_image, NULL::jsonb AS unit_types, 
    agent_name, agent_title, agent_email, agent_phone, agent_photo, agent_languages, 
    upcoming_infrastructure, completion_date, handover_date, 
    maintenance_fee_psft, tower_count, floor_count, total_units, faqs,
    created_at, updated_at,
    'house' AS entity_type 
FROM houses
UNION ALL
SELECT 
    id, title, slug, type, status, listing_type, price, price_max, price_currency, 
    NULL::integer AS bedrooms, NULL::integer AS bedrooms_max, NULL::integer AS bathrooms, NULL::integer AS bathrooms_max, 
    area_sqft, area_sqft_max, location, address, community, developer, developer_website, 
    'unfurnished'::text AS furnishing, description, meta_description, features, images, image_count, videos, 
    featured, featured_sections, display_sections, highlights, '{}'::text[] AS amenities, 
    '{}'::text[] AS amenities_gallery, '{}'::text[] AS interior_features, nearby_landmarks, 
    latitude, longitude, NULL::jsonb AS payment_plan, documents, NULL::text AS unit_types_image, 
    NULL::jsonb AS unit_types, agent_name, agent_title, agent_email, agent_phone, agent_photo, agent_languages, 
    upcoming_infrastructure, NULL::text AS completion_date, NULL::text AS handover_date, 
    NULL::numeric AS maintenance_fee_psft, NULL::integer AS tower_count, NULL::integer AS floor_count, NULL::integer AS total_units, 
    faqs, created_at, updated_at,
    'land' AS entity_type 
FROM lands;
`;

async function run() {
  const { error } = await supabase.rpc('exec_sql', { sql_query: sql });
  if (error) console.error(error);
  else console.log("SQL executed successfully");
}

run();
