import { Breadcrumb } from '@/components/AdminDashboard/Breadcrumb/Breadcrumb'
import AddEditInventory from '@/components/AdminDashboard/Inventory/AddEditInventory'

export default function AddCategoryPage() {
  return (
    <div className="space-y-4">
      {/* Breadcrumb */}
      <Breadcrumb />
      
      {/* Add Category Form */}
      <AddEditInventory isEdit={false} />
    </div>
  )
}