/**
 * NORNEX AS - Product Detail Page (Norwegian)
 * @author NORNEX Development Team
 * @version 2.0.0
 * @copyright 2025 NORNEX AS
 */

'use client';

import { useState, use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ShoppingCart,
  Package,
  Truck,
  Shield,
  Undo2,
  Minus,
  Plus,
  Check,
  ChevronRight,
} from 'lucide-react';
import { PublicHeader, PublicFooter, useCart } from '@/components/public';
import { productsData, getProductBySlug } from '@/lib/products-data';
import { formatCurrency } from '@/lib/utils';

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export default function ProductPage({ params }: ProductPageProps) {
  const { slug } = use(params);
  const product = getProductBySlug(slug);
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();

  if (!product) {
    notFound();
  }

  const handleAddToCart = () => {
    addItem(
      {
        id: product.id,
        slug: product.slug,
        name: product.name,
        price: product.price,
        image: product.images[0],
      },
      quantity
    );
  };

  const relatedProducts = productsData
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const conditionLabel = {
    new: 'Ny',
    refurbished: 'Klargjort',
    used: 'Brukt',
  }[product.condition];

  return (
    <div className="min-h-screen bg-white">
      <PublicHeader />

      {/* Breadcrumb */}
      <div className="bg-slate-50 border-b">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-slate-500 hover:text-blue-600">
              Hjem
            </Link>
            <ChevronRight className="h-4 w-4 text-slate-400" />
            <Link href="/nettbutikk" className="text-slate-500 hover:text-blue-600">
              Nettbutikk
            </Link>
            <ChevronRight className="h-4 w-4 text-slate-400" />
            <Link
              href={`/nettbutikk?category=${encodeURIComponent(product.category)}`}
              className="text-slate-500 hover:text-blue-600"
            >
              {product.category}
            </Link>
            <ChevronRight className="h-4 w-4 text-slate-400" />
            <span className="text-slate-900 font-medium truncate">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Product Details */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Image Gallery */}
            <div>
              <div className="aspect-square bg-slate-100 rounded-2xl flex items-center justify-center">
                <Package className="h-32 w-32 text-slate-300" />
              </div>
              {/* Badges */}
              <div className="mt-4 flex flex-wrap gap-2">
                {product.originalPrice && (
                  <span className="px-3 py-1 bg-red-100 text-red-700 text-sm font-medium rounded-full">
                    {Math.round((1 - product.price / product.originalPrice) * 100)}% rabatt
                  </span>
                )}
                <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                  product.condition === 'new'
                    ? 'bg-blue-100 text-blue-700'
                    : product.condition === 'refurbished'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-amber-100 text-amber-700'
                }`}>
                  {conditionLabel}
                </span>
                {product.stock > 0 && product.stock <= 5 && (
                  <span className="px-3 py-1 bg-orange-100 text-orange-700 text-sm font-medium rounded-full">
                    Kun {product.stock} igjen
                  </span>
                )}
              </div>
            </div>

            {/* Product Info */}
            <div>
              <div className="text-sm text-slate-500 mb-2">{product.brand}</div>
              <h1 className="text-3xl font-bold text-slate-900">{product.name}</h1>

              {/* Price */}
              <div className="mt-6">
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl font-bold text-slate-900">
                    {formatCurrency(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-xl text-slate-400 line-through">
                      {formatCurrency(product.originalPrice)}
                    </span>
                  )}
                </div>
                <p className="mt-1 text-sm text-slate-500">
                  Inkl. mva. ({formatCurrency(product.price * 0.25)} mva)
                </p>
              </div>

              <p className="mt-6 text-slate-600">{product.description}</p>

              {/* Stock Status */}
              <div className="mt-6">
                {product.stock > 0 ? (
                  <div className="flex items-center gap-2 text-green-600">
                    <Check className="h-5 w-5" />
                    <span className="font-medium">
                      {product.stock > 10 ? 'På lager' : `${product.stock} på lager`}
                    </span>
                  </div>
                ) : (
                  <div className="text-red-600 font-medium">Utsolgt</div>
                )}
              </div>

              {/* Quantity & Add to Cart */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <div className="flex items-center border border-slate-200 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 hover:bg-slate-50"
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-5 w-5" />
                  </button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="p-3 hover:bg-slate-50"
                    disabled={quantity >= product.stock}
                  >
                    <Plus className="h-5 w-5" />
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className="flex-1 flex items-center justify-center gap-2 px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:bg-slate-300 disabled:cursor-not-allowed"
                >
                  <ShoppingCart className="h-5 w-5" />
                  Legg i handlekurv
                </button>
              </div>

              {/* Benefits */}
              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl">
                  <Truck className="h-6 w-6 text-blue-600 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-slate-900">Rask levering</div>
                    <div className="text-sm text-slate-500">1-3 virkedager</div>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl">
                  <Shield className="h-6 w-6 text-blue-600 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-slate-900">Garanti</div>
                    <div className="text-sm text-slate-500">2 års garanti</div>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl">
                  <Undo2 className="h-6 w-6 text-blue-600 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-slate-900">Gratis retur</div>
                    <div className="text-sm text-slate-500">30 dager åpent kjøp</div>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl">
                  <Package className="h-6 w-6 text-blue-600 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-slate-900">Gratis frakt</div>
                    <div className="text-sm text-slate-500">Ved kjøp over 1000 kr</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specifications */}
      <section className="py-12 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900">Spesifikasjoner</h2>
          <div className="mt-8 bg-white rounded-xl border border-slate-200 overflow-hidden">
            <table className="w-full">
              <tbody>
                {Object.entries(product.specifications).map(([key, value], index) => (
                  <tr key={key} className={index % 2 === 0 ? 'bg-slate-50' : 'bg-white'}>
                    <td className="px-6 py-4 font-medium text-slate-900 w-1/3">
                      {key}
                    </td>
                    <td className="px-6 py-4 text-slate-600">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Features */}
          {product.features.length > 0 && (
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Funksjoner</h3>
              <div className="flex flex-wrap gap-2">
                {product.features.map((feature) => (
                  <span
                    key={feature}
                    className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-slate-900">Relaterte produkter</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {relatedProducts.map((relatedProduct) => (
                <Link
                  key={relatedProduct.id}
                  href={`/nettbutikk/${relatedProduct.slug}`}
                  className="group bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="aspect-square bg-slate-100 flex items-center justify-center">
                    <Package className="h-16 w-16 text-slate-300" />
                  </div>
                  <div className="p-4">
                    <div className="text-sm text-slate-500">{relatedProduct.brand}</div>
                    <h3 className="font-semibold text-slate-900 group-hover:text-blue-600 line-clamp-2">
                      {relatedProduct.name}
                    </h3>
                    <div className="mt-2 font-bold text-slate-900">
                      {formatCurrency(relatedProduct.price)}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <PublicFooter />
    </div>
  );
}
