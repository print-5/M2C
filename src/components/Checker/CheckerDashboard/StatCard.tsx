import type { LucideIcon } from "lucide-react"

interface StatCardProps {
  label: string
  value: string
  icon: LucideIcon
  trend: string
  color: "blue" | "amber" | "emerald" | "red"
}

export default function StatCard({ label, value, icon: Icon, trend, color }: StatCardProps) {
  const colorClasses = {
    blue: {
      bg: "bg-gradient-to-br from-blue-50 to-blue-100/50",
      border: "border-blue-200/60",
      iconBg: "bg-blue-500",
      iconText: "text-white",
      valueText: "text-blue-900",
      trendText: "text-blue-700",
    },
    amber: {
      bg: "bg-gradient-to-br from-amber-50 to-amber-100/50",
      border: "border-amber-200/60",
      iconBg: "bg-amber-500",
      iconText: "text-white",
      valueText: "text-amber-900",
      trendText: "text-amber-700",
    },
    emerald: {
      bg: "bg-gradient-to-br from-emerald-50 to-emerald-100/50",
      border: "border-emerald-200/60",
      iconBg: "bg-emerald-500",
      iconText: "text-white",
      valueText: "text-emerald-900",
      trendText: "text-emerald-700",
    },
    red: {
      bg: "bg-gradient-to-br from-red-50 to-red-100/50",
      border: "border-red-200/60",
      iconBg: "bg-red-500",
      iconText: "text-white",
      valueText: "text-red-900",
      trendText: "text-red-700",
    },
  }

  const colors = colorClasses[color]

  return (
    <div className={`${colors.bg} ${colors.border} border rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <p className="text-slate-600 text-sm font-medium mb-2">{label}</p>
          <p className={`text-3xl font-bold ${colors.valueText} mb-1`}>{value}</p>
        </div>
        <div className={`${colors.iconBg} p-3 rounded-xl shadow-sm`}>
          <Icon className={`w-6 h-6 ${colors.iconText}`} />
        </div>
      </div>
      <p className={`${colors.trendText} text-sm font-medium`}>{trend}</p>
    </div>
  )
}
