'use client'

import { useParams } from 'next/navigation'
import AddEditProduct from '@/components/AdminDashboard/Products/AddEditProduct'
import { Breadcrumb } from '@/components/AdminDashboard/Breadcrumb/Breadcrumb'

export default function EditProductPage() {
  const params = useParams()
  const productId = params.id as string

  return (
    <div className="space-y-6">
      <Breadcrumb />
      <AddEditProduct productId={productId} isEdit={true} />
    </div>
  )
}