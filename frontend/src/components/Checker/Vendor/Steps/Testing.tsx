"use client"

import { Camera, Upload, X } from "lucide-react"
import { useRef, useState } from "react"

interface TestingProps {
  formData: {
    tests: Array<{
      id: string
      label: string
      detail: string
      pass: boolean
      fail: boolean
      photos: string[]
      rightPhotos: Array<{ 
        file?: File; 
        name: string; 
        url: string; 
        id: string | number;
        uploadedAt: string;
        uploadedDate: string;
        uploadedTime: string;
      }>
      wrongPhotos: Array<{ 
        file?: File; 
        name: string; 
        url: string; 
        id: string | number;
        uploadedAt: string;
        uploadedDate: string;
        uploadedTime: string;
      }>
    }>
    testingPhotos: Array<{ 
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

export default function Testing({ formData, setFormData }: TestingProps) {
  const fileInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({})
  const rightPhotoRefs = useRef<{ [key: string]: HTMLInputElement | null }>({})
  const wrongPhotoRefs = useRef<{ [key: string]: HTMLInputElement | null }>({})
  const generalTestingPhotoInputRef = useRef<HTMLInputElement | null>(null)
  const [loadingPhotos, setLoadingPhotos] = useState<{ [key: string]: boolean }>({})

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

  const handleGeneralTestingPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      testingPhotos: [...(formData.testingPhotos || []), ...newImages]
    })
  }

  const removeGeneralTestingPhoto = (imageId: number) => {
    const updatedPhotos = formData.testingPhotos.filter(
      (img: any) => img.id !== imageId
    )
    // Clean up the URL to prevent memory leaks
    const imageToRemove = formData.testingPhotos.find(
      (img: any) => img.id === imageId
    )
    if (imageToRemove && imageToRemove.url) {
      URL.revokeObjectURL(imageToRemove.url)
    }
    setFormData({ ...formData, testingPhotos: updatedPhotos })
  }

  const defaultTests = [
    { id: "dropTestResult", label: "Carton Drop Test", detail: "Action and result views" },
    { id: "colorFastnessDry", label: "Color Fastness (Dry)", detail: "Dry cloth rubbing test" },
    { id: "colorFastnessWet", label: "Color Fastness (Wet)", detail: "Wet cloth rubbing test" },
    { id: "seamStrengthResult", label: "Seam Strength Test", detail: "Pull gauge testing" },
    { id: "smellCheck", label: "Smell Check", detail: "Unusual odor detection" },
  ]

  const tests = formData.tests || defaultTests.map(test => ({
    ...test,
    pass: false,
    fail: false,
    photos: [],
    rightPhotos: [],
    wrongPhotos: []
  }))

  const updateTest = (testId: string, field: string, value: any) => {
    const updatedTests = tests.map(t =>
      t.id === testId ? { ...t, [field]: value } : t
    )
    setFormData({ ...formData, tests: updatedTests })
  }

  const handleTestPhotoUpload = (testId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const fileNames = Array.from(files).map(f => f.name)
      const test = tests.find(t => t.id === testId)
      if (test) {
        const updatedPhotos = [...(test.photos || []), ...fileNames]
        updateTest(testId, 'photos', updatedPhotos)
      }
    }
  }

  const removeTestPhoto = (testId: string, photoIndex: number) => {
    const test = tests.find(t => t.id === testId)
    if (test) {
      const updatedPhotos = test.photos.filter((_, i) => i !== photoIndex)
      updateTest(testId, 'photos', updatedPhotos)
    }
  }

  const handleRightPhotoUpload = (testId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    
    // Create preview URLs for the new files with timestamp
    const newImages = files.map((file) => ({
      file,
      name: file.name,
      url: URL.createObjectURL(file),
      id: Date.now() + Math.random(),
      ...createTimestamp()
    }))

    const test = tests.find(t => t.id === testId)
    if (test) {
      const updatedPhotos = [...(test.rightPhotos || []), ...newImages]
      updateTest(testId, 'rightPhotos', updatedPhotos)
    }
  }

  const handleWrongPhotoUpload = (testId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    
    // Create preview URLs for the new files with timestamp
    const newImages = files.map((file) => ({
      file,
      name: file.name,
      url: URL.createObjectURL(file),
      id: Date.now() + Math.random(),
      ...createTimestamp()
    }))

    const test = tests.find(t => t.id === testId)
    if (test) {
      const updatedPhotos = [...(test.wrongPhotos || []), ...newImages]
      updateTest(testId, 'wrongPhotos', updatedPhotos)
    }
  }

  const removeRightPhoto = (testId: string, imageId: number) => {
    const test = tests.find(t => t.id === testId)
    if (test && test.rightPhotos) {
      const updatedPhotos = test.rightPhotos.filter(
        (img: any) => img.id !== imageId
      )
      // Clean up the URL to prevent memory leaks
      const imageToRemove = test.rightPhotos.find(
        (img: any) => img.id === imageId
      )
      if (imageToRemove && imageToRemove.url) {
        URL.revokeObjectURL(imageToRemove.url)
      }
      updateTest(testId, 'rightPhotos', updatedPhotos)
    }
  }

  const removeWrongPhoto = (testId: string, imageId: number) => {
    const test = tests.find(t => t.id === testId)
    if (test && test.wrongPhotos) {
      const updatedPhotos = test.wrongPhotos.filter(
        (img: any) => img.id !== imageId
      )
      // Clean up the URL to prevent memory leaks
      const imageToRemove = test.wrongPhotos.find(
        (img: any) => img.id === imageId
      )
      if (imageToRemove && imageToRemove.url) {
        URL.revokeObjectURL(imageToRemove.url)
      }
      updateTest(testId, 'wrongPhotos', updatedPhotos)
    }
  }

  return (
    <div className="space-y-8">
      <div className="border-b border-slate-200 pb-6">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">6. On-site Tests</h2>
        <p className="text-slate-600">Functional tests for durability and color integrity (Section C - Item 6)</p>
      </div>

      {tests.map((test) => (
        <div key={test.id} className="bg-slate-50/50 rounded-xl p-6 border border-slate-200">
          <div className="mb-4">
            <label className="block text-slate-900 font-semibold mb-2">{test.label}</label>
            <p className="text-slate-600 text-sm mb-4">{test.detail}</p>
            
            {/* Checkboxes for Pass/Fail */}
            <div className="flex items-center gap-6 mb-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={test.pass}
                  onChange={(e) => {
                    updateTest(test.id, 'pass', e.target.checked)
                    // Auto-uncheck fail if pass is checked
                    if (e.target.checked && test.fail) {
                      updateTest(test.id, 'fail', false)
                    }
                  }}
                  className="w-5 h-5 rounded border-slate-300 text-emerald-600 cursor-pointer"
                />
                <span className="text-slate-700 font-medium">Pass</span>
              </label>
              
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={test.fail}
                  onChange={(e) => {
                    updateTest(test.id, 'fail', e.target.checked)
                    // Auto-uncheck pass if fail is checked
                    if (e.target.checked && test.pass) {
                      updateTest(test.id, 'pass', false)
                    }
                  }}
                  className="w-5 h-5 rounded border-slate-300 text-red-600 cursor-pointer"
                />
                <span className="text-slate-700 font-medium">Fail</span>
              </label>
            </div>

            {/* Photo Upload Section - Left: Right Photos, Right: Wrong Photos */}
            <div className="mb-4">
              <label className="block text-slate-700 font-medium mb-3 text-sm">Test Photos:</label>
              <div className="grid grid-cols-2 gap-6">
                {/* Left Side - Right Photos */}
                <div>
                  <label className="block text-slate-600 font-medium mb-2 text-sm  p-2 rounded">✓ Right/Correct Photo</label>
                  <div className="border-2 border-dashed border-green-300 rounded-lg p-4 text-center hover:border-green-400 transition-colors cursor-pointer bg-green-50">
                    <input
                      ref={(el) => {
                        if (el) rightPhotoRefs.current[test.id] = el
                      }}
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={(e) => handleRightPhotoUpload(test.id, e)}
                      className="hidden"
                    />
                    <button
                      onClick={() => rightPhotoRefs.current[test.id]?.click()}
                      className="flex flex-col items-center justify-center w-full"
                    >
                      <Upload className="w-6 h-6 text-green-400 mb-2" />
                      <p className="text-slate-600 text-sm font-medium">Upload right photos</p>
                      <p className="text-slate-500 text-xs mt-1">Click to browse</p>
                    </button>
                  </div>

                  {/* Right Photos List */}
                  {test.rightPhotos && test.rightPhotos.length > 0 && (
                    <div className="mt-6">
                      <h4 className="font-medium text-gray-900 mb-2">
                        Uploaded Images ({test.rightPhotos.length}):
                      </h4>
                      {test.rightPhotos.length > 0 && test.rightPhotos[test.rightPhotos.length - 1].uploadedDate && (
                        <p className="text-xs text-gray-500 mb-4">
                          Last uploaded: {test.rightPhotos[test.rightPhotos.length - 1].uploadedDate} at {test.rightPhotos[test.rightPhotos.length - 1].uploadedTime}
                        </p>
                      )}
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {test.rightPhotos.map((image: any, index: number) => (
                          <div key={image.id || index} className="relative group">
                            <div className="aspect-square bg-green-100 rounded-lg overflow-hidden border border-green-200">
                              {image.url ? (
                                <img
                                  src={image.url}
                                  alt={`Right photo ${index + 1}`}
                                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-400">
                                  <Camera className="w-8 h-8" />
                                </div>
                              )}
                            </div>

                            {/* Remove button */}
                            <button
                              type="button"
                              onClick={() => removeRightPhoto(test.id, image.id)}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-600"
                              title="Remove image"
                            >
                              <X className="w-4 h-4" />
                            </button>

                            {/* Image name and timestamp */}
                            <div className="mt-2">
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

                {/* Right Side - Wrong Photos */}
                <div>
                  <label className="block text-slate-600 font-medium mb-2 text-sm  p-2 rounded">✗ Wrong/Incorrect Photo</label>
                  <div className="border-2 border-dashed border-red-300 bg-red-50 rounded-lg p-4 text-center hover:border-red-400 transition-colors cursor-pointer">
                    <input
                      ref={(el) => {
                        if (el) wrongPhotoRefs.current[test.id] = el
                      }}
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={(e) => handleWrongPhotoUpload(test.id, e)}
                      className="hidden"
                    />
                    <button
                      onClick={() => wrongPhotoRefs.current[test.id]?.click()}
                      className="flex flex-col items-center justify-center w-full"
                    >
                      <Upload className="w-6 h-6 text-red-400 mb-2" />
                      <p className="text-slate-600 text-sm font-medium">Upload wrong photos</p>
                      <p className="text-slate-500 text-xs mt-1">Click to browse</p>
                    </button>
                  </div>

                  {/* Wrong Photos List */}
                  {test.wrongPhotos && test.wrongPhotos.length > 0 && (
                    <div className="mt-6">
                      <h4 className="font-medium text-gray-900 mb-2">
                        Uploaded Images ({test.wrongPhotos.length}):
                      </h4>
                      {test.wrongPhotos.length > 0 && test.wrongPhotos[test.wrongPhotos.length - 1].uploadedDate && (
                        <p className="text-xs text-gray-500 mb-4">
                          Last uploaded: {test.wrongPhotos[test.wrongPhotos.length - 1].uploadedDate} at {test.wrongPhotos[test.wrongPhotos.length - 1].uploadedTime}
                        </p>
                      )}
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {test.wrongPhotos.map((image: any, index: number) => (
                          <div key={image.id || index} className="relative group">
                            <div className="aspect-square bg-red-100 rounded-lg overflow-hidden border border-red-200">
                              {image.url ? (
                                <img
                                  src={image.url}
                                  alt={`Wrong photo ${index + 1}`}
                                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-400">
                                  <Camera className="w-8 h-8" />
                                </div>
                              )}
                            </div>

                            {/* Remove button */}
                            <button
                              type="button"
                              onClick={() => removeWrongPhoto(test.id, image.id)}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-600"
                              title="Remove image"
                            >
                              <X className="w-4 h-4" />
                            </button>

                            {/* Image name and timestamp */}
                            <div className="mt-2">
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
          </div>
        </div>
      ))}

      <div>
        <label className="block text-slate-700 font-semibold mb-3">General Testing Photos:</label>
        <p className="text-slate-600 text-sm mb-4">
          Drop test, color rubbing, seam strength, factory reference samples
        </p>
        <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:border-blue-400 transition-colors cursor-pointer bg-slate-50/50">
          <input
            ref={generalTestingPhotoInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={handleGeneralTestingPhotoUpload}
            className="hidden"
          />
          <button
            onClick={() => generalTestingPhotoInputRef.current?.click()}
            className="flex flex-col items-center justify-center w-full"
          >
            <Upload className="w-12 h-12 text-slate-400 mx-auto mb-3" />
            <p className="text-slate-700 font-medium">Upload test photos</p>
            <p className="text-slate-500 text-sm mt-1">Drag & drop or click to browse</p>
          </button>
        </div>

        {/* Uploaded Photos List */}
        {formData.testingPhotos && formData.testingPhotos.length > 0 && (
          <div className="mt-6">
            <h4 className="font-medium text-gray-900 mb-2">
              Uploaded Images ({formData.testingPhotos.length}):
            </h4>
            {formData.testingPhotos.length > 0 && formData.testingPhotos[formData.testingPhotos.length - 1].uploadedDate && (
              <p className="text-xs text-gray-500 mb-4">
                Last uploaded: {formData.testingPhotos[formData.testingPhotos.length - 1].uploadedDate} at {formData.testingPhotos[formData.testingPhotos.length - 1].uploadedTime}
              </p>
            )}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {formData.testingPhotos.map((image: any, index: number) => (
                <div key={image.id || index} className="relative group">
                  <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                    {image.url ? (
                      <img
                        src={image.url}
                        alt={`Testing photo ${index + 1}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <Camera className="w-8 h-8" />
                      </div>
                    )}
                  </div>

                  {/* Remove button */}
                  <button
                    type="button"
                    onClick={() => removeGeneralTestingPhoto(image.id)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-600"
                    title="Remove image"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  {/* Image name and timestamp */}
                  <div className="mt-2">
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
  )
}