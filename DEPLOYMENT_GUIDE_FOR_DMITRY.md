# Deployment & Production Setup Guide für Dmitry

**Projekt:** Lashes by Danesh
**Entwickler:** Dmitry
**Deployment-Ziel:** World4You Hosting
**Datum:** Januar 2025

---

## 📋 Inhaltsverzeichnis

1. [Projekt-Übersicht](#1-projekt-übersicht)
2. [Supabase Authentication Setup](#2-supabase-authentication-setup)
3. [SMTP Server Konfiguration](#3-smtp-server-konfiguration)
4. [Kontaktformular E-Mail Setup](#4-kontaktformular-e-mail-setup)
5. [World4You Deployment](#5-world4you-deployment)
6. [Environment Variables Production](#6-environment-variables-production)
7. [Testing Checklist](#7-testing-checklist)
8. [Troubleshooting](#8-troubleshooting)

---

## 1. Projekt-Übersicht

### Tech Stack
- **Frontend:** React 18 + TypeScript + Vite
- **Backend Services:** Supabase (Auth + Database)
- **Styling:** TailwindCSS + Shadcn/ui
- **Routing:** React Router v6
- **Hosting:** World4You

### Wichtige Features
- Admin-Bereich mit Passwort-Reset-Funktion
- Kontaktformular mit SMTP E-Mail-Versand
- Responsive Design, SEO-optimiert
- Galerie, Services, Preise Management

---

## 2. Supabase Authentication Setup

### 2.1 Supabase Dashboard Login
1. Gehe zu: https://supabase.com/dashboard
2. Login mit den bereitgestellten Credentials
3. Wähle Projekt: **csquuisxijkyrekqjgby** (Lashes by Danesh)

### 2.2 Admin-Benutzer erstellen

#### Navigation
Dashboard → **Authentication** → **Users** → **Add user** (grüner Button)

#### Benutzer 1 (Hauptzugang):
```
E-Mail: info@lashesbydanesh.at
Passwort: [Sicheres Passwort - mindestens 8 Zeichen, mit Groß-/Kleinbuchstaben, Zahlen]
☑ Auto Confirm User (WICHTIG: Aktivieren!)
```

#### Benutzer 2 (Test-Account, versteckt):
```
E-Mail: t.uhlir@immo.red
Passwort: [Testpasswort]
☑ Auto Confirm User (Aktivieren!)
```

> **WICHTIG:** Notiere die Passwörter sicher! Diese können nicht abgerufen werden.

### 2.3 User Signups deaktivieren

Damit sich **keine fremden Benutzer** registrieren können:

1. Gehe zu: **Authentication** → **Providers**
2. Finde: **"Allow new users to sign up"**
3. **Deaktiviere** den Toggle (muss GRAU sein, nicht grün)
4. Klicke: **"Save changes"**

### 2.4 E-Mail Confirmation Settings

Für Production (mit SMTP):
1. Gehe zu: **Authentication** → **Providers**
2. **"Confirm email"** → **AKTIVIEREN** (grün)
3. Speichern

Für lokale Tests:
- Kann deaktiviert bleiben (grau)

### 2.5 URL Configuration

**Authentication** → **URL Configuration**

#### Site URL:
```
https://www.lashesunddanesh.at
```

#### Redirect URLs (alle hinzufügen):
```
https://www.lashesunddanesh.at/l-787/reset-password
https://lashesunddanesh.at/l-787/reset-password
http://localhost:8080/l-787/reset-password
```

---

## 3. SMTP Server Konfiguration

### 3.1 World4You SMTP Zugangsdaten beschaffen

1. Login zu World4You Admin-Panel
2. Navigiere zu: **E-Mail** → **E-Mail-Konten**
3. Wähle: `info@lashesbydanesh.at`
4. Notiere folgende Daten:

```
SMTP Server: smtp.world4you.com
SMTP Port: 587 (mit STARTTLS) oder 465 (mit SSL)
Benutzername: info@lashesbydanesh.at
Passwort: [E-Mail Account Passwort]
```

### 3.2 Supabase SMTP konfigurieren

**Project Settings** → **Auth** → **SMTP Settings**

#### Konfiguration:
```
☑ Enable Custom SMTP

Host: smtp.world4you.com
Port: 587
Username: info@lashesbydanesh.at
Password: [SMTP Passwort von World4You]
Sender email: info@lashesbydanesh.at
Sender name: Lashes by Danesh

Encryption: STARTTLS (oder SSL bei Port 465)
```

Klicke: **"Save"**

### 3.3 SMTP Testen

1. Gehe zu: **Authentication** → **Users**
2. Wähle einen Test-User
3. Klicke: **"Send password recovery"**
4. Prüfe, ob E-Mail ankommt bei der hinterlegten Adresse

---

## 4. Kontaktformular E-Mail Setup

### 4.1 Aktueller Stand

Das Kontaktformular verwendet derzeit **EmailJS** (kein eigener SMTP).

### 4.2 Option A: EmailJS verwenden (einfacher)

#### Vorteile:
- ✅ Bereits im Code integriert
- ✅ Keine Backend-Entwicklung nötig
- ✅ Funktioniert out-of-the-box

#### Setup:
1. Gehe zu: https://www.emailjs.com/
2. Erstelle einen Account
3. Füge einen E-Mail-Service hinzu (World4You SMTP oder Gmail)
4. Erstelle ein E-Mail-Template

#### E-Mail Template (HTML):
```html
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 20px auto; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
    .header { background: linear-gradient(135deg, #D4AF37 0%, #C4A137 100%); color: white; padding: 30px; text-align: center; }
    .header h1 { margin: 0; font-size: 24px; font-weight: normal; }
    .content { padding: 30px; }
    .field { margin-bottom: 20px; }
    .label { font-weight: bold; color: #666; font-size: 12px; text-transform: uppercase; margin-bottom: 5px; }
    .value { color: #333; font-size: 16px; padding: 10px; background: #f9f9f9; border-left: 3px solid #D4AF37; }
    .footer { background: #f9f9f9; padding: 20px; text-align: center; color: #666; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>✨ Neue Kontaktanfrage</h1>
      <p style="margin: 10px 0 0 0; font-size: 14px;">Lashes by Danesh</p>
    </div>

    <div class="content">
      <div class="field">
        <div class="label">Name</div>
        <div class="value">{{name}}</div>
      </div>

      <div class="field">
        <div class="label">E-Mail</div>
        <div class="value">{{email}}</div>
      </div>

      <div class="field">
        <div class="label">Telefon</div>
        <div class="value">{{phone}}</div>
      </div>

      <div class="field">
        <div class="label">Nachricht</div>
        <div class="value">{{message}}</div>
      </div>
    </div>

    <div class="footer">
      <p>Diese E-Mail wurde über das Kontaktformular auf lashesunddanesh.at gesendet.</p>
      <p>Bitte antworten Sie direkt an die oben angegebene E-Mail-Adresse.</p>
    </div>
  </div>
</body>
</html>
```

#### Environment Variables setzen:
```env
VITE_EMAILJS_SERVICE_ID=service_xxxxxxx
VITE_EMAILJS_TEMPLATE_ID=template_xxxxxxx
VITE_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxx
```

### 4.3 Option B: Eigener SMTP Server (fortgeschritten)

Falls du eine Backend-Lösung bevorzugst:

#### Backend erstellen (Node.js + Nodemailer):
```javascript
// server.js
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
  host: 'smtp.world4you.com',
  port: 587,
  secure: false,
  auth: {
    user: 'info@lashesbydanesh.at',
    pass: process.env.SMTP_PASSWORD
  }
});

app.post('/api/contact', async (req, res) => {
  const { name, email, phone, message } = req.body;

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 20px auto; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #D4AF37 0%, #C4A137 100%); color: white; padding: 30px; text-align: center; }
        .content { padding: 30px; }
        .field { margin-bottom: 20px; }
        .label { font-weight: bold; color: #666; font-size: 12px; text-transform: uppercase; }
        .value { color: #333; font-size: 16px; padding: 10px; background: #f9f9f9; border-left: 3px solid #D4AF37; margin-top: 5px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>✨ Neue Kontaktanfrage</h1>
          <p style="margin: 10px 0 0 0;">Lashes by Danesh</p>
        </div>
        <div class="content">
          <div class="field">
            <div class="label">Name</div>
            <div class="value">${name}</div>
          </div>
          <div class="field">
            <div class="label">E-Mail</div>
            <div class="value">${email}</div>
          </div>
          <div class="field">
            <div class="label">Telefon</div>
            <div class="value">${phone || 'Nicht angegeben'}</div>
          </div>
          <div class="field">
            <div class="label">Nachricht</div>
            <div class="value">${message}</div>
          </div>
        </div>
        <div class="footer" style="background: #f9f9f9; padding: 20px; text-align: center; color: #666; font-size: 12px;">
          <p>Diese E-Mail wurde über das Kontaktformular auf lashesunddanesh.at gesendet.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    await transporter.sendMail({
      from: '"Lashes by Danesh" <info@lashesbydanesh.at>',
      to: 'info@lashesbydanesh.at',
      replyTo: email,
      subject: `Neue Kontaktanfrage von ${name}`,
      html: htmlContent
    });

    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));
```

> **Empfehlung:** Verwende **Option A (EmailJS)** - ist bereits integriert und funktioniert zuverlässig.

---

## 5. World4You Deployment

### 5.1 Build für Production erstellen

```bash
cd /path/to/lash-craft-studio
npm run build
```

Dies erstellt einen `dist/` Ordner mit den optimierten Production-Files.

### 5.2 World4You FTP Zugangsdaten

Beschaffe von World4You:
```
FTP Server: ftp.world4you.com (oder kundenspezifisch)
Benutzername: [FTP Username]
Passwort: [FTP Passwort]
Port: 21 (oder 22 für SFTP)
```

### 5.3 Upload per FTP

#### Option A: FileZilla (GUI)
1. Installiere FileZilla: https://filezilla-project.org/
2. Öffne FileZilla
3. Verbinde mit FTP-Daten:
   - Host: `ftp.world4you.com`
   - Benutzername: `[FTP Username]`
   - Passwort: `[FTP Passwort]`
   - Port: `21`

4. Navigiere auf dem Server zu: `/httpdocs/` oder `/public_html/`
5. **WICHTIG:** Lösche alle alten Dateien im Zielordner
6. Uploade **alle Dateien** aus dem `dist/` Ordner

#### Option B: Command Line (SFTP)
```bash
# Verbinden
sftp username@ftp.world4you.com

# Zum Upload-Verzeichnis wechseln
cd /httpdocs

# Alte Dateien löschen
rm -rf *

# Neue Dateien hochladen
put -r dist/* .

# Verbindung trennen
exit
```

### 5.4 .htaccess für React Router

Erstelle eine `.htaccess` Datei im Root-Verzeichnis (neben `index.html`):

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /

  # Wenn die angeforderte Ressource nicht existiert, leite zu index.html um
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule ^ /index.html [L]

  # HTTPS erzwingen (optional, aber empfohlen)
  RewriteCond %{HTTPS} off
  RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
</IfModule>

# Komprimierung aktivieren
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/json
</IfModule>

# Browser Caching
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
  ExpiresByType application/font-woff2 "access plus 1 year"
</IfModule>
```

**Uploade diese `.htaccess` Datei zusammen mit den anderen Files.**

### 5.5 Domain-Konfiguration bei World4You

1. Login zu World4You Admin-Panel
2. Gehe zu: **Domains** → **lashesunddanesh.at**
3. Stelle sicher, dass folgende DNS-Einträge existieren:

```
A-Record:
  Host: @
  Ziel: [Server IP von World4You]

A-Record:
  Host: www
  Ziel: [Server IP von World4You]

CNAME (optional, falls Subdomain):
  Host: www
  Ziel: lashesunddanesh.at
```

4. SSL/TLS Zertifikat aktivieren:
   - **SSL/TLS** → **Let's Encrypt aktivieren**
   - Warte 5-10 Minuten auf Aktivierung

---

## 6. Environment Variables Production

### 6.1 Production `.env` erstellen

Erstelle eine `.env.production` Datei im Projekt-Root:

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://csquuisxijkyrekqjgby.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNzcXV1aXN4aWpreXJla3FqZ2J5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA2MzQzMDQsImV4cCI6MjA3NjIxMDMwNH0.rw63c295R9nyX8q5gPVMdd-jM8HTTr4I6dXosZuezVI

# Admin Configuration
VITE_ADMIN_EMAIL=info@lashesbydanesh.at

# Site Configuration
VITE_SITE_URL=https://www.lashesunddanesh.at

# EmailJS (Option A - empfohlen)
VITE_EMAILJS_SERVICE_ID=service_xxxxxxx
VITE_EMAILJS_TEMPLATE_ID=template_xxxxxxx
VITE_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxx

# Google Analytics (optional)
VITE_GTM_ID=GTM-XXXXXXX
```

### 6.2 Build mit Production-Variablen

```bash
# Production Build
npm run build

# Oder explizit:
vite build --mode production
```

### 6.3 WICHTIG: DEV Credentials entfernen

**NACH** dem ersten erfolgreichen Supabase-Login im Production-Modus:

Bearbeite: `/src/contexts/AdminContext.tsx`

**Lösche oder kommentiere aus:**
```typescript
// DEV ONLY: Temporary fallback credentials (remove when Supabase is properly configured)
const DEV_CREDENTIALS = {
  'info@lashesbydanesh.at': 'Danesh2025!',
  't.uhlir@immo.red': 'TestPass2025!',
};
```

Und entferne alle `import.meta.env.DEV` Fallback-Logik im `login()` und `useEffect()`.

**Dann neu builden und deployen.**

---

## 7. Testing Checklist

Nach dem Deployment, teste folgende Features:

### ✅ Admin-Bereich
- [ ] Login funktioniert mit Supabase-Credentials
- [ ] "Passwort vergessen" sendet E-Mail
- [ ] Reset-Link funktioniert und leitet korrekt um
- [ ] Neues Passwort kann gesetzt werden
- [ ] Logout funktioniert
- [ ] Session bleibt 7 Tage erhalten

### ✅ Kontaktformular
- [ ] Formular kann ausgefüllt werden
- [ ] E-Mail kommt bei `info@lashesbydanesh.at` an
- [ ] HTML-Formatierung wird korrekt angezeigt
- [ ] Reply-To ist korrekt gesetzt
- [ ] Erfolgs-/Fehlermeldungen werden angezeigt

### ✅ Allgemein
- [ ] Alle Seiten laden korrekt
- [ ] React Router funktioniert (keine 404 bei Refresh)
- [ ] HTTPS ist aktiv
- [ ] Bilder laden schnell
- [ ] Mobile Ansicht funktioniert
- [ ] SEO Meta-Tags sind vorhanden

### ✅ Performance
- [ ] Lighthouse Score > 90
- [ ] PageSpeed Insights > 85
- [ ] Alle Assets werden komprimiert geladen

---

## 8. Troubleshooting

### Problem: Admin-Login funktioniert nicht

**Lösung:**
1. Prüfe in der Browser-Konsole (F12) auf Fehler
2. Stelle sicher, dass Supabase-URL korrekt ist
3. Prüfe, ob User in Supabase Dashboard existiert
4. Prüfe "Allow new users to sign up" ist DEAKTIVIERT
5. Prüfe, ob User "confirmed" ist

### Problem: Passwort-Reset E-Mail kommt nicht an

**Lösung:**
1. Prüfe Spam-Ordner
2. Prüfe SMTP-Einstellungen in Supabase
3. Teste SMTP-Verbindung:
   ```bash
   telnet smtp.world4you.com 587
   ```
4. Prüfe Supabase Logs: **Authentication** → **Users** → **Logs**

### Problem: React Router zeigt 404

**Lösung:**
1. Prüfe, ob `.htaccess` hochgeladen wurde
2. Prüfe, ob `mod_rewrite` auf dem Server aktiviert ist
3. Kontaktiere World4You Support für `mod_rewrite` Aktivierung

### Problem: Kontaktformular sendet nicht

**Lösung:**
1. Prüfe EmailJS Dashboard auf Quota/Limits
2. Prüfe Browser-Konsole auf CORS-Fehler
3. Prüfe Environment Variables sind korrekt
4. Teste E-Mail-Template in EmailJS Dashboard

### Problem: HTTPS funktioniert nicht

**Lösung:**
1. Warte 10-15 Minuten nach SSL-Aktivierung
2. Leere Browser-Cache (Ctrl+Shift+Delete)
3. Prüfe World4You SSL-Status
4. Kontaktiere World4You Support

### Problem: Build schlägt fehl

**Lösung:**
```bash
# Cache löschen
rm -rf node_modules
rm -rf dist
rm package-lock.json

# Neu installieren
npm install

# Build
npm run build
```

---

## 9. Wichtige Notizen

### Sicherheit
- ✅ Niemals `.env` oder `.env.production` ins Git committen
- ✅ Supabase Service Role Key NICHT im Frontend verwenden
- ✅ Admin-Route `/l-787` ist absichtlich versteckt
- ✅ Test-E-Mail `t.uhlir@immo.red` ist im Code versteckt

### Performance-Optimierung
- Bilder im WebP-Format verwenden
- Lazy Loading für Bilder implementiert
- Code-Splitting via React Router
- Gzip/Brotli Komprimierung aktivieren

### SEO
- Alle Meta-Tags sind gesetzt
- **WICHTIG:** Sitemap.xml mit Production-Domain aktualisieren
- robots.txt mit Production-Domain erstellen
- Google Search Console einrichten
- Schema.org Markup validieren

### Backup
- Regelmäßige Supabase-Backups (automatisch)
- FTP-Backup vor jedem Deployment
- Git-Repository als Code-Backup

---

## 10. Support-Kontakte

**Supabase Support:**
- Dashboard: https://supabase.com/dashboard/support
- Docs: https://supabase.com/docs

**World4You Support:**
- Telefon: +43 (0) 662 / 45 67 0
- E-Mail: support@world4you.com
- Webhosting-Handbuch: https://www.world4you.com/de/support/hosting.html

**EmailJS Support:**
- Dashboard: https://dashboard.emailjs.com/
- Docs: https://www.emailjs.com/docs/

**Projekt-Repository:**
- GitHub/GitLab Link: [Falls vorhanden]

---

## 11. SEO & Suchmaschinen-Optimierung

### 11.1 Sitemap.xml generieren und updaten

Die Sitemap muss mit der **korrekten Production-Domain** aktualisiert werden.

#### Sitemap erstellen

Erstelle eine `sitemap.xml` Datei im `public/` Ordner:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">

  <!-- Homepage -->
  <url>
    <loc>https://www.lashesunddanesh.at/</loc>
    <lastmod>2025-01-20</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>

  <!-- Behandlungen (Services) -->
  <url>
    <loc>https://www.lashesunddanesh.at/behandlungen</loc>
    <lastmod>2025-01-20</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>

  <!-- Einzelne Behandlungen - WICHTIG: Alle Services hinzufügen -->
  <url>
    <loc>https://www.lashesunddanesh.at/behandlungen/wimpernverlaengerung</loc>
    <lastmod>2025-01-20</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>

  <url>
    <loc>https://www.lashesunddanesh.at/behandlungen/volumen-wimpern</loc>
    <lastmod>2025-01-20</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>

  <url>
    <loc>https://www.lashesunddanesh.at/behandlungen/wimpern-lifting</loc>
    <lastmod>2025-01-20</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>

  <url>
    <loc>https://www.lashesunddanesh.at/behandlungen/augenbrauen-styling</loc>
    <lastmod>2025-01-20</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>

  <!-- Über mich -->
  <url>
    <loc>https://www.lashesunddanesh.at/ueber-mich</loc>
    <lastmod>2025-01-20</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>

  <!-- Kontakt -->
  <url>
    <loc>https://www.lashesunddanesh.at/kontakt</loc>
    <lastmod>2025-01-20</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>

  <!-- Empfehle mich weiter -->
  <url>
    <loc>https://www.lashesunddanesh.at/empfehle-mich-weiter</loc>
    <lastmod>2025-01-20</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>

  <!-- Legal Pages -->
  <url>
    <loc>https://www.lashesunddanesh.at/impressum</loc>
    <lastmod>2025-01-20</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>

  <url>
    <loc>https://www.lashesunddanesh.at/datenschutz</loc>
    <lastmod>2025-01-20</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>

</urlset>
```

**WICHTIG:**
- Aktualisiere alle `<lastmod>` Daten auf das aktuelle Datum
- Füge ALLE Behandlungen/Services hinzu, die im System existieren
- Die Sitemap muss im `dist/` Ordner landen (wird beim Build kopiert)

#### Sitemap automatisch kopieren

Füge zur `vite.config.ts` hinzu:

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'
import { copyFileSync } from 'fs'

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'copy-sitemap',
      writeBundle() {
        copyFileSync('public/sitemap.xml', 'dist/sitemap.xml')
      }
    }
  ],
  // ... rest of config
})
```

### 11.2 robots.txt erstellen

Erstelle eine `robots.txt` Datei im `public/` Ordner:

```txt
# Lashes by Danesh - Robots.txt
# Production: https://www.lashesunddanesh.at

User-agent: *
Allow: /

# Disallow Admin Area
Disallow: /l-787/
Disallow: /l-787/*

# Disallow API routes (falls vorhanden)
Disallow: /api/

# Sitemap
Sitemap: https://www.lashesunddanesh.at/sitemap.xml

# Crawl-Delay (optional, nur bei Bedarf)
# Crawl-delay: 10
```

**WICHTIG:** Diese Datei wird automatisch beim Build in `dist/` kopiert.

### 11.3 Google Search Console einrichten

1. **Gehe zu:** https://search.google.com/search-console/
2. **Füge Property hinzu:**
   - Domain: `lashesunddanesh.at`
   - Typ: "Domain" (bevorzugt) oder "URL-Präfix"

3. **Domain-Verifizierung:**

   **Option A: DNS-Verifizierung (empfohlen)**
   - Google gibt dir einen TXT-Record
   - Füge diesen bei World4You hinzu:
     ```
     Host: @
     Type: TXT
     Value: google-site-verification=xxxxxxxxxxxxxxxxx
     ```
   - Warte 10-15 Minuten
   - Klicke in Search Console auf "Verifizieren"

   **Option B: HTML-Datei**
   - Lade die bereitgestellte HTML-Datei in `public/` hoch
   - Rebuilde das Projekt
   - Deploye neu
   - Verifiziere in Search Console

4. **Sitemap einreichen:**
   - Gehe zu: **Sitemaps** (linke Sidebar)
   - Füge hinzu: `https://www.lashesunddanesh.at/sitemap.xml`
   - Klicke: **"Senden"**

5. **URL-Prüfung:**
   - Teste wichtige URLs:
     - `https://www.lashesunddanesh.at/`
     - `https://www.lashesunddanesh.at/behandlungen`
     - `https://www.lashesunddanesh.at/kontakt`
   - Klicke: **"Indexierung beantragen"** für jede URL

### 11.4 Google Business Profile (ehemals Google My Business)

**WICHTIG für lokales SEO:**

1. **Gehe zu:** https://www.google.com/business/
2. **Erstelle Business-Profil:**
   ```
   Name: Lashes by Danesh
   Kategorie: Beauty-Salon, Wimpernstudio
   Adresse: [Geschäftsadresse in Wien 1220]
   Telefon: [Telefonnummer]
   Website: https://www.lashesunddanesh.at
   Öffnungszeiten: [Nach Vereinbarung oder feste Zeiten]
   ```

3. **Verifizierung:**
   - Per Postkarte (dauert 5-7 Tage)
   - Oder per Telefon/E-Mail (wenn verfügbar)

4. **Optimierung:**
   - Hochwertige Fotos hochladen (mindestens 10)
   - Behandlungen als "Services" hinzufügen
   - Rezensionen aktivieren
   - Q&A Funktion nutzen

### 11.5 Schema.org / Structured Data validieren

Die Website hat bereits Schema.org Markup implementiert. Validiere es:

#### Tools:
1. **Google Rich Results Test:**
   - https://search.google.com/test/rich-results
   - Teste: `https://www.lashesunddanesh.at/`

2. **Schema.org Validator:**
   - https://validator.schema.org/
   - Paste die Homepage-URL

#### Wichtige Schema-Types im Projekt:
- `LocalBusiness` (Homepage)
- `BeautySalon` (Homepage)
- `Service` (Behandlungen)
- `Person` (Über mich)
- `ContactPoint` (Kontakt)
- `FAQPage` (FAQ-Bereiche)

**Prüfe in der Datei:** `/src/components/SEO/StructuredData.tsx`

Stelle sicher, dass alle URLs mit `https://www.lashesunddanesh.at` beginnen.

### 11.6 Meta Tags in index.html aktualisieren

Öffne: `index.html` im Root-Verzeichnis

**Aktualisiere:**
```html
<!doctype html>
<html lang="de">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <!-- Primary Meta Tags -->
    <title>Lashes by Danesh - Premium Wimpernverlängerung Wien 1220</title>
    <meta name="title" content="Lashes by Danesh - Premium Wimpernverlängerung Wien 1220" />
    <meta name="description" content="Professionelle Wimpernverlängerung & Augenbrauen-Styling in Wien 1220. Volume Lashes, Wimpern-Lifting & mehr. Jetzt Termin vereinbaren!" />
    <meta name="keywords" content="Wimpernverlängerung Wien, Lashes Wien 1220, Volume Lashes, Wimpern-Lifting, Augenbrauen-Styling, Beauty Salon Wien" />
    <meta name="author" content="Lashes by Danesh" />
    <meta name="robots" content="index, follow" />
    <link rel="canonical" href="https://www.lashesunddanesh.at/" />

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://www.lashesunddanesh.at/" />
    <meta property="og:title" content="Lashes by Danesh - Premium Wimpernverlängerung Wien 1220" />
    <meta property="og:description" content="Professionelle Wimpernverlängerung & Augenbrauen-Styling in Wien 1220. Volume Lashes, Wimpern-Lifting & mehr." />
    <meta property="og:image" content="https://www.lashesunddanesh.at/og-image.jpg" />
    <meta property="og:locale" content="de_AT" />
    <meta property="og:site_name" content="Lashes by Danesh" />

    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:url" content="https://www.lashesunddanesh.at/" />
    <meta property="twitter:title" content="Lashes by Danesh - Premium Wimpernverlängerung Wien 1220" />
    <meta property="twitter:description" content="Professionelle Wimpernverlängerung & Augenbrauen-Styling in Wien 1220." />
    <meta property="twitter:image" content="https://www.lashesunddanesh.at/twitter-image.jpg" />

    <!-- Additional SEO -->
    <meta name="geo.region" content="AT-9" />
    <meta name="geo.placename" content="Wien" />
    <meta name="geo.position" content="48.2082;16.3738" />
    <meta name="ICBM" content="48.2082, 16.3738" />

    <!-- Favicon -->
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
    <link rel="manifest" href="/site.webmanifest" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

### 11.7 OG Images erstellen

**Erstelle Social Media Preview-Bilder:**

1. **og-image.jpg** (1200x630px)
   - Zeigt Logo + Slogan + schönes Hintergrundbild
   - Format: JPG, optimiert < 300KB

2. **twitter-image.jpg** (1200x600px)
   - Ähnlich wie OG-Image
   - Format: JPG, optimiert < 300KB

**Speichere diese in:** `public/og-image.jpg` und `public/twitter-image.jpg`

### 11.8 LLM-Optimierung (ChatGPT, Claude, etc.)

Für bessere Sichtbarkeit in AI-Suchmaschinen:

#### JSON-LD für AI-Verständnis

Füge in `StructuredData.tsx` zusätzlich hinzu:

```typescript
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Lashes by Danesh",
  "alternateName": "Lashes und Danesh",
  "url": "https://www.lashesunddanesh.at",
  "description": "Premium Wimpernverlängerung und Augenbrauen-Styling in Wien 1220. Professionelle Beauty-Behandlungen von zertifizierten Experten.",
  "inLanguage": "de-AT",
  "keywords": "Wimpernverlängerung, Volume Lashes, Wimpern-Lifting, Augenbrauen-Styling, Beauty Salon Wien, Lash Extensions",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://www.lashesunddanesh.at/behandlungen?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
}
```

#### Klare Content-Struktur für LLMs

**Stelle sicher, dass jede Seite hat:**
1. ✅ Klare H1-Überschrift
2. ✅ Descriptive Alt-Tags für alle Bilder
3. ✅ Semantisches HTML (header, main, section, article, footer)
4. ✅ FAQ-Bereiche mit strukturiertem Markup
5. ✅ Kontaktinformationen im Footer

### 11.9 Bing Webmaster Tools

Neben Google auch Bing einrichten:

1. **Gehe zu:** https://www.bing.com/webmasters/
2. **Füge Site hinzu:** `https://www.lashesunddanesh.at`
3. **Verifizierung:**
   - Import from Google Search Console (einfachste Methode)
   - Oder: XML-Datei hochladen
4. **Sitemap einreichen:** `https://www.lashesunddanesh.at/sitemap.xml`

### 11.10 Analytics & Tracking einrichten

#### Google Analytics 4 (GA4)

**Falls noch nicht vorhanden:**

1. **Erstelle GA4 Property:**
   - https://analytics.google.com/
   - **Neue Property erstellen**
   - Name: "Lashes by Danesh"
   - Zeitzone: "Österreich"
   - Währung: "EUR"

2. **Data Stream erstellen:**
   - Plattform: "Web"
   - URL: `https://www.lashesunddanesh.at`
   - Stream-Name: "Lashes by Danesh Website"

3. **Measurement ID kopieren:**
   - Format: `G-XXXXXXXXXX`

4. **Google Tag Manager einrichten (bevorzugt):**

   **GTM Container erstellen:**
   - https://tagmanager.google.com/
   - **Container erstellen**
   - Name: "Lashes by Danesh"
   - Typ: "Web"

   **GTM Tag hinzufügen:**
   - Tag-Typ: "Google Analytics: GA4 Configuration"
   - Measurement ID: `G-XXXXXXXXXX`
   - Trigger: "All Pages"

   **GTM Container-ID:**
   - Format: `GTM-XXXXXXX`

5. **Environment Variable setzen:**
   ```env
   VITE_GTM_ID=GTM-XXXXXXX
   ```

6. **Privacy-Hinweis beachten:**
   - DSGVO-konforme Cookie-Banner ist bereits implementiert
   - Prüfe: Cookie-Consent blockiert Tracking bis Zustimmung

#### Alternative: Plausible / Matomo (Privacy-freundlich)

Falls DSGVO-Bedenken:
- **Plausible:** https://plausible.io/
- **Matomo:** https://matomo.org/

### 11.11 Performance-Monitoring

#### PageSpeed Insights

**Nach Deployment testen:**
1. https://pagespeed.web.dev/
2. URL eingeben: `https://www.lashesunddanesh.at`
3. **Ziel:** Score > 90 (Mobile & Desktop)

**Falls Score < 90:**
- Bilder weiter komprimieren
- Lazy Loading prüfen
- Third-party Scripts optimieren
- Server-Response-Time verbessern

#### Core Web Vitals

**Überwache in Google Search Console:**
- LCP (Largest Contentful Paint): < 2.5s
- FID (First Input Delay): < 100ms
- CLS (Cumulative Layout Shift): < 0.1

### 11.12 Local SEO - Weitere Plattformen

**Registriere das Business auf:**

1. **Herold.at** (wichtig für Österreich)
   - https://www.herold.at/
   - Branchen: Beauty-Salon, Wimpernverlängerung

2. **Gelbe Seiten Österreich**
   - https://www.gelbeseiten.at/

3. **Facebook Business Page**
   - Vollständiges Profil
   - Regelmäßige Posts
   - Rezensionen aktivieren

4. **Instagram Business Account**
   - @lashesbydanesh (falls vorhanden)
   - Link zur Website im Bio

### 11.13 Backlinks & Citations

**Wichtig für SEO-Ranking:**

1. **NAP Consistency** (Name, Address, Phone)
   - Überall exakt gleich schreiben
   - Keine Abweichungen in Schreibweise

2. **Lokale Verzeichnisse:**
   - Wko.at (Wirtschaftskammer Österreich)
   - Firmen.wko.at
   - Lokale Wiener Verzeichnisse

3. **Qualitäts-Backlinks:**
   - Beauty-Blogs (Gastbeiträge)
   - Lokale Wien-Portale
   - Partner-Websites

## 12. Abschluss-Checklist

Bevor du das Projekt als "fertig" markierst:

- [ ] Production Build erfolgreich
- [ ] Alle Dateien auf World4You hochgeladen
- [ ] `.htaccess` konfiguriert und uploaded
- [ ] `sitemap.xml` erstellt und mit Production-Domain aktualisiert
- [ ] `robots.txt` erstellt und uploaded
- [ ] Meta Tags in `index.html` aktualisiert
- [ ] OG Images (`og-image.jpg`, `twitter-image.jpg`) erstellt
- [ ] SSL/HTTPS aktiv und funktioniert
- [ ] Supabase Admin-Benutzer erstellt (beide Accounts)
- [ ] Supabase "Allow new users to sign up" DEAKTIVIERT
- [ ] SMTP in Supabase konfiguriert und getestet
- [ ] EmailJS konfiguriert (oder eigener SMTP-Server)
- [ ] Kontaktformular sendet E-Mails korrekt
- [ ] E-Mails kommen bei info@lashesbydanesh.at an
- [ ] E-Mail HTML-Formatierung wird korrekt angezeigt
- [ ] Alle Tests bestanden (siehe Testing Checklist)
- [ ] DEV Credentials aus Code entfernt (AdminContext.tsx)
- [ ] Performance > 85 auf PageSpeed Insights
- [ ] Google Search Console eingerichtet
- [ ] Sitemap in Google Search Console eingereicht
- [ ] Google Business Profile erstellt und verifiziert
- [ ] Bing Webmaster Tools eingerichtet
- [ ] Schema.org Markup validiert (Google Rich Results Test)
- [ ] Analytics/GTM konfiguriert (falls gewünscht)
- [ ] Alle internen Links funktionieren
- [ ] React Router funktioniert (keine 404 bei Refresh)
- [ ] Mobile Ansicht getestet
- [ ] Lighthouse Score > 90
- [ ] Core Web Vitals grün
- [ ] Kunde hat Test-Login erhalten
- [ ] Dokumentation an Kunde übergeben

---

## 13. Post-Launch Monitoring (erste 2 Wochen)

Nach dem Launch, überwache täglich:

### Woche 1:
- [ ] **Tag 1:** Google Search Console auf Crawling-Fehler prüfen
- [ ] **Tag 1:** Sitemap-Status in Search Console überprüfen
- [ ] **Tag 1:** Alle wichtigen URLs manuell indexieren
- [ ] **Tag 2:** PageSpeed Insights erneut testen
- [ ] **Tag 3:** Kontaktformular Test-E-Mail senden
- [ ] **Tag 3:** Admin-Login Test durchführen
- [ ] **Tag 3:** Passwort-Reset testen
- [ ] **Tag 5:** Erste Google Analytics Daten prüfen
- [ ] **Tag 7:** Google Search Console Performance-Bericht ansehen

### Woche 2:
- [ ] Backlink-Status prüfen (Google Search Console)
- [ ] Core Web Vitals Bericht prüfen
- [ ] Mobile Usability Bericht prüfen
- [ ] Indexierungs-Status prüfen (alle Seiten indexiert?)
- [ ] Organische Suchanfragen analysieren
- [ ] Eventuelle 404-Fehler beheben
- [ ] Sitemap erneut einreichen (falls nötig)

### Monatliches Monitoring:
- [ ] SEO-Rankings überwachen (Google Search Console)
- [ ] Traffic-Entwicklung analysieren (Analytics)
- [ ] Conversion-Rate des Kontaktformulars
- [ ] Performance-Score überprüfen
- [ ] Neue Inhalte/Blog-Posts hinzufügen (SEO)
- [ ] Backlinks aufbauen
- [ ] Google Business Profile pflegen (Posts, Fotos)

---

## 14. Optimierungs-Tipps für maximale Sichtbarkeit

### Content-Marketing Strategie:

**Monatliche Blog-Posts (empfohlen):**
1. "Wimpernverlängerung vs. Wimpern-Lifting: Was passt zu mir?"
2. "5 Tipps zur Pflege von Wimpernverlängerungen"
3. "Augenbrauen-Trends 2025"
4. "Wie lange hält eine Wimpernverlängerung?"
5. "Volume Lashes vs. Classic Lashes"

**Jeder Blog-Post sollte:**
- 800-1200 Wörter haben
- Relevante Keywords enthalten
- H2/H3 Überschriften nutzen
- Mindestens 2-3 Bilder haben
- FAQ-Bereich am Ende
- Call-to-Action (Termin buchen)

### Social Media Integration:

**Instagram-Feed einbinden:**
```html
<!-- Optional: Instagram Feed Widget -->
<div class="instagram-feed">
  <!-- Nutze einen Service wie EmbedSocial oder Juicer -->
</div>
```

**Social Sharing Buttons:**
- Auf jeder Service-Seite
- Im Blog (falls implementiert)
- "Teilen" Button für Empfehlungsprogramm

### Local SEO Booster:

**Erstelle lokale Landing Pages:**
- `/wien-1220-wimpernverlaengerung`
- `/donaustadt-lashes`
- `/kagran-beauty-salon`

**Nutze lokale Keywords:**
- "Wimpernverlängerung Wien 1220"
- "Lashes Donaustadt"
- "Beauty Salon Kagran"
- "Augenbrauen Wien 22. Bezirk"

### Review-Management:

**Bitte Kunden um Bewertungen auf:**
1. Google Business Profile
2. Facebook
3. Herold.at
4. Eventuell: Trustpilot

**Antworten auf Reviews:**
- Immer professionell
- Innerhalb von 24 Stunden
- Auch negative Reviews konstruktiv beantworten

---

## 15. Notfall-Kontakte & Ressourcen

### Hosting & Server
**World4You:**
- Support: +43 (0) 662 / 45 67 0
- E-Mail: support@world4you.com
- Status: https://status.world4you.com/

### Domain & DNS
**World4You DNS:**
- TTL für schnelle Änderungen: 300s (5 Minuten)
- Propagation dauert: 24-48 Stunden weltweit

### Supabase
**Dashboard:** https://supabase.com/dashboard/project/csquuisxijkyrekqjgby
**Docs:** https://supabase.com/docs
**Status:** https://status.supabase.com/

### EmailJS
**Dashboard:** https://dashboard.emailjs.com/
**Docs:** https://www.emailjs.com/docs/

### Code-Repository
**Falls Git verwendet wird:**
- Repository-Link: [Hier eintragen]
- Branch: `main` (production)
- Deployment-Branch: `production`

### Wichtige Passwörter & Credentials
**NIEMALS in Git committen!**

Speichere sicher in einem Password-Manager:
- World4You FTP
- World4You Admin-Panel
- Supabase Dashboard
- EmailJS Account
- Google Search Console
- Google Analytics/GTM
- Supabase Admin-User Passwörter

---

## 16. Finale Anmerkungen für Dmitry

### Prioritäten nach dem Deployment:

**Sofort (Tag 1):**
1. ✅ Build erstellen
2. ✅ Auf World4You hochladen
3. ✅ `.htaccess` konfigurieren
4. ✅ SSL aktivieren
5. ✅ Website testen (alle Seiten aufrufen)

**Tag 2-3:**
1. ✅ Sitemap & robots.txt
2. ✅ Google Search Console einrichten
3. ✅ Sitemap einreichen
4. ✅ Supabase Auth konfigurieren
5. ✅ SMTP testen

**Erste Woche:**
1. ✅ Google Business Profile
2. ✅ Analytics/GTM
3. ✅ OG Images erstellen
4. ✅ Schema.org validieren
5. ✅ Performance optimieren (> 90)

**Zweite Woche:**
1. ✅ Bing Webmaster Tools
2. ✅ Lokale Verzeichnisse (Herold.at)
3. ✅ Social Media Links prüfen
4. ✅ Backup-Strategie implementieren
5. ✅ Monitoring-Setup

### Häufige Fehler vermeiden:

❌ **NICHT tun:**
- Environment Variables mit echten Werten ins Git committen
- DEV Credentials im Production-Code lassen
- Build ohne Tests deployen
- Alte Dateien im Upload-Verzeichnis lassen (kann Konflikte verursachen)
- HTTPS vergessen zu aktivieren

✅ **IMMER tun:**
- Vor jedem Deployment: `npm run build`
- Nach jedem Deployment: Website manuell testen
- Backup der alten Version erstellen
- `.htaccess` hochladen
- Sitemap nach größeren Änderungen neu einreichen

### Performance-Optimierung:

Wenn Lighthouse Score < 90:

**Bilder optimieren:**
```bash
# TinyPNG oder ImageOptim verwenden
# Ziel: < 200KB pro Bild
# Format: WebP bevorzugt
```

**Lazy Loading prüfen:**
- Alle Bilder sollten `loading="lazy"` haben
- React.lazy() für große Komponenten

**Third-Party Scripts:**
- Nur notwendige Scripts laden
- Async/Defer Attribute nutzen
- GTM über Cookie-Consent erst nach Zustimmung laden

### Erfolgs-Metriken:

**Ziele nach 1 Monat:**
- Google Search Console: > 100 Impressions
- PageSpeed Score: > 90
- Alle Seiten indexiert
- Google Business: Verifiziert + 5 Bewertungen

**Ziele nach 3 Monaten:**
- Organischer Traffic: > 500 Besucher/Monat
- Google Maps: Top 3 für "Wimpernverlängerung Wien 1220"
- Conversion Rate: > 5% (Kontaktformular)

---

## 17. Abschließende Worte

Lieber Dmitry,

diese Anleitung deckt **alles** ab, was du für ein professionelles Deployment brauchst:

✅ **Hosting:** World4You FTP Upload + .htaccess
✅ **Authentication:** Supabase Auth mit SMTP
✅ **E-Mail:** Kontaktformular mit HTML-Templates
✅ **SEO:** Sitemap, robots.txt, Meta Tags, Schema.org
✅ **Search Console:** Google + Bing
✅ **Analytics:** GTM/GA4 Setup
✅ **Local SEO:** Google Business, Herold.at
✅ **Performance:** Lighthouse > 90
✅ **LLM-Optimierung:** Structured Data für AI

**Bei Fragen:**
- Lies diese Anleitung nochmal durch
- Prüfe die verlinkten Docs
- Kontaktiere World4You/Supabase Support
- Im Notfall: Red Rabbit Media Team

**Erfolg wünscht dir:**
Red Rabbit Media Team

---

**Version:** 2.0 (Final)
**Letzte Aktualisierung:** 20. Januar 2025
**Projekt:** Lashes by Danesh
**Developer:** Dmitry

---

**Entwickelt von:** Red Rabbit Media
**Projekt:** Lashes by Danesh
**Deployment-Guide Version:** 1.0
**Letzte Aktualisierung:** Januar 2025

Viel Erfolg beim Deployment, Dmitry! 🚀

Bei Fragen oder Problemen, kontaktiere das Red Rabbit Media Team.
