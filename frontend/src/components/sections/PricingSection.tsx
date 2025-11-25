'use client';

import Link from 'next/link';
import { Check } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/i18n/LanguageContext';
import { cn } from '@/lib/utils';

interface Package {
  name: string;
  price: number;
  description: string;
  features: string[];
  featured?: boolean;
  slug: string;
}

const packages: Package[] = [
  {
    name: 'Core IT Care',
    slug: 'core-it-care',
    price: 299,
    description: 'Grunnleggende IT-støtte for små bedrifter',
    features: [
      'Helpdesk 8×5',
      'Automatisk patching',
      'Antivirus/EDR',
      'M365/Google Workspace admin',
      'Systemovervåking',
      'Grunnleggende backup',
    ],
  },
  {
    name: 'IT Care Plus',
    slug: 'it-care-plus',
    price: 499,
    description: 'Komplett IT-omsorg for voksende bedrifter',
    features: [
      'Alt i Core IT Care',
      'Mobile Device Management (MDM)',
      'Avansert e-postsikkerhet',
      'Kvartalsvis vCIO-veikart',
      'On-site timer inkludert',
    ],
    featured: true,
  },
  {
    name: 'IT Care Premium',
    slug: 'it-care-premium',
    price: 799,
    description: 'Enterprise-nivå IT for ambisiøse bedrifter',
    features: [
      'Alt i IT Care Plus',
      'Server- og nettverksadministrasjon',
      'Månedlige sikkerhetsskanninger',
      'Phishing-trening',
      'Årlig DR-test',
    ],
  },
];

export function PricingSection() {
  const { t } = useLanguage();

  return (
    <section className="py-20 md:py-28 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            {t.pricing.title}
          </h2>
          <p className="text-lg text-muted-foreground">{t.pricing.subtitle}</p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {packages.map((pkg) => (
            <Card
              key={pkg.slug}
              className={cn(
                'relative flex flex-col',
                pkg.featured && 'border-primary shadow-lg scale-105 z-10'
              )}
            >
              {pkg.featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
                    {t.pricing.featured}
                  </span>
                </div>
              )}
              <CardHeader className="text-center pb-2">
                <CardTitle className="text-xl">{pkg.name}</CardTitle>
                <CardDescription>{pkg.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="text-center mb-6">
                  <span className="text-4xl font-bold">{pkg.price}</span>
                  <span className="text-muted-foreground ml-1">{t.pricing.perMonth}</span>
                  <p className="text-sm text-muted-foreground mt-1">{t.pricing.perUser}</p>
                </div>
                <ul className="space-y-3">
                  {pkg.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  variant={pkg.featured ? 'default' : 'outline'}
                  asChild
                >
                  <Link href={`/kontakt?package=${pkg.slug}`}>{t.pricing.getStarted}</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Bottom Note */}
        <p className="text-center text-sm text-muted-foreground mt-8">
          Alle priser er eks. mva. Skreddersydde løsninger tilgjengelig.{' '}
          <Link href="/kontakt" className="text-primary hover:underline">
            {t.pricing.contact}
          </Link>
        </p>
      </div>
    </section>
  );
}
