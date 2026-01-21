import { Breadcrumb } from '@/components/AdminDashboard/Breadcrumb/Breadcrumb'
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
import { Plus, AlertTriangle, Package, TrendingDown, TrendingUp } from 'lucide-react'

const inventoryItems = [
  {
    id: 1,
    name: 'iPhone 15 Pro',
    sku: 'IPH15P-128-BLK',
    category: 'Electronics',
    currentStock: 45,
    minStock: 10,
    maxStock: 100,
    status: 'in_stock',
    lastRestocked: '2024-01-10',
    vendor: 'TechStore Pro',
  },
  {
    id: 2,
    name: 'Samsung Galaxy S24',
    sku: 'SGS24-256-WHT',
    category: 'Electronics',
    currentStock: 5,
    minStock: 10,
    maxStock: 80,
    status: 'low_stock',
    lastRestocked: '2024-01-08',
    vendor: 'ElectroHub',
  },
  {
    id: 3,
    name: 'Nike Air Max 270',
    sku: 'NAM270-42-BLK',
    category: 'Fashion',
    currentStock: 0,
    minStock: 5,
    maxStock: 50,
    status: 'out_of_stock',
    lastRestocked: '2024-01-05',
    vendor: 'Sports Galaxy',
  },
  {
    id: 4,
    name: 'MacBook Pro 16"',
    sku: 'MBP16-512-SLV',
    category: 'Electronics',
    currentStock: 25,
    minStock: 5,
    maxStock: 30,
    status: 'in_stock',
    lastRestocked: '2024-01-12',
    vendor: 'TechStore Pro',
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

export default function InventoryPage() {
  const totalItems = inventoryItems.length
  const lowStockItems = inventoryItems.filter(item => item.currentStock <= item.minStock && item.currentStock > 0).length
  const outOfStockItems = inventoryItems.filter(item => item.currentStock === 0).length
  const totalValue = inventoryItems.reduce((sum, item) => sum + (item.currentStock * 100), 0) // Assuming $100 per item for demo

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <Breadcrumb />

      {/* Action Button */}
      <div className="flex justify-end">
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Inventory Item
        </Button>
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

      {/* Inventory Table */}
      <Card>
        <CardHeader>
          <CardTitle>Inventory Management</CardTitle>
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
                <TableHead>Status</TableHead>
                <TableHead>Last Restocked</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inventoryItems.map((item) => (
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
                  <TableCell>{getStatusBadge(item.status, item.currentStock, item.minStock)}</TableCell>
                  <TableCell>{item.lastRestocked}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        Restock
                      </Button>
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}