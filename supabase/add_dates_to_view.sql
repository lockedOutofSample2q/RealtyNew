-- ============================================================
-- Add created_at and updated_at to the properties VIEW
-- ============================================================
-- The underlying tables (apartments, houses, lands) already have
-- created_at TIMESTAMPTZ DEFAULT NOW() and updated_at TIMESTAMPTZ DEFAULT NOW()
-- with an auto-update trigger. But the properties VIEW was missing them.
-- 
-- Run this in the Supabase SQL Editor (Dashboard > SQL Editor > New Query)
-- ============================================================

DROP VIEW IF EXISTS properties;
CREATE VIEW properties AS
SELECT 
    id, title, slug, type, status, listing_type, price, price_max, price_currency, 
    bedrooms, bedrooms_max, bathrooms, bathrooms_max, area_sqft, area_sqft_max, location, community, developer, developer_website, furnishing, 
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
    bedrooms, bedrooms_max, bathrooms, bathrooms_max, area_sqft, area_sqft_max, location, community, developer, developer_website, furnishing, 
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
    NULL::integer AS bedrooms, NULL::integer AS bedrooms_max, NULL::integer AS bathrooms, NULL::integer AS bathrooms_max, area_sqft, NULL::integer AS area_sqft_max, location, community, developer, developer_website, 'unfurnished' AS furnishing, 
    description, features, images, image_count, featured, featured_sections, display_sections, highlights, 
    '{}'::text[] AS amenities, '{}'::text[] AS amenities_gallery, '{}'::text[] AS interior_features, nearby_landmarks, latitude, longitude,
    NULL::jsonb AS payment_plan, '[]'::jsonb AS documents, NULL::text AS unit_types_image,
    agent_name, agent_title, agent_email, agent_phone, agent_photo, agent_languages,
    upcoming_infrastructure, address, NULL::text AS completion_date, NULL::text AS handover_date,
    created_at, updated_at,
    'land' AS entity_type
FROM lands;
