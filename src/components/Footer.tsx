import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Instagram, Facebook, Download } from 'lucide-react';
import { useContent } from '@/contexts/ContentContext';
import { downloadVCard, type VCardData } from '@/lib/vcard';
import { Button } from '@/components/ui/button';

// TikTok Icon Component (lucide-react doesn't have TikTok, so we create a custom one)
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

const Footer = () => {
  const { content } = useContent();
  const { siteSettings, openingHours } = content;

  const handleSaveContact = () => {
    const vcardData: VCardData = {
      firstName: 'Danesh',
      lastName: '',
      organization: 'Lashes by Danesh',
      phone: siteSettings.phone,
      email: siteSettings.email,
      address: {
        street: 'Innere Stadt',
        city: 'Wien',
        postalCode: '1010',
        country: 'Austria'
      },
      website: 'https://lashesbydanesh.at',
      instagram: siteSettings.instagram,
      facebook: siteSettings.facebook,
      tiktok: siteSettings.tiktok
    };

    downloadVCard(vcardData, 'lashes-by-danesh');
  };

  return (
    <footer className="border-t bg-primary">
      <div className="container mx-auto px-6 md:px-12 lg:px-16 py-12 md:py-16 lg:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* About */}
          <div className="flex flex-col">
            <h3 className="mb-4 font-serif text-lg font-semibold text-foreground">
              Lashes by Danesh
            </h3>
            <p className="text-sm text-foreground/80 leading-relaxed">
              Professionelle Wimpernverlängerung und Augenbrauen-Styling in Wien.
              Ihr Spezialist für natürliche Schönheit.
            </p>
          </div>

          {/* Contact */}
          <div className="flex flex-col">
            <h3 className="mb-4 font-serif text-lg font-semibold text-foreground">Kontakt</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 flex-shrink-0 text-foreground mt-0.5" />
                <div className="text-foreground/80 leading-relaxed">
                  {siteSettings.address.split('\n').map((line, index) => (
                    <div key={index}>{line}</div>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 flex-shrink-0 text-foreground" />
                <a
                  href={`tel:${siteSettings.phone}`}
                  className="text-foreground/80 hover:text-foreground transition-colors"
                >
                  {siteSettings.phone}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 flex-shrink-0 text-foreground" />
                <a
                  href={`mailto:${siteSettings.email}`}
                  className="text-foreground/80 hover:text-foreground transition-colors"
                >
                  {siteSettings.email}
                </a>
              </div>

              {/* Save Contact Button */}
              <div className="mt-5">
                <Button
                  onClick={handleSaveContact}
                  variant="ghost"
                  size="default"
                  className="w-full text-foreground hover:bg-white/10 border border-foreground/20"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Kontakt speichern
                </Button>
              </div>
            </div>
          </div>

          {/* Opening Hours */}
          <div className="flex flex-col">
            <h3 className="mb-4 font-serif text-lg font-semibold text-foreground">
              Öffnungszeiten
            </h3>
            <div className="space-y-1.5 text-sm">
              {openingHours.map((hour) => (
                <div
                  key={hour.day}
                  className="flex items-center gap-4 text-foreground/80"
                >
                  <span className="text-left min-w-[80px]">{hour.day}</span>
                  <span className="text-left min-w-[110px]">
                    {hour.closed
                      ? 'Geschlossen'
                      : `${hour.open} - ${hour.close}`}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-col">
            <h3 className="mb-4 font-serif text-lg font-semibold text-foreground">Links</h3>
            <div className="space-y-2.5 text-sm">
              <Link
                to="/behandlungen"
                className="block text-foreground/80 hover:text-foreground transition-colors"
              >
                Behandlungen
              </Link>
              <Link
                to="/ueber-mich"
                className="block text-foreground/80 hover:text-foreground transition-colors"
              >
                Über mich
              </Link>
              <Link
                to="/empfehle-mich-weiter"
                className="block text-foreground/80 hover:text-foreground transition-colors"
              >
                Empfehlung
              </Link>
              <Link
                to="/impressum"
                className="block text-foreground/80 hover:text-foreground transition-colors"
              >
                Impressum
              </Link>
              <Link
                to="/datenschutz"
                className="block text-foreground/80 hover:text-foreground transition-colors"
              >
                Datenschutz
              </Link>
              <Link
                to="/cookie-einstellungen"
                className="block text-foreground/80 hover:text-foreground transition-colors"
              >
                Cookie-Einstellungen
              </Link>
            </div>

            {/* Social Media */}
            <div className="mt-5 flex gap-3">
              {siteSettings.instagram && (
                <a
                  href={siteSettings.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground/80 hover:text-foreground transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </a>
              )}
              {siteSettings.facebook && (
                <a
                  href={siteSettings.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground/80 hover:text-foreground transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="h-5 w-5" />
                </a>
              )}
              {siteSettings.tiktok && (
                <a
                  href={siteSettings.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground/80 hover:text-foreground transition-colors"
                  aria-label="TikTok"
                >
                  <TikTokIcon className="h-5 w-5" />
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-foreground/20 pt-8 text-center text-sm text-foreground/80">
          <p className="mb-2">© {new Date().getFullYear()} Lashes by Danesh. Alle Rechte vorbehalten.</p>
          <p>
            Website entwickelt von{' '}
            <a
              href="https://redrabbit.media/"
              target="_blank"
              rel="noopener"
              className="text-foreground hover:text-foreground/60 transition-colors font-medium"
              title="Red Rabbit Media - KI Agentur für digitale Lösungen"
            >
              Red Rabbit Media
            </a>
            {' '}- KI Agentur
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
