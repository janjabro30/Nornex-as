/**
 * NORNEX AS - Cart Context Provider
 * @author NORNEX Development Team
 * @version 2.0.0
 * @copyright 2025 NORNEX AS
 */

'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface CartItem {
  id: string;
  slug: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
  vat: number;
  total: number;
  discountCode: string | null;
  discountAmount: number;
  applyDiscount: (code: string) => boolean;
  removeDiscount: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const DISCOUNT_CODES: Record<string, { type: 'percent' | 'fixed'; value: number }> = {
  'NORNEX10': { type: 'percent', value: 10 },
  'NORNEX20': { type: 'percent', value: 20 },
  'VELKOMMEN': { type: 'fixed', value: 500 },
};

const VAT_RATE = 0.25; // 25% MVA

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [discountCode, setDiscountCode] = useState<string | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('nornex-cart');
    const savedDiscount = localStorage.getItem('nornex-discount');
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (e) {
        console.error('Failed to parse cart:', e);
      }
    }
    if (savedDiscount) {
      setDiscountCode(savedDiscount);
    }
    setIsHydrated(true);
  }, []);

  // Save cart to localStorage when it changes
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem('nornex-cart', JSON.stringify(items));
    }
  }, [items, isHydrated]);

  useEffect(() => {
    if (isHydrated) {
      if (discountCode) {
        localStorage.setItem('nornex-discount', discountCode);
      } else {
        localStorage.removeItem('nornex-discount');
      }
    }
  }, [discountCode, isHydrated]);

  const addItem = (item: Omit<CartItem, 'quantity'>, quantity = 1) => {
    setItems((prev) => {
      const existingIndex = prev.findIndex((i) => i.id === item.id);
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }
      return [...prev, { ...item, quantity }];
    });
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    setDiscountCode(null);
  };

  const applyDiscount = (code: string): boolean => {
    const upperCode = code.toUpperCase();
    if (DISCOUNT_CODES[upperCode]) {
      setDiscountCode(upperCode);
      return true;
    }
    return false;
  };

  const removeDiscount = () => {
    setDiscountCode(null);
  };

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  
  let discountAmount = 0;
  if (discountCode && DISCOUNT_CODES[discountCode]) {
    const discount = DISCOUNT_CODES[discountCode];
    if (discount.type === 'percent') {
      discountAmount = subtotal * (discount.value / 100);
    } else {
      discountAmount = Math.min(discount.value, subtotal);
    }
  }

  const subtotalAfterDiscount = subtotal - discountAmount;
  const vat = subtotalAfterDiscount * VAT_RATE;
  const total = subtotalAfterDiscount + vat;

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        itemCount,
        subtotal,
        vat,
        total,
        discountCode,
        discountAmount,
        applyDiscount,
        removeDiscount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
