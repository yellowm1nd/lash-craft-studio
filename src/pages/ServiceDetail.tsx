import { useParams } from 'react-router-dom';
import { useContent } from '@/contexts/ContentContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CTABar from '@/components/CTABar';
import PriceAccordion from '@/components/PriceAccordion';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import { ScrollReveal } from '@/components/ScrollReveal';
import { Button } from '@/components/ui/button';
import { Sparkles, Clock, Shield } from 'lucide-react';

const ServiceDetail = () => {
  const { slug } = useParams();
  const { content } = useContent();
  const { services, prices, siteSettings } = content;

  const service = services.find((s) => s.id === slug);
  const servicePrices = prices.filter((p) => p.serviceId === slug);

  if (!service) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-serif text-4xl font-bold mb-4">
              Service nicht gefunden
            </h1>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Image Section */}
        <section className="relative h-[70vh] md:h-[80vh] lg:h-[90vh] min-h-[600px] overflow-hidden bg-gray-100 w-full">
          {/* Background Image */}
          <img
            src={service.imageUrl}
            alt={service.title}
            className="absolute inset-0 w-full h-full object-cover z-0"
          />

          {/* Dark gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/40 z-[1]" />

          {/* Hero Content - Centered */}
          <div className="relative z-10 container mx-auto px-4 sm:px-6 md:px-12 lg:px-16 py-20 md:py-32 flex items-center justify-center h-full">
            <div className="max-w-3xl text-center overflow-hidden">
              <h1
                className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-6 text-white animate-fade-in-up break-words hyphens-auto"
                style={{ textShadow: '2px 4px 12px rgba(0,0,0,0.5)', lineHeight: '1.3' }}
                lang="de"
              >
                {service.title}
              </h1>
              {service.excerpt && (
                <p
                  className="text-lg md:text-xl mb-10 text-white leading-relaxed max-w-2xl mx-auto animate-fade-in-up animation-delay-200 break-words"
                  style={{ textShadow: '1px 2px 8px rgba(0,0,0,0.5)' }}
                >
                  {service.excerpt}
                </p>
              )}
              <div className="flex justify-center animate-fade-in-up animation-delay-400">
                <Button
                  asChild
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <a
                    href={siteSettings.bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Termin buchen
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 md:py-28 lg:py-32 bg-background scroll-mt-20">
          <div className="container mx-auto px-6 md:px-12 lg:px-16">
            <div className="max-w-3xl mx-auto text-center">
              <ScrollReveal delay={100}>
                {service.description ? (
                  <MarkdownRenderer content={service.description} className="text-center" />
                ) : (
                  <p className="text-muted-foreground">Keine Beschreibung verfügbar</p>
                )}
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* SEO Info Section */}
        {service.seoSectionTitle && service.seoSectionContent && (
          <section id="info" className="py-20 md:py-28 lg:py-32 bg-muted/30 scroll-mt-20">
            <div className="container mx-auto px-6 md:px-12 lg:px-16">
              <div className="max-w-6xl mx-auto">
                <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                  {/* Text Content - Left */}
                  <ScrollReveal delay={100} direction="left">
                    <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">
                      {service.seoSectionTitle}
                    </h2>
                    <MarkdownRenderer content={service.seoSectionContent} />
                  </ScrollReveal>

                  {/* Image - Right */}
                  {service.seoSectionImageUrl && (
                    <ScrollReveal delay={200} direction="right">
                      <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-lg">
                        <img
                          src={service.seoSectionImageUrl}
                          alt={service.seoSectionTitle}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </ScrollReveal>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Benefits Section */}
        <section id="benefits" className="py-20 md:py-28 lg:py-32 bg-muted/30 scroll-mt-20">
          <div className="container mx-auto px-6 md:px-12 lg:px-16">
            <ScrollReveal>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-center mb-12">
                Ihre Vorteile
              </h2>
            </ScrollReveal>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <ScrollReveal delay={100}>
                <div className="text-center p-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                    <Sparkles className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold mb-2">
                    Natürliche Schönheit
                  </h3>
                  <p className="text-muted-foreground">
                    Individuell auf Ihre Augenform abgestimmt für ein perfekt natürliches Ergebnis
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={200}>
                <div className="text-center p-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                    <Clock className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold mb-2">
                    Langanhaltend
                  </h3>
                  <p className="text-muted-foreground">
                    Bis zu 6 Wochen perfekte Wimpern - wasserfest und pflegeleicht
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={300}>
                <div className="text-center p-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                    <Shield className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold mb-2">
                    Höchste Qualität
                  </h3>
                  <p className="text-muted-foreground">
                    Premium Materialien und professionelle Applikation mit höchster Präzision
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Prices Section */}
        <section id="prices" className="py-20 md:py-28 lg:py-32 bg-background scroll-mt-20">
          <div className="container mx-auto px-6 md:px-12 lg:px-16">
            <div className="max-w-4xl mx-auto">
              <ScrollReveal>
                <div className="text-center mb-12">
                  <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
                    Preise & Behandlungen
                  </h2>
                  <p className="text-muted-foreground text-lg">
                    Wählen Sie die perfekte Behandlung für Ihren gewünschten Look
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={150}>
                <PriceAccordion categories={servicePrices} />
              </ScrollReveal>

              {/* CTA Button */}
              <ScrollReveal delay={300}>
                <div className="mt-12 text-center">
                  <Button asChild size="lg" className="min-w-[250px]">
                    <a
                      href={siteSettings.bookingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Jetzt Termin buchen
                    </a>
                  </Button>
                  <p className="text-sm text-muted-foreground mt-4">
                    Sichere online Buchung über Treatwell
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

export default ServiceDetail;
