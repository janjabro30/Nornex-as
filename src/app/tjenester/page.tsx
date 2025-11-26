"use client";

import React from "react";
import Link from "next/link";
import {
  Globe,
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
  Cloud,
  Headphones,
  Code,
  Check,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAppStore } from "@/store";

export default function ServicesPage() {
  const { language } = useAppStore();

  // Digital Development Services (Featured)
  const digitalServices = [
    {
      icon: Globe,
      gradient: "linear-gradient(135deg, #10B981, #059669)",
      title: language === "no" ? "Webutvikling" : "Web Development",
      description:
        language === "no"
          ? "Profesjonelle nettsider og webapplikasjoner bygget med moderne teknologi for optimal ytelse og brukeropplevelse."
          : "Professional websites and web applications built with modern technology for optimal performance and user experience.",
      features: language === "no" 
        ? ["Responsive design", "SEO-optimalisering", "E-handelsløsninger", "CMS & WordPress", "React & Next.js"]
        : ["Responsive design", "SEO optimization", "E-commerce solutions", "CMS & WordPress", "React & Next.js"],
      badge: language === "no" ? "Populær" : "Popular",
    },
    {
      icon: Smartphone,
      gradient: "linear-gradient(135deg, #F59E0B, #D97706)",
      title: language === "no" ? "App-utvikling" : "App Development",
      description:
        language === "no"
          ? "Native og cross-platform mobilapper som leverer eksepsjonelle brukeropplevelser på iOS og Android."
          : "Native and cross-platform mobile apps that deliver exceptional user experiences on iOS and Android.",
      features: language === "no"
        ? ["iOS & Android", "React Native & Flutter", "UX/UI Design", "App Store optimalisering", "Vedlikehold"]
        : ["iOS & Android", "React Native & Flutter", "UX/UI Design", "App Store optimization", "Maintenance"],
      badge: language === "no" ? "Ny" : "New",
    },
  ];

  // IT Services
  const itServices = [
    {
      icon: Server,
      gradient: "linear-gradient(135deg, #3B82F6, #1E40AF)",
      title: language === "no" ? "Managed IT" : "Managed IT",
      description:
        language === "no"
          ? "Komplett IT-drift og support for din bedrift med 24/7 overvåking."
          : "Complete IT operations and support for your business with 24/7 monitoring.",
      features: language === "no"
        ? ["24/7 overvåking", "Proaktiv vedlikehold", "Fast responstid"]
        : ["24/7 monitoring", "Proactive maintenance", "Fast response time"],
    },
    {
      icon: Shield,
      gradient: "linear-gradient(135deg, #EC4899, #9333EA)",
      title: language === "no" ? "Cybersikkerhet" : "Cybersecurity",
      description:
        language === "no"
          ? "Beskytt din bedrift mot digitale trusler med våre sikkerhetsløsninger."
          : "Protect your business from digital threats with our security solutions.",
      features: language === "no"
        ? ["Sikkerhetsanalyse", "Firewall og VPN", "Opplæring"]
        : ["Security analysis", "Firewall and VPN", "Training"],
    },
    {
      icon: Cloud,
      gradient: "linear-gradient(135deg, #06B6D4, #0891B2)",
      title: language === "no" ? "Cloud Services" : "Cloud Services",
      description:
        language === "no"
          ? "Fleksible og skalerbare skyløsninger tilpasset dine behov."
          : "Flexible and scalable cloud solutions tailored to your needs.",
      features: language === "no"
        ? ["Microsoft 365", "Azure hosting", "Backup & gjenoppretting"]
        : ["Microsoft 365", "Azure hosting", "Backup & recovery"],
    },
    {
      icon: Headphones,
      gradient: "linear-gradient(135deg, #8B5CF6, #6D28D9)",
      title: language === "no" ? "IT Support" : "IT Support",
      description:
        language === "no"
          ? "Rask og effektiv IT-support når du trenger det."
          : "Fast and efficient IT support when you need it.",
      features: language === "no"
        ? ["Norskspråklig", "Fjernhjelp", "SLA-garantier"]
        : ["Norwegian speaking", "Remote help", "SLA guarantees"],
    },
  ];

  // Additional services
  const additionalServices = [
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
          ? "Selg ditt brukte IT-utstyr til oss. Vi tilbyr konkurransedyktige priser."
          : "Sell your used IT equipment to us. We offer competitive prices.",
      href: "/selg-til-oss",
      badge: language === "no" ? "Selg til oss" : "Sell to Us",
    },
    {
      icon: Wrench,
      title: language === "no" ? "Reparasjonstjenester" : "Repair Services",
      description:
        language === "no"
          ? "Profesjonell reparasjon av alle typer IT-utstyr. Rask service."
          : "Professional repair of all types of IT equipment. Fast service.",
      href: "/reparasjon",
      badge: language === "no" ? "Reparasjon" : "Repair",
    },
    {
      icon: Package,
      title: language === "no" ? "E-avfall håndtering" : "E-Waste Management",
      description:
        language === "no"
          ? "Miljøvennlig resirkulering av elektronisk avfall. WEEE-sertifisert."
          : "Environmentally friendly recycling of electronic waste. WEEE-certified.",
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
      icon: Code,
      title: language === "no" ? "Moderne teknologi" : "Modern Technology",
      description:
        language === "no"
          ? "Vi bruker de nyeste rammeverkene og beste praksiser"
          : "We use the latest frameworks and best practices",
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
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <Badge className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-white mb-4 border-0">
            {language === "no" ? "Våre tjenester" : "Our Services"}
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {language === "no"
              ? "Digitale løsninger & IT-tjenester"
              : "Digital Solutions & IT Services"}
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            {language === "no"
              ? "Fra webutvikling og mobilapper til komplett IT-infrastruktur. Vi leverer profesjonelle digitale løsninger for din bedrift."
              : "From web development and mobile apps to complete IT infrastructure. We deliver professional digital solutions for your business."}
          </p>
        </div>
      </section>

      {/* Digital Development Section */}
      <section className="py-16 -mt-10 relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              {language === "no" ? "Webutvikling & App-utvikling" : "Web & App Development"}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {language === "no"
                ? "Vi bygger profesjonelle nettsider og mobilapper som driver resultater for din bedrift."
                : "We build professional websites and mobile apps that drive results for your business."}
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {digitalServices.map((service, index) => (
              <Card key={index} className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-4">
                    <div 
                      className="w-14 h-14 rounded-xl flex items-center justify-center"
                      style={{ background: service.gradient }}
                    >
                      <service.icon className="w-7 h-7 text-white" />
                    </div>
                    <Badge className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-white border-0">
                      {service.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-2xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-6">{service.description}</p>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-gray-700">
                        <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link href="/om-oss#kontakt">
                    <Button className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white border-0">
                      {language === "no" ? "Kontakt oss" : "Contact Us"}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Tech Stack */}
          <div className="mt-12 text-center">
            <p className="text-gray-500 text-sm mb-4">
              {language === "no" ? "Teknologier vi bruker" : "Technologies we use"}
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {["React", "Next.js", "TypeScript", "Node.js", "Flutter", "React Native", "Swift", "Kotlin", "PostgreSQL", "AWS"].map((tech, idx) => (
                <span 
                  key={idx}
                  className="px-4 py-2 bg-white text-gray-700 rounded-full text-sm font-medium border border-gray-200 shadow-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* IT Services Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              {language === "no" ? "IT-tjenester & Support" : "IT Services & Support"}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {language === "no"
                ? "Komplett IT-infrastruktur og support for din bedrift."
                : "Complete IT infrastructure and support for your business."}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {itServices.map((service, index) => (
              <Card key={index} className="h-full hover:shadow-lg transition-all">
                <CardContent className="pt-6">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: service.gradient }}
                  >
                    <service.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{service.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{service.description}</p>
                  <ul className="space-y-1">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-xs text-gray-600">
                        <Check className="w-3 h-3 text-emerald-500 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              {language === "no" ? "Andre tjenester" : "Other Services"}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {additionalServices.map((service, index) => (
              <Link key={index} href={service.href}>
                <Card className="h-full hover:shadow-lg transition-all cursor-pointer group">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
                        <service.icon className="w-6 h-6 text-green-600" />
                      </div>
                      <Badge variant="secondary">{service.badge}</Badge>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">{service.description}</p>
                    <div className="flex items-center text-green-600 font-medium text-sm">
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
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-8 h-8 text-white" />
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
          <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="text-white mb-6 md:mb-0">
                <div className="flex items-center space-x-2 mb-2">
                  <Users className="w-6 h-6 text-emerald-400" />
                  <span className="text-emerald-400 font-semibold">
                    {language === "no" ? "For bedrifter" : "For Businesses"}
                  </span>
                </div>
                <h2 className="text-3xl font-bold mb-4">
                  {language === "no"
                    ? "Skreddersydde digitale løsninger"
                    : "Tailored Digital Solutions"}
                </h2>
                <p className="text-gray-300 max-w-xl">
                  {language === "no"
                    ? "Vi tilbyr spesialtilpassede løsninger for bedrifter – fra nettsider og apper til komplett IT-infrastruktur. Kontakt oss for å diskutere dine behov."
                    : "We offer customized solutions for businesses – from websites and apps to complete IT infrastructure. Contact us to discuss your needs."}
                </p>
              </div>
              <Link href="/om-oss#kontakt">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white border-0"
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
