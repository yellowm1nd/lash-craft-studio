import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import type { Service } from '@/contexts/ContentContext';

interface ServiceCardProps {
  service: Service;
  animationDelay?: number;
}

const ServiceCard = ({ service, animationDelay = 0 }: ServiceCardProps) => {
  const delayClass = animationDelay === 0 ? '' : animationDelay === 200 ? 'animation-delay-200' : 'animation-delay-400';

  return (
    <Card className={`overflow-hidden hover-lift h-full flex flex-col animate-fade-in-up ${delayClass}`}>
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={service.imageUrl}
          alt={service.title}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          loading="lazy"
        />
      </div>
      <CardHeader>
        <CardTitle className="font-serif text-2xl">{service.title}</CardTitle>
        <CardDescription>{service.excerpt}</CardDescription>
      </CardHeader>
      <CardFooter className="mt-auto">
        <Button asChild variant="outline" className="w-full group">
          <Link to={`/behandlungen/${service.id}`}>
            Mehr erfahren
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ServiceCard;
