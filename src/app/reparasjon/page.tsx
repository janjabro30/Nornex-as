"use client";

import React, { useState } from "react";
import {
  Wrench,
  Smartphone,
  Laptop,
  Monitor,
  Tablet,
  Server,
  CheckCircle,
  Clock,
  Shield,
  MapPin,
  Phone,
  Mail,
  Upload,
  Send,
  ChevronRight,
  ChevronLeft,
  Building2,
  AlertCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useAppStore } from "@/store";

interface RepairFormData {
  // Device info
  deviceType: string;
  brand: string;
  model: string;
  serialNumber: string;
  // Problem description
  problemDescription: string;
  // Contact info
  customerType: "private" | "business";
  name: string;
  email: string;
  phone: string;
  companyName: string;
  orgNumber: string;
  // Delivery
  deliveryMethod: "dropoff" | "pickup";
  address: string;
  postalCode: string;
  city: string;
}

const initialFormData: RepairFormData = {
  deviceType: "",
  brand: "",
  model: "",
  serialNumber: "",
  problemDescription: "",
  customerType: "private",
  name: "",
  email: "",
  phone: "",
  companyName: "",
  orgNumber: "",
  deliveryMethod: "dropoff",
  address: "",
  postalCode: "",
  city: "",
};

export default function RepairPage() {
  const { language } = useAppStore();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<RepairFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof RepairFormData, string>>>({});

  const deviceTypes = [
    { value: "laptop", label: language === "no" ? "Bærbar PC" : "Laptop", icon: Laptop },
    { value: "desktop", label: language === "no" ? "Stasjonær PC" : "Desktop", icon: Monitor },
    { value: "smartphone", label: language === "no" ? "Smarttelefon" : "Smartphone", icon: Smartphone },
    { value: "tablet", label: language === "no" ? "Nettbrett" : "Tablet", icon: Tablet },
    { value: "server", label: "Server", icon: Server },
    { value: "other", label: language === "no" ? "Annet" : "Other", icon: Wrench },
  ];

  const repairServices = [
    {
      icon: Smartphone,
      title: language === "no" ? "Skjermbytte" : "Screen Replacement",
      description: language === "no" ? "For telefoner, nettbrett og bærbare" : "For phones, tablets and laptops",
      price: "fra 999 kr",
    },
    {
      icon: Laptop,
      title: language === "no" ? "Batteribytte" : "Battery Replacement",
      description: language === "no" ? "Forny batterilevetiden" : "Renew battery life",
      price: "fra 599 kr",
    },
    {
      icon: Server,
      title: language === "no" ? "Datarekonstruksjon" : "Data Recovery",
      description: language === "no" ? "Gjenoppretting av tapte data" : "Recovery of lost data",
      price: "fra 1499 kr",
    },
    {
      icon: Monitor,
      title: language === "no" ? "Programvarefeil" : "Software Issues",
      description: language === "no" ? "Virusfjering, OS-problemer" : "Virus removal, OS issues",
      price: "fra 499 kr",
    },
  ];

  const benefits = [
    {
      icon: CheckCircle,
      title: language === "no" ? "Gratis feilsøking" : "Free Diagnostics",
      description: language === "no" ? "Vi undersøker enheten gratis" : "We examine the device for free",
    },
    {
      icon: Clock,
      title: language === "no" ? "Rask service" : "Fast Service",
      description: language === "no" ? "De fleste reparasjoner innen 1-3 dager" : "Most repairs within 1-3 days",
    },
    {
      icon: Shield,
      title: language === "no" ? "3 mnd garanti" : "3 Month Warranty",
      description: language === "no" ? "Garanti på alle reparasjoner" : "Warranty on all repairs",
    },
    {
      icon: Building2,
      title: language === "no" ? "Bedriftsavtaler" : "Business Agreements",
      description: language === "no" ? "Skreddersydde serviceavtaler" : "Tailored service agreements",
    },
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof RepairFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Partial<Record<keyof RepairFormData, string>> = {};

    if (step === 1) {
      if (!formData.deviceType) {
        newErrors.deviceType = language === "no" ? "Velg enhetstype" : "Select device type";
      }
      if (!formData.brand) {
        newErrors.brand = language === "no" ? "Merke er påkrevd" : "Brand is required";
      }
      if (!formData.model) {
        newErrors.model = language === "no" ? "Modell er påkrevd" : "Model is required";
      }
    }

    if (step === 2) {
      if (!formData.problemDescription || formData.problemDescription.length < 20) {
        newErrors.problemDescription =
          language === "no"
            ? "Beskrivelse må være minst 20 tegn"
            : "Description must be at least 20 characters";
      }
    }

    if (step === 3) {
      if (!formData.name) {
        newErrors.name = language === "no" ? "Navn er påkrevd" : "Name is required";
      }
      if (!formData.email) {
        newErrors.email = language === "no" ? "E-post er påkrevd" : "Email is required";
      }
      if (formData.customerType === "business") {
        if (!formData.companyName) {
          newErrors.companyName = language === "no" ? "Firmanavn er påkrevd" : "Company name is required";
        }
      }
      if (formData.deliveryMethod === "pickup") {
        if (!formData.address) {
          newErrors.address = language === "no" ? "Adresse er påkrevd" : "Address is required";
        }
        if (!formData.postalCode) {
          newErrors.postalCode = language === "no" ? "Postnummer er påkrevd" : "Postal code is required";
        }
        if (!formData.city) {
          newErrors.city = language === "no" ? "By er påkrevd" : "City is required";
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep) && currentStep < 4) {
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
    if (!validateStep(currentStep)) return;

    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const steps = [
    { num: 1, label: language === "no" ? "Enhet" : "Device" },
    { num: 2, label: language === "no" ? "Problem" : "Problem" },
    { num: 3, label: language === "no" ? "Kontakt" : "Contact" },
    { num: 4, label: language === "no" ? "Bekreft" : "Confirm" },
  ];

  if (isSubmitted) {
    return (
      <div className="bg-gray-50 min-h-screen py-16">
        <div className="container mx-auto px-4">
          <Card className="max-w-2xl mx-auto">
            <CardContent className="py-12 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {language === "no" ? "Forespørsel mottatt!" : "Request Received!"}
              </h2>
              <p className="text-gray-600 mb-6">
                {language === "no"
                  ? "Vi har mottatt din reparasjonsforespørsel og vil kontakte deg innen 24 timer."
                  : "We have received your repair request and will contact you within 24 hours."}
              </p>
              <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
                <h3 className="font-semibold text-gray-900 mb-2">
                  {language === "no" ? "Hva skjer nå?" : "What happens now?"}
                </h3>
                <ol className="list-decimal list-inside text-gray-600 text-sm space-y-1">
                  <li>{language === "no" ? "Vi vurderer din forespørsel" : "We review your request"}</li>
                  <li>{language === "no" ? "Du mottar en e-post med tilbud" : "You receive an email with a quote"}</li>
                  <li>{language === "no" ? "Lever eller send enheten til oss" : "Deliver or send the device to us"}</li>
                  <li>{language === "no" ? "Vi utfører reparasjonen" : "We perform the repair"}</li>
                  <li>{language === "no" ? "Du henter eller mottar enheten" : "You pick up or receive the device"}</li>
                </ol>
              </div>
              <Button
                onClick={() => {
                  setIsSubmitted(false);
                  setCurrentStep(1);
                  setFormData(initialFormData);
                }}
              >
                {language === "no" ? "Send ny forespørsel" : "Submit another request"}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-600 via-green-700 to-emerald-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <Badge className="bg-white/20 text-white mb-4">
            {language === "no" ? "Reparasjonstjenester" : "Repair Services"}
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {language === "no" ? "Profesjonell IT-reparasjon" : "Professional IT Repair"}
          </h1>
          <p className="text-xl text-green-100 max-w-2xl mx-auto">
            {language === "no"
              ? "Rask og pålitelig reparasjon av alle typer IT-utstyr. Gratis feilsøking og 3 måneders garanti."
              : "Fast and reliable repair of all types of IT equipment. Free diagnostics and 3 month warranty."}
          </p>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-12 -mt-8 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center">
                <CardContent className="py-6">
                  <benefit.icon className="w-10 h-10 text-green-600 mx-auto mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-1">{benefit.title}</h3>
                  <p className="text-sm text-gray-500">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Repair Form */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
              {language === "no" ? "Send inn reparasjonsforespørsel" : "Submit Repair Request"}
            </h2>

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
                        {currentStep > step.num ? <CheckCircle className="w-5 h-5" /> : step.num}
                      </div>
                      <span
                        className={`text-xs mt-2 ${
                          currentStep >= step.num ? "text-green-600 font-medium" : "text-gray-400"
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
                  {currentStep === 1 && (language === "no" ? "Enhetsinformasjon" : "Device Information")}
                  {currentStep === 2 && (language === "no" ? "Beskriv problemet" : "Describe the Problem")}
                  {currentStep === 3 && (language === "no" ? "Kontaktinformasjon" : "Contact Information")}
                  {currentStep === 4 && (language === "no" ? "Bekreft forespørsel" : "Confirm Request")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit}>
                  {/* Step 1: Device Info */}
                  {currentStep === 1 && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {language === "no" ? "Enhetstype *" : "Device Type *"}
                        </label>
                        <div className="grid grid-cols-3 gap-3">
                          {deviceTypes.map((type) => (
                            <button
                              key={type.value}
                              type="button"
                              onClick={() => setFormData((prev) => ({ ...prev, deviceType: type.value }))}
                              className={`p-4 border rounded-lg text-center transition-all ${
                                formData.deviceType === type.value
                                  ? "border-green-600 bg-green-50"
                                  : "border-gray-200 hover:border-gray-300"
                              }`}
                            >
                              <type.icon className="w-8 h-8 mx-auto mb-2 text-gray-600" />
                              <span className="text-sm font-medium">{type.label}</span>
                            </button>
                          ))}
                        </div>
                        {errors.deviceType && (
                          <p className="text-red-500 text-sm mt-1">{errors.deviceType}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {language === "no" ? "Merke *" : "Brand *"}
                        </label>
                        <Input
                          name="brand"
                          value={formData.brand}
                          onChange={handleInputChange}
                          placeholder={language === "no" ? "f.eks. Apple, Dell, HP" : "e.g. Apple, Dell, HP"}
                        />
                        {errors.brand && <p className="text-red-500 text-sm mt-1">{errors.brand}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {language === "no" ? "Modell *" : "Model *"}
                        </label>
                        <Input
                          name="model"
                          value={formData.model}
                          onChange={handleInputChange}
                          placeholder={language === "no" ? "f.eks. MacBook Pro 2021" : "e.g. MacBook Pro 2021"}
                        />
                        {errors.model && <p className="text-red-500 text-sm mt-1">{errors.model}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {language === "no" ? "Serienummer (valgfritt)" : "Serial Number (optional)"}
                        </label>
                        <Input
                          name="serialNumber"
                          value={formData.serialNumber}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  )}

                  {/* Step 2: Problem Description */}
                  {currentStep === 2 && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {language === "no" ? "Beskriv problemet * (minst 20 tegn)" : "Describe the problem * (min 20 characters)"}
                        </label>
                        <Textarea
                          name="problemDescription"
                          value={formData.problemDescription}
                          onChange={handleInputChange}
                          placeholder={
                            language === "no"
                              ? "Beskriv problemet så detaljert som mulig. Når startet det? Hva skjer?"
                              : "Describe the problem as detailed as possible. When did it start? What happens?"
                          }
                          rows={6}
                        />
                        <div className="flex justify-between mt-1">
                          {errors.problemDescription ? (
                            <p className="text-red-500 text-sm">{errors.problemDescription}</p>
                          ) : (
                            <span />
                          )}
                          <span className="text-xs text-gray-400">
                            {formData.problemDescription.length}/20{" "}
                            {language === "no" ? "tegn minimum" : "characters minimum"}
                          </span>
                        </div>
                      </div>

                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <div className="flex items-start space-x-3">
                          <Upload className="w-5 h-5 text-blue-600 mt-0.5" />
                          <div>
                            <p className="font-medium text-blue-900">
                              {language === "no" ? "Legg ved bilder (valgfritt)" : "Attach images (optional)"}
                            </p>
                            <p className="text-sm text-blue-700">
                              {language === "no"
                                ? "Last opp opptil 5 bilder som viser problemet"
                                : "Upload up to 5 images showing the problem"}
                            </p>
                            <Button type="button" variant="outline" size="sm" className="mt-2">
                              <Upload className="w-4 h-4 mr-2" />
                              {language === "no" ? "Velg filer" : "Choose files"}
                            </Button>
                          </div>
                        </div>
                      </div>

                      {/* Warranty Info */}
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <div className="flex items-start space-x-3">
                          <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                          <div>
                            <p className="font-medium text-yellow-900">
                              {language === "no" ? "Garantiinformasjon" : "Warranty Information"}
                            </p>
                            <p className="text-sm text-yellow-700">
                              {language === "no"
                                ? "Hvis enheten er under garanti, ta med kvittering eller garantibevis. Vi reparerer gratis hvis feilen dekkes av garanti."
                                : "If the device is under warranty, bring the receipt or warranty certificate. We repair free of charge if the fault is covered by warranty."}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Contact Info */}
                  {currentStep === 3 && (
                    <div className="space-y-4">
                      {/* Customer Type */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {language === "no" ? "Kundetype" : "Customer Type"}
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                          <button
                            type="button"
                            onClick={() => setFormData((prev) => ({ ...prev, customerType: "private" }))}
                            className={`p-4 border rounded-lg text-center transition-all ${
                              formData.customerType === "private"
                                ? "border-green-600 bg-green-50"
                                : "border-gray-200 hover:border-gray-300"
                            }`}
                          >
                            <span className="font-medium">
                              {language === "no" ? "Privatkunde" : "Private Customer"}
                            </span>
                          </button>
                          <button
                            type="button"
                            onClick={() => setFormData((prev) => ({ ...prev, customerType: "business" }))}
                            className={`p-4 border rounded-lg text-center transition-all ${
                              formData.customerType === "business"
                                ? "border-green-600 bg-green-50"
                                : "border-gray-200 hover:border-gray-300"
                            }`}
                          >
                            <span className="font-medium">
                              {language === "no" ? "Bedriftskunde" : "Business Customer"}
                            </span>
                          </button>
                        </div>
                      </div>

                      {/* Business fields */}
                      {formData.customerType === "business" && (
                        <>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              {language === "no" ? "Firmanavn *" : "Company Name *"}
                            </label>
                            <Input
                              name="companyName"
                              value={formData.companyName}
                              onChange={handleInputChange}
                            />
                            {errors.companyName && (
                              <p className="text-red-500 text-sm mt-1">{errors.companyName}</p>
                            )}
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              {language === "no" ? "Org.nummer" : "Org. Number"}
                            </label>
                            <Input
                              name="orgNumber"
                              value={formData.orgNumber}
                              onChange={handleInputChange}
                              placeholder="XXX XXX XXX"
                            />
                          </div>
                        </>
                      )}

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {language === "no" ? "Navn *" : "Name *"}
                        </label>
                        <Input
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                        />
                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            {language === "no" ? "E-post *" : "Email *"}
                          </label>
                          <Input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                          />
                          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            {language === "no" ? "Telefon" : "Phone"}
                          </label>
                          <Input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>

                      {/* Delivery Method */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {language === "no" ? "Leveringsmetode" : "Delivery Method"}
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                          <button
                            type="button"
                            onClick={() => setFormData((prev) => ({ ...prev, deliveryMethod: "dropoff" }))}
                            className={`p-4 border rounded-lg text-left transition-all ${
                              formData.deliveryMethod === "dropoff"
                                ? "border-green-600 bg-green-50"
                                : "border-gray-200 hover:border-gray-300"
                            }`}
                          >
                            <MapPin className="w-5 h-5 mb-2 text-gray-600" />
                            <span className="font-medium block">
                              {language === "no" ? "Leverer selv" : "Drop off"}
                            </span>
                            <span className="text-xs text-gray-500">Brynsveien 18, Oslo</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => setFormData((prev) => ({ ...prev, deliveryMethod: "pickup" }))}
                            className={`p-4 border rounded-lg text-left transition-all ${
                              formData.deliveryMethod === "pickup"
                                ? "border-green-600 bg-green-50"
                                : "border-gray-200 hover:border-gray-300"
                            }`}
                          >
                            <Building2 className="w-5 h-5 mb-2 text-gray-600" />
                            <span className="font-medium block">
                              {language === "no" ? "Henting" : "Pickup"}
                            </span>
                            <span className="text-xs text-gray-500">
                              {language === "no" ? "Gratis for bedrifter i Oslo" : "Free for businesses in Oslo"}
                            </span>
                          </button>
                        </div>
                      </div>

                      {/* Pickup address */}
                      {formData.deliveryMethod === "pickup" && (
                        <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              {language === "no" ? "Adresse *" : "Address *"}
                            </label>
                            <Input
                              name="address"
                              value={formData.address}
                              onChange={handleInputChange}
                            />
                            {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                {language === "no" ? "Postnummer *" : "Postal Code *"}
                              </label>
                              <Input
                                name="postalCode"
                                value={formData.postalCode}
                                onChange={handleInputChange}
                              />
                              {errors.postalCode && (
                                <p className="text-red-500 text-sm mt-1">{errors.postalCode}</p>
                              )}
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                {language === "no" ? "By *" : "City *"}
                              </label>
                              <Input
                                name="city"
                                value={formData.city}
                                onChange={handleInputChange}
                              />
                              {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Step 4: Review */}
                  {currentStep === 4 && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-gray-50 rounded-lg p-4">
                          <h4 className="font-medium text-gray-900 mb-2">
                            {language === "no" ? "Enhet" : "Device"}
                          </h4>
                          <dl className="space-y-1 text-sm">
                            <div className="flex justify-between">
                              <dt className="text-gray-500">{language === "no" ? "Type:" : "Type:"}</dt>
                              <dd className="text-gray-900">
                                {deviceTypes.find((t) => t.value === formData.deviceType)?.label}
                              </dd>
                            </div>
                            <div className="flex justify-between">
                              <dt className="text-gray-500">{language === "no" ? "Merke:" : "Brand:"}</dt>
                              <dd className="text-gray-900">{formData.brand}</dd>
                            </div>
                            <div className="flex justify-between">
                              <dt className="text-gray-500">{language === "no" ? "Modell:" : "Model:"}</dt>
                              <dd className="text-gray-900">{formData.model}</dd>
                            </div>
                          </dl>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-4">
                          <h4 className="font-medium text-gray-900 mb-2">
                            {language === "no" ? "Kontakt" : "Contact"}
                          </h4>
                          <dl className="space-y-1 text-sm">
                            <div className="flex justify-between">
                              <dt className="text-gray-500">{language === "no" ? "Navn:" : "Name:"}</dt>
                              <dd className="text-gray-900">{formData.name}</dd>
                            </div>
                            <div className="flex justify-between">
                              <dt className="text-gray-500">{language === "no" ? "E-post:" : "Email:"}</dt>
                              <dd className="text-gray-900">{formData.email}</dd>
                            </div>
                            {formData.customerType === "business" && (
                              <div className="flex justify-between">
                                <dt className="text-gray-500">{language === "no" ? "Firma:" : "Company:"}</dt>
                                <dd className="text-gray-900">{formData.companyName}</dd>
                              </div>
                            )}
                          </dl>
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-medium text-gray-900 mb-2">
                          {language === "no" ? "Problembeskrivelse" : "Problem Description"}
                        </h4>
                        <p className="text-sm text-gray-600">{formData.problemDescription}</p>
                      </div>

                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <h4 className="font-medium text-green-900 mb-2">
                          {language === "no" ? "Neste steg" : "Next Steps"}
                        </h4>
                        <p className="text-sm text-green-700">
                          {language === "no"
                            ? "Etter at du sender inn forespørselen, vil vi kontakte deg innen 24 timer med et prisestimat. Feilsøking er alltid gratis."
                            : "After you submit the request, we will contact you within 24 hours with a price estimate. Diagnostics is always free."}
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
                      {language === "no" ? "Tilbake" : "Back"}
                    </Button>

                    {currentStep < 4 ? (
                      <Button type="button" onClick={handleNext}>
                        {language === "no" ? "Neste" : "Next"}
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
                            {language === "no" ? "Send forespørsel" : "Submit Request"}
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Services & Pricing */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            {language === "no" ? "Vanlige reparasjoner" : "Common Repairs"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {repairServices.map((service, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="py-6">
                  <service.icon className="w-10 h-10 text-green-600 mx-auto mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-1">{service.title}</h3>
                  <p className="text-sm text-gray-500 mb-3">{service.description}</p>
                  <Badge variant="secondary">{service.price}</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">
            {language === "no" ? "Besøk oss" : "Visit Us"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="flex flex-col items-center">
              <MapPin className="w-8 h-8 text-green-500 mb-2" />
              <p className="text-gray-300">
                Brynsveien 18<br />
                0667 Oslo, Norway
              </p>
            </div>
            <div className="flex flex-col items-center">
              <Phone className="w-8 h-8 text-green-500 mb-2" />
              <a href="tel:+4712345678" className="text-gray-300 hover:text-green-500">
                +47 123 45 678
              </a>
            </div>
            <div className="flex flex-col items-center">
              <Mail className="w-8 h-8 text-green-500 mb-2" />
              <a href="mailto:repairs@nornex.no" className="text-gray-300 hover:text-green-500">
                repairs@nornex.no
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
