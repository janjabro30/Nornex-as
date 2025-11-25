"use client";

import React, { useState } from "react";
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  GripVertical,
  Search,
  ArrowUpDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface ServiceData {
  id: string;
  name: string;
  nameNo: string;
  slug: string;
  status: "ACTIVE" | "INACTIVE" | "DRAFT";
  displayOrder: number;
  updatedAt: Date;
  stepsCount: number;
  benefitsCount: number;
}

interface ServiceManagerProps {
  services?: ServiceData[];
  onAdd?: () => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onPreview?: (id: string) => void;
  onReorder?: (services: ServiceData[]) => void;
  onStatusChange?: (id: string, status: "ACTIVE" | "INACTIVE" | "DRAFT") => void;
}

// Mock data for demonstration
const mockServices: ServiceData[] = [
  {
    id: "1",
    name: "Trade-in Program",
    nameNo: "Innbytteprogram",
    slug: "innbytte",
    status: "ACTIVE",
    displayOrder: 1,
    updatedAt: new Date(),
    stepsCount: 4,
    benefitsCount: 6,
  },
  {
    id: "2",
    name: "Repair Portal",
    nameNo: "Reparasjonsportal",
    slug: "reparasjon",
    status: "ACTIVE",
    displayOrder: 2,
    updatedAt: new Date(),
    stepsCount: 3,
    benefitsCount: 4,
  },
  {
    id: "3",
    name: "Sell Devices",
    nameNo: "Selg enheter",
    slug: "selg",
    status: "ACTIVE",
    displayOrder: 3,
    updatedAt: new Date(),
    stepsCount: 4,
    benefitsCount: 4,
  },
];

export function ServiceManager({
  services = mockServices,
  onAdd,
  onEdit,
  onDelete,
  onPreview,
}: ServiceManagerProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const filteredServices = services.filter(
    (service) =>
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.nameNo.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusBadge = (status: ServiceData["status"]) => {
    switch (status) {
      case "ACTIVE":
        return (
          <Badge variant="success" className="bg-green-100 text-green-700">
            Aktiv
          </Badge>
        );
      case "INACTIVE":
        return (
          <Badge variant="secondary" className="bg-gray-100 text-gray-700">
            Inaktiv
          </Badge>
        );
      case "DRAFT":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            Utkast
          </Badge>
        );
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("nb-NO", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(date);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Tjenester</CardTitle>
          <Button onClick={onAdd}>
            <Plus className="w-4 h-4 mr-2" />
            Legg til tjeneste
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Søk etter tjenester..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Services Table */}
        <div className="border rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-10">
                  <GripVertical className="w-4 h-4 text-gray-400" />
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center gap-1">
                    Navn
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                  Steg
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                  Fordeler
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                  Sist oppdatert
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Handlinger
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredServices.map((service) => (
                <tr
                  key={service.id}
                  className={cn(
                    "hover:bg-gray-50 transition-colors",
                    selectedService === service.id && "bg-blue-50"
                  )}
                  onClick={() => setSelectedService(service.id)}
                >
                  <td className="px-4 py-4">
                    <button
                      className="cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600"
                      title="Dra for å endre rekkefølge"
                    >
                      <GripVertical className="w-4 h-4" />
                    </button>
                  </td>
                  <td className="px-4 py-4">
                    <div>
                      <div className="font-medium text-gray-900">
                        {service.nameNo}
                      </div>
                      <div className="text-sm text-gray-500">
                        /{service.slug}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    {getStatusBadge(service.status)}
                  </td>
                  <td className="px-4 py-4 hidden md:table-cell">
                    <span className="text-sm text-gray-700">
                      {service.stepsCount} steg
                    </span>
                  </td>
                  <td className="px-4 py-4 hidden md:table-cell">
                    <span className="text-sm text-gray-700">
                      {service.benefitsCount} fordeler
                    </span>
                  </td>
                  <td className="px-4 py-4 hidden lg:table-cell">
                    <span className="text-sm text-gray-500">
                      {formatDate(service.updatedAt)}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          onPreview?.(service.id);
                        }}
                        title="Forhåndsvis"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          onEdit?.(service.id);
                        }}
                        title="Rediger"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          onDelete?.(service.id);
                        }}
                        title="Slett"
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
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

        {filteredServices.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">
              {searchQuery
                ? "Ingen tjenester funnet med dette søket"
                : "Ingen tjenester lagt til ennå"}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
