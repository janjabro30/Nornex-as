"use client";

import React, { useState } from "react";
import {
  Plus,
  Trash2,
  X,
  Check,
  Key,
  RefreshCw,
  TestTube,
  Eye,
  EyeOff,
  Settings,
  ExternalLink,
  AlertCircle,
  CheckCircle,
  XCircle,
  Github,
  Download,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

interface ApiConfig {
  id: string;
  name: string;
  type: string;
  status: "active" | "inactive" | "error";
  endpoint: string;
  apiKey: string;
  apiSecret?: string;
  configuration: Record<string, string>;
  lastTested?: Date;
  lastTestResult?: "success" | "error";
  lastTestMessage?: string;
}

const apiTypes = [
  { value: "payment_stripe", label: "Betaling - Stripe" },
  { value: "payment_vipps", label: "Betaling - Vipps" },
  { value: "payment_klarna", label: "Betaling - Klarna" },
  { value: "shipping_posten", label: "Frakt - Posten" },
  { value: "company_brreg", label: "Bedriftsregister - Brønnøysund" },
  { value: "esign_signrequest", label: "E-signatur - SignRequest" },
  { value: "esign_docusign", label: "E-signatur - DocuSign" },
  { value: "reviews_trustpilot", label: "Anmeldelser - Trustpilot" },
  { value: "analytics_google", label: "Analyse - Google Analytics" },
  { value: "custom", label: "Tilpasset API" },
];

const mockApis: ApiConfig[] = [
  {
    id: "1",
    name: "Stripe Payments",
    type: "payment_stripe",
    status: "active",
    endpoint: "https://api.stripe.com",
    apiKey: "sk_live_****************************",
    apiSecret: "sk_live_****************************",
    configuration: { currency: "NOK", country: "NO" },
    lastTested: new Date("2024-01-15T10:30:00"),
    lastTestResult: "success",
    lastTestMessage: "Tilkobling OK",
  },
  {
    id: "2",
    name: "Vipps",
    type: "payment_vipps",
    status: "active",
    endpoint: "https://api.vipps.no",
    apiKey: "vipps_****************************",
    configuration: { merchantSerialNumber: "123456" },
    lastTested: new Date("2024-01-15T09:00:00"),
    lastTestResult: "success",
    lastTestMessage: "Tilkobling OK",
  },
  {
    id: "3",
    name: "Posten",
    type: "shipping_posten",
    status: "active",
    endpoint: "https://api.bring.com",
    apiKey: "posten_****************************",
    configuration: { customerNumber: "NORNEX" },
    lastTested: new Date("2024-01-14T15:00:00"),
    lastTestResult: "success",
    lastTestMessage: "Tilkobling OK",
  },
  {
    id: "4",
    name: "Brønnøysundregistrene",
    type: "company_brreg",
    status: "inactive",
    endpoint: "https://data.brreg.no/enhetsregisteret/api",
    apiKey: "",
    configuration: {},
    lastTested: undefined,
  },
  {
    id: "5",
    name: "Google Analytics",
    type: "analytics_google",
    status: "error",
    endpoint: "https://www.google-analytics.com",
    apiKey: "UA-****************************",
    configuration: { trackingId: "UA-XXXXXXX-X" },
    lastTested: new Date("2024-01-10T12:00:00"),
    lastTestResult: "error",
    lastTestMessage: "Ugyldig tracking ID",
  },
];

export default function ApisView() {
  const [apis, setApis] = useState<ApiConfig[]>(mockApis);
  const [showModal, setShowModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [editingApi, setEditingApi] = useState<ApiConfig | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [testingApiId, setTestingApiId] = useState<string | null>(null);
  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [showApiKey, setShowApiKey] = useState<Record<string, boolean>>({});
  const [githubUrl, setGithubUrl] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    type: "",
    endpoint: "",
    apiKey: "",
    apiSecret: "",
    configuration: "",
  });

  const showNotification = (type: "success" | "error", message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleAddNew = () => {
    setEditingApi(null);
    setFormData({
      name: "",
      type: "",
      endpoint: "",
      apiKey: "",
      apiSecret: "",
      configuration: "{}",
    });
    setShowModal(true);
  };

  const handleEdit = (api: ApiConfig) => {
    setEditingApi(api);
    setFormData({
      name: api.name,
      type: api.type,
      endpoint: api.endpoint,
      apiKey: api.apiKey,
      apiSecret: api.apiSecret || "",
      configuration: JSON.stringify(api.configuration, null, 2),
    });
    setShowModal(true);
  };

  const handleSave = () => {
    if (!formData.name || !formData.type) {
      showNotification("error", "Vennligst fyll inn alle påkrevde felt");
      return;
    }

    let config = {};
    try {
      config = JSON.parse(formData.configuration || "{}");
    } catch {
      showNotification("error", "Ugyldig JSON i konfigurasjon");
      return;
    }

    if (editingApi) {
      setApis(
        apis.map((a) =>
          a.id === editingApi.id
            ? {
                ...a,
                name: formData.name,
                type: formData.type,
                endpoint: formData.endpoint,
                apiKey: formData.apiKey,
                apiSecret: formData.apiSecret,
                configuration: config,
              }
            : a
        )
      );
      showNotification("success", "API oppdatert");
    } else {
      const newApi: ApiConfig = {
        id: Date.now().toString(),
        name: formData.name,
        type: formData.type,
        status: "inactive",
        endpoint: formData.endpoint,
        apiKey: formData.apiKey,
        apiSecret: formData.apiSecret,
        configuration: config,
      };
      setApis([...apis, newApi]);
      showNotification("success", "Ny API lagt til");
    }

    setShowModal(false);
  };

  const handleDelete = (id: string) => {
    setApis(apis.filter((a) => a.id !== id));
    setShowDeleteConfirm(null);
    showNotification("success", "API slettet");
  };

  const handleToggleStatus = (id: string) => {
    setApis(
      apis.map((a) =>
        a.id === id
          ? { ...a, status: a.status === "active" ? "inactive" : "active" }
          : a
      )
    );
  };

  const handleTestConnection = async (id: string) => {
    setTestingApiId(id);
    
    // Simulate API test - always succeed for demo purposes
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    // Use a simple counter to alternate between success/failure for testing
    const api = apis.find(a => a.id === id);
    const success = !api?.lastTestResult || api.lastTestResult === "error";
    
    setApis(
      apis.map((a) =>
        a.id === id
          ? {
              ...a,
              lastTested: new Date(),
              lastTestResult: success ? "success" : "error",
              lastTestMessage: success ? "Tilkobling OK" : "Kunne ikke koble til",
              status: success ? "active" : "error",
            }
          : a
      )
    );
    
    setTestingApiId(null);
    showNotification(
      success ? "success" : "error",
      success ? "Tilkoblingstest vellykket" : "Tilkoblingstest mislyktes"
    );
  };

  const handleImportFromGithub = () => {
    if (!githubUrl) {
      showNotification("error", "Vennligst skriv inn en GitHub URL");
      return;
    }
    
    // Simulate import
    showNotification("success", "Import-funksjon er under utvikling");
    setShowImportModal(false);
    setGithubUrl("");
  };

  const toggleShowApiKey = (id: string) => {
    setShowApiKey((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">Aktiv</Badge>;
      case "inactive":
        return <Badge variant="secondary">Inaktiv</Badge>;
      case "error":
        return <Badge variant="destructive">Feil</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case "inactive":
        return <AlertCircle className="w-5 h-5 text-gray-400" />;
      case "error":
        return <XCircle className="w-5 h-5 text-red-600" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-400" />;
    }
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
          <h1 className="text-2xl font-bold text-gray-900">API-integrasjoner</h1>
          <p className="text-gray-500">
            Administrer eksterne API-tilkoblinger
          </p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" onClick={() => setShowImportModal(true)}>
            <Github className="w-4 h-4 mr-2" />
            Importer fra GitHub
          </Button>
          <Button onClick={handleAddNew}>
            <Plus className="w-4 h-4 mr-2" />
            Legg til API
          </Button>
        </div>
      </div>

      {/* APIs Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {apis.map((api) => (
          <Card key={api.id}>
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(api.status)}
                  <div>
                    <CardTitle className="text-lg">{api.name}</CardTitle>
                    <p className="text-sm text-gray-500">
                      {apiTypes.find((t) => t.value === api.type)?.label || api.type}
                    </p>
                  </div>
                </div>
                {getStatusBadge(api.status)}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Endpoint */}
              <div>
                <label className="text-xs font-medium text-gray-500">Endepunkt</label>
                <a
                  href={api.endpoint}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:underline flex items-center"
                >
                  {api.endpoint}
                  <ExternalLink className="w-3 h-3 ml-1" />
                </a>
              </div>

              {/* API Key */}
              <div>
                <label className="text-xs font-medium text-gray-500">API-nøkkel</label>
                <div className="flex items-center space-x-2">
                  <code className="text-sm bg-gray-100 px-2 py-1 rounded flex-1 truncate">
                    {showApiKey[api.id]
                      ? api.apiKey || "Ikke konfigurert"
                      : api.apiKey
                      ? "••••••••••••••••••••"
                      : "Ikke konfigurert"}
                  </code>
                  {api.apiKey && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleShowApiKey(api.id)}
                    >
                      {showApiKey[api.id] ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </Button>
                  )}
                </div>
              </div>

              {/* Last Test */}
              {api.lastTested && (
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-gray-500">
                      Siste test
                    </span>
                    <span className="text-xs text-gray-500">
                      {api.lastTested.toLocaleString("nb-NO")}
                    </span>
                  </div>
                  <div className="flex items-center mt-1">
                    {api.lastTestResult === "success" ? (
                      <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                    ) : (
                      <XCircle className="w-4 h-4 text-red-600 mr-2" />
                    )}
                    <span
                      className={`text-sm ${
                        api.lastTestResult === "success"
                          ? "text-green-700"
                          : "text-red-700"
                      }`}
                    >
                      {api.lastTestMessage}
                    </span>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex justify-between pt-2 border-t">
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleTestConnection(api.id)}
                    disabled={testingApiId === api.id}
                  >
                    {testingApiId === api.id ? (
                      <RefreshCw className="w-4 h-4 mr-1 animate-spin" />
                    ) : (
                      <TestTube className="w-4 h-4 mr-1" />
                    )}
                    Test
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleToggleStatus(api.id)}
                  >
                    {api.status === "active" ? "Deaktiver" : "Aktiver"}
                  </Button>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEdit(api)}
                  >
                    <Settings className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowDeleteConfirm(api.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {apis.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <Key className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 mb-4">Ingen API-er konfigurert ennå</p>
            <Button onClick={handleAddNew}>
              <Plus className="w-4 h-4 mr-2" />
              Legg til første API
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
                  {editingApi ? "Rediger API" : "Legg til API"}
                </CardTitle>
                <Button variant="ghost" size="sm" onClick={() => setShowModal(false)}>
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  API-navn *
                </label>
                <Input
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="F.eks. Stripe Payments"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type *
                </label>
                <select
                  value={formData.type}
                  onChange={(e) =>
                    setFormData({ ...formData, type: e.target.value })
                  }
                  className="w-full h-10 px-3 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="">Velg type...</option>
                  {apiTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Endepunkt URL
                </label>
                <Input
                  value={formData.endpoint}
                  onChange={(e) =>
                    setFormData({ ...formData, endpoint: e.target.value })
                  }
                  placeholder="https://api.example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  API-nøkkel
                </label>
                <Input
                  type="password"
                  value={formData.apiKey}
                  onChange={(e) =>
                    setFormData({ ...formData, apiKey: e.target.value })
                  }
                  placeholder="••••••••••••••••"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  API-hemmelighet (valgfritt)
                </label>
                <Input
                  type="password"
                  value={formData.apiSecret}
                  onChange={(e) =>
                    setFormData({ ...formData, apiSecret: e.target.value })
                  }
                  placeholder="••••••••••••••••"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Konfigurasjon (JSON)
                </label>
                <Textarea
                  value={formData.configuration}
                  onChange={(e) =>
                    setFormData({ ...formData, configuration: e.target.value })
                  }
                  rows={4}
                  placeholder='{"key": "value"}'
                  className="font-mono text-sm"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <Button variant="outline" onClick={() => setShowModal(false)}>
                  Avbryt
                </Button>
                <Button onClick={handleSave}>
                  {editingApi ? "Lagre endringer" : "Legg til"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Import from GitHub Modal */}
      {showImportModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <CardHeader className="border-b">
              <div className="flex items-center justify-between">
                <CardTitle>Importer fra GitHub</CardTitle>
                <Button variant="ghost" size="sm" onClick={() => setShowImportModal(false)}>
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <p className="text-sm text-gray-600">
                Importer API-konfigurasjon fra en GitHub-repository.
              </p>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  GitHub URL
                </label>
                <Input
                  value={githubUrl}
                  onChange={(e) => setGithubUrl(e.target.value)}
                  placeholder="https://github.com/user/repo/blob/main/config.json"
                />
              </div>
              <div className="flex justify-end space-x-3">
                <Button variant="outline" onClick={() => setShowImportModal(false)}>
                  Avbryt
                </Button>
                <Button onClick={handleImportFromGithub}>
                  <Download className="w-4 h-4 mr-2" />
                  Importer
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
                Er du sikker på at du vil slette denne API-konfigurasjonen? Denne
                handlingen kan ikke angres.
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
