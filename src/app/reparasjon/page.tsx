"use client";

import React, { useState } from "react";
import {
  Wrench,
  Smartphone,
  Laptop,
  Monitor,
  Tablet,
  CheckCircle,
  Clock,
  Shield,
  MapPin,
  Phone,
  Mail,
  Send,
  ChevronRight,
  ChevronLeft,
  Building2,
  Zap,
  Award,
  FileSearch,
  Users,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useAppStore } from "@/store";
import { BRANDS, REPAIR_TYPES } from "@/lib/constants/form-options";

interface RepairFormData {
  deviceType: string;
  brand: string;
  model: string;
  serialNumber: string;
  quantity: number;
  problemDescription: string;
  repairType: string;
  urgency: "standard" | "express";
  customerType: "private" | "business";
  name: string;
  email: string;
  phone: string;
  companyName: string;
  orgNumber: string;
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
  quantity: 1,
  problemDescription: "",
  repairType: "",
  urgency: "standard",
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
  useAppStore();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<RepairFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [confirmationNumber, setConfirmationNumber] = useState("");
  const [errors, setErrors] = useState<Partial<Record<keyof RepairFormData, string>>>({});

  const deviceTypes = [
    { value: "laptop", label: "Laptop", icon: Laptop },
    { value: "desktop", label: "Desktop", icon: Monitor },
    { value: "tablet", label: "Nettbrett", icon: Tablet },
    { value: "telefon", label: "Telefon", icon: Smartphone },
    { value: "skjerm", label: "Skjerm", icon: Monitor },
    { value: "annet", label: "Annet", icon: Wrench },
  ];

  const getEstimatedTime = () => {
    return formData.urgency === "express" ? "1-2 virkedager" : "3-5 virkedager";
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof RepairFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Partial<Record<keyof RepairFormData, string>> = {};

    if (step === 1) {
      if (!formData.deviceType) {
        newErrors.deviceType = "Velg enhetstype";
      }
      if (!formData.brand) {
        newErrors.brand = "Merke er påkrevd";
      }
      if (!formData.model) {
        newErrors.model = "Modell er påkrevd";
      }
      if (!formData.problemDescription || formData.problemDescription.length < 20) {
        newErrors.problemDescription = "Beskrivelse må være minst 20 tegn";
      }
      if (!formData.repairType) {
        newErrors.repairType = "Velg reparasjonstype";
      }
    }

    if (step === 2) {
      if (!formData.name) {
        newErrors.name = "Navn er påkrevd";
      }
      if (!formData.email) {
        newErrors.email = "E-post er påkrevd";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = "Ugyldig e-postformat";
      }
      if (formData.customerType === "business" && !formData.companyName) {
        newErrors.companyName = "Firmanavn er påkrevd";
      }
      if (formData.deliveryMethod === "pickup") {
        if (!formData.address) newErrors.address = "Adresse er påkrevd";
        if (!formData.postalCode) newErrors.postalCode = "Postnummer er påkrevd";
        if (!formData.city) newErrors.city = "By er påkrevd";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep) && currentStep < 3) {
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
    
    try {
      const response = await fetch("/api/repair", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success) {
        setConfirmationNumber(data.data.confirmationNumber);
        setIsSubmitted(true);
      }
    } catch {
      // Handle error
    } finally {
      setIsSubmitting(false);
    }
  };

  const steps = [
    { num: 1, label: "Enhetsinformasjon" },
    { num: 2, label: "Kontaktinformasjon" },
    { num: 3, label: "Bekreftelse" },
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
                Reparasjonsforespørsel mottatt!
              </h2>
              <p className="text-gray-600 mb-2">
                Vi har mottatt din reparasjonsforespørsel og vil kontakte deg innen 24 timer.
              </p>
              {confirmationNumber && (
                <p className="text-sm text-gray-500 mb-6">
                  Referansenummer: <span className="font-mono font-semibold">{confirmationNumber}</span>
                </p>
              )}
              <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
                <h3 className="font-semibold text-gray-900 mb-2">Hva skjer nå?</h3>
                <ol className="list-decimal list-inside text-gray-600 text-sm space-y-1">
                  <li>Vi vurderer din forespørsel</li>
                  <li>Du mottar en e-post med tilbud</li>
                  <li>Lever eller send enheten til oss</li>
                  <li>Vi utfører reparasjonen</li>
                  <li>Du henter eller mottar enheten</li>
                </ol>
              </div>
              <Button onClick={() => {
                setIsSubmitted(false);
                setCurrentStep(1);
                setFormData(initialFormData);
                setConfirmationNumber("");
              }}>
                Send ny forespørsel
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
          <Badge className="bg-white/20 text-white mb-4">Reparasjonstjenester</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Profesjonell IT-reparasjon
          </h1>
          <p className="text-xl text-green-100 max-w-2xl mx-auto">
            Rask og pålitelig reparasjon av alle typer IT-utstyr. Gratis feilsøking og 12 måneders garanti.
          </p>
        </div>
      </section>

      {/* Main Content with Sidebar */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Form Area */}
            <div className="lg:w-2/3">
              {/* Progress Steps */}
              <div className="mb-8">
                <div className="flex items-center justify-between">
                  {steps.map((step, index) => (
                    <React.Fragment key={step.num}>
                      <div className="flex flex-col items-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                          currentStep > step.num
                            ? "bg-green-600 text-white"
                            : currentStep === step.num
                            ? "bg-green-600 text-white ring-4 ring-green-200"
                            : "bg-gray-200 text-gray-500"
                        }`}>
                          {currentStep > step.num ? <CheckCircle className="w-5 h-5" /> : step.num}
                        </div>
                        <span className={`text-xs mt-2 text-center ${
                          currentStep >= step.num ? "text-green-600 font-medium" : "text-gray-400"
                        }`}>
                          {step.label}
                        </span>
                      </div>
                      {index < steps.length - 1 && (
                        <div className={`flex-1 h-1 mx-2 ${
                          currentStep > step.num ? "bg-green-600" : "bg-gray-200"
                        }`} />
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>
                    {currentStep === 1 && "Enhetsinformasjon"}
                    {currentStep === 2 && "Kontaktinformasjon"}
                    {currentStep === 3 && "Bekreft forespørsel"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit}>
                    {/* Step 1: Device Info */}
                    {currentStep === 1 && (
                      <div className="space-y-6">
                        {/* Device Type */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Enhetstype *
                          </label>
                          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                            {deviceTypes.map((type) => (
                              <button
                                key={type.value}
                                type="button"
                                onClick={() => setFormData((prev) => ({ ...prev, deviceType: type.value }))}
                                className={`p-3 border rounded-lg text-center transition-all ${
                                  formData.deviceType === type.value
                                    ? "border-green-600 bg-green-50 text-green-700"
                                    : "border-gray-200 hover:border-gray-300"
                                }`}
                              >
                                <type.icon className="w-6 h-6 mx-auto mb-1 text-gray-600" />
                                <span className="text-xs font-medium">{type.label}</span>
                              </button>
                            ))}
                          </div>
                          {errors.deviceType && <p className="text-red-500 text-sm mt-1">{errors.deviceType}</p>}
                        </div>

                        {/* Brand */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Merke *</label>
                          <select
                            name="brand"
                            value={formData.brand}
                            onChange={handleInputChange}
                            className="w-full h-10 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
                          >
                            <option value="">Velg merke</option>
                            {BRANDS.map((brand) => (
                              <option key={brand} value={brand}>{brand}</option>
                            ))}
                          </select>
                          {errors.brand && <p className="text-red-500 text-sm mt-1">{errors.brand}</p>}
                        </div>

                        {/* Model */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Modell *</label>
                          <Input
                            name="model"
                            value={formData.model}
                            onChange={handleInputChange}
                            placeholder="f.eks. MacBook Pro 2021"
                          />
                          {errors.model && <p className="text-red-500 text-sm mt-1">{errors.model}</p>}
                        </div>

                        {/* Serial Number & Quantity */}
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Serienummer (valgfritt)
                            </label>
                            <Input
                              name="serialNumber"
                              value={formData.serialNumber}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Antall
                            </label>
                            <Input
                              type="number"
                              name="quantity"
                              value={formData.quantity}
                              onChange={handleInputChange}
                              min="1"
                            />
                          </div>
                        </div>

                        {/* Problem Description */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Beskriv problemet * (minst 20 tegn)
                          </label>
                          <Textarea
                            name="problemDescription"
                            value={formData.problemDescription}
                            onChange={handleInputChange}
                            placeholder="Beskriv problemet så detaljert som mulig..."
                            rows={4}
                          />
                          <div className="flex justify-between mt-1">
                            {errors.problemDescription ? (
                              <p className="text-red-500 text-sm">{errors.problemDescription}</p>
                            ) : <span />}
                            <span className="text-xs text-gray-400">
                              {formData.problemDescription.length}/20 tegn minimum
                            </span>
                          </div>
                        </div>

                        {/* Repair Type */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Type reparasjon *
                          </label>
                          <select
                            name="repairType"
                            value={formData.repairType}
                            onChange={handleInputChange}
                            className="w-full h-10 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
                          >
                            <option value="">Velg reparasjonstype</option>
                            {REPAIR_TYPES.map((type) => (
                              <option key={type.value} value={type.value}>{type.label}</option>
                            ))}
                          </select>
                          {errors.repairType && <p className="text-red-500 text-sm mt-1">{errors.repairType}</p>}
                        </div>

                        {/* Urgency */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Hastegrad</label>
                          <div className="grid grid-cols-2 gap-3">
                            <button
                              type="button"
                              onClick={() => setFormData((prev) => ({ ...prev, urgency: "standard" }))}
                              className={`p-4 border rounded-lg text-left transition-all ${
                                formData.urgency === "standard"
                                  ? "border-green-600 bg-green-50"
                                  : "border-gray-200 hover:border-gray-300"
                              }`}
                            >
                              <Clock className="w-5 h-5 mb-2 text-gray-600" />
                              <span className="font-medium block">Standard</span>
                              <span className="text-xs text-gray-500">3-5 virkedager</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => setFormData((prev) => ({ ...prev, urgency: "express" }))}
                              className={`p-4 border rounded-lg text-left transition-all ${
                                formData.urgency === "express"
                                  ? "border-green-600 bg-green-50"
                                  : "border-gray-200 hover:border-gray-300"
                              }`}
                            >
                              <Zap className="w-5 h-5 mb-2 text-orange-500" />
                              <span className="font-medium block">Express</span>
                              <span className="text-xs text-gray-500">1-2 virkedager (+20%)</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Step 2: Contact Info */}
                    {currentStep === 2 && (
                      <div className="space-y-6">
                        {/* Customer Type */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Kundetype</label>
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
                              <span className="font-medium">Privatkunde</span>
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
                              <span className="font-medium">Bedriftskunde</span>
                            </button>
                          </div>
                        </div>

                        {/* Business Fields */}
                        {formData.customerType === "business" && (
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Firmanavn *</label>
                              <Input
                                name="companyName"
                                value={formData.companyName}
                                onChange={handleInputChange}
                              />
                              {errors.companyName && <p className="text-red-500 text-sm mt-1">{errors.companyName}</p>}
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Org.nummer</label>
                              <Input
                                name="orgNumber"
                                value={formData.orgNumber}
                                onChange={handleInputChange}
                                placeholder="XXX XXX XXX"
                              />
                            </div>
                          </div>
                        )}

                        {/* Name */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Navn *</label>
                          <Input name="name" value={formData.name} onChange={handleInputChange} />
                          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                        </div>

                        {/* Email & Phone */}
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">E-post *</label>
                            <Input type="email" name="email" value={formData.email} onChange={handleInputChange} />
                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Telefon</label>
                            <Input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} />
                          </div>
                        </div>

                        {/* Delivery Method */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Leveringsmetode</label>
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
                              <span className="font-medium block">Leverer selv</span>
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
                              <span className="font-medium block">Henting</span>
                              <span className="text-xs text-gray-500">Gratis i Oslo-området</span>
                            </button>
                          </div>
                        </div>

                        {/* Pickup Address */}
                        {formData.deliveryMethod === "pickup" && (
                          <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Adresse *</label>
                              <Input name="address" value={formData.address} onChange={handleInputChange} />
                              {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Postnummer *</label>
                                <Input name="postalCode" value={formData.postalCode} onChange={handleInputChange} />
                                {errors.postalCode && <p className="text-red-500 text-sm mt-1">{errors.postalCode}</p>}
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">By *</label>
                                <Input name="city" value={formData.city} onChange={handleInputChange} />
                                {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Step 3: Confirmation */}
                    {currentStep === 3 && (
                      <div className="space-y-6">
                        {/* Device Summary */}
                        <div className="bg-gray-50 rounded-lg p-4">
                          <h4 className="font-medium text-gray-900 mb-3">Enhet</h4>
                          <dl className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <dt className="text-gray-500">Type:</dt>
                              <dd className="text-gray-900">{deviceTypes.find((t) => t.value === formData.deviceType)?.label}</dd>
                            </div>
                            <div className="flex justify-between">
                              <dt className="text-gray-500">Merke:</dt>
                              <dd className="text-gray-900">{formData.brand}</dd>
                            </div>
                            <div className="flex justify-between">
                              <dt className="text-gray-500">Modell:</dt>
                              <dd className="text-gray-900">{formData.model}</dd>
                            </div>
                            <div className="flex justify-between">
                              <dt className="text-gray-500">Antall:</dt>
                              <dd className="text-gray-900">{formData.quantity}</dd>
                            </div>
                            <div className="flex justify-between">
                              <dt className="text-gray-500">Reparasjonstype:</dt>
                              <dd className="text-gray-900">{REPAIR_TYPES.find((t) => t.value === formData.repairType)?.label}</dd>
                            </div>
                          </dl>
                        </div>

                        {/* Problem Description */}
                        <div className="bg-gray-50 rounded-lg p-4">
                          <h4 className="font-medium text-gray-900 mb-2">Problembeskrivelse</h4>
                          <p className="text-sm text-gray-600">{formData.problemDescription}</p>
                        </div>

                        {/* Contact Summary */}
                        <div className="bg-gray-50 rounded-lg p-4">
                          <h4 className="font-medium text-gray-900 mb-3">Kontaktinformasjon</h4>
                          <dl className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <dt className="text-gray-500">Navn:</dt>
                              <dd className="text-gray-900">{formData.name}</dd>
                            </div>
                            <div className="flex justify-between">
                              <dt className="text-gray-500">E-post:</dt>
                              <dd className="text-gray-900">{formData.email}</dd>
                            </div>
                            {formData.phone && (
                              <div className="flex justify-between">
                                <dt className="text-gray-500">Telefon:</dt>
                                <dd className="text-gray-900">{formData.phone}</dd>
                              </div>
                            )}
                            {formData.customerType === "business" && (
                              <div className="flex justify-between">
                                <dt className="text-gray-500">Firma:</dt>
                                <dd className="text-gray-900">{formData.companyName}</dd>
                              </div>
                            )}
                          </dl>
                        </div>

                        {/* Urgency Info */}
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                          <div className="flex items-center space-x-3">
                            {formData.urgency === "express" ? (
                              <Zap className="w-5 h-5 text-orange-500" />
                            ) : (
                              <Clock className="w-5 h-5 text-green-600" />
                            )}
                            <div>
                              <p className="font-medium text-green-900">
                                {formData.urgency === "express" ? "Express-reparasjon" : "Standard-reparasjon"}
                              </p>
                              <p className="text-sm text-green-700">
                                Estimert tid: {getEstimatedTime()}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Navigation */}
                    <div className="flex justify-between mt-8 pt-6 border-t">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleBack}
                        disabled={currentStep === 1}
                      >
                        <ChevronLeft className="w-4 h-4 mr-2" />
                        Tilbake
                      </Button>

                      {currentStep < 3 ? (
                        <Button type="button" onClick={handleNext}>
                          Neste
                          <ChevronRight className="w-4 h-4 ml-2" />
                        </Button>
                      ) : (
                        <Button type="submit" disabled={isSubmitting}>
                          {isSubmitting ? (
                            <>
                              <span className="animate-spin mr-2">⏳</span>
                              Sender...
                            </>
                          ) : (
                            <>
                              <Send className="w-4 h-4 mr-2" />
                              Send til reparasjon
                            </>
                          )}
                        </Button>
                      )}
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Right Sidebar */}
            <div className="lg:w-1/3">
              <div className="sticky top-6 space-y-6">
                {/* Repair Summary */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Reparasjonssammendrag</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Total antall enheter:</span>
                      <span className="font-semibold">{formData.quantity}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Estimert tid:</span>
                      <span className="font-semibold">{getEstimatedTime()}</span>
                    </div>
                    <hr />
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Vår reparasjonsgaranti</h4>
                      <div className="space-y-2">
                        <div className="flex items-start space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-600">12 måneders garanti på deler og arbeid</span>
                        </div>
                        <div className="flex items-start space-x-2">
                          <Shield className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-600">Sikker håndtering av dine data</span>
                        </div>
                        <div className="flex items-start space-x-2">
                          <Award className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-600">Kun høykvalitets reservedeler</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Why Choose NORNEX */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Hvorfor velge NORNEX</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Zap className="w-4 h-4 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium text-sm text-gray-900">Rask behandlingstid</p>
                        <p className="text-xs text-gray-500">Minimerer nedetid</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Award className="w-4 h-4 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium text-sm text-gray-900">Sertifiserte teknikere</p>
                        <p className="text-xs text-gray-500">Erfarne fagfolk</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <FileSearch className="w-4 h-4 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium text-sm text-gray-900">Full sporbarhet</p>
                        <p className="text-xs text-gray-500">Alltid informert</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Users className="w-4 h-4 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium text-sm text-gray-900">Dedikert bedriftsstøtte</p>
                        <p className="text-xs text-gray-500">For bedriftskunder</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Contact Card */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Trenger du hjelp?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">Kontakt oss for spørsmål</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-2">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600">reparasjon@nornex.no</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600">+47 123 45 678</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600">Brynsveien 18, 0667 Oslo</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Besøk oss</h2>
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
              <a href="mailto:reparasjon@nornex.no" className="text-gray-300 hover:text-green-500">
                reparasjon@nornex.no
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
