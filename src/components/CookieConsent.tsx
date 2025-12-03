import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X, Cookie, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCookieConsent } from '@/contexts/CookieContext';
import { cn } from '@/lib/utils';

const CookieConsent = () => {
  const { hasConsented, acceptAll, acceptNecessaryOnly } = useCookieConsent();
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);

  useEffect(() => {
    // Show banner after a short delay if user hasn't consented
    if (!hasConsented) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [hasConsented]);

  const handleClose = () => {
    setIsAnimatingOut(true);
    setTimeout(() => {
      setIsVisible(false);
      setIsAnimatingOut(false);
    }, 300);
  };

  const handleAcceptAll = () => {
    acceptAll();
    handleClose();
  };

  const handleAcceptNecessary = () => {
    acceptNecessaryOnly();
    handleClose();
  };

  if (!isVisible || hasConsented) return null;

  return (
    <div
      className={cn(
        'fixed bottom-0 left-0 right-0 z-[9999] transition-transform duration-300 ease-out',
        isAnimatingOut ? 'translate-y-full' : 'translate-y-0'
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 md:px-8 pb-4 sm:pb-6">
        <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-xl border border-primary/20 overflow-hidden">
          <div className="relative p-4 sm:p-5">
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Content */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              {/* Icon */}
              <div className="flex-shrink-0 hidden sm:block">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Cookie className="h-5 w-5 text-primary" />
                </div>
              </div>

              {/* Text Content */}
              <div className="flex-1 space-y-2 pr-6">
                <h3 className="font-serif text-base sm:text-lg font-semibold text-foreground">
                  Cookie-Einstellungen
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Wir verwenden Cookies für die beste Erfahrung. Notwendige Cookies sind erforderlich,
                  weitere helfen uns die Website zu verbessern.
                </p>
                <Link
                  to="/cookie-einstellungen"
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-primary hover:text-primary/80 transition-colors font-medium"
                  onClick={handleClose}
                >
                  <Settings className="h-3.5 w-3.5" />
                  Einstellungen anpassen
                </Link>
              </div>

              {/* Buttons */}
              <div className="flex flex-row sm:flex-col gap-2 sm:flex-shrink-0 sm:w-40">
                <Button
                  onClick={handleAcceptAll}
                  size="sm"
                  className="flex-1 sm:w-full bg-primary hover:bg-primary/90 text-white font-medium text-xs sm:text-sm"
                >
                  Alle akzeptieren
                </Button>
                <Button
                  onClick={handleAcceptNecessary}
                  variant="outline"
                  size="sm"
                  className="flex-1 sm:w-full border-primary/30 hover:bg-primary/5 font-medium text-xs sm:text-sm"
                >
                  Nur notwendige
                </Button>
              </div>
            </div>
          </div>

          {/* Bottom accent */}
          <div className="h-0.5 bg-gradient-to-r from-primary via-rose-400 to-primary" />
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
