-- ============================================================
-- 1. Ensure created_at and updated_at columns exist
-- ============================================================
ALTER TABLE apartments ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT NOW();
ALTER TABLE apartments ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

ALTER TABLE houses ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT NOW();
ALTER TABLE houses ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

ALTER TABLE lands ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT NOW();
ALTER TABLE lands ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

-- ============================================================
-- 2. Populate any missing dates with current time
-- ============================================================
UPDATE apartments SET created_at = NOW() WHERE created_at IS NULL;
UPDATE apartments SET updated_at = NOW() WHERE updated_at IS NULL;

UPDATE houses SET created_at = NOW() WHERE created_at IS NULL;
UPDATE houses SET updated_at = NOW() WHERE updated_at IS NULL;

UPDATE lands SET created_at = NOW() WHERE created_at IS NULL;
UPDATE lands SET updated_at = NOW() WHERE updated_at IS NULL;

-- ============================================================
-- 3. Create Trigger to Auto-Update 'updated_at' on Modification
-- ============================================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN 
  NEW.updated_at = NOW(); 
  RETURN NEW; 
END;
$$ LANGUAGE plpgsql;

-- Drop triggers if they exist to avoid duplication
DROP TRIGGER IF EXISTS apartments_updated_at ON apartments;
DROP TRIGGER IF EXISTS houses_updated_at ON houses;
DROP TRIGGER IF EXISTS lands_updated_at ON lands;

-- Attach triggers to the split tables
CREATE TRIGGER apartments_updated_at
  BEFORE UPDATE ON apartments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER houses_updated_at
  BEFORE UPDATE ON houses
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER lands_updated_at
  BEFORE UPDATE ON lands
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- 4. Recreate properties VIEW to expose the columns
-- ============================================================
DROP VIEW IF EXISTS properties;
CREATE VIEW properties AS
SELECT 
    id, title, slug, type, status, listing_type, price, price_max, price_currency, 
    bedrooms, bedrooms_max, bathrooms, area_sqft, area_sqft_max, location, community, developer, developer_website, furnishing, 
    description, features, images, image_count, featured, featured_sections, display_sections, highlights, 
    amenities, amenities_gallery, interior_features, nearby_landmarks, latitude, longitude,
    payment_plan, documents, unit_types_image,
    agent_name, agent_title, agent_email, agent_phone, agent_photo, agent_languages,
    upcoming_infrastructure, address, completion_date, handover_date,
    created_at, updated_at,
    'apartment' AS entity_type
FROM apartments
UNION ALL
SELECT 
    id, title, slug, type, status, listing_type, price, price_max, price_currency, 
    bedrooms, bedrooms_max, bathrooms, area_sqft, area_sqft_max, location, community, developer, developer_website, furnishing, 
    description, features, images, image_count, featured, featured_sections, display_sections, highlights, 
    amenities, amenities_gallery, interior_features, nearby_landmarks, latitude, longitude,
    payment_plan, documents, unit_types_image,
    agent_name, agent_title, agent_email, agent_phone, agent_photo, agent_languages,
    upcoming_infrastructure, address, completion_date, handover_date,
    created_at, updated_at,
    'house' AS entity_type
FROM houses
UNION ALL
SELECT 
    id, title, slug, type, status, listing_type, price, NULL::numeric AS price_max, price_currency, 
    NULL::integer AS bedrooms, NULL::integer AS bedrooms_max, NULL::integer AS bathrooms, area_sqft, NULL::integer AS area_sqft_max, location, community, developer, developer_website, 'unfurnished' AS furnishing, 
    description, features, images, image_count, featured, featured_sections, display_sections, highlights, 
    '{}'::text[] AS amenities, '{}'::text[] AS amenities_gallery, '{}'::text[] AS interior_features, nearby_landmarks, latitude, longitude,
    NULL::jsonb AS payment_plan, '[]'::jsonb AS documents, NULL::text AS unit_types_image,
    agent_name, agent_title, agent_email, agent_phone, agent_photo, agent_languages,
    upcoming_infrastructure, address, NULL::text AS completion_date, NULL::text AS handover_date,
    created_at, updated_at,
    'lands' AS entity_type
FROM lands;
