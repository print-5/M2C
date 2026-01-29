'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/UI/Card'
import { DollarSign, Clock, FileText, CheckCircle } from 'lucide-react'
import { formatPrice } from '@/lib/utils'

interface BillingStatsProps {
  totalRevenue: number
  pendingAmount: number
  overdueAmount: number
  totalInvoices: number
}

export default function BillingStats({
  totalRevenue,
  pendingAmount,
  overdueAmount,
  totalInvoices,
}: BillingStatsProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          <DollarSign className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatPrice(totalRevenue)}</div>
          <p className="text-xs text-gray-600">From paid invoices</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Pending Amount</CardTitle>
          <Clock className="h-4 w-4 text-yellow-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatPrice(pendingAmount)}</div>
          <p className="text-xs text-gray-600">Awaiting payment</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Overdue Amount</CardTitle>
          <FileText className="h-4 w-4 text-gray-700" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-700">{formatPrice(overdueAmount)}</div>
          <p className="text-xs text-gray-600">Requires attention</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Invoices</CardTitle>
          <CheckCircle className="h-4 w-4 text-blue-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalInvoices}</div>
          <p className="text-xs text-gray-600">This month</p>
        </CardContent>
      </Card>
    </div>
  )
}
