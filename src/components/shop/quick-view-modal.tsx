"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { X, ShoppingCart, Zap, Leaf, Star, Check, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCartStore, useAppStore } from "@/store";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/types";
import type { ExtendedProduct } from "@/lib/mock-data";

interface QuickViewModalProps {
  product: Product | ExtendedProduct | null;
  isOpen: boolean;
  onClose: () => void;
}

export function QuickViewModal({ product, isOpen, onClose }: QuickViewModalProps) {
  const { addItem } = useCartStore();
  const { language } = useAppStore();

  if (!isOpen || !product) return null;

  const gradeColors = {
    A: "bg-green-500",
    B: "bg-blue-500",
    C: "bg-yellow-500",
    NEW: "bg-purple-500",
  };

  const conditionLabels = {
    A: language === "no" ? "Refurbished Grad A" : "Refurbished Grade A",
    B: language === "no" ? "Refurbished Grad B" : "Refurbished Grade B",
    C: language === "no" ? "Brukt" : "Used",
    NEW: language === "no" ? "Ny" : "New",
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
    onClose();
  };

  const handleBuyNow = () => {
    addItem({
      id: product.id,
      name: language === "no" ? product.nameNo : product.name,
      price: product.price,
      image: product.images[0],
      grade: product.grade,
      sku: product.sku,
    });
    window.location.href = "/nettbutikk/kasse";
  };

  const discountPercent = product.originalPrice 
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  const extProduct = product as ExtendedProduct;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-xl max-w-3xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image Section */}
          <div className="relative aspect-square bg-gray-100">
            {product.images[0] ? (
              <Image
                src={product.images[0]}
                alt={language === "no" ? product.nameNo : product.name}
                fill
                className="object-contain p-4"
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <Package className="w-24 h-24 text-gray-300" />
              </div>
            )}
            {/* Grade Badge */}
            <Badge className={`absolute top-4 left-4 ${gradeColors[product.grade]} text-white`}>
              {conditionLabels[product.grade]}
            </Badge>
            {/* Discount Badge */}
            {discountPercent > 0 && (
              <Badge className="absolute top-4 right-12 bg-red-500 text-white">
                -{discountPercent}%
              </Badge>
            )}
          </div>

          {/* Info Section */}
          <div className="p-6 flex flex-col">
            {/* Brand */}
            <p className="text-sm text-gray-500">{product.brand}</p>
            
            {/* Title */}
            <h2 className="text-xl font-bold text-gray-900 mt-1">
              {language === "no" ? product.nameNo : product.name}
            </h2>
            
            {/* SKU */}
            <p className="text-sm text-gray-500 mt-1">SKU: {product.sku}</p>

            {/* Rating */}
            {extProduct.rating && (
              <div className="flex items-center gap-2 mt-2">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span className="font-medium">{extProduct.rating}</span>
                </div>
                {extProduct.reviewCount && (
                  <span className="text-sm text-gray-500">
                    ({extProduct.reviewCount} {language === "no" ? "anmeldelser" : "reviews"})
                  </span>
                )}
              </div>
            )}

            {/* Price */}
            <div className="flex items-baseline space-x-3 mt-4">
              <span className="text-2xl font-bold text-gray-900">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-lg text-gray-400 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>

            {/* Stock Status */}
            <div className="flex items-center space-x-2 mt-4">
              {product.stock > 0 ? (
                <>
                  <Check className="w-5 h-5 text-green-600" />
                  <span className="text-green-600 font-medium">
                    {language === "no" ? "På lager" : "In Stock"} ({product.stock} {language === "no" ? "stk" : "pcs"})
                  </span>
                </>
              ) : (
                <span className="text-red-600 font-medium">
                  {language === "no" ? "Ikke på lager" : "Out of Stock"}
                </span>
              )}
            </div>

            {/* Sustainability */}
            <div className="flex items-center gap-2 mt-4 p-3 bg-green-50 rounded-lg">
              <Leaf className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm font-medium text-green-700">
                  {language === "no" ? "Bærekraftscore" : "Sustainability Score"}: {product.sustainabilityScore}/100
                </p>
                <p className="text-xs text-green-600">
                  {language === "no" ? "CO₂ spart" : "CO₂ saved"}: {product.co2Saved.toFixed(1)} kg
                </p>
              </div>
            </div>

            {/* Quick Specs */}
            {product.specifications && (
              <div className="mt-4">
                <h3 className="font-medium text-gray-900 mb-2">
                  {language === "no" ? "Hovedspesifikasjoner" : "Key Specifications"}
                </h3>
                <dl className="space-y-1">
                  {Object.entries(product.specifications).slice(0, 4).map(([key, value]) => (
                    <div key={key} className="flex text-sm">
                      <dt className="text-gray-500 w-24">{key}:</dt>
                      <dd className="text-gray-900 font-medium">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3 mt-6">
              <Button
                className="flex-1"
                onClick={handleAddToCart}
                disabled={product.stock === 0}
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                {language === "no" ? "Legg i kurv" : "Add to Cart"}
              </Button>
              <Button
                variant="outline"
                className="flex-1"
                onClick={handleBuyNow}
                disabled={product.stock === 0}
              >
                <Zap className="w-4 h-4 mr-2" />
                {language === "no" ? "Kjøp nå" : "Buy Now"}
              </Button>
            </div>

            {/* View Full Details Link */}
            <Link
              href={`/nettbutikk/${product.id}`}
              className="mt-4 text-center text-sm text-green-600 hover:text-green-700 hover:underline"
              onClick={onClose}
            >
              {language === "no" ? "Se alle detaljer →" : "View full details →"}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
