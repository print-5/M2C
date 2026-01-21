"use client"

import type React from "react"

import { useState } from "react"
import { LogIn, Shield, CheckCircle } from "lucide-react"

interface LoginPageProps {
  onLogin: (checkerID: string) => void
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [checkerID, setCheckerID] = useState("")
  const [error, setError] = useState("")

  const mockCheckers = ["CHECKER_001", "CHECKER_002", "CHECKER_003", "CHECKER_004"]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!checkerID.trim()) {
      setError("Please enter your Checker ID")
      return
    }

    if (!mockCheckers.includes(checkerID.toUpperCase())) {
      setError("Invalid Checker ID. Try CHECKER_001 or CHECKER_002")
      return
    }

    onLogin(checkerID.toUpperCase())
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="bg-linear-to-r from-blue-600 to-blue-700 p-4 rounded-2xl shadow-lg">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 bg-emerald-500 p-1 rounded-full">
                <CheckCircle className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-3">QC Portal</h1>
          <p className="text-slate-600 text-lg">Pre-Shipment Inspection System</p>
          <div className="w-20 h-1 bg-linear-to-r from-blue-600 to-blue-700 rounded-full mx-auto mt-4"></div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl border border-slate-200/60 p-8 mb-6">
          <div className="mb-6">
            <label className="block text-slate-700 font-semibold mb-3 text-sm uppercase tracking-wide">Checker ID</label>
            <div className="relative">
              <input
                type="text"
                placeholder="Enter your Checker ID"
                value={checkerID}
                onChange={(e) => {
                  setCheckerID(e.target.value)
                  setError("")
                }}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-slate-900 placeholder-slate-400"
                autoFocus
              />
              <LogIn className="absolute right-3 top-3 w-5 h-5 text-slate-400" />
            </div>
            {error && (
              <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700 text-sm font-medium">{error}</p>
              </div>
            )}
          </div>

          <button 
            type="submit" 
            className="w-full bg-linear-to-r from-blue-600 to-blue-700 text-white font-semibold py-3 px-4 rounded-xl hover:from-blue-700 hover:to-blue-800 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Sign In to Portal
          </button>
        </form>

        {/* Demo Credentials */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
            <p className="font-semibold text-slate-700 text-sm">Demo Credentials Available</p>
          </div>
          <p className="text-slate-600 text-sm">Use: <span className="font-mono bg-white px-2 py-1 rounded border">CHECKER_001</span>, <span className="font-mono bg-white px-2 py-1 rounded border">CHECKER_002</span>, etc.</p>
        </div>
      </div>
    </div>
  )
}
