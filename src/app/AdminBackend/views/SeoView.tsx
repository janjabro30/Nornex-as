"use client";

import React, { useState } from "react";
import {
  Plus,
  Edit,
  Search,
  X,
  Check,
  Globe,
  Eye,
  Sparkles,
  Image as ImageIcon,
  AlertCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

interface SeoPage {
  id: string;
  path: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  canonicalUrl: string;
  schemaMarkup: string;
  lastUpdated: Date;
}

const mockPages: SeoPage[] = [
  {
    id: "1",
    path: "/",
    title: "Hjem",
    metaTitle: "Nornex AS - Bærekraftige IT-løsninger | Refurbished Teknologi",
    metaDescription:
      "Kvalitets refurbished teknologi med miljøansvar. Vi gir IT-utstyr nytt liv. Spar penger og miljøet med bærekraftig IT fra Nornex AS i Oslo.",
    keywords: "refurbished, IT, bærekraftig, resirkulering, Norge, Oslo",
    ogTitle: "Nornex AS - Bærekraftige IT-løsninger",
    ogDescription: "Kvalitets refurbished teknologi med miljøansvar.",
    ogImage: "/images/og-home.jpg",
    canonicalUrl: "https://nornex.no/",
    schemaMarkup: '{"@type": "Organization", "name": "Nornex AS"}',
    lastUpdated: new Date("2024-01-15"),
  },
  {
    id: "2",
    path: "/nettbutikk",
    title: "Nettbutikk",
    metaTitle: "Nettbutikk - Refurbished IT-utstyr | Nornex AS",
    metaDescription:
      "Kjøp kvalitets refurbished bærbare, stasjonære PC-er og tilbehør. Spar opptil 60% sammenlignet med nytt utstyr.",
    keywords: "refurbished laptop, brukt PC, bærbar, Oslo, IT-utstyr",
    ogTitle: "Nettbutikk - Nornex AS",
    ogDescription: "Kjøp kvalitets refurbished IT-utstyr.",
    ogImage: "/images/og-shop.jpg",
    canonicalUrl: "https://nornex.no/nettbutikk",
    schemaMarkup: "",
    lastUpdated: new Date("2024-01-14"),
  },
  {
    id: "3",
    path: "/tjenester",
    title: "Tjenester",
    metaTitle: "IT-tjenester | Reparasjon & Support | Nornex AS",
    metaDescription:
      "Profesjonelle IT-tjenester inkludert reparasjon, support og vedlikehold. Sertifiserte teknikere i Oslo.",
    keywords: "IT-tjenester, reparasjon, support, Oslo, vedlikehold",
    ogTitle: "IT-tjenester - Nornex AS",
    ogDescription: "Profesjonelle IT-tjenester fra Nornex AS.",
    ogImage: "/images/og-services.jpg",
    canonicalUrl: "https://nornex.no/tjenester",
    schemaMarkup: "",
    lastUpdated: new Date("2024-01-10"),
  },
  {
    id: "4",
    path: "/om-oss",
    title: "Om oss",
    metaTitle: "Om Nornex AS | Bærekraftig IT siden 2020",
    metaDescription:
      "Lær mer om Nornex AS og vårt engasjement for bærekraftig IT. Vi har hjulpet over 1000 bedrifter med refurbished teknologi.",
    keywords: "om oss, Nornex, bærekraftig IT, historie",
    ogTitle: "Om Nornex AS",
    ogDescription: "Lær mer om Nornex AS og vårt engasjement for bærekraftig IT.",
    ogImage: "/images/og-about.jpg",
    canonicalUrl: "https://nornex.no/om-oss",
    schemaMarkup: "",
    lastUpdated: new Date("2024-01-05"),
  },
];

export default function SeoView() {
  const [pages, setPages] = useState<SeoPage[]>(mockPages);
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [editingPage, setEditingPage] = useState<SeoPage | null>(null);
  const [previewPage, setPreviewPage] = useState<SeoPage | null>(null);
  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [aiLoading, setAiLoading] = useState(false);

  const [formData, setFormData] = useState({
    path: "",
    title: "",
    metaTitle: "",
    metaDescription: "",
    keywords: "",
    ogTitle: "",
    ogDescription: "",
    ogImage: "",
    canonicalUrl: "",
    schemaMarkup: "",
  });

  const filteredPages = pages.filter(
    (page) =>
      page.path.toLowerCase().includes(searchQuery.toLowerCase()) ||
      page.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const showNotification = (type: "success" | "error", message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleAddNew = () => {
    setEditingPage(null);
    setFormData({
      path: "",
      title: "",
      metaTitle: "",
      metaDescription: "",
      keywords: "",
      ogTitle: "",
      ogDescription: "",
      ogImage: "",
      canonicalUrl: "",
      schemaMarkup: "",
    });
    setShowModal(true);
  };

  const handleEdit = (page: SeoPage) => {
    setEditingPage(page);
    setFormData({
      path: page.path,
      title: page.title,
      metaTitle: page.metaTitle,
      metaDescription: page.metaDescription,
      keywords: page.keywords,
      ogTitle: page.ogTitle,
      ogDescription: page.ogDescription,
      ogImage: page.ogImage,
      canonicalUrl: page.canonicalUrl,
      schemaMarkup: page.schemaMarkup,
    });
    setShowModal(true);
  };

  const handleSave = () => {
    if (!formData.path || !formData.title || !formData.metaTitle) {
      showNotification("error", "Vennligst fyll inn alle påkrevde felt");
      return;
    }

    if (editingPage) {
      setPages(
        pages.map((p) =>
          p.id === editingPage.id
            ? { ...p, ...formData, lastUpdated: new Date() }
            : p
        )
      );
      showNotification("success", "SEO-data oppdatert");
    } else {
      const newPage: SeoPage = {
        id: Date.now().toString(),
        ...formData,
        lastUpdated: new Date(),
      };
      setPages([...pages, newPage]);
      showNotification("success", "Ny side lagt til");
    }

    setShowModal(false);
  };

  const handlePreview = (page: SeoPage) => {
    setPreviewPage(page);
    setShowPreview(true);
  };

  const handleAiSuggestion = async (field: "metaTitle" | "metaDescription") => {
    setAiLoading(true);
    
    // Simulate AI suggestion
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    const suggestions: Record<string, { metaTitle: string; metaDescription: string }> = {
      "/": {
        metaTitle: "Nornex AS | Norges ledende leverandør av refurbished IT-utstyr",
        metaDescription:
          "Oppdag bærekraftige IT-løsninger hos Nornex AS. Kvalitets refurbished teknologi med garanti. Spar penger og miljøet - se utvalget vårt i dag!",
      },
      default: {
        metaTitle: `${formData.title} | Nornex AS - Bærekraftig IT`,
        metaDescription: `Les mer om ${formData.title.toLowerCase()} hos Nornex AS. Vi tilbyr bærekraftige IT-løsninger og profesjonell service i Oslo.`,
      },
    };

    const suggestion = suggestions[formData.path] || suggestions.default;
    
    setFormData((prev) => ({
      ...prev,
      [field]: suggestion[field],
    }));
    
    setAiLoading(false);
    showNotification("success", "AI-forslag generert");
  };

  const getCharacterStatus = (text: string, max: number) => {
    const length = text.length;
    if (length === 0) return "empty";
    if (length <= max * 0.9) return "good";
    if (length <= max) return "warning";
    return "error";
  };

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
          <h1 className="text-2xl font-bold text-gray-900">SEO-administrasjon</h1>
          <p className="text-gray-500">Administrer SEO-metadata for alle sider</p>
        </div>
        <Button onClick={handleAddNew}>
          <Plus className="w-4 h-4 mr-2" />
          Legg til side
        </Button>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Søk etter side..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Pages List */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Side
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Meta-tittel
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sist oppdatert
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Handlinger
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredPages.map((page) => {
                  const titleStatus = getCharacterStatus(page.metaTitle, 60);
                  const descStatus = getCharacterStatus(page.metaDescription, 160);
                  const hasIssues = titleStatus === "error" || descStatus === "error";
                  
                  return (
                    <tr key={page.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-gray-900">{page.title}</p>
                          <p className="text-sm text-gray-500">{page.path}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-gray-700 truncate max-w-xs">
                          {page.metaTitle}
                        </p>
                        <p className="text-xs text-gray-500">
                          {page.metaTitle.length}/60 tegn
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        {hasIssues ? (
                          <Badge variant="destructive" className="flex items-center w-fit">
                            <AlertCircle className="w-3 h-3 mr-1" />
                            Problemer
                          </Badge>
                        ) : (
                          <Badge className="bg-green-100 text-green-800">OK</Badge>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {page.lastUpdated.toLocaleDateString("nb-NO")}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handlePreview(page)}
                            title="Forhåndsvisning"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(page)}
                            title="Rediger"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {filteredPages.length === 0 && (
            <div className="text-center py-12">
              <Globe className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Ingen sider funnet</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader className="border-b">
              <div className="flex items-center justify-between">
                <CardTitle>
                  {editingPage ? "Rediger SEO-data" : "Legg til side"}
                </CardTitle>
                <Button variant="ghost" size="sm" onClick={() => setShowModal(false)}>
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Side-sti *
                  </label>
                  <Input
                    value={formData.path}
                    onChange={(e) =>
                      setFormData({ ...formData, path: e.target.value })
                    }
                    placeholder="/om-oss"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Sidetittel *
                  </label>
                  <Input
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    placeholder="Om oss"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Meta-tittel * (maks 60 tegn)
                  </label>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleAiSuggestion("metaTitle")}
                    disabled={aiLoading}
                  >
                    <Sparkles className="w-4 h-4 mr-1" />
                    AI-forslag
                  </Button>
                </div>
                <Input
                  value={formData.metaTitle}
                  onChange={(e) =>
                    setFormData({ ...formData, metaTitle: e.target.value })
                  }
                  placeholder="Sidetittel | Nornex AS"
                  className={
                    formData.metaTitle.length > 60
                      ? "border-red-500"
                      : formData.metaTitle.length > 54
                      ? "border-yellow-500"
                      : ""
                  }
                />
                <p
                  className={`text-xs mt-1 ${
                    formData.metaTitle.length > 60
                      ? "text-red-600"
                      : formData.metaTitle.length > 54
                      ? "text-yellow-600"
                      : "text-gray-500"
                  }`}
                >
                  {formData.metaTitle.length}/60 tegn
                </p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Meta-beskrivelse (maks 160 tegn)
                  </label>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleAiSuggestion("metaDescription")}
                    disabled={aiLoading}
                  >
                    <Sparkles className="w-4 h-4 mr-1" />
                    AI-forslag
                  </Button>
                </div>
                <Textarea
                  value={formData.metaDescription}
                  onChange={(e) =>
                    setFormData({ ...formData, metaDescription: e.target.value })
                  }
                  rows={3}
                  placeholder="En kort beskrivelse av siden..."
                  className={
                    formData.metaDescription.length > 160
                      ? "border-red-500"
                      : formData.metaDescription.length > 144
                      ? "border-yellow-500"
                      : ""
                  }
                />
                <p
                  className={`text-xs mt-1 ${
                    formData.metaDescription.length > 160
                      ? "text-red-600"
                      : formData.metaDescription.length > 144
                      ? "text-yellow-600"
                      : "text-gray-500"
                  }`}
                >
                  {formData.metaDescription.length}/160 tegn
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nøkkelord (kommaseparert)
                </label>
                <Input
                  value={formData.keywords}
                  onChange={(e) =>
                    setFormData({ ...formData, keywords: e.target.value })
                  }
                  placeholder="refurbished, IT, Oslo"
                />
              </div>

              <div className="border-t pt-4">
                <h4 className="font-medium text-gray-900 mb-4">Open Graph</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      OG-tittel
                    </label>
                    <Input
                      value={formData.ogTitle}
                      onChange={(e) =>
                        setFormData({ ...formData, ogTitle: e.target.value })
                      }
                      placeholder="Tittel for sosiale medier"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      OG-beskrivelse
                    </label>
                    <Textarea
                      value={formData.ogDescription}
                      onChange={(e) =>
                        setFormData({ ...formData, ogDescription: e.target.value })
                      }
                      rows={2}
                      placeholder="Beskrivelse for sosiale medier"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      OG-bilde URL
                    </label>
                    <Input
                      value={formData.ogImage}
                      onChange={(e) =>
                        setFormData({ ...formData, ogImage: e.target.value })
                      }
                      placeholder="/images/og-image.jpg"
                    />
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-medium text-gray-900 mb-4">Avansert</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Kanonisk URL
                    </label>
                    <Input
                      value={formData.canonicalUrl}
                      onChange={(e) =>
                        setFormData({ ...formData, canonicalUrl: e.target.value })
                      }
                      placeholder="https://nornex.no/..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Schema Markup (JSON-LD)
                    </label>
                    <Textarea
                      value={formData.schemaMarkup}
                      onChange={(e) =>
                        setFormData({ ...formData, schemaMarkup: e.target.value })
                      }
                      rows={4}
                      placeholder='{"@type": "WebPage", ...}'
                      className="font-mono text-sm"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <Button variant="outline" onClick={() => setShowModal(false)}>
                  Avbryt
                </Button>
                <Button onClick={handleSave}>
                  {editingPage ? "Lagre endringer" : "Legg til"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Preview Modal */}
      {showPreview && previewPage && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl">
            <CardHeader className="border-b">
              <div className="flex items-center justify-between">
                <CardTitle>SEO-forhåndsvisning</CardTitle>
                <Button variant="ghost" size="sm" onClick={() => setShowPreview(false)}>
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              {/* Google Preview */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-3">
                  Google søkeresultat
                </h4>
                <div className="bg-white border rounded-lg p-4">
                  <p className="text-blue-800 text-xl hover:underline cursor-pointer truncate">
                    {previewPage.metaTitle || "Ingen tittel"}
                  </p>
                  <p className="text-green-700 text-sm">
                    {previewPage.canonicalUrl || `https://nornex.no${previewPage.path}`}
                  </p>
                  <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                    {previewPage.metaDescription || "Ingen beskrivelse"}
                  </p>
                </div>
              </div>

              {/* Facebook Preview */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-3">
                  Facebook-deling
                </h4>
                <div className="bg-gray-100 border rounded-lg overflow-hidden">
                  <div className="h-40 bg-gray-200 flex items-center justify-center">
                    {previewPage.ogImage ? (
                      <span className="text-gray-500 text-sm">{previewPage.ogImage}</span>
                    ) : (
                      <ImageIcon className="w-12 h-12 text-gray-400" />
                    )}
                  </div>
                  <div className="p-3">
                    <p className="text-xs text-gray-500 uppercase">nornex.no</p>
                    <p className="font-semibold text-gray-900">
                      {previewPage.ogTitle || previewPage.metaTitle || "Ingen tittel"}
                    </p>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {previewPage.ogDescription ||
                        previewPage.metaDescription ||
                        "Ingen beskrivelse"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button variant="outline" onClick={() => setShowPreview(false)}>
                  Lukk
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
