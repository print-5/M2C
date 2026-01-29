'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/UI/Card'
import { Button } from '@/components/UI/Button'
import { Badge } from '@/components/UI/Badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/UI/Table'
import { Breadcrumb } from '@/components/AdminDashboard/Breadcrumb/Breadcrumb'
import { 
  ShoppingCart, 
  Package, 
  Truck, 
  CheckCircle, 
  Clock, 
  AlertTriangle,
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Download,
  X,
  MapPin,
  Phone,
  Mail,
  Calendar,
  DollarSign
} from 'lucide-react'
import Link from 'next/link'
import Dropdown from '@/components/UI/Dropdown'

interface OrderItem {
  id: string
  productName: string
  sku: string
  quantity: number
  price: number
  total: number
  image?: string
}

interface ShippingAddress {
  name: string
  street: string
  city: string
  state: string
  zipCode: string
  country: string
  phone: string
}

interface Order {
  id: string
  orderNumber: string
  customer: {
    name: string
    email: string
    phone: string
  }
  vendor: {
    name: string
    id: string
  }
  items: OrderItem[]
  subtotal: number
  shipping: number
  tax: number
  total: number
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'returned'
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded'
  shippingAddress: ShippingAddress
  trackingNumber?: string
  estimatedDelivery?: string
  createdAt: string
  updatedAt: string
  notes?: string
}

// Mock orders data for textile business
const mockOrders: Order[] = [
  {
    id: '1',
    orderNumber: 'ORD-2024-001',
    customer: {
      name: 'Sarah Johnson',
      email: 'sarah.johnson@email.com',
      phone: '+1 (555) 123-4567'
    },
    vendor: {
      name: 'Cotton Mills Ltd',
      id: 'vendor-1'
    },
    items: [
      {
        id: 'item-1',
        productName: 'Premium Cotton Bed Sheet Set - Queen',
        sku: 'CS-Q-WHT-001',
        quantity: 2,
        price: 89.99,
        total: 179.98
      },
      {
        id: 'item-2',
        productName: 'Memory Foam Pillow',
        sku: 'MFP-S-WHT-004',
        quantity: 4,
        price: 34.99,
        total: 139.96
      }
    ],
    subtotal: 319.94,
    shipping: 15.00,
    tax: 25.59,
    total: 360.53,
    status: 'pending',
    paymentStatus: 'paid',
    shippingAddress: {
      name: 'Sarah Johnson',
      street: '123 Main Street, Apt 4B',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'United States',
      phone: '+1 (555) 123-4567'
    },
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T10:30:00Z'
  },
  {
    id: '2',
    orderNumber: 'ORD-2024-002',
    customer: {
      name: 'Michael Chen',
      email: 'michael.chen@email.com',
      phone: '+1 (555) 987-6543'
    },
    vendor: {
      name: 'Textile Pro',
      id: 'vendor-2'
    },
    items: [
      {
        id: 'item-3',
        productName: 'Luxury Bath Towel Set',
        sku: 'BT-L-BLU-002',
        quantity: 1,
        price: 24.99,
        total: 24.99
      }
    ],
    subtotal: 24.99,
    shipping: 8.00,
    tax: 2.64,
    total: 35.63,
    status: 'shipped',
    paymentStatus: 'paid',
    shippingAddress: {
      name: 'Michael Chen',
      street: '456 Oak Avenue',
      city: 'Los Angeles',
      state: 'CA',
      zipCode: '90210',
      country: 'United States',
      phone: '+1 (555) 987-6543'
    },
    trackingNumber: 'TRK123456789',
    estimatedDelivery: '2024-01-18',
    createdAt: '2024-01-14T14:20:00Z',
    updatedAt: '2024-01-16T09:15:00Z'
  },
  {
    id: '3',
    orderNumber: 'ORD-2024-003',
    customer: {
      name: 'Emily Rodriguez',
      email: 'emily.rodriguez@email.com',
      phone: '+1 (555) 456-7890'
    },
    vendor: {
      name: 'Home Decor Inc',
      id: 'vendor-3'
    },
    items: [
      {
        id: 'item-4',
        productName: 'Blackout Curtains - Wide',
        sku: 'BC-W-GRY-003',
        quantity: 2,
        price: 45.99,
        total: 91.98
      },
      {
        id: 'item-5',
        productName: 'Wool Blanket - Queen',
        sku: 'WB-Q-BRN-005',
        quantity: 1,
        price: 67.99,
        total: 67.99
      }
    ],
    subtotal: 159.97,
    shipping: 12.00,
    tax: 13.76,
    total: 185.73,
    status: 'delivered',
    paymentStatus: 'paid',
    shippingAddress: {
      name: 'Emily Rodriguez',
      street: '789 Pine Street',
      city: 'Chicago',
      state: 'IL',
      zipCode: '60601',
      country: 'United States',
      phone: '+1 (555) 456-7890'
    },
    trackingNumber: 'TRK987654321',
    createdAt: '2024-01-12T16:45:00Z',
    updatedAt: '2024-01-17T11:30:00Z'
  }
]

export default function Orders() {
  const [orders] = useState<Order[]>(mockOrders)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [paymentFilter, setPaymentFilter] = useState<string>('all')
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  // Calculate stats
  const totalOrders = orders.length
  const pendingOrders = orders.filter(order => order.status === 'pending').length
  const processingOrders = orders.filter(order => order.status === 'processing').length
  const shippedOrders = orders.filter(order => order.status === 'shipped').length
  const deliveredOrders = orders.filter(order => order.status === 'delivered').length
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0)

  // Filter orders
  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.vendor.name.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter
    const matchesPayment = paymentFilter === 'all' || order.paymentStatus === paymentFilter

    return matchesSearch && matchesStatus && matchesPayment
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
      case 'confirmed':
        return <Badge className="bg-blue-100 text-blue-800">Confirmed</Badge>
      case 'processing':
        return <Badge className="bg-purple-100 text-purple-800">Processing</Badge>
      case 'shipped':
        return <Badge className="bg-indigo-100 text-indigo-800">Shipped</Badge>
      case 'delivered':
        return <Badge className="bg-green-100 text-green-800">Delivered</Badge>
      case 'cancelled':
        return <Badge className="bg-red-100 text-red-800">Cancelled</Badge>
      case 'returned':
        return <Badge className="bg-gray-100 text-gray-800">Returned</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800">Unknown</Badge>
    }
  }

  const getPaymentBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
      case 'paid':
        return <Badge className="bg-green-100 text-green-800">Paid</Badge>
      case 'failed':
        return <Badge className="bg-red-100 text-red-800">Failed</Badge>
      case 'refunded':
        return <Badge className="bg-gray-100 text-gray-800">Refunded</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800">Unknown</Badge>
    }
  }

  const handleStatusUpdate = (orderId: string, newStatus: string) => {
    console.log(`Updating order ${orderId} to status: ${newStatus}`)
    // Implement status update logic here
  }

  const handleExport = () => {
    console.log('Exporting orders...')
    // Implement export logic here
  }

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <Breadcrumb />

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Orders Management</h1>
          <p className="text-gray-600">Track and manage customer orders from placement to delivery</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={handleExport}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 lg:grid-cols-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalOrders}</div>
            <p className="text-xs text-gray-600">All time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{pendingOrders}</div>
            <p className="text-xs text-gray-600">Awaiting confirmation</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Processing</CardTitle>
            <Package className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{processingOrders}</div>
            <p className="text-xs text-gray-600">Being prepared</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Shipped</CardTitle>
            <Truck className="h-4 w-4 text-indigo-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-indigo-600">{shippedOrders}</div>
            <p className="text-xs text-gray-600">In transit</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Delivered</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{deliveredOrders}</div>
            <p className="text-xs text-gray-600">Completed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-gray-600">Total value</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search orders, customers, or vendors..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-gray-500" />
                <Dropdown
                  id="statusFilter"
                  value={statusFilter}
                  options={[
                    { value: 'all', label: 'All Status' },
                    { value: 'pending', label: 'Pending' },
                    { value: 'confirmed', label: 'Confirmed' },
                    { value: 'processing', label: 'Processing' },
                    { value: 'shipped', label: 'Shipped' },
                    { value: 'delivered', label: 'Delivered' },
                    { value: 'cancelled', label: 'Cancelled' },
                    { value: 'returned', label: 'Returned' }
                  ]}
                  onChange={(value) => setStatusFilter(value as string)}
                />
              </div>
              <Dropdown
                id="paymentFilter"
                value={paymentFilter}
                options={[
                  { value: 'all', label: 'All Payments' },
                  { value: 'pending', label: 'Payment Pending' },
                  { value: 'paid', label: 'Paid' },
                  { value: 'failed', label: 'Payment Failed' },
                  { value: 'refunded', label: 'Refunded' }
                ]}
                onChange={(value) => setPaymentFilter(value as string)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle>Orders List</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Vendor</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-12">
                    <div className="text-gray-500">
                      <p className="text-lg font-medium">No orders found</p>
                      <p className="text-sm">Try adjusting your search or filter criteria</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                filteredOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{order.orderNumber}</div>
                        {order.trackingNumber && (
                          <div className="text-sm text-gray-500">Track: {order.trackingNumber}</div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{order.customer.name}</div>
                        <div className="text-sm text-gray-500">{order.customer.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>{order.vendor.name}</TableCell>
                    <TableCell>{order.items.length} items</TableCell>
                    <TableCell className="font-medium">${order.total.toFixed(2)}</TableCell>
                    <TableCell>{getStatusBadge(order.status)}</TableCell>
                    <TableCell>{getPaymentBadge(order.paymentStatus)}</TableCell>
                    <TableCell className="text-sm text-gray-600">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => setSelectedOrder(order)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Link href={`/admin/dashboard/orders/edit/${order.id}`}>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Order Details</h3>
                <p className="text-sm text-gray-500">{selectedOrder.orderNumber}</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedOrder(null)}
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="px-6 py-4 max-h-[calc(90vh-120px)] overflow-y-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Order Info */}
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Order Information</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Order Number:</span>
                        <span className="font-medium">{selectedOrder.orderNumber}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Status:</span>
                        {getStatusBadge(selectedOrder.status)}
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Payment:</span>
                        {getPaymentBadge(selectedOrder.paymentStatus)}
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Vendor:</span>
                        <span className="font-medium">{selectedOrder.vendor.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Order Date:</span>
                        <span>{new Date(selectedOrder.createdAt).toLocaleDateString()}</span>
                      </div>
                      {selectedOrder.estimatedDelivery && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Est. Delivery:</span>
                          <span>{new Date(selectedOrder.estimatedDelivery).toLocaleDateString()}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Customer Info */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Customer Information</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center">
                        <span className="text-gray-600 w-16">Name:</span>
                        <span className="font-medium">{selectedOrder.customer.name}</span>
                      </div>
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 text-gray-400 mr-2" />
                        <span>{selectedOrder.customer.email}</span>
                      </div>
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 text-gray-400 mr-2" />
                        <span>{selectedOrder.customer.phone}</span>
                      </div>
                    </div>
                  </div>

                  {/* Shipping Address */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Shipping Address</h4>
                    <div className="text-sm text-gray-600">
                      <div className="flex items-start">
                        <MapPin className="h-4 w-4 text-gray-400 mr-2 mt-0.5" />
                        <div>
                          <div className="font-medium text-gray-900">{selectedOrder.shippingAddress.name}</div>
                          <div>{selectedOrder.shippingAddress.street}</div>
                          <div>
                            {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state} {selectedOrder.shippingAddress.zipCode}
                          </div>
                          <div>{selectedOrder.shippingAddress.country}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Order Items & Summary */}
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Order Items</h4>
                    <div className="space-y-3">
                      {selectedOrder.items.map((item) => (
                        <div key={item.id} className="flex justify-between items-start p-3 bg-gray-50 rounded-lg">
                          <div className="flex-1">
                            <div className="font-medium text-sm">{item.productName}</div>
                            <div className="text-xs text-gray-500">SKU: {item.sku}</div>
                            <div className="text-xs text-gray-600">Qty: {item.quantity} × ${item.price.toFixed(2)}</div>
                          </div>
                          <div className="font-medium text-sm">${item.total.toFixed(2)}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Order Summary */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Order Summary</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Subtotal:</span>
                        <span>${selectedOrder.subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Shipping:</span>
                        <span>${selectedOrder.shipping.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Tax:</span>
                        <span>${selectedOrder.tax.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between font-medium text-base border-t pt-2">
                        <span>Total:</span>
                        <span>${selectedOrder.total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Status Update Actions */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Update Status</h4>
                    <div className="space-y-2">
                      {selectedOrder.status === 'pending' && (
                        <Button 
                          size="sm" 
                          className="w-full"
                          onClick={() => handleStatusUpdate(selectedOrder.id, 'confirmed')}
                        >
                          Confirm Order
                        </Button>
                      )}
                      {selectedOrder.status === 'confirmed' && (
                        <Button 
                          size="sm" 
                          className="w-full"
                          onClick={() => handleStatusUpdate(selectedOrder.id, 'processing')}
                        >
                          Start Processing
                        </Button>
                      )}
                      {selectedOrder.status === 'processing' && (
                        <Button 
                          size="sm" 
                          className="w-full"
                          onClick={() => handleStatusUpdate(selectedOrder.id, 'shipped')}
                        >
                          Mark as Shipped
                        </Button>
                      )}
                      {selectedOrder.status === 'shipped' && (
                        <Button 
                          size="sm" 
                          className="w-full"
                          onClick={() => handleStatusUpdate(selectedOrder.id, 'delivered')}
                        >
                          Mark as Delivered
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 px-6 py-4 border-t border-gray-200 bg-gray-50">
              <Button
                variant="outline"
                onClick={() => setSelectedOrder(null)}
              >
                Close
              </Button>
              <Link href={`/admin/dashboard/orders/edit/${selectedOrder.id}`}>
                <Button>
                  Edit Order
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}