-- ============================================================
-- AGENTS TABLE
-- Run in Supabase SQL Editor
-- ============================================================

CREATE TABLE IF NOT EXISTS agents (
  id          uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name        text NOT NULL,
  title       text DEFAULT 'Property Consultant',
  email       text,
  phone       text,
  photo_url   text,
  languages   text[] DEFAULT '{}',
  bio         text,
  active      boolean DEFAULT true,
  created_at  timestamptz DEFAULT now(),
  updated_at  timestamptz DEFAULT now()
);

ALTER TABLE agents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public agents read" ON agents
  FOR SELECT USING (true);

CREATE POLICY "Auth agents write" ON agents
  FOR ALL USING (auth.role() = 'authenticated');

-- Link agents to properties (optional — inline fields still work)
ALTER TABLE properties
  ADD COLUMN IF NOT EXISTS agent_id uuid REFERENCES agents(id) ON DELETE SET NULL;
