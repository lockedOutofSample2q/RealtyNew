-- supabase/schema.sql
-- ============================================================
-- MONTER REAL ESTATE — DATABASE SCHEMA
-- ─────────────────────────────────────────────────────────────
-- HOW TO USE:
--   1. Open your Supabase project
--   2. Go to SQL Editor
--   3. Paste this entire file and click Run
--   4. Done — all tables and policies are created
-- ============================================================

-- ── Enable UUID extension ────────────────────────────────────
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ── Properties ───────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS properties (
  id              UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title           TEXT NOT NULL,
  slug            TEXT UNIQUE NOT NULL,
  type            TEXT NOT NULL CHECK (type IN ('apartment','villa','penthouse','townhouse','studio')),
  status          TEXT NOT NULL DEFAULT 'available' CHECK (status IN ('available','sold','rented','off-plan')),
  listing_type    TEXT NOT NULL CHECK (listing_type IN ('sale','rent','off-plan')),
  price           NUMERIC NOT NULL,
  price_currency  TEXT NOT NULL DEFAULT 'AED',
  bedrooms        INTEGER,        -- NULL = studio
  bathrooms       INTEGER NOT NULL DEFAULT 1,
  area_sqft       INTEGER NOT NULL DEFAULT 0,
  location        TEXT NOT NULL DEFAULT 'Dubai',
  community       TEXT NOT NULL,
  developer       TEXT,
  furnishing      TEXT NOT NULL DEFAULT 'unfurnished',
  description     TEXT NOT NULL DEFAULT '',
  features        TEXT[] DEFAULT '{}',
  images          TEXT[] DEFAULT '{}',
  featured        BOOLEAN NOT NULL DEFAULT false,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER properties_updated_at
  BEFORE UPDATE ON properties
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ── Leads ─────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS leads (
  id          UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name        TEXT NOT NULL,
  email       TEXT NOT NULL,
  phone       TEXT DEFAULT '',
  message     TEXT,
  source      TEXT NOT NULL DEFAULT 'contact',
  property_id UUID REFERENCES properties(id) ON DELETE SET NULL,
  status      TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new','contacted','qualified','closed')),
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ── Subscribers ───────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS subscribers (
  id          UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  email       TEXT UNIQUE NOT NULL,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ── Row Level Security (RLS) ──────────────────────────────────
-- Public can read properties (site needs this)
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view properties"
  ON properties FOR SELECT USING (true);
CREATE POLICY "Authenticated can manage properties"
  ON properties FOR ALL USING (auth.role() = 'authenticated');

-- Leads: anyone can insert (contact form), only authenticated can read
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can create leads"
  ON leads FOR INSERT WITH CHECK (true);
CREATE POLICY "Authenticated can view leads"
  ON leads FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated can update leads"
  ON leads FOR UPDATE USING (auth.role() = 'authenticated');

-- Subscribers: insert only public, read only authenticated
ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can subscribe"
  ON subscribers FOR INSERT WITH CHECK (true);
CREATE POLICY "Authenticated can view subscribers"
  ON subscribers FOR SELECT USING (auth.role() = 'authenticated');

-- ── Sample data (optional, delete before production) ─────────
INSERT INTO properties (title, slug, type, status, listing_type, price, price_currency, bedrooms, bathrooms, area_sqft, location, community, developer, furnishing, description, featured, images)
VALUES
  (
    'ENARA by OMNIYAT',
    'enara-by-omniyat',
    'apartment', 'off-plan', 'off-plan',
    3200000, 'AED', 2, 2, 1450,
    'Dubai', 'Business Bay', 'OMNIYAT',
    'unfurnished',
    'ENARA is OMNIYAT''s latest residential masterpiece in Business Bay — a tower defined by sharp geometry, double-height lobbies, and unobstructed views of the Burj Khalifa.',
    true,
    ARRAY['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800']
  ),
  (
    'Marina Heights Penthouse',
    'marina-heights-penthouse',
    'penthouse', 'available', 'sale',
    8500000, 'AED', 4, 5, 4200,
    'Dubai', 'Dubai Marina', NULL,
    'furnished',
    'Full-floor penthouse with 270-degree Marina views. Private pool, chef''s kitchen, and direct beach access.',
    false,
    ARRAY['https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800']
  ),
  (
    'Creek Harbour 1-Bed',
    'creek-harbour-1-bed',
    'apartment', 'available', 'rent',
    95000, 'AED', 1, 1, 720,
    'Dubai', 'Creek Harbour', 'Emaar',
    'furnished',
    'Bright 1-bedroom with full Creek Tower view. Furnished to hotel standard. Ready to move in.',
    false,
    ARRAY['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800']
  );
