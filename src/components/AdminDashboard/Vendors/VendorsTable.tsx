'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/UI/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/UI/Card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/UI/Table'
import { Badge } from '@/components/UI/Badge'
import { Edit, Eye, CheckCircle, XCircle } from 'lucide-react'
import { vendors } from '@/components/mockData/vendors'
import { formatDate } from '@/lib/utils'

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'active':
      return <Badge className="bg-green-100 text-green-800">Active</Badge>
    case 'pending':
      return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
    case 'suspended':
      return <Badge className="bg-gray-50 text-[#222222]">Suspended</Badge>
    default:
      return <Badge className="bg-gray-100 text-gray-800">Unknown</Badge>
  }
}

export default function VendorsTable() {
  const [vendorList] = useState(vendors)

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Vendors Management</CardTitle>
          <Link href="/dashboard/vendors/add">
            <Button className="bg-[#313131] text-white hover:bg-[#222222]">
              Add Vendor
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader className='bg-[#313131] text-white rounded-t-lg'>
            <TableRow>
              <TableHead>Vendor</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Products</TableHead>
              <TableHead>Revenue</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Join Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {vendorList.map((vendor) => (
              <TableRow key={vendor.id}>
                <TableCell>
                  <div>
                    <div className="font-medium">{vendor.name}</div>
                    <div className="text-sm text-gray-500">{vendor.email}</div>
                  </div>
                </TableCell>
                <TableCell>{vendor.location}</TableCell>
                <TableCell>{getStatusBadge(vendor.status)}</TableCell>
                <TableCell>{vendor.products}</TableCell>
                <TableCell className="font-medium">{vendor.revenue}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <span className="text-yellow-400">★</span>
                    <span className="ml-1">{vendor.rating}</span>
                  </div>
                </TableCell>
                <TableCell>{formatDate(vendor.joinDate)}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Link href={`/dashboard/vendors/view/${vendor.id}`}>
                      <Button variant="ghost" size="sm" title="View Details">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Link href={`/dashboard/vendors/edit/${vendor.id}`}>
                      <Button variant="ghost" size="sm" title="Edit Vendor">
                        <Edit className="h-4 w-4 text-blue-500" />
                      </Button>
                    </Link>
                    {vendor.status === 'pending' && (
                      <>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-green-600 hover:bg-green-50"
                          title="Approve Vendor"
                        >
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-red-600 hover:bg-red-50"
                          title="Reject Vendor"
                        >
                          <XCircle className="h-4 w-4" />
                        </Button>
                      </>
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