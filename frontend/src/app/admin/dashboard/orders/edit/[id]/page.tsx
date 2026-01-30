import OrderEdit from '@/components/AdminDashboard/Orders/OrderEdit'

interface EditOrderPageProps {
  params: {
    id: string
  }
}

export default function EditOrderPage({ params }: EditOrderPageProps) {
  return <OrderEdit orderId={params.id} />
}