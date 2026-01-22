'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/UI/Card'

interface UsersStatsProps {
  totalUsers: number
  newThisMonth: number
  activeToday: number
}

export default function UsersStats({ totalUsers, newThisMonth, activeToday }: UsersStatsProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle>Total Users</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{totalUsers.toLocaleString()}</div>
          <p className="text-sm text-gray-600">Active platform users</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>New This Month</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{newThisMonth.toLocaleString()}</div>
          <p className="text-sm text-gray-600">+12% from last month</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Active Today</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{activeToday.toLocaleString()}</div>
          <p className="text-sm text-gray-600">Currently online</p>
        </CardContent>
      </Card>
    </div>
  )
}
