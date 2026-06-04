-- supabase/google_indexing_schema.sql
-- ============================================================
-- GOOGLE SEARCH CONSOLE & INDEXING STATUS TABLE
-- ============================================================

CREATE TABLE IF NOT EXISTS google_indexing_status (
  id                        UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  url                       TEXT UNIQUE NOT NULL,
  status                    TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'submitted', 'indexed', 'not_indexed', 'error')),
  last_submitted_at         TIMESTAMPTZ,
  submit_count              INTEGER DEFAULT 0,
  last_inspected_at         TIMESTAMPTZ,
  inspection_verdict        TEXT CHECK (inspection_verdict IN ('PASS', 'NEUTRAL', 'FAIL')),
  inspection_coverage_state TEXT,
  last_crawl_time           TIMESTAMPTZ,
  robots_txt_status         TEXT,
  page_fetch_status         TEXT,
  error_message             TEXT,
  created_at                TIMESTAMPTZ DEFAULT NOW(),
  updated_at                TIMESTAMPTZ DEFAULT NOW()
);

-- Trigger to auto-update updated_at
CREATE OR REPLACE FUNCTION update_google_indexing_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER google_indexing_status_updated_at
  BEFORE UPDATE ON google_indexing_status
  FOR EACH ROW EXECUTE FUNCTION update_google_indexing_updated_at();

-- Enable Row Level Security (RLS)
ALTER TABLE google_indexing_status ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users (admin role) full access
CREATE POLICY "Authenticated can manage google_indexing_status"
  ON google_indexing_status FOR ALL USING (auth.role() = 'authenticated');
