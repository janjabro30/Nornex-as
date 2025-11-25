"use client";

import React, { useState } from "react";
import {
  Plus,
  Edit,
  Trash2,
  Search,
  X,
  Check,
  Eye,
  Download,
  Recycle,
  User,
  Mail,
  Phone,
  ChevronDown,
  CheckCircle,
  XCircle,
  DollarSign,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import type { BuybackStatus, DeviceCondition } from "@/types";

interface SellbackSubmission {
  id: string;
  submissionNumber: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  status: BuybackStatus;
  deviceType: string;
  deviceBrand: string;
  deviceModel: string;
  serialNumber: string;
  condition: DeviceCondition;
  conditionNotes: string;
  estimatedPrice: number;
  finalPrice: number;
  evaluationNotes: string;
  createdAt: Date;
  updatedAt: Date;
}

const statusOptions: { value: BuybackStatus; label: string }[] = [
  { value: "QUOTE_REQUESTED", label: "Tilbud ønsket" },
  { value: "QUOTE_SENT", label: "Tilbud sendt" },
  { value: "ACCEPTED", label: "Akseptert" },
  { value: "DEVICE_RECEIVED", label: "Enhet mottatt" },
  { value: "INSPECTED", label: "Inspisert" },
  { value: "PAYMENT_SENT", label: "Betaling sendt" },
  { value: "COMPLETED", label: "Fullført" },
  { value: "REJECTED", label: "Avvist" },
  { value: "CANCELLED", label: "Kansellert" },
];

const conditionOptions: { value: DeviceCondition; label: string }[] = [
  { value: "EXCELLENT", label: "Utmerket" },
  { value: "GOOD", label: "God" },
  { value: "FAIR", label: "Middels" },
  { value: "POOR", label: "Dårlig" },
  { value: "BROKEN", label: "Ødelagt" },
];

const mockSubmissions: SellbackSubmission[] = [
  {
    id: "1",
    submissionNumber: "BUY-001234",
    customerId: "c1",
    customerName: "Erik Hansen",
    customerEmail: "erik.hansen@example.com",
    customerPhone: "+47 912 34 567",
    status: "DEVICE_RECEIVED",
    deviceType: "Bærbar PC",
    deviceBrand: "Apple",
    deviceModel: "MacBook Pro 2019",
    serialNumber: "C02XYZ123456",
    condition: "GOOD",
    conditionNotes: "Noen riper på lokket, fungerer fint",
    estimatedPrice: 6500,
    finalPrice: 0,
    evaluationNotes: "",
    createdAt: new Date("2024-01-14T09:00:00"),
    updatedAt: new Date("2024-01-15T11:00:00"),
  },
  {
    id: "2",
    submissionNumber: "BUY-001235",
    customerId: "c2",
    customerName: "Maria Olsen",
    customerEmail: "maria.olsen@example.com",
    customerPhone: "+47 923 45 678",
    status: "QUOTE_SENT",
    deviceType: "Mobil",
    deviceBrand: "Samsung",
    deviceModel: "Galaxy S22",
    serialNumber: "",
    condition: "EXCELLENT",
    conditionNotes: "Som ny, med original eske",
    estimatedPrice: 4200,
    finalPrice: 0,
    evaluationNotes: "",
    createdAt: new Date("2024-01-15T10:30:00"),
    updatedAt: new Date("2024-01-15T14:00:00"),
  },
  {
    id: "3",
    submissionNumber: "BUY-001230",
    customerId: "c3",
    customerName: "Anders Berg",
    customerEmail: "anders.berg@company.no",
    customerPhone: "+47 934 56 789",
    status: "COMPLETED",
    deviceType: "Bærbar PC",
    deviceBrand: "Dell",
    deviceModel: "XPS 15",
    serialNumber: "DLXYZ987654",
    condition: "FAIR",
    conditionNotes: "Noe slitasje, tastatur brukt",
    estimatedPrice: 4000,
    finalPrice: 3800,
    evaluationNotes: "Fungerer bra, mindre kosmetiske skader",
    createdAt: new Date("2024-01-10T08:15:00"),
    updatedAt: new Date("2024-01-13T16:00:00"),
  },
];

export default function SellbackView() {
  const [submissions, setSubmissions] = useState<SellbackSubmission[]>(mockSubmissions);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [showModal, setShowModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [editingSubmission, setEditingSubmission] = useState<SellbackSubmission | null>(null);
  const [selectedSubmission, setSelectedSubmission] = useState<SellbackSubmission | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    status: "QUOTE_REQUESTED" as BuybackStatus,
    deviceType: "",
    deviceBrand: "",
    deviceModel: "",
    serialNumber: "",
    condition: "GOOD" as DeviceCondition,
    conditionNotes: "",
    estimatedPrice: 0,
    finalPrice: 0,
    evaluationNotes: "",
  });

  const filteredSubmissions = submissions.filter((s) => {
    const matchesSearch =
      s.submissionNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.deviceModel.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = !statusFilter || s.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const showNotification = (type: "success" | "error", message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };

  const getStatusBadge = (status: BuybackStatus) => {
    const colors: Record<BuybackStatus, string> = {
      QUOTE_REQUESTED: "bg-gray-100 text-gray-800",
      QUOTE_SENT: "bg-blue-100 text-blue-800",
      ACCEPTED: "bg-green-100 text-green-800",
      DEVICE_RECEIVED: "bg-yellow-100 text-yellow-800",
      INSPECTED: "bg-purple-100 text-purple-800",
      PAYMENT_SENT: "bg-indigo-100 text-indigo-800",
      COMPLETED: "bg-green-100 text-green-800",
      REJECTED: "bg-red-100 text-red-800",
      CANCELLED: "bg-gray-100 text-gray-800",
    };
    const label = statusOptions.find((o) => o.value === status)?.label || status;
    return <Badge className={colors[status]}>{label}</Badge>;
  };

  const handleViewSubmission = (submission: SellbackSubmission) => {
    setSelectedSubmission(submission);
    setShowDetailModal(true);
  };

  const handleAddNew = () => {
    setEditingSubmission(null);
    setFormData({
      customerName: "",
      customerEmail: "",
      customerPhone: "",
      status: "QUOTE_REQUESTED",
      deviceType: "",
      deviceBrand: "",
      deviceModel: "",
      serialNumber: "",
      condition: "GOOD",
      conditionNotes: "",
      estimatedPrice: 0,
      finalPrice: 0,
      evaluationNotes: "",
    });
    setShowModal(true);
  };

  const handleEdit = (submission: SellbackSubmission) => {
    setEditingSubmission(submission);
    setFormData({
      customerName: submission.customerName,
      customerEmail: submission.customerEmail,
      customerPhone: submission.customerPhone,
      status: submission.status,
      deviceType: submission.deviceType,
      deviceBrand: submission.deviceBrand,
      deviceModel: submission.deviceModel,
      serialNumber: submission.serialNumber,
      condition: submission.condition,
      conditionNotes: submission.conditionNotes,
      estimatedPrice: submission.estimatedPrice,
      finalPrice: submission.finalPrice,
      evaluationNotes: submission.evaluationNotes,
    });
    setShowModal(true);
  };

  const handleSave = () => {
    if (!formData.customerName || !formData.deviceType) {
      showNotification("error", "Vennligst fyll inn påkrevde felt");
      return;
    }

    if (editingSubmission) {
      setSubmissions(
        submissions.map((s) =>
          s.id === editingSubmission.id
            ? { ...s, ...formData, updatedAt: new Date() }
            : s
        )
      );
      showNotification("success", "Innkjøp oppdatert");
    } else {
      const newSubmission: SellbackSubmission = {
        id: Date.now().toString(),
        submissionNumber: `BUY-${Date.now().toString().slice(-6)}`,
        customerId: Date.now().toString(),
        ...formData,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setSubmissions([newSubmission, ...submissions]);
      showNotification("success", "Ny forespørsel opprettet");
    }

    setShowModal(false);
  };

  const handleDelete = (id: string) => {
    setSubmissions(submissions.filter((s) => s.id !== id));
    setShowDeleteConfirm(null);
    showNotification("success", "Forespørsel slettet");
  };

  const handleApprove = (id: string) => {
    setSubmissions(
      submissions.map((s) =>
        s.id === id
          ? { ...s, status: "ACCEPTED" as BuybackStatus, updatedAt: new Date() }
          : s
      )
    );
    showNotification("success", "Tilbud godkjent - E-post sendt til kunde");
  };

  const handleReject = (id: string) => {
    setSubmissions(
      submissions.map((s) =>
        s.id === id
          ? { ...s, status: "REJECTED" as BuybackStatus, updatedAt: new Date() }
          : s
      )
    );
    showNotification("success", "Tilbud avvist");
  };

  return (
    <div className="space-y-6">
      {/* Notification Toast */}
      {notification && (
        <div
          className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-lg shadow-lg flex items-center space-x-2 ${
            notification.type === "success" ? "bg-green-600 text-white" : "bg-red-600 text-white"
          }`}
        >
          {notification.type === "success" ? <Check className="w-5 h-5" /> : <X className="w-5 h-5" />}
          <span>{notification.message}</span>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Innkjøp / Selg til oss</h1>
          <p className="text-gray-500">Administrer innkjøpsforespørsler</p>
        </div>
        <Button onClick={handleAddNew}>
          <Plus className="w-4 h-4 mr-2" />
          Ny forespørsel
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-gray-500">Ventende</p>
            <p className="text-2xl font-bold">{submissions.filter((s) => s.status === "QUOTE_REQUESTED").length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-gray-500">Under vurdering</p>
            <p className="text-2xl font-bold">{submissions.filter((s) => s.status === "DEVICE_RECEIVED" || s.status === "INSPECTED").length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-gray-500">Fullført denne måneden</p>
            <p className="text-2xl font-bold">{submissions.filter((s) => s.status === "COMPLETED").length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-gray-500">Total verdi</p>
            <p className="text-2xl font-bold">{submissions.reduce((sum, s) => sum + (s.finalPrice || s.estimatedPrice), 0).toLocaleString("nb-NO")} kr</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Søk etter saksnummer, kunde, enhet..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-48 h-10 px-3 border border-gray-300 rounded-md bg-white text-sm"
            >
              <option value="">Alle statuser</option>
              {statusOptions.map((s) => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Submissions Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sak</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Kunde</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Enhet</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tilstand</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Pris</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Handlinger</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredSubmissions.map((submission) => (
                  <tr key={submission.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <button onClick={() => handleViewSubmission(submission)} className="font-medium text-blue-600 hover:underline">
                        {submission.submissionNumber}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-gray-900">{submission.customerName}</p>
                      <p className="text-sm text-gray-500">{submission.customerEmail}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-gray-900">{submission.deviceBrand} {submission.deviceModel}</p>
                      <p className="text-sm text-gray-500">{submission.deviceType}</p>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant="secondary">{conditionOptions.find((c) => c.value === submission.condition)?.label}</Badge>
                    </td>
                    <td className="px-6 py-4">{getStatusBadge(submission.status)}</td>
                    <td className="px-6 py-4 font-medium">
                      {(submission.finalPrice || submission.estimatedPrice).toLocaleString("nb-NO")} kr
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end space-x-2">
                        <Button variant="ghost" size="sm" onClick={() => handleViewSubmission(submission)} title="Se detaljer">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleEdit(submission)} title="Rediger">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => setShowDeleteConfirm(submission.id)} className="text-red-600" title="Slett">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredSubmissions.length === 0 && (
            <div className="text-center py-12">
              <Recycle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Ingen forespørsler funnet</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Detail Modal */}
      {showDetailModal && selectedSubmission && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader className="border-b">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Sak {selectedSubmission.submissionNumber}</CardTitle>
                  <p className="text-sm text-gray-500">Opprettet {selectedSubmission.createdAt.toLocaleString("nb-NO")}</p>
                </div>
                <div className="flex items-center space-x-3">
                  {getStatusBadge(selectedSubmission.status)}
                  <Button variant="ghost" size="sm" onClick={() => setShowDetailModal(false)}><X className="w-5 h-5" /></Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-3 flex items-center"><User className="w-4 h-4 mr-2" />Kundeinformasjon</h4>
                  <div className="space-y-2 text-sm">
                    <p>{selectedSubmission.customerName}</p>
                    <p className="flex items-center text-gray-500"><Mail className="w-4 h-4 mr-2" />{selectedSubmission.customerEmail}</p>
                    <p className="flex items-center text-gray-500"><Phone className="w-4 h-4 mr-2" />{selectedSubmission.customerPhone}</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-3 flex items-center"><Recycle className="w-4 h-4 mr-2" />Enhetsinformasjon</h4>
                  <div className="text-sm text-gray-500">
                    <p><strong>Type:</strong> {selectedSubmission.deviceType}</p>
                    <p><strong>Merke:</strong> {selectedSubmission.deviceBrand}</p>
                    <p><strong>Modell:</strong> {selectedSubmission.deviceModel}</p>
                    <p><strong>Tilstand:</strong> {conditionOptions.find((c) => c.value === selectedSubmission.condition)?.label}</p>
                  </div>
                </div>
              </div>

              {selectedSubmission.conditionNotes && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Tilstandsbeskrivelse</h4>
                  <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">{selectedSubmission.conditionNotes}</p>
                </div>
              )}

              <div className="bg-green-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-3 flex items-center"><DollarSign className="w-4 h-4 mr-2" />Prisvurdering</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span>Estimert pris</span><span className="font-medium">{selectedSubmission.estimatedPrice.toLocaleString("nb-NO")} kr</span></div>
                  {selectedSubmission.finalPrice > 0 && (
                    <div className="flex justify-between"><span>Endelig pris</span><span className="font-medium text-green-700">{selectedSubmission.finalPrice.toLocaleString("nb-NO")} kr</span></div>
                  )}
                </div>
              </div>

              {selectedSubmission.status === "QUOTE_SENT" && (
                <div className="flex space-x-3">
                  <Button onClick={() => { handleApprove(selectedSubmission.id); setShowDetailModal(false); }} className="flex-1">
                    <CheckCircle className="w-4 h-4 mr-2" />Godkjenn
                  </Button>
                  <Button variant="destructive" onClick={() => { handleReject(selectedSubmission.id); setShowDetailModal(false); }} className="flex-1">
                    <XCircle className="w-4 h-4 mr-2" />Avvis
                  </Button>
                </div>
              )}

              <div className="flex justify-between pt-4 border-t">
                <Button variant="outline"><Download className="w-4 h-4 mr-2" />Generer kjøpsslip</Button>
                <div className="flex space-x-3">
                  <Button variant="outline" onClick={() => setShowDetailModal(false)}>Lukk</Button>
                  <Button onClick={() => { setShowDetailModal(false); handleEdit(selectedSubmission); }}><Edit className="w-4 h-4 mr-2" />Rediger</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader className="border-b">
              <div className="flex items-center justify-between">
                <CardTitle>{editingSubmission ? "Rediger forespørsel" : "Ny forespørsel"}</CardTitle>
                <Button variant="ghost" size="sm" onClick={() => setShowModal(false)}><X className="w-5 h-5" /></Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Kundeinformasjon</h4>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Navn *</label>
                    <Input value={formData.customerName} onChange={(e) => setFormData({ ...formData, customerName: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">E-post</label>
                    <Input type="email" value={formData.customerEmail} onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Telefon</label>
                    <Input value={formData.customerPhone} onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })} />
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-3">Enhetsinformasjon</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Type *</label>
                    <Input value={formData.deviceType} onChange={(e) => setFormData({ ...formData, deviceType: e.target.value })} placeholder="F.eks. Bærbar PC" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Merke</label>
                    <Input value={formData.deviceBrand} onChange={(e) => setFormData({ ...formData, deviceBrand: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Modell</label>
                    <Input value={formData.deviceModel} onChange={(e) => setFormData({ ...formData, deviceModel: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tilstand</label>
                    <select value={formData.condition} onChange={(e) => setFormData({ ...formData, condition: e.target.value as DeviceCondition })} className="w-full h-10 px-3 border border-gray-300 rounded-md bg-white text-sm">
                      {conditionOptions.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tilstandsnotat</label>
                <Textarea value={formData.conditionNotes} onChange={(e) => setFormData({ ...formData, conditionNotes: e.target.value })} rows={2} />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value as BuybackStatus })} className="w-full h-10 px-3 border border-gray-300 rounded-md bg-white text-sm">
                    {statusOptions.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Estimert pris (kr)</label>
                  <Input type="number" value={formData.estimatedPrice} onChange={(e) => setFormData({ ...formData, estimatedPrice: parseFloat(e.target.value) || 0 })} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Endelig pris (kr)</label>
                  <Input type="number" value={formData.finalPrice} onChange={(e) => setFormData({ ...formData, finalPrice: parseFloat(e.target.value) || 0 })} />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Evalueringsnotat</label>
                <Textarea value={formData.evaluationNotes} onChange={(e) => setFormData({ ...formData, evaluationNotes: e.target.value })} rows={2} />
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <Button variant="outline" onClick={() => setShowModal(false)}>Avbryt</Button>
                <Button onClick={handleSave}>{editingSubmission ? "Lagre endringer" : "Opprett"}</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Delete Confirmation */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <CardHeader className="border-b"><CardTitle className="text-red-600">Bekreft sletting</CardTitle></CardHeader>
            <CardContent className="pt-6 space-y-4">
              <p className="text-gray-600">Er du sikker på at du vil slette denne forespørselen?</p>
              <div className="flex justify-end space-x-3">
                <Button variant="outline" onClick={() => setShowDeleteConfirm(null)}>Avbryt</Button>
                <Button variant="destructive" onClick={() => handleDelete(showDeleteConfirm)}>Slett</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
