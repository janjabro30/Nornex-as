"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Wrench,
  ArrowRight,
  Check,
  Shield,
  Clock,
  Award,
  HeadphonesIcon,
  Package,
  Cpu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  ServiceForm,
  WarrantyInfo,
  SummarySection,
  type DeviceFormData,
  type ContactFormData,
} from "@/components/services";

const formSteps = [
  { label: "Enhetsinformasjon" },
  { label: "Kontakt" },
];

const warrantyItems = [
  {
    icon: Shield,
    title: "12 måneders garanti",
    description: "Full garanti på alle reparasjoner vi utfører",
  },
  {
    icon: Package,
    title: "Sikker datahåndtering",
    description: "Vi behandler dine data konfidensielt og sikkert",
  },
  {
    icon: Cpu,
    title: "Kvalitetsdeler",
    description: "Vi bruker kun godkjente reservedeler",
  },
];

const whyChooseUs = [
  {
    icon: Clock,
    title: "Rask behandlingstid",
    description: "De fleste reparasjoner fullføres innen 5-7 virkedager",
  },
  {
    icon: Award,
    title: "Sertifiserte teknikere",
    description: "Våre teknikere er sertifisert av ledende produsenter",
  },
  {
    icon: Package,
    title: "Full sporbarhet",
    description: "Spor enheten din gjennom hele reparasjonsprosessen",
  },
  {
    icon: HeadphonesIcon,
    title: "Dedikert bedriftsstøtte",
    description: "Prioritert support for våre bedriftskunder",
  },
];

// Generate a unique reference number
function generateReferenceNumber(prefix: string): string {
  return `${prefix}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
}

export default function RepairPage() {
  const [devices, setDevices] = useState<DeviceFormData[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [referenceNumber, setReferenceNumber] = useState("");

  const handleSubmit = (deviceList: DeviceFormData[], contactInfo: ContactFormData) => {
    console.log("Repair request:", { devices: deviceList, contactInfo });
    setDevices(deviceList);
    setReferenceNumber(generateReferenceNumber("REP"));
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
                Reparasjonsforespørsel mottatt!
              </h2>
              <p className="text-gray-600 mb-6">
                Vi har mottatt din forespørsel og vil kontakte deg innen 24 timer 
                med et prisestimat og informasjon om videre prosess.
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
      <section className="bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Wrench className="w-8 h-8 text-white" />
            </div>
            <Badge className="bg-white/20 text-white mb-4">
              Profesjonell reparasjon
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Reparasjonsportal
            </h1>
            <p className="text-xl text-gray-300">
              Profesjonell reparasjon med full sporbarhet
            </p>
          </div>
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
                  <Wrench className="w-6 h-6 text-gray-700" />
                  <h2 className="text-xl font-semibold">Registrer reparasjon</h2>
                </div>
                <ServiceForm
                  serviceType="repair"
                  steps={formSteps}
                  onSubmit={handleSubmit}
                />
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Summary */}
            <SummarySection
              title="Reparasjonssammendrag"
              items={[
                { label: "Totalt antall enheter", value: devices.length || 1 },
              ]}
            />

            {/* Warranty Info */}
            <WarrantyInfo
              title="Vår reparasjonsgaranti"
              items={warrantyItems}
              linkText="Les fullstendige vilkår"
              linkHref="/vilkar"
            />

            {/* Why Choose Us */}
            <Card>
              <CardContent className="pt-6">
                <h4 className="font-semibold text-gray-900 mb-4">
                  Hvorfor velge NORNEX?
                </h4>
                <div className="space-y-4">
                  {whyChooseUs.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Icon className="w-4 h-4 text-gray-700" />
                        </div>
                        <div>
                          <h5 className="font-medium text-gray-900 text-sm">
                            {item.title}
                          </h5>
                          <p className="text-xs text-gray-600">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
