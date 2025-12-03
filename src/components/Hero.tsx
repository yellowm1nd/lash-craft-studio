import { Button } from './ui/button';
import { useContent } from '@/contexts/ContentContext';
import { Phone } from 'lucide-react';

const Hero = () => {
  const { content } = useContent();

  return (
    <section className="relative min-h-[600px] md:min-h-[700px] overflow-hidden bg-gray-100 w-full">
      {/* Background Image - Beautiful lashes close-up */}
      <img
        src="/images/hero-lashes.jpg"
        alt="Perfekte Wimpernverlängerung - Lashes by Danesh"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* Dark gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/40 z-[1]" />

      {/* Content - Centered */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 py-20 md:py-32 flex items-center justify-center min-h-[600px] md:min-h-[700px]">
        <div className="max-w-3xl text-center overflow-hidden">
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-6 text-white animate-fade-in-up break-words hyphens-auto" style={{ textShadow: '2px 4px 12px rgba(0,0,0,0.5)', lineHeight: '1.3' }} lang="de">
            Entdecke deine<br />
            natürliche Schönheit
          </h1>
          <p className="text-lg md:text-xl mb-10 text-white leading-relaxed max-w-2xl mx-auto animate-fade-in-up animation-delay-200 break-words" style={{ textShadow: '1px 2px 8px rgba(0,0,0,0.5)' }}>
            Ihr Spezialist für Wimpernverlängerung, Augenbrauen & Wimpernbehandlungen in Wien
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-400">
            <Button
              asChild
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <a
                href={`tel:${content.siteSettings.phone}`}
                className="inline-flex items-center gap-2"
              >
                <Phone className="h-5 w-5" />
                Termin buchen
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-2 border-primary/30 text-foreground hover:bg-primary/5 hover:border-primary/50 transition-all duration-300"
            >
              <a href="#services">Behandlungen ansehen</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
