import AddEditVendor from '@/components/AdminDashboard/Vendors/AddEditVendor'

interface EditVendorPageProps {
  params: {
    id: string
  }
}

export default function EditVendorPage({ params }: EditVendorPageProps) {
  return <AddEditVendor vendorId={params.id} mode="edit" />
}