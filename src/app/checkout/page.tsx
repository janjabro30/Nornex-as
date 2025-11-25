'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronRight, CreditCard, Building, Smartphone, Lock, Check } from 'lucide-react'
import { useCartStore } from '@/store/cart'
import { Button, Input } from '@/components/ui'

type Step = 'shipping' | 'payment' | 'review'

const paymentMethods = [
  { id: 'vipps', name: 'Vipps', icon: Smartphone, description: 'Pay with Vipps mobile payment' },
  { id: 'card', name: 'Credit/Debit Card', icon: CreditCard, description: 'Visa, Mastercard, American Express' },
  { id: 'invoice', name: 'Invoice', icon: Building, description: 'Pay by invoice within 14 days' },
]

export default function CheckoutPage() {
  const { items, getTotal, clearCart } = useCartStore()
  const [currentStep, setCurrentStep] = useState<Step>('shipping')
  const [selectedPayment, setSelectedPayment] = useState('card')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [orderComplete, setOrderComplete] = useState(false)
  const [orderNumber, setOrderNumber] = useState('')
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    address2: '',
    city: '',
    postalCode: '',
    country: 'Norway',
  })

  const total = getTotal()
  const shipping = total >= 1000 ? 0 : 99
  const grandTotal = total + shipping

  const steps: { key: Step; label: string }[] = [
    { key: 'shipping', label: 'Shipping' },
    { key: 'payment', label: 'Payment' },
    { key: 'review', label: 'Review' },
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    // Simulate order submission
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setOrderNumber(`NX${Math.random().toString(36).substring(2, 10).toUpperCase()}`)
    setOrderComplete(true)
    clearCart()
    setIsSubmitting(false)
  }

  if (items.length === 0 && !orderComplete) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
          <p className="text-gray-600 mb-6">Add some products to your cart before checkout.</p>
          <Link href="/products">
            <Button>Continue Shopping</Button>
          </Link>
        </div>
      </div>
    )
  }

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Order Confirmed!</h1>
          <p className="text-gray-600 mb-2">
            Thank you for your order. We&apos;ve sent a confirmation email to {formData.email}.
          </p>
          <p className="text-gray-600 mb-6">
            Order number: #{orderNumber}
          </p>
          <Link href="/products">
            <Button>Continue Shopping</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Checkout</h1>
            <Lock className="w-5 h-5 text-gray-400" />
          </div>

          {/* Steps */}
          <div className="mt-6 flex items-center">
            {steps.map((step, index) => (
              <div key={step.key} className="flex items-center">
                {index > 0 && (
                  <ChevronRight className="w-5 h-5 text-gray-300 mx-2" />
                )}
                <button
                  onClick={() => {
                    const currentIndex = steps.findIndex(s => s.key === currentStep)
                    if (index <= currentIndex) setCurrentStep(step.key)
                  }}
                  className={`flex items-center gap-2 ${
                    currentStep === step.key
                      ? 'text-blue-600 font-medium'
                      : steps.findIndex(s => s.key === currentStep) > index
                      ? 'text-green-600'
                      : 'text-gray-400'
                  }`}
                >
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-sm ${
                    currentStep === step.key
                      ? 'bg-blue-600 text-white'
                      : steps.findIndex(s => s.key === currentStep) > index
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {steps.findIndex(s => s.key === currentStep) > index ? <Check className="w-4 h-4" /> : index + 1}
                  </span>
                  <span className="hidden sm:inline">{step.label}</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-6">
              {/* Shipping Step */}
              {currentStep === 'shipping' && (
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-6">Shipping Information</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="First Name"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                    />
                    <Input
                      label="Last Name"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                    />
                    <Input
                      label="Email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="sm:col-span-2"
                    />
                    <Input
                      label="Phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="sm:col-span-2"
                    />
                    <Input
                      label="Address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      className="sm:col-span-2"
                    />
                    <Input
                      label="Apartment, suite, etc. (optional)"
                      name="address2"
                      value={formData.address2}
                      onChange={handleInputChange}
                      className="sm:col-span-2"
                    />
                    <Input
                      label="City"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                    />
                    <Input
                      label="Postal Code"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mt-6 flex justify-end">
                    <Button onClick={() => setCurrentStep('payment')}>
                      Continue to Payment
                    </Button>
                  </div>
                </div>
              )}

              {/* Payment Step */}
              {currentStep === 'payment' && (
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-6">Payment Method</h2>
                  <div className="space-y-3">
                    {paymentMethods.map((method) => (
                      <label
                        key={method.id}
                        className={`flex items-center gap-4 p-4 border rounded-lg cursor-pointer transition-colors ${
                          selectedPayment === method.id
                            ? 'border-blue-600 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <input
                          type="radio"
                          name="payment"
                          value={method.id}
                          checked={selectedPayment === method.id}
                          onChange={(e) => setSelectedPayment(e.target.value)}
                          className="w-4 h-4 text-blue-600"
                        />
                        <method.icon className="w-6 h-6 text-gray-600" />
                        <div>
                          <p className="font-medium text-gray-900">{method.name}</p>
                          <p className="text-sm text-gray-500">{method.description}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                  <div className="mt-6 flex justify-between">
                    <Button variant="outline" onClick={() => setCurrentStep('shipping')}>
                      Back
                    </Button>
                    <Button onClick={() => setCurrentStep('review')}>
                      Continue to Review
                    </Button>
                  </div>
                </div>
              )}

              {/* Review Step */}
              {currentStep === 'review' && (
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-6">Review Your Order</h2>
                  
                  {/* Shipping Info */}
                  <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-medium text-gray-900 mb-2">Shipping Address</h3>
                    <p className="text-gray-600">
                      {formData.firstName} {formData.lastName}<br />
                      {formData.address}<br />
                      {formData.address2 && <>{formData.address2}<br /></>}
                      {formData.postalCode} {formData.city}<br />
                      {formData.country}
                    </p>
                    <p className="text-gray-600 mt-2">{formData.email}</p>
                    <p className="text-gray-600">{formData.phone}</p>
                  </div>

                  {/* Payment Info */}
                  <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-medium text-gray-900 mb-2">Payment Method</h3>
                    <p className="text-gray-600 capitalize">{selectedPayment}</p>
                  </div>

                  {/* Items */}
                  <div className="mb-6">
                    <h3 className="font-medium text-gray-900 mb-4">Order Items</h3>
                    <ul className="space-y-3">
                      {items.map((item) => {
                        const translation = item.product.translations?.[0]
                        const image = item.product.images?.[0]
                        const price = item.product.salePrice ?? item.product.price
                        return (
                          <li key={item.product.id} className="flex items-center gap-4">
                            <div className="relative w-16 h-16 bg-gray-100 rounded-lg overflow-hidden">
                              {image ? (
                                <Image
                                  src={image.url}
                                  alt={translation?.name || 'Product'}
                                  fill
                                  className="object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                                  No img
                                </div>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-gray-900 truncate">{translation?.name}</p>
                              <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                            </div>
                            <p className="font-medium text-gray-900">
                              kr {(price * item.quantity).toLocaleString('no-NO')}
                            </p>
                          </li>
                        )
                      })}
                    </ul>
                  </div>

                  <div className="mt-6 flex justify-between">
                    <Button variant="outline" onClick={() => setCurrentStep('payment')}>
                      Back
                    </Button>
                    <Button onClick={handleSubmit} isLoading={isSubmitting}>
                      Place Order
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal ({items.length} items)</span>
                  <span className="text-gray-900">kr {total.toLocaleString('no-NO')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-gray-900">
                    {shipping === 0 ? 'Free' : `kr ${shipping.toLocaleString('no-NO')}`}
                  </span>
                </div>
                {shipping > 0 && (
                  <p className="text-xs text-gray-500">
                    Free shipping on orders over kr 1,000
                  </p>
                )}
              </div>

              <div className="border-t mt-4 pt-4">
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>kr {grandTotal.toLocaleString('no-NO')}</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">Including VAT</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
