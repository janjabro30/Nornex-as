"use client";

import React from "react";
import Link from "next/link";
import { RotateCcw, ArrowLeft, Package, Clock, AlertTriangle, Check, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/store";
import { Breadcrumbs } from "@/components/layout";

export default function ReturnsPage() {
  const { language } = useAppStore();

  const returnSteps = [
    {
      step: 1,
      title: language === "no" ? "Meld fra om retur" : "Report return",
      description: language === "no"
        ? "Kontakt oss innen 14 dager fra mottak via e-post eller telefon. Oppgi ordrenummer og årsak til retur."
        : "Contact us within 14 days of receipt via email or phone. Provide order number and reason for return.",
    },
    {
      step: 2,
      title: language === "no" ? "Motta returetikett" : "Receive return label",
      description: language === "no"
        ? "Vi sender deg en returetikett på e-post. Skriv ut etiketten og fest den på pakken."
        : "We will send you a return label by email. Print the label and attach it to the package.",
    },
    {
      step: 3,
      title: language === "no" ? "Send inn produktet" : "Send the product",
      description: language === "no"
        ? "Pakk produktet forsvarlig med original emballasje og tilbehør. Lever pakken til nærmeste postkontor."
        : "Pack the product carefully with original packaging and accessories. Deliver the package to the nearest post office.",
    },
    {
      step: 4,
      title: language === "no" ? "Refusjon" : "Refund",
      description: language === "no"
        ? "Når vi har mottatt og godkjent returen, refunderes beløpet innen 14 dager til din opprinnelige betalingsmetode."
        : "Once we have received and approved the return, the amount will be refunded within 14 days to your original payment method.",
    },
  ];

  const returnConditions = [
    {
      icon: Clock,
      title: language === "no" ? "14 dagers angrerett" : "14-day right of withdrawal",
      description: language === "no"
        ? "Privatpersoner har 14 dagers angrerett fra produktet er mottatt (jf. Angrerettloven)"
        : "Private individuals have 14 days right of withdrawal from when the product is received",
    },
    {
      icon: Package,
      title: language === "no" ? "Original stand" : "Original condition",
      description: language === "no"
        ? "Produktet må være i samme stand som ved mottak, med originale kabler og tilbehør"
        : "The product must be in the same condition as when received, with original cables and accessories",
    },
    {
      icon: FileText,
      title: language === "no" ? "Dokumentasjon" : "Documentation",
      description: language === "no"
        ? "Ordrebekreftelse eller kvittering må fremvises ved retur"
        : "Order confirmation or receipt must be presented for return",
    },
  ];

  const notReturnable = [
    language === "no" ? "Programvare der forseglingen er brutt" : "Software where the seal is broken",
    language === "no" ? "Spesialtilpassede produkter" : "Customized products",
    language === "no" ? "Hygieneprodukter der forseglingen er brutt" : "Hygiene products where the seal is broken",
    language === "no" ? "Produkter med tydelige bruksspor eller skader" : "Products with visible signs of use or damage",
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
              <RotateCcw className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold">
                {language === "no" ? "Retur og reklamasjon" : "Returns & Claims"}
              </h1>
              <p className="text-gray-400">
                {language === "no"
                  ? "Enkel returprosess med full beskyttelse"
                  : "Easy return process with full protection"}
              </p>
            </div>
          </div>
          <p className="text-gray-300 max-w-3xl">
            {language === "no"
              ? "Vi ønsker at du skal være fornøyd med kjøpet ditt. Hvis du ikke er det, har du rett til å returnere produktet i henhold til angrerettloven. Her finner du informasjon om hvordan du går frem."
              : "We want you to be satisfied with your purchase. If you are not, you have the right to return the product according to the Right of Withdrawal Act. Here you will find information on how to proceed."}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Return Conditions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {returnConditions.map((condition, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                      <condition.icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{condition.title}</h3>
                    <p className="text-sm text-gray-600">{condition.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Return Steps */}
            <Card>
              <CardHeader>
                <CardTitle>
                  {language === "no" ? "Slik returnerer du" : "How to return"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {returnSteps.map((step, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                        {step.step}
                      </div>
                      <div className="flex-1 pb-6 border-b border-gray-100 last:border-0 last:pb-0">
                        <h3 className="font-semibold text-gray-900 mb-1">{step.title}</h3>
                        <p className="text-gray-600 text-sm">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Exceptions */}
            <Card className="border-yellow-200 bg-yellow-50">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-600" />
                  <CardTitle className="text-yellow-800">
                    {language === "no" ? "Unntak fra angreretten" : "Exceptions from right of withdrawal"}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-yellow-800 mb-4">
                  {language === "no"
                    ? "Følgende produkter kan ikke returneres under angreretten:"
                    : "The following products cannot be returned under the right of withdrawal:"}
                </p>
                <ul className="space-y-2">
                  {notReturnable.map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-yellow-800">
                      <span className="w-1.5 h-1.5 bg-yellow-600 rounded-full mt-2 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Business Customers */}
            <Card>
              <CardHeader>
                <CardTitle>
                  {language === "no" ? "For bedriftskunder" : "For Business Customers"}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600 space-y-4">
                <p>
                  {language === "no"
                    ? "Angrerettloven gjelder ikke for bedriftskunder. Vi tilbyr likevel følgende:"
                    : "The Right of Withdrawal Act does not apply to business customers. However, we offer:"}
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                    <span>{language === "no" ? "7 dagers returrett på uåpnede produkter" : "7 days return on unopened products"}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                    <span>{language === "no" ? "Full reklamasjonsrett ved feil og mangler" : "Full right of complaint for defects"}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                    <span>{language === "no" ? "Bytteordning for defekte produkter" : "Exchange arrangement for defective products"}</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Complaints / Reklamasjon */}
            <Card>
              <CardHeader>
                <CardTitle>
                  {language === "no" ? "Reklamasjon" : "Complaints"}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600 space-y-4">
                <p>
                  {language === "no"
                    ? "Hvis produktet har feil eller mangler som var til stede ved kjøpet, har du rett til å reklamere. Forbrukere har 2 års reklamasjonsfrist i henhold til forbrukerkjøpsloven."
                    : "If the product has defects that were present at the time of purchase, you have the right to make a complaint. Consumers have a 2-year complaint period according to the Consumer Purchase Act."}
                </p>
                <p>
                  {language === "no"
                    ? "Ved reklamasjon kan vi tilby:"
                    : "For complaints, we can offer:"}
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                    <span>{language === "no" ? "Reparasjon av produktet" : "Repair of the product"}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                    <span>{language === "no" ? "Bytte til tilsvarende produkt" : "Exchange for equivalent product"}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                    <span>{language === "no" ? "Refusjon av kjøpesummen" : "Refund of the purchase price"}</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Contact */}
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {language === "no" ? "Trenger du hjelp med retur?" : "Need help with a return?"}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {language === "no"
                      ? "Ta kontakt med oss, så hjelper vi deg med prosessen."
                      : "Contact us and we will help you with the process."}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a href="mailto:retur@nornex.no">
                      <Button>
                        retur@nornex.no
                      </Button>
                    </a>
                    <a href="tel:+4712345678">
                      <Button variant="outline">
                        +47 123 45 678
                      </Button>
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
