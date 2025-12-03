# Supabase Row Level Security (RLS) Policies

## Übersicht

Dieses Dokument beschreibt die erforderlichen Row Level Security (RLS) Policies für die Lash Craft Studio Datenbank. Diese Policies gewährleisten, dass nur authentifizierte Admin-Benutzer Daten ändern können, während öffentliche Leseberechtigungen für die Website-Anzeige bestehen bleiben.

## Wichtige Hinweise

- **RLS muss auf ALLEN Tabellen aktiviert sein**
- Ohne korrekte RLS-Policies kann **JEDER** Daten ändern/löschen!
- Nur Benutzer mit den E-Mail-Adressen in `ADMIN_EMAILS` (AdminContext.tsx) sollten Schreibzugriff haben

## Admin-E-Mails

Aktuelle Admin-E-Mails (definiert in `/src/contexts/AdminContext.tsx`):
- `info@lashesbydanesh.at`
- `t.uhlir@immo.red`

**WICHTIG:** Diese Benutzer müssen in Supabase Auth angelegt sein!

---

## RLS Policies für jede Tabelle

### 1. Table: `services`

Speichert Behandlungs-Services (Wimpernverlängerung, Augenbrauen, etc.)

#### Enable RLS
```sql
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
```

#### Policy: Public SELECT (Alle können lesen)
```sql
CREATE POLICY "Public can view services"
ON services
FOR SELECT
TO public
USING (true);
```

#### Policy: Admin INSERT (Nur Admins können erstellen)
```sql
CREATE POLICY "Admins can insert services"
ON services
FOR INSERT
TO authenticated
WITH CHECK (
  auth.jwt() ->> 'email' IN (
    'info@lashesbydanesh.at',
    't.uhlir@immo.red'
  )
);
```

#### Policy: Admin UPDATE (Nur Admins können aktualisieren)
```sql
CREATE POLICY "Admins can update services"
ON services
FOR UPDATE
TO authenticated
USING (
  auth.jwt() ->> 'email' IN (
    'info@lashesbydanesh.at',
    't.uhlir@immo.red'
  )
);
```

#### Policy: Admin DELETE (Nur Admins können löschen)
```sql
CREATE POLICY "Admins can delete services"
ON services
FOR DELETE
TO authenticated
USING (
  auth.jwt() ->> 'email' IN (
    'info@lashesbydanesh.at',
    't.uhlir@immo.red'
  )
);
```

---

### 2. Table: `gallery`

Speichert Galerie-Bilder

#### Enable RLS
```sql
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
```

#### Policy: Public SELECT
```sql
CREATE POLICY "Public can view gallery"
ON gallery
FOR SELECT
TO public
USING (true);
```

#### Policy: Admin INSERT
```sql
CREATE POLICY "Admins can insert gallery"
ON gallery
FOR INSERT
TO authenticated
WITH CHECK (
  auth.jwt() ->> 'email' IN (
    'info@lashesbydanesh.at',
    't.uhlir@immo.red'
  )
);
```

#### Policy: Admin UPDATE
```sql
CREATE POLICY "Admins can update gallery"
ON gallery
FOR UPDATE
TO authenticated
USING (
  auth.jwt() ->> 'email' IN (
    'info@lashesbydanesh.at',
    't.uhlir@immo.red'
  )
);
```

#### Policy: Admin DELETE
```sql
CREATE POLICY "Admins can delete gallery"
ON gallery
FOR DELETE
TO authenticated
USING (
  auth.jwt() ->> 'email' IN (
    'info@lashesbydanesh.at',
    't.uhlir@immo.red'
  )
);
```

---

### 3. Table: `testimonials`

Speichert Kundenbewertungen

#### Enable RLS
```sql
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
```

#### Policy: Public SELECT
```sql
CREATE POLICY "Public can view testimonials"
ON testimonials
FOR SELECT
TO public
USING (true);
```

#### Policy: Admin INSERT
```sql
CREATE POLICY "Admins can insert testimonials"
ON testimonials
FOR INSERT
TO authenticated
WITH CHECK (
  auth.jwt() ->> 'email' IN (
    'info@lashesbydanesh.at',
    't.uhlir@immo.red'
  )
);
```

#### Policy: Admin UPDATE
```sql
CREATE POLICY "Admins can update testimonials"
ON testimonials
FOR UPDATE
TO authenticated
USING (
  auth.jwt() ->> 'email' IN (
    'info@lashesbydanesh.at',
    't.uhlir@immo.red'
  )
);
```

#### Policy: Admin DELETE
```sql
CREATE POLICY "Admins can delete testimonials"
ON testimonials
FOR DELETE
TO authenticated
USING (
  auth.jwt() ->> 'email' IN (
    'info@lashesbydanesh.at',
    't.uhlir@immo.red'
  )
);
```

---

### 4. Table: `prices`

Speichert Preiskategorien und Details

#### Enable RLS
```sql
ALTER TABLE prices ENABLE ROW LEVEL SECURITY;
```

#### Policy: Public SELECT
```sql
CREATE POLICY "Public can view prices"
ON prices
FOR SELECT
TO public
USING (true);
```

#### Policy: Admin INSERT
```sql
CREATE POLICY "Admins can insert prices"
ON prices
FOR INSERT
TO authenticated
WITH CHECK (
  auth.jwt() ->> 'email' IN (
    'info@lashesbydanesh.at',
    't.uhlir@immo.red'
  )
);
```

#### Policy: Admin UPDATE
```sql
CREATE POLICY "Admins can update prices"
ON prices
FOR UPDATE
TO authenticated
USING (
  auth.jwt() ->> 'email' IN (
    'info@lashesbydanesh.at',
    't.uhlir@immo.red'
  )
);
```

#### Policy: Admin DELETE
```sql
CREATE POLICY "Admins can delete prices"
ON prices
FOR DELETE
TO authenticated
USING (
  auth.jwt() ->> 'email' IN (
    'info@lashesbydanesh.at',
    't.uhlir@immo.red'
  )
);
```

---

### 5. Table: `settings`

Speichert Site-Einstellungen (Kontakt, Öffnungszeiten, etc.)

#### Enable RLS
```sql
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;
```

#### Policy: Public SELECT
```sql
CREATE POLICY "Public can view settings"
ON settings
FOR SELECT
TO public
USING (true);
```

#### Policy: Admin INSERT
```sql
CREATE POLICY "Admins can insert settings"
ON settings
FOR INSERT
TO authenticated
WITH CHECK (
  auth.jwt() ->> 'email' IN (
    'info@lashesbydanesh.at',
    't.uhlir@immo.red'
  )
);
```

#### Policy: Admin UPDATE
```sql
CREATE POLICY "Admins can update settings"
ON settings
FOR UPDATE
TO authenticated
USING (
  auth.jwt() ->> 'email' IN (
    'info@lashesbydanesh.at',
    't.uhlir@immo.red'
  )
);
```

#### Policy: Admin DELETE
```sql
CREATE POLICY "Admins can delete settings"
ON settings
FOR DELETE
TO authenticated
USING (
  auth.jwt() ->> 'email' IN (
    'info@lashesbydanesh.at',
    't.uhlir@immo.red'
  )
);
```

---

### 6. Table: `content`

Speichert CMS-Content

#### Enable RLS
```sql
ALTER TABLE content ENABLE ROW LEVEL SECURITY;
```

#### Policy: Public SELECT
```sql
CREATE POLICY "Public can view content"
ON content
FOR SELECT
TO public
USING (true);
```

#### Policy: Admin INSERT
```sql
CREATE POLICY "Admins can insert content"
ON content
FOR INSERT
TO authenticated
WITH CHECK (
  auth.jwt() ->> 'email' IN (
    'info@lashesbydanesh.at',
    't.uhlir@immo.red'
  )
);
```

#### Policy: Admin UPDATE
```sql
CREATE POLICY "Admins can update content"
ON content
FOR UPDATE
TO authenticated
USING (
  auth.jwt() ->> 'email' IN (
    'info@lashesbydanesh.at',
    't.uhlir@immo.red'
  )
);
```

#### Policy: Admin DELETE
```sql
CREATE POLICY "Admins can delete content"
ON content
FOR DELETE
TO authenticated
USING (
  auth.jwt() ->> 'email' IN (
    'info@lashesbydanesh.at',
    't.uhlir@immo.red'
  )
);
```

---

## Storage Bucket: `images`

Speichert hochgeladene Bilder

### Bucket Policies

#### Enable RLS on Storage
```sql
-- Bereits standardmäßig aktiviert in Supabase Storage
```

#### Policy: Public SELECT (Alle können Bilder ansehen)
```sql
CREATE POLICY "Public can view images"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'images');
```

#### Policy: Admin INSERT (Nur Admins können Bilder hochladen)
```sql
CREATE POLICY "Admins can upload images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'images' AND
  auth.jwt() ->> 'email' IN (
    'info@lashesbydanesh.at',
    't.uhlir@immo.red'
  )
);
```

#### Policy: Admin UPDATE
```sql
CREATE POLICY "Admins can update images"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
  bucket_id = 'images' AND
  auth.jwt() ->> 'email' IN (
    'info@lashesbydanesh.at',
    't.uhlir@immo.red'
  )
);
```

#### Policy: Admin DELETE (Nur Admins können Bilder löschen)
```sql
CREATE POLICY "Admins can delete images"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'images' AND
  auth.jwt() ->> 'email' IN (
    'info@lashesbydanesh.at',
    't.uhlir@immo.red'
  )
);
```

---

## Implementierungsanleitung

### Schritt 1: Supabase Dashboard öffnen
1. Gehe zu https://supabase.com/dashboard
2. Wähle dein Projekt
3. Gehe zu `Database` > `Policies`

### Schritt 2: RLS für jede Tabelle aktivieren
Für jede Tabelle (services, gallery, testimonials, prices, settings, content):
1. Klicke auf die Tabelle
2. Aktiviere "Enable RLS" oben rechts

### Schritt 3: Policies erstellen
1. Klicke auf "New Policy"
2. Wähle "Create a policy from scratch"
3. Kopiere die SQL-Befehle aus diesem Dokument
4. Klicke "Review" und dann "Save policy"

### Schritt 4: Admin-Benutzer erstellen
1. Gehe zu `Authentication` > `Users`
2. Klicke "Add user"
3. E-Mail: `info@lashesbydanesh.at`
4. Passwort: Starkes Passwort (12+ Zeichen)
5. Wiederhole für `t.uhlir@immo.red`

### Schritt 5: Storage Bucket konfigurieren
1. Gehe zu `Storage`
2. Erstelle Bucket `images` (falls nicht vorhanden)
3. Aktiviere "Public bucket" für Lesezugriff
4. Füge die Storage Policies hinzu (siehe oben)

---

## Verifizierung

### RLS Status prüfen
```sql
SELECT schemaname, tablename, rowsecurity
FROM pg_tables
WHERE schemaname = 'public';
```

Alle Tabellen sollten `rowsecurity = true` haben!

### Policies prüfen
```sql
SELECT schemaname, tablename, policyname, permissive, roles, cmd
FROM pg_policies
WHERE schemaname = 'public';
```

Jede Tabelle sollte 4 Policies haben (SELECT, INSERT, UPDATE, DELETE).

---

## Sicherheits-Checkliste

- [ ] RLS auf allen Tabellen aktiviert
- [ ] Alle 6 Tabellen haben 4 Policies (SELECT, INSERT, UPDATE, DELETE)
- [ ] Storage Bucket `images` hat Policies
- [ ] Admin-Benutzer in Supabase Auth angelegt
- [ ] Admin-E-Mails korrekt in Policies eingetragen
- [ ] Policies getestet (als Admin und als Anonymous)
- [ ] Service Role Key NICHT client-seitig exponiert
- [ ] .env.local in .gitignore

---

## Troubleshooting

### Problem: "Row Level Security Policy Violation"
**Ursache:** RLS ist aktiviert, aber keine passende Policy existiert
**Lösung:** Überprüfe, ob alle Policies korrekt erstellt wurden

### Problem: Admin kann nicht schreiben
**Ursache:** Admin-E-Mail nicht in Policy oder nicht in Auth
**Lösung:**
1. Überprüfe ob Benutzer in Supabase Auth existiert
2. Überprüfe ob E-Mail exakt in Policy übereinstimmt

### Problem: Öffentliche Benutzer können schreiben
**Ursache:** RLS nicht aktiviert oder fehlerhafte Policy
**Lösung:**
1. Stelle sicher RLS ist aktiviert
2. Überprüfe ob INSERT/UPDATE/DELETE Policies nur für `authenticated` gelten

---

## Support & Updates

Bei Änderungen der Admin-E-Mails:
1. Aktualisiere `AdminContext.tsx` (ADMIN_EMAILS)
2. Aktualisiere ALLE RLS Policies
3. Erstelle neuen Admin-Benutzer in Supabase Auth
4. Teste Login und Schreibzugriff

Dokumentation erstellt: 2025-10-20
Letzte Aktualisierung: 2025-10-20
