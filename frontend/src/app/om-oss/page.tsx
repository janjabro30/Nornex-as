'use client';

import Link from 'next/link';
import { Target, Heart, Shield, Users, ArrowRight, CheckCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/i18n/LanguageContext';

export default function OmOssPage() {
  const { language, t } = useLanguage();

  const values = [
    {
      icon: Heart,
      titleNo: 'Pålitelighet',
      titleEn: 'Reliability',
      descNo: 'Vi holder det vi lover og er der når du trenger oss. Din bedrift kan stole på at IT-en fungerer.',
      descEn: 'We keep our promises and are there when you need us. Your business can rely on IT that works.',
    },
    {
      icon: Target,
      titleNo: 'Ekspertise',
      titleEn: 'Expertise',
      descNo: 'Kontinuerlig læring og sertifiseringer sikrer at vi alltid er oppdatert på de nyeste teknologiene.',
      descEn: 'Continuous learning and certifications ensure we are always up to date on the latest technologies.',
    },
    {
      icon: Users,
      titleNo: 'Personlig Service',
      titleEn: 'Personal Service',
      descNo: 'Du er ikke et nummer hos oss. Vi kjenner din bedrift og dine behov, og tilpasser løsningene deretter.',
      descEn: "You're not just a number to us. We know your business and your needs, and adapt solutions accordingly.",
    },
    {
      icon: Shield,
      titleNo: 'Sikkerhet Først',
      titleEn: 'Security First',
      descNo: 'Alle våre løsninger er bygget med sikkerhet i fokus. Vi beskytter din bedrift mot dagens trusler.',
      descEn: 'All our solutions are built with security in focus. We protect your business against current threats.',
    },
  ];

  const stats = [
    { valueNo: '100+', valueEn: '100+', labelNo: 'Fornøyde kunder', labelEn: 'Satisfied customers' },
    { valueNo: '99.9%', valueEn: '99.9%', labelNo: 'Oppetid', labelEn: 'Uptime' },
    { valueNo: '< 1t', valueEn: '< 1h', labelNo: 'Gjennomsnittlig responstid', labelEn: 'Average response time' },
    { valueNo: '24/7', valueEn: '24/7', labelNo: 'Tilgjengelig support', labelEn: 'Available support' },
  ];

  const certifications = [
    'Microsoft Partner',
    'Google Cloud Partner',
    'ISO 27001 Compliant',
    'GDPR Compliant',
    'Datatilsynet Registered',
  ];

  return (
    <div className="py-12 md:py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
            {t.about.title}
          </h1>
          <p className="text-lg text-muted-foreground">{t.about.subtitle}</p>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-2xl font-bold mb-4">{t.about.story.title}</h2>
            <p className="text-muted-foreground mb-6">{t.about.story.content}</p>
            <p className="text-muted-foreground mb-6">
              {language === 'en'
                ? 'Based in Bergen, we serve businesses throughout Norway. Our team combines years of experience in IT operations, security, and software development with a genuine desire to help our customers succeed.'
                : 'Med base i Bergen betjener vi bedrifter i hele Norge. Teamet vårt kombinerer mange års erfaring innen IT-drift, sikkerhet og programvareutvikling med et genuint ønske om å hjelpe kundene våre med å lykkes.'}
            </p>
            <div className="flex flex-wrap gap-2">
              {certifications.map((cert) => (
                <span
                  key={cert}
                  className="inline-flex items-center gap-1 bg-primary/10 text-primary text-sm px-3 py-1 rounded-full"
                >
                  <CheckCircle className="h-3 w-3" />
                  {cert}
                </span>
              ))}
            </div>
          </div>
          <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-8 aspect-square flex items-center justify-center">
            <div className="text-center">
              <span className="text-6xl font-bold text-primary">N</span>
              <p className="text-muted-foreground mt-2">Nornex AS</p>
            </div>
          </div>
        </div>

        {/* Mission Section */}
        <div className="bg-muted/50 rounded-2xl p-8 md:p-12 mb-20">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">{t.about.mission.title}</h2>
            <p className="text-lg text-muted-foreground">{t.about.mission.content}</p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">
                {language === 'en' ? stat.valueEn : stat.valueNo}
              </div>
              <div className="text-sm text-muted-foreground">
                {language === 'en' ? stat.labelEn : stat.labelNo}
              </div>
            </div>
          ))}
        </div>

        {/* Values Section */}
        <div className="mb-20">
          <h2 className="text-2xl font-bold text-center mb-12">{t.about.values.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <value.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">
                    {language === 'en' ? value.titleEn : value.titleNo}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {language === 'en' ? value.descEn : value.descNo}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Norwegian Context Section */}
        <div className="bg-primary text-primary-foreground rounded-2xl p-8 md:p-12 mb-20">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">
              {language === 'en' ? 'Norwegian Focus' : 'Norsk Fokus'}
            </h2>
            <p className="opacity-90 mb-6">
              {language === 'en'
                ? 'As a Norwegian company, we understand the specific needs and regulations that apply to businesses in Norway. We have extensive experience with:'
                : 'Som et norsk selskap forstår vi de spesifikke behovene og regelverkene som gjelder for bedrifter i Norge. Vi har bred erfaring med:'}
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <li className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 flex-shrink-0" />
                <span>{language === 'en' ? 'GDPR and Datatilsynet compliance' : 'GDPR og Datatilsynets regelverk'}</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 flex-shrink-0" />
                <span>{language === 'en' ? 'Integration with Norwegian APIs' : 'Integrasjon med norske APIer'}</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 flex-shrink-0" />
                <span>{language === 'en' ? 'Vipps, Klarna, BankID integration' : 'Vipps, Klarna, BankID-integrasjon'}</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 flex-shrink-0" />
                <span>{language === 'en' ? 'Altinn and public sector systems' : 'Altinn og offentlige systemer'}</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 flex-shrink-0" />
                <span>{language === 'en' ? 'Norwegian accounting standards' : 'Norske regnskapsstandarder'}</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 flex-shrink-0" />
                <span>{language === 'en' ? 'Local support in Norwegian' : 'Lokal support på norsk'}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">
            {language === 'en' ? 'Ready to get started?' : 'Klar for å komme i gang?'}
          </h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            {language === 'en'
              ? 'Contact us for a non-binding conversation about how we can help your business.'
              : 'Ta kontakt for en uforpliktende samtale om hvordan vi kan hjelpe din bedrift.'}
          </p>
          <Button size="lg" asChild>
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
