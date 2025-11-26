"use client";

import React from "react";
import { X, Grid, List } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/store";
import { filterOptions, productBrands } from "@/lib/mock-data";
import type { ProductFilters, SortOption, ViewMode } from "@/types";

interface ActiveFilterBadgesProps {
  filters: ProductFilters;
  onFiltersChange: (filters: ProductFilters) => void;
}

export function ActiveFilterBadges({ filters, onFiltersChange }: ActiveFilterBadgesProps) {
  const { language } = useAppStore();

  const getLabel = (option: { labelNo: string; labelEn: string }) => {
    return language === "no" ? option.labelNo : option.labelEn;
  };

  const removeFilter = (key: string, value?: string) => {
    const newFilters = { ...filters };
    
    if (value) {
      // Remove from array
      const array = newFilters[key as keyof ProductFilters] as string[] | undefined;
      if (array) {
        const newArray = array.filter(v => v !== value);
        if (newArray.length === 0) {
          delete newFilters[key as keyof ProductFilters];
        } else {
          (newFilters as Record<string, string[]>)[key] = newArray;
        }
      }
    } else {
      // Remove entire filter
      delete newFilters[key as keyof ProductFilters];
    }
    
    onFiltersChange(newFilters);
  };

  const badges: { key: string; value?: string; label: string }[] = [];

  // Category
  if (filters.category) {
    const cat = filterOptions.categories.find(c => c.value === filters.category);
    if (cat) {
      badges.push({ key: "category", label: getLabel(cat) });
    }
  }

  // Brands
  if (filters.brands) {
    filters.brands.forEach(brand => {
      badges.push({ key: "brands", value: brand, label: brand });
    });
  }

  // Processors
  if (filters.processors) {
    filters.processors.forEach(proc => {
      const option = filterOptions.processors.find(p => p.value === proc);
      if (option) {
        badges.push({ key: "processors", value: proc, label: getLabel(option) });
      }
    });
  }

  // RAM
  if (filters.ramSizes) {
    filters.ramSizes.forEach(ram => {
      const option = filterOptions.ramSizes.find(r => r.value === ram);
      if (option) {
        badges.push({ key: "ramSizes", value: ram, label: getLabel(option) });
      }
    });
  }

  // Storage
  if (filters.storageSizes) {
    filters.storageSizes.forEach(storage => {
      const option = filterOptions.storageSizes.find(s => s.value === storage);
      if (option) {
        badges.push({ key: "storageSizes", value: storage, label: getLabel(option) });
      }
    });
  }

  // Screen Sizes
  if (filters.screenSizes) {
    filters.screenSizes.forEach(size => {
      const option = filterOptions.screenSizes.find(s => s.value === size);
      if (option) {
        badges.push({ key: "screenSizes", value: size, label: getLabel(option) });
      }
    });
  }

  // Graphics
  if (filters.graphics) {
    filters.graphics.forEach(gpu => {
      const option = filterOptions.graphics.find(g => g.value === gpu);
      if (option) {
        badges.push({ key: "graphics", value: gpu, label: getLabel(option) });
      }
    });
  }

  // Operating Systems
  if (filters.operatingSystems) {
    filters.operatingSystems.forEach(os => {
      const option = filterOptions.operatingSystems.find(o => o.value === os);
      if (option) {
        badges.push({ key: "operatingSystems", value: os, label: getLabel(option) });
      }
    });
  }

  // Conditions
  if (filters.conditions) {
    filters.conditions.forEach(condition => {
      const option = filterOptions.conditions.find(c => c.value === condition);
      if (option) {
        badges.push({ key: "conditions", value: condition, label: getLabel(option) });
      }
    });
  }

  // Price
  if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
    const min = filters.minPrice || 0;
    const max = filters.maxPrice || "∞";
    badges.push({ key: "price", label: `${min} - ${max} kr` });
  }

  // In Stock
  if (filters.inStock) {
    badges.push({ key: "inStock", label: language === "no" ? "På lager" : "In Stock" });
  }

  if (badges.length === 0) return null;

  const clearPriceFilter = () => {
    const newFilters = { ...filters };
    delete newFilters.minPrice;
    delete newFilters.maxPrice;
    onFiltersChange(newFilters);
  };

  return (
    <div className="flex flex-wrap items-center gap-2 mb-4">
      <span className="text-sm text-gray-500 mr-1">
        {language === "no" ? "Aktive filtre:" : "Active filters:"}
      </span>
      {badges.map((badge, index) => (
        <Badge
          key={`${badge.key}-${badge.value || index}`}
          variant="secondary"
          className="flex items-center gap-1 px-2 py-1 bg-green-100 text-green-800 hover:bg-green-200"
        >
          {badge.label}
          <button
            onClick={() => {
              if (badge.key === "price") {
                clearPriceFilter();
              } else {
                removeFilter(badge.key, badge.value);
              }
            }}
            className="ml-1 hover:bg-green-300 rounded-full p-0.5"
          >
            <X className="w-3 h-3" />
          </button>
        </Badge>
      ))}
      {badges.length > 1 && (
        <button
          onClick={() => onFiltersChange({})}
          className="text-sm text-green-600 hover:text-green-700 underline ml-2"
        >
          {language === "no" ? "Fjern alle" : "Clear all"}
        </button>
      )}
    </div>
  );
}

interface SortingControlsProps {
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  perPage: number;
  onPerPageChange: (perPage: number) => void;
}

export function SortingControls({
  sortBy,
  onSortChange,
  viewMode,
  onViewModeChange,
  perPage,
  onPerPageChange,
}: SortingControlsProps) {
  const { language } = useAppStore();

  const getLabel = (option: { labelNo: string; labelEn: string }) => {
    return language === "no" ? option.labelNo : option.labelEn;
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
      <div className="flex items-center gap-4">
        {/* Sort Dropdown */}
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-600">
            {language === "no" ? "Sorter:" : "Sort:"}
          </label>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as SortOption)}
            className="h-9 px-3 rounded-md border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
          >
            {filterOptions.sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {getLabel(option)}
              </option>
            ))}
          </select>
        </div>

        {/* Per Page Dropdown */}
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-600">
            {language === "no" ? "Vis:" : "Show:"}
          </label>
          <select
            value={perPage}
            onChange={(e) => onPerPageChange(parseInt(e.target.value, 10))}
            className="h-9 px-3 rounded-md border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
          >
            <option value={12}>12</option>
            <option value={24}>24</option>
            <option value={48}>48</option>
            <option value={96}>96</option>
          </select>
        </div>
      </div>

      {/* View Mode Toggle */}
      <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
        <Button
          variant={viewMode === "grid" ? "default" : "ghost"}
          size="icon"
          className="h-8 w-8"
          onClick={() => onViewModeChange("grid")}
        >
          <Grid className="w-4 h-4" />
        </Button>
        <Button
          variant={viewMode === "list" ? "default" : "ghost"}
          size="icon"
          className="h-8 w-8"
          onClick={() => onViewModeChange("list")}
        >
          <List className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
