"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Trash2, Minus, Plus, ShoppingBag, Tag, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCartStore, useAppStore } from "@/store";
import { formatPrice } from "@/lib/utils";
import { getTranslation } from "@/lib/translations";
import { mockDiscountCodes } from "@/lib/mock-data";

export function ShoppingCart() {
  const { items, removeItem, updateQuantity, clearCart, getTotal } =
    useCartStore();
  const { language } = useAppStore();
  const t = getTranslation(language);
  
  const [discountCode, setDiscountCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState<{
    code: string;
    type: "percentage" | "fixed";
    value: number;
  } | null>(null);
  const [discountError, setDiscountError] = useState("");
  const [discountSuccess, setDiscountSuccess] = useState("");

  const subtotal = getTotal();
  const FREE_SHIPPING_THRESHOLD = 500;
  const SHIPPING_COST = 99;
  
  // Calculate discount
  let discountAmount = 0;
  if (appliedDiscount) {
    if (appliedDiscount.type === "percentage") {
      discountAmount = subtotal * (appliedDiscount.value / 100);
    } else {
      discountAmount = appliedDiscount.value;
    }
  }
  
  const subtotalAfterDiscount = subtotal - discountAmount;
  const shipping = subtotal > 0 ? (subtotal > FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST) : 0;
  const tax = subtotalAfterDiscount * 0.25; // 25% MVA
  const total = subtotalAfterDiscount + tax + shipping;

  const applyDiscountCode = () => {
    setDiscountError("");
    setDiscountSuccess("");
    
    if (!discountCode.trim()) {
      setDiscountError(language === "no" ? "Vennligst skriv inn en rabattkode" : "Please enter a discount code");
      return;
    }

    const code = mockDiscountCodes.find(
      (c) => c.code.toUpperCase() === discountCode.toUpperCase() && c.isActive
    );

    if (!code) {
      setDiscountError(language === "no" ? "Ugyldig rabattkode" : "Invalid discount code");
      return;
    }

    // Check validity dates
    const now = new Date();
    if (now < code.validFrom || now > code.validUntil) {
      setDiscountError(language === "no" ? "Denne rabattkoden er utløpt" : "This discount code has expired");
      return;
    }

    // Check minimum order amount
    if (code.minOrderAmount && subtotal < code.minOrderAmount) {
      setDiscountError(
        language === "no" 
          ? `Minimumsbeløp er ${formatPrice(code.minOrderAmount)}`
          : `Minimum order amount is ${formatPrice(code.minOrderAmount)}`
      );
      return;
    }

    // Check usage limits
    if (code.maxUses && code.currentUses >= code.maxUses) {
      setDiscountError(language === "no" ? "Denne rabattkoden er brukt opp" : "This discount code has been used up");
      return;
    }

    setAppliedDiscount({
      code: code.code,
      type: code.type,
      value: code.value,
    });

    const savedAmount = code.type === "percentage" 
      ? subtotal * (code.value / 100)
      : code.value;

    setDiscountSuccess(
      language === "no"
        ? `Rabattkode brukt! Du sparer ${formatPrice(savedAmount)}`
        : `Discount applied! You save ${formatPrice(savedAmount)}`
    );
    setDiscountCode("");
  };

  const removeDiscount = () => {
    setAppliedDiscount(null);
    setDiscountSuccess("");
    setDiscountError("");
  };

  if (items.length === 0) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="py-12 text-center">
          <ShoppingBag className="w-16 h-16 mx-auto text-gray-300 mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            {language === "no" ? "Handlekurven din er tom" : t.shop.cart.empty}
          </h2>
          <p className="text-gray-500 mb-6">
            {language === "no"
              ? "Legg til produkter i handlekurven for å fortsette"
              : "Add products to your cart to continue"}
          </p>
          <Link href="/nettbutikk">
            <Button>
              {language === "no" ? "Fortsett å handle" : t.shop.cart.continueShopping}
            </Button>
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
                  <Link href={`/nettbutikk/${item.id}`}>
                    <h3 className="font-medium text-gray-900 truncate hover:text-green-600 transition-colors">
                      {item.name}
                    </h3>
                  </Link>
                  <p className="text-sm text-gray-500">SKU: {item.sku}</p>
                  {item.grade && (
                    <Badge variant="secondary" className="mt-1 text-xs">
                      {language === "no" ? "Grad" : "Grade"}: {item.grade}
                    </Badge>
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
                  <Input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => {
                      const val = parseInt(e.target.value, 10);
                      if (!isNaN(val) && val > 0) {
                        updateQuantity(item.id, val);
                      }
                    }}
                    className="w-14 h-8 text-center p-1"
                    min={1}
                  />
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
                  title={language === "no" ? "Fjern" : "Remove"}
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
            
            {/* Discount Code Section */}
            <div className="space-y-2 pt-2 pb-2 border-t border-b">
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-medium">
                  {language === "no" ? "Rabattkode" : "Discount Code"}
                </span>
              </div>
              
              {appliedDiscount ? (
                <div className="flex items-center justify-between bg-green-50 p-2 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-medium text-green-700">
                      {appliedDiscount.code}
                    </span>
                    <span className="text-sm text-green-600">
                      (-{appliedDiscount.type === "percentage" ? `${appliedDiscount.value}%` : formatPrice(appliedDiscount.value)})
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 text-green-600 hover:text-red-600"
                    onClick={removeDiscount}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <Input
                    type="text"
                    placeholder={language === "no" ? "Skriv inn kode" : "Enter code"}
                    value={discountCode}
                    onChange={(e) => setDiscountCode(e.target.value)}
                    className="flex-1 h-9"
                    onKeyDown={(e) => e.key === "Enter" && applyDiscountCode()}
                  />
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={applyDiscountCode}
                    className="h-9"
                  >
                    {language === "no" ? "Bruk" : "Apply"}
                  </Button>
                </div>
              )}
              
              {discountError && (
                <p className="text-sm text-red-600">{discountError}</p>
              )}
              {discountSuccess && (
                <p className="text-sm text-green-600">{discountSuccess}</p>
              )}
            </div>

            {/* Discount Amount */}
            {discountAmount > 0 && (
              <div className="flex justify-between text-sm text-green-600">
                <span>{language === "no" ? "Rabatt" : "Discount"}</span>
                <span className="font-medium">-{formatPrice(discountAmount)}</span>
              </div>
            )}

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
            
            {subtotal > 0 && subtotal <= FREE_SHIPPING_THRESHOLD && (
              <p className="text-xs text-green-600">
                {language === "no"
                  ? `Legg til ${formatPrice(FREE_SHIPPING_THRESHOLD - subtotal)} for gratis frakt`
                  : `Add ${formatPrice(FREE_SHIPPING_THRESHOLD - subtotal)} for free shipping`}
              </p>
            )}
            
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">{t.shop.cart.tax}</span>
              <span className="font-medium">{formatPrice(tax)}</span>
            </div>
            
            <hr />
            
            <div className="flex justify-between text-lg font-semibold">
              <span>{t.shop.cart.total}</span>
              <span>{formatPrice(total)}</span>
            </div>
            
            <Link href="/nettbutikk/kasse">
              <Button className="w-full" size="lg">
                {language === "no" ? "Gå til kassen" : t.shop.cart.checkout}
              </Button>
            </Link>
            
            <Link href="/nettbutikk" className="block">
              <Button variant="outline" className="w-full">
                {language === "no" ? "Fortsett å handle" : t.shop.cart.continueShopping}
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
