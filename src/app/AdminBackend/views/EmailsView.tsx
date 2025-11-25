"use client";

import React, { useState } from "react";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  Send,
  Mail,
  X,
  Check,
  ChevronDown,
  GripVertical,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

interface EmailTemplate {
  id: string;
  name: string;
  type: string;
  fromAddress: string;
  subject: string;
  body: string;
  variables: string[];
  isActive: boolean;
  lastModified: Date;
}

const departmentEmails = [
  { value: "orders@nornex.no", label: "Ordrer (orders@nornex.no)" },
  { value: "repairs@nornex.no", label: "Reparasjoner (repairs@nornex.no)" },
  { value: "support@nornex.no", label: "Support (support@nornex.no)" },
  { value: "contracts@nornex.no", label: "Kontrakter (contracts@nornex.no)" },
  { value: "invoices@nornex.no", label: "Fakturaer (invoices@nornex.no)" },
  { value: "buyback@nornex.no", label: "Innkjøp (buyback@nornex.no)" },
  { value: "security@nornex.no", label: "Sikkerhet (security@nornex.no)" },
];

const templateTypes = [
  { value: "order_confirmation", label: "Ordrebekreftelse" },
  { value: "order_shipped", label: "Ordre sendt" },
  { value: "repair_received", label: "Reparasjon mottatt" },
  { value: "repair_diagnosed", label: "Reparasjon diagnostisert" },
  { value: "repair_completed", label: "Reparasjon fullført" },
  { value: "device_received", label: "Enhet mottatt" },
  { value: "device_evaluated", label: "Enhet vurdert" },
  { value: "contract_sent", label: "Kontrakt sendt" },
  { value: "invoice_created", label: "Faktura opprettet" },
  { value: "payment_received", label: "Betaling mottatt" },
  { value: "password_reset", label: "Tilbakestill passord" },
  { value: "security_alert", label: "Sikkerhetsvarsel" },
];

const mockTemplates: EmailTemplate[] = [
  {
    id: "1",
    name: "Ordrebekreftelse",
    type: "order_confirmation",
    fromAddress: "orders@nornex.no",
    subject: "Takk for din ordre #{{order_number}}",
    body: `Hei {{customer_name}},

Takk for din ordre hos Nornex AS!

Ordrenummer: {{order_number}}
Beløp: {{amount}} kr

Vi behandler ordren din og sender deg en oppdatering når den er sendt.

Med vennlig hilsen,
Nornex AS`,
    variables: ["customer_name", "order_number", "amount"],
    isActive: true,
    lastModified: new Date("2024-01-15"),
  },
  {
    id: "2",
    name: "Ordre sendt",
    type: "order_shipped",
    fromAddress: "orders@nornex.no",
    subject: "Din ordre #{{order_number}} er på vei",
    body: `Hei {{customer_name}},

Din ordre er nå sendt!

Sporingsnummer: {{tracking_number}}
Forventet levering: {{delivery_date}}

Spor sendingen din her: {{tracking_url}}

Med vennlig hilsen,
Nornex AS`,
    variables: ["customer_name", "order_number", "tracking_number", "delivery_date", "tracking_url"],
    isActive: true,
    lastModified: new Date("2024-01-14"),
  },
  {
    id: "3",
    name: "Reparasjon mottatt",
    type: "repair_received",
    fromAddress: "repairs@nornex.no",
    subject: "Vi har mottatt din enhet - Sak #{{repair_id}}",
    body: `Hei {{customer_name}},

Vi har mottatt enheten din for reparasjon.

Saksnummer: {{repair_id}}
Enhet: {{device_name}}

Vi vil diagnostisere enheten og kontakte deg med et prisoverslag.

Med vennlig hilsen,
Nornex AS Reparasjonsavdeling`,
    variables: ["customer_name", "repair_id", "device_name"],
    isActive: true,
    lastModified: new Date("2024-01-10"),
  },
  {
    id: "4",
    name: "Tilbakestill passord",
    type: "password_reset",
    fromAddress: "security@nornex.no",
    subject: "Tilbakestill ditt passord",
    body: `Hei {{customer_name}},

Du har bedt om å tilbakestille passordet ditt.

Klikk her for å tilbakestille: {{reset_link}}

Lenken er gyldig i 24 timer.

Hvis du ikke ba om dette, kan du ignorere denne e-posten.

Med vennlig hilsen,
Nornex AS`,
    variables: ["customer_name", "reset_link"],
    isActive: true,
    lastModified: new Date("2024-01-05"),
  },
];

export default function EmailsView() {
  const [templates, setTemplates] = useState<EmailTemplate[]>(mockTemplates);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [showTestSend, setShowTestSend] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<EmailTemplate | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate | null>(null);
  const [testEmail, setTestEmail] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    type: "",
    fromAddress: "orders@nornex.no",
    subject: "",
    body: "",
  });

  const filteredTemplates = templates.filter((template) => {
    const matchesSearch =
      template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.subject.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = !filterType || template.type === filterType;
    return matchesSearch && matchesType;
  });

  const showNotification = (type: "success" | "error", message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleAddNew = () => {
    setEditingTemplate(null);
    setFormData({
      name: "",
      type: "",
      fromAddress: "orders@nornex.no",
      subject: "",
      body: "",
    });
    setShowModal(true);
  };

  const handleEdit = (template: EmailTemplate) => {
    setEditingTemplate(template);
    setFormData({
      name: template.name,
      type: template.type,
      fromAddress: template.fromAddress,
      subject: template.subject,
      body: template.body,
    });
    setShowModal(true);
  };

  const handleSave = () => {
    if (!formData.name || !formData.type || !formData.subject || !formData.body) {
      showNotification("error", "Vennligst fyll ut alle feltene");
      return;
    }

    // Extract variables from body
    const variableRegex = /\{\{(\w+)\}\}/g;
    const variables: string[] = [];
    let match;
    while ((match = variableRegex.exec(formData.body)) !== null) {
      if (!variables.includes(match[1])) {
        variables.push(match[1]);
      }
    }

    if (editingTemplate) {
      // Update existing
      setTemplates(
        templates.map((t) =>
          t.id === editingTemplate.id
            ? { ...t, ...formData, variables, lastModified: new Date() }
            : t
        )
      );
      showNotification("success", "Malen er oppdatert");
    } else {
      // Add new
      const newTemplate: EmailTemplate = {
        id: Date.now().toString(),
        ...formData,
        variables,
        isActive: true,
        lastModified: new Date(),
      };
      setTemplates([...templates, newTemplate]);
      showNotification("success", "Ny mal er opprettet");
    }

    setShowModal(false);
  };

  const handleDelete = (id: string) => {
    setTemplates(templates.filter((t) => t.id !== id));
    setShowDeleteConfirm(null);
    showNotification("success", "Malen er slettet");
  };

  const handleToggleActive = (id: string) => {
    setTemplates(
      templates.map((t) => (t.id === id ? { ...t, isActive: !t.isActive } : t))
    );
  };

  const handlePreview = (template: EmailTemplate) => {
    setSelectedTemplate(template);
    setShowPreview(true);
  };

  const handleTestSend = (template: EmailTemplate) => {
    setSelectedTemplate(template);
    setTestEmail("");
    setShowTestSend(true);
  };

  const sendTestEmail = () => {
    if (!testEmail || !testEmail.includes("@")) {
      showNotification("error", "Vennligst skriv inn en gyldig e-postadresse");
      return;
    }
    // In production, this would send an actual test email
    showNotification("success", `Test e-post sendt til ${testEmail}`);
    setShowTestSend(false);
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
          <h1 className="text-2xl font-bold text-gray-900">E-postmaler</h1>
          <p className="text-gray-500">Administrer e-postmaler for ulike hendelser</p>
        </div>
        <Button onClick={handleAddNew}>
          <Plus className="w-4 h-4 mr-2" />
          Ny mal
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Søk etter mal..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="relative w-full sm:w-64">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full h-10 px-3 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">Alle typer</option>
                {templateTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Templates Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <GripVertical className="w-4 h-4 inline mr-2 text-gray-300" />
                    Mal
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fra
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sist endret
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Handlinger
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredTemplates.map((template) => (
                  <tr key={template.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <GripVertical className="w-4 h-4 mr-3 text-gray-300 cursor-grab" />
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {template.name}
                          </div>
                          <div className="text-sm text-gray-500 truncate max-w-xs">
                            {template.subject}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant="secondary">
                        {templateTypes.find((t) => t.value === template.type)?.label ||
                          template.type}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {template.fromAddress}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleToggleActive(template.id)}
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          template.isActive
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {template.isActive ? "Aktiv" : "Inaktiv"}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {template.lastModified.toLocaleDateString("nb-NO")}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex justify-end space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handlePreview(template)}
                          title="Forhåndsvisning"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleTestSend(template)}
                          title="Send test"
                        >
                          <Send className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(template)}
                          title="Rediger"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setShowDeleteConfirm(template.id)}
                          className="text-red-600 hover:text-red-700"
                          title="Slett"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredTemplates.length === 0 && (
            <div className="text-center py-12">
              <Mail className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Ingen maler funnet</p>
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
                  {editingTemplate ? "Rediger mal" : "Ny e-postmal"}
                </CardTitle>
                <Button variant="ghost" size="sm" onClick={() => setShowModal(false)}>
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Malnavn *
                </label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="F.eks. Ordrebekreftelse"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type *
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full h-10 px-3 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="">Velg type...</option>
                  {templateTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Fra-adresse *
                </label>
                <select
                  value={formData.fromAddress}
                  onChange={(e) =>
                    setFormData({ ...formData, fromAddress: e.target.value })
                  }
                  className="w-full h-10 px-3 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  {departmentEmails.map((email) => (
                    <option key={email.value} value={email.value}>
                      {email.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Emne *
                </label>
                <Input
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  placeholder="F.eks. Takk for din ordre #{{order_number}}"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Bruk {"{{variabel}}"} for dynamiske verdier
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Innhold *
                </label>
                <Textarea
                  value={formData.body}
                  onChange={(e) => setFormData({ ...formData, body: e.target.value })}
                  rows={10}
                  placeholder="Skriv e-postinnholdet her..."
                />
                <p className="text-xs text-gray-500 mt-1">
                  Tilgjengelige variabler: {"{{customer_name}}"}, {"{{order_number}}"},{" "}
                  {"{{amount}}"}, {"{{tracking_number}}"}, etc.
                </p>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <Button variant="outline" onClick={() => setShowModal(false)}>
                  Avbryt
                </Button>
                <Button onClick={handleSave}>
                  {editingTemplate ? "Lagre endringer" : "Opprett mal"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Preview Modal */}
      {showPreview && selectedTemplate && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader className="border-b">
              <div className="flex items-center justify-between">
                <CardTitle>Forhåndsvisning: {selectedTemplate.name}</CardTitle>
                <Button variant="ghost" size="sm" onClick={() => setShowPreview(false)}>
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="bg-gray-100 rounded-lg p-4">
                  <p className="text-sm text-gray-500 mb-1">Fra:</p>
                  <p className="font-medium">{selectedTemplate.fromAddress}</p>
                </div>
                <div className="bg-gray-100 rounded-lg p-4">
                  <p className="text-sm text-gray-500 mb-1">Emne:</p>
                  <p className="font-medium">{selectedTemplate.subject}</p>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <pre className="whitespace-pre-wrap font-sans text-sm text-gray-700">
                    {selectedTemplate.body}
                  </pre>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-2">Variabler i bruk:</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedTemplate.variables.map((v) => (
                      <Badge key={v} variant="secondary">
                        {`{{${v}}}`}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex justify-end mt-6">
                <Button variant="outline" onClick={() => setShowPreview(false)}>
                  Lukk
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Test Send Modal */}
      {showTestSend && selectedTemplate && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <CardHeader className="border-b">
              <div className="flex items-center justify-between">
                <CardTitle>Send test-e-post</CardTitle>
                <Button variant="ghost" size="sm" onClick={() => setShowTestSend(false)}>
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <p className="text-sm text-gray-600">
                Send en test-e-post av malen &ldquo;{selectedTemplate.name}&rdquo; til:
              </p>
              <Input
                type="email"
                value={testEmail}
                onChange={(e) => setTestEmail(e.target.value)}
                placeholder="din@epost.no"
              />
              <p className="text-xs text-gray-500">
                Variabler vil bli erstattet med eksempeldata.
              </p>
              <div className="flex justify-end space-x-3">
                <Button variant="outline" onClick={() => setShowTestSend(false)}>
                  Avbryt
                </Button>
                <Button onClick={sendTestEmail}>
                  <Send className="w-4 h-4 mr-2" />
                  Send test
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
                Er du sikker på at du vil slette denne malen? Denne handlingen kan ikke
                angres.
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
