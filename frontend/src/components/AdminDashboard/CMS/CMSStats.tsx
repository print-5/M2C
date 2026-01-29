'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/UI/Card'
import { FileText, Globe, Edit, Eye } from 'lucide-react'

interface CMSStatsProps {
  totalContent: number
  publishedContent: number
  draftContent: number
  totalViews: number
}

export default function CMSStats({
  totalContent,
  publishedContent,
  draftContent,
  totalViews,
}: CMSStatsProps) {
  return (
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
  )
}
