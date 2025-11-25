'use client'

import { useState, useMemo } from 'react'
import { SlidersHorizontal, ChevronDown } from 'lucide-react'
import { ProductGrid, FilterSidebar } from '@/components/products'
import { Button } from '@/components/ui'
import { ProductFilters, Product } from '@/types'

// Mock data for demonstration
const mockProducts: Product[] = [
  {
    id: '1',
    sku: 'LAP-001',
    categoryId: 'laptops',
    brand: 'Dell',
    price: 12999,
    salePrice: 9999,
    cost: 8000,
    stock: 15,
    condition: 'new',
    featured: true,
    active: true,
    rating: 4.5,
    reviewCount: 23,
    specs: { processor: 'Intel i7', ram: '16GB', storage: '512GB SSD' },
    createdAt: new Date(),
    updatedAt: new Date(),
    translations: [
      {
        id: 't1',
        productId: '1',
        language: 'en',
        name: 'Dell XPS 15 Laptop',
        description: 'Powerful laptop with stunning display',
        shortDescription: '15.6" display, Intel i7, 16GB RAM',
        metaTitle: 'Dell XPS 15 Laptop',
        metaDescription: 'Buy Dell XPS 15 at Nornex AS',
      },
    ],
    images: [
      { id: 'img1', productId: '1', url: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500', alt: 'Dell XPS 15', sortOrder: 0 },
    ],
  },
  {
    id: '2',
    sku: 'PH-001',
    categoryId: 'smartphones',
    brand: 'Apple',
    price: 14999,
    salePrice: null,
    cost: 12000,
    stock: 25,
    condition: 'new',
    featured: true,
    active: true,
    rating: 4.8,
    reviewCount: 156,
    specs: { storage: '256GB', display: '6.7"', camera: '48MP' },
    createdAt: new Date(),
    updatedAt: new Date(),
    translations: [
      {
        id: 't2',
        productId: '2',
        language: 'en',
        name: 'iPhone 15 Pro Max',
        description: 'The most powerful iPhone ever',
        shortDescription: '6.7" Super Retina XDR, A17 Pro chip',
        metaTitle: 'iPhone 15 Pro Max',
        metaDescription: 'Buy iPhone 15 Pro Max at Nornex AS',
      },
    ],
    images: [
      { id: 'img2', productId: '2', url: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500', alt: 'iPhone 15 Pro Max', sortOrder: 0 },
    ],
  },
  {
    id: '3',
    sku: 'GPU-001',
    categoryId: 'components',
    brand: 'NVIDIA',
    price: 18999,
    salePrice: 16999,
    cost: 14000,
    stock: 8,
    condition: 'new',
    featured: false,
    active: true,
    rating: 4.9,
    reviewCount: 89,
    specs: { vram: '24GB', cuda_cores: '16384', power: '450W' },
    createdAt: new Date(),
    updatedAt: new Date(),
    translations: [
      {
        id: 't3',
        productId: '3',
        language: 'en',
        name: 'NVIDIA RTX 4090 Graphics Card',
        description: 'Ultimate gaming and AI performance',
        shortDescription: '24GB GDDR6X, Ray Tracing, DLSS 3',
        metaTitle: 'NVIDIA RTX 4090',
        metaDescription: 'Buy NVIDIA RTX 4090 at Nornex AS',
      },
    ],
    images: [
      { id: 'img3', productId: '3', url: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=500', alt: 'NVIDIA RTX 4090', sortOrder: 0 },
    ],
  },
  {
    id: '4',
    sku: 'KB-001',
    categoryId: 'peripherals',
    brand: 'Logitech',
    price: 1499,
    salePrice: null,
    cost: 1000,
    stock: 50,
    condition: 'new',
    featured: false,
    active: true,
    rating: 4.6,
    reviewCount: 234,
    specs: { type: 'Mechanical', switches: 'GX Blue', backlight: 'RGB' },
    createdAt: new Date(),
    updatedAt: new Date(),
    translations: [
      {
        id: 't4',
        productId: '4',
        language: 'en',
        name: 'Logitech G Pro Mechanical Keyboard',
        description: 'Pro-grade gaming keyboard',
        shortDescription: 'Mechanical switches, RGB lighting',
        metaTitle: 'Logitech G Pro Keyboard',
        metaDescription: 'Buy Logitech G Pro at Nornex AS',
      },
    ],
    images: [
      { id: 'img4', productId: '4', url: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=500', alt: 'Logitech G Pro', sortOrder: 0 },
    ],
  },
  {
    id: '5',
    sku: 'MON-001',
    categoryId: 'peripherals',
    brand: 'Samsung',
    price: 5999,
    salePrice: 4999,
    cost: 4000,
    stock: 12,
    condition: 'new',
    featured: true,
    active: true,
    rating: 4.7,
    reviewCount: 67,
    specs: { size: '27"', resolution: '4K', refresh_rate: '144Hz' },
    createdAt: new Date(),
    updatedAt: new Date(),
    translations: [
      {
        id: 't5',
        productId: '5',
        language: 'en',
        name: 'Samsung Odyssey G7 Monitor',
        description: '27" curved gaming monitor',
        shortDescription: '4K, 144Hz, 1ms response time',
        metaTitle: 'Samsung Odyssey G7',
        metaDescription: 'Buy Samsung Odyssey G7 at Nornex AS',
      },
    ],
    images: [
      { id: 'img5', productId: '5', url: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500', alt: 'Samsung Odyssey G7', sortOrder: 0 },
    ],
  },
  {
    id: '6',
    sku: 'LAP-002',
    categoryId: 'laptops',
    brand: 'Apple',
    price: 24999,
    salePrice: null,
    cost: 20000,
    stock: 5,
    condition: 'new',
    featured: true,
    active: true,
    rating: 4.9,
    reviewCount: 312,
    specs: { chip: 'M3 Max', ram: '36GB', storage: '1TB SSD' },
    createdAt: new Date(),
    updatedAt: new Date(),
    translations: [
      {
        id: 't6',
        productId: '6',
        language: 'en',
        name: 'MacBook Pro 16" M3 Max',
        description: 'The most powerful MacBook ever',
        shortDescription: 'M3 Max chip, 36GB RAM, 1TB SSD',
        metaTitle: 'MacBook Pro 16 M3 Max',
        metaDescription: 'Buy MacBook Pro 16" M3 Max at Nornex AS',
      },
    ],
    images: [
      { id: 'img6', productId: '6', url: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500', alt: 'MacBook Pro 16', sortOrder: 0 },
    ],
  },
  {
    id: '7',
    sku: 'CPU-001',
    categoryId: 'components',
    brand: 'AMD',
    price: 6999,
    salePrice: 5999,
    cost: 5000,
    stock: 20,
    condition: 'new',
    featured: false,
    active: true,
    rating: 4.8,
    reviewCount: 145,
    specs: { cores: '16', threads: '32', clock: '5.7GHz' },
    createdAt: new Date(),
    updatedAt: new Date(),
    translations: [
      {
        id: 't7',
        productId: '7',
        language: 'en',
        name: 'AMD Ryzen 9 7950X Processor',
        description: 'Ultimate desktop processor',
        shortDescription: '16 cores, 32 threads, 5.7GHz',
        metaTitle: 'AMD Ryzen 9 7950X',
        metaDescription: 'Buy AMD Ryzen 9 7950X at Nornex AS',
      },
    ],
    images: [
      { id: 'img7', productId: '7', url: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=500', alt: 'AMD Ryzen 9 7950X', sortOrder: 0 },
    ],
  },
  {
    id: '8',
    sku: 'REF-001',
    categoryId: 'laptops',
    brand: 'HP',
    price: 4999,
    salePrice: 3499,
    cost: 2500,
    stock: 8,
    condition: 'refurbished',
    featured: false,
    active: true,
    rating: 4.2,
    reviewCount: 34,
    specs: { processor: 'Intel i5', ram: '8GB', storage: '256GB SSD' },
    createdAt: new Date(),
    updatedAt: new Date(),
    translations: [
      {
        id: 't8',
        productId: '8',
        language: 'en',
        name: 'HP EliteBook 840 G6 (Refurbished)',
        description: 'Business laptop in excellent condition',
        shortDescription: 'Refurbished, 14" display, Intel i5',
        metaTitle: 'HP EliteBook 840 G6 Refurbished',
        metaDescription: 'Buy HP EliteBook 840 G6 Refurbished at Nornex AS',
      },
    ],
    images: [
      { id: 'img8', productId: '8', url: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=500', alt: 'HP EliteBook 840', sortOrder: 0 },
    ],
  },
]

const categories = [
  { slug: 'laptops', name: 'Laptops & Computers' },
  { slug: 'smartphones', name: 'Smartphones & Tablets' },
  { slug: 'components', name: 'Computer Components' },
  { slug: 'peripherals', name: 'Peripherals' },
  { slug: 'networking', name: 'Networking Equipment' },
  { slug: 'repair-parts', name: 'Repair Parts' },
]

const brands = ['Apple', 'Dell', 'HP', 'Samsung', 'NVIDIA', 'AMD', 'Logitech', 'ASUS']

const sortOptions = [
  { label: 'Newest', value: 'newest' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Best Rating', value: 'rating' },
  { label: 'Most Popular', value: 'popular' },
]

export default function ProductsPage() {
  const [filters, setFilters] = useState<ProductFilters>({})
  const [sortBy, setSortBy] = useState('newest')
  const [showFilters, setShowFilters] = useState(false)

  const filteredProducts = useMemo(() => {
    let result = [...mockProducts]

    // Apply filters
    if (filters.category) {
      result = result.filter((p) => p.categoryId === filters.category)
    }
    if (filters.minPrice) {
      result = result.filter((p) => (p.salePrice || p.price) >= filters.minPrice!)
    }
    if (filters.maxPrice) {
      result = result.filter((p) => (p.salePrice || p.price) <= filters.maxPrice!)
    }
    if (filters.brand && filters.brand.length > 0) {
      result = result.filter((p) => p.brand && filters.brand!.includes(p.brand))
    }
    if (filters.condition && filters.condition.length > 0) {
      result = result.filter((p) => filters.condition!.includes(p.condition))
    }
    if (filters.rating) {
      result = result.filter((p) => p.rating >= filters.rating!)
    }
    if (filters.inStock) {
      result = result.filter((p) => p.stock > 0)
    }
    if (filters.search) {
      const search = filters.search.toLowerCase()
      result = result.filter((p) => {
        const name = p.translations[0]?.name?.toLowerCase() || ''
        return name.includes(search) || p.brand?.toLowerCase().includes(search)
      })
    }

    // Apply sorting
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price))
        break
      case 'price-desc':
        result.sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price))
        break
      case 'rating':
        result.sort((a, b) => b.rating - a.rating)
        break
      case 'popular':
        result.sort((a, b) => b.reviewCount - a.reviewCount)
        break
      default:
        result.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    }

    return result
  }, [filters, sortBy])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900">Products</h1>
          <p className="mt-2 text-gray-600">
            Browse our selection of electronics and tech products
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mobile Filter Toggle */}
          <div className="lg:hidden">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="w-full justify-center"
            >
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>

          {/* Sidebar */}
          <div className={`${showFilters ? 'block' : 'hidden'} lg:block`}>
            <FilterSidebar
              filters={filters}
              onFilterChange={setFilters}
              categories={categories}
              brands={brands}
            />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-gray-600">
                {filteredProducts.length} products found
              </p>
              <div className="flex items-center gap-4">
                {/* Sort */}
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {sortOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <ProductGrid products={filteredProducts} />
          </div>
        </div>
      </div>
    </div>
  )
}
