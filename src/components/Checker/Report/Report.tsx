"use client"

import { Download, Eye, FileText, Filter } from "lucide-react"
import { useRouter } from "next/navigation"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/UI/Table"
import { Badge } from "@/components/UI/Badge"

export default function ReportsPage() {
  const router = useRouter()
  
  const reports = [
    {
      id: 1,
      vendor: "Nav Nit Group of Textiles",
      po: "PO-2024-001",
      inspectionDate: "2024-01-08",
      result: "PASSED",
      cartons: 50,
    },
    {
      id: 2,
      vendor: "Fabric Tech Industries",
      po: "PO-2024-002",
      inspectionDate: "2024-01-08",
      result: "PENDING",
      cartons: 75,
    },
    {
      id: 3,
      vendor: "Weave & Co",
      po: "PO-2024-003",
      inspectionDate: "2024-01-07",
      result: "FAILED",
      cartons: 100,
    },
    {
      id: 4,
      vendor: "Thread Masters",
      po: "PO-2024-004",
      inspectionDate: "2024-01-07",
      result: "PASSED",
      cartons: 60,
    },
  ]

  const getResultBadge = (result: string) => {
    const badgeConfig = {
      PASSED: { variant: "default" as const, className: "bg-emerald-100 text-emerald-800 border-emerald-200 hover:bg-emerald-200" },
      FAILED: { variant: "destructive" as const, className: "bg-red-100 text-red-800 border-red-200 hover:bg-red-200" },
      PENDING: { variant: "secondary" as const, className: "bg-amber-100 text-amber-800 border-amber-200 hover:bg-amber-200" },
    }
    return badgeConfig[result as keyof typeof badgeConfig] || badgeConfig.PENDING
  }

  return (
    <div className="p-8 font-sans">
      <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-slate-900 mb-2">Inspection Reports</h1>
              <p className="text-slate-600 text-lg">View and download generated quality control reports</p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 rounded-xl hover:bg-slate-50 transition-colors">
              <Filter className="w-4 h-4 text-slate-600" />
              <span className="text-slate-700 font-medium">Filter</span>
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-200/60 bg-linear-to-r from-slate-50 to-white">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FileText className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">Quality Control Reports</h2>
                <p className="text-sm text-slate-600">Complete inspection documentation</p>
              </div>
            </div>
          </div>
          
          <div className="p-6">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="font-semibold text-slate-700">Vendor</TableHead>
                  <TableHead className="font-semibold text-slate-700">PO Number</TableHead>
                  <TableHead className="font-semibold text-slate-700">Date</TableHead>
                  <TableHead className="font-semibold text-slate-700">Result</TableHead>
                  <TableHead className="font-semibold text-slate-700">Cartons</TableHead>
                  <TableHead className="font-semibold text-slate-700">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reports.map((report) => {
                  const badgeConfig = getResultBadge(report.result)
                  return (
                    <TableRow key={report.id} className="hover:bg-slate-50/50">
                      <TableCell>
                        <div className="font-medium text-slate-900">{report.vendor}</div>
                      </TableCell>
                      <TableCell>
                        <span className="font-mono text-sm text-blue-600 bg-blue-50 px-2 py-1 rounded-md border border-blue-200">
                          {report.po}
                        </span>
                      </TableCell>
                      <TableCell className="text-slate-600 text-sm">
                        {report.inspectionDate}
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant={badgeConfig.variant}
                          className={badgeConfig.className}
                        >
                          {report.result}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-slate-900 font-medium">
                        {report.cartons}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <button 
                            onClick={() => router.push(`/checker/dashboard/report/${report.id}`)}
                            className="p-2 hover:bg-blue-50 rounded-lg transition-colors group" 
                            title="View Report"
                          >
                            <Eye className="w-4 h-4 text-blue-600 group-hover:text-blue-700" />
                          </button>
                          <button 
                            className="p-2 hover:bg-emerald-50 rounded-lg transition-colors group" 
                            title="Download PDF"
                          >
                            <Download className="w-4 h-4 text-emerald-600 group-hover:text-emerald-700" />
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        </div>
    </div>
  )
}
