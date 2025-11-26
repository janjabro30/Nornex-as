"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Tag,
  Plus,
  Check,
  X,
  Edit,
  Trash2,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockDiscountCodes } from "@/lib/mock-data";
import { formatPrice, formatDate } from "@/lib/utils";

interface DiscountFormData {
  code: string;
  type: "percentage" | "fixed";
  value: string;
  minOrderAmount: string;
  maxUses: string;
  validFrom: string;
  validUntil: string;
  isActive: boolean;
}

const initialFormData: DiscountFormData = {
  code: "",
  type: "percentage",
  value: "",
  minOrderAmount: "",
  maxUses: "",
  validFrom: "",
  validUntil: "",
  isActive: true,
};

export default function AdminDiscountsPage() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<DiscountFormData>(initialFormData);
  const [discounts, setDiscounts] = useState(mockDiscountCodes);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: (e.target as HTMLInputElement).checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would save to the database
    console.log("Saving discount:", formData);
    setShowForm(false);
    setFormData(initialFormData);
  };

  const toggleActive = (id: string) => {
    setDiscounts((prev) =>
      prev.map((d) => (d.id === id ? { ...d, isActive: !d.isActive } : d))
    );
  };

  const getUsagePercentage = (current: number, max?: number) => {
    if (!max) return 0;
    return Math.round((current / max) * 100);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-gray-900 text-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/admin-secure" className="text-gray-400 hover:text-white">
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <Tag className="w-8 h-8 text-green-500" />
              <div>
                <h1 className="text-xl font-bold">Discount Code Management</h1>
                <p className="text-sm text-gray-400">Create and manage discount codes</p>
              </div>
            </div>
            <Button onClick={() => setShowForm(!showForm)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Discount Code
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="py-4">
              <p className="text-sm text-gray-500">Total Codes</p>
              <p className="text-2xl font-bold">{discounts.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="py-4">
              <p className="text-sm text-gray-500">Active Codes</p>
              <p className="text-2xl font-bold text-green-600">
                {discounts.filter((d) => d.isActive).length}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="py-4">
              <p className="text-sm text-gray-500">Total Uses</p>
              <p className="text-2xl font-bold">
                {discounts.reduce((sum, d) => sum + d.currentUses, 0)}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="py-4">
              <p className="text-sm text-gray-500">Expiring Soon</p>
              <p className="text-2xl font-bold text-orange-600">
                {discounts.filter((d) => {
                  const daysUntil = Math.ceil(
                    (new Date(d.validUntil).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
                  );
                  return daysUntil <= 30 && daysUntil > 0;
                }).length}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Add Form */}
        {showForm && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Create New Discount Code</span>
                <Button variant="ghost" size="icon" onClick={() => setShowForm(false)}>
                  <X className="w-5 h-5" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Discount Code *
                    </label>
                    <Input
                      name="code"
                      value={formData.code}
                      onChange={handleInputChange}
                      placeholder="e.g., SUMMER20"
                      className="uppercase"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Type *
                    </label>
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleInputChange}
                      className="w-full h-10 px-3 rounded-md border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
                    >
                      <option value="percentage">Percentage (%)</option>
                      <option value="fixed">Fixed Amount (NOK)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Value *
                    </label>
                    <Input
                      name="value"
                      type="number"
                      value={formData.value}
                      onChange={handleInputChange}
                      placeholder={formData.type === "percentage" ? "10" : "500"}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Minimum Order Amount (NOK)
                    </label>
                    <Input
                      name="minOrderAmount"
                      type="number"
                      value={formData.minOrderAmount}
                      onChange={handleInputChange}
                      placeholder="500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Max Uses
                    </label>
                    <Input
                      name="maxUses"
                      type="number"
                      value={formData.maxUses}
                      onChange={handleInputChange}
                      placeholder="1000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Valid From *
                    </label>
                    <Input
                      name="validFrom"
                      type="date"
                      value={formData.validFrom}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Valid Until *
                    </label>
                    <Input
                      name="validUntil"
                      type="date"
                      value={formData.validUntil}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="flex items-center pt-6">
                    <input
                      type="checkbox"
                      id="isActive"
                      name="isActive"
                      checked={formData.isActive}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                    />
                    <label htmlFor="isActive" className="ml-2 text-sm text-gray-700">
                      Active
                    </label>
                  </div>
                </div>

                <div className="flex justify-end gap-4 pt-4 border-t">
                  <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Code
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Discount Codes List */}
        <Card>
          <CardHeader>
            <CardTitle>Discount Codes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Code</th>
                    <th className="text-left py-3 px-4">Type</th>
                    <th className="text-left py-3 px-4">Value</th>
                    <th className="text-left py-3 px-4">Min Order</th>
                    <th className="text-left py-3 px-4">Usage</th>
                    <th className="text-left py-3 px-4">Validity</th>
                    <th className="text-center py-3 px-4">Status</th>
                    <th className="text-right py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {discounts.map((discount) => {
                    const isExpired = new Date(discount.validUntil) < new Date();
                    const usagePercent = getUsagePercentage(
                      discount.currentUses,
                      discount.maxUses
                    );
                    
                    return (
                      <tr key={discount.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <span className="font-mono font-bold">{discount.code}</span>
                        </td>
                        <td className="py-3 px-4">
                          <Badge variant="secondary">
                            {discount.type === "percentage" ? "%" : "NOK"}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 font-medium">
                          {discount.type === "percentage"
                            ? `${discount.value}%`
                            : formatPrice(discount.value)}
                        </td>
                        <td className="py-3 px-4">
                          {discount.minOrderAmount
                            ? formatPrice(discount.minOrderAmount)
                            : "-"}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <span>
                              {discount.currentUses}
                              {discount.maxUses && ` / ${discount.maxUses}`}
                            </span>
                            {discount.maxUses && (
                              <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                  className={`h-full ${
                                    usagePercent >= 90
                                      ? "bg-red-500"
                                      : usagePercent >= 70
                                      ? "bg-yellow-500"
                                      : "bg-green-500"
                                  }`}
                                  style={{ width: `${usagePercent}%` }}
                                />
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-1 text-xs text-gray-500">
                            <Calendar className="w-3 h-3" />
                            {formatDate(discount.validFrom)} - {formatDate(discount.validUntil)}
                          </div>
                        </td>
                        <td className="py-3 px-4 text-center">
                          {isExpired ? (
                            <Badge variant="destructive">Expired</Badge>
                          ) : discount.isActive ? (
                            <Badge className="bg-green-500">Active</Badge>
                          ) : (
                            <Badge variant="secondary">Inactive</Badge>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => toggleActive(discount.id)}
                              title={discount.isActive ? "Deactivate" : "Activate"}
                            >
                              {discount.isActive ? (
                                <X className="w-4 h-4 text-red-500" />
                              ) : (
                                <Check className="w-4 h-4 text-green-500" />
                              )}
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Trash2 className="w-4 h-4 text-red-500" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
