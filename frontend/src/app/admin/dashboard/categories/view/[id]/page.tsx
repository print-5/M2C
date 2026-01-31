'use client'

import { use } from 'react'
import { Breadcrumb } from '@/components/AdminDashboard/Breadcrumb/Breadcrumb'
import ViewCategory from '@/components/AdminDashboard/Categories/ViewCategory'

interface ViewCategoryPageProps {
  params: Promise<{
    id: string
  }>
}

export default function ViewCategoryPage({ params }: ViewCategoryPageProps) {
  const { id } = use(params)

  return (
    <div className="space-y-6">
      <Breadcrumb />
      <ViewCategory categoryId={id} />
    </div>
  )
}