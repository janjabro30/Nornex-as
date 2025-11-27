/**
 * NORNEX AS - Webshop Page (Norwegian)
 * @author NORNEX Development Team
 * @version 2.0.0
 * @copyright 2025 NORNEX AS
 */

'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Search,
  SlidersHorizontal,
  Grid3X3,
  List,
  ShoppingCart,
  Star,
  ChevronDown,
  X,
  Package,
} from 'lucide-react';
import { PublicHeader, PublicFooter, useCart } from '@/components/public';
import { productsData, productCategories, productBrands } from '@/lib/products-data';
import { formatCurrency } from '@/lib/utils';

type SortOption = 'popular' | 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc' | 'newest' | 'discount';

const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'popular', label: 'Populære' },
  { value: 'price-asc', label: 'Pris: Lav til høy' },
  { value: 'price-desc', label: 'Pris: Høy til lav' },
  { value: 'name-asc', label: 'Navn: A-Å' },
  { value: 'name-desc', label: 'Navn: Å-A' },
  { value: 'newest', label: 'Nyeste' },
  { value: 'discount', label: 'Største rabatt' },
];

export default function NettbutikkPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000]);
  const [sortBy, setSortBy] = useState<SortOption>('popular');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  const { addItem } = useCart();

  const conditions = [
    { value: 'new', label: 'Ny' },
    { value: 'refurbished', label: 'Klargjort' },
    { value: 'used', label: 'Brukt' },
  ];

  const filteredProducts = useMemo(() => {
    let filtered = [...productsData];

    // Search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.brand.toLowerCase().includes(query)
      );
    }

    // Category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((p) => selectedCategories.includes(p.category));
    }

    // Brand filter
    if (selectedBrands.length > 0) {
      filtered = filtered.filter((p) => selectedBrands.includes(p.brand));
    }

    // Condition filter
    if (selectedConditions.length > 0) {
      filtered = filtered.filter((p) => selectedConditions.includes(p.condition));
    }

    // Price filter
    filtered = filtered.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    // Sort
    switch (sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        filtered.sort((a, b) => a.name.localeCompare(b.name, 'nb'));
        break;
      case 'name-desc':
        filtered.sort((a, b) => b.name.localeCompare(a.name, 'nb'));
        break;
      case 'discount':
        filtered.sort((a, b) => {
          const discountA = a.originalPrice ? (a.originalPrice - a.price) / a.originalPrice : 0;
          const discountB = b.originalPrice ? (b.originalPrice - b.price) / b.originalPrice : 0;
          return discountB - discountA;
        });
        break;
      default:
        // Keep original order for 'popular' and 'newest'
        break;
    }

    return filtered;
  }, [searchQuery, selectedCategories, selectedBrands, selectedConditions, priceRange, sortBy]);

  const toggleFilter = (
    value: string,
    selected: string[],
    setSelected: (val: string[]) => void
  ) => {
    if (selected.includes(value)) {
      setSelected(selected.filter((v) => v !== value));
    } else {
      setSelected([...selected, value]);
    }
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setSelectedConditions([]);
    setPriceRange([0, 50000]);
    setSearchQuery('');
  };

  const hasActiveFilters =
    selectedCategories.length > 0 ||
    selectedBrands.length > 0 ||
    selectedConditions.length > 0 ||
    priceRange[0] > 0 ||
    priceRange[1] < 50000;

  const handleAddToCart = (product: typeof productsData[0]) => {
    addItem({
      id: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: product.images[0],
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <PublicHeader />

      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-white sm:text-4xl">Nettbutikk</h1>
          <p className="mt-2 text-lg text-slate-300">
            Kvalitetsutstyr fra ledende produsenter med full garanti
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar - Desktop */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24 space-y-6">
              {/* Search */}
              <div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Søk produkter..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Clear Filters */}
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700"
                >
                  <X className="h-4 w-4" />
                  Fjern alle filtre
                </button>
              )}

              {/* Categories */}
              <div>
                <h3 className="font-semibold text-slate-900 mb-3">Kategori</h3>
                <div className="space-y-2">
                  {productCategories.map((category) => (
                    <label key={category} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(category)}
                        onChange={() => toggleFilter(category, selectedCategories, setSelectedCategories)}
                        className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-slate-700">{category}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Brands */}
              <div>
                <h3 className="font-semibold text-slate-900 mb-3">Merke</h3>
                <div className="space-y-2">
                  {productBrands.map((brand) => (
                    <label key={brand} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedBrands.includes(brand)}
                        onChange={() => toggleFilter(brand, selectedBrands, setSelectedBrands)}
                        className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-slate-700">{brand}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Condition */}
              <div>
                <h3 className="font-semibold text-slate-900 mb-3">Tilstand</h3>
                <div className="space-y-2">
                  {conditions.map((condition) => (
                    <label key={condition.value} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedConditions.includes(condition.value)}
                        onChange={() => toggleFilter(condition.value, selectedConditions, setSelectedConditions)}
                        className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-slate-700">{condition.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h3 className="font-semibold text-slate-900 mb-3">Pris</h3>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                    className="w-full px-2 py-1 border border-slate-200 rounded text-sm"
                    placeholder="Fra"
                  />
                  <span className="text-slate-400">-</span>
                  <input
                    type="number"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                    className="w-full px-2 py-1 border border-slate-200 rounded text-sm"
                    placeholder="Til"
                  />
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-4">
                {/* Mobile Filter Button */}
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium"
                >
                  <SlidersHorizontal className="h-4 w-4" />
                  Filtre
                </button>

                <p className="text-sm text-slate-600">
                  {filteredProducts.length} produkter
                </p>
              </div>

              <div className="flex items-center gap-4">
                {/* Sort */}
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                    className="appearance-none bg-white border border-slate-200 rounded-lg pl-4 pr-10 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {sortOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                </div>

                {/* View Mode */}
                <div className="hidden sm:flex items-center border border-slate-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 ${viewMode === 'grid' ? 'bg-slate-100' : 'hover:bg-slate-50'}`}
                  >
                    <Grid3X3 className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 ${viewMode === 'list' ? 'bg-slate-100' : 'hover:bg-slate-50'}`}
                  >
                    <List className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Mobile Filters */}
            {showFilters && (
              <div className="lg:hidden mb-6 p-4 bg-slate-50 rounded-xl">
                <div className="grid grid-cols-2 gap-4">
                  {/* Mobile search */}
                  <div className="col-span-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                      <input
                        type="text"
                        placeholder="Søk produkter..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  {/* Add more mobile filters as needed */}
                </div>
              </div>
            )}

            {/* Products Grid */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-16">
                <Package className="h-16 w-16 mx-auto text-slate-300" />
                <h2 className="mt-4 text-xl font-semibold text-slate-900">Ingen produkter funnet</h2>
                <p className="mt-2 text-slate-600">Prøv å endre filtrene dine</p>
                <button
                  onClick={clearFilters}
                  className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
                >
                  Fjern alle filtre
                </button>
              </div>
            ) : (
              <div className={`
                grid gap-6
                ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'}
              `}>
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className={`
                      group bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow
                      ${viewMode === 'list' ? 'flex' : ''}
                    `}
                  >
                    {/* Image */}
                    <Link
                      href={`/nettbutikk/${product.slug}`}
                      className={`block relative ${viewMode === 'list' ? 'w-48 flex-shrink-0' : ''}`}
                    >
                      <div className={`
                        bg-slate-100 flex items-center justify-center
                        ${viewMode === 'list' ? 'h-full' : 'aspect-square'}
                      `}>
                        <Package className="h-16 w-16 text-slate-300" />
                      </div>
                      {/* Badges */}
                      <div className="absolute top-3 left-3 flex flex-col gap-2">
                        {product.originalPrice && (
                          <span className="px-2 py-1 bg-red-500 text-white text-xs font-bold rounded">
                            -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                          </span>
                        )}
                        {product.condition === 'refurbished' && (
                          <span className="px-2 py-1 bg-green-500 text-white text-xs font-bold rounded">
                            Klargjort
                          </span>
                        )}
                        {product.stock <= 3 && product.stock > 0 && (
                          <span className="px-2 py-1 bg-orange-500 text-white text-xs font-bold rounded">
                            Få igjen
                          </span>
                        )}
                      </div>
                    </Link>

                    {/* Content */}
                    <div className="p-4 flex-1">
                      <div className="text-sm text-slate-500 mb-1">{product.brand}</div>
                      <Link href={`/nettbutikk/${product.slug}`}>
                        <h3 className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                          {product.name}
                        </h3>
                      </Link>
                      <p className="mt-2 text-sm text-slate-600 line-clamp-2">{product.description}</p>
                      
                      <div className="mt-4 flex items-center justify-between">
                        <div>
                          <div className="text-xl font-bold text-slate-900">
                            {formatCurrency(product.price)}
                          </div>
                          {product.originalPrice && (
                            <div className="text-sm text-slate-500 line-through">
                              {formatCurrency(product.originalPrice)}
                            </div>
                          )}
                        </div>
                        <button
                          onClick={() => handleAddToCart(product)}
                          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          <ShoppingCart className="h-4 w-4" />
                          <span className="hidden sm:inline">Legg i kurv</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      <PublicFooter />
    </div>
  );
}
