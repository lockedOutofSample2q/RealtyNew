-- Migration to create the new dedicated document_downloads table
CREATE TABLE IF NOT EXISTS document_downloads (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  whatsapp text NOT NULL,
  city text NOT NULL,
  downloaded_file text NOT NULL,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security (optional, Admin client bypasses)
ALTER TABLE document_downloads ENABLE ROW LEVEL SECURITY;
