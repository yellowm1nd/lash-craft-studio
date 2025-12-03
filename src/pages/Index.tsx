import { useState } from 'react';
import { useContent } from '@/contexts/ContentContext';
import { SEOHead } from '@/components/SEO/SEOHead';
import {
  getLocalBusinessSchema,
  getWebsiteSchema,
  getReviewSchema,
  getBreadcrumbSchema
} from '@/components/SEO/StructuredData';
import { PAGE_SEO } from '@/config/seo.config';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import ServiceCard from '@/components/ServiceCard';
import CTABar from '@/components/CTABar';
import ImageCarousel from '@/components/ImageCarousel';
import Lightbox from '@/components/Lightbox';
import GoogleMap from '@/components/GoogleMap';
import { ScrollReveal } from '@/components/ScrollReveal';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Star } from 'lucide-react';

const Index = () => {
  const { content } = useContent();
  const { services, gallery, testimonials, promotions } = content;

  // Filter active promotions
  const activePromotions = promotions.filter(p => p.active).sort((a, b) => a.order - b.order);

  // Structured Data
  const structuredData = [
    getWebsiteSchema(),
    getLocalBusinessSchema(),
    getReviewSchema(testimonials),
    getBreadcrumbSchema([
      { name: 'Home', url: '/' }
    ])
  ].filter(Boolean);

  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const sortedGallery = gallery.sort((a, b) => a.order - b.order);

  const handleImageClick = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const handleNext = () => {
    setCurrentImageIndex((prev) =>
      prev < sortedGallery.length - 1 ? prev + 1 : prev
    );
  };

  const handlePrevious = () => {
    setCurrentImageIndex((prev) =>
      prev > 0 ? prev - 1 : prev
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead
        title={PAGE_SEO.home.title}
        description={PAGE_SEO.home.description}
        keywords={PAGE_SEO.home.keywords}
        url={PAGE_SEO.home.path}
        structuredData={structuredData}
      />
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero />

        {/* Services Section */}
        <section id="services" className="py-20 md:py-28 lg:py-32 scroll-mt-20">
          <div className="container mx-auto px-6 md:px-12 lg:px-16">
            <ScrollReveal>
              <div className="mb-12 text-center">
                <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">
                  Meine Behandlungen
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Von professioneller Wimpernverlängerung bis zu perfekt definierten Augenbrauen – entdecken Sie Ihre natürliche Schönheit.
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

        {/* About Section */}
        <section id="about" className="py-20 md:py-28 lg:py-32 bg-muted/30 overflow-hidden scroll-mt-20">
          <div className="container mx-auto px-6 md:px-12 lg:px-16">
            <div className="grid gap-12 md:grid-cols-2 items-center">
              {/* Text Content */}
              <ScrollReveal delay={100}>
                <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">
                  Über Lashes by Danesh
                </h2>
                <div className="space-y-4 text-lg text-muted-foreground">
                  <p>
                    Willkommen bei <span className="font-semibold text-foreground">Lashes by Danesh</span> – Ihrem Premium-Studio für professionelle Wimpernverlängerung und Augenbrauenstyling in Wien.
                  </p>
                  <p>
                    <span className="font-semibold text-foreground">Das Team:</span> Inhaberin Szabina Danesh bringt jahrelange Erfahrung in der Wimpernverlängerung mit und überzeugt durch fundiertes Fachwissen in der individuellen Beratung. Bei uns fühlen Sie sich wie unter guten Freunden – in entspannter Atmosphäre auf Deutsch und Ungarisch.
                  </p>
                  <p>
                    Mit Leidenschaft für natürliche Schönheit und höchster Präzision gestalten wir jede Wimpernbehandlung individuell nach Ihren Wünschen. Dabei setzen wir ausschließlich auf hochwertige Produkte und strikte Hygienestandards.
                  </p>
                  <p className="font-semibold text-foreground">
                    Vertrauen Sie auf unsere Expertise und lassen Sie sich von erstklassiger Wimpernverlängerung in Wien verwöhnen!
                  </p>
                </div>
              </ScrollReveal>

              {/* Image */}
              <ScrollReveal delay={200}>
                <div className="rounded-2xl overflow-hidden shadow-2xl hover-lift">
                  <img
                    src="/about-lashes-by-danesh.webp"
                    alt="Szabina Danesh - Professionelle Wimpernverlängerung Expertin in Wien 1220 bei der Lash Extension Behandlung"
                    className="w-full h-auto object-cover"
                    loading="lazy"
                    width="800"
                    height="600"
                  />
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Promotions Section */}
        {activePromotions.length > 0 && (
          <section className="py-20 md:py-28 lg:py-32 bg-gradient-to-b from-background to-muted/30">
            <div className="container mx-auto px-6 md:px-12 lg:px-16">
              <div className="space-y-16">
                {activePromotions.map((promotion, index) => (
                  <ScrollReveal key={promotion.id} delay={index * 100}>
                    <div className="grid gap-8 lg:gap-12 items-start md:grid-cols-5">
                      {/* Image - Always Left */}
                      <div className="md:col-span-2">
                        <div className="min-h-[300px] max-h-[500px] rounded-2xl overflow-hidden shadow-2xl hover-lift bg-gradient-to-br from-muted/20 to-muted/40 flex items-center justify-center p-4">
                          <img
                            src={promotion.imageUrl}
                            alt={promotion.title}
                            className="max-h-full w-auto max-w-full object-contain"
                            loading="lazy"
                          />
                        </div>
                      </div>

                      {/* Content - Always Right */}
                      <div className="md:col-span-3">
                        <div className="md:pl-8">
                          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                            {promotion.title}
                          </h2>
                          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed whitespace-pre-line">
                            {promotion.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Gallery Section */}
        <section id="gallery" className="py-20 md:py-28 lg:py-32 scroll-mt-20">
          <div className="container mx-auto px-6 md:px-12 lg:px-16">
            <ScrollReveal>
              <div className="mb-12 text-center">
                <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">
                  Galerie
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Einblicke in meine Arbeit
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={150}>
              <ImageCarousel
                images={sortedGallery}
                onImageClick={handleImageClick}
              />
            </ScrollReveal>
          </div>
        </section>

        {/* Lightbox */}
        <Lightbox
          images={sortedGallery}
          currentIndex={currentImageIndex}
          isOpen={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
          onNext={handleNext}
          onPrevious={handlePrevious}
        />

        {/* Testimonials Section */}
        <section id="testimonials" className="py-20 md:py-28 lg:py-32 bg-muted/30 scroll-mt-20">
          <div className="container mx-auto px-6 md:px-12 lg:px-16">
            <ScrollReveal>
              <div className="mb-12 text-center">
                <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">
                  Was Kunden sagen
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Echte Erfahrungen zufriedener Kundinnen
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={150}>
              {/* Conditional rendering: Grid for ≤3, Carousel for >3 */}
              {testimonials.length <= 3 ? (
                // Grid Layout for 3 or fewer testimonials
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {testimonials.map((testimonial) => (
                    <Card key={testimonial.id} className="hover-lift">
                      <CardContent className="pt-6">
                        <div className="mb-4 flex">
                          {Array.from({ length: testimonial.stars }).map((_, i) => (
                            <Star
                              key={i}
                              className="h-5 w-5 fill-primary text-primary"
                            />
                          ))}
                        </div>
                        <p className="mb-4 text-muted-foreground">
                          "{testimonial.text}"
                        </p>
                        <div className="flex items-center gap-3">
                          {testimonial.imageUrl && (
                            <img
                              src={testimonial.imageUrl}
                              alt={testimonial.name}
                              className="h-10 w-10 rounded-full object-cover"
                            />
                          )}
                          <div className="font-semibold">{testimonial.name}</div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                // Carousel Layout for more than 3 testimonials
                <div className="relative px-4 md:px-12">
                  <Carousel
                    opts={{
                      align: "start",
                      loop: false,
                    }}
                    className="w-full"
                  >
                    <CarouselContent>
                      {testimonials.map((testimonial) => (
                        <CarouselItem
                          key={testimonial.id}
                          className="md:basis-1/2 lg:basis-1/3"
                        >
                          <div className="p-1">
                            <Card className="hover-lift">
                              <CardContent className="pt-6">
                                <div className="mb-4 flex">
                                  {Array.from({ length: testimonial.stars }).map((_, i) => (
                                    <Star
                                      key={i}
                                      className="h-5 w-5 fill-primary text-primary"
                                    />
                                  ))}
                                </div>
                                <p className="mb-4 text-muted-foreground">
                                  "{testimonial.text}"
                                </p>
                                <div className="flex items-center gap-3">
                                  {testimonial.imageUrl && (
                                    <img
                                      src={testimonial.imageUrl}
                                      alt={testimonial.name}
                                      className="h-10 w-10 rounded-full object-cover"
                                    />
                                  )}
                                  <div className="font-semibold">{testimonial.name}</div>
                                </div>
                              </CardContent>
                            </Card>
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious className="flex -left-2 md:-left-12 h-8 w-8 md:h-10 md:w-10" />
                    <CarouselNext className="flex -right-2 md:-right-12 h-8 w-8 md:h-10 md:w-10" />
                  </Carousel>
                </div>
              )}
            </ScrollReveal>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 md:py-28 lg:py-32">
          <div className="container mx-auto px-6 md:px-12 lg:px-16">
            <ScrollReveal>
              <div className="rounded-2xl bg-gradient-to-r from-primary/10 to-secondary/10 p-8 md:p-12 text-center">
                <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
                  Bereit für Ihren perfekten Look?
                </h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Buchen Sie jetzt Ihren Termin und erleben Sie professionelle
                  Wimpernverlängerung in entspannter Atmosphäre.
                </p>
                <a
                  href={content.siteSettings.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-base font-semibold text-foreground shadow-sm hover:bg-primary/90 transition-colors"
                >
                  Jetzt Termin buchen
                </a>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-20 md:py-28 lg:py-32 bg-muted/30">
          <div className="container mx-auto px-6 md:px-12 lg:px-16">
            <ScrollReveal>
              <div className="mb-8 text-center">
                <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
                  So finden Sie uns
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Besuchen Sie uns in unserem Studio in Wien
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={150}>
              <GoogleMap address={content.siteSettings.address} />
            </ScrollReveal>
          </div>
        </section>
      </main>

      <Footer />
      <CTABar />
    </div>
  );
};

export default Index;
