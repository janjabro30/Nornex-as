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
  Filter,
  FileText,
  Wrench,
  Calendar,
  User,
  Mail,
  Phone,
  Camera,
  Clock,
  ChevronDown,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

type RepairStatus = "RECEIVED" | "DIAGNOSED" | "IN_PROGRESS" | "COMPLETED" | "SHIPPED" | "CANCELLED";

interface Repair {
  id: string;
  repairNumber: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  status: RepairStatus;
  deviceType: string;
  deviceBrand: string;
  deviceModel: string;
  serialNumber: string;
  issueDescription: string;
  diagnosis: string;
  technicianId: string;
  technicianName: string;
  estimatedCost: number;
  actualCost: number;
  partsUsed: { name: string; cost: number }[];
  laborHours: number;
  laborRate: number;
  photos: string[];
  notes: string;
  createdAt: Date;
  updatedAt: Date;
  completedAt?: Date;
}

const statusOptions: { value: RepairStatus; label: string }[] = [
  { value: "RECEIVED", label: "Mottatt" },
  { value: "DIAGNOSED", label: "Diagnostisert" },
  { value: "IN_PROGRESS", label: "Under arbeid" },
  { value: "COMPLETED", label: "Fullført" },
  { value: "SHIPPED", label: "Sendt" },
  { value: "CANCELLED", label: "Kansellert" },
];

const deviceTypes = [
  "Bærbar PC",
  "Stasjonær PC",
  "Skjerm",
  "Mobil",
  "Nettbrett",
  "Skriver",
  "Annet",
];

const technicians = [
  { id: "t1", name: "Ole Tekniker" },
  { id: "t2", name: "Kari Spesialist" },
  { id: "t3", name: "Per Expert" },
];

const mockRepairs: Repair[] = [
  {
    id: "1",
    repairNumber: "REP-001234",
    customerId: "c1",
    customerName: "Erik Hansen",
    customerEmail: "erik.hansen@example.com",
    customerPhone: "+47 912 34 567",
    status: "IN_PROGRESS",
    deviceType: "Bærbar PC",
    deviceBrand: "Dell",
    deviceModel: "Latitude 5520",
    serialNumber: "DLXYZ123456",
    issueDescription: "Skjermen flimrer og PC-en slår seg av tilfeldig",
    diagnosis: "Defekt skjermkabel og overoppheting på grunn av støvete vifte",
    technicianId: "t1",
    technicianName: "Ole Tekniker",
    estimatedCost: 2500,
    actualCost: 0,
    partsUsed: [{ name: "Skjermkabel", cost: 450 }],
    laborHours: 1.5,
    laborRate: 800,
    photos: [],
    notes: "Kunde er fleksibel på tidspunkt",
    createdAt: new Date("2024-01-14T09:00:00"),
    updatedAt: new Date("2024-01-15T11:00:00"),
  },
  {
    id: "2",
    repairNumber: "REP-001235",
    customerId: "c2",
    customerName: "Maria Olsen",
    customerEmail: "maria.olsen@example.com",
    customerPhone: "+47 923 45 678",
    status: "DIAGNOSED",
    deviceType: "Mobil",
    deviceBrand: "Apple",
    deviceModel: "iPhone 13",
    serialNumber: "APLXYZ789012",
    issueDescription: "Knust skjerm etter fall",
    diagnosis: "Skjermbytte nødvendig. Ingen intern skade.",
    technicianId: "t2",
    technicianName: "Kari Spesialist",
    estimatedCost: 3200,
    actualCost: 0,
    partsUsed: [],
    laborHours: 0,
    laborRate: 800,
    photos: [],
    notes: "",
    createdAt: new Date("2024-01-15T10:30:00"),
    updatedAt: new Date("2024-01-15T14:00:00"),
  },
  {
    id: "3",
    repairNumber: "REP-001230",
    customerId: "c3",
    customerName: "Anders Berg",
    customerEmail: "anders.berg@company.no",
    customerPhone: "+47 934 56 789",
    status: "COMPLETED",
    deviceType: "Stasjonær PC",
    deviceBrand: "HP",
    deviceModel: "ProDesk 400 G7",
    serialNumber: "HPXYZ345678",
    issueDescription: "Starter ikke, ingen lys",
    diagnosis: "Defekt strømforsyning",
    technicianId: "t3",
    technicianName: "Per Expert",
    estimatedCost: 1500,
    actualCost: 1650,
    partsUsed: [{ name: "Strømforsyning 500W", cost: 850 }],
    laborHours: 1,
    laborRate: 800,
    photos: [],
    notes: "Kunde hentet selv",
    createdAt: new Date("2024-01-10T08:15:00"),
    updatedAt: new Date("2024-01-13T16:00:00"),
    completedAt: new Date("2024-01-13T16:00:00"),
  },
];

export default function RepairsView() {
  const [repairs, setRepairs] = useState<Repair[]>(mockRepairs);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [technicianFilter, setTechnicianFilter] = useState<string>("");
  const [showFilters, setShowFilters] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [editingRepair, setEditingRepair] = useState<Repair | null>(null);
  const [selectedRepair, setSelectedRepair] = useState<Repair | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    status: "RECEIVED" as RepairStatus,
    deviceType: "",
    deviceBrand: "",
    deviceModel: "",
    serialNumber: "",
    issueDescription: "",
    diagnosis: "",
    technicianId: "",
    estimatedCost: 0,
    actualCost: 0,
    partsUsed: [{ name: "", cost: 0 }],
    laborHours: 0,
    laborRate: 800,
    notes: "",
  });

  const filteredRepairs = repairs.filter((repair) => {
    const matchesSearch =
      repair.repairNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      repair.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      repair.deviceModel.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = !statusFilter || repair.status === statusFilter;
    const matchesTechnician = !technicianFilter || repair.technicianId === technicianFilter;
    return matchesSearch && matchesStatus && matchesTechnician;
  });

  const showNotification = (type: "success" | "error", message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };

  const getStatusBadge = (status: RepairStatus) => {
    const statusConfig: Record<RepairStatus, { variant: "default" | "secondary" | "destructive"; label: string; color: string }> = {
      RECEIVED: { variant: "secondary", label: "Mottatt", color: "bg-gray-100 text-gray-800" },
      DIAGNOSED: { variant: "secondary", label: "Diagnostisert", color: "bg-blue-100 text-blue-800" },
      IN_PROGRESS: { variant: "default", label: "Under arbeid", color: "bg-yellow-100 text-yellow-800" },
      COMPLETED: { variant: "default", label: "Fullført", color: "bg-green-100 text-green-800" },
      SHIPPED: { variant: "default", label: "Sendt", color: "bg-purple-100 text-purple-800" },
      CANCELLED: { variant: "destructive", label: "Kansellert", color: "bg-red-100 text-red-800" },
    };
    const config = statusConfig[status];
    return <Badge className={config.color}>{config.label}</Badge>;
  };

  const handleViewRepair = (repair: Repair) => {
    setSelectedRepair(repair);
    setShowDetailModal(true);
  };

  const handleAddNew = () => {
    setEditingRepair(null);
    setFormData({
      customerName: "",
      customerEmail: "",
      customerPhone: "",
      status: "RECEIVED",
      deviceType: "",
      deviceBrand: "",
      deviceModel: "",
      serialNumber: "",
      issueDescription: "",
      diagnosis: "",
      technicianId: "",
      estimatedCost: 0,
      actualCost: 0,
      partsUsed: [{ name: "", cost: 0 }],
      laborHours: 0,
      laborRate: 800,
      notes: "",
    });
    setShowModal(true);
  };

  const handleEdit = (repair: Repair) => {
    setEditingRepair(repair);
    setFormData({
      customerName: repair.customerName,
      customerEmail: repair.customerEmail,
      customerPhone: repair.customerPhone,
      status: repair.status,
      deviceType: repair.deviceType,
      deviceBrand: repair.deviceBrand,
      deviceModel: repair.deviceModel,
      serialNumber: repair.serialNumber,
      issueDescription: repair.issueDescription,
      diagnosis: repair.diagnosis,
      technicianId: repair.technicianId,
      estimatedCost: repair.estimatedCost,
      actualCost: repair.actualCost,
      partsUsed: repair.partsUsed.length > 0 ? repair.partsUsed : [{ name: "", cost: 0 }],
      laborHours: repair.laborHours,
      laborRate: repair.laborRate,
      notes: repair.notes,
    });
    setShowModal(true);
  };

  const calculateTotalCost = () => {
    const partsCost = formData.partsUsed.reduce((sum, part) => sum + part.cost, 0);
    const laborCost = formData.laborHours * formData.laborRate;
    return partsCost + laborCost;
  };

  const handleSave = () => {
    if (!formData.customerName || !formData.deviceType) {
      showNotification("error", "Vennligst fyll inn påkrevde felt");
      return;
    }

    const technicianName = technicians.find((t) => t.id === formData.technicianId)?.name || "";

    if (editingRepair) {
      setRepairs(
        repairs.map((r) =>
          r.id === editingRepair.id
            ? {
                ...r,
                ...formData,
                technicianName,
                actualCost: calculateTotalCost(),
                updatedAt: new Date(),
                completedAt: formData.status === "COMPLETED" ? new Date() : r.completedAt,
              }
            : r
        )
      );
      showNotification("success", "Reparasjon oppdatert");
    } else {
      const newRepair: Repair = {
        id: Date.now().toString(),
        repairNumber: `REP-${Date.now().toString().slice(-6)}`,
        customerId: Date.now().toString(),
        ...formData,
        technicianName,
        actualCost: calculateTotalCost(),
        photos: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setRepairs([newRepair, ...repairs]);
      showNotification("success", "Ny reparasjon opprettet");
    }

    setShowModal(false);
  };

  const handleDelete = (id: string) => {
    setRepairs(repairs.filter((r) => r.id !== id));
    setShowDeleteConfirm(null);
    showNotification("success", "Reparasjon slettet");
  };

  const handleStatusChange = (id: string, newStatus: RepairStatus) => {
    setRepairs(
      repairs.map((r) =>
        r.id === id
          ? {
              ...r,
              status: newStatus,
              updatedAt: new Date(),
              completedAt: newStatus === "COMPLETED" ? new Date() : r.completedAt,
            }
          : r
      )
    );
    showNotification("success", "Status oppdatert - E-post sendt til kunde");
  };

  const addPart = () => {
    setFormData({
      ...formData,
      partsUsed: [...formData.partsUsed, { name: "", cost: 0 }],
    });
  };

  const removePart = (index: number) => {
    setFormData({
      ...formData,
      partsUsed: formData.partsUsed.filter((_, i) => i !== index),
    });
  };

  const updatePart = (index: number, field: string, value: string | number) => {
    setFormData({
      ...formData,
      partsUsed: formData.partsUsed.map((part, i) =>
        i === index ? { ...part, [field]: value } : part
      ),
    });
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
          <h1 className="text-2xl font-bold text-gray-900">Reparasjoner</h1>
          <p className="text-gray-500">Administrer reparasjonssaker</p>
        </div>
        <Button onClick={handleAddNew}>
          <Plus className="w-4 h-4 mr-2" />
          Ny reparasjon
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-gray-500">Mottatt</p>
            <p className="text-2xl font-bold">
              {repairs.filter((r) => r.status === "RECEIVED").length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-gray-500">Under arbeid</p>
            <p className="text-2xl font-bold">
              {repairs.filter((r) => r.status === "IN_PROGRESS").length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-gray-500">Fullført denne uken</p>
            <p className="text-2xl font-bold">
              {repairs.filter((r) => r.status === "COMPLETED").length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-gray-500">Snitt behandlingstid</p>
            <p className="text-2xl font-bold">3.2 dager</p>
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
            <div className="flex gap-4">
              <div className="relative w-40">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full h-10 px-3 border border-gray-300 rounded-md bg-white text-sm"
                >
                  <option value="">Alle statuser</option>
                  {statusOptions.map((s) => (
                    <option key={s.value} value={s.value}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="relative w-40">
                <select
                  value={technicianFilter}
                  onChange={(e) => setTechnicianFilter(e.target.value)}
                  className="w-full h-10 px-3 border border-gray-300 rounded-md bg-white text-sm"
                >
                  <option value="">Alle teknikere</option>
                  {technicians.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Repairs Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sak
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Kunde
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Enhet
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tekniker
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Dato
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Handlinger
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredRepairs.map((repair) => (
                  <tr key={repair.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleViewRepair(repair)}
                        className="font-medium text-blue-600 hover:underline"
                      >
                        {repair.repairNumber}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-gray-900">{repair.customerName}</p>
                      <p className="text-sm text-gray-500">{repair.customerEmail}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-gray-900">{repair.deviceBrand} {repair.deviceModel}</p>
                      <p className="text-sm text-gray-500">{repair.deviceType}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="relative inline-block">
                        <select
                          value={repair.status}
                          onChange={(e) => handleStatusChange(repair.id, e.target.value as RepairStatus)}
                          className="appearance-none bg-transparent pr-6 py-1 focus:outline-none cursor-pointer"
                        >
                          {statusOptions.map((s) => (
                            <option key={s.value} value={s.value}>
                              {s.label}
                            </option>
                          ))}
                        </select>
                        {getStatusBadge(repair.status)}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {repair.technicianName || "Ikke tildelt"}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {repair.createdAt.toLocaleDateString("nb-NO")}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewRepair(repair)}
                          title="Se detaljer"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(repair)}
                          title="Rediger"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setShowDeleteConfirm(repair.id)}
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
          {filteredRepairs.length === 0 && (
            <div className="text-center py-12">
              <Wrench className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Ingen reparasjoner funnet</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Detail Modal */}
      {showDetailModal && selectedRepair && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader className="border-b">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Sak {selectedRepair.repairNumber}</CardTitle>
                  <p className="text-sm text-gray-500">
                    Opprettet {selectedRepair.createdAt.toLocaleString("nb-NO")}
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  {getStatusBadge(selectedRepair.status)}
                  <Button variant="ghost" size="sm" onClick={() => setShowDetailModal(false)}>
                    <X className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              {/* Customer & Device Info */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                    <User className="w-4 h-4 mr-2" />
                    Kundeinformasjon
                  </h4>
                  <div className="space-y-2 text-sm">
                    <p>{selectedRepair.customerName}</p>
                    <p className="flex items-center text-gray-500">
                      <Mail className="w-4 h-4 mr-2" />
                      {selectedRepair.customerEmail}
                    </p>
                    <p className="flex items-center text-gray-500">
                      <Phone className="w-4 h-4 mr-2" />
                      {selectedRepair.customerPhone}
                    </p>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                    <Wrench className="w-4 h-4 mr-2" />
                    Enhetsinformasjon
                  </h4>
                  <div className="text-sm text-gray-500">
                    <p><strong>Type:</strong> {selectedRepair.deviceType}</p>
                    <p><strong>Merke:</strong> {selectedRepair.deviceBrand}</p>
                    <p><strong>Modell:</strong> {selectedRepair.deviceModel}</p>
                    <p><strong>Serienr:</strong> {selectedRepair.serialNumber}</p>
                  </div>
                </div>
              </div>

              {/* Issue & Diagnosis */}
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Problembeskrivelse</h4>
                <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                  {selectedRepair.issueDescription}
                </p>
              </div>

              {selectedRepair.diagnosis && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Diagnose</h4>
                  <p className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
                    {selectedRepair.diagnosis}
                  </p>
                </div>
              )}

              {/* Cost Breakdown */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-3">Kostnadsoverslag</h4>
                <div className="space-y-2 text-sm">
                  {selectedRepair.partsUsed.map((part, i) => (
                    <div key={i} className="flex justify-between">
                      <span>{part.name}</span>
                      <span>{part.cost.toLocaleString("nb-NO")} kr</span>
                    </div>
                  ))}
                  <div className="flex justify-between">
                    <span>Arbeid ({selectedRepair.laborHours} timer)</span>
                    <span>{(selectedRepair.laborHours * selectedRepair.laborRate).toLocaleString("nb-NO")} kr</span>
                  </div>
                  <div className="flex justify-between font-medium pt-2 border-t">
                    <span>Estimert total</span>
                    <span>{selectedRepair.estimatedCost.toLocaleString("nb-NO")} kr</span>
                  </div>
                </div>
              </div>

              {/* Timeline */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  Tidslinje
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center text-gray-500">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    <span>Mottatt: {selectedRepair.createdAt.toLocaleString("nb-NO")}</span>
                  </div>
                  <div className="flex items-center text-gray-500">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    <span>Sist oppdatert: {selectedRepair.updatedAt.toLocaleString("nb-NO")}</span>
                  </div>
                  {selectedRepair.completedAt && (
                    <div className="flex items-center text-gray-500">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                      <span>Fullført: {selectedRepair.completedAt.toLocaleString("nb-NO")}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-between pt-4 border-t">
                <div className="flex space-x-2">
                  <Button variant="outline">
                    <FileText className="w-4 h-4 mr-2" />
                    Generer faktura
                  </Button>
                  <Button variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Skriv ut slip
                  </Button>
                </div>
                <div className="flex space-x-3">
                  <Button variant="outline" onClick={() => setShowDetailModal(false)}>
                    Lukk
                  </Button>
                  <Button
                    onClick={() => {
                      setShowDetailModal(false);
                      handleEdit(selectedRepair);
                    }}
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Rediger
                  </Button>
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
                <CardTitle>
                  {editingRepair ? "Rediger reparasjon" : "Ny reparasjon"}
                </CardTitle>
                <Button variant="ghost" size="sm" onClick={() => setShowModal(false)}>
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              {/* Customer Info */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Kundeinformasjon</h4>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Navn *
                    </label>
                    <Input
                      value={formData.customerName}
                      onChange={(e) =>
                        setFormData({ ...formData, customerName: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      E-post
                    </label>
                    <Input
                      type="email"
                      value={formData.customerEmail}
                      onChange={(e) =>
                        setFormData({ ...formData, customerEmail: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Telefon
                    </label>
                    <Input
                      value={formData.customerPhone}
                      onChange={(e) =>
                        setFormData({ ...formData, customerPhone: e.target.value })
                      }
                    />
                  </div>
                </div>
              </div>

              {/* Device Info */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Enhetsinformasjon</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Type *
                    </label>
                    <select
                      value={formData.deviceType}
                      onChange={(e) =>
                        setFormData({ ...formData, deviceType: e.target.value })
                      }
                      className="w-full h-10 px-3 border border-gray-300 rounded-md bg-white text-sm"
                    >
                      <option value="">Velg type...</option>
                      {deviceTypes.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Merke
                    </label>
                    <Input
                      value={formData.deviceBrand}
                      onChange={(e) =>
                        setFormData({ ...formData, deviceBrand: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Modell
                    </label>
                    <Input
                      value={formData.deviceModel}
                      onChange={(e) =>
                        setFormData({ ...formData, deviceModel: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Serienummer
                    </label>
                    <Input
                      value={formData.serialNumber}
                      onChange={(e) =>
                        setFormData({ ...formData, serialNumber: e.target.value })
                      }
                    />
                  </div>
                </div>
              </div>

              {/* Issue Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Problembeskrivelse *
                </label>
                <Textarea
                  value={formData.issueDescription}
                  onChange={(e) =>
                    setFormData({ ...formData, issueDescription: e.target.value })
                  }
                  rows={3}
                />
              </div>

              {/* Diagnosis & Technician */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Diagnose
                  </label>
                  <Textarea
                    value={formData.diagnosis}
                    onChange={(e) =>
                      setFormData({ ...formData, diagnosis: e.target.value })
                    }
                    rows={3}
                  />
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tekniker
                    </label>
                    <select
                      value={formData.technicianId}
                      onChange={(e) =>
                        setFormData({ ...formData, technicianId: e.target.value })
                      }
                      className="w-full h-10 px-3 border border-gray-300 rounded-md bg-white text-sm"
                    >
                      <option value="">Velg tekniker...</option>
                      {technicians.map((t) => (
                        <option key={t.id} value={t.id}>
                          {t.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Status
                    </label>
                    <select
                      value={formData.status}
                      onChange={(e) =>
                        setFormData({ ...formData, status: e.target.value as RepairStatus })
                      }
                      className="w-full h-10 px-3 border border-gray-300 rounded-md bg-white text-sm"
                    >
                      {statusOptions.map((s) => (
                        <option key={s.value} value={s.value}>
                          {s.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Parts */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-gray-900">Deler brukt</h4>
                  <Button variant="outline" size="sm" onClick={addPart}>
                    <Plus className="w-4 h-4 mr-1" />
                    Legg til
                  </Button>
                </div>
                <div className="space-y-2">
                  {formData.partsUsed.map((part, index) => (
                    <div key={index} className="flex gap-3 items-center">
                      <div className="flex-1">
                        <Input
                          value={part.name}
                          onChange={(e) => updatePart(index, "name", e.target.value)}
                          placeholder="Delnavn"
                        />
                      </div>
                      <div className="w-32">
                        <Input
                          type="number"
                          value={part.cost}
                          onChange={(e) =>
                            updatePart(index, "cost", parseFloat(e.target.value) || 0)
                          }
                          placeholder="Kostnad"
                        />
                      </div>
                      {formData.partsUsed.length > 1 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removePart(index)}
                          className="text-red-600"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Labor */}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Arbeidstimer
                  </label>
                  <Input
                    type="number"
                    step="0.5"
                    value={formData.laborHours}
                    onChange={(e) =>
                      setFormData({ ...formData, laborHours: parseFloat(e.target.value) || 0 })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Timesats (kr)
                  </label>
                  <Input
                    type="number"
                    value={formData.laborRate}
                    onChange={(e) =>
                      setFormData({ ...formData, laborRate: parseFloat(e.target.value) || 800 })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Estimert kostnad
                  </label>
                  <Input
                    type="number"
                    value={formData.estimatedCost}
                    onChange={(e) =>
                      setFormData({ ...formData, estimatedCost: parseFloat(e.target.value) || 0 })
                    }
                  />
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notater
                </label>
                <Textarea
                  value={formData.notes}
                  onChange={(e) =>
                    setFormData({ ...formData, notes: e.target.value })
                  }
                  rows={2}
                />
              </div>

              {/* Cost Summary */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex justify-between font-medium">
                  <span>Beregnet totalkostnad</span>
                  <span>{calculateTotalCost().toLocaleString("nb-NO")} kr</span>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <Button variant="outline" onClick={() => setShowModal(false)}>
                  Avbryt
                </Button>
                <Button onClick={handleSave}>
                  {editingRepair ? "Lagre endringer" : "Opprett sak"}
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
                Er du sikker på at du vil slette denne reparasjonssaken?
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
