"use client"

import { Calendar } from "lucide-react"
import { CheckoutFormData } from "../types"

interface ReviewOrderProps {
  formData: CheckoutFormData
}

export default function ReviewOrder({ formData }: ReviewOrderProps) {
  return (
    <div className="space-y-6">
      <div className="bg-slate-50 rounded-xl p-6">
        <h3 className="font-semibold text-slate-900 mb-4">Shipping Information</h3>
        <div className="text-sm text-slate-600 space-y-1">
          <p>{formData.firstName} {formData.lastName}</p>
          <p>{formData.address}</p>
          <p>{formData.city}, {formData.state} {formData.zipCode}</p>
          <p>{formData.email}</p>
          <p>{formData.phone}</p>
        </div>
      </div>

      <div className="bg-slate-50 rounded-xl p-6">
        <h3 className="font-semibold text-slate-900 mb-4">Payment Method</h3>
        <div className="text-sm text-slate-600">
          <p>**** **** **** {formData.cardNumber.slice(-4)}</p>
          <p>{formData.cardName}</p>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <div className="flex items-center gap-3">
          <Calendar className="w-5 h-5 text-blue-600" />
          <div>
            <h4 className="font-medium text-blue-900">Estimated Delivery</h4>
            <p className="text-sm text-blue-700">
              {formData.shippingMethod === "standard" && "January 20-22, 2024"}
              {formData.shippingMethod === "express" && "January 17-18, 2024"}
              {formData.shippingMethod === "overnight" && "January 16, 2024"}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
