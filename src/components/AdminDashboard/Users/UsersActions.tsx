'use client'

import { Button } from '@/components/UI/Button'
import { UserPlus } from 'lucide-react'

export default function UsersActions() {
  return (
    <div className="flex justify-end">
      <Button>
        <UserPlus className="h-4 w-4 mr-2" />
        Add User
      </Button>
    </div>
  )
}
