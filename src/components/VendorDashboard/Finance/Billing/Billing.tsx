'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/UI/Card';
import { Button } from '@/components/UI/Button';
import { CreditCard, Download, Eye, DollarSign, Calendar, AlertCircle, CheckCircle } from 'lucide-react';

interface Invoice {
  id: string;
  invoiceNumber: string;
  amount: number;
  status: 'Paid' | 'Pending' | 'Overdue';
  dueDate: string;
  paidDate?: string;
  description: string;
}

interface PaymentMethod {
  id: string;
  type: 'Credit Card' | 'Bank Account';
  last4: string;
  brand?: string;
  isDefault: boolean;
}

const mockInvoices: Invoice[] = [
  {
    id: '1',
    invoiceNumber: 'INV-2024-001',
    amount: 89.99,
    status: 'Paid',
    dueDate: '2024-01-15',
    paidDate: '2024-01-10',
    description: 'Monthly subscription fee'
  },
  {
    id: '2',
    invoiceNumber: 'INV-2024-002',
    amount: 45.50,
    status: 'Pending',
    dueDate: '2024-02-15',
    description: 'Transaction fees'
  },
  {
    id: '3',
    invoiceNumber: 'INV-2024-003',
    amount: 125.00,
    status: 'Overdue',
    dueDate: '2024-01-01',
    description: 'Setup fee'
  }
];

const mockPaymentMethods: PaymentMethod[] = [
  {
    id: '1',
    type: 'Credit Card',
    last4: '4242',
    brand: 'Visa',
    isDefault: true
  },
  {
    id: '2',
    type: 'Bank Account',
    last4: '1234',
    isDefault: false
  }
];

export default function Billing() {
  const [invoices] = useState<Invoice[]>(mockInvoices);
  const [paymentMethods] = useState<PaymentMethod[]>(mockPaymentMethods);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Paid': return 'text-green-600 bg-green-100';
      case 'Pending': return 'text-yellow-600 bg-yellow-100';
      case 'Overdue': return 'text-gray-700 bg-gray-50';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Paid': return <CheckCircle className="w-4 h-4" />;
      case 'Pending': return <Calendar className="w-4 h-4" />;
      case 'Overdue': return <AlertCircle className="w-4 h-4" />;
      default: return <Calendar className="w-4 h-4" />;
    }
  };

  const totalOwed = invoices
    .filter(inv => inv.status !== 'Paid')
    .reduce((sum, inv) => sum + inv.amount, 0);

  const totalPaid = invoices
    .filter(inv => inv.status === 'Paid')
    .reduce((sum, inv) => sum + inv.amount, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#222222]">Billing & Payments</h1>
        <p className="text-slate-600">Manage your billing information and payment history</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border border-gray-200 hover:border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-center">
              <DollarSign className="w-8 h-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-600">Total Paid</p>
                <p className="text-2xl font-bold text-[#222222]">${totalPaid.toFixed(2)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-gray-200 hover:border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-center">
              <AlertCircle className="w-8 h-8 text-gray-700" />
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-600">Amount Due</p>
                <p className="text-2xl font-bold text-[#222222]">${totalOwed.toFixed(2)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-gray-200 hover:border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-center">
              <Calendar className="w-8 h-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-600">Next Payment</p>
                <p className="text-2xl font-bold text-[#222222]">Feb 15</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border border-gray-200">
          <CardHeader className="bg-gray-50 border-b border-gray-200">
            <CardTitle className="text-[#222222]">Recent Invoices</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {invoices.map((invoice) => (
                <div key={invoice.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-medium text-[#222222]">{invoice.invoiceNumber}</p>
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(invoice.status)}`}>
                        {getStatusIcon(invoice.status)}
                        {invoice.status}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600">{invoice.description}</p>
                    <p className="text-sm text-slate-500">
                      Due: {invoice.dueDate}
                      {invoice.paidDate && ` • Paid: ${invoice.paidDate}`}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-[#222222]">${invoice.amount.toFixed(2)}</p>
                    <div className="flex gap-1 mt-2">
                      <Button variant="outline" size="sm" className="hover:bg-gray-50 hover:border-gray-200">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="hover:bg-gray-50 hover:border-gray-200">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Button variant="outline" className="w-full hover:bg-gray-50 hover:border-gray-200">
                View All Invoices
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-gray-200">
          <CardHeader className="bg-gray-50 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <CardTitle className="text-[#222222]">Payment Methods</CardTitle>
              <Button variant="outline" size="sm" className="hover:bg-gray-50 hover:border-gray-200">
                Add Method
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {paymentMethods.map((method) => (
                <div key={method.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <div className="flex items-center">
                    <CreditCard className="w-8 h-8 text-slate-400 mr-3" />
                    <div>
                      <p className="font-medium text-[#222222]">
                        {method.type} {method.brand && `(${method.brand})`}
                      </p>
                      <p className="text-sm text-slate-600">•••• •••• •••• {method.last4}</p>
                      {method.isDefault && (
                        <span className="text-xs text-gray-700 font-medium">Default</span>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="hover:bg-gray-50 hover:border-gray-200">
                      Edit
                    </Button>
                    {!method.isDefault && (
                      <Button variant="outline" size="sm" className="hover:bg-gray-50 hover:border-gray-200">
                        Remove
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border border-gray-200">
        <CardHeader className="bg-gray-50 border-b border-gray-200">
          <CardTitle className="text-[#222222]">Billing Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-[#222222] mb-3">Billing Address</h3>
              <div className="space-y-2 text-sm text-slate-600">
                <p>John Doe</p>
                <p>123 Main Street</p>
                <p>New York, NY 10001</p>
                <p>United States</p>
              </div>
              <Button variant="outline" size="sm" className="mt-3 hover:bg-gray-50 hover:border-gray-200">
                Update Address
              </Button>
            </div>
            
            <div>
              <h3 className="font-medium text-[#222222] mb-3">Billing Preferences</h3>
              <div className="space-y-3">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" defaultChecked />
                  <span className="text-sm text-slate-700">Email invoices</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-sm text-slate-700">Auto-pay enabled</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" defaultChecked />
                  <span className="text-sm text-slate-700">Payment reminders</span>
                </label>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
