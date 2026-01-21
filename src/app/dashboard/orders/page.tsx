import  OrdersTable  from '@/components/AdminDashboard/OrdersTable'
import { Breadcrumb } from '@/components/AdminDashboard/Breadcrumb/Breadcrumb'
import { Button } from '@/components/UI/Button'
import { Download, Filter } from 'lucide-react'

export default function OrdersPage() {
  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <Breadcrumb />

      {/* Action Buttons */}
      <div className="flex justify-end space-x-2">
        <Button variant="outline">
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </Button>
        <Button>
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
      </div>

      {/* Orders Table */}
      <OrdersTable />
    </div>
  )
}