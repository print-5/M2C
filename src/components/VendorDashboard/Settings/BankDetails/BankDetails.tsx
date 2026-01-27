'use client'

import { useState } from 'react'
import { Save, AlertCircle, CheckCircle, Eye, EyeOff } from 'lucide-react'

interface BankDetailsForm {
  accountHolderName: string
  bankName: string
  accountNumber: string
  ifscCode: string
  accountType: 'savings' | 'current'
  isVerified: boolean
}

export default function BankDetails() {
  const [showAccountNumber, setShowAccountNumber] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const [formData, setFormData] = useState<BankDetailsForm>({
    accountHolderName: 'John Doe',
    bankName: 'State Bank of India',
    accountNumber: '1234567890',
    ifscCode: 'SBIN0001234',
    accountType: 'savings',
    isVerified: true,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSaving(true)
    setMessage(null)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      setMessage({ type: 'success', text: 'Bank details updated successfully!' })
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to update bank details. Please try again.' })
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="space-y-6 font-sans">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Bank Details</h1>
          <p className="text-sm text-gray-600 mt-1">Manage your bank account information for payouts</p>
        </div>
      </div>

      {/* Alert Messages */}
      {message && (
        <div className={`flex items-start gap-3 p-4 rounded-lg ${
          message.type === 'success' 
            ? 'bg-green-50 border border-green-200' 
            : 'bg-red-50 border border-red-200'
        }`}>
          {message.type === 'success' ? (
            <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
          )}
          <p className={`text-sm font-medium ${
            message.type === 'success' ? 'text-green-800' : 'text-red-800'
          }`}>
            {message.text}
          </p>
        </div>
      )}

      {/* Verification Status */}
      {formData.isVerified && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
          <CheckCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-blue-900">Bank Account Verified</p>
            <p className="text-xs text-blue-700 mt-1">Your bank details have been verified and are active for payouts.</p>
          </div>
        </div>
      )}

      {/* Bank Details Form */}
      <form onSubmit={handleSubmit} className="space-y-6 bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Account Holder Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Account Holder Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="accountHolderName"
              value={formData.accountHolderName}
              onChange={handleChange}
              placeholder="Enter full name"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              required
            />
          </div>

          {/* Bank Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Bank Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="bankName"
              value={formData.bankName}
              onChange={handleChange}
              placeholder="Enter bank name"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              required
            />
          </div>

          {/* Account Number */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Account Number <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type={showAccountNumber ? 'text' : 'password'}
                name="accountNumber"
                value={formData.accountNumber}
                onChange={handleChange}
                placeholder="Enter account number"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowAccountNumber(!showAccountNumber)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showAccountNumber ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* IFSC Code */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              IFSC Code <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="ifscCode"
              value={formData.ifscCode}
              onChange={handleChange}
              placeholder="Enter IFSC code"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition uppercase"
              required
            />
          </div>

          {/* Account Type */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Account Type <span className="text-red-500">*</span>
            </label>
            <select
              name="accountType"
              value={formData.accountType}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              required
            >
              <option value="savings">Savings Account</option>
              <option value="current">Current Account</option>
            </select>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex gap-3 pt-4 border-t">
          <button
            type="submit"
            disabled={isSaving}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-2.5 px-6 rounded-lg transition-all duration-200 transform hover:scale-105"
          >
            <Save className="w-4 h-4" />
            {isSaving ? 'Saving...' : 'Save Bank Details'}
          </button>
        </div>
      </form>

      {/* Important Notice */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <p className="text-sm text-yellow-800">
          <span className="font-semibold">Note:</span> Ensure that the account holder name matches your business registration. Payouts will be sent to this account only.
        </p>
      </div>
      <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">KYC Documents</h1>
        <div className="flex items-center space-x-2">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            Pending Verification
          </span>
        </div>
      </div>
      
      {/* KYC Status */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Verification Status</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
              <span className="font-medium">Identity Document</span>
            </div>
            <span className="text-green-600 font-medium">Verified</span>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-yellow-500 rounded-full mr-3"></div>
              <span className="font-medium">Business License</span>
            </div>
            <span className="text-yellow-600 font-medium">Under Review</span>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-lg">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-gray-400 rounded-full mr-3"></div>
              <span className="font-medium">Tax Certificate</span>
            </div>
            <span className="text-gray-600 font-medium">Not Submitted</span>
          </div>
        </div>
      </div>

      {/* Upload Documents */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Upload Documents</h2>
        
        <div className="space-y-6">
          {/* Identity Document */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Identity Document (Passport/Driver's License)
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <div className="space-y-2">
                <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                  <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div className="text-sm text-gray-600">
                  <button className="font-medium text-blue-600 hover:text-blue-500">Upload a file</button>
                  <span> or drag and drop</span>
                </div>
                <p className="text-xs text-gray-500">PNG, JPG, PDF up to 10MB</p>
              </div>
            </div>
          </div>

          {/* Business License */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Business License
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <div className="space-y-2">
                <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                  <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div className="text-sm text-gray-600">
                  <button className="font-medium text-blue-600 hover:text-blue-500">Upload a file</button>
                  <span> or drag and drop</span>
                </div>
                <p className="text-xs text-gray-500">PNG, JPG, PDF up to 10MB</p>
              </div>
            </div>
          </div>

          {/* Tax Certificate */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tax Certificate
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <div className="space-y-2">
                <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                  <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div className="text-sm text-gray-600">
                  <button className="font-medium text-blue-600 hover:text-blue-500">Upload a file</button>
                  <span> or drag and drop</span>
                </div>
                <p className="text-xs text-gray-500">PNG, JPG, PDF up to 10MB</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
            Submit Documents
          </button>
        </div>
      </div>
    </div>
    </div>
  )
}
