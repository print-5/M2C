"use client"

import Link from "next/link"
import Image from "next/image"
import { CheckCircle, Package, Truck, Mail, Download, ArrowRight, Clock, AlertCircle, CreditCard, MapPin, Phone } from "lucide-react"
import { useState } from "react"
import { getProductsByIds, Product } from "@/data/products"

interface OrderItem {
  productId: string;
  quantity: number;
}

interface OrderConfirmationProps {
  isConfirmed?: boolean;
  orderItems?: OrderItem[];
}

export default function OrderConfirmation({ 
  isConfirmed = true, 
  orderItems = [
    { productId: '4', quantity: 2 },
    { productId: '5', quantity: 1 },
    { productId: '6', quantity: 1 }
  ]
}: OrderConfirmationProps) {
  const [orderStatus] = useState(isConfirmed)
  const orderNumber = "ORD-2024-001234"
  const estimatedDelivery = "January 20-22, 2024"
  
  // Get products data based on order items
  const orderedProducts = getProductsByIds(orderItems.map(item => item.productId))
  
  // Calculate order totals
  const subtotal = orderItems.reduce((total, item) => {
    const product = orderedProducts.find(p => p.id === item.productId)
    return total + (product ? product.price * item.quantity : 0)
  }, 0)
  
  const tax = subtotal * 0.08 // 8% tax
  const shipping = 0 // Free shipping
  const total = subtotal + tax + shipping

  return (
    <div className="min-h-screen bg-gray-50 py-8 sm:py-12">
      <div className="max-w-420 mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Status Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className={`inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full mb-4 sm:mb-6 ${
            orderStatus 
              ? 'bg-green-100 border-2 border-green-200' 
              : 'bg-red-200 border-2 border-red-400'
          }`}>
            {orderStatus ? (
              <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10 text-green-600" />
            ) : (
              <Clock className="w-8 h-8 sm:w-10 sm:h-10 text-red-600" />
            )}
          </div>
          
          <h1 className={`text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 ${
            orderStatus ? 'text-gray-900' : 'text-gray-700'
          }`}>
            {orderStatus ? 'Order Confirmed!' : 'Order Pending'}
          </h1>
          
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {orderStatus 
              ? 'Thank you for your purchase! Your order has been successfully placed and is being processed.'
              : 'Your order is being reviewed. We\'ll send you a confirmation email once it\'s approved.'
            }
          </p>
          
          {!orderStatus && (
            <div className="mt-4 sm:mt-6 inline-flex items-center gap-2 px-4 py-2 bg-gray-100 border border-gray-300 rounded-full">
              <AlertCircle className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">Processing time: 2-4 hours</span>
            </div>
          )}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mb-8 sm:mb-12">
          
          {/* Order Details - Left Column */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Order Information Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 bg-black border-b border-gray-200">
                <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                  <Package className="w-6 h-6 text-white" />
                  Order Information
                </h2>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-2">
                    <h3 className="font-semibold text-gray-700 text-sm uppercase tracking-wide">Order Number</h3>
                    <div className="bg-gray-50 border border-gray-300 rounded-lg p-3">
                      <p className="text-lg font-mono font-bold text-gray-900">{orderNumber}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-semibold text-gray-700 text-sm uppercase tracking-wide">Order Date</h3>
                    <p className="text-lg text-gray-800 font-medium">January 15, 2024</p>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-semibold text-gray-700 text-sm uppercase tracking-wide">Estimated Delivery</h3>
                    <p className="text-lg text-gray-800 font-medium">{estimatedDelivery}</p>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-semibold text-gray-700 text-sm uppercase tracking-wide">Payment Method</h3>
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-5 h-5 text-gray-600" />
                      <span className="text-lg text-gray-800 font-medium">•••• 4242</span>
                    </div>
                  </div>
                </div>

                {/* Status Timeline */}
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Order Status</h3>
                  <div className="space-y-4">
                    <div className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-200 ${
                      orderStatus ? 'bg-gray-100 border border-gray-300' : 'bg-gray-200 border border-gray-400'
                    }`}>
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        orderStatus ? 'bg-gray-200' : 'bg-gray-300'
                      }`}>
                        {orderStatus ? (
                          <CheckCircle className="w-5 h-5 text-gray-800" />
                        ) : (
                          <Clock className="w-5 h-5 text-gray-600" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className={`font-semibold ${orderStatus ? 'text-gray-900' : 'text-gray-700'}`}>
                          {orderStatus ? 'Order Confirmed' : 'Pending Confirmation'}
                        </h4>
                        <p className={`text-sm ${orderStatus ? 'text-gray-700' : 'text-gray-600'}`}>
                          {orderStatus ? 'Your order has been confirmed and is being prepared' : 'We\'re reviewing your order details'}
                        </p>
                      </div>
                    </div>
                    
                    <div className={`flex items-center gap-4 p-4 rounded-xl ${
                      orderStatus ? 'bg-gray-50 border border-gray-200' : 'bg-gray-100 border border-gray-200'
                    }`}>
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        orderStatus ? 'bg-gray-100' : 'bg-gray-200'
                      }`}>
                        <Package className={`w-5 h-5 ${orderStatus ? 'text-gray-700' : 'text-gray-400'}`} />
                      </div>
                      <div className="flex-1">
                        <h4 className={`font-semibold ${orderStatus ? 'text-gray-800' : 'text-gray-500'}`}>
                          Processing
                        </h4>
                        <p className={`text-sm ${orderStatus ? 'text-gray-600' : 'text-gray-400'}`}>
                          {orderStatus ? 'Preparing your items for shipment' : 'Waiting for confirmation'}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 p-4 bg-gray-100 border border-gray-200 rounded-xl">
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                        <Truck className="w-5 h-5 text-gray-400" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-500">Shipped</h4>
                        <p className="text-sm text-gray-400">Your order will be shipped soon</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 bg-black border-b border-gray-200">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-white" />
                  Shipping Address
                </h2>
              </div>
              <div className="p-6">
                <div className="space-y-2">
                  <p className="font-semibold text-gray-900">John Doe</p>
                  <p className="text-gray-700">123 Main Street, Apt 4B</p>
                  <p className="text-gray-700">New York, NY 10001</p>
                  <p className="text-gray-700">United States</p>
                  <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-200">
                    <Phone className="w-4 h-4 text-gray-600" />
                    <span className="text-gray-700">+1 (555) 123-4567</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary - Right Column */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden sticky top-8">
              <div className="px-6 py-4 bg-black border-b border-gray-200">
                <h2 className="text-xl font-bold text-white">Order Summary</h2>
              </div>
              
              <div className="p-6">
                <div className="space-y-4 mb-6">
                  {orderItems.map((item, index) => {
                    const product = orderedProducts.find(p => p.id === item.productId)
                    if (!product) return null
                    
                    return (
                      <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <div className="w-12 h-12 bg-gray-200 rounded-lg shrink-0 overflow-hidden">
                          <Image
                            src={product.image}
                            alt={product.name}
                            width={48}
                            height={48}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-gray-900 text-sm truncate">{product.name}</h4>
                          <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
                          <p className="text-xs text-gray-500">{product.category}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">${(product.price * item.quantity).toFixed(2)}</p>
                          {item.quantity > 1 && (
                            <p className="text-xs text-gray-500">${product.price.toFixed(2)} each</p>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
                
                <div className="border-t border-gray-200 pt-4 space-y-3">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className="font-medium text-gray-800">Free</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Tax</span>
                    <span className="font-medium">${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold text-gray-900 pt-3 border-t border-gray-200">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Notification Settings */}
                <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-gray-600 mt-0.5 shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm">Email Updates</h4>
                      <p className="text-xs text-gray-700 mt-1">
                        We'll send you updates about your order status and tracking information.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-all duration-200 transform hover:scale-105">
              <Download className="w-5 h-5" />
              Download Receipt
            </button>
            
            {orderStatus && (
              <Link href="/order" className="w-full sm:w-auto">
                <button className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-900 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg">
                  Track Order
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            )}
            
            <Link href="/" className="w-full sm:w-auto">
              <button className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-black hover:bg-gray-800 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg">
                Continue Shopping
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </div>
          
          {!orderStatus && (
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600 mb-2">Need help with your order?</p>
              <Link href="/contact" className="text-gray-800 hover:text-black font-semibold text-sm">
                Contact Support
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
