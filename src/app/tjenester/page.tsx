"use client";

import React from "react";
import Link from "next/link";
import {
  Monitor,
  Smartphone,
  Laptop,
  Server,
  Shield,
  Recycle,
  Wrench,
  Package,
  ArrowRight,
  CheckCircle,
  Building2,
  Users,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAppStore } from "@/store";

export default function ServicesPage() {
  const { language } = useAppStore();

  const services = [
    {
      icon: Laptop,
      title: language === "no" ? "IT-utstyr salg" : "IT Equipment Sales",
      description:
        language === "no"
          ? "Kvalitets refurbished IT-utstyr med garanti. Laptoper, stasjonære, skjermer og mer."
          : "Quality refurbished IT equipment with warranty. Laptops, desktops, monitors and more.",
      href: "/nettbutikk",
      badge: language === "no" ? "Nettbutikk" : "Shop",
    },
    {
      icon: Recycle,
      title: language === "no" ? "Enhetsinnkjøp" : "Device Buyback",
      description:
        language === "no"
          ? "Selg ditt brukte IT-utstyr til oss. Vi tilbyr konkurransedyktige priser og gratis henting."
          : "Sell your used IT equipment to us. We offer competitive prices and free pickup.",
      href: "/selg-til-oss",
      badge: language === "no" ? "Selg til oss" : "Sell to Us",
    },
    {
      icon: Wrench,
      title: language === "no" ? "Reparasjonstjenester" : "Repair Services",
      description:
        language === "no"
          ? "Profesjonell reparasjon av alle typer IT-utstyr. Rask service og kvalitetsgaranti."
          : "Professional repair of all types of IT equipment. Fast service and quality guarantee.",
      href: "/reparasjon",
      badge: language === "no" ? "Reparasjon" : "Repair",
    },
    {
      icon: Shield,
      title: language === "no" ? "Sikker datasletting" : "Secure Data Erasure",
      description:
        language === "no"
          ? "Sertifisert datasletting som oppfyller alle sikkerhetskrav. Dokumentert og sporbar."
          : "Certified data erasure that meets all security requirements. Documented and traceable.",
      href: "/tjenester#datasletting",
      badge: language === "no" ? "Sikkerhet" : "Security",
    },
    {
      icon: Server,
      title: language === "no" ? "IT-infrastruktur" : "IT Infrastructure",
      description:
        language === "no"
          ? "Servere, nettverksutstyr og lagringsløsninger for bedrifter. Skreddersydde løsninger."
          : "Servers, networking equipment and storage solutions for businesses. Tailored solutions.",
      href: "/nettbutikk?category=NETWORKING",
      badge: language === "no" ? "Bedrift" : "Business",
    },
    {
      icon: Package,
      title: language === "no" ? "E-avfall håndtering" : "E-Waste Management",
      description:
        language === "no"
          ? "Miljøvennlig resirkulering av elektronisk avfall. WEEE-sertifisert prosess."
          : "Environmentally friendly recycling of electronic waste. WEEE-certified process.",
      href: "/miljo",
      badge: language === "no" ? "Miljø" : "Environment",
    },
  ];

  const benefits = [
    {
      icon: CheckCircle,
      title: language === "no" ? "Sertifisert kvalitet" : "Certified Quality",
      description:
        language === "no"
          ? "Alle enheter gjennomgår grundig testing og kvalitetskontroll"
          : "All devices undergo thorough testing and quality control",
    },
    {
      icon: Shield,
      title: language === "no" ? "12 mnd garanti" : "12 Month Warranty",
      description:
        language === "no"
          ? "Full garanti på alle produkter og tjenester"
          : "Full warranty on all products and services",
    },
    {
      icon: Recycle,
      title: language === "no" ? "Bærekraftig" : "Sustainable",
      description:
        language === "no"
          ? "Vi bidrar til sirkulær økonomi og reduserer e-avfall"
          : "We contribute to circular economy and reduce e-waste",
    },
    {
      icon: Building2,
      title: language === "no" ? "Bedriftsfokus" : "Business Focus",
      description:
        language === "no"
          ? "Skreddersydde løsninger for bedrifter i alle størrelser"
          : "Tailored solutions for businesses of all sizes",
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-600 via-green-700 to-emerald-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <Badge className="bg-white/20 text-white mb-4">
            {language === "no" ? "Våre tjenester" : "Our Services"}
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {language === "no"
              ? "Bærekraftige IT-løsninger"
              : "Sustainable IT Solutions"}
          </h1>
          <p className="text-xl text-green-100 max-w-3xl mx-auto">
            {language === "no"
              ? "Vi tilbyr et komplett utvalg av IT-tjenester for privatpersoner og bedrifter. Fra salg av refurbished utstyr til sikker datasletting og e-avfall håndtering."
              : "We offer a complete range of IT services for individuals and businesses. From refurbished equipment sales to secure data erasure and e-waste management."}
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 -mt-10 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <Link key={index} href={service.href}>
                <Card className="h-full hover:shadow-lg transition-all cursor-pointer group">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between mb-2">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
                        <service.icon className="w-6 h-6 text-green-600" />
                      </div>
                      <Badge variant="secondary">{service.badge}</Badge>
                    </div>
                    <CardTitle className="text-xl group-hover:text-green-600 transition-colors">
                      {service.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{service.description}</p>
                    <div className="flex items-center text-green-600 font-medium">
                      {language === "no" ? "Les mer" : "Learn more"}
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            {language === "no" ? "Hvorfor velge Nornex?" : "Why Choose Nornex?"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Business Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="text-white mb-6 md:mb-0">
                <div className="flex items-center space-x-2 mb-2">
                  <Users className="w-6 h-6 text-green-400" />
                  <span className="text-green-400 font-semibold">
                    {language === "no" ? "For bedrifter" : "For Businesses"}
                  </span>
                </div>
                <h2 className="text-3xl font-bold mb-4">
                  {language === "no"
                    ? "Skreddersydde IT-løsninger"
                    : "Tailored IT Solutions"}
                </h2>
                <p className="text-gray-300 max-w-xl">
                  {language === "no"
                    ? "Vi tilbyr spesialtilpassede løsninger for bedrifter. Kontakt oss for å diskutere dine behov og få et skreddersydd tilbud."
                    : "We offer customized solutions for businesses. Contact us to discuss your needs and get a tailored quote."}
                </p>
              </div>
              <Link href="/om-oss#kontakt">
                <Button
                  size="lg"
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  {language === "no" ? "Kontakt oss" : "Contact Us"}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {language === "no" ? "Besøk oss" : "Visit Us"}
          </h2>
          <p className="text-gray-600 mb-2">
            {language === "no" ? "Adresse:" : "Address:"}
          </p>
          <p className="text-xl font-semibold text-gray-900">
            Brynsveien 18, 0667 Oslo, Norway
          </p>
        </div>
      </section>
    </div>
  );
}
