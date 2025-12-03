-- Lash Craft Studio Database Schema
-- Run this SQL in Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Content Table (für flexible Inhalte wie Hero-Text, About-Text, etc.)
CREATE TABLE IF NOT EXISTS content (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key TEXT NOT NULL UNIQUE,
  value JSONB NOT NULL,
  category TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Services Table
CREATE TABLE IF NOT EXISTS services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT NOT NULL,
  "order" INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Gallery Table
CREATE TABLE IF NOT EXISTS gallery (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  image_url TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  "order" INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Testimonials Table
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  text TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Prices Table
CREATE TABLE IF NOT EXISTS prices (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category TEXT NOT NULL,
  items JSONB NOT NULL,
  "order" INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Settings Table
CREATE TABLE IF NOT EXISTS settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key TEXT NOT NULL UNIQUE,
  value JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Promotions Table (Aktionen/Angebote)
CREATE TABLE IF NOT EXISTS promotions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT NOT NULL,
  active BOOLEAN NOT NULL DEFAULT true,
  "order" INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE content ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE prices ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE promotions ENABLE ROW LEVEL SECURITY;

-- Public read access policies
CREATE POLICY "Public can read content" ON content FOR SELECT USING (true);
CREATE POLICY "Public can read services" ON services FOR SELECT USING (true);
CREATE POLICY "Public can read gallery" ON gallery FOR SELECT USING (true);
CREATE POLICY "Public can read testimonials" ON testimonials FOR SELECT USING (true);
CREATE POLICY "Public can read prices" ON prices FOR SELECT USING (true);
CREATE POLICY "Public can read settings" ON settings FOR SELECT USING (true);
CREATE POLICY "Public can read promotions" ON promotions FOR SELECT USING (true);

-- Admin write access policies (allow all authenticated operations for now - we'll handle auth in the app)
CREATE POLICY "Allow all insert content" ON content FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow all update content" ON content FOR UPDATE USING (true);
CREATE POLICY "Allow all delete content" ON content FOR DELETE USING (true);

CREATE POLICY "Allow all insert services" ON services FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow all update services" ON services FOR UPDATE USING (true);
CREATE POLICY "Allow all delete services" ON services FOR DELETE USING (true);

CREATE POLICY "Allow all insert gallery" ON gallery FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow all update gallery" ON gallery FOR UPDATE USING (true);
CREATE POLICY "Allow all delete gallery" ON gallery FOR DELETE USING (true);

CREATE POLICY "Allow all insert testimonials" ON testimonials FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow all update testimonials" ON testimonials FOR UPDATE USING (true);
CREATE POLICY "Allow all delete testimonials" ON testimonials FOR DELETE USING (true);

CREATE POLICY "Allow all insert prices" ON prices FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow all update prices" ON prices FOR UPDATE USING (true);
CREATE POLICY "Allow all delete prices" ON prices FOR DELETE USING (true);

CREATE POLICY "Allow all insert settings" ON settings FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow all update settings" ON settings FOR UPDATE USING (true);
CREATE POLICY "Allow all delete settings" ON settings FOR DELETE USING (true);

CREATE POLICY "Allow all insert promotions" ON promotions FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow all update promotions" ON promotions FOR UPDATE USING (true);
CREATE POLICY "Allow all delete promotions" ON promotions FOR DELETE USING (true);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add triggers for updated_at
CREATE TRIGGER update_content_updated_at BEFORE UPDATE ON content
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON services
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_gallery_updated_at BEFORE UPDATE ON gallery
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_testimonials_updated_at BEFORE UPDATE ON testimonials
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_prices_updated_at BEFORE UPDATE ON prices
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_settings_updated_at BEFORE UPDATE ON settings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_promotions_updated_at BEFORE UPDATE ON promotions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX idx_content_key ON content(key);
CREATE INDEX idx_content_category ON content(category);
CREATE INDEX idx_services_order ON services("order");
CREATE INDEX idx_gallery_order ON gallery("order");
CREATE INDEX idx_prices_order ON prices("order");
CREATE INDEX idx_settings_key ON settings(key);
CREATE INDEX idx_promotions_order ON promotions("order");
CREATE INDEX idx_promotions_active ON promotions(active);
