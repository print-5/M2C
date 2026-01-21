'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/UI/Card';
import { Button } from '@/components/UI/Button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/UI/Table';
import { Package, Plus, Search, Filter, Edit, Trash2, AlertTriangle, Minus } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  stock: number;
  onlineStock: number;
  offlineStock: number;
  price: number;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
  lastUpdated: string;
}

export default function Inventory() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([
    {
      id: '1',
      name: 'Cotton Kitchen Towel',
      sku: 'CKT-001',
      category: 'Kitchen Linen',
      stock: 45,
      onlineStock: 30,
      offlineStock: 15,
      price: 12.99,
      status: 'In Stock',
      lastUpdated: '2024-01-15'
    },
    {
      id: '2',
      name: 'Handwoven Bath Towel',
      sku: 'HBT-002',
      category: 'Bath Linen',
      stock: 8,
      onlineStock: 5,
      offlineStock: 3,
      price: 24.99,
      status: 'Low Stock',
      lastUpdated: '2024-01-14'
    },
    {
      id: '3',
      name: 'Artisan Apron',
      sku: 'AA-003',
      category: 'Aprons',
      stock: 0,
      onlineStock: 0,
      offlineStock: 0,
      price: 18.99,
      status: 'Out of Stock',
      lastUpdated: '2024-01-13'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  const handleAddProduct = () => {
    router.push('/vendor/dashboard/products/add');
  };

  const handleEditProduct = (product: Product) => {
    router.push(`/vendor/dashboard/products/edit/${product.id}`);
  };

  const handleQuantityChange = (productId: string, type: 'online' | 'offline', delta: number) => {
    setProducts(prev => prev.map(p => {
      if (p.id === productId) {
        let newOnlineStock = p.onlineStock;
        let newOfflineStock = p.offlineStock;

        if (type === 'online') {
          newOnlineStock = Math.max(0, p.onlineStock + delta);
        } else {
          newOfflineStock = Math.max(0, p.offlineStock + delta);
        }

        const newTotalStock = newOnlineStock + newOfflineStock;
        const newStatus = newTotalStock === 0 ? 'Out of Stock' : newTotalStock < 10 ? 'Low Stock' : 'In Stock';

        return {
          ...p,
          stock: newTotalStock,
          onlineStock: newOnlineStock,
          offlineStock: newOfflineStock,
          status: newStatus,
          lastUpdated: new Date().toISOString().split('T')[0]
        };
      }
      return p;
    }));
  };

  const handleDeleteProduct = (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      setProducts(prev => prev.filter(p => p.id !== id));
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Stock': return 'text-green-600 bg-green-100';
      case 'Low Stock': return 'text-yellow-600 bg-yellow-100';
      case 'Out of Stock': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-red-800">Inventory Management</h1>
          <p className="text-slate-600">Manage your product inventory and stock levels</p>
        </div>
        <Button 
          onClick={handleAddProduct}
          className="bg-red-800 text-white text-base font-semibold hover:bg-red-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Product
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border border-red-200 hover:border-red-300">
          <CardContent className="p-6">
            <div className="flex items-center">
              <Package className="w-8 h-8 text-red-700" />
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-600">Total Products</p>
                <p className="text-2xl font-bold text-red-800">{products.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-red-200 hover:border-red-300">
          <CardContent className="p-6">
            <div className="flex items-center">
              <AlertTriangle className="w-8 h-8 text-yellow-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-600">Low Stock</p>
                <p className="text-2xl font-bold text-red-800">
                  {products.filter(p => p.status === 'Low Stock').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-red-200 hover:border-red-300">
          <CardContent className="p-6">
            <div className="flex items-center">
              <AlertTriangle className="w-8 h-8 text-red-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-600">Out of Stock</p>
                <p className="text-2xl font-bold text-red-800">
                  {products.filter(p => p.status === 'Out of Stock').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-red-200 hover:border-red-300">
          <CardContent className="p-6">
            <div className="flex items-center">
              <Package className="w-8 h-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-600">Total Value</p>
                <p className="text-2xl font-bold text-red-800">
                  ${products.reduce((sum, p) => sum + (p.stock * p.price), 0).toFixed(2)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border border-red-200">
        <CardContent className="p-6">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 border border-red-200 rounded-lg focus:ring-2 focus:ring-red-700 focus:border-red-700"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" className="hover:bg-red-50 hover:border-red-300">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="border border-red-200">
        <CardHeader className="bg-red-50 border-b border-red-200">
          <CardTitle className="text-red-800">Products</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-red-800">Product</TableHead>
                <TableHead className="text-red-800">SKU</TableHead>
                <TableHead className="text-red-800">Category</TableHead>
                <TableHead className="text-red-800">Total Stock</TableHead>
                <TableHead className="text-red-800">Online Stock</TableHead>
                <TableHead className="text-red-800">Offline Stock</TableHead>
                <TableHead className="text-red-800">Price</TableHead>
                <TableHead className="text-red-800">Status</TableHead>
                <TableHead className="text-red-800">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id} className="hover:bg-red-50">
                  <TableCell>
                    <div className="font-medium text-red-800">{product.name}</div>
                  </TableCell>
                  <TableCell className="text-slate-600">{product.sku}</TableCell>
                  <TableCell className="text-slate-600">{product.category}</TableCell>
                  <TableCell>
                    <div className="font-semibold text-red-800">{product.stock}</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="text-slate-600 min-w-10">{product.onlineStock}</span>
                      <div className="flex flex-col gap-1">
                        <button
                          onClick={() => handleQuantityChange(product.id, 'online', 1)}
                          className="w-6 h-6 flex items-center justify-center border border-red-200 rounded hover:bg-red-50 hover:border-red-300 transition-colors"
                          title="Increase online stock"
                        >
                          <Plus className="w-3 h-3 text-red-700" />
                        </button>
                        <button
                          onClick={() => handleQuantityChange(product.id, 'online', -1)}
                          disabled={product.onlineStock === 0}
                          className="w-6 h-6 flex items-center justify-center border border-red-200 rounded hover:bg-red-50 hover:border-red-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          title="Decrease online stock"
                        >
                          <Minus className="w-3 h-3 text-red-700" />
                        </button>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="text-slate-600 min-w-10">{product.offlineStock}</span>
                      <div className="flex flex-col gap-1">
                        <button
                          onClick={() => handleQuantityChange(product.id, 'offline', 1)}
                          className="w-6 h-6 flex items-center justify-center border border-red-200 rounded hover:bg-red-50 hover:border-red-300 transition-colors"
                          title="Increase offline stock"
                        >
                          <Plus className="w-3 h-3 text-red-700" />
                        </button>
                        <button
                          onClick={() => handleQuantityChange(product.id, 'offline', -1)}
                          disabled={product.offlineStock === 0}
                          className="w-6 h-6 flex items-center justify-center border border-red-200 rounded hover:bg-red-50 hover:border-red-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          title="Decrease offline stock"
                        >
                          <Minus className="w-3 h-3 text-red-700" />
                        </button>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-red-700 font-medium">${product.price.toFixed(2)}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(product.status)}`}>
                      {product.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="hover:bg-red-50 hover:border-red-300"
                        onClick={() => handleEditProduct(product)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="hover:bg-red-50 hover:border-red-300"
                        onClick={() => handleDeleteProduct(product.id)}
                      >
                        <Trash2 className="w-4 h-4" />
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
  );
}
