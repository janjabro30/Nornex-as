"use client";

import React, { useState } from "react";
import {
  Calendar,
  Search,
  Filter,
  Download,
  ChevronDown,
  AlertTriangle,
  FileText,
  ArrowRight,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StatusBadge, ContractExpiryBadge } from "@/components/portal";
import { mockContracts } from "@/lib/portal-data";
import { formatPrice, formatDate } from "@/lib/utils";
import type { ContractType } from "@/types/portal";

const typeFilters: { value: ContractType | "ALL"; label: string }[] = [
  { value: "ALL", label: "Alle" },
  { value: "SERVICE", label: "Service" },
  { value: "MAINTENANCE", label: "Vedlikehold" },
  { value: "SUPPORT", label: "Support" },
  { value: "LEASE", label: "Leasing" },
  { value: "SLA", label: "SLA" },
];

export default function ContractsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<ContractType | "ALL">("ALL");
  const [showFilters, setShowFilters] = useState(false);

  const filteredContracts = mockContracts.filter((contract) => {
    const matchesSearch =
      contract.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contract.contractNumber.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === "ALL" || contract.type === typeFilter;
    return matchesSearch && matchesType;
  });

  // Sort by expiry date
  const sortedContracts = [...filteredContracts].sort(
    (a, b) => a.daysUntilExpiry - b.daysUntilExpiry
  );

  const expiringCount = mockContracts.filter((c) => c.daysUntilExpiry <= 90 && c.daysUntilExpiry > 0).length;

  const typeLabels: Record<ContractType, string> = {
    SERVICE: "Service",
    MAINTENANCE: "Vedlikehold",
    SUPPORT: "Support",
    LEASE: "Leasing",
    SLA: "SLA",
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Kontrakter</h1>
          <p className="text-gray-500 mt-1">Administrer dine avtaler og SLA-er</p>
        </div>
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Eksporter oversikt
        </Button>
      </div>

      {/* Alert for expiring contracts */}
      {expiringCount > 0 && (
        <Card className="border-yellow-200 bg-yellow-50">
          <CardContent className="py-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-yellow-800">
                  {expiringCount} kontrakt{expiringCount > 1 ? "er" : ""} utløper innen 90 dager
                </p>
                <p className="text-sm text-yellow-700 mt-1">
                  Kontakt oss for å fornye kontraktene før de utløper.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Search and Filters */}
      <Card>
        <CardContent className="py-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Søk etter kontrakt..."
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
              <p className="text-sm font-medium text-gray-700 mb-2">Type</p>
              <div className="flex flex-wrap gap-2">
                {typeFilters.map((filter) => (
                  <button
                    key={filter.value}
                    onClick={() => setTypeFilter(filter.value)}
                    className={`px-3 py-1.5 text-sm rounded-full transition-colors ${
                      typeFilter === filter.value
                        ? "bg-blue-100 text-blue-700"
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

      {/* Contracts List */}
      {sortedContracts.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Ingen kontrakter funnet</h3>
            <p className="text-gray-500">
              {searchQuery || typeFilter !== "ALL"
                ? "Prøv å endre søkeord eller filtre"
                : "Du har ingen aktive kontrakter"}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {sortedContracts.map((contract) => (
            <Card key={contract.id} className="hover:shadow-md transition-shadow">
              <CardContent className="py-4">
                <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                  {/* Contract Info */}
                  <div className="flex items-start gap-4 flex-1">
                    <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                      <FileText className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-medium text-gray-900">{contract.title}</p>
                        <StatusBadge statusType={{ type: "contract", status: contract.status }} size="sm" />
                      </div>
                      <p className="text-sm text-gray-500">
                        #{contract.contractNumber} • {typeLabels[contract.type]}
                      </p>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                        <span>Start: {formatDate(contract.startDate)}</span>
                        <span>Slutt: {formatDate(contract.endDate)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Value and Expiry */}
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="text-xs text-gray-500">Årsverdi</p>
                      <p className="font-bold text-gray-900">{formatPrice(contract.value)}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500 mb-1">Utløper om</p>
                      <ContractExpiryBadge daysUntilExpiry={contract.daysUntilExpiry} />
                    </div>
                    <Button variant="outline" size="sm">
                      Detaljer
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>

                {/* Auto-renew Badge */}
                {contract.autoRenew && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                      ✓ Automatisk fornyelse aktivert
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
