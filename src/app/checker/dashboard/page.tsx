"use client"

import { useState, useEffect } from "react"
import Dashboard from "@/components/Checker/Dashboard/Dashboard"
import Footer from "@/components/Checker/Footer/Footer"

export default function DashboardPage() {
  const [checkerID, setCheckerID] = useState("")

  useEffect(() => {
    const storedCheckerID = localStorage.getItem('checkerID')
    if (storedCheckerID) {
      setCheckerID(storedCheckerID)
    }
  }, [])

  if (!checkerID) {
    return (
      <div className="p-8 flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <>
    <Dashboard 
      checkerID={checkerID}
      onSelectVendor={(vendor) => {
        console.log("Selected vendor:", vendor)
      }}
    />
    
    </>
  )
}
