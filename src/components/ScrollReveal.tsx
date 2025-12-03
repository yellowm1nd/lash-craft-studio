import { ReactNode } from 'react';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';
import { cn } from '@/lib/utils';

interface ScrollRevealProps {
  children: ReactNode;
  direction?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
  duration?: number;
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  className?: string;
}

/**
 * ScrollReveal Component
 * Reveals children with fade-in animation when scrolling into viewport
 *
 * @param direction - Direction of the slide animation (default: 'top')
 * @param delay - Animation delay in ms (default: 0)
 * @param duration - Animation duration in ms (default: 800)
 * @param threshold - Intersection observer threshold (default: 0.1)
 * @param rootMargin - Intersection observer root margin (default: '0px 0px -50px 0px')
 * @param triggerOnce - Only trigger animation once (default: true)
 */
export const ScrollReveal = ({
  children,
  direction = 'top',
  delay = 0,
  duration = 800,
  threshold = 0.1,
  rootMargin = '0px 0px -50px 0px',
  triggerOnce = true,
  className = '',
}: ScrollRevealProps) => {
  const { ref, isVisible } = useScrollReveal({
    threshold,
    rootMargin,
    triggerOnce,
  });

  // Direction-based transform classes
  const directionClasses = {
    top: 'translate-y-[-30px]',
    bottom: 'translate-y-[30px]',
    left: 'translate-x-[-30px]',
    right: 'translate-x-[30px]',
  };

  return (
    <div
      ref={ref}
      className={cn(
        'transition-all ease-out',
        !isVisible && 'opacity-0',
        !isVisible && directionClasses[direction],
        isVisible && 'opacity-100 translate-x-0 translate-y-0',
        className
      )}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};
