"use client";

import React from "react";
import { Recycle, Leaf, Shield, Banknote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BuybackForm } from "@/components/forms";
import { useAppStore } from "@/store";
import { getTranslation } from "@/lib/translations";

export default function SellToUsPage() {
  const { language } = useAppStore();
  const t = getTranslation(language);

  const benefits = [
    {
      icon: Banknote,
      title: language === "no" ? "Konkurransedyktige priser" : "Competitive Prices",
      description:
        language === "no"
          ? "Vi tilbyr de beste prisene for ditt brukte utstyr"
          : "We offer the best prices for your used equipment",
    },
    {
      icon: Recycle,
      title: language === "no" ? "Miljøvennlig" : "Eco-Friendly",
      description:
        language === "no"
          ? "Bidra til sirkulær økonomi og reduser e-avfall"
          : "Contribute to circular economy and reduce e-waste",
    },
    {
      icon: Shield,
      title: language === "no" ? "Sikker datasletting" : "Secure Data Erasure",
      description:
        language === "no"
          ? "Alle data slettes sikkert iht. bransjestandarder"
          : "All data is securely erased according to industry standards",
    },
    {
      icon: Leaf,
      title: language === "no" ? "Gratis henting" : "Free Pickup",
      description:
        language === "no"
          ? "Vi henter utstyret gratis for større mengder"
          : "We pick up equipment for free for larger quantities",
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-600 via-green-700 to-emerald-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <Badge className="bg-white/20 text-white mb-4">
            {language === "no" ? "Innkjøpsprogram" : "Buy-Back Program"}
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {t.sellToUs.title}
          </h1>
          <p className="text-xl text-green-100 max-w-2xl mx-auto">
            {t.sellToUs.subtitle}
          </p>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-12 -mt-8 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center">
                <CardContent className="py-6">
                  <benefit.icon className="w-10 h-10 text-green-600 mx-auto mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-gray-500">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Buyback Form */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <BuybackForm />
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            {language === "no" ? "Slik fungerer det" : "How It Works"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">1</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                {language === "no" ? "Send forespørsel" : "Submit Request"}
              </h3>
              <p className="text-gray-600 text-sm">
                {language === "no"
                  ? "Fyll ut skjemaet med informasjon om enheten din"
                  : "Fill out the form with information about your device"}
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">2</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                {language === "no" ? "Motta tilbud" : "Receive Quote"}
              </h3>
              <p className="text-gray-600 text-sm">
                {language === "no"
                  ? "Vi sender deg et tilbud innen 24 timer"
                  : "We send you a quote within 24 hours"}
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">3</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                {language === "no" ? "Få betalt" : "Get Paid"}
              </h3>
              <p className="text-gray-600 text-sm">
                {language === "no"
                  ? "Send eller lever enheten og motta betaling"
                  : "Ship or deliver the device and receive payment"}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
