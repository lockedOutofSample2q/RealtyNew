
-- Add bathrooms_max to apartments and houses
ALTER TABLE apartments ADD COLUMN IF NOT EXISTS bathrooms_max INTEGER;
ALTER TABLE houses ADD COLUMN IF NOT EXISTS bathrooms_max INTEGER;

-- Recreate VIEW with bathrooms_max
DROP VIEW IF EXISTS properties;
CREATE VIEW properties AS
SELECT 
    id, title, slug, type, status, listing_type, price, price_max, price_currency, 
    bedrooms, bedrooms_max, bathrooms, bathrooms_max, area_sqft, area_sqft_max, location, community, developer, 
    description, features, images, featured, display_sections, highlights, amenities, 
    latitude, longitude, created_at, updated_at, 
    'apartment' AS entity_type
FROM apartments
UNION ALL
SELECT 
    id, title, slug, type, status, listing_type, price, NULL::numeric, price_currency, 
    bedrooms, NULL::integer, bathrooms, bathrooms_max, area_sqft, NULL::integer, location, community, developer, 
    description, features, images, featured, display_sections, highlights, amenities, 
    latitude, longitude, created_at, updated_at, 
    'house' AS entity_type
FROM houses
UNION ALL
SELECT 
    id, title, slug, type, status, listing_type, price, NULL::numeric, price_currency, 
    NULL::integer, NULL::integer, NULL::integer, NULL::integer, area_sqft, NULL::integer, location, community, developer, 
    description, features, images, featured, display_sections, highlights, '{}'::text[], 
    latitude, longitude, created_at, updated_at, 
    'lands' AS entity_type
FROM lands;
