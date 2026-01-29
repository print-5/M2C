'use client'

import { useState } from 'react'
import { Button } from '@/components/UI/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/UI/Card'
import { LoadingSpinner } from '@/components/UI/LoadingSpinner'
import { 
  X, 
  AlertTriangle, 
  User, 
  Building2,
  Mail,
  Ban
} from 'lucide-react'

interface VendorInfo {
  id: string
  companyName: string
  ownerName: string
  email: string
  status: string
}

interface SimpleSuspensionModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: (reason: string) => Promise<void>
  vendor: VendorInfo | null
  isLoading?: boolean
}

export default function SimpleSuspensionModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  vendor, 
  isLoading = false 
}: SimpleSuspensionModalProps) {
  const [reason, setReason] = useState('')

  const handleConfirm = async () => {
    if (reason.trim().length < 10) return
    await onConfirm(reason.trim())
    handleClose()
  }

  const handleClose = () => {
    if (!isLoading) {
      setReason('')
      onClose()
    }
  }

  const isReasonValid = reason.trim().length >= 10

  if (!isOpen || !vendor) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="border-b border-gray-200 bg-orange-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                <Ban className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <CardTitle className="text-lg text-orange-800">Suspend Vendor</CardTitle>
                <p className="text-sm text-orange-600 mt-1">
                  Provide a reason for suspension
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClose}
              disabled={isLoading}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          {/* Vendor Information */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                <Building2 className="w-5 h-5 text-gray-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{vendor.companyName}</h3>
                <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <User className="w-3 h-3" />
                    <span>{vendor.ownerName}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Mail className="w-3 h-3" />
                    <span>{vendor.email}</span>
                  </div>
                </div>
                <div className="mt-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Current Status: {vendor.status}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Reason Input */}
          <div className="space-y-3">
            <label htmlFor="reason" className="block text-sm font-medium text-gray-900">
              Reason for Suspension <span className="text-orange-500">*</span>
            </label>
            <textarea
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Please provide a detailed reason for suspending this vendor..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
              rows={4}
              disabled={isLoading}
            />
            <div className="flex items-center justify-between text-sm">
              <span className={`${reason.length < 10 ? 'text-orange-600' : 'text-green-600'}`}>
                {reason.length < 10 
                  ? `Minimum 10 characters required (${reason.length}/10)`
                  : `${reason.length} characters`
                }
              </span>
            </div>
          </div>

          {/* Warning */}
          <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
              <div>
                <h5 className="font-medium text-yellow-800">Important Notice</h5>
                <p className="text-sm text-yellow-700 mt-1">
                  This action will suspend the vendor's access to the platform. The vendor will be 
                  notified via email with your suspension reason.
                </p>
              </div>
            </div>
          </div>
        </CardContent>

        {/* Footer Actions */}
        <div className="border-t border-gray-200 p-4 bg-gray-50">
          <div className="flex items-center justify-end space-x-3">
            <Button
              variant="outline"
              onClick={handleClose}
              disabled={isLoading}
            >
              Cancel
            </Button>
            
            <Button
              onClick={handleConfirm}
              disabled={!isReasonValid || isLoading}
              className="bg-orange-600 text-white hover:bg-orange-700 disabled:bg-gray-300"
            >
              {isLoading ? (
                <>
                  <LoadingSpinner size="sm" />
                  <span className="ml-2">Suspending...</span>
                </>
              ) : (
                'Suspend Vendor'
              )}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}