'use client';

import Link from 'next/link';
import { Monitor, Code, Shield, ArrowRight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/i18n/LanguageContext';

export function ServicesSection() {
  const { t } = useLanguage();

  const services = [
    {
      icon: Monitor,
      title: t.services.managedIt.title,
      description: t.services.managedIt.description,
      href: '/tjenester#managed-it',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      icon: Code,
      title: t.services.productStudio.title,
      description: t.services.productStudio.description,
      href: '/tjenester#product-studio',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      icon: Shield,
      title: t.services.security.title,
      description: t.services.security.description,
      href: '/tjenester#security',
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
  ];

  return (
    <section id="services" className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            {t.services.title}
          </h2>
          <p className="text-lg text-muted-foreground">{t.services.subtitle}</p>
        </div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {services.map((service) => (
            <Card key={service.href} className="group hover:shadow-lg transition-shadow">
              <CardHeader>
                <div
                  className={`inline-flex h-12 w-12 items-center justify-center rounded-lg ${service.bgColor} mb-4`}
                >
                  <service.icon className={`h-6 w-6 ${service.color}`} />
                </div>
                <CardTitle className="text-xl">{service.title}</CardTitle>
                <CardDescription className="text-base">
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link
                  href={service.href}
                  className="inline-flex items-center text-sm font-medium text-primary hover:underline"
                >
                  {t.services.learnMore}
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button variant="outline" size="lg" asChild>
            <Link href="/tjenester">
              {t.services.viewAll}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
