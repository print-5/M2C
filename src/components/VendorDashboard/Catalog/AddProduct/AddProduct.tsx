'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/UI/Card';
import { Button } from '@/components/UI/Button';
import { ArrowLeft, Upload, Save } from 'lucide-react';

interface ProductFormData {
  id?: string;
  name: string;
  sku: string;
  category: string;
  price: string;
  stock: string;
  description: string;
  status: 'Active' | 'Inactive' | 'Out of Stock';
  image?: string;
}

interface AddProductProps {
  editId?: string;
}

export default function AddProduct({ editId }: AddProductProps) {
  const router = useRouter();
  const isEditMode = !!editId;

  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    sku: '',
    category: '',
    price: '',
    stock: '',
    description: '',
    status: 'Active',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ProductFormData, string>>>({});

  useEffect(() => {
    if (isEditMode && editId) {
      // Try to load from localStorage first
      const savedProducts = localStorage.getItem('vendorProducts');
      if (savedProducts) {
        try {
          const products = JSON.parse(savedProducts);
          const product = products.find((p: any) => p.id === editId);
          if (product) {
            setFormData({
              id: product.id,
              name: product.name || '',
              sku: product.sku || '',
              category: product.category || '',
              price: typeof product.price === 'string' ? product.price.replace('$', '') : product.price?.toString() || '',
              stock: product.stock?.toString() || '',
              description: product.description || '',
              status: product.status || 'Active',
              image: product.image,
            });
            return;
          }
        } catch (e) {
          console.error('Error loading product from localStorage:', e);
        }
      }
      
      // If not found in localStorage, you could fetch from API here
      // For now, we'll leave it empty and let the user fill it
    }
  }, [isEditMode, editId]);

  const handleChange = (field: keyof ProductFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof ProductFormData, string>> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Product name is required';
    }
    if (!formData.sku.trim()) {
      newErrors.sku = 'SKU is required';
    }
    if (!formData.category.trim()) {
      newErrors.category = 'Category is required';
    }
    if (!formData.price.trim() || isNaN(parseFloat(formData.price)) || parseFloat(formData.price) <= 0) {
      newErrors.price = 'Valid price is required';
    }
    if (!formData.stock.trim() || isNaN(parseInt(formData.stock)) || parseInt(formData.stock) < 0) {
      newErrors.stock = 'Valid stock quantity is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // In a real app, you would save to API here
      // For now, we'll save to localStorage as a temporary solution
      const productData = {
        ...formData,
        id: isEditMode ? editId : Date.now().toString(),
        price: `$${parseFloat(formData.price).toFixed(2)}`,
        stock: parseInt(formData.stock),
        sales: 0, // Default sales count
      };

      try {
        // Save to localStorage (you can replace this with API call)
        const savedProducts = localStorage.getItem('vendorProducts');
        let products = savedProducts ? JSON.parse(savedProducts) : [];
        
        if (isEditMode && editId) {
          products = products.map((p: any) => p.id === editId ? productData : p);
        } else {
          products.push(productData);
        }
        
        localStorage.setItem('vendorProducts', JSON.stringify(products));

        // Navigate back to products page
        router.push('/vendor/dashboard/products');
      } catch (error) {
        console.error('Error saving product:', error);
        alert('Error saving product. Please try again.');
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="hover:bg-gray-50 hover:text-[#222222]"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-[#222222]">
              {isEditMode ? 'Edit Product' : 'Add New Product'}
            </h1>
            <p className="text-slate-600">
              {isEditMode ? 'Update product information' : 'Create a new product for your catalog'}
            </p>
          </div>
        </div>
      </div>

      {/* Form Card */}
      <Card className="border border-gray-200">
        <CardHeader className="bg-gray-50 border-b border-gray-200">
          <CardTitle className="text-[#222222] text-xl font-bold">
            Product Details
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-[#222222] border-b border-gray-200 pb-2">
                Basic Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[#222222] mb-2">
                    Product Name <span className="text-gray-700">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-gray-700 focus:border-gray-700 transition-colors ${
                      errors.name ? 'border-gray-500' : 'border-gray-200'
                    }`}
                    placeholder="Enter product name"
                  />
                  {errors.name && <p className="text-gray-700 text-xs mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#222222] mb-2">
                    SKU <span className="text-gray-700">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.sku}
                    onChange={(e) => handleChange('sku', e.target.value)}
                    className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-gray-700 focus:border-gray-700 transition-colors ${
                      errors.sku ? 'border-gray-500' : 'border-gray-200'
                    }`}
                    placeholder="e.g., CKT-001"
                  />
                  {errors.sku && <p className="text-gray-700 text-xs mt-1">{errors.sku}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[#222222] mb-2">
                    Category <span className="text-gray-700">*</span>
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => handleChange('category', e.target.value)}
                    className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-gray-700 focus:border-gray-700 transition-colors ${
                      errors.category ? 'border-gray-500' : 'border-gray-200'
                    }`}
                  >
                    <option value="">Select category</option>
                    <option value="Kitchen Towels">Kitchen Towels</option>
                    <option value="Bath Towels">Bath Towels</option>
                    <option value="Table Linen">Table Linen</option>
                    <option value="Aprons">Aprons</option>
                    <option value="Decorative">Decorative</option>
                  </select>
                  {errors.category && <p className="text-gray-700 text-xs mt-1">{errors.category}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#222222] mb-2">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => handleChange('status', e.target.value as ProductFormData['status'])}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-700 focus:border-gray-700 transition-colors"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Out of Stock">Out of Stock</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#222222] mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                  rows={4}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-700 focus:border-gray-700 transition-colors resize-none"
                  placeholder="Enter product description"
                />
              </div>
            </div>

            {/* Pricing & Inventory */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-[#222222] border-b border-gray-200 pb-2">
                Pricing & Inventory
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[#222222] mb-2">
                    Price ($) <span className="text-gray-700">*</span>
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.price}
                    onChange={(e) => handleChange('price', e.target.value)}
                    className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-gray-700 focus:border-gray-700 transition-colors ${
                      errors.price ? 'border-gray-500' : 'border-gray-200'
                    }`}
                    placeholder="0.00"
                  />
                  {errors.price && <p className="text-gray-700 text-xs mt-1">{errors.price}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#222222] mb-2">
                    Stock Quantity <span className="text-gray-700">*</span>
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.stock}
                    onChange={(e) => handleChange('stock', e.target.value)}
                    className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-gray-700 focus:border-gray-700 transition-colors ${
                      errors.stock ? 'border-gray-500' : 'border-gray-200'
                    }`}
                    placeholder="0"
                  />
                  {errors.stock && <p className="text-gray-700 text-xs mt-1">{errors.stock}</p>}
                </div>
              </div>
            </div>

            {/* Product Image */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-[#222222] border-b border-gray-200 pb-2">
                Product Image
              </h3>
              
              <div className="border-2 border-dashed border-gray-200 rounded-lg p-12 text-center hover:border-gray-200 transition-colors bg-gray-50/50">
                <Upload className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                <p className="text-sm text-slate-600 mb-2">
                  <span className="text-[#222222] font-medium">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-slate-500 mb-4">PNG, JPG, GIF up to 10MB</p>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  id="product-image"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      // Handle file upload logic here
                      handleChange('image', URL.createObjectURL(file));
                    }
                  }}
                />
                <label htmlFor="product-image">
                  <Button
                    type="button"
                    variant="outline"
                    className="hover:bg-gray-50 hover:border-gray-200"
                  >
                    Select Image
                  </Button>
                </label>
                {formData.image && (
                  <div className="mt-4">
                    <img src={formData.image} alt="Preview" className="max-w-xs mx-auto rounded-lg border border-gray-200" />
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                className="px-6 hover:bg-gray-50 hover:border-gray-200"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-[#222222] hover:bg-[#313131] text-white px-6"
              >
                <Save className="w-4 h-4 mr-2" />
                {isEditMode ? 'Update Product' : 'Add Product'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
