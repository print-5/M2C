"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { 
  ArrowLeft,
  Package,
  Truck,
  CheckCircle,
  Calendar,
  Filter,
  Search,
  ChevronRight,
  Eye,
  Download,
  Star,
  Clock,
  Plus,
  ShoppingCart
} from "lucide-react"
import { products } from "@/components/mockData/products"
import Dropdown from "@/components/UI/Dropdown"

// Interface definitions
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

// Mock data for orders list using actual product data
const orders: Order[] = [
  {
    id: "1",
    orderNumber: "ORD-2024-001234",
    date: "2024-01-15",
    status: "processing",
    total: 503.24,
    estimatedDelivery: "2024-01-24",
    items: [
      {
        id: products[0].id,
        name: products[0].name,
        image: products[0].images[0],
        quantity: 2,
        price: products[0].price,
        size: products[0].dimensions || "Standard",
        color: "Natural"
      },
      {
        id: products[1].id,
        name: products[1].name,
        image: products[1].images[0],
        quantity: 1,
        price: products[1].price,
        size: products[1].dimensions || "One Size",
        color: "Natural Linen"
      }
    ]
  },
  {
    id: "2",
    orderNumber: "ORD-2024-001233",
    date: "2024-01-10",
    status: "delivered",
    total: 289.99,
    trackingNumber: "TRK987654321",
    items: [
      {
        id: products[2].id,
        name: products[2].name,
        image: products[2].images[0],
        quantity: 3,
        price: products[2].price,
        size: products[2].dimensions || "Standard",
        color: "Natural"
      },
      {
        id: products[5].id,
        name: products[5].name,
        image: products[5].images[0],
        quantity: 1,
        price: products[5].price,
        size: products[5].dimensions || "Bath Size",
        color: "White"
      }
    ]
  },
  {
    id: "3",
    orderNumber: "ORD-2024-001232",
    date: "2024-01-05",
    status: "delivered",
    total: 159.99,
    trackingNumber: "TRK123456789",
    items: [
      {
        id: products[3].id,
        name: products[3].name,
        image: products[3].images[0],
        quantity: 1,
        price: products[3].price,
        size: products[3].dimensions || "Standard",
        color: "Heritage Pattern"
      }
    ]
  },
  {
    id: "4",
    orderNumber: "ORD-2024-001231",
    date: "2023-12-28",
    status: "shipped",
    total: 445.50,
    trackingNumber: "TRK555666777",
    estimatedDelivery: "2024-01-02",
    items: [
      {
        id: products[6].id,
        name: products[6].name,
        image: products[6].images[0],
        quantity: 2,
        price: products[6].price,
        size: "Set",
        color: "Natural Bamboo"
      },
      {
        id: products[4].id,
        name: products[4].name,
        image: products[4].images[0],
        quantity: 2,
        price: products[4].price,
        size: products[4].dimensions || "Standard",
        color: "Traditional"
      }
    ]
  },
  {
    id: "5",
    orderNumber: "ORD-2023-001230",
    date: "2023-12-20",
    status: "cancelled",
    total: 199.99,
    items: [
      {
        id: products[7].id,
        name: products[7].name,
        image: products[7].images[0],
        quantity: 1,
        price: products[7].price,
        size: products[7].dimensions || "Set of 4",
        color: "Natural Linen"
      }
    ]
  }
]

export default function OrderList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [expandedOrders, setExpandedOrders] = useState<Set<string>>(new Set())

  const toggleOrderExpansion = (orderId: string) => {
    setExpandedOrders(prev => {
      const newSet = new Set(prev)
      if (newSet.has(orderId)) {
        newSet.delete(orderId)
      } else {
        newSet.add(orderId)
      }
      return newSet
    })
  }

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

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.items.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesStatus = statusFilter === "all" || order.status.toLowerCase() === statusFilter.toLowerCase()
    return matchesSearch && matchesStatus
  })

  const currentOrders = filteredOrders.filter(order => 
    order.status === "processing" || order.status === "shipped"
  )
  
  const pastOrders = filteredOrders.filter(order => 
    order.status === "delivered" || order.status === "cancelled"
  )

  return (
    <div className="min-h-screen bg-slate-50 py-8 font-sans">
      <div className="max-w-420 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Main Content - Orders */}
          <div className="xl:col-span-3">
            <div className="max-w-6xl">
              {/* Header */}
              <div className="mb-8">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Package className="w-8 h-8 text-blue-600" />
                    <div>
                      <h1 className="text-4xl font-bold text-slate-900 mb-2">My Orders</h1>
                      <p className="text-slate-600">Track and manage your orders</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-slate-900">{filteredOrders.length}</p>
                    <p className="text-sm text-slate-600">Total Orders</p>
                  </div>
                </div>
              </div>

              {/* Search and Filter */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-8">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search orders by ID or product name..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border rounded-md border-slate-300 horounded-xl focus:ring-4 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="min-w-40">
                      <Dropdown
                        id="status-filter"
                        value={statusFilter}
                        options={[
                          { value: "all", label: "All Orders" },
                          { value: "processing", label: "Processing" },
                          { value: "shipped", label: "Shipped" },
                          { value: "delivered", label: "Delivered" },
                          { value: "cancelled", label: "Cancelled" }
                        ]}
                        onChange={(value) => setStatusFilter(value as string)}
                        placeholder="Filter by status"
                      />
                    </div>
                  </div>
                </div>
              </div>

        {/* Current Orders */}
        {currentOrders.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Current Orders</h2>
            <div className="space-y-6">
              {currentOrders.map((order) => (
                <div key={order.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
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
                    {(expandedOrders.has(order.id) ? order.items : order.items.slice(0, 2)).map((item) => (
                      <div key={item.id} className="flex items-center gap-4 p-3 bg-slate-50 rounded-lg">
                        <div className="relative w-16 h-16 bg-slate-100 rounded-lg overflow-hidden border border-slate-200">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>
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
                    
                    {/* More/Less Button */}
                    {order.items.length > 2 && (
                      <div className="flex justify-center pt-2">
                        <button
                          onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            toggleOrderExpansion(order.id)
                          }}
                          className="flex items-center gap-2 px-4 py-2 text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          {expandedOrders.has(order.id) ? (
                            <>
                              <ChevronRight className="w-4 h-4 rotate-180" />
                              Show Less
                            </>
                          ) : (
                            <>
                              <ChevronRight className="w-4 h-4 rotate-90" />
                              Show {order.items.length - 2} More Items
                            </>
                          )}
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Order Actions */}
                  <div className="flex flex-wrap gap-3 pt-4 border-t border-slate-200">
                    <Link href={`/order/${order.orderNumber}`}>
                      <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        <Eye className="w-4 h-4" />
                        View Details
                      </button>
                    </Link>
                    {order.trackingNumber && (
                      <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors">
                        <Truck className="w-4 h-4" />
                        Track Order
                      </button>
                    )}
                    <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors">
                      <Download className="w-4 h-4" />
                      Download Invoice /Packing List
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
          </div>
        )}

        {/* Past Orders */}
        {pastOrders.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Past Orders</h2>
            <div className="space-y-6">
              {pastOrders.map((order) => (
                <div key={order.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
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
                    {(expandedOrders.has(order.id) ? order.items : order.items.slice(0, 2)).map((item) => (
                      <div key={item.id} className="flex items-center gap-4 p-3 bg-slate-50 rounded-lg">
                        <div className="relative w-16 h-16 bg-slate-100 rounded-lg overflow-hidden border border-slate-200">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>
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
                    
                    {/* More/Less Button */}
                    {order.items.length > 2 && (
                      <div className="flex justify-center pt-2">
                        <button
                          onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            toggleOrderExpansion(order.id)
                          }}
                          className="flex items-center gap-2 px-4 py-2 text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          {expandedOrders.has(order.id) ? (
                            <>
                              <ChevronRight className="w-4 h-4 rotate-180" />
                              Show Less
                            </>
                          ) : (
                            <>
                              <ChevronRight className="w-4 h-4 rotate-90" />
                              Show {order.items.length - 2} More Items
                            </>
                          )}
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Order Actions */}
                  <div className="flex flex-wrap gap-3 pt-4 border-t border-slate-200">
                    <Link href={`/order/${order.orderNumber}`}>
                      <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        <Eye className="w-4 h-4" />
                        View Details
                      </button>
                    </Link>
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
                    {order.status === "delivered" && (
                      <button className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors">
                        <Package className="w-4 h-4" />
                        Reorder
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {filteredOrders.length === 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-12 text-center">
            <Package className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-900 mb-2">No Orders Found</h3>
            <p className="text-slate-600 mb-6">
              {searchTerm || statusFilter !== "all" 
                ? "Try adjusting your search or filter criteria"
                : "You haven't placed any orders yet"
              }
            </p>
            <Link href="/products">
              <button className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors">
                Start Shopping
              </button>
            </Link>
          </div>
        )}
            </div>
          </div>

          {/* Sidebar - Product Recommendations */}
          <div className="xl:col-span-1">
            <div className="space-y-6 sticky top-8">
              {/* Top Selling Products */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-500" />
                  Top Selling Products
                </h3>
                <div className="space-y-4">
                  {products.slice(0, 4).map((item) => (
                    <div key={item.id} className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer group">
                      <div className="relative w-12 h-12 bg-slate-100 rounded-lg overflow-hidden">
                        <Image
                          src={item.images[0]}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-slate-900 text-sm line-clamp-2 group-hover:text-blue-600 transition-colors">
                          {item.name}
                        </h4>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-slate-900 font-semibold text-sm">${item.price}</span>
                          {item.originalPrice && (
                            <span className="text-slate-500 text-xs line-through">${item.originalPrice}</span>
                          )}
                        </div>
                        <div className="flex items-center gap-1 mt-1">
                          <Star className="w-3 h-3 text-yellow-400 fill-current" />
                          <span className="text-xs text-slate-600">{item.rating}</span>
                          <span className="text-xs text-slate-500">({item.reviews})</span>
                        </div>
                      </div>
                      <button className="p-1 text-slate-400 hover:text-blue-600 transition-colors">
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
                <Link href="/products">
                  <button className="w-full mt-4 text-sm text-blue-600 hover:text-blue-800 font-medium py-2 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors">
                    View All Products
                  </button>
                </Link>
              </div>

              {/* New Arrivals */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                  <Package className="w-5 h-5 text-green-600" />
                  New Arrivals
                </h3>
                <div className="space-y-4">
                  {products.slice(4, 8).map((item) => (
                    <div key={item.id} className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer group">
                      <div className="relative w-12 h-12 bg-slate-100 rounded-lg overflow-hidden">
                        <Image
                          src={item.images[0]}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-slate-900 text-sm line-clamp-2 group-hover:text-blue-600 transition-colors">
                          {item.name}
                        </h4>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-slate-900 font-semibold text-sm">${item.price}</span>
                          {item.originalPrice && (
                            <span className="text-slate-500 text-xs line-through">${item.originalPrice}</span>
                          )}
                          {item.discount && (
                            <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">
                              {item.discount}% OFF
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-1 mt-1">
                          <Star className="w-3 h-3 text-yellow-400 fill-current" />
                          <span className="text-xs text-slate-600">{item.rating}</span>
                          <span className="text-xs text-slate-500">({item.reviews})</span>
                        </div>
                      </div>
                      <button className="p-1 text-slate-400 hover:text-blue-600 transition-colors">
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
                <Link href="/products">
                  <button className="w-full mt-4 text-sm text-green-600 hover:text-green-800 font-medium py-2 border border-green-200 rounded-lg hover:bg-green-50 transition-colors">
                    View New Arrivals
                  </button>
                </Link>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Link href="/products">
                    <button className="w-full flex items-center gap-3 p-3 text-left border border-slate-200 rounded-lg hover:shadow-md transition-all hover:border-blue-300">
                      <Package className="w-5 h-5 text-blue-600" />
                      <span className="font-medium text-slate-900">Browse Products</span>
                    </button>
                  </Link>
                  <Link href="/cart">
                    <button className="w-full flex items-center gap-3 p-3 text-left border border-slate-200 rounded-lg hover:shadow-md transition-all hover:border-green-300">
                      <ShoppingCart className="w-5 h-5 text-green-600" />
                      <span className="font-medium text-slate-900">View Cart</span>
                    </button>
                  </Link>
                  <Link href="/profile">
                    <button className="w-full flex items-center gap-3 p-3 text-left border border-slate-200 rounded-lg hover:shadow-md transition-all hover:border-purple-300">
                      <Eye className="w-5 h-5 text-purple-600" />
                      <span className="font-medium text-slate-900">Account Settings</span>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}