"use client";

import React, { useState } from "react";
import {
  FileText,
  Search,
  Filter,
  Download,
  ChevronDown,
  AlertCircle,
  CheckCircle2,
  Clock,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StatusBadge } from "@/components/portal";
import { mockInvoices } from "@/lib/portal-data";
import { formatPrice, formatDate } from "@/lib/utils";
import type { InvoiceStatus } from "@/types/portal";

const statusFilters: { value: InvoiceStatus | "ALL"; label: string }[] = [
  { value: "ALL", label: "Alle" },
  { value: "PENDING", label: "Ubetalt" },
  { value: "PAID", label: "Betalt" },
  { value: "OVERDUE", label: "Forfalt" },
];

export default function InvoicesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<InvoiceStatus | "ALL">("ALL");
  const [showFilters, setShowFilters] = useState(false);

  const filteredInvoices = mockInvoices.filter((invoice) => {
    const matchesSearch = invoice.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "ALL" || invoice.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusIcon = (status: InvoiceStatus) => {
    switch (status) {
      case "PAID":
        return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case "OVERDUE":
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-yellow-500" />;
    }
  };

  // Calculate totals
  const pendingTotal = mockInvoices
    .filter((inv) => inv.status === "PENDING")
    .reduce((sum, inv) => sum + inv.total, 0);
  const overdueTotal = mockInvoices
    .filter((inv) => inv.status === "OVERDUE")
    .reduce((sum, inv) => sum + inv.total, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Fakturaer</h1>
        <p className="text-gray-500 mt-1">Se og last ned dine fakturaer</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="py-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Totalt fakturert</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatPrice(mockInvoices.reduce((sum, inv) => sum + inv.total, 0))}
                </p>
              </div>
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <FileText className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="py-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Ubetalt</p>
                <p className="text-2xl font-bold text-yellow-600">{formatPrice(pendingTotal)}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
                <Clock className="w-5 h-5 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className={overdueTotal > 0 ? "border-red-200 bg-red-50" : ""}>
          <CardContent className="py-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Forfalt</p>
                <p className={`text-2xl font-bold ${overdueTotal > 0 ? "text-red-600" : "text-gray-900"}`}>
                  {formatPrice(overdueTotal)}
                </p>
              </div>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                overdueTotal > 0 ? "bg-red-100" : "bg-gray-100"
              }`}>
                <AlertCircle className={`w-5 h-5 ${overdueTotal > 0 ? "text-red-600" : "text-gray-400"}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="py-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Søk etter fakturanummer..."
                className="pl-10"
              />
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="sm:w-auto"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filtrer
              <ChevronDown className={`w-4 h-4 ml-2 transition-transform ${showFilters ? "rotate-180" : ""}`} />
            </Button>
          </div>

          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="text-sm font-medium text-gray-700 mb-2">Status</p>
              <div className="flex flex-wrap gap-2">
                {statusFilters.map((filter) => (
                  <button
                    key={filter.value}
                    onClick={() => setStatusFilter(filter.value)}
                    className={`px-3 py-1.5 text-sm rounded-full transition-colors ${
                      statusFilter === filter.value
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Invoices List */}
      {filteredInvoices.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Ingen fakturaer funnet</h3>
            <p className="text-gray-500">
              {searchQuery || statusFilter !== "ALL"
                ? "Prøv å endre søkeord eller filtre"
                : "Du har ingen fakturaer ennå"}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {filteredInvoices.map((invoice) => (
            <Card key={invoice.id} className="hover:shadow-md transition-shadow">
              <CardContent className="py-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center">
                      {getStatusIcon(invoice.status)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-gray-900">
                          Faktura #{invoice.invoiceNumber}
                        </p>
                        <StatusBadge statusType={{ type: "invoice", status: invoice.status }} size="sm" />
                      </div>
                      <p className="text-sm text-gray-500">
                        Utstedt: {formatDate(invoice.createdAt)} • Forfaller: {formatDate(invoice.dueDate)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="font-bold text-gray-900">{formatPrice(invoice.total)}</p>
                      <p className="text-xs text-gray-500">
                        inkl. mva {formatPrice(invoice.tax)}
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Last ned PDF
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
