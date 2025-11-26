"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Wrench,
  Search,
  Filter,
  Clock,
  CheckCircle2,
  ArrowRight,
  Download,
  ChevronDown,
  AlertCircle,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StatusBadge } from "@/components/portal";
import { mockRepairs } from "@/lib/portal-data";
import { formatPrice, formatDate } from "@/lib/utils";
import type { RepairStatus } from "@/types/portal";

const statusFilters: { value: RepairStatus | "ALL"; label: string }[] = [
  { value: "ALL", label: "Alle" },
  { value: "RECEIVED", label: "Mottatt" },
  { value: "DIAGNOSING", label: "Diagnostisering" },
  { value: "IN_PROGRESS", label: "Under arbeid" },
  { value: "READY_FOR_PICKUP", label: "Klar for henting" },
  { value: "COMPLETED", label: "Fullført" },
];

export default function RepairsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<RepairStatus | "ALL">("ALL");
  const [showFilters, setShowFilters] = useState(false);

  const filteredRepairs = mockRepairs.filter((repair) => {
    const matchesSearch =
      repair.ticketNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      repair.deviceBrand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      repair.deviceModel.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "ALL" || repair.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getRepairProgress = (status: RepairStatus): number => {
    const progressMap: Record<RepairStatus, number> = {
      RECEIVED: 10,
      DIAGNOSING: 25,
      AWAITING_APPROVAL: 35,
      AWAITING_PARTS: 45,
      IN_PROGRESS: 60,
      TESTING: 80,
      COMPLETED: 100,
      READY_FOR_PICKUP: 100,
      DELIVERED: 100,
      CANCELLED: 0,
    };
    return progressMap[status];
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reparasjoner</h1>
          <p className="text-gray-500 mt-1">Se status på dine reparasjoner</p>
        </div>
        <Link href="/reparasjon">
          <Button>
            <Wrench className="w-4 h-4 mr-2" />
            Bestill reparasjon
          </Button>
        </Link>
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
                placeholder="Søk etter saksnummer eller enhet..."
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

      {/* Repairs List */}
      {filteredRepairs.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Wrench className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Ingen reparasjoner funnet</h3>
            <p className="text-gray-500 mb-4">
              {searchQuery || statusFilter !== "ALL"
                ? "Prøv å endre søkeord eller filtre"
                : "Du har ingen reparasjoner ennå"}
            </p>
            <Link href="/reparasjon">
              <Button>Bestill reparasjon</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredRepairs.map((repair) => (
            <Card key={repair.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-0">
                {/* Repair Header */}
                <div className="p-4 border-b border-gray-100">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center">
                        <Wrench className="w-6 h-6 text-orange-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {repair.deviceBrand} {repair.deviceModel}
                        </p>
                        <p className="text-sm text-gray-500">
                          #{repair.ticketNumber} • {repair.deviceType}
                        </p>
                      </div>
                    </div>
                    <StatusBadge statusType={{ type: "repair", status: repair.status }} />
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="px-4 py-3 bg-gray-50">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-gray-600">Fremdrift</span>
                    <span className="font-medium text-gray-900">{getRepairProgress(repair.status)}%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-orange-500 rounded-full transition-all"
                      style={{ width: `${getRepairProgress(repair.status)}%` }}
                    />
                  </div>
                </div>

                {/* Repair Details */}
                <div className="p-4 space-y-3">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-700">Beskrivelse</p>
                      <p className="text-sm text-gray-500">{repair.description}</p>
                    </div>
                  </div>

                  {repair.technicianNotes && (
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-700">Tekniker-notater</p>
                        <p className="text-sm text-gray-500">{repair.technicianNotes}</p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-700">Mottatt</p>
                      <p className="text-sm text-gray-500">{formatDate(repair.createdAt)}</p>
                    </div>
                  </div>

                  {/* Cost Info */}
                  {(repair.estimatedCost || repair.finalCost) && (
                    <div className="bg-gray-50 rounded-lg p-3 mt-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">
                          {repair.finalCost ? "Endelig kostnad" : "Estimert kostnad"}
                        </span>
                        <span className="font-medium text-gray-900">
                          {formatPrice(repair.finalCost || repair.estimatedCost || 0)}
                        </span>
                      </div>
                      {repair.parts && repair.parts.length > 0 && (
                        <div className="mt-2 pt-2 border-t border-gray-200 text-xs text-gray-500">
                          Deler: {repair.parts.map((p) => p.name).join(", ")}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Repair Footer */}
                <div className="p-4 bg-gray-50 border-t border-gray-100">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="text-sm text-gray-600">
                      Sist oppdatert: {formatDate(repair.updatedAt)}
                    </div>
                    <div className="flex gap-2">
                      {repair.completedAt && (
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4 mr-2" />
                          Last ned rapport
                        </Button>
                      )}
                      <Link href={`/my-portal/repairs/${repair.ticketNumber}`}>
                        <Button size="sm">
                          Se detaljer
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </Link>
                    </div>
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
