CREATE TABLE IF NOT EXISTS public.sector_seo (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    sector_slug TEXT UNIQUE NOT NULL,
    city TEXT,
    meta_title TEXT,
    meta_description TEXT,
    h1_heading TEXT,
    intro_paragraph TEXT,
    faq_json JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
-- Enable RLS
ALTER TABLE public.sector_seo ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access on sector_seo" ON public.sector_seo FOR SELECT USING (true);
