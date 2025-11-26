"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShoppingBag,
  Search,
  Filter,
  Package,
  Truck,
  Clock,
  CheckCircle2,
  ArrowRight,
  Download,
  RefreshCw,
  ChevronDown,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StatusBadge } from "@/components/portal";
import { mockOrders } from "@/lib/portal-data";
import { formatPrice, formatDate } from "@/lib/utils";
import type { OrderStatus } from "@/types/portal";

const statusFilters: { value: OrderStatus | "ALL"; label: string }[] = [
  { value: "ALL", label: "Alle" },
  { value: "PENDING", label: "Venter" },
  { value: "CONFIRMED", label: "Bekreftet" },
  { value: "PROCESSING", label: "Behandles" },
  { value: "SHIPPED", label: "Sendt" },
  { value: "DELIVERED", label: "Levert" },
  { value: "CANCELLED", label: "Kansellert" },
];

export default function OrdersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "ALL">("ALL");
  const [showFilters, setShowFilters] = useState(false);

  const filteredOrders = mockOrders.filter((order) => {
    const matchesSearch = order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.items.some((item) => item.productName.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = statusFilter === "ALL" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getOrderIcon = (status: OrderStatus) => {
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
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Mine ordrer</h1>
          <p className="text-gray-500 mt-1">Se og administrer alle dine ordrer</p>
        </div>
        <Link href="/nettbutikk">
          <Button>
            <ShoppingBag className="w-4 h-4 mr-2" />
            Gå til nettbutikk
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
                placeholder="Søk etter ordrenummer eller produkt..."
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

      {/* Orders List */}
      {filteredOrders.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Ingen ordrer funnet</h3>
            <p className="text-gray-500 mb-4">
              {searchQuery || statusFilter !== "ALL"
                ? "Prøv å endre søkeord eller filtre"
                : "Du har ikke lagt inn noen ordrer ennå"}
            </p>
            <Link href="/nettbutikk">
              <Button>Gå til nettbutikk</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <Card key={order.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-0">
                {/* Order Header */}
                <div className="p-4 border-b border-gray-100">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                        {getOrderIcon(order.status)}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          Ordre #{order.orderNumber}
                        </p>
                        <p className="text-sm text-gray-500">
                          {formatDate(order.createdAt)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <StatusBadge statusType={{ type: "order", status: order.status }} />
                      {order.trackingNumber && (
                        <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                          {order.trackingNumber}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="p-4">
                  <ul className="space-y-3">
                    {order.items.map((item) => (
                      <li key={item.id} className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                          <Package className="w-8 h-8 text-gray-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900 truncate">{item.productName}</p>
                          <p className="text-sm text-gray-500">
                            Antall: {item.quantity} × {formatPrice(item.price)}
                          </p>
                        </div>
                        <p className="font-medium text-gray-900">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Order Footer */}
                <div className="p-4 bg-gray-50 border-t border-gray-100">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>{order.items.length} produkt{order.items.length > 1 ? "er" : ""}</span>
                      <span>•</span>
                      <span className="font-medium text-gray-900">{formatPrice(order.total)}</span>
                    </div>
                    <div className="flex gap-2">
                      {order.status === "DELIVERED" && (
                        <Button variant="outline" size="sm">
                          <RefreshCw className="w-4 h-4 mr-2" />
                          Bestill på nytt
                        </Button>
                      )}
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Last ned faktura
                      </Button>
                      <Link href={`/my-portal/orders/${order.orderNumber}`}>
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
