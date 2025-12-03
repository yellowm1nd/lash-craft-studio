import { useState } from 'react';
import { useContent } from '@/contexts/ContentContext';
import { SEOHead } from '@/components/SEO/SEOHead';
import { getBreadcrumbSchema } from '@/components/SEO/StructuredData';
import { PAGE_SEO } from '@/config/seo.config';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CTABar from '@/components/CTABar';
import GoogleMap from '@/components/GoogleMap';
import { ScrollReveal } from '@/components/ScrollReveal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { toast } from 'sonner';

const Contact = () => {
  const { content } = useContent();
  const { siteSettings, openingHours } = content;
  const [loading, setLoading] = useState(false);

  const structuredData = [
    getBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Kontakt', url: '/kontakt' }
    ])
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    try {
      const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
        },
      });

      if (response.ok) {
        toast.success('Nachricht erfolgreich gesendet!');
        e.currentTarget.reset();
      } else {
        throw new Error('Fehler beim Senden');
      }
    } catch (error) {
      toast.error('Fehler beim Senden der Nachricht. Bitte versuchen Sie es erneut.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead
        title={PAGE_SEO.contact.title}
        description={PAGE_SEO.contact.description}
        keywords={PAGE_SEO.contact.keywords}
        url={PAGE_SEO.contact.path}
        structuredData={structuredData}
      />
      <Header />

      <main className="flex-1">
        <section className="py-20 md:py-28 lg:py-32">
          <div className="container mx-auto px-6 md:px-12 lg:px-16">
            <ScrollReveal>
              <div className="mb-12 text-center">
                <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">
                  Kontakt
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Haben Sie Fragen oder möchten einen Termin vereinbaren?
                  Kontaktieren Sie mich gerne!
                </p>
              </div>
            </ScrollReveal>

            <div className="grid gap-8 lg:grid-cols-2">
              {/* Contact Form */}
              <ScrollReveal delay={100}>
                <Card>
                <CardHeader>
                  <CardTitle className="font-serif">Nachricht senden</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2">
                        Name *
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        placeholder="Ihr Name"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        E-Mail *
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        placeholder="ihre.email@beispiel.de"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium mb-2">
                        Telefon
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="+43 123 456 7890"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-2">
                        Nachricht *
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        required
                        placeholder="Ihre Nachricht..."
                        rows={5}
                      />
                    </div>

                    <div className="flex items-start gap-2">
                      <Checkbox id="privacy" name="privacy" required />
                      <label htmlFor="privacy" className="text-sm text-muted-foreground">
                        Ich stimme der Verarbeitung meiner Daten gemäß der{' '}
                        <a
                          href="/datenschutz"
                          className="text-primary hover:underline"
                        >
                          Datenschutzerklärung
                        </a>{' '}
                        zu. *
                      </label>
                    </div>

                    <Button type="submit" size="lg" className="w-full" disabled={loading}>
                      {loading ? 'Wird gesendet...' : 'Nachricht senden'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
              </ScrollReveal>

              {/* Contact Info */}
              <div className="space-y-6">
                <ScrollReveal delay={200}>
                  <Card>
                  <CardHeader>
                    <CardTitle className="font-serif">Kontaktdaten</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-medium mb-1">Adresse</div>
                        <div className="text-muted-foreground whitespace-pre-line">
                          {siteSettings.address}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Phone className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-medium mb-1">Telefon</div>
                        <a
                          href={`tel:${siteSettings.phone}`}
                          className="text-muted-foreground hover:text-primary transition-colors"
                        >
                          {siteSettings.phone}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Mail className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-medium mb-1">E-Mail</div>
                        <a
                          href={`mailto:${siteSettings.email}`}
                          className="text-muted-foreground hover:text-primary transition-colors"
                        >
                          {siteSettings.email}
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                </ScrollReveal>

                <ScrollReveal delay={300}>
                  <Card>
                  <CardHeader>
                    <CardTitle className="font-serif flex items-center gap-2">
                      <Clock className="h-5 w-5 text-primary" />
                      Öffnungszeiten
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {openingHours.map((hour) => (
                        <div
                          key={hour.day}
                          className="flex justify-between text-sm"
                        >
                          <span className="font-medium">{hour.day}</span>
                          <span className="text-muted-foreground">
                            {hour.closed
                              ? 'Geschlossen'
                              : `${hour.open} - ${hour.close}`}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                </ScrollReveal>
              </div>
            </div>

            {/* Map Section */}
            <ScrollReveal delay={150}>
              <div className="mt-12">
                <GoogleMap address={siteSettings.address} />
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>

      <Footer />
      <CTABar />
    </div>
  );
};

export default Contact;
