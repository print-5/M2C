'use client'

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
}

interface InventoryTableProps {
  items: InventoryItem[]
}

const getStatusBadge = (status: string, currentStock: number, minStock: number) => {
  if (currentStock === 0) {
    return <Badge className="bg-gray-50 text-[#222222]">Out of Stock</Badge>
  }
  if (currentStock <= minStock) {
    return <Badge className="bg-yellow-100 text-yellow-800">Low Stock</Badge>
  }
  return <Badge className="bg-green-100 text-green-800">In Stock</Badge>
}

export default function InventoryTable({ items }: InventoryTableProps) {
  return (
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
            {items.map((item) => (
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
                  <span className={item.currentStock <= item.minStock ? 'text-gray-700 font-bold' : 'text-gray-900'}>
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
  )
}
