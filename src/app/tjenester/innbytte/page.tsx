"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  RefreshCw,
  Sparkles,
  DollarSign,
  CheckCircle,
  ArrowRight,
  Check,
  Leaf,
  Shield,
  Clock,
  Percent,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  ServiceSteps,
  BenefitsSection,
  ServiceForm,
  type DeviceFormData,
  type ContactFormData,
} from "@/components/services";

const tradeInSteps = [
  {
    number: 1,
    title: "Verdsett din enhet",
    description: "Få et umiddelbart estimat på innbytteverdien",
    icon: RefreshCw,
  },
  {
    number: 2,
    title: "Velg ny enhet",
    description: "Bla gjennom vårt utvalg av nye og refurbished produkter",
    icon: Sparkles,
  },
  {
    number: 3,
    title: "Få rabatt",
    description: "Din innbytteverdi trekkes fra på ny enhet",
    icon: DollarSign,
  },
  {
    number: 4,
    title: "Bytteprosess",
    description: "Send inn gammel enhet når du mottar den nye",
    icon: CheckCircle,
  },
];

const benefits = [
  { title: "Opptil 40 % rabatt på ny enhet" },
  { title: "Enkel og rask prosess" },
  { title: "Garanti på nye enheter" },
  { title: "Miljøvennlig – resirkuler riktig" },
  { title: "Sikker datasletting inkludert" },
  { title: "Spesialpriser på refurbished" },
];

const formSteps = [
  { label: "Enheter" },
  { label: "Ny enhet" },
  { label: "Kontakt" },
];

export default function TradeinPage() {
  const [showForm, setShowForm] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (devices: DeviceFormData[], contactInfo: ContactFormData) => {
    console.log("Trade-in request:", { devices, contactInfo });
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <Card className="max-w-2xl mx-auto">
            <CardContent className="py-12 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Forespørsel mottatt!
              </h2>
              <p className="text-gray-600 mb-6">
                Vi har mottatt din innbytteforespørsel. Du vil høre fra oss innen 24 timer
                med et tilbud på din gamle enhet og forslag til nye produkter.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/nettbutikk">
                  <Button>
                    Se våre produkter
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Button variant="outline" onClick={() => {
                  setIsSubmitted(false);
                  setShowForm(false);
                }}>
                  Start på nytt
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="bg-white/20 text-white mb-4">
              Innbytteprogram
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Innbytteprogram
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Bytt inn din gamle enhet og få rabatt på ny eller refurbished elektronikk
            </p>
            {!showForm && (
              <Button
                size="lg"
                className="bg-white text-blue-700 hover:bg-blue-50"
                onClick={() => setShowForm(true)}
              >
                Start innbytte
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {showForm ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form Section */}
            <div className="lg:col-span-2">
              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-xl font-semibold mb-6">Din innbytteenhet</h2>
                  <ServiceForm
                    serviceType="trade-in"
                    steps={formSteps}
                    onSubmit={handleSubmit}
                  />
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <BenefitsSection
                title="Fordeler med innbytte"
                benefits={benefits}
                variant="checkmark"
                backgroundColor="light-blue"
              />

              <Card>
                <CardContent className="pt-6">
                  <h4 className="font-semibold text-gray-900 mb-4">
                    Hvorfor velge NORNEX?
                  </h4>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Percent className="w-4 h-4 text-green-600" />
                      </div>
                      <div>
                        <h5 className="font-medium text-gray-900 text-sm">Beste priser</h5>
                        <p className="text-xs text-gray-600">Konkurransedyktige innbytteverdier</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Clock className="w-4 h-4 text-green-600" />
                      </div>
                      <div>
                        <h5 className="font-medium text-gray-900 text-sm">Rask behandling</h5>
                        <p className="text-xs text-gray-600">Svar innen 24 timer</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Shield className="w-4 h-4 text-green-600" />
                      </div>
                      <div>
                        <h5 className="font-medium text-gray-900 text-sm">Sikker datasletting</h5>
                        <p className="text-xs text-gray-600">Sertifisert prosess</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Leaf className="w-4 h-4 text-green-600" />
                      </div>
                      <div>
                        <h5 className="font-medium text-gray-900 text-sm">Miljøvennlig</h5>
                        <p className="text-xs text-gray-600">Bidra til sirkulær økonomi</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          <>
            {/* Process Steps */}
            <section className="py-8">
              <ServiceSteps
                title="Slik fungerer det"
                steps={tradeInSteps}
                currentStep={1}
              />
            </section>

            {/* Benefits Section */}
            <section className="py-12">
              <div className="max-w-3xl mx-auto">
                <BenefitsSection
                  title="Fordeler med innbytte"
                  benefits={benefits}
                  variant="checkmark"
                  backgroundColor="light-blue"
                  columns={2}
                />
              </div>
            </section>

            {/* CTA Section */}
            <section className="py-12">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Klar til å bytte inn?
                </h2>
                <p className="text-gray-600 mb-8 max-w-xl mx-auto">
                  Start prosessen nå og få et estimat på innbytteverdien din. 
                  Det er helt uforpliktende og tar bare noen minutter.
                </p>
                <Button size="lg" onClick={() => setShowForm(true)}>
                  Start innbytte
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
}
