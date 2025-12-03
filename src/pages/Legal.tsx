import { useLocation } from 'react-router-dom';
import { useContent } from '@/contexts/ContentContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CTABar from '@/components/CTABar';
import { ScrollReveal } from '@/components/ScrollReveal';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const Legal = () => {
  const location = useLocation();
  const { content } = useContent();

  const isImpressum = location.pathname.includes('impressum');
  const text = isImpressum
    ? content.legal.impressum
    : content.legal.datenschutz;
  const title = isImpressum ? 'Impressum' : 'Datenschutzerklärung';

  // Enhanced markdown parser with better formatting
  const parseMarkdown = (text: string) => {
    return text.split('\n\n').map((block, i) => {
      // Handle main heading (# )
      if (block.startsWith('# ')) {
        return (
          <h1
            key={i}
            className="font-serif text-3xl md:text-4xl font-bold mb-6 mt-12 first:mt-0 text-foreground border-b pb-4 border-primary/20"
          >
            {block.slice(2)}
          </h1>
        );
      }

      // Handle section headings (## )
      if (block.startsWith('## ')) {
        return (
          <div key={i} className="mt-10 mb-6">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-4">
              {block.slice(3)}
            </h2>
            <Separator className="bg-primary/10" />
          </div>
        );
      }

      // Handle subsection headings (### )
      if (block.startsWith('### ')) {
        return (
          <h3
            key={i}
            className="font-serif text-xl md:text-2xl font-semibold text-foreground mt-8 mb-4"
          >
            {block.slice(4)}
          </h3>
        );
      }

      // Handle bullet points (lines starting with -)
      if (block.includes('\n-')) {
        const lines = block.split('\n');
        const items = lines.filter(line => line.trim().startsWith('-'));

        return (
          <ul key={i} className="space-y-3 mb-6 ml-4">
            {items.map((item, idx) => (
              <li
                key={idx}
                className="text-base md:text-lg text-foreground/80 leading-relaxed flex items-start gap-3"
              >
                <span className="text-primary mt-1.5">•</span>
                <span className="flex-1">{item.slice(1).trim()}</span>
              </li>
            ))}
          </ul>
        );
      }

      // Handle bold text and links
      const parts = block.split(/(\*\*.*?\*\*|https?:\/\/[^\s]+)/g);
      const processedText = parts.map((part, j) => {
        // Bold text
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <strong key={j} className="font-semibold text-foreground">
              {part.slice(2, -2)}
            </strong>
          );
        }
        // Links
        if (part.startsWith('http://') || part.startsWith('https://')) {
          return (
            <a
              key={j}
              href={part}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 underline break-all"
            >
              {part}
            </a>
          );
        }
        return part;
      });

      // Regular paragraph
      return (
        <p
          key={i}
          className="text-base md:text-lg text-foreground/80 mb-5 leading-relaxed"
        >
          {processedText}
        </p>
      );
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-primary/5">
      <Header />

      <main className="flex-1">
        <section className="py-16 md:py-24 lg:py-28">
          <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-16">
            <div className="max-w-5xl mx-auto">
              {/* Page Title */}
              <ScrollReveal>
                <div className="text-center mb-12 md:mb-16">
                  <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-foreground">
                    {title}
                  </h1>
                  <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
                </div>
              </ScrollReveal>

              {/* Content Card */}
              <ScrollReveal delay={100}>
                <Card className="shadow-lg border-primary/10 bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-6 md:p-10 lg:p-12">
                    <div className="legal-content space-y-2">
                      {parseMarkdown(text)}
                    </div>
                  </CardContent>
                </Card>
              </ScrollReveal>

              {/* Last Updated Info */}
              <ScrollReveal delay={200}>
                <div className="mt-8 text-center">
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

export default Legal;
