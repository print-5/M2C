'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/UI/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/UI/Card'
import { ArrowLeft, Save, Package, AlertTriangle } from 'lucide-react'
import Link from 'next/link'
import Dropdown from '@/components/UI/Dropdown'

interface InventoryFormData {
  name: string
  sku: string
  category: string
  vendor: string
  description: string
  currentStock: number
  minStock: number
  maxStock: number
  price: number
  costPrice: number
  location: string
  barcode?: string
  status: 'active' | 'inactive'
  trackInventory: boolean
  allowBackorders: boolean
  notes?: string
}

interface AddEditInventoryProps {
  inventoryId?: string
  isEdit?: boolean
}

// Mock categories and vendors
const categories = [
  'Bed Sheets', 'Towels', 'Curtains', 'Pillows', 'Blankets', 'Table Linens', 'Bath Mats'
]

const vendors = [
  'Cotton Mills Ltd', 'Textile Pro', 'Home Decor Inc', 'Sleep Comfort Co', 'Warm Textiles', 'Luxury Linens Co'
]

const locations = [
  'Warehouse A - Section 1', 'Warehouse A - Section 2', 'Warehouse B - Section 1', 'Warehouse B - Section 2', 'Store Front'
]

export default function AddEditInventory({ inventoryId, isEdit = false }: AddEditInventoryProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingData, setIsLoadingData] = useState(isEdit)

  const [formData, setFormData] = useState<InventoryFormData>({
    name: '',
    sku: '',
    category: '',
    vendor: '',
    description: '',
    currentStock: 0,
    minStock: 5,
    maxStock: 100,
    price: 0,
    costPrice: 0,
    location: '',
    barcode: '',
    status: 'active',
    trackInventory: true,
    allowBackorders: false,
    notes: ''
  })

  // Load inventory data for editing
  useEffect(() => {
    if (isEdit && inventoryId) {
      setIsLoadingData(true)
      
      // Simulate API call to fetch inventory data
      const loadInventoryData = async () => {
        try {
          await new Promise(resolve => setTimeout(resolve, 1000))
          
          // Mock inventory data for editing
          setFormData({
            name: 'Premium Cotton Bed Sheet Set',
            sku: 'CS-Q-WHT-001',
            category: 'Bed Sheets',
            vendor: 'Cotton Mills Ltd',
            description: 'Luxurious 100% cotton bed sheet set with superior comfort and durability',
            currentStock: 45,
            minStock: 10,
            maxStock: 100,
            price: 89.99,
            costPrice: 45.00,
            location: 'Warehouse A - Section 1',
            barcode: '1234567890123',
            status: 'active',
            trackInventory: true,
            allowBackorders: false,
            notes: 'Popular item, restock regularly'
          })
        } catch (error) {
          console.error('Error loading inventory data:', error)
        } finally {
          setIsLoadingData(false)
        }
      }

      loadInventoryData()
    }
  }, [isEdit, inventoryId])

  // Auto-generate SKU from name and category
  const generateSKU = (name: string, category: string) => {
    const namePrefix = name.split(' ').map(word => word.charAt(0)).join('').toUpperCase()
    const categoryPrefix = category.split(' ').map(word => word.charAt(0)).join('').toUpperCase()
    const randomNum = Math.floor(Math.random() * 1000).toString().padStart(3, '0')
    return `${categoryPrefix}-${namePrefix}-${randomNum}`
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) || 0 : 
               type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
      ...(name === 'name' && formData.category && { sku: generateSKU(value, formData.category) })
    }))
  }

  const handleDropdownChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value,
      ...(name === 'category' && formData.name && { sku: generateSKU(formData.name, value) })
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      if (isEdit) {
        console.log('Updating inventory item:', inventoryId, formData)
        // API call: PUT /api/inventory/${inventoryId}
      } else {
        console.log('Creating inventory item:', formData)
        // API call: POST /api/inventory
      }
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Redirect back to inventory list
      router.push('/admin/dashboard/inventory')
    } catch (error) {
      console.error('Error saving inventory item:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // Show loading state while fetching data
  if (isLoadingData) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/admin/dashboard/inventory">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Inventory
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Loading...</h1>
          </div>
        </div>
        <Card>
          <CardContent className="p-8">
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-700"></div>
              <span className="ml-3 text-gray-600">Loading inventory data...</span>
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
          <h1 className="text-2xl font-bold text-gray-900">
            {isEdit ? 'Edit Inventory Item' : 'Add New Inventory Item'}
          </h1>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700 focus:border-transparent"
                    placeholder="Enter product name"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Dropdown
                      id="category"
                      label="Category *"
                      value={formData.category}
                      options={categories}
                      placeholder="Select Category"
                      onChange={(value) => handleDropdownChange('category', value as string)}
                    />
                  </div>
                  <div>
                    <Dropdown
                      id="vendor"
                      label="Vendor *"
                      value={formData.vendor}
                      options={vendors}
                      placeholder="Select Vendor"
                      onChange={(value) => handleDropdownChange('vendor', value as string)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      SKU *
                    </label>
                    <input
                      type="text"
                      name="sku"
                      value={formData.sku}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700 focus:border-transparent"
                      placeholder="Auto-generated or custom SKU"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Barcode
                    </label>
                    <input
                      type="text"
                      name="barcode"
                      value={formData.barcode}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700 focus:border-transparent"
                      placeholder="Product barcode"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700 focus:border-transparent"
                    placeholder="Product description"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Stock Management */}
            <Card>
              <CardHeader>
                <CardTitle>Stock Management</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Stock *
                    </label>
                    <input
                      type="number"
                      name="currentStock"
                      value={formData.currentStock}
                      onChange={handleInputChange}
                      required
                      min="0"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Minimum Stock *
                    </label>
                    <input
                      type="number"
                      name="minStock"
                      value={formData.minStock}
                      onChange={handleInputChange}
                      required
                      min="0"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Maximum Stock *
                    </label>
                    <input
                      type="number"
                      name="maxStock"
                      value={formData.maxStock}
                      onChange={handleInputChange}
                      required
                      min="1"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <Dropdown
                    id="location"
                    label="Storage Location"
                    value={formData.location}
                    options={locations}
                    placeholder="Select Location"
                    onChange={(value) => handleDropdownChange('location', value as string)}
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="trackInventory"
                      checked={formData.trackInventory}
                      onChange={handleInputChange}
                      className="rounded border-gray-300 text-gray-700 focus:ring-gray-700"
                    />
                    <label className="ml-2 text-sm text-gray-700">
                      Track inventory for this item
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="allowBackorders"
                      checked={formData.allowBackorders}
                      onChange={handleInputChange}
                      className="rounded border-gray-300 text-gray-700 focus:ring-gray-700"
                    />
                    <label className="ml-2 text-sm text-gray-700">
                      Allow backorders when out of stock
                    </label>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Pricing */}
            <Card>
              <CardHeader>
                <CardTitle>Pricing Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cost Price *
                    </label>
                    <input
                      type="number"
                      name="costPrice"
                      value={formData.costPrice}
                      onChange={handleInputChange}
                      required
                      min="0"
                      step="0.01"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700 focus:border-transparent"
                      placeholder="0.00"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Selling Price *
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      required
                      min="0"
                      step="0.01"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700 focus:border-transparent"
                      placeholder="0.00"
                    />
                  </div>
                </div>

                {formData.price > 0 && formData.costPrice > 0 && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-medium text-blue-900 mb-2">Profit Analysis</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-blue-800">Profit Margin:</span>
                        <span className="font-medium ml-2">
                          ${(formData.price - formData.costPrice).toFixed(2)}
                        </span>
                      </div>
                      <div>
                        <span className="text-blue-800">Profit %:</span>
                        <span className="font-medium ml-2">
                          {(((formData.price - formData.costPrice) / formData.price) * 100).toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Status & Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Dropdown
                    id="status"
                    label="Status"
                    value={formData.status}
                    options={[
                      { value: 'active', label: 'Active' },
                      { value: 'inactive', label: 'Inactive' }
                    ]}
                    onChange={(value) => handleDropdownChange('status', value as string)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Stock Alert */}
            {formData.currentStock <= formData.minStock && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-yellow-700">
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    Stock Alert
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-yellow-700">
                    Current stock ({formData.currentStock}) is at or below minimum threshold ({formData.minStock}).
                    Consider restocking soon.
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Stock Value:</span>
                  <span className="font-medium">
                    ${(formData.currentStock * formData.costPrice).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Potential Revenue:</span>
                  <span className="font-medium">
                    ${(formData.currentStock * formData.price).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Stock Range:</span>
                  <span className="font-medium">
                    {formData.minStock} - {formData.maxStock}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Notes */}
            <Card>
              <CardHeader>
                <CardTitle>Additional Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700 focus:border-transparent"
                  placeholder="Any additional notes about this inventory item..."
                />
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
                  {isLoading ? 'Saving...' : (isEdit ? 'Update Item' : 'Create Item')}
                </Button>
                <Link href="/admin/dashboard/inventory" className="block">
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