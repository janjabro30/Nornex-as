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
  FileText,
  Send,
  Clock,
  CheckCircle,
  Calendar,
  User,
  Building,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

type ContractStatus = "DRAFT" | "SENT" | "SIGNED" | "ACTIVE" | "EXPIRED" | "CANCELLED";
type ContractType = "SERVICE" | "LEASE" | "SUPPORT" | "MAINTENANCE" | "CUSTOM";

interface Contract {
  id: string;
  contractNumber: string;
  title: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  companyName: string;
  orgNumber: string;
  type: ContractType;
  status: ContractStatus;
  terms: string;
  startDate: Date;
  endDate: Date;
  value: number;
  paymentTerms: string;
  signingLink: string;
  signedAt?: Date;
  signedPdfUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

const statusOptions: { value: ContractStatus; label: string }[] = [
  { value: "DRAFT", label: "Utkast" },
  { value: "SENT", label: "Sendt" },
  { value: "SIGNED", label: "Signert" },
  { value: "ACTIVE", label: "Aktiv" },
  { value: "EXPIRED", label: "Utløpt" },
  { value: "CANCELLED", label: "Kansellert" },
];

const typeOptions: { value: ContractType; label: string }[] = [
  { value: "SERVICE", label: "Serviceavtale" },
  { value: "LEASE", label: "Leieavtale" },
  { value: "SUPPORT", label: "Supportavtale" },
  { value: "MAINTENANCE", label: "Vedlikeholdsavtale" },
  { value: "CUSTOM", label: "Tilpasset" },
];

const mockContracts: Contract[] = [
  {
    id: "1",
    contractNumber: "CON-001234",
    title: "IT Support Avtale 2024",
    customerId: "c1",
    customerName: "Erik Hansen",
    customerEmail: "erik.hansen@techcorp.no",
    companyName: "TechCorp AS",
    orgNumber: "123456789",
    type: "SUPPORT",
    status: "ACTIVE",
    terms: "Full IT-support med 4 timers responstid på kritiske feil.",
    startDate: new Date("2024-01-01"),
    endDate: new Date("2024-12-31"),
    value: 48000,
    paymentTerms: "Månedlig fakturering",
    signingLink: "",
    signedAt: new Date("2023-12-15"),
    signedPdfUrl: "/contracts/con-001234.pdf",
    createdAt: new Date("2023-12-10"),
    updatedAt: new Date("2023-12-15"),
  },
  {
    id: "2",
    contractNumber: "CON-001235",
    title: "PC Leieavtale - 10 enheter",
    customerId: "c2",
    customerName: "Maria Olsen",
    customerEmail: "maria@startup.no",
    companyName: "Startup Hub AS",
    orgNumber: "987654321",
    type: "LEASE",
    status: "SENT",
    terms: "Leie av 10 bærbare PC-er med 24 måneders varighet.",
    startDate: new Date("2024-02-01"),
    endDate: new Date("2026-01-31"),
    value: 96000,
    paymentTerms: "Kvartalsvis fakturering",
    signingLink: "https://sign.nornex.no/con-001235",
    createdAt: new Date("2024-01-10"),
    updatedAt: new Date("2024-01-12"),
  },
  {
    id: "3",
    contractNumber: "CON-001230",
    title: "Serviceavtale Servere",
    customerId: "c3",
    customerName: "Anders Berg",
    customerEmail: "anders@industry.no",
    companyName: "Industry Solutions AS",
    orgNumber: "456789123",
    type: "SERVICE",
    status: "DRAFT",
    terms: "Månedlig service og overvåking av 3 servere.",
    startDate: new Date("2024-03-01"),
    endDate: new Date("2025-02-28"),
    value: 36000,
    paymentTerms: "Månedlig fakturering",
    signingLink: "",
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15"),
  },
];

export default function ContractsView() {
  const [contracts, setContracts] = useState<Contract[]>(mockContracts);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [showModal, setShowModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [editingContract, setEditingContract] = useState<Contract | null>(null);
  const [selectedContract, setSelectedContract] = useState<Contract | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    customerName: "",
    customerEmail: "",
    companyName: "",
    orgNumber: "",
    type: "SERVICE" as ContractType,
    status: "DRAFT" as ContractStatus,
    terms: "",
    startDate: "",
    endDate: "",
    value: 0,
    paymentTerms: "Månedlig fakturering",
  });

  const filteredContracts = contracts.filter((c) => {
    const matchesSearch =
      c.contractNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = !statusFilter || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const showNotification = (type: "success" | "error", message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };

  const getStatusBadge = (status: ContractStatus) => {
    const colors: Record<ContractStatus, string> = {
      DRAFT: "bg-gray-100 text-gray-800",
      SENT: "bg-blue-100 text-blue-800",
      SIGNED: "bg-purple-100 text-purple-800",
      ACTIVE: "bg-green-100 text-green-800",
      EXPIRED: "bg-yellow-100 text-yellow-800",
      CANCELLED: "bg-red-100 text-red-800",
    };
    const label = statusOptions.find((o) => o.value === status)?.label || status;
    return <Badge className={colors[status]}>{label}</Badge>;
  };

  const handleViewContract = (contract: Contract) => {
    setSelectedContract(contract);
    setShowDetailModal(true);
  };

  const handleAddNew = () => {
    setEditingContract(null);
    setFormData({
      title: "",
      customerName: "",
      customerEmail: "",
      companyName: "",
      orgNumber: "",
      type: "SERVICE",
      status: "DRAFT",
      terms: "",
      startDate: "",
      endDate: "",
      value: 0,
      paymentTerms: "Månedlig fakturering",
    });
    setShowModal(true);
  };

  const handleEdit = (contract: Contract) => {
    setEditingContract(contract);
    setFormData({
      title: contract.title,
      customerName: contract.customerName,
      customerEmail: contract.customerEmail,
      companyName: contract.companyName,
      orgNumber: contract.orgNumber,
      type: contract.type,
      status: contract.status,
      terms: contract.terms,
      startDate: contract.startDate.toISOString().split("T")[0],
      endDate: contract.endDate.toISOString().split("T")[0],
      value: contract.value,
      paymentTerms: contract.paymentTerms,
    });
    setShowModal(true);
  };

  const handleSave = () => {
    if (!formData.title || !formData.companyName) {
      showNotification("error", "Vennligst fyll inn påkrevde felt");
      return;
    }

    if (editingContract) {
      setContracts(
        contracts.map((c) =>
          c.id === editingContract.id
            ? {
                ...c,
                ...formData,
                startDate: new Date(formData.startDate),
                endDate: new Date(formData.endDate),
                updatedAt: new Date(),
              }
            : c
        )
      );
      showNotification("success", "Kontrakt oppdatert");
    } else {
      const newContract: Contract = {
        id: Date.now().toString(),
        contractNumber: `CON-${Date.now().toString().slice(-6)}`,
        customerId: Date.now().toString(),
        ...formData,
        startDate: new Date(formData.startDate),
        endDate: new Date(formData.endDate),
        signingLink: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setContracts([newContract, ...contracts]);
      showNotification("success", "Ny kontrakt opprettet");
    }

    setShowModal(false);
  };

  const handleDelete = (id: string) => {
    setContracts(contracts.filter((c) => c.id !== id));
    setShowDeleteConfirm(null);
    showNotification("success", "Kontrakt slettet");
  };

  const handleSendForSignature = (id: string) => {
    const signingLink = `https://sign.nornex.no/contract-${id}`;
    setContracts(
      contracts.map((c) =>
        c.id === id
          ? { ...c, status: "SENT" as ContractStatus, signingLink, updatedAt: new Date() }
          : c
      )
    );
    showNotification("success", "Kontrakt sendt for signering - E-post sendt til kunde");
  };

  return (
    <div className="space-y-6">
      {/* Notification Toast */}
      {notification && (
        <div className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-lg shadow-lg flex items-center space-x-2 ${notification.type === "success" ? "bg-green-600 text-white" : "bg-red-600 text-white"}`}>
          {notification.type === "success" ? <Check className="w-5 h-5" /> : <X className="w-5 h-5" />}
          <span>{notification.message}</span>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Kontrakter</h1>
          <p className="text-gray-500">Administrer kundekontrakter og avtaler</p>
        </div>
        <Button onClick={handleAddNew}>
          <Plus className="w-4 h-4 mr-2" />
          Ny kontrakt
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-gray-500">Aktive</p>
            <p className="text-2xl font-bold">{contracts.filter((c) => c.status === "ACTIVE").length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-gray-500">Venter på signering</p>
            <p className="text-2xl font-bold">{contracts.filter((c) => c.status === "SENT").length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-gray-500">Utløper snart</p>
            <p className="text-2xl font-bold text-yellow-600">2</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-gray-500">Total verdi</p>
            <p className="text-2xl font-bold">{contracts.reduce((sum, c) => sum + c.value, 0).toLocaleString("nb-NO")} kr</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input placeholder="Søk etter kontraktnummer, kunde, firma..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10" />
            </div>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="w-48 h-10 px-3 border border-gray-300 rounded-md bg-white text-sm">
              <option value="">Alle statuser</option>
              {statusOptions.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Contracts Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Kontrakt</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Kunde/Firma</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Varighet</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Verdi</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Handlinger</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredContracts.map((contract) => (
                  <tr key={contract.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <button onClick={() => handleViewContract(contract)} className="font-medium text-blue-600 hover:underline">
                        {contract.contractNumber}
                      </button>
                      <p className="text-sm text-gray-500">{contract.title}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-gray-900">{contract.companyName}</p>
                      <p className="text-sm text-gray-500">{contract.customerName}</p>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant="secondary">{typeOptions.find((t) => t.value === contract.type)?.label}</Badge>
                    </td>
                    <td className="px-6 py-4">{getStatusBadge(contract.status)}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {contract.startDate.toLocaleDateString("nb-NO")} - {contract.endDate.toLocaleDateString("nb-NO")}
                    </td>
                    <td className="px-6 py-4 font-medium">{contract.value.toLocaleString("nb-NO")} kr</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end space-x-2">
                        {contract.status === "DRAFT" && (
                          <Button variant="ghost" size="sm" onClick={() => handleSendForSignature(contract.id)} title="Send for signering">
                            <Send className="w-4 h-4" />
                          </Button>
                        )}
                        <Button variant="ghost" size="sm" onClick={() => handleViewContract(contract)} title="Se detaljer">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleEdit(contract)} title="Rediger">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => setShowDeleteConfirm(contract.id)} className="text-red-600" title="Slett">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredContracts.length === 0 && (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Ingen kontrakter funnet</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Detail Modal */}
      {showDetailModal && selectedContract && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader className="border-b">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{selectedContract.contractNumber}</CardTitle>
                  <p className="text-sm text-gray-500">{selectedContract.title}</p>
                </div>
                <div className="flex items-center space-x-3">
                  {getStatusBadge(selectedContract.status)}
                  <Button variant="ghost" size="sm" onClick={() => setShowDetailModal(false)}><X className="w-5 h-5" /></Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-3 flex items-center"><Building className="w-4 h-4 mr-2" />Firma</h4>
                  <div className="text-sm">
                    <p className="font-medium">{selectedContract.companyName}</p>
                    <p className="text-gray-500">Org.nr: {selectedContract.orgNumber}</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-3 flex items-center"><User className="w-4 h-4 mr-2" />Kontaktperson</h4>
                  <div className="text-sm">
                    <p>{selectedContract.customerName}</p>
                    <p className="text-gray-500">{selectedContract.customerEmail}</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-2">Avtalevilkår</h4>
                <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">{selectedContract.terms}</p>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500">Startdato</p>
                  <p className="font-medium">{selectedContract.startDate.toLocaleDateString("nb-NO")}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500">Sluttdato</p>
                  <p className="font-medium">{selectedContract.endDate.toLocaleDateString("nb-NO")}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500">Verdi</p>
                  <p className="font-medium">{selectedContract.value.toLocaleString("nb-NO")} kr</p>
                </div>
              </div>

              {selectedContract.status === "SENT" && selectedContract.signingLink && (
                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-medium text-blue-900 mb-2 flex items-center"><Clock className="w-4 h-4 mr-2" />Venter på signering</h4>
                  <p className="text-sm text-blue-700">Signeringslenke: {selectedContract.signingLink}</p>
                </div>
              )}

              {selectedContract.signedAt && (
                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-medium text-green-900 mb-2 flex items-center"><CheckCircle className="w-4 h-4 mr-2" />Signert</h4>
                  <p className="text-sm text-green-700">Signert: {selectedContract.signedAt.toLocaleString("nb-NO")}</p>
                </div>
              )}

              <div className="flex justify-between pt-4 border-t">
                <Button variant="outline"><Download className="w-4 h-4 mr-2" />Last ned PDF</Button>
                <div className="flex space-x-3">
                  <Button variant="outline" onClick={() => setShowDetailModal(false)}>Lukk</Button>
                  <Button onClick={() => { setShowDetailModal(false); handleEdit(selectedContract); }}><Edit className="w-4 h-4 mr-2" />Rediger</Button>
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
                <CardTitle>{editingContract ? "Rediger kontrakt" : "Ny kontrakt"}</CardTitle>
                <Button variant="ghost" size="sm" onClick={() => setShowModal(false)}><X className="w-5 h-5" /></Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tittel *</label>
                <Input value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} placeholder="F.eks. IT Support Avtale 2024" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Firmanavn *</label>
                  <Input value={formData.companyName} onChange={(e) => setFormData({ ...formData, companyName: e.target.value })} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Org.nummer</label>
                  <Input value={formData.orgNumber} onChange={(e) => setFormData({ ...formData, orgNumber: e.target.value })} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Kontaktperson</label>
                  <Input value={formData.customerName} onChange={(e) => setFormData({ ...formData, customerName: e.target.value })} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">E-post</label>
                  <Input type="email" value={formData.customerEmail} onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                  <select value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value as ContractType })} className="w-full h-10 px-3 border border-gray-300 rounded-md bg-white text-sm">
                    {typeOptions.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value as ContractStatus })} className="w-full h-10 px-3 border border-gray-300 rounded-md bg-white text-sm">
                    {statusOptions.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Avtalevilkår</label>
                <Textarea value={formData.terms} onChange={(e) => setFormData({ ...formData, terms: e.target.value })} rows={4} />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Startdato</label>
                  <Input type="date" value={formData.startDate} onChange={(e) => setFormData({ ...formData, startDate: e.target.value })} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sluttdato</label>
                  <Input type="date" value={formData.endDate} onChange={(e) => setFormData({ ...formData, endDate: e.target.value })} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Verdi (kr)</label>
                  <Input type="number" value={formData.value} onChange={(e) => setFormData({ ...formData, value: parseFloat(e.target.value) || 0 })} />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Betalingsvilkår</label>
                <Input value={formData.paymentTerms} onChange={(e) => setFormData({ ...formData, paymentTerms: e.target.value })} />
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <Button variant="outline" onClick={() => setShowModal(false)}>Avbryt</Button>
                <Button onClick={handleSave}>{editingContract ? "Lagre endringer" : "Opprett kontrakt"}</Button>
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
              <p className="text-gray-600">Er du sikker på at du vil slette denne kontrakten?</p>
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
