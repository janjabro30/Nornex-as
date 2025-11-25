"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Trash2, Minus, Plus, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCartStore, useAppStore } from "@/store";
import { formatPrice } from "@/lib/utils";
import { getTranslation } from "@/lib/translations";

export function ShoppingCart() {
  const { items, removeItem, updateQuantity, clearCart, getTotal } =
    useCartStore();
  const { language } = useAppStore();
  const t = getTranslation(language);

  const subtotal = getTotal();
  const tax = subtotal * 0.25; // 25% MVA
  const shipping = subtotal > 0 ? (subtotal > 2000 ? 0 : 99) : 0;
  const total = subtotal + tax + shipping;

  if (items.length === 0) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="py-12 text-center">
          <ShoppingBag className="w-16 h-16 mx-auto text-gray-300 mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            {t.shop.cart.empty}
          </h2>
          <p className="text-gray-500 mb-6">
            {language === "no"
              ? "Legg til produkter i handlekurven for å fortsette"
              : "Add products to your cart to continue"}
          </p>
          <Link href="/nettbutikk">
            <Button>{t.shop.cart.continueShopping}</Button>
          </Link>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Cart Items */}
      <div className="lg:col-span-2 space-y-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>{t.shop.cart.title}</CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearCart}
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              {language === "no" ? "Tøm kurv" : "Clear cart"}
            </Button>
          </CardHeader>
          <CardContent className="divide-y">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center space-x-4 py-4 first:pt-0 last:pb-0"
              >
                {/* Product Image */}
                <div className="relative w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">
                      <ShoppingBag className="w-8 h-8" />
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-gray-900 truncate">
                    {item.name}
                  </h3>
                  <p className="text-sm text-gray-500">SKU: {item.sku}</p>
                  {item.grade && (
                    <span className="text-xs text-gray-500">
                      {language === "no" ? "Grad" : "Grade"}: {item.grade}
                    </span>
                  )}
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() =>
                      updateQuantity(item.id, item.quantity - 1)
                    }
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="w-8 text-center font-medium">
                    {item.quantity}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() =>
                      updateQuantity(item.id, item.quantity + 1)
                    }
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>

                {/* Price */}
                <div className="text-right">
                  <p className="font-semibold text-gray-900">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                  <p className="text-sm text-gray-500">
                    {formatPrice(item.price)} {language === "no" ? "stk" : "ea"}
                  </p>
                </div>

                {/* Remove Button */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-400 hover:text-red-600"
                  onClick={() => removeItem(item.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Order Summary */}
      <div>
        <Card className="sticky top-24">
          <CardHeader>
            <CardTitle>
              {language === "no" ? "Ordresammendrag" : "Order Summary"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">{t.shop.cart.subtotal}</span>
              <span className="font-medium">{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">{t.shop.cart.tax}</span>
              <span className="font-medium">{formatPrice(tax)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">{t.shop.cart.shipping}</span>
              <span className="font-medium">
                {shipping === 0
                  ? language === "no"
                    ? "Gratis"
                    : "Free"
                  : formatPrice(shipping)}
              </span>
            </div>
            {subtotal > 0 && subtotal < 2000 && (
              <p className="text-xs text-green-600">
                {language === "no"
                  ? `Legg til ${formatPrice(2000 - subtotal)} for gratis frakt`
                  : `Add ${formatPrice(2000 - subtotal)} for free shipping`}
              </p>
            )}
            <hr />
            <div className="flex justify-between text-lg font-semibold">
              <span>{t.shop.cart.total}</span>
              <span>{formatPrice(total)}</span>
            </div>
            <Button className="w-full" size="lg">
              {t.shop.cart.checkout}
            </Button>
            <Link href="/nettbutikk" className="block">
              <Button variant="outline" className="w-full">
                {t.shop.cart.continueShopping}
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
