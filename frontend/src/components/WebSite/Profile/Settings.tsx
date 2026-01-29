"use client"

import { useState } from 'react'
import { Settings, Globe, Moon, Sun, Monitor, Trash2, Download, Upload, AlertTriangle } from 'lucide-react'
import Dropdown from '@/components/UI/Dropdown'

export default function SettingsTab() {
  const [theme, setTheme] = useState('system')
  const [language, setLanguage] = useState('en')
  const [currency, setCurrency] = useState('INR')
  const [timezone, setTimezone] = useState('Asia/Kolkata')

  const themes = [
    { id: 'light', name: 'Light', icon: Sun },
    { id: 'dark', name: 'Dark', icon: Moon },
    { id: 'system', name: 'System', icon: Monitor }
  ]

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Spanish', flag: '🇪🇸' },
    { code: 'fr', name: 'French', flag: '🇫🇷' },
    { code: 'de', name: 'German', flag: '🇩🇪' },
    { code: 'it', name: 'Italian', flag: '🇮🇹' },
    { code: 'pt', name: 'Portuguese', flag: '🇵🇹' },
    { code: 'hi', name: 'Hindi', flag: '🇮🇳' }
  ]

  const currencies = [
    { code: 'USD', name: 'US Dollar', symbol: '$' },
    { code: 'EUR', name: 'Euro', symbol: '€' },
    { code: 'GBP', name: 'British Pound', symbol: '£' },
    { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
    { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
    { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
    { code: 'INR', name: 'Indian Rupee', symbol: '₹' }
  ]

  const timezones = [
    { value: 'America/New_York', label: 'Eastern Time (ET)' },
    { value: 'America/Chicago', label: 'Central Time (CT)' },
    { value: 'America/Denver', label: 'Mountain Time (MT)' },
    { value: 'America/Los_Angeles', label: 'Pacific Time (PT)' },
    { value: 'Europe/London', label: 'Greenwich Mean Time (GMT)' },
    { value: 'Europe/Paris', label: 'Central European Time (CET)' },
    { value: 'Asia/Tokyo', label: 'Japan Standard Time (JST)' },
    { value: 'Asia/Shanghai', label: 'China Standard Time (CST)' },
    { value: 'Asia/Kolkata', label: 'India Standard Time (IST)' }
  ]

  const handleExportData = () => {
    // Handle data export
    console.log('Exporting user data...')
  }

  const handleDeleteAccount = () => {
    // Handle account deletion
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      console.log('Deleting account...')
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <div className="flex items-center gap-3 mb-6">
        <Settings className="w-6 h-6 text-gray-600" />
        <h2 className="text-xl font-bold text-slate-900">Settings</h2>
      </div>

      {/* Appearance Settings */}
      {/* <div className="mb-8">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Appearance</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-3">Theme</label>
            <div className="grid grid-cols-3 gap-3">
              {themes.map((themeOption) => {
                const Icon = themeOption.icon
                return (
                  <button
                    key={themeOption.id}
                    onClick={() => setTheme(themeOption.id)}
                    className={`flex items-center gap-3 p-3 border rounded-lg transition-colors ${
                      theme === themeOption.id
                        ? 'border-gray-500 bg-gray-50 text-gray-700'
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{themeOption.name}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </div> */}

      {/* Localization Settings */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Localization</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Dropdown
              label="Language"
              value={language}
              options={languages.map((lang) => ({
                value: lang.code,
                label: `${lang.flag} ${lang.name}`
              }))}
              onChange={(value) => setLanguage(value as string)}
              placeholder="Select language"
            />
          </div>

          <div>
            <Dropdown
              label="Currency"
              value={currency}
              options={currencies.map((curr) => ({
                value: curr.code,
                label: `${curr.symbol} ${curr.name} (${curr.code})`
              }))}
              onChange={(value) => setCurrency(value as string)}
              placeholder="Select currency"
            />
          </div>

          <div className="md:col-span-2">
            <Dropdown
              label="Timezone"
              value={timezone}
              options={timezones.map((tz) => ({
                value: tz.value,
                label: tz.label
              }))}
              onChange={(value) => setTimezone(value as string)}
              placeholder="Select timezone"
            />
          </div>
        </div>
      </div>

      {/* Data Management */}
      {/* <div className="mb-8">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Data Management</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
            <div className="flex items-center gap-3">
              <Download className="w-5 h-5 text-gray-600" />
              <div>
                <h4 className="font-medium text-slate-900">Export Data</h4>
                <p className="text-sm text-slate-600">Download a copy of your account data</p>
              </div>
            </div>
            <button
              onClick={handleExportData}
              className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Export
            </button>
          </div>

          <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
            <div className="flex items-center gap-3">
              <Upload className="w-5 h-5 text-green-600" />
              <div>
                <h4 className="font-medium text-slate-900">Import Data</h4>
                <p className="text-sm text-slate-600">Import data from another account</p>
              </div>
            </div>
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
              Import
            </button>
          </div>
        </div>
      </div> */}

      {/* Privacy Settings */}
      {/* <div className="mb-8">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Privacy</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-slate-900">Profile Visibility</h4>
              <p className="text-sm text-slate-600">Make your profile visible to other users</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gray-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-slate-900">Activity Status</h4>
              <p className="text-sm text-slate-600">Show when you're online</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gray-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-slate-900">Data Analytics</h4>
              <p className="text-sm text-slate-600">Help improve our service with usage analytics</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gray-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-600"></div>
            </label>
          </div>
        </div>
      </div> */}

      {/* Danger Zone */}
      <div className="border border-gray-200 rounded-lg p-6 bg-gray-50">
        <div className="flex items-center gap-3 mb-4">
          <AlertTriangle className="w-6 h-6 text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-900">Danger Zone</h3>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Delete Account</h4>
              <p className="text-sm text-gray-700">Permanently delete your account and all data</p>
            </div>
            <button
              onClick={handleDeleteAccount}
              className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Delete Account
            </button>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="mt-8 pt-6 border-t border-slate-200">
        <button className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors">
          Save Settings
        </button>
      </div>
    </div>
  )
}
