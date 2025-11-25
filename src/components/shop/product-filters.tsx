"use client";

import React from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/store";
import { getTranslation } from "@/lib/translations";
import type { ProductFilters, ProductCategory, ProductGrade } from "@/types";

interface ProductFiltersProps {
  filters: ProductFilters;
  onFiltersChange: (filters: ProductFilters) => void;
  brands: string[];
}

export function ProductFiltersComponent({
  filters,
  onFiltersChange,
  brands,
}: ProductFiltersProps) {
  const { language } = useAppStore();
  const t = getTranslation(language);

  const categories: { value: ProductCategory | ""; label: string }[] = [
    { value: "", label: language === "no" ? "Alle kategorier" : "All Categories" },
    { value: "LAPTOPS", label: language === "no" ? "Bærbare" : "Laptops" },
    { value: "DESKTOPS", label: language === "no" ? "Stasjonære" : "Desktops" },
    { value: "MONITORS", label: language === "no" ? "Skjermer" : "Monitors" },
    { value: "PHONES", label: language === "no" ? "Telefoner" : "Phones" },
    { value: "TABLETS", label: language === "no" ? "Nettbrett" : "Tablets" },
    { value: "ACCESSORIES", label: language === "no" ? "Tilbehør" : "Accessories" },
    { value: "NETWORKING", label: language === "no" ? "Nettverk" : "Networking" },
    { value: "STORAGE", label: language === "no" ? "Lagring" : "Storage" },
    { value: "PRINTERS", label: language === "no" ? "Skrivere" : "Printers" },
    { value: "OTHER", label: language === "no" ? "Annet" : "Other" },
  ];

  const grades: { value: ProductGrade | ""; label: string }[] = [
    { value: "", label: language === "no" ? "Alle grader" : "All Grades" },
    { value: "A", label: t.shop.grades.A },
    { value: "B", label: t.shop.grades.B },
    { value: "C", label: t.shop.grades.C },
    { value: "NEW", label: t.shop.grades.NEW },
  ];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFiltersChange({ ...filters, search: e.target.value });
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFiltersChange({
      ...filters,
      category: (e.target.value as ProductCategory) || undefined,
    });
  };

  const handleGradeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFiltersChange({
      ...filters,
      grade: (e.target.value as ProductGrade) || undefined,
    });
  };

  const handleBrandChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFiltersChange({
      ...filters,
      brand: e.target.value || undefined,
    });
  };

  const clearFilters = () => {
    onFiltersChange({});
  };

  const hasActiveFilters =
    filters.search ||
    filters.category ||
    filters.grade ||
    filters.brand ||
    filters.minPrice ||
    filters.maxPrice;

  return (
    <div className="bg-white rounded-lg shadow-sm border p-4 space-y-4">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          type="text"
          placeholder={t.shop.filters.search}
          value={filters.search || ""}
          onChange={handleSearchChange}
          className="pl-10"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t.shop.filters.category}
          </label>
          <select
            value={filters.category || ""}
            onChange={handleCategoryChange}
            className="w-full h-10 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
          >
            {categories.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        {/* Grade */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t.shop.filters.grade}
          </label>
          <select
            value={filters.grade || ""}
            onChange={handleGradeChange}
            className="w-full h-10 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
          >
            {grades.map((grade) => (
              <option key={grade.value} value={grade.value}>
                {grade.label}
              </option>
            ))}
          </select>
        </div>

        {/* Brand */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t.shop.filters.brand}
          </label>
          <select
            value={filters.brand || ""}
            onChange={handleBrandChange}
            className="w-full h-10 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
          >
            <option value="">
              {language === "no" ? "Alle merker" : "All Brands"}
            </option>
            {brands.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </div>

        {/* Clear Filters */}
        <div className="flex items-end">
          {hasActiveFilters && (
            <Button
              variant="outline"
              onClick={clearFilters}
              className="w-full"
            >
              <X className="w-4 h-4 mr-2" />
              {t.shop.filters.clearFilters}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
