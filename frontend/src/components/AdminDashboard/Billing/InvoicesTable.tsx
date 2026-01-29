'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/UI/Card'
import { Button } from '@/components/UI/Button'
import { Badge } from '@/components/UI/Badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/UI/Table'
import { Eye, Download } from 'lucide-react'
import { formatPrice, formatDate } from '@/lib/utils'

interface Invoice {
  id: string
  vendorName: string
  vendorEmail: string
  amount: number
  status: 'paid' | 'pending' | 'overdue' | 'draft'
  dueDate: Date
  issueDate: Date
  items: number
  paymentMethod: string
}

interface InvoicesTableProps {
  invoices: Invoice[]
}

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'paid':
      return <Badge className="bg-green-100 text-green-800">Paid</Badge>
    case 'pending':
      return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
    case 'overdue':
      return <Badge className="bg-gray-50 text-[#222222]">Overdue</Badge>
    case 'draft':
      return <Badge className="bg-gray-100 text-gray-800">Draft</Badge>
    default:
      return <Badge className="bg-gray-100 text-gray-800">Unknown</Badge>
  }
}

export default function InvoicesTable({ invoices }: InvoicesTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Invoice & Billing Management</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Invoice ID</TableHead>
              <TableHead>Vendor</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Issue Date</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Payment Method</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell className="font-medium">{invoice.id}</TableCell>
                <TableCell>
                  <div>
                    <div className="font-medium">{invoice.vendorName}</div>
                    <div className="text-sm text-gray-500">{invoice.vendorEmail}</div>
                  </div>
                </TableCell>
                <TableCell className="font-medium">{formatPrice(invoice.amount)}</TableCell>
                <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                <TableCell>{formatDate(invoice.issueDate)}</TableCell>
                <TableCell>
                  <span className={invoice.status === 'overdue' ? 'text-gray-700 font-medium' : ''}>
                    {formatDate(invoice.dueDate)}
                  </span>
                </TableCell>
                <TableCell>{invoice.paymentMethod}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                    {invoice.status === 'draft' && (
                      <Button variant="outline" size="sm">
                        Send
                      </Button>
                    )}
                    {invoice.status === 'overdue' && (
                      <Button variant="outline" size="sm" className="text-gray-700">
                        Remind
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
