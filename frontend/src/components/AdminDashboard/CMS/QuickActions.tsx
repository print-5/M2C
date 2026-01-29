'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/UI/Card'
import { Button } from '@/components/UI/Button'
import { FileText, Image, Globe } from 'lucide-react'

export default function QuickActions() {
  return (
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
  )
}
