"use client";

import React from "react";
import Link from "next/link";
import {
  ShoppingBag,
  Wrench,
  FileText,
  Users,
  Laptop,
  Calendar,
  BarChart3,
  ArrowRight,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Package,
  Clock,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge, ContractExpiryBadge } from "@/components/portal";
import { useAuthStore } from "@/store";
import {
  mockOrders,
  mockRepairs,
  mockContracts,
  mockFleetDevices,
  mockAnalytics,
} from "@/lib/portal-data";
import { formatPrice } from "@/lib/utils";

export default function CompanyPortalPage() {
  const { user } = useAuthStore();

  // Get expiring contracts (within 90 days)
  const expiringContracts = mockContracts.filter((c) => c.daysUntilExpiry <= 90 && c.daysUntilExpiry > 0);
  
  // Get active orders
  const activeOrders = mockOrders.filter((o) =>
    ["PENDING", "CONFIRMED", "PROCESSING", "SHIPPED"].includes(o.status)
  ).slice(0, 4);

  // Get active repairs
  const activeRepairs = mockRepairs.filter((r) =>
    !["COMPLETED", "DELIVERED", "CANCELLED"].includes(r.status)
  ).slice(0, 4);

  // Stats cards data
  const stats = [
    {
      title: "Totalt brukt",
      value: formatPrice(mockAnalytics.totalSpent),
      change: "+12%",
      trend: "up" as const,
      icon: DollarSign,
      color: "text-green-600 bg-green-100",
    },
    {
      title: "Aktive enheter",
      value: mockAnalytics.activeDevices.toString(),
      change: "+3",
      trend: "up" as const,
      icon: Laptop,
      color: "text-blue-600 bg-blue-100",
    },
    {
      title: "Ventende reparasjoner",
      value: mockAnalytics.pendingRepairs.toString(),
      change: "-1",
      trend: "down" as const,
      icon: Wrench,
      color: "text-orange-600 bg-orange-100",
    },
    {
      title: "Åpne støttesaker",
      value: mockAnalytics.openTickets.toString(),
      change: "0",
      trend: "neutral" as const,
      icon: Clock,
      color: "text-purple-600 bg-purple-100",
    },
  ];

  // Department spending chart (simple bar representation)
  const maxSpending = Math.max(...mockAnalytics.departmentSpending.map((d) => d.amount));

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
            Velkommen, {user?.companyInfo?.companyName || "Bedrift AS"}
          </h1>
          <p className="text-gray-500 mt-1">
            Oversikt over din bedrifts IT-portefølje
          </p>
        </div>
        <div className="flex gap-3">
          <Link href="/nettbutikk">
            <Button variant="outline">
              <ShoppingBag className="w-4 h-4 mr-2" />
              Bestill utstyr
            </Button>
          </Link>
          <Link href="/company-portal/analytics">
            <Button>
              <BarChart3 className="w-4 h-4 mr-2" />
              Se rapporter
            </Button>
          </Link>
        </div>
      </div>

      {/* Contract Expiry Alerts */}
      {expiringContracts.length > 0 && (
        <Card className="border-yellow-200 bg-yellow-50">
          <CardContent className="py-4">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-5 h-5 text-yellow-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-yellow-800 mb-2">
                  {expiringContracts.length} kontrakt{expiringContracts.length > 1 ? "er" : ""} utløper snart
                </h3>
                <div className="flex flex-wrap gap-3">
                  {expiringContracts.map((contract) => (
                    <Link
                      key={contract.id}
                      href={`/company-portal/contracts/${contract.id}`}
                      className="flex items-center gap-2 bg-white rounded-lg px-3 py-2 border border-yellow-200 hover:border-yellow-300 transition-colors"
                    >
                      <span className="font-medium text-gray-900">{contract.title}</span>
                      <ContractExpiryBadge daysUntilExpiry={contract.daysUntilExpiry} />
                    </Link>
                  ))}
                </div>
              </div>
              <Link href="/company-portal/contracts">
                <Button variant="outline" size="sm" className="border-yellow-300 text-yellow-700 hover:bg-yellow-100">
                  Se alle
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${stat.color}`}>
                  <stat.icon className="w-5 h-5" />
                </div>
                <span className={`text-sm font-medium flex items-center gap-1 ${
                  stat.trend === "up" ? "text-green-600" :
                  stat.trend === "down" ? "text-red-600" :
                  "text-gray-500"
                }`}>
                  {stat.trend === "up" && <TrendingUp className="w-4 h-4" />}
                  {stat.trend === "down" && <TrendingDown className="w-4 h-4" />}
                  {stat.change}
                </span>
              </div>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-500">{stat.title}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Active Orders */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-blue-600" />
                Aktive ordrer
              </CardTitle>
              <Link
                href="/company-portal/orders"
                className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
              >
                Se alle <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            {activeOrders.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Package className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p>Ingen aktive ordrer</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="text-left py-2 text-xs font-medium text-gray-500 uppercase">Ordre</th>
                      <th className="text-left py-2 text-xs font-medium text-gray-500 uppercase">Avdeling</th>
                      <th className="text-left py-2 text-xs font-medium text-gray-500 uppercase">Status</th>
                      <th className="text-right py-2 text-xs font-medium text-gray-500 uppercase">Beløp</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activeOrders.map((order) => (
                      <tr key={order.id} className="border-b border-gray-50 last:border-0">
                        <td className="py-3">
                          <Link
                            href={`/company-portal/orders/${order.orderNumber}`}
                            className="font-medium text-gray-900 hover:text-blue-600"
                          >
                            #{order.orderNumber}
                          </Link>
                          <p className="text-xs text-gray-500">
                            {order.items.length} produkt{order.items.length > 1 ? "er" : ""}
                          </p>
                        </td>
                        <td className="py-3 text-sm text-gray-600">
                          {order.department || "—"}
                        </td>
                        <td className="py-3">
                          <StatusBadge statusType={{ type: "order", status: order.status }} size="sm" />
                        </td>
                        <td className="py-3 text-right font-medium">
                          {formatPrice(order.total)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Department Spending */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-purple-600" />
              Forbruk per avdeling
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <ul className="space-y-4">
              {mockAnalytics.departmentSpending.slice(0, 4).map((dept, index) => (
                <li key={index}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">{dept.department}</span>
                    <span className="text-sm text-gray-500">{formatPrice(dept.amount)}</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-purple-500 rounded-full transition-all"
                      style={{ width: `${(dept.amount / maxSpending) * 100}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-400 mt-1">{dept.orderCount} ordrer</p>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Second Row */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Repairs */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <Wrench className="w-5 h-5 text-orange-600" />
                Reparasjoner
              </CardTitle>
              <Link
                href="/company-portal/repairs"
                className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
              >
                Se alle <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <ul className="space-y-3">
              {activeRepairs.map((repair) => (
                <li key={repair.id}>
                  <Link
                    href={`/company-portal/repairs/${repair.ticketNumber}`}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div>
                      <p className="font-medium text-gray-900">
                        {repair.deviceBrand} {repair.deviceModel}
                      </p>
                      <p className="text-xs text-gray-500">
                        #{repair.ticketNumber} • {repair.department || "—"}
                      </p>
                    </div>
                    <StatusBadge statusType={{ type: "repair", status: repair.status }} size="sm" />
                  </Link>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Fleet Overview */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <Laptop className="w-5 h-5 text-blue-600" />
                Enhetsflåte
              </CardTitle>
              <Link
                href="/company-portal/fleet"
                className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
              >
                Se alle <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <p className="text-2xl font-bold text-green-600">
                  {mockFleetDevices.filter((d) => d.status === "ACTIVE").length}
                </p>
                <p className="text-xs text-gray-500">Aktive</p>
              </div>
              <div className="text-center p-3 bg-yellow-50 rounded-lg">
                <p className="text-2xl font-bold text-yellow-600">
                  {mockFleetDevices.filter((d) => d.status === "IN_REPAIR").length}
                </p>
                <p className="text-xs text-gray-500">Under rep.</p>
              </div>
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <p className="text-2xl font-bold text-blue-600">
                  {mockFleetDevices.filter((d) => d.status === "AVAILABLE").length}
                </p>
                <p className="text-xs text-gray-500">Tilgjengelig</p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-2xl font-bold text-gray-600">
                  {mockFleetDevices.filter((d) => d.status === "RETIRED").length}
                </p>
                <p className="text-xs text-gray-500">Utfaset</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Links */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Hurtiglenker</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <ul className="space-y-2">
              {[
                { href: "/company-portal/team", label: "Administrer team", icon: Users },
                { href: "/company-portal/contracts", label: "Kontrakter & SLA", icon: Calendar },
                { href: "/company-portal/documents", label: "Dokumentsenter", icon: FileText },
                { href: "/company-portal/invoices", label: "Fakturaer", icon: DollarSign },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <link.icon className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-700">{link.label}</span>
                    <ArrowRight className="w-4 h-4 text-gray-300 ml-auto" />
                  </Link>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
