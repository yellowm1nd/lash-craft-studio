import { useContent } from '@/contexts/ContentContext';
import { SEOHead } from '@/components/SEO/SEOHead';
import { getBreadcrumbSchema } from '@/components/SEO/StructuredData';
import { PAGE_SEO } from '@/config/seo.config';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ServiceCard from '@/components/ServiceCard';
import CTABar from '@/components/CTABar';
import { ScrollReveal } from '@/components/ScrollReveal';

const Services = () => {
  const { content } = useContent();
  const { services } = content;

  const structuredData = [
    getBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Behandlungen', url: '/behandlungen' }
    ])
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead
        title={PAGE_SEO.services.title}
        description={PAGE_SEO.services.description}
        keywords={PAGE_SEO.services.keywords}
        url={PAGE_SEO.services.path}
        structuredData={structuredData}
      />
      <Header />

      <main className="flex-1">
        <section className="py-20 md:py-28 lg:py-32">
          <div className="container mx-auto px-6 md:px-12 lg:px-16">
            <ScrollReveal>
              <div className="mb-12 text-center">
                <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">
                  Alle Behandlungen
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Von professioneller Wimpernverlängerung bis zu perfekt definierten Augenbrauen – entdecken Sie mein komplettes Angebot für Ihre natürliche Schönheit.
                </p>
              </div>
            </ScrollReveal>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
              {services
                .sort((a, b) => a.order - b.order)
                .map((service, index) => (
                  <ScrollReveal key={service.id} delay={index * 100}>
                    <ServiceCard
                      service={service}
                      animationDelay={0}
                    />
                  </ScrollReveal>
                ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <CTABar />
    </div>
  );
};

export default Services;
