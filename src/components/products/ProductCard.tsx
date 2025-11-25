'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ShoppingCart, Heart, Star, Eye } from 'lucide-react'
import { Product } from '@/types'
import { useCartStore } from '@/store/cart'
import { Button } from '@/components/ui'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCartStore()
  
  const translation = product.translations?.find(t => t.language === 'en') || product.translations?.[0]
  const mainImage = product.images?.[0]
  const price = product.salePrice ?? product.price
  const hasDiscount = product.salePrice && product.salePrice < product.price
  const discountPercent = hasDiscount
    ? Math.round(((product.price - product.salePrice!) / product.price) * 100)
    : 0

  return (
    <div className="group relative bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300">
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
        {hasDiscount && (
          <span className="bg-red-500 text-white text-xs font-medium px-2 py-1 rounded">
            -{discountPercent}%
          </span>
        )}
        {product.featured && (
          <span className="bg-blue-600 text-white text-xs font-medium px-2 py-1 rounded">
            Featured
          </span>
        )}
        {product.stock === 0 && (
          <span className="bg-gray-500 text-white text-xs font-medium px-2 py-1 rounded">
            Out of Stock
          </span>
        )}
        {product.condition !== 'new' && (
          <span className="bg-amber-500 text-white text-xs font-medium px-2 py-1 rounded capitalize">
            {product.condition}
          </span>
        )}
      </div>

      {/* Quick Actions */}
      <div className="absolute top-3 right-3 z-10 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
          aria-label="Add to wishlist"
        >
          <Heart className="w-4 h-4 text-gray-600" />
        </button>
        <Link
          href={`/products/${product.id}`}
          className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
          aria-label="Quick view"
        >
          <Eye className="w-4 h-4 text-gray-600" />
        </Link>
      </div>

      {/* Image */}
      <Link href={`/products/${product.id}`} className="block aspect-square relative overflow-hidden bg-gray-100">
        {mainImage ? (
          <Image
            src={mainImage.url}
            alt={mainImage.alt || translation?.name || 'Product'}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <span className="text-gray-400">No Image</span>
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="p-4">
        {/* Brand */}
        {product.brand && (
          <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
            {product.brand}
          </p>
        )}

        {/* Name */}
        <Link href={`/products/${product.id}`}>
          <h3 className="font-medium text-gray-900 line-clamp-2 hover:text-blue-600 transition-colors mb-2">
            {translation?.name || 'Unnamed Product'}
          </h3>
        </Link>

        {/* Rating */}
        {product.reviewCount > 0 && (
          <div className="flex items-center gap-1 mb-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.round(product.rating)
                      ? 'text-yellow-400 fill-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-500">({product.reviewCount})</span>
          </div>
        )}

        {/* Price */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg font-bold text-gray-900">
            kr {price.toLocaleString('no-NO')}
          </span>
          {hasDiscount && (
            <span className="text-sm text-gray-500 line-through">
              kr {product.price.toLocaleString('no-NO')}
            </span>
          )}
        </div>

        {/* Add to Cart */}
        <Button
          onClick={() => addItem(product)}
          disabled={product.stock === 0}
          className="w-full"
          size="sm"
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
        </Button>
      </div>
    </div>
  )
}
