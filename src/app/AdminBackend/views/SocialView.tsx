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
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Youtube,
  Github,
  Globe,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface SocialPlatform {
  id: string;
  platform: string;
  name: string;
  url: string;
  icon: string;
  isActive: boolean;
  displayOrder: number;
}

const platformOptions = [
  { value: "facebook", label: "Facebook", icon: "facebook" },
  { value: "instagram", label: "Instagram", icon: "instagram" },
  { value: "linkedin", label: "LinkedIn", icon: "linkedin" },
  { value: "twitter", label: "Twitter/X", icon: "twitter" },
  { value: "youtube", label: "YouTube", icon: "youtube" },
  { value: "tiktok", label: "TikTok", icon: "tiktok" },
  { value: "github", label: "GitHub", icon: "github" },
  { value: "custom", label: "Tilpasset", icon: "custom" },
];

const mockSocialLinks: SocialPlatform[] = [
  {
    id: "1",
    platform: "facebook",
    name: "Facebook",
    url: "https://facebook.com/nornexas",
    icon: "facebook",
    isActive: true,
    displayOrder: 1,
  },
  {
    id: "2",
    platform: "instagram",
    name: "Instagram",
    url: "https://instagram.com/nornex_as",
    icon: "instagram",
    isActive: true,
    displayOrder: 2,
  },
  {
    id: "3",
    platform: "linkedin",
    name: "LinkedIn",
    url: "https://linkedin.com/company/nornex-as",
    icon: "linkedin",
    isActive: true,
    displayOrder: 3,
  },
  {
    id: "4",
    platform: "youtube",
    name: "YouTube",
    url: "https://youtube.com/@nornexas",
    icon: "youtube",
    isActive: false,
    displayOrder: 4,
  },
];

const PlatformIcon = ({ platform, className = "w-5 h-5" }: { platform: string; className?: string }) => {
  switch (platform) {
    case "facebook":
      return <Facebook className={className} />;
    case "instagram":
      return <Instagram className={className} />;
    case "linkedin":
      return <Linkedin className={className} />;
    case "twitter":
      return <Twitter className={className} />;
    case "youtube":
      return <Youtube className={className} />;
    case "github":
      return <Github className={className} />;
    default:
      return <Globe className={className} />;
  }
};

export default function SocialView() {
  const [platforms, setPlatforms] = useState<SocialPlatform[]>(mockSocialLinks);
  const [showModal, setShowModal] = useState(false);
  const [editingPlatform, setEditingPlatform] = useState<SocialPlatform | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [draggedItem, setDraggedItem] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    platform: "facebook",
    name: "",
    url: "",
    isActive: true,
  });

  const [errors, setErrors] = useState<{ url?: string; duplicate?: string }>({});

  const showNotification = (type: "success" | "error", message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };

  const validateUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const checkDuplicate = (platform: string, excludeId?: string): boolean => {
    return platforms.some(
      (p) => p.platform === platform && p.id !== excludeId
    );
  };

  const handleAddNew = () => {
    setEditingPlatform(null);
    setFormData({
      platform: "facebook",
      name: "",
      url: "",
      isActive: true,
    });
    setErrors({});
    setShowModal(true);
  };

  const handleEdit = (platform: SocialPlatform) => {
    setEditingPlatform(platform);
    setFormData({
      platform: platform.platform,
      name: platform.name,
      url: platform.url,
      isActive: platform.isActive,
    });
    setErrors({});
    setShowModal(true);
  };

  const handleSave = () => {
    const newErrors: { url?: string; duplicate?: string } = {};

    if (!validateUrl(formData.url)) {
      newErrors.url = "Vennligst skriv inn en gyldig URL";
    }

    if (checkDuplicate(formData.platform, editingPlatform?.id)) {
      newErrors.duplicate = "Denne plattformen er allerede lagt til";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const platformLabel =
      platformOptions.find((p) => p.value === formData.platform)?.label || formData.name;

    if (editingPlatform) {
      setPlatforms(
        platforms.map((p) =>
          p.id === editingPlatform.id
            ? {
                ...p,
                platform: formData.platform,
                name: formData.name || platformLabel,
                url: formData.url,
                icon: formData.platform,
                isActive: formData.isActive,
              }
            : p
        )
      );
      showNotification("success", "Plattform oppdatert");
    } else {
      const newPlatform: SocialPlatform = {
        id: Date.now().toString(),
        platform: formData.platform,
        name: formData.name || platformLabel,
        url: formData.url,
        icon: formData.platform,
        isActive: formData.isActive,
        displayOrder: platforms.length + 1,
      };
      setPlatforms([...platforms, newPlatform]);
      showNotification("success", "Ny plattform lagt til");
    }

    setShowModal(false);
  };

  const handleDelete = (id: string) => {
    setPlatforms(platforms.filter((p) => p.id !== id));
    setShowDeleteConfirm(null);
    showNotification("success", "Plattform slettet");
  };

  const handleToggleActive = (id: string) => {
    setPlatforms(
      platforms.map((p) => (p.id === id ? { ...p, isActive: !p.isActive } : p))
    );
  };

  const handleDragStart = (id: string) => {
    setDraggedItem(id);
  };

  const handleDragOver = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    if (!draggedItem || draggedItem === targetId) return;

    const draggedIndex = platforms.findIndex((p) => p.id === draggedItem);
    const targetIndex = platforms.findIndex((p) => p.id === targetId);

    const newPlatforms = [...platforms];
    const [removed] = newPlatforms.splice(draggedIndex, 1);
    newPlatforms.splice(targetIndex, 0, removed);

    // Update display order
    const updatedPlatforms = newPlatforms.map((p, index) => ({
      ...p,
      displayOrder: index + 1,
    }));

    setPlatforms(updatedPlatforms);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  const sortedPlatforms = [...platforms].sort(
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
          <h1 className="text-2xl font-bold text-gray-900">Sosiale medier</h1>
          <p className="text-gray-500">
            Administrer lenker til sosiale medieprofiler
          </p>
        </div>
        <Button onClick={handleAddNew}>
          <Plus className="w-4 h-4 mr-2" />
          Legg til plattform
        </Button>
      </div>

      {/* Preview Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Forhåndsvisning</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-500 mb-4">
            Slik vil ikonene vises på nettsiden:
          </p>
          <div className="flex items-center space-x-4 p-4 bg-gray-900 rounded-lg">
            {sortedPlatforms
              .filter((p) => p.isActive)
              .map((platform) => (
                <a
                  key={platform.id}
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors"
                >
                  <PlatformIcon
                    platform={platform.platform}
                    className="w-5 h-5 text-white"
                  />
                </a>
              ))}
            {sortedPlatforms.filter((p) => p.isActive).length === 0 && (
              <p className="text-gray-500 text-sm">
                Ingen aktive plattformer å vise
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Platforms List */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Plattformer</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-gray-200">
            {sortedPlatforms.map((platform) => (
              <div
                key={platform.id}
                draggable
                onDragStart={() => handleDragStart(platform.id)}
                onDragOver={(e) => handleDragOver(e, platform.id)}
                onDragEnd={handleDragEnd}
                className={`flex items-center justify-between p-4 hover:bg-gray-50 transition-colors ${
                  draggedItem === platform.id ? "opacity-50" : ""
                }`}
              >
                <div className="flex items-center space-x-4">
                  <GripVertical className="w-5 h-5 text-gray-300 cursor-grab" />
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      platform.isActive ? "bg-gray-100" : "bg-gray-50"
                    }`}
                  >
                    <PlatformIcon
                      platform={platform.platform}
                      className={`w-5 h-5 ${
                        platform.isActive ? "text-gray-700" : "text-gray-400"
                      }`}
                    />
                  </div>
                  <div>
                    <p
                      className={`font-medium ${
                        platform.isActive ? "text-gray-900" : "text-gray-500"
                      }`}
                    >
                      {platform.name}
                    </p>
                    <a
                      href={platform.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:underline flex items-center"
                    >
                      {platform.url}
                      <ExternalLink className="w-3 h-3 ml-1" />
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Badge variant={platform.isActive ? "default" : "secondary"}>
                    {platform.isActive ? "Aktiv" : "Inaktiv"}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleToggleActive(platform.id)}
                    title={platform.isActive ? "Deaktiver" : "Aktiver"}
                  >
                    {platform.isActive ? (
                      <Eye className="w-4 h-4" />
                    ) : (
                      <EyeOff className="w-4 h-4" />
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEdit(platform)}
                    title="Rediger"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowDeleteConfirm(platform.id)}
                    className="text-red-600 hover:text-red-700"
                    title="Slett"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
          {platforms.length === 0 && (
            <div className="text-center py-12">
              <Globe className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Ingen plattformer lagt til ennå</p>
              <Button onClick={handleAddNew} variant="outline" className="mt-4">
                <Plus className="w-4 h-4 mr-2" />
                Legg til første plattform
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <CardHeader className="border-b">
              <div className="flex items-center justify-between">
                <CardTitle>
                  {editingPlatform ? "Rediger plattform" : "Legg til plattform"}
                </CardTitle>
                <Button variant="ghost" size="sm" onClick={() => setShowModal(false)}>
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Plattform *
                </label>
                <select
                  value={formData.platform}
                  onChange={(e) =>
                    setFormData({ ...formData, platform: e.target.value })
                  }
                  className="w-full h-10 px-3 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  {platformOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {errors.duplicate && (
                  <p className="text-sm text-red-600 mt-1">{errors.duplicate}</p>
                )}
              </div>

              {formData.platform === "custom" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Egendefinert navn *
                  </label>
                  <Input
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="F.eks. TikTok"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Profil-URL *
                </label>
                <Input
                  value={formData.url}
                  onChange={(e) =>
                    setFormData({ ...formData, url: e.target.value })
                  }
                  placeholder="https://..."
                />
                {errors.url && (
                  <p className="text-sm text-red-600 mt-1">{errors.url}</p>
                )}
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
                  {editingPlatform ? "Lagre endringer" : "Legg til"}
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
                Er du sikker på at du vil slette denne plattformen? Denne handlingen
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
