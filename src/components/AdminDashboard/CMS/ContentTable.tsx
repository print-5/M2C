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
import { Eye, Edit, Trash2, FileText, Image, Globe } from 'lucide-react'
import { formatDate } from '@/lib/utils'

interface ContentItem {
  id: number
  title: string
  type: 'page' | 'article' | 'media'
  status: 'published' | 'draft' | 'archived'
  author: string
  lastModified: Date
  views: number
  slug: string
}

interface ContentTableProps {
  items: ContentItem[]
}

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'published':
      return <Badge className="bg-green-100 text-green-800">Published</Badge>
    case 'draft':
      return <Badge className="bg-yellow-100 text-yellow-800">Draft</Badge>
    case 'archived':
      return <Badge className="bg-gray-100 text-gray-800">Archived</Badge>
    default:
      return <Badge className="bg-gray-100 text-gray-800">Unknown</Badge>
  }
}

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'page':
      return <Globe className="h-4 w-4 text-blue-600" />
    case 'article':
      return <FileText className="h-4 w-4 text-green-600" />
    case 'media':
      return <Image className="h-4 w-4 text-purple-600" />
    default:
      return <FileText className="h-4 w-4 text-gray-600" />
  }
}

export default function ContentTable({ items }: ContentTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Content Management System</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Content</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Views</TableHead>
              <TableHead>Last Modified</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <div className="flex items-center space-x-3">
                    {getTypeIcon(item.type)}
                    <div>
                      <div className="font-medium">{item.title}</div>
                      <div className="text-sm text-gray-500">{item.slug}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="capitalize">{item.type}</span>
                </TableCell>
                <TableCell>{getStatusBadge(item.status)}</TableCell>
                <TableCell>{item.author}</TableCell>
                <TableCell>{item.views.toLocaleString()}</TableCell>
                <TableCell>{formatDate(item.lastModified)}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    {item.status === 'draft' && (
                      <Button variant="outline" size="sm">
                        Publish
                      </Button>
                    )}
                    <Button variant="ghost" size="sm" className="text-gray-700">
                      <Trash2 className="h-4 w-4" />
                    </Button>
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
