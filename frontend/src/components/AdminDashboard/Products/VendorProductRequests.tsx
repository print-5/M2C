'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/UI/Card'
import { Button } from '@/components/UI/Button'
import { Badge } from '@/components/UI/Badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/UI/Table'
import Dropdown from '@/components/UI/Dropdown'
import { Eye, Check, X, Search, Filter, AlertCircle } from 'lucide-react'
import { showSuccessToast, showErrorToast } from '@/lib/toast-utils'

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
}

export default function VendorProductRequests() {
  const router = useRouter()
  const [requests, setRequests] = useState<VendorProductRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('pending')
  const [selectedRequest, setSelectedRequest] = useState<VendorProductRequest | null>(null)
  const [showApprovalModal, setShowApprovalModal] = useState(false)
  const [showRejectionModal, setShowRejectionModal] = useState(false)
  const [rejectingRequestId, setRejectingRequestId] = useState<string | null>(null)

  // Mock data - In real app, fetch from API
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
        description: 'Luxurious 100% cotton bed sheet set with superior comfort and durability',
        fabricType: 'Cotton',
        material: '100% Organic Cotton',
        images: ['/assets/images/categories/cs1.jpg'],
        variants: 2,
        totalStock: 150
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
        description: 'Luxurious silk pillowcases for hair and skin care',
        fabricType: 'Silk',
        material: '100% Mulberry Silk',
        images: ['/assets/images/categories/cs2.jpg'],
        variants: 3,
        totalStock: 200
      },
      {
        id: '3',
        productName: 'Microfiber Towel Set',
        vendorName: 'Textile Innovations Ltd',
        vendorId: 'V001',
        category: 'Towels',
        subCategory: 'Bath Towels',
        basePrice: 34.99,
        status: 'approved',
        submittedDate: '2024-01-20',
        description: 'Soft and absorbent microfiber towel set',
        fabricType: 'Microfiber',
        material: '100% Microfiber',
        images: ['/assets/images/categories/cs3.jpg'],
        variants: 1,
        totalStock: 300
      },
      {
        id: '4',
        productName: 'Linen Curtain Panels',
        vendorName: 'Home Decor Specialists',
        vendorId: 'V003',
        category: 'Curtains',
        subCategory: 'Sheer Curtains',
        basePrice: 59.99,
        status: 'rejected',
        submittedDate: '2024-01-15',
        description: 'Beautiful linen curtain panels for modern homes',
        fabricType: 'Linen',
        material: '100% Pure Linen',
        images: ['/assets/images/categories/cs4.jpg'],
        variants: 2,
        totalStock: 100
      }
    ]

    setTimeout(() => {
      setRequests(mockRequests)
      setLoading(false)
    }, 1000)
  }, [])

  const filteredRequests = requests.filter(request => {
    const matchesSearch = 
      request.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.vendorName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || request.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleApprove = async (requestId: string, adminFixedPrice: number) => {
    try {
      setRequests(prev => prev.map(r => 
        r.id === requestId ? { ...r, status: 'approved' as const, basePrice: adminFixedPrice } : r
      ))
      showSuccessToast('Product Approved', 'The vendor product has been approved and is now live.')
    } catch (error) {
      showErrorToast('Approval Failed', 'Unable to approve product.')
    }
  }

  const handleRejectClick = (requestId: string) => {
    setRejectingRequestId(requestId)
    setShowRejectionModal(true)
  }

  const handleReject = async (reason: string) => {
    if (!rejectingRequestId) return

    try {
      setRequests(prev => prev.map(r => 
        r.id === rejectingRequestId ? { ...r, status: 'rejected' as const } : r
      ))
      showSuccessToast('Product Rejected', 'The vendor has been notified of the rejection.')
      setShowRejectionModal(false)
      setRejectingRequestId(null)
    } catch (error) {
      showErrorToast('Rejection Failed', 'Unable to reject product.')
    }
  }

  const handleViewDetails = (request: VendorProductRequest) => {
    router.push(`/admin/dashboard/products/vendor-requests/view/${request.id}`)
  }

  const handleApproveClick = (request: VendorProductRequest) => {
    setSelectedRequest(request)
    setShowApprovalModal(true)
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
        <span className="ml-3 text-gray-600">Loading vendor requests...</span>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Vendor Product Requests</h1>
          <p className="text-gray-600">Review and manage product submissions from vendors</p>
        </div>
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
                  placeholder="Search by product name or vendor..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <Dropdown
                value={statusFilter}
                options={[
                  { value: 'all', label: 'All Status' },
                  { value: 'pending', label: 'Pending' },
                  { value: 'approved', label: 'Approved' },
                  { value: 'rejected', label: 'Rejected' }
                ]}
                onChange={(value) => setStatusFilter(value as any)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Requests Table */}
      <Card>
        <CardHeader>
          <CardTitle>Product Requests</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {filteredRequests.length === 0 ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <AlertCircle className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 font-medium">No requests found</p>
                <p className="text-sm text-gray-400">Try adjusting your search or filter criteria</p>
              </div>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product Name</TableHead>
                  <TableHead>Vendor</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Submitted</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRequests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium text-gray-900">{request.productName}</div>
                        <div className="text-sm text-gray-500">{request.material}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm text-gray-900">{request.vendorName}</div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm text-gray-900">{request.category}</div>
                      <div className="text-xs text-gray-500">{request.subCategory}</div>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium text-gray-900">₹{request.basePrice}</span>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(request.status)}>
                        {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-gray-600">
                        {new Date(request.submittedDate).toLocaleDateString()}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewDetails(request)}
                          className="text-gray-600 hover:text-gray-900"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        {request.status === 'pending' && (
                          <>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleApproveClick(request)}
                              className="text-gray-600 hover:text-gray-900"
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleRejectClick(request.id)}
                              className="text-gray-600 hover:text-gray-900"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Approval Modal */}
      {showApprovalModal && selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Approve Product Request</h3>
            <p className="text-gray-600 mb-4">
              Set the final price for "{selectedRequest.productName}". This will be the price customers see.
            </p>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Admin Fixed Price (₹)
              </label>
              <input
                type="number"
                defaultValue={selectedRequest.basePrice}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700 focus:border-transparent"
                placeholder="Enter final price"
                step="0.01"
                min="0"
                id="adminPrice"
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
                onClick={() => {
                  const priceInput = document.getElementById('adminPrice') as HTMLInputElement
                  const adminPrice = parseFloat(priceInput.value)
                  if (adminPrice > 0) {
                    handleApprove(selectedRequest.id, adminPrice)
                    setShowApprovalModal(false)
                  }
                }}
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700 focus:border-transparent"
                placeholder="Enter reason for rejection..."
                rows={4}
                id="rejectionReason"
              />
            </div>
            <div className="flex justify-end space-x-3">
              <Button
                variant="outline"
                onClick={() => {
                  setShowRejectionModal(false)
                  setRejectingRequestId(null)
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  const reasonInput = document.getElementById('rejectionReason') as HTMLTextAreaElement
                  const reason = reasonInput.value.trim()
                  if (reason) {
                    handleReject(reason)
                  }
                }}
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
