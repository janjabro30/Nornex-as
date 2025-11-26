"use client";

import React, { useState } from "react";
import {
  RefreshCw,
  Sparkles,
  DollarSign,
  CheckCircle,
  ChevronRight,
  ChevronLeft,
  Shield,
  Leaf,
  Percent,
  ShoppingBag,
  Truck,
  Lock,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useAppStore } from "@/store";
import { formatPrice } from "@/lib/utils";

interface TradeInFormData {
  // Step 1: Device info
  deviceType: string;
  brand: string;
  model: string;
  condition: string;
  age: string;
  accessories: string[];
  // Step 2: Selected new device
  selectedNewDevice: string | null;
  // Step 3: Summary (calculated)
  // Step 4: Delivery info
  name: string;
  email: string;
  phone: string;
  address: string;
  postalCode: string;
  city: string;
  paymentMethod: string;
  acceptTerms: boolean;
}

const initialFormData: TradeInFormData = {
  deviceType: "",
  brand: "",
  model: "",
  condition: "",
  age: "",
  accessories: [],
  selectedNewDevice: null,
  name: "",
  email: "",
  phone: "",
  address: "",
  postalCode: "",
  city: "",
  paymentMethod: "card",
  acceptTerms: false,
};

// Base trade-in values
const tradeInBaseValues: Record<string, number> = {
  laptop: 3000,
  desktop: 2000,
  tablet: 1500,
  telefon: 2500,
  skjerm: 800,
  annet: 500,
};

// Condition multipliers
const conditionMultipliers: Record<string, number> = {
  perfekt: 0.8,
  god: 0.6,
  akseptabel: 0.4,
  defekt: 0.15,
};

// Age multipliers
const ageMultipliers: Record<string, number> = {
  "under-1": 1.0,
  "1-2": 0.8,
  "2-3": 0.6,
  "3-5": 0.4,
  "over-5": 0.2,
};

// Sample new devices for trade-in
const newDevices = [
  {
    id: "1",
    name: "MacBook Pro 14\" M3",
    price: 24999,
    image: "/placeholder-laptop.jpg",
    category: "laptop",
    grade: "Refurbished A",
  },
  {
    id: "2",
    name: "Dell XPS 15",
    price: 18999,
    image: "/placeholder-laptop.jpg",
    category: "laptop",
    grade: "Refurbished A",
  },
  {
    id: "3",
    name: "HP EliteBook 840 G8",
    price: 12999,
    image: "/placeholder-laptop.jpg",
    category: "laptop",
    grade: "Refurbished B",
  },
  {
    id: "4",
    name: "Lenovo ThinkPad X1 Carbon",
    price: 15999,
    image: "/placeholder-laptop.jpg",
    category: "laptop",
    grade: "Refurbished A",
  },
  {
    id: "5",
    name: "Samsung Galaxy Tab S9",
    price: 8999,
    image: "/placeholder-tablet.jpg",
    category: "tablet",
    grade: "Refurbished A",
  },
  {
    id: "6",
    name: "iPhone 14 Pro 128GB",
    price: 11999,
    image: "/placeholder-phone.jpg",
    category: "telefon",
    grade: "Refurbished A",
  },
];

export default function TradeInPage() {
  useAppStore();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<TradeInFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof TradeInFormData, string>>>({});

  const deviceTypes = [
    { value: "laptop", label: "Laptop" },
    { value: "desktop", label: "Desktop" },
    { value: "tablet", label: "Nettbrett" },
    { value: "telefon", label: "Telefon" },
    { value: "skjerm", label: "Skjerm" },
    { value: "annet", label: "Annet" },
  ];

  const brands = [
    "Apple",
    "Dell",
    "HP",
    "Lenovo",
    "Samsung",
    "Asus",
    "Acer",
    "Microsoft",
    "Huawei",
    "Sony",
    "LG",
    "Annet",
  ];

  const conditions = [
    {
      value: "perfekt",
      label: "Perfekt",
      description: "Fungerer perfekt, ingen skader",
    },
    {
      value: "god",
      label: "God",
      description: "Minimale bruksspor, fungerer perfekt",
    },
    {
      value: "akseptabel",
      label: "Akseptabel",
      description: "Synlige bruksspor, fungerer som den skal",
    },
    {
      value: "defekt",
      label: "Defekt",
      description: "Har funksjonsfeil",
    },
  ];

  const ageOptions = [
    { value: "under-1", label: "Mindre enn 1 år" },
    { value: "1-2", label: "1-2 år" },
    { value: "2-3", label: "2-3 år" },
    { value: "3-5", label: "3-5 år" },
    { value: "over-5", label: "Over 5 år" },
  ];

  const accessoryOptions = [
    { value: "emballasje", label: "Original emballasje" },
    { value: "lader", label: "Lader" },
    { value: "kabler", label: "Kabler" },
    { value: "manualer", label: "Manualer" },
  ];

  const calculateTradeInValue = (): number => {
    const baseValue = tradeInBaseValues[formData.deviceType] || 500;
    const conditionMult = conditionMultipliers[formData.condition] || 0.5;
    const ageMult = ageMultipliers[formData.age] || 0.5;
    const accessoryBonus = formData.accessories.length * 100;
    return Math.round(baseValue * conditionMult * ageMult + accessoryBonus);
  };

  const getSelectedDevice = () => {
    return newDevices.find((d) => d.id === formData.selectedNewDevice);
  };

  const calculateFinalPrice = (): number => {
    const device = getSelectedDevice();
    if (!device) return 0;
    return Math.max(0, device.price - calculateTradeInValue());
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof TradeInFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleAccessoryChange = (accessory: string) => {
    setFormData((prev) => ({
      ...prev,
      accessories: prev.accessories.includes(accessory)
        ? prev.accessories.filter((a) => a !== accessory)
        : [...prev.accessories, accessory],
    }));
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Partial<Record<keyof TradeInFormData, string>> = {};

    if (step === 1) {
      if (!formData.deviceType) {
        newErrors.deviceType = "Velg enhetstype";
      }
      if (!formData.brand) {
        newErrors.brand = "Velg merke";
      }
      if (!formData.model) {
        newErrors.model = "Oppgi modell";
      }
      if (!formData.condition) {
        newErrors.condition = "Velg tilstand";
      }
      if (!formData.age) {
        newErrors.age = "Velg alder";
      }
    }

    if (step === 2) {
      if (!formData.selectedNewDevice) {
        newErrors.selectedNewDevice = "Velg en ny enhet";
      }
    }

    if (step === 4) {
      if (!formData.name) {
        newErrors.name = "Navn er påkrevd";
      }
      if (!formData.email) {
        newErrors.email = "E-post er påkrevd";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = "Ugyldig e-postformat";
      }
      if (!formData.phone) {
        newErrors.phone = "Telefon er påkrevd";
      }
      if (!formData.address) {
        newErrors.address = "Adresse er påkrevd";
      }
      if (!formData.postalCode) {
        newErrors.postalCode = "Postnummer er påkrevd";
      }
      if (!formData.city) {
        newErrors.city = "By er påkrevd";
      }
      if (!formData.acceptTerms) {
        newErrors.acceptTerms = "Du må godta vilkårene";
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

    try {
      const response = await fetch("/api/trade-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          tradeInValue: calculateTradeInValue(),
          selectedDevice: getSelectedDevice(),
          finalPrice: calculateFinalPrice(),
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
      }
    } catch {
      // Handle error silently
    } finally {
      setIsSubmitting(false);
    }
  };

  const steps = [
    {
      num: 1,
      icon: RefreshCw,
      label: "Verdsett din enhet",
      description: "Få et umiddelbart estimat på innbytteverdien",
    },
    {
      num: 2,
      icon: Sparkles,
      label: "Velg ny enhet",
      description: "Bla gjennom vårt utvalg av nye og refurbished produkter",
    },
    {
      num: 3,
      icon: DollarSign,
      label: "Få rabatt",
      description: "Din innbytteverdi trekkes fra på ny enhet",
    },
    {
      num: 4,
      icon: CheckCircle,
      label: "Fullfør byttet",
      description: "Send inn gammel enhet når du mottar den nye",
    },
  ];

  const benefits = [
    { icon: Percent, text: "Opptil 40% rabatt på ny enhet" },
    { icon: RefreshCw, text: "Enkel og rask prosess" },
    { icon: Shield, text: "Garanti på nye enheter (12 måneder)" },
    { icon: Leaf, text: "Miljøvennlig – resirkuler riktig" },
    { icon: Lock, text: "Sikker datasletting inkludert" },
    { icon: ShoppingBag, text: "Spesialpriser på refurbished" },
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
                Innbytteforespørsel mottatt!
              </h2>
              <p className="text-gray-600 mb-6">
                Vi har mottatt din innbytteforespørsel og vil kontakte deg innen 24 timer
                med bekreftelse og neste steg.
              </p>
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="grid grid-cols-2 gap-4 text-left">
                  <div>
                    <p className="text-sm text-gray-500">Din enhet</p>
                    <p className="font-semibold text-gray-900">
                      {formData.brand} {formData.model}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Innbytteverdi</p>
                    <p className="font-semibold text-green-600">
                      {formatPrice(calculateTradeInValue())}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Ny enhet</p>
                    <p className="font-semibold text-gray-900">
                      {getSelectedDevice()?.name}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Å betale</p>
                    <p className="font-semibold text-gray-900">
                      {formatPrice(calculateFinalPrice())}
                    </p>
                  </div>
                </div>
              </div>
              <Button
                onClick={() => {
                  setIsSubmitted(false);
                  setCurrentStep(1);
                  setFormData(initialFormData);
                }}
              >
                Start nytt innbytte
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
            Innbytteprogram
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Bytt inn gammel enhet – få rabatt på ny
          </h1>
          <p className="text-xl text-green-100 max-w-2xl mx-auto">
            Oppgrader til ny teknologi og få betalt for din gamle enhet. Miljøvennlig, enkelt og lønnsomt.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Form Area */}
            <div className="lg:w-2/3">
              {/* Progress Steps */}
              <div className="mb-8 overflow-x-auto">
                <div className="flex items-center justify-between min-w-max lg:min-w-0">
                  {steps.map((step, index) => (
                    <React.Fragment key={step.num}>
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold transition-all ${
                            currentStep > step.num
                              ? "bg-green-600 text-white"
                              : currentStep === step.num
                              ? "bg-green-600 text-white ring-4 ring-green-200"
                              : "bg-gray-200 text-gray-500"
                          }`}
                        >
                          {currentStep > step.num ? (
                            <CheckCircle className="w-6 h-6" />
                          ) : (
                            <step.icon className="w-5 h-5" />
                          )}
                        </div>
                        <span
                          className={`text-xs mt-2 text-center max-w-20 ${
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
                          className={`flex-1 h-1 mx-2 min-w-8 ${
                            currentStep > step.num ? "bg-green-600" : "bg-gray-200"
                          }`}
                        />
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              {/* Step Info */}
              <div className="mb-6 text-center">
                <p className="text-sm text-gray-500">
                  Steg {currentStep} av 4
                </p>
                <h2 className="text-2xl font-bold text-gray-900">
                  {steps[currentStep - 1].label}
                </h2>
                <p className="text-gray-600">{steps[currentStep - 1].description}</p>
              </div>

              <Card>
                <CardContent className="p-6">
                  <form onSubmit={handleSubmit}>
                    {/* Step 1: Device Valuation */}
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
                                onClick={() =>
                                  setFormData((prev) => ({ ...prev, deviceType: type.value }))
                                }
                                className={`p-3 border rounded-lg text-center transition-all ${
                                  formData.deviceType === type.value
                                    ? "border-green-600 bg-green-50 text-green-700"
                                    : "border-gray-200 hover:border-gray-300"
                                }`}
                              >
                                <span className="text-sm font-medium">{type.label}</span>
                              </button>
                            ))}
                          </div>
                          {errors.deviceType && (
                            <p className="text-red-500 text-sm mt-1">{errors.deviceType}</p>
                          )}
                        </div>

                        {/* Brand */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Merke *
                          </label>
                          <select
                            name="brand"
                            value={formData.brand}
                            onChange={handleInputChange}
                            className="w-full h-10 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
                          >
                            <option value="">Velg merke</option>
                            {brands.map((brand) => (
                              <option key={brand} value={brand}>
                                {brand}
                              </option>
                            ))}
                          </select>
                          {errors.brand && (
                            <p className="text-red-500 text-sm mt-1">{errors.brand}</p>
                          )}
                        </div>

                        {/* Model */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Modell *
                          </label>
                          <Input
                            name="model"
                            value={formData.model}
                            onChange={handleInputChange}
                            placeholder="f.eks. MacBook Pro 2021, iPhone 14"
                          />
                          {errors.model && (
                            <p className="text-red-500 text-sm mt-1">{errors.model}</p>
                          )}
                        </div>

                        {/* Condition */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Tilstand *
                          </label>
                          <div className="space-y-2">
                            {conditions.map((condition) => (
                              <label
                                key={condition.value}
                                className={`flex items-start p-4 border rounded-lg cursor-pointer transition-all ${
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
                                  className={`w-5 h-5 rounded-full border-2 mr-3 flex-shrink-0 flex items-center justify-center ${
                                    formData.condition === condition.value
                                      ? "border-green-600"
                                      : "border-gray-300"
                                  }`}
                                >
                                  {formData.condition === condition.value && (
                                    <div className="w-3 h-3 rounded-full bg-green-600" />
                                  )}
                                </div>
                                <div>
                                  <span className="font-medium text-gray-900">
                                    {condition.label}
                                  </span>
                                  <p className="text-sm text-gray-500">
                                    {condition.description}
                                  </p>
                                </div>
                              </label>
                            ))}
                          </div>
                          {errors.condition && (
                            <p className="text-red-500 text-sm mt-1">{errors.condition}</p>
                          )}
                        </div>

                        {/* Age */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Alder *
                          </label>
                          <select
                            name="age"
                            value={formData.age}
                            onChange={handleInputChange}
                            className="w-full h-10 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
                          >
                            <option value="">Velg alder</option>
                            {ageOptions.map((opt) => (
                              <option key={opt.value} value={opt.value}>
                                {opt.label}
                              </option>
                            ))}
                          </select>
                          {errors.age && (
                            <p className="text-red-500 text-sm mt-1">{errors.age}</p>
                          )}
                        </div>

                        {/* Accessories */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Inkludert tilbehør
                          </label>
                          <div className="grid grid-cols-2 gap-2">
                            {accessoryOptions.map((opt) => (
                              <label
                                key={opt.value}
                                className={`flex items-center p-3 border rounded-lg cursor-pointer transition-all ${
                                  formData.accessories.includes(opt.value)
                                    ? "border-green-600 bg-green-50"
                                    : "border-gray-200 hover:border-gray-300"
                                }`}
                              >
                                <input
                                  type="checkbox"
                                  checked={formData.accessories.includes(opt.value)}
                                  onChange={() => handleAccessoryChange(opt.value)}
                                  className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                                />
                                <span className="ml-2 text-sm">{opt.label}</span>
                              </label>
                            ))}
                          </div>
                        </div>

                        {/* Estimated Value */}
                        {formData.deviceType && formData.condition && formData.age && (
                          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                            <p className="text-sm text-gray-600 mb-1">Estimert innbytteverdi</p>
                            <p className="text-3xl font-bold text-green-600">
                              {formatPrice(calculateTradeInValue())}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              Endelig verdi fastsettes etter inspeksjon
                            </p>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Step 2: Choose New Device */}
                    {currentStep === 2 && (
                      <div className="space-y-6">
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm text-gray-600">Din innbytteverdi</p>
                              <p className="text-2xl font-bold text-green-600">
                                {formatPrice(calculateTradeInValue())}
                              </p>
                            </div>
                            <Badge className="bg-green-600">Rabatt tilgjengelig</Badge>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {newDevices.map((device) => (
                            <div
                              key={device.id}
                              onClick={() =>
                                setFormData((prev) => ({
                                  ...prev,
                                  selectedNewDevice: device.id,
                                }))
                              }
                              className={`border rounded-lg p-4 cursor-pointer transition-all ${
                                formData.selectedNewDevice === device.id
                                  ? "border-green-600 bg-green-50 ring-2 ring-green-200"
                                  : "border-gray-200 hover:border-gray-300"
                              }`}
                            >
                              <div className="flex items-start justify-between mb-2">
                                <Badge variant="secondary">{device.grade}</Badge>
                                {formData.selectedNewDevice === device.id && (
                                  <CheckCircle className="w-5 h-5 text-green-600" />
                                )}
                              </div>
                              <h3 className="font-semibold text-gray-900 mb-1">
                                {device.name}
                              </h3>
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="text-sm text-gray-500 line-through">
                                    {formatPrice(device.price)}
                                  </p>
                                  <p className="text-lg font-bold text-green-600">
                                    {formatPrice(device.price - calculateTradeInValue())}
                                  </p>
                                </div>
                                <Badge variant="outline" className="text-green-600 border-green-600">
                                  -{formatPrice(calculateTradeInValue())}
                                </Badge>
                              </div>
                            </div>
                          ))}
                        </div>
                        {errors.selectedNewDevice && (
                          <p className="text-red-500 text-sm">{errors.selectedNewDevice}</p>
                        )}
                      </div>
                    )}

                    {/* Step 3: Discount Summary */}
                    {currentStep === 3 && (
                      <div className="space-y-6">
                        <div className="bg-gray-50 rounded-lg p-6">
                          <h3 className="font-semibold text-gray-900 mb-4">
                            Din innbytteenhet
                          </h3>
                          <div className="flex items-center justify-between pb-4 border-b">
                            <div>
                              <p className="font-medium">{formData.brand} {formData.model}</p>
                              <p className="text-sm text-gray-500">
                                {conditions.find((c) => c.value === formData.condition)?.label} tilstand
                              </p>
                            </div>
                            <p className="text-lg font-semibold text-green-600">
                              +{formatPrice(calculateTradeInValue())}
                            </p>
                          </div>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-6">
                          <h3 className="font-semibold text-gray-900 mb-4">
                            Ny enhet
                          </h3>
                          {getSelectedDevice() && (
                            <div className="flex items-center justify-between pb-4 border-b">
                              <div>
                                <p className="font-medium">{getSelectedDevice()?.name}</p>
                                <p className="text-sm text-gray-500">
                                  {getSelectedDevice()?.grade}
                                </p>
                              </div>
                              <p className="text-lg font-semibold text-gray-900">
                                {formatPrice(getSelectedDevice()?.price || 0)}
                              </p>
                            </div>
                          )}
                        </div>

                        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                          <div className="space-y-3">
                            <div className="flex justify-between text-gray-600">
                              <span>Ny enhet</span>
                              <span>{formatPrice(getSelectedDevice()?.price || 0)}</span>
                            </div>
                            <div className="flex justify-between text-green-600">
                              <span>Innbytterabatt</span>
                              <span>-{formatPrice(calculateTradeInValue())}</span>
                            </div>
                            <div className="flex justify-between text-lg font-bold text-gray-900 pt-3 border-t border-green-200">
                              <span>Å betale</span>
                              <span>{formatPrice(calculateFinalPrice())}</span>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 mt-4">
                            Du sparer {formatPrice(calculateTradeInValue())} med innbytte!
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Step 4: Complete Exchange */}
                    {currentStep === 4 && (
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Navn *
                            </label>
                            <Input
                              name="name"
                              value={formData.name}
                              onChange={handleInputChange}
                              placeholder="Ditt fulle navn"
                            />
                            {errors.name && (
                              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                            )}
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              E-post *
                            </label>
                            <Input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              placeholder="din@epost.no"
                            />
                            {errors.email && (
                              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                            )}
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Telefon *
                          </label>
                          <Input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="+47 123 45 678"
                          />
                          {errors.phone && (
                            <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Leveringsadresse *
                          </label>
                          <Input
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            placeholder="Gateadresse"
                          />
                          {errors.address && (
                            <p className="text-red-500 text-sm mt-1">{errors.address}</p>
                          )}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Postnummer *
                            </label>
                            <Input
                              name="postalCode"
                              value={formData.postalCode}
                              onChange={handleInputChange}
                              placeholder="0000"
                            />
                            {errors.postalCode && (
                              <p className="text-red-500 text-sm mt-1">{errors.postalCode}</p>
                            )}
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              By *
                            </label>
                            <Input
                              name="city"
                              value={formData.city}
                              onChange={handleInputChange}
                              placeholder="Oslo"
                            />
                            {errors.city && (
                              <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                            )}
                          </div>
                        </div>

                        {/* Payment Method */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Betalingsmetode
                          </label>
                          <div className="grid grid-cols-2 gap-3">
                            <button
                              type="button"
                              onClick={() =>
                                setFormData((prev) => ({ ...prev, paymentMethod: "card" }))
                              }
                              className={`p-4 border rounded-lg text-center transition-all ${
                                formData.paymentMethod === "card"
                                  ? "border-green-600 bg-green-50"
                                  : "border-gray-200 hover:border-gray-300"
                              }`}
                            >
                              <span className="font-medium">Kort</span>
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                setFormData((prev) => ({ ...prev, paymentMethod: "invoice" }))
                              }
                              className={`p-4 border rounded-lg text-center transition-all ${
                                formData.paymentMethod === "invoice"
                                  ? "border-green-600 bg-green-50"
                                  : "border-gray-200 hover:border-gray-300"
                              }`}
                            >
                              <span className="font-medium">Faktura</span>
                            </button>
                          </div>
                        </div>

                        {/* Terms */}
                        <div className="bg-gray-50 rounded-lg p-4">
                          <label className="flex items-start cursor-pointer">
                            <input
                              type="checkbox"
                              checked={formData.acceptTerms}
                              onChange={(e) =>
                                setFormData((prev) => ({
                                  ...prev,
                                  acceptTerms: e.target.checked,
                                }))
                              }
                              className="mt-1 w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                            />
                            <span className="ml-3 text-sm text-gray-600">
                              Jeg godtar{" "}
                              <a href="/vilkar" className="text-green-600 hover:underline">
                                vilkår og betingelser
                              </a>{" "}
                              og bekrefter at enheten jeg sender inn tilhører meg og er fri for
                              panterett.
                            </span>
                          </label>
                          {errors.acceptTerms && (
                            <p className="text-red-500 text-sm mt-2">{errors.acceptTerms}</p>
                          )}
                        </div>

                        {/* Process Info */}
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                          <div className="flex items-start space-x-3">
                            <Truck className="w-5 h-5 text-blue-600 mt-0.5" />
                            <div>
                              <p className="font-medium text-blue-900">Bytteprosess</p>
                              <ol className="text-sm text-blue-700 mt-2 space-y-1 list-decimal list-inside">
                                <li>Du mottar den nye enheten</li>
                                <li>Slett data fra gammel enhet</li>
                                <li>Pakk gammel enhet med medfølgende etikett</li>
                                <li>Send inn innen 14 dager</li>
                              </ol>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Navigation Buttons */}
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

                      {currentStep < 4 ? (
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
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Fullfør innbytte
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
                {/* Benefits Card */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Fordeler med innbytte</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {benefits.map((benefit, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <benefit.icon className="w-4 h-4 text-green-600" />
                        </div>
                        <span className="text-sm text-gray-600">{benefit.text}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Current Value Summary */}
                {(currentStep >= 1 && formData.deviceType && formData.condition && formData.age) && (
                  <Card className="bg-green-50 border-green-200">
                    <CardHeader>
                      <CardTitle className="text-lg">Din innbytteverdi</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-3xl font-bold text-green-600 mb-2">
                        {formatPrice(calculateTradeInValue())}
                      </p>
                      <p className="text-sm text-gray-600">
                        {formData.brand} {formData.model}
                      </p>
                    </CardContent>
                  </Card>
                )}

                {/* Contact Info */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Trenger du hjelp?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      Kontakt oss for spørsmål om innbytte
                    </p>
                    <div className="space-y-2 text-sm">
                      <p className="text-gray-600">📧 innbytte@nornex.no</p>
                      <p className="text-gray-600">📞 +47 123 45 678</p>
                      <p className="text-gray-600">📍 Brynsveien 18, 0667 Oslo</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
