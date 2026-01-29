'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/UI/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/UI/Card'
import { ArrowLeft, Save, X, Plus, Trash2, Upload } from 'lucide-react'
import Link from 'next/link'
import { categoryService, Category, CategoryFormData, SubcategoryFormData } from '@/services/categoryService'

interface AddEditCategoryProps {
  categoryId?: string
  isEdit?: boolean
}

export default function AddEditCategory({ categoryId, isEdit = false }: AddEditCategoryProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingData, setIsLoadingData] = useState(isEdit)
  const [activeTab, setActiveTab] = useState<'category' | 'subcategories'>('category')
  const [parentCategories, setParentCategories] = useState<Category[]>([])

  const [categoryData, setCategoryData] = useState<CategoryFormData>({
    name: '',
    description: '',
    slug: '',
    parentId: '',
    status: 'ACTIVE',
    image: '',
    metaTitle: '',
    metaDescription: '',
    sortOrder: 0
  })

  const [subcategories, setSubcategories] = useState<SubcategoryFormData[]>([])
  const [newSubcategory, setNewSubcategory] = useState<SubcategoryFormData>({
    name: '',
    description: '',
    slug: '',
    status: 'ACTIVE',
    sortOrder: 0
  })

  // Load category data for editing
  useEffect(() => {
    loadParentCategories()
    if (isEdit && categoryId) {
      loadCategoryData()
    }
  }, [isEdit, categoryId])

  const loadParentCategories = async () => {
    try {
      const categories = await categoryService.getParentCategories()
      setParentCategories(categories)
    } catch (error) {
      console.error('Failed to load parent categories:', error)
    }
  }

  const loadCategoryData = async () => {
    if (!categoryId) return
    
    setIsLoadingData(true)
    try {
      const response = await categoryService.getCategoryById(categoryId)
      const category = response.data
      
      setCategoryData({
        name: category.name,
        description: category.description,
        slug: category.slug,
        parentId: category.parentId || '',
        status: category.status,
        image: category.image || '',
        metaTitle: category.metaTitle || '',
        metaDescription: category.metaDescription || '',
        sortOrder: category.sortOrder
      })

      // Set subcategories
      setSubcategories(category.subcategories.map(sub => ({
        id: sub.id,
        name: sub.name,
        description: sub.description,
        slug: sub.slug,
        status: sub.status,
        image: sub.image,
        sortOrder: sub.sortOrder
      })))
    } catch (error) {
      console.error('Error loading category data:', error)
    } finally {
      setIsLoadingData(false)
    }
  }

  // Auto-generate slug from name
  const generateSlug = (name: string) => {
    return categoryService.generateSlug(name)
  }

  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setCategoryData(prev => ({
      ...prev,
      [name]: name === 'sortOrder' ? parseInt(value) || 0 : value,
      ...(name === 'name' && { slug: generateSlug(value) })
    }))
  }

  const handleNewSubcategoryChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setNewSubcategory(prev => ({
      ...prev,
      [name]: name === 'sortOrder' ? parseInt(value) || 0 : value,
      ...(name === 'name' && { slug: generateSlug(value) })
    }))
  }

  const addSubcategory = () => {
    if (newSubcategory.name.trim()) {
      const subcategory: SubcategoryFormData = {
        ...newSubcategory,
        id: Date.now().toString()
      }
      setSubcategories(prev => [...prev, subcategory])
      setNewSubcategory({
        name: '',
        description: '',
        slug: '',
        status: 'ACTIVE',
        sortOrder: subcategories.length + 1
      })
    }
  }

  const removeSubcategory = (subcategoryId: string) => {
    setSubcategories(prev => prev.filter(sub => sub.id !== subcategoryId))
  }

  const updateSubcategory = (subcategoryId: string, field: keyof SubcategoryFormData, value: any) => {
    setSubcategories(prev => prev.map(sub => 
      sub.id === subcategoryId 
        ? { 
            ...sub, 
            [field]: value,
            ...(field === 'name' && { slug: generateSlug(value) })
          } 
        : sub
    ))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const payload = {
        ...categoryData,
        subcategories: subcategories
      }

      if (isEdit && categoryId) {
        await categoryService.updateCategory(categoryId, payload)
      } else {
        await categoryService.createCategory(payload)
      }
      
      // Redirect back to categories list
      router.push('/admin/dashboard/categories')
    } catch (error) {
      console.error('Error saving category:', error)
      alert(error instanceof Error ? error.message : 'Failed to save category')
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
            <Link href="/admin/dashboard/categories">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Categories
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Loading...</h1>
          </div>
        </div>
        <Card>
          <CardContent className="p-8">
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-700"></div>
              <span className="ml-3 text-gray-600">Loading category data...</span>
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
          <Link href="/admin/dashboard/categories">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Categories
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">
            {isEdit ? 'Edit Category' : 'Add New Category'}
          </h1>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        {/* Tab Navigation */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {[
                { id: 'category', label: 'Category Details' },
                { id: 'subcategories', label: 'Subcategories' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id as 'category' | 'subcategories')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-gray-700 text-gray-900'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
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
            
            {/* Category Details Tab */}
            {activeTab === 'category' && (
              <Card>
                <CardHeader>
                  <CardTitle>Category Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={categoryData.name}
                      onChange={handleCategoryChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700 focus:border-transparent"
                      placeholder="Enter category name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description *
                    </label>
                    <textarea
                      name="description"
                      value={categoryData.description}
                      onChange={handleCategoryChange}
                      required
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700 focus:border-transparent"
                      placeholder="Category description"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        URL Slug *
                      </label>
                      <input
                        type="text"
                        name="slug"
                        value={categoryData.slug}
                        onChange={handleCategoryChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700 focus:border-transparent"
                        placeholder="category-url-slug"
                      />
                      <p className="text-xs text-gray-500 mt-1">Auto-generated from name, but can be customized</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Sort Order
                      </label>
                      <input
                        type="number"
                        name="sortOrder"
                        value={categoryData.sortOrder}
                        onChange={handleCategoryChange}
                        min="0"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700 focus:border-transparent"
                        placeholder="0"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Parent Category
                    </label>
                    <select
                      name="parentId"
                      value={categoryData.parentId}
                      onChange={handleCategoryChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700 focus:border-transparent"
                    >
                      <option value="">None (Main Category)</option>
                      {parentCategories.map((parent) => (
                        <option key={parent.id} value={parent.id}>
                          {parent.name}
                        </option>
                      ))}
                    </select>
                    <p className="text-xs text-gray-500 mt-1">Leave empty to create a main category</p>
                  </div>

                  {/* SEO Section */}
                  <div className="border-t pt-4">
                    <h4 className="text-lg font-medium text-gray-900 mb-4">SEO Settings</h4>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Meta Title
                      </label>
                      <input
                        type="text"
                        name="metaTitle"
                        value={categoryData.metaTitle}
                        onChange={handleCategoryChange}
                        maxLength={60}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700 focus:border-transparent"
                        placeholder="SEO title for search engines"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        {categoryData.metaTitle?.length || 0}/60 characters
                      </p>
                    </div>

                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Meta Description
                      </label>
                      <textarea
                        name="metaDescription"
                        value={categoryData.metaDescription}
                        onChange={handleCategoryChange}
                        maxLength={160}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700 focus:border-transparent"
                        placeholder="SEO description for search engines"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        {categoryData.metaDescription?.length || 0}/160 characters
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Subcategories Tab */}
            {activeTab === 'subcategories' && (
              <Card>
                <CardHeader>
                  <CardTitle>Subcategories Management</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Add New Subcategory */}
                  <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <h4 className="font-medium text-gray-900 mb-3">Add New Subcategory</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                      <div>
                        <input
                          type="text"
                          name="name"
                          value={newSubcategory.name}
                          onChange={handleNewSubcategoryChange}
                          placeholder="Subcategory name"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          name="slug"
                          value={newSubcategory.slug}
                          onChange={handleNewSubcategoryChange}
                          placeholder="URL slug"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700 focus:border-transparent"
                        />
                      </div>
                    </div>
                    <div className="mb-3">
                      <textarea
                        name="description"
                        value={newSubcategory.description}
                        onChange={handleNewSubcategoryChange}
                        placeholder="Subcategory description"
                        rows={2}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700 focus:border-transparent"
                      />
                    </div>
                    <div className="flex gap-3">
                      <select
                        name="status"
                        value={newSubcategory.status}
                        onChange={handleNewSubcategoryChange}
                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700 focus:border-transparent"
                      >
                        <option value="ACTIVE">Active</option>
                        <option value="INACTIVE">Inactive</option>
                      </select>
                      <Button type="button" onClick={addSubcategory}>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Subcategory
                      </Button>
                    </div>
                  </div>

                  {/* Existing Subcategories */}
                  {subcategories.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="font-medium text-gray-900">Current Subcategories</h4>
                      {subcategories.map((subcategory) => (
                        <div key={subcategory.id} className="border border-gray-200 rounded-lg p-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                            <div>
                              <label className="block text-xs text-gray-500 mb-1">Name</label>
                              <input
                                type="text"
                                value={subcategory.name}
                                onChange={(e) => updateSubcategory(subcategory.id!, 'name', e.target.value)}
                                className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                              />
                            </div>
                            <div>
                              <label className="block text-xs text-gray-500 mb-1">Slug</label>
                              <input
                                type="text"
                                value={subcategory.slug}
                                onChange={(e) => updateSubcategory(subcategory.id!, 'slug', e.target.value)}
                                className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                              />
                            </div>
                          </div>
                          <div className="mb-3">
                            <label className="block text-xs text-gray-500 mb-1">Description</label>
                            <textarea
                              value={subcategory.description}
                              onChange={(e) => updateSubcategory(subcategory.id!, 'description', e.target.value)}
                              rows={2}
                              className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div>
                                <label className="block text-xs text-gray-500 mb-1">Status</label>
                                <select
                                  value={subcategory.status}
                                  onChange={(e) => updateSubcategory(subcategory.id!, 'status', e.target.value)}
                                  className="px-2 py-1 border border-gray-300 rounded text-sm"
                                >
                                  <option value="ACTIVE">Active</option>
                                  <option value="INACTIVE">Inactive</option>
                                </select>
                              </div>
                              <div>
                                <label className="block text-xs text-gray-500 mb-1">Sort Order</label>
                                <input
                                  type="number"
                                  value={subcategory.sortOrder}
                                  onChange={(e) => updateSubcategory(subcategory.id!, 'sortOrder', parseInt(e.target.value) || 0)}
                                  min="0"
                                  className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                                />
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeSubcategory(subcategory.id!)}
                              className="text-red-600 hover:text-red-800 p-1"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Status & Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category Status
                  </label>
                  <select
                    name="status"
                    value={categoryData.status}
                    onChange={handleCategoryChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700 focus:border-transparent"
                  >
                    <option value="ACTIVE">Active</option>
                    <option value="INACTIVE">Inactive</option>
                  </select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Category Image</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors cursor-pointer">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-600">
                      Click to upload category image
                    </p>
                    <p className="text-xs text-gray-500">
                      PNG, JPG up to 5MB
                    </p>
                  </div>
                  
                  {categoryData.image && (
                    <div className="relative">
                      <img
                        src={categoryData.image}
                        alt="Category"
                        className="w-full h-32 object-cover rounded border"
                      />
                      <button
                        type="button"
                        onClick={() => setCategoryData(prev => ({ ...prev, image: '' }))}
                        className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 hover:bg-red-700"
                      >
                        <X className="h-3 w-3" />
                      </button>
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
                  <span className="text-gray-600">Subcategories:</span>
                  <span className="font-medium">{subcategories.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Active Subcategories:</span>
                  <span className="font-medium">
                    {subcategories.filter(sub => sub.status === 'ACTIVE').length}
                  </span>
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
                  {isLoading ? 'Saving...' : (isEdit ? 'Update Category' : 'Create Category')}
                </Button>
                <Link href="/admin/dashboard/categories" className="block">
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