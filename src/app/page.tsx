"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Server,
  Shield,
  Cloud,
  Lock,
  Laptop,
  Database,
  Cpu,
  Settings,
  Code,
  HardDrive,
  Headphones,
  Award,
  BadgeCheck,
  Clock,
  Leaf,
  MapPin,
  Eye,
  Star,
  Users,
  Wrench,
  Phone,
  Check,
  Globe,
  Smartphone,
  Palette,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

// Icon Grid data with gradients
const iconGridData = [
  { Icon: Server, gradient: "linear-gradient(135deg, #3B82F6, #1E40AF)", label: "Server" },
  { Icon: Shield, gradient: "linear-gradient(135deg, #EC4899, #9333EA)", label: "Sikkerhet" },
  { Icon: Cloud, gradient: "linear-gradient(135deg, #06B6D4, #0891B2)", label: "Sky" },
  { Icon: Lock, gradient: "linear-gradient(135deg, #8B5CF6, #6D28D9)", label: "Lås" },
  { Icon: Globe, gradient: "linear-gradient(135deg, #10B981, #059669)", label: "Web" },
  { Icon: Smartphone, gradient: "linear-gradient(135deg, #F59E0B, #D97706)", label: "App" },
  { Icon: Database, gradient: "linear-gradient(135deg, #06B6D4, #0891B2)", label: "Database" },
  { Icon: Cpu, gradient: "linear-gradient(135deg, #8B5CF6, #6D28D9)", label: "Prosessor" },
  { Icon: Code, gradient: "linear-gradient(135deg, #EC4899, #9333EA)", label: "Kode" },
  { Icon: Palette, gradient: "linear-gradient(135deg, #10B981, #059669)", label: "Design" },
  { Icon: HardDrive, gradient: "linear-gradient(135deg, #06B6D4, #0891B2)", label: "Lagring" },
  { Icon: Headphones, gradient: "linear-gradient(135deg, #8B5CF6, #6D28D9)", label: "Support" },
];

// Services data
const services = [
  {
    icon: Globe,
    gradient: "linear-gradient(135deg, #10B981, #059669)",
    title: "Webutvikling",
    description: "Profesjonelle nettsider og webapplikasjoner som driver resultater",
    features: ["Responsive design", "SEO-optimalisering", "CMS-løsninger"],
    href: "/tjenester",
    cta: "Les mer",
    featured: true,
  },
  {
    icon: Smartphone,
    gradient: "linear-gradient(135deg, #F59E0B, #D97706)",
    title: "App-utvikling",
    description: "Native og cross-platform mobilapper for iOS og Android",
    features: ["iOS & Android", "React Native / Flutter", "UX/UI Design"],
    href: "/tjenester",
    cta: "Les mer",
    featured: true,
  },
  {
    icon: Server,
    gradient: "linear-gradient(135deg, #3B82F6, #1E40AF)",
    title: "Managed IT",
    description: "Komplett IT-drift og support for din bedrift",
    features: ["24/7 overvåking", "Proaktiv vedlikehold", "Fast responstid"],
    href: "/tjenester",
    cta: "Les mer",
  },
  {
    icon: Shield,
    gradient: "linear-gradient(135deg, #EC4899, #9333EA)",
    title: "Cybersikkerhet",
    description: "Beskytt din bedrift mot digitale trusler",
    features: ["Sikkerhetsanalyse", "Firewall og VPN", "Opplæring av ansatte"],
    href: "/tjenester",
    cta: "Les mer",
  },
  {
    icon: Cloud,
    gradient: "linear-gradient(135deg, #06B6D4, #0891B2)",
    title: "Cloud Services",
    description: "Fleksible og skalerbare skyløsninger",
    features: ["Microsoft 365", "Azure hosting", "Backup og gjenoppretting"],
    href: "/tjenester",
    cta: "Les mer",
  },
  {
    icon: Headphones,
    gradient: "linear-gradient(135deg, #8B5CF6, #6D28D9)",
    title: "Helpdesk",
    description: "Rask og effektiv IT-support når du trenger det",
    features: ["Norskspråklig support", "Fjernhjelp", "SLA-garantier"],
    href: "/tjenester",
    cta: "Les mer",
  },
  {
    icon: Laptop,
    gradient: "linear-gradient(135deg, #3B82F6, #1E40AF)",
    title: "Hardware",
    description: "Kvalitetsutstyr tilpasset dine behov",
    features: ["Bedrifts-PC og Mac", "Servere og nettverk", "Refurbished alternativer"],
    href: "/nettbutikk",
    cta: "Se produkter",
  },
  {
    icon: Settings,
    gradient: "linear-gradient(135deg, #EC4899, #9333EA)",
    title: "Reparasjonstjenester",
    description: "Profesjonell reparasjon av alt IT-utstyr",
    features: ["Rask diagnose", "Kvalitetsgaranti", "Henting og levering"],
    href: "/reparasjon",
    cta: "Bestill reparasjon",
  },
];

// Value propositions
const valueProps = [
  {
    icon: Award,
    title: "10+ års erfaring",
    description: "Vi har levert IT-tjenester til norske bedrifter siden 2013",
  },
  {
    icon: BadgeCheck,
    title: "ISO-sertifisert",
    description: "Vi følger internasjonale standarder for kvalitet og sikkerhet",
  },
  {
    icon: Clock,
    title: "24/7 tilgjengelighet",
    description: "Vårt supportteam er alltid klar til å hjelpe deg",
  },
  {
    icon: Leaf,
    title: "Miljøvennlig",
    description: "Vi fokuserer på bærekraft og resirkulering av IT-utstyr",
  },
  {
    icon: MapPin,
    title: "Lokal service",
    description: "Basert i Oslo med rask utrykning i hele Norge",
  },
  {
    icon: Eye,
    title: "Ingen skjulte kostnader",
    description: "Fast prising og forutsigbar budsjett for din bedrift",
  },
];

// Stats data
const stats = [
  { value: "500+", label: "Fornøyde kunder" },
  { value: "10 000+", label: "Reparasjoner" },
  { value: "99.8%", label: "Oppetid" },
  { value: "4.8/5", label: "Stjerner" },
];

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsVisible, setStatsVisible] = useState(false);

  useEffect(() => {
    // Use requestAnimationFrame to defer state update
    const animationFrame = requestAnimationFrame(() => {
      setIsVisible(true);
    });
    
    // Intersection Observer for stats animation
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setStatsVisible(true);
          }
        });
      },
      { threshold: 0.3 }
    );
    
    if (statsRef.current) {
      observer.observe(statsRef.current);
    }
    
    return () => {
      cancelAnimationFrame(animationFrame);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="flex flex-col">
      {/* Skip to content link for accessibility */}
      <a href="#main-content" className="skip-link">
        Hopp til hovedinnhold
      </a>

      {/* Hero Section with Icon Grid */}
      <section 
        id="main-content"
        className="relative min-h-[90vh] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden"
        aria-label="Hero section"
      >
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div 
            className="absolute inset-0" 
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
              backgroundSize: '40px 40px'
            }}
          />
        </div>

        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className={`space-y-8 ${isVisible ? 'animate-slide-in-left' : 'opacity-0'}`}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                Profesjonelle IT-tjenester for bedrifter
              </h1>
              <p className="text-xl text-slate-300 max-w-xl">
                Vi leverer skreddersydde IT-løsninger med fokus på sikkerhet, stabilitet og skalerbarhet
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/tjenester">
                  <Button 
                    size="lg" 
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg w-full sm:w-auto"
                  >
                    Se våre tjenester
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link href="/om-oss#kontakt">
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="border-slate-400 text-white hover:bg-white/10 px-8 py-6 text-lg w-full sm:w-auto"
                  >
                    Kontakt oss
                  </Button>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-col gap-3 pt-4">
                <div className="flex items-center gap-2 text-slate-300">
                  <Check className="w-5 h-5 text-green-400" aria-hidden="true" />
                  <span>Over 500 fornøyde bedriftskunder</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <Check className="w-5 h-5 text-green-400" aria-hidden="true" />
                  <span>24/7 support</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <Check className="w-5 h-5 text-green-400" aria-hidden="true" />
                  <span>ISO-sertifisert</span>
                </div>
              </div>
            </div>

            {/* Right Icon Grid */}
            <div className="hidden md:block" aria-hidden="true">
              <div className="grid grid-cols-3 gap-4 lg:gap-6">
                {iconGridData.map((item, index) => {
                  const floatClass = index % 4 === 0 ? 'animate-float' : 
                                     index % 4 === 1 ? 'animate-float-delay-1' :
                                     index % 4 === 2 ? 'animate-float-delay-2' : 'animate-float-delay-3';
                  return (
                    <div
                      key={index}
                      className={`icon-card rounded-2xl p-6 ${floatClass} ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}
                      style={{
                        background: item.gradient,
                        boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
                        animationDelay: `${index * 100}ms`,
                      }}
                      tabIndex={0}
                      role="img"
                      aria-label={item.label}
                    >
                      <item.Icon className="w-8 h-8 lg:w-10 lg:h-10 text-white" />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Mobile Icon Grid (2 columns) */}
            <div className="md:hidden" aria-hidden="true">
              <div className="grid grid-cols-2 gap-3">
                {iconGridData.slice(0, 6).map((item, index) => (
                  <div
                    key={index}
                    className="icon-card rounded-xl p-4"
                    style={{
                      background: item.gradient,
                      boxShadow: '0 8px 30px rgba(0,0,0,0.2)',
                    }}
                  >
                    <item.Icon className="w-6 h-6 text-white" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* Partners Section - Hidden if no partners (placeholder) */}
      {/* This section auto-hides when no partners are available */}

      {/* Digital Solutions Section - Web & App Development */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden" aria-labelledby="digital-heading">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div 
            className="absolute inset-0" 
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.5) 1px, transparent 0)`,
              backgroundSize: '30px 30px'
            }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white text-sm font-semibold rounded-full mb-4">
              Digitale løsninger
            </span>
            <h2 id="digital-heading" className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Vi bygger nettsider & apper
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Fra konsept til lansering — vi skaper digitale opplevelser som engasjerer brukere og driver forretningsresultater
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Web Development Card */}
            <div className="group relative bg-gradient-to-br from-slate-800 to-slate-700 rounded-3xl p-8 border border-slate-600 hover:border-emerald-500/50 transition-all duration-500 overflow-hidden">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <div 
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110"
                  style={{ background: 'linear-gradient(135deg, #10B981, #059669)' }}
                >
                  <Globe className="w-8 h-8 text-white" aria-hidden="true" />
                </div>

                <h3 className="text-2xl font-bold text-white mb-3">Webutvikling</h3>
                <p className="text-slate-300 mb-6">
                  Profesjonelle nettsider og webapplikasjoner bygget med moderne teknologi for optimal ytelse og brukeropplevelse.
                </p>

                <ul className="space-y-3 mb-8">
                  {[
                    "Responsive design for alle enheter",
                    "SEO-optimalisering for synlighet",
                    "E-handelsløsninger",
                    "CMS & WordPress",
                    "React, Next.js & moderne rammeverk",
                    "API-integrasjoner"
                  ].map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-slate-300">
                      <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-emerald-400" aria-hidden="true" />
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link href="/tjenester">
                  <Button className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white border-0">
                    Start ditt prosjekt
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* App Development Card */}
            <div className="group relative bg-gradient-to-br from-slate-800 to-slate-700 rounded-3xl p-8 border border-slate-600 hover:border-amber-500/50 transition-all duration-500 overflow-hidden">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <div 
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110"
                  style={{ background: 'linear-gradient(135deg, #F59E0B, #D97706)' }}
                >
                  <Smartphone className="w-8 h-8 text-white" aria-hidden="true" />
                </div>

                <h3 className="text-2xl font-bold text-white mb-3">App-utvikling</h3>
                <p className="text-slate-300 mb-6">
                  Native og cross-platform mobilapper som leverer eksepsjonelle brukeropplevelser på iOS og Android.
                </p>

                <ul className="space-y-3 mb-8">
                  {[
                    "iOS & Android utvikling",
                    "React Native & Flutter",
                    "Brukersentrert UX/UI design",
                    "Push-varsler & offline-støtte",
                    "App Store optimalisering",
                    "Vedlikehold & oppdateringer"
                  ].map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-slate-300">
                      <div className="w-5 h-5 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-amber-400" aria-hidden="true" />
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link href="/tjenester">
                  <Button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white border-0">
                    Planlegg din app
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Tech stack badges */}
          <div className="mt-16 text-center">
            <p className="text-slate-400 text-sm mb-4">Teknologier vi bruker</p>
            <div className="flex flex-wrap justify-center gap-3">
              {["React", "Next.js", "TypeScript", "Node.js", "Flutter", "React Native", "Swift", "Kotlin", "PostgreSQL", "AWS"].map((tech, idx) => (
                <span 
                  key={idx}
                  className="px-4 py-2 bg-slate-700/50 text-slate-300 rounded-full text-sm font-medium border border-slate-600"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white" aria-labelledby="services-heading">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 id="services-heading" className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              IT-tjenester & support
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Komplett IT-infrastruktur og support for din bedrift
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.filter(s => !s.featured).map((service, index) => (
              <Link key={index} href={service.href}>
                <Card 
                  className="h-full hover:shadow-xl transition-all duration-300 cursor-pointer group border-0 shadow-md"
                  style={{ borderRadius: '16px' }}
                >
                  <CardContent className="p-6">
                    {/* Icon with gradient */}
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
                      style={{ background: service.gradient }}
                    >
                      <service.icon className="w-6 h-6 text-white" aria-hidden="true" />
                    </div>

                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">{service.description}</p>

                    {/* Features list */}
                    <ul className="space-y-1.5 mb-4">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-xs text-gray-600">
                          <Check className="w-3 h-3 text-green-500 flex-shrink-0" aria-hidden="true" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <div className="flex items-center text-blue-600 font-semibold text-sm group-hover:gap-2 transition-all">
                      {service.cta}
                      <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section className="py-20 bg-gray-50" aria-labelledby="value-heading">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 id="value-heading" className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Hvorfor velge NORNEX?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {valueProps.map((prop, index) => (
              <div 
                key={index} 
                className="text-center p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <prop.icon className="w-8 h-8 text-white" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{prop.title}</h3>
                <p className="text-gray-600 text-sm">{prop.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof / Stats Section */}
      <section className="py-16 bg-white" aria-labelledby="stats-heading" ref={statsRef}>
        <div className="container mx-auto px-4">
          <h2 id="stats-heading" className="sr-only">Våre resultater</h2>
          
          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className={`text-center p-6 ${statsVisible ? 'animate-counter' : 'opacity-0'}`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <p className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </p>
                <p className="text-gray-600 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Trustpilot-style rating */}
          <div className="text-center bg-gray-50 rounded-2xl p-8 max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-1 mb-3">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star 
                  key={star} 
                  className={`w-8 h-8 ${star <= 4 ? 'text-green-500 fill-green-500' : 'text-green-500 fill-green-200'}`} 
                  aria-hidden="true"
                />
              ))}
            </div>
            <p className="text-2xl font-bold text-gray-900 mb-2">Utmerket</p>
            <p className="text-gray-600">Basert på 247 anmeldelser</p>
            <div className="flex items-center justify-center gap-2 mt-4 text-sm text-gray-500">
              <Users className="w-4 h-4" aria-hidden="true" />
              <span>Verifiserte kundeanmeldelser</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section 
        className="py-20 relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)'
        }}
        aria-labelledby="cta-heading"
      >
        {/* Pattern overlay */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '32px 32px'
          }}
        />

        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 id="cta-heading" className="text-3xl md:text-4xl font-bold text-white mb-4">
            Klar til å forbedre din IT-infrastruktur?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Kontakt oss i dag for en uforpliktende samtale
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/om-oss#kontakt">
              <Button 
                size="lg" 
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-6 text-lg font-semibold"
              >
                <Wrench className="w-5 h-5 mr-2" />
                Bestill konsultasjon
              </Button>
            </Link>
            <a href="tel:+4700000000">
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg"
              >
                <Phone className="w-5 h-5 mr-2" />
                Ring oss
              </Button>
            </a>
          </div>

          {/* Address */}
          <div className="mt-12 flex items-center justify-center gap-2 text-white/80">
            <MapPin className="w-5 h-5" aria-hidden="true" />
            <span>Brynsveien 18, 0667 Oslo, Norway</span>
          </div>
        </div>
      </section>
    </div>
  );
}
