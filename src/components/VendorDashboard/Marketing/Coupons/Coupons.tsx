'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/UI/Card';
import { Button } from '@/components/UI/Button';
import { Plus, Search, Filter, Edit, Trash2, Copy, Tag, Percent, Calendar, Users } from 'lucide-react';

interface Coupon {
  id: string;
  code: string;
  type: 'Percentage' | 'Fixed Amount';
  value: number;
  description: string;
  minOrderAmount?: number;
  maxUses?: number;
  usedCount: number;
  startDate: string;
  endDate: string;
  status: 'Active' | 'Inactive' | 'Expired';
}

const mockCoupons: Coupon[] = [
  {
    id: '1',
    code: 'WELCOME10',
    type: 'Percentage',
    value: 10,
    description: 'Welcome discount for new customers',
    minOrderAmount: 50,
    maxUses: 100,
    usedCount: 23,
    startDate: '2024-01-01',
    endDate: '2024-03-31',
    status: 'Active'
  },
  {
    id: '2',
    code: 'SAVE20',
    type: 'Fixed Amount',
    value: 20,
    description: 'Fixed $20 off on orders',
    minOrderAmount: 100,
    maxUses: 50,
    usedCount: 12,
    startDate: '2024-01-15',
    endDate: '2024-02-15',
    status: 'Active'
  },
  {
    id: '3',
    code: 'HOLIDAY25',
    type: 'Percentage',
    value: 25,
    description: 'Holiday special discount',
    minOrderAmount: 75,
    maxUses: 200,
    usedCount: 156,
    startDate: '2023-12-01',
    endDate: '2023-12-31',
    status: 'Expired'
  }
];

export default function Coupons() {
  const [coupons] = useState<Coupon[]>(mockCoupons);
  const [searchTerm, setSearchTerm] = useState('');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'text-green-600 bg-green-100';
      case 'Inactive': return 'text-gray-600 bg-gray-100';
      case 'Expired': return 'text-gray-700 bg-gray-50';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTypeIcon = (type: string) => {
    return type === 'Percentage' ? <Percent className="w-4 h-4" /> : <Tag className="w-4 h-4" />;
  };

  const filteredCoupons = coupons.filter(coupon =>
    coupon.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    coupon.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const activeCoupons = coupons.filter(c => c.status === 'Active').length;
  const totalUses = coupons.reduce((sum, c) => sum + c.usedCount, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-[#222222]">Coupons & Discounts</h1>
          <p className="text-slate-600">Create and manage discount codes for your customers</p>
        </div>
        <Button className="bg-[#222222] text-white text-base font-semibold hover:bg-[#313131]">
          <Plus className="w-4 h-4 mr-2" />
          Create Coupon
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border border-gray-200 hover:border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-center">
              <Tag className="w-8 h-8 text-gray-700" />
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-600">Total Coupons</p>
                <p className="text-2xl font-bold text-[#222222]">{coupons.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-gray-200 hover:border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-center">
              <Calendar className="w-8 h-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-600">Active Coupons</p>
                <p className="text-2xl font-bold text-[#222222]">{activeCoupons}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-gray-200 hover:border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-center">
              <Users className="w-8 h-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-600">Total Uses</p>
                <p className="text-2xl font-bold text-[#222222]">{totalUses}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-gray-200 hover:border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-center">
              <Percent className="w-8 h-8 text-orange-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-600">Avg. Discount</p>
                <p className="text-2xl font-bold text-[#222222]">15%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border border-gray-200">
        <CardContent className="p-6">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="text"
                placeholder="Search coupons..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-700 focus:border-gray-700"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-700 focus:border-gray-700">
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="expired">Expired</option>
            </select>
            <Button variant="outline" className="hover:bg-gray-50 hover:border-gray-200">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCoupons.map((coupon) => (
          <Card key={coupon.id} className="border border-gray-200 hover:border-gray-200 hover:shadow-md transition-all">
            <CardHeader className="pb-3 bg-gray-50 border-b border-gray-200">
              <div className="flex justify-between items-start">
                <div className="flex items-center">
                  {getTypeIcon(coupon.type)}
                  <CardTitle className="ml-2 text-lg text-[#222222]">{coupon.code}</CardTitle>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(coupon.status)}`}>
                  {coupon.status}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <p className="text-sm text-slate-600">{coupon.description}</p>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500">Discount:</span>
                  <span className="font-medium text-[#222222]">
                    {coupon.type === 'Percentage' ? `${coupon.value}%` : `$${coupon.value}`}
                  </span>
                </div>

                {coupon.minOrderAmount && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-500">Min Order:</span>
                    <span className="font-medium text-[#222222]">${coupon.minOrderAmount}</span>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500">Usage:</span>
                  <span className="font-medium text-[#222222]">
                    {coupon.usedCount}{coupon.maxUses ? `/${coupon.maxUses}` : ''}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500">Valid Until:</span>
                  <span className="font-medium text-[#222222]">{coupon.endDate}</span>
                </div>

                <div className="flex gap-2 pt-3">
                  <Button variant="outline" size="sm" className="flex-1 hover:bg-gray-50 hover:border-gray-200">
                    <Copy className="w-4 h-4 mr-1" />
                    Copy
                  </Button>
                  <Button variant="outline" size="sm" className="hover:bg-gray-50 hover:border-gray-200">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="hover:bg-gray-50 hover:border-gray-200">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-dashed border-2 border-gray-200 hover:border-gray-500 transition-colors cursor-pointer">
        <CardContent className="p-12 text-center">
          <Plus className="w-12 h-12 text-gray-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-[#222222] mb-2">Create New Coupon</h3>
          <p className="text-slate-600 mb-4">Set up a new discount code for your customers</p>
          <Button className="bg-[#222222] hover:bg-[#313131]">
            Get Started
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
