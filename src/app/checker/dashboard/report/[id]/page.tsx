"use client"

import { use } from "react"
import { useRouter } from "next/navigation"
import ReportDetail from "@/components/Checker/Report/ReportDetail"

interface ReportPageProps {
  params: Promise<{
    id: string
  }>
}

export default function ReportPage({ params }: ReportPageProps) {
  const router = useRouter()
  const { id } = use(params)

  const handleBack = () => {
    router.back()
  }

  return (
    <ReportDetail 
      reportId={id} 
      onBack={handleBack}
    />
  )
}