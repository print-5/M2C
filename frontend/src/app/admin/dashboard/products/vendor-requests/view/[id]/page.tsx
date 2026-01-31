'use client'

import { use } from 'react'
import VendorProductRequestView from '@/components/AdminDashboard/Products/VendorProductRequestView'

export default function VendorProductRequestViewPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  return <VendorProductRequestView requestId={id} />
}