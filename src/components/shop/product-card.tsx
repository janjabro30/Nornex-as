"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCartStore, useAppStore } from "@/store";
import { formatPrice } from "@/lib/utils";
import { getTranslation } from "@/lib/translations";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCartStore();
  const { language } = useAppStore();
  const t = getTranslation(language);

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
    <Card className="group overflow-hidden transition-all hover:shadow-lg">
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
        {/* Grade Badge */}
        <Badge
          className={`absolute top-2 left-2 ${gradeColors[product.grade]} text-white`}
        >
          {t.shop.grades[product.grade]}
        </Badge>
        {/* Sustainability Score */}
        <div className="absolute top-2 right-2 flex items-center space-x-1 bg-white/90 rounded-full px-2 py-1">
          <Leaf className="w-3 h-3 text-green-600" />
          <span className="text-xs font-medium text-green-700">
            {product.sustainabilityScore}
          </span>
        </div>
        {/* Out of Stock Overlay */}
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white font-semibold">
              {t.shop.product.outOfStock}
            </span>
          </div>
        )}
      </div>
      <CardContent className="p-4">
        <Link href={`/nettbutikk/${product.id}`}>
          <h3 className="font-semibold text-gray-900 line-clamp-2 hover:text-green-600 transition-colors">
            {language === "no" ? product.nameNo : product.name}
          </h3>
        </Link>
        <p className="text-sm text-gray-500 mt-1">{product.brand}</p>
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
      <CardFooter className="p-4 pt-0">
        <Button
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          className="w-full"
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          {t.shop.product.addToCart}
        </Button>
      </CardFooter>
    </Card>
  );
}
