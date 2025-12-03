-- ==========================================
-- PROMOTIONS TABLE SETUP
-- Kopieren Sie diesen Code und führen Sie ihn in Supabase SQL Editor aus
-- ==========================================

-- 1. Promotions Table erstellen
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

-- 2. Row Level Security aktivieren
ALTER TABLE promotions ENABLE ROW LEVEL SECURITY;

-- 3. Policies erstellen (Lese-Zugriff für alle, Schreib-Zugriff für Admins)
CREATE POLICY "Public can read promotions" ON promotions FOR SELECT USING (true);
CREATE POLICY "Allow all insert promotions" ON promotions FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow all update promotions" ON promotions FOR UPDATE USING (true);
CREATE POLICY "Allow all delete promotions" ON promotions FOR DELETE USING (true);

-- 4. Trigger für updated_at erstellen
CREATE TRIGGER update_promotions_updated_at
BEFORE UPDATE ON promotions
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- 5. Indexes für Performance erstellen
CREATE INDEX idx_promotions_order ON promotions("order");
CREATE INDEX idx_promotions_active ON promotions(active);

-- 6. Erfolgs-Nachricht
SELECT 'Promotions table successfully created!' as status;
