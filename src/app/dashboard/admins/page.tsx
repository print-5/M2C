import { Breadcrumb } from '@/components/AdminDashboard/Breadcrumb/Breadcrumb'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/UI/Card'
import { Button } from '@/components/UI/Button'
import { UserPlus } from 'lucide-react'

export default function AdminsPage() {
  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <Breadcrumb />

      {/* Action Button */}
      <div className="flex justify-end">
        <Button>
          <UserPlus className="h-4 w-4 mr-2" />
          Add Admin
        </Button>
      </div>

      {/* Admin Management Content */}
      <Card>
        <CardHeader>
          <CardTitle>Admin Management</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">Admin management interface will be implemented here...</p>
        </CardContent>
      </Card>
    </div>
  )
}