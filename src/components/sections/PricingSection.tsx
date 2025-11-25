"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useLanguage } from "@/hooks/useLanguage";
import { Button, Card } from "@/components/ui";
import { Check, X, Sparkles } from "lucide-react";

interface PricingPlan {
  id: string;
  nameNo: string;
  nameEn: string;
  priceMonthly: number;
  priceYearly: number;
  descriptionNo: string;
  descriptionEn: string;
  features: { textNo: string; textEn: string; included: boolean }[];
  popular?: boolean;
}

const pricingPlans: PricingPlan[] = [
  {
    id: "basic",
    nameNo: "Basis",
    nameEn: "Basic",
    priceMonthly: 2990,
    priceYearly: 2392,
    descriptionNo: "Perfekt for små bedrifter som trenger grunnleggende IT-support.",
    descriptionEn: "Perfect for small businesses that need basic IT support.",
    features: [
      { textNo: "E-post support", textEn: "Email support", included: true },
      { textNo: "Fjernhjelp i arbeidstid", textEn: "Remote support during business hours", included: true },
      { textNo: "Månedlig systemsjekk", textEn: "Monthly system check", included: true },
      { textNo: "Basis sikkerhet", textEn: "Basic security", included: true },
      { textNo: "24/7 Support", textEn: "24/7 Support", included: false },
      { textNo: "Dedikert kontaktperson", textEn: "Dedicated contact person", included: false },
      { textNo: "Prioritert responstid", textEn: "Priority response time", included: false },
    ],
  },
  {
    id: "professional",
    nameNo: "Profesjonell",
    nameEn: "Professional",
    priceMonthly: 5990,
    priceYearly: 4792,
    descriptionNo: "For voksende bedrifter med høyere krav til tilgjengelighet og sikkerhet.",
    descriptionEn: "For growing businesses with higher availability and security requirements.",
    popular: true,
    features: [
      { textNo: "Alt i Basis", textEn: "Everything in Basic", included: true },
      { textNo: "24/7 Support", textEn: "24/7 Support", included: true },
      { textNo: "Avansert cybersikkerhet", textEn: "Advanced cybersecurity", included: true },
      { textNo: "Ukentlig systemsjekk", textEn: "Weekly system check", included: true },
      { textNo: "Cloud backup", textEn: "Cloud backup", included: true },
      { textNo: "Dedikert kontaktperson", textEn: "Dedicated contact person", included: true },
      { textNo: "Prioritert responstid", textEn: "Priority response time", included: false },
    ],
  },
  {
    id: "enterprise",
    nameNo: "Enterprise",
    nameEn: "Enterprise",
    priceMonthly: 12990,
    priceYearly: 10392,
    descriptionNo: "Komplett IT-løsning for store bedrifter med komplekse behov.",
    descriptionEn: "Complete IT solution for large businesses with complex needs.",
    features: [
      { textNo: "Alt i Profesjonell", textEn: "Everything in Professional", included: true },
      { textNo: "Dedikert IT-team", textEn: "Dedicated IT team", included: true },
      { textNo: "Prioritert responstid (15 min)", textEn: "Priority response time (15 min)", included: true },
      { textNo: "Ubegrenset support", textEn: "Unlimited support", included: true },
      { textNo: "Tilpassede løsninger", textEn: "Custom solutions", included: true },
      { textNo: "Kvartalsvis strategimøte", textEn: "Quarterly strategy meeting", included: true },
      { textNo: "SLA garanti", textEn: "SLA guarantee", included: true },
    ],
  },
];

export function PricingSection() {
  const { language, t } = useLanguage();
  const [isYearly, setIsYearly] = useState(false);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section ref={ref} className="py-24 bg-white" id="pricing">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t.pricing.title}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            {t.pricing.subtitle}
          </p>

          {/* Toggle */}
          <div className="flex items-center justify-center gap-4">
            <span className={`font-medium ${!isYearly ? "text-gray-900" : "text-gray-500"}`}>
              {t.pricing.monthly}
            </span>
            <button
              onClick={() => setIsYearly(!isYearly)}
              className={`relative w-16 h-8 rounded-full transition-colors ${
                isYearly ? "bg-blue-600" : "bg-gray-300"
              }`}
            >
              <motion.div
                className="absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow"
                animate={{ x: isYearly ? 32 : 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            </button>
            <span className={`font-medium ${isYearly ? "text-gray-900" : "text-gray-500"}`}>
              {t.pricing.yearly}
            </span>
            {isYearly && (
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full"
              >
                {t.pricing.save}
              </motion.span>
            )}
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className={`relative ${plan.popular ? "md:-mt-4 md:mb-4" : ""}`}
            >
              {plan.popular && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-medium rounded-full flex items-center gap-1 z-10"
                >
                  <Sparkles className="h-4 w-4" />
                  {t.pricing.mostPopular}
                </motion.div>
              )}
              <Card
                className={`h-full p-8 ${
                  plan.popular
                    ? "border-2 border-blue-500 shadow-xl"
                    : "border border-gray-200"
                }`}
              >
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {language === "no" ? plan.nameNo : plan.nameEn}
                  </h3>
                  <p className="text-gray-500 text-sm">
                    {language === "no" ? plan.descriptionNo : plan.descriptionEn}
                  </p>
                </div>

                <div className="mb-6">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={isYearly ? "yearly" : "monthly"}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-baseline gap-1"
                    >
                      <span className="text-4xl font-bold text-gray-900">
                        {isYearly ? plan.priceYearly : plan.priceMonthly}
                      </span>
                      <span className="text-gray-500">kr{t.pricing.perMonth}</span>
                    </motion.div>
                  </AnimatePresence>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li
                      key={i}
                      className={`flex items-center gap-3 ${
                        feature.included ? "text-gray-700" : "text-gray-400"
                      }`}
                    >
                      {feature.included ? (
                        <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                      ) : (
                        <X className="h-5 w-5 text-gray-300 flex-shrink-0" />
                      )}
                      <span className="text-sm">
                        {language === "no" ? feature.textNo : feature.textEn}
                      </span>
                    </li>
                  ))}
                </ul>

                <Button
                  variant={plan.popular ? "default" : "secondary"}
                  className="w-full"
                >
                  {t.pricing.getStarted}
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Custom Quote CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-12"
        >
          <p className="text-gray-600 mb-4">
            {language === "no"
              ? "Trenger du en skreddersydd løsning?"
              : "Need a customized solution?"}
          </p>
          <Button variant="outline">
            {t.pricing.contact}
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
