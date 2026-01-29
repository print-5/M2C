"use client"

import { CheckCircle, ChevronDown } from "lucide-react"
import { useState, useRef, useEffect } from "react"

interface GeneralInformationProps {
  formData: {
    client: string
    vendor: string
    factory: string
    serviceLocation: string
    serviceStartDate: string
    serviceType: string
  }
  setFormData: (data: any) => void
}

export default function GeneralInformation({ formData, setFormData }: GeneralInformationProps) {
  const [showServiceTypeDropdown, setShowServiceTypeDropdown] = useState(false)
  const serviceTypeDropdownRef = useRef<HTMLDivElement>(null)

  const serviceTypes = [
    "Pre-Shipment Inspection",
    "During Production Inspection",
    "Pre-Production Inspection",
    "Container Loading Supervision",
    "Factory Audit",
    "Product Testing"
  ]

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (serviceTypeDropdownRef.current && !serviceTypeDropdownRef.current.contains(event.target as Node)) {
        setShowServiceTypeDropdown(false)
      }
    }

    if (showServiceTypeDropdown) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [showServiceTypeDropdown])
  return (
    <div className="space-y-8">
      <div className="border-b border-slate-200 pb-6">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">General Information</h2>
        <p className="text-slate-600">
          Basic information about the vendor, client, and service details
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-slate-700 font-semibold mb-3 text-sm">Client:</label>
          <input
            type="text"
            value={formData.client}
            onChange={(e) => setFormData({ ...formData, client: e.target.value })}
            placeholder="Enter client name"
            className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
          />
        </div>
        <div>
          <label className="block text-slate-700 font-semibold mb-3 text-sm">Vendor:</label>
          <input
            type="text"
            value={formData.vendor}
            onChange={(e) => setFormData({ ...formData, vendor: e.target.value })}
            className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
          />
        </div>
        <div>
          <label className="block text-slate-700 font-semibold mb-3 text-sm">Factory:</label>
          <input
            type="text"
            value={formData.factory}
            onChange={(e) => setFormData({ ...formData, factory: e.target.value })}
            placeholder="Enter factory name"
            className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
          />
        </div>
        <div>
          <label className="block text-slate-700 font-semibold mb-3 text-sm">Service Location:</label>
          <input
            type="text"
            value={formData.serviceLocation}
            onChange={(e) => setFormData({ ...formData, serviceLocation: e.target.value })}
            placeholder="Enter service location"
            className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
          />
        </div>
        <div>
          <label className="block text-slate-700 font-semibold mb-3 text-sm">Service Start Date:</label>
          <input
            type="date"
            value={formData.serviceStartDate}
            onChange={(e) => setFormData({ ...formData, serviceStartDate: e.target.value })}
            className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
          />
        </div>
        <div>
          <label className="block text-slate-700 font-semibold mb-3 text-sm">Service Type:</label>
          <div ref={serviceTypeDropdownRef} className="relative">
            <button
              onClick={() => setShowServiceTypeDropdown(!showServiceTypeDropdown)}
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white text-left flex items-center justify-between hover:border-slate-400"
            >
              <span className="text-slate-900">{formData.serviceType}</span>
              <ChevronDown className={`w-4 h-4 text-slate-600 transition-transform duration-200 ${showServiceTypeDropdown ? 'transform rotate-180' : ''}`} />
            </button>
            {showServiceTypeDropdown && (
              <div className="absolute z-10 w-full mt-2 bg-white border border-slate-300 rounded-xl shadow-lg">
                <div className="py-1 max-h-48 overflow-y-auto">
                  {serviceTypes.map((type) => (
                    <button
                      key={type}
                      onClick={() => {
                        setFormData({ ...formData, serviceType: type })
                        setShowServiceTypeDropdown(false)
                      }}
                      className={`block w-full px-4 py-3 text-sm text-left transition-colors duration-150 ${
                        formData.serviceType === type
                          ? 'bg-blue-50 text-blue-600 font-medium border-l-2 border-blue-600'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <CheckCircle className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold text-blue-900 mb-2">Information Note</h3>
            <p className="text-blue-800 text-sm">
              Please ensure all general information is accurate as it will be included in the final inspection report. 
              This information helps identify the service scope and parties involved in the quality control process.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}