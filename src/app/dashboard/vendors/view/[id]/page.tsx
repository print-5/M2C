import VendorView from '@/components/AdminDashboard/Vendors/VendorView'

interface ViewVendorPageProps {
  params: {
    id: string
  }
}

export default function ViewVendorPage({ params }: ViewVendorPageProps) {
  return <VendorView vendorId={params.id} />
}