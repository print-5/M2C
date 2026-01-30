import AddEditInventory from '@/components/AdminDashboard/Inventory/AddEditInventory'

interface EditInventoryPageProps {
  params: {
    id: string
  }
}

export default function EditInventoryPage({ params }: EditInventoryPageProps) {
  return <AddEditInventory inventoryId={params.id} isEdit={true} />
}