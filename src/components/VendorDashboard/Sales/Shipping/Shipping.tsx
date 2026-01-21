'use client';

import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/UI/Card';
import { Button } from '@/components/UI/Button';
import { Truck, Package, Clock, CheckCircle, Search } from 'lucide-react';

export default function Shipping() {
  const router = useRouter();

  const shipments = [
    {
      id: 'SH-001',
      orderId: 'ORD-001',
      customer: 'John Doe',
      status: 'In Transit',
      trackingNumber: 'TRK123456789',
      carrier: 'FedEx',
      estimatedDelivery: '2024-01-18',
      items: 3
    },
    {
      id: 'SH-002',
      orderId: 'ORD-002',
      customer: 'Jane Smith',
      status: 'Delivered',
      trackingNumber: 'TRK987654321',
      carrier: 'UPS',
      estimatedDelivery: '2024-01-16',
      items: 2
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending': return 'text-yellow-600 bg-yellow-100';
      case 'In Transit': return 'text-blue-600 bg-blue-100';
      case 'Delivered': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-red-800">Shipping Management</h1>
          <p className="text-slate-600">Track and manage your shipments</p>
        </div>
        <Button
          className="bg-red-800 text-white text-base font-semibold hover:bg-red-700"
          onClick={() => router.push('/vendor/dashboard/shipping/create')}
        >
          <Package className="w-4 h-4 mr-2" />
          Create Shipment
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border border-red-200 hover:border-red-300">
          <CardContent className="p-6">
            <div className="flex items-center">
              <Package className="w-8 h-8 text-red-700" />
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-600">Total Shipments</p>
                <p className="text-2xl font-bold text-red-800">24</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-red-200 hover:border-red-300">
          <CardContent className="p-6">
            <div className="flex items-center">
              <Clock className="w-8 h-8 text-yellow-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-600">Pending</p>
                <p className="text-2xl font-bold text-red-800">3</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-red-200 hover:border-red-300">
          <CardContent className="p-6">
            <div className="flex items-center">
              <Truck className="w-8 h-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-600">In Transit</p>
                <p className="text-2xl font-bold text-red-800">8</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-red-200 hover:border-red-300">
          <CardContent className="p-6">
            <div className="flex items-center">
              <CheckCircle className="w-8 h-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-600">Delivered</p>
                <p className="text-2xl font-bold text-red-800">13</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border border-red-200">
        <CardContent className="p-6">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Search shipments..."
              className="w-full pl-10 pr-4 py-2 border border-red-200 rounded-lg focus:ring-2 focus:ring-red-700 focus:border-red-700"
            />
          </div>
        </CardContent>
      </Card>

      <Card className="border border-red-200">
        <CardHeader className="bg-red-50 border-b border-red-200">
          <CardTitle className="text-red-800">Recent Shipments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-red-200">
                  <th className="text-left py-3 px-4 text-red-800">Shipment ID</th>
                  <th className="text-left py-3 px-4 text-red-800">Order</th>
                  <th className="text-left py-3 px-4 text-red-800">Customer</th>
                  <th className="text-left py-3 px-4 text-red-800">Carrier</th>
                  <th className="text-left py-3 px-4 text-red-800">Tracking</th>
                  <th className="text-left py-3 px-4 text-red-800">Status</th>
                  <th className="text-left py-3 px-4 text-red-800">ETA</th>
                </tr>
              </thead>
              <tbody>
                {shipments.map((shipment) => (
                  <tr key={shipment.id} className="border-b border-red-100 hover:bg-red-50">
                    <td className="py-3 px-4 font-medium text-red-800">{shipment.id}</td>
                    <td className="py-3 px-4 text-slate-600">{shipment.orderId}</td>
                    <td className="py-3 px-4 text-slate-600">{shipment.customer}</td>
                    <td className="py-3 px-4 text-slate-600">{shipment.carrier}</td>
                    <td className="py-3 px-4 text-slate-600">{shipment.trackingNumber}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(shipment.status)}`}>
                        {shipment.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-600">{shipment.estimatedDelivery}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
