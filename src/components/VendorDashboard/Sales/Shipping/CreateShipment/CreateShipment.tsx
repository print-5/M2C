'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/UI/Card';
import { Button } from '@/components/UI/Button';
import { ArrowLeft, Save, Package, Truck, Calendar, Hash } from 'lucide-react';

interface ShipmentForm {
  orderId: string;
  customer: string;
  email: string;
  carrier: string;
  trackingNumber: string;
  status: 'Pending' | 'In Transit' | 'Delivered';
  estimatedDelivery: string;
  items: string;
  notes?: string;
}

export default function CreateShipment() {
  const router = useRouter();
  const [form, setForm] = useState<ShipmentForm>({
    orderId: '',
    customer: '',
    email: '',
    carrier: '',
    trackingNumber: '',
    status: 'Pending',
    estimatedDelivery: '',
    items: '',
    notes: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ShipmentForm, string>>>({});

  const handleChange = (field: keyof ShipmentForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validate = () => {
    const next: Partial<Record<keyof ShipmentForm, string>> = {};
    if (!form.orderId.trim()) next.orderId = 'Order ID is required';
    if (!form.customer.trim()) next.customer = 'Customer name is required';
    if (!form.email.trim()) next.email = 'Email is required';
    if (!form.carrier.trim()) next.carrier = 'Carrier is required';
    if (!form.trackingNumber.trim()) next.trackingNumber = 'Tracking number is required';
    if (!form.estimatedDelivery.trim()) next.estimatedDelivery = 'ETA is required';
    if (!form.items.trim() || Number.isNaN(parseInt(form.items))) next.items = 'Items must be a number';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // Placeholder: hook up to API later
    console.log('Create shipment payload:', form);
    router.push('/vendor/dashboard/shipping');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          className="hover:bg-red-50 hover:border-red-300"
          onClick={() => router.back()}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-500">Shipping</p>
          <h1 className="text-2xl font-bold text-red-800">Create Shipment</h1>
          <p className="text-slate-600">Generate a shipment for an order</p>
        </div>
      </div>

      <Card className="border border-red-200">
        <CardHeader className="bg-red-50 border-b border-red-200">
          <CardTitle className="text-red-800 text-lg">Shipment Details</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-red-800 mb-2">
                  Order ID <span className="text-red-600">*</span>
                </label>
                <div className="relative">
                  <Hash className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={form.orderId}
                    onChange={(e) => handleChange('orderId', e.target.value)}
                    className={`w-full pl-9 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-red-700 focus:border-red-700 ${
                      errors.orderId ? 'border-red-500' : 'border-red-200'
                    }`}
                    placeholder="ORD-001"
                  />
                </div>
                {errors.orderId && <p className="text-red-600 text-xs mt-1">{errors.orderId}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-red-800 mb-2">
                  Customer Name <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  value={form.customer}
                  onChange={(e) => handleChange('customer', e.target.value)}
                  className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-red-700 focus:border-red-700 ${
                    errors.customer ? 'border-red-500' : 'border-red-200'
                  }`}
                  placeholder="John Doe"
                />
                {errors.customer && <p className="text-red-600 text-xs mt-1">{errors.customer}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-red-800 mb-2">
                  Customer Email <span className="text-red-600">*</span>
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-red-700 focus:border-red-700 ${
                    errors.email ? 'border-red-500' : 'border-red-200'
                  }`}
                  placeholder="customer@example.com"
                />
                {errors.email && <p className="text-red-600 text-xs mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-red-800 mb-2">
                  Carrier <span className="text-red-600">*</span>
                </label>
                <div className="relative">
                  <Truck className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={form.carrier}
                    onChange={(e) => handleChange('carrier', e.target.value)}
                    className={`w-full pl-9 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-red-700 focus:border-red-700 ${
                      errors.carrier ? 'border-red-500' : 'border-red-200'
                    }`}
                    placeholder="FedEx, UPS..."
                  />
                </div>
                {errors.carrier && <p className="text-red-600 text-xs mt-1">{errors.carrier}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-red-800 mb-2">
                  Tracking Number <span className="text-red-600">*</span>
                </label>
                <div className="relative">
                  <Package className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={form.trackingNumber}
                    onChange={(e) => handleChange('trackingNumber', e.target.value)}
                    className={`w-full pl-9 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-red-700 focus:border-red-700 ${
                      errors.trackingNumber ? 'border-red-500' : 'border-red-200'
                    }`}
                    placeholder="TRK123456789"
                  />
                </div>
                {errors.trackingNumber && <p className="text-red-600 text-xs mt-1">{errors.trackingNumber}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-red-800 mb-2">
                  Status
                </label>
                <select
                  value={form.status}
                  onChange={(e) => handleChange('status', e.target.value as ShipmentForm['status'])}
                  className="w-full px-4 py-2.5 border border-red-200 rounded-lg focus:ring-2 focus:ring-red-700 focus:border-red-700"
                >
                  <option value="Pending">Pending</option>
                  <option value="In Transit">In Transit</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-red-800 mb-2">
                  Estimated Delivery <span className="text-red-600">*</span>
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="date"
                    value={form.estimatedDelivery}
                    onChange={(e) => handleChange('estimatedDelivery', e.target.value)}
                    className={`w-full pl-9 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-red-700 focus:border-red-700 ${
                      errors.estimatedDelivery ? 'border-red-500' : 'border-red-200'
                    }`}
                  />
                </div>
                {errors.estimatedDelivery && <p className="text-red-600 text-xs mt-1">{errors.estimatedDelivery}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-red-800 mb-2">
                  Items <span className="text-red-600">*</span>
                </label>
                <input
                  type="number"
                  min={1}
                  value={form.items}
                  onChange={(e) => handleChange('items', e.target.value)}
                  className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-red-700 focus:border-red-700 ${
                    errors.items ? 'border-red-500' : 'border-red-200'
                  }`}
                  placeholder="3"
                />
                {errors.items && <p className="text-red-600 text-xs mt-1">{errors.items}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-red-800 mb-2">
                Notes
              </label>
              <textarea
                value={form.notes}
                onChange={(e) => handleChange('notes', e.target.value)}
                rows={4}
                className="w-full px-4 py-2.5 border border-red-200 rounded-lg focus:ring-2 focus:ring-red-700 focus:border-red-700 resize-none"
                placeholder="Optional notes for this shipment"
              />
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-red-200">
              <Button
                type="button"
                variant="outline"
                className="hover:bg-red-50 hover:border-red-300"
                onClick={() => router.back()}
              >
                Cancel
              </Button>
              <Button type="submit" className="bg-red-800 hover:bg-red-700 text-white">
                <Save className="w-4 h-4 mr-2" />
                Create Shipment
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
