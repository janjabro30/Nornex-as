"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Repeat,
  Search,
  Filter,
  ArrowRight,
  ChevronDown,
  DollarSign,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StatusBadge } from "@/components/portal";
import { mockTradeIns } from "@/lib/portal-data";
import { formatPrice, formatDate } from "@/lib/utils";
import type { TradeInStatus } from "@/types/portal";

const statusFilters: { value: TradeInStatus | "ALL"; label: string }[] = [
  { value: "ALL", label: "Alle" },
  { value: "QUOTE_REQUESTED", label: "Tilbud forespurt" },
  { value: "QUOTE_SENT", label: "Tilbud sendt" },
  { value: "ACCEPTED", label: "Akseptert" },
  { value: "COMPLETED", label: "Fullført" },
];

export default function TradeInsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<TradeInStatus | "ALL">("ALL");
  const [showFilters, setShowFilters] = useState(false);

  const filteredTradeIns = mockTradeIns.filter((tradeIn) => {
    const matchesSearch =
      tradeIn.requestNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tradeIn.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tradeIn.model.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "ALL" || tradeIn.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const conditionLabels: Record<string, string> = {
    EXCELLENT: "Utmerket",
    GOOD: "God",
    FAIR: "Grei",
    POOR: "Dårlig",
    BROKEN: "Ødelagt",
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Mine innbytter</h1>
          <p className="text-gray-500 mt-1">Se status på dine innbytteforespørsler</p>
        </div>
        <Link href="/selg-til-oss">
          <Button>
            <Repeat className="w-4 h-4 mr-2" />
            Selg ny enhet
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

      {/* Trade-ins List */}
      {filteredTradeIns.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Repeat className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Ingen innbytter funnet</h3>
            <p className="text-gray-500 mb-4">
              {searchQuery || statusFilter !== "ALL"
                ? "Prøv å endre søkeord eller filtre"
                : "Du har ingen innbytteforespørsler ennå"}
            </p>
            <Link href="/selg-til-oss">
              <Button>Selg din enhet</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredTradeIns.map((tradeIn) => (
            <Card key={tradeIn.id} className="hover:shadow-md transition-shadow">
              <CardContent className="py-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  {/* Device Info */}
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-14 h-14 rounded-lg bg-purple-100 flex items-center justify-center">
                      <Repeat className="w-7 h-7 text-purple-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900">
                        {tradeIn.brand} {tradeIn.model}
                      </p>
                      <p className="text-sm text-gray-500">
                        #{tradeIn.requestNumber} • {tradeIn.deviceType}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                          Tilstand: {conditionLabels[tradeIn.condition]}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Status and Value */}
                  <div className="flex items-center gap-6">
                    {(tradeIn.estimatedValue || tradeIn.finalValue) && (
                      <div className="text-right">
                        <p className="text-xs text-gray-500">
                          {tradeIn.finalValue ? "Endelig verdi" : "Estimert verdi"}
                        </p>
                        <p className="text-lg font-bold text-green-600 flex items-center gap-1">
                          <DollarSign className="w-4 h-4" />
                          {formatPrice(tradeIn.finalValue || tradeIn.estimatedValue || 0)}
                        </p>
                      </div>
                    )}
                    <StatusBadge statusType={{ type: "tradein", status: tradeIn.status }} />
                  </div>
                </div>

                {/* Footer */}
                <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    Opprettet: {formatDate(tradeIn.createdAt)}
                    {tradeIn.updatedAt !== tradeIn.createdAt && (
                      <> • Oppdatert: {formatDate(tradeIn.updatedAt)}</>
                    )}
                  </div>
                  <Link href={`/my-portal/trade-ins/${tradeIn.requestNumber}`}>
                    <Button variant="outline" size="sm">
                      Se detaljer
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
