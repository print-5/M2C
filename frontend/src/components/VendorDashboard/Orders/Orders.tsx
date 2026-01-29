'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/UI/Card';
import { Button } from '@/components/UI/Button';
import { ShoppingCart, Search, Filter, Eye, Package, Truck, CheckCircle, X } from 'lucide-react';

interface Order {
  id: string;
  orderNumber: string;
  customer: string;
  email: string;
  total: number;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  items: number;
  date: string;
}

const mockOrders: Order[] = [
  {
    id: '1',
    orderNumber: 'ORD-001',
    customer: 'John Doe',
    email: 'john@example.com',
    total: 89.97,
    status: 'Processing',
    items: 3,
    date: '2024-01-15'
  },
  {
    id: '2',
    orderNumber: 'ORD-002',
    customer: 'Jane Smith',
    email: 'jane@example.com',
    total: 45.99,
    status: 'Shipped',
    items: 2,
    date: '2024-01-14'
  },
  {
    id: '3',
    orderNumber: 'ORD-003',
    customer: 'Mike Johnson',
    email: 'mike@example.com',
    total: 124.50,
    status: 'Delivered',
    items: 5,
    date: '2024-01-13'
  }
];

export default function Orders() {
  const [orders] = useState<Order[]>(mockOrders);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending': return 'text-yellow-600 bg-yellow-100';
      case 'Processing': return 'text-blue-600 bg-blue-100';
      case 'Shipped': return 'text-purple-600 bg-purple-100';
      case 'Delivered': return 'text-green-600 bg-green-100';
      case 'Cancelled': return 'text-gray-700 bg-gray-50';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Pending': return <Package className="w-4 h-4" />;
      case 'Processing': return <Package className="w-4 h-4" />;
      case 'Shipped': return <Truck className="w-4 h-4" />;
      case 'Delivered': return <CheckCircle className="w-4 h-4" />;
      default: return <Package className="w-4 h-4" />;
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-[#222222]">Orders</h1>
          <p className="text-slate-600">Manage and track your customer orders</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border border-gray-200 hover:border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-center">
              <ShoppingCart className="w-8 h-8 text-gray-700" />
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-600">Total Orders</p>
                <p className="text-2xl font-bold text-[#222222]">{orders.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-gray-200 hover:border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-center">
              <Package className="w-8 h-8 text-yellow-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-600">Pending</p>
                <p className="text-2xl font-bold text-[#222222]">
                  {orders.filter(o => o.status === 'Pending').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-gray-200 hover:border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-center">
              <Truck className="w-8 h-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-600">Shipped</p>
                <p className="text-2xl font-bold text-[#222222]">
                  {orders.filter(o => o.status === 'Shipped').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-gray-200 hover:border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-center">
              <CheckCircle className="w-8 h-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-600">Delivered</p>
                <p className="text-2xl font-bold text-[#222222]">
                  {orders.filter(o => o.status === 'Delivered').length}
                </p>
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
                placeholder="Search orders..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-700 focus:border-gray-700"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-700 focus:border-gray-700"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </CardContent>
      </Card>

      <Card className="border border-gray-200">
        <CardHeader className="bg-gray-50 border-b border-gray-200">
          <CardTitle className="text-[#222222]">Recent Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-[#222222]">Order</th>
                  <th className="text-left py-3 px-4 text-[#222222]">Customer</th>
                  <th className="text-left py-3 px-4 text-[#222222]">Items</th>
                  <th className="text-left py-3 px-4 text-[#222222]">Total</th>
                  <th className="text-left py-3 px-4 text-[#222222]">Status</th>
                  <th className="text-left py-3 px-4 text-[#222222]">Date</th>
                  <th className="text-left py-3 px-4 text-[#222222]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="font-medium text-[#222222]">{order.orderNumber}</div>
                    </td>
                    <td className="py-3 px-4">
                      <div>
                        <div className="font-medium text-[#222222]">{order.customer}</div>
                        <div className="text-sm text-slate-600">{order.email}</div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-slate-600">{order.items}</td>
                    <td className="py-3 px-4 text-gray-700">${order.total}</td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)}
                        {order.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-600">{order.date}</td>
                    <td className="py-3 px-4">
                      <Button
                        variant="outline"
                        size="sm"
                        className="hover:bg-gray-50 hover:border-gray-200"
                        onClick={() => setSelectedOrder(order)}
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* View Order Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-500">Order</p>
                <h3 className="text-lg font-semibold text-[#222222]">{selectedOrder.orderNumber}</h3>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="hover:bg-gray-50 hover:text-[#222222]"
                onClick={() => setSelectedOrder(null)}
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="px-6 py-5 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-gray-50/50 border border-gray-200 rounded-lg p-4">
                  <p className="text-xs uppercase tracking-wide text-slate-500 mb-1">Customer</p>
                  <p className="text-sm font-semibold text-[#222222]">{selectedOrder.customer}</p>
                  <p className="text-xs text-slate-600">{selectedOrder.email}</p>
                </div>
                <div className="bg-gray-50/50 border border-gray-200 rounded-lg p-4">
                  <p className="text-xs uppercase tracking-wide text-slate-500 mb-1">Status</p>
                  <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(selectedOrder.status)}`}>
                    {getStatusIcon(selectedOrder.status)}
                    {selectedOrder.status}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="border border-slate-200 rounded-lg p-4">
                  <p className="text-xs uppercase tracking-wide text-slate-500 mb-1">Items</p>
                  <p className="text-lg font-semibold text-[#222222]">{selectedOrder.items}</p>
                </div>
                <div className="border border-slate-200 rounded-lg p-4">
                  <p className="text-xs uppercase tracking-wide text-slate-500 mb-1">Total</p>
                  <p className="text-lg font-semibold text-[#222222]">${selectedOrder.total.toFixed(2)}</p>
                </div>
                <div className="border border-slate-200 rounded-lg p-4">
                  <p className="text-xs uppercase tracking-wide text-slate-500 mb-1">Date</p>
                  <p className="text-lg font-semibold text-[#222222]">{selectedOrder.date}</p>
                </div>
              </div>

              <div className="border border-slate-200 rounded-lg p-4">
                <p className="text-sm font-semibold text-[#222222] mb-2">Order Summary</p>
                <p className="text-sm text-slate-600">
                  This order contains <span className="font-semibold text-[#222222]">{selectedOrder.items}</span> items with a total value of{' '}
                  <span className="font-semibold text-[#222222]">${selectedOrder.total.toFixed(2)}</span>. Current status is{' '}
                  <span className="font-semibold text-[#222222]">{selectedOrder.status}</span>.
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-2 px-6 py-4 border-t border-slate-200 bg-gray-50/50">
              <Button
                variant="outline"
                className="hover:bg-gray-50 hover:border-gray-200"
                onClick={() => setSelectedOrder(null)}
              >
                Close
              </Button>
              <Button className="bg-[#222222] text-white hover:bg-[#313131]">
                Mark as Processed
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
