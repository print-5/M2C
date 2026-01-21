'use client'

import { useParams } from 'next/navigation'
import AddEditVendor from '@/components/AdminDashboard/Vendors/AddEditVendor'
import { Breadcrumb } from '@/components/AdminDashboard/Breadcrumb/Breadcrumb'

export default function EditVendorPage() {
  const params = useParams()
  const vendorId = params.id as string

  return (
    <div className="space-y-6">
      <Breadcrumb />
      <AddEditVendor vendorId={vendorId} isEdit={true} />
    </div>
  )
}