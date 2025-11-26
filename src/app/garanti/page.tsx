"use client";

import React from "react";
import Link from "next/link";
import { Shield, ArrowLeft, Check, X, AlertTriangle, Clock, Wrench, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/store";
import { Breadcrumbs } from "@/components/layout";

export default function WarrantyPage() {
  const { language } = useAppStore();

  const warrantyCovers = [
    language === "no" ? "Fabrikasjonsfeil og materialfeil" : "Manufacturing and material defects",
    language === "no" ? "Defekte komponenter" : "Defective components",
    language === "no" ? "Funksjonsfeil som ikke skyldes bruker" : "Functional errors not caused by user",
    language === "no" ? "Batteri med under 80% kapasitet (6 mnd)" : "Battery with less than 80% capacity (6 months)",
    language === "no" ? "Defekte piksler over terskelverdi" : "Dead pixels above threshold",
  ];

  const warrantyNotCovers = [
    language === "no" ? "Skader forårsaket av bruker (fall, støt)" : "Damage caused by user (drops, impacts)",
    language === "no" ? "Væskeskader" : "Liquid damage",
    language === "no" ? "Normal slitasje (riper, merker)" : "Normal wear and tear (scratches, marks)",
    language === "no" ? "Uautoriserte reparasjoner eller modifikasjoner" : "Unauthorized repairs or modifications",
    language === "no" ? "Programvarefeil (virus, korrupt OS)" : "Software issues (viruses, corrupt OS)",
    language === "no" ? "Skader fra strømstøt" : "Power surge damage",
    language === "no" ? "Forbruksvarer (kabler, adaptere)" : "Consumables (cables, adapters)",
  ];

  const warrantyPeriods = [
    { 
      product: language === "no" ? "Nye produkter" : "New products", 
      period: language === "no" ? "24 måneder" : "24 months",
      icon: Shield,
    },
    { 
      product: language === "no" ? "Refurbished produkter" : "Refurbished products", 
      period: language === "no" ? "12 måneder" : "12 months",
      icon: Shield,
    },
    { 
      product: language === "no" ? "Reparasjoner (arbeid + deler)" : "Repairs (labor + parts)", 
      period: language === "no" ? "3 måneder" : "3 months",
      icon: Wrench,
    },
    { 
      product: language === "no" ? "Batteri (nye produkter)" : "Battery (new products)", 
      period: language === "no" ? "6 måneder" : "6 months",
      icon: Clock,
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
              <Shield className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold">
                {language === "no" ? "Garantibetingelser" : "Warranty Terms"}
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
              ? "Alle produkter kjøpt fra NORNEX AS leveres med garanti. Her finner du informasjon om hva garantien dekker, garantiperioder og hvordan du kan gjøre krav på garantien."
              : "All products purchased from NORNEX AS come with a warranty. Here you will find information about what the warranty covers, warranty periods, and how to make a warranty claim."}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Warranty Periods */}
            <Card>
              <CardHeader>
                <CardTitle>
                  {language === "no" ? "Garantiperioder" : "Warranty Periods"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {warrantyPeriods.map((item, index) => (
                    <div 
                      key={index} 
                      className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg"
                    >
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{item.product}</p>
                        <p className="text-blue-600 font-bold">{item.period}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-500 mt-4">
                  {language === "no"
                    ? "* Forbrukere har i tillegg 5 års reklamasjonsrett i henhold til forbrukerkjøpsloven."
                    : "* Consumers also have a 5-year right of complaint according to the Consumer Purchase Act."}
                </p>
              </CardContent>
            </Card>

            {/* What warranty covers */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <Check className="w-5 h-5 text-green-600" />
                    </div>
                    <CardTitle className="text-green-700">
                      {language === "no" ? "Garantien dekker" : "Warranty covers"}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {warrantyCovers.map((item, index) => (
                      <li key={index} className="flex items-start gap-2 text-gray-600">
                        <Check className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                      <X className="w-5 h-5 text-red-600" />
                    </div>
                    <CardTitle className="text-red-700">
                      {language === "no" ? "Garantien dekker IKKE" : "Warranty does NOT cover"}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {warrantyNotCovers.map((item, index) => (
                      <li key={index} className="flex items-start gap-2 text-gray-600">
                        <X className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* How to claim warranty */}
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-blue-600" />
                  </div>
                  <CardTitle>
                    {language === "no" ? "Slik gjør du krav på garantien" : "How to claim warranty"}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ol className="space-y-4">
                  <li className="flex gap-4">
                    <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">1</span>
                    <div>
                      <p className="font-medium text-gray-900">
                        {language === "no" ? "Kontakt oss" : "Contact us"}
                      </p>
                      <p className="text-gray-600 text-sm">
                        {language === "no"
                          ? "Send e-post til garanti@nornex.no eller ring +47 123 45 678 med ordrenummer og beskrivelse av feilen."
                          : "Send email to garanti@nornex.no or call +47 123 45 678 with order number and description of the issue."}
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">2</span>
                    <div>
                      <p className="font-medium text-gray-900">
                        {language === "no" ? "Send inn eller lever produktet" : "Send in or deliver the product"}
                      </p>
                      <p className="text-gray-600 text-sm">
                        {language === "no"
                          ? "Vi sender deg returetikett eller du kan levere produktet til vår adresse: Brynsveien 18, 0667 Oslo."
                          : "We will send you a return label or you can deliver the product to our address: Brynsveien 18, 0667 Oslo."}
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">3</span>
                    <div>
                      <p className="font-medium text-gray-900">
                        {language === "no" ? "Vi vurderer saken" : "We assess the case"}
                      </p>
                      <p className="text-gray-600 text-sm">
                        {language === "no"
                          ? "Våre teknikere undersøker produktet og gir deg beskjed innen 3-5 virkedager."
                          : "Our technicians examine the product and notify you within 3-5 business days."}
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">4</span>
                    <div>
                      <p className="font-medium text-gray-900">
                        {language === "no" ? "Løsning" : "Resolution"}
                      </p>
                      <p className="text-gray-600 text-sm">
                        {language === "no"
                          ? "Vi reparerer, bytter eller refunderer produktet basert på vår vurdering."
                          : "We repair, replace, or refund the product based on our assessment."}
                      </p>
                    </div>
                  </li>
                </ol>
              </CardContent>
            </Card>

            {/* Important info */}
            <Card className="border-yellow-200 bg-yellow-50">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-600" />
                  <CardTitle className="text-yellow-800">
                    {language === "no" ? "Viktig informasjon" : "Important Information"}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-yellow-800 space-y-3">
                <p>
                  {language === "no"
                    ? "• Ta alltid backup av data før du sender inn utstyr. Vi er ikke ansvarlige for tap av data."
                    : "• Always backup your data before sending in equipment. We are not responsible for data loss."}
                </p>
                <p>
                  {language === "no"
                    ? "• Oppbevar kvittering eller ordrebekreftelse som bevis på kjøp."
                    : "• Keep your receipt or order confirmation as proof of purchase."}
                </p>
                <p>
                  {language === "no"
                    ? "• Garantien gjelder kun for den opprinnelige kjøperen og kan ikke overføres."
                    : "• The warranty applies only to the original purchaser and is non-transferable."}
                </p>
              </CardContent>
            </Card>

            {/* Contact */}
            <div className="text-center py-8">
              <p className="text-gray-600 mb-4">
                {language === "no"
                  ? "Har du spørsmål om garantien?"
                  : "Have questions about the warranty?"}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/kontakt">
                  <Button>
                    {language === "no" ? "Kontakt oss" : "Contact us"}
                  </Button>
                </Link>
                <Link href="/reparasjon">
                  <Button variant="outline">
                    {language === "no" ? "Bestill reparasjon" : "Book repair"}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
