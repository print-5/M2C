'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/UI/Card';
import { Button } from '@/components/UI/Button';
import { X, Upload, Save } from 'lucide-react';

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

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: ProductFormData) => void;
  editProduct?: ProductFormData | null;
}

export default function AddProductModal({ isOpen, onClose, onSave, editProduct }: AddProductModalProps) {
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
    if (editProduct) {
      setFormData({
        id: editProduct.id,
        name: editProduct.name || '',
        sku: editProduct.sku || '',
        category: editProduct.category || '',
        price: editProduct.price || '',
        stock: editProduct.stock || '',
        description: editProduct.description || '',
        status: editProduct.status || 'Active',
        image: editProduct.image,
      });
    } else {
      setFormData({
        name: '',
        sku: '',
        category: '',
        price: '',
        stock: '',
        description: '',
        status: 'Active',
      });
    }
    setErrors({});
  }, [editProduct, isOpen]);

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
      onSave(formData);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-red-200 shadow-2xl">
        <CardHeader className="bg-red-50 border-b border-red-200 sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <CardTitle className="text-red-800 text-xl font-bold">
              {editProduct ? 'Edit Product' : 'Add New Product'}
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="hover:bg-red-100 hover:text-red-800"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-red-800 border-b border-red-200 pb-2">
                Basic Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-red-800 mb-2">
                    Product Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-700 focus:border-red-700 ${
                      errors.name ? 'border-red-500' : 'border-red-200'
                    }`}
                    placeholder="Enter product name"
                  />
                  {errors.name && <p className="text-red-600 text-xs mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-red-800 mb-2">
                    SKU <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.sku}
                    onChange={(e) => handleChange('sku', e.target.value)}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-700 focus:border-red-700 ${
                      errors.sku ? 'border-red-500' : 'border-red-200'
                    }`}
                    placeholder="e.g., CKT-001"
                  />
                  {errors.sku && <p className="text-red-600 text-xs mt-1">{errors.sku}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-red-800 mb-2">
                    Category <span className="text-red-600">*</span>
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => handleChange('category', e.target.value)}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-700 focus:border-red-700 ${
                      errors.category ? 'border-red-500' : 'border-red-200'
                    }`}
                  >
                    <option value="">Select category</option>
                    <option value="Kitchen Towels">Kitchen Towels</option>
                    <option value="Bath Towels">Bath Towels</option>
                    <option value="Table Linen">Table Linen</option>
                    <option value="Aprons">Aprons</option>
                    <option value="Decorative">Decorative</option>
                  </select>
                  {errors.category && <p className="text-red-600 text-xs mt-1">{errors.category}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-red-800 mb-2">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => handleChange('status', e.target.value as ProductFormData['status'])}
                    className="w-full px-4 py-2 border border-red-200 rounded-lg focus:ring-2 focus:ring-red-700 focus:border-red-700"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Out of Stock">Out of Stock</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-red-800 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2 border border-red-200 rounded-lg focus:ring-2 focus:ring-red-700 focus:border-red-700"
                  placeholder="Enter product description"
                />
              </div>
            </div>

            {/* Pricing & Inventory */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-red-800 border-b border-red-200 pb-2">
                Pricing & Inventory
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-red-800 mb-2">
                    Price ($) <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.price}
                    onChange={(e) => handleChange('price', e.target.value)}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-700 focus:border-red-700 ${
                      errors.price ? 'border-red-500' : 'border-red-200'
                    }`}
                    placeholder="0.00"
                  />
                  {errors.price && <p className="text-red-600 text-xs mt-1">{errors.price}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-red-800 mb-2">
                    Stock Quantity <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.stock}
                    onChange={(e) => handleChange('stock', e.target.value)}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-700 focus:border-red-700 ${
                      errors.stock ? 'border-red-500' : 'border-red-200'
                    }`}
                    placeholder="0"
                  />
                  {errors.stock && <p className="text-red-600 text-xs mt-1">{errors.stock}</p>}
                </div>
              </div>
            </div>

            {/* Product Image */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-red-800 border-b border-red-200 pb-2">
                Product Image
              </h3>
              
              <div className="border-2 border-dashed border-red-200 rounded-lg p-8 text-center hover:border-red-300 transition-colors">
                <Upload className="w-12 h-12 text-red-400 mx-auto mb-4" />
                <p className="text-sm text-slate-600 mb-2">
                  <span className="text-red-800 font-medium">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-slate-500">PNG, JPG, GIF up to 10MB</p>
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
                    className="mt-4 hover:bg-red-50 hover:border-red-300"
                  >
                    Select Image
                  </Button>
                </label>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-4 border-t border-red-200">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="hover:bg-red-50 hover:border-red-300"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-red-800 hover:bg-red-700 text-white"
              >
                <Save className="w-4 h-4 mr-2" />
                {editProduct ? 'Update Product' : 'Add Product'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
