'use client'

import { Button } from '@/components/UI/Button'
import { Download, Filter } from 'lucide-react'

export default function OrdersActions() {
  return (
    <div className="flex justify-end space-x-2">
      <Button variant="outline">
        <Filter className="h-4 w-4 mr-2" />
        Filter
      </Button>
      <Button>
        <Download className="h-4 w-4 mr-2" />
        Export
      </Button>
    </div>
  )
}
