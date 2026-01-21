import DashboardStats from '@/components/AdminDashboard/DashboardStats'
import RecentActivity from '@/components/AdminDashboard/RecentActivity'
import VendorsTable from '@/components/AdminDashboard/Vendors/VendorsTable'
import { Breadcrumb } from '@/components/AdminDashboard/Breadcrumb/Breadcrumb'

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <p className="text-xs uppercase tracking-[0.12em] text-red-700">Overview</p>
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-3xl font-bold text-red-800">Admin Dashboard</h1>
          <span className="px-3 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-700 border border-red-200">
            Live
          </span>
        </div>
        <p className="text-sm text-slate-600">
          Monitor platform performance, vendors, and activity at a glance.
        </p>
      </div>

      <div className="grid gap-6">
        {/* Stats Cards */}
        <DashboardStats />

        {/* Main Content Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Recent Activity */}
          <div className="lg:col-span-1">
            <RecentActivity />
          </div>

          {/* Vendors Table */}
          <div className="lg:col-span-2">
            <VendorsTable />
          </div>
        </div>
      </div>
    </div>
  )
}