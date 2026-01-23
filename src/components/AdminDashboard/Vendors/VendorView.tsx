'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/UI/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/UI/Card'
import { Badge } from '@/components/UI/Badge'
import { 
  ArrowLeft, 
  Building2, 
  Globe, 
  Mail, 
  Phone, 
  MapPin, 
  User,
  Package,
  Factory,
  Award,
  Truck,
  Calendar,
  Star,
  Edit,
  CheckCircle,
  XCircle,
  AlertTriangle,
  FileText,
  Download
} from 'lucide-react'

interface VendorData {
  id: string
  companyName: string
  businessType: string
  gstNumber: string
  email: string
  phone: string
  website: string
  address: string
  city: string
  state: string
  zipCode: string
  country: string
  
  // Warehouse Details
  warehouseAddress: string
  warehouseCity: string
  warehouseState: string
  warehouseZip: string
  warehouseCountry: string
  warehouseCapacity: string
  warehouseType: string
  
  // Owner Profile
  ownerName: string
  ownerEmail: string
  ownerPhone: string
  ownerDesignation: string
  ownerExperience: string
  
  // Vendor Type & Products
  vendorType: string[]
  productCategories: string[]
  specializations: string[]
  
  // Manufacturing Facilities
  manufacturingCapacity?: string
  productionLines?: string
  qualityStandards?: string[]
  
  // Certifications & Logistics
  certifications: string[]
  shippingMethods: string[]
  deliveryAreas: string[]
  
  // Contact & Trade Info
  salesContact: string
  supportContact: string
  paymentTerms: string
  minimumOrderValue: string
  
  // Status & Metrics
  status: 'active' | 'pending' | 'suspended'
  approvalStatus: 'approved' | 'pending' | 'rejected'
  joinDate: string
  lastActive: string
  totalOrders: number
  totalRevenue: string
  rating: number
  
  // Documents
  documents: Array<{
    type: string
    name: string
    url: string
    uploadDate: string
  }>
}

interface VendorViewProps {
  vendorId: string
}

export default function VendorView({ vendorId }: VendorViewProps) {
  const router = useRouter()
  const [vendor, setVendor] = useState<VendorData | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    // Fetch vendor data
    const fetchVendorData = async () => {
      try {
        // This would typically be an API call
        // const response = await fetch(`/api/vendors/${vendorId}`)
        // const vendorData = await response.json()
        
        // Mock data for demonstration
        const mockVendor: VendorData = {
          id: vendorId,
          companyName: 'ABC Textiles Pvt Ltd',
          businessType: 'corporation',
          gstNumber: '29ABCDE1234F1Z5',
          email: 'contact@abctextiles.com',
          phone: '+91-9876543210',
          website: 'https://www.abctextiles.com',
          address: '123 Industrial Area, Sector 5',
          city: 'Mumbai',
          state: 'Maharashtra',
          zipCode: '400001',
          country: 'India',
          warehouseAddress: '456 Warehouse Complex, Sector 8',
          warehouseCity: 'Mumbai',
          warehouseState: 'Maharashtra',
          warehouseZip: '400008',
          warehouseCountry: 'India',
          warehouseCapacity: '50000',
          warehouseType: 'owned',
          ownerName: 'Rajesh Kumar',
          ownerEmail: 'rajesh@abctextiles.com',
          ownerPhone: '+91-9876543211',
          ownerDesignation: 'Managing Director',
          ownerExperience: '15',
          vendorType: ['manufacturer', 'supplier'],
          productCategories: ['textiles', 'fabrics'],
          specializations: ['Cotton Fabrics', 'Silk Products'],
          manufacturingCapacity: '100000',
          productionLines: '5',
          qualityStandards: ['ISO 9001', 'OEKO-TEX'],
          certifications: ['ISO 9001:2015', 'GOTS Certified', 'OEKO-TEX Standard 100'],
          shippingMethods: ['Road Transport', 'Rail Transport', 'Air Cargo'],
          deliveryAreas: ['Pan India', 'International'],
          salesContact: 'sales@abctextiles.com',
          supportContact: 'support@abctextiles.com',
          paymentTerms: 'net30',
          minimumOrderValue: '50000',
          status: 'active',
          approvalStatus: 'approved',
          joinDate: '2023-01-15',
          lastActive: '2024-01-20',
          totalOrders: 156,
          totalRevenue: '₹2,45,67,890',
          rating: 4.5,
          documents: [
            { type: 'GST Certificate', name: 'gst_certificate.pdf', url: '#', uploadDate: '2023-01-15' },
            { type: 'Company Registration', name: 'company_reg.pdf', url: '#', uploadDate: '2023-01-15' },
            { type: 'ISO Certificate', name: 'iso_cert.pdf', url: '#', uploadDate: '2023-02-10' }
          ]
        }
        
        setVendor(mockVendor)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching vendor data:', error)
        setLoading(false)
      }
    }

    fetchVendorData()
  }, [vendorId])

  const handleStatusChange = async (newStatus: string) => {
    try {
      // API call to update vendor status
      console.log('Updating vendor status to:', newStatus)
      if (vendor) {
        setVendor({ ...vendor, status: newStatus as any })
      }
    } catch (error) {
      console.error('Error updating vendor status:', error)
    }
  }

  const handleApprovalChange = async (newApprovalStatus: string) => {
    try {
      // API call to update approval status
      console.log('Updating approval status to:', newApprovalStatus)
      if (vendor) {
        setVendor({ ...vendor, approvalStatus: newApprovalStatus as any })
      }
    } catch (error) {
      console.error('Error updating approval status:', error)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#313131] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading vendor details...</p>
        </div>
      </div>
    )
  }

  if (!vendor) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Vendor Not Found</h2>
          <p className="text-gray-600 mb-4">The vendor you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => router.push('/dashboard/vendors')}>
            Back to Vendors
          </Button>
        </div>
      </div>
    )
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800">Active</Badge>
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
      case 'suspended':
        return <Badge className="bg-red-100 text-red-800">Suspended</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800">Unknown</Badge>
    }
  }

  const getApprovalBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-100 text-green-800">Approved</Badge>
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Pending Review</Badge>
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800">Rejected</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800">Unknown</Badge>
    }
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Building2 },
    { id: 'details', label: 'Company Details', icon: FileText },
    { id: 'products', label: 'Products & Services', icon: Package },
    { id: 'facilities', label: 'Facilities', icon: Factory },
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'performance', label: 'Performance', icon: Star }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push('/dashboard/vendors')}
                className="p-2"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{vendor.companyName}</h1>
                <p className="text-gray-600">Vendor ID: {vendor.id}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              {getStatusBadge(vendor.status)}
              {getApprovalBadge(vendor.approvalStatus)}
              
              <Button
                onClick={() => router.push(`/dashboard/vendors/edit/${vendor.id}`)}
                className="bg-[#313131] text-white hover:bg-[#222222]"
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit Vendor
              </Button>
            </div>
          </div>
          
          {/* Tabs */}
          <div className="flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-[#313131] text-[#313131]'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && <OverviewTab vendor={vendor} onStatusChange={handleStatusChange} onApprovalChange={handleApprovalChange} />}
        {activeTab === 'details' && <DetailsTab vendor={vendor} />}
        {activeTab === 'products' && <ProductsTab vendor={vendor} />}
        {activeTab === 'facilities' && <FacilitiesTab vendor={vendor} />}
        {activeTab === 'documents' && <DocumentsTab vendor={vendor} />}
        {activeTab === 'performance' && <PerformanceTab vendor={vendor} />}
      </div>
    </div>
  )
}

// Tab Components
function OverviewTab({ vendor, onStatusChange, onApprovalChange }: { 
  vendor: VendorData, 
  onStatusChange: (status: string) => void,
  onApprovalChange: (status: string) => void 
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Info */}
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Building2 className="h-5 w-5" />
              <span>Company Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-medium">{vendor.email}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Phone</p>
                    <p className="font-medium">{vendor.phone}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Globe className="h-4 w-4 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Website</p>
                    <a href={vendor.website} target="_blank" rel="noopener noreferrer" className="font-medium text-blue-600 hover:underline">
                      {vendor.website}
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <FileText className="h-4 w-4 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">GST Number</p>
                    <p className="font-medium">{vendor.gstNumber}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Location</p>
                    <p className="font-medium">{vendor.city}, {vendor.state}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Join Date</p>
                    <p className="font-medium">{new Date(vendor.joinDate).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="h-5 w-5" />
              <span>Owner Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-600">Name</p>
                <p className="font-medium">{vendor.ownerName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Designation</p>
                <p className="font-medium">{vendor.ownerDesignation}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-medium">{vendor.ownerEmail}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Experience</p>
                <p className="font-medium">{vendor.ownerExperience} years</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sidebar */}
      <div className="space-y-6">
        {/* Quick Stats */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Stats</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Total Orders</span>
              <span className="font-semibold">{vendor.totalOrders}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Total Revenue</span>
              <span className="font-semibold">{vendor.totalRevenue}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Rating</span>
              <div className="flex items-center">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span className="font-semibold ml-1">{vendor.rating}</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Last Active</span>
              <span className="font-semibold">{new Date(vendor.lastActive).toLocaleDateString()}</span>
            </div>
          </CardContent>
        </Card>

        {/* Status Management */}
        <Card>
          <CardHeader>
            <CardTitle>Status Management</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Vendor Status</label>
              <select
                value={vendor.status}
                onChange={(e) => onStatusChange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#313131]"
              >
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="suspended">Suspended</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Approval Status</label>
              <select
                value={vendor.approvalStatus}
                onChange={(e) => onApprovalChange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#313131]"
              >
                <option value="approved">Approved</option>
                <option value="pending">Pending Review</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start" variant="outline">
              <Mail className="h-4 w-4 mr-2" />
              Send Message
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <FileText className="h-4 w-4 mr-2" />
              Generate Report
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function DetailsTab({ vendor }: { vendor: VendorData }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Company Address</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <p>{vendor.address}</p>
            <p>{vendor.city}, {vendor.state} {vendor.zipCode}</p>
            <p>{vendor.country}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Warehouse Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600">Type</p>
              <p className="font-medium capitalize">{vendor.warehouseType}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Capacity</p>
              <p className="font-medium">{vendor.warehouseCapacity} sq ft</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Address</p>
              <p className="font-medium">{vendor.warehouseAddress}</p>
              <p className="font-medium">{vendor.warehouseCity}, {vendor.warehouseState}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function ProductsTab({ vendor }: { vendor: VendorData }) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Vendor Types</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {vendor.vendorType.map((type, index) => (
              <Badge key={index} className="bg-blue-100 text-blue-800 capitalize">
                {type}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Product Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {vendor.productCategories.map((category, index) => (
              <Badge key={index} className="bg-green-100 text-green-800 capitalize">
                {category}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Specializations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {vendor.specializations.map((spec, index) => (
              <Badge key={index} className="bg-purple-100 text-purple-800">
                {spec}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function FacilitiesTab({ vendor }: { vendor: VendorData }) {
  return (
    <div className="space-y-6">
      {vendor.manufacturingCapacity && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Factory className="h-5 w-5" />
              <span>Manufacturing Facilities</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-600">Manufacturing Capacity</p>
                <p className="font-medium">{vendor.manufacturingCapacity} units/month</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Production Lines</p>
                <p className="font-medium">{vendor.productionLines}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Certifications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {vendor.certifications.map((cert, index) => (
              <Badge key={index} className="bg-yellow-100 text-yellow-800">
                {cert}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Logistics & Shipping</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600 mb-2">Shipping Methods</p>
              <div className="flex flex-wrap gap-2">
                {vendor.shippingMethods.map((method, index) => (
                  <Badge key={index} className="bg-indigo-100 text-indigo-800">
                    {method}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div>
              <p className="text-sm text-gray-600 mb-2">Delivery Areas</p>
              <div className="flex flex-wrap gap-2">
                {vendor.deliveryAreas.map((area, index) => (
                  <Badge key={index} className="bg-teal-100 text-teal-800">
                    {area}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function DocumentsTab({ vendor }: { vendor: VendorData }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Uploaded Documents</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {vendor.documents.map((doc, index) => (
            <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <FileText className="h-8 w-8 text-gray-400" />
                <div>
                  <p className="font-medium">{doc.type}</p>
                  <p className="text-sm text-gray-600">{doc.name}</p>
                  <p className="text-xs text-gray-500">Uploaded: {new Date(doc.uploadDate).toLocaleDateString()}</p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function PerformanceTab({ vendor }: { vendor: VendorData }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Performance Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Overall Rating</span>
              <div className="flex items-center">
                <Star className="h-5 w-5 text-yellow-400 fill-current" />
                <span className="font-semibold ml-1">{vendor.rating}/5.0</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Total Orders</span>
              <span className="font-semibold">{vendor.totalOrders}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Total Revenue</span>
              <span className="font-semibold">{vendor.totalRevenue}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Payment Terms</span>
              <span className="font-semibold capitalize">{vendor.paymentTerms}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Min Order Value</span>
              <span className="font-semibold">₹{vendor.minimumOrderValue}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600">Sales Contact</p>
              <p className="font-medium">{vendor.salesContact}</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-600">Support Contact</p>
              <p className="font-medium">{vendor.supportContact}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}