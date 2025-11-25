"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  DollarSign,
  Truck,
  Shield,
  Recycle,
  ArrowRight,
  Check,
  Send,
  Package,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  ServiceForm,
  SidebarBenefits,
  SummarySection,
  ServiceSteps,
  type DeviceFormData,
  type ContactFormData,
} from "@/components/services";

const sellSteps = [
  {
    number: 1,
    title: "Registrer enheter",
    description: "Fyll inn informasjon om enhetene du vil selge",
    icon: FileText,
  },
  {
    number: 2,
    title: "Få verdivurdering",
    description: "Vi sender deg et tilbud innen 24 timer",
    icon: DollarSign,
  },
  {
    number: 3,
    title: "Henting/levering",
    description: "Vi henter gratis eller du leverer til oss",
    icon: Truck,
  },
  {
    number: 4,
    title: "Motta betaling",
    description: "Rask utbetaling etter inspeksjon",
    icon: Package,
  },
];

const formSteps = [
  { label: "Enheter" },
  { label: "Kontakt" },
];

const sidebarBenefits = [
  {
    icon: DollarSign,
    title: "Konkurransedyktige priser",
    description: "Markedsledende priser for brukt elektronikk",
  },
  {
    icon: Truck,
    title: "Gratis henting",
    description: "Vi henter hos deg – ingen fraktkostnader",
  },
  {
    icon: Shield,
    title: "Sikker datasletting",
    description: "DOD/NIST-sertifisert profesjonell datasletting",
  },
  {
    icon: Recycle,
    title: "Miljøsertifisert",
    description: "WEEE-sertifisert resirkulering",
  },
];

// Generate a unique reference number
function generateReferenceNumber(prefix: string): string {
  return `${prefix}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
}

export default function SellDevicesPage() {
  const [deviceCount, setDeviceCount] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [referenceNumber, setReferenceNumber] = useState("");

  const handleSubmit = (devices: DeviceFormData[], contactInfo: ContactFormData) => {
    console.log("Sell request:", { devices, contactInfo });
    setDeviceCount(devices.length);
    setReferenceNumber(generateReferenceNumber("SELL"));
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
                Vi har mottatt din forespørsel for {deviceCount} enhet{deviceCount > 1 ? "er" : ""}. 
                Du vil høre fra oss innen 24 timer med et verdivurdering.
              </p>
              <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
                <h4 className="font-medium text-gray-900 mb-2">
                  Referansenummer
                </h4>
                <p className="text-2xl font-mono text-green-600">
                  {referenceNumber}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Bruk dette nummeret ved henvendelser
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/">
                  <Button>
                    Tilbake til forsiden
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Button variant="outline" onClick={() => setIsSubmitted(false)}>
                  Send ny forespørsel
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
      <section className="bg-gradient-to-br from-green-600 via-green-700 to-emerald-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="bg-white/20 text-white mb-4">
              Salg av enheter
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Selg dine enheter
            </h1>
            <p className="text-xl text-green-100">
              Få betalt for din brukte elektronikk – enkelt, sikkert og miljøvennlig
            </p>
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <ServiceSteps
            title="Slik fungerer det"
            steps={sellSteps}
            currentStep={1}
          />
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-6">
                  <Send className="w-6 h-6 text-green-700" />
                  <h2 className="text-xl font-semibold">Registrer enheter for salg</h2>
                </div>
                <ServiceForm
                  serviceType="sell"
                  steps={formSteps}
                  onSubmit={handleSubmit}
                />
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <SidebarBenefits
              title="Hvorfor selge til NORNEX?"
              benefits={sidebarBenefits}
            />

            <SummarySection
              title="Oppsummering"
              items={[
                { label: "Antall enheter", value: 1 },
              ]}
            />

            <Card>
              <CardContent className="pt-6">
                <h4 className="font-semibold text-gray-900 mb-4">
                  Trenger du hjelp?
                </h4>
                <p className="text-sm text-gray-600 mb-4">
                  Kontakt oss på telefon eller e-post hvis du har spørsmål om salgsprosessen.
                </p>
                <div className="space-y-2 text-sm">
                  <p className="text-gray-700">
                    <span className="font-medium">Telefon:</span> +47 22 XX XX XX
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">E-post:</span> salg@nornex.no
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
