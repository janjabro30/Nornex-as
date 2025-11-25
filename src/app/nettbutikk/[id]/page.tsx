"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ShoppingCart,
  Leaf,
  ArrowLeft,
  Check,
  Package,
  Shield,
  Truck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCartStore, useAppStore } from "@/store";
import { formatPrice } from "@/lib/utils";
import { getTranslation } from "@/lib/translations";
import { mockProducts } from "@/lib/mock-data";

export default function ProductDetailPage() {
  const params = useParams();
  const { addItem } = useCartStore();
  const { language } = useAppStore();
  const t = getTranslation(language);

  const product = mockProducts.find((p) => p.id === params.id);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          {language === "no" ? "Produkt ikke funnet" : "Product Not Found"}
        </h1>
        <Link href="/nettbutikk">
          <Button>
            <ArrowLeft className="mr-2 w-4 h-4" />
            {language === "no" ? "Tilbake til butikk" : "Back to Shop"}
          </Button>
        </Link>
      </div>
    );
  }

  const gradeColors = {
    A: "bg-green-500",
    B: "bg-blue-500",
    C: "bg-yellow-500",
    NEW: "bg-purple-500",
  };

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: language === "no" ? product.nameNo : product.name,
      price: product.price,
      image: product.images[0],
      grade: product.grade,
      sku: product.sku,
    });
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center text-sm text-gray-500">
            <Link href="/" className="hover:text-green-600">
              {language === "no" ? "Hjem" : "Home"}
            </Link>
            <span className="mx-2">/</span>
            <Link href="/nettbutikk" className="hover:text-green-600">
              {t.shop.title}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">
              {language === "no" ? product.nameNo : product.name}
            </span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="relative aspect-square bg-white rounded-lg overflow-hidden border">
              {product.images[0] ? (
                <Image
                  src={product.images[0]}
                  alt={language === "no" ? product.nameNo : product.name}
                  fill
                  className="object-contain p-8"
                />
              ) : (
                <div className="flex items-center justify-center h-full bg-gray-100">
                  <Package className="w-24 h-24 text-gray-300" />
                </div>
              )}
              {/* Grade Badge */}
              <Badge
                className={`absolute top-4 left-4 ${gradeColors[product.grade]} text-white`}
              >
                {t.shop.grades[product.grade]}
              </Badge>
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <p className="text-sm text-gray-500 mb-1">{product.brand}</p>
              <h1 className="text-3xl font-bold text-gray-900">
                {language === "no" ? product.nameNo : product.name}
              </h1>
              <p className="text-sm text-gray-500 mt-1">SKU: {product.sku}</p>
            </div>

            {/* Price */}
            <div className="flex items-baseline space-x-3">
              <span className="text-4xl font-bold text-gray-900">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-xl text-gray-400 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
              {product.originalPrice && (
                <Badge variant="destructive">
                  -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                </Badge>
              )}
            </div>

            {/* Sustainability Info */}
            <Card className="bg-green-50 border-green-200">
              <CardContent className="py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Leaf className="w-5 h-5 text-green-600" />
                    <span className="font-medium text-green-700">
                      {t.shop.product.sustainabilityScore}
                    </span>
                  </div>
                  <span className="text-2xl font-bold text-green-600">
                    {product.sustainabilityScore}/100
                  </span>
                </div>
                <div className="mt-2 text-sm text-green-600">
                  {t.shop.product.co2Saved}: {product.co2Saved.toFixed(1)} kg
                </div>
              </CardContent>
            </Card>

            {/* Stock Status */}
            <div className="flex items-center space-x-2">
              {product.stock > 0 ? (
                <>
                  <Check className="w-5 h-5 text-green-600" />
                  <span className="text-green-600 font-medium">
                    {t.shop.product.inStock} ({product.stock}{" "}
                    {language === "no" ? "stk" : "pcs"})
                  </span>
                </>
              ) : (
                <span className="text-red-600 font-medium">
                  {t.shop.product.outOfStock}
                </span>
              )}
            </div>

            {/* Add to Cart */}
            <Button
              size="lg"
              className="w-full"
              onClick={handleAddToCart}
              disabled={product.stock === 0}
            >
              <ShoppingCart className="mr-2 w-5 h-5" />
              {t.shop.product.addToCart}
            </Button>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Shield className="w-5 h-5 text-green-600" />
                <span>
                  {language === "no" ? "12 mnd garanti" : "12 month warranty"}
                </span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Truck className="w-5 h-5 text-green-600" />
                <span>
                  {language === "no" ? "Gratis frakt over 2000kr" : "Free shipping over 2000kr"}
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="pt-6 border-t">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                {language === "no" ? "Beskrivelse" : "Description"}
              </h2>
              <p className="text-gray-600">
                {language === "no" ? product.descriptionNo : product.description}
              </p>
            </div>

            {/* Specifications */}
            {product.specifications && (
              <div className="pt-6 border-t">
                <h2 className="text-lg font-semibold text-gray-900 mb-3">
                  {language === "no" ? "Spesifikasjoner" : "Specifications"}
                </h2>
                <dl className="space-y-2">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-2 border-b border-gray-100">
                      <dt className="text-gray-500">{key}</dt>
                      <dd className="text-gray-900 font-medium">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
