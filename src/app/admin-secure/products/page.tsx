"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Package,
  Plus,
  Sparkles,
  Check,
  AlertTriangle,
  X,
  Save,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockProducts, productBrands, filterOptions } from "@/lib/mock-data";

interface ProductFormData {
  name: string;
  nameNo: string;
  brand: string;
  category: string;
  model: string;
  price: string;
  originalPrice: string;
  stock: string;
  grade: string;
  description: string;
  descriptionNo: string;
  processor: string;
  processorType: string;
  ram: string;
  ramSize: string;
  storage: string;
  storageSize: string;
  screenSize: string;
  screenResolution: string;
  graphics: string;
  graphicsType: string;
  os: string;
  osType: string;
  weight: string;
  batteryLife: string;
  ports: string;
  releaseYear: string;
}

const initialFormData: ProductFormData = {
  name: "",
  nameNo: "",
  brand: "",
  category: "LAPTOPS",
  model: "",
  price: "",
  originalPrice: "",
  stock: "",
  grade: "A",
  description: "",
  descriptionNo: "",
  processor: "",
  processorType: "",
  ram: "",
  ramSize: "",
  storage: "",
  storageSize: "",
  screenSize: "",
  screenResolution: "",
  graphics: "",
  graphicsType: "",
  os: "",
  osType: "",
  weight: "",
  batteryLife: "",
  ports: "",
  releaseYear: "",
};

export default function AdminProductsPage() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<ProductFormData>(initialFormData);
  const [isAutoFilling, setIsAutoFilling] = useState(false);
  const [autoFillConfidence, setAutoFillConfidence] = useState<number | null>(null);
  const [autoFillMessage, setAutoFillMessage] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAutoFill = async () => {
    if (!formData.name || !formData.brand) {
      setAutoFillMessage("Please enter product name and brand first");
      return;
    }

    setIsAutoFilling(true);
    setAutoFillMessage("");
    setAutoFillConfidence(null);

    try {
      const response = await fetch("/api/admin/products/auto-fill-specs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productName: formData.name,
          brand: formData.brand,
          category: formData.category,
        }),
      });

      const data = await response.json();

      if (data.specifications) {
        setFormData((prev) => ({
          ...prev,
          processor: data.specifications.processor || prev.processor,
          processorType: data.specifications.processorType || prev.processorType,
          ram: data.specifications.ram || prev.ram,
          ramSize: data.specifications.ramSize || prev.ramSize,
          storage: data.specifications.storage || prev.storage,
          storageSize: data.specifications.storageSize || prev.storageSize,
          screenSize: data.specifications.screenSize || prev.screenSize,
          screenResolution: data.specifications.screenResolution || prev.screenResolution,
          graphics: data.specifications.graphics || prev.graphics,
          graphicsType: data.specifications.graphicsType || prev.graphicsType,
          os: data.specifications.os || prev.os,
          osType: data.specifications.osType || prev.osType,
          weight: data.specifications.weight || prev.weight,
          batteryLife: data.specifications.batteryLife || prev.batteryLife,
          ports: data.specifications.ports || prev.ports,
          releaseYear: data.specifications.releaseYear?.toString() || prev.releaseYear,
        }));
        setAutoFillConfidence(data.confidence);
        setAutoFillMessage(data.message);
      }
    } catch (error) {
      setAutoFillMessage("Failed to auto-fill specifications");
    } finally {
      setIsAutoFilling(false);
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.9) return "bg-green-500";
    if (confidence >= 0.7) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getConfidenceIcon = (confidence: number) => {
    if (confidence >= 0.9) return <Check className="w-4 h-4" />;
    if (confidence >= 0.7) return <AlertTriangle className="w-4 h-4" />;
    return <X className="w-4 h-4" />;
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
              <Package className="w-8 h-8 text-green-500" />
              <div>
                <h1 className="text-xl font-bold">Product Management</h1>
                <p className="text-sm text-gray-400">Manage product catalog</p>
              </div>
            </div>
            <Button onClick={() => setShowForm(!showForm)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Product
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Add Product Form */}
        {showForm && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Add New Product</span>
                <Button variant="ghost" size="icon" onClick={() => setShowForm(false)}>
                  <X className="w-5 h-5" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Basic Info */}
              <div>
                <h3 className="text-lg font-medium mb-4">Basic Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Product Name (English) *
                    </label>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g., Dell XPS 15 9520"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Product Name (Norwegian)
                    </label>
                    <Input
                      name="nameNo"
                      value={formData.nameNo}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Brand *
                    </label>
                    <select
                      name="brand"
                      value={formData.brand}
                      onChange={handleInputChange}
                      className="w-full h-10 px-3 rounded-md border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
                    >
                      <option value="">Select brand</option>
                      {productBrands.map((brand) => (
                        <option key={brand} value={brand}>{brand}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category *
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full h-10 px-3 rounded-md border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
                    >
                      {filterOptions.categories.map((cat) => (
                        <option key={cat.value} value={cat.value}>{cat.labelEn}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Model
                    </label>
                    <Input
                      name="model"
                      value={formData.model}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Grade *
                    </label>
                    <select
                      name="grade"
                      value={formData.grade}
                      onChange={handleInputChange}
                      className="w-full h-10 px-3 rounded-md border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
                    >
                      <option value="A">Grade A - Excellent</option>
                      <option value="B">Grade B - Good</option>
                      <option value="C">Grade C - Fair</option>
                      <option value="NEW">New</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* AI Auto-fill Button */}
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-4 border border-purple-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-purple-900 flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-purple-600" />
                      AI-Powered Specification Auto-Fill
                    </h4>
                    <p className="text-sm text-purple-700 mt-1">
                      Automatically populate specifications based on product name and brand
                    </p>
                  </div>
                  <Button
                    onClick={handleAutoFill}
                    disabled={isAutoFilling || !formData.name || !formData.brand}
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    {isAutoFilling ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Auto-filling...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 mr-2" />
                        Auto-fill Specs
                      </>
                    )}
                  </Button>
                </div>

                {/* Confidence Indicator */}
                {autoFillConfidence !== null && (
                  <div className="mt-4 flex items-center gap-3">
                    <Badge className={`${getConfidenceColor(autoFillConfidence)} text-white`}>
                      {getConfidenceIcon(autoFillConfidence)}
                      <span className="ml-1">{Math.round(autoFillConfidence * 100)}% Confidence</span>
                    </Badge>
                    <span className="text-sm text-purple-700">{autoFillMessage}</span>
                  </div>
                )}
              </div>

              {/* Specifications */}
              <div>
                <h3 className="text-lg font-medium mb-4">Specifications</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Processor
                    </label>
                    <Input
                      name="processor"
                      value={formData.processor}
                      onChange={handleInputChange}
                      placeholder="e.g., Intel Core i7-12700H"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      RAM
                    </label>
                    <Input
                      name="ram"
                      value={formData.ram}
                      onChange={handleInputChange}
                      placeholder="e.g., 16GB DDR4"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Storage
                    </label>
                    <Input
                      name="storage"
                      value={formData.storage}
                      onChange={handleInputChange}
                      placeholder="e.g., 512GB NVMe SSD"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Screen Size
                    </label>
                    <select
                      name="screenSize"
                      value={formData.screenSize}
                      onChange={handleInputChange}
                      className="w-full h-10 px-3 rounded-md border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
                    >
                      <option value="">Select size</option>
                      {filterOptions.screenSizes.map((size) => (
                        <option key={size.value} value={size.value}>{size.labelEn}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Resolution
                    </label>
                    <select
                      name="screenResolution"
                      value={formData.screenResolution}
                      onChange={handleInputChange}
                      className="w-full h-10 px-3 rounded-md border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
                    >
                      <option value="">Select resolution</option>
                      {filterOptions.screenResolutions.map((res) => (
                        <option key={res.value} value={res.value}>{res.labelEn}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Graphics
                    </label>
                    <Input
                      name="graphics"
                      value={formData.graphics}
                      onChange={handleInputChange}
                      placeholder="e.g., NVIDIA RTX 3060"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Operating System
                    </label>
                    <select
                      name="osType"
                      value={formData.osType}
                      onChange={handleInputChange}
                      className="w-full h-10 px-3 rounded-md border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
                    >
                      <option value="">Select OS</option>
                      {filterOptions.operatingSystems.map((os) => (
                        <option key={os.value} value={os.value}>{os.labelEn}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Weight
                    </label>
                    <Input
                      name="weight"
                      value={formData.weight}
                      onChange={handleInputChange}
                      placeholder="e.g., 1.8 kg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Battery Life
                    </label>
                    <Input
                      name="batteryLife"
                      value={formData.batteryLife}
                      onChange={handleInputChange}
                      placeholder="e.g., 10 hours"
                    />
                  </div>
                  <div className="lg:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Ports & Connectivity
                    </label>
                    <Input
                      name="ports"
                      value={formData.ports}
                      onChange={handleInputChange}
                      placeholder="e.g., USB-C, HDMI, Thunderbolt 4"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Release Year
                    </label>
                    <Input
                      name="releaseYear"
                      value={formData.releaseYear}
                      onChange={handleInputChange}
                      placeholder="e.g., 2023"
                    />
                  </div>
                </div>
              </div>

              {/* Pricing */}
              <div>
                <h3 className="text-lg font-medium mb-4">Pricing & Stock</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Price (NOK) *
                    </label>
                    <Input
                      name="price"
                      type="number"
                      value={formData.price}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Original Price (NOK)
                    </label>
                    <Input
                      name="originalPrice"
                      type="number"
                      value={formData.originalPrice}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Stock *
                    </label>
                    <Input
                      name="stock"
                      type="number"
                      value={formData.stock}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-lg font-medium mb-4">Description</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description (English)
                    </label>
                    <Textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows={4}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description (Norwegian)
                    </label>
                    <Textarea
                      name="descriptionNo"
                      value={formData.descriptionNo}
                      onChange={handleInputChange}
                      rows={4}
                    />
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-4 pt-4 border-t">
                <Button variant="outline" onClick={() => setShowForm(false)}>
                  Cancel
                </Button>
                <Button>
                  <Save className="w-4 h-4 mr-2" />
                  Save Product
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Products List */}
        <Card>
          <CardHeader>
            <CardTitle>Products ({mockProducts.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">SKU</th>
                    <th className="text-left py-3 px-4">Name</th>
                    <th className="text-left py-3 px-4">Brand</th>
                    <th className="text-left py-3 px-4">Category</th>
                    <th className="text-left py-3 px-4">Grade</th>
                    <th className="text-right py-3 px-4">Price</th>
                    <th className="text-right py-3 px-4">Stock</th>
                    <th className="text-right py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {mockProducts.map((product) => (
                    <tr key={product.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 font-mono text-xs">{product.sku}</td>
                      <td className="py-3 px-4">{product.name}</td>
                      <td className="py-3 px-4">{product.brand}</td>
                      <td className="py-3 px-4">
                        <Badge variant="secondary">{product.category}</Badge>
                      </td>
                      <td className="py-3 px-4">
                        <Badge className={
                          product.grade === "A" ? "bg-green-500" :
                          product.grade === "B" ? "bg-blue-500" :
                          product.grade === "C" ? "bg-yellow-500" :
                          "bg-purple-500"
                        }>
                          {product.grade}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-right font-medium">
                        {product.price.toLocaleString("nb-NO")} kr
                      </td>
                      <td className="py-3 px-4 text-right">
                        <span className={product.stock < 5 ? "text-orange-600" : ""}>
                          {product.stock}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <Button variant="ghost" size="sm">Edit</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
