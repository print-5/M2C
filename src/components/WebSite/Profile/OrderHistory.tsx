"use client"

import { Package, Eye, Download, Star, Truck, CheckCircle, Clock } from 'lucide-react'
import { products } from '@/components/mockData/products'

interface OrderItem {
  id: string
  name: string
  image: string
  quantity: number
  price: number
  size?: string
  color?: string
}

interface Order {
  id: string
  orderNumber: string
  date: string
  status: 'delivered' | 'shipped' | 'processing' | 'cancelled'
  total: number
  items: OrderItem[]
  trackingNumber?: string
  estimatedDelivery?: string
}

export default function OrderHistory() {
  const orders: Order[] = [
    {
      id: '1',
      orderNumber: 'ORD-2024-001',
      date: '2024-01-15',
      status: 'delivered',
      total: products[0].price * 2 + products[1].price,
      trackingNumber: 'TRK123456789',
      items: [
        {
          id: products[0].id,
          name: products[0].name,
          image: products[0].images[0],
          quantity: 2,
          price: products[0].price
        },
        {
          id: products[1].id,
          name: products[1].name,
          image: products[1].images[0],
          quantity: 1,
          price: products[1].price
        }
      ]
    },
    {
      id: '2',
      orderNumber: 'ORD-2024-002',
      date: '2024-01-10',
      status: 'shipped',
      total: products[2].price + products[3].price,
      trackingNumber: 'TRK987654321',
      estimatedDelivery: '2024-01-20',
      items: [
        {
          id: products[2].id,
          name: products[2].name,
          image: products[2].images[0],
          quantity: 2,
          price: products[2].price
        },
        {
          id: products[3].id,
          name: products[3].name,
          image: products[3].images[0],
          quantity: 1,
          price: products[3].price
        }
      ]
    },
    {
      id: '3',
      orderNumber: 'ORD-2024-003',
      date: '2024-01-05',
      status: 'processing',
      total: products[4].price + products[5].price,
      estimatedDelivery: '2024-01-25',
      items: [
        {
          id: products[4].id,
          name: products[4].name,
          image: products[4].images[0],
          quantity: 1,
          price: products[4].price
        },
        {
          id: products[5].id,
          name: products[5].name,
          image: products[5].images[0],
          quantity: 1,
          price: products[5].price
        }
      ]
    }
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case 'shipped':
        return <Truck className="w-5 h-5 text-blue-600" />
      case 'processing':
        return <Clock className="w-5 h-5 text-yellow-600" />
      case 'cancelled':
        return <Package className="w-5 h-5 text-gray-600" />
      default:
        return <Package className="w-5 h-5 text-slate-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'shipped':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'processing':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'cancelled':
        return 'bg-gray-100 text-gray-800 border-gray-200'
      default:
        return 'bg-slate-100 text-slate-800 border-slate-200'
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <div className="flex items-center gap-3 mb-6">
        <Package className="w-6 h-6 text-blue-600" />
        <h2 className="text-xl font-bold text-slate-900">Order History</h2>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-12">
          <Package className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-slate-900 mb-2">No orders yet</h3>
          <p className="text-slate-600 mb-6">Start shopping to see your orders here</p>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="border border-slate-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              {/* Order Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(order.status)}
                    <div>
                      <h3 className="font-semibold text-slate-900">{order.orderNumber}</h3>
                      <p className="text-sm text-slate-600">Placed on {new Date(order.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(order.status)}`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-slate-900">${order.total.toFixed(2)}</p>
                  {order.trackingNumber && (
                    <p className="text-sm text-slate-600">Tracking: {order.trackingNumber}</p>
                  )}
                </div>
              </div>

              {/* Order Items */}
              <div className="space-y-3 mb-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 p-3 bg-slate-50 rounded-lg">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg border border-slate-200"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-slate-900">{item.name}</h4>
                      <div className="flex items-center gap-4 text-sm text-slate-600 mt-1">
                        <span>Qty: {item.quantity}</span>
                        {item.size && <span>Size: {item.size}</span>}
                        {item.color && <span>Color: {item.color}</span>}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-slate-900">${(item.price * item.quantity).toFixed(2)}</p>
                      <p className="text-sm text-slate-600">${item.price.toFixed(2)} each</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Actions */}
              <div className="flex flex-wrap gap-3 pt-4 border-t border-slate-200">
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <Eye className="w-4 h-4" />
                  View Details
                </button>
                {order.status === 'delivered' && (
                  <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors">
                    <Star className="w-4 h-4" />
                    Write Review
                  </button>
                )}
                {order.trackingNumber && (
                  <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors">
                    <Truck className="w-4 h-4" />
                    Track Order
                  </button>
                )}
                <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors">
                  <Download className="w-4 h-4" />
                  Download Invoice / Packing List
                </button>
              </div>

              {/* Estimated Delivery */}
              {order.estimatedDelivery && order.status !== 'delivered' && (
                <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <Clock className="w-4 h-4 inline mr-2" />
                    Estimated delivery: {new Date(order.estimatedDelivery).toLocaleDateString()}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
