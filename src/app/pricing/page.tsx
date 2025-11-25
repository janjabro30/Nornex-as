"use client";

import React from "react";
import Link from "next/link";
import {
  Check,
  Building2,
  User,
  ArrowRight,
  Package,
  Wrench,
  Recycle,
  Shield,
  Truck,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAppStore } from "@/store";

export default function PricingPage() {
  const { language } = useAppStore();

  const privatePricing = [
    {
      category: language === "no" ? "Nettbutikk" : "Shop",
      description:
        language === "no"
          ? "Priser inkl. MVA for privatpersoner"
          : "Prices incl. VAT for private customers",
      features: [
        language === "no" ? "Alle priser inkl. 25% MVA" : "All prices incl. 25% VAT",
        language === "no" ? "14 dagers angrerett" : "14 days return policy",
        language === "no" ? "12 mnd garanti" : "12 month warranty",
        language === "no" ? "Gratis frakt over 500 kr" : "Free shipping over 500 NOK",
      ],
      href: "/nettbutikk",
    },
    {
      category: language === "no" ? "Selg til oss" : "Sell to Us",
      description:
        language === "no"
          ? "Konkurransedyktige priser for ditt brukte utstyr"
          : "Competitive prices for your used equipment",
      features: [
        language === "no" ? "Gratis verdivurdering" : "Free valuation",
        language === "no" ? "Rask utbetaling" : "Fast payment",
        language === "no" ? "Sikker datasletting inkludert" : "Secure data erasure included",
        language === "no" ? "Henting for større mengder" : "Pickup for larger quantities",
      ],
      href: "/selg-til-oss",
    },
    {
      category: language === "no" ? "Reparasjon" : "Repair",
      description:
        language === "no"
          ? "Fast pris eller timebasert fakturering"
          : "Fixed price or hourly billing",
      features: [
        language === "no" ? "Gratis feilsøking" : "Free diagnostics",
        language === "no" ? "Tilbud før reparasjon" : "Quote before repair",
        language === "no" ? "3 mnd garanti på reparasjoner" : "3 month warranty on repairs",
        language === "no" ? "Originale eller kvalitetsdeler" : "Original or quality parts",
      ],
      href: "/reparasjon",
    },
  ];

  const businessPricing = [
    {
      category: language === "no" ? "IT-utstyr" : "IT Equipment",
      description:
        language === "no"
          ? "Priser eks. MVA for bedrifter"
          : "Prices excl. VAT for businesses",
      features: [
        language === "no" ? "Alle priser eks. MVA" : "All prices excl. VAT",
        language === "no" ? "Volumrabatter tilgjengelig" : "Volume discounts available",
        language === "no" ? "Faktura med 30 dager" : "Invoice with 30 days",
        language === "no" ? "Prioritert support" : "Priority support",
        language === "no" ? "Dedikert kontaktperson" : "Dedicated contact person",
      ],
      href: "/nettbutikk",
    },
    {
      category: language === "no" ? "Innkjøp/Resirkulering" : "Buyback/Recycling",
      description:
        language === "no"
          ? "Skreddersydde løsninger for bedrifter"
          : "Tailored solutions for businesses",
      features: [
        language === "no" ? "Gratis henting i Oslo-området" : "Free pickup in Oslo area",
        language === "no" ? "Sertifisert datasletting" : "Certified data erasure",
        language === "no" ? "Dokumentasjon og rapporter" : "Documentation and reports",
        language === "no" ? "Miljøsertifikat" : "Environmental certificate",
        language === "no" ? "Fleksible avtaler" : "Flexible agreements",
      ],
      href: "/selg-til-oss",
    },
    {
      category: language === "no" ? "Service & Support" : "Service & Support",
      description:
        language === "no"
          ? "Serviceavtaler tilpasset din bedrift"
          : "Service agreements tailored to your business",
      features: [
        language === "no" ? "SLA-avtaler" : "SLA agreements",
        language === "no" ? "On-site support" : "On-site support",
        language === "no" ? "24/7 nødtelefon" : "24/7 emergency phone",
        language === "no" ? "Preventivt vedlikehold" : "Preventive maintenance",
        language === "no" ? "Årlig gjennomgang" : "Annual review",
      ],
      href: "/tjenester",
    },
  ];

  const priceExamples = [
    {
      icon: Package,
      service: language === "no" ? "Refurbished laptop" : "Refurbished laptop",
      priceRange: "2.999 - 12.999 kr",
      note: language === "no" ? "Avhenger av modell og tilstand" : "Depends on model and condition",
    },
    {
      icon: Wrench,
      service: language === "no" ? "Skjermbytte iPhone" : "iPhone screen replacement",
      priceRange: "1.499 - 3.999 kr",
      note: language === "no" ? "Inkl. deler og arbeid" : "Incl. parts and labor",
    },
    {
      icon: Recycle,
      service: language === "no" ? "Selg bærbar PC" : "Sell laptop",
      priceRange: "500 - 5.000 kr",
      note: language === "no" ? "Basert på tilstand og alder" : "Based on condition and age",
    },
    {
      icon: Shield,
      service: language === "no" ? "Datasletting" : "Data erasure",
      priceRange: "299 - 599 kr",
      note: language === "no" ? "Per enhet, sertifisert" : "Per device, certified",
    },
    {
      icon: Truck,
      service: language === "no" ? "Frakt" : "Shipping",
      priceRange: "0 - 149 kr",
      note: language === "no" ? "Gratis over 500 kr" : "Free over 500 NOK",
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-600 via-green-700 to-emerald-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <Badge className="bg-white/20 text-white mb-4">
            {language === "no" ? "Priser" : "Pricing"}
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {language === "no"
              ? "Konkurransedyktige priser"
              : "Competitive Pricing"}
          </h1>
          <p className="text-xl text-green-100 max-w-2xl mx-auto">
            {language === "no"
              ? "Transparente priser for privatpersoner og bedrifter. Alle priser er veiledende og kan variere basert på spesifikke behov."
              : "Transparent pricing for individuals and businesses. All prices are indicative and may vary based on specific needs."}
          </p>
        </div>
      </section>

      {/* Customer Type Tabs */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Private Customers */}
          <div className="mb-16">
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {language === "no" ? "Privatkunde" : "Private Customer"}
                </h2>
                <p className="text-gray-600">
                  {language === "no"
                    ? "Priser inkludert 25% MVA"
                    : "Prices including 25% VAT"}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {privatePricing.map((item, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-xl text-green-600">
                      {item.category}
                    </CardTitle>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 mb-6">
                      {item.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Link href={item.href}>
                      <Button className="w-full" variant="outline">
                        {language === "no" ? "Les mer" : "Learn more"}
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Business Customers */}
          <div>
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Building2 className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {language === "no" ? "Bedriftskunde" : "Business Customer"}
                </h2>
                <p className="text-gray-600">
                  {language === "no"
                    ? "Priser ekskludert MVA"
                    : "Prices excluding VAT"}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {businessPricing.map((item, index) => (
                <Card
                  key={index}
                  className="hover:shadow-lg transition-shadow border-green-200"
                >
                  <CardHeader>
                    <Badge variant="success" className="w-fit mb-2">
                      {language === "no" ? "Bedrift" : "Business"}
                    </Badge>
                    <CardTitle className="text-xl text-green-600">
                      {item.category}
                    </CardTitle>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 mb-6">
                      {item.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Link href={item.href}>
                      <Button className="w-full bg-green-600 hover:bg-green-700">
                        {language === "no" ? "Kontakt oss" : "Contact us"}
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Price Examples */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
            {language === "no" ? "Priseksempler" : "Price Examples"}
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            {language === "no"
              ? "Her er noen eksempler på våre priser. Kontakt oss for eksakt pris for dine behov."
              : "Here are some examples of our prices. Contact us for exact pricing for your needs."}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {priceExamples.map((example, index) => (
              <Card key={index} className="text-center">
                <CardContent className="py-6">
                  <example.icon className="w-10 h-10 text-green-600 mx-auto mb-3" />
                  <p className="font-semibold text-gray-900 mb-1">
                    {example.service}
                  </p>
                  <p className="text-2xl font-bold text-green-600 mb-2">
                    {example.priceRange}
                  </p>
                  <p className="text-xs text-gray-500">{example.note}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-green-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            {language === "no"
              ? "Trenger du et skreddersydd tilbud?"
              : "Need a customized quote?"}
          </h2>
          <p className="text-green-100 text-lg mb-8 max-w-2xl mx-auto">
            {language === "no"
              ? "Kontakt oss for å diskutere dine behov og få et tilpasset tilbud."
              : "Contact us to discuss your needs and get a customized quote."}
          </p>
          <Link href="/om-oss#kontakt">
            <Button
              size="lg"
              className="bg-white text-green-700 hover:bg-green-50"
            >
              {language === "no" ? "Kontakt oss" : "Contact Us"}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
