'use client';

import Link from 'next/link';
import { Check, ArrowRight, HelpCircle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/i18n/LanguageContext';
import { cn } from '@/lib/utils';

interface Package {
  slug: string;
  nameNo: string;
  nameEn: string;
  descNo: string;
  descEn: string;
  price: number;
  featuresNo: string[];
  featuresEn: string[];
  featured?: boolean;
}

const packages: Package[] = [
  {
    slug: 'core-it-care',
    nameNo: 'Core IT Care',
    nameEn: 'Core IT Care',
    descNo: 'Grunnleggende IT-støtte for små bedrifter',
    descEn: 'Basic IT support for small businesses',
    price: 299,
    featuresNo: [
      'Helpdesk 8×5',
      'Automatisk patching',
      'Antivirus/EDR',
      'M365/Google Workspace admin',
      'Systemovervåking',
      'Grunnleggende backup',
    ],
    featuresEn: [
      'Helpdesk 8×5',
      'Automated patching',
      'Antivirus/EDR',
      'M365/Google Workspace admin',
      'System monitoring',
      'Basic backup',
    ],
  },
  {
    slug: 'it-care-plus',
    nameNo: 'IT Care Plus',
    nameEn: 'IT Care Plus',
    descNo: 'Komplett IT-omsorg for voksende bedrifter',
    descEn: 'Complete IT care for growing businesses',
    price: 499,
    featuresNo: [
      'Alt i Core IT Care',
      'Mobile Device Management (MDM)',
      'Avansert e-postsikkerhet',
      'Kvartalsvis vCIO-veikart',
      'On-site timer inkludert',
    ],
    featuresEn: [
      'Everything in Core IT Care',
      'Mobile Device Management (MDM)',
      'Advanced email security',
      'Quarterly vCIO roadmap',
      'On-site hours included',
    ],
    featured: true,
  },
  {
    slug: 'it-care-premium',
    nameNo: 'IT Care Premium',
    nameEn: 'IT Care Premium',
    descNo: 'Enterprise-nivå IT for ambisiøse bedrifter',
    descEn: 'Enterprise-level IT for ambitious businesses',
    price: 799,
    featuresNo: [
      'Alt i IT Care Plus',
      'Server- og nettverksadministrasjon',
      'Månedlige sikkerhetsskanninger',
      'Phishing-trening',
      'Årlig DR-test',
    ],
    featuresEn: [
      'Everything in IT Care Plus',
      'Server & network management',
      'Monthly security scans',
      'Phishing training',
      'Annual DR test',
    ],
  },
];

interface FAQ {
  questionNo: string;
  questionEn: string;
  answerNo: string;
  answerEn: string;
}

const faqs: FAQ[] = [
  {
    questionNo: 'Hva er inkludert i prisene?',
    questionEn: 'What is included in the prices?',
    answerNo: 'Alle priser er per bruker per måned. Du får tilgang til alle tjenestene i pakken uten skjulte kostnader. Support, programvare og overvåking er inkludert.',
    answerEn: 'All prices are per user per month. You get access to all services in the package without hidden costs. Support, software and monitoring are included.',
  },
  {
    questionNo: 'Er det bindingstid?',
    questionEn: 'Is there a commitment period?',
    answerNo: 'Vi tilbyr fleksible avtaler. Standardavtalen er 12 måneder med 3 måneders oppsigelsestid, men vi tilpasser oss gjerne dine behov.',
    answerEn: 'We offer flexible agreements. The standard agreement is 12 months with 3 months notice, but we are happy to adapt to your needs.',
  },
  {
    questionNo: 'Kan jeg endre pakke underveis?',
    questionEn: 'Can I change package along the way?',
    answerNo: 'Ja, du kan oppgradere når som helst. Ved nedgradering gjelder avtalt oppsigelsestid.',
    answerEn: 'Yes, you can upgrade at any time. For downgrades, the agreed notice period applies.',
  },
  {
    questionNo: 'Tilbyr dere skreddersydde løsninger?',
    questionEn: 'Do you offer customized solutions?',
    answerNo: 'Absolutt! Kontakt oss for en uforpliktende samtale om hvordan vi kan tilpasse tjenestene til din bedrift.',
    answerEn: 'Absolutely! Contact us for a non-binding conversation about how we can adapt our services to your business.',
  },
];

export default function PriserPage() {
  const { language, t } = useLanguage();

  return (
    <div className="py-12 md:py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
            {t.pricing.title}
          </h1>
          <p className="text-lg text-muted-foreground">{t.pricing.subtitle}</p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-20">
          {packages.map((pkg) => (
            <Card
              key={pkg.slug}
              className={cn(
                'relative flex flex-col',
                pkg.featured && 'border-primary shadow-lg md:scale-105 z-10'
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
                <CardTitle className="text-xl">
                  {language === 'en' ? pkg.nameEn : pkg.nameNo}
                </CardTitle>
                <CardDescription>
                  {language === 'en' ? pkg.descEn : pkg.descNo}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="text-center mb-6">
                  <span className="text-4xl font-bold">{pkg.price}</span>
                  <span className="text-muted-foreground ml-1">{t.pricing.perMonth}</span>
                  <p className="text-sm text-muted-foreground mt-1">{t.pricing.perUser}</p>
                </div>
                <ul className="space-y-3">
                  {(language === 'en' ? pkg.featuresEn : pkg.featuresNo).map((feature, index) => (
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

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold mb-4">Ofte stilte spørsmål</h2>
            <p className="text-muted-foreground">
              Finn svar på vanlige spørsmål om våre priser og tjenester.
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="border rounded-lg p-6">
                <div className="flex items-start gap-3">
                  <HelpCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold mb-2">
                      {language === 'en' ? faq.questionEn : faq.questionNo}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {language === 'en' ? faq.answerEn : faq.answerNo}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 p-8 bg-primary text-primary-foreground rounded-2xl">
          <h2 className="text-2xl font-bold mb-4">Usikker på hvilken pakke som passer?</h2>
          <p className="opacity-90 mb-6 max-w-xl mx-auto">
            Book en gratis konsultasjon med vårt team. Vi analyserer dine behov og foreslår den beste løsningen for din bedrift.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/kontakt">
              {t.hero.cta}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
