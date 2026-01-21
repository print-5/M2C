import { Breadcrumb } from '@/components/AdminDashboard/Breadcrumb/Breadcrumb'
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
import { Plus, Download, Eye, DollarSign, FileText, Clock, CheckCircle } from 'lucide-react'
import { formatPrice, formatDate } from '@/lib/utils'

const invoices = [
  {
    id: 'INV-2024-001',
    vendorName: 'TechStore Pro',
    vendorEmail: 'billing@techstore.com',
    amount: 2450.00,
    status: 'paid',
    dueDate: new Date('2024-01-20'),
    issueDate: new Date('2024-01-05'),
    items: 5,
    paymentMethod: 'Bank Transfer',
  },
  {
    id: 'INV-2024-002',
    vendorName: 'ElectroHub',
    vendorEmail: 'finance@electrohub.com',
    amount: 1890.50,
    status: 'pending',
    dueDate: new Date('2024-01-25'),
    issueDate: new Date('2024-01-10'),
    items: 3,
    paymentMethod: 'Credit Card',
  },
  {
    id: 'INV-2024-003',
    vendorName: 'Sports Galaxy',
    vendorEmail: 'accounts@sportsgalaxy.com',
    amount: 3200.00,
    status: 'overdue',
    dueDate: new Date('2024-01-15'),
    issueDate: new Date('2024-01-01'),
    items: 8,
    paymentMethod: 'PayPal',
  },
  {
    id: 'INV-2024-004',
    vendorName: 'Fashion Forward',
    vendorEmail: 'billing@fashionforward.com',
    amount: 1567.25,
    status: 'draft',
    dueDate: new Date('2024-01-30'),
    issueDate: new Date('2024-01-12'),
    items: 4,
    paymentMethod: 'Bank Transfer',
  },
]

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'paid':
      return <Badge className="bg-green-100 text-green-800">Paid</Badge>
    case 'pending':
      return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
    case 'overdue':
      return <Badge className="bg-red-100 text-red-800">Overdue</Badge>
    case 'draft':
      return <Badge className="bg-gray-100 text-gray-800">Draft</Badge>
    default:
      return <Badge className="bg-gray-100 text-gray-800">Unknown</Badge>
  }
}

export default function BillingPage() {
  const totalRevenue = invoices.filter(inv => inv.status === 'paid').reduce((sum, inv) => sum + inv.amount, 0)
  const pendingAmount = invoices.filter(inv => inv.status === 'pending').reduce((sum, inv) => sum + inv.amount, 0)
  const overdueAmount = invoices.filter(inv => inv.status === 'overdue').reduce((sum, inv) => sum + inv.amount, 0)
  const totalInvoices = invoices.length

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <Breadcrumb />

      {/* Action Buttons */}
      <div className="flex justify-end space-x-2">
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create Invoice
        </Button>
      </div>

      {/* Billing Stats */}
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
            <FileText className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{formatPrice(overdueAmount)}</div>
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

      {/* Invoices Table */}
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
                    <span className={invoice.status === 'overdue' ? 'text-red-600 font-medium' : ''}>
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
                        <Button variant="outline" size="sm" className="text-red-600">
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
    </div>
  )
}