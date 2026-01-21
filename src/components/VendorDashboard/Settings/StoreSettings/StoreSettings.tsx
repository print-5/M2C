'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/UI/Card';
import { Button } from '@/components/UI/Button';
import { Store, Upload, Globe, MapPin, Clock, Phone, Mail, Save } from 'lucide-react';

interface StoreInfo {
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

const mockStoreInfo: StoreInfo = {
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

export default function StoreSettings() {
  const [storeInfo, setStoreInfo] = useState<StoreInfo>(mockStoreInfo);
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (field: keyof StoreInfo, value: string) => {
    setStoreInfo(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-red-800">Store Settings</h1>
          <p className="text-slate-600">Manage your store information and preferences</p>
        </div>
        <Button 
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          className="bg-red-800 hover:bg-red-700"
        >
          {isEditing ? (
            <>
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </>
          ) : (
            'Edit Store Info'
          )}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="border border-red-200">
            <CardHeader className="bg-red-50 border-b border-red-200">
              <CardTitle className="flex items-center text-red-800">
                <Store className="w-5 h-5 mr-2" />
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Store Name</label>
                <input
                  type="text"
                  value={storeInfo.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-red-200 rounded-lg focus:ring-2 focus:ring-red-700 focus:border-red-700 disabled:bg-red-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                <textarea
                  value={storeInfo.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  disabled={!isEditing}
                  rows={3}
                  className="w-full px-3 py-2 border border-red-200 rounded-lg focus:ring-2 focus:ring-red-700 focus:border-red-700 disabled:bg-red-50"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    value={storeInfo.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-red-200 rounded-lg focus:ring-2 focus:ring-red-700 focus:border-red-700 disabled:bg-red-50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={storeInfo.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-red-200 rounded-lg focus:ring-2 focus:ring-red-700 focus:border-red-700 disabled:bg-red-50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Website</label>
                <input
                  type="url"
                  value={storeInfo.website}
                  onChange={(e) => handleInputChange('website', e.target.value)}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-red-200 rounded-lg focus:ring-2 focus:ring-red-700 focus:border-red-700 disabled:bg-red-50"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="border border-red-200">
            <CardHeader className="bg-red-50 border-b border-red-200">
              <CardTitle className="flex items-center text-red-800">
                <MapPin className="w-5 h-5 mr-2" />
                Address Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Street Address</label>
                <input
                  type="text"
                  value={storeInfo.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-red-200 rounded-lg focus:ring-2 focus:ring-red-700 focus:border-red-700 disabled:bg-red-50"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">City</label>
                  <input
                    type="text"
                    value={storeInfo.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-red-200 rounded-lg focus:ring-2 focus:ring-red-700 focus:border-red-700 disabled:bg-red-50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">State/Province</label>
                  <input
                    type="text"
                    value={storeInfo.state}
                    onChange={(e) => handleInputChange('state', e.target.value)}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-red-200 rounded-lg focus:ring-2 focus:ring-red-700 focus:border-red-700 disabled:bg-red-50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">ZIP/Postal Code</label>
                  <input
                    type="text"
                    value={storeInfo.zipCode}
                    onChange={(e) => handleInputChange('zipCode', e.target.value)}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-red-200 rounded-lg focus:ring-2 focus:ring-red-700 focus:border-red-700 disabled:bg-red-50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Country</label>
                  <select
                    value={storeInfo.country}
                    onChange={(e) => handleInputChange('country', e.target.value)}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-red-200 rounded-lg focus:ring-2 focus:ring-red-700 focus:border-red-700 disabled:bg-red-50"
                  >
                    <option value="United States">United States</option>
                    <option value="Canada">Canada</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Australia">Australia</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-red-200">
            <CardHeader className="bg-red-50 border-b border-red-200">
              <CardTitle className="flex items-center text-red-800">
                <Clock className="w-5 h-5 mr-2" />
                Business Hours
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
                ].map((day) => (
                  <div key={day} className="flex items-center justify-between">
                    <span className="font-medium text-red-800 w-24">{day}</span>
                    <div className="flex items-center gap-2">
                      <input
                        type="time"
                        defaultValue="09:00"
                        disabled={!isEditing}
                        className="px-2 py-1 border border-red-200 rounded focus:ring-2 focus:ring-red-700 focus:border-red-700 disabled:bg-red-50"
                      />
                      <span className="text-slate-500">to</span>
                      <input
                        type="time"
                        defaultValue="17:00"
                        disabled={!isEditing}
                        className="px-2 py-1 border border-red-200 rounded focus:ring-2 focus:ring-red-700 focus:border-red-700 disabled:bg-red-50"
                      />
                      <label className="flex items-center ml-2">
                        <input
                          type="checkbox"
                          disabled={!isEditing}
                          className="mr-1"
                        />
                        <span className="text-sm text-slate-600">Closed</span>
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border border-red-200">
            <CardHeader className="bg-red-50 border-b border-red-200">
              <CardTitle className="text-red-800">Store Logo</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="w-32 h-32 mx-auto bg-red-50 rounded-lg flex items-center justify-center mb-4">
                <Store className="w-12 h-12 text-red-400" />
              </div>
              <Button variant="outline" className="w-full hover:bg-red-50 hover:border-red-300">
                <Upload className="w-4 h-4 mr-2" />
                Upload Logo
              </Button>
              <p className="text-xs text-slate-500 mt-2">
                Recommended: 200x200px, PNG or JPG
              </p>
            </CardContent>
          </Card>

          <Card className="border border-red-200">
            <CardHeader className="bg-red-50 border-b border-red-200">
              <CardTitle className="text-red-800">Store Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-red-800">Store Active</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-800"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-red-800">Accept Orders</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-800"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-red-800">Vacation Mode</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-800"></div>
                </label>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-red-200">
            <CardHeader className="bg-red-50 border-b border-red-200">
              <CardTitle className="text-red-800">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start hover:bg-red-50 hover:border-red-300">
                <Globe className="w-4 h-4 mr-2" />
                View Store Front
              </Button>
              <Button variant="outline" className="w-full justify-start hover:bg-red-50 hover:border-red-300">
                <Phone className="w-4 h-4 mr-2" />
                Contact Support
              </Button>
              <Button variant="outline" className="w-full justify-start hover:bg-red-50 hover:border-red-300">
                <Mail className="w-4 h-4 mr-2" />
                Email Settings
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
