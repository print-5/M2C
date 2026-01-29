'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/UI/Card"
import { Button } from "@/components/UI/Button"
import Link from 'next/link'
import { Badge } from "@/components/UI/Badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/UI/Table"
import { Eye, Edit, Trash2, CheckCircle, XCircle } from "lucide-react"
import { formatDate, formatPrice } from "@/lib/utils"

const products = [
  {
    id: 1,
    name: "iPhone 15 Pro",
    category: "Electronics",
    price: 999,
    stock: 45,
    status: "active",
    createdAt: new Date("2024-01-10"),
    image: "/api/placeholder/60/60",
  },
  {
    id: 2,
    name: "Samsung Galaxy S24",
    category: "Electronics",
    price: 899,
    stock: 23,
    status: "pending",
    createdAt: new Date("2024-01-12"),
    image: "/api/placeholder/60/60",
  },
  {
    id: 3,
    name: "Nike Air Max 270",
    category: "Fashion",
    price: 150,
    stock: 78,
    status: "active",
    createdAt: new Date("2024-01-08"),
    image: "/api/placeholder/60/60",
  },
  {
    id: 4,
    name: 'MacBook Pro 16"',
    category: "Electronics",
    price: 2499,
    stock: 12,
    status: "active",
    createdAt: new Date("2024-01-05"),
    image: "/api/placeholder/60/60",
  },
  {
    id: 5,
    name: "Adidas Ultraboost",
    category: "Fashion",
    price: 180,
    stock: 0,
    status: "out_of_stock",
    createdAt: new Date("2024-01-15"),
    image: "/api/placeholder/60/60",
  },
]

const getStatusBadge = (status: string) => {
  switch (status) {
    case "active":
      return <Badge className="bg-green-100 text-green-800">Active</Badge>
    case "pending":
      return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
    case "out_of_stock":
      return <Badge className="bg-gray-50 text-[#222222]">Out of Stock</Badge>
    case "suspended":
      return <Badge className="bg-gray-100 text-gray-800">Suspended</Badge>
    default:
      return <Badge className="bg-gray-100 text-gray-800">Unknown</Badge>
  }
}

export default function ProductsTable() {
  const [productList] = useState(products)

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Products Management</CardTitle>
          <Link href="/dashboard/products/add">
            <Button className="bg-[#313131] text-white hover:bg-[#222222]">
              Add Product
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader className="bg-[#313131] text-white">
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {productList.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 bg-gray-200 rounded-md flex items-center justify-center">
                      <span className="text-xs font-medium">IMG</span>
                    </div>
                    <div>
                      <div className="font-medium">{product.name}</div>
                      <div className="text-sm text-gray-500">
                        ID: {product.id}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell className="font-medium">
                  {formatPrice(product.price)}
                </TableCell>
                <TableCell>
                  <span
                    className={
                      product.stock === 0 ? "text-gray-700" : "text-gray-900"
                    }
                  >
                    {product.stock}
                  </span>
                </TableCell>
                <TableCell>{getStatusBadge(product.status)}</TableCell>
                <TableCell>{formatDate(product.createdAt)}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Link href={`/dashboard/products/edit/${product.id}`}>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </Link>
                    {product.status === "pending" && (
                      <>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-green-600"
                        >
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-gray-700"
                        >
                          <XCircle className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                    <Button variant="ghost" size="sm" className="text-gray-700">
                      <Trash2 className="h-4 w-4" />
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