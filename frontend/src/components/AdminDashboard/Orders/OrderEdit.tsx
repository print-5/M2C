'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/UI/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/UI/Card'
import { ArrowLeft, Save, Package, Truck, CheckCircle, X, AlertTriangle } from 'lucide-react'
import Link from 'next/link'
import Dropdown from '@/components/UI/Dropdown'

interface OrderEditProps {
  orderId: string
}

interface OrderItem {
  id: string
  productName: string
  sku: string
  quantity: number
  price: number
  total: number
}

interface OrderData {
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
  trackingNumber?: string
  estimatedDelivery?: string
  shippingCarrier?: string
  notes?: string
  createdAt: string
  updatedAt: string
}

export default function OrderEdit({ orderId }: OrderEditProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingData, setIsLoadingData] = useState(true)
  
  const [orderData, setOrderData] = useState<OrderData>({
    id: '',
    orderNumber: '',
    customer: { name: '', email: '', phone: '' },
    vendor: { name: '', id: '' },
    items: [],
    subtotal: 0,
    shipping: 0,
    tax: 0,
    total: 0,
    status: 'pending',
    paymentStatus: 'pending',
    trackingNumber: '',
    estimatedDelivery: '',
    shippingCarrier: '',
    notes: '',
    createdAt: '',
    updatedAt: ''
  })

  // Load order data
  useEffect(() => {
    const loadOrderData = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Mock order data
        setOrderData({
          id: orderId,
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
          status: 'processing',
          paymentStatus: 'paid',
          trackingNumber: 'TRK123456789',
          estimatedDelivery: '2024-01-20',
          shippingCarrier: 'FedEx',
          notes: 'Customer requested expedited shipping',
          createdAt: '2024-01-15T10:30:00Z',
          updatedAt: '2024-01-16T14:20:00Z'
        })
      } catch (error) {
        console.error('Error loading order data:', error)
      } finally {
        setIsLoadingData(false)
      }
    }

    loadOrderData()
  }, [orderId])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setOrderData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleDropdownChange = (name: string, value: string) => {
    setOrderData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      console.log('Updating order:', orderId, orderData)
      // API call: PUT /api/orders/${orderId}
      
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      router.push('/admin/dashboard/orders')
    } catch (error) {
      console.error('Error updating order:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
      case 'confirmed':
        return <AlertTriangle className="h-5 w-5 text-yellow-600" />
      case 'processing':
        return <Package className="h-5 w-5 text-purple-600" />
      case 'shipped':
        return <Truck className="h-5 w-5 text-indigo-600" />
      case 'delivered':
        return <CheckCircle className="h-5 w-5 text-green-600" />
      default:
        return <Package className="h-5 w-5 text-gray-600" />
    }
  }

  // Show loading state while fetching data
  if (isLoadingData) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/admin/dashboard/orders">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Orders
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Loading...</h1>
          </div>
        </div>
        <Card>
          <CardContent className="p-8">
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-700"></div>
              <span className="ml-3 text-gray-600">Loading order data...</span>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/admin/dashboard/orders">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Orders
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Edit Order</h1>
            <p className="text-gray-600">{orderData.orderNumber}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {getStatusIcon(orderData.status)}
          <span className="text-sm font-medium capitalize">{orderData.status}</span>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Order Status */}
            <Card>
              <CardHeader>
                <CardTitle>Order Status Management</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Dropdown
                      id="status"
                      label="Order Status"
                      value={orderData.status}
                      options={[
                        { value: 'pending', label: 'Pending' },
                        { value: 'confirmed', label: 'Confirmed' },
                        { value: 'processing', label: 'Processing' },
                        { value: 'shipped', label: 'Shipped' },
                        { value: 'delivered', label: 'Delivered' },
                        { value: 'cancelled', label: 'Cancelled' },
                        { value: 'returned', label: 'Returned' }
                      ]}
                      onChange={(value) => handleDropdownChange('status', value as string)}
                    />
                  </div>
                  <div>
                    <Dropdown
                      id="paymentStatus"
                      label="Payment Status"
                      value={orderData.paymentStatus}
                      options={[
                        { value: 'pending', label: 'Pending' },
                        { value: 'paid', label: 'Paid' },
                        { value: 'failed', label: 'Failed' },
                        { value: 'refunded', label: 'Refunded' }
                      ]}
                      onChange={(value) => handleDropdownChange('paymentStatus', value as string)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Shipping Information */}
            <Card>
              <CardHeader>
                <CardTitle>Shipping Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tracking Number
                    </label>
                    <input
                      type="text"
                      name="trackingNumber"
                      value={orderData.trackingNumber}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700 focus:border-transparent"
                      placeholder="Enter tracking number"
                    />
                  </div>
                  <div>
                    <Dropdown
                      id="shippingCarrier"
                      label="Shipping Carrier"
                      value={orderData.shippingCarrier || ''}
                      options={[
                        { value: '', label: 'Select Carrier' },
                        { value: 'FedEx', label: 'FedEx' },
                        { value: 'UPS', label: 'UPS' },
                        { value: 'USPS', label: 'USPS' },
                        { value: 'DHL', label: 'DHL' },
                        { value: 'Other', label: 'Other' }
                      ]}
                      onChange={(value) => handleDropdownChange('shippingCarrier', value as string)}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Estimated Delivery Date
                  </label>
                  <input
                    type="date"
                    name="estimatedDelivery"
                    value={orderData.estimatedDelivery}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700 focus:border-transparent"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Order Items */}
            <Card>
              <CardHeader>
                <CardTitle>Order Items</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {orderData.items.map((item) => (
                    <div key={item.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <div className="font-medium">{item.productName}</div>
                        <div className="text-sm text-gray-500">SKU: {item.sku}</div>
                        <div className="text-sm text-gray-600">
                          Quantity: {item.quantity} × ${item.price.toFixed(2)}
                        </div>
                      </div>
                      <div className="font-medium">${item.total.toFixed(2)}</div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal:</span>
                      <span>${orderData.subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping:</span>
                      <span>${orderData.shipping.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tax:</span>
                      <span>${orderData.tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-medium text-base border-t pt-2">
                      <span>Total:</span>
                      <span>${orderData.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Notes */}
            <Card>
              <CardHeader>
                <CardTitle>Order Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <textarea
                  name="notes"
                  value={orderData.notes}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700 focus:border-transparent"
                  placeholder="Add notes about this order..."
                />
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Customer Information */}
            <Card>
              <CardHeader>
                <CardTitle>Customer Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-700">Name</label>
                  <p className="text-sm text-gray-900">{orderData.customer.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Email</label>
                  <p className="text-sm text-gray-900">{orderData.customer.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Phone</label>
                  <p className="text-sm text-gray-900">{orderData.customer.phone}</p>
                </div>
              </CardContent>
            </Card>

            {/* Vendor Information */}
            <Card>
              <CardHeader>
                <CardTitle>Vendor Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div>
                  <label className="text-sm font-medium text-gray-700">Vendor</label>
                  <p className="text-sm text-gray-900">{orderData.vendor.name}</p>
                </div>
              </CardContent>
            </Card>

            {/* Order Timeline */}
            <Card>
              <CardHeader>
                <CardTitle>Order Timeline</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-700">Created</label>
                  <p className="text-sm text-gray-900">
                    {new Date(orderData.createdAt).toLocaleString()}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Last Updated</label>
                  <p className="text-sm text-gray-900">
                    {new Date(orderData.updatedAt).toLocaleString()}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#313131] text-white hover:bg-[#222222]"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {isLoading ? 'Saving...' : 'Update Order'}
                </Button>
                <Link href="/admin/dashboard/orders" className="block">
                  <Button type="button" variant="outline" className="w-full">
                    Cancel
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  )
}