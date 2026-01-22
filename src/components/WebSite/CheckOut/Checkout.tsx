"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { 
  CreditCard, 
  ArrowLeft,
  CheckCircle,
  Truck,
  Lock,
  Shield
} from "lucide-react"
import ShippingForm from "./CheckoutProcess/ShippingForm"
import PaymentForm from "./CheckoutProcess/PaymentForm"
import ReviewOrder from "./CheckoutProcess/ReviewOrder"

export interface CheckoutFormData {
  // Shipping Information
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  zipCode: string
  country: string
  
  // Payment Information
  paymentMethod: "card" | "upi"
  cardNumber: string
  expiryDate: string
  cvv: string
  cardName: string
  upiId: string
  
  // Options
  saveInfo: boolean
  sameAsBilling: boolean
  shippingMethod: string
}

export default function Checkout() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<CheckoutFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
    paymentMethod: "card",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: "",
    upiId: "",
    saveInfo: false,
    sameAsBilling: true,
    shippingMethod: "standard"
  })

  const orderSummary = {
    subtotal: 139.97,
    shipping: 0,
    tax: 11.20,
    total: 151.17
  }

  const updateFormData = <K extends keyof CheckoutFormData>(field: K, value: CheckoutFormData[K]) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const steps = [
    { id: 1, name: "Shipping", icon: Truck },
    { id: 2, name: "Payment", icon: CreditCard },
    { id: 3, name: "Review", icon: CheckCircle }
  ]

  const renderStepIndicator = () => (
    <div className="max-w-2xl mx-auto flex items-center justify-center mb-8 bg-[#fdfdfd] px-4 py-4 rounded-xl shadow-sm border border-slate-200">
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-center">
          <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
            currentStep >= step.id 
              ? "bg-gray-800 border-gray-800 text-white" 
              : "border-slate-300 text-slate-400"
          }`}>
            {currentStep > step.id ? (
              <CheckCircle className="w-5 h-5" />
            ) : (
              <step.icon className="w-5 h-5" />
            )}
          </div>
          <span className={`ml-2 text-sm font-medium ${
            currentStep >= step.id ? "text-gray-800" : "text-slate-400"
          }`}>
            {step.name}
          </span>
          {index < steps.length - 1 && (
            <div className={`w-16 h-0.5 mx-4 ${
              currentStep > step.id ? "bg-gray-800" : "bg-slate-300"
            }`} />
          )}
        </div>
      ))}
    </div>
  )

  const renderShippingForm = () => (
    <ShippingForm formData={formData} updateFormData={updateFormData} />
  )

  const renderPaymentForm = () => (
    <PaymentForm formData={formData} updateFormData={updateFormData} />
  )

  const renderReview = () => (
    <ReviewOrder formData={formData} />
  )

  return (
    <div className="min-h-screen bg-slate-50 py-8 font-sans">
      <div className="max-w-420 mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/order">
            <button className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-4">
              <ArrowLeft className="w-4 h-4" />
              Back to Cart
            </button>
          </Link>
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Checkout</h1>
          <p className="text-slate-600">Complete your purchase securely</p>
        </div>

        {renderStepIndicator()}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-200 bg-linear-to-r from-gray-700 to-gray-800">
                <h2 className="text-xl font-bold text-[#fffff4]">
                  {currentStep === 1 && "Shipping Information"}
                  {currentStep === 2 && "Payment Information"}
                  {currentStep === 3 && "Review Your Order"}
                </h2>
              </div>

              <div className="p-6">
              {currentStep === 1 && renderShippingForm()}
              {currentStep === 2 && renderPaymentForm()}
              {currentStep === 3 && renderReview()}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8 pt-6 border-t border-slate-200">
                <button
                  onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                  disabled={currentStep === 1}
                  className="px-6 py-3 border border-slate-300 text-slate-700 font-medium rounded-xl hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Previous
                </button>
                <button
                  onClick={() => {
                    if (currentStep < 3) {
                      setCurrentStep(currentStep + 1)
                    } else {
                      router.push("/order-confirmation")
                    }
                  }}
                  className="px-8 py-3 bg-linear-to-r from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
                >
                  {currentStep === 3 ? "Place Order" : "Continue"}
                </button>
              </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden sticky top-8">
              <div className="px-6 py-4 border-b border-slate-200 bg-linear-to-r from-slate-50 to-white">
                <h2 className="text-xl font-bold text-slate-900">Order Summary</h2>
              </div>

              <div className="p-6">
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-slate-600">Subtotal</span>
                  <span className="font-medium">${orderSummary.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Shipping</span>
                  <span className="font-medium">
                    {orderSummary.shipping === 0 ? "Free" : `$${orderSummary.shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Tax</span>
                  <span className="font-medium">${orderSummary.tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-slate-200 pt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>${orderSummary.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Security Badges */}
              <div className="space-y-3 pt-4 border-t border-slate-200">
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <Lock className="w-4 h-4 text-green-600" />
                  <span>SSL Encrypted Checkout</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <Shield className="w-4 h-4 text-blue-600" />
                  <span>Money Back Guarantee</span>
                </div>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
