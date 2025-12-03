# Lashes by Danesh - Beauty Salon Website

Eine professionelle Website für Wimpernverlängerung und Beauty-Behandlungen mit integriertem Admin-CMS – 100% kostenlos und ohne Backend!

## 🌟 Features

### Öffentlicher Bereich
- **Homepage**: Elegante Hero-Section, Services, Preise, Galerie, Testimonials
- **Behandlungen**: Übersicht und Detail-Seiten für alle Services
- **Kontakt**: Formular mit Formspree-Integration (kostenlos)
- **Über mich**: Persönliche Vorstellung
- **Empfehlungsprogramm**: 5€ Rabatt für Empfehlungen
- **Rechtliches**: Impressum & Datenschutz

### Admin-Bereich (`/l-787`)
- **Passwortgeschützt**: Login mit Passwort `danesh2025`
- **Dashboard**: Übersicht über alle Inhalte
- **Content-Management**:
  - Site-Einstellungen (Kontakt, Öffnungszeiten, Social Media)
  - Services verwalten
  - Preise bearbeiten
  - Galerie verwalten
  - Testimonials verwalten
  - Impressum & Datenschutz editieren
- **JSON-Export**: Alle Änderungen als JSON herunterladen

## 🎨 Design

- **Farbschema**: Elegantes Nude/Beige (#D4C5B9) mit Soft Rosé (#E8C4C4)
- **Typografie**: Playfair Display (Headlines), Inter (Body)
- **Stil**: Minimalistisch, elegant, feminin
- **Responsive**: Optimiert für Desktop, Tablet und Mobile

## 📝 Inhalte bearbeiten

### 1. Admin-Bereich öffnen
1. Gehe zu: `https://deine-domain.com/l-787`
2. Passwort eingeben: `danesh2025`
3. Klick auf "Anmelden"

### 2. Inhalte bearbeiten
- Navigiere zu dem Bereich, den du bearbeiten möchtest (z.B. "Services", "Preise", "Galerie")
- Bearbeite die Felder direkt im Browser
- Alle Änderungen werden lokal im Browser gespeichert

### 3. Änderungen speichern
1. Klick auf "JSON exportieren" (oben rechts)
2. Lade die `content.json`-Datei herunter
3. **Wichtig**: Sichere die exportierte Datei als Backup
   - Speichere die Datei an einem sicheren Ort
   - Bei Bedarf kann die Datei wiederhergestellt werden
   - Für Deployment siehe Abschnitt "Deployment" unten

## 🖼️ Bilder hochladen (mit Cloudinary)

### Warum Cloudinary?
- **100% kostenlos** (bis 25GB Speicher)
- **Automatische Optimierung**: Bilder werden automatisch komprimiert
- **CDN**: Schnelle Ladezeiten weltweit
- **Einfach zu nutzen**: Kein kompliziertes Setup

### So funktioniert's

1. **Cloudinary-Account erstellen**
   - Gehe zu: https://cloudinary.com/
   - Klick auf "Sign Up" (Registrieren)
   - Wähle den **Free-Plan** (kostenlos)

2. **Bilder hochladen**
   - Logge dich in Cloudinary ein
   - Gehe zu "Media Library"
   - Klick auf "Upload" und wähle dein Bild
   - Warte, bis der Upload abgeschlossen ist

3. **Bild-URL kopieren**
   - Klick auf das hochgeladene Bild
   - Klick auf "Copy URL" oder den Link-Button
   - Die URL sieht so aus: `https://res.cloudinary.com/dein-account/image/upload/v1234567890/bild.jpg`

4. **URL in Admin einfügen**
   - Gehe zu `/l-787` (Admin-Bereich)
   - Navigiere zu "Galerie" oder "Services"
   - Füge die kopierte URL in das Feld "Bild-URL" ein
   - Speichere die Änderungen

### Tipp: Bild-Optimierung
Cloudinary optimiert Bilder automatisch, aber du kannst die URL anpassen:
- **Größe ändern**: Füge `/w_800` zur URL hinzu (z.B. für 800px Breite)
- **Qualität**: Füge `/q_80` hinzu (80% Qualität)
- Beispiel: `https://res.cloudinary.com/.../w_800,q_80/bild.jpg`

## 📧 Kontaktformular einrichten (Formspree)

Das Kontaktformular nutzt Formspree (kostenlos, 50 Submissions/Monat).

### Setup
1. Gehe zu: https://formspree.io/
2. Registriere dich (kostenlos)
3. Erstelle ein neues Formular
4. Kopiere die Form-ID (z.B. `xpznabcd`)
5. Öffne `src/pages/Contact.tsx`
6. Ersetze `YOUR_FORM_ID` durch deine Form-ID:
   ```typescript
   const response = await fetch('https://formspree.io/f/xpznabcd', {
   ```

## 🔐 Admin-Passwort ändern

**Standardpasswort**: `danesh2025`

### Passwort ändern (nur via Code)
1. Öffne `src/contexts/AdminContext.tsx`
2. Suche nach `const ADMIN_PASSWORD = 'danesh2025';`
3. Ersetze `danesh2025` durch dein neues Passwort
4. Speichere die Datei

**Hinweis**: Das Passwort ist im Code sichtbar. Für produktive Nutzung wird empfohlen, ein längeres, sicheres Passwort zu verwenden.

## 🚀 Deployment

### Mit Vercel (empfohlen - kostenlos)
1. Gehe zu [vercel.com](https://vercel.com) und erstelle einen Account
2. Verbinde dein Git-Repository oder lade das Projekt hoch
3. Vercel erkennt automatisch die Vite-Konfiguration
4. Klicke auf "Deploy" - fertig!

### Mit Netlify (Alternative - kostenlos)
1. Gehe zu [netlify.com](https://netlify.com) und erstelle einen Account
2. Ziehe den `dist`-Ordner in den Netlify Drop-Bereich
3. Oder verbinde dein Git-Repository für automatische Deployments

### Custom Domain verbinden
1. Gehe zu den Domain-Einstellungen deines Hosting-Providers
2. Füge deine eigene Domain hinzu
3. Folge den DNS-Anweisungen (CNAME oder A-Record)

## 📱 SEO

- ✅ Meta-Tags für alle Seiten
- ✅ JSON-LD Structured Data
- ✅ Sitemap (`/sitemap.xml`)
- ✅ robots.txt (Admin-Bereich ausgeschlossen)
- ✅ Responsive Design
- ✅ Lazy Loading für Bilder
- ✅ Semantic HTML

## 🎯 Nächste Schritte

1. **Cloudinary-Account erstellen** und echte Bilder hochladen
2. **Formspree-Formular** einrichten für Kontaktformular
3. **Admin öffnen** (`/l-787`) und Inhalte anpassen:
   - Telefonnummer & E-Mail
   - Services-Beschreibungen
   - Preise aktualisieren
   - Galerie-Bilder ersetzen
   - Testimonials anpassen/entfernen
4. **Impressum & Datenschutz** mit echten Daten füllen
5. **JSON exportieren** und als Backup sichern
6. **Website testen** (alle Links, Formulare, Responsive)
7. **Live gehen** mit Vercel oder Netlify 🚀

## 💡 Tipps

- **Regelmäßig JSON exportieren**: Speichere deine Änderungen, bevor du den Browser schließt
- **Bilder optimieren**: Nutze Cloudinary-Parameter für schnellere Ladezeiten
- **Mobile-First**: Teste die Website auf dem Smartphone
- **SEO**: Aktualisiere Meta-Beschreibungen in `index.html` für bessere Google-Rankings

## 🛠️ Technologie

- **Frontend**: React, TypeScript, Vite
- **Styling**: Tailwind CSS, shadcn/ui
- **State Management**: React Context
- **Formulare**: Formspree (kostenlos)
- **Bilder**: Cloudinary (kostenlos)
- **Deployment**: Vercel / Netlify (kostenlos)

## 📞 Support

Bei Fragen oder Problemen:
1. Öffne ein Issue auf GitHub
2. Kontaktiere den Entwickler
3. Schau dir die [React Docs](https://react.dev) oder [Vite Docs](https://vitejs.dev) an

---

Viel Erfolg mit deiner Website! 💫
