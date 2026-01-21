'use client'

import { useEffect, useState } from 'react'
import { Badge } from '@/components/UI/Badge'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'

interface QuickStatsProps {
  className?: string
}

export function QuickStats({ className = '' }: QuickStatsProps) {
  const [stats, setStats] = useState({
    activeUsers: 1247,
    pendingOrders: 23,
    systemLoad: 67,
  })
  const [mounted, setMounted] = useState(false)
  const [lastUpdate, setLastUpdate] = useState<string>('')

  // Fix hydration issues
  useEffect(() => {
    setMounted(true)
    setLastUpdate(new Date().toLocaleTimeString())
  }, [])

  // Simulate real-time updates
  useEffect(() => {
    if (!mounted) return

    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        activeUsers: prev.activeUsers + Math.floor(Math.random() * 10) - 5,
        pendingOrders: Math.max(0, prev.pendingOrders + Math.floor(Math.random() * 6) - 3),
        systemLoad: Math.min(100, Math.max(0, prev.systemLoad + Math.floor(Math.random() * 10) - 5)),
      }))
      setLastUpdate(new Date().toLocaleTimeString())
    }, 30000) // Update every 30 seconds

    return () => clearInterval(interval)
  }, [mounted])

  const getSystemLoadColor = (load: number) => {
    if (load < 50) return 'bg-green-100 text-green-800'
    if (load < 80) return 'bg-yellow-100 text-yellow-800'
    return 'bg-red-100 text-red-800'
  }

  const getTrendIcon = (value: number, threshold: number) => {
    if (value > threshold) return <TrendingUp className="h-3 w-3 text-green-500" />
    if (value < threshold) return <TrendingDown className="h-3 w-3 text-red-500" />
    return <Minus className="h-3 w-3 text-gray-500" />
  }

  // Prevent hydration mismatch by not rendering time-sensitive content on server
  if (!mounted) {
    return (
      <div className={`flex items-center space-x-4 text-sm ${className}`}>
        {/* Active Users */}
        <div className="flex items-center space-x-1">
          <span className="text-gray-600">Users:</span>
          <Badge variant="outline" className="bg-blue-50 text-blue-700">
            {stats.activeUsers.toLocaleString()}
          </Badge>
          {getTrendIcon(stats.activeUsers, 1200)}
        </div>

        {/* Pending Orders */}
        <div className="flex items-center space-x-1">
          <span className="text-gray-600">Pending:</span>
          <Badge variant="outline" className="bg-orange-50 text-orange-700">
            {stats.pendingOrders}
          </Badge>
        </div>

        {/* System Load */}
        <div className="flex items-center space-x-1">
          <span className="text-gray-600">Load:</span>
          <Badge className={getSystemLoadColor(stats.systemLoad)}>
            {stats.systemLoad}%
          </Badge>
        </div>

        {/* Last Update - placeholder during SSR */}
        <div className="text-xs text-gray-500">
          Loading...
        </div>
      </div>
    )
  }

  return (
    <div className={`flex items-center bg-white space-x-4 text-sm ${className}`}>
      {/* Active Users */}
      <div className="flex items-center space-x-1">
        <span className="text-gray-600">Users:</span>
        <Badge variant="outline" className="bg-blue-50 text-blue-700">
          {stats.activeUsers.toLocaleString()}
        </Badge>
        {getTrendIcon(stats.activeUsers, 1200)}
      </div>

      {/* Pending Orders */}
      <div className="flex items-center space-x-1">
        <span className="text-gray-600">Pending:</span>
        <Badge variant="outline" className="bg-orange-50 text-orange-700">
          {stats.pendingOrders}
        </Badge>
      </div>

      {/* System Load */}
      <div className="flex items-center space-x-1">
        <span className="text-gray-600">Load:</span>
        <Badge className={getSystemLoadColor(stats.systemLoad)}>
          {stats.systemLoad}%
        </Badge>
      </div>

      {/* Last Update */}
      <div className="text-xs text-gray-500">
        Updated {lastUpdate}
      </div>
    </div>
  )
}