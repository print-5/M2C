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
import { Plus, Edit, Eye, Trash2, FileText, Image, Video, Globe } from 'lucide-react'
import { formatDate } from '@/lib/utils'

const contentItems = [
  {
    id: 1,
    title: 'Welcome to Our Marketplace',
    type: 'page',
    status: 'published',
    author: 'Admin',
    lastModified: new Date('2024-01-15'),
    views: 1250,
    slug: '/welcome',
  },
  {
    id: 2,
    title: 'How to Become a Vendor',
    type: 'article',
    status: 'published',
    author: 'Content Team',
    lastModified: new Date('2024-01-12'),
    views: 890,
    slug: '/guides/become-vendor',
  },
  {
    id: 3,
    title: 'Platform Terms & Conditions',
    type: 'page',
    status: 'draft',
    author: 'Legal Team',
    lastModified: new Date('2024-01-10'),
    views: 0,
    slug: '/terms-conditions',
  },
  {
    id: 4,
    title: 'Product Photography Guidelines',
    type: 'article',
    status: 'published',
    author: 'Marketing Team',
    lastModified: new Date('2024-01-08'),
    views: 567,
    slug: '/guides/photography',
  },
  {
    id: 5,
    title: 'Holiday Sale Banner',
    type: 'media',
    status: 'published',
    author: 'Design Team',
    lastModified: new Date('2024-01-05'),
    views: 2340,
    slug: '/media/holiday-banner',
  },
  {
    id: 6,
    title: 'Platform Introduction Video',
    type: 'media',
    status: 'published',
    author: 'Video Team',
    lastModified: new Date('2024-01-03'),
    views: 1890,
    slug: '/media/intro-video',
  },
]

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

export default function CMSPage() {
  const totalContent = contentItems.length
  const publishedContent = contentItems.filter(item => item.status === 'published').length
  const draftContent = contentItems.filter(item => item.status === 'draft').length
  const totalViews = contentItems.reduce((sum, item) => sum + item.views, 0)

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <Breadcrumb />

      {/* Action Buttons */}
      <div className="flex justify-end space-x-2">
        <Button variant="outline">
          <Image className="h-4 w-4 mr-2" />
          Media Library
        </Button>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create Content
        </Button>
      </div>

      {/* CMS Stats */}
      <div className="grid gap-6 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Content</CardTitle>
            <FileText className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalContent}</div>
            <p className="text-xs text-gray-600">All content items</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Published</CardTitle>
            <Globe className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{publishedContent}</div>
            <p className="text-xs text-gray-600">Live content</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Drafts</CardTitle>
            <Edit className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{draftContent}</div>
            <p className="text-xs text-gray-600">Work in progress</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <Eye className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalViews.toLocaleString()}</div>
            <p className="text-xs text-gray-600">Content engagement</p>
          </CardContent>
        </Card>
      </div>

      {/* Content Management Table */}
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
              {contentItems.map((item) => (
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
                      <Button variant="ghost" size="sm" className="text-red-600">
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

      {/* Quick Actions */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="h-5 w-5 mr-2" />
              Pages
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">Manage static pages like About, Contact, Terms, etc.</p>
            <Button variant="outline" className="w-full">
              Manage Pages
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Image className="h-5 w-5 mr-2" />
              Media Library
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">Upload and manage images, videos, and other media files.</p>
            <Button variant="outline" className="w-full">
              Open Media Library
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Globe className="h-5 w-5 mr-2" />
              SEO Settings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">Configure meta tags, sitemaps, and SEO optimization.</p>
            <Button variant="outline" className="w-full">
              SEO Settings
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}