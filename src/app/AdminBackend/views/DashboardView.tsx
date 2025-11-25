"use client";

import React from "react";
import {
  ShoppingCart,
  Wrench,
  Recycle,
  FileText,
  TrendingUp,
  Package,
  Users,
  DollarSign,
  Plus,
  ArrowRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface DashboardViewProps {
  onNavigate: (view: string) => void;
}

const mockStats = {
  orders: {
    today: 8,
    week: 47,
    month: 189,
    pending: 12,
  },
  repairs: {
    active: 5,
    completed: 23,
    avgDays: 3.2,
  },
  sellback: {
    pending: 8,
    evaluated: 34,
    totalValue: 45600,
  },
  contracts: {
    active: 12,
    pending: 3,
    expiring: 2,
  },
  revenue: {
    today: 24500,
    week: 156800,
    month: 678400,
    growth: 12.5,
  },
};

const recentActivity = [
  { type: "order", message: "Ny ordre #NOR-ABC123", time: "2 min siden", status: "new" },
  { type: "repair", message: "Reparasjon #REP-456 fullført", time: "15 min siden", status: "success" },
  { type: "sellback", message: "Ny innkjøpsforespørsel mottatt", time: "32 min siden", status: "pending" },
  { type: "contract", message: "Kontrakt signert av kunde", time: "1 time siden", status: "success" },
  { type: "order", message: "Ordre #NOR-XYZ789 sendt", time: "2 timer siden", status: "info" },
];

export default function DashboardView({ onNavigate }: DashboardViewProps) {
  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Oversikt</h1>
          <p className="text-gray-500">Velkommen tilbake! Her er dagens oppsummering.</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" onClick={() => onNavigate("orders")}>
            <Plus className="w-4 h-4 mr-2" />
            Ny ordre
          </Button>
          <Button onClick={() => onNavigate("repairs")}>
            <Plus className="w-4 h-4 mr-2" />
            Ny reparasjon
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Ordrer i dag</p>
                <p className="text-3xl font-bold text-gray-900">{mockStats.orders.today}</p>
                <p className="text-sm text-green-600 mt-1">
                  <TrendingUp className="w-4 h-4 inline mr-1" />
                  +15% fra i går
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <ShoppingCart className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Aktive reparasjoner</p>
                <p className="text-3xl font-bold text-gray-900">{mockStats.repairs.active}</p>
                <p className="text-sm text-gray-500 mt-1">
                  Snitt {mockStats.repairs.avgDays} dager
                </p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Wrench className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Ventende innkjøp</p>
                <p className="text-3xl font-bold text-gray-900">{mockStats.sellback.pending}</p>
                <p className="text-sm text-gray-500 mt-1">
                  Verdi: {mockStats.sellback.totalValue.toLocaleString()} kr
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Recycle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Omsetning denne måneden</p>
                <p className="text-3xl font-bold text-gray-900">
                  {(mockStats.revenue.month / 1000).toFixed(0)}k
                </p>
                <p className="text-sm text-green-600 mt-1">
                  <TrendingUp className="w-4 h-4 inline mr-1" />
                  +{mockStats.revenue.growth}%
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => onNavigate("orders")}>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center justify-between">
              <span>Ordrer</span>
              <ArrowRight className="w-4 h-4 text-gray-400" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Ventende</span>
                <Badge variant="destructive">{mockStats.orders.pending}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Denne uken</span>
                <span className="font-medium">{mockStats.orders.week}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Denne måneden</span>
                <span className="font-medium">{mockStats.orders.month}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => onNavigate("repairs")}>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center justify-between">
              <span>Reparasjoner</span>
              <ArrowRight className="w-4 h-4 text-gray-400" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Aktive</span>
                <Badge>{mockStats.repairs.active}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Fullført denne måneden</span>
                <span className="font-medium">{mockStats.repairs.completed}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Snitt behandlingstid</span>
                <span className="font-medium">{mockStats.repairs.avgDays} dager</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => onNavigate("contracts")}>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center justify-between">
              <span>Kontrakter</span>
              <ArrowRight className="w-4 h-4 text-gray-400" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Aktive</span>
                <Badge variant="default">{mockStats.contracts.active}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Venter på signering</span>
                <span className="font-medium">{mockStats.contracts.pending}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Utløper snart</span>
                <Badge variant="destructive">{mockStats.contracts.expiring}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Nylig aktivitet</span>
            <Button variant="ghost" size="sm">
              Se alle
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      activity.status === "success"
                        ? "bg-green-500"
                        : activity.status === "new"
                        ? "bg-blue-500"
                        : activity.status === "pending"
                        ? "bg-yellow-500"
                        : "bg-gray-400"
                    }`}
                  />
                  <span className="text-sm text-gray-700">{activity.message}</span>
                </div>
                <span className="text-xs text-gray-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Links */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <button
          onClick={() => onNavigate("orders")}
          className="p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow text-left"
        >
          <Package className="w-8 h-8 text-blue-600 mb-2" />
          <p className="font-medium text-gray-900">Ny ordre</p>
          <p className="text-sm text-gray-500">Opprett manuelt</p>
        </button>
        <button
          onClick={() => onNavigate("repairs")}
          className="p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow text-left"
        >
          <Wrench className="w-8 h-8 text-orange-600 mb-2" />
          <p className="font-medium text-gray-900">Ny reparasjon</p>
          <p className="text-sm text-gray-500">Registrer sak</p>
        </button>
        <button
          onClick={() => onNavigate("contracts")}
          className="p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow text-left"
        >
          <FileText className="w-8 h-8 text-purple-600 mb-2" />
          <p className="font-medium text-gray-900">Ny kontrakt</p>
          <p className="text-sm text-gray-500">Opprett avtale</p>
        </button>
        <button
          onClick={() => onNavigate("users")}
          className="p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow text-left"
        >
          <Users className="w-8 h-8 text-green-600 mb-2" />
          <p className="font-medium text-gray-900">Ny bruker</p>
          <p className="text-sm text-gray-500">Legg til admin</p>
        </button>
      </div>
    </div>
  );
}
