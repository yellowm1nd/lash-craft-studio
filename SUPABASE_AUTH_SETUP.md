# Supabase Authentication Setup - Admin Passwort-Reset

Diese Anleitung erklärt, wie Sie die Supabase Authentication für den Admin-Bereich konfigurieren.

## 🚀 SCHNELLSTART - Lokale Entwicklung (DEV)

Für **lokale Tests** können Sie sich SOFORT einloggen mit:

### Admin-Account 1:
- **E-Mail:** `info@lashesbydanesh.at`
- **Passwort:** `Danesh2025!`

### Test-Account 2:
- **E-Mail:** `t.uhlir@immo.red`
- **Passwort:** `TestPass2025!`

Diese funktionieren **nur lokal** (localhost) und werden automatisch deaktiviert, sobald die Seite auf dem Server läuft.

---

## 📋 Für Production (Server) - Später einrichten

Wenn die Website auf dem Server online ist, befolgen Sie diese Schritte:

## 1. Supabase Dashboard öffnen

1. Gehen Sie zu: https://supabase.com/dashboard
2. Wählen Sie Ihr Projekt: **csquuisxijkyrekqjgby** (Lashes by Danesh)

## 2. Authentication aktivieren

1. Klicken Sie in der linken Sidebar auf **Authentication**
2. Klicken Sie auf **Users** (sollte bereits aktiv sein)

## 3. Admin-Benutzer erstellen

Sie müssen **zwei Admin-Benutzer** manuell erstellen:

### Hauptzugang:
- **E-Mail:** `info@lashesbydanesh.at`
- **Passwort:** [Ihr sicheres Passwort - mindestens 8 Zeichen]
- Klicken Sie auf **"Create User"**

### Test-Zugang (versteckt):
- **E-Mail:** `t.uhlir@immo.red`
- **Passwort:** [Ihr Testpasswort]
- Klicken Sie auf **"Create User"**

> **Wichtig:** Notieren Sie sich die Passwörter sicher! Diese werden in Supabase verschlüsselt gespeichert und können nicht abgerufen werden.

## 4. E-Mail-Templates konfigurieren (optional)

Für professionellere E-Mails können Sie die Templates anpassen:

1. Gehen Sie zu **Authentication** → **Email Templates**
2. Wählen Sie **"Reset Password"**
3. Passen Sie den Text auf Deutsch an:

```
Hallo,

Sie haben eine Anfrage zum Zurücksetzen Ihres Passworts erhalten.

Klicken Sie auf den folgenden Link, um Ihr Passwort zurückzusetzen:
{{ .ConfirmationURL }}

Dieser Link ist 1 Stunde gültig.

Falls Sie diese Anfrage nicht gestellt haben, können Sie diese E-Mail ignorieren.

Mit freundlichen Grüßen,
Lashes by Danesh
```

## 5. SMTP-Einstellungen (optional, aber empfohlen)

Standard-E-Mails von Supabase können im Spam landen. Für produktive Nutzung empfehlen wir Custom SMTP:

1. Gehen Sie zu **Project Settings** → **Auth** → **SMTP Settings**
2. Aktivieren Sie **"Enable Custom SMTP"**
3. Tragen Sie Ihre E-Mail-Server-Daten ein (z.B. von Ihrem Hosting-Provider)

**Beispiel-Konfiguration:**
- **Host:** smtp.your-provider.com
- **Port:** 587
- **Username:** info@lashesbydanesh.at
- **Password:** [SMTP Passwort]
- **Sender email:** info@lashesbydanesh.at
- **Sender name:** Lashes by Danesh

## 6. URL-Konfiguration überprüfen

1. Gehen Sie zu **Authentication** → **URL Configuration**
2. Stellen Sie sicher, dass folgende URLs korrekt sind:

- **Site URL:** `https://lashesunddanesh.at`
- **Redirect URLs:**
  - `https://lashesunddanesh.at/l-787/reset-password`
  - `http://localhost:5173/l-787/reset-password` (für lokale Entwicklung)

## 7. Testen des Systems

### Login testen:
1. Öffnen Sie: `http://localhost:5173/l-787`
2. Loggen Sie sich mit einer der Admin-E-Mails ein

### Passwort-Reset testen:
1. Öffnen Sie: `http://localhost:5173/l-787`
2. Klicken Sie auf **"Passwort vergessen?"**
3. Geben Sie die Admin-E-Mail ein
4. Prüfen Sie Ihr E-Mail-Postfach (auch Spam-Ordner!)
5. Klicken Sie auf den Reset-Link in der E-Mail
6. Setzen Sie ein neues Passwort

## Sicherheitshinweise

### ✅ Was wir implementiert haben:
- Passwörter werden **verschlüsselt** in Supabase gespeichert (bcrypt)
- Nur **autorisierte E-Mails** können sich einloggen (siehe `AdminContext.tsx:19-22`)
- Reset-Links sind **zeitlich begrenzt** (Standard: 1 Stunde)
- **Automatische Session-Verwaltung** durch Supabase
- **Token-basierte Authentifizierung** (keine Passwörter im Frontend)

### 🔒 Zusätzliche Sicherheitsmaßnahmen:
- Test-E-Mail (`t.uhlir@immo.red`) ist im Code versteckt
- Kein Passwort wird jemals im Klartext gespeichert
- Reset-Links können nur einmal verwendet werden
- Sessions laufen nach 7 Tagen automatisch ab

## Fehlerbehebung

### Problem: "E-Mail kommt nicht an"
**Lösung:**
- Prüfen Sie Spam-Ordner
- Warten Sie 2-3 Minuten (E-Mails können verzögert sein)
- Prüfen Sie SMTP-Einstellungen im Supabase Dashboard

### Problem: "Ungültiger Reset-Link"
**Lösung:**
- Link ist abgelaufen (1 Stunde Gültigkeit)
- Link wurde bereits verwendet
- Fordern Sie einen neuen Reset-Link an

### Problem: "Zugriff verweigert"
**Lösung:**
- Nur die beiden konfigurierten E-Mails haben Zugang
- Prüfen Sie die E-Mail-Adresse auf Tippfehler
- Stellen Sie sicher, dass der Benutzer in Supabase existiert

## Support

Bei Problemen:
1. Prüfen Sie die Browser-Konsole (F12) auf Fehler
2. Prüfen Sie Supabase Dashboard → **Authentication** → **Users** → **Logs**
3. Kontaktieren Sie: Red Rabbit Media (https://redrabbit.media/)

---

**Entwickelt von:** Red Rabbit Media
**Projekt:** Lashes by Danesh
**Datum:** Januar 2025
