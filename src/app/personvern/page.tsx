"use client";

import React from "react";
import Link from "next/link";
import { Shield, Lock, Eye, Database, FileText, Mail, ArrowLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/store";
import { Breadcrumbs } from "@/components/layout";

export default function PersonvernPage() {
  const { language } = useAppStore();

  const sections = [
    {
      icon: Database,
      title: language === "no" ? "Datainnsamling" : "Data Collection",
      content:
        language === "no"
          ? `Vi samler inn følgende typer informasjon:
          
• Kontaktinformasjon (navn, e-post, telefon, adresse)
• Firmainformasjon for bedriftskunder (org.nr., firmanavn)
• Enhetsinformasjon ved kjøp, salg eller reparasjon
• Betalingsinformasjon (behandles sikkert via våre betalingspartnere)
• Tekniske data (IP-adresse, nettlesertype, enhetstype)
• Informasjonskapsler (cookies) for å forbedre brukeropplevelsen`
          : `We collect the following types of information:
          
• Contact information (name, email, phone, address)
• Company information for business customers (org. number, company name)
• Device information for purchases, sales or repairs
• Payment information (securely processed via our payment partners)
• Technical data (IP address, browser type, device type)
• Cookies to improve user experience`,
    },
    {
      icon: Eye,
      title: language === "no" ? "Formål med behandling" : "Purpose of Processing",
      content:
        language === "no"
          ? `Vi bruker dine data til følgende formål:

• Gjennomføre kjøp, salg og reparasjoner
• Kommunisere med deg om ordrer og tjenester
• Sende fakturaer og kvitteringer
• Forbedre våre tjenester og nettsted
• Overholde juridiske forpliktelser
• Forebygge svindel og sikre våre tjenester
• Med ditt samtykke: sende nyhetsbrev og markedsføring`
          : `We use your data for the following purposes:

• Complete purchases, sales and repairs
• Communicate with you about orders and services
• Send invoices and receipts
• Improve our services and website
• Comply with legal obligations
• Prevent fraud and secure our services
• With your consent: send newsletters and marketing`,
    },
    {
      icon: Lock,
      title: language === "no" ? "Sikkerhet" : "Security",
      content:
        language === "no"
          ? `Vi tar sikkerhet på alvor og implementerer følgende tiltak:

• SSL/TLS-kryptering for all dataoverføring
• Sikker lagring av data med kryptering
• Begrenset tilgang basert på behov
• Regelmessige sikkerhetsgjennomganger
• Sikker datasletting etter behov
• Opplæring av ansatte i personvern og sikkerhet
• Overvåkning for uautorisert tilgang`
          : `We take security seriously and implement the following measures:

• SSL/TLS encryption for all data transfer
• Secure data storage with encryption
• Limited access based on need
• Regular security reviews
• Secure data deletion when needed
• Employee training in privacy and security
• Monitoring for unauthorized access`,
    },
    {
      icon: FileText,
      title: language === "no" ? "Dine rettigheter" : "Your Rights",
      content:
        language === "no"
          ? `Under GDPR har du følgende rettigheter:

• Rett til innsyn: Se hvilke data vi har om deg
• Rett til retting: Korrigere feilaktige opplysninger
• Rett til sletting: Be om at vi sletter dine data
• Rett til dataportabilitet: Få dine data i et lesbart format
• Rett til å protestere: Motsette deg visse typer behandling
• Rett til å trekke samtykke: Når som helst trekke tilbake samtykke

For å utøve dine rettigheter, kontakt oss på privacy@nornex.no`
          : `Under GDPR you have the following rights:

• Right of access: See what data we have about you
• Right to rectification: Correct inaccurate information
• Right to erasure: Request deletion of your data
• Right to data portability: Get your data in a readable format
• Right to object: Object to certain types of processing
• Right to withdraw consent: Withdraw consent at any time

To exercise your rights, contact us at privacy@nornex.no`,
    },
    {
      icon: Shield,
      title: language === "no" ? "Informasjonskapsler (Cookies)" : "Cookies",
      content:
        language === "no"
          ? `Vi bruker følgende typer informasjonskapsler:

Nødvendige cookies: Kreves for at nettsiden skal fungere (f.eks. handlekurv, innlogging)

Analytiske cookies: Hjelper oss å forstå hvordan besøkende bruker nettsiden (Google Analytics)

Markedsføringscookies: Brukes til å vise relevante annonser (kun med ditt samtykke)

Du kan administrere dine cookie-preferanser når som helst via innstillinger i nettleseren din eller vår cookie-banner.`
          : `We use the following types of cookies:

Necessary cookies: Required for the website to function (e.g., shopping cart, login)

Analytics cookies: Help us understand how visitors use the website (Google Analytics)

Marketing cookies: Used to show relevant ads (only with your consent)

You can manage your cookie preferences at any time via your browser settings or our cookie banner.`,
    },
    {
      icon: Mail,
      title: language === "no" ? "Kontakt" : "Contact",
      content:
        language === "no"
          ? `For spørsmål om personvern, kontakt oss:

Nornex AS
Brynsveien 18
0667 Oslo, Norway

E-post: privacy@nornex.no
Telefon: +47 123 45 678

E-post til personvernombud: dpo@nornex.no

Du kan også klage til Datatilsynet hvis du mener vi ikke behandler dine data i samsvar med regelverket.`
          : `For privacy questions, contact us:

Nornex AS
Brynsveien 18
0667 Oslo, Norway

Email: privacy@nornex.no
Phone: +47 123 45 678

Email for Data Protection Officer: dpo@nornex.no

You can also complain to the Norwegian Data Protection Authority (Datatilsynet) if you believe we are not processing your data in accordance with regulations.`,
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
      <section className="bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800 text-white py-16">
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
                {language === "no" ? "Personvernerklæring" : "Privacy Policy"}
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
              ? "Hos Nornex AS tar vi personvern på alvor. Denne personvernerklæringen forklarer hvordan vi samler inn, bruker og beskytter dine personopplysninger i samsvar med GDPR og norsk personvernlovgivning."
              : "At Nornex AS, we take privacy seriously. This privacy policy explains how we collect, use, and protect your personal data in accordance with GDPR and Norwegian privacy legislation."}
          </p>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            {sections.map((section, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <section.icon className="w-5 h-5 text-blue-600" />
                    </div>
                    <CardTitle>{section.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-gray-600 whitespace-pre-line">
                    {section.content}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Data Retention */}
          <Card className="max-w-4xl mx-auto mt-8">
            <CardHeader>
              <CardTitle>
                {language === "no" ? "Oppbevaringstid" : "Data Retention"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 font-semibold">
                        {language === "no" ? "Datatype" : "Data Type"}
                      </th>
                      <th className="text-left py-2 font-semibold">
                        {language === "no" ? "Oppbevaringstid" : "Retention Period"}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    <tr>
                      <td className="py-2 text-gray-600">
                        {language === "no" ? "Ordreinformasjon" : "Order information"}
                      </td>
                      <td className="py-2 text-gray-600">
                        {language === "no" ? "5 år (regnskapskrav)" : "5 years (accounting requirements)"}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 text-gray-600">
                        {language === "no" ? "Kundekontodata" : "Customer account data"}
                      </td>
                      <td className="py-2 text-gray-600">
                        {language === "no" ? "Til konto slettes" : "Until account deleted"}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 text-gray-600">
                        {language === "no" ? "Reparasjonshistorikk" : "Repair history"}
                      </td>
                      <td className="py-2 text-gray-600">
                        {language === "no" ? "3 år" : "3 years"}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 text-gray-600">
                        {language === "no" ? "Markedsføringssamtykke" : "Marketing consent"}
                      </td>
                      <td className="py-2 text-gray-600">
                        {language === "no" ? "Til samtykke trekkes" : "Until consent withdrawn"}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 text-gray-600">
                        {language === "no" ? "Analytiske data" : "Analytics data"}
                      </td>
                      <td className="py-2 text-gray-600">
                        {language === "no" ? "26 måneder" : "26 months"}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Third Parties */}
          <Card className="max-w-4xl mx-auto mt-8">
            <CardHeader>
              <CardTitle>
                {language === "no" ? "Tredjeparter" : "Third Parties"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                {language === "no"
                  ? "Vi deler data med følgende tredjeparter for å levere våre tjenester:"
                  : "We share data with the following third parties to deliver our services:"}
              </p>
              <ul className="space-y-2 text-gray-600">
                <li>
                  <strong>{language === "no" ? "Betalingspartnere:" : "Payment partners:"}</strong>{" "}
                  Stripe, Vipps, Klarna
                </li>
                <li>
                  <strong>{language === "no" ? "Frakt:" : "Shipping:"}</strong> Posten/Bring
                </li>
                <li>
                  <strong>{language === "no" ? "Analyse:" : "Analytics:"}</strong> Google Analytics
                </li>
                <li>
                  <strong>{language === "no" ? "E-post:" : "Email:"}</strong>{" "}
                  {language === "no" ? "Sikker e-posttjeneste" : "Secure email service"}
                </li>
              </ul>
              <p className="text-gray-600 mt-4">
                {language === "no"
                  ? "Alle tredjeparter er forpliktet til å behandle data i samsvar med GDPR."
                  : "All third parties are obligated to process data in accordance with GDPR."}
              </p>
            </CardContent>
          </Card>

          {/* Contact for Questions */}
          <div className="max-w-4xl mx-auto mt-12 text-center">
            <p className="text-gray-600 mb-4">
              {language === "no"
                ? "Har du spørsmål om personvern?"
                : "Have questions about privacy?"}
            </p>
            <Link href="/kontakt">
              <Button>
                {language === "no" ? "Kontakt oss" : "Contact us"}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
