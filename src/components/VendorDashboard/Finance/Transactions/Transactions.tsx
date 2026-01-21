'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/UI/Card';
import { Button } from '@/components/UI/Button';
import { DollarSign, TrendingUp, Download, Search, Filter, Eye } from 'lucide-react';

interface Transaction {
  id: string;
  type: 'Sale' | 'Refund' | 'Payout' | 'Fee';
  amount: number;
  description: string;
  date: string;
  status: 'Completed' | 'Pending' | 'Failed';
  orderId?: string;
}

const mockTransactions: Transaction[] = [
  {
    id: 'TXN-001',
    type: 'Sale',
    amount: 89.99,
    description: 'Order #ORD-001 - Cotton Kitchen Towel',
    date: '2024-01-15',
    status: 'Completed',
    orderId: 'ORD-001'
  },
  {
    id: 'TXN-002',
    type: 'Payout',
    amount: -1250.00,
    description: 'Weekly payout to bank account',
    date: '2024-01-14',
    status: 'Completed'
  },
  {
    id: 'TXN-003',
    type: 'Fee',
    amount: -4.50,
    description: 'Transaction processing fee',
    date: '2024-01-13',
    status: 'Completed'
  },
  {
    id: 'TXN-004',
    type: 'Refund',
    amount: -45.99,
    description: 'Refund for Order #ORD-002',
    date: '2024-01-12',
    status: 'Pending',
    orderId: 'ORD-002'
  }
];

export default function Transactions() {
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Sale': return 'text-green-600 bg-green-100';
      case 'Payout': return 'text-blue-600 bg-blue-100';
      case 'Refund': return 'text-red-600 bg-red-100';
      case 'Fee': return 'text-orange-600 bg-orange-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'text-green-600 bg-green-100';
      case 'Pending': return 'text-yellow-600 bg-yellow-100';
      case 'Failed': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const totalRevenue = mockTransactions
    .filter(t => t.type === 'Sale')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalPayouts = mockTransactions
    .filter(t => t.type === 'Payout')
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-red-800">Transactions</h1>
          <p className="text-slate-600">Track all your financial transactions and payouts</p>
        </div>
        <Button className="bg-red-800 text-white text-base font-semibold hover:bg-red-700">
          <Download className="w-4 h-4 mr-2" />
          Export
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border border-red-200 hover:border-red-300">
          <CardContent className="p-6">
            <div className="flex items-center">
              <DollarSign className="w-8 h-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-600">Total Revenue</p>
                <p className="text-2xl font-bold text-red-800">${totalRevenue.toFixed(2)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-red-200 hover:border-red-300">
          <CardContent className="p-6">
            <div className="flex items-center">
              <TrendingUp className="w-8 h-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-600">Total Payouts</p>
                <p className="text-2xl font-bold text-red-800">${totalPayouts.toFixed(2)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-red-200 hover:border-red-300">
          <CardContent className="p-6">
            <div className="flex items-center">
              <DollarSign className="w-8 h-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-600">Pending</p>
                <p className="text-2xl font-bold text-red-800">
                  {mockTransactions.filter(t => t.status === 'Pending').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-red-200 hover:border-red-300">
          <CardContent className="p-6">
            <div className="flex items-center">
              <TrendingUp className="w-8 h-8 text-orange-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-600">This Month</p>
                <p className="text-2xl font-bold text-red-800">${totalRevenue.toFixed(2)}</p>
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
                placeholder="Search transactions..."
                className="w-full pl-10 pr-4 py-2 border border-red-200 rounded-lg focus:ring-2 focus:ring-red-700 focus:border-red-700"
              />
            </div>
            <select className="px-4 py-2 border border-red-200 rounded-lg focus:ring-2 focus:ring-red-700 focus:border-red-700">
              <option value="all">All Types</option>
              <option value="sale">Sales</option>
              <option value="payout">Payouts</option>
              <option value="refund">Refunds</option>
              <option value="fee">Fees</option>
            </select>
            <Button variant="outline" className="hover:bg-red-50 hover:border-red-300">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="border border-red-200">
        <CardHeader className="bg-red-50 border-b border-red-200">
          <CardTitle className="text-red-800">Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-red-200">
                  <th className="text-left py-3 px-4 text-red-800">Transaction ID</th>
                  <th className="text-left py-3 px-4 text-red-800">Type</th>
                  <th className="text-left py-3 px-4 text-red-800">Description</th>
                  <th className="text-left py-3 px-4 text-red-800">Amount</th>
                  <th className="text-left py-3 px-4 text-red-800">Status</th>
                  <th className="text-left py-3 px-4 text-red-800">Date</th>
                  <th className="text-left py-3 px-4 text-red-800">Actions</th>
                </tr>
              </thead>
              <tbody>
                {mockTransactions.map((transaction) => (
                  <tr key={transaction.id} className="border-b border-red-100 hover:bg-red-50">
                    <td className="py-3 px-4">
                      <div className="font-medium text-red-800">{transaction.id}</div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(transaction.type)}`}>
                        {transaction.type}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-red-800">{transaction.description}</div>
                      {transaction.orderId && (
                        <div className="text-sm text-slate-500">Order: {transaction.orderId}</div>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`font-medium ${transaction.amount >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {transaction.amount >= 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
                        {transaction.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-600">{transaction.date}</td>
                    <td className="py-3 px-4">
                      <Button variant="outline" size="sm" className="hover:bg-red-50 hover:border-red-300">
                        <Eye className="w-4 h-4" />
                      </Button>
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
