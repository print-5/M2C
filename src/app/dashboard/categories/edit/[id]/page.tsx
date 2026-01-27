import { Breadcrumb } from '@/components/AdminDashboard/Breadcrumb/Breadcrumb'
import AddEditCategory from '@/components/AdminDashboard/Categories/AddEditCategory'

interface EditCategoryPageProps {
  params: {
    id: string
  }
}

export default function EditCategoryPage({ params }: EditCategoryPageProps) {
  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <Breadcrumb />
      
      {/* Edit Category Form */}
      <AddEditCategory categoryId={params.id} isEdit={true} />
    </div>
  )
}