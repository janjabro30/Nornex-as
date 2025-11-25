"use client";

import React from "react";
import {
  RefreshCw,
  Wrench,
  DollarSign,
  ArrowRight,
  Recycle,
  Shield,
  Clock,
  Award,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ServiceCard } from "@/components/services";

const services = [
  {
    icon: RefreshCw,
    title: "Innbytteprogram",
    tagline: "Bytt inn og spar",
    description:
      "Bytt inn din gamle enhet og få rabatt på ny eller refurbished elektronikk. En smart måte å oppgradere utstyret ditt på.",
    features: [
      "Opptil 40% rabatt på ny enhet",
      "Enkel og rask prosess",
      "Sikker datasletting inkludert",
      "Garanti på nye enheter",
    ],
    ctaText: "Start innbytte",
    ctaLink: "/tjenester/innbytte",
    learnMoreLink: "/tjenester/innbytte",
  },
  {
    icon: Wrench,
    title: "Reparasjonsportal",
    tagline: "Profesjonell reparasjon",
    description:
      "Profesjonell reparasjon av IT-utstyr med full sporbarhet. Vi reparerer alt fra bærbare PCer til servere og nettverksutstyr.",
    features: [
      "12 måneders garanti på reparasjoner",
      "Sertifiserte teknikere",
      "Full sporbarhet for bedrifter",
      "Rask behandlingstid",
    ],
    ctaText: "Bestill reparasjon",
    ctaLink: "/tjenester/reparasjon",
    learnMoreLink: "/tjenester/reparasjon",
  },
  {
    icon: DollarSign,
    title: "Selg enheter",
    tagline: "Få betalt for brukt utstyr",
    description:
      "Få betalt for din brukte elektronikk – enkelt, sikkert og miljøvennlig. Vi tilbyr konkurransedyktige priser og gratis henting.",
    features: [
      "Konkurransedyktige priser",
      "Gratis henting for bedrifter",
      "Sikker datasletting",
      "Miljøsertifisert prosess",
    ],
    ctaText: "Selg nå",
    ctaLink: "/tjenester/selg",
    learnMoreLink: "/tjenester/selg",
  },
];

const highlights = [
  {
    icon: Shield,
    title: "Sikkerhet først",
    description: "Alle data slettes sikkert i henhold til bransjestandarder",
  },
  {
    icon: Recycle,
    title: "Miljøvennlig",
    description: "Bidra til sirkulær økonomi og reduser e-avfall",
  },
  {
    icon: Clock,
    title: "Rask service",
    description: "Svar innen 24 timer på alle henvendelser",
  },
  {
    icon: Award,
    title: "Kvalitetsgaranti",
    description: "Full garanti på alle våre tjenester og produkter",
  },
];

export default function ServicesPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-600 via-green-700 to-emerald-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <Badge className="bg-white/20 text-white mb-4">
            Våre tjenester
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            IT-tjenester for bedrifter
          </h1>
          <p className="text-xl text-green-100 max-w-2xl mx-auto mb-8">
            Vi tilbyr et komplett utvalg av IT-tjenester for å hjelpe din bedrift med å
            håndtere, oppgradere og resirkulere IT-utstyr på en bærekraftig måte.
          </p>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-12 -mt-8 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {highlights.map((highlight, index) => (
              <Card key={index} className="text-center">
                <CardContent className="py-6">
                  <highlight.icon className="w-10 h-10 text-green-600 mx-auto mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {highlight.title}
                  </h3>
                  <p className="text-sm text-gray-500">{highlight.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Velg en tjeneste
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Uansett om du vil bytte inn, reparere eller selge IT-utstyr – vi har
              løsningen for deg.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                icon={service.icon}
                title={service.title}
                tagline={service.tagline}
                description={service.description}
                features={service.features}
                ctaText={service.ctaText}
                ctaLink={service.ctaLink}
                learnMoreText="Les mer"
                learnMoreLink={service.learnMoreLink}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Trenger du hjelp med å velge?
          </h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Vårt team står klart til å hjelpe deg med å finne den beste løsningen for
            din bedrift. Kontakt oss for en uforpliktende samtale.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-gray-900 hover:bg-gray-100"
            >
              Kontakt oss
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10"
            >
              Ring +47 22 XX XX XX
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
