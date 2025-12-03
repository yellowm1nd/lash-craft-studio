import { Building2, Mail, Phone, Globe, Scale, FileText, ExternalLink } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CTABar from '@/components/CTABar';
import { ScrollReveal } from '@/components/ScrollReveal';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useContent } from '@/contexts/ContentContext';

const Impressum = () => {
  const { content } = useContent();

  const sections = [
    {
      icon: <Building2 className="h-5 w-5" />,
      title: 'Angaben gemäß Informationspflicht',
      content: (
        <div className="space-y-6">
          <div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              Informationspflicht laut § 5 E-Commerce Gesetz (ECG), § 14 Unternehmensgesetzbuch (UGB) und
              Offenlegungspflicht laut § 25 Mediengesetz:
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3 p-4 rounded-lg bg-primary/5 border border-primary/10">
              <h4 className="font-semibold text-foreground mb-3">Unternehmen</h4>
              <div className="space-y-2">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Firmenname</p>
                  <p className="text-sm font-medium text-foreground">Lashes by Danesh</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Inhaberin</p>
                  <p className="text-sm font-medium text-foreground">Szabina Danesh</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Adresse</p>
                  <p className="text-sm font-medium text-foreground">{content.siteSettings.address}</p>
                </div>
              </div>
            </div>

            <div className="space-y-3 p-4 rounded-lg bg-primary/5 border border-primary/10">
              <h4 className="font-semibold text-foreground mb-3">Kontakt</h4>
              <div className="space-y-2">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Telefon</p>
                  <a
                    href={`tel:${content.siteSettings.phone}`}
                    className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                  >
                    {content.siteSettings.phone}
                  </a>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">E-Mail</p>
                  <a
                    href={`mailto:${content.siteSettings.email}`}
                    className="text-sm font-medium text-primary hover:text-primary/80 transition-colors break-all"
                  >
                    {content.siteSettings.email}
                  </a>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Website</p>
                  <a
                    href="https://lashesbydanesh.at"
                    className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                  >
                    lashesbydanesh.at
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-2">
            <h4 className="text-sm font-semibold text-foreground mb-2">Unternehmensgegenstand</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Kosmetik- und Schönheitsdienstleistungen, spezialisiert auf Wimpernverlängerung und Augenbrauen-Styling
            </p>
          </div>
        </div>
      ),
    },
    {
      icon: <Scale className="h-5 w-5" />,
      title: 'Online-Streitbeilegung',
      content: (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground leading-relaxed">
            Verbraucher haben die Möglichkeit, Beschwerden an die Online-Streitbeilegungsplattform der EU zu richten:
          </p>
          <div className="p-4 rounded-lg bg-primary/5 border border-primary/10">
            <a
              href="https://ec.europa.eu/consumers/odr/main"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
              ec.europa.eu/consumers/odr
            </a>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Sie können allfällige Beschwerden auch an die oben angegebene E-Mail-Adresse richten.
          </p>
        </div>
      ),
    },
    {
      icon: <FileText className="h-5 w-5" />,
      title: 'Haftungsausschluss',
      content: (
        <div className="space-y-5">
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-2">Haftung für Inhalte</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit,
              Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.
              Als Diensteanbieter sind wir für eigene Inhalte auf diesen Seiten nach den allgemeinen
              Gesetzen verantwortlich.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-2">Haftung für Links</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen
              Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen.
              Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber
              verantwortlich.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-2">Urheberrecht</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen
              dem österreichischen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede
              Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen
              Zustimmung des jeweiligen Autors bzw. Erstellers.
            </p>
          </div>
        </div>
      ),
    },
    {
      icon: <Globe className="h-5 w-5" />,
      title: 'Weitere Informationen',
      content: (
        <div className="space-y-5">
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-2">Empfehlungsprogramm</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Bei der Nutzung unseres Empfehlungsprogramms werden personenbezogene Daten gemäß unserer
              Datenschutzerklärung verarbeitet. Die Teilnahme ist freiwillig.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-2">Bildnachweise</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Die verwendeten Bilder stammen von Unsplash.com und unterliegen den jeweiligen Lizenzbedingungen.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-2">Websiteentwicklung</h4>
            <a
              href="https://redrabbit.media"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1.5"
            >
              Red Rabbit Media
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
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
                    <Scale className="h-8 w-8 text-primary" />
                  </div>
                  <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">
                    Impressum
                  </h1>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Informationspflicht gemäß österreichischem E-Commerce Gesetz
                  </p>
                </div>
              </ScrollReveal>

              {/* Sections */}
              <div className="space-y-6 mb-10">
                {sections.map((section, index) => (
                  <ScrollReveal key={index} delay={index * 100}>
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
                    Weitere rechtliche Informationen
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    Für Informationen zur Datenverarbeitung und Ihren Rechten lesen Sie bitte unsere
                    Datenschutzerklärung. Bei Fragen können Sie uns jederzeit kontaktieren.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <a
                      href="/datenschutz"
                      className="text-sm text-primary hover:text-primary/80 transition-colors font-medium"
                    >
                      Zur Datenschutzerklärung
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

export default Impressum;
