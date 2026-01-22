'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/UI/Card'
import { Package, AlertTriangle, TrendingDown, TrendingUp } from 'lucide-react'

interface InventoryStatsProps {
  totalItems: number
  lowStockItems: number
  outOfStockItems: number
  totalValue: number
}

export default function InventoryStats({
  totalItems,
  lowStockItems,
  outOfStockItems,
  totalValue,
}: InventoryStatsProps) {
  return (
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
          <TrendingDown className="h-4 w-4 text-gray-700" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-700">{outOfStockItems}</div>
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
  )
}
