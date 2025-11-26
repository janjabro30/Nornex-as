"use client";

import React, { useState } from "react";
import {
  Laptop,
  Search,
  Filter,
  Download,
  ChevronDown,
  Plus,
  User,
  Calendar,
  Shield,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StatusBadge } from "@/components/portal";
import { mockFleetDevices } from "@/lib/portal-data";
import { formatDate } from "@/lib/utils";
import type { FleetDeviceStatus } from "@/types/portal";

const statusFilters: { value: FleetDeviceStatus | "ALL"; label: string }[] = [
  { value: "ALL", label: "Alle" },
  { value: "ACTIVE", label: "Aktive" },
  { value: "AVAILABLE", label: "Tilgjengelig" },
  { value: "IN_REPAIR", label: "Under reparasjon" },
  { value: "RETIRED", label: "Utfaset" },
];

export default function FleetPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<FleetDeviceStatus | "ALL">("ALL");
  const [showFilters, setShowFilters] = useState(false);

  const filteredDevices = mockFleetDevices.filter((device) => {
    const matchesSearch =
      device.assetTag.toLowerCase().includes(searchQuery.toLowerCase()) ||
      device.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      device.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
      device.assignedTo?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      "";
    const matchesStatus = statusFilter === "ALL" || device.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Stats
  const stats = [
    {
      label: "Totalt",
      value: mockFleetDevices.length,
      color: "bg-gray-100 text-gray-700",
    },
    {
      label: "Aktive",
      value: mockFleetDevices.filter((d) => d.status === "ACTIVE").length,
      color: "bg-green-100 text-green-700",
    },
    {
      label: "Tilgjengelig",
      value: mockFleetDevices.filter((d) => d.status === "AVAILABLE").length,
      color: "bg-blue-100 text-blue-700",
    },
    {
      label: "Under rep.",
      value: mockFleetDevices.filter((d) => d.status === "IN_REPAIR").length,
      color: "bg-yellow-100 text-yellow-700",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Enhetsflåte</h1>
          <p className="text-gray-500 mt-1">Administrer alle enheter i organisasjonen</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Eksporter
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Legg til enhet
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="py-4 text-center">
              <p className={`text-2xl font-bold ${stat.color} inline-block px-4 py-1 rounded-full`}>
                {stat.value}
              </p>
              <p className="text-sm text-gray-500 mt-2">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
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
                placeholder="Søk etter enhet, bruker eller asset tag..."
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

      {/* Devices Table */}
      <Card>
        <CardHeader className="pb-0">
          <CardTitle className="text-lg">Enheter ({filteredDevices.length})</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          {filteredDevices.length === 0 ? (
            <div className="text-center py-12">
              <Laptop className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Ingen enheter funnet</h3>
              <p className="text-gray-500">
                Prøv å endre søkeord eller filtre
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Asset Tag</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Enhet</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Tildelt</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Avdeling</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Garanti</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDevices.map((device) => {
                    const warrantyExpired = device.warrantyExpiry && new Date(device.warrantyExpiry) < new Date();
                    
                    return (
                      <tr key={device.id} className="border-b border-gray-50 hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <span className="font-mono text-sm font-medium text-gray-900">
                            {device.assetTag}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded bg-gray-100 flex items-center justify-center">
                              <Laptop className="w-4 h-4 text-gray-500" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">
                                {device.brand} {device.model}
                              </p>
                              <p className="text-xs text-gray-500">{device.deviceType}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          {device.assignedTo ? (
                            <div className="flex items-center gap-2">
                              <User className="w-4 h-4 text-gray-400" />
                              <span className="text-sm">{device.assignedTo}</span>
                            </div>
                          ) : (
                            <span className="text-sm text-gray-400">—</span>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          <span className="text-sm text-gray-600">{device.department || "—"}</span>
                        </td>
                        <td className="py-3 px-4">
                          {device.warrantyExpiry ? (
                            <div className="flex items-center gap-2">
                              <Shield className={`w-4 h-4 ${warrantyExpired ? "text-red-400" : "text-green-500"}`} />
                              <span className={`text-sm ${warrantyExpired ? "text-red-600" : "text-gray-600"}`}>
                                {formatDate(device.warrantyExpiry)}
                              </span>
                            </div>
                          ) : (
                            <span className="text-sm text-gray-400">—</span>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          <StatusBadge statusType={{ type: "fleet", status: device.status }} size="sm" />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
