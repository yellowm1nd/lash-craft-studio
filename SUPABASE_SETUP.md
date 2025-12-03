# Supabase Setup Anleitung für Lash Craft Studio

## ✅ Was bereits erledigt ist:

- Supabase Client installiert
- Environment-Variablen eingerichtet (`.env.local`)
- Datenbank-Schema vorbereitet
- Admin-Panel mit Galerie-Manager erstellt
- Bild-Upload-Funktion implementiert
- Migrations-Tool erstellt

---

## 🚀 Schritt 1: Datenbank-Schema erstellen

1. Gehe zu https://supabase.com/dashboard
2. Wähle dein Projekt **"lashes-by-danesh"** aus
3. Klicke in der linken Sidebar auf **"SQL Editor"** (</> Symbol)
4. Klicke auf **"New query"**
5. Öffne die Datei `supabase/schema.sql` in deinem Editor
6. Kopiere den **GESAMTEN Inhalt** (ca. 145 Zeilen)
7. Füge ihn in den Supabase SQL Editor ein
8. Klicke unten rechts auf **"Run"**
9. ✅ Warte bis **"Success. No rows returned"** angezeigt wird

**Falls ein Fehler kommt:** Screenshot machen und mir zeigen!

---

## 📦 Schritt 2: Storage Bucket erstellen (für Foto-Upload)

1. Klicke in der linken Sidebar auf **"Storage"** (Ordner-Symbol)
2. Klicke auf **"New bucket"** (grüner Button)
3. Name: **`images`** eingeben (genau so, ohne Leerzeichen!)
4. ⚠️ **WICHTIG:** Haken bei **"Public bucket"** setzen ✅
5. Klicke auf **"Create bucket"**

---

## 🔒 Schritt 3: Storage Policies einrichten

1. Gehe wieder zum **"SQL Editor"** (</> Symbol links)
2. Klicke auf **"New query"**
3. Öffne die Datei `supabase/storage-policies.sql`
4. Kopiere den **gesamten Inhalt**
5. Füge ihn in den SQL Editor ein
6. Klicke auf **"Run"**
7. ✅ Warte bis **"Success"** angezeigt wird

---

## 🚀 Schritt 4: Dev-Server starten & Daten migrieren

1. **Terminal öffnen** im Projekt-Ordner
2. Dev-Server starten:
   ```bash
   npm run dev
   ```
3. Öffne im Browser: **http://localhost:5173/l-787**
4. Login mit Passwort: **`danesh2025`**
5. Klicke auf **"Datenmigration"**
6. Klicke auf **"Migration starten"**
7. ✅ Warte bis "Migration erfolgreich!" angezeigt wird

---

## 🎉 Fertig! Was kannst du jetzt alles machen?

### 🖼️ **Galerie verwalten**
- **Bilder hochladen**: Drag & Drop oder Klicken
- **Bilder löschen**: Hover über Bild → Trash-Icon
- **Reihenfolge ändern**: Order-Feld bearbeiten

### 💇 **Services/Behandlungen** (kommt später)
- Neue Behandlungen hinzufügen
- Texte & Beschreibungen bearbeiten
- Bilder hochladen

### 💰 **Preise** (kommt später)
- Preiskategorien verwalten
- Einzelne Preise anpassen
- Badges hinzufügen

### ⭐ **Testimonials** (kommt später)
- Kundenbewertungen hinzufügen
- Mit Kundenfotos

### ⚙️ **Einstellungen**
- Kontaktdaten ändern
- Öffnungszeiten anpassen
- Social Media Links

---

## 📤 Deployment auf Vercel

Wenn du die Website live deployen willst:

1. Gehe zu https://vercel.com
2. Wähle dein Projekt aus
3. **Settings** → **Environment Variables**
4. Füge diese 3 Variablen hinzu:
   ```
   VITE_SUPABASE_URL = https://csquuisxijkyrekqjgby.supabase.co
   VITE_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   VITE_SUPABASE_SERVICE_ROLE_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```
5. **Deployments** → **Redeploy**

---

## ❓ Probleme?

**Schema-Fehler:**
- Kopiere den KOMPLETTEN Inhalt aus `schema.sql`
- Stelle sicher, dass keine Zeilen fehlen
- Screenshot vom Fehler schicken

**Storage-Fehler:**
- Überprüfe ob der `images` Bucket **public** ist
- Storage Policies nochmal ausführen

**Migration schlägt fehl:**
- Browser-Console öffnen (F12)
- Screenshot vom Fehler schicken
- Prüfe ob Schema & Storage korrekt eingerichtet sind

**Bilder lassen sich nicht hochladen:**
- Überprüfe Storage Policies
- Prüfe ob `.env.local` die richtigen Keys hat
- Browser-Console auf Fehler prüfen
