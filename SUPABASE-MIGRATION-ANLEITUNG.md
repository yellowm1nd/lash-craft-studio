# Supabase Migration Anleitung

## Problem
Die Service-URLs verwenden aktuell UUIDs (z.B. `7b0414bb-5ec9-48ae-b87d-ae4b2dca979c`) statt SEO-freundliche Slugs (z.B. `wimpernverlaengerung`).

## Lösung in 3 Schritten

### Schritt 1: Prices Tabelle erweitern

1. Öffne Supabase Dashboard: https://supabase.com/dashboard
2. Wähle dein Projekt: **lashes-by-danesh**
3. Gehe zu **SQL Editor** (linke Sidebar)
4. Öffne die Datei: `supabase-migration-prices.sql`
5. Kopiere den gesamten Inhalt
6. Füge ihn in den SQL Editor ein
7. Klicke **Run** (oben rechts)
8. Prüfe die Ausgabe - alle Einträge sollten jetzt `service_id` haben

### Schritt 2: Services Tabelle prüfen

1. Im SQL Editor, öffne: `supabase-check-services.sql`
2. Kopiere nur den ersten SELECT-Befehl:
   ```sql
   SELECT id, title, excerpt FROM services ORDER BY "order";
   ```
3. Führe ihn aus
4. **Prüfe die IDs:**
   - ✅ Wenn IDs wie `wimpernverlaengerung` aussehen → **Fertig, nichts zu tun!**
   - ❌ Wenn IDs wie `7b0414bb-5ec9-...` aussehen → **Weiter zu Schritt 3**

### Schritt 3: Services IDs korrigieren (nur falls nötig)

**Option A - Services sind wichtig, Daten behalten:**
```sql
UPDATE services
SET id = 'wimpernverlaengerung'
WHERE title = 'Wimpernverlängerungen';

UPDATE services
SET id = 'augenbrauen-wimpern-behandlungen'
WHERE title = 'Augenbrauen & Wimpernbehandlungen';
```

**Option B - Services neu anlegen lassen (empfohlen):**
```sql
DELETE FROM services WHERE id LIKE '%-%-%-%-%';
```
Danach im Admin-Panel (`/l-787/services`) die Services neu anlegen mit:
- ID: `wimpernverlaengerung`
- ID: `augenbrauen-wimpern-behandlungen`

### Schritt 4: Migration testen

1. Öffne die Website: http://localhost:8080/behandlungen
2. Klicke auf "Wimpernverlängerungen"
3. ✅ URL sollte sein: `/behandlungen/wimpernverlaengerung`
4. ✅ Preise sollten als Akkordeon angezeigt werden

## Nach der Migration

### URLs funktionieren:
- `/behandlungen` - Übersicht aller Services
- `/behandlungen/wimpernverlaengerung` - Wimpernverlängerung Detail
- `/behandlungen/augenbrauen-wimpern-behandlungen` - Augenbrauen Detail

### Admin Preisverwaltung:
- `/l-787/prices` - Alle Preiskategorien verwalten
- Neue Kategorien hinzufügen pro Service
- Unterkategorien (Items) hinzufügen/bearbeiten
- Flexibel für alle zukünftigen Services

## Bei Problemen

Wenn nach der Migration Fehler auftreten:

1. **Services werden nicht angezeigt:**
   - Prüfe in Supabase: `SELECT * FROM services;`
   - IDs sollten Slugs sein, keine UUIDs

2. **Preise werden nicht angezeigt:**
   - Prüfe in Supabase: `SELECT * FROM prices WHERE service_id IS NOT NULL;`
   - Alle Einträge sollten `service_id` haben

3. **404 bei Service-Detail:**
   - Prüfe, ob Service-ID mit URL übereinstimmt
   - Beispiel: Service-ID muss `wimpernverlaengerung` sein für `/behandlungen/wimpernverlaengerung`

## Kontakt

Bei Fragen oder Problemen, schreib mir! 🚀
