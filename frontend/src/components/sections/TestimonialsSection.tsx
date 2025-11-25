'use client';

import { Star, Quote } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/i18n/LanguageContext';

interface Testimonial {
  id: string;
  content: string;
  authorName: string;
  authorRole: string;
  company: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    content:
      'Nornex har transformert måten vi jobber på. Før brukte vi timer på IT-problemer, nå kan vi fokusere på kjernevirksomheten vår. Deres proaktive tilnærming har eliminert nesten alle uplanlagte nedetider.',
    authorName: 'Kristian Nilsen',
    authorRole: 'Daglig leder',
    company: 'Bergen Bygg AS',
    rating: 5,
  },
  {
    id: '2',
    content:
      'Overgangen til Microsoft 365 med Nornex gikk smidigere enn forventet. De håndterte alt fra planlegging til opplæring av ansatte. IT-kostnadene våre har gått ned 30% samtidig som produktiviteten har økt.',
    authorName: 'Maria Johannessen',
    authorRole: 'CFO',
    company: 'Nordic Shipping Solutions',
    rating: 5,
  },
  {
    id: '3',
    content:
      'Som en liten bedrift trengte vi en IT-partner som forsto våre behov uten å sprenge budsjettet. Nornex leverer enterprise-kvalitet til en pris vi har råd til. Anbefales på det sterkeste!',
    authorName: 'Anders Pedersen',
    authorRole: 'Eier',
    company: 'Pedersen Elektro',
    rating: 5,
  },
];

export function TestimonialsSection() {
  const { t } = useLanguage();

  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            {t.testimonials.title}
          </h2>
          <p className="text-lg text-muted-foreground">{t.testimonials.subtitle}</p>
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="relative">
              <CardContent className="pt-6">
                {/* Quote Icon */}
                <Quote className="h-8 w-8 text-primary/20 mb-4" />

                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-muted-foreground mb-6">{testimonial.content}</p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-sm font-semibold text-primary">
                      {testimonial.authorName
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{testimonial.authorName}</p>
                    <p className="text-xs text-muted-foreground">
                      {testimonial.authorRole}, {testimonial.company}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
