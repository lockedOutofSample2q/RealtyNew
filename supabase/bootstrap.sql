-- ============================================================
-- MONTE REAL ESTATE — SUPABASE BOOTSTRAP
-- ============================================================
-- Run this ONCE in Supabase Dashboard → SQL Editor → New Query
-- It is safe to re-run (uses IF NOT EXISTS + DROP IF EXISTS)
-- ============================================================

-- ── Extensions ───────────────────────────────────────────────
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ── updated_at trigger function ──────────────────────────────
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================================
-- TABLE: agents
-- ============================================================
CREATE TABLE IF NOT EXISTS agents (
  id          UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name        TEXT NOT NULL,
  title       TEXT DEFAULT 'Property Consultant',
  email       TEXT UNIQUE,
  phone       TEXT,
  photo_url   TEXT,
  languages   TEXT[]    DEFAULT '{}',
  bio         TEXT,
  active      BOOLEAN   NOT NULL DEFAULT true,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

DROP TRIGGER IF EXISTS agents_updated_at ON agents;
CREATE TRIGGER agents_updated_at
  BEFORE UPDATE ON agents
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- TABLE: properties
-- ============================================================
CREATE TABLE IF NOT EXISTS properties (
  -- Identity
  id                      UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title                   TEXT NOT NULL,
  slug                    TEXT UNIQUE NOT NULL,

  -- Classification
  type                    TEXT NOT NULL CHECK (type IN ('apartment','villa','penthouse','townhouse','studio')),
  status                  TEXT NOT NULL DEFAULT 'available' CHECK (status IN ('available','sold','rented','off-plan')),
  listing_type            TEXT NOT NULL CHECK (listing_type IN ('sale','rent','off-plan')),

  -- Pricing
  price                   NUMERIC NOT NULL DEFAULT 0,
  price_currency          TEXT NOT NULL DEFAULT 'INR',

  -- Size
  bedrooms                INTEGER,          -- NULL = studio
  bedrooms_max            INTEGER,          -- for off-plan range (e.g. 1–3 bed)
  bathrooms               INTEGER NOT NULL DEFAULT 1,
  area_sqft               INTEGER NOT NULL DEFAULT 0,

  -- Location
  location                TEXT NOT NULL DEFAULT 'Dubai',
  community               TEXT NOT NULL DEFAULT '',
  building_name           TEXT,
  address                 TEXT,
  latitude                NUMERIC,
  longitude               NUMERIC,

  -- Developer
  developer               TEXT,
  developer_website       TEXT,

  -- Details
  furnishing              TEXT NOT NULL DEFAULT 'unfurnished',
  description             TEXT NOT NULL DEFAULT '',
  features                TEXT[]    DEFAULT '{}',
  highlights              TEXT[]    DEFAULT '{}',
  amenities               TEXT[]    DEFAULT '{}',
  amenities_gallery       TEXT[]    DEFAULT '{}',
  interior_features       TEXT[]    DEFAULT '{}',
  nearby_landmarks        JSONB     DEFAULT '[]',

  -- Media
  images                  TEXT[]    DEFAULT '{}',
  image_count             INTEGER,
  unit_types_image        TEXT,
  unit_types_coming_soon  BOOLEAN   NOT NULL DEFAULT false,

  -- Off-plan
  payment_plan            JSONB,
  documents               JSONB     DEFAULT '[]',

  -- Agent (FK + inline fallback)
  agent_id                UUID REFERENCES agents(id) ON DELETE SET NULL,
  agent_name              TEXT,
  agent_title             TEXT,
  agent_email             TEXT,
  agent_phone             TEXT,
  agent_photo             TEXT,
  agent_languages         TEXT[]    DEFAULT '{}',

  -- Flags
  featured                BOOLEAN   NOT NULL DEFAULT false,

  -- Timestamps
  created_at              TIMESTAMPTZ DEFAULT NOW(),
  updated_at              TIMESTAMPTZ DEFAULT NOW()
);

DROP TRIGGER IF EXISTS properties_updated_at ON properties;
CREATE TRIGGER properties_updated_at
  BEFORE UPDATE ON properties
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- TABLE: leads
-- ============================================================
CREATE TABLE IF NOT EXISTS leads (
  id            UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name          TEXT NOT NULL,
  email         TEXT NOT NULL,
  phone         TEXT DEFAULT '',
  company       TEXT DEFAULT '',
  message       TEXT,
  source        TEXT NOT NULL DEFAULT 'contact',
  project_type  TEXT DEFAULT '',
  contact_method TEXT DEFAULT '',
  preferred_time TEXT DEFAULT '',
  property_id   UUID REFERENCES properties(id) ON DELETE SET NULL,
  status        TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new','contacted','qualified','closed')),
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- TABLE: subscribers
-- ============================================================
CREATE TABLE IF NOT EXISTS subscribers (
  id          UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  email       TEXT UNIQUE NOT NULL,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

-- agents: public read, authenticated write
ALTER TABLE agents ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can view active agents" ON agents;
CREATE POLICY "Public can view active agents"
  ON agents FOR SELECT USING (active = true);
DROP POLICY IF EXISTS "Authenticated can manage agents" ON agents;
CREATE POLICY "Authenticated can manage agents"
  ON agents FOR ALL USING (auth.role() = 'authenticated');

-- properties: public read, authenticated write
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can view properties" ON properties;
CREATE POLICY "Public can view properties"
  ON properties FOR SELECT USING (true);
DROP POLICY IF EXISTS "Authenticated can manage properties" ON properties;
CREATE POLICY "Authenticated can manage properties"
  ON properties FOR ALL USING (auth.role() = 'authenticated');

-- leads: public insert, authenticated read/update
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Anyone can create leads" ON leads;
CREATE POLICY "Anyone can create leads"
  ON leads FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Authenticated can view leads" ON leads;
CREATE POLICY "Authenticated can view leads"
  ON leads FOR SELECT USING (auth.role() = 'authenticated');
DROP POLICY IF EXISTS "Authenticated can update leads" ON leads;
CREATE POLICY "Authenticated can update leads"
  ON leads FOR UPDATE USING (auth.role() = 'authenticated');

-- subscribers: public insert, authenticated read
ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Anyone can subscribe" ON subscribers;
CREATE POLICY "Anyone can subscribe"
  ON subscribers FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Authenticated can view subscribers" ON subscribers;
CREATE POLICY "Authenticated can view subscribers"
  ON subscribers FOR SELECT USING (auth.role() = 'authenticated');

-- ============================================================
-- SEED DATA  (safe to re-run — uses ON CONFLICT DO UPDATE)
-- ============================================================

INSERT INTO agents (name, title, email, phone, languages, bio, active)
VALUES
  (
    'Armina Crnovrsanin',
    'CEO, Monte Real Estate',
    'armina@monterealestate.ae',
    '+971 58 534 7884',
    ARRAY['English', 'Arabic', 'Bosnian'],
    'Founder and CEO of Monte Real Estate. Specialises in luxury off-plan and high-value investor acquisitions across Dubai.',
    true
  ),
  (
    'Omar Al Farsi',
    'Investment Advisor',
    'omar@monterealestate.ae',
    '+971 55 987 6543',
    ARRAY['English', 'Arabic'],
    'Works with overseas buyers and yield-focused portfolios across Dubai Marina and Creek Harbour.',
    true
  )
ON CONFLICT (email) DO UPDATE SET
  name       = EXCLUDED.name,
  title      = EXCLUDED.title,
  phone      = EXCLUDED.phone,
  languages  = EXCLUDED.languages,
  bio        = EXCLUDED.bio,
  active     = EXCLUDED.active,
  updated_at = NOW();

INSERT INTO properties (
  title, slug, type, status, listing_type,
  price, price_currency, bedrooms, bathrooms, area_sqft,
  location, community, developer, furnishing,
  description, features, images, featured,
  agent_name, agent_title, agent_email, agent_phone, agent_languages
)
VALUES
  (
    'The Alba Residences',
    'the-alba-residences',
    'apartment', 'off-plan', 'off-plan',
    2850000, 'INR', 2, 3, 1640,
    'Dubai Marina', 'Dubai Marina', 'OMNIYAT', 'furnished',
    'Ultra-luxury living managed by Dorchester Collection. Breathtaking sea views, private plunge pools, and bespoke concierge services in the heart of Dubai Marina.',
    ARRAY['Sea View','Private Pool','Concierge','Gym','Spa','Valet Parking'],
    ARRAY['https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200','https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=1200'],
    true,
    'Armina Crnovrsanin', 'CEO, Monte Real Estate', 'armina@monterealestate.ae', '+971 58 534 7884', ARRAY['English','Arabic','Bosnian']
  ),
  (
    'Creek Horizon Tower',
    'creek-horizon-tower',
    'apartment', 'off-plan', 'off-plan',
    1490000, 'INR', 1, 2, 780,
    'Dubai Creek Harbour', 'Creek Harbour', 'Emaar Properties', 'unfurnished',
    'Contemporary 1-bedroom residences overlooking the iconic Dubai Creek Tower. Premium finishes, smart home technology, and world-class amenities.',
    ARRAY['Creek View','Smart Home','Infinity Pool','Rooftop Terrace'],
    ARRAY['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200','https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=1200'],
    false,
    'Omar Al Farsi', 'Investment Advisor', 'omar@monterealestate.ae', '+971 55 987 6543', ARRAY['English','Arabic']
  ),
  (
    'Tilal Al Ghaf Villas',
    'tilal-al-ghaf-villas',
    'villa', 'off-plan', 'off-plan',
    4800000, 'INR', 4, 5, 4200,
    'Tilal Al Ghaf', 'Tilal Al Ghaf', 'Majid Al Futtaim', 'unfurnished',
    'Exclusive lakeside villas in Tilal Al Ghaf — Dubai''s newest lifestyle destination. Private gardens, lagoon access, and resort-style amenities.',
    ARRAY['Lagoon Access','Private Garden','Maid''s Room','4-Car Garage','Smart Home'],
    ARRAY['https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200','https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200'],
    true,
    'Armina Crnovrsanin', 'CEO, Monte Real Estate', 'armina@monterealestate.ae', '+971 58 534 7884', ARRAY['English','Arabic','Bosnian']
  ),
  (
    'Marina Heights Penthouse',
    'marina-heights-penthouse',
    'penthouse', 'available', 'sale',
    8500000, 'INR', 4, 5, 4200,
    'Dubai Marina', 'Dubai Marina', NULL, 'furnished',
    'Full-floor penthouse with 270-degree Marina views. Private pool, chef''s kitchen, and direct beach access.',
    ARRAY['Marina View','Private Pool','Chef''s Kitchen','Beach Access','Smart Home'],
    ARRAY['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200'],
    false,
    'Omar Al Farsi', 'Investment Advisor', 'omar@monterealestate.ae', '+971 55 987 6543', ARRAY['English','Arabic']
  ),
  (
    'Creek Harbour 1-Bed',
    'creek-harbour-1-bed',
    'apartment', 'available', 'rent',
    95000, 'INR', 1, 1, 720,
    'Dubai Creek Harbour', 'Creek Harbour', 'Emaar', 'furnished',
    'Bright 1-bedroom with full Creek Tower view. Furnished to hotel standard. Ready to move in.',
    ARRAY['Creek View','Fully Furnished','Gym','Pool','Covered Parking'],
    ARRAY['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200'],
    false,
    'Armina Crnovrsanin', 'CEO, Monte Real Estate', 'armina@monterealestate.ae', '+971 58 534 7884', ARRAY['English','Arabic','Bosnian']
  )
ON CONFLICT (slug) DO UPDATE SET
  title          = EXCLUDED.title,
  type           = EXCLUDED.type,
  status         = EXCLUDED.status,
  listing_type   = EXCLUDED.listing_type,
  price          = EXCLUDED.price,
  bedrooms       = EXCLUDED.bedrooms,
  bathrooms      = EXCLUDED.bathrooms,
  area_sqft      = EXCLUDED.area_sqft,
  location       = EXCLUDED.location,
  community      = EXCLUDED.community,
  developer      = EXCLUDED.developer,
  furnishing     = EXCLUDED.furnishing,
  description    = EXCLUDED.description,
  features       = EXCLUDED.features,
  images         = EXCLUDED.images,
  featured       = EXCLUDED.featured,
  agent_name     = EXCLUDED.agent_name,
  agent_title    = EXCLUDED.agent_title,
  agent_email    = EXCLUDED.agent_email,
  agent_phone    = EXCLUDED.agent_phone,
  agent_languages = EXCLUDED.agent_languages,
  updated_at     = NOW();
