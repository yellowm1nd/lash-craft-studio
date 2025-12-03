import { Shield, User, Lock, Eye, Cookie, Database, Map, Instagram, Calendar, Users, FileCheck, Clock, AlertCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CTABar from '@/components/CTABar';
import { ScrollReveal } from '@/components/ScrollReveal';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useContent } from '@/contexts/ContentContext';

const Datenschutz = () => {
  const { content } = useContent();

  const sections = [
    {
      icon: <AlertCircle className="h-5 w-5" />,
      title: 'Datenschutz auf einen Blick',
      content: (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground leading-relaxed">
            Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen
            Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit
            denen Sie persönlich identifiziert werden können.
          </p>
        </div>
      ),
    },
    {
      icon: <User className="h-5 w-5" />,
      title: 'Verantwortlicher',
      content: (
        <div className="space-y-3">
          <div>
            <p className="font-semibold text-foreground mb-2">Szabina Danesh</p>
            <p className="text-sm text-muted-foreground">Lashes by Danesh</p>
            <p className="text-sm text-muted-foreground">{content.siteSettings.address.replace('\n', ', ')}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">
              <span className="font-medium">Telefon:</span>{' '}
              <a href={`tel:${content.siteSettings.phone}`} className="text-primary hover:text-primary/80">
                {content.siteSettings.phone}
              </a>
            </p>
            <p className="text-sm text-muted-foreground">
              <span className="font-medium">E-Mail:</span>{' '}
              <a href={`mailto:${content.siteSettings.email}`} className="text-primary hover:text-primary/80">
                {content.siteSettings.email}
              </a>
            </p>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Verantwortlicher ist die natürliche oder juristische Person, die allein oder gemeinsam mit
            anderen über die Zwecke und Mittel der Verarbeitung von personenbezogenen Daten entscheidet.
          </p>
        </div>
      ),
    },
    {
      icon: <Eye className="h-5 w-5" />,
      title: 'Datenerfassung auf dieser Website',
      content: (
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-foreground mb-2">Wie erfassen wir Ihre Daten?</h4>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es
              sich z.B. um Daten handeln, die Sie in ein Kontaktformular eingeben oder bei einer
              Terminbuchung angeben.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Andere Daten werden automatisch beim Besuch der Website durch unsere IT-Systeme erfasst.
              Das sind vor allem technische Daten (z.B. Internetbrowser, Betriebssystem oder Uhrzeit des
              Seitenaufrufs).
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-2">Wofür nutzen wir Ihre Daten?</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu
              gewährleisten. Andere Daten können zur Analyse Ihres Nutzerverhaltens verwendet werden
              (sofern Sie eingewilligt haben). Personenbezogene Daten werden zur Terminvereinbarung und
              Kundenkommunikation verwendet.
            </p>
          </div>
        </div>
      ),
    },
    {
      icon: <Database className="h-5 w-5" />,
      title: 'Hosting und Backend-Services',
      content: (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground leading-relaxed">
            Diese Website wird bei einem externen Dienstleister gehostet. Die personenbezogenen Daten,
            die auf dieser Website erfasst werden, werden auf den Servern des Hosters gespeichert.
          </p>
          <div>
            <h4 className="font-semibold text-foreground mb-2">Supabase (Backend-Services)</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Für administrative Funktionen nutzen wir Supabase (Supabase Inc., USA). Dabei können Daten
              auf Servern in den USA verarbeitet werden. Supabase ist nach dem EU-US Data Privacy Framework
              zertifiziert.
            </p>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            <span className="font-medium">Rechtsgrundlage:</span> Art. 6 Abs. 1 lit. b DSGVO
            (Vertragserfüllung) und Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse).
          </p>
        </div>
      ),
    },
    {
      icon: <Cookie className="h-5 w-5" />,
      title: 'Cookies und Cookie-Consent',
      content: (
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-foreground mb-2">Was sind Cookies?</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Unsere Website verwendet Cookies. Das sind kleine Textdateien, die Ihr Webbrowser auf Ihrem
              Endgerät speichert. Cookies helfen uns dabei, unser Angebot nutzerfreundlicher, effektiver
              und sicherer zu machen.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-2">Cookie-Kategorien:</h4>
            <ul className="space-y-2">
              <li className="text-sm text-muted-foreground flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span><strong>Notwendige Cookies:</strong> Erforderlich für Grundfunktionen (immer aktiv)</span>
              </li>
              <li className="text-sm text-muted-foreground flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span><strong>Funktionale Cookies:</strong> Erweiterte Funktionen und Personalisierung</span>
              </li>
              <li className="text-sm text-muted-foreground flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span><strong>Analytische Cookies:</strong> Verständnis der Website-Nutzung (anonymisiert)</span>
              </li>
              <li className="text-sm text-muted-foreground flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span><strong>Marketing Cookies:</strong> Personalisierte Werbung</span>
              </li>
            </ul>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Sie können Ihre Cookie-Einstellungen jederzeit unter{' '}
            <a href="/cookie-einstellungen" className="text-primary hover:text-primary/80">
              Cookie-Einstellungen
            </a>{' '}
            anpassen oder widerrufen.
          </p>
        </div>
      ),
    },
    {
      icon: <Map className="h-5 w-5" />,
      title: 'Google Maps',
      content: (
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground leading-relaxed">
            Diese Website nutzt den Kartendienst Google Maps der Google Ireland Limited, Gordon House,
            Barrow Street, Dublin 4, Irland.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Zur Nutzung von Google Maps ist es notwendig, Ihre IP-Adresse zu speichern. Diese Informationen
            werden in der Regel an einen Server von Google in den USA übertragen und dort gespeichert.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            <span className="font-medium">Rechtsgrundlage:</span> Art. 6 Abs. 1 lit. f DSGVO (berechtigtes
            Interesse an leichter Auffindbarkeit).
          </p>
        </div>
      ),
    },
    {
      icon: <Calendar className="h-5 w-5" />,
      title: 'Treatwell Terminbuchung',
      content: (
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground leading-relaxed">
            Für die Online-Terminbuchung nutzen wir den Dienst Treatwell (Wahanda Limited, London, UK).
            Bei der Buchung werden Ihre Daten (Name, E-Mail-Adresse, Telefonnummer, gewünschter Termin)
            direkt an Treatwell übermittelt.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            <span className="font-medium">Rechtsgrundlage:</span> Art. 6 Abs. 1 lit. b DSGVO
            (Vertragserfüllung zur Terminvereinbarung).
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Datenschutzerklärung:{' '}
            <a
              href="https://www.treatwell.at/info/privacy/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80"
            >
              treatwell.at/info/privacy
            </a>
          </p>
        </div>
      ),
    },
    {
      icon: <Instagram className="h-5 w-5" />,
      title: 'Instagram',
      content: (
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground leading-relaxed">
            Auf dieser Website sind Funktionen des Dienstes Instagram eingebunden (Meta Platforms Ireland
            Limited, 4 Grand Canal Square, Dublin 2, Irland).
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Wenn Sie in Ihrem Instagram-Account eingeloggt sind, kann Instagram den Besuch dieser Website
            Ihrem Benutzerkonto zuordnen.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            <span className="font-medium">Rechtsgrundlage:</span> Art. 6 Abs. 1 lit. f DSGVO (berechtigtes
            Interesse) oder Art. 6 Abs. 1 lit. a DSGVO (Einwilligung).
          </p>
        </div>
      ),
    },
    {
      icon: <Users className="h-5 w-5" />,
      title: 'Empfehlungsprogramm',
      content: (
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground leading-relaxed">
            Im Rahmen unseres Empfehlungsprogramms können Sie uns Freunde und Bekannte weiterempfehlen.
          </p>
          <div>
            <h4 className="font-semibold text-foreground mb-2">Verarbeitete Daten:</h4>
            <ul className="space-y-1">
              <li className="text-sm text-muted-foreground flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>Ihr Name und Ihre E-Mail-Adresse (als Empfehlende/r)</span>
              </li>
              <li className="text-sm text-muted-foreground flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>Name und E-Mail-Adresse der empfohlenen Person</span>
              </li>
              <li className="text-sm text-muted-foreground flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>Zeitpunkt der Empfehlung</span>
              </li>
            </ul>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            <span className="font-medium">Rechtsgrundlage:</span> Art. 6 Abs. 1 lit. a DSGVO (Einwilligung).
            Sie können Ihre Einwilligung jederzeit widerrufen.
          </p>
        </div>
      ),
    },
    {
      icon: <Lock className="h-5 w-5" />,
      title: 'SSL/TLS-Verschlüsselung',
      content: (
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground leading-relaxed">
            Diese Seite nutzt aus Sicherheitsgründen eine SSL- bzw. TLS-Verschlüsselung zum Schutz der
            Übertragung vertraulicher Inhalte.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des Browsers von
            "http://" auf "https://" wechselt und an dem Schloss-Symbol in Ihrer Browserzeile.
          </p>
        </div>
      ),
    },
    {
      icon: <Shield className="h-5 w-5" />,
      title: 'Ihre Rechte als betroffene Person',
      content: (
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground leading-relaxed mb-3">
            Sie haben jederzeit folgende Rechte:
          </p>
          <ul className="space-y-2">
            <li className="text-sm text-muted-foreground flex items-start gap-2">
              <span className="text-primary mt-0.5">•</span>
              <span><strong>Auskunft</strong> über Ihre gespeicherten Daten (Art. 15 DSGVO)</span>
            </li>
            <li className="text-sm text-muted-foreground flex items-start gap-2">
              <span className="text-primary mt-0.5">•</span>
              <span><strong>Berichtigung</strong> unrichtiger Daten (Art. 16 DSGVO)</span>
            </li>
            <li className="text-sm text-muted-foreground flex items-start gap-2">
              <span className="text-primary mt-0.5">•</span>
              <span><strong>Löschung</strong> Ihrer Daten (Art. 17 DSGVO)</span>
            </li>
            <li className="text-sm text-muted-foreground flex items-start gap-2">
              <span className="text-primary mt-0.5">•</span>
              <span><strong>Einschränkung</strong> der Datenverarbeitung (Art. 18 DSGVO)</span>
            </li>
            <li className="text-sm text-muted-foreground flex items-start gap-2">
              <span className="text-primary mt-0.5">•</span>
              <span><strong>Widerspruch</strong> gegen die Verarbeitung (Art. 21 DSGVO)</span>
            </li>
            <li className="text-sm text-muted-foreground flex items-start gap-2">
              <span className="text-primary mt-0.5">•</span>
              <span><strong>Datenübertragbarkeit</strong> (Art. 20 DSGVO)</span>
            </li>
          </ul>
          <div className="mt-4 p-4 rounded-lg bg-primary/5 border border-primary/10">
            <h4 className="font-semibold text-foreground mb-2">Österreichische Datenschutzbehörde</h4>
            <p className="text-sm text-muted-foreground">Barichgasse 40-42, 1030 Wien</p>
            <p className="text-sm text-muted-foreground">Telefon: +43 1 52 152-0</p>
            <p className="text-sm text-muted-foreground">
              E-Mail:{' '}
              <a href="mailto:dsb@dsb.gv.at" className="text-primary hover:text-primary/80">
                dsb@dsb.gv.at
              </a>
            </p>
            <p className="text-sm text-muted-foreground">
              Website:{' '}
              <a
                href="https://www.dsb.gv.at"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80"
              >
                www.dsb.gv.at
              </a>
            </p>
          </div>
        </div>
      ),
    },
    {
      icon: <Clock className="h-5 w-5" />,
      title: 'Speicherdauer',
      content: (
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground leading-relaxed mb-3">
            Soweit nicht spezifisch angegeben, werden personenbezogene Daten nur so lange gespeichert,
            wie es für die Erfüllung der verfolgten Zwecke notwendig ist:
          </p>
          <ul className="space-y-2">
            <li className="text-sm text-muted-foreground flex items-start gap-2">
              <span className="text-primary mt-0.5">•</span>
              <span><strong>Kontaktanfragen:</strong> Bis zur Erledigung, danach max. 3 Jahre</span>
            </li>
            <li className="text-sm text-muted-foreground flex items-start gap-2">
              <span className="text-primary mt-0.5">•</span>
              <span><strong>Terminbuchungen:</strong> Für die Dauer der Geschäftsbeziehung, danach gemäß gesetzlicher Aufbewahrungsfristen (bis zu 7 Jahre)</span>
            </li>
            <li className="text-sm text-muted-foreground flex items-start gap-2">
              <span className="text-primary mt-0.5">•</span>
              <span><strong>Cookies:</strong> Siehe Cookie-Einstellungen für spezifische Speicherdauern</span>
            </li>
            <li className="text-sm text-muted-foreground flex items-start gap-2">
              <span className="text-primary mt-0.5">•</span>
              <span><strong>Empfehlungen:</strong> Bis zur Einlösung bzw. auf Wunsch sofortige Löschung</span>
            </li>
          </ul>
        </div>
      ),
    },
    {
      icon: <FileCheck className="h-5 w-5" />,
      title: 'Änderung der Datenschutzerklärung',
      content: (
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground leading-relaxed">
            Wir behalten uns vor, diese Datenschutzerklärung gelegentlich anzupassen, damit sie stets den
            aktuellen rechtlichen Anforderungen entspricht oder um Änderungen unserer Leistungen umzusetzen.
            Für Ihren erneuten Besuch gilt dann die neue Datenschutzerklärung.
          </p>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <section className="py-20 md:py-28 lg:py-32">
          <div className="container mx-auto px-6 md:px-12 lg:px-16">
            <div className="max-w-5xl mx-auto">
              {/* Header */}
              <ScrollReveal>
                <div className="text-center mb-12 md:mb-16">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
                    <Shield className="h-8 w-8 text-primary" />
                  </div>
                  <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">
                    Datenschutzerklärung
                  </h1>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Informationen zur Verarbeitung Ihrer personenbezogenen Daten gemäß DSGVO
                  </p>
                </div>
              </ScrollReveal>

              {/* Sections */}
              <div className="space-y-6 mb-10">
                {sections.map((section, index) => (
                  <ScrollReveal key={index} delay={index * 50}>
                    <Card className="overflow-hidden border-primary/10">
                      <CardHeader className="bg-primary/5">
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary">
                            {section.icon}
                          </div>
                          <div className="flex-1">
                            <CardTitle className="text-xl mb-2">
                              {section.title}
                            </CardTitle>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-6">
                        {section.content}
                      </CardContent>
                    </Card>
                  </ScrollReveal>
                ))}
              </div>

              {/* Additional Information */}
              <ScrollReveal delay={500}>
                <div className="p-6 rounded-xl bg-muted/30 border border-primary/10">
                  <h3 className="font-serif text-lg font-semibold mb-3">
                    Fragen zum Datenschutz?
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    Bei Fragen zur Verarbeitung Ihrer Daten können Sie uns jederzeit kontaktieren.
                    Sie können auch Ihre Cookie-Einstellungen jederzeit anpassen.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <a
                      href="/cookie-einstellungen"
                      className="text-sm text-primary hover:text-primary/80 transition-colors font-medium"
                    >
                      Cookie-Einstellungen anpassen
                    </a>
                    <a
                      href="/kontakt"
                      className="text-sm text-primary hover:text-primary/80 transition-colors font-medium"
                    >
                      Kontakt aufnehmen
                    </a>
                  </div>
                </div>
              </ScrollReveal>

              {/* Footer Note */}
              <ScrollReveal delay={600}>
                <div className="mt-12 text-center">
                  <p className="text-sm text-muted-foreground">
                    Stand: Oktober 2025
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <CTABar />
    </div>
  );
};

export default Datenschutz;
