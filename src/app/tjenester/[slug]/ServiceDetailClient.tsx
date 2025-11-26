"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  Star,
  Clock,
  MapPin,
  Phone,
  ChevronDown,
  ChevronUp,
  Server,
  Shield,
  Cloud,
  Headphones,
  Laptop,
  Wrench,
  Globe,
  Smartphone,
  Layout,
  Plug,
  Users,
  Monitor,
  Lock,
  Mail,
  Eye,
  AlertTriangle,
  Database,
  RefreshCw,
  TrendingUp,
  Settings,
  FileText,
  Search,
  CheckCircle,
  Wifi,
  Printer,
  ShoppingCart,
  Truck,
  Package,
  HardDrive,
  Zap,
  MessageSquare,
  Palette,
  Code,
  BarChart,
  Rocket,
  Lightbulb,
  Play,
  Target,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Service } from "@/lib/services-data";
import type { PortfolioProject } from "@/lib/portfolio-data";

// Icon mapping
const iconMap: Record<string, React.ElementType> = {
  Server,
  Shield,
  Cloud,
  Headphones,
  Laptop,
  Wrench,
  Globe,
  Smartphone,
  Layout,
  Plug,
  Users,
  Monitor,
  Lock,
  Mail,
  Eye,
  AlertTriangle,
  Database,
  RefreshCw,
  TrendingUp,
  Settings,
  FileText,
  Search,
  CheckCircle,
  Wifi,
  Printer,
  ShoppingCart,
  Truck,
  Package,
  HardDrive,
  Zap,
  MessageSquare,
  Palette,
  Code,
  BarChart,
  Rocket,
  Lightbulb,
  Play,
  Target,
  Phone,
};

interface ServiceDetailClientProps {
  service: Service;
  portfolioProjects: PortfolioProject[];
  relatedServices: Service[];
}

export default function ServiceDetailClient({
  service,
  portfolioProjects,
  relatedServices,
}: ServiceDetailClientProps) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const ServiceIcon = iconMap[service.icon] || Server;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("nb-NO", {
      style: "currency",
      currency: "NOK",
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Section 1: Hero */}
      <section
        className="relative py-20 md:py-28 overflow-hidden"
        style={{ background: service.gradient }}
      >
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Service Icon */}
            <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-white/20 backdrop-blur-sm rounded-2xl mb-6">
              <ServiceIcon className="w-8 h-8 md:w-10 md:h-10 text-white" />
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              {service.name}
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8">
              {service.subtitle}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link href="/kontakt">
                <Button
                  size="lg"
                  className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-6 text-lg font-semibold w-full sm:w-auto"
                >
                  Få tilbud
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <a href="#pricing">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg w-full sm:w-auto"
                >
                  Se priser
                </Button>
              </a>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-white text-sm">
                <Check className="w-4 h-4" />
                <span>24/7 Support</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-white text-sm">
                <Check className="w-4 h-4" />
                <span>ISO-sertifisert</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-white text-sm">
                <Check className="w-4 h-4" />
                <span>500+ kunder</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Service Overview */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Description */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Om tjenesten
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                {service.description}
              </p>

              {/* Key Features */}
              <ul className="space-y-3">
                {service.features.map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-gray-700"
                  >
                    <div className="mt-1 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-green-600" />
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Info Card */}
            <div>
              <Card className="border-0 shadow-lg">
                <CardHeader className="pb-4">
                  <CardTitle>Rask oversikt</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Starting Price */}
                  <div className="flex items-center justify-between pb-4 border-b">
                    <span className="text-gray-600">Fra pris</span>
                    <span className="text-2xl font-bold text-gray-900">
                      {formatPrice(service.startingPrice)}
                    </span>
                  </div>

                  {/* Delivery Time */}
                  <div className="flex items-center justify-between pb-4 border-b">
                    <span className="text-gray-600">Leveringstid</span>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="font-medium">{service.deliveryTime}</span>
                    </div>
                  </div>

                  {/* Technologies */}
                  <div>
                    <span className="text-gray-600 block mb-3">
                      Teknologier
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {service.technologies.slice(0, 8).map((tech, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <Link href="/kontakt" className="block">
                    <Button className="w-full bg-green-600 hover:bg-green-700">
                      Kontakt oss for tilbud
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: What's Included */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Hva som er inkludert
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Alt du trenger for en komplett {service.name.toLowerCase()}-løsning
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.included.map((item, index) => {
              const ItemIcon = iconMap[item.icon] || Check;
              return (
                <Card
                  key={index}
                  className="border-0 shadow-sm hover:shadow-md transition-shadow"
                >
                  <CardContent className="pt-6">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                      style={{ background: service.gradient }}
                    >
                      <ItemIcon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-sm">{item.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section 4: Our Process */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Vår prosess
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Slik jobber vi for å levere best mulig resultat
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200 hidden md:block" />

              {service.process.map((step, index) => {
                const StepIcon = iconMap[step.icon] || CheckCircle;
                return (
                  <div key={index} className="relative flex gap-6 mb-8 last:mb-0">
                    {/* Step Number */}
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0 z-10"
                      style={{ background: service.gradient }}
                    >
                      <span className="text-white font-bold text-xl">
                        {step.step}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="flex-1 pt-3">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-semibold text-gray-900">
                          {step.title}
                        </h3>
                        <StepIcon className="w-5 h-5 text-gray-400" />
                      </div>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Portfolio/Case Studies */}
      {portfolioProjects.length > 0 && (
        <section className="py-16 md:py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Våre prosjekter
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Se hva vi har levert for andre kunder
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {portfolioProjects.map((project) => (
                <Link key={project.slug} href={`/portefolje/${project.slug}`}>
                  <Card className="h-full border-0 shadow-sm hover:shadow-lg transition-all cursor-pointer group">
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <Badge variant="secondary" className="mb-2">
                            {project.industry}
                          </Badge>
                          <h3 className="text-xl font-semibold text-gray-900 group-hover:text-green-600 transition-colors">
                            {project.title}
                          </h3>
                        </div>
                        <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-green-600 group-hover:translate-x-1 transition-all" />
                      </div>
                      <p className="text-gray-600 mb-4">
                        {project.shortDescription}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.slice(0, 4).map((tech, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            <div className="text-center mt-8">
              <Link href="/portefolje">
                <Button variant="outline">
                  Se alle prosjekter
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Section 6: Pricing */}
      <section id="pricing" className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Priser
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Velg pakken som passer for din bedrift
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {service.pricing.map((tier, index) => (
              <Card
                key={index}
                className={`relative border-0 shadow-lg ${
                  tier.isPopular
                    ? "ring-2 ring-green-500 scale-105"
                    : ""
                }`}
              >
                {tier.isPopular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <Badge className="bg-green-500 text-white">
                      Mest populær
                    </Badge>
                  </div>
                )}
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-xl">{tier.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-gray-900">
                      {formatPrice(tier.price)}
                    </span>
                    <span className="text-gray-500 ml-2">
                      {tier.priceLabel}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {tier.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-600 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href="/kontakt">
                    <Button
                      className={`w-full ${
                        tier.isPopular
                          ? "bg-green-600 hover:bg-green-700"
                          : ""
                      }`}
                      variant={tier.isPopular ? "default" : "outline"}
                    >
                      Velg {tier.name}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Section 7: Technologies/Tools */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Teknologier vi bruker
            </h2>
          </div>

          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            {service.technologies.map((tech, index) => (
              <div
                key={index}
                className="px-6 py-3 bg-white rounded-full shadow-sm text-gray-700 font-medium"
              >
                {tech}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 8: FAQ */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Ofte stilte spørsmål
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {service.faq.map((item, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-lg overflow-hidden"
              >
                <button
                  className="w-full px-6 py-4 text-left flex items-center justify-between"
                  onClick={() =>
                    setOpenFaqIndex(openFaqIndex === index ? null : index)
                  }
                  aria-expanded={openFaqIndex === index}
                >
                  <span className="font-medium text-gray-900">
                    {item.question}
                  </span>
                  {openFaqIndex === index ? (
                    <ChevronUp className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  )}
                </button>
                {openFaqIndex === index && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600">{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 9: Testimonials */}
      {service.testimonials.length > 0 && (
        <section className="py-16 md:py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Hva kundene sier
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {service.testimonials.map((testimonial, index) => (
                <Card key={index} className="border-0 shadow-sm">
                  <CardContent className="pt-6">
                    <div className="flex gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-5 h-5 text-yellow-400 fill-yellow-400"
                        />
                      ))}
                    </div>
                    <p className="text-gray-600 mb-4 italic">
                      &quot;{testimonial.content}&quot;
                    </p>
                    <div>
                      <p className="font-semibold text-gray-900">
                        {testimonial.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {testimonial.role}, {testimonial.company}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Section 10: Related Services */}
      {relatedServices.length > 0 && (
        <section className="py-16 md:py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Relaterte tjenester
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {relatedServices.map((relatedService) => {
                const RelatedIcon = iconMap[relatedService.icon] || Server;
                return (
                  <Link
                    key={relatedService.slug}
                    href={`/tjenester/${relatedService.slug}`}
                  >
                    <Card className="h-full border-0 shadow-sm hover:shadow-lg transition-all cursor-pointer group">
                      <CardContent className="pt-6">
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                          style={{ background: relatedService.gradient }}
                        >
                          <RelatedIcon className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-green-600 transition-colors mb-2">
                          {relatedService.name}
                        </h3>
                        <p className="text-gray-600 text-sm mb-4">
                          {relatedService.subtitle}
                        </p>
                        <div className="flex items-center text-green-600 text-sm font-medium">
                          Les mer
                          <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Section 11: Final CTA */}
      <section
        className="py-16 md:py-20 relative overflow-hidden"
        style={{ background: service.gradient }}
      >
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
              backgroundSize: "32px 32px",
            }}
          />
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Klar til å komme i gang?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Kontakt oss i dag for en uforpliktende samtale om {service.name.toLowerCase()}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/kontakt">
              <Button
                size="lg"
                className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-6 text-lg font-semibold"
              >
                Kontakt oss
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <a href="tel:+4712345678">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg"
              >
                <Phone className="mr-2 w-5 h-5" />
                Ring oss
              </Button>
            </a>
          </div>

          {/* Address */}
          <div className="mt-12 flex items-center justify-center gap-2 text-white/80">
            <MapPin className="w-5 h-5" />
            <span>Brynsveien 18, 0667 Oslo, Norway</span>
          </div>
        </div>
      </section>
    </div>
  );
}
