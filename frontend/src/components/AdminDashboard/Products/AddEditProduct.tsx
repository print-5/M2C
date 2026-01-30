'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/UI/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/UI/Card'
import { ArrowLeft, Save, X, Upload } from 'lucide-react'
import Link from 'next/link'
import { categories } from '@/components/mockData/products'
import Dropdown from '@/components/UI/Dropdown'

// Mock data for categories and subcategories
const categorySubcategories: Record<string, string[]> = {
  'Bed Sheets': ['Cotton Sheets', 'Linen Sheets', 'Silk Sheets', 'Microfiber Sheets'],
  'Towels': ['Bath Towels', 'Hand Towels', 'Beach Towels', 'Kitchen Towels'],
  'Curtains': ['Blackout Curtains', 'Sheer Curtains', 'Thermal Curtains', 'Decorative Curtains'],
  'Pillows': ['Bed Pillows', 'Decorative Pillows', 'Travel Pillows', 'Memory Foam Pillows'],
  'Blankets': ['Wool Blankets', 'Cotton Blankets', 'Fleece Blankets', 'Electric Blankets']
}

const fabricTypes = [
  'Cotton', 'Linen', 'Silk', 'Polyester', 'Microfiber', 'Bamboo', 'Modal', 'Tencel', 'Wool', 'Cashmere'
]

const standardSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'King', 'Queen', 'Full', 'Twin', 'Custom']
const standardColors = ['White', 'Black', 'Gray', 'Navy', 'Beige', 'Brown', 'Red', 'Blue', 'Green', 'Yellow', 'Pink', 'Purple']

interface ProductVariant {
  id: string
  size: string
  color: string
  sku: string
  price: number
  stock: number
  images: string[]
}

interface ProductImage {
  id: string
  url: string
  alt: string
  isPrimary: boolean
}

interface FabricSpecification {
  type: string
  composition: string
  weight: string
  weave: string
  finish: string
  careInstructions: string[]
}

interface PricingTier {
  minQuantity: number
  maxQuantity?: number
  price: number
  discount?: number
}

interface ProductFormData {
  name: string
  description: string
  category: string
  subCategory: string
  
  // Fabric & Specifications
  fabricType: string
  fabricSpecifications: FabricSpecification
  
  // Variants Management
  variants: ProductVariant[]
  hasVariants: boolean
  
  // Base Product Info (when no variants)
  basePrice: number
  baseSku: string
  
  // Images
  images: ProductImage[]
  
  // Pricing Configuration
  pricingTiers: PricingTier[]
  bulkPricingEnabled: boolean
  
  // Stock Management
  totalStock: number
  lowStockThreshold: number
  trackInventory: boolean
  
  // Order Configuration
  minimumOrderQuantity: number
  maximumOrderQuantity?: number
  
  // Dispatch & Shipping
  dispatchTimeline: {
    processingDays: number
    shippingDays: number
    totalDays: number
  }
  
  // Additional Info
  tags: string[]
  dimensions?: string
  weight?: string
  inStock: boolean
  status: 'active' | 'pending' | 'suspended' | 'out_of_stock'
}

interface AddEditProductProps {
  productId?: string
  isEdit?: boolean
}

export default function AddEditProduct({ productId, isEdit = false }: AddEditProductProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingData, setIsLoadingData] = useState(isEdit)
  
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    description: '',
    category: '',
    subCategory: '',
    
    // Fabric & Specifications
    fabricType: '',
    fabricSpecifications: {
      type: '',
      composition: '',
      weight: '',
      weave: '',
      finish: '',
      careInstructions: []
    },
    
    // Variants Management
    variants: [],
    hasVariants: false,
    
    // Base Product Info
    basePrice: 0,
    baseSku: '',
    
    // Images
    images: [],
    
    // Pricing Configuration
    pricingTiers: [{ minQuantity: 1, price: 0 }],
    bulkPricingEnabled: false,
    
    // Stock Management
    totalStock: 0,
    lowStockThreshold: 10,
    trackInventory: true,
    
    // Order Configuration
    minimumOrderQuantity: 1,
    maximumOrderQuantity: undefined,
    
    // Dispatch & Shipping
    dispatchTimeline: {
      processingDays: 1,
      shippingDays: 3,
      totalDays: 4
    },
    
    // Additional Info
    tags: [],
    dimensions: '',
    weight: '',
    inStock: true,
    status: 'pending'
  })

  const [newTag, setNewTag] = useState('')
  const [newCareInstruction, setNewCareInstruction] = useState('')
  const [activeTab, setActiveTab] = useState('basic')
  const [newVariant, setNewVariant] = useState<Partial<ProductVariant>>({
    size: '',
    color: '',
    sku: '',
    price: 0,
    stock: 0
  })

  // Load product data for editing
  useEffect(() => {
    if (isEdit && productId) {
      setIsLoadingData(true)
      
      // Simulate API call to fetch product data
      const loadProductData = async () => {
        try {
          // In a real app, you'd fetch from your API
          // For now, we'll simulate loading
          await new Promise(resolve => setTimeout(resolve, 1000))
          
          // Mock product data for editing
          setFormData({
            name: 'Premium Cotton Bed Sheet Set',
            description: 'Luxurious 100% cotton bed sheet set with superior comfort and durability',
            category: categories[0],
            subCategory: 'Cotton Sheets',
            
            fabricType: 'Cotton',
            fabricSpecifications: {
              type: 'Cotton',
              composition: '100% Cotton',
              weight: '200 GSM',
              weave: 'Percale',
              finish: 'Pre-shrunk',
              careInstructions: ['Machine wash cold', 'Tumble dry low', 'Iron if needed']
            },
            
            variants: [
              {
                id: '1',
                size: 'Queen',
                color: 'White',
                sku: 'CS-Q-WHT-001',
                price: 89.99,
                stock: 25,
                images: []
              },
              {
                id: '2',
                size: 'King',
                color: 'White',
                sku: 'CS-K-WHT-001',
                price: 99.99,
                stock: 15,
                images: []
              }
            ],
            hasVariants: true,
            
            basePrice: 89.99,
            baseSku: 'CS-001',
            
            images: [],
            
            pricingTiers: [
              { minQuantity: 1, maxQuantity: 9, price: 89.99 },
              { minQuantity: 10, maxQuantity: 49, price: 79.99, discount: 11 },
              { minQuantity: 50, price: 69.99, discount: 22 }
            ],
            bulkPricingEnabled: true,
            
            totalStock: 40,
            lowStockThreshold: 5,
            trackInventory: true,
            
            minimumOrderQuantity: 2,
            maximumOrderQuantity: 100,
            
            dispatchTimeline: {
              processingDays: 2,
              shippingDays: 5,
              totalDays: 7
            },
            
            tags: ['premium', 'cotton', 'bedding'],
            dimensions: '230x250 cm',
            weight: '1.2 kg',
            inStock: true,
            status: 'active'
          })
        } catch (error) {
          console.error('Error loading product data:', error)
        } finally {
          setIsLoadingData(false)
        }
      }

      loadProductData()
    }
  }, [isEdit, productId])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    
    if (name.includes('.')) {
      // Handle nested object updates (e.g., fabricSpecifications.type)
      const [parent, child] = name.split('.')
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof ProductFormData] as any,
          [child]: value
        }
      }))
    } else if (name.includes('dispatchTimeline.')) {
      const field = name.replace('dispatchTimeline.', '')
      const numValue = parseInt(value) || 0
      setFormData(prev => ({
        ...prev,
        dispatchTimeline: {
          ...prev.dispatchTimeline,
          [field]: numValue,
          totalDays: field === 'processingDays' 
            ? numValue + prev.dispatchTimeline.shippingDays
            : field === 'shippingDays'
            ? prev.dispatchTimeline.processingDays + numValue
            : prev.dispatchTimeline.totalDays
        }
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'number' ? parseFloat(value) || 0 : 
                 type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
      }))
    }
  }

  // Variant Management Functions
  const addVariant = () => {
    if (newVariant.size && newVariant.color && newVariant.sku) {
      const variant: ProductVariant = {
        id: Date.now().toString(),
        size: newVariant.size!,
        color: newVariant.color!,
        sku: newVariant.sku!,
        price: newVariant.price || 0,
        stock: newVariant.stock || 0,
        images: []
      }
      
      setFormData(prev => ({
        ...prev,
        variants: [...prev.variants, variant]
      }))
      
      setNewVariant({ size: '', color: '', sku: '', price: 0, stock: 0 })
    }
  }

  const removeVariant = (variantId: string) => {
    setFormData(prev => ({
      ...prev,
      variants: prev.variants.filter(v => v.id !== variantId)
    }))
  }

  const updateVariant = (variantId: string, field: keyof ProductVariant, value: any) => {
    setFormData(prev => ({
      ...prev,
      variants: prev.variants.map(v => 
        v.id === variantId ? { ...v, [field]: value } : v
      )
    }))
  }

  // Pricing Tier Functions
  const addPricingTier = () => {
    setFormData(prev => ({
      ...prev,
      pricingTiers: [...prev.pricingTiers, { minQuantity: 1, price: 0 }]
    }))
  }

  const removePricingTier = (index: number) => {
    setFormData(prev => ({
      ...prev,
      pricingTiers: prev.pricingTiers.filter((_, i) => i !== index)
    }))
  }

  const updatePricingTier = (index: number, field: keyof PricingTier, value: any) => {
    setFormData(prev => ({
      ...prev,
      pricingTiers: prev.pricingTiers.map((tier, i) => 
        i === index ? { ...tier, [field]: value } : tier
      )
    }))
  }

  // Care Instructions Functions
  const addCareInstruction = () => {
    if (newCareInstruction.trim()) {
      setFormData(prev => ({
        ...prev,
        fabricSpecifications: {
          ...prev.fabricSpecifications,
          careInstructions: [...prev.fabricSpecifications.careInstructions, newCareInstruction.trim()]
        }
      }))
      setNewCareInstruction('')
    }
  }

  const removeCareInstruction = (instruction: string) => {
    setFormData(prev => ({
      ...prev,
      fabricSpecifications: {
        ...prev.fabricSpecifications,
        careInstructions: prev.fabricSpecifications.careInstructions.filter(i => i !== instruction)
      }
    }))
  }

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }))
      setNewTag('')
    }
  }

  const removeTag = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag)
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      if (isEdit) {
        console.log('Updating product:', productId, formData)
        // API call: PUT /api/products/${productId}
      } else {
        console.log('Creating product:', formData)
        // API call: POST /api/products
      }
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Redirect back to products list
      router.push('/dashboard/products')
    } catch (error) {
      console.error('Error saving product:', error)
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
            <Link href="/dashboard/products">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Products
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Loading...</h1>
          </div>
        </div>
        <Card>
          <CardContent className="p-8">
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-700"></div>
              <span className="ml-3 text-gray-600">Loading product data...</span>
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
          <h1 className="text-3xl font-bold text-gray-900">
            {isEdit ? 'Edit Product' : 'Add New Product'}
          </h1>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        {/* Tab Navigation */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-4">
              {[
                { id: 'basic', label: 'Basic Info' },
                { id: 'fabric', label: 'Fabric & Specs' },
                { id: 'variants', label: 'Variants' },
                { id: 'pricing', label: 'Pricing' },
                { id: 'inventory', label: 'Inventory' },
                { id: 'shipping', label: 'Shipping' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-2 px-1 border-b-2 font-medium text-base ${
                    activeTab === tab.id
                      ? 'border-white text-white bg-gray-900 px-2 rounded-t-sm'
                      : 'border-gray-100 text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Basic Information Tab */}
            {activeTab === 'basic' && (
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

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description *
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700 focus:border-transparent"
                      placeholder="Product description"
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
                        onChange={(value) => setFormData(prev => ({ 
                          ...prev, 
                          category: value as string,
                          subCategory: '' // Reset subcategory when category changes
                        }))}
                      />
                    </div>
                    <div>
                      <Dropdown
                        id="subCategory"
                        label="Sub-Category *"
                        value={formData.subCategory}
                        options={formData.category ? categorySubcategories[formData.category] || [] : []}
                        placeholder="Select Sub-Category"
                        onChange={(value) => setFormData(prev => ({ ...prev, subCategory: value as string }))}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Dimensions
                      </label>
                      <input
                        type="text"
                        name="dimensions"
                        value={formData.dimensions}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700 focus:border-transparent"
                        placeholder="e.g., 230x250 cm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Weight
                      </label>
                      <input
                        type="text"
                        name="weight"
                        value={formData.weight}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700 focus:border-transparent"
                        placeholder="e.g., 1.2 kg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Base SKU
                      </label>
                      <input
                        type="text"
                        name="baseSku"
                        value={formData.baseSku}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700 focus:border-transparent"
                        placeholder="e.g., CS-001"
                      />
                    </div>
                  </div>

                  {/* Tags */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tags
                    </label>
                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={newTag}
                          onChange={(e) => setNewTag(e.target.value)}
                          placeholder="Add a tag"
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700 focus:border-transparent"
                          onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                        />
                        <Button type="button" onClick={addTag} className='bg-gray-800 text-white p-4'>
                          Add
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {formData.tags.map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                          >
                            {tag}
                            <button
                              type="button"
                              onClick={() => removeTag(tag)}
                              className="ml-2 text-blue-600 hover:text-blue-800"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Fabric & Specifications Tab */}
            {activeTab === 'fabric' && (
              <Card>
                <CardHeader>
                  <CardTitle>Fabric Type & Specifications</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Dropdown
                      id="fabricType"
                      label="Fabric Type *"
                      value={formData.fabricType}
                      options={fabricTypes}
                      placeholder="Select Fabric Type"
                      onChange={(value) => setFormData(prev => ({ ...prev, fabricType: value as string }))}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Composition
                      </label>
                      <input
                        type="text"
                        name="fabricSpecifications.composition"
                        value={formData.fabricSpecifications.composition}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700 focus:border-transparent"
                        placeholder="e.g., 100% Cotton"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Weight (GSM)
                      </label>
                      <input
                        type="text"
                        name="fabricSpecifications.weight"
                        value={formData.fabricSpecifications.weight}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700 focus:border-transparent"
                        placeholder="e.g., 200 GSM"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Weave
                      </label>
                      <input
                        type="text"
                        name="fabricSpecifications.weave"
                        value={formData.fabricSpecifications.weave}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700 focus:border-transparent"
                        placeholder="e.g., Percale, Sateen"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Finish
                      </label>
                      <input
                        type="text"
                        name="fabricSpecifications.finish"
                        value={formData.fabricSpecifications.finish}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700 focus:border-transparent"
                        placeholder="e.g., Pre-shrunk, Mercerized"
                      />
                    </div>
                  </div>

                  {/* Care Instructions */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Care Instructions
                    </label>
                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={newCareInstruction}
                          onChange={(e) => setNewCareInstruction(e.target.value)}
                          placeholder="Add care instruction"
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700 focus:border-transparent"
                          onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCareInstruction())}
                        />
                        <Button type="button" onClick={addCareInstruction} className='bg-gray-800 text-white p-4'>
                          Add
                        </Button>
                      </div>
                      <div className="space-y-2">
                        {formData.fabricSpecifications.careInstructions.map((instruction) => (
                          <div
                            key={instruction}
                            className="flex items-center justify-between p-2 bg-gray-50 rounded-md"
                          >
                            <span className="text-sm">{instruction}</span>
                            <button
                              type="button"
                              onClick={() => removeCareInstruction(instruction)}
                              className="text-gray-700 hover:text-red-600"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Variants Tab */}
            {activeTab === 'variants' && (
              <Card>
                <CardHeader>
                  <CardTitle>Size & Color Variants</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      name="hasVariants"
                      checked={formData.hasVariants}
                      onChange={handleInputChange}
                      className="rounded border-gray-300 text-gray-700 focus:ring-gray-700"
                    />
                    <label className="text-sm font-medium text-gray-700">
                      This product has variants (different sizes/colors)
                    </label>
                  </div>

                  {formData.hasVariants && (
                    <>
                      {/* Add New Variant */}
                      <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                        <h4 className="font-medium text-gray-900 mb-3">Add New Variant</h4>
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                          <div>
                            <Dropdown
                              id="newVariantSize"
                              value={newVariant.size || ''}
                              options={standardSizes}
                              placeholder="Size"
                              onChange={(value) => setNewVariant(prev => ({ ...prev, size: value as string }))}
                            />
                          </div>
                          <div>
                            <Dropdown
                              id="newVariantColor"
                              value={newVariant.color || ''}
                              options={standardColors}
                              placeholder="Color"
                              onChange={(value) => setNewVariant(prev => ({ ...prev, color: value as string }))}
                            />
                          </div>
                          <div>
                            <input
                              type="text"
                              value={newVariant.sku}
                              onChange={(e) => setNewVariant(prev => ({ ...prev, sku: e.target.value }))}
                              placeholder="SKU"
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700 focus:border-transparent"
                            />
                          </div>
                          <div>
                            <input
                              type="number"
                              value={newVariant.price}
                              onChange={(e) => setNewVariant(prev => ({ ...prev, price: parseFloat(e.target.value) || 0 }))}
                              placeholder="Price"
                              min="0"
                              step="0.01"
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700 focus:border-transparent"
                            />
                          </div>
                          <div>
                            <Button type="button" onClick={addVariant} className="w-full bg-gray-800 text-white rounded-lg p-4">
                              Add Variant
                            </Button>
                          </div>
                        </div>
                      </div>

                      {/* Existing Variants */}
                      {formData.variants.length > 0 && (
                        <div className="space-y-3">
                          <h4 className="font-medium text-gray-900">Current Variants</h4>
                          {formData.variants.map((variant) => (
                            <div key={variant.id} className="border border-gray-200 rounded-lg p-4">
                              <div className="grid grid-cols-1 md:grid-cols-6 gap-3 items-center">
                                <div>
                                  <label className="block text-xs text-gray-500 mb-1">Size</label>
                                  <input
                                    type="text"
                                    value={variant.size}
                                    onChange={(e) => updateVariant(variant.id, 'size', e.target.value)}
                                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                                  />
                                </div>
                                <div>
                                  <label className="block text-xs text-gray-500 mb-1">Color</label>
                                  <input
                                    type="text"
                                    value={variant.color}
                                    onChange={(e) => updateVariant(variant.id, 'color', e.target.value)}
                                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                                  />
                                </div>
                                <div>
                                  <label className="block text-xs text-gray-500 mb-1">SKU</label>
                                  <input
                                    type="text"
                                    value={variant.sku}
                                    onChange={(e) => updateVariant(variant.id, 'sku', e.target.value)}
                                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                                  />
                                </div>
                                <div>
                                  <label className="block text-xs text-gray-500 mb-1">Price</label>
                                  <input
                                    type="number"
                                    value={variant.price}
                                    onChange={(e) => updateVariant(variant.id, 'price', parseFloat(e.target.value) || 0)}
                                    min="0"
                                    step="0.01"
                                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                                  />
                                </div>
                                <div>
                                  <label className="block text-xs text-gray-500 mb-1">Stock</label>
                                  <input
                                    type="number"
                                    value={variant.stock}
                                    onChange={(e) => updateVariant(variant.id, 'stock', parseInt(e.target.value) || 0)}
                                    min="0"
                                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                                  />
                                </div>
                                <div>
                                  <button
                                    type="button"
                                    onClick={() => removeVariant(variant.id)}
                                    className="text-red-600 hover:text-red-800 p-1"
                                  >
                                    <X className="h-4 w-4" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </>
                  )}

                  {!formData.hasVariants && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Base Price *
                      </label>
                      <input
                        type="number"
                        name="basePrice"
                        value={formData.basePrice}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700 focus:border-transparent"
                      />
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Pricing Tab */}
            {activeTab === 'pricing' && (
              <Card>
                <CardHeader>
                  <CardTitle>Pricing Configuration</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      name="bulkPricingEnabled"
                      checked={formData.bulkPricingEnabled}
                      onChange={handleInputChange}
                      className="rounded border-gray-300 text-gray-700 focus:ring-gray-700"
                    />
                    <label className="text-sm font-medium text-gray-700">
                      Enable bulk pricing tiers
                    </label>
                  </div>

                  {formData.bulkPricingEnabled && (
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium text-gray-900">Pricing Tiers</h4>
                        <Button type="button" onClick={addPricingTier} size="sm" className='bg-gray-800 text-white p-4'>
                          Add Tier
                        </Button>
                      </div>
                      
                      {formData.pricingTiers.map((tier, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-4">
                          <div className="grid grid-cols-1 md:grid-cols-5 gap-3 items-center">
                            <div>
                              <label className="block text-xs text-gray-500 mb-1">Min Qty</label>
                              <input
                                type="number"
                                value={tier.minQuantity}
                                onChange={(e) => updatePricingTier(index, 'minQuantity', parseInt(e.target.value) || 1)}
                                min="1"
                                className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                              />
                            </div>
                            <div>
                              <label className="block text-xs text-gray-500 mb-1">Max Qty</label>
                              <input
                                type="number"
                                value={tier.maxQuantity || ''}
                                onChange={(e) => updatePricingTier(index, 'maxQuantity', e.target.value ? parseInt(e.target.value) : undefined)}
                                min="1"
                                placeholder="No limit"
                                className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                              />
                            </div>
                            <div>
                              <label className="block text-xs text-gray-500 mb-1">Price</label>
                              <input
                                type="number"
                                value={tier.price}
                                onChange={(e) => updatePricingTier(index, 'price', parseFloat(e.target.value) || 0)}
                                min="0"
                                step="0.01"
                                className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                              />
                            </div>
                            <div>
                              <label className="block text-xs text-gray-500 mb-1">Discount %</label>
                              <input
                                type="number"
                                value={tier.discount || ''}
                                onChange={(e) => updatePricingTier(index, 'discount', e.target.value ? parseFloat(e.target.value) : undefined)}
                                min="0"
                                max="100"
                                step="0.1"
                                placeholder="Optional"
                                className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                              />
                            </div>
                            <div>
                              {formData.pricingTiers.length > 1 && (
                                <button
                                  type="button"
                                  onClick={() => removePricingTier(index)}
                                  className="text-red-600 hover:text-red-800 p-1"
                                >
                                  <X className="h-4 w-4" />
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Inventory Tab */}
            {activeTab === 'inventory' && (
              <Card>
                <CardHeader>
                  <CardTitle>Stock Quantity Management</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      name="trackInventory"
                      checked={formData.trackInventory}
                      onChange={handleInputChange}
                      className="rounded border-gray-300 text-gray-700 focus:ring-gray-700"
                    />
                    <label className="text-sm font-medium text-gray-700">
                      Track inventory for this product
                    </label>
                  </div>

                  {formData.trackInventory && (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Total Stock Quantity *
                          </label>
                          <input
                            type="number"
                            name="totalStock"
                            value={formData.totalStock}
                            onChange={handleInputChange}
                            required
                            min="0"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Low Stock Threshold
                          </label>
                          <input
                            type="number"
                            name="lowStockThreshold"
                            value={formData.lowStockThreshold}
                            onChange={handleInputChange}
                            min="0"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700 focus:border-transparent"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Minimum Order Quantity *
                          </label>
                          <input
                            type="number"
                            name="minimumOrderQuantity"
                            value={formData.minimumOrderQuantity}
                            onChange={handleInputChange}
                            required
                            min="1"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Maximum Order Quantity
                          </label>
                          <input
                            type="number"
                            name="maximumOrderQuantity"
                            value={formData.maximumOrderQuantity || ''}
                            onChange={handleInputChange}
                            min="1"
                            placeholder="No limit"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700 focus:border-transparent"
                          />
                        </div>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Shipping Tab */}
            {activeTab === 'shipping' && (
              <Card>
                <CardHeader>
                  <CardTitle>Dispatch Timeline Configuration</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Processing Days *
                      </label>
                      <input
                        type="number"
                        name="dispatchTimeline.processingDays"
                        value={formData.dispatchTimeline.processingDays}
                        onChange={handleInputChange}
                        required
                        min="0"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700 focus:border-transparent"
                      />
                      <p className="text-xs text-gray-500 mt-1">Days to prepare order</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Shipping Days *
                      </label>
                      <input
                        type="number"
                        name="dispatchTimeline.shippingDays"
                        value={formData.dispatchTimeline.shippingDays}
                        onChange={handleInputChange}
                        required
                        min="0"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700 focus:border-transparent"
                      />
                      <p className="text-xs text-gray-500 mt-1">Days for delivery</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Total Days
                      </label>
                      <input
                        type="number"
                        value={formData.dispatchTimeline.totalDays}
                        disabled
                        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-600"
                      />
                      <p className="text-xs text-gray-500 mt-1">Auto-calculated</p>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-medium text-blue-900 mb-2">Delivery Timeline Summary</h4>
                    <p className="text-sm text-blue-800">
                      Orders will be processed in <strong>{formData.dispatchTimeline.processingDays} day(s)</strong> and 
                      delivered within <strong>{formData.dispatchTimeline.totalDays} day(s)</strong> from order confirmation.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Status & Availability</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Dropdown
                    id="productStatus"
                    label="Product Status"
                    value={formData.status}
                    options={[
                      { value: 'pending', label: 'Pending' },
                      { value: 'active', label: 'Active' },
                      { value: 'suspended', label: 'Suspended' },
                      { value: 'out_of_stock', label: 'Out of Stock' }
                    ]}
                    onChange={(value) => setFormData(prev => ({ ...prev, status: value as 'active' | 'pending' | 'suspended' | 'out_of_stock' }))}
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="inStock"
                    checked={formData.inStock}
                    onChange={handleInputChange}
                    className="rounded border-gray-300 text-gray-700 focus:ring-gray-700"
                  />
                  <label className="ml-2 text-sm text-gray-700">
                    In Stock
                  </label>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Product Images</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors cursor-pointer">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-600">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, GIF up to 10MB
                    </p>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        // Handle image upload logic here
                        console.log('Files selected:', e.target.files)
                      }}
                    />
                  </div>
                  
                  {/* Image Preview Grid */}
                  {formData.images.length > 0 && (
                    <div className="grid grid-cols-2 gap-2">
                      {formData.images.map((image, index) => (
                        <div key={image.id} className="relative group">
                          <img
                            src={image.url}
                            alt={image.alt}
                            className="w-full h-20 object-cover rounded border"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded flex items-center justify-center">
                            <button
                              type="button"
                              onClick={() => {
                                setFormData(prev => ({
                                  ...prev,
                                  images: prev.images.filter((_, i) => i !== index)
                                }))
                              }}
                              className="text-white hover:text-red-300"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                          {image.isPrimary && (
                            <div className="absolute top-1 left-1 bg-blue-600 text-white text-xs px-1 rounded">
                              Primary
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Total Variants:</span>
                  <span className="font-medium">{formData.variants.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Total Stock:</span>
                  <span className="font-medium">
                    {formData.hasVariants 
                      ? formData.variants.reduce((sum, v) => sum + v.stock, 0)
                      : formData.totalStock
                    }
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Price Range:</span>
                  <span className="font-medium">
                    {formData.hasVariants && formData.variants.length > 0
                      ? `$${Math.min(...formData.variants.map(v => v.price))} - $${Math.max(...formData.variants.map(v => v.price))}`
                      : `$${formData.basePrice}`
                    }
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Min Order Qty:</span>
                  <span className="font-medium">{formData.minimumOrderQuantity}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Dispatch Time:</span>
                  <span className="font-medium">{formData.dispatchTimeline.totalDays} days</span>
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
                  {isLoading ? 'Saving...' : (isEdit ? 'Update Product' : 'Create Product')}
                </Button>
                <Link href="/dashboard/products" className="block">
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