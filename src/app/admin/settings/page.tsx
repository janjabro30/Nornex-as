'use client'

import { useState } from 'react'
import { Upload, Save, RefreshCw, Globe, Palette } from 'lucide-react'
import { Button, Input } from '@/components/ui'

export default function AdminSettingsPage() {
  const [tagline, setTagline] = useState('NORNEX— Build, Repair, Protect.')
  const [siteName, setSiteName] = useState('Nornex AS')
  const [siteDescription, setSiteDescription] = useState('Your trusted partner for IT services, electronics, and tech solutions.')
  const [primaryColor, setPrimaryColor] = useState('#1e40af')
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    setIsSaving(true)
    // Simulate save
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSaving(false)
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600">Manage your site settings, logo, and branding</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Settings */}
        <div className="lg:col-span-2 space-y-8">
          {/* Logo & Branding */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <Palette className="w-5 h-5 text-blue-600" />
              Logo & Branding
            </h2>
            
            {/* Current Logo */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Current Logo</label>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                  <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">N</span>
                  </div>
                  <div>
                    <span className="font-bold text-blue-900 text-xl">NORNEX</span>
                    <p className="text-xs text-gray-500">{tagline}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Upload New Logo */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Upload New Logo</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors cursor-pointer">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                <p className="text-xs text-gray-400 mt-1">SVG, PNG or JPG (max. 2MB)</p>
                <input type="file" className="hidden" accept=".svg,.png,.jpg,.jpeg" />
              </div>
            </div>

            {/* Tagline */}
            <div className="mb-6">
              <Input
                label="Tagline"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                placeholder="Enter your tagline"
                helperText="Displayed in the footer and brand areas"
              />
            </div>

            {/* Primary Color */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Primary Brand Color</label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="w-12 h-12 rounded-lg cursor-pointer border border-gray-300"
                />
                <Input
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="w-32"
                />
              </div>
            </div>
          </div>

          {/* Site Information */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <Globe className="w-5 h-5 text-blue-600" />
              Site Information
            </h2>

            <div className="space-y-4">
              <Input
                label="Site Name"
                value={siteName}
                onChange={(e) => setSiteName(e.target.value)}
                placeholder="Enter site name"
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Site Description</label>
                <textarea
                  value={siteDescription}
                  onChange={(e) => setSiteDescription(e.target.value)}
                  rows={3}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter site description"
                />
                <p className="mt-1 text-xs text-gray-500">Used for SEO and meta descriptions</p>
              </div>

              <Input
                label="Contact Email"
                type="email"
                defaultValue="contact@nornex.no"
                placeholder="Enter contact email"
              />

              <Input
                label="Phone Number"
                type="tel"
                defaultValue="+47 123 45 678"
                placeholder="Enter phone number"
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <textarea
                  rows={2}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  defaultValue="123 Tech Street, Oslo, Norway"
                  placeholder="Enter business address"
                />
              </div>
            </div>
          </div>

          {/* Favicon */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Favicon</h2>
            
            <div className="flex items-start gap-6">
              <div className="shrink-0">
                <p className="text-sm font-medium text-gray-700 mb-2">Current Favicon</p>
                <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center border">
                  <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                    <span className="text-sm font-bold text-white">N</span>
                  </div>
                </div>
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-600 mb-4">
                  The favicon is automatically generated from your logo. You can also upload a custom favicon.
                </p>
                <div className="flex gap-3">
                  <Button variant="outline" size="sm">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Custom
                  </Button>
                  <Button variant="ghost" size="sm">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Regenerate from Logo
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Preview */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm p-6 sticky top-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Preview</h2>

            {/* Header Preview */}
            <div className="mb-6">
              <p className="text-sm font-medium text-gray-700 mb-2">Header</p>
              <div className="bg-gray-100 rounded-lg p-3 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
                  <span className="font-bold text-white">N</span>
                </div>
                <span className="font-bold text-blue-900">NORNEX</span>
              </div>
            </div>

            {/* Footer Preview */}
            <div className="mb-6">
              <p className="text-sm font-medium text-gray-700 mb-2">Footer</p>
              <div className="bg-gray-900 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
                    <span className="font-bold text-white">N</span>
                  </div>
                  <div>
                    <span className="font-bold text-white block">NORNEX</span>
                    <span className="text-xs text-gray-400">{tagline.replace('NORNEX— ', '')}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Browser Tab Preview */}
            <div className="mb-6">
              <p className="text-sm font-medium text-gray-700 mb-2">Browser Tab</p>
              <div className="bg-gray-200 rounded-t-lg p-2 flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-blue-600 flex items-center justify-center">
                  <span className="text-[8px] font-bold text-white">N</span>
                </div>
                <span className="text-xs text-gray-700 truncate">{siteName} - {tagline.replace('NORNEX— ', '')}</span>
              </div>
            </div>

            {/* Save Button */}
            <Button className="w-full" onClick={handleSave} isLoading={isSaving}>
              <Save className="w-4 h-4 mr-2" />
              Save Settings
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
