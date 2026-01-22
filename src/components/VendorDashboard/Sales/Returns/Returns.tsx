'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/UI/Card';
import { Button } from '@/components/UI/Button';
import { RotateCcw, Search, Filter, Eye, CheckCircle, XCircle, Clock, Package, AlertTriangle } from 'lucide-react';

interface ReturnRequest {
  id: string;
  orderNumber: string;
  customer: string;
  email: string;
  product: string;
  reason: string;
  status: 'Pending' | 'Approved' | 'Rejected' | 'Processed' | 'Completed';
  requestDate: string;
  amount: number;
  quantity: number;
}

const mockReturns: ReturnRequest[] = [
  {
    id: 'RET-001',
    orderNumber: 'ORD-001',
    customer: 'John Doe',
    email: 'john@example.com',
    product: 'Cotton Kitchen Towel',
    reason: 'Defective item - torn fabric',
    status: 'Pending',
    requestDate: '2024-01-15',
    amount: 12.99,
    quantity: 1
  },
  {
    id: 'RET-002',
    orderNumber: 'ORD-002',
    customer: 'Jane Smith',
    email: 'jane@example.com',
    product: 'Handwoven Bath Towel',
    reason: 'Wrong size ordered',
    status: 'Approved',
    requestDate: '2024-01-14',
    amount: 24.99,
    quantity: 2
  },
  {
    id: 'RET-003',
    orderNumber: 'ORD-003',
    customer: 'Mike Johnson',
    email: 'mike@example.com',
    product: 'Artisan Apron',
    reason: 'Not as described',
    status: 'Completed',
    requestDate: '2024-01-13',
    amount: 18.99,
    quantity: 1
  },
  {
    id: 'RET-004',
    orderNumber: 'ORD-004',
    customer: 'Sarah Wilson',
    email: 'sarah@example.com',
    product: 'Linen Table Runner',
    reason: 'Changed mind',
    status: 'Rejected',
    requestDate: '2024-01-12',
    amount: 32.50,
    quantity: 1
  }
];

export default function Returns() {
  const [returns] = useState<ReturnRequest[]>(mockReturns);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending': return 'text-yellow-600 bg-yellow-100';
      case 'Approved': return 'text-blue-600 bg-blue-100';
      case 'Rejected': return 'text-gray-700 bg-gray-50';
      case 'Processed': return 'text-purple-600 bg-purple-100';
      case 'Completed': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Pending': return <Clock className="w-4 h-4" />;
      case 'Approved': return <CheckCircle className="w-4 h-4" />;
      case 'Rejected': return <XCircle className="w-4 h-4" />;
      case 'Processed': return <Package className="w-4 h-4" />;
      case 'Completed': return <CheckCircle className="w-4 h-4" />;
      default: return <AlertTriangle className="w-4 h-4" />;
    }
  };

  const filteredReturns = returns.filter(returnItem => {
    const matchesSearch = returnItem.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         returnItem.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         returnItem.product.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || returnItem.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const pendingReturns = returns.filter(r => r.status === 'Pending').length;
  const totalRefundAmount = returns
    .filter(r => r.status === 'Completed')
    .reduce((sum, r) => sum + r.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-[#222222]">Returns & Refunds</h1>
          <p className="text-slate-600">Manage customer return requests and process refunds</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border border-gray-200 hover:border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-center">
              <RotateCcw className="w-8 h-8 text-gray-700" />
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-600">Total Returns</p>
                <p className="text-2xl font-bold text-[#222222]">{returns.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-gray-200 hover:border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-center">
              <Clock className="w-8 h-8 text-yellow-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-600">Pending Review</p>
                <p className="text-2xl font-bold text-[#222222]">{pendingReturns}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-gray-200 hover:border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-center">
              <CheckCircle className="w-8 h-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-600">Completed</p>
                <p className="text-2xl font-bold text-[#222222]">
                  {returns.filter(r => r.status === 'Completed').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-gray-200 hover:border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-center">
              <Package className="w-8 h-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-600">Total Refunded</p>
                <p className="text-2xl font-bold text-[#222222]">${totalRefundAmount.toFixed(2)}</p>
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
                placeholder="Search returns..."
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
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
              <option value="Processed">Processed</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </CardContent>
      </Card>

      <Card className="border border-gray-200">
        <CardHeader className="bg-gray-50 border-b border-gray-200">
          <CardTitle className="text-[#222222]">Return Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-[#222222]">Return ID</th>
                  <th className="text-left py-3 px-4 text-[#222222]">Order</th>
                  <th className="text-left py-3 px-4 text-[#222222]">Customer</th>
                  <th className="text-left py-3 px-4 text-[#222222]">Product</th>
                  <th className="text-left py-3 px-4 text-[#222222]">Reason</th>
                  <th className="text-left py-3 px-4 text-[#222222]">Amount</th>
                  <th className="text-left py-3 px-4 text-[#222222]">Status</th>
                  <th className="text-left py-3 px-4 text-[#222222]">Date</th>
                  <th className="text-left py-3 px-4 text-[#222222]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredReturns.map((returnItem) => (
                  <tr key={returnItem.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="font-medium text-[#222222]">{returnItem.id}</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-medium text-[#222222]">{returnItem.orderNumber}</div>
                    </td>
                    <td className="py-3 px-4">
                      <div>
                        <div className="font-medium text-[#222222]">{returnItem.customer}</div>
                        <div className="text-sm text-slate-600">{returnItem.email}</div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div>
                        <div className="font-medium text-[#222222]">{returnItem.product}</div>
                        <div className="text-sm text-slate-600">Qty: {returnItem.quantity}</div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-sm text-slate-600 max-w-xs truncate">
                        {returnItem.reason}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-medium text-[#222222]">${returnItem.amount.toFixed(2)}</div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(returnItem.status)}`}>
                        {getStatusIcon(returnItem.status)}
                        {returnItem.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-600">{returnItem.requestDate}</td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="hover:bg-gray-50 hover:border-gray-200">
                          <Eye className="w-4 h-4" />
                        </Button>
                        {returnItem.status === 'Pending' && (
                          <>
                            <Button variant="outline" size="sm" className="text-green-600 hover:text-green-700 hover:bg-green-50">
                              <CheckCircle className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="sm" className="text-gray-700 hover:text-gray-700 hover:bg-gray-50">
                              <XCircle className="w-4 h-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </td>
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
