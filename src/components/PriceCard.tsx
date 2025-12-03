import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';

interface PriceCardProps {
  title: string;
  startingPrice: number;
  badge?: string;
}

const PriceCard = ({ title, startingPrice, badge }: PriceCardProps) => {
  return (
    <Card className="text-center hover-lift h-full">
      <CardHeader>
        <CardTitle className="font-serif text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="text-3xl font-bold text-primary">
          ab {startingPrice}€
        </div>
        {badge && (
          <Badge variant="secondary" className="mt-2">
            {badge}
          </Badge>
        )}
      </CardContent>
    </Card>
  );
};

export default PriceCard;
