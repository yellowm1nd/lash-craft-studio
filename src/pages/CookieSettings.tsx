import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Cookie, Check, Shield, Sparkles, BarChart3, Megaphone } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CTABar from '@/components/CTABar';
import { ScrollReveal } from '@/components/ScrollReveal';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useCookieConsent, type CookiePreferences } from '@/contexts/CookieContext';
import { useToast } from '@/hooks/use-toast';

interface CookieCategory {
  id: keyof CookiePreferences;
  title: string;
  description: string;
  icon: React.ReactNode;
  required?: boolean;
  examples: string[];
}

const cookieCategories: CookieCategory[] = [
  {
    id: 'necessary',
    title: 'Notwendige Cookies',
    description:
      'Diese Cookies sind für die Grundfunktionen der Website erforderlich und können nicht deaktiviert werden. Sie speichern keine persönlich identifizierbaren Informationen.',
    icon: <Shield className="h-5 w-5" />,
    required: true,
    examples: [
      'Sitzungsverwaltung',
      'Sicherheitsfunktionen',
      'Cookie-Einstellungen speichern',
      'Grundlegende Website-Funktionen',
    ],
  },
  {
    id: 'functional',
    title: 'Funktionale Cookies',
    description:
      'Diese Cookies ermöglichen erweiterte Funktionen und Personalisierung, wie z.B. Videos und Live-Chat. Sie können von uns oder von Drittanbietern gesetzt werden.',
    icon: <Sparkles className="h-5 w-5" />,
    examples: [
      'Benutzerpräferenzen speichern',
      'Spracheinstellungen',
      'Live-Chat-Funktionen',
      'Video-Einbettungen',
    ],
  },
  {
    id: 'analytics',
    title: 'Analytische Cookies',
    description:
      'Diese Cookies helfen uns zu verstehen, wie Besucher mit unserer Website interagieren. Alle Informationen sind anonymisiert und werden nur für statistische Zwecke verwendet.',
    icon: <BarChart3 className="h-5 w-5" />,
    examples: [
      'Besucherzahlen',
      'Seitenaufrufe',
      'Verweildauer',
      'Nutzungsverhalten',
    ],
  },
  {
    id: 'marketing',
    title: 'Marketing Cookies',
    description:
      'Diese Cookies werden verwendet, um Besuchern relevante Werbung und Marketing-Kampagnen anzuzeigen. Sie verfolgen Besucher über Websites hinweg.',
    icon: <Megaphone className="h-5 w-5" />,
    examples: [
      'Personalisierte Werbung',
      'Remarketing',
      'Social Media Integration',
      'Conversion-Tracking',
    ],
  },
];

const CookieSettings = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { preferences, updatePreferences, acceptAll, resetConsent } = useCookieConsent();
  const [localPreferences, setLocalPreferences] = useState<CookiePreferences>(preferences);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    setLocalPreferences(preferences);
  }, [preferences]);

  useEffect(() => {
    const changed =
      localPreferences.necessary !== preferences.necessary ||
      localPreferences.functional !== preferences.functional ||
      localPreferences.analytics !== preferences.analytics ||
      localPreferences.marketing !== preferences.marketing;
    setHasChanges(changed);
  }, [localPreferences, preferences]);

  const handleToggle = (category: keyof CookiePreferences, value: boolean) => {
    if (category === 'necessary') return; // Can't toggle necessary cookies
    setLocalPreferences((prev) => ({
      ...prev,
      [category]: value,
    }));
  };

  const handleSave = () => {
    updatePreferences(localPreferences);
    toast({
      title: 'Einstellungen gespeichert',
      description: 'Ihre Cookie-Einstellungen wurden erfolgreich aktualisiert.',
    });
    setHasChanges(false);
  };

  const handleAcceptAll = () => {
    acceptAll();
    setLocalPreferences({
      necessary: true,
      functional: true,
      analytics: true,
      marketing: true,
    });
    toast({
      title: 'Alle Cookies akzeptiert',
      description: 'Sie haben alle Cookie-Kategorien aktiviert.',
    });
    setHasChanges(false);
  };

  const handleResetConsent = () => {
    resetConsent();
    navigate('/');
    toast({
      title: 'Einstellungen zurückgesetzt',
      description: 'Ihre Cookie-Einstellungen wurden gelöscht.',
    });
  };

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
                    <Cookie className="h-8 w-8 text-primary" />
                  </div>
                  <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">
                    Cookie-Einstellungen
                  </h1>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Verwalten Sie Ihre Cookie-Präferenzen. Sie können Ihre Einstellungen jederzeit ändern.
                  </p>
                </div>
              </ScrollReveal>

              {/* Cookie Categories */}
              <div className="space-y-6 mb-10">
                {cookieCategories.map((category, index) => (
                  <ScrollReveal key={category.id} delay={index * 100}>
                    <Card className="overflow-hidden border-primary/10">
                      <CardHeader className="bg-primary/5">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-start gap-4 flex-1">
                            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary">
                              {category.icon}
                            </div>
                            <div className="flex-1">
                              <CardTitle className="text-xl mb-2 flex items-center gap-2">
                                {category.title}
                                {category.required && (
                                  <span className="text-xs font-normal px-2 py-1 rounded-full bg-primary/10 text-primary">
                                    Erforderlich
                                  </span>
                                )}
                              </CardTitle>
                              <CardDescription className="text-sm leading-relaxed">
                                {category.description}
                              </CardDescription>
                            </div>
                          </div>
                          <Switch
                            checked={localPreferences[category.id]}
                            onCheckedChange={(checked) => handleToggle(category.id, checked)}
                            disabled={category.required}
                            className="flex-shrink-0"
                          />
                        </div>
                      </CardHeader>
                      <CardContent className="pt-4">
                        <div>
                          <p className="text-sm font-medium text-foreground mb-2">Beispiele:</p>
                          <ul className="space-y-1.5">
                            {category.examples.map((example, i) => (
                              <li
                                key={i}
                                className="text-sm text-muted-foreground flex items-center gap-2"
                              >
                                <Check className="h-3.5 w-3.5 text-primary flex-shrink-0" />
                                <span>{example}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  </ScrollReveal>
                ))}
              </div>

              {/* Action Buttons */}
              <ScrollReveal delay={400}>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Button
                    onClick={handleSave}
                    disabled={!hasChanges}
                    size="lg"
                    className="w-full sm:w-auto min-w-[200px] bg-primary hover:bg-primary/90 text-white"
                  >
                    Einstellungen speichern
                  </Button>
                  <Button
                    onClick={handleAcceptAll}
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto min-w-[200px] border-primary/30 hover:bg-primary/5"
                  >
                    Alle akzeptieren
                  </Button>
                  <Button
                    onClick={handleResetConsent}
                    variant="ghost"
                    size="lg"
                    className="w-full sm:w-auto text-muted-foreground hover:text-foreground"
                  >
                    Einstellungen zurücksetzen
                  </Button>
                </div>
              </ScrollReveal>

              {/* Additional Information */}
              <ScrollReveal delay={500}>
                <div className="mt-12 p-6 rounded-xl bg-muted/30 border border-primary/10">
                  <h3 className="font-serif text-lg font-semibold mb-3">
                    Weitere Informationen
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    Für detaillierte Informationen über unsere Datenverarbeitung und Ihre Rechte
                    lesen Sie bitte unsere Datenschutzerklärung. Bei Fragen zu unseren Cookie-Richtlinien
                    können Sie uns jederzeit kontaktieren.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Button
                      variant="link"
                      className="p-0 h-auto text-primary hover:text-primary/80"
                      onClick={() => navigate('/datenschutz')}
                    >
                      Zur Datenschutzerklärung
                    </Button>
                    <Button
                      variant="link"
                      className="p-0 h-auto text-primary hover:text-primary/80"
                      onClick={() => navigate('/kontakt')}
                    >
                      Kontakt aufnehmen
                    </Button>
                  </div>
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

export default CookieSettings;
