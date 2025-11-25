"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Plus,
  Edit,
  Trash2,
  GripVertical,
  Search,
  Eye,
  EyeOff,
  Star,
  Upload,
  X,
  Building2,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { Partner } from "@/types";
import { mockPartners } from "@/lib/mock-data";

const MAX_TESTIMONIAL_LENGTH = 500;

interface PartnerFormData {
  companyName: string;
  websiteUrl: string;
  logoUrl: string;
  testimonialText: string;
  spokespersonName: string;
  spokespersonTitle: string;
  starRating: number;
  isActive: boolean;
  showInCarousel: boolean;
  showTestimonial: boolean;
}

const initialFormData: PartnerFormData = {
  companyName: "",
  websiteUrl: "",
  logoUrl: "",
  testimonialText: "",
  spokespersonName: "",
  spokespersonTitle: "",
  starRating: 5,
  isActive: true,
  showInCarousel: true,
  showTestimonial: true,
};

export default function PartnerManagement() {
  const [partners, setPartners] = useState<Partner[]>(mockPartners);
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingPartner, setEditingPartner] = useState<Partner | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [deletingPartner, setDeletingPartner] = useState<Partner | null>(null);
  const [formData, setFormData] = useState<PartnerFormData>(initialFormData);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const filteredPartners = partners.filter((partner) =>
    partner.companyName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenAddModal = () => {
    setEditingPartner(null);
    setFormData(initialFormData);
    setValidationError(null);
    setShowModal(true);
  };

  const handleOpenEditModal = (partner: Partner) => {
    setEditingPartner(partner);
    setValidationError(null);
    setFormData({
      companyName: partner.companyName,
      websiteUrl: partner.websiteUrl || "",
      logoUrl: partner.logoUrl,
      testimonialText: partner.testimonialText || "",
      spokespersonName: partner.spokespersonName || "",
      spokespersonTitle: partner.spokespersonTitle || "",
      starRating: partner.starRating,
      isActive: partner.isActive,
      showInCarousel: partner.showInCarousel,
      showTestimonial: partner.showTestimonial,
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingPartner(null);
    setFormData(initialFormData);
    setValidationError(null);
  };

  const handleSavePartner = () => {
    if (!formData.companyName || !formData.logoUrl) {
      setValidationError("Firmanavn og logo er påkrevd");
      return;
    }
    setValidationError(null);

    if (editingPartner) {
      setPartners(
        partners.map((p) =>
          p.id === editingPartner.id
            ? {
                ...p,
                ...formData,
                updatedAt: new Date(),
              }
            : p
        )
      );
    } else {
      const newPartner: Partner = {
        id: crypto.randomUUID(),
        ...formData,
        displayOrder: partners.length + 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setPartners([...partners, newPartner]);
    }
    handleCloseModal();
  };

  const handleDeletePartner = () => {
    if (deletingPartner) {
      setPartners(partners.filter((p) => p.id !== deletingPartner.id));
      setShowDeleteModal(false);
      setDeletingPartner(null);
    }
  };

  const handleToggleActive = (partnerId: string) => {
    setPartners(
      partners.map((p) =>
        p.id === partnerId ? { ...p, isActive: !p.isActive } : p
      )
    );
  };

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;

    const newPartners = [...filteredPartners];
    const draggedPartner = newPartners[draggedIndex];
    newPartners.splice(draggedIndex, 1);
    newPartners.splice(index, 0, draggedPartner);

    const updatedPartners = newPartners.map((p, i) => ({
      ...p,
      displayOrder: i + 1,
    }));

    setPartners(updatedPartners);
    setDraggedIndex(index);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-gray-900 text-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/admin-secure">
                <Button variant="ghost" size="icon" className="text-white">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              <div>
                <h1 className="text-xl font-bold">Partnere</h1>
                <p className="text-sm text-gray-400">
                  Administrer samarbeidspartnere og uttalelser
                </p>
              </div>
            </div>
            <Button onClick={handleOpenAddModal}>
              <Plus className="w-4 h-4 mr-2" />
              Legg til partner
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="py-4">
              <div className="flex items-center space-x-3">
                <Building2 className="w-8 h-8 text-green-600" />
                <div>
                  <p className="text-sm text-gray-500">Totalt partnere</p>
                  <p className="text-2xl font-bold">{partners.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="py-4">
              <div className="flex items-center space-x-3">
                <Eye className="w-8 h-8 text-blue-500" />
                <div>
                  <p className="text-sm text-gray-500">Aktive</p>
                  <p className="text-2xl font-bold">
                    {partners.filter((p) => p.isActive).length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="py-4">
              <div className="flex items-center space-x-3">
                <Star className="w-8 h-8 text-yellow-500" />
                <div>
                  <p className="text-sm text-gray-500">Med uttalelser</p>
                  <p className="text-2xl font-bold">
                    {
                      partners.filter(
                        (p) => p.testimonialText && p.showTestimonial
                      ).length
                    }
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="py-4">
              <div className="flex items-center space-x-3">
                <EyeOff className="w-8 h-8 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Inaktive</p>
                  <p className="text-2xl font-bold">
                    {partners.filter((p) => !p.isActive).length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <Card className="mb-6">
          <CardContent className="py-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Søk etter partnere..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Partners List */}
        <Card>
          <CardHeader>
            <CardTitle>Partnerliste</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {filteredPartners.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  Ingen partnere funnet
                </div>
              ) : (
                filteredPartners
                  .sort((a, b) => a.displayOrder - b.displayOrder)
                  .map((partner, index) => (
                    <div
                      key={partner.id}
                      draggable
                      onDragStart={() => handleDragStart(index)}
                      onDragOver={(e) => handleDragOver(e, index)}
                      onDragEnd={handleDragEnd}
                      className={`flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-move ${
                        draggedIndex === index ? "opacity-50" : ""
                      }`}
                    >
                      <div className="flex items-center space-x-4">
                        <GripVertical className="w-5 h-5 text-gray-400" />
                        <div className="w-16 h-10 relative flex-shrink-0 bg-white rounded border">
                          {partner.logoUrl ? (
                            <Image
                              src={partner.logoUrl}
                              alt={partner.companyName}
                              fill
                              className="object-contain p-1"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-300">
                              <Building2 className="w-6 h-6" />
                            </div>
                          )}
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <p className="font-medium text-gray-900">
                              {partner.companyName}
                            </p>
                            {partner.websiteUrl && (
                              <a
                                href={partner.websiteUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-green-600"
                              >
                                <ExternalLink className="w-4 h-4" />
                              </a>
                            )}
                          </div>
                          <div className="flex items-center space-x-2 mt-1">
                            {partner.showTestimonial &&
                              partner.testimonialText && (
                                <Badge variant="secondary" className="text-xs">
                                  Uttalelse
                                </Badge>
                              )}
                            <div className="flex items-center">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-3 h-3 ${
                                    i < partner.starRating
                                      ? "text-yellow-400 fill-yellow-400"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge
                          variant={partner.isActive ? "success" : "secondary"}
                          className="cursor-pointer"
                          onClick={() => handleToggleActive(partner.id)}
                        >
                          {partner.isActive ? "Aktiv" : "Inaktiv"}
                        </Badge>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleOpenEditModal(partner)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-600 hover:text-red-700"
                          onClick={() => {
                            setDeletingPartner(partner);
                            setShowDeleteModal(true);
                          }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))
              )}
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 overflow-y-auto py-8">
          <Card className="w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>
                  {editingPartner ? "Rediger partner" : "Legg til partner"}
                </CardTitle>
                <Button variant="ghost" size="sm" onClick={handleCloseModal}>
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Validation Error */}
              {validationError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                  {validationError}
                </div>
              )}
              {/* Company Information */}
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900">
                  Firmainformasjon
                </h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Firmanavn <span className="text-red-500">*</span>
                  </label>
                  <Input
                    value={formData.companyName}
                    onChange={(e) =>
                      setFormData({ ...formData, companyName: e.target.value })
                    }
                    placeholder="F.eks. Microsoft Norge"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nettside URL
                  </label>
                  <Input
                    value={formData.websiteUrl}
                    onChange={(e) =>
                      setFormData({ ...formData, websiteUrl: e.target.value })
                    }
                    placeholder="https://example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Logo URL <span className="text-red-500">*</span>
                  </label>
                  <div className="flex space-x-2">
                    <Input
                      value={formData.logoUrl}
                      onChange={(e) =>
                        setFormData({ ...formData, logoUrl: e.target.value })
                      }
                      placeholder="/images/partners/logo.svg"
                    />
                    <Button variant="outline" className="flex-shrink-0">
                      <Upload className="w-4 h-4 mr-2" />
                      Last opp
                    </Button>
                  </div>
                  {formData.logoUrl && (
                    <div className="mt-2 p-4 bg-gray-50 rounded-lg flex justify-center">
                      <Image
                        src={formData.logoUrl}
                        alt="Logo preview"
                        width={150}
                        height={80}
                        className="object-contain"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "/images/placeholder.png";
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Testimonial */}
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900">Uttalelse</h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Uttalelsetekst
                  </label>
                  <Textarea
                    value={formData.testimonialText}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        testimonialText: e.target.value.slice(0, MAX_TESTIMONIAL_LENGTH),
                      })
                    }
                    placeholder="Skriv uttalelsen her..."
                    rows={4}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {formData.testimonialText.length}/{MAX_TESTIMONIAL_LENGTH} tegn
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Navn på talsperson
                    </label>
                    <Input
                      value={formData.spokespersonName}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          spokespersonName: e.target.value,
                        })
                      }
                      placeholder="F.eks. Ole Nordmann"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Stilling
                    </label>
                    <Input
                      value={formData.spokespersonTitle}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          spokespersonTitle: e.target.value,
                        })
                      }
                      placeholder="F.eks. IT Director"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Stjernebedømmelse
                  </label>
                  <div className="flex space-x-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() =>
                          setFormData({ ...formData, starRating: i + 1 })
                        }
                        className="p-1"
                      >
                        <Star
                          className={`w-8 h-8 transition-colors ${
                            i < formData.starRating
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300 hover:text-yellow-200"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Display Settings */}
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900">
                  Visningsinnstillinger
                </h3>
                <div className="space-y-3">
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isActive}
                      onChange={(e) =>
                        setFormData({ ...formData, isActive: e.target.checked })
                      }
                      className="w-4 h-4 text-green-600 rounded border-gray-300 focus:ring-green-500"
                    />
                    <span className="text-sm text-gray-700">
                      Aktiv (vises på nettstedet)
                    </span>
                  </label>
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.showInCarousel}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          showInCarousel: e.target.checked,
                        })
                      }
                      className="w-4 h-4 text-green-600 rounded border-gray-300 focus:ring-green-500"
                    />
                    <span className="text-sm text-gray-700">
                      Vis i logo-karusell
                    </span>
                  </label>
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.showTestimonial}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          showTestimonial: e.target.checked,
                        })
                      }
                      className="w-4 h-4 text-green-600 rounded border-gray-300 focus:ring-green-500"
                    />
                    <span className="text-sm text-gray-700">
                      Vis uttalelse
                    </span>
                  </label>
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-4 pt-4 border-t">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={handleCloseModal}
                >
                  Avbryt
                </Button>
                <Button className="flex-1" onClick={handleSavePartner}>
                  {editingPartner ? "Lagre endringer" : "Legg til partner"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && deletingPartner && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md mx-4">
            <CardHeader>
              <CardTitle className="text-red-600">Slett partner</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                Er du sikker på at du vil slette{" "}
                <strong>{deletingPartner.companyName}</strong>? Denne handlingen
                kan ikke angres.
              </p>
              <div className="flex space-x-4">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    setShowDeleteModal(false);
                    setDeletingPartner(null);
                  }}
                >
                  Avbryt
                </Button>
                <Button
                  variant="destructive"
                  className="flex-1"
                  onClick={handleDeletePartner}
                >
                  Slett
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
