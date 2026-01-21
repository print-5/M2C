"use client"

import { Camera, Upload, X } from "lucide-react"
import { useRef } from "react"

interface DocumentationProps {
  formData: {
    inspectorSignature: string
    documentationPhotos: string[]
  }
  setFormData: (data: any) => void
}

export default function Documentation({ formData, setFormData }: DocumentationProps) {
  const documentationPhotoInputRef = useRef<HTMLInputElement | null>(null)

  const handleDocumentationPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const fileNames = Array.from(files).map(f => f.name)
      setFormData({ 
        ...formData, 
        documentationPhotos: [...(formData.documentationPhotos || []), ...fileNames] 
      })
    }
  }

  const removeDocumentationPhoto = (photoIndex: number) => {
    const updatedPhotos = formData.documentationPhotos.filter((_, i) => i !== photoIndex)
    setFormData({ ...formData, documentationPhotos: updatedPhotos })
  }

  return (
    <div className="space-y-8">
      <div className="border-b border-slate-200 pb-6">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Final Documentation</h2>
        <p className="text-slate-600">Finalize inspection with signature and packing list</p>
      </div>

      <div>
        <label className="block text-slate-700 font-semibold mb-3">Inspector Signature/Initials:</label>
        <input
          type="text"
          value={formData.inspectorSignature}
          onChange={(e) => setFormData({ ...formData, inspectorSignature: e.target.value })}
          placeholder="Enter signature or initials"
          className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
        />
      </div>

      <div>
        <label className="block text-slate-700 font-semibold mb-3">Documentation Photo Evidence:</label>
        <p className="text-slate-600 text-sm mb-4">Signed draft report, packing list, signed declaration</p>
        <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:border-blue-400 transition-colors cursor-pointer bg-slate-50/50">
          <input
            ref={documentationPhotoInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={handleDocumentationPhotoUpload}
            className="hidden"
          />
          <button
            onClick={() => documentationPhotoInputRef.current?.click()}
            className="flex flex-col items-center justify-center w-full"
          >
            <Upload className="w-12 h-12 text-slate-400 mx-auto mb-3" />
            <p className="text-slate-700 font-medium">Upload documentation photos</p>
            <p className="text-slate-500 text-sm mt-1">Drag & drop or click to browse</p>
          </button>
        </div>

        {/* Uploaded Photos List */}
        {formData.documentationPhotos && formData.documentationPhotos.length > 0 && (
          <div className="mt-4 space-y-2">
            {formData.documentationPhotos.map((photo, index) => (
              <div key={index} className="flex items-center justify-between bg-white p-3 rounded-lg border border-slate-200">
                <div className="flex items-center gap-2 flex-1">
                  <Camera className="w-4 h-4 text-slate-400" />
                  <span className="text-sm text-slate-700 truncate">{photo}</span>
                </div>
                <button
                  onClick={() => removeDocumentationPhoto(index)}
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