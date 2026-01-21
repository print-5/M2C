"use client"

import { Settings, Shield, User, Sliders, Camera, FileText, Clock, AlertTriangle, CheckCircle2, Target, Ruler, Package } from "lucide-react"

export default function SettingsPage() {
  return (
    <div className="min-h-screen font-sans bg-linear-to-br from-slate-50 to-blue-50/30">
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">QC Settings</h1>
          <p className="text-slate-600 text-lg">Configure inspection standards, tolerances, and quality control preferences</p>
        </div>

        <div className="max-w-7xl mx-auto">
          {/* Profile Information - Top Section */}
          <div className="mb-8">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 overflow-hidden">
              <div className="px-6 py-5 border-b border-slate-200/60 bg-linear-to-r from-slate-50 to-white">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-amber-100 rounded-lg">
                    <User className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">Profile Information</h2>
                    <p className="text-sm text-slate-600">Update your personal details and account information</p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-3 text-sm">Checker ID:</label>
                    <input 
                      type="text" 
                      defaultValue="CHECKER_001" 
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl bg-slate-50 text-slate-500 cursor-not-allowed" 
                      disabled 
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-semibold mb-3 text-sm">Full Name:</label>
                    <input 
                      type="text" 
                      placeholder="Enter your full name" 
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200" 
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-semibold mb-3 text-sm">Email Address:</label>
                    <input 
                      type="email" 
                      placeholder="your@email.com" 
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200" 
                    />
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-slate-200 flex justify-between items-center">
                  <div className="text-sm text-slate-600">
                    <p>Last updated: <span className="font-medium">January 15, 2024</span></p>
                  </div>
                  <button className="bg-linear-to-r from-blue-600 to-blue-700 text-white font-semibold py-3 px-6 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-sm hover:shadow-md">
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Settings Sections - Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              {/* AQL Standards */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 overflow-hidden">
                <div className="px-6 py-5 border-b border-slate-200/60 bg-linear-to-r from-slate-50 to-white">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Shield className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-slate-900">AQL Standards (Level II)</h2>
                      <p className="text-sm text-slate-600">Acceptable Quality Limits for inspections</p>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 gap-6">
                    <div>
                      <label className="block text-slate-700 font-semibold mb-3 text-sm">Critical Defects:</label>
                      <div className="relative">
                        <input 
                          type="number" 
                          defaultValue="0" 
                          className="w-full px-4 py-3 border border-slate-300 rounded-xl bg-slate-50 text-slate-500 cursor-not-allowed" 
                          disabled 
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                          <span className="text-slate-400 text-sm">Max</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-slate-700 font-semibold mb-3 text-sm">Major Defects (Max):</label>
                      <div className="relative">
                        <input 
                          type="number" 
                          defaultValue="4" 
                          className="w-full px-4 py-3 border border-slate-300 rounded-xl bg-slate-50 text-slate-500 cursor-not-allowed" 
                          disabled 
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                          <span className="text-slate-400 text-sm">Max</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-slate-700 font-semibold mb-3 text-sm">Minor Defects (Max):</label>
                      <div className="relative">
                        <input 
                          type="number" 
                          defaultValue="14" 
                          className="w-full px-4 py-3 border border-slate-300 rounded-xl bg-slate-50 text-slate-500 cursor-not-allowed" 
                          disabled 
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                          <span className="text-slate-400 text-sm">Max</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Inspection Preferences */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 overflow-hidden">
                <div className="px-6 py-5 border-b border-slate-200/60 bg-linear-to-r from-slate-50 to-white">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <Target className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-slate-900">Inspection Preferences</h2>
                      <p className="text-sm text-slate-600">Customize your quality control workflow</p>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 gap-6">
                    <div>
                      <label className="block text-slate-700 font-semibold mb-3 text-sm">Default Sample Size (%):</label>
                      <select className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200">
                        <option value="10">10% - Standard Sampling</option>
                        <option value="15">15% - Enhanced Sampling</option>
                        <option value="20">20% - Strict Sampling</option>
                        <option value="25">25% - Critical Items</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-slate-700 font-semibold mb-3 text-sm">Inspection Priority:</label>
                      <select className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200">
                        <option value="critical">Critical Defects First</option>
                        <option value="major">Major Defects First</option>
                        <option value="sequential">Sequential Order</option>
                        <option value="random">Random Sampling</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-slate-700 font-semibold mb-3 text-sm">Photo Requirements:</label>
                      <select className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200">
                        <option value="defects">Defects Only</option>
                        <option value="all">All Items</option>
                        <option value="sample">Sample Items</option>
                        <option value="none">No Photos</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-slate-700 font-semibold mb-3 text-sm">Report Format:</label>
                      <select className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200">
                        <option value="detailed">Detailed Report</option>
                        <option value="summary">Summary Only</option>
                        <option value="visual">Visual Report</option>
                        <option value="custom">Custom Format</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quality Standards */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 overflow-hidden">
                <div className="px-6 py-5 border-b border-slate-200/60 bg-linear-to-r from-slate-50 to-white">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-slate-900">Quality Standards</h2>
                      <p className="text-sm text-slate-600">Define acceptable quality thresholds for textile products</p>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 gap-6">
                    <div>
                      <label className="block text-slate-700 font-semibold mb-3 text-sm">Fabric Quality Grade:</label>
                      <select className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200">
                        <option value="A">Grade A - Premium</option>
                        <option value="B">Grade B - Standard</option>
                        <option value="C">Grade C - Basic</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-slate-700 font-semibold mb-3 text-sm">Color Matching Tolerance:</label>
                      <select className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200">
                        <option value="strict">Strict (±1 Delta E)</option>
                        <option value="standard">Standard (±2 Delta E)</option>
                        <option value="relaxed">Relaxed (±3 Delta E)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-slate-700 font-semibold mb-3 text-sm">Stitching Quality (SPI):</label>
                      <select className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200">
                        <option value="12">12 SPI - Premium</option>
                        <option value="10">10 SPI - Standard</option>
                        <option value="8">8 SPI - Basic</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Measurement Tools */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 overflow-hidden">
                <div className="px-6 py-5 border-b border-slate-200/60 bg-linear-to-r from-slate-50 to-white">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-indigo-100 rounded-lg">
                      <Ruler className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-slate-900">Measurement Tools & Calibration</h2>
                      <p className="text-sm text-slate-600">Configure measurement instruments and calibration schedules</p>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 gap-6">
                    <div>
                      <label className="block text-slate-700 font-semibold mb-3 text-sm">Primary Measuring Unit:</label>
                      <select className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200">
                        <option value="metric">Metric (cm/kg)</option>
                        <option value="imperial">Imperial (in/lbs)</option>
                        <option value="both">Both Units</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-slate-700 font-semibold mb-3 text-sm">Scale Precision:</label>
                      <select className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200">
                        <option value="0.1">0.1g precision</option>
                        <option value="0.01">0.01g precision</option>
                        <option value="0.001">0.001g precision</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-slate-700 font-semibold mb-3 text-sm">Calibration Frequency:</label>
                      <select className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200">
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-slate-700 font-semibold mb-3 text-sm">Last Calibration:</label>
                      <input 
                        type="date" 
                        className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200" 
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Measurement Tolerance */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 overflow-hidden">
                <div className="px-6 py-5 border-b border-slate-200/60 bg-linear-to-r from-slate-50 to-white">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-emerald-100 rounded-lg">
                      <Sliders className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-slate-900">Measurement Tolerance</h2>
                      <p className="text-sm text-slate-600">Acceptable variance limits for measurements</p>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 gap-6">
                    <div>
                      <label className="block text-slate-700 font-semibold mb-3 text-sm">Length/Width (±%):</label>
                      <div className="relative">
                        <input 
                          type="number" 
                          defaultValue="5" 
                          className="w-full px-4 py-3 border border-slate-300 rounded-xl bg-slate-50 text-slate-500 cursor-not-allowed" 
                          disabled 
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                          <span className="text-slate-400 text-sm">%</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-slate-700 font-semibold mb-3 text-sm">Weight (±%):</label>
                      <div className="relative">
                        <input 
                          type="number" 
                          defaultValue="3" 
                          className="w-full px-4 py-3 border border-slate-300 rounded-xl bg-slate-50 text-slate-500 cursor-not-allowed" 
                          disabled 
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                          <span className="text-slate-400 text-sm">%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Defect Categories */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 overflow-hidden">
                <div className="px-6 py-5 border-b border-slate-200/60 bg-linear-to-r from-slate-50 to-white">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-red-100 rounded-lg">
                      <AlertTriangle className="w-5 h-5 text-red-600" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-slate-900">Defect Categories</h2>
                      <p className="text-sm text-slate-600">Configure defect classification and severity levels</p>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <h3 className="font-semibold text-red-800 mb-2">Critical Defects</h3>
                      <div className="space-y-2 text-sm">
                        <label className="flex items-center">
                          <input type="checkbox" defaultChecked className="mr-2 text-red-600" />
                          <span className="text-red-700">Safety hazards</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" defaultChecked className="mr-2 text-red-600" />
                          <span className="text-red-700">Structural failures</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" defaultChecked className="mr-2 text-red-600" />
                          <span className="text-red-700">Chemical contamination</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" defaultChecked className="mr-2 text-red-600" />
                          <span className="text-red-700">Sharp objects/needles</span>
                        </label>
                      </div>
                    </div>
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <h3 className="font-semibold text-yellow-800 mb-2">Major Defects</h3>
                      <div className="space-y-2 text-sm">
                        <label className="flex items-center">
                          <input type="checkbox" defaultChecked className="mr-2 text-yellow-600" />
                          <span className="text-yellow-700">Color variations</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" defaultChecked className="mr-2 text-yellow-600" />
                          <span className="text-yellow-700">Size deviations</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" defaultChecked className="mr-2 text-yellow-600" />
                          <span className="text-yellow-700">Pattern misalignment</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" defaultChecked className="mr-2 text-yellow-600" />
                          <span className="text-yellow-700">Fabric defects</span>
                        </label>
                      </div>
                    </div>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h3 className="font-semibold text-blue-800 mb-2">Minor Defects</h3>
                      <div className="space-y-2 text-sm">
                        <label className="flex items-center">
                          <input type="checkbox" defaultChecked className="mr-2 text-blue-600" />
                          <span className="text-blue-700">Loose threads</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" defaultChecked className="mr-2 text-blue-600" />
                          <span className="text-blue-700">Minor stains</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" defaultChecked className="mr-2 text-blue-600" />
                          <span className="text-blue-700">Packaging issues</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" defaultChecked className="mr-2 text-blue-600" />
                          <span className="text-blue-700">Label placement</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Documentation Settings */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 overflow-hidden">
                <div className="px-6 py-5 border-b border-slate-200/60 bg-linear-to-r from-slate-50 to-white">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-teal-100 rounded-lg">
                      <FileText className="w-5 h-5 text-teal-600" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-slate-900">Documentation & Reporting</h2>
                      <p className="text-sm text-slate-600">Configure report templates and documentation requirements</p>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 gap-6">
                    <div>
                      <label className="block text-slate-700 font-semibold mb-3 text-sm">Report Language:</label>
                      <select className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200">
                        <option value="en">English</option>
                        <option value="es">Spanish</option>
                        <option value="fr">French</option>
                        <option value="de">German</option>
                        <option value="zh">Chinese</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-slate-700 font-semibold mb-3 text-sm">Auto-save Frequency:</label>
                      <select className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200">
                        <option value="30">Every 30 seconds</option>
                        <option value="60">Every 1 minute</option>
                        <option value="300">Every 5 minutes</option>
                        <option value="manual">Manual only</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-slate-700 font-semibold mb-3 text-sm">Required Signatures:</label>
                      <div className="grid grid-cols-1 gap-3">
                        <label className="flex items-center">
                          <input type="checkbox" defaultChecked className="mr-2 text-blue-600" />
                          <span className="text-slate-700">QC Inspector</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" defaultChecked className="mr-2 text-blue-600" />
                          <span className="text-slate-700">Supervisor</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" className="mr-2 text-blue-600" />
                          <span className="text-slate-700">Client Representative</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" className="mr-2 text-blue-600" />
                          <span className="text-slate-700">Factory Manager</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Photo & Camera Settings */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 overflow-hidden">
                <div className="px-6 py-5 border-b border-slate-200/60 bg-linear-to-r from-slate-50 to-white">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-pink-100 rounded-lg">
                      <Camera className="w-5 h-5 text-pink-600" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-slate-900">Photo & Camera Settings</h2>
                      <p className="text-sm text-slate-600">Configure photo capture and quality requirements</p>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 gap-6">
                    <div>
                      <label className="block text-slate-700 font-semibold mb-3 text-sm">Photo Resolution:</label>
                      <select className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200">
                        <option value="high">High (1920x1080)</option>
                        <option value="medium">Medium (1280x720)</option>
                        <option value="low">Low (640x480)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-slate-700 font-semibold mb-3 text-sm">Compression Quality:</label>
                      <select className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200">
                        <option value="90">90% - Best Quality</option>
                        <option value="75">75% - Good Quality</option>
                        <option value="60">60% - Standard</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-slate-700 font-semibold mb-3 text-sm">Photo Requirements:</label>
                      <div className="grid grid-cols-1 gap-3">
                        <label className="flex items-center">
                          <input type="checkbox" defaultChecked className="mr-2 text-blue-600" />
                          <span className="text-slate-700">Overall product view</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" defaultChecked className="mr-2 text-blue-600" />
                          <span className="text-slate-700">Close-up of defects</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" className="mr-2 text-blue-600" />
                          <span className="text-slate-700">Measurement photos</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" className="mr-2 text-blue-600" />
                          <span className="text-slate-700">Packaging photos</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
