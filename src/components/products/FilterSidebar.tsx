'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp, X } from 'lucide-react'
import { ProductFilters } from '@/types'

interface FilterSidebarProps {
  filters: ProductFilters
  onFilterChange: (filters: ProductFilters) => void
  categories?: { slug: string; name: string }[]
  brands?: string[]
}

export function FilterSidebar({
  filters,
  onFilterChange,
  categories = [],
  brands = [],
}: FilterSidebarProps) {
  const [expandedSections, setExpandedSections] = useState<string[]>([
    'category',
    'price',
    'brand',
    'condition',
  ])

  const toggleSection = (key: string) => {
    setExpandedSections((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    )
  }

  const updateFilter = (key: string, value: unknown) => {
    onFilterChange({ ...filters, [key]: value })
  }

  const clearFilters = () => {
    onFilterChange({})
  }

  const hasActiveFilters = Object.keys(filters).some(
    (key) => filters[key as keyof ProductFilters] !== undefined
  )

  return (
    <aside className="w-full lg:w-64 shrink-0">
      <div className="sticky top-24">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              <X className="w-4 h-4" />
              Clear All
            </button>
          )}
        </div>

        {/* Category Filter */}
        {categories.length > 0 && (
          <FilterGroup
            title="Category"
            isExpanded={expandedSections.includes('category')}
            onToggle={() => toggleSection('category')}
          >
            <div className="space-y-2">
              {categories.map((cat) => (
                <label key={cat.slug} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="category"
                    value={cat.slug}
                    checked={filters.category === cat.slug}
                    onChange={(e) => updateFilter('category', e.target.value)}
                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{cat.name}</span>
                </label>
              ))}
            </div>
          </FilterGroup>
        )}

        {/* Price Range */}
        <FilterGroup
          title="Price Range"
          isExpanded={expandedSections.includes('price')}
          onToggle={() => toggleSection('price')}
        >
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <input
                type="number"
                placeholder="Min"
                value={filters.minPrice || ''}
                onChange={(e) =>
                  updateFilter('minPrice', e.target.value ? Number(e.target.value) : undefined)
                }
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-gray-500">-</span>
              <input
                type="number"
                placeholder="Max"
                value={filters.maxPrice || ''}
                onChange={(e) =>
                  updateFilter('maxPrice', e.target.value ? Number(e.target.value) : undefined)
                }
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </FilterGroup>

        {/* Brand Filter */}
        {brands.length > 0 && (
          <FilterGroup
            title="Brand"
            isExpanded={expandedSections.includes('brand')}
            onToggle={() => toggleSection('brand')}
          >
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {brands.map((brand) => (
                <label key={brand} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.brand?.includes(brand) || false}
                    onChange={(e) => {
                      const currentBrands = filters.brand || []
                      const newBrands = e.target.checked
                        ? [...currentBrands, brand]
                        : currentBrands.filter((b) => b !== brand)
                      updateFilter('brand', newBrands.length > 0 ? newBrands : undefined)
                    }}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{brand}</span>
                </label>
              ))}
            </div>
          </FilterGroup>
        )}

        {/* Condition Filter */}
        <FilterGroup
          title="Condition"
          isExpanded={expandedSections.includes('condition')}
          onToggle={() => toggleSection('condition')}
        >
          <div className="space-y-2">
            {['new', 'refurbished', 'used'].map((condition) => (
              <label key={condition} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.condition?.includes(condition) || false}
                  onChange={(e) => {
                    const currentConditions = filters.condition || []
                    const newConditions = e.target.checked
                      ? [...currentConditions, condition]
                      : currentConditions.filter((c) => c !== condition)
                    updateFilter('condition', newConditions.length > 0 ? newConditions : undefined)
                  }}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700 capitalize">{condition}</span>
              </label>
            ))}
          </div>
        </FilterGroup>

        {/* Rating Filter */}
        <FilterGroup
          title="Rating"
          isExpanded={expandedSections.includes('rating')}
          onToggle={() => toggleSection('rating')}
        >
          <div className="space-y-2">
            {[4, 3, 2, 1].map((rating) => (
              <label key={rating} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="rating"
                  value={rating}
                  checked={filters.rating === rating}
                  onChange={(e) => updateFilter('rating', Number(e.target.value))}
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">{rating}+ Stars</span>
              </label>
            ))}
          </div>
        </FilterGroup>

        {/* In Stock Filter */}
        <FilterGroup
          title="Availability"
          isExpanded={expandedSections.includes('availability')}
          onToggle={() => toggleSection('availability')}
        >
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.inStock || false}
              onChange={(e) => updateFilter('inStock', e.target.checked || undefined)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">In Stock Only</span>
          </label>
        </FilterGroup>
      </div>
    </aside>
  )
}

interface FilterGroupProps {
  title: string
  isExpanded: boolean
  onToggle: () => void
  children: React.ReactNode
}

function FilterGroup({ title, isExpanded, onToggle, children }: FilterGroupProps) {
  return (
    <div className="border-b border-gray-200 py-4">
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full text-left"
      >
        <span className="font-medium text-gray-900">{title}</span>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-gray-500" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-500" />
        )}
      </button>
      {isExpanded && <div className="mt-3">{children}</div>}
    </div>
  )
}
