"use client";

import React, { useState, useMemo } from "react";
import { ProductCard, ProductFiltersComponent } from "@/components/shop";
import { useAppStore } from "@/store";
import { getTranslation } from "@/lib/translations";
import { mockProducts, productBrands } from "@/lib/mock-data";
import type { ProductFilters } from "@/types";

export default function ShopPage() {
  const { language } = useAppStore();
  const t = getTranslation(language);
  const [filters, setFilters] = useState<ProductFilters>({});

  const filteredProducts = useMemo(() => {
    return mockProducts.filter((product) => {
      // Category filter
      if (filters.category && product.category !== filters.category) {
        return false;
      }
      // Grade filter
      if (filters.grade && product.grade !== filters.grade) {
        return false;
      }
      // Brand filter
      if (filters.brand && product.brand !== filters.brand) {
        return false;
      }
      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const nameMatch =
          product.name.toLowerCase().includes(searchLower) ||
          product.nameNo.toLowerCase().includes(searchLower);
        const brandMatch = product.brand.toLowerCase().includes(searchLower);
        const modelMatch = product.model?.toLowerCase().includes(searchLower);
        if (!nameMatch && !brandMatch && !modelMatch) {
          return false;
        }
      }
      // Price filter
      if (filters.minPrice && product.price < filters.minPrice) {
        return false;
      }
      if (filters.maxPrice && product.price > filters.maxPrice) {
        return false;
      }
      // Stock filter
      if (filters.inStock && product.stock === 0) {
        return false;
      }
      return true;
    });
  }, [filters]);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Page Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-gray-900">{t.shop.title}</h1>
          <p className="text-gray-600 mt-2">
            {language === "no"
              ? `${filteredProducts.length} produkter funnet`
              : `${filteredProducts.length} products found`}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Filters */}
        <div className="mb-8">
          <ProductFiltersComponent
            filters={filters}
            onFiltersChange={setFilters}
            brands={productBrands}
          />
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">
              {language === "no"
                ? "Ingen produkter funnet med disse filtrene."
                : "No products found with these filters."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
