import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Clock } from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import MarkdownRenderer from './MarkdownRenderer';
import type { PriceCategory } from '@/contexts/ContentContext';

interface PriceAccordionProps {
  categories: PriceCategory[];
}

const PriceAccordion = ({ categories }: PriceAccordionProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-4">
      {categories.map((category, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          className="border border-border rounded-lg overflow-hidden bg-background shadow-sm hover:shadow-md transition-shadow"
        >
          {/* Header - Always visible */}
          <button
            onClick={() => toggleAccordion(index)}
            className="w-full px-6 py-5 flex items-center justify-between hover:bg-muted/50 transition-colors"
          >
            <div className="flex-1 text-left">
              <h3 className="font-serif text-xl md:text-2xl font-semibold mb-2">
                {category.category}
              </h3>
              <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                {category.durationRange && (
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{category.durationRange}</span>
                  </div>
                )}
                {category.startingPrice !== undefined && (
                  <div className="text-primary font-semibold">
                    ab {category.startingPrice}€
                  </div>
                )}
              </div>
            </div>
            <div className="ml-4">
              <motion.div
                animate={{ rotate: openIndex === index ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown className="h-6 w-6 text-muted-foreground" />
              </motion.div>
            </div>
          </button>

          {/* Expandable Content */}
          <AnimatePresence>
            {openIndex === index && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-6 pt-2 border-t border-border bg-muted/20">
                  {/* Description */}
                  {category.description && (
                    <div className="mb-4 text-sm">
                      <MarkdownRenderer
                        content={category.description}
                        className="[&>p]:mb-3 [&>p]:text-sm [&>p]:leading-relaxed"
                      />
                    </div>
                  )}

                  {/* Price Items */}
                  <div className="space-y-3">
                    {category.items.map((item, itemIndex) => (
                      <div
                        key={itemIndex}
                        className="flex items-start justify-between gap-4 p-4 bg-background rounded-lg border border-border hover:border-primary/50 transition-colors"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium">{item.name}</span>
                            {item.badge && (
                              <Badge variant="secondary" className="text-xs">
                                {item.badge}
                              </Badge>
                            )}
                          </div>
                          {item.description && (
                            <p className="text-xs text-muted-foreground mb-2">
                              {item.description}
                            </p>
                          )}
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            <span>{item.duration} Min.</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-xl text-primary">
                            {item.amount}€
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
};

export default PriceAccordion;
