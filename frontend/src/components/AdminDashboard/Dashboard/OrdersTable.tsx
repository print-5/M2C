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
import { Eye, Edit, Truck } from 'lucide-react'
import { formatDate, formatPrice } from '@/lib/utils'

const orders = [
  {
    id: 'ORD-001',
    customer: 'John Doe',
    email: 'john@example.com',
    vendor: 'TechStore Pro',
    total: 999,
    status: 'pending',
    items: 2,
    createdAt: new Date('2024-01-15'),
  },
  {
    id: 'ORD-002',
    customer: 'Jane Smith',
    email: 'jane@example.com',
    vendor: 'Sports Galaxy',
    total: 330,
    status: 'shipped',
    items: 1,
    createdAt: new Date('2024-01-14'),
  },
  {
    id: 'ORD-003',
    customer: 'Mike Johnson',
    email: 'mike@example.com',
    vendor: 'Fashion Forward',
    total: 156,
    status: 'delivered',
    items: 3,
    createdAt: new Date('2024-01-13'),
  },
  {
    id: 'ORD-004',
    customer: 'Sarah Wilson',
    email: 'sarah@example.com',
    vendor: 'ElectroHub',
    total: 899,
    status: 'processing',
    items: 1,
    createdAt: new Date('2024-01-12'),
  },
  {
    id: 'ORD-005',
    customer: 'David Brown',
    email: 'david@example.com',
    vendor: 'Home Essentials',
    total: 245,
    status: 'cancelled',
    items: 4,
    createdAt: new Date('2024-01-11'),
  },
]

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'pending':
      return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
    case 'processing':
      return <Badge className="bg-blue-100 text-blue-800">Processing</Badge>
    case 'shipped':
      return <Badge className="bg-purple-100 text-purple-800">Shipped</Badge>
    case 'delivered':
      return <Badge className="bg-green-100 text-green-800">Delivered</Badge>
    case 'cancelled':
      return <Badge className="bg-gray-50 text-[#222222]">Cancelled</Badge>
    default:
      return <Badge className="bg-gray-100 text-gray-800">Unknown</Badge>
  }
}

export default function OrdersTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Orders Management</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Vendor</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>
                  <div>
                    <div className="font-medium">{order.customer}</div>
                    <div className="text-sm text-gray-500">{order.email}</div>
                  </div>
                </TableCell>
                <TableCell>{order.vendor}</TableCell>
                <TableCell>{order.items} items</TableCell>
                <TableCell className="font-medium">{formatPrice(order.total)}</TableCell>
                <TableCell>{getStatusBadge(order.status)}</TableCell>
                <TableCell>{formatDate(order.createdAt)}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    {(order.status === 'pending' || order.status === 'processing') && (
                      <Button variant="ghost" size="sm" className="text-blue-600">
                        <Truck className="h-4 w-4" />
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