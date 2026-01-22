'use client'

import { Button } from '@/components/UI/Button'
import { Plus, Download } from 'lucide-react'

export default function BillingActions() {
  return (
    <div className="flex justify-end space-x-2">
      <Button variant="outline">
        <Download className="h-4 w-4 mr-2" />
        Export
      </Button>
      <Button>
        <Plus className="h-4 w-4 mr-2" />
        Create Invoice
      </Button>
    </div>
  )
}
