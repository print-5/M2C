"use client"

import { useState } from "react"
import { TrendingUp, Clock, CheckCircle2, AlertCircle, BarChart3, Calendar, CalendarDays, MapPin, Factory, Eye, ArrowRight } from "lucide-react"
import StatCard from "@/components/Checker/CheckerDashboard/StatCard"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/UI/Table"
import ScheduledInspectionDetail from "@/components/Checker/CheckerDashboard/ScheduledInspectionDetail"
import InspectionForm from "@/components/Checker/Vendor/InspectionForm"
import { scheduledInspections, recentInspections } from "@/data/inspectionData"
import { ScheduledInspection, RecentInspection } from "@/types/inspection"

interface DashboardHomeProps {
  checkerID: string
  onSelectVendor: (vendor: string) => void
}

export default function DashboardHome({ checkerID }: DashboardHomeProps) {
  const [selectedInspection, setSelectedInspection] = useState<ScheduledInspection | null>(null)
  const [showInspectionDetail, setShowInspectionDetail] = useState(false)
  const [showInspectionForm, setShowInspectionForm] = useState(false)

  // Use imported recent inspections data

  const stats = [
    {
      label: "Total Inspections",
      value: "127",
      icon: TrendingUp,
      trend: "+12% this month",
      color: "blue" as const,
    },
    {
      label: "Pending Reports",
      value: "8",
      icon: Clock,
      trend: "Awaiting action",
      color: "amber" as const,
    },
    {
      label: "Passed",
      value: "118",
      icon: CheckCircle2,
      trend: "92.9% pass rate",
      color: "emerald" as const,
    },
    {
      label: "Failed",
      value: "9",
      icon: AlertCircle,
      trend: "7.1% failure rate",
      color: "red" as const,
    },
  ]

  const filteredScheduledInspections = scheduledInspections.slice(0, 5) // Show first 5

  const getStatusBadge = (status: string) => {
    const badgeClasses = {
      passed: "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 border border-emerald-200",
      failed: "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200",
      pending: "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800 border border-amber-200",
    }
    return badgeClasses[status as keyof typeof badgeClasses] || badgeClasses.pending
  }

  const getPriorityBadge = (priority: string) => {
    const badgeClasses = {
      high: "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200",
      medium: "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800 border border-amber-200",
      low: "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200",
    }
    return badgeClasses[priority as keyof typeof badgeClasses] || badgeClasses.medium
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)
    
    if (date.toDateString() === today.toDateString()) {
      return "Today"
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return "Tomorrow"
    } else {
      return date.toLocaleDateString('en-US', { 
        weekday: 'short', 
        month: 'short', 
        day: 'numeric' 
      })
    }
  }

  const handleViewDetails = (inspection: ScheduledInspection) => {
    setSelectedInspection(inspection)
    setShowInspectionDetail(true)
  }

  const handleStartInspection = (inspection: ScheduledInspection) => {
    setSelectedInspection(inspection)
    setShowInspectionForm(true)
    setShowInspectionDetail(false)
  }

  const handleBackToDashboard = () => {
    setShowInspectionDetail(false)
    setShowInspectionForm(false)
    setSelectedInspection(null)
  }

  const handleCompleteInspection = () => {
    setShowInspectionForm(false)
    setShowInspectionDetail(false)
    setSelectedInspection(null)
    // Here you could show a success message or redirect to reports
  }

  // Show inspection form if user started an inspection
  if (showInspectionForm && selectedInspection) {
    return (
      <InspectionForm
        vendorName={selectedInspection.vendor.name}
        onComplete={handleCompleteInspection}
      />
    )
  }

  // Show inspection detail if user clicked "View Details"
  if (showInspectionDetail && selectedInspection) {
    return (
      <ScheduledInspectionDetail
        inspection={selectedInspection}
        onBack={handleBackToDashboard}
        onStartInspection={handleStartInspection}
      />
    )
  }

  return (
    <div className="p-8 font-sans">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-slate-900 mb-2">Dashboard</h1>
              <p className="text-slate-600 text-lg">Welcome back, <span className="font-semibold text-blue-600">{checkerID}</span></p>
            </div>
            <div className="flex items-center gap-2 text-slate-500">
              <Calendar className="w-5 h-5" />
              <span className="text-sm font-medium">{new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</span>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
          {/* Scheduled Inspections */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 overflow-hidden">
            <div className="px-6 py-5 border-b border-slate-200/60 bg-linear-to-r from-blue-50 to-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <CalendarDays className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">Scheduled Inspections</h2>
                    <p className="text-sm text-slate-600">Upcoming quality control activities</p>
                  </div>
                </div>
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-1 rounded-full">
                  {filteredScheduledInspections.length} scheduled
                </span>
              </div>
            </div>
            
            <div className="p-6">
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {filteredScheduledInspections.map((inspection: ScheduledInspection) => (
                  <div key={inspection.id} className="border border-slate-200 rounded-xl p-4 hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="p-2 bg-blue-100 rounded-lg">
                            <Factory className="w-4 h-4 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-slate-900 text-sm">{inspection.vendor.name}</h3>
                            <p className="text-xs text-slate-600 font-mono bg-slate-50 px-2 py-1 rounded border inline-block mt-1">
                              {inspection.po}
                            </p>
                          </div>
                        </div>
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${getPriorityBadge(inspection.priority)}`}>
                          {inspection.priority.toUpperCase()}
                        </span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-slate-900">
                          {formatDate(inspection.scheduledDate)}
                        </div>
                        <div className="text-xs text-slate-600">{inspection.scheduledTime}</div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-600 mb-3">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        <span>{inspection.vendor.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Factory className="w-3 h-3" />
                        <span>{inspection.itemsCount} items</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{inspection.estimatedDuration}</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleViewDetails(inspection)}
                        className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium py-2 px-3 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm"
                      >
                        <Eye className="w-4 h-4" />
                        View Details
                      </button>
                      <button 
                        onClick={() => handleStartInspection(inspection)}
                        className="flex-1 bg-linear-to-r from-blue-600 to-blue-700 text-white font-semibold py-2 px-3 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-sm hover:shadow-md flex items-center justify-center gap-2 group text-sm"
                      >
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        Start
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Inspections */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 overflow-hidden">
            <div className="px-6 py-5 border-b border-slate-200/60 bg-linear-to-r from-slate-50 to-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-emerald-100 rounded-lg">
                    <BarChart3 className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">Recent Inspections</h2>
                    <p className="text-sm text-slate-600">Latest quality control activities</p>
                  </div>
                </div>
              </div>
            </div>
            
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Vendor</TableHead>
                  <TableHead>PO Number</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentInspections.map((inspection: RecentInspection) => (
                  <TableRow key={inspection.id}>
                    <TableCell className="font-medium text-slate-900">{inspection.vendor}</TableCell>
                    <TableCell>
                      <span className="font-mono text-sm text-blue-600 bg-blue-50 px-2 py-1 rounded-md border border-blue-200">
                        {inspection.po}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className={getStatusBadge(inspection.status)}>
                        {inspection.status.charAt(0).toUpperCase() + inspection.status.slice(1)}
                      </span>
                    </TableCell>
                    <TableCell className="text-slate-600 text-sm">{inspection.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
    </div>
  )
}