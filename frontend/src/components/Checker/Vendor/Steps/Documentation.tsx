"use client"

import { Camera, Upload, X } from "lucide-react"
import { useRef } from "react"

interface DocumentationProps {
  formData: {
    inspectorSignature: string
    documentationPhotos: Array<{ 
      file?: File; 
      name: string; 
      url: string; 
      id: string | number;
      uploadedAt: string;
      uploadedDate: string;
      uploadedTime: string;
    }>
    photocopyDocuments: Array<{ 
      file?: File; 
      name: string; 
      url: string; 
      id: string | number;
      uploadedAt: string;
      uploadedDate: string;
      uploadedTime: string;
    }>
    companyIdCards: Array<{ 
      file?: File; 
      name: string; 
      url: string; 
      id: string | number;
      uploadedAt: string;
      uploadedDate: string;
      uploadedTime: string;
    }>
  }
  setFormData: (data: any) => void
}

export default function Documentation({ formData, setFormData }: DocumentationProps) {
  const documentationPhotoInputRef = useRef<HTMLInputElement | null>(null)
  const photocopyInputRef = useRef<HTMLInputElement | null>(null)
  const companyIdInputRef = useRef<HTMLInputElement | null>(null)

  // Helper function to create timestamp data
  const createTimestamp = () => {
    const now = new Date()
    return {
      uploadedAt: now.toISOString(),
      uploadedDate: now.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit' 
      }),
      uploadedTime: now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit',
        hour12: true 
      })
    }
  }

  const handleDocumentationPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    
    // Create preview URLs for the new files with timestamp
    const newImages = files.map((file) => ({
      file,
      name: file.name,
      url: URL.createObjectURL(file),
      id: Date.now() + Math.random(),
      ...createTimestamp()
    }))

    setFormData({
      ...formData,
      documentationPhotos: [...(formData.documentationPhotos || []), ...newImages]
    })
  }

  const handlePhotocopyUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    
    // Create preview URLs for the new files with timestamp
    const newImages = files.map((file) => ({
      file,
      name: file.name,
      url: URL.createObjectURL(file),
      id: Date.now() + Math.random(),
      ...createTimestamp()
    }))

    setFormData({
      ...formData,
      photocopyDocuments: [...(formData.photocopyDocuments || []), ...newImages]
    })
  }

  const handleCompanyIdUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    
    // Create preview URLs for the new files with timestamp
    const newImages = files.map((file) => ({
      file,
      name: file.name,
      url: URL.createObjectURL(file),
      id: Date.now() + Math.random(),
      ...createTimestamp()
    }))

    setFormData({
      ...formData,
      companyIdCards: [...(formData.companyIdCards || []), ...newImages]
    })
  }

  const removeDocumentationPhoto = (imageId: number) => {
    const updatedPhotos = formData.documentationPhotos.filter(
      (img: any) => img.id !== imageId
    )
    // Clean up the URL to prevent memory leaks
    const imageToRemove = formData.documentationPhotos.find(
      (img: any) => img.id === imageId
    )
    if (imageToRemove && imageToRemove.url) {
      URL.revokeObjectURL(imageToRemove.url)
    }
    setFormData({ ...formData, documentationPhotos: updatedPhotos })
  }

  const removePhotocopyDocument = (imageId: number) => {
    const updatedPhotos = formData.photocopyDocuments.filter(
      (img: any) => img.id !== imageId
    )
    // Clean up the URL to prevent memory leaks
    const imageToRemove = formData.photocopyDocuments.find(
      (img: any) => img.id === imageId
    )
    if (imageToRemove && imageToRemove.url) {
      URL.revokeObjectURL(imageToRemove.url)
    }
    setFormData({ ...formData, photocopyDocuments: updatedPhotos })
  }

  const removeCompanyIdCard = (imageId: number) => {
    const updatedPhotos = formData.companyIdCards.filter(
      (img: any) => img.id !== imageId
    )
    // Clean up the URL to prevent memory leaks
    const imageToRemove = formData.companyIdCards.find(
      (img: any) => img.id === imageId
    )
    if (imageToRemove && imageToRemove.url) {
      URL.revokeObjectURL(imageToRemove.url)
    }
    setFormData({ ...formData, companyIdCards: updatedPhotos })
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* General Documentation Photos */}
        <div>
          <label className="block text-slate-700 font-semibold mb-3">General Documentation:</label>
          <p className="text-slate-600 text-sm mb-4">Signed draft report, packing list, signed declaration</p>
          <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:border-blue-400 transition-colors cursor-pointer bg-slate-50/50">
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
              <Upload className="w-10 h-10 text-slate-400 mx-auto mb-2" />
              <p className="text-slate-700 font-medium text-sm">Upload documentation</p>
              <p className="text-slate-500 text-xs mt-1">Click to browse</p>
            </button>
          </div>

          {/* General Documentation Photos List */}
          {formData.documentationPhotos && formData.documentationPhotos.length > 0 && (
            <div className="mt-4">
              <h4 className="font-medium text-gray-900 mb-2">
                Uploaded Images ({formData.documentationPhotos.length}):
              </h4>
              {formData.documentationPhotos.length > 0 && formData.documentationPhotos[formData.documentationPhotos.length - 1].uploadedDate && (
                <p className="text-xs text-gray-500 mb-3">
                  Last uploaded: {formData.documentationPhotos[formData.documentationPhotos.length - 1].uploadedDate} at {formData.documentationPhotos[formData.documentationPhotos.length - 1].uploadedTime}
                </p>
              )}
              <div className="grid grid-cols-2 gap-3">
                {formData.documentationPhotos.map((image: any, index: number) => (
                  <div key={image.id || index} className="relative group">
                    <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                      {image.url ? (
                        <img
                          src={image.url}
                          alt={`Documentation ${index + 1}`}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          <Camera className="w-6 h-6" />
                        </div>
                      )}
                    </div>

                    {/* Remove button */}
                    <button
                      type="button"
                      onClick={() => removeDocumentationPhoto(image.id)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-600"
                      title="Remove image"
                    >
                      <X className="w-3 h-3" />
                    </button>

                    {/* Image name and timestamp */}
                    <div className="mt-1">
                      <p
                        className="text-xs text-gray-600 truncate font-medium"
                        title={image.name}
                      >
                        {image.name}
                      </p>
                      {image.uploadedDate && image.uploadedTime && (
                        <div className="text-xs text-gray-500 mt-1">
                          <div>{image.uploadedDate}</div>
                          <div>{image.uploadedTime}</div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Photocopy Documents */}
        <div>
          <label className="block text-slate-700 font-semibold mb-3">
            Photocopy Documents: <span className="text-red-500">*</span>
          </label>
          <p className="text-slate-600 text-sm mb-4">Required: Upload photocopy of relevant documents</p>
          <div className="border-2 border-dashed border-blue-300 rounded-xl p-6 text-center hover:border-blue-400 transition-colors cursor-pointer bg-blue-50/50">
            <input
              ref={photocopyInputRef}
              type="file"
              multiple
              accept="image/*"
              onChange={handlePhotocopyUpload}
              className="hidden"
            />
            <button
              onClick={() => photocopyInputRef.current?.click()}
              className="flex flex-col items-center justify-center w-full"
            >
              <Upload className="w-10 h-10 text-blue-400 mx-auto mb-2" />
              <p className="text-slate-700 font-medium text-sm">Upload photocopy</p>
              <p className="text-slate-500 text-xs mt-1">Required documents</p>
            </button>
          </div>

          {/* Photocopy Documents List */}
          {formData.photocopyDocuments && formData.photocopyDocuments.length > 0 && (
            <div className="mt-4">
              <h4 className="font-medium text-gray-900 mb-2">
                Uploaded Images ({formData.photocopyDocuments.length}):
              </h4>
              {formData.photocopyDocuments.length > 0 && formData.photocopyDocuments[formData.photocopyDocuments.length - 1].uploadedDate && (
                <p className="text-xs text-gray-500 mb-3">
                  Last uploaded: {formData.photocopyDocuments[formData.photocopyDocuments.length - 1].uploadedDate} at {formData.photocopyDocuments[formData.photocopyDocuments.length - 1].uploadedTime}
                </p>
              )}
              <div className="grid grid-cols-2 gap-3">
                {formData.photocopyDocuments.map((image: any, index: number) => (
                  <div key={image.id || index} className="relative group">
                    <div className="aspect-square bg-blue-100 rounded-lg overflow-hidden border border-blue-200">
                      {image.url ? (
                        <img
                          src={image.url}
                          alt={`Photocopy ${index + 1}`}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          <Camera className="w-6 h-6" />
                        </div>
                      )}
                    </div>

                    {/* Remove button */}
                    <button
                      type="button"
                      onClick={() => removePhotocopyDocument(image.id)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-600"
                      title="Remove image"
                    >
                      <X className="w-3 h-3" />
                    </button>

                    {/* Image name and timestamp */}
                    <div className="mt-1">
                      <p
                        className="text-xs text-gray-600 truncate font-medium"
                        title={image.name}
                      >
                        {image.name}
                      </p>
                      {image.uploadedDate && image.uploadedTime && (
                        <div className="text-xs text-gray-500 mt-1">
                          <div>{image.uploadedDate}</div>
                          <div>{image.uploadedTime}</div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Company ID Card */}
        <div>
          <label className="block text-slate-700 font-semibold mb-3">
            Company ID Card: <span className="text-red-500">*</span>
          </label>
          <p className="text-slate-600 text-sm mb-4">Required: Upload company identification card</p>
          <div className="border-2 border-dashed border-green-300 rounded-xl p-6 text-center hover:border-green-400 transition-colors cursor-pointer bg-green-50/50">
            <input
              ref={companyIdInputRef}
              type="file"
              multiple
              accept="image/*"
              onChange={handleCompanyIdUpload}
              className="hidden"
            />
            <button
              onClick={() => companyIdInputRef.current?.click()}
              className="flex flex-col items-center justify-center w-full"
            >
              <Upload className="w-10 h-10 text-green-400 mx-auto mb-2" />
              <p className="text-slate-700 font-medium text-sm">Upload ID card</p>
              <p className="text-slate-500 text-xs mt-1">Company identification</p>
            </button>
          </div>

          {/* Company ID Cards List */}
          {formData.companyIdCards && formData.companyIdCards.length > 0 && (
            <div className="mt-4">
              <h4 className="font-medium text-gray-900 mb-2">
                Uploaded Images ({formData.companyIdCards.length}):
              </h4>
              {formData.companyIdCards.length > 0 && formData.companyIdCards[formData.companyIdCards.length - 1].uploadedDate && (
                <p className="text-xs text-gray-500 mb-3">
                  Last uploaded: {formData.companyIdCards[formData.companyIdCards.length - 1].uploadedDate} at {formData.companyIdCards[formData.companyIdCards.length - 1].uploadedTime}
                </p>
              )}
              <div className="grid grid-cols-2 gap-3">
                {formData.companyIdCards.map((image: any, index: number) => (
                  <div key={image.id || index} className="relative group">
                    <div className="aspect-square bg-green-100 rounded-lg overflow-hidden border border-green-200">
                      {image.url ? (
                        <img
                          src={image.url}
                          alt={`Company ID ${index + 1}`}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          <Camera className="w-6 h-6" />
                        </div>
                      )}
                    </div>

                    {/* Remove button */}
                    <button
                      type="button"
                      onClick={() => removeCompanyIdCard(image.id)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-600"
                      title="Remove image"
                    >
                      <X className="w-3 h-3" />
                    </button>

                    {/* Image name and timestamp */}
                    <div className="mt-1">
                      <p
                        className="text-xs text-gray-600 truncate font-medium"
                        title={image.name}
                      >
                        {image.name}
                      </p>
                      {image.uploadedDate && image.uploadedTime && (
                        <div className="text-xs text-gray-500 mt-1">
                          <div>{image.uploadedDate}</div>
                          <div>{image.uploadedTime}</div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}