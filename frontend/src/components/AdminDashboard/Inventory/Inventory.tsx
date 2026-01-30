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
import { Package, AlertTriangle, TrendingDown, TrendingUp, Plus, Search, Filter } from 'lucide-react'
import Link from 'next/link'
import Dropdown from '@/components/UI/Dropdown'

interface InventoryItem {
  id: number
  name: string
  sku: string
  category: string
  currentStock: number
  minStock: number
  maxStock: number
  status: 'in_stock' | 'low_stock' | 'out_of_stock'
  lastRestocked: string
  vendor: string
  price: number
}

const mockInventoryItems: InventoryItem[] = [
  {
    id: 1,
    name: 'Premium Cotton Bed Sheet Set',
    sku: 'CS-Q-WHT-001',
    category: 'Bed Sheets',
    currentStock: 45,
    minStock: 10,
    maxStock: 100,
    status: 'in_stock',
    lastRestocked: '2024-01-10',
    vendor: 'Cotton Mills Ltd',
    price: 89.99,
  },
  {
    id: 2,
    name: 'Luxury Bath Towel',
    sku: 'BT-L-BLU-002',
    category: 'Towels',
    currentStock: 5,
    minStock: 10,
    maxStock: 80,
    status: 'low_stock',
    lastRestocked: '2024-01-08',
    vendor: 'Textile Pro',
    price: 24.99,
  },
  {
    id: 3,
    name: 'Blackout Curtains',
    sku: 'BC-W-GRY-003',
    category: 'Curtains',
    currentStock: 0,
    minStock: 5,
    maxStock: 50,
    status: 'out_of_stock',
    lastRestocked: '2024-01-05',
    vendor: 'Home Decor Inc',
    price: 45.99,
  },
  {
    id: 4,
    name: 'Memory Foam Pillow',
    sku: 'MFP-S-WHT-004',
    category: 'Pillows',
    currentStock: 25,
    minStock: 5,
    maxStock: 30,
    status: 'in_stock',
    lastRestocked: '2024-01-12',
    vendor: 'Sleep Comfort Co',
    price: 34.99,
  },
  {
    id: 5,
    name: 'Wool Blanket',
    sku: 'WB-Q-BRN-005',
    category: 'Blankets',
    currentStock: 8,
    minStock: 15,
    maxStock: 60,
    status: 'low_stock',
    lastRestocked: '2024-01-07',
    vendor: 'Warm Textiles',
    price: 67.99,
  },
]

const getStatusBadge = (status: string, currentStock: number, minStock: number) => {
  if (currentStock === 0) {
    return <Badge className="bg-red-100 text-red-800">Out of Stock</Badge>
  }
  if (currentStock <= minStock) {
    return <Badge className="bg-yellow-100 text-yellow-800">Low Stock</Badge>
  }
  return <Badge className="bg-green-100 text-green-800">In Stock</Badge>
}

export default function Inventory() {
  const [inventoryItems] = useState<InventoryItem[]>(mockInventoryItems)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'in_stock' | 'low_stock' | 'out_of_stock'>('all')
  const [categoryFilter, setCategoryFilter] = useState<string>('all')

  // Calculate stats
  const totalItems = inventoryItems.length
  const lowStockItems = inventoryItems.filter(item => item.currentStock <= item.minStock && item.currentStock > 0).length
  const outOfStockItems = inventoryItems.filter(item => item.currentStock === 0).length
  const totalValue = inventoryItems.reduce((sum, item) => sum + (item.currentStock * item.price), 0)

  // Get unique categories for filter
  const categories = ['all', ...Array.from(new Set(inventoryItems.map(item => item.category)))]

  // Filter items
  const filteredItems = inventoryItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.vendor.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || 
                         (statusFilter === 'out_of_stock' && item.currentStock === 0) ||
                         (statusFilter === 'low_stock' && item.currentStock <= item.minStock && item.currentStock > 0) ||
                         (statusFilter === 'in_stock' && item.currentStock > item.minStock)
    
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter

    return matchesSearch && matchesStatus && matchesCategory
  })

  const handleRestock = (itemId: number) => {
    console.log('Restocking item:', itemId)
    // Implement restock logic here
  }

  const handleEdit = (itemId: number) => {
    console.log('Editing item:', itemId)
    // Navigate to edit page or open modal
  }

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <Breadcrumb />

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Inventory Management</h1>
          <p className="text-gray-600">Track and manage your product inventory</p>
        </div>
        <Link href="/admin/dashboard/inventory/add">
          <Button className="bg-[#313131] text-white hover:bg-[#222222]">
            <Plus className="h-4 w-4 mr-2" />
            Add Inventory Item
          </Button>
        </Link>
      </div>

      {/* Inventory Stats */}
      <div className="grid gap-6 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Items</CardTitle>
            <Package className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalItems}</div>
            <p className="text-xs text-gray-600">Unique products</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Stock</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{lowStockItems}</div>
            <p className="text-xs text-gray-600">Need restocking</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Out of Stock</CardTitle>
            <TrendingDown className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{outOfStockItems}</div>
            <p className="text-xs text-gray-600">Urgent attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalValue.toLocaleString()}</div>
            <p className="text-xs text-gray-600">Inventory worth</p>
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
                  placeholder="Search inventory..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Dropdown
                  id="statusFilter"
                  value={statusFilter}
                  options={[
                    { value: 'all', label: 'All Status' },
                    { value: 'in_stock', label: 'In Stock' },
                    { value: 'low_stock', label: 'Low Stock' },
                    { value: 'out_of_stock', label: 'Out of Stock' }
                  ]}
                  onChange={(value) => setStatusFilter(value as 'all' | 'in_stock' | 'low_stock' | 'out_of_stock')}
                />
              </div>
              <Dropdown
                id="categoryFilter"
                value={categoryFilter}
                options={categories.map(cat => ({ 
                  value: cat, 
                  label: cat === 'all' ? 'All Categories' : cat 
                }))}
                onChange={(value) => setCategoryFilter(value as string)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Inventory Table */}
      <Card>
        <CardHeader>
          <CardTitle>Inventory Items</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>Vendor</TableHead>
                <TableHead>Current Stock</TableHead>
                <TableHead>Min/Max</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Restocked</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredItems.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-12">
                    <div className="text-gray-500">
                      <p className="text-lg font-medium">No inventory items found</p>
                      <p className="text-sm">Try adjusting your search or filter criteria</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                filteredItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{item.name}</div>
                        <div className="text-sm text-gray-500">{item.category}</div>
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-sm">{item.sku}</TableCell>
                    <TableCell>{item.vendor}</TableCell>
                    <TableCell>
                      <span className={item.currentStock <= item.minStock ? 'text-red-600 font-bold' : 'text-gray-900'}>
                        {item.currentStock}
                      </span>
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">
                      {item.minStock} / {item.maxStock}
                    </TableCell>
                    <TableCell className="font-medium">
                      ${item.price.toFixed(2)}
                    </TableCell>
                    <TableCell>{getStatusBadge(item.status, item.currentStock, item.minStock)}</TableCell>
                    <TableCell className="text-sm text-gray-600">
                      {new Date(item.lastRestocked).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleRestock(item.id)}
                        >
                          Restock
                        </Button>
                        <Link href={`/admin/dashboard/inventory/edit/${item.id}`}>
                          <Button variant="ghost" size="sm">
                            Edit
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
    </div>
  )
}