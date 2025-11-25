"use client";

import React from "react";
import Link from "next/link";
import {
  Server,
  Shield,
  Cloud,
  Lock,
  Monitor,
  Network,
  Database,
  Cpu,
  Settings,
  Code,
  HardDrive,
  Headphones,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Service icon configuration with gradient colors
const serviceIcons = [
  { Icon: Server, gradient: "from-blue-500 to-blue-700", label: "Server" },
  { Icon: Shield, gradient: "from-pink-500 to-pink-700", label: "Sikkerhet" },
  { Icon: Cloud, gradient: "from-cyan-400 to-teal-600", label: "Sky" },
  { Icon: Lock, gradient: "from-purple-500 to-purple-700", label: "Beskyttelse" },
  { Icon: Monitor, gradient: "from-blue-500 to-blue-700", label: "Arbeidsstasjon" },
  { Icon: Network, gradient: "from-pink-500 to-pink-700", label: "Nettverk" },
  { Icon: Database, gradient: "from-cyan-400 to-teal-600", label: "Database" },
  { Icon: Cpu, gradient: "from-purple-500 to-purple-700", label: "Maskinvare" },
  { Icon: Settings, gradient: "from-blue-500 to-blue-700", label: "Konfigurasjon" },
  { Icon: Code, gradient: "from-pink-500 to-pink-700", label: "Utvikling" },
  { Icon: HardDrive, gradient: "from-cyan-400 to-teal-600", label: "Lagring" },
  { Icon: Headphones, gradient: "from-purple-500 to-purple-700", label: "Support" },
];

interface ServiceIconCardProps {
  Icon: React.ComponentType<{ className?: string }>;
  gradient: string;
  label: string;
  index: number;
}

function ServiceIconCard({ Icon, gradient, label, index }: ServiceIconCardProps) {
  return (
    <div
      className={`
        service-icon-card
        relative group
        w-full aspect-square
        rounded-2xl
        bg-gradient-to-br ${gradient}
        backdrop-blur-md
        border border-white/20
        shadow-lg
        flex items-center justify-center
        cursor-pointer
        transition-all duration-300 ease-out
        hover:scale-105 hover:-translate-y-2.5
        hover:shadow-2xl hover:shadow-current/30
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900
      `}
      style={{
        animationDelay: `${index * 0.1}s`,
      }}
      tabIndex={0}
      role="button"
      aria-label={label}
    >
      {/* Glassmorphism overlay */}
      <div className="absolute inset-0 rounded-2xl bg-white/10 backdrop-blur-sm" />
      
      {/* Icon */}
      <Icon className="
        relative z-10
        w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12
        text-white
        transition-transform duration-300 ease-out
        group-hover:scale-110 group-hover:rotate-6
      " />
      
      {/* Glow effect on hover */}
      <div className="
        absolute inset-0 rounded-2xl
        opacity-0 group-hover:opacity-100
        transition-opacity duration-300
        bg-white/10
        blur-sm
      " />
    </div>
  );
}

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.15),transparent_50%),radial-gradient(circle_at_70%_80%,rgba(168,85,247,0.15),transparent_50%)]" />
      
      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left side - Content */}
          <div className="text-white space-y-6 order-2 lg:order-1">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight animate-fade-in">
              Profesjonell IT-støtte og teknologi for norske bedrifter
            </h1>
            <p className="text-lg md:text-xl text-blue-100/80 max-w-xl">
              Vi leverer pålitelige IT-løsninger, sikkerhetstjenester og teknisk support tilpasset din bedrifts behov. La oss ta hånd om teknologien så du kan fokusere på kjernevirksomheten.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/selg-til-oss">
                <Button
                  size="lg"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-6 text-lg font-semibold rounded-xl shadow-lg shadow-blue-500/30 transition-all hover:shadow-xl hover:shadow-blue-500/40"
                >
                  Kom i gang
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/nettbutikk">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white/30 bg-white/5 text-white hover:bg-white/10 hover:border-white/50 px-8 py-6 text-lg font-semibold rounded-xl backdrop-blur-sm transition-all"
                >
                  Se våre tjenester
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Right side - Service Icons Grid */}
          <div className="order-1 lg:order-2">
            <div className="grid grid-cols-4 sm:grid-cols-4 gap-3 sm:gap-4 lg:gap-5 max-w-md mx-auto lg:max-w-none">
              {serviceIcons.map((service, index) => (
                <ServiceIconCard
                  key={service.label}
                  Icon={service.Icon}
                  gradient={service.gradient}
                  label={service.label}
                  index={index}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}

export default HeroSection;
