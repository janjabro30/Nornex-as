'use client'

import { useState, use } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Star, ShoppingCart, Heart, Share2, Check, Truck, Shield, RotateCcw, ChevronLeft, ChevronRight, Minus, Plus } from 'lucide-react'
import { Button } from '@/components/ui'
import { useCartStore } from '@/store/cart'
import { Product } from '@/types'

// Mock product data
const getProduct = (id: string): Product | null => {
  const products: Record<string, Product> = {
    '1': {
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
      specs: { processor: 'Intel Core i7-13700H', ram: '16GB DDR5', storage: '512GB NVMe SSD', display: '15.6" 4K OLED', graphics: 'NVIDIA RTX 4060' },
      createdAt: new Date(),
      updatedAt: new Date(),
      translations: [
        {
          id: 't1',
          productId: '1',
          language: 'en',
          name: 'Dell XPS 15 Laptop',
          description: 'Experience unmatched performance and stunning visuals with the Dell XPS 15. Featuring a beautiful 15.6" 4K OLED display, powerful Intel Core i7 processor, and NVIDIA RTX 4060 graphics, this laptop handles everything from creative work to gaming with ease.\n\nThe XPS 15 comes with 16GB of DDR5 RAM and a fast 512GB NVMe SSD, ensuring smooth multitasking and quick boot times. The premium aluminum chassis and carbon fiber palm rest provide durability and comfort, while the edge-to-edge keyboard offers a superior typing experience.',
          shortDescription: '15.6" 4K OLED display, Intel i7-13700H, 16GB RAM, 512GB SSD',
          metaTitle: 'Dell XPS 15 Laptop - 4K OLED | Nornex AS',
          metaDescription: 'Buy Dell XPS 15 with 4K OLED display and Intel i7 processor at Nornex AS',
        },
      ],
      images: [
        { id: 'img1', productId: '1', url: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800', alt: 'Dell XPS 15 Front View', sortOrder: 0 },
        { id: 'img2', productId: '1', url: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=800', alt: 'Dell XPS 15 Side View', sortOrder: 1 },
        { id: 'img3', productId: '1', url: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800', alt: 'Dell XPS 15 Open', sortOrder: 2 },
      ],
    },
  }
  return products[id] || products['1'] // Return mock for any ID
}

interface Props {
  params: Promise<{ id: string }>
}

export default function ProductDetailPage({ params }: Props) {
  const resolvedParams = use(params)
  const product = getProduct(resolvedParams.id)
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const { addItem } = useCartStore()

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <Link href="/products">
            <Button>Back to Products</Button>
          </Link>
        </div>
      </div>
    )
  }

  const translation = product.translations[0]
  const images = product.images || []
  const price = product.salePrice ?? product.price
  const hasDiscount = product.salePrice && product.salePrice < product.price
  const discountPercent = hasDiscount
    ? Math.round(((product.price - product.salePrice!) / product.price) * 100)
    : 0

  const specs = product.specs ? (typeof product.specs === 'string' ? JSON.parse(product.specs) : product.specs) : {}

  const handleAddToCart = () => {
    addItem(product, quantity)
  }

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <span>/</span>
            <Link href="/products" className="hover:text-blue-600">Products</Link>
            <span>/</span>
            <span className="text-gray-900">{translation?.name}</span>
          </nav>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 lg:p-8">
            {/* Image Gallery */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative aspect-square bg-gray-100 rounded-xl overflow-hidden">
                {images.length > 0 ? (
                  <>
                    <Image
                      src={images[selectedImage].url}
                      alt={images[selectedImage].alt || translation?.name || 'Product'}
                      fill
                      className="object-cover"
                      priority
                    />
                    {images.length > 1 && (
                      <>
                        <button
                          onClick={prevImage}
                          className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
                          aria-label="Previous image"
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                          onClick={nextImage}
                          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
                          aria-label="Next image"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </>
                    )}
                  </>
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-gray-400">No Image</span>
                  </div>
                )}

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {hasDiscount && (
                    <span className="bg-red-500 text-white text-sm font-medium px-3 py-1 rounded">
                      -{discountPercent}% OFF
                    </span>
                  )}
                  {product.condition !== 'new' && (
                    <span className="bg-amber-500 text-white text-sm font-medium px-3 py-1 rounded capitalize">
                      {product.condition}
                    </span>
                  )}
                </div>
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {images.map((image, index) => (
                    <button
                      key={image.id}
                      onClick={() => setSelectedImage(index)}
                      className={`relative w-20 h-20 shrink-0 rounded-lg overflow-hidden border-2 transition-colors ${
                        selectedImage === index ? 'border-blue-600' : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <Image
                        src={image.url}
                        alt={image.alt || `Thumbnail ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              {/* Brand */}
              {product.brand && (
                <p className="text-sm text-gray-500 uppercase tracking-wide">{product.brand}</p>
              )}

              {/* Name */}
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
                {translation?.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-3">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.round(product.rating)
                          ? 'text-yellow-400 fill-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {product.rating} ({product.reviewCount} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-gray-900">
                  kr {price.toLocaleString('no-NO')}
                </span>
                {hasDiscount && (
                  <span className="text-xl text-gray-500 line-through">
                    kr {product.price.toLocaleString('no-NO')}
                  </span>
                )}
              </div>

              {/* Short Description */}
              <p className="text-gray-600">
                {translation?.shortDescription}
              </p>

              {/* Stock Status */}
              <div className="flex items-center gap-2">
                {product.stock > 0 ? (
                  <>
                    <Check className="w-5 h-5 text-green-600" />
                    <span className="text-green-600 font-medium">
                      In Stock ({product.stock} available)
                    </span>
                  </>
                ) : (
                  <span className="text-red-600 font-medium">Out of Stock</span>
                )}
              </div>

              {/* Quantity & Add to Cart */}
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 hover:bg-gray-100 transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="p-3 hover:bg-gray-100 transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <Button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  size="lg"
                  className="flex-1"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart
                </Button>
                <button
                  className="p-3 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
                  aria-label="Add to wishlist"
                >
                  <Heart className="w-5 h-5" />
                </button>
                <button
                  className="p-3 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
                  aria-label="Share product"
                >
                  <Share2 className="w-5 h-5" />
                </button>
              </div>

              {/* Benefits */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t">
                <div className="flex items-center gap-3">
                  <Truck className="w-5 h-5 text-blue-600" />
                  <span className="text-sm text-gray-600">Free Shipping</span>
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-blue-600" />
                  <span className="text-sm text-gray-600">2 Year Warranty</span>
                </div>
                <div className="flex items-center gap-3">
                  <RotateCcw className="w-5 h-5 text-blue-600" />
                  <span className="text-sm text-gray-600">30 Day Returns</span>
                </div>
              </div>

              {/* SKU */}
              <p className="text-sm text-gray-500">
                SKU: {product.sku}
              </p>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-t">
            <div className="px-6 lg:px-8">
              {/* Description */}
              <div className="py-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Description</h2>
                <div className="prose prose-gray max-w-none">
                  {translation?.description?.split('\n').map((paragraph, i) => (
                    <p key={i} className="text-gray-600 mb-4">{paragraph}</p>
                  ))}
                </div>
              </div>

              {/* Specifications */}
              {Object.keys(specs).length > 0 && (
                <div className="py-8 border-t">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Specifications</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {Object.entries(specs).map(([key, value]) => (
                      <div key={key} className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-600 capitalize">{key.replace(/_/g, ' ')}</span>
                        <span className="font-medium text-gray-900">{String(value)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
