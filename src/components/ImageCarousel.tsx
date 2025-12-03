import { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface GalleryImage {
  id: string;
  url: string;
  order: number;
}

interface ImageCarouselProps {
  images: GalleryImage[];
  onImageClick: (index: number) => void;
}

const ImageCarousel = ({ images, onImageClick }: ImageCarouselProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollButtons = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    setCanScrollLeft(container.scrollLeft > 0);
    setCanScrollRight(
      container.scrollLeft < container.scrollWidth - container.clientWidth - 10
    );
  };

  const scroll = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollAmount = container.clientWidth * 0.8;
    const newScrollLeft =
      direction === 'left'
        ? container.scrollLeft - scrollAmount
        : container.scrollLeft + scrollAmount;

    container.scrollTo({
      left: newScrollLeft,
      behavior: 'smooth',
    });

    setTimeout(checkScrollButtons, 300);
  };

  return (
    <div className="relative group">
      {/* Left Navigation Button */}
      {canScrollLeft && (
        <Button
          variant="secondary"
          size="icon"
          className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-10 h-10 w-10 md:h-12 md:w-12 rounded-full shadow-lg opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity"
          onClick={() => scroll('left')}
        >
          <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
        </Button>
      )}

      {/* Right Navigation Button */}
      {canScrollRight && (
        <Button
          variant="secondary"
          size="icon"
          className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-10 h-10 w-10 md:h-12 md:w-12 rounded-full shadow-lg opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity"
          onClick={() => scroll('right')}
        >
          <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
        </Button>
      )}

      {/* Scrollable Container */}
      <div
        ref={scrollContainerRef}
        onScroll={checkScrollButtons}
        className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {images.map((image, index) => (
          <div
            key={image.id}
            className="flex-shrink-0 snap-start cursor-pointer group/item"
            style={{
              width: 'calc(100% - 2rem)', // Mobile: 1 image
            }}
            onClick={() => onImageClick(index)}
          >
            <div className="aspect-square overflow-hidden rounded-lg shadow-lg hover-lift">
              <img
                src={image.url}
                alt={`Galerie Bild ${index + 1}`}
                className="h-full w-full object-cover transition-transform duration-300 group-hover/item:scale-105"
                loading="lazy"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Custom CSS for hiding scrollbar */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        @media (min-width: 640px) {
          .flex-shrink-0 {
            width: calc(50% - 1rem) !important; /* Tablet: 2 images */
          }
        }

        @media (min-width: 1024px) {
          .flex-shrink-0 {
            width: calc(33.333% - 1rem) !important; /* Desktop: 3 images */
          }
        }

        @media (min-width: 1280px) {
          .flex-shrink-0 {
            width: calc(25% - 1rem) !important; /* Large Desktop: 4 images */
          }
        }
      `}</style>
    </div>
  );
};

export default ImageCarousel;
