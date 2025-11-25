"use client";

import React, { useState } from "react";
import {
  Plus,
  Trash2,
  GripVertical,
  Save,
  Eye,
  ArrowLeft,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export interface ServiceStepData {
  id: string;
  stepNumber: number;
  title: string;
  titleNo: string;
  description: string;
  descriptionNo: string;
  iconName: string;
  duration?: string;
  helpText?: string;
}

export interface ServiceBenefitData {
  id: string;
  title: string;
  titleNo: string;
  description?: string;
  descriptionNo?: string;
  iconName: string;
}

export interface ServiceEditorData {
  id?: string;
  name: string;
  nameNo: string;
  slug: string;
  tagline: string;
  taglineNo: string;
  description: string;
  descriptionNo: string;
  iconName: string;
  backgroundColor: string;
  featuredImage: string;
  status: "ACTIVE" | "INACTIVE" | "DRAFT";
  
  // CTA
  ctaButtonText: string;
  ctaButtonLink: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  
  // SEO
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  ogImage: string;
  
  steps: ServiceStepData[];
  benefits: ServiceBenefitData[];
}

interface ServiceEditorProps {
  initialData?: Partial<ServiceEditorData>;
  onSave: (data: ServiceEditorData) => void;
  onCancel: () => void;
  onPreview?: (data: ServiceEditorData) => void;
}

const defaultData: ServiceEditorData = {
  name: "",
  nameNo: "",
  slug: "",
  tagline: "",
  taglineNo: "",
  description: "",
  descriptionNo: "",
  iconName: "Package",
  backgroundColor: "#16a34a",
  featuredImage: "",
  status: "DRAFT",
  ctaButtonText: "Kom i gang",
  ctaButtonLink: "",
  secondaryButtonText: "",
  secondaryButtonLink: "",
  metaTitle: "",
  metaDescription: "",
  keywords: "",
  ogImage: "",
  steps: [],
  benefits: [],
};

const availableIcons = [
  "Package", "RefreshCw", "Wrench", "DollarSign", "Shield", "Truck",
  "Check", "CheckCircle", "Sparkles", "Leaf", "Recycle", "Award",
  "Clock", "Cpu", "HeadphonesIcon", "FileText", "Send", "Settings",
];

export function ServiceEditor({
  initialData,
  onSave,
  onCancel,
  onPreview,
}: ServiceEditorProps) {
  const [data, setData] = useState<ServiceEditorData>({
    ...defaultData,
    ...initialData,
  });
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    basic: true,
    steps: false,
    benefits: false,
    cta: false,
    seo: false,
  });

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const updateField = (field: keyof ServiceEditorData, value: string | ServiceStepData[] | ServiceBenefitData[]) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  // Auto-generate slug from Norwegian name
  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/æ/g, "ae")
      .replace(/ø/g, "o")
      .replace(/å/g, "a")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  // Step management
  const addStep = () => {
    const newStep: ServiceStepData = {
      id: Math.random().toString(36).substring(7),
      stepNumber: data.steps.length + 1,
      title: "",
      titleNo: "",
      description: "",
      descriptionNo: "",
      iconName: "Check",
    };
    updateField("steps", [...data.steps, newStep]);
  };

  const updateStep = (id: string, field: keyof ServiceStepData, value: string | number) => {
    setData((prev) => ({
      ...prev,
      steps: prev.steps.map((step) =>
        step.id === id ? { ...step, [field]: value } : step
      ),
    }));
  };

  const removeStep = (id: string) => {
    setData((prev) => ({
      ...prev,
      steps: prev.steps
        .filter((step) => step.id !== id)
        .map((step, index) => ({ ...step, stepNumber: index + 1 })),
    }));
  };

  // Benefit management
  const addBenefit = () => {
    const newBenefit: ServiceBenefitData = {
      id: Math.random().toString(36).substring(7),
      title: "",
      titleNo: "",
      iconName: "Check",
    };
    updateField("benefits", [...data.benefits, newBenefit]);
  };

  const updateBenefit = (id: string, field: keyof ServiceBenefitData, value: string) => {
    setData((prev) => ({
      ...prev,
      benefits: prev.benefits.map((benefit) =>
        benefit.id === id ? { ...benefit, [field]: value } : benefit
      ),
    }));
  };

  const removeBenefit = (id: string) => {
    setData((prev) => ({
      ...prev,
      benefits: prev.benefits.filter((benefit) => benefit.id !== id),
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={onCancel}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Tilbake
          </Button>
          <h1 className="text-2xl font-bold">
            {initialData?.id ? "Rediger tjeneste" : "Ny tjeneste"}
          </h1>
        </div>
        <div className="flex items-center gap-2">
          {onPreview && (
            <Button variant="outline" onClick={() => onPreview(data)}>
              <Eye className="w-4 h-4 mr-2" />
              Forhåndsvis
            </Button>
          )}
          <Button onClick={() => onSave(data)}>
            <Save className="w-4 h-4 mr-2" />
            Lagre
          </Button>
        </div>
      </div>

      {/* Status Badge */}
      <div className="flex items-center gap-4">
        <label className="text-sm font-medium">Status:</label>
        <select
          value={data.status}
          onChange={(e) => updateField("status", e.target.value as ServiceEditorData["status"])}
          className="h-9 rounded-md border border-gray-300 bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
        >
          <option value="DRAFT">Utkast</option>
          <option value="ACTIVE">Aktiv</option>
          <option value="INACTIVE">Inaktiv</option>
        </select>
      </div>

      {/* Basic Information Section */}
      <Card>
        <CardHeader
          className="cursor-pointer"
          onClick={() => toggleSection("basic")}
        >
          <div className="flex items-center justify-between">
            <CardTitle>Grunnleggende informasjon</CardTitle>
            {expandedSections.basic ? (
              <ChevronUp className="w-5 h-5" />
            ) : (
              <ChevronDown className="w-5 h-5" />
            )}
          </div>
        </CardHeader>
        {expandedSections.basic && (
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tjenestenavn (Norsk) *
                </label>
                <Input
                  value={data.nameNo}
                  onChange={(e) => {
                    updateField("nameNo", e.target.value);
                    if (!data.slug) {
                      updateField("slug", generateSlug(e.target.value));
                    }
                  }}
                  placeholder="f.eks. Innbytteprogram"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tjenestenavn (Engelsk)
                </label>
                <Input
                  value={data.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  placeholder="e.g. Trade-in Program"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                URL-slug *
              </label>
              <div className="flex items-center">
                <span className="text-gray-500 text-sm mr-2">/tjenester/</span>
                <Input
                  value={data.slug}
                  onChange={(e) => updateField("slug", generateSlug(e.target.value))}
                  placeholder="innbytte"
                  className="flex-1"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Undertekst (Norsk)
                </label>
                <Input
                  value={data.taglineNo}
                  onChange={(e) => updateField("taglineNo", e.target.value)}
                  placeholder="Kort beskrivelse..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Undertekst (Engelsk)
                </label>
                <Input
                  value={data.tagline}
                  onChange={(e) => updateField("tagline", e.target.value)}
                  placeholder="Short description..."
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Beskrivelse (Norsk) *
              </label>
              <Textarea
                value={data.descriptionNo}
                onChange={(e) => updateField("descriptionNo", e.target.value)}
                placeholder="Hovedbeskrivelse av tjenesten..."
                rows={4}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Beskrivelse (Engelsk)
              </label>
              <Textarea
                value={data.description}
                onChange={(e) => updateField("description", e.target.value)}
                placeholder="Main service description..."
                rows={4}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ikon
                </label>
                <select
                  value={data.iconName}
                  onChange={(e) => updateField("iconName", e.target.value)}
                  className="w-full h-10 rounded-md border border-gray-300 bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
                >
                  {availableIcons.map((icon) => (
                    <option key={icon} value={icon}>
                      {icon}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bakgrunnsfarge
                </label>
                <div className="flex gap-2">
                  <Input
                    type="color"
                    value={data.backgroundColor}
                    onChange={(e) => updateField("backgroundColor", e.target.value)}
                    className="w-12 h-10 p-1"
                  />
                  <Input
                    value={data.backgroundColor}
                    onChange={(e) => updateField("backgroundColor", e.target.value)}
                    placeholder="#16a34a"
                    className="flex-1"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Process Steps Section */}
      <Card>
        <CardHeader
          className="cursor-pointer"
          onClick={() => toggleSection("steps")}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CardTitle>Prosesstrinn</CardTitle>
              <Badge variant="secondary">{data.steps.length}</Badge>
            </div>
            {expandedSections.steps ? (
              <ChevronUp className="w-5 h-5" />
            ) : (
              <ChevronDown className="w-5 h-5" />
            )}
          </div>
        </CardHeader>
        {expandedSections.steps && (
          <CardContent className="space-y-4">
            {data.steps.map((step) => (
              <Card key={step.id} className="bg-gray-50">
                <CardContent className="pt-4">
                  <div className="flex items-start gap-4">
                    <div className="flex items-center gap-2 mt-6">
                      <GripVertical className="w-4 h-4 text-gray-400 cursor-grab" />
                      <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                        {step.stepNumber}
                      </div>
                    </div>
                    <div className="flex-1 space-y-3">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-medium text-gray-500 mb-1">
                            Tittel (Norsk)
                          </label>
                          <Input
                            value={step.titleNo}
                            onChange={(e) => updateStep(step.id, "titleNo", e.target.value)}
                            placeholder="Trinn tittel..."
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-500 mb-1">
                            Tittel (Engelsk)
                          </label>
                          <Input
                            value={step.title}
                            onChange={(e) => updateStep(step.id, "title", e.target.value)}
                            placeholder="Step title..."
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-medium text-gray-500 mb-1">
                            Beskrivelse (Norsk)
                          </label>
                          <Textarea
                            value={step.descriptionNo}
                            onChange={(e) => updateStep(step.id, "descriptionNo", e.target.value)}
                            placeholder="Beskrivelse..."
                            rows={2}
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-500 mb-1">
                            Beskrivelse (Engelsk)
                          </label>
                          <Textarea
                            value={step.description}
                            onChange={(e) => updateStep(step.id, "description", e.target.value)}
                            placeholder="Description..."
                            rows={2}
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        <div>
                          <label className="block text-xs font-medium text-gray-500 mb-1">
                            Ikon
                          </label>
                          <select
                            value={step.iconName}
                            onChange={(e) => updateStep(step.id, "iconName", e.target.value)}
                            className="w-full h-9 rounded-md border border-gray-300 bg-white px-3 text-sm"
                          >
                            {availableIcons.map((icon) => (
                              <option key={icon} value={icon}>
                                {icon}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-500 mb-1">
                            Varighet (valgfritt)
                          </label>
                          <Input
                            value={step.duration || ""}
                            onChange={(e) => updateStep(step.id, "duration", e.target.value)}
                            placeholder="f.eks. 5 min"
                          />
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeStep(step.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50 mt-6"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
            <Button variant="outline" onClick={addStep} className="w-full">
              <Plus className="w-4 h-4 mr-2" />
              Legg til trinn
            </Button>
          </CardContent>
        )}
      </Card>

      {/* Benefits Section */}
      <Card>
        <CardHeader
          className="cursor-pointer"
          onClick={() => toggleSection("benefits")}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CardTitle>Fordeler</CardTitle>
              <Badge variant="secondary">{data.benefits.length}</Badge>
            </div>
            {expandedSections.benefits ? (
              <ChevronUp className="w-5 h-5" />
            ) : (
              <ChevronDown className="w-5 h-5" />
            )}
          </div>
        </CardHeader>
        {expandedSections.benefits && (
          <CardContent className="space-y-4">
            {data.benefits.map((benefit) => (
              <Card key={benefit.id} className="bg-gray-50">
                <CardContent className="pt-4">
                  <div className="flex items-start gap-4">
                    <div className="flex-1 space-y-3">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-medium text-gray-500 mb-1">
                            Tittel (Norsk)
                          </label>
                          <Input
                            value={benefit.titleNo}
                            onChange={(e) => updateBenefit(benefit.id, "titleNo", e.target.value)}
                            placeholder="Fordelstittel..."
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-500 mb-1">
                            Tittel (Engelsk)
                          </label>
                          <Input
                            value={benefit.title}
                            onChange={(e) => updateBenefit(benefit.id, "title", e.target.value)}
                            placeholder="Benefit title..."
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-medium text-gray-500 mb-1">
                            Beskrivelse (Norsk, valgfritt)
                          </label>
                          <Input
                            value={benefit.descriptionNo || ""}
                            onChange={(e) => updateBenefit(benefit.id, "descriptionNo", e.target.value)}
                            placeholder="Valgfri beskrivelse..."
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-500 mb-1">
                            Ikon
                          </label>
                          <select
                            value={benefit.iconName}
                            onChange={(e) => updateBenefit(benefit.id, "iconName", e.target.value)}
                            className="w-full h-9 rounded-md border border-gray-300 bg-white px-3 text-sm"
                          >
                            <option value="Check">Sjekkmerke (standard)</option>
                            {availableIcons.map((icon) => (
                              <option key={icon} value={icon}>
                                {icon}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeBenefit(benefit.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
            <Button variant="outline" onClick={addBenefit} className="w-full">
              <Plus className="w-4 h-4 mr-2" />
              Legg til fordel
            </Button>
          </CardContent>
        )}
      </Card>

      {/* CTA Section */}
      <Card>
        <CardHeader
          className="cursor-pointer"
          onClick={() => toggleSection("cta")}
        >
          <div className="flex items-center justify-between">
            <CardTitle>Handlingsknapper (CTA)</CardTitle>
            {expandedSections.cta ? (
              <ChevronUp className="w-5 h-5" />
            ) : (
              <ChevronDown className="w-5 h-5" />
            )}
          </div>
        </CardHeader>
        {expandedSections.cta && (
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Primærknapp tekst
                </label>
                <Input
                  value={data.ctaButtonText}
                  onChange={(e) => updateField("ctaButtonText", e.target.value)}
                  placeholder="Kom i gang"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Primærknapp lenke
                </label>
                <Input
                  value={data.ctaButtonLink}
                  onChange={(e) => updateField("ctaButtonLink", e.target.value)}
                  placeholder="/tjenester/innbytte"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Sekundærknapp tekst (valgfritt)
                </label>
                <Input
                  value={data.secondaryButtonText || ""}
                  onChange={(e) => updateField("secondaryButtonText", e.target.value)}
                  placeholder="Les mer"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Sekundærknapp lenke
                </label>
                <Input
                  value={data.secondaryButtonLink || ""}
                  onChange={(e) => updateField("secondaryButtonLink", e.target.value)}
                  placeholder="/om-tjenesten"
                />
              </div>
            </div>
          </CardContent>
        )}
      </Card>

      {/* SEO Section */}
      <Card>
        <CardHeader
          className="cursor-pointer"
          onClick={() => toggleSection("seo")}
        >
          <div className="flex items-center justify-between">
            <CardTitle>SEO-innstillinger</CardTitle>
            {expandedSections.seo ? (
              <ChevronUp className="w-5 h-5" />
            ) : (
              <ChevronDown className="w-5 h-5" />
            )}
          </div>
        </CardHeader>
        {expandedSections.seo && (
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Meta-tittel
              </label>
              <Input
                value={data.metaTitle}
                onChange={(e) => updateField("metaTitle", e.target.value)}
                placeholder="Sidetittel for søkemotorer"
              />
              <p className="text-xs text-gray-500 mt-1">
                {data.metaTitle.length}/60 tegn (anbefalt)
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Meta-beskrivelse
              </label>
              <Textarea
                value={data.metaDescription}
                onChange={(e) => updateField("metaDescription", e.target.value)}
                placeholder="Beskrivelse for søkemotorer..."
                rows={3}
              />
              <p className="text-xs text-gray-500 mt-1">
                {data.metaDescription.length}/160 tegn (anbefalt)
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nøkkelord
              </label>
              <Input
                value={data.keywords}
                onChange={(e) => updateField("keywords", e.target.value)}
                placeholder="innbytte, brukt elektronikk, trade-in"
              />
              <p className="text-xs text-gray-500 mt-1">
                Adskilt med komma
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Open Graph bilde-URL
              </label>
              <Input
                value={data.ogImage}
                onChange={(e) => updateField("ogImage", e.target.value)}
                placeholder="https://..."
              />
            </div>
          </CardContent>
        )}
      </Card>

      {/* Save Button (bottom) */}
      <div className="flex justify-end gap-2 pt-4 border-t">
        <Button variant="outline" onClick={onCancel}>
          Avbryt
        </Button>
        <Button onClick={() => onSave(data)}>
          <Save className="w-4 h-4 mr-2" />
          Lagre tjeneste
        </Button>
      </div>
    </div>
  );
}
