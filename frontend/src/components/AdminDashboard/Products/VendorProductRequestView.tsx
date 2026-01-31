'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/UI/Card'
import { Button } from '@/components/UI/Button'
import { Badge } from '@/components/UI/Badge'
import { 
  ArrowLeft, 
  Check, 
  X, 
  Calendar, 
  Package, 
  User, 
  Tag, 
  DollarSign,
  FileText,
  Image as ImageIcon,
  Layers,
  Warehouse
} from 'lucide-react'
import { showSuccessToast, showErrorToast } from '@/lib/toast-utils'
import Image from 'next/image'

interface VendorProductRequest {
  id: string
  productName: string
  vendorName: string
  vendorId: string
  category: string
  subCategory: string
  basePrice: number
  status: 'pending' | 'approved' | 'rejected'
  submittedDate: string
  description: string
  fabricType: string
  material: string
  images: string[]
  variants: number
  totalStock: number
  specifications?: {
    dimensions?: string
    weight?: string
    color?: string
    pattern?: string
    careInstructions?: string
    warranty?: string
  }
  vendorDetails?: {
    email: string
    phone: string
    address: string
    businessType: string
    yearsInBusiness: number
  }
}

interface VendorProductRequestViewProps {
  requestId: string
}

export default function VendorProductRequestView({ requestId }: VendorProductRequestViewProps) {
  const router = useRouter()
  const [request, setRequest] = useState<VendorProductRequest | null>(null)
  const [loading, setLoading] = useState(true)
  const [showApprovalModal, setShowApprovalModal] = useState(false)
  const [showRejectionModal, setShowRejectionModal] = useState(false)
  const [adminPrice, setAdminPrice] = useState('')
  const [rejectionReason, setRejectionReason] = useState('')

  // Mock data - In real app, fetch from API based on requestId
  useEffect(() => {
    const mockRequests: VendorProductRequest[] = [
      {
        id: '1',
        productName: 'Premium Cotton Bed Sheet Set',
        vendorName: 'Textile Innovations Ltd',
        vendorId: 'V001',
        category: 'Bed Sheets',
        subCategory: 'Cotton Sheets',
        basePrice: 89.99,
        status: 'pending',
        submittedDate: '2024-01-28',
        description: 'Luxurious 100% cotton bed sheet set with superior comfort and durability. Made from premium organic cotton fibers, these sheets offer exceptional softness and breathability. Perfect for year-round comfort with excellent moisture-wicking properties.',
        fabricType: 'Cotton',
        material: '100% Organic Cotton',
        images: [
          '/assets/images/categories/cs1.jpg',
          '/assets/images/categories/cs2.jpg',
          '/assets/images/categories/cs3.jpg'
        ],
        variants: 2,
        totalStock: 150,
        specifications: {
          dimensions: 'Queen Size (60" x 80")',
          weight: '2.5 lbs',
          color: 'White, Cream, Light Blue',
          pattern: 'Solid',
          careInstructions: 'Machine wash cold, tumble dry low',
          warranty: '1 Year Limited Warranty'
        },
        vendorDetails: {
          email: 'contact@textileinnovations.com',
          phone: '+91 98765 43210',
          address: '123 Textile Street, Mumbai, Maharashtra 400001',
          businessType: 'Manufacturer',
          yearsInBusiness: 15
        }
      },
      {
        id: '2',
        productName: 'Silk Pillowcase Collection',
        vendorName: 'Premium Fabrics Co',
        vendorId: 'V002',
        category: 'Pillows',
        subCategory: 'Bed Pillows',
        basePrice: 45.99,
        status: 'pending',
        submittedDate: '2024-01-27',
        description: 'Luxurious silk pillowcases for hair and skin care. Made from 100% mulberry silk with natural temperature regulation properties.',
        fabricType: 'Silk',
        material: '100% Mulberry Silk',
        images: ['/assets/images/categories/cs2.jpg'],
        variants: 3,
        totalStock: 200,
        specifications: {
          dimensions: 'Standard Size (20" x 30")',
          weight: '0.3 lbs',
          color: 'Champagne, Silver, Rose Gold',
          pattern: 'Solid',
          careInstructions: 'Hand wash or gentle machine wash',
          warranty: '6 Months Limited Warranty'
        },
        vendorDetails: {
          email: 'info@premiumfabrics.com',
          phone: '+91 87654 32109',
          address: '456 Silk Avenue, Bangalore, Karnataka 560001',
          businessType: 'Distributor',
          yearsInBusiness: 8
        }
      }
    ]

    const foundRequest = mockRequests.find(r => r.id === requestId)
    setTimeout(() => {
      setRequest(foundRequest || null)
      setLoading(false)
      if (foundRequest) {
        setAdminPrice(foundRequest.basePrice.toString())
      }
    }, 1000)
  }, [requestId])

  const handleApprove = async () => {
    if (!request || !adminPrice) return

    try {
      // In real app, make API call to approve request
      showSuccessToast('Product Approved', 'The vendor product has been approved and is now live.')
      setShowApprovalModal(false)
      router.push('/admin/dashboard/products/vendor-requests')
    } catch (error) {
      showErrorToast('Approval Failed', 'Unable to approve product.')
    }
  }

  const handleReject = async () => {
    if (!request || !rejectionReason.trim()) return

    try {
      // In real app, make API call to reject request
      showSuccessToast('Product Rejected', 'The vendor has been notified of the rejection.')
      setShowRejectionModal(false)
      router.push('/admin/dashboard/products/vendor-requests')
    } catch (error) {
      showErrorToast('Rejection Failed', 'Unable to reject product.')
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'approved':
        return 'bg-green-100 text-green-800'
      case 'rejected':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-700"></div>
        <span className="ml-3 text-gray-600">Loading request details...</span>
      </div>
    )
  }

  if (!request) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <Package className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 font-medium">Request not found</p>
          <p className="text-sm text-gray-400">The requested vendor product submission could not be found.</p>
          <Button 
            onClick={() => router.push('/admin/dashboard/products/vendor-requests')}
            className="mt-4"
          >
            Back to Requests
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6" aria-label="Breadcrumb">
        <div className="flex items-center space-x-2">
          <Link href="/admin/dashboard" className="hover:text-gray-900 transition-colors duration-200 hover:underline">
            Dashboard
          </Link>
          <span className="text-gray-400">/</span>
          <Link href="/admin/dashboard/products" className="hover:text-gray-900 transition-colors duration-200 hover:underline">
            Products
          </Link>
          <span className="text-gray-400">/</span>
          <Link href="/admin/dashboard/products/vendor-requests" className="hover:text-gray-900 transition-colors duration-200 hover:underline">
            Vendor Requests
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-900 font-medium" aria-current="page">
            {request?.productName || 'View Request'}
          </span>
        </div>
      </nav>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            onClick={() => router.push('/admin/dashboard/products/vendor-requests')}
            className="text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Requests
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{request.productName}</h1>
            <p className="text-gray-600">Vendor Product Request Details</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Badge className={getStatusColor(request.status)}>
            {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
          </Badge>
          {request.status === 'pending' && (
            <>
              <Button
                onClick={() => setShowApprovalModal(true)}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                <Check className="h-4 w-4 mr-2" />
                Approve
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowRejectionModal(true)}
                className="border-red-300 text-red-600 hover:bg-red-50"
              >
                <X className="h-4 w-4 mr-2" />
                Reject
              </Button>
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Product Images */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <ImageIcon className="h-5 w-5 mr-2" />
                Product Images
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {request.images.map((image, index) => (
                  <div key={index} className="relative aspect-square rounded-lg overflow-hidden border">
                    <Image
                      src={image}
                      alt={`${request.productName} - Image ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Product Description */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                Product Description
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">{request.description}</p>
            </CardContent>
          </Card>

          {/* Product Specifications */}
          {request.specifications && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Layers className="h-5 w-5 mr-2" />
                  Specifications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(request.specifications).map(([key, value]) => (
                    <div key={key} className="flex flex-col">
                      <span className="text-sm font-medium text-gray-500 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                      <span className="text-gray-900">{value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Request Info */}
          <Card>
            <CardHeader>
              <CardTitle>Request Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                <Calendar className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Submitted Date</p>
                  <p className="text-sm text-gray-600">
                    {new Date(request.submittedDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <DollarSign className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Proposed Price</p>
                  <p className="text-sm text-gray-600">₹{request.basePrice}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Tag className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Category</p>
                  <p className="text-sm text-gray-600">{request.category}</p>
                  <p className="text-xs text-gray-500">{request.subCategory}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Warehouse className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Stock & Variants</p>
                  <p className="text-sm text-gray-600">{request.totalStock} units</p>
                  <p className="text-xs text-gray-500">{request.variants} variants</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Vendor Details */}
          {request.vendorDetails && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Vendor Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-900">{request.vendorName}</p>
                  <p className="text-xs text-gray-500">ID: {request.vendorId}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Contact</p>
                  <p className="text-sm text-gray-600">{request.vendorDetails.email}</p>
                  <p className="text-sm text-gray-600">{request.vendorDetails.phone}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Business Type</p>
                  <p className="text-sm text-gray-600">{request.vendorDetails.businessType}</p>
                  <p className="text-xs text-gray-500">{request.vendorDetails.yearsInBusiness} years in business</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Address</p>
                  <p className="text-sm text-gray-600">{request.vendorDetails.address}</p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Material Info */}
          <Card>
            <CardHeader>
              <CardTitle>Material Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm font-medium text-gray-900">Fabric Type</p>
                <p className="text-sm text-gray-600">{request.fabricType}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Material</p>
                <p className="text-sm text-gray-600">{request.material}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Approval Modal */}
      {showApprovalModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Approve Product Request</h3>
            <p className="text-gray-600 mb-4">
              Set the final price for this product. This will be the price customers see.
            </p>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Admin Fixed Price (₹)
              </label>
              <input
                type="number"
                value={adminPrice}
                onChange={(e) => setAdminPrice(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700 focus:border-transparent"
                placeholder="Enter final price"
                step="0.01"
                min="0"
              />
            </div>
            <div className="flex justify-end space-x-3">
              <Button
                variant="outline"
                onClick={() => setShowApprovalModal(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleApprove}
                disabled={!adminPrice || parseFloat(adminPrice) <= 0}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                Approve Product
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Rejection Modal */}
      {showRejectionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Reject Product Request</h3>
            <p className="text-gray-600 mb-4">
              Please provide a reason for rejecting this product request. The vendor will be notified.
            </p>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rejection Reason
              </label>
              <textarea
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700 focus:border-transparent"
                placeholder="Enter reason for rejection..."
                rows={4}
              />
            </div>
            <div className="flex justify-end space-x-3">
              <Button
                variant="outline"
                onClick={() => setShowRejectionModal(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleReject}
                disabled={!rejectionReason.trim()}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                Reject Product
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}