import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Navigation, MapPin } from 'lucide-react';

interface GoogleMapProps {
  address: string;
  className?: string;
}

const GoogleMap = ({ address, className = '' }: GoogleMapProps) => {
  // Coordinates for Süßenbrunner Straße 68/4/5, 1220 Wien
  const latitude = 48.2503;
  const longitude = 16.4698;

  // Generate Google Maps route URL
  const getRouteUrl = () => {
    const encodedAddress = encodeURIComponent(address);
    return `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`;
  };

  const handleRouteClick = () => {
    window.open(getRouteUrl(), '_blank', 'noopener,noreferrer');
  };

  const handleMapClick = () => {
    // Open Google Maps in a new tab when clicking the map
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
    window.open(mapsUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <Card className={`overflow-hidden ${className}`}>
      <CardContent className="p-0">
        <div className="space-y-4">
          {/* Google Maps Embed */}
          <div className="relative">
            <div className="aspect-video w-full bg-muted rounded-t-lg overflow-hidden">
              <iframe
                src={`https://maps.google.com/maps?q=${latitude},${longitude}&hl=de&z=15&output=embed`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Maps Standort - Lashes by Danesh"
                className="w-full h-full"
              />
            </div>
          </div>

          {/* Route Button */}
          <div className="p-4 flex justify-center gap-3">
            <Button
              onClick={handleMapClick}
              size="lg"
              variant="outline"
              className="flex items-center gap-2 shadow-md hover:shadow-lg transition-all"
            >
              <MapPin className="h-5 w-5" />
              In Google Maps öffnen
            </Button>
            <Button
              onClick={handleRouteClick}
              size="lg"
              className="flex items-center gap-2 shadow-md hover:shadow-lg transition-all"
            >
              <Navigation className="h-5 w-5" />
              Route anzeigen
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GoogleMap;
