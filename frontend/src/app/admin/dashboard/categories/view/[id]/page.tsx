'use client'

import { use, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Breadcrumb } from '@/components/AdminDashboard/Breadcrumb/Breadcrumb'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/UI/Card'
import { Badge } from '@/components/UI/Badge'
import { Button } from '@/components/UI/Button'
import { ArrowLeft, Edit, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { categoryService, Category } from '@/services/categoryService'

interface ViewCategoryPageProps {
  params: Promise<{
    id: string
  }>
}

export default function ViewCategoryPage({ params }: ViewCategoryPageProps) {
  const { id } = use(params)
  const router = useRouter()
  const [category, setCategory] = useState<Category | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadCategory()
  }, [id])

  const loadCategory = async () => {
    try {
      setLoading(true)
      const response = await categoryService.getCategoryById(id)
      setCategory(response.data)
    } catch (err) {
      console.error('Failed to load category:', err)
      setError(err instanceof Error ? err.message : 'Failed to load category')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!category) return
    
    if (confirm('Are you sure you want to delete this category? This action cannot be undone.')) {
      try {
        await categoryService.deleteCategory(category.id)
        router.push('/admin/dashboard/categories')
      } catch (err) {
        alert(err instanceof Error ? err.message : 'Failed to delete category')
      }
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <Breadcrumb />
        <Card>
          <CardContent className="p-8">
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-700"></div>
              <span className="ml-3 text-gray-600">Loading category...</span>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (error || !category) {
    return (
      <div className="space-y-6">
        <Breadcrumb />
        <Card>
          <CardContent className="p-8 text-center">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              {error ? 'Error Loading Category' : 'Category Not Found'}
            </h2>
            <p className="text-gray-600 mb-4">
              {error || "The category you're looking for doesn't exist or has been removed."}
            </p>
            <Button onClick={() => router.push('/admin/dashboard/categories')}>
              Back to Categories
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <Breadcrumb />
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{category.name}</h1>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Link href={`/admin/dashboard/categories/edit/${category.id}`}>
            <Button variant="outline">
              <Edit className="h-4 w-4 mr-2" />
              Edit Category
            </Button>
          </Link>
          <Button variant="outline" onClick={handleDelete} className="text-red-600 hover:text-red-800">
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category Name</label>
                  <p className="text-gray-900">{category.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">URL Slug</label>
                  <p className="text-gray-900 font-mono text-sm">{category.slug}</p>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <p className="text-gray-900">{category.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <Badge 
                    variant={category.status === 'ACTIVE' ? 'default' : 'secondary'}
                    className={category.status === 'ACTIVE' ? 'bg-green-100 text-green-800 border-green-200' : ''}
                  >
                    {category.status.toLowerCase()}
                  </Badge>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sort Order</label>
                  <p className="text-gray-900">{category.sortOrder}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Product Count</label>
                  <p className="text-gray-900 font-semibold">{category.productCount}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* SEO Information */}
          <Card>
            <CardHeader>
              <CardTitle>SEO Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Meta Title</label>
                <p className="text-gray-900">{category.metaTitle || 'Not set'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Meta Description</label>
                <p className="text-gray-900">{category.metaDescription || 'Not set'}</p>
              </div>
            </CardContent>
          </Card>

          {/* Subcategories */}
          <Card>
            <CardHeader>
              <CardTitle>Subcategories ({category.subcategories.length})</CardTitle>
            </CardHeader>
            <CardContent>
              {category.subcategories.length > 0 ? (
                <div className="space-y-3">
                  {category.subcategories.map((subcategory) => (
                    <div key={subcategory.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3">
                            <h4 className="font-medium text-gray-900">{subcategory.name}</h4>
                            <Badge 
                              variant={subcategory.status === 'ACTIVE' ? 'default' : 'secondary'}
                              className={subcategory.status === 'ACTIVE' ? 'bg-green-100 text-green-800 border-green-200' : ''}
                            >
                              {subcategory.status.toLowerCase()}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{subcategory.description}</p>
                          <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                            <span>Slug: {subcategory.slug}</span>
                            <span>Products: {subcategory.productCount}</span>
                            <span>Updated: {new Date(subcategory.updatedAt).toLocaleDateString()}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Link href={`/admin/dashboard/categories/edit/${subcategory.id}`}>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-3 w-3" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">No subcategories found</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Category Image */}
          <Card>
            <CardHeader>
              <CardTitle>Category Image</CardTitle>
            </CardHeader>
            <CardContent>
              {category.image ? (
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-48 object-cover rounded-lg border"
                  onError={(e) => {
                    // Handle broken images
                    const target = e.target as HTMLImageElement;
                    target.src = '/assets/images/categories/cs1.jpg'; // Fallback image
                  }}
                />
              ) : (
                <div className="w-full h-48 bg-gray-100 rounded-lg border flex items-center justify-center">
                  <p className="text-gray-500">No image uploaded</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Statistics */}
          <Card>
            <CardHeader>
              <CardTitle>Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Total Products:</span>
                <span className="font-medium">{category.productCount}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subcategories:</span>
                <span className="font-medium">{category.subcategories.length}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Active Subcategories:</span>
                <span className="font-medium">
                  {category.subcategories.filter(sub => sub.status === 'ACTIVE').length}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Created:</span>
                <span className="font-medium">{new Date(category.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Last Updated:</span>
                <span className="font-medium">{new Date(category.updatedAt).toLocaleDateString()}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}