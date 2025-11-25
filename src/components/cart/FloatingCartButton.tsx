'use client'

import { ShoppingCart } from 'lucide-react'
import { useCartStore } from '@/store/cart'

export function FloatingCartButton() {
  const { openCart, getItemCount } = useCartStore()
  const itemCount = getItemCount()

  return (
    <button
      onClick={openCart}
      className="fixed bottom-6 right-6 z-40 flex items-center justify-center w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all duration-200 hover:scale-105 active:scale-95"
      aria-label={`Open shopping cart with ${itemCount} items`}
    >
      <ShoppingCart className="w-6 h-6" />
      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white animate-bounce">
          {itemCount > 99 ? '99+' : itemCount}
        </span>
      )}
    </button>
  )
}
