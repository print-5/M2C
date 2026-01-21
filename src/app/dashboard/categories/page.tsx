import { Breadcrumb } from '@/components/AdminDashboard/Breadcrumb/Breadcrumb'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/UI/Card'
import { Button } from '@/components/UI/Button'
import { Plus } from 'lucide-react'

export default function CategoriesPage() {
  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <Breadcrumb />

      {/* Action Button */}
      <div className="flex justify-end">
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Category
        </Button>
      </div>

      {/* Categories Content */}
      <Card>
        <CardHeader>
          <CardTitle>Categories Management</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">Categories management interface will be implemented here...</p>
        </CardContent>
      </Card>
    </div>
  )
}