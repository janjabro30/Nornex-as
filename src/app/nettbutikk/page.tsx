"use client";

import React, { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { 
  ProductCard, 
  AdvancedFilters, 
  ActiveFilterBadges, 
  SortingControls,
  QuickViewModal 
} from "@/components/shop";
import { useAppStore } from "@/store";
import { getTranslation } from "@/lib/translations";
import { mockProducts } from "@/lib/mock-data";
import type { ProductFilters, SortOption, ViewMode, Product } from "@/types";
import type { ExtendedProduct } from "@/lib/mock-data";

export default function ShopPage() {
  const { language } = useAppStore();
  const t = getTranslation(language);
  const [filters, setFilters] = useState<ProductFilters>({});
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [perPage, setPerPage] = useState(12);
  const [searchQuery, setSearchQuery] = useState("");
  const [quickViewProduct, setQuickViewProduct] = useState<Product | ExtendedProduct | null>(null);

  const filteredProducts = useMemo(() => {
    let products = [...mockProducts];

    // Search filter
    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase();
      products = products.filter((product) => {
        const nameMatch =
          product.name.toLowerCase().includes(searchLower) ||
          product.nameNo.toLowerCase().includes(searchLower);
        const brandMatch = product.brand.toLowerCase().includes(searchLower);
        const modelMatch = product.model?.toLowerCase().includes(searchLower);
        const skuMatch = product.sku.toLowerCase().includes(searchLower);
        return nameMatch || brandMatch || modelMatch || skuMatch;
      });
    }

    // Category filter
    if (filters.category) {
      products = products.filter((product) => product.category === filters.category);
    }

    // Brands filter (multiple)
    if (filters.brands && filters.brands.length > 0) {
      products = products.filter((product) => filters.brands!.includes(product.brand));
    }

    // Grade filter (for backward compatibility)
    if (filters.grade) {
      products = products.filter((product) => product.grade === filters.grade);
    }

    // Processor filter
    if (filters.processors && filters.processors.length > 0) {
      products = products.filter((product) => {
        const extProduct = product as ExtendedProduct;
        return extProduct.processorType && filters.processors!.includes(extProduct.processorType as typeof filters.processors[number]);
      });
    }

    // RAM filter
    if (filters.ramSizes && filters.ramSizes.length > 0) {
      products = products.filter((product) => {
        const extProduct = product as ExtendedProduct;
        return extProduct.ramSize && filters.ramSizes!.includes(extProduct.ramSize as typeof filters.ramSizes[number]);
      });
    }

    // Storage filter
    if (filters.storageSizes && filters.storageSizes.length > 0) {
      products = products.filter((product) => {
        const extProduct = product as ExtendedProduct;
        return extProduct.storageSize && filters.storageSizes!.includes(extProduct.storageSize as typeof filters.storageSizes[number]);
      });
    }

    // Screen size filter
    if (filters.screenSizes && filters.screenSizes.length > 0) {
      products = products.filter((product) => {
        const extProduct = product as ExtendedProduct;
        return extProduct.screenSize && filters.screenSizes!.includes(extProduct.screenSize as typeof filters.screenSizes[number]);
      });
    }

    // Graphics filter
    if (filters.graphics && filters.graphics.length > 0) {
      products = products.filter((product) => {
        const extProduct = product as ExtendedProduct;
        return extProduct.graphicsType && filters.graphics!.includes(extProduct.graphicsType as typeof filters.graphics[number]);
      });
    }

    // OS filter
    if (filters.operatingSystems && filters.operatingSystems.length > 0) {
      products = products.filter((product) => {
        const extProduct = product as ExtendedProduct;
        return extProduct.osType && filters.operatingSystems!.includes(extProduct.osType as typeof filters.operatingSystems[number]);
      });
    }

    // Condition filter
    if (filters.conditions && filters.conditions.length > 0) {
      products = products.filter((product) => {
        const extProduct = product as ExtendedProduct;
        return extProduct.condition && filters.conditions!.includes(extProduct.condition as typeof filters.conditions[number]);
      });
    }

    // Price filter
    if (filters.minPrice !== undefined) {
      products = products.filter((product) => product.price >= filters.minPrice!);
    }
    if (filters.maxPrice !== undefined) {
      products = products.filter((product) => product.price <= filters.maxPrice!);
    }

    // Stock filter
    if (filters.inStock) {
      products = products.filter((product) => product.stock > 0);
    }

    // Sorting
    switch (sortBy) {
      case "newest":
        products.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case "price-low":
        products.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        products.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        products.sort((a, b) => (language === "no" ? a.nameNo : a.name).localeCompare(language === "no" ? b.nameNo : b.name));
        break;
      case "name-desc":
        products.sort((a, b) => (language === "no" ? b.nameNo : b.name).localeCompare(language === "no" ? a.nameNo : a.name));
        break;
      case "popular":
        products.sort((a, b) => {
          const aReviews = (a as ExtendedProduct).reviewCount || 0;
          const bReviews = (b as ExtendedProduct).reviewCount || 0;
          return bReviews - aReviews;
        });
        break;
      case "rating":
        products.sort((a, b) => {
          const aRating = (a as ExtendedProduct).rating || 0;
          const bRating = (b as ExtendedProduct).rating || 0;
          return bRating - aRating;
        });
        break;
    }

    return products;
  }, [filters, sortBy, searchQuery, language]);

  const displayedProducts = filteredProducts.slice(0, perPage);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Page Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-gray-900">{t.shop.title}</h1>
          <p className="text-gray-600 mt-2">
            {language === "no"
              ? "Bærekraftig IT-utstyr med garanti"
              : "Sustainable IT equipment with warranty"}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-xl">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder={language === "no" ? "Søk produkter, merker, modeller..." : "Search products, brands, models..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 text-base"
            />
          </div>
        </div>

        {/* Active Filter Badges */}
        <ActiveFilterBadges filters={filters} onFiltersChange={setFilters} />

        {/* Sorting and View Controls */}
        <SortingControls
          sortBy={sortBy}
          onSortChange={setSortBy}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          perPage={perPage}
          onPerPageChange={setPerPage}
        />

        {/* Main Content */}
        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <AdvancedFilters
            filters={filters}
            onFiltersChange={setFilters}
            productCount={filteredProducts.length}
            totalCount={mockProducts.length}
          />

          {/* Products Grid/List */}
          <div className="flex-1">
            {displayedProducts.length > 0 ? (
              <div className={
                viewMode === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                  : "flex flex-col gap-4"
              }>
                {displayedProducts.map((product) => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    viewMode={viewMode}
                    onQuickView={setQuickViewProduct}
                  />
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

            {/* Load More / Pagination */}
            {filteredProducts.length > perPage && (
              <div className="mt-8 text-center">
                <p className="text-sm text-gray-500 mb-4">
                  {language === "no"
                    ? `Viser ${displayedProducts.length} av ${filteredProducts.length} produkter`
                    : `Showing ${displayedProducts.length} of ${filteredProducts.length} products`}
                </p>
                <button
                  onClick={() => setPerPage(perPage + 12)}
                  className="text-green-600 hover:text-green-700 font-medium"
                >
                  {language === "no" ? "Last flere produkter →" : "Load more products →"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
}
