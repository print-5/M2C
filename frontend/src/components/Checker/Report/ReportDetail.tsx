"use client"

import { useState } from "react"
import { ArrowLeft, Download, FileText, Calendar, Package, CheckCircle, XCircle, Clock, AlertTriangle } from "lucide-react"
import { Badge } from "@/components/UI/Badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/UI/Table"
import PDFPreviewModal from "./PDFPreviewModal"

interface ReportDetailProps {
  reportId: string
  onBack?: () => void
}

export default function ReportDetail({ reportId, onBack }: ReportDetailProps) {
  const [showPDFPreview, setShowPDFPreview] = useState(false)
  // Mock data - in real app, this would come from API based on reportId
  const reportData = {
    id: reportId,
    vendor: "Nav Nit Group of Textiles",
    po: "PO-2024-001",
    inspectionDate: "2024-01-08",
    result: "PASSED",
    cartons: 50,
    inspector: "John Smith",
    client: "Fashion Forward Inc.",
    factory: "Nav Nit Manufacturing Unit 1",
    serviceLocation: "Chennai, Tamil Nadu",
    serviceType: "Pre-Shipment Inspection",
    
    // Items inspected
    items: [
      {
        id: 1,
        itemName: "Cotton T-Shirt",
        itemDescription: "100% Cotton Round Neck T-Shirt - Various Colors",
        poQuantity: 2500,
        inspectedQuantity: 200,
        status: "PASSED"
      },
      {
        id: 2,
        itemName: "Denim Jeans",
        itemDescription: "Blue Denim Straight Fit Jeans - Size 28-42",
        poQuantity: 2500,
        inspectedQuantity: 200,
        status: "PASSED"
      }
    ],

    // Inspection results
    packaging: {
      shipperCartonQuality: ["pass"],
      retailPackagingQuality: ["pass"],
      internalProtection: ["pass"],
      labelingComplete: ["pass"]
    },

    measurements: [
      {
        sampleName: "S1",
        cartonLength: 45.0,
        cartonWidth: 30.0,
        cartonHeight: 25.0,
        productLength: 45.0,
        productWidth: 30.0,
        retailWeight: 0.5,
        cartonGrossWeight: 25.0,
        status: "PASSED"
      },
      {
        sampleName: "S2",
        cartonLength: 45.1,
        cartonWidth: 30.1,
        cartonHeight: 25.0,
        productLength: 45.1,
        productWidth: 30.1,
        retailWeight: 0.51,
        cartonGrossWeight: 25.2,
        status: "PASSED"
      }
    ],

    defects: {
      majorDefects: 0,
      minorDefects: 2,
      majorDefectDetails: "",
      minorDefectDetails: "Minor stitching irregularities on 2 samples"
    },

    testing: {
      dropTestResult: "pass",
      colorFastnessDry: "pass",
      colorFastnessWet: "pass",
      seamStrengthResult: "pass",
      smellCheck: "pass"
    }
  }

  const handleDownloadPDF = () => {
    setShowPDFPreview(true)
  }

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "passed":
      case "pass":
        return <CheckCircle className="w-4 h-4 text-emerald-600" />
      case "failed":
      case "fail":
        return <XCircle className="w-4 h-4 text-red-600" />
      case "pending":
        return <Clock className="w-4 h-4 text-amber-600" />
      default:
        return <AlertTriangle className="w-4 h-4 text-slate-600" />
    }
  }

  const getStatusBadge = (status: string) => {
    const config = {
      PASSED: { variant: "default" as const, className: "bg-emerald-100 text-emerald-800 border-emerald-200" },
      FAILED: { variant: "destructive" as const, className: "bg-red-100 text-red-800 border-red-200" },
      PENDING: { variant: "secondary" as const, className: "bg-amber-100 text-amber-800 border-amber-200" },
    }
    return config[status as keyof typeof config] || config.PENDING
  }

  const badgeConfig = getStatusBadge(reportData.result)

  return (
    <div className="p-8 max-w-7xl mx-auto font-sans">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {onBack && (
                <button 
                  onClick={onBack}
                  className="p-2 hover:bg-white rounded-lg transition-colors"
                >
                  <ArrowLeft className="w-5 h-5 text-slate-600" />
                </button>
              )}
              <div>
                <h1 className="text-4xl font-bold text-slate-900 mb-2">Inspection Report</h1>
                <p className="text-slate-600 text-lg">Report ID: {reportId}</p>
              </div>
            </div>
            <button 
              onClick={handleDownloadPDF}
              className="flex items-center gap-2 px-6 py-3 bg-linear-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              <Download className="w-4 h-4" />
              Preview & Download PDF
            </button>
          </div>
        </div>

        {/* Report Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200/60 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FileText className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">General Information</h2>
                <p className="text-sm text-slate-600">Basic inspection details</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-slate-600">Vendor</label>
                  <p className="text-slate-900 font-medium">{reportData.vendor}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-600">PO Number</label>
                  <p className="font-mono text-sm text-blue-600 bg-blue-50 px-2 py-1 rounded-md border border-blue-200 inline-block">
                    {reportData.po}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-600">Factory</label>
                  <p className="text-slate-900">{reportData.factory}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-slate-600">Client</label>
                  <p className="text-slate-900 font-medium">{reportData.client}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-600">Service Location</label>
                  <p className="text-slate-900">{reportData.serviceLocation}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-600">Inspector</label>
                  <p className="text-slate-900">{reportData.inspector}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-emerald-100 rounded-lg">
                <Calendar className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">Inspection Status</h2>
                <p className="text-sm text-slate-600">Overall result</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="text-center">
                <Badge 
                  variant={badgeConfig.variant}
                  className={`${badgeConfig.className} text-lg px-4 py-2`}
                >
                  {getStatusIcon(reportData.result)}
                  <span className="ml-2">{reportData.result}</span>
                </Badge>
              </div>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="bg-slate-50 rounded-lg p-3">
                  <p className="text-2xl font-bold text-slate-900">{reportData.cartons}</p>
                  <p className="text-sm text-slate-600">Cartons</p>
                </div>
                <div className="bg-slate-50 rounded-lg p-3">
                  <p className="text-2xl font-bold text-slate-900">{reportData.items.length}</p>
                  <p className="text-sm text-slate-600">Items</p>
                </div>
              </div>
              <div className="text-center">
                <p className="text-sm text-slate-600">Inspection Date</p>
                <p className="font-medium text-slate-900">{reportData.inspectionDate}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Items Inspected */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 p-6 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Package className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">Items Inspected</h2>
              <p className="text-sm text-slate-600">Product details and quantities</p>
            </div>
          </div>
          
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead>Item Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>PO Quantity</TableHead>
                <TableHead>Inspected</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reportData.items.map((item) => {
                const itemBadgeConfig = getStatusBadge(item.status)
                return (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.itemName}</TableCell>
                    <TableCell className="text-slate-600">{item.itemDescription}</TableCell>
                    <TableCell>{item.poQuantity.toLocaleString()}</TableCell>
                    <TableCell>{item.inspectedQuantity}</TableCell>
                    <TableCell>
                      <Badge variant={itemBadgeConfig.variant} className={itemBadgeConfig.className}>
                        {getStatusIcon(item.status)}
                        <span className="ml-1">{item.status}</span>
                      </Badge>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>

        {/* Inspection Results Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Packaging Results */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Packaging & Labeling</h3>
            <div className="space-y-3">
              {Object.entries(reportData.packaging).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <span className="text-slate-600 capitalize">{key.replace(/([A-Z])/g, (match) => ` ${match}`).trim()}</span>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(Array.isArray(value) ? value[0] : value)}
                    <span className="text-sm font-medium capitalize">
                      {Array.isArray(value) ? value.join(', ') : value}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Testing Results */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Quality Testing</h3>
            <div className="space-y-3">
              {Object.entries(reportData.testing).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <span className="text-slate-600 capitalize">{key.replace(/([A-Z])/g, (match) => ` ${match}`).trim()}</span>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(value)}
                    <span className="text-sm font-medium capitalize">{value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Measurements */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 p-6 mb-8">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Physical Measurements</h3>
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead>Sample</TableHead>
                <TableHead>Carton L/W/H (cm)</TableHead>
                <TableHead>Product L/W (cm)</TableHead>
                <TableHead>Retail Weight (kg)</TableHead>
                <TableHead>Gross Weight (kg)</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reportData.measurements.map((measurement, index) => {
                const measurementBadgeConfig = getStatusBadge(measurement.status)
                return (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{measurement.sampleName}</TableCell>
                    <TableCell>
                      {measurement.cartonLength} × {measurement.cartonWidth} × {measurement.cartonHeight}
                    </TableCell>
                    <TableCell>
                      {measurement.productLength} × {measurement.productWidth}
                    </TableCell>
                    <TableCell>{measurement.retailWeight}</TableCell>
                    <TableCell>{measurement.cartonGrossWeight}</TableCell>
                    <TableCell>
                      <Badge variant={measurementBadgeConfig.variant} className={measurementBadgeConfig.className}>
                        {getStatusIcon(measurement.status)}
                        <span className="ml-1">{measurement.status}</span>
                      </Badge>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>

        {/* Defects Summary */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 p-6">
          <h3 className="text-lg font-bold text-slate-900 mb-4">AQL Defects Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-200">
                <span className="font-medium text-red-800">Major Defects</span>
                <span className="text-2xl font-bold text-red-600">{reportData.defects.majorDefects}</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-amber-50 rounded-lg border border-amber-200">
                <span className="font-medium text-amber-800">Minor Defects</span>
                <span className="text-2xl font-bold text-amber-600">{reportData.defects.minorDefects}</span>
              </div>
            </div>
            <div className="space-y-4">
              {reportData.defects.minorDefectDetails && (
                <div>
                  <label className="text-sm font-medium text-slate-600">Minor Defect Details</label>
                  <p className="text-slate-900 bg-slate-50 p-3 rounded-lg">{reportData.defects.minorDefectDetails}</p>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* PDF Preview Modal */}
        <PDFPreviewModal
          isOpen={showPDFPreview}
          onClose={() => setShowPDFPreview(false)}
          reportData={reportData}
          reportId={reportId}
        />
    </div>
  )
}