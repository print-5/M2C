'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/UI/Card'
import { Button } from '@/components/UI/Button'
import { Badge } from '@/components/UI/Badge'
import { Plus, Edit, Trash2, Eye, Search, Filter } from 'lucide-react'
import Link from 'next/link'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/UI/Table'
import Dropdown from '@/components/UI/Dropdown'

interface Category {
  id: string
  name: string
  description: string
  slug: string
  parentId?: string
  subcategories: Category[]
  productCount: number
  status: 'active' | 'inactive'
  createdAt: string
  updatedAt: string
}

// Mock data for categories
const mockCategories: Category[] = [
  {
    id: '1',
    name: 'Bed Sheets',
    description: 'Premium quality bed sheets in various materials and sizes',
    slug: 'bed-sheets',
    subcategories: [
      {
        id: '1-1',
        name: 'Cotton Sheets',
        description: '100% cotton bed sheets',
        slug: 'cotton-sheets',
        parentId: '1',
        subcategories: [],
        productCount: 45,
        status: 'active',
        createdAt: '2024-01-15',
        updatedAt: '2024-01-20'
      },
      {
        id: '1-2',
        name: 'Linen Sheets',
        description: 'Natural linen bed sheets',
        slug: 'linen-sheets',
        parentId: '1',
        subcategories: [],
        productCount: 23,
        status: 'active',
        createdAt: '2024-01-16',
        updatedAt: '2024-01-21'
      },
      {
        id: '1-3',
        name: 'Silk Sheets',
        description: 'Luxury silk bed sheets',
        slug: 'silk-sheets',
        parentId: '1',
        subcategories: [],
        productCount: 12,
        status: 'active',
        createdAt: '2024-01-17',
        updatedAt: '2024-01-22'
      }
    ],
    productCount: 80,
    status: 'active',
    createdAt: '2024-01-10',
    updatedAt: '2024-01-25'
  },
  {
    id: '2',
    name: 'Towels',
    description: 'Absorbent and soft towels for all purposes',
    slug: 'towels',
    subcategories: [
      {
        id: '2-1',
        name: 'Bath Towels',
        description: 'Large bath towels',
        slug: 'bath-towels',
        parentId: '2',
        subcategories: [],
        productCount: 35,
        status: 'active',
        createdAt: '2024-01-18',
        updatedAt: '2024-01-23'
      },
      {
        id: '2-2',
        name: 'Hand Towels',
        description: 'Compact hand towels',
        slug: 'hand-towels',
        parentId: '2',
        subcategories: [],
        productCount: 28,
        status: 'active',
        createdAt: '2024-01-19',
        updatedAt: '2024-01-24'
      }
    ],
    productCount: 63,
    status: 'active',
    createdAt: '2024-01-12',
    updatedAt: '2024-01-26'
  },
  {
    id: '3',
    name: 'Curtains',
    description: 'Decorative and functional curtains',
    slug: 'curtains',
    subcategories: [
      {
        id: '3-1',
        name: 'Blackout Curtains',
        description: 'Light-blocking curtains',
        slug: 'blackout-curtains',
        parentId: '3',
        subcategories: [],
        productCount: 18,
        status: 'active',
        createdAt: '2024-01-20',
        updatedAt: '2024-01-25'
      }
    ],
    productCount: 42,
    status: 'active',
    createdAt: '2024-01-14',
    updatedAt: '2024-01-27'
  },
  {
    id: '4',
    name: 'Pillows',
    description: 'Comfortable pillows for better sleep',
    slug: 'pillows',
    subcategories: [],
    productCount: 25,
    status: 'inactive',
    createdAt: '2024-01-16',
    updatedAt: '2024-01-28'
  }
]
import { categoryService, Category, CategoryStats } from '@/services/categoryService'

export default function CategoryLists() {
  const [categories, setCategories] = useState<Category[]>([])
  const [stats, setStats] = useState<CategoryStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'ACTIVE' | 'INACTIVE'>('all')
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set())

  useEffect(() => {
    loadCategories()
    loadStats()
  }, [searchTerm, statusFilter])

  const loadCategories = async () => {
    try {
      setLoading(true)
      const response = await categoryService.getCategories({
        search: searchTerm || undefined,
        status: statusFilter,
        includeSubcategories: true,
        sortBy: 'sortOrder',
        sortOrder: 'asc'
      })
      setCategories(response.data)
    } catch (error) {
      console.error('Failed to load categories:', error)
    } finally {
      setLoading(false)
    }
  }

  const loadStats = async () => {
    try {
      const response = await categoryService.getCategoryStats()
      setStats(response.data)
    } catch (error) {
      console.error('Failed to load stats:', error)
    }
  }

  // Filter categories based on search and status
  const filteredCategories = categories.filter(category => {
    const matchesSearch = category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         category.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || category.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const toggleExpanded = (categoryId: string) => {
    const newExpanded = new Set(expandedCategories)
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId)
    } else {
      newExpanded.add(categoryId)
    }
    setExpandedCategories(newExpanded)
  }

  const handleDelete = async (categoryId: string) => {
    if (confirm('Are you sure you want to delete this category? This action cannot be undone.')) {
      try {
        await categoryService.deleteCategory(categoryId)
        await loadCategories()
        await loadStats()
      } catch (error) {
        alert(error instanceof Error ? error.message : 'Failed to delete category')
      }
    }
  }

  const renderCategoryRow = (category: Category, isSubcategory = false) => (
    <TableRow key={category.id} className={isSubcategory ? 'bg-gray-50' : ''}>
      <TableCell className="whitespace-nowrap">
        <div className="flex items-center">
          {!isSubcategory && category.subcategories.length > 0 && (
            <button
              onClick={() => toggleExpanded(category.id)}
              className="mr-2 p-1 hover:bg-gray-200 rounded"
            >
              <svg
                className={`w-4 h-4 transition-transform ${
                  expandedCategories.has(category.id) ? 'rotate-90' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
          <div className={isSubcategory ? 'ml-6' : ''}>
            <div className="text-sm font-medium text-gray-900">{category.name}</div>
            <div className="text-sm text-gray-500">{category.slug}</div>
          </div>
        </div>
      </TableCell>
      <TableCell>
        <div className="text-sm text-gray-900 max-w-xs truncate" title={category.description}>
          {category.description}
        </div>
      </TableCell>
      <TableCell className="whitespace-nowrap text-center">
        <span className="text-sm font-medium text-gray-900">{category.productCount}</span>
      </TableCell>
      <TableCell className="whitespace-nowrap">
        <Badge 
          variant={category.status === 'ACTIVE' ? 'default' : 'secondary'}
          className={category.status === 'ACTIVE' ? 'bg-green-100 text-green-800 border-green-200' : ''}
        >
          {category.status.toLowerCase()}
        </Badge>
      </TableCell>
      <TableCell className="whitespace-nowrap text-sm text-gray-500">
        {new Date(category.updatedAt).toLocaleDateString()}
      </TableCell>
      <TableCell className="whitespace-nowrap text-right text-sm font-medium">
        <div className="flex items-center justify-end space-x-2">
          <Link href={`/dashboard/categories/view/${category.id}`}>
            <Button variant="ghost" size="sm">
              <Eye className="h-4 w-4" />
            </Button>
          </Link>
          <Link href={`/dashboard/categories/edit/${category.id}`}>
            <Button variant="ghost" size="sm">
              <Edit className="h-4 w-4" />
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleDelete(category.id)}
            className="text-red-600 hover:text-red-800"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Categories</h1>
          <p className="text-gray-600">Manage your product categories and subcategories</p>
        </div>
        <Link href="/admin/dashboard/categories/add">
          <Button className="bg-[#313131] text-white hover:bg-[#222222]">
            <Plus className="h-4 w-4 mr-2" />
            Add Category
          </Button>
        </Link>
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
                  placeholder="Search categories..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <Dropdown
                id="statusFilter"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as 'all' | 'ACTIVE' | 'INACTIVE')}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="ACTIVE">Active</option>
                <option value="INACTIVE">Inactive</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Categories Table */}
      <Card>
        <CardHeader>
          <CardTitle>Categories List</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-700"></div>
              <span className="ml-3 text-gray-600">Loading categories...</span>
            </div>
          ) : (
            <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Products
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Updated
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredCategories.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center">
                      <div className="text-gray-500">
                        <p className="text-lg font-medium">No categories found</p>
                        <p className="text-sm">Try adjusting your search or filter criteria</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredCategories.map((category) => (
                    <>
                      {renderCategoryRow(category)}
                      {expandedCategories.has(category.id) &&
                        category.subcategories.map((subcategory) =>
                          renderCategoryRow(subcategory, true)
                        )}
                    </>
                  ))
                )}
              </tbody>
            </table>
          </div>
          )}
        </CardContent>
      </Card>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{stats?.total || 0}</div>
              <div className="text-sm text-gray-500">Total Categories</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {stats?.active || 0}
              </div>
              <div className="text-sm text-gray-500">Active Categories</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {stats?.subcategories || 0}
              </div>
              <div className="text-sm text-gray-500">Total Subcategories</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {categories.reduce((sum, c) => sum + c.productCount, 0)}
              </div>
              <div className="text-sm text-gray-500">Total Products</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}