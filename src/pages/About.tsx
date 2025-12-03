import { SEOHead } from '@/components/SEO/SEOHead';
import { getBreadcrumbSchema, getPersonSchema } from '@/components/SEO/StructuredData';
import { PAGE_SEO } from '@/config/seo.config';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CTABar from '@/components/CTABar';
import { ScrollReveal } from '@/components/ScrollReveal';
import { Button } from '@/components/ui/button';
import { useContent } from '@/contexts/ContentContext';

const About = () => {
  const { content } = useContent();

  const structuredData = [
    getBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Über mich', url: '/ueber-mich' }
    ]),
    getPersonSchema()
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead
        title={PAGE_SEO.about.title}
        description={PAGE_SEO.about.description}
        keywords={PAGE_SEO.about.keywords}
        url={PAGE_SEO.about.path}
        structuredData={structuredData}
      />
      <Header />

      <main className="flex-1">
        <section className="py-20 md:py-28 lg:py-32">
          <div className="container mx-auto px-6 md:px-12 lg:px-16">
              <ScrollReveal>
                <h1 className="font-serif text-4xl md:text-5xl font-bold mb-8 text-center">
                  Über mich
                </h1>
              </ScrollReveal>

              <div className="grid gap-12 md:grid-cols-2 items-center mb-12">
                <ScrollReveal delay={100}>
                  <div className="aspect-square overflow-hidden rounded-2xl">
                    <img
                      src="/images/about/danesh-portrait.jpg"
                      alt="Danesh"
                      className="h-full w-full object-cover object-top"
                    />
                  </div>
                </ScrollReveal>

                <ScrollReveal delay={200}>
                  <div className="space-y-4">
                    <h2 className="font-serif text-3xl font-bold">
                      Hallo, ich bin Szabina
                    </h2>
                    <p className="text-lg text-muted-foreground">
                      Willkommen bei Lashes by Danesh! Als zertifizierte
                      Wimpernverlängerung-Spezialistin in Wien bringe ich Leidenschaft
                      und Präzision in jede Behandlung ein.
                    </p>
                    <p className="text-muted-foreground">
                      Mit mehrjähriger Erfahrung und kontinuierlicher Weiterbildung
                      biete ich Ihnen professionelle Wimpernverlängerung und
                      Augenbrauen-Styling auf höchstem Niveau. Jede Kundin erhält
                      eine individuelle Beratung und maßgeschneiderte Behandlung, die
                      perfekt zu Ihrem Stil passt.
                    </p>
                  </div>
                </ScrollReveal>
              </div>

              <div className="grid gap-8 md:grid-cols-3 mb-12">
                <ScrollReveal delay={100}>
                  <div className="text-center p-6 bg-muted/30 rounded-lg">
                    <div className="font-serif text-4xl font-bold text-primary mb-2">
                      5+
                    </div>
                    <div className="text-muted-foreground">
                      Jahre Erfahrung
                    </div>
                  </div>
                </ScrollReveal>
                <ScrollReveal delay={200}>
                  <div className="text-center p-6 bg-muted/30 rounded-lg">
                    <div className="font-serif text-4xl font-bold text-primary mb-2">
                      500+
                    </div>
                    <div className="text-muted-foreground">
                      Zufriedene Kundinnen
                    </div>
                  </div>
                </ScrollReveal>
                <ScrollReveal delay={300}>
                  <div className="text-center p-6 bg-muted/30 rounded-lg">
                    <div className="font-serif text-4xl font-bold text-primary mb-2">
                      100%
                    </div>
                    <div className="text-muted-foreground">
                      Qualität & Hygiene
                    </div>
                  </div>
                </ScrollReveal>
              </div>

              <ScrollReveal>
                <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 md:p-12 text-center">
                  <h2 className="font-serif text-2xl md:text-3xl font-bold mb-4">
                    Meine Philosophie
                  </h2>
                  <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
                    Jede Frau ist einzigartig – und genau so sollte auch ihre
                    Wimpernverlängerung sein. In entspannter Atmosphäre kreiere ich
                    für Sie den perfekten Look, der Ihre natürliche Schönheit
                    unterstreicht.
                  </p>
                  <Button asChild size="lg">
                    <a
                      href={content.siteSettings.bookingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Jetzt Termin buchen
                    </a>
                  </Button>
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

export default About;
