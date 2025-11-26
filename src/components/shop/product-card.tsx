"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Leaf, Heart, Eye, Zap, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCartStore, useAppStore } from "@/store";
import { formatPrice } from "@/lib/utils";
import { getTranslation } from "@/lib/translations";
import type { Product } from "@/types";
import type { ExtendedProduct } from "@/lib/mock-data";

interface ProductCardProps {
  product: Product | ExtendedProduct;
  viewMode?: "grid" | "list";
  onQuickView?: (product: Product | ExtendedProduct) => void;
}

export function ProductCard({ product, viewMode = "grid", onQuickView }: ProductCardProps) {
  const { addItem } = useCartStore();
  const { language } = useAppStore();
  const t = getTranslation(language);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const gradeColors = {
    A: "bg-green-500",
    B: "bg-blue-500",
    C: "bg-yellow-500",
    NEW: "bg-purple-500",
  };

  const conditionLabels = {
    A: language === "no" ? "Refurbished A" : "Refurbished A",
    B: language === "no" ? "Refurbished B" : "Refurbished B",
    C: language === "no" ? "Brukt" : "Used",
    NEW: language === "no" ? "NY" : "NEW",
  };

  const getStockBadge = () => {
    if (product.stock === 0) {
      return { label: language === "no" ? "Utsolgt" : "Out of Stock", color: "bg-red-500" };
    }
    if (product.stock < 5) {
      return { label: language === "no" ? `Bare ${product.stock} igjen!` : `Only ${product.stock} left!`, color: "bg-orange-500" };
    }
    return { label: language === "no" ? "På lager" : "In Stock", color: "bg-green-500" };
  };

  const stockBadge = getStockBadge();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id: product.id,
      name: language === "no" ? product.nameNo : product.name,
      price: product.price,
      image: product.images[0],
      grade: product.grade,
      sku: product.sku,
    });
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id: product.id,
      name: language === "no" ? product.nameNo : product.name,
      price: product.price,
      image: product.images[0],
      grade: product.grade,
      sku: product.sku,
    });
    // Redirect to checkout
    window.location.href = "/nettbutikk/kasse";
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onQuickView) {
      onQuickView(product);
    }
  };

  const discountPercent = product.originalPrice 
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  // Extended product data
  const extProduct = product as ExtendedProduct;
  const specs = [];
  if (extProduct.processorType) specs.push(extProduct.processor?.split(" ").slice(0, 3).join(" ") || "");
  if (extProduct.ramSize) specs.push(`${extProduct.ramSize}GB RAM`);
  if (extProduct.storageSize) specs.push(parseInt(extProduct.storageSize) >= 1024 ? `${parseInt(extProduct.storageSize) / 1024}TB` : `${extProduct.storageSize}GB`);

  // List View Layout
  if (viewMode === "list") {
    return (
      <Card className="group overflow-hidden transition-all hover:shadow-lg">
        <div className="flex">
          {/* Image Section */}
          <div className="relative w-48 h-48 flex-shrink-0 overflow-hidden bg-gray-100">
            <Link href={`/nettbutikk/${product.id}`}>
              {product.images[0] ? (
                <Image
                  src={product.images[0]}
                  alt={language === "no" ? product.nameNo : product.name}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <span className="text-gray-400">No image</span>
                </div>
              )}
            </Link>
            {/* Badges */}
            <Badge className={`absolute top-2 left-2 ${gradeColors[product.grade]} text-white text-xs`}>
              {conditionLabels[product.grade]}
            </Badge>
            {discountPercent > 0 && (
              <Badge className="absolute top-2 right-2 bg-red-500 text-white text-xs">
                -{discountPercent}%
              </Badge>
            )}
          </div>

          {/* Content Section */}
          <div className="flex-1 p-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-gray-500">{product.brand}</p>
                <Badge className={`${stockBadge.color} text-white text-xs`}>
                  {stockBadge.label}
                </Badge>
              </div>
              <Link href={`/nettbutikk/${product.id}`}>
                <h3 className="font-semibold text-gray-900 hover:text-green-600 transition-colors mb-2">
                  {language === "no" ? product.nameNo : product.name}
                </h3>
              </Link>
              {specs.length > 0 && (
                <p className="text-sm text-gray-600 mb-2">{specs.join(" • ")}</p>
              )}
              {/* Rating */}
              {extProduct.rating && (
                <div className="flex items-center gap-1 mb-2">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span className="text-sm font-medium">{extProduct.rating}</span>
                  {extProduct.reviewCount && (
                    <span className="text-sm text-gray-500">({extProduct.reviewCount})</span>
                  )}
                </div>
              )}
            </div>

            <div className="flex items-center justify-between">
              {/* Price */}
              <div className="flex items-baseline space-x-2">
                <span className="text-xl font-bold text-gray-900">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-gray-400 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                >
                  <ShoppingCart className="w-4 h-4 mr-1" />
                  {language === "no" ? "Legg i kurv" : "Add to Cart"}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleBuyNow}
                  disabled={product.stock === 0}
                >
                  <Zap className="w-4 h-4 mr-1" />
                  {language === "no" ? "Kjøp nå" : "Buy Now"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  // Grid View Layout (Default)
  return (
    <Card className="group overflow-hidden transition-all hover:shadow-lg relative">
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <Link href={`/nettbutikk/${product.id}`}>
          {product.images[0] ? (
            <Image
              src={product.images[0]}
              alt={language === "no" ? product.nameNo : product.name}
              fill
              className="object-cover transition-transform group-hover:scale-105"
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <span className="text-gray-400">No image</span>
            </div>
          )}
        </Link>
        
        {/* Top Left - Condition Badge */}
        <Badge className={`absolute top-2 left-2 ${gradeColors[product.grade]} text-white text-xs`}>
          {conditionLabels[product.grade]}
        </Badge>
        
        {/* Top Right - Discount & Sustainability */}
        <div className="absolute top-2 right-2 flex flex-col gap-1">
          {discountPercent > 0 && (
            <Badge className="bg-red-500 text-white text-xs">
              -{discountPercent}%
            </Badge>
          )}
          <div className="flex items-center space-x-1 bg-white/90 rounded-full px-2 py-1">
            <Leaf className="w-3 h-3 text-green-600" />
            <span className="text-xs font-medium text-green-700">
              {product.sustainabilityScore}
            </span>
          </div>
        </div>

        {/* Stock Badge - Bottom Left */}
        <Badge className={`absolute bottom-2 left-2 ${stockBadge.color} text-white text-xs`}>
          {stockBadge.label}
        </Badge>
        
        {/* Out of Stock Overlay */}
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white font-semibold">
              {t.shop.product.outOfStock}
            </span>
          </div>
        )}

        {/* Quick Action Buttons - Show on Hover */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            size="icon"
            variant="secondary"
            className="h-10 w-10 rounded-full bg-white/90 hover:bg-white shadow-lg"
            onClick={handleQuickView}
          >
            <Eye className="w-4 h-4" />
          </Button>
          <Button
            size="icon"
            variant="secondary"
            className={`h-10 w-10 rounded-full shadow-lg ${isWishlisted ? "bg-red-50 text-red-500" : "bg-white/90 hover:bg-white"}`}
            onClick={handleWishlist}
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? "fill-red-500" : ""}`} />
          </Button>
        </div>
      </div>
      
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-1">
          <p className="text-sm text-gray-500">{product.brand}</p>
          {/* Rating */}
          {extProduct.rating && (
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
              <span className="text-xs font-medium">{extProduct.rating}</span>
            </div>
          )}
        </div>
        
        <Link href={`/nettbutikk/${product.id}`}>
          <h3 className="font-semibold text-gray-900 line-clamp-2 hover:text-green-600 transition-colors">
            {language === "no" ? product.nameNo : product.name}
          </h3>
        </Link>
        
        {/* Quick Specs */}
        {specs.length > 0 && (
          <p className="text-xs text-gray-500 mt-1 truncate">
            {specs.join(" • ")}
          </p>
        )}
        
        <div className="mt-2 flex items-baseline space-x-2">
          <span className="text-lg font-bold text-gray-900">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-gray-400 line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
        
        {/* CO2 Saved */}
        <div className="mt-2 flex items-center space-x-1 text-xs text-gray-500">
          <Leaf className="w-3 h-3 text-green-500" />
          <span>
            {t.shop.product.co2Saved}: {product.co2Saved.toFixed(1)} kg
          </span>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 flex gap-2">
        <Button
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          className="flex-1"
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          {language === "no" ? "Legg i kurv" : "Add to Cart"}
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={handleBuyNow}
          disabled={product.stock === 0}
          title={language === "no" ? "Kjøp nå" : "Buy Now"}
        >
          <Zap className="w-4 h-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
