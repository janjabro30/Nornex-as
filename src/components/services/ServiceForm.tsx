"use client";

import React, { useState } from "react";
import { Plus, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { StepProgress } from "./ServiceSteps";
import { cn } from "@/lib/utils";

export interface DeviceFormData {
  id: string;
  deviceType: string;
  brand: string;
  model: string;
  serialNumber: string;
  quantity: number;
  condition: string;
  problemDescription?: string;
  repairType?: string;
  urgency?: string;
  accessories: string[];
}

export interface ServiceFormProps {
  serviceType: "sell" | "repair" | "trade-in";
  steps: { label: string }[];
  onSubmit: (devices: DeviceFormData[], contactInfo: ContactFormData) => void;
  className?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  company?: string;
  address?: string;
}

const deviceTypes = [
  { value: "laptop", label: "Bærbar PC" },
  { value: "desktop", label: "Stasjonær PC" },
  { value: "monitor", label: "Skjerm" },
  { value: "smartphone", label: "Smarttelefon" },
  { value: "tablet", label: "Nettbrett" },
  { value: "server", label: "Server" },
  { value: "networking", label: "Nettverksutstyr" },
  { value: "printer", label: "Skriver" },
  { value: "other", label: "Annet" },
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
  "LG",
  "Sony",
  "Cisco",
  "Annet",
];

const conditions = [
  { value: "excellent", label: "Utmerket - Som ny" },
  { value: "good", label: "God - Mindre bruksspor" },
  { value: "fair", label: "Brukbar - Noe slitasje" },
  { value: "poor", label: "Dårlig - Mye slitasje" },
  { value: "broken", label: "Defekt - Fungerer ikke" },
];

const accessories = [
  { id: "original_box", label: "Original emballasje" },
  { id: "charger", label: "Lader" },
  { id: "cables", label: "Kabler" },
  { id: "keyboard", label: "Tastatur" },
  { id: "mouse", label: "Mus" },
  { id: "docking", label: "Docking station" },
  { id: "stylus", label: "Stylus/Pen" },
  { id: "manuals", label: "Manualer/dokumentasjon" },
];

const repairTypes = [
  { value: "screen", label: "Skjermreparasjon" },
  { value: "battery", label: "Batteribytte" },
  { value: "keyboard", label: "Tastaturbytte" },
  { value: "software", label: "Programvare/OS" },
  { value: "data_recovery", label: "Datagjenoppretting" },
  { value: "hardware", label: "Maskinvarefeil" },
  { value: "cleaning", label: "Rengjøring/støvfjerning" },
  { value: "upgrade", label: "Oppgradering" },
  { value: "diagnostic", label: "Diagnostikk" },
  { value: "other", label: "Annet" },
];

const urgencyOptions = [
  { value: "standard", label: "Standard (5-7 virkedager)" },
  { value: "express", label: "Ekspress (2-3 virkedager)" },
  { value: "urgent", label: "Haster (1-2 virkedager)" },
];

const createEmptyDevice = (): DeviceFormData => ({
  id: Math.random().toString(36).substring(7),
  deviceType: "",
  brand: "",
  model: "",
  serialNumber: "",
  quantity: 1,
  condition: "",
  problemDescription: "",
  repairType: "",
  urgency: "standard",
  accessories: [],
});

export function ServiceForm({ serviceType, steps, onSubmit, className }: ServiceFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [devices, setDevices] = useState<DeviceFormData[]>([createEmptyDevice()]);
  const [contactInfo, setContactInfo] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    company: "",
    address: "",
  });

  const addDevice = () => {
    setDevices([...devices, createEmptyDevice()]);
  };

  const removeDevice = (id: string) => {
    if (devices.length > 1) {
      setDevices(devices.filter((d) => d.id !== id));
    }
  };

  const updateDevice = (id: string, field: keyof DeviceFormData, value: string | number | string[]) => {
    setDevices(
      devices.map((d) => (d.id === id ? { ...d, [field]: value } : d))
    );
  };

  const toggleAccessory = (deviceId: string, accessoryId: string) => {
    setDevices(
      devices.map((d) => {
        if (d.id !== deviceId) return d;
        const accessories = d.accessories.includes(accessoryId)
          ? d.accessories.filter((a) => a !== accessoryId)
          : [...d.accessories, accessoryId];
        return { ...d, accessories };
      })
    );
  };

  const handleContactChange = (field: keyof ContactFormData, value: string) => {
    setContactInfo({ ...contactInfo, [field]: value });
  };

  const handleSubmit = () => {
    onSubmit(devices, contactInfo);
  };

  const isStepValid = (): boolean => {
    if (currentStep === 1) {
      return devices.every(
        (d) =>
          d.deviceType &&
          d.brand &&
          d.model &&
          (serviceType !== "repair" || (d.problemDescription && d.problemDescription.length >= 20))
      );
    }
    if (currentStep === steps.length) {
      return Boolean(contactInfo.name && contactInfo.email);
    }
    return true;
  };

  return (
    <div className={cn("space-y-6", className)}>
      <StepProgress steps={steps} currentStep={currentStep} />

      {/* Device Information Step */}
      {currentStep === 1 && (
        <div className="space-y-6">
          {devices.map((device, index) => (
            <Card key={device.id} className="relative">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-gray-900">
                    Enhet {index + 1}
                  </h4>
                  {devices.length > 1 && (
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
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Enhetstype *
                    </label>
                    <select
                      value={device.deviceType}
                      onChange={(e) => updateDevice(device.id, "deviceType", e.target.value)}
                      className="w-full h-10 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
                    >
                      <option value="">Velg type</option>
                      {deviceTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Merke *
                    </label>
                    <select
                      value={device.brand}
                      onChange={(e) => updateDevice(device.id, "brand", e.target.value)}
                      className="w-full h-10 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
                    >
                      <option value="">Velg merke</option>
                      {brands.map((brand) => (
                        <option key={brand} value={brand}>
                          {brand}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Modell *
                    </label>
                    <Input
                      value={device.model}
                      onChange={(e) => updateDevice(device.id, "model", e.target.value)}
                      placeholder="f.eks. MacBook Pro 14, ThinkPad X1..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Serienummer <span className="text-gray-400">(Valgfritt)</span>
                    </label>
                    <Input
                      value={device.serialNumber}
                      onChange={(e) => updateDevice(device.id, "serialNumber", e.target.value)}
                      placeholder="Serienummer"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Antall
                    </label>
                    <Input
                      type="number"
                      min={1}
                      value={device.quantity}
                      onChange={(e) => updateDevice(device.id, "quantity", parseInt(e.target.value) || 1)}
                    />
                  </div>

                  {(serviceType === "sell" || serviceType === "trade-in") && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Tilstand *
                      </label>
                      <select
                        value={device.condition}
                        onChange={(e) => updateDevice(device.id, "condition", e.target.value)}
                        className="w-full h-10 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
                      >
                        <option value="">Velg tilstand</option>
                        {conditions.map((condition) => (
                          <option key={condition.value} value={condition.value}>
                            {condition.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>

                {serviceType === "repair" && (
                  <>
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Beskriv problemet * <span className="text-gray-400">(min. 20 tegn)</span>
                      </label>
                      <Textarea
                        value={device.problemDescription || ""}
                        onChange={(e) => updateDevice(device.id, "problemDescription", e.target.value)}
                        placeholder="Beskriv problemet med enheten din..."
                        rows={3}
                        className={cn(
                          device.problemDescription && device.problemDescription.length < 20
                            ? "border-red-300 focus:ring-red-500"
                            : ""
                        )}
                      />
                      {device.problemDescription && (
                        <p className={cn(
                          "text-xs mt-1",
                          device.problemDescription.length < 20 ? "text-red-500" : "text-gray-500"
                        )}>
                          {device.problemDescription.length}/20 tegn
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Type reparasjon
                        </label>
                        <select
                          value={device.repairType || ""}
                          onChange={(e) => updateDevice(device.id, "repairType", e.target.value)}
                          className="w-full h-10 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
                        >
                          <option value="">Velg type</option>
                          {repairTypes.map((type) => (
                            <option key={type.value} value={type.value}>
                              {type.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Hastegrad
                        </label>
                        <select
                          value={device.urgency || "standard"}
                          onChange={(e) => updateDevice(device.id, "urgency", e.target.value)}
                          className="w-full h-10 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
                        >
                          {urgencyOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </>
                )}

                {serviceType === "sell" && (
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Inkludert tilbehør
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {accessories.map((accessory) => (
                        <label
                          key={accessory.id}
                          className={cn(
                            "flex items-center gap-2 p-2 rounded-lg border cursor-pointer transition-colors",
                            device.accessories.includes(accessory.id)
                              ? "border-green-600 bg-green-50"
                              : "border-gray-200 hover:border-gray-300"
                          )}
                        >
                          <input
                            type="checkbox"
                            checked={device.accessories.includes(accessory.id)}
                            onChange={() => toggleAccessory(device.id, accessory.id)}
                            className="sr-only"
                          />
                          <div
                            className={cn(
                              "w-4 h-4 rounded border flex items-center justify-center",
                              device.accessories.includes(accessory.id)
                                ? "bg-green-600 border-green-600"
                                : "border-gray-300"
                            )}
                          >
                            {device.accessories.includes(accessory.id) && (
                              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            )}
                          </div>
                          <span className="text-sm text-gray-700">{accessory.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}

          <Button
            type="button"
            variant="outline"
            onClick={addDevice}
            className="w-full"
          >
            <Plus className="w-4 h-4 mr-2" />
            Legg til enhet
          </Button>
        </div>
      )}

      {/* Contact Information Step */}
      {currentStep === steps.length && (
        <Card>
          <CardContent className="pt-6 space-y-4">
            <h4 className="font-semibold text-gray-900 mb-4">Kontaktinformasjon</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Fullt navn *
                </label>
                <Input
                  value={contactInfo.name}
                  onChange={(e) => handleContactChange("name", e.target.value)}
                  placeholder="Ola Nordmann"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  E-post *
                </label>
                <Input
                  type="email"
                  value={contactInfo.email}
                  onChange={(e) => handleContactChange("email", e.target.value)}
                  placeholder="ola@eksempel.no"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Telefon
                </label>
                <Input
                  type="tel"
                  value={contactInfo.phone}
                  onChange={(e) => handleContactChange("phone", e.target.value)}
                  placeholder="+47 123 45 678"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bedrift <span className="text-gray-400">(Valgfritt)</span>
                </label>
                <Input
                  value={contactInfo.company || ""}
                  onChange={(e) => handleContactChange("company", e.target.value)}
                  placeholder="Bedriftsnavn"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
          disabled={currentStep === 1}
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Tilbake
        </Button>

        {currentStep < steps.length ? (
          <Button
            type="button"
            onClick={() => setCurrentStep((prev) => prev + 1)}
            disabled={!isStepValid()}
          >
            Neste
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        ) : (
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={!isStepValid()}
            className="bg-gray-900 hover:bg-gray-800"
          >
            Send forespørsel
          </Button>
        )}
      </div>
    </div>
  );
}
