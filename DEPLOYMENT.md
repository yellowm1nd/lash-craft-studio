# Deployment-Anleitung - Lashes by Danesh

Entwickelt von: **Red Rabbit Media** (https://redrabbit.media/)

## Inhaltsverzeichnis
- [Vercel Deployment](#vercel-deployment)
- [World4You Deployment](#world4you-deployment)
- [Wichtige Hinweise](#wichtige-hinweise)

---

## Vercel Deployment

### Voraussetzungen
- GitHub Repository mit dem Code
- Vercel Account (kostenlos bei vercel.com)

### Automatisches Deployment

#### 1. Vercel mit GitHub verbinden

1. Gehen Sie zu https://vercel.com
2. Klicken Sie auf "Import Project"
3. Wählen Sie Ihr GitHub Repository aus
4. Vercel erkennt automatisch das Vite-Projekt

#### 2. Build-Einstellungen

Vercel sollte diese Einstellungen automatisch erkennen (basierend auf `vercel.json`):

```
Build Command: npm run build
Output Directory: dist
Install Command: npm install
Framework Preset: Vite
```

#### 3. Environment Variables einrichten

Gehen Sie zu: **Project Settings → Environment Variables**

Fügen Sie folgende Variablen hinzu:

```env
VITE_SUPABASE_URL=https://csquuisxijkyrekqjgby.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNzcXV1aXN4aWpreXJla3FqZ2J5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA2MzQzMDQsImV4cCI6MjA3NjIxMDMwNH0.rw63c295R9nyX8q5gPVMdd-jM8HTTr4I6dXosZuezVI
VITE_SITE_URL=https://lashesunddanesh.at
VITE_SITE_NAME=Lashes by Danesh
```

**Wichtig:** Setzen Sie diese für **Production**, **Preview** und **Development** Environment!

#### 4. Deploy durchführen

Klicken Sie auf **"Deploy"** - Vercel baut und deployt automatisch.

Nach erfolgreichem Deployment:
- Ihre Seite ist unter `your-project.vercel.app` erreichbar
- Automatische Deployments bei jedem Git Push
- Preview-Deployments für Pull Requests

#### 5. Custom Domain verbinden

1. Gehen Sie zu **Project Settings → Domains**
2. Fügen Sie `lashesunddanesh.at` hinzu
3. Folgen Sie den DNS-Anweisungen von Vercel

### Fehlersuche bei Vercel

#### Problem: Weiße Seite wird angezeigt

**Lösung:**
1. Überprüfen Sie die Browser-Konsole (F12) auf JavaScript-Fehler
2. Stellen Sie sicher, dass alle Environment Variables gesetzt sind
3. Checken Sie das Deployment-Log in Vercel
4. Die `vercel.json` Konfiguration sollte SPA-Routing sicherstellen

#### Problem: 404 bei direkten Route-Aufrufen

**Lösung:**
- Die `vercel.json` enthält bereits die korrekten Rewrites
- Alle Routen werden zu `index.html` umgeleitet
- React Router übernimmt dann das Routing

---

## World4You Deployment

### Voraussetzungen
- World4You Hosting-Account
- FTP-Zugang (erhältlich im World4You Control Panel)
- Domain: lashesunddanesh.at

### Schritt-für-Schritt Anleitung

#### 1. Production Build erstellen

Führen Sie lokal aus:

```bash
npm run build
```

Dies erstellt einen `dist/` Ordner mit allen optimierten Dateien.

#### 2. FTP-Verbindung einrichten

**FTP-Zugangsdaten:**
- Server: ftp.world4you.com (oder Ihr spezifischer Server)
- Benutzername: Ihre World4You-Kennung
- Passwort: Ihr FTP-Passwort
- Port: 21 (FTP) oder 22 (SFTP)

**Empfohlene FTP-Clients:**
- FileZilla (https://filezilla-project.org/)
- Cyberduck (https://cyberduck.io/)
- WinSCP (Windows)

#### 3. Dateien hochladen

1. Verbinden Sie sich mit Ihrem FTP-Client
2. Navigieren Sie zum Web-Root-Verzeichnis (meist `/httpdocs/` oder `/www/`)
3. **Löschen Sie alle alten Dateien** (außer .htaccess wenn vorhanden)
4. Laden Sie **ALLE Dateien** aus dem `dist/` Ordner hoch:
   - `index.html`
   - `.htaccess` (wichtig für SPA-Routing!)
   - `assets/` (kompletter Ordner)
   - `images/` (kompletter Ordner)
   - Alle anderen Dateien (`favicon.ico`, `manifest.json`, `robots.txt`, etc.)

#### 4. .htaccess überprüfen

Die `.htaccess` Datei wurde automatisch beim Build in den `dist/` Ordner kopiert.

**Wichtig:** Überprüfen Sie, dass `.htaccess` auf dem Server vorhanden ist!

Die Datei enthält:
- SPA-Routing (alle Routen zu index.html)
- Gzip-Kompression
- Browser-Caching
- Security Headers

#### 5. Environment Variables

Bei World4You werden Environment Variables **zur Build-Zeit** in die JavaScript-Dateien eingebettet.

Die Werte aus `.env.production` wurden bereits beim `npm run build` in den Code kompiliert.

**Keine weiteren Schritte notwendig!**

#### 6. DNS-Einstellungen

Stellen Sie sicher, dass Ihre Domain korrekt auf den World4You Server zeigt:

1. Gehen Sie zum World4You Control Panel
2. Navigieren Sie zu **Domains → DNS-Einstellungen**
3. A-Record sollte auf Ihre Server-IP zeigen
4. Optional: www-Subdomain auf die Hauptdomain weiterleiten

#### 7. SSL-Zertifikat

World4You bietet kostenlose SSL-Zertifikate (Let's Encrypt):

1. Gehen Sie zu **SSL/TLS-Zertifikate**
2. Aktivieren Sie "Let's Encrypt"
3. Wählen Sie Ihre Domain aus
4. Das Zertifikat wird automatisch erstellt und erneuert

### Fehlersuche bei World4You

#### Problem: Weiße Seite / 500 Error

**Lösung:**
1. Überprüfen Sie, ob `.htaccess` hochgeladen wurde
2. Checken Sie die Dateiberechtigungen (644 für Dateien, 755 für Ordner)
3. Schauen Sie in die Server-Logs (falls verfügbar)

#### Problem: 404 bei direkten Route-Aufrufen

**Lösung:**
- Überprüfen Sie, ob `.htaccess` aktiv ist
- Stellen Sie sicher, dass `mod_rewrite` auf dem Server aktiviert ist
- World4You unterstützt standardmäßig .htaccess

#### Problem: CSS/JavaScript werden nicht geladen

**Lösung:**
1. Überprüfen Sie die Browser-Konsole (F12)
2. Stellen Sie sicher, dass der `assets/` Ordner hochgeladen wurde
3. Checken Sie die Dateipfade in `index.html`
4. Alle Pfade sollten relativ sein (beginnend mit `/`)

---

## Wichtige Hinweise

### SPA (Single Page Application) Routing

Diese Seite ist eine SPA mit React Router. Das bedeutet:

- **Vercel:** Verwendet `vercel.json` für Rewrites
- **World4You:** Verwendet `.htaccess` für URL-Rewrites
- Beide Methoden leiten alle Routen zu `index.html` um
- React Router übernimmt dann die Navigation

### Build-Größe

Aktueller Production Build:
```
- index.html:    3.43 kB  │ gzip:   1.27 kB
- CSS:          76.99 kB  │ gzip:  13.09 kB
- UI Bundle:    65.68 kB  │ gzip:  23.51 kB
- Vendor:      162.45 kB  │ gzip:  52.95 kB
- Main:        763.45 kB  │ gzip: 228.87 kB
```

**Total:** ~1 MB (unkomprimiert), ~320 KB (gzip)

### Performance-Optimierungen

Beide Deployments enthalten:
- ✅ Gzip-Kompression
- ✅ Browser-Caching für Assets (1 Jahr)
- ✅ Minifizierung (CSS, JS)
- ✅ Code-Splitting (Vendor, UI, Main)
- ✅ Security Headers
- ✅ SEO-Optimierung

### Updates durchführen

#### Vercel:
1. Push zu GitHub
2. Vercel deployt automatisch

#### World4You:
1. Lokal `npm run build` ausführen
2. `dist/` Ordner per FTP hochladen
3. Alte Dateien auf dem Server ersetzen

### Cache leeren

Nach einem Deployment kann es sein, dass Benutzer die alte Version sehen:

**Lösung:**
- Browser-Cache leeren: Strg + Shift + R (Windows) / Cmd + Shift + R (Mac)
- Inkognito-Modus verwenden zum Testen
- Bei Vercel: Cache wird automatisch invalidiert

---

## Support & Kontakt

Bei Problemen kontaktieren Sie:

**Red Rabbit Media**
- Website: https://redrabbit.media/
- Email: info@redrabbit.media

**Dokumentation:**
- Vite: https://vitejs.dev/
- React Router: https://reactrouter.com/
- Vercel: https://vercel.com/docs
- World4You: https://www.world4you.com/support

---

**Letztes Update:** Januar 2025
**Version:** 1.0.0
**Entwickelt von:** Red Rabbit Media - KI Agentur
