"use client";

import React from "react";
import Link from "next/link";
import { Accessibility, ArrowLeft, Eye, Keyboard, Monitor, MessageSquare, Check, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/store";
import { Breadcrumbs } from "@/components/layout";

export default function AccessibilityPage() {
  const { language } = useAppStore();

  const accessibilityFeatures = [
    {
      icon: Eye,
      title: language === "no" ? "Visuell tilgjengelighet" : "Visual Accessibility",
      items: [
        language === "no" ? "Tilstrekkelig fargekontrast (WCAG AA)" : "Sufficient color contrast (WCAG AA)",
        language === "no" ? "Skalerbar tekst og layout" : "Scalable text and layout",
        language === "no" ? "Alt-tekst på bilder" : "Alt text on images",
        language === "no" ? "Fokusindikatorer synlige" : "Visible focus indicators",
      ],
    },
    {
      icon: Keyboard,
      title: language === "no" ? "Tastaturnavigasjon" : "Keyboard Navigation",
      items: [
        language === "no" ? "Full tastaturstøtte" : "Full keyboard support",
        language === "no" ? "Logisk fokusrekkefølge" : "Logical focus order",
        language === "no" ? "Hoppe over navigasjon (skip link)" : "Skip navigation link",
        language === "no" ? "Ingen tastaturfeller" : "No keyboard traps",
      ],
    },
    {
      icon: Monitor,
      title: language === "no" ? "Skjermleser-støtte" : "Screen Reader Support",
      items: [
        language === "no" ? "Semantisk HTML-struktur" : "Semantic HTML structure",
        language === "no" ? "ARIA-attributter der nødvendig" : "ARIA attributes where needed",
        language === "no" ? "Beskrivende lenketekster" : "Descriptive link text",
        language === "no" ? "Overskriftshierarki" : "Heading hierarchy",
      ],
    },
  ];

  const knownLimitations = [
    language === "no" 
      ? "Noen eldre PDF-dokumenter kan ha begrenset tilgjengelighet"
      : "Some older PDF documents may have limited accessibility",
    language === "no"
      ? "Embedded video fra tredjeparter kan mangle undertekster"
      : "Third-party embedded videos may lack captions",
    language === "no"
      ? "Kartfunksjonalitet har begrenset skjermleser-støtte"
      : "Map functionality has limited screen reader support",
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Breadcrumbs */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-3">
          <Breadcrumbs />
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 text-white py-16">
        <div className="container mx-auto px-4">
          <Link href="/">
            <Button variant="ghost" className="text-gray-300 hover:text-white mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              {language === "no" ? "Tilbake" : "Back"}
            </Button>
          </Link>
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center">
              <Accessibility className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold">
                {language === "no" ? "Tilgjengelighetserklæring" : "Accessibility Statement"}
              </h1>
              <p className="text-gray-400">
                {language === "no"
                  ? "Sist oppdatert: November 2024"
                  : "Last updated: November 2024"}
              </p>
            </div>
          </div>
          <p className="text-gray-300 max-w-3xl">
            {language === "no"
              ? "NORNEX AS er forpliktet til å gjøre nettstedet vårt tilgjengelig for alle brukere, uavhengig av funksjonsnivå. Vi jobber kontinuerlig med å forbedre tilgjengeligheten og følge WCAG 2.1 nivå AA."
              : "NORNEX AS is committed to making our website accessible to all users, regardless of ability. We are continuously working to improve accessibility and follow WCAG 2.1 level AA."}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Our Commitment */}
            <Card>
              <CardHeader>
                <CardTitle>
                  {language === "no" ? "Vår forpliktelse" : "Our Commitment"}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600 space-y-4">
                <p>
                  {language === "no"
                    ? "Vi ønsker at alle skal kunne bruke nettstedet vårt. Vårt mål er å oppnå og opprettholde samsvar med Web Content Accessibility Guidelines (WCAG) 2.1 nivå AA."
                    : "We want everyone to be able to use our website. Our goal is to achieve and maintain compliance with Web Content Accessibility Guidelines (WCAG) 2.1 level AA."}
                </p>
                <p>
                  {language === "no"
                    ? "Dette innebærer at nettstedet vårt skal være:"
                    : "This means our website should be:"}
                </p>
                <ul className="list-none space-y-2">
                  <li className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-green-500" />
                    <span><strong>{language === "no" ? "Oppfattbart" : "Perceivable"}</strong> - {language === "no" ? "Informasjon presenteres på måter brukere kan oppfatte" : "Information is presented in ways users can perceive"}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-green-500" />
                    <span><strong>{language === "no" ? "Opererbart" : "Operable"}</strong> - {language === "no" ? "Navigasjon og funksjonalitet fungerer for alle" : "Navigation and functionality works for everyone"}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-green-500" />
                    <span><strong>{language === "no" ? "Forståelig" : "Understandable"}</strong> - {language === "no" ? "Innhold og interaksjon er lett å forstå" : "Content and interaction is easy to understand"}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-green-500" />
                    <span><strong>{language === "no" ? "Robust" : "Robust"}</strong> - {language === "no" ? "Kompatibelt med hjelpeteknologi" : "Compatible with assistive technology"}</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Accessibility Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {accessibilityFeatures.map((feature, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <feature.icon className="w-5 h-5 text-blue-600" />
                      </div>
                      <CardTitle className="text-lg">{feature.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {feature.items.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                          <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Known Limitations */}
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <AlertCircle className="w-5 h-5 text-yellow-600" />
                  </div>
                  <CardTitle>
                    {language === "no" ? "Kjente begrensninger" : "Known Limitations"}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  {language === "no"
                    ? "Vi er klar over følgende begrensninger og jobber med å løse dem:"
                    : "We are aware of the following limitations and are working to resolve them:"}
                </p>
                <ul className="space-y-2">
                  {knownLimitations.map((limitation, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full mt-2 flex-shrink-0" />
                      <span>{limitation}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Feedback */}
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-blue-600" />
                  </div>
                  <CardTitle>
                    {language === "no" ? "Gi oss tilbakemelding" : "Give Us Feedback"}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-gray-600 space-y-4">
                <p>
                  {language === "no"
                    ? "Hvis du opplever problemer med tilgjengeligheten på nettstedet vårt, vil vi gjerne høre fra deg. Din tilbakemelding hjelper oss å forbedre nettstedet for alle."
                    : "If you experience accessibility issues on our website, we would like to hear from you. Your feedback helps us improve the website for everyone."}
                </p>
                <p>
                  {language === "no"
                    ? "Kontakt oss på:"
                    : "Contact us at:"}
                </p>
                <ul className="space-y-1">
                  <li>
                    <strong>E-post:</strong>{" "}
                    <a href="mailto:tilgjengelighet@nornex.no" className="text-blue-600 hover:underline">
                      tilgjengelighet@nornex.no
                    </a>
                  </li>
                  <li>
                    <strong>{language === "no" ? "Telefon:" : "Phone:"}</strong>{" "}
                    <a href="tel:+4712345678" className="text-blue-600 hover:underline">
                      +47 123 45 678
                    </a>
                  </li>
                </ul>
                <p className="text-sm text-gray-500">
                  {language === "no"
                    ? "Vi forsøker å svare på alle henvendelser innen 5 virkedager."
                    : "We aim to respond to all inquiries within 5 business days."}
                </p>
              </CardContent>
            </Card>

            {/* Contact CTA */}
            <div className="text-center py-8">
              <Link href="/kontakt">
                <Button size="lg">
                  {language === "no" ? "Kontakt oss" : "Contact Us"}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
