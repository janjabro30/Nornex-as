"use client";

import React, { useState } from "react";
import { Search, X, ChevronDown, ChevronUp, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAppStore } from "@/store";
import { filterOptions, productBrands } from "@/lib/mock-data";
import type { ProductFilters, ProcessorType, RamSize, StorageSize, ScreenSize, GraphicsType, OperatingSystem, ConditionType, ProductCategory } from "@/types";

interface AdvancedFiltersProps {
  filters: ProductFilters;
  onFiltersChange: (filters: ProductFilters) => void;
  productCount: number;
  totalCount: number;
}

interface FilterSectionProps {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

function FilterSection({ title, isOpen, onToggle, children }: FilterSectionProps) {
  return (
    <div className="border-b border-gray-200 py-4">
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full text-left"
      >
        <span className="font-medium text-gray-900">{title}</span>
        {isOpen ? (
          <ChevronUp className="w-4 h-4 text-gray-500" />
        ) : (
          <ChevronDown className="w-4 h-4 text-gray-500" />
        )}
      </button>
      {isOpen && <div className="mt-3 space-y-2">{children}</div>}
    </div>
  );
}

interface CheckboxFilterProps {
  value: string;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

function CheckboxFilter({ value, label, checked, onChange }: CheckboxFilterProps) {
  return (
    <label className="flex items-center space-x-2 cursor-pointer group">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
      />
      <span className="text-sm text-gray-700 group-hover:text-gray-900">{label}</span>
    </label>
  );
}

export function AdvancedFilters({
  filters,
  onFiltersChange,
  productCount,
  totalCount,
}: AdvancedFiltersProps) {
  const { language } = useAppStore();
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    category: true,
    brand: true,
    processor: false,
    ram: false,
    storage: false,
    screen: false,
    graphics: false,
    os: false,
    condition: true,
    price: true,
    availability: true,
  });
  const [brandSearch, setBrandSearch] = useState("");
  const [showAllBrands, setShowAllBrands] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const getLabel = (option: { labelNo: string; labelEn: string }) => {
    return language === "no" ? option.labelNo : option.labelEn;
  };

  // Category filter
  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      onFiltersChange({ ...filters, category: category as ProductCategory });
    } else {
      const newFilters = { ...filters };
      delete newFilters.category;
      onFiltersChange(newFilters);
    }
  };

  // Brand filter
  const handleBrandChange = (brand: string, checked: boolean) => {
    const currentBrands = filters.brands || [];
    if (checked) {
      onFiltersChange({ ...filters, brands: [...currentBrands, brand] });
    } else {
      onFiltersChange({
        ...filters,
        brands: currentBrands.filter((b) => b !== brand),
      });
    }
  };

  // Multi-select array filter handler
  const handleArrayFilterChange = <T extends string>(
    key: keyof ProductFilters,
    value: T,
    checked: boolean
  ) => {
    const currentValues = (filters[key] as T[] | undefined) || [];
    if (checked) {
      onFiltersChange({ ...filters, [key]: [...currentValues, value] });
    } else {
      onFiltersChange({
        ...filters,
        [key]: currentValues.filter((v) => v !== value),
      });
    }
  };

  // Price filter
  const handlePriceChange = (type: "min" | "max", value: string) => {
    const numValue = value ? parseInt(value, 10) : undefined;
    if (type === "min") {
      onFiltersChange({ ...filters, minPrice: numValue });
    } else {
      onFiltersChange({ ...filters, maxPrice: numValue });
    }
  };

  // Stock filter
  const handleStockChange = (checked: boolean) => {
    onFiltersChange({ ...filters, inStock: checked || undefined });
  };

  // Clear all filters
  const clearFilters = () => {
    onFiltersChange({});
    setBrandSearch("");
  };

  // Get active filter count
  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.category) count++;
    if (filters.brands && filters.brands.length > 0) count += filters.brands.length;
    if (filters.processors && filters.processors.length > 0) count += filters.processors.length;
    if (filters.ramSizes && filters.ramSizes.length > 0) count += filters.ramSizes.length;
    if (filters.storageSizes && filters.storageSizes.length > 0) count += filters.storageSizes.length;
    if (filters.screenSizes && filters.screenSizes.length > 0) count += filters.screenSizes.length;
    if (filters.graphics && filters.graphics.length > 0) count += filters.graphics.length;
    if (filters.operatingSystems && filters.operatingSystems.length > 0) count += filters.operatingSystems.length;
    if (filters.conditions && filters.conditions.length > 0) count += filters.conditions.length;
    if (filters.minPrice !== undefined || filters.maxPrice !== undefined) count++;
    if (filters.inStock) count++;
    return count;
  };

  const filteredBrands = productBrands.filter((brand) =>
    brand.toLowerCase().includes(brandSearch.toLowerCase())
  );
  const displayedBrands = showAllBrands ? filteredBrands : filteredBrands.slice(0, 5);
  const activeFilterCount = getActiveFilterCount();

  const filterContent = (
    <div className="space-y-0">
      {/* Results count */}
      <div className="pb-4 border-b border-gray-200">
        <p className="text-sm text-gray-600">
          {language === "no"
            ? `Viser ${productCount} av ${totalCount} produkter`
            : `Showing ${productCount} of ${totalCount} products`}
        </p>
      </div>

      {/* Category Filter */}
      <FilterSection
        title={language === "no" ? "Kategori" : "Category"}
        isOpen={openSections.category}
        onToggle={() => toggleSection("category")}
      >
        {filterOptions.categories.map((cat) => (
          <CheckboxFilter
            key={cat.value}
            value={cat.value}
            label={getLabel(cat)}
            checked={filters.category === cat.value}
            onChange={(checked) => handleCategoryChange(cat.value, checked)}
          />
        ))}
      </FilterSection>

      {/* Brand Filter */}
      <FilterSection
        title={language === "no" ? "Merke" : "Brand"}
        isOpen={openSections.brand}
        onToggle={() => toggleSection("brand")}
      >
        <div className="relative mb-2">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            type="text"
            placeholder={language === "no" ? "Søk merker..." : "Search brands..."}
            value={brandSearch}
            onChange={(e) => setBrandSearch(e.target.value)}
            className="pl-8 h-8 text-sm"
          />
        </div>
        {displayedBrands.map((brand) => (
          <CheckboxFilter
            key={brand}
            value={brand}
            label={brand}
            checked={filters.brands?.includes(brand) || false}
            onChange={(checked) => handleBrandChange(brand, checked)}
          />
        ))}
        {filteredBrands.length > 5 && (
          <button
            onClick={() => setShowAllBrands(!showAllBrands)}
            className="text-sm text-green-600 hover:text-green-700 mt-2"
          >
            {showAllBrands
              ? language === "no" ? "Vis færre" : "Show less"
              : language === "no" ? `+ ${filteredBrands.length - 5} flere` : `+ ${filteredBrands.length - 5} more`}
          </button>
        )}
      </FilterSection>

      {/* Processor Filter */}
      <FilterSection
        title={language === "no" ? "Prosessor" : "Processor"}
        isOpen={openSections.processor}
        onToggle={() => toggleSection("processor")}
      >
        {filterOptions.processors.map((proc) => (
          <CheckboxFilter
            key={proc.value}
            value={proc.value}
            label={getLabel(proc)}
            checked={filters.processors?.includes(proc.value as ProcessorType) || false}
            onChange={(checked) => handleArrayFilterChange("processors", proc.value as ProcessorType, checked)}
          />
        ))}
      </FilterSection>

      {/* RAM Filter */}
      <FilterSection
        title={language === "no" ? "RAM (Minne)" : "RAM (Memory)"}
        isOpen={openSections.ram}
        onToggle={() => toggleSection("ram")}
      >
        {filterOptions.ramSizes.map((ram) => (
          <CheckboxFilter
            key={ram.value}
            value={ram.value}
            label={getLabel(ram)}
            checked={filters.ramSizes?.includes(ram.value as RamSize) || false}
            onChange={(checked) => handleArrayFilterChange("ramSizes", ram.value as RamSize, checked)}
          />
        ))}
      </FilterSection>

      {/* Storage Filter */}
      <FilterSection
        title={language === "no" ? "Lagring" : "Storage"}
        isOpen={openSections.storage}
        onToggle={() => toggleSection("storage")}
      >
        {filterOptions.storageSizes.map((storage) => (
          <CheckboxFilter
            key={storage.value}
            value={storage.value}
            label={getLabel(storage)}
            checked={filters.storageSizes?.includes(storage.value as StorageSize) || false}
            onChange={(checked) => handleArrayFilterChange("storageSizes", storage.value as StorageSize, checked)}
          />
        ))}
      </FilterSection>

      {/* Screen Size Filter */}
      <FilterSection
        title={language === "no" ? "Skjermstørrelse" : "Screen Size"}
        isOpen={openSections.screen}
        onToggle={() => toggleSection("screen")}
      >
        {filterOptions.screenSizes.map((size) => (
          <CheckboxFilter
            key={size.value}
            value={size.value}
            label={getLabel(size)}
            checked={filters.screenSizes?.includes(size.value as ScreenSize) || false}
            onChange={(checked) => handleArrayFilterChange("screenSizes", size.value as ScreenSize, checked)}
          />
        ))}
      </FilterSection>

      {/* Graphics Filter */}
      <FilterSection
        title={language === "no" ? "Grafikk" : "Graphics"}
        isOpen={openSections.graphics}
        onToggle={() => toggleSection("graphics")}
      >
        {filterOptions.graphics.map((gpu) => (
          <CheckboxFilter
            key={gpu.value}
            value={gpu.value}
            label={getLabel(gpu)}
            checked={filters.graphics?.includes(gpu.value as GraphicsType) || false}
            onChange={(checked) => handleArrayFilterChange("graphics", gpu.value as GraphicsType, checked)}
          />
        ))}
      </FilterSection>

      {/* OS Filter */}
      <FilterSection
        title={language === "no" ? "Operativsystem" : "Operating System"}
        isOpen={openSections.os}
        onToggle={() => toggleSection("os")}
      >
        {filterOptions.operatingSystems.map((os) => (
          <CheckboxFilter
            key={os.value}
            value={os.value}
            label={getLabel(os)}
            checked={filters.operatingSystems?.includes(os.value as OperatingSystem) || false}
            onChange={(checked) => handleArrayFilterChange("operatingSystems", os.value as OperatingSystem, checked)}
          />
        ))}
      </FilterSection>

      {/* Condition Filter */}
      <FilterSection
        title={language === "no" ? "Tilstand" : "Condition"}
        isOpen={openSections.condition}
        onToggle={() => toggleSection("condition")}
      >
        {filterOptions.conditions.map((condition) => (
          <CheckboxFilter
            key={condition.value}
            value={condition.value}
            label={getLabel(condition)}
            checked={filters.conditions?.includes(condition.value as ConditionType) || false}
            onChange={(checked) => handleArrayFilterChange("conditions", condition.value as ConditionType, checked)}
          />
        ))}
      </FilterSection>

      {/* Price Filter */}
      <FilterSection
        title={language === "no" ? "Pris" : "Price"}
        isOpen={openSections.price}
        onToggle={() => toggleSection("price")}
      >
        <div className="flex items-center space-x-2">
          <Input
            type="number"
            placeholder="Min"
            value={filters.minPrice || ""}
            onChange={(e) => handlePriceChange("min", e.target.value)}
            className="h-9 text-sm"
          />
          <span className="text-gray-400">-</span>
          <Input
            type="number"
            placeholder="Max"
            value={filters.maxPrice || ""}
            onChange={(e) => handlePriceChange("max", e.target.value)}
            className="h-9 text-sm"
          />
        </div>
        <p className="text-xs text-gray-500 mt-1">
          {language === "no" ? "Prisintervall i NOK" : "Price range in NOK"}
        </p>
      </FilterSection>

      {/* Availability Filter */}
      <FilterSection
        title={language === "no" ? "Tilgjengelighet" : "Availability"}
        isOpen={openSections.availability}
        onToggle={() => toggleSection("availability")}
      >
        <CheckboxFilter
          value="inStock"
          label={language === "no" ? "På lager" : "In Stock"}
          checked={filters.inStock || false}
          onChange={handleStockChange}
        />
      </FilterSection>

      {/* Clear Filters Button */}
      {activeFilterCount > 0 && (
        <div className="pt-4">
          <Button
            variant="outline"
            onClick={clearFilters}
            className="w-full"
          >
            <X className="w-4 h-4 mr-2" />
            {language === "no" ? "Nullstill filtre" : "Clear filters"}
            <Badge className="ml-2 bg-gray-200 text-gray-700">{activeFilterCount}</Badge>
          </Button>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-64 flex-shrink-0">
        <div className="bg-white rounded-lg shadow-sm border p-4 sticky top-24">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <SlidersHorizontal className="w-5 h-5 mr-2" />
            {language === "no" ? "Filtrer" : "Filter"}
          </h2>
          {filterContent}
        </div>
      </div>

      {/* Mobile Filter Button */}
      <div className="lg:hidden fixed bottom-4 left-1/2 transform -translate-x-1/2 z-40">
        <Button
          onClick={() => setIsMobileOpen(true)}
          className="shadow-lg"
        >
          <SlidersHorizontal className="w-4 h-4 mr-2" />
          {language === "no" ? "Filtrer" : "Filter"}
          {activeFilterCount > 0 && (
            <Badge className="ml-2 bg-white text-green-600">{activeFilterCount}</Badge>
          )}
        </Button>
      </div>

      {/* Mobile Filter Drawer */}
      {isMobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsMobileOpen(false)}
          />
          <div className="absolute left-0 top-0 bottom-0 w-80 max-w-full bg-white overflow-y-auto">
            <div className="sticky top-0 bg-white z-10 p-4 border-b flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                <SlidersHorizontal className="w-5 h-5 mr-2" />
                {language === "no" ? "Filtrer" : "Filter"}
              </h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileOpen(false)}
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
            <div className="p-4">{filterContent}</div>
            <div className="sticky bottom-0 bg-white border-t p-4">
              <Button
                className="w-full"
                onClick={() => setIsMobileOpen(false)}
              >
                {language === "no"
                  ? `Vis ${productCount} produkter`
                  : `Show ${productCount} products`}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
