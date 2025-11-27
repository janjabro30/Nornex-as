/**
 * NORNEX AS - Cart Page (Norwegian)
 * @author NORNEX Development Team
 * @version 2.0.0
 * @copyright 2025 NORNEX AS
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Trash2,
  Minus,
  Plus,
  ShoppingCart,
  Tag,
  ArrowRight,
  Package,
} from 'lucide-react';
import { PublicHeader, PublicFooter, useCart } from '@/components/public';
import { formatCurrency } from '@/lib/utils';

export default function HandlekurvPage() {
  const {
    items,
    removeItem,
    updateQuantity,
    itemCount,
    subtotal,
    vat,
    total,
    discountCode,
    discountAmount,
    applyDiscount,
    removeDiscount,
  } = useCart();

  const [discountInput, setDiscountInput] = useState('');
  const [discountError, setDiscountError] = useState('');

  const handleApplyDiscount = () => {
    if (!discountInput.trim()) {
      setDiscountError('Skriv inn en rabattkode');
      return;
    }
    const success = applyDiscount(discountInput);
    if (success) {
      setDiscountError('');
      setDiscountInput('');
    } else {
      setDiscountError('Ugyldig rabattkode');
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <PublicHeader />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <ShoppingCart className="h-20 w-20 mx-auto text-slate-300" />
            <h1 className="mt-6 text-3xl font-bold text-slate-900">
              Handlekurven er tom
            </h1>
            <p className="mt-4 text-lg text-slate-600">
              Legg til produkter fra nettbutikken for å fortsette
            </p>
            <Link
              href="/nettbutikk"
              className="mt-8 inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Gå til nettbutikk
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
        <PublicFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <PublicHeader cartCount={itemCount} />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-slate-900">Handlekurv</h1>
        <p className="mt-2 text-slate-600">{itemCount} produkter i handlekurven</p>

        <div className="mt-8 grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-4 bg-white border border-slate-200 rounded-xl"
                >
                  {/* Image */}
                  <Link
                    href={`/nettbutikk/${item.slug}`}
                    className="flex-shrink-0 w-24 h-24 bg-slate-100 rounded-lg flex items-center justify-center"
                  >
                    <Package className="h-8 w-8 text-slate-300" />
                  </Link>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/nettbutikk/${item.slug}`}
                      className="font-semibold text-slate-900 hover:text-blue-600 line-clamp-2"
                    >
                      {item.name}
                    </Link>
                    <div className="mt-1 text-lg font-bold text-slate-900">
                      {formatCurrency(item.price)}
                    </div>

                    {/* Quantity & Remove */}
                    <div className="mt-3 flex items-center gap-4">
                      <div className="flex items-center border border-slate-200 rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-2 hover:bg-slate-50"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-10 text-center text-sm font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-2 hover:bg-slate-50"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-slate-400 hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>

                  {/* Item Total */}
                  <div className="text-right">
                    <div className="font-bold text-slate-900">
                      {formatCurrency(item.price * item.quantity)}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Continue Shopping */}
            <div className="mt-6">
              <Link
                href="/nettbutikk"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                ← Fortsett å handle
              </Link>
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-slate-50 rounded-xl p-6 sticky top-24">
              <h2 className="text-lg font-bold text-slate-900">Ordresammendrag</h2>

              {/* Discount Code */}
              <div className="mt-6">
                {discountCode ? (
                  <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center gap-2 text-green-700">
                      <Tag className="h-4 w-4" />
                      <span className="font-medium">{discountCode}</span>
                    </div>
                    <button
                      onClick={removeDiscount}
                      className="text-green-700 hover:text-green-800"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Rabattkode"
                        value={discountInput}
                        onChange={(e) => {
                          setDiscountInput(e.target.value);
                          setDiscountError('');
                        }}
                        className="flex-1 px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <button
                        onClick={handleApplyDiscount}
                        className="px-4 py-2 bg-slate-900 text-white font-medium rounded-lg hover:bg-slate-800 transition-colors"
                      >
                        Bruk
                      </button>
                    </div>
                    {discountError && (
                      <p className="mt-2 text-sm text-red-600">{discountError}</p>
                    )}
                  </div>
                )}
              </div>

              {/* Summary Lines */}
              <div className="mt-6 space-y-3">
                <div className="flex justify-between text-slate-600">
                  <span>Delsum</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Rabatt</span>
                    <span>-{formatCurrency(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-600">
                  <span>MVA (25%)</span>
                  <span>{formatCurrency(vat)}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Frakt</span>
                  <span>{subtotal >= 1000 ? 'Gratis' : 'Beregnes i kassen'}</span>
                </div>
                <div className="pt-3 border-t border-slate-200">
                  <div className="flex justify-between">
                    <span className="text-lg font-bold text-slate-900">Total</span>
                    <span className="text-lg font-bold text-slate-900">
                      {formatCurrency(total)}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-slate-500">Inkl. mva.</p>
                </div>
              </div>

              {/* Checkout Button */}
              <Link
                href="/kasse"
                className="mt-6 flex items-center justify-center gap-2 w-full py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                Gå til kassen
                <ArrowRight className="h-5 w-5" />
              </Link>

              {/* Trust Badges */}
              <div className="mt-6 pt-6 border-t border-slate-200">
                <div className="flex items-center justify-center gap-4 text-slate-400 text-sm">
                  <span>Vipps</span>
                  <span>Visa</span>
                  <span>Mastercard</span>
                  <span>Klarna</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <PublicFooter />
    </div>
  );
}
