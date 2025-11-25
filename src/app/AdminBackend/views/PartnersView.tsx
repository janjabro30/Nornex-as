"use client";

import React, { useState } from "react";
import {
  Plus,
  Edit,
  Trash2,
  ExternalLink,
  GripVertical,
  X,
  Check,
  Eye,
  EyeOff,
  Users,
  Upload,
  Quote,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

interface Partner {
  id: string;
  name: string;
  logo: string;
  websiteUrl: string;
  testimonial: string;
  authorName: string;
  authorRole: string;
  displayOrder: number;
  isActive: boolean;
}

const mockPartners: Partner[] = [
  {
    id: "1",
    name: "TechCorp AS",
    logo: "/images/partners/techcorp.png",
    websiteUrl: "https://techcorp.no",
    testimonial:
      "Nornex har hjulpet oss med å redusere IT-kostnadene med 40% samtidig som vi har fått kvalitetsutstyr. Utmerket service!",
    authorName: "Erik Hansen",
    authorRole: "IT-sjef",
    displayOrder: 1,
    isActive: true,
  },
  {
    id: "2",
    name: "Grønn Framtid",
    logo: "/images/partners/gronn-framtid.png",
    websiteUrl: "https://gronnframtid.no",
    testimonial:
      "Som miljøorganisasjon setter vi pris på Nornex sitt fokus på bærekraft. De er en viktig partner i vårt arbeid.",
    authorName: "Maria Olsen",
    authorRole: "Daglig leder",
    displayOrder: 2,
    isActive: true,
  },
  {
    id: "3",
    name: "Oslo Kommune",
    logo: "/images/partners/oslo-kommune.png",
    websiteUrl: "https://oslo.kommune.no",
    testimonial:
      "Pålitelig leverandør av refurbished IT-utstyr til våre kontorer. God kvalitet og rask levering.",
    authorName: "Anders Berg",
    authorRole: "Innkjøpsansvarlig",
    displayOrder: 3,
    isActive: true,
  },
  {
    id: "4",
    name: "Startup Hub",
    logo: "/images/partners/startup-hub.png",
    websiteUrl: "https://startuphub.no",
    testimonial:
      "Perfekt for oppstartsbedrifter som trenger kvalitetsutstyr til en rimelig pris.",
    authorName: "Lisa Johansen",
    authorRole: "Grunnlegger",
    displayOrder: 4,
    isActive: false,
  },
];

export default function PartnersView() {
  const [partners, setPartners] = useState<Partner[]>(mockPartners);
  const [showModal, setShowModal] = useState(false);
  const [editingPartner, setEditingPartner] = useState<Partner | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [draggedItem, setDraggedItem] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    logo: "",
    websiteUrl: "",
    testimonial: "",
    authorName: "",
    authorRole: "",
    isActive: true,
  });

  const showNotification = (type: "success" | "error", message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleAddNew = () => {
    setEditingPartner(null);
    setFormData({
      name: "",
      logo: "",
      websiteUrl: "",
      testimonial: "",
      authorName: "",
      authorRole: "",
      isActive: true,
    });
    setShowModal(true);
  };

  const handleEdit = (partner: Partner) => {
    setEditingPartner(partner);
    setFormData({
      name: partner.name,
      logo: partner.logo,
      websiteUrl: partner.websiteUrl,
      testimonial: partner.testimonial,
      authorName: partner.authorName,
      authorRole: partner.authorRole,
      isActive: partner.isActive,
    });
    setShowModal(true);
  };

  const handleSave = () => {
    if (!formData.name) {
      showNotification("error", "Vennligst fyll inn partnernavn");
      return;
    }

    if (editingPartner) {
      setPartners(
        partners.map((p) =>
          p.id === editingPartner.id
            ? {
                ...p,
                ...formData,
              }
            : p
        )
      );
      showNotification("success", "Partner oppdatert");
    } else {
      const newPartner: Partner = {
        id: Date.now().toString(),
        ...formData,
        displayOrder: partners.length + 1,
      };
      setPartners([...partners, newPartner]);
      showNotification("success", "Ny partner lagt til");
    }

    setShowModal(false);
  };

  const handleDelete = (id: string) => {
    setPartners(partners.filter((p) => p.id !== id));
    setShowDeleteConfirm(null);
    showNotification("success", "Partner slettet");
  };

  const handleToggleActive = (id: string) => {
    setPartners(
      partners.map((p) => (p.id === id ? { ...p, isActive: !p.isActive } : p))
    );
  };

  const handleBulkToggle = (active: boolean) => {
    setPartners(
      partners.map((p) =>
        selectedIds.includes(p.id) ? { ...p, isActive: active } : p
      )
    );
    setSelectedIds([]);
    showNotification("success", `${selectedIds.length} partnere oppdatert`);
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === partners.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(partners.map((p) => p.id));
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleDragStart = (id: string) => {
    setDraggedItem(id);
  };

  const handleDragOver = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    if (!draggedItem || draggedItem === targetId) return;

    const draggedIndex = partners.findIndex((p) => p.id === draggedItem);
    const targetIndex = partners.findIndex((p) => p.id === targetId);

    const newPartners = [...partners];
    const [removed] = newPartners.splice(draggedIndex, 1);
    newPartners.splice(targetIndex, 0, removed);

    const updatedPartners = newPartners.map((p, index) => ({
      ...p,
      displayOrder: index + 1,
    }));

    setPartners(updatedPartners);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  const sortedPartners = [...partners].sort(
    (a, b) => a.displayOrder - b.displayOrder
  );

  return (
    <div className="space-y-6">
      {/* Notification Toast */}
      {notification && (
        <div
          className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-lg shadow-lg flex items-center space-x-2 ${
            notification.type === "success"
              ? "bg-green-600 text-white"
              : "bg-red-600 text-white"
          }`}
        >
          {notification.type === "success" ? (
            <Check className="w-5 h-5" />
          ) : (
            <X className="w-5 h-5" />
          )}
          <span>{notification.message}</span>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Partnere</h1>
          <p className="text-gray-500">
            Administrer partnere og anbefalinger
          </p>
        </div>
        <Button onClick={handleAddNew}>
          <Plus className="w-4 h-4 mr-2" />
          Legg til partner
        </Button>
      </div>

      {/* Bulk Actions */}
      {selectedIds.length > 0 && (
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="py-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-blue-800">
                {selectedIds.length} valgt
              </span>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleBulkToggle(true)}
                >
                  <Eye className="w-4 h-4 mr-1" />
                  Aktiver
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleBulkToggle(false)}
                >
                  <EyeOff className="w-4 h-4 mr-1" />
                  Deaktiver
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedIds([])}
                >
                  Avbryt
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Partners Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedPartners.map((partner) => (
          <Card
            key={partner.id}
            draggable
            onDragStart={() => handleDragStart(partner.id)}
            onDragOver={(e) => handleDragOver(e, partner.id)}
            onDragEnd={handleDragEnd}
            className={`relative ${
              draggedItem === partner.id ? "opacity-50" : ""
            } ${!partner.isActive ? "opacity-60" : ""}`}
          >
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(partner.id)}
                    onChange={() => toggleSelect(partner.id)}
                    className="rounded border-gray-300"
                  />
                  <GripVertical className="w-4 h-4 text-gray-300 cursor-grab" />
                </div>
                <Badge variant={partner.isActive ? "default" : "secondary"}>
                  {partner.isActive ? "Aktiv" : "Inaktiv"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              {/* Logo Preview */}
              <div className="w-full h-20 bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                {partner.logo ? (
                  <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center text-gray-500 text-xs">
                    {partner.name} logo
                  </div>
                ) : (
                  <Users className="w-8 h-8 text-gray-400" />
                )}
              </div>

              {/* Partner Info */}
              <h3 className="font-semibold text-gray-900 mb-2">{partner.name}</h3>
              
              {partner.websiteUrl && (
                <a
                  href={partner.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:underline flex items-center mb-3"
                >
                  {partner.websiteUrl}
                  <ExternalLink className="w-3 h-3 ml-1" />
                </a>
              )}

              {/* Testimonial */}
              {partner.testimonial && (
                <div className="bg-gray-50 rounded-lg p-3 mb-3">
                  <Quote className="w-4 h-4 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600 italic line-clamp-3">
                    &ldquo;{partner.testimonial}&rdquo;
                  </p>
                  {partner.authorName && (
                    <p className="text-xs text-gray-500 mt-2">
                      — {partner.authorName}
                      {partner.authorRole && `, ${partner.authorRole}`}
                    </p>
                  )}
                </div>
              )}

              {/* Actions */}
              <div className="flex justify-end space-x-2 pt-2 border-t">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleToggleActive(partner.id)}
                  title={partner.isActive ? "Deaktiver" : "Aktiver"}
                >
                  {partner.isActive ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleEdit(partner)}
                  title="Rediger"
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowDeleteConfirm(partner.id)}
                  className="text-red-600 hover:text-red-700"
                  title="Slett"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {partners.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 mb-4">Ingen partnere lagt til ennå</p>
            <Button onClick={handleAddNew}>
              <Plus className="w-4 h-4 mr-2" />
              Legg til første partner
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <CardHeader className="border-b">
              <div className="flex items-center justify-between">
                <CardTitle>
                  {editingPartner ? "Rediger partner" : "Legg til partner"}
                </CardTitle>
                <Button variant="ghost" size="sm" onClick={() => setShowModal(false)}>
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Partnernavn *
                </label>
                <Input
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="F.eks. TechCorp AS"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Logo
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">
                    Dra og slipp bilde, eller klikk for å laste opp
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    PNG, JPG opptil 2MB
                  </p>
                </div>
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
                  placeholder="https://..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Anbefaling/Sitat
                </label>
                <Textarea
                  value={formData.testimonial}
                  onChange={(e) =>
                    setFormData({ ...formData, testimonial: e.target.value })
                  }
                  rows={4}
                  placeholder="Hva sier partneren om samarbeidet?"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Forfatterens navn
                  </label>
                  <Input
                    value={formData.authorName}
                    onChange={(e) =>
                      setFormData({ ...formData, authorName: e.target.value })
                    }
                    placeholder="F.eks. Erik Hansen"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Stilling/Rolle
                  </label>
                  <Input
                    value={formData.authorRole}
                    onChange={(e) =>
                      setFormData({ ...formData, authorRole: e.target.value })
                    }
                    placeholder="F.eks. IT-sjef"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={formData.isActive}
                  onChange={(e) =>
                    setFormData({ ...formData, isActive: e.target.checked })
                  }
                  className="rounded border-gray-300"
                />
                <label htmlFor="isActive" className="text-sm text-gray-700">
                  Aktiv (vis på nettsiden)
                </label>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <Button variant="outline" onClick={() => setShowModal(false)}>
                  Avbryt
                </Button>
                <Button onClick={handleSave}>
                  {editingPartner ? "Lagre endringer" : "Legg til"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <CardHeader className="border-b">
              <CardTitle className="text-red-600">Bekreft sletting</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <p className="text-gray-600">
                Er du sikker på at du vil slette denne partneren? Denne handlingen
                kan ikke angres.
              </p>
              <div className="flex justify-end space-x-3">
                <Button variant="outline" onClick={() => setShowDeleteConfirm(null)}>
                  Avbryt
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(showDeleteConfirm)}
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
