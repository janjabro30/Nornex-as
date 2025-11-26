"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  ArrowLeft, 
  Check, 
  CreditCard, 
  Truck, 
  User,
  ShoppingBag,
  MapPin,
  Package,
  Shield,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCartStore, useAppStore } from "@/store";
import { formatPrice } from "@/lib/utils";
import type { DeliveryMethod, PaymentMethod, DeliveryInfo } from "@/types";

const deliveryMethods: { 
  value: DeliveryMethod; 
  labelNo: string; 
  labelEn: string; 
  price: number; 
  time: string;
  timeEn: string;
}[] = [
  { value: "home", labelNo: "Hjemlevering", labelEn: "Home Delivery", price: 99, time: "2-4 virkedager", timeEn: "2-4 business days" },
  { value: "pickup", labelNo: "Hentepunkt", labelEn: "Pickup Point", price: 59, time: "2-3 virkedager", timeEn: "2-3 business days" },
  { value: "express", labelNo: "Express", labelEn: "Express", price: 199, time: "1-2 virkedager", timeEn: "1-2 business days" },
  { value: "free", labelNo: "Gratis frakt", labelEn: "Free Shipping", price: 0, time: "3-5 virkedager", timeEn: "3-5 business days" },
];

const paymentMethods: { 
  value: PaymentMethod; 
  labelNo: string; 
  labelEn: string; 
  icon: string;
  description?: string;
}[] = [
  { value: "vipps", labelNo: "Vipps", labelEn: "Vipps", icon: "💳" },
  { value: "credit-card", labelNo: "Kredittkort", labelEn: "Credit Card", icon: "💳", description: "Visa, Mastercard, Amex" },
  { value: "klarna", labelNo: "Klarna", labelEn: "Klarna", icon: "🛒", description: "Del opp betalingen" },
  { value: "invoice", labelNo: "Faktura", labelEn: "Invoice", icon: "📄", description: "30 dager" },
  { value: "paypal", labelNo: "PayPal", labelEn: "PayPal", icon: "🅿️" },
];

export default function CheckoutPage() {
  const { language } = useAppStore();
  const { items, getTotal, clearCart } = useCartStore();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [deliveryInfo, setDeliveryInfo] = useState<DeliveryInfo>({
    name: "",
    email: "",
    phone: "",
    address: "",
    postalCode: "",
    city: "",
    useDifferentBilling: false,
    saveAddress: false,
  });
  const [selectedDelivery, setSelectedDelivery] = useState<DeliveryMethod>("home");
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod>("vipps");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [orderNumber] = useState(() => "NOR-" + Date.now().toString(36).toUpperCase());

  const subtotal = getTotal();
  const FREE_SHIPPING_THRESHOLD = 500;
  const deliveryMethod = deliveryMethods.find(d => d.value === selectedDelivery);
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD && selectedDelivery !== "express" 
    ? 0 
    : deliveryMethod?.price || 0;
  const tax = subtotal * 0.25;
  const total = subtotal + shipping + tax;

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};
    if (!deliveryInfo.name.trim()) newErrors.name = language === "no" ? "Navn er påkrevd" : "Name is required";
    if (!deliveryInfo.email.trim()) newErrors.email = language === "no" ? "E-post er påkrevd" : "Email is required";
    if (deliveryInfo.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(deliveryInfo.email)) {
      newErrors.email = language === "no" ? "Ugyldig e-postadresse" : "Invalid email address";
    }
    if (!deliveryInfo.phone.trim()) newErrors.phone = language === "no" ? "Telefon er påkrevd" : "Phone is required";
    if (!deliveryInfo.address.trim()) newErrors.address = language === "no" ? "Adresse er påkrevd" : "Address is required";
    if (!deliveryInfo.postalCode.trim()) newErrors.postalCode = language === "no" ? "Postnummer er påkrevd" : "Postal code is required";
    if (!deliveryInfo.city.trim()) newErrors.city = language === "no" ? "By er påkrevd" : "City is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    }
  };

  const handleCompleteOrder = async () => {
    if (!acceptTerms) {
      setErrors({ terms: language === "no" ? "Du må godta vilkårene" : "You must accept the terms" });
      return;
    }
    
    setIsProcessing(true);
    // Simulate order processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsProcessing(false);
    setOrderComplete(true);
    clearCart();
  };

  // Empty cart redirect
  if (items.length === 0 && !orderComplete) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4 py-16 text-center">
          <ShoppingBag className="w-16 h-16 mx-auto text-gray-300 mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {language === "no" ? "Handlekurven er tom" : "Your cart is empty"}
          </h1>
          <Link href="/nettbutikk">
            <Button>
              {language === "no" ? "Fortsett å handle" : "Continue Shopping"}
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // Order Complete
  if (orderComplete) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4 py-16 text-center max-w-lg">
          <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {language === "no" ? "Takk for din bestilling!" : "Thank you for your order!"}
          </h1>
          <p className="text-gray-600 mb-6">
            {language === "no"
              ? "Du vil motta en bekreftelse på e-post."
              : "You will receive a confirmation email."}
          </p>
          <p className="text-sm text-gray-500 mb-8">
            {language === "no"
              ? `Ordrenummer: ${orderNumber}`
              : `Order number: ${orderNumber}`}
          </p>
          <Link href="/nettbutikk">
            <Button>
              {language === "no" ? "Fortsett å handle" : "Continue Shopping"}
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/nettbutikk/handlekurv" className="flex items-center text-gray-600 hover:text-gray-900">
              <ArrowLeft className="w-5 h-5 mr-2" />
              {language === "no" ? "Tilbake til handlekurv" : "Back to cart"}
            </Link>
            <h1 className="text-xl font-bold text-gray-900">
              {language === "no" ? "Kasse" : "Checkout"}
            </h1>
            <div className="w-32"></div>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-center space-x-4">
            {[1, 2, 3].map((s) => (
              <React.Fragment key={s}>
                <div className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    s <= step ? "bg-green-600 text-white" : "bg-gray-200 text-gray-600"
                  }`}>
                    {s < step ? <Check className="w-4 h-4" /> : s}
                  </div>
                  <span className={`ml-2 text-sm hidden sm:block ${s <= step ? "text-gray-900" : "text-gray-500"}`}>
                    {s === 1 && (language === "no" ? "Leveringsinfo" : "Delivery Info")}
                    {s === 2 && (language === "no" ? "Levering" : "Shipping")}
                    {s === 3 && (language === "no" ? "Betaling" : "Payment")}
                  </span>
                </div>
                {s < 3 && <ChevronRight className="w-5 h-5 text-gray-400" />}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Step 1: Delivery Information */}
            {step === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="w-5 h-5 mr-2" />
                    {language === "no" ? "Leveringsinformasjon" : "Delivery Information"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {language === "no" ? "Fullt navn" : "Full Name"} *
                      </label>
                      <Input
                        value={deliveryInfo.name}
                        onChange={(e) => setDeliveryInfo({ ...deliveryInfo, name: e.target.value })}
                        className={errors.name ? "border-red-500" : ""}
                      />
                      {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {language === "no" ? "E-post" : "Email"} *
                      </label>
                      <Input
                        type="email"
                        value={deliveryInfo.email}
                        onChange={(e) => setDeliveryInfo({ ...deliveryInfo, email: e.target.value })}
                        className={errors.email ? "border-red-500" : ""}
                      />
                      {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email}</p>}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {language === "no" ? "Telefon" : "Phone"} *
                    </label>
                    <Input
                      value={deliveryInfo.phone}
                      onChange={(e) => setDeliveryInfo({ ...deliveryInfo, phone: e.target.value })}
                      className={errors.phone ? "border-red-500" : ""}
                    />
                    {errors.phone && <p className="text-sm text-red-600 mt-1">{errors.phone}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {language === "no" ? "Adresse" : "Address"} *
                    </label>
                    <Input
                      value={deliveryInfo.address}
                      onChange={(e) => setDeliveryInfo({ ...deliveryInfo, address: e.target.value })}
                      className={errors.address ? "border-red-500" : ""}
                    />
                    {errors.address && <p className="text-sm text-red-600 mt-1">{errors.address}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {language === "no" ? "Postnummer" : "Postal Code"} *
                      </label>
                      <Input
                        value={deliveryInfo.postalCode}
                        onChange={(e) => setDeliveryInfo({ ...deliveryInfo, postalCode: e.target.value })}
                        className={errors.postalCode ? "border-red-500" : ""}
                      />
                      {errors.postalCode && <p className="text-sm text-red-600 mt-1">{errors.postalCode}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {language === "no" ? "By" : "City"} *
                      </label>
                      <Input
                        value={deliveryInfo.city}
                        onChange={(e) => setDeliveryInfo({ ...deliveryInfo, city: e.target.value })}
                        className={errors.city ? "border-red-500" : ""}
                      />
                      {errors.city && <p className="text-sm text-red-600 mt-1">{errors.city}</p>}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="differentBilling"
                      checked={deliveryInfo.useDifferentBilling}
                      onChange={(e) => setDeliveryInfo({ ...deliveryInfo, useDifferentBilling: e.target.checked })}
                      className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                    />
                    <label htmlFor="differentBilling" className="text-sm text-gray-700">
                      {language === "no" ? "Faktureringsadresse er annerledes" : "Billing address is different"}
                    </label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="saveAddress"
                      checked={deliveryInfo.saveAddress}
                      onChange={(e) => setDeliveryInfo({ ...deliveryInfo, saveAddress: e.target.checked })}
                      className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                    />
                    <label htmlFor="saveAddress" className="text-sm text-gray-700">
                      {language === "no" ? "Lagre denne adressen" : "Save this address"}
                    </label>
                  </div>

                  <Button onClick={handleNextStep} className="w-full sm:w-auto">
                    {language === "no" ? "Fortsett til levering" : "Continue to Shipping"}
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Step 2: Delivery Method */}
            {step === 2 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Truck className="w-5 h-5 mr-2" />
                    {language === "no" ? "Leveringsmetode" : "Delivery Method"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {deliveryMethods.map((method) => {
                    const isDisabled = method.value === "free" && subtotal < FREE_SHIPPING_THRESHOLD;
                    return (
                      <label
                        key={method.value}
                        className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-colors ${
                          selectedDelivery === method.value
                            ? "border-green-600 bg-green-50"
                            : isDisabled
                            ? "border-gray-200 bg-gray-50 opacity-60 cursor-not-allowed"
                            : "border-gray-200 hover:border-green-300"
                        }`}
                      >
                        <div className="flex items-center">
                          <input
                            type="radio"
                            name="delivery"
                            value={method.value}
                            checked={selectedDelivery === method.value}
                            onChange={() => !isDisabled && setSelectedDelivery(method.value)}
                            disabled={isDisabled}
                            className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500"
                          />
                          <div className="ml-3">
                            <p className="font-medium text-gray-900">
                              {language === "no" ? method.labelNo : method.labelEn}
                            </p>
                            <p className="text-sm text-gray-500">
                              {language === "no" ? method.time : method.timeEn}
                            </p>
                            {isDisabled && (
                              <p className="text-xs text-orange-600 mt-1">
                                {language === "no"
                                  ? `Tilgjengelig for ordre over ${formatPrice(FREE_SHIPPING_THRESHOLD)}`
                                  : `Available for orders over ${formatPrice(FREE_SHIPPING_THRESHOLD)}`}
                              </p>
                            )}
                          </div>
                        </div>
                        <span className="font-medium">
                          {method.price === 0
                            ? language === "no" ? "Gratis" : "Free"
                            : formatPrice(method.price)}
                        </span>
                      </label>
                    );
                  })}

                  <div className="flex gap-4 pt-4">
                    <Button variant="outline" onClick={() => setStep(1)}>
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      {language === "no" ? "Tilbake" : "Back"}
                    </Button>
                    <Button onClick={handleNextStep}>
                      {language === "no" ? "Fortsett til betaling" : "Continue to Payment"}
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 3: Payment */}
            {step === 3 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CreditCard className="w-5 h-5 mr-2" />
                    {language === "no" ? "Betalingsmetode" : "Payment Method"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {paymentMethods.map((method) => (
                    <label
                      key={method.value}
                      className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-colors ${
                        selectedPayment === method.value
                          ? "border-green-600 bg-green-50"
                          : "border-gray-200 hover:border-green-300"
                      }`}
                    >
                      <div className="flex items-center">
                        <input
                          type="radio"
                          name="payment"
                          value={method.value}
                          checked={selectedPayment === method.value}
                          onChange={() => setSelectedPayment(method.value)}
                          className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500"
                        />
                        <div className="ml-3">
                          <p className="font-medium text-gray-900">
                            {language === "no" ? method.labelNo : method.labelEn}
                          </p>
                          {method.description && (
                            <p className="text-sm text-gray-500">{method.description}</p>
                          )}
                        </div>
                      </div>
                      <span className="text-2xl">{method.icon}</span>
                    </label>
                  ))}

                  {/* Terms */}
                  <div className="pt-4 border-t">
                    <div className="flex items-start space-x-2">
                      <input
                        type="checkbox"
                        id="terms"
                        checked={acceptTerms}
                        onChange={(e) => setAcceptTerms(e.target.checked)}
                        className="w-4 h-4 mt-1 text-green-600 border-gray-300 rounded focus:ring-green-500"
                      />
                      <label htmlFor="terms" className="text-sm text-gray-700">
                        {language === "no"
                          ? "Jeg godtar vilkårene og betingelsene"
                          : "I accept the terms and conditions"} *
                      </label>
                    </div>
                    {errors.terms && <p className="text-sm text-red-600 mt-1">{errors.terms}</p>}
                  </div>

                  <div className="flex gap-4 pt-4">
                    <Button variant="outline" onClick={() => setStep(2)}>
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      {language === "no" ? "Tilbake" : "Back"}
                    </Button>
                    <Button 
                      onClick={handleCompleteOrder} 
                      disabled={isProcessing}
                      className="flex-1"
                    >
                      {isProcessing ? (
                        language === "no" ? "Behandler..." : "Processing..."
                      ) : (
                        <>
                          <Shield className="w-4 h-4 mr-2" />
                          {language === "no" ? "Fullfør kjøpet" : "Complete Purchase"}
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div>
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Package className="w-5 h-5 mr-2" />
                  {language === "no" ? "Din bestilling" : "Your Order"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Products */}
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-3">
                      <div className="relative w-12 h-12 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                        {item.image ? (
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full">
                            <ShoppingBag className="w-6 h-6 text-gray-300" />
                          </div>
                        )}
                        <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs">
                          {item.quantity}
                        </Badge>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {item.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {formatPrice(item.price)} × {item.quantity}
                        </p>
                      </div>
                      <span className="text-sm font-medium">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                <hr />

                {/* Summary */}
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      {language === "no" ? "Delsum" : "Subtotal"}
                    </span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      {language === "no" ? "Frakt" : "Shipping"}
                    </span>
                    <span>
                      {shipping === 0
                        ? language === "no" ? "Gratis" : "Free"
                        : formatPrice(shipping)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      {language === "no" ? "MVA (25%)" : "VAT (25%)"}
                    </span>
                    <span>{formatPrice(tax)}</span>
                  </div>
                </div>

                <hr />

                <div className="flex justify-between text-lg font-semibold">
                  <span>{language === "no" ? "Totalt" : "Total"}</span>
                  <span>{formatPrice(total)}</span>
                </div>

                {/* Delivery Info Summary */}
                {step > 1 && (
                  <div className="pt-4 border-t text-sm">
                    <div className="flex items-start space-x-2">
                      <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                      <div>
                        <p className="font-medium">{deliveryInfo.name}</p>
                        <p className="text-gray-600">{deliveryInfo.address}</p>
                        <p className="text-gray-600">{deliveryInfo.postalCode} {deliveryInfo.city}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Security Badge */}
                <div className="pt-4 flex items-center justify-center gap-2 text-xs text-gray-500">
                  <Shield className="w-4 h-4" />
                  <span>{language === "no" ? "Sikker betaling" : "Secure payment"}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
