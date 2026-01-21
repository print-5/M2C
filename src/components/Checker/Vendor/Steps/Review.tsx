"use client"

import { CheckCircle, AlertTriangle } from "lucide-react"

interface ReviewProps {
  formData: {
    // General Information
    client: string
    vendor: string
    factory: string
    serviceLocation: string
    serviceStartDate: string
    serviceType: string
    // Order Information
    poNumber: string
    items: Array<{
      id: number
      itemName: string
      itemDescription: string
      poQuantity: number
      bookedInspectionQuantity: number
      status: string
    }>
    packedQuantity: number
    cartonCount: number
    // Packaging Remarks
    shipperCartonRemark: string
    innerCartonRemark: string
    retailPackagingRemark: string
    productTypeRemark: string
    aqlWorkmanshipRemark: string
    onSiteTestsRemark: string
    // Quality Metrics
    criticalDefects: number
    majorDefects: number
    minorDefects: number
    maxAllowedCritical: number
    maxAllowedMajor: number
    maxAllowedMinor: number
    // Packaging Results
    shipperCartonQuality: string[]
    innerCartonPackaging: string[]
    retailPackagingQuality: string[]
    productTypeConformity: string[]
    aqlWorkmanship: string[]
    onSiteTests: string[]
  }
}

export default function Review({ formData }: ReviewProps) {
  const getStatusColor = (status: string) => {
    const colors = {
      "Pending": "bg-amber-100 text-amber-800 border-amber-200",
      "Ready": "bg-emerald-100 text-emerald-800 border-emerald-200",
      "In Progress": "bg-blue-100 text-blue-800 border-blue-200",
      "Completed": "bg-slate-100 text-slate-800 border-slate-200",
    }
    return colors[status as keyof typeof colors] || colors["Pending"]
  }

  // Collect all remark codes
  const getAllRemarkCodes = (): string[] => {
    const remarkCodes: string[] = []
    if (formData.shipperCartonRemark) remarkCodes.push(...formData.shipperCartonRemark.split(',').map(r => r.trim()))
    if (formData.innerCartonRemark) remarkCodes.push(...formData.innerCartonRemark.split(',').map(r => r.trim()))
    if (formData.retailPackagingRemark) remarkCodes.push(...formData.retailPackagingRemark.split(',').map(r => r.trim()))
    if (formData.productTypeRemark) remarkCodes.push(...formData.productTypeRemark.split(',').map(r => r.trim()))
    if (formData.aqlWorkmanshipRemark) remarkCodes.push(...formData.aqlWorkmanshipRemark.split(',').map(r => r.trim()))
    if (formData.onSiteTestsRemark) remarkCodes.push(...formData.onSiteTestsRemark.split(',').map(r => r.trim()))
    // Remove duplicates and sort
    return [...new Set(remarkCodes)].sort((a, b) => parseInt(a) - parseInt(b))
  }

  // Calculate overall result based on PDF format
  const calculateOverallResult = () => {
    const hasFail = 
      formData.shipperCartonQuality.includes('fail') ||
      formData.innerCartonPackaging.includes('fail') ||
      formData.retailPackagingQuality.includes('fail') ||
      formData.productTypeConformity.includes('fail') ||
      formData.aqlWorkmanship.includes('fail') ||
      formData.onSiteTests.includes('fail') ||
      formData.criticalDefects > formData.maxAllowedCritical ||
      formData.majorDefects > formData.maxAllowedMajor ||
      formData.minorDefects > formData.maxAllowedMinor

    const hasPending = 
      formData.shipperCartonQuality.includes('pending') ||
      formData.innerCartonPackaging.includes('pending') ||
      formData.retailPackagingQuality.includes('pending') ||
      formData.productTypeConformity.includes('pending') ||
      formData.aqlWorkmanship.includes('pending') ||
      formData.onSiteTests.includes('pending')

    const remarkCodes = getAllRemarkCodes()

    if (hasFail) {
      return { status: 'FAIL', remarkCodes: remarkCodes }
    } else if (hasPending || remarkCodes.length > 0) {
      return { status: 'PENDING', remarkCodes: remarkCodes }
    } else {
      return { status: 'PASS', remarkCodes: [] }
    }
  }

  const overallResult = calculateOverallResult()

  return (
    <div className="space-y-8">
      <div className="border-b border-slate-200 pb-6">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Review & Submit Inspection Report</h2>
        <p className="text-slate-600">Final review of all inspection data before submission</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-50 rounded-xl p-6">
          <h3 className="text-slate-900 font-semibold mb-4 flex items-center gap-2">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            General Information
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between py-2 border-b border-slate-200">
              <span className="text-slate-600">Client:</span>
              <span className="text-slate-900 font-medium">{formData.client || "Not specified"}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-200">
              <span className="text-slate-600">Vendor:</span>
              <span className="text-slate-900 font-medium">{formData.vendor}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-200">
              <span className="text-slate-600">Factory:</span>
              <span className="text-slate-900 font-medium">{formData.factory || "Not specified"}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-200">
              <span className="text-slate-600">Service Location:</span>
              <span className="text-slate-900 font-medium">{formData.serviceLocation || "Not specified"}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-200">
              <span className="text-slate-600">Service Date:</span>
              <span className="text-slate-900 font-medium">{formData.serviceStartDate || "Not specified"}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-slate-600">Service Type:</span>
              <span className="text-slate-900 font-medium">{formData.serviceType}</span>
            </div>
          </div>
        </div>

        <div className="bg-slate-50 rounded-xl p-6">
          <h3 className="text-slate-900 font-semibold mb-4 flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            Order Information
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between py-2 border-b border-slate-200">
              <span className="text-slate-600">PO Number:</span>
              <span className="font-mono text-slate-900 font-medium">{formData.poNumber}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-200">
              <span className="text-slate-600">Total Items:</span>
              <span className="text-slate-900">{formData.items.length}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-200">
              <span className="text-slate-600">Total Quantity:</span>
              <span className="text-slate-900">{formData.packedQuantity} units</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-slate-600">Cartons:</span>
              <span className="text-slate-900">{formData.cartonCount} cartons</span>
            </div>
          </div>
        </div>
      </div>

      {/* Items Details */}
      {formData.items.length > 0 && (
        <div className="bg-slate-50 rounded-xl p-6">
          <h3 className="text-slate-900 font-semibold mb-4 flex items-center gap-2">
            <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
            Order Items Details
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-300">
                  <th className="text-left py-3 px-3 font-semibold text-slate-700">Item</th>
                  <th className="text-left py-3 px-3 font-semibold text-slate-700">Description</th>
                  <th className="text-left py-3 px-3 font-semibold text-slate-700">PO Qty</th>
                  <th className="text-left py-3 px-3 font-semibold text-slate-700">Inspection Qty</th>
                  <th className="text-left py-3 px-3 font-semibold text-slate-700">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {formData.items.map((item, index) => (
                  <tr key={item.id}>
                    <td className="py-3 px-3 text-slate-900 font-medium">{item.itemName}</td>
                    <td className="py-3 px-3 text-slate-600">{item.itemDescription}</td>
                    <td className="py-3 px-3 text-slate-900">{item.poQuantity}</td>
                    <td className="py-3 px-3 text-slate-900">{item.bookedInspectionQuantity}</td>
                    <td className="py-3 px-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(item.status)}`}>
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Inspection Result Summary */}
      <div className="bg-white rounded-xl p-6 border-2 border-slate-300">
        <h3 className="text-lg font-bold text-slate-900 mb-4">C. Inspection Result Summary</h3>
        <div className="space-y-3 mb-6">
          <div className="flex items-center justify-between py-2 border-b border-slate-200">
            <span className="text-slate-700">1. Shipper Carton Packaging</span>
            <span className="font-medium">
              {formData.shipperCartonQuality.includes('pass') ? '☑Pass' : 
               formData.shipperCartonQuality.includes('fail') ? '☑Fail' :
               formData.shipperCartonQuality.includes('pending') ? '☑Pending' : '☑N/A'}
            </span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-slate-200">
            <span className="text-slate-700">2. Inner Carton Packaging</span>
            <span className="font-medium">
              {formData.innerCartonPackaging.includes('pass') ? '☑Pass' : 
               formData.innerCartonPackaging.includes('fail') ? '☑Fail' :
               formData.innerCartonPackaging.includes('pending') ? '☑Pending' : '☑N/A'}
            </span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-slate-200">
            <span className="text-slate-700">3. Retail Packaging</span>
            <span className="font-medium">
              {formData.retailPackagingQuality.includes('pass') ? '☑Pass' : 
               formData.retailPackagingQuality.includes('fail') ? '☑Fail' :
               formData.retailPackagingQuality.includes('pending') ? '☑Pending' : '☑N/A'}
            </span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-slate-200">
            <span className="text-slate-700">4. Product Type (style, size, color, construction, material, marking, labeling)</span>
            <div className="flex items-center gap-2">
              <span className="font-medium">
                {formData.productTypeConformity.includes('pass') ? '☑Pass' : 
                 formData.productTypeConformity.includes('fail') ? '☑Fail' :
                 formData.productTypeConformity.includes('pending') ? '☑Pending' : '☑N/A'}
              </span>
              {formData.productTypeRemark && (
                <span className="text-sm text-blue-600">Remark: {formData.productTypeRemark}</span>
              )}
            </div>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-slate-200">
            <span className="text-slate-700">5. AQL (Workmanship / Appearance / Function)</span>
            <div className="flex items-center gap-2">
              <span className="font-medium">
                {formData.aqlWorkmanship.includes('pass') ? '☑Pass' : 
                 formData.aqlWorkmanship.includes('fail') ? '☑Fail' :
                 formData.aqlWorkmanship.includes('pending') ? '☑Pending' : '☑N/A'}
              </span>
              {formData.aqlWorkmanshipRemark && (
                <span className="text-sm text-blue-600">Remark: {formData.aqlWorkmanshipRemark}</span>
              )}
            </div>
          </div>
          <div className="flex items-center justify-between py-2">
            <span className="text-slate-700">6. On-site Tests</span>
            <div className="flex items-center gap-2">
              <span className="font-medium">
                {formData.onSiteTests.includes('pass') ? '☑Pass' : 
                 formData.onSiteTests.includes('fail') ? '☑Fail' :
                 formData.onSiteTests.includes('pending') ? '☑Pending' : '☑N/A'}
              </span>
              {formData.onSiteTestsRemark && (
                <span className="text-sm text-blue-600">Remark: {formData.onSiteTestsRemark}</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Quality Metrics */}
      <div className="bg-slate-50 rounded-xl p-6">
        <h3 className="text-slate-900 font-semibold mb-4 flex items-center gap-2">
          <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
          Quality Metrics (AQL Summary)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-slate-900 mb-1">{formData.criticalDefects}/{formData.maxAllowedCritical}</div>
            <div className="text-slate-600 text-sm">Critical Defects</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-slate-900 mb-1">{formData.majorDefects}/{formData.maxAllowedMajor}</div>
            <div className="text-slate-600 text-sm">Major Defects</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-slate-900 mb-1">{formData.minorDefects}/{formData.maxAllowedMinor}</div>
            <div className="text-slate-600 text-sm">Minor Defects</div>
          </div>
          <div className="text-center">
            <div className={`text-2xl font-bold mb-1 ${
              formData.criticalDefects <= formData.maxAllowedCritical &&
              formData.majorDefects <= formData.maxAllowedMajor &&
              formData.minorDefects <= formData.maxAllowedMinor ? "text-emerald-600" : "text-red-600"
            }`}>
              {formData.criticalDefects <= formData.maxAllowedCritical &&
              formData.majorDefects <= formData.maxAllowedMajor &&
              formData.minorDefects <= formData.maxAllowedMinor ? "PASS" : "FAIL"}
            </div>
            <div className="text-slate-600 text-sm">AQL Result</div>
          </div>
        </div>
      </div>

      {/* Overall Result - Matching PDF Format */}
      <div className="bg-white rounded-xl p-6 border-2 border-slate-300">
        <h3 className="text-lg font-bold text-slate-900 mb-4">OVERALL RESULT:</h3>
        <div className="space-y-3">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="radio"
              name="overallResult"
              checked={overallResult.status === 'PASS'}
              readOnly
              className="w-5 h-5"
            />
            <span className="text-slate-700">( )PASS</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="radio"
              name="overallResult"
              checked={overallResult.status === 'FAIL'}
              readOnly
              className="w-5 h-5"
            />
            <span className="text-slate-700">( )FAIL</span>
            <div className="ml-4 flex items-center gap-2">
              <input type="checkbox" readOnly className="w-4 h-4" />
              <span className="text-sm text-slate-600">Beyond AQL</span>
            </div>
            <div className="ml-4 flex items-center gap-2">
              <input type="checkbox" readOnly className="w-4 h-4" />
              <span className="text-sm text-slate-600">Due to Remark:</span>
            </div>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="radio"
              name="overallResult"
              checked={overallResult.status === 'PENDING'}
              readOnly
              className="w-5 h-5"
            />
            <span className="text-slate-700 font-semibold">
              (X)PENDING, Due to Remark: {overallResult.remarkCodes.length > 0 ? overallResult.remarkCodes.join(',') : 'None'}
            </span>
          </label>
        </div>
      </div>

      {/* Final Status Display */}
      <div
        className={`p-6 rounded-xl text-center border-2 ${
          overallResult.status === 'PASS'
            ? "bg-emerald-50 border-emerald-200"
            : overallResult.status === 'FAIL'
            ? "bg-red-50 border-red-200"
            : "bg-amber-50 border-amber-200"
        }`}
      >
        <div className="flex items-center justify-center gap-3 mb-2">
          {overallResult.status === 'PASS' ? (
            <CheckCircle className="w-8 h-8 text-emerald-600" />
          ) : overallResult.status === 'FAIL' ? (
            <AlertTriangle className="w-8 h-8 text-red-600" />
          ) : (
            <AlertTriangle className="w-8 h-8 text-amber-600" />
          )}
          <p
            className={`font-bold text-2xl ${
              overallResult.status === 'PASS'
                ? "text-emerald-800"
                : overallResult.status === 'FAIL'
                ? "text-red-800"
                : "text-amber-800"
            }`}
          >
            {overallResult.status === 'PASS'
              ? "INSPECTION PASSED ✓"
              : overallResult.status === 'FAIL'
              ? "INSPECTION FAILED ✗"
              : "INSPECTION PENDING ⏳"}
          </p>
        </div>
        <p className="text-slate-600">
          {overallResult.status === 'PASS'
            ? "All quality standards met successfully"
            : overallResult.status === 'FAIL'
            ? "Quality standards not met - review required"
            : `Pending items require attention. Remark codes: ${overallResult.remarkCodes.join(', ') || 'None'}`}
        </p>
      </div>
    </div>
  )
}