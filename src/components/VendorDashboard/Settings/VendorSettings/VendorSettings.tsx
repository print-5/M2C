'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/UI/Card';
import { Button } from '@/components/UI/Button';
import { Store, Upload, Globe, MapPin, Clock, Phone, Mail, Save } from 'lucide-react';

interface VendorInfo {
  name: string;
  description: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
  email: string;
  website: string;
}

const mockVendorInfo: VendorInfo = {
  name: 'Artisan Home Goods',
  description: 'Premium handcrafted home textiles and accessories made with love and attention to detail.',
  address: '123 Craft Street',
  city: 'Portland',
  state: 'Oregon',
  zipCode: '97201',
  country: 'United States',
  phone: '+1 (555) 123-4567',
  email: 'hello@artisanhomegoods.com',
  website: 'www.artisanhomegoods.com'
};

export default function VendorSettings() {
  const [vendorInfo, setVendorInfo] = useState<VendorInfo>(mockVendorInfo);
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (field: keyof VendorInfo, value: string) => {
    setVendorInfo(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-[#222222]">Vendor Settings</h1>
          <p className="text-slate-600">Manage your vendor information and preferences</p>
        </div>
        <Button 
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          className="bg-[#222222] hover:bg-[#313131]"
        >
          {isEditing ? (
            <>
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </>
          ) : (
            'Edit Vendor Info'
          )}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="border border-gray-200">
            <CardHeader className="bg-gray-50 border-b border-gray-200">
              <CardTitle className="flex items-center text-[#222222]">
                <Store className="w-5 h-5 mr-2" />
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Vendor Name</label>
                <input
                  type="text"
                  value={vendorInfo.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-700 focus:border-gray-700 disabled:bg-gray-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                <textarea
                  value={vendorInfo.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  disabled={!isEditing}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-700 focus:border-gray-700 disabled:bg-gray-50"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    value={vendorInfo.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-700 focus:border-gray-700 disabled:bg-gray-50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={vendorInfo.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-700 focus:border-gray-700 disabled:bg-gray-50"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border border-gray-200">
            <CardHeader className="bg-gray-50 border-b border-gray-200">
              <CardTitle className="text-[#222222]">Location</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Address</label>
                <input
                  type="text"
                  value={vendorInfo.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-700 focus:border-gray-700 disabled:bg-gray-50"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  value={vendorInfo.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-700 focus:border-gray-700 disabled:bg-gray-50"
                />
                <input
                  type="text"
                  value={vendorInfo.state}
                  onChange={(e) => handleInputChange('state', e.target.value)}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-700 focus:border-gray-700 disabled:bg-gray-50"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
