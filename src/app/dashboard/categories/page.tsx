import { Breadcrumb } from '@/components/AdminDashboard/Breadcrumb/Breadcrumb'
import CategoriesTable from '@/components/AdminDashboard/Categories/CategoriesTable'
import CategoriesActions from '@/components/AdminDashboard/Categories/CategoriesActions'

export default function CategoriesPage() {
  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <Breadcrumb />

      {/* Action Button */}
      <CategoriesActions />

      {/* Categories Table */}
      <CategoriesTable />
    </div>
  )
}