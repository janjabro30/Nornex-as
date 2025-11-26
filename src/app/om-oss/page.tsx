"use client";

import React from "react";
import Link from "next/link";
import {
  Users,
  Target,
  Leaf,
  Award,
  MapPin,
  Phone,
  Mail,
  Building2,
  Heart,
  Recycle,
  Shield,
  Globe,
  ArrowRight,
  Code,
  Smartphone,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAppStore } from "@/store";

export default function AboutPage() {
  const { language } = useAppStore();

  const values = [
    {
      icon: Leaf,
      title: language === "no" ? "Bærekraft" : "Sustainability",
      description:
        language === "no"
          ? "Vi er dedikert til å redusere e-avfall og fremme sirkulær økonomi gjennom refurbishing og ansvarlig resirkulering."
          : "We are dedicated to reducing e-waste and promoting circular economy through refurbishing and responsible recycling.",
    },
    {
      icon: Shield,
      title: language === "no" ? "Kvalitet" : "Quality",
      description:
        language === "no"
          ? "Alle våre produkter og tjenester gjennomgår grundig kvalitetskontroll. Vi garanterer høy standard."
          : "All our products and services undergo thorough quality control. We guarantee high standards.",
    },
    {
      icon: Heart,
      title: language === "no" ? "Kundefokus" : "Customer Focus",
      description:
        language === "no"
          ? "Vi setter kunden i sentrum og streber etter å levere enestående service og support."
          : "We put the customer at the center and strive to deliver outstanding service and support.",
    },
    {
      icon: Code,
      title: language === "no" ? "Innovasjon" : "Innovation",
      description:
        language === "no"
          ? "Vi utvikler kontinuerlig våre digitale tjenester med de nyeste teknologiene og rammeverkene."
          : "We continuously develop our digital services with the latest technologies and frameworks.",
    },
  ];

  const stats = [
    {
      value: "15,000+",
      label: language === "no" ? "Enheter resirkulert" : "Devices recycled",
    },
    {
      value: "100+",
      label: language === "no" ? "Nettsider & apper" : "Websites & apps",
    },
    {
      value: "5,000+",
      label: language === "no" ? "Fornøyde kunder" : "Happy customers",
    },
    {
      value: "98%",
      label: language === "no" ? "Kundetilfredshet" : "Customer satisfaction",
    },
  ];

  const services = [
    {
      icon: Globe,
      title: language === "no" ? "Webutvikling" : "Web Development",
      description: language === "no" ? "Profesjonelle nettsider" : "Professional websites",
    },
    {
      icon: Smartphone,
      title: language === "no" ? "App-utvikling" : "App Development",
      description: language === "no" ? "iOS & Android apper" : "iOS & Android apps",
    },
    {
      icon: Shield,
      title: language === "no" ? "IT-tjenester" : "IT Services",
      description: language === "no" ? "Managed IT & support" : "Managed IT & support",
    },
    {
      icon: Recycle,
      title: language === "no" ? "Bærekraft" : "Sustainability",
      description: language === "no" ? "Refurbished IT-utstyr" : "Refurbished IT equipment",
    },
  ];

  const team = [
    {
      name: "Jan Jabro",
      role: language === "no" ? "Daglig leder" : "CEO",
      description:
        language === "no"
          ? "Grunnlegger med over 10 års erfaring innen IT og bærekraft."
          : "Founder with over 10 years of experience in IT and sustainability.",
    },
    {
      name: "Maria Olsen",
      role: language === "no" ? "Teknisk leder" : "Technical Manager",
      description:
        language === "no"
          ? "Ansvarlig for kvalitetskontroll og teknisk support."
          : "Responsible for quality control and technical support.",
    },
    {
      name: "Anders Berg",
      role: language === "no" ? "Salgssjef" : "Sales Manager",
      description:
        language === "no"
          ? "Leder for salg og kunderelasjoner."
          : "Head of sales and customer relations.",
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <Badge className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-white mb-4 border-0">
            {language === "no" ? "Om oss" : "About Us"}
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {language === "no"
              ? "Din partner for digitale løsninger"
              : "Your Partner for Digital Solutions"}
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            {language === "no"
              ? "Nornex AS leverer profesjonelle digitale tjenester – fra webutvikling og mobilapper til komplett IT-infrastruktur og bærekraftige IT-løsninger."
              : "Nornex AS delivers professional digital services – from web development and mobile apps to complete IT infrastructure and sustainable IT solutions."}
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 -mt-10 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center">
                <CardContent className="py-6">
                  <p className="text-3xl font-bold bg-gradient-to-r from-emerald-500 to-cyan-500 bg-clip-text text-transparent mb-1">
                    {stat.value}
                  </p>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {language === "no" ? "Hva vi gjør" : "What We Do"}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {language === "no"
                ? "Vi tilbyr et bredt spekter av digitale tjenester for bedrifter i alle størrelser."
                : "We offer a wide range of digital services for businesses of all sizes."}
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {services.map((service, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all">
                <CardContent className="py-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <service.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">{service.title}</h3>
                  <p className="text-gray-500 text-sm">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Target className="w-6 h-6 text-emerald-500" />
                <span className="text-emerald-500 font-semibold">
                  {language === "no" ? "Vår misjon" : "Our Mission"}
                </span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                {language === "no"
                  ? "Digitale løsninger som driver resultater"
                  : "Digital Solutions That Drive Results"}
              </h2>
              <p className="text-gray-600 mb-4">
                {language === "no"
                  ? "Vår misjon er å hjelpe bedrifter med å lykkes digitalt. Vi bygger profesjonelle nettsider, mobilapper og IT-løsninger som gir reelle resultater."
                  : "Our mission is to help businesses succeed digitally. We build professional websites, mobile apps and IT solutions that deliver real results."}
              </p>
              <p className="text-gray-600 mb-6">
                {language === "no"
                  ? "I tillegg fokuserer vi på bærekraft ved å gi IT-utstyr nytt liv gjennom profesjonell refurbishing, og dermed bidra til en mer bærekraftig fremtid."
                  : "In addition, we focus on sustainability by giving IT equipment new life through professional refurbishing, thereby contributing to a more sustainable future."}
              </p>
              <Link href="/tjenester">
                <Button className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white border-0">
                  {language === "no" ? "Se våre tjenester" : "View Our Services"}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
            <div className="bg-gradient-to-br from-slate-100 to-slate-50 rounded-2xl p-8">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-6 text-center shadow-sm">
                  <Globe className="w-10 h-10 text-emerald-500 mx-auto mb-2" />
                  <p className="font-semibold text-gray-900">
                    {language === "no" ? "Web & Apps" : "Web & Apps"}
                  </p>
                </div>
                <div className="bg-white rounded-lg p-6 text-center shadow-sm">
                  <Leaf className="w-10 h-10 text-emerald-500 mx-auto mb-2" />
                  <p className="font-semibold text-gray-900">
                    {language === "no" ? "Bærekraft" : "Sustainability"}
                  </p>
                </div>
                <div className="bg-white rounded-lg p-6 text-center shadow-sm">
                  <Shield className="w-10 h-10 text-emerald-500 mx-auto mb-2" />
                  <p className="font-semibold text-gray-900">
                    {language === "no" ? "IT-sikkerhet" : "IT Security"}
                  </p>
                </div>
                <div className="bg-white rounded-lg p-6 text-center shadow-sm">
                  <Award className="w-10 h-10 text-emerald-500 mx-auto mb-2" />
                  <p className="font-semibold text-gray-900">
                    {language === "no" ? "Sertifisert" : "Certified"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            {language === "no" ? "Våre verdier" : "Our Values"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="py-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
            {language === "no" ? "Vårt team" : "Our Team"}
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            {language === "no"
              ? "Et dedikert team med ekspertise innen webutvikling, app-utvikling, IT og kundeservice."
              : "A dedicated team with expertise in web development, app development, IT and customer service."}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {team.map((member, index) => (
              <Card key={index} className="text-center">
                <CardContent className="py-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-slate-200 to-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-10 h-10 text-slate-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {member.name}
                  </h3>
                  <p className="text-emerald-500 text-sm font-medium mb-2">
                    {member.role}
                  </p>
                  <p className="text-gray-600 text-sm">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="kontakt" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            {language === "no" ? "Kontakt oss" : "Contact Us"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="text-center">
              <CardContent className="py-8">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  {language === "no" ? "Besøksadresse" : "Address"}
                </h3>
                <p className="text-gray-600 text-sm">
                  Brynsveien 18<br />
                  0667 Oslo, Norway
                </p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="py-8">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  {language === "no" ? "Telefon" : "Phone"}
                </h3>
                <a
                  href="tel:+4712345678"
                  className="text-emerald-500 hover:text-emerald-600 transition-colors"
                >
                  +47 123 45 678
                </a>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="py-8">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  {language === "no" ? "E-post" : "Email"}
                </h3>
                <a
                  href="mailto:post@nornex.no"
                  className="text-emerald-500 hover:text-emerald-600 transition-colors"
                >
                  post@nornex.no
                </a>
              </CardContent>
            </Card>
          </div>

          {/* Business Info */}
          <div className="mt-12 text-center">
            <Card className="inline-block">
              <CardContent className="py-6 px-8">
                <div className="flex items-center space-x-3">
                  <Building2 className="w-6 h-6 text-gray-400" />
                  <div className="text-left">
                    <p className="text-sm text-gray-500">
                      {language === "no" ? "Organisasjonsnummer" : "Organization Number"}
                    </p>
                    <p className="font-semibold text-gray-900">XXX XXX XXX</p>
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
