"use client";

import React from "react";
import Link from "next/link";
import { Cookie, ArrowLeft, Settings, BarChart3, Target, Shield, Info } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/store";
import { Breadcrumbs } from "@/components/layout";

export default function CookiePolicyPage() {
  const { language } = useAppStore();

  const cookieTypes = [
    {
      icon: Shield,
      type: language === "no" ? "Nødvendige" : "Necessary",
      description: language === "no"
        ? "Disse informasjonskapslene er nødvendige for at nettsiden skal fungere og kan ikke slås av. De brukes til grunnleggende funksjoner som handlekurv, innlogging og sikkerhetsinnstillinger."
        : "These cookies are necessary for the website to function and cannot be disabled. They are used for basic functions like shopping cart, login, and security settings.",
      cookies: [
        { name: "nornex-session", purpose: language === "no" ? "Brukersesjon" : "User session", expiry: language === "no" ? "Når nettleser lukkes" : "When browser closes", type: language === "no" ? "Nødvendig" : "Necessary" },
        { name: "nornex-cookie-consent", purpose: language === "no" ? "Lagrer cookie-valg" : "Stores cookie preferences", expiry: "365 " + (language === "no" ? "dager" : "days"), type: language === "no" ? "Nødvendig" : "Necessary" },
        { name: "nornex-cart", purpose: language === "no" ? "Handlekurv-data" : "Shopping cart data", expiry: "7 " + (language === "no" ? "dager" : "days"), type: language === "no" ? "Nødvendig" : "Necessary" },
      ],
    },
    {
      icon: Settings,
      type: language === "no" ? "Funksjonelle" : "Functional",
      description: language === "no"
        ? "Disse informasjonskapslene gjør det mulig å huske dine preferanser, som språkvalg og kundeprofilinnstillinger, for å gi deg en bedre brukeropplevelse."
        : "These cookies enable the website to remember your preferences, such as language settings and customer profile settings, to provide you with a better user experience.",
      cookies: [
        { name: "nornex-language", purpose: language === "no" ? "Språkpreferanse" : "Language preference", expiry: "365 " + (language === "no" ? "dager" : "days"), type: language === "no" ? "Funksjonell" : "Functional" },
        { name: "nornex-customer-type", purpose: language === "no" ? "Privat/Bedrift valg" : "Private/Business selection", expiry: "30 " + (language === "no" ? "dager" : "days"), type: language === "no" ? "Funksjonell" : "Functional" },
      ],
    },
    {
      icon: BarChart3,
      type: language === "no" ? "Analytiske" : "Analytics",
      description: language === "no"
        ? "Vi bruker analytiske informasjonskapsler for å forstå hvordan besøkende bruker nettsiden vår. Dette hjelper oss å forbedre nettstedet og tjenestene våre."
        : "We use analytics cookies to understand how visitors use our website. This helps us improve our website and services.",
      cookies: [
        { name: "_ga", purpose: "Google Analytics - " + (language === "no" ? "Unik bruker-ID" : "Unique user ID"), expiry: "2 " + (language === "no" ? "år" : "years"), type: language === "no" ? "Analytisk" : "Analytics" },
        { name: "_ga_*", purpose: "Google Analytics - " + (language === "no" ? "Sesjondata" : "Session data"), expiry: "2 " + (language === "no" ? "år" : "years"), type: language === "no" ? "Analytisk" : "Analytics" },
        { name: "_gid", purpose: "Google Analytics - " + (language === "no" ? "Daglig unik bruker" : "Daily unique user"), expiry: "24 " + (language === "no" ? "timer" : "hours"), type: language === "no" ? "Analytisk" : "Analytics" },
      ],
    },
    {
      icon: Target,
      type: language === "no" ? "Markedsføring" : "Marketing",
      description: language === "no"
        ? "Markedsføringsinformasjonskapsler brukes til å spore besøkende på tvers av nettsider. Hensikten er å vise annonser som er relevante og engasjerende for den enkelte bruker."
        : "Marketing cookies are used to track visitors across websites. The intention is to display ads that are relevant and engaging for the individual user.",
      cookies: [
        { name: "_fbp", purpose: "Facebook Pixel - " + (language === "no" ? "Annonsevisning" : "Ad serving"), expiry: "3 " + (language === "no" ? "måneder" : "months"), type: language === "no" ? "Markedsføring" : "Marketing" },
        { name: "_gcl_au", purpose: "Google Ads - " + (language === "no" ? "Konverteringssporing" : "Conversion tracking"), expiry: "3 " + (language === "no" ? "måneder" : "months"), type: language === "no" ? "Markedsføring" : "Marketing" },
      ],
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
              <Cookie className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold">
                Cookie-policy
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
              ? "Denne cookie-policyen forklarer hvordan NORNEX AS bruker informasjonskapsler (cookies) og lignende teknologier på nettstedet vårt. Her finner du informasjon om hvilke cookies vi bruker, hvorfor vi bruker dem, og hvordan du kan administrere dine preferanser."
              : "This cookie policy explains how NORNEX AS uses cookies and similar technologies on our website. Here you will find information about which cookies we use, why we use them, and how you can manage your preferences."}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* What are cookies */}
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Info className="w-5 h-5 text-blue-600" />
                  </div>
                  <CardTitle>
                    {language === "no" ? "Hva er informasjonskapsler?" : "What are cookies?"}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-gray-600 space-y-4">
                <p>
                  {language === "no"
                    ? "Informasjonskapsler (cookies) er små tekstfiler som lagres på din enhet når du besøker et nettsted. De brukes til å huske informasjon om deg og dine preferanser, noe som gjør at nettsiden kan tilby deg en bedre og mer personlig opplevelse."
                    : "Cookies are small text files that are stored on your device when you visit a website. They are used to remember information about you and your preferences, which allows the website to offer you a better and more personalized experience."}
                </p>
                <p>
                  {language === "no"
                    ? "Cookies kan være enten 'førsteparts' (satt av nettsiden du besøker) eller 'tredjeparts' (satt av andre tjenester som brukes på nettsiden)."
                    : "Cookies can be either 'first-party' (set by the website you visit) or 'third-party' (set by other services used on the website)."}
                </p>
              </CardContent>
            </Card>

            {/* Cookie Types */}
            {cookieTypes.map((type, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <type.icon className="w-5 h-5 text-blue-600" />
                    </div>
                    <CardTitle>{type.type}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-6">{type.description}</p>
                  
                  {/* Cookie Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                      <thead>
                        <tr className="border-b bg-gray-50">
                          <th className="text-left py-3 px-4 font-semibold text-gray-900">
                            {language === "no" ? "Navn" : "Name"}
                          </th>
                          <th className="text-left py-3 px-4 font-semibold text-gray-900">
                            {language === "no" ? "Formål" : "Purpose"}
                          </th>
                          <th className="text-left py-3 px-4 font-semibold text-gray-900">
                            {language === "no" ? "Utløper" : "Expiry"}
                          </th>
                          <th className="text-left py-3 px-4 font-semibold text-gray-900">
                            {language === "no" ? "Type" : "Type"}
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {type.cookies.map((cookie, idx) => (
                          <tr key={idx} className="hover:bg-gray-50">
                            <td className="py-3 px-4 font-mono text-xs text-blue-600">{cookie.name}</td>
                            <td className="py-3 px-4 text-gray-600">{cookie.purpose}</td>
                            <td className="py-3 px-4 text-gray-600">{cookie.expiry}</td>
                            <td className="py-3 px-4 text-gray-600">{cookie.type}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* How to manage cookies */}
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Settings className="w-5 h-5 text-blue-600" />
                  </div>
                  <CardTitle>
                    {language === "no" ? "Hvordan administrere cookies" : "How to manage cookies"}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-gray-600 space-y-4">
                <p>
                  {language === "no"
                    ? "Du kan når som helst endre dine cookie-preferanser ved å klikke på 'Cookie-innstillinger' i bunnen av nettsiden vår, eller via nettleserens innstillinger."
                    : "You can change your cookie preferences at any time by clicking on 'Cookie Settings' at the bottom of our website, or through your browser settings."}
                </p>
                <p>
                  {language === "no"
                    ? "De fleste nettlesere lar deg:"
                    : "Most browsers allow you to:"}
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>{language === "no" ? "Se hvilke cookies som er lagret" : "View stored cookies"}</li>
                  <li>{language === "no" ? "Slette alle eller enkelte cookies" : "Delete all or selected cookies"}</li>
                  <li>{language === "no" ? "Blokkere alle eller visse typer cookies" : "Block all or certain types of cookies"}</li>
                  <li>{language === "no" ? "Få varsler når en cookie settes" : "Receive notifications when a cookie is set"}</li>
                </ul>
                <p className="text-sm text-gray-500">
                  {language === "no"
                    ? "Merk: Hvis du blokkerer visse cookies, kan det påvirke funksjonaliteten på nettsiden vår."
                    : "Note: If you block certain cookies, it may affect the functionality of our website."}
                </p>
              </CardContent>
            </Card>

            {/* Contact */}
            <div className="text-center py-8">
              <p className="text-gray-600 mb-4">
                {language === "no"
                  ? "Har du spørsmål om vår bruk av cookies?"
                  : "Do you have questions about our use of cookies?"}
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
