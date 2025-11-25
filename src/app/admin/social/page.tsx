'use client'

import { useState } from 'react'
import { Facebook, Instagram, Linkedin, Plus, Calendar, Send, Eye, Edit, Trash2, Check, X, BarChart3 } from 'lucide-react'
import { Button, Input } from '@/components/ui'

// TikTok icon
function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
    </svg>
  )
}

const platforms = [
  { id: 'facebook', name: 'Facebook', icon: Facebook, color: 'bg-blue-600', connected: true, followers: '12.5K' },
  { id: 'instagram', name: 'Instagram', icon: Instagram, color: 'bg-gradient-to-br from-purple-600 to-pink-500', connected: true, followers: '8.2K' },
  { id: 'linkedin', name: 'LinkedIn', icon: Linkedin, color: 'bg-blue-700', connected: false, followers: '0' },
  { id: 'tiktok', name: 'TikTok', icon: TikTokIcon, color: 'bg-black', connected: false, followers: '0' },
]

const mockPosts = [
  {
    id: '1',
    content: 'Check out our new Dell XPS 15 laptop - now with 4K OLED display! 🔥💻',
    platforms: ['facebook', 'instagram'],
    status: 'published',
    scheduledFor: null,
    publishedAt: '2024-01-15 10:30',
    stats: { likes: 234, comments: 45, shares: 12 },
  },
  {
    id: '2',
    content: 'Big sale this weekend! Up to 30% off on all peripherals. Don\'t miss out! 🎉',
    platforms: ['facebook', 'instagram', 'linkedin'],
    status: 'scheduled',
    scheduledFor: '2024-01-20 09:00',
    publishedAt: null,
    stats: null,
  },
  {
    id: '3',
    content: 'New AMD Ryzen 9 7950X processors now in stock! Ultimate performance for creators.',
    platforms: ['facebook'],
    status: 'draft',
    scheduledFor: null,
    publishedAt: null,
    stats: null,
  },
]

const statusColors: Record<string, string> = {
  draft: 'bg-gray-100 text-gray-800',
  scheduled: 'bg-blue-100 text-blue-800',
  published: 'bg-green-100 text-green-800',
  failed: 'bg-red-100 text-red-800',
}

export default function AdminSocialPage() {
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showConnectModal, setShowConnectModal] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<'posts' | 'analytics'>('posts')

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Social Media</h1>
          <p className="text-gray-600">Manage your social media accounts and posts</p>
        </div>
        <Button onClick={() => setShowCreateModal(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Create Post
        </Button>
      </div>

      {/* Connected Accounts */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {platforms.map((platform) => (
          <div key={platform.id} className="bg-white rounded-xl shadow-sm p-4">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2 rounded-lg text-white ${platform.color}`}>
                <platform.icon className="w-5 h-5" />
              </div>
              {platform.connected ? (
                <span className="flex items-center gap-1 text-xs text-green-600">
                  <Check className="w-3 h-3" />
                  Connected
                </span>
              ) : (
                <span className="flex items-center gap-1 text-xs text-gray-500">
                  <X className="w-3 h-3" />
                  Not Connected
                </span>
              )}
            </div>
            <h3 className="font-medium text-gray-900">{platform.name}</h3>
            {platform.connected ? (
              <p className="text-sm text-gray-500">{platform.followers} followers</p>
            ) : (
              <button
                onClick={() => setShowConnectModal(platform.id)}
                className="text-sm text-blue-600 hover:underline mt-1"
              >
                Connect Account
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm">
        <div className="border-b flex">
          <button
            onClick={() => setActiveTab('posts')}
            className={`px-6 py-3 text-sm font-medium border-b-2 -mb-px transition-colors ${
              activeTab === 'posts'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Posts
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-6 py-3 text-sm font-medium border-b-2 -mb-px transition-colors ${
              activeTab === 'analytics'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Analytics
          </button>
        </div>

        {/* Posts Tab */}
        {activeTab === 'posts' && (
          <div className="p-6">
            <div className="space-y-4">
              {mockPosts.map((post) => (
                <div key={post.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <p className="text-gray-900 mb-2">{post.content}</p>
                      <div className="flex items-center gap-2 mb-2">
                        {post.platforms.map((platformId) => {
                          const platform = platforms.find(p => p.id === platformId)
                          if (!platform) return null
                          return (
                            <span key={platformId} className={`p-1 rounded text-white ${platform.color}`}>
                              <platform.icon className="w-4 h-4" />
                            </span>
                          )
                        })}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[post.status]}`}>
                          {post.status}
                        </span>
                        {post.publishedAt && (
                          <span>Published: {post.publishedAt}</span>
                        )}
                        {post.scheduledFor && (
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            Scheduled: {post.scheduledFor}
                          </span>
                        )}
                      </div>
                      {post.stats && (
                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                          <span>❤️ {post.stats.likes}</span>
                          <span>💬 {post.stats.comments}</span>
                          <span>🔄 {post.stats.shares}</span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="p-1 text-gray-500 hover:text-blue-600 transition-colors" title="View">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-500 hover:text-blue-600 transition-colors" title="Edit">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-500 hover:text-red-600 transition-colors" title="Delete">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <BarChart3 className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-medium text-gray-700">Total Reach</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">45.2K</p>
                <p className="text-sm text-green-600">+12% from last month</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm font-medium text-gray-700">Total Engagement</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">3,456</p>
                <p className="text-sm text-green-600">+8% from last month</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm font-medium text-gray-700">Posts Published</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">24</p>
                <p className="text-sm text-gray-500">This month</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Create Post Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <h2 className="text-lg font-semibold">Create New Post</h2>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                <textarea
                  rows={4}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="What do you want to share?"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Platforms</label>
                <div className="flex flex-wrap gap-2">
                  {platforms.filter(p => p.connected).map((platform) => (
                    <label key={platform.id} className="flex items-center gap-2 px-3 py-2 border rounded-lg cursor-pointer hover:bg-gray-50">
                      <input type="checkbox" className="w-4 h-4 text-blue-600" />
                      <platform.icon className="w-4 h-4" />
                      <span className="text-sm">{platform.name}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Schedule Date</label>
                  <Input type="date" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Schedule Time</label>
                  <Input type="time" />
                </div>
              </div>
            </div>
            <div className="p-6 border-t flex justify-between">
              <Button variant="outline" onClick={() => setShowCreateModal(false)}>
                Save as Draft
              </Button>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setShowCreateModal(false)}>
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule
                </Button>
                <Button onClick={() => setShowCreateModal(false)}>
                  <Send className="w-4 h-4 mr-2" />
                  Post Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Connect Account Modal */}
      {showConnectModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4">
            <div className="p-6 border-b">
              <h2 className="text-lg font-semibold">Connect {platforms.find(p => p.id === showConnectModal)?.name}</h2>
            </div>
            <div className="p-6 space-y-4">
              <p className="text-sm text-gray-600">
                Enter your API credentials to connect your {platforms.find(p => p.id === showConnectModal)?.name} account.
              </p>
              <Input label="App ID / Client ID" placeholder="Enter App ID" />
              <Input label="App Secret / Client Secret" type="password" placeholder="Enter App Secret" />
              <Input label="Access Token" type="password" placeholder="Enter Access Token" />
              {showConnectModal === 'facebook' && (
                <Input label="Page ID" placeholder="Enter Page ID" />
              )}
            </div>
            <div className="p-6 border-t flex justify-end gap-3">
              <Button variant="outline" onClick={() => setShowConnectModal(null)}>Cancel</Button>
              <Button onClick={() => setShowConnectModal(null)}>Connect</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
