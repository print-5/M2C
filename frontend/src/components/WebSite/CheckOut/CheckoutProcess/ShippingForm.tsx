"use client"

import { CheckoutFormData } from "../Checkout"

interface ShippingFormProps {
  formData: CheckoutFormData
  updateFormData: (field: keyof CheckoutFormData, value: string | boolean) => void
}

export default function ShippingForm({ formData, updateFormData }: ShippingFormProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">First Name</label>
          <input
            type="text"
            value={formData.firstName}
            onChange={(e) => updateFormData("firstName", e.target.value)}
            className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
            placeholder="John"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Last Name</label>
          <input
            type="text"
            value={formData.lastName}
            onChange={(e) => updateFormData("lastName", e.target.value)}
            className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
            placeholder="Doe"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => updateFormData("email", e.target.value)}
          className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
          placeholder="john.doe@example.com"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">Phone Number</label>
        <input
          type="tel"
          value={formData.phone}
          onChange={(e) => updateFormData("phone", e.target.value)}
          className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
          placeholder="+1 (555) 123-4567"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">Address</label>
        <input
          type="text"
          value={formData.address}
          onChange={(e) => updateFormData("address", e.target.value)}
          className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
          placeholder="123 Main Street"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">City</label>
          <input
            type="text"
            value={formData.city}
            onChange={(e) => updateFormData("city", e.target.value)}
            className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
            placeholder="New York"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">State</label>
          <select
            value={formData.state}
            onChange={(e) => updateFormData("state", e.target.value)}
            className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
          >
            <option value="">Select State</option>
            <option value="NY">New York</option>
            <option value="CA">California</option>
            <option value="TX">Texas</option>
            <option value="FL">Florida</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">ZIP Code</label>
          <input
            type="text"
            value={formData.zipCode}
            onChange={(e) => updateFormData("zipCode", e.target.value)}
            className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
            placeholder="10001"
          />
        </div>
      </div>

      {/* Shipping Method */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-4">Shipping Method</label>
        <div className="space-y-3">
          {[
            { id: "standard", name: "Standard Shipping", time: "5-7 business days", price: "Free" },
            { id: "express", name: "Express Shipping", time: "2-3 business days", price: "$9.99" },
            { id: "overnight", name: "Overnight Shipping", time: "1 business day", price: "$24.99" }
          ].map((method) => (
            <label key={method.id} className="flex items-center p-4 border border-slate-300 rounded-xl cursor-pointer hover:bg-slate-50">
              <input
                type="radio"
                name="shippingMethod"
                value={method.id}
                checked={formData.shippingMethod === method.id}
                onChange={(e) => updateFormData("shippingMethod", e.target.value)}
                className="mr-3"
              />
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-slate-900">{method.name}</span>
                  <span className="font-semibold text-blue-600">{method.price}</span>
                </div>
                <p className="text-sm text-slate-600">{method.time}</p>
              </div>
            </label>
          ))}
        </div>
      </div>
    </div>
  )
}
