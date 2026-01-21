"use client"

import Link from "next/link"
import { CheckCircle, Package, Truck, Mail, Download, ArrowRight } from "lucide-react"

export default function OrderConfirmation() {
  const orderNumber = "ORD-2024-001234"
  const estimatedDelivery = "January 20-22, 2024"

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Order Confirmed!</h1>
          <p className="text-lg text-slate-600">Thank you for your purchase. Your order has been successfully placed.</p>
        </div>

        {/* Order Details */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-8">
          <div className="px-6 py-4 border-b border-slate-200 bg-linear-to-r from-green-50 to-white">
            <h2 className="text-xl font-bold text-slate-900">Order Details</h2>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="font-semibold text-slate-900 mb-2">Order Number</h3>
                <p className="text-lg font-mono text-blue-600 bg-blue-50 px-3 py-2 rounded-lg border border-blue-200">
                  {orderNumber}
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-2">Estimated Delivery</h3>
                <p className="text-lg text-slate-700">{estimatedDelivery}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl">
                <Mail className="w-6 h-6 text-blue-600" />
                <div>
                  <h4 className="font-medium text-slate-900">Confirmation Email</h4>
                  <p className="text-sm text-slate-600">Sent to your email</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl">
                <Package className="w-6 h-6 text-purple-600" />
                <div>
                  <h4 className="font-medium text-slate-900">Processing</h4>
                  <p className="text-sm text-slate-600">1-2 business days</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl">
                <Truck className="w-6 h-6 text-green-600" />
                <div>
                  <h4 className="font-medium text-slate-900">Free Shipping</h4>
                  <p className="text-sm text-slate-600">Standard delivery</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-8">
          <div className="px-6 py-4 border-b border-slate-200">
            <h2 className="text-xl font-bold text-slate-900">Order Summary</h2>
          </div>
          
          <div className="p-6">
            <div className="space-y-4">
              {[
                { name: "Premium Cotton T-Shirt", quantity: 2, price: 29.99 },
                { name: "Denim Jeans - Slim Fit", quantity: 1, price: 79.99 },
                { name: "Leather Wallet", quantity: 1, price: 49.99 }
              ].map((item, index) => (
                <div key={index} className="flex justify-between items-center py-2">
                  <div>
                    <span className="font-medium text-slate-900">{item.name}</span>
                    <span className="text-slate-600 ml-2">× {item.quantity}</span>
                  </div>
                  <span className="font-medium text-slate-900">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              
              <div className="border-t border-slate-200 pt-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-600">Subtotal</span>
                  <span className="font-medium">$139.97</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Shipping</span>
                  <span className="font-medium text-green-600">Free</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Tax</span>
                  <span className="font-medium">$11.20</span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-2 border-t border-slate-200">
                  <span>Total</span>
                  <span>$151.17</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="flex items-center justify-center gap-2 px-6 py-3 bg-slate-100 text-slate-700 font-medium rounded-xl hover:bg-slate-200 transition-colors">
            <Download className="w-5 h-5" />
            Download Receipt
          </button>
          <Link href="/profile">
            <button className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors">
              Track Order
              <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </div>

        {/* Continue Shopping */}
        <div className="text-center mt-8">
          <Link href="/">
            <button className="text-blue-600 hover:text-blue-700 font-medium">
              Continue Shopping
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
