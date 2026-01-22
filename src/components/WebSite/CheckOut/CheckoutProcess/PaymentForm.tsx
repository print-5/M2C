"use client"

import { Shield, Smartphone } from "lucide-react"
import { CheckoutFormData } from "../Checkout"

interface PaymentFormProps {
  formData: CheckoutFormData
  updateFormData: (field: keyof CheckoutFormData, value: string | boolean) => void
}

export default function PaymentForm({ formData, updateFormData }: PaymentFormProps) {
  return (
    <div className="space-y-6">
      {/* Payment Method Selection */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-4">Payment Method</label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all"
            style={{
              borderColor: formData.paymentMethod === "card" ? "#8b2626" : "#cbd5e1",
              backgroundColor: formData.paymentMethod === "card" ? "#fef2f2" : "#f8fafc"
            }}>
            <input
              type="radio"
              name="paymentMethod"
              value="card"
              checked={formData.paymentMethod === "card"}
              onChange={(e) => updateFormData("paymentMethod", e.target.value)}
              className="mr-3"
            />
            <div>
              <span className="font-medium text-slate-900">Credit/Debit Card</span>
              <p className="text-xs text-slate-600">Visa, Mastercard, etc.</p>
            </div>
          </label>

          <label className="flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all"
            style={{
              borderColor: formData.paymentMethod === "upi" ? "#8b2626" : "#cbd5e1",
              backgroundColor: formData.paymentMethod === "upi" ? "#fef2f2" : "#f8fafc"
            }}>
            <input
              type="radio"
              name="paymentMethod"
              value="upi"
              checked={formData.paymentMethod === "upi"}
              onChange={(e) => updateFormData("paymentMethod", e.target.value)}
              className="mr-3"
            />
            <div className="flex items-center gap-2">
              <Smartphone className="w-4 h-4" />
              <div>
                <span className="font-medium text-slate-900">UPI</span>
                <p className="text-xs text-slate-600">Google Pay, PhonePe, etc.</p>
              </div>
            </div>
          </label>
        </div>
      </div>

      {/* Card Payment Form */}
      {formData.paymentMethod === "card" && (
        <>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Card Number</label>
            <input
              type="text"
              value={formData.cardNumber}
              onChange={(e) => updateFormData("cardNumber", e.target.value)}
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
              placeholder="1234 5678 9012 3456"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Expiry Date</label>
              <input
                type="text"
                value={formData.expiryDate}
                onChange={(e) => updateFormData("expiryDate", e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
                placeholder="MM/YY"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">CVV</label>
              <input
                type="text"
                value={formData.cvv}
                onChange={(e) => updateFormData("cvv", e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
                placeholder="123"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Cardholder Name</label>
            <input
              type="text"
              value={formData.cardName}
              onChange={(e) => updateFormData("cardName", e.target.value)}
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
              placeholder="John Doe"
            />
          </div>
        </>
      )}

      {/* UPI Payment Form */}
      {formData.paymentMethod === "upi" && (
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">UPI ID</label>
          <input
            type="text"
            value={formData.upiId}
            onChange={(e) => updateFormData("upiId", e.target.value)}
            className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
            placeholder="yourname@bankname"
          />
          <p className="text-xs text-slate-600 mt-2">Enter your UPI ID (e.g., name@upi or phone@bankname)</p>
        </div>
      )}

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="saveInfo"
          checked={formData.saveInfo}
          onChange={(e) => updateFormData("saveInfo", e.target.checked)}
          className="rounded border-slate-300"
        />
        <label htmlFor="saveInfo" className="text-sm text-slate-700">
          Save payment information for future purchases
        </label>
      </div>

      {/* Security Notice */}
      <div className="bg-green-50 border border-green-200 rounded-xl p-4">
        <div className="flex items-center gap-3">
          <Shield className="w-5 h-5 text-green-600" />
          <div>
            <h4 className="font-medium text-green-900">Secure Payment</h4>
            <p className="text-sm text-green-700">Your payment information is encrypted and secure</p>
          </div>
        </div>
      </div>
    </div>
  )
}
