import { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
import { useContent } from '@/contexts/ContentContext';

const WhatsAppButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const { content } = useContent();

  // Format phone number for WhatsApp (remove spaces, dashes, etc.)
  const whatsappNumber = content.siteSettings.phone.replace(/[\s\-\(\)]/g, '');
  const message = 'Hallo, ich interessiere mich für Ihre Behandlungen!';
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  useEffect(() => {
    const handleScroll = () => {
      // Show button after scrolling past hero section (approximately 600px)
      const heroHeight = 600;
      if (window.scrollY > heroHeight) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Check initial scroll position
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="fixed bottom-20 md:bottom-24 lg:bottom-5 right-5 z-50">
      {/* Tooltip */}
      <div
        className={`
          absolute bottom-full right-0 mb-3
          bg-background border-2 border-primary
          text-foreground text-sm
          px-4 py-3 rounded-xl
          whitespace-nowrap
          shadow-card
          transition-all duration-300
          ${showTooltip ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'}
        `}
      >
        <div className="font-serif font-semibold mb-1 text-foreground">Schreiben Sie uns!</div>
        <div className="text-xs text-muted-foreground">{message}</div>
        {/* Arrow */}
        <div className="absolute top-full right-5 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-primary"></div>
      </div>

      {/* WhatsApp Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className={`
          flex items-center justify-center
          w-14 h-14 rounded-full
          bg-primary hover:bg-[hsl(2_70%_78%)]
          shadow-card hover:shadow-hover
          transition-all duration-300 ease-in-out
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}
          hover:scale-110
        `}
        aria-label="WhatsApp Chat"
      >
        <MessageCircle className="w-7 h-7 text-white" />
      </a>
    </div>
  );
};

export default WhatsAppButton;
