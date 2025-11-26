"use client";

import React from "react";
import Link from "next/link";
import {
  ShoppingBag,
  Wrench,
  FileText,
  HeadphonesIcon,
  Repeat,
  ArrowRight,
  Package,
  Clock,
  CheckCircle2,
  AlertCircle,
  Truck,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/portal";
import { useAuthStore } from "@/store";
import { mockOrders, mockRepairs, mockInvoices, mockTradeIns } from "@/lib/portal-data";
import { formatPrice, formatDate } from "@/lib/utils";

export default function MyPortalPage() {
  const { user } = useAuthStore();

  // Get active items for widgets
  const activeOrders = mockOrders.filter((o) => 
    ["PENDING", "CONFIRMED", "PROCESSING", "SHIPPED"].includes(o.status)
  ).slice(0, 3);
  
  const activeRepairs = mockRepairs.filter((r) => 
    !["COMPLETED", "DELIVERED", "CANCELLED"].includes(r.status)
  ).slice(0, 3);
  
  const recentInvoices = mockInvoices.slice(0, 3);
  
  const activeTradeIns = mockTradeIns.filter((t) => 
    !["COMPLETED", "REJECTED", "CANCELLED"].includes(t.status)
  ).slice(0, 2);

  const quickActions = [
    { href: "/nettbutikk", label: "Gå til nettbutikk", icon: ShoppingBag },
    { href: "/reparasjon", label: "Bestill reparasjon", icon: Wrench },
    { href: "/selg-til-oss", label: "Selg din enhet", icon: Repeat },
    { href: "/my-portal/support", label: "Kontakt support", icon: HeadphonesIcon },
  ];

  const getOrderIcon = (status: string) => {
    switch (status) {
      case "SHIPPED":
        return <Truck className="w-5 h-5 text-purple-500" />;
      case "PROCESSING":
        return <Clock className="w-5 h-5 text-indigo-500" />;
      case "DELIVERED":
        return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      default:
        return <Package className="w-5 h-5 text-blue-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-6 lg:p-8 text-white">
        <h1 className="text-2xl lg:text-3xl font-bold mb-2">
          Velkommen tilbake, {user?.firstName}!
        </h1>
        <p className="text-green-100 mb-6">
          Her kan du se og administrere alle dine ordrer, reparasjoner og dokumenter.
        </p>
        <div className="flex flex-wrap gap-3">
          {quickActions.map((action) => (
            <Link key={action.href} href={action.href}>
              <Button
                variant="secondary"
                className="bg-white/20 hover:bg-white/30 text-white border-0"
              >
                <action.icon className="w-4 h-4 mr-2" />
                {action.label}
              </Button>
            </Link>
          ))}
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Active Orders */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-green-600" />
                Aktive ordrer
              </CardTitle>
              <Link
                href="/my-portal/orders"
                className="text-sm text-green-600 hover:text-green-700 flex items-center gap-1"
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
                <Link href="/nettbutikk">
                  <Button variant="link" className="mt-2">
                    Gå til nettbutikken
                  </Button>
                </Link>
              </div>
            ) : (
              <ul className="space-y-3">
                {activeOrders.map((order) => (
                  <li key={order.id}>
                    <Link
                      href={`/my-portal/orders/${order.orderNumber}`}
                      className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                        {getOrderIcon(order.status)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 truncate">
                          Ordre #{order.orderNumber}
                        </p>
                        <p className="text-sm text-gray-500">
                          {order.items.length} produkt{order.items.length > 1 ? "er" : ""} • {formatPrice(order.total)}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <StatusBadge statusType={{ type: "order", status: order.status }} size="sm" />
                        {order.trackingNumber && (
                          <span className="text-xs text-gray-400">
                            {order.trackingNumber}
                          </span>
                        )}
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>

        {/* Repairs in Progress */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <Wrench className="w-5 h-5 text-orange-600" />
                Reparasjoner
              </CardTitle>
              <Link
                href="/my-portal/repairs"
                className="text-sm text-green-600 hover:text-green-700 flex items-center gap-1"
              >
                Se alle <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            {activeRepairs.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Wrench className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p>Ingen aktive reparasjoner</p>
                <Link href="/reparasjon">
                  <Button variant="link" className="mt-2">
                    Bestill reparasjon
                  </Button>
                </Link>
              </div>
            ) : (
              <ul className="space-y-3">
                {activeRepairs.map((repair) => (
                  <li key={repair.id}>
                    <Link
                      href={`/my-portal/repairs/${repair.ticketNumber}`}
                      className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                        <Wrench className="w-5 h-5 text-orange-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 truncate">
                          {repair.deviceBrand} {repair.deviceModel}
                        </p>
                        <p className="text-sm text-gray-500">
                          #{repair.ticketNumber}
                        </p>
                      </div>
                      <StatusBadge statusType={{ type: "repair", status: repair.status }} size="sm" />
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>

        {/* Recent Invoices */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" />
                Siste fakturaer
              </CardTitle>
              <Link
                href="/my-portal/invoices"
                className="text-sm text-green-600 hover:text-green-700 flex items-center gap-1"
              >
                Se alle <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <ul className="space-y-3">
              {recentInvoices.map((invoice) => (
                <li key={invoice.id}>
                  <Link
                    href={`/my-portal/invoices/${invoice.invoiceNumber}`}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <FileText className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          #{invoice.invoiceNumber}
                        </p>
                        <p className="text-sm text-gray-500">
                          {formatDate(invoice.createdAt)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-medium">{formatPrice(invoice.total)}</span>
                      <StatusBadge statusType={{ type: "invoice", status: invoice.status }} size="sm" />
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Trade-ins */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <Repeat className="w-5 h-5 text-purple-600" />
                Innbytter
              </CardTitle>
              <Link
                href="/my-portal/trade-ins"
                className="text-sm text-green-600 hover:text-green-700 flex items-center gap-1"
              >
                Se alle <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            {activeTradeIns.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Repeat className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p>Ingen aktive innbytter</p>
                <Link href="/selg-til-oss">
                  <Button variant="link" className="mt-2">
                    Selg din enhet
                  </Button>
                </Link>
              </div>
            ) : (
              <ul className="space-y-3">
                {activeTradeIns.map((tradeIn) => (
                  <li key={tradeIn.id}>
                    <Link
                      href={`/my-portal/trade-ins/${tradeIn.requestNumber}`}
                      className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                        <Repeat className="w-5 h-5 text-purple-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 truncate">
                          {tradeIn.brand} {tradeIn.model}
                        </p>
                        <p className="text-sm text-gray-500">
                          #{tradeIn.requestNumber}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <StatusBadge statusType={{ type: "tradein", status: tradeIn.status }} size="sm" />
                        {tradeIn.estimatedValue && (
                          <span className="text-sm text-green-600 font-medium">
                            {formatPrice(tradeIn.estimatedValue)}
                          </span>
                        )}
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Alert Section */}
      {recentInvoices.some((inv) => inv.status === "OVERDUE") && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="py-4">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-6 h-6 text-red-500" />
              <div className="flex-1">
                <p className="font-medium text-red-800">
                  Du har forfalte fakturaer
                </p>
                <p className="text-sm text-red-600">
                  Vennligst betal snarest for å unngå forsinkelsesgebyr.
                </p>
              </div>
              <Link href="/my-portal/invoices?status=overdue">
                <Button variant="outline" size="sm" className="border-red-300 text-red-700 hover:bg-red-100">
                  Se fakturaer
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
