"use client"

import { Camera, Plus, Trash2, Upload, X } from "lucide-react"
import { useRef } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/UI/Table"

interface MeasurementsProps {
  formData: {
    measurements: Array<{
      id: number
      sampleName: string
      cartonLength: number
      cartonWidth: number
      cartonHeight: number
      productLength: number
      productWidth: number
      retailWeight: number
      cartonGrossWeight: number
    }>
    measurementPhotos: string[]
  }
  setFormData: (data: any) => void
}

export default function Measurements({ formData, setFormData }: MeasurementsProps) {
  const measurementPhotoInputRef = useRef<HTMLInputElement | null>(null)

  const handleMeasurementPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const fileNames = Array.from(files).map(f => f.name)
      setFormData({ 
        ...formData, 
        measurementPhotos: [...(formData.measurementPhotos || []), ...fileNames] 
      })
    }
  }

  const removeMeasurementPhoto = (photoIndex: number) => {
    const updatedPhotos = formData.measurementPhotos.filter((_, i) => i !== photoIndex)
    setFormData({ ...formData, measurementPhotos: updatedPhotos })
  }

  const updateMeasurement = (id: number, field: string, value: number) => {
    const updatedMeasurements = formData.measurements.map(m => 
      m.id === id ? { ...m, [field]: value } : m
    )
    setFormData({ ...formData, measurements: updatedMeasurements })
  }

  const addSample = () => {
    const newSample = {
      id: Date.now(),
      sampleName: `Sample ${formData.measurements.length + 1}`,
      cartonLength: 0,
      cartonWidth: 0,
      cartonHeight: 0,
      productLength: 0,
      productWidth: 0,
      retailWeight: 0,
      cartonGrossWeight: 0
    }
    setFormData({
      ...formData,
      measurements: [...formData.measurements, newSample]
    })
  }

  const removeSample = (id: number) => {
    setFormData({
      ...formData,
      measurements: formData.measurements.filter(m => m.id !== id)
    })
  }
  return (
    <div className="space-y-8">
      <div className="border-b border-slate-200 pb-6">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Spec Verification & Physical Measurement</h2>
        <p className="text-slate-600">
          Verify product matches tech file specifications (S1 level - 8 samples)
        </p>
      </div>

      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-slate-900">Measurement Samples</h3>
        <button
          onClick={addSample}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Sample
        </button>
      </div>

      {formData.measurements.length === 0 ? (
        <div className="text-center py-8 bg-slate-50 rounded-xl border-2 border-dashed border-slate-300">
          <p className="text-slate-600">No samples added yet. Click "Add Sample" to get started.</p>
        </div>
      ) : (
        <div className="overflow-x-auto bg-slate-50/50 rounded-xl p-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Sample</TableHead>
              <TableHead>Carton L/W/H (cm)</TableHead>
              <TableHead>Product L/W (cm)</TableHead>
              <TableHead>Retail Wt (kg)</TableHead>
              <TableHead>Gross Wt (kg)</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {formData.measurements.map((m) => (
              <TableRow key={m.id}>
                <TableCell className="font-medium text-slate-900">{m.sampleName}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <input 
                      type="number" 
                      step="0.1" 
                      value={m.cartonLength} 
                      onChange={(e) => updateMeasurement(m.id, 'cartonLength', parseFloat(e.target.value) || 0)}
                      className="w-16 px-2 py-1 border border-slate-300 rounded text-xs" 
                    />
                    <input 
                      type="number" 
                      step="0.1" 
                      value={m.cartonWidth} 
                      onChange={(e) => updateMeasurement(m.id, 'cartonWidth', parseFloat(e.target.value) || 0)}
                      className="w-16 px-2 py-1 border border-slate-300 rounded text-xs" 
                    />
                    <input 
                      type="number" 
                      step="0.1" 
                      value={m.cartonHeight} 
                      onChange={(e) => updateMeasurement(m.id, 'cartonHeight', parseFloat(e.target.value) || 0)}
                      className="w-16 px-2 py-1 border border-slate-300 rounded text-xs" 
                    />
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <input 
                      type="number" 
                      step="0.1" 
                      value={m.productLength} 
                      onChange={(e) => updateMeasurement(m.id, 'productLength', parseFloat(e.target.value) || 0)}
                      className="w-16 px-2 py-1 border border-slate-300 rounded text-xs" 
                    />
                    <input 
                      type="number" 
                      step="0.1" 
                      value={m.productWidth} 
                      onChange={(e) => updateMeasurement(m.id, 'productWidth', parseFloat(e.target.value) || 0)}
                      className="w-16 px-2 py-1 border border-slate-300 rounded text-xs" 
                    />
                  </div>
                </TableCell>
                <TableCell>
                  <input 
                    type="number" 
                    step="0.01" 
                    value={m.retailWeight} 
                    onChange={(e) => updateMeasurement(m.id, 'retailWeight', parseFloat(e.target.value) || 0)}
                    className="w-20 px-2 py-1 border border-slate-300 rounded text-xs" 
                  />
                </TableCell>
                <TableCell>
                  <input 
                    type="number" 
                    step="0.1" 
                    value={m.cartonGrossWeight} 
                    onChange={(e) => updateMeasurement(m.id, 'cartonGrossWeight', parseFloat(e.target.value) || 0)}
                    className="w-20 px-2 py-1 border border-slate-300 rounded text-xs" 
                  />
                </TableCell>
                <TableCell>
                  <button
                    onClick={() => removeSample(m.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      )}

      <div>
        <label className="block text-slate-700 font-semibold mb-3">Photo Evidence:</label>
        <p className="text-slate-600 text-sm mb-4">
          Carton dimensions, product measurements, weight verification
        </p>
        <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:border-blue-400 transition-colors cursor-pointer bg-slate-50/50">
          <input
            ref={measurementPhotoInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={handleMeasurementPhotoUpload}
            className="hidden"
          />
          <button
            onClick={() => measurementPhotoInputRef.current?.click()}
            className="flex flex-col items-center justify-center w-full"
          >
            <Upload className="w-12 h-12 text-slate-400 mx-auto mb-3" />
            <p className="text-slate-700 font-medium">Upload measurement photos</p>
            <p className="text-slate-500 text-sm mt-1">Drag & drop or click to browse</p>
          </button>
        </div>

        {/* Uploaded Photos List */}
        {formData.measurementPhotos && formData.measurementPhotos.length > 0 && (
          <div className="mt-4 space-y-2">
            {formData.measurementPhotos.map((photo, index) => (
              <div key={index} className="flex items-center justify-between bg-white p-3 rounded-lg border border-slate-200">
                <div className="flex items-center gap-2 flex-1">
                  <Camera className="w-4 h-4 text-slate-400" />
                  <span className="text-sm text-slate-700 truncate">{photo}</span>
                </div>
                <button
                  onClick={() => removeMeasurementPhoto(index)}
                  className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}