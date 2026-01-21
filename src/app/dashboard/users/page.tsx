import { Breadcrumb } from '@/components/AdminDashboard/Breadcrumb/Breadcrumb'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/UI/Card'
import { Button } from '@/components/UI/Button'
import { Plus, UserPlus } from 'lucide-react'

export default function UsersPage() {
  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <Breadcrumb />

      {/* Action Button */}
      <div className="flex justify-end">
        <Button>
          <UserPlus className="h-4 w-4 mr-2" />
          Add User
        </Button>
      </div>

      {/* Users Content */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">8,945</div>
            <p className="text-sm text-gray-600">Active platform users</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>New This Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">1,234</div>
            <p className="text-sm text-gray-600">+12% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Active Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">2,456</div>
            <p className="text-sm text-gray-600">Currently online</p>
          </CardContent>
        </Card>
      </div>

      {/* Users Table Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle>Users Management</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">Users table will be implemented here...</p>
        </CardContent>
      </Card>
    </div>
  )
}