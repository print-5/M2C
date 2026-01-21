import { Card, CardContent, CardHeader, CardTitle } from '@/components/UI/Card'
import { Badge } from '@/components/UI/Badge'
import { formatDate } from '@/lib/utils'

const activities = [
  {
    id: 1,
    type: 'vendor_registration',
    message: 'New vendor "TechStore Pro" registered',
    timestamp: new Date('2024-01-15T10:30:00'),
    status: 'pending',
  },
  {
    id: 2,
    type: 'product_approval',
    message: 'Product "iPhone 15 Pro" approved for vendor "ElectroHub"',
    timestamp: new Date('2024-01-15T09:45:00'),
    status: 'approved',
  },
  {
    id: 3,
    type: 'order_dispute',
    message: 'Order #12345 has a dispute from customer John Doe',
    timestamp: new Date('2024-01-15T08:20:00'),
    status: 'urgent',
  },
  {
    id: 4,
    type: 'vendor_suspension',
    message: 'Vendor "BadSeller" has been suspended for policy violation',
    timestamp: new Date('2024-01-14T16:15:00'),
    status: 'suspended',
  },
  {
    id: 5,
    type: 'category_update',
    message: 'New category "Smart Home" added to the platform',
    timestamp: new Date('2024-01-14T14:30:00'),
    status: 'completed',
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case 'pending':
      return 'bg-yellow-100 text-yellow-800'
    case 'approved':
      return 'bg-green-100 text-green-800'
    case 'urgent':
      return 'bg-red-100 text-red-800'
    case 'suspended':
      return 'bg-gray-100 text-gray-800'
    case 'completed':
      return 'bg-blue-100 text-blue-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

export default function RecentActivity() {
  return (
    <Card className='border-gray-400'>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
        {activities.map((activity) => (
          <Card key={activity.id} className={`border border-gray-200 shadow-sm hover:shadow-md transition-shadow ${getStatusColor(activity.status)}`}>
            <CardContent className="pt-6">
              <div className="flex items-start space-x-3">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">
                    {activity.message}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    {formatDate(activity.timestamp)}
                  </p>
                </div>
                <Badge className={getStatusColor(activity.status)}>
                  {activity.status}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      </CardContent>
    </Card>
  )
}