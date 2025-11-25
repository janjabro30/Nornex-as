"use client";

import React, { useState } from "react";
import { Check, ChevronRight, ChevronLeft, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppStore } from "@/store";
import { getTranslation } from "@/lib/translations";
import { formatPrice } from "@/lib/utils";
import type { DeviceCondition } from "@/types";

interface BuybackFormData {
  deviceType: string;
  brand: string;
  model: string;
  condition: DeviceCondition;
  conditionNotes: string;
  serialNumber: string;
  name: string;
  email: string;
  phone: string;
}

const initialFormData: BuybackFormData = {
  deviceType: "",
  brand: "",
  model: "",
  condition: "GOOD",
  conditionNotes: "",
  serialNumber: "",
  name: "",
  email: "",
  phone: "",
};

// Base prices for estimation
const basePrices: Record<string, number> = {
  Laptop: 3000,
  Desktop: 2000,
  Monitor: 1000,
  Smartphone: 2500,
  Tablet: 1500,
  "Server": 5000,
  "Networking Equipment": 1500,
  Other: 500,
};

// Condition multipliers
const conditionMultipliers: Record<DeviceCondition, number> = {
  EXCELLENT: 0.7,
  GOOD: 0.5,
  FAIR: 0.3,
  POOR: 0.15,
  BROKEN: 0.05,
};

export function BuybackForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<BuybackFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { language } = useAppStore();
  const t = getTranslation(language);

  const deviceTypes = [
    { value: "Laptop", label: language === "no" ? "Bærbar PC" : "Laptop" },
    { value: "Desktop", label: language === "no" ? "Stasjonær PC" : "Desktop" },
    { value: "Monitor", label: language === "no" ? "Skjerm" : "Monitor" },
    { value: "Smartphone", label: language === "no" ? "Smarttelefon" : "Smartphone" },
    { value: "Tablet", label: language === "no" ? "Nettbrett" : "Tablet" },
    { value: "Server", label: "Server" },
    { value: "Networking Equipment", label: language === "no" ? "Nettverksutstyr" : "Networking Equipment" },
    { value: "Other", label: language === "no" ? "Annet" : "Other" },
  ];

  const conditions: { value: DeviceCondition; label: string }[] = [
    { value: "EXCELLENT", label: t.sellToUs.conditions.EXCELLENT },
    { value: "GOOD", label: t.sellToUs.conditions.GOOD },
    { value: "FAIR", label: t.sellToUs.conditions.FAIR },
    { value: "POOR", label: t.sellToUs.conditions.POOR },
    { value: "BROKEN", label: t.sellToUs.conditions.BROKEN },
  ];

  const calculateEstimate = (): number => {
    const basePrice = basePrices[formData.deviceType] || 500;
    const multiplier = conditionMultipliers[formData.condition];
    return Math.round(basePrice * multiplier);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const isStepValid = (): boolean => {
    switch (currentStep) {
      case 1:
        return !!formData.deviceType && !!formData.brand && !!formData.model;
      case 2:
        return !!formData.condition;
      case 3:
        return !!formData.name && !!formData.email;
      case 4:
        return true;
      default:
        return false;
    }
  };

  const steps = [
    { num: 1, label: t.sellToUs.form.step1 },
    { num: 2, label: t.sellToUs.form.step2 },
    { num: 3, label: t.sellToUs.form.step3 },
    { num: 4, label: t.sellToUs.form.step4 },
  ];

  if (isSubmitted) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="py-12 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {language === "no" ? "Forespørsel sendt!" : "Request Submitted!"}
          </h2>
          <p className="text-gray-600 mb-6">
            {language === "no"
              ? "Vi har mottatt din forespørsel og vil kontakte deg innen 24 timer med et tilbud."
              : "We have received your request and will contact you within 24 hours with a quote."}
          </p>
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-500 mb-1">{t.sellToUs.estimate.title}</p>
            <p className="text-3xl font-bold text-green-600">
              {formatPrice(calculateEstimate())}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              {t.sellToUs.estimate.disclaimer}
            </p>
          </div>
          <Button onClick={() => {
            setIsSubmitted(false);
            setCurrentStep(1);
            setFormData(initialFormData);
          }}>
            {language === "no" ? "Send ny forespørsel" : "Submit Another Request"}
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <React.Fragment key={step.num}>
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                    currentStep > step.num
                      ? "bg-green-600 text-white"
                      : currentStep === step.num
                      ? "bg-green-600 text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {currentStep > step.num ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    step.num
                  )}
                </div>
                <span
                  className={`text-xs mt-2 ${
                    currentStep >= step.num
                      ? "text-green-600 font-medium"
                      : "text-gray-400"
                  }`}
                >
                  {step.label}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`flex-1 h-1 mx-2 ${
                    currentStep > step.num ? "bg-green-600" : "bg-gray-200"
                  }`}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            {currentStep === 1 && t.sellToUs.form.step1}
            {currentStep === 2 && t.sellToUs.form.step2}
            {currentStep === 3 && t.sellToUs.form.step3}
            {currentStep === 4 && t.sellToUs.form.step4}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            {/* Step 1: Device Info */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t.sellToUs.form.deviceType} *
                  </label>
                  <select
                    name="deviceType"
                    value={formData.deviceType}
                    onChange={handleInputChange}
                    className="w-full h-10 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
                    required
                  >
                    <option value="">
                      {language === "no" ? "Velg enhetstype" : "Select device type"}
                    </option>
                    {deviceTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t.sellToUs.form.brand} *
                  </label>
                  <Input
                    name="brand"
                    value={formData.brand}
                    onChange={handleInputChange}
                    placeholder={language === "no" ? "f.eks. Apple, Dell, HP" : "e.g. Apple, Dell, HP"}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t.sellToUs.form.model} *
                  </label>
                  <Input
                    name="model"
                    value={formData.model}
                    onChange={handleInputChange}
                    placeholder={language === "no" ? "f.eks. MacBook Pro 2021" : "e.g. MacBook Pro 2021"}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t.sellToUs.form.serialNumber}
                  </label>
                  <Input
                    name="serialNumber"
                    value={formData.serialNumber}
                    onChange={handleInputChange}
                    placeholder={language === "no" ? "Serienummer (valgfritt)" : "Serial number (optional)"}
                  />
                </div>
              </div>
            )}

            {/* Step 2: Condition */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    {t.sellToUs.form.condition} *
                  </label>
                  <div className="space-y-2">
                    {conditions.map((condition) => (
                      <label
                        key={condition.value}
                        className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${
                          formData.condition === condition.value
                            ? "border-green-600 bg-green-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <input
                          type="radio"
                          name="condition"
                          value={condition.value}
                          checked={formData.condition === condition.value}
                          onChange={handleInputChange}
                          className="sr-only"
                        />
                        <div
                          className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                            formData.condition === condition.value
                              ? "border-green-600"
                              : "border-gray-300"
                          }`}
                        >
                          {formData.condition === condition.value && (
                            <div className="w-3 h-3 rounded-full bg-green-600" />
                          )}
                        </div>
                        <span className="text-sm">{condition.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t.sellToUs.form.conditionNotes}
                  </label>
                  <Textarea
                    name="conditionNotes"
                    value={formData.conditionNotes}
                    onChange={handleInputChange}
                    placeholder={
                      language === "no"
                        ? "Beskriv eventuelle problemer, skader eller mangler..."
                        : "Describe any issues, damage or defects..."
                    }
                    rows={4}
                  />
                </div>

                {/* Price Estimate */}
                {formData.deviceType && (
                  <div className="bg-green-50 rounded-lg p-4 mt-6">
                    <p className="text-sm text-gray-600 mb-1">{t.sellToUs.estimate.title}</p>
                    <p className="text-2xl font-bold text-green-600">
                      {formatPrice(calculateEstimate())}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {t.sellToUs.estimate.disclaimer}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Step 3: Contact Details */}
            {currentStep === 3 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t.sellToUs.form.name} *
                  </label>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder={language === "no" ? "Ditt fulle navn" : "Your full name"}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t.sellToUs.form.email} *
                  </label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder={language === "no" ? "din@epost.no" : "your@email.com"}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t.sellToUs.form.phone}
                  </label>
                  <Input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder={language === "no" ? "+47 123 45 678" : "+47 123 45 678"}
                  />
                </div>
              </div>
            )}

            {/* Step 4: Review */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-2">
                      {t.sellToUs.form.step1}
                    </h4>
                    <dl className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <dt className="text-gray-500">{t.sellToUs.form.deviceType}:</dt>
                        <dd className="text-gray-900">{formData.deviceType}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-gray-500">{t.sellToUs.form.brand}:</dt>
                        <dd className="text-gray-900">{formData.brand}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-gray-500">{t.sellToUs.form.model}:</dt>
                        <dd className="text-gray-900">{formData.model}</dd>
                      </div>
                    </dl>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-2">
                      {t.sellToUs.form.step2}
                    </h4>
                    <p className="text-sm text-gray-900">
                      {conditions.find((c) => c.value === formData.condition)?.label}
                    </p>
                    {formData.conditionNotes && (
                      <p className="text-sm text-gray-500 mt-2">
                        {formData.conditionNotes}
                      </p>
                    )}
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">
                    {t.sellToUs.form.step3}
                  </h4>
                  <dl className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <dt className="text-gray-500">{t.sellToUs.form.name}:</dt>
                      <dd className="text-gray-900">{formData.name}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-500">{t.sellToUs.form.email}:</dt>
                      <dd className="text-gray-900">{formData.email}</dd>
                    </div>
                    {formData.phone && (
                      <div className="flex justify-between">
                        <dt className="text-gray-500">{t.sellToUs.form.phone}:</dt>
                        <dd className="text-gray-900">{formData.phone}</dd>
                      </div>
                    )}
                  </dl>
                </div>

                <div className="bg-green-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">{t.sellToUs.estimate.title}</p>
                  <p className="text-3xl font-bold text-green-600">
                    {formatPrice(calculateEstimate())}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {t.sellToUs.estimate.disclaimer}
                  </p>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <Button
                type="button"
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === 1}
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                {t.sellToUs.form.back}
              </Button>

              {currentStep < 4 ? (
                <Button
                  type="button"
                  onClick={handleNext}
                  disabled={!isStepValid()}
                >
                  {t.sellToUs.form.next}
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <span className="animate-spin mr-2">⏳</span>
                      {language === "no" ? "Sender..." : "Submitting..."}
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      {t.sellToUs.form.submit}
                    </>
                  )}
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
