"use client";

import React, { useState } from "react";
import {
  Recycle,
  Banknote,
  Plus,
  Trash2,
  CheckCircle,
  Truck,
  Lock,
  Send,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useAppStore } from "@/store";
import { DEVICE_TYPES, BRANDS, CONDITIONS, ACCESSORY_OPTIONS } from "@/lib/constants/form-options";

interface DeviceEntry {
  id: string;
  deviceType: string;
  brand: string;
  model: string;
  serialNumber: string;
  quantity: number;
  condition: string;
  accessories: string[];
}

interface SellFormData {
  devices: DeviceEntry[];
  name: string;
  email: string;
  phone: string;
  companyName: string;
  address: string;
  postalCode: string;
  city: string;
}

const createEmptyDevice = (): DeviceEntry => ({
  id: crypto.randomUUID(),
  deviceType: "",
  brand: "",
  model: "",
  serialNumber: "",
  quantity: 1,
  condition: "",
  accessories: [],
});

const initialFormData: SellFormData = {
  devices: [createEmptyDevice()],
  name: "",
  email: "",
  phone: "",
  companyName: "",
  address: "",
  postalCode: "",
  city: "",
};

export default function SellToUsPage() {
  useAppStore();
  const [formData, setFormData] = useState<SellFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [confirmationNumber, setConfirmationNumber] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const getTotalDeviceCount = () => {
    return formData.devices.reduce((sum, device) => sum + (device.quantity || 0), 0);
  };

  const handleDeviceChange = (
    deviceId: string,
    field: keyof DeviceEntry,
    value: string | number | string[]
  ) => {
    setFormData((prev) => ({
      ...prev,
      devices: prev.devices.map((device) =>
        device.id === deviceId ? { ...device, [field]: value } : device
      ),
    }));
    // Clear specific device error
    if (errors[`${deviceId}-${field}`]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[`${deviceId}-${field}`];
        return newErrors;
      });
    }
  };

  const handleAccessoryToggle = (deviceId: string, accessory: string) => {
    setFormData((prev) => ({
      ...prev,
      devices: prev.devices.map((device) => {
        if (device.id === deviceId) {
          const accessories = device.accessories.includes(accessory)
            ? device.accessories.filter((a) => a !== accessory)
            : [...device.accessories, accessory];
          return { ...device, accessories };
        }
        return device;
      }),
    }));
  };

  const handleContactChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const addDevice = () => {
    setFormData((prev) => ({
      ...prev,
      devices: [...prev.devices, createEmptyDevice()],
    }));
  };

  const removeDevice = (deviceId: string) => {
    if (formData.devices.length > 1) {
      setFormData((prev) => ({
        ...prev,
        devices: prev.devices.filter((d) => d.id !== deviceId),
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Validate devices
    formData.devices.forEach((device) => {
      if (!device.deviceType) {
        newErrors[`${device.id}-deviceType`] = "Velg enhetstype";
      }
      if (!device.brand) {
        newErrors[`${device.id}-brand`] = "Velg merke";
      }
      if (!device.model) {
        newErrors[`${device.id}-model`] = "Oppgi modell";
      }
      if (!device.condition) {
        newErrors[`${device.id}-condition`] = "Velg tilstand";
      }
      if (device.quantity < 1) {
        newErrors[`${device.id}-quantity`] = "Minimum 1";
      }
    });

    // Validate contact info
    if (!formData.name) newErrors.name = "Navn er påkrevd";
    if (!formData.email) {
      newErrors.email = "E-post er påkrevd";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Ugyldig e-postformat";
    }
    if (!formData.phone) newErrors.phone = "Telefon er påkrevd";
    if (!formData.address) newErrors.address = "Adresse er påkrevd";
    if (!formData.postalCode) newErrors.postalCode = "Postnummer er påkrevd";
    if (!formData.city) newErrors.city = "By er påkrevd";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/sell", {
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
                Forespørsel sendt til evaluering!
              </h2>
              <p className="text-gray-600 mb-2">
                Vi har mottatt din forespørsel og vil kontakte deg innen 24 timer med et tilbud.
              </p>
              {confirmationNumber && (
                <p className="text-sm text-gray-500 mb-6">
                  Referansenummer: <span className="font-mono font-semibold">{confirmationNumber}</span>
                </p>
              )}
              <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
                <h3 className="font-semibold text-gray-900 mb-2">Oppsummering</h3>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>Antall enheter: {getTotalDeviceCount()}</p>
                  <p>Status: Venter på evaluering</p>
                </div>
              </div>
              <Button onClick={() => {
                setIsSubmitted(false);
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
          <Badge className="bg-white/20 text-white mb-4">Salgsprogram</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Selg dine enheter til NORNEX
          </h1>
          <p className="text-xl text-green-100 max-w-2xl mx-auto">
            Få betalt raskt for brukt utstyr. Konkurransedyktige priser og gratis henting.
          </p>
        </div>
      </section>

      {/* Main Content with Sidebar */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Form Area */}
            <div className="lg:w-2/3">
              <form onSubmit={handleSubmit}>
                {/* Devices Section */}
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle>Enheter du vil selge</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {formData.devices.map((device, index) => (
                      <div key={device.id} className="p-4 border border-gray-200 rounded-lg bg-white">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="font-medium text-gray-900">
                            Enhet {index + 1}
                          </h4>
                          {formData.devices.length > 1 && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeDevice(device.id)}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="w-4 h-4 mr-1" />
                              Fjern
                            </Button>
                          )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {/* Device Type */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Enhetstype *
                            </label>
                            <select
                              value={device.deviceType}
                              onChange={(e) => handleDeviceChange(device.id, "deviceType", e.target.value)}
                              className="w-full h-10 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
                            >
                              <option value="">Velg type</option>
                              {DEVICE_TYPES.map((type) => (
                                <option key={type.value} value={type.value}>{type.label}</option>
                              ))}
                            </select>
                            {errors[`${device.id}-deviceType`] && (
                              <p className="text-red-500 text-xs mt-1">{errors[`${device.id}-deviceType`]}</p>
                            )}
                          </div>

                          {/* Brand */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Merke *
                            </label>
                            <select
                              value={device.brand}
                              onChange={(e) => handleDeviceChange(device.id, "brand", e.target.value)}
                              className="w-full h-10 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
                            >
                              <option value="">Velg merke</option>
                              {BRANDS.map((brand) => (
                                <option key={brand} value={brand}>{brand}</option>
                              ))}
                            </select>
                            {errors[`${device.id}-brand`] && (
                              <p className="text-red-500 text-xs mt-1">{errors[`${device.id}-brand`]}</p>
                            )}
                          </div>

                          {/* Model */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Modell *
                            </label>
                            <Input
                              value={device.model}
                              onChange={(e) => handleDeviceChange(device.id, "model", e.target.value)}
                              placeholder="f.eks. MacBook Pro 2021"
                            />
                            {errors[`${device.id}-model`] && (
                              <p className="text-red-500 text-xs mt-1">{errors[`${device.id}-model`]}</p>
                            )}
                          </div>

                          {/* Serial Number */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Serienummer (valgfritt)
                            </label>
                            <Input
                              value={device.serialNumber}
                              onChange={(e) => handleDeviceChange(device.id, "serialNumber", e.target.value)}
                            />
                          </div>

                          {/* Quantity */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Antall *
                            </label>
                            <Input
                              type="number"
                              min="1"
                              value={device.quantity}
                              onChange={(e) => handleDeviceChange(device.id, "quantity", parseInt(e.target.value) || 1)}
                            />
                            {errors[`${device.id}-quantity`] && (
                              <p className="text-red-500 text-xs mt-1">{errors[`${device.id}-quantity`]}</p>
                            )}
                          </div>

                          {/* Condition */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Tilstand *
                            </label>
                            <select
                              value={device.condition}
                              onChange={(e) => handleDeviceChange(device.id, "condition", e.target.value)}
                              className="w-full h-10 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
                            >
                              <option value="">Velg tilstand</option>
                              {CONDITIONS.map((cond) => (
                                <option key={cond.value} value={cond.value}>{cond.label}</option>
                              ))}
                            </select>
                            {errors[`${device.id}-condition`] && (
                              <p className="text-red-500 text-xs mt-1">{errors[`${device.id}-condition`]}</p>
                            )}
                          </div>
                        </div>

                        {/* Accessories */}
                        <div className="mt-4">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Inkludert tilbehør
                          </label>
                          <div className="flex flex-wrap gap-2">
                            {ACCESSORY_OPTIONS.map((acc) => (
                              <button
                                key={acc.value}
                                type="button"
                                onClick={() => handleAccessoryToggle(device.id, acc.value)}
                                className={`px-3 py-1.5 text-xs rounded-full border transition-all ${
                                  device.accessories.includes(acc.value)
                                    ? "border-green-600 bg-green-50 text-green-700"
                                    : "border-gray-200 text-gray-600 hover:border-gray-300"
                                }`}
                              >
                                {device.accessories.includes(acc.value) && (
                                  <CheckCircle className="w-3 h-3 inline mr-1" />
                                )}
                                {acc.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* Add Device Button */}
                    <Button
                      type="button"
                      variant="outline"
                      onClick={addDevice}
                      className="w-full"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Legg til enhet
                    </Button>
                  </CardContent>
                </Card>

                {/* Contact Information */}
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle>Kontaktinformasjon</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Navn *</label>
                        <Input
                          name="name"
                          value={formData.name}
                          onChange={handleContactChange}
                          placeholder="Ditt fulle navn"
                        />
                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">E-post *</label>
                        <Input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleContactChange}
                          placeholder="din@epost.no"
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Telefon *</label>
                        <Input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleContactChange}
                          placeholder="+47 123 45 678"
                        />
                        {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Firmanavn (valgfritt)</label>
                        <Input
                          name="companyName"
                          value={formData.companyName}
                          onChange={handleContactChange}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Adresse for henting *</label>
                      <Input
                        name="address"
                        value={formData.address}
                        onChange={handleContactChange}
                        placeholder="Gateadresse"
                      />
                      {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Postnummer *</label>
                        <Input
                          name="postalCode"
                          value={formData.postalCode}
                          onChange={handleContactChange}
                          placeholder="0000"
                        />
                        {errors.postalCode && <p className="text-red-500 text-xs mt-1">{errors.postalCode}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">By *</label>
                        <Input
                          name="city"
                          value={formData.city}
                          onChange={handleContactChange}
                          placeholder="Oslo"
                        />
                        {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Submit Button */}
                <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <span className="animate-spin mr-2">⏳</span>
                      Sender...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Send til evaluering
                    </>
                  )}
                </Button>
              </form>
            </div>

            {/* Right Sidebar */}
            <div className="lg:w-1/3">
              <div className="sticky top-6 space-y-6">
                {/* Why Sell to NORNEX */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Hvorfor selge til NORNEX</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Banknote className="w-4 h-4 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium text-sm text-gray-900">Konkurransedyktige priser</p>
                        <p className="text-xs text-gray-500">Markedsledende priser for brukt elektronikk</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Truck className="w-4 h-4 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium text-sm text-gray-900">Gratis henting</p>
                        <p className="text-xs text-gray-500">Vi henter hos deg – ingen fraktkostnader</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Lock className="w-4 h-4 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium text-sm text-gray-900">Sikker datasletting</p>
                        <p className="text-xs text-gray-500">DOD/NIST-sertifisert profesjonell datasletting</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Recycle className="w-4 h-4 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium text-sm text-gray-900">Miljøsertifisert</p>
                        <p className="text-xs text-gray-500">WEEE-sertifisert resirkulering</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Summary */}
                <Card className="bg-green-50 border-green-200">
                  <CardHeader>
                    <CardTitle className="text-lg">Oppsummering</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Antall enheter:</span>
                      <span className="font-semibold text-gray-900">{getTotalDeviceCount()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Estimert verdi:</span>
                      <span className="font-semibold text-gray-500">Venter på evaluering</span>
                    </div>
                    <hr className="border-green-200" />
                    <p className="text-xs text-gray-500">
                      Du vil motta et tilbud på e-post innen 24 timer etter innsending.
                    </p>
                  </CardContent>
                </Card>

                {/* Contact Info */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Trenger du hjelp?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">Kontakt oss for spørsmål</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-2">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600">salg@nornex.no</span>
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

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Slik fungerer det
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">1</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Send forespørsel</h3>
              <p className="text-gray-600 text-sm">
                Fyll ut skjemaet med informasjon om enhetene dine
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">2</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Motta tilbud</h3>
              <p className="text-gray-600 text-sm">
                Vi sender deg et tilbud innen 24 timer
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">3</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Få betalt</h3>
              <p className="text-gray-600 text-sm">
                Vi henter enhetene og sender betaling raskt
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
