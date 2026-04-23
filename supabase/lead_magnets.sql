-- User Lead Magnets Table
CREATE TABLE IF NOT EXISTS lead_magnets (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  email text NOT NULL,
  whatsapp text,
  city text,
  campaign text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS (Optional, since we use Admin Client from the API it can bypass)
ALTER TABLE lead_magnets ENABLE ROW LEVEL SECURITY;
