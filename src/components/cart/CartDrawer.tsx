'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { X, Plus, Minus, ShoppingBag, Trash2 } from 'lucide-react'
import { useCartStore } from '@/store/cart'
import { Button } from '@/components/ui'

export function CartDrawer() {
  const { isOpen, closeCart, items, removeItem, updateQuantity, getTotal, clearCart } =
    useCartStore()

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeCart()
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [closeCart])

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if (!isOpen) return null

  const total = getTotal()

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-50 transition-opacity"
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl z-50 flex flex-col transform transition-transform duration-300 ease-out"
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4 border-b">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" />
            Shopping Cart
            <span className="text-sm font-normal text-gray-500">
              ({items.length} {items.length === 1 ? 'item' : 'items'})
            </span>
          </h2>
          <button
            onClick={closeCart}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto px-4 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag className="w-16 h-16 text-gray-300 mb-4" />
              <p className="text-gray-500 mb-4">Your cart is empty</p>
              <Button onClick={closeCart} variant="outline">
                Continue Shopping
              </Button>
            </div>
          ) : (
            <ul className="space-y-4">
              {items.map((item) => {
                const translation = item.product.translations?.find(
                  (t) => t.language === 'en'
                ) || item.product.translations?.[0]
                const image = item.product.images?.[0]
                const price = item.product.salePrice ?? item.product.price

                return (
                  <li
                    key={item.product.id}
                    className="flex gap-4 p-3 bg-gray-50 rounded-lg"
                  >
                    {/* Image */}
                    <div className="relative w-20 h-20 shrink-0 bg-white rounded-md overflow-hidden">
                      {image ? (
                        <Image
                          src={image.url}
                          alt={image.alt || translation?.name || 'Product'}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-200">
                          <span className="text-gray-400 text-xs">No img</span>
                        </div>
                      )}
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm text-gray-900 truncate">
                        {translation?.name || 'Product'}
                      </h3>
                      <p className="text-sm text-gray-500">
                        kr {price.toLocaleString('no-NO')}
                      </p>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity - 1)
                          }
                          className="p-1 hover:bg-gray-200 rounded transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center text-sm font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity + 1)
                          }
                          className="p-1 hover:bg-gray-200 rounded transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => removeItem(item.product.id)}
                          className="ml-auto p-1 text-red-500 hover:bg-red-50 rounded transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Item Total */}
                    <div className="text-right">
                      <p className="font-semibold text-sm">
                        kr {(price * item.quantity).toLocaleString('no-NO')}
                      </p>
                    </div>
                  </li>
                )
              })}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t px-4 py-4 space-y-4">
            {/* Subtotal */}
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span className="text-xl font-bold">
                kr {total.toLocaleString('no-NO')}
              </span>
            </div>
            <p className="text-xs text-gray-500">
              Shipping and taxes calculated at checkout
            </p>

            {/* Actions */}
            <div className="space-y-2">
              <Link href="/checkout" onClick={closeCart}>
                <Button className="w-full" size="lg">
                  Checkout
                </Button>
              </Link>
              <div className="flex gap-2">
                <Link href="/cart" onClick={closeCart} className="flex-1">
                  <Button variant="outline" className="w-full">
                    View Cart
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  onClick={clearCart}
                  className="text-red-500 hover:text-red-600"
                >
                  Clear
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
