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
  Package,
  Truck,
  CreditCard,
  Calendar,
  User,
  Mail,
  Phone,
  MapPin,
  ChevronDown,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import type { OrderStatus } from "@/types";

interface Order {
  id: string;
  orderNumber: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  status: OrderStatus;
  items: { name: string; quantity: number; price: number }[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  shippingAddress: {
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
  paymentMethod: string;
  trackingNumber?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const statusOptions: { value: OrderStatus; label: string }[] = [
  { value: "PENDING", label: "Venter" },
  { value: "CONFIRMED", label: "Bekreftet" },
  { value: "PROCESSING", label: "Behandles" },
  { value: "SHIPPED", label: "Sendt" },
  { value: "DELIVERED", label: "Levert" },
  { value: "CANCELLED", label: "Kansellert" },
  { value: "REFUNDED", label: "Refundert" },
];

const paymentMethods = [
  { value: "card", label: "Kort" },
  { value: "vipps", label: "Vipps" },
  { value: "klarna", label: "Klarna" },
  { value: "invoice", label: "Faktura" },
];

const mockOrders: Order[] = [
  {
    id: "1",
    orderNumber: "NOR-ABC123",
    customerId: "c1",
    customerName: "Erik Hansen",
    customerEmail: "erik.hansen@example.com",
    customerPhone: "+47 912 34 567",
    status: "PENDING",
    items: [
      { name: "Dell Latitude 5520", quantity: 1, price: 5499 },
      { name: "Magic Keyboard", quantity: 1, price: 799 },
    ],
    subtotal: 6298,
    tax: 1574.5,
    shipping: 99,
    total: 7971.5,
    shippingAddress: {
      street: "Storgata 123",
      city: "Oslo",
      postalCode: "0123",
      country: "Norge",
    },
    paymentMethod: "vipps",
    notes: "",
    createdAt: new Date("2024-01-15T10:30:00"),
    updatedAt: new Date("2024-01-15T10:30:00"),
  },
  {
    id: "2",
    orderNumber: "NOR-DEF456",
    customerId: "c2",
    customerName: "Maria Olsen",
    customerEmail: "maria.olsen@example.com",
    customerPhone: "+47 923 45 678",
    status: "SHIPPED",
    items: [{ name: "HP EliteBook 840 G8", quantity: 1, price: 7999 }],
    subtotal: 7999,
    tax: 1999.75,
    shipping: 0,
    total: 9998.75,
    shippingAddress: {
      street: "Parkveien 45",
      city: "Bergen",
      postalCode: "5003",
      country: "Norge",
    },
    paymentMethod: "card",
    trackingNumber: "370123456789012",
    notes: "Ring ved levering",
    createdAt: new Date("2024-01-14T14:20:00"),
    updatedAt: new Date("2024-01-15T09:00:00"),
  },
  {
    id: "3",
    orderNumber: "NOR-GHI789",
    customerId: "c3",
    customerName: "Anders Berg",
    customerEmail: "anders.berg@company.no",
    customerPhone: "+47 934 56 789",
    status: "DELIVERED",
    items: [
      { name: "HP ProDesk 400 G7", quantity: 3, price: 3499 },
      { name: "Dell UltraSharp U2722D", quantity: 3, price: 3999 },
    ],
    subtotal: 22494,
    tax: 5623.5,
    shipping: 0,
    total: 28117.5,
    shippingAddress: {
      street: "Industriveien 10",
      city: "Trondheim",
      postalCode: "7030",
      country: "Norge",
    },
    paymentMethod: "invoice",
    trackingNumber: "370987654321098",
    notes: "Bedriftsleveranse",
    createdAt: new Date("2024-01-10T08:15:00"),
    updatedAt: new Date("2024-01-13T16:45:00"),
  },
];

export default function OrdersView() {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    status: "PENDING" as OrderStatus,
    items: [{ name: "", quantity: 1, price: 0 }],
    shipping: 99,
    shippingAddress: {
      street: "",
      city: "",
      postalCode: "",
      country: "Norge",
    },
    paymentMethod: "card",
    trackingNumber: "",
    notes: "",
  });

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerEmail.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = !statusFilter || order.status === statusFilter;
    const matchesDateFrom = !dateFrom || new Date(order.createdAt) >= new Date(dateFrom);
    const matchesDateTo = !dateTo || new Date(order.createdAt) <= new Date(dateTo);
    return matchesSearch && matchesStatus && matchesDateFrom && matchesDateTo;
  });

  const showNotification = (type: "success" | "error", message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };

  const getStatusBadge = (status: OrderStatus) => {
    const statusConfig: Record<OrderStatus, { variant: "default" | "secondary" | "destructive"; label: string }> = {
      PENDING: { variant: "secondary", label: "Venter" },
      CONFIRMED: { variant: "default", label: "Bekreftet" },
      PROCESSING: { variant: "default", label: "Behandles" },
      SHIPPED: { variant: "default", label: "Sendt" },
      DELIVERED: { variant: "default", label: "Levert" },
      CANCELLED: { variant: "destructive", label: "Kansellert" },
      REFUNDED: { variant: "destructive", label: "Refundert" },
    };
    const config = statusConfig[status];
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setShowDetailModal(true);
  };

  const handleAddNew = () => {
    setEditingOrder(null);
    setFormData({
      customerName: "",
      customerEmail: "",
      customerPhone: "",
      status: "PENDING",
      items: [{ name: "", quantity: 1, price: 0 }],
      shipping: 99,
      shippingAddress: {
        street: "",
        city: "",
        postalCode: "",
        country: "Norge",
      },
      paymentMethod: "card",
      trackingNumber: "",
      notes: "",
    });
    setShowModal(true);
  };

  const handleEdit = (order: Order) => {
    setEditingOrder(order);
    setFormData({
      customerName: order.customerName,
      customerEmail: order.customerEmail,
      customerPhone: order.customerPhone,
      status: order.status,
      items: order.items,
      shipping: order.shipping,
      shippingAddress: order.shippingAddress,
      paymentMethod: order.paymentMethod,
      trackingNumber: order.trackingNumber || "",
      notes: order.notes || "",
    });
    setShowModal(true);
  };

  const calculateTotals = () => {
    const subtotal = formData.items.reduce(
      (sum, item) => sum + item.quantity * item.price,
      0
    );
    const tax = subtotal * 0.25;
    const total = subtotal + tax + formData.shipping;
    return { subtotal, tax, total };
  };

  const handleSave = () => {
    if (!formData.customerName || !formData.customerEmail) {
      showNotification("error", "Vennligst fyll inn kundeinformasjon");
      return;
    }

    const { subtotal, tax, total } = calculateTotals();

    if (editingOrder) {
      setOrders(
        orders.map((o) =>
          o.id === editingOrder.id
            ? {
                ...o,
                ...formData,
                subtotal,
                tax,
                total,
                updatedAt: new Date(),
              }
            : o
        )
      );
      showNotification("success", "Ordre oppdatert");
    } else {
      const newOrder: Order = {
        id: Date.now().toString(),
        orderNumber: `NOR-${Date.now().toString(36).toUpperCase().slice(-6)}`,
        customerId: Date.now().toString(),
        ...formData,
        subtotal,
        tax,
        total,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setOrders([newOrder, ...orders]);
      showNotification("success", "Ny ordre opprettet");
    }

    setShowModal(false);
  };

  const handleDelete = (id: string) => {
    setOrders(orders.filter((o) => o.id !== id));
    setShowDeleteConfirm(null);
    showNotification("success", "Ordre slettet");
  };

  const handleBulkStatusUpdate = (status: OrderStatus) => {
    setOrders(
      orders.map((o) =>
        selectedIds.includes(o.id) ? { ...o, status, updatedAt: new Date() } : o
      )
    );
    setSelectedIds([]);
    showNotification("success", `${selectedIds.length} ordrer oppdatert`);
  };

  const handleExportCSV = () => {
    const csv = [
      ["Ordrenummer", "Kunde", "E-post", "Status", "Total", "Dato"].join(","),
      ...filteredOrders.map((o) =>
        [
          o.orderNumber,
          o.customerName,
          o.customerEmail,
          o.status,
          o.total,
          o.createdAt.toISOString(),
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ordrer-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    showNotification("success", "Eksport fullført");
  };

  const addItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { name: "", quantity: 1, price: 0 }],
    });
  };

  const removeItem = (index: number) => {
    setFormData({
      ...formData,
      items: formData.items.filter((_, i) => i !== index),
    });
  };

  const updateItem = (index: number, field: string, value: string | number) => {
    setFormData({
      ...formData,
      items: formData.items.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
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
          <h1 className="text-2xl font-bold text-gray-900">Ordrer</h1>
          <p className="text-gray-500">Administrer kundeordrer</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" onClick={handleExportCSV}>
            <Download className="w-4 h-4 mr-2" />
            Eksporter CSV
          </Button>
          <Button onClick={handleAddNew}>
            <Plus className="w-4 h-4 mr-2" />
            Ny ordre
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Søk etter ordrenummer, kunde..."
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
                  className="w-full h-10 px-3 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="">Alle statuser</option>
                  {statusOptions.map((s) => (
                    <option key={s.value} value={s.value}>
                      {s.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>

          {showFilters && (
            <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Fra dato
                </label>
                <Input
                  type="date"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Til dato
                </label>
                <Input
                  type="date"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Bulk Actions */}
      {selectedIds.length > 0 && (
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="py-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-blue-800">
                {selectedIds.length} valgt
              </span>
              <div className="flex space-x-2">
                <select
                  onChange={(e) => {
                    if (e.target.value) {
                      handleBulkStatusUpdate(e.target.value as OrderStatus);
                      e.target.value = "";
                    }
                  }}
                  className="h-9 px-3 border border-gray-300 rounded-md bg-white text-sm"
                >
                  <option value="">Endre status...</option>
                  {statusOptions.map((s) => (
                    <option key={s.value} value={s.value}>
                      {s.label}
                    </option>
                  ))}
                </select>
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

      {/* Orders Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left">
                    <input
                      type="checkbox"
                      checked={selectedIds.length === filteredOrders.length && filteredOrders.length > 0}
                      onChange={() => {
                        if (selectedIds.length === filteredOrders.length) {
                          setSelectedIds([]);
                        } else {
                          setSelectedIds(filteredOrders.map((o) => o.id));
                        }
                      }}
                      className="rounded border-gray-300"
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ordre
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Kunde
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
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
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(order.id)}
                        onChange={() => {
                          setSelectedIds((prev) =>
                            prev.includes(order.id)
                              ? prev.filter((id) => id !== order.id)
                              : [...prev, order.id]
                          );
                        }}
                        className="rounded border-gray-300"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleViewOrder(order)}
                        className="font-medium text-blue-600 hover:underline"
                      >
                        {order.orderNumber}
                      </button>
                      <p className="text-sm text-gray-500">
                        {order.items.length} produkt(er)
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-gray-900">{order.customerName}</p>
                      <p className="text-sm text-gray-500">{order.customerEmail}</p>
                    </td>
                    <td className="px-6 py-4">{getStatusBadge(order.status)}</td>
                    <td className="px-6 py-4 font-medium">
                      {order.total.toLocaleString("nb-NO")} kr
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {order.createdAt.toLocaleDateString("nb-NO")}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewOrder(order)}
                          title="Se detaljer"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(order)}
                          title="Rediger"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setShowDeleteConfirm(order.id)}
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
          {filteredOrders.length === 0 && (
            <div className="text-center py-12">
              <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Ingen ordrer funnet</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Order Detail Modal */}
      {showDetailModal && selectedOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader className="border-b">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Ordre {selectedOrder.orderNumber}</CardTitle>
                  <p className="text-sm text-gray-500">
                    Opprettet {selectedOrder.createdAt.toLocaleString("nb-NO")}
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  {getStatusBadge(selectedOrder.status)}
                  <Button variant="ghost" size="sm" onClick={() => setShowDetailModal(false)}>
                    <X className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              {/* Customer Info */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                    <User className="w-4 h-4 mr-2" />
                    Kundeinformasjon
                  </h4>
                  <div className="space-y-2 text-sm">
                    <p>{selectedOrder.customerName}</p>
                    <p className="flex items-center text-gray-500">
                      <Mail className="w-4 h-4 mr-2" />
                      {selectedOrder.customerEmail}
                    </p>
                    <p className="flex items-center text-gray-500">
                      <Phone className="w-4 h-4 mr-2" />
                      {selectedOrder.customerPhone}
                    </p>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                    <MapPin className="w-4 h-4 mr-2" />
                    Leveringsadresse
                  </h4>
                  <div className="text-sm text-gray-500">
                    <p>{selectedOrder.shippingAddress.street}</p>
                    <p>
                      {selectedOrder.shippingAddress.postalCode}{" "}
                      {selectedOrder.shippingAddress.city}
                    </p>
                    <p>{selectedOrder.shippingAddress.country}</p>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Produkter</h4>
                <div className="border rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">
                          Produkt
                        </th>
                        <th className="px-4 py-2 text-center text-xs font-medium text-gray-500">
                          Antall
                        </th>
                        <th className="px-4 py-2 text-right text-xs font-medium text-gray-500">
                          Pris
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {selectedOrder.items.map((item, index) => (
                        <tr key={index}>
                          <td className="px-4 py-3">{item.name}</td>
                          <td className="px-4 py-3 text-center">{item.quantity}</td>
                          <td className="px-4 py-3 text-right">
                            {(item.price * item.quantity).toLocaleString("nb-NO")} kr
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Order Summary */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Delsum</span>
                    <span>{selectedOrder.subtotal.toLocaleString("nb-NO")} kr</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">MVA (25%)</span>
                    <span>{selectedOrder.tax.toLocaleString("nb-NO")} kr</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Frakt</span>
                    <span>{selectedOrder.shipping.toLocaleString("nb-NO")} kr</span>
                  </div>
                  <div className="flex justify-between font-medium text-lg pt-2 border-t">
                    <span>Total</span>
                    <span>{selectedOrder.total.toLocaleString("nb-NO")} kr</span>
                  </div>
                </div>
              </div>

              {/* Payment & Shipping */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                    <CreditCard className="w-4 h-4 mr-2" />
                    Betaling
                  </h4>
                  <p className="text-sm text-gray-500">
                    {paymentMethods.find((m) => m.value === selectedOrder.paymentMethod)?.label ||
                      selectedOrder.paymentMethod}
                  </p>
                </div>
                {selectedOrder.trackingNumber && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                      <Truck className="w-4 h-4 mr-2" />
                      Sporing
                    </h4>
                    <p className="text-sm text-blue-600">{selectedOrder.trackingNumber}</p>
                  </div>
                )}
              </div>

              {/* Notes */}
              {selectedOrder.notes && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Notater</h4>
                  <p className="text-sm text-gray-500 bg-gray-50 p-3 rounded-lg">
                    {selectedOrder.notes}
                  </p>
                </div>
              )}

              {/* Actions */}
              <div className="flex justify-between pt-4 border-t">
                <Button variant="outline">
                  <FileText className="w-4 h-4 mr-2" />
                  Generer faktura (PDF)
                </Button>
                <div className="flex space-x-3">
                  <Button variant="outline" onClick={() => setShowDetailModal(false)}>
                    Lukk
                  </Button>
                  <Button
                    onClick={() => {
                      setShowDetailModal(false);
                      handleEdit(selectedOrder);
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
                  {editingOrder ? "Rediger ordre" : "Ny ordre"}
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
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Navn *
                    </label>
                    <Input
                      value={formData.customerName}
                      onChange={(e) =>
                        setFormData({ ...formData, customerName: e.target.value })
                      }
                      placeholder="Kundens navn"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      E-post *
                    </label>
                    <Input
                      type="email"
                      value={formData.customerEmail}
                      onChange={(e) =>
                        setFormData({ ...formData, customerEmail: e.target.value })
                      }
                      placeholder="kunde@example.com"
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
                      placeholder="+47 xxx xx xxx"
                    />
                  </div>
                </div>
              </div>

              {/* Items */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-gray-900">Produkter</h4>
                  <Button variant="outline" size="sm" onClick={addItem}>
                    <Plus className="w-4 h-4 mr-1" />
                    Legg til
                  </Button>
                </div>
                <div className="space-y-3">
                  {formData.items.map((item, index) => (
                    <div key={index} className="flex gap-3 items-end">
                      <div className="flex-1">
                        <Input
                          value={item.name}
                          onChange={(e) => updateItem(index, "name", e.target.value)}
                          placeholder="Produktnavn"
                        />
                      </div>
                      <div className="w-20">
                        <Input
                          type="number"
                          value={item.quantity}
                          onChange={(e) =>
                            updateItem(index, "quantity", parseInt(e.target.value) || 1)
                          }
                          min="1"
                        />
                      </div>
                      <div className="w-32">
                        <Input
                          type="number"
                          value={item.price}
                          onChange={(e) =>
                            updateItem(index, "price", parseFloat(e.target.value) || 0)
                          }
                          placeholder="Pris"
                        />
                      </div>
                      {formData.items.length > 1 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(index)}
                          className="text-red-600"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Shipping Address */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Leveringsadresse</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <Input
                      value={formData.shippingAddress.street}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          shippingAddress: {
                            ...formData.shippingAddress,
                            street: e.target.value,
                          },
                        })
                      }
                      placeholder="Gate og husnummer"
                    />
                  </div>
                  <div>
                    <Input
                      value={formData.shippingAddress.postalCode}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          shippingAddress: {
                            ...formData.shippingAddress,
                            postalCode: e.target.value,
                          },
                        })
                      }
                      placeholder="Postnummer"
                    />
                  </div>
                  <div>
                    <Input
                      value={formData.shippingAddress.city}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          shippingAddress: {
                            ...formData.shippingAddress,
                            city: e.target.value,
                          },
                        })
                      }
                      placeholder="Sted"
                    />
                  </div>
                </div>
              </div>

              {/* Payment & Status */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Betalingsmetode
                  </label>
                  <select
                    value={formData.paymentMethod}
                    onChange={(e) =>
                      setFormData({ ...formData, paymentMethod: e.target.value })
                    }
                    className="w-full h-10 px-3 border border-gray-300 rounded-md bg-white text-sm"
                  >
                    {paymentMethods.map((m) => (
                      <option key={m.value} value={m.value}>
                        {m.label}
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
                      setFormData({ ...formData, status: e.target.value as OrderStatus })
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

              {/* Tracking & Notes */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Sporingsnummer
                  </label>
                  <Input
                    value={formData.trackingNumber}
                    onChange={(e) =>
                      setFormData({ ...formData, trackingNumber: e.target.value })
                    }
                    placeholder="Sporingsnummer"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Frakt (kr)
                  </label>
                  <Input
                    type="number"
                    value={formData.shipping}
                    onChange={(e) =>
                      setFormData({ ...formData, shipping: parseFloat(e.target.value) || 0 })
                    }
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notater
                </label>
                <Textarea
                  value={formData.notes}
                  onChange={(e) =>
                    setFormData({ ...formData, notes: e.target.value })
                  }
                  rows={3}
                  placeholder="Interne notater..."
                />
              </div>

              {/* Order Summary */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Delsum</span>
                    <span>{calculateTotals().subtotal.toLocaleString("nb-NO")} kr</span>
                  </div>
                  <div className="flex justify-between">
                    <span>MVA (25%)</span>
                    <span>{calculateTotals().tax.toLocaleString("nb-NO")} kr</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Frakt</span>
                    <span>{formData.shipping.toLocaleString("nb-NO")} kr</span>
                  </div>
                  <div className="flex justify-between font-medium text-lg pt-2 border-t">
                    <span>Total</span>
                    <span>{calculateTotals().total.toLocaleString("nb-NO")} kr</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <Button variant="outline" onClick={() => setShowModal(false)}>
                  Avbryt
                </Button>
                <Button onClick={handleSave}>
                  {editingOrder ? "Lagre endringer" : "Opprett ordre"}
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
                Er du sikker på at du vil slette denne ordren? Denne handlingen kan
                ikke angres.
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
