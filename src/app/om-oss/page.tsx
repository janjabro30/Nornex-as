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
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
          ? "Alle våre produkter gjennomgår grundig testing og kvalitetskontroll. Vi garanterer høy standard på alt vi selger."
          : "All our products undergo thorough testing and quality control. We guarantee high standards on everything we sell.",
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
      icon: Globe,
      title: language === "no" ? "Innovasjon" : "Innovation",
      description:
        language === "no"
          ? "Vi utvikler kontinuerlig våre tjenester og prosesser for å møte fremtidens behov."
          : "We continuously develop our services and processes to meet future needs.",
    },
  ];

  const stats = [
    {
      value: "15,000+",
      label: language === "no" ? "Enheter resirkulert" : "Devices recycled",
    },
    {
      value: "1,250+",
      label: language === "no" ? "Tonn CO₂ spart" : "Tonnes CO₂ saved",
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
      <section className="bg-gradient-to-br from-green-600 via-green-700 to-emerald-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <Badge className="bg-white/20 text-white mb-4">
            {language === "no" ? "Om oss" : "About Us"}
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {language === "no"
              ? "Bærekraftig IT for fremtiden"
              : "Sustainable IT for the Future"}
          </h1>
          <p className="text-xl text-green-100 max-w-3xl mx-auto">
            {language === "no"
              ? "Nornex AS er Norges ledende leverandør av refurbished IT-utstyr. Vi kombinerer teknologi og bærekraft for å skape verdi for kunder og miljø."
              : "Nornex AS is Norway's leading supplier of refurbished IT equipment. We combine technology and sustainability to create value for customers and the environment."}
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
                  <p className="text-3xl font-bold text-green-600 mb-1">
                    {stat.value}
                  </p>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Target className="w-6 h-6 text-green-600" />
                <span className="text-green-600 font-semibold">
                  {language === "no" ? "Vår misjon" : "Our Mission"}
                </span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                {language === "no"
                  ? "Gi IT-utstyr nytt liv"
                  : "Give IT Equipment New Life"}
              </h2>
              <p className="text-gray-600 mb-4">
                {language === "no"
                  ? "Vår misjon er å forlenge levetiden til IT-utstyr gjennom profesjonell refurbishing, og dermed bidra til en mer bærekraftig fremtid. Vi tror på at kvalitetsteknologi ikke trenger å være nytt for å være verdifullt."
                  : "Our mission is to extend the life of IT equipment through professional refurbishing, thereby contributing to a more sustainable future. We believe that quality technology doesn't need to be new to be valuable."}
              </p>
              <p className="text-gray-600 mb-6">
                {language === "no"
                  ? "For hver enhet vi refurbisher, sparer vi betydelige mengder CO₂ og reduserer mengden e-avfall som ender på deponi. Dette gjør vi samtidig som vi leverer høykvalitetsprodukter til konkurransedyktige priser."
                  : "For every device we refurbish, we save significant amounts of CO₂ and reduce the amount of e-waste that ends up in landfills. We do this while delivering high-quality products at competitive prices."}
              </p>
              <Link href="/miljo">
                <Button>
                  {language === "no" ? "Les om vårt miljøarbeid" : "Read about our environmental work"}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
            <div className="bg-green-100 rounded-2xl p-8">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-6 text-center">
                  <Recycle className="w-10 h-10 text-green-600 mx-auto mb-2" />
                  <p className="font-semibold text-gray-900">
                    {language === "no" ? "Sirkulær økonomi" : "Circular Economy"}
                  </p>
                </div>
                <div className="bg-white rounded-lg p-6 text-center">
                  <Leaf className="w-10 h-10 text-green-600 mx-auto mb-2" />
                  <p className="font-semibold text-gray-900">
                    {language === "no" ? "CO₂-reduksjon" : "CO₂ Reduction"}
                  </p>
                </div>
                <div className="bg-white rounded-lg p-6 text-center">
                  <Shield className="w-10 h-10 text-green-600 mx-auto mb-2" />
                  <p className="font-semibold text-gray-900">
                    {language === "no" ? "Datasikkerhet" : "Data Security"}
                  </p>
                </div>
                <div className="bg-white rounded-lg p-6 text-center">
                  <Award className="w-10 h-10 text-green-600 mx-auto mb-2" />
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
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            {language === "no" ? "Våre verdier" : "Our Values"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-8 h-8 text-green-600" />
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
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
            {language === "no" ? "Vårt team" : "Our Team"}
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            {language === "no"
              ? "Et dedikert team med ekspertise innen IT, bærekraft og kundeservice."
              : "A dedicated team with expertise in IT, sustainability and customer service."}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {team.map((member, index) => (
              <Card key={index} className="text-center">
                <CardContent className="py-8">
                  <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-10 h-10 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {member.name}
                  </h3>
                  <p className="text-green-600 text-sm font-medium mb-2">
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
      <section id="kontakt" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            {language === "no" ? "Kontakt oss" : "Contact Us"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="text-center">
              <CardContent className="py-8">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-6 h-6 text-green-600" />
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
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  {language === "no" ? "Telefon" : "Phone"}
                </h3>
                <a
                  href="tel:+4712345678"
                  className="text-green-600 hover:text-green-700 transition-colors"
                >
                  +47 123 45 678
                </a>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="py-8">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  {language === "no" ? "E-post" : "Email"}
                </h3>
                <a
                  href="mailto:post@nornex.no"
                  className="text-green-600 hover:text-green-700 transition-colors"
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
