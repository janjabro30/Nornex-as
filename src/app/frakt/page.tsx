"use client";

import React from "react";
import Link from "next/link";
import { Truck, ArrowLeft, Package, Clock, MapPin, CreditCard, Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/store";
import { Breadcrumbs } from "@/components/layout";

export default function ShippingPage() {
  const { language } = useAppStore();

  const shippingOptions = [
    {
      name: language === "no" ? "Norgespakke" : "Norway Package",
      time: language === "no" ? "1-3 virkedager" : "1-3 business days",
      price: "99 kr",
      freeAbove: "500 kr",
      description: language === "no"
        ? "Leveres til nærmeste hentested (Posten, Post i Butikk)"
        : "Delivered to nearest pickup point (Post office, In-store post)",
    },
    {
      name: language === "no" ? "Pakke i postkassen" : "Mailbox Package",
      time: language === "no" ? "2-4 virkedager" : "2-4 business days",
      price: "49 kr",
      freeAbove: "300 kr",
      description: language === "no"
        ? "For mindre pakker som får plass i postkassen"
        : "For smaller packages that fit in the mailbox",
    },
    {
      name: language === "no" ? "Hjemlevering" : "Home Delivery",
      time: language === "no" ? "1-3 virkedager" : "1-3 business days",
      price: "149 kr",
      freeAbove: "1000 kr",
      description: language === "no"
        ? "Leveres rett til døren din"
        : "Delivered straight to your door",
    },
    {
      name: language === "no" ? "Henting i butikk" : "Store Pickup",
      time: language === "no" ? "Samme dag" : "Same day",
      price: language === "no" ? "Gratis" : "Free",
      freeAbove: null,
      description: language === "no"
        ? "Hent på Brynsveien 18, 0667 Oslo (hvis på lager)"
        : "Pick up at Brynsveien 18, 0667 Oslo (if in stock)",
    },
  ];

  const businessServices = [
    {
      title: language === "no" ? "Gratis henting" : "Free Pickup",
      description: language === "no"
        ? "Vi henter utstyr for innkjøp/resirkulering gratis i Oslo-området"
        : "We pick up equipment for purchase/recycling for free in the Oslo area",
    },
    {
      title: language === "no" ? "Faktura" : "Invoice",
      description: language === "no"
        ? "Bedriftskunder med godkjent kreditt kan betale med faktura (14 dagers betalingsfrist)"
        : "Business customers with approved credit can pay by invoice (14-day payment deadline)",
    },
    {
      title: language === "no" ? "Ekspresslevering" : "Express Delivery",
      description: language === "no"
        ? "Trenger du utstyr raskt? Kontakt oss for ekspresstjenester"
        : "Need equipment fast? Contact us for express services",
    },
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
              <Truck className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold">
                {language === "no" ? "Frakt og levering" : "Shipping & Delivery"}
              </h1>
              <p className="text-gray-400">
                {language === "no"
                  ? "Rask og sikker levering i hele Norge"
                  : "Fast and secure delivery throughout Norway"}
              </p>
            </div>
          </div>
          <p className="text-gray-300 max-w-3xl">
            {language === "no"
              ? "Vi samarbeider med Posten/Bring for å sikre trygg og rask levering av alle bestillinger. Her finner du informasjon om våre fraktalternativer, leveringstider og priser."
              : "We partner with Posten/Bring to ensure safe and fast delivery of all orders. Here you will find information about our shipping options, delivery times, and prices."}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Free shipping banner */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl p-6 text-center">
              <Package className="w-10 h-10 mx-auto mb-3" />
              <h2 className="text-2xl font-bold mb-2">
                {language === "no" ? "Gratis frakt over 500 kr!" : "Free shipping over 500 NOK!"}
              </h2>
              <p className="text-blue-100">
                {language === "no"
                  ? "Handle for 500 kr eller mer og få gratis frakt på hele bestillingen"
                  : "Shop for 500 NOK or more and get free shipping on your entire order"}
              </p>
            </div>

            {/* Shipping Options */}
            <Card>
              <CardHeader>
                <CardTitle>
                  {language === "no" ? "Fraktalternativer" : "Shipping Options"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {shippingOptions.map((option, index) => (
                    <div 
                      key={index}
                      className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50 rounded-lg gap-4"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-gray-900">{option.name}</h3>
                          {option.freeAbove === null && (
                            <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded">
                              {language === "no" ? "Alltid gratis" : "Always free"}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">{option.description}</p>
                      </div>
                      <div className="flex items-center gap-6 text-sm">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-700">{option.time}</span>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">{option.price}</p>
                          {option.freeAbove && (
                            <p className="text-xs text-green-600">
                              {language === "no" ? "Gratis over" : "Free above"} {option.freeAbove}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Delivery Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-blue-600" />
                    <CardTitle className="text-lg">
                      {language === "no" ? "Leveringsadresse" : "Delivery Address"}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="text-gray-600 space-y-3">
                  <p>
                    {language === "no"
                      ? "Vi leverer til alle adresser i Norge. Kontroller at adressen din er korrekt ved bestilling."
                      : "We deliver to all addresses in Norway. Verify that your address is correct when ordering."}
                  </p>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="font-medium text-gray-900">
                      {language === "no" ? "Henting i butikk:" : "Store pickup:"}
                    </p>
                    <p>NORNEX AS</p>
                    <p>Brynsveien 18</p>
                    <p>0667 Oslo</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <CreditCard className="w-5 h-5 text-blue-600" />
                    <CardTitle className="text-lg">
                      {language === "no" ? "Betaling" : "Payment"}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="text-gray-600 space-y-3">
                  <p>
                    {language === "no"
                      ? "Vi sender varen så snart betalingen er mottatt. Vi aksepterer:"
                      : "We ship the item as soon as payment is received. We accept:"}
                  </p>
                  <ul className="space-y-2">
                    {["Visa", "Mastercard", "Vipps", "Klarna", language === "no" ? "Bankoverføring (bedrift)" : "Bank transfer (business)"].map((method, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-green-500" />
                        <span>{method}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Business Services */}
            <Card>
              <CardHeader>
                <CardTitle>
                  {language === "no" ? "For bedriftskunder" : "For Business Customers"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {businessServices.map((service, index) => (
                    <div key={index} className="p-4 bg-blue-50 rounded-lg">
                      <h3 className="font-semibold text-blue-900 mb-2">{service.title}</h3>
                      <p className="text-sm text-blue-700">{service.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Tracking */}
            <Card>
              <CardHeader>
                <CardTitle>
                  {language === "no" ? "Sporing av pakke" : "Package Tracking"}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600 space-y-4">
                <p>
                  {language === "no"
                    ? "Du mottar et sporings­nummer på e-post når pakken din er sendt. Med dette nummeret kan du følge pakken din på Posten/Bring sine nettsider."
                    : "You will receive a tracking number by email when your package is shipped. With this number you can track your package on the Posten/Bring website."}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="https://www.posten.no/sporing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-blue-600 hover:underline"
                  >
                    <Truck className="w-4 h-4" />
                    {language === "no" ? "Spor pakke hos Posten" : "Track package at Posten"}
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* Contact */}
            <div className="text-center py-8">
              <p className="text-gray-600 mb-4">
                {language === "no"
                  ? "Har du spørsmål om frakt og levering?"
                  : "Have questions about shipping and delivery?"}
              </p>
              <Link href="/kontakt">
                <Button>
                  {language === "no" ? "Kontakt oss" : "Contact us"}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
