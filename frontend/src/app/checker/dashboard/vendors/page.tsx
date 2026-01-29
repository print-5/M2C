"use client"

import { useState } from "react"
import VendorList from "@/components/Checker/Vendor/VendorList"

export default function VendorsPage() {
  const [selectedVendor, setSelectedVendor] = useState<string | null>(null)

  return (
    <VendorList 
      selectedVendor={selectedVendor}
      onVendorSelect={setSelectedVendor}
    />
  )
}