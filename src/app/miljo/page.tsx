"use client";

import React, { useEffect, useState } from "react";
import {
  Leaf,
  Recycle,
  Award,
  TreePine,
  Laptop,
  Monitor,
  Smartphone,
  Printer,
  HardDrive,
  Wifi,
  Package,
  Truck,
  CheckCircle,
  RefreshCw,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAppStore } from "@/store";
import { getTranslation } from "@/lib/translations";
import { totalEnvironmentalImpact, mockCertifications } from "@/lib/mock-data";

// Animated counter component
function AnimatedCounter({
  value,
  suffix = "",
  duration = 2000,
}: {
  value: number;
  suffix?: string;
  duration?: number;
}) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      setDisplayValue(Math.floor(progress * value));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [value, duration]);

  return (
    <span>
      {displayValue.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function EnvironmentPage() {
  const { language } = useAppStore();
  const t = getTranslation(language);

  const impactStats = [
    {
      icon: Package,
      value: totalEnvironmentalImpact.devicesRecycled,
      label: t.environment.impact.devicesRecycled,
      suffix: "+",
    },
    {
      icon: Leaf,
      value: totalEnvironmentalImpact.co2SavedTonnes,
      label: t.environment.impact.co2Saved,
      suffix: "+",
    },
    {
      icon: Recycle,
      value: totalEnvironmentalImpact.eWasteDivertedKg,
      label: t.environment.impact.eWasteDiverted,
      suffix: "",
    },
    {
      icon: TreePine,
      value: totalEnvironmentalImpact.treesEquivalent,
      label: t.environment.impact.treesEquivalent,
      suffix: "+",
    },
  ];

  const recyclingSteps = [
    {
      icon: Truck,
      title: t.environment.process.step1.title,
      description: t.environment.process.step1.description,
    },
    {
      icon: CheckCircle,
      title: t.environment.process.step2.title,
      description: t.environment.process.step2.description,
    },
    {
      icon: RefreshCw,
      title: t.environment.process.step3.title,
      description: t.environment.process.step3.description,
    },
    {
      icon: Package,
      title: t.environment.process.step4.title,
      description: t.environment.process.step4.description,
    },
  ];

  const acceptedItems = [
    { icon: Laptop, label: t.environment.accepts.items[0] },
    { icon: Monitor, label: t.environment.accepts.items[1] },
    { icon: Monitor, label: t.environment.accepts.items[2] },
    { icon: Smartphone, label: t.environment.accepts.items[3] },
    { icon: Wifi, label: t.environment.accepts.items[4] },
    { icon: HardDrive, label: t.environment.accepts.items[5] },
    { icon: Printer, label: t.environment.accepts.items[6] },
    { icon: Package, label: t.environment.accepts.items[7] },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-600 via-green-700 to-emerald-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <Badge className="bg-white/20 text-white mb-4">
            {language === "no" ? "Vårt miljøløfte" : "Our Environmental Promise"}
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {t.environment.title}
          </h1>
          <p className="text-xl text-green-100 max-w-2xl mx-auto">
            {t.environment.subtitle}
          </p>
        </div>
      </section>

      {/* Impact Dashboard */}
      <section className="py-16 -mt-10 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {impactStats.map((stat, index) => (
              <Card key={index} className="text-center animate-count-up">
                <CardContent className="py-8">
                  <stat.icon className="w-12 h-12 text-green-600 mx-auto mb-4" />
                  <p className="text-4xl font-bold text-gray-900 mb-2">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 4-Step Recycling Process */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            {t.environment.process.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {recyclingSteps.map((step, index) => (
              <div key={index} className="relative">
                {/* Connector line */}
                {index < recyclingSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-green-200 -translate-x-1/2 z-0" />
                )}
                <Card className="relative z-10 text-center hover:shadow-lg transition-shadow">
                  <CardContent className="py-8">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 relative">
                      <step.icon className="w-8 h-8 text-green-600" />
                      <span className="absolute -top-2 -right-2 w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 text-sm">{step.description}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Accept */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            {t.environment.accepts.title}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {acceptedItems.map((item, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-lg hover:border-green-300 transition-all cursor-pointer"
              >
                <CardContent className="py-6">
                  <item.icon className="w-10 h-10 text-green-600 mx-auto mb-3" />
                  <p className="text-sm font-medium text-gray-700">{item.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            {t.environment.certifications.title}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {mockCertifications.map((cert) => (
              <Card
                key={cert.id}
                className="text-center hover:shadow-lg transition-shadow"
              >
                <CardHeader className="pb-2">
                  <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Award className="w-10 h-10 text-green-600" />
                  </div>
                  <CardTitle className="text-lg">
                    {language === "no" ? cert.nameNo : cert.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">
                    {language === "no" ? cert.descriptionNo : cert.description}
                  </p>
                  <p className="text-xs text-gray-400 mt-2">
                    {language === "no" ? "Utsteder" : "Issuer"}: {cert.issuer}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-green-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            {language === "no"
              ? "Bli med på vår miljøreise"
              : "Join Our Environmental Journey"}
          </h2>
          <p className="text-green-100 text-lg mb-8 max-w-2xl mx-auto">
            {language === "no"
              ? "Hver enhet vi resirkulerer bidrar til en grønnere fremtid. Ta del i vår sirkulære økonomi."
              : "Every device we recycle contributes to a greener future. Be part of our circular economy."}
          </p>
        </div>
      </section>
    </div>
  );
}
