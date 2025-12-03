import { Button } from './ui/button';
import { useContent } from '@/contexts/ContentContext';

const CTABar = () => {
  const { content } = useContent();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 md:hidden">
      <div className="container mx-auto px-4 py-3">
        <Button asChild variant="default" size="lg" className="w-full">
          <a
            href={content.siteSettings.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Jetzt buchen
          </a>
        </Button>
      </div>
    </div>
  );
};

export default CTABar;
