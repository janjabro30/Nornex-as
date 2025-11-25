'use client';

import Link from 'next/link';
import { ArrowRight, Mail, Phone, MapPin, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/i18n/LanguageContext';

export function CTASection() {
  const { t } = useLanguage();

  return (
    <section className="py-20 md:py-28 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              {t.contact.title}
            </h2>
            <p className="text-lg opacity-90 mb-8">{t.contact.subtitle}</p>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-white/10 flex items-center justify-center">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm opacity-80">{t.contact.info.address}</p>
                  <p className="font-medium">Strandgaten 123, 5004 Bergen</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-white/10 flex items-center justify-center">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm opacity-80">{t.contact.info.phone}</p>
                  <a href="tel:+4755555555" className="font-medium hover:underline">
                    +47 55 55 55 55
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-white/10 flex items-center justify-center">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm opacity-80">{t.contact.info.email}</p>
                  <a href="mailto:post@nornex.no" className="font-medium hover:underline">
                    post@nornex.no
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-white/10 flex items-center justify-center">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm opacity-80">{t.contact.info.hours}</p>
                  <p className="font-medium">{t.contact.info.hoursValue}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="bg-white/10 rounded-2xl p-8 backdrop-blur-sm">
            <h3 className="text-xl font-semibold mb-4">Klar for å komme i gang?</h3>
            <p className="opacity-90 mb-6">
              Book en gratis konsultasjon med vårt team. Vi diskuterer dine behov og foreslår
              løsninger som passer din bedrift.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" variant="secondary" asChild className="flex-1">
                <Link href="/kontakt">
                  {t.hero.cta}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="flex-1 bg-transparent border-white/20 hover:bg-white/10"
              >
                <a href="tel:+4755555555">Ring oss</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
