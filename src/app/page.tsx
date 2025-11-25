"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  Leaf,
  Shield,
  Award,
  Headphones,
  Recycle,
  TrendingUp,
  Package,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ProductCard } from "@/components/shop";
import { useAppStore } from "@/store";
import { getTranslation } from "@/lib/translations";
import { mockProducts, totalEnvironmentalImpact } from "@/lib/mock-data";

export default function HomePage() {
  const { language } = useAppStore();
  const t = getTranslation(language);

  const featuredProducts = mockProducts.filter((p) => p.isFeatured).slice(0, 4);

  const features = [
    {
      icon: Award,
      title: t.home.features.quality.title,
      description: t.home.features.quality.description,
    },
    {
      icon: Leaf,
      title: t.home.features.eco.title,
      description: t.home.features.eco.description,
    },
    {
      icon: Shield,
      title: t.home.features.warranty.title,
      description: t.home.features.warranty.description,
    },
    {
      icon: Headphones,
      title: t.home.features.support.title,
      description: t.home.features.support.description,
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-600 via-green-700 to-emerald-800 text-white">
        <div className="absolute inset-0 bg-black/10" />
        <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
              {t.home.hero.title}
            </h1>
            <p className="text-xl md:text-2xl text-green-100 mb-8">
              {t.home.hero.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/nettbutikk">
                <Button
                  size="lg"
                  className="bg-white text-green-700 hover:bg-green-50"
                >
                  {t.home.hero.cta}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/selg-til-oss">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10"
                >
                  <Recycle className="mr-2 w-5 h-5" />
                  {t.home.hero.sellCta}
                </Button>
              </Link>
            </div>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* Impact Stats */}
      <section className="py-12 bg-gray-50 -mt-8 relative z-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="text-center">
              <CardContent className="py-6">
                <Package className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <p className="text-3xl font-bold text-gray-900">
                  {totalEnvironmentalImpact.devicesRecycled.toLocaleString()}+
                </p>
                <p className="text-sm text-gray-500">
                  {language === "no" ? "Enheter resirkulert" : "Devices Recycled"}
                </p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="py-6">
                <Leaf className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <p className="text-3xl font-bold text-gray-900">
                  {totalEnvironmentalImpact.co2SavedTonnes}+
                </p>
                <p className="text-sm text-gray-500">
                  {language === "no" ? "Tonn CO₂ spart" : "Tonnes CO₂ Saved"}
                </p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="py-6">
                <Recycle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <p className="text-3xl font-bold text-gray-900">
                  {(totalEnvironmentalImpact.eWasteDivertedKg / 1000).toFixed(0)}+
                </p>
                <p className="text-sm text-gray-500">
                  {language === "no" ? "Tonn e-avfall avledet" : "Tonnes E-Waste Diverted"}
                </p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="py-6">
                <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <p className="text-3xl font-bold text-gray-900">
                  {(totalEnvironmentalImpact.treesEquivalent / 1000).toFixed(0)}K+
                </p>
                <p className="text-sm text-gray-500">
                  {language === "no" ? "Trær tilsvarende" : "Trees Equivalent"}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {language === "no" ? "Hvorfor velge Nornex?" : "Why Choose Nornex?"}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {language === "no"
                ? "Vi kombinerer kvalitet, bærekraft og profesjonell service for å gi deg den beste opplevelsen."
                : "We combine quality, sustainability, and professional service to give you the best experience."}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              {language === "no" ? "Utvalgte produkter" : "Featured Products"}
            </h2>
            <Link href="/nettbutikk">
              <Button variant="outline">
                {language === "no" ? "Se alle" : "View All"}
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-green-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            {language === "no"
              ? "Har du brukt IT-utstyr?"
              : "Have Used IT Equipment?"}
          </h2>
          <p className="text-green-100 text-lg mb-8 max-w-2xl mx-auto">
            {language === "no"
              ? "Få betalt for ditt gamle utstyr og bidra til en sirkulær økonomi. Vi tilbyr konkurransedyktige priser og gratis henting."
              : "Get paid for your old equipment and contribute to a circular economy. We offer competitive prices and free pickup."}
          </p>
          <Link href="/selg-til-oss">
            <Button
              size="lg"
              className="bg-white text-green-700 hover:bg-green-50"
            >
              <Recycle className="mr-2 w-5 h-5" />
              {language === "no" ? "Få et tilbud nå" : "Get a Quote Now"}
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
