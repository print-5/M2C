'use client'

import { Button } from '@/components/UI/Button'
import { Plus } from 'lucide-react'

export default function CategoriesActions() {
  return (
    <div className="flex justify-end">
      <Button>
        <Plus className="h-4 w-4 mr-2" />
        Add Category
      </Button>
    </div>
  )
}
