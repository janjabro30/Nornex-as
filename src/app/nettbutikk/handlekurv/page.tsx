"use client";

import React from "react";
import { ShoppingCart } from "@/components/shop";
import { useAppStore } from "@/store";
import { getTranslation } from "@/lib/translations";

export default function CartPage() {
  const { language } = useAppStore();
  const t = getTranslation(language);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Page Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-gray-900">{t.shop.cart.title}</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <ShoppingCart />
      </div>
    </div>
  );
}
