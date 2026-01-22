'use client'

import { Button } from '@/components/UI/Button'
import { Plus, Image } from 'lucide-react'

export default function CMSActions() {
  return (
    <div className="flex justify-end space-x-2">
      <Button variant="outline">
        <Image className="h-4 w-4 mr-2" />
        Media Library
      </Button>
      <Button>
        <Plus className="h-4 w-4 mr-2" />
        Create Content
      </Button>
    </div>
  )
}
