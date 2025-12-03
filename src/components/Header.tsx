import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, MapPin } from 'lucide-react';
import { useState } from 'react';
import { useContent } from '@/contexts/ContentContext';
import { Button } from './ui/button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { content } = useContent();

  const isActive = (path: string) => location.pathname === path;

  const navigation = [
    { name: 'Home', path: '/' },
    { name: 'Behandlungen', path: '/behandlungen' },
    { name: 'Über mich', path: '/ueber-mich' },
    { name: 'Kontakt', path: '/kontakt' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-primary/95 backdrop-blur supports-[backdrop-filter]:bg-primary/90">
      <div className="container mx-auto px-6 md:px-12 lg:px-16">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="font-serif text-2xl font-bold text-foreground">
              Lashes by Danesh
            </span>
          </Link>

          {/* Desktop Navigation - Centered */}
          <nav className="hidden md:flex md:items-center md:space-x-8 absolute left-1/2 transform -translate-x-1/2">
            {navigation.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="relative text-base font-medium text-foreground hover:text-foreground/80 transition-colors py-2 group"
              >
                {item.name}
                <span className={`absolute bottom-0 left-0 h-0.5 bg-foreground transition-all duration-300 ease-out ${
                  isActive(item.path) ? 'w-full' : 'w-0 group-hover:w-full'
                }`}></span>
              </Link>
            ))}
          </nav>

          {/* Action Buttons - Right Side */}
          <div className="hidden md:flex md:items-center md:space-x-3">
            <Button asChild variant="ghost" size="sm" className="text-foreground hover:bg-white/10 border border-foreground/20">
              <a
                href={`tel:${content.siteSettings.phone}`}
                className="flex items-center gap-1"
              >
                <Phone className="h-4 w-4" />
                Jetzt Anrufen
              </a>
            </Button>
            <Button asChild variant="ghost" size="sm" className="text-foreground hover:bg-white/10 border border-foreground/20">
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(content.siteSettings.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1"
              >
                <MapPin className="h-4 w-4" />
                Route
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="border-t border-foreground/20 py-4 md:hidden">
            <div className="flex flex-col space-y-3">
              {navigation.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-sm font-medium transition-colors ${
                    isActive(item.path)
                      ? 'text-foreground'
                      : 'text-foreground/80 hover:text-foreground'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-2 space-y-2">
                <Button asChild variant="secondary" size="sm" className="w-full">
                  <a
                    href={`tel:${content.siteSettings.phone}`}
                    className="flex items-center justify-center gap-2"
                  >
                    <Phone className="h-4 w-4" />
                    Jetzt Anrufen
                  </a>
                </Button>
                <Button asChild variant="secondary" size="sm" className="w-full">
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(content.siteSettings.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2"
                  >
                    <MapPin className="h-4 w-4" />
                    Route
                  </a>
                </Button>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
