'use client'

import { useState } from 'react'
import { Download, Filter, Search, Calendar, DollarSign, CheckCircle, Clock, AlertCircle } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/UI/Table"

interface Payout {
  id: string
  amount: number
  status: 'completed' | 'pending' | 'failed'
  date: string
  bankAccount: string
  ordersCount: number
}

const payouts: Payout[] = [
  {
    id: 'PAY-001',
    amount: 15000,
    status: 'completed',
    date: '2024-01-20',
    bankAccount: '**** **** **** 1234',
    ordersCount: 45,
  },
  {
    id: 'PAY-002',
    amount: 12500,
    status: 'completed',
    date: '2024-01-13',
    bankAccount: '**** **** **** 1234',
    ordersCount: 38,
  },
  {
    id: 'PAY-003',
    amount: 8750,
    status: 'pending',
    date: '2024-01-06',
    bankAccount: '**** **** **** 1234',
    ordersCount: 25,
  },
  {
    id: 'PAY-004',
    amount: 20000,
    status: 'completed',
    date: '2023-12-30',
    bankAccount: '**** **** **** 1234',
    ordersCount: 58,
  },
  {
    id: 'PAY-005',
    amount: 5000,
    status: 'failed',
    date: '2023-12-23',
    bankAccount: '**** **** **** 1234',
    ordersCount: 15,
  },
]

export default function Payouts() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | 'completed' | 'pending' | 'failed'>('all')

  const filteredPayouts = payouts.filter(payout => {
    const matchesSearch = payout.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || payout.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-600" />
      case 'failed':
        return <AlertCircle className="w-5 h-5 text-red-600" />
      default:
        return null
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'failed':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const totalCompleted = payouts
    .filter(p => p.status === 'completed')
    .reduce((sum, p) => sum + p.amount, 0)

  const totalPending = payouts
    .filter(p => p.status === 'pending')
    .reduce((sum, p) => sum + p.amount, 0)

  return (
    <div className="space-y-6 font-sans">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Payouts</h1>
          <p className="text-sm text-gray-600 mt-1">View and manage your payout history</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-4 rounded-lg transition-all duration-200">
          <Download className="w-4 h-4" />
          Download Report
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Completed</p>
              <p className="text-2xl font-bold text-green-600">₹{totalCompleted.toLocaleString('en-IN')}</p>
            </div>
            <CheckCircle className="w-10 h-10 text-green-200" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Pending</p>
              <p className="text-2xl font-bold text-yellow-600">₹{totalPending.toLocaleString('en-IN')}</p>
            </div>
            <Clock className="w-10 h-10 text-yellow-200" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Payouts</p>
              <p className="text-2xl font-bold text-blue-600">{payouts.length}</p>
            </div>
            <DollarSign className="w-10 h-10 text-blue-200" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-4 flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by payout ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>

        <div className="flex gap-2">
          <Filter className="w-5 h-5 text-gray-600 self-center" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as any)}
            className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          >
            <option value="all">All Status</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
          </select>
        </div>
      </div>

      {/* Payouts Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="font-semibold text-gray-700 uppercase tracking-wider">
                Payout ID
              </TableHead>
              <TableHead className="font-semibold text-gray-700 uppercase tracking-wider">
                Amount
              </TableHead>
              <TableHead className="font-semibold text-gray-700 uppercase tracking-wider">
                Status
              </TableHead>
              <TableHead className="font-semibold text-gray-700 uppercase tracking-wider">
                Date
              </TableHead>
              <TableHead className="font-semibold text-gray-700 uppercase tracking-wider">
                Orders
              </TableHead>
              <TableHead className="font-semibold text-gray-700 uppercase tracking-wider">
                Bank Account
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPayouts.length > 0 ? (
              filteredPayouts.map((payout) => (
                <TableRow key={payout.id} className="hover:bg-gray-50">
                  <TableCell className="font-semibold text-gray-900">
                    {payout.id}
                  </TableCell>
                  <TableCell className="font-semibold text-gray-900">
                    ₹{payout.amount.toLocaleString('en-IN')}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(payout.status)}
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${getStatusBadge(payout.status)}`}>
                        {payout.status}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-600">
                    {new Date(payout.date).toLocaleDateString('en-IN')}
                  </TableCell>
                  <TableCell className="font-semibold text-gray-900">
                    {payout.ordersCount}
                  </TableCell>
                  <TableCell className="text-gray-600">
                    {payout.bankAccount}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-gray-500 py-12">
                  <p className="text-sm">No payouts found matching your filters</p>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          <span className="font-semibold">Note:</span> Payouts are processed every 7 days to your registered bank account. You will receive a confirmation email for each payout.
        </p>
      </div>
    </div>
  )
}
