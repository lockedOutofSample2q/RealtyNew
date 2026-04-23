-- Migration: Split properties into standalone tables
-- File: supabase/split_properties.sql

BEGIN;

-- 1. Create Apartments table
CREATE TABLE IF NOT EXISTS apartments (
  id              UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title           TEXT NOT NULL,
  slug            TEXT UNIQUE NOT NULL,
  type            TEXT NOT NULL DEFAULT 'apartment', -- 'apartment', 'penthouse', 'studio'
  status          TEXT NOT NULL DEFAULT 'available',
  listing_type    TEXT NOT NULL,
  price           NUMERIC NOT NULL,
  price_currency  TEXT NOT NULL DEFAULT 'INR',
  bedrooms        INTEGER,
  bathrooms       INTEGER NOT NULL DEFAULT 1,
  area_sqft       INTEGER NOT NULL DEFAULT 0,
  location        TEXT NOT NULL,
  community       TEXT NOT NULL,
  developer       TEXT,
  furnishing      TEXT NOT NULL DEFAULT 'unfurnished',
  description     TEXT NOT NULL DEFAULT '',
  features        TEXT[] DEFAULT '{}',
  images          TEXT[] DEFAULT '{}',
  featured        BOOLEAN NOT NULL DEFAULT false,
  featured_sections TEXT[] DEFAULT '{}',
  display_sections TEXT[] DEFAULT '{}',
  highlights      TEXT[] DEFAULT '{}',
  amenities       TEXT[] DEFAULT '{}',
  latitude        NUMERIC,
  longitude       NUMERIC,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Create Houses table
CREATE TABLE IF NOT EXISTS houses (
  id              UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title           TEXT NOT NULL,
  slug            TEXT UNIQUE NOT NULL,
  type            TEXT NOT NULL DEFAULT 'villa', -- 'villa', 'townhouse'
  status          TEXT NOT NULL DEFAULT 'available',
  listing_type    TEXT NOT NULL,
  price           NUMERIC NOT NULL,
  price_currency  TEXT NOT NULL DEFAULT 'INR',
  bedrooms        INTEGER,
  bathrooms       INTEGER NOT NULL DEFAULT 1,
  area_sqft       INTEGER NOT NULL DEFAULT 0,
  plot_area_sqft  INTEGER, -- Specific to houses
  location        TEXT NOT NULL,
  community       TEXT NOT NULL,
  developer       TEXT,
  furnishing      TEXT NOT NULL DEFAULT 'unfurnished',
  description     TEXT NOT NULL DEFAULT '',
  features        TEXT[] DEFAULT '{}',
  images          TEXT[] DEFAULT '{}',
  featured        BOOLEAN NOT NULL DEFAULT false,
  featured_sections TEXT[] DEFAULT '{}',
  display_sections TEXT[] DEFAULT '{}',
  highlights      TEXT[] DEFAULT '{}',
  amenities       TEXT[] DEFAULT '{}',
  latitude        NUMERIC,
  longitude       NUMERIC,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Create Lands table
CREATE TABLE IF NOT EXISTS lands (
  id              UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title           TEXT NOT NULL,
  slug            TEXT UNIQUE NOT NULL,
  type            TEXT NOT NULL DEFAULT 'agricultural', -- 'agricultural', 'residential', 'industrial', 'commercial'
  status          TEXT NOT NULL DEFAULT 'available',
  listing_type    TEXT NOT NULL DEFAULT 'lands',
  price           NUMERIC NOT NULL,
  price_currency  TEXT NOT NULL DEFAULT 'INR',
  area_sqft       INTEGER NOT NULL DEFAULT 0,
  zoning          TEXT, -- Specific to land
  location        TEXT NOT NULL,
  community       TEXT NOT NULL,
  developer       TEXT,
  description     TEXT NOT NULL DEFAULT '',
  features        TEXT[] DEFAULT '{}',
  images          TEXT[] DEFAULT '{}',
  featured        BOOLEAN NOT NULL DEFAULT false,
  featured_sections TEXT[] DEFAULT '{}',
  display_sections TEXT[] DEFAULT '{}',
  highlights      TEXT[] DEFAULT '{}',
  latitude        NUMERIC,
  longitude       NUMERIC,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Enable RLS
ALTER TABLE apartments ENABLE ROW LEVEL SECURITY;
ALTER TABLE houses ENABLE ROW LEVEL SECURITY;
ALTER TABLE lands ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view apartments" ON apartments FOR SELECT USING (true);
CREATE POLICY "Public can view houses" ON houses FOR SELECT USING (true);
CREATE POLICY "Public can view lands" ON lands FOR SELECT USING (true);

CREATE POLICY "Authenticated can manage apartments" ON apartments FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated can manage houses" ON houses FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated can manage lands" ON lands FOR ALL USING (auth.role() = 'authenticated');

-- 5. Data Migration from properties table
INSERT INTO apartments (
    id, title, slug, type, status, listing_type, price, price_currency, bedrooms, bathrooms, 
    area_sqft, location, community, developer, furnishing, description, features, images, 
    featured, featured_sections, highlights, amenities, latitude, longitude, created_at, updated_at
)
SELECT 
    id, title, slug, type, status, listing_type, price, price_currency, bedrooms, bathrooms, 
    area_sqft, location, community, developer, furnishing, description, features, images, 
    featured, COALESCE(featured_sections, '{}'), highlights, amenities, latitude, longitude, created_at, updated_at
FROM properties
WHERE type IN ('apartment', 'penthouse', 'studio');

INSERT INTO houses (
    id, title, slug, type, status, listing_type, price, price_currency, bedrooms, bathrooms, 
    area_sqft, location, community, developer, furnishing, description, features, images, 
    featured, featured_sections, highlights, amenities, latitude, longitude, created_at, updated_at
)
SELECT 
    id, title, slug, type, status, listing_type, price, price_currency, bedrooms, bathrooms, 
    area_sqft, location, community, developer, furnishing, description, features, images, 
    featured, COALESCE(featured_sections, '{}'), highlights, amenities, latitude, longitude, created_at, updated_at
FROM properties
WHERE type IN ('villa', 'townhouse');

INSERT INTO lands (
    id, title, slug, type, status, listing_type, price, price_currency, 
    area_sqft, location, community, developer, description, features, images, 
    featured, featured_sections, highlights, latitude, longitude, created_at, updated_at
)
SELECT 
    id, title, slug, type, status, listing_type, price, price_currency, 
    area_sqft, location, community, developer, description, features, images, 
    featured, COALESCE(featured_sections, '{}'), highlights, latitude, longitude, created_at, updated_at
FROM properties
WHERE type NOT IN ('apartment', 'penthouse', 'studio', 'villa', 'townhouse');

-- 6. Modify Leads table
ALTER TABLE leads ADD COLUMN apartment_id UUID REFERENCES apartments(id) ON DELETE SET NULL;
ALTER TABLE leads ADD COLUMN house_id UUID REFERENCES houses(id) ON DELETE SET NULL;
ALTER TABLE leads ADD COLUMN land_id UUID REFERENCES lands(id) ON DELETE SET NULL;

-- Remap lead property_id
UPDATE leads l
SET apartment_id = p.id
FROM properties p
WHERE l.property_id = p.id AND p.type IN ('apartment', 'penthouse', 'studio');

UPDATE leads l
SET house_id = p.id
FROM properties p
WHERE l.property_id = p.id AND p.type IN ('villa', 'townhouse');

UPDATE leads l
SET land_id = p.id
FROM properties p
WHERE l.property_id = p.id AND p.type NOT IN ('apartment', 'penthouse', 'studio', 'villa', 'townhouse');

-- Drop old FK and column
ALTER TABLE leads DROP COLUMN property_id;

-- 7. Create UNION VIEW for frontend
-- We rename the old properties table first
ALTER TABLE properties RENAME TO properties_old;

CREATE VIEW properties AS
SELECT 
    id, title, slug, type, status, listing_type, price, price_currency, 
    bedrooms, bathrooms, area_sqft, location, community, developer, furnishing, 
    description, features, images, featured, featured_sections, display_sections, highlights, 
    amenities, latitude, longitude, created_at, updated_at,
    'apartment' AS entity_type
FROM apartments
UNION ALL
SELECT 
    id, title, slug, type, status, listing_type, price, price_currency, 
    bedrooms, bathrooms, area_sqft, location, community, developer, furnishing, 
    description, features, images, featured, featured_sections, display_sections, highlights, 
    amenities, latitude, longitude, created_at, updated_at,
    'house' AS entity_type
FROM houses
UNION ALL
SELECT 
    id, title, slug, type, status, listing_type, price, price_currency, 
    NULL::integer AS bedrooms, NULL::integer AS bathrooms, area_sqft, location, community, developer, 'unfurnished' AS furnishing, 
    description, features, images, featured, featured_sections, display_sections, highlights, 
    '{}'::text[] AS amenities, latitude, longitude, created_at, updated_at,
    'lands' AS entity_type
FROM lands;

COMMIT;
