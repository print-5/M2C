'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/UI/Card'
import { Button } from '@/components/UI/Button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/UI/Table'
import { Plus, Edit, Eye, Trash2 } from 'lucide-react'

interface Product {
  id: string;
  name: string;
  category: string;
  price: string;
  stock: number;
  status: 'Active' | 'Inactive' | 'Out of Stock';
  sales: number;
}

export default function Products() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([
    {
      id: '1',
      name: 'Handwoven Cotton Kitchen Towel Set',
      category: 'Kitchen Towels',
      price: '$25.99',
      stock: 45,
      status: 'Active',
      sales: 127
    },
    {
      id: '2',
      name: 'Organic Bath Towel Set',
      category: 'Bath Towels',
      price: '$89.99',
      stock: 23,
      status: 'Active',
      sales: 89
    },
    {
      id: '3',
      name: 'Heritage Tea Towel Collection',
      category: 'Kitchen Towels',
      price: '$35.99',
      stock: 0,
      status: 'Out of Stock',
      sales: 156
    }
  ]);

  const handleAddProduct = () => {
    router.push('/vendor/dashboard/products/add');
  };

  const handleEditProduct = (product: Product) => {
    router.push(`/vendor/dashboard/products/edit/${product.id}`);
  };

  const handleDeleteProduct = (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      setProducts(prev => prev.filter(p => p.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#222222]">My Products</h1>
          <p className="text-slate-600">Manage your product catalog</p>
        </div>
        <Button 
          onClick={handleAddProduct}
          className="bg-[#222222] text-white text-base font-semibold hover:bg-[#313131]"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Product
        </Button>
      </div>

      <Card className="border border-gray-200">
        <CardHeader className="bg-gray-50 border-b border-gray-200">
          <CardTitle className="text-[#222222]">Product Inventory</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-[#222222]">Product</TableHead>
                <TableHead className="text-[#222222]">Category</TableHead>
                <TableHead className="text-[#222222]">Price</TableHead>
                <TableHead className="text-[#222222]">Stock</TableHead>
                <TableHead className="text-[#222222]">Status</TableHead>
                <TableHead className="text-[#222222]">Sales</TableHead>
                <TableHead className="text-[#222222]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id} className="hover:bg-gray-50">
                  <TableCell>
                    <div className="font-medium text-[#222222]">{product.name}</div>
                  </TableCell>
                  <TableCell className="text-slate-600">{product.category}</TableCell>
                  <TableCell className="font-medium text-gray-700">{product.price}</TableCell>
                  <TableCell>
                    <span className={product.stock === 0 ? 'text-gray-700' : 'text-[#222222]'}>
                      {product.stock}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      product.status === 'Active' 
                        ? 'bg-gray-50 text-gray-700' 
                        : 'bg-gray-200 text-[#222222]'
                    }`}>
                      {product.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-slate-600">{product.sales}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm" className="hover:bg-gray-50 hover:text-[#222222]">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="hover:bg-gray-50 hover:text-[#222222]"
                        onClick={() => handleEditProduct(product)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-gray-700 hover:bg-gray-50"
                        onClick={() => handleDeleteProduct(product.id)}
                      >
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
    </div>
  )
}
