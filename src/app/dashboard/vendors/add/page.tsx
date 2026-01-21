import AddEditVendor from '@/components/AdminDashboard/Vendors/AddEditVendor'
import { Breadcrumb } from '@/components/AdminDashboard/Breadcrumb/Breadcrumb'

export default function AddVendorPage() {
  return (
    <div className="space-y-6">
      <Breadcrumb />
      <AddEditVendor />
    </div>
  )
}