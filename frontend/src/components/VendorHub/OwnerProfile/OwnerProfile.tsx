'use client';

import { useState } from 'react';
import { Button } from '@/components/UI/Button';
import Dropdown from '@/components/UI/Dropdown';
import { User, Calendar, Users, Mail, Phone } from 'lucide-react';

interface OwnerProfileProps {
  onNext: () => void;
  onPrev: () => void;
  onUpdateData: (data: any) => void;
  data: any;
}

const employeeRanges = [
  { id: '10-20', label: '10-20', description: 'Small team' },
  { id: '20-50', label: '20-50', description: 'Growing business' },
  { id: '50-100', label: '50-100', description: 'Medium enterprise' },
  { id: '100+', label: '100+', description: 'Large enterprise' }
];

export default function OwnerProfile({ onNext, onPrev, onUpdateData, data }: OwnerProfileProps) {
  const [formData, setFormData] = useState({
    ownerName: data.ownerName || '',
    ownerEmail: data.ownerEmail || '',
    ownerPhone: data.ownerPhone || '',
    yearEstablished: data.yearEstablished || '',
    employeeCount: data.employeeCount || ''
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    onUpdateData(formData);
    onNext();
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 50 }, (_, i) => currentYear - i);

  return (
    <div className="max-w-420 p-4 space-y-4 font-sans">
      {/* Header */}
          <div className="flex p-2 items-center gap-4 mb-4">
            <User className="w-12 h-12 text-gray-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Owner & Business Profile</h1>
              <p className="text-gray-600 mt-1">Tell us about the business owner and company history</p>
            </div>
          </div>

      {/* Owner Details */}
      <section className="bg-white max-w-2xl border border-gray-200 rounded-lg shadow-sm">
        <div className="px-6 py-4 ">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center">
            <User className="w-5 h-5 mr-2" />
            Owner Information
          </h2>
        </div>
        <div className="p-6 space-y-6 ">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Owner Full Name *
            </label>
            <input
              type="text"
              value={formData.ownerName}
              onChange={(e) => handleInputChange('ownerName', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter owner's full name"
            />
          </div>

          
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Owner Email *
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={formData.ownerEmail}
                  onChange={(e) => handleInputChange('ownerEmail', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="owner@company.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Owner Phone *
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="tel"
                  value={formData.ownerPhone}
                  onChange={(e) => handleInputChange('ownerPhone', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="+1 (555) 000-0000"
                />
              </div>
            </div>
        
        </div>
      </section>

      {/* Business History */}
      <section className="bg-white border border-gray-200 rounded-lg shadow-sm">
        <div className="px-6 py-4 ">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center">
            <Calendar className="w-5 h-5 mr-2" />
            Business History
          </h2>
        </div>
        <div className="p-6 max-w-2xl">
          <div>
            <Dropdown
              id="year-established"
              label="Year Business Established *"
              value={formData.yearEstablished}
              options={years}
              placeholder="Select year"
              onChange={(v) => handleInputChange('yearEstablished', v)}
            />
          </div>
        </div>
      </section>

      {/* Employee Count */}
      <section className="bg-white border border-gray-200 rounded-lg shadow-sm">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center">
            <Users className="w-5 h-5 mr-2" />
            Company Size
          </h2>
        </div>
        <div className="p-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-4">
              Number of Employees *
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {employeeRanges.map((range) => (
                <div
                  key={range.id}
                  onClick={() => handleInputChange('employeeCount', range.id)}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-colors text-center ${
                    formData.employeeCount === range.id
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="font-medium text-gray-900 text-lg">{range.label}</div>
                  <div className="text-sm text-gray-600">{range.description}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Business Experience */}
      <section className="bg-white border border-gray-200 rounded-lg shadow-sm">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Business Experience</h2>
        </div>
        <div className="p-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-blue-800 font-medium">Years in Business:</span>
              <span className="text-blue-900 font-semibold">
                {formData.yearEstablished ? currentYear - parseInt(formData.yearEstablished) : 0} years
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation */}
<div className="flex justify-between text-white ">
        <Button
          onClick={onPrev}
          className="px-8 font-bold bg-green-400 hover:bg-gray-300"
        >
          Previous
        </Button>
        <Button
          onClick={handleNext}
          className="bg-blue-600 hover:bg-blue-700 px-8 font-bold"
        >
          Continue
        </Button>
      </div>
    </div>
  );
}