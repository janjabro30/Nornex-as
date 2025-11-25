"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  Twitter,
  Calendar,
  Plus,
  BarChart3,
  Image as ImageIcon,
  Send,
  Clock,
  CheckCircle,
  XCircle,
  Edit,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { SocialPlatform, PostStatus } from "@/types";

// Mock connected accounts
const mockAccounts = [
  {
    id: "1",
    platform: "FACEBOOK" as SocialPlatform,
    accountName: "Nornex AS",
    followers: 2500,
    isActive: true,
  },
  {
    id: "2",
    platform: "INSTAGRAM" as SocialPlatform,
    accountName: "@nornex_as",
    followers: 1800,
    isActive: true,
  },
  {
    id: "3",
    platform: "LINKEDIN" as SocialPlatform,
    accountName: "Nornex AS",
    followers: 950,
    isActive: true,
  },
  {
    id: "4",
    platform: "YOUTUBE" as SocialPlatform,
    accountName: "Nornex AS",
    followers: 320,
    isActive: false,
  },
];

// Mock scheduled posts
const mockPosts = [
  {
    id: "1",
    content:
      "🌿 Did you know? Every refurbished laptop saves up to 300kg of CO2 emissions! Choose sustainable IT with Nornex. #SustainableIT #CircularEconomy",
    platforms: ["FACEBOOK", "INSTAGRAM", "LINKEDIN"],
    scheduledFor: new Date(Date.now() + 1000 * 60 * 60 * 2),
    status: "SCHEDULED" as PostStatus,
  },
  {
    id: "2",
    content:
      "New stock alert! Grade A Dell Latitude laptops now available. Perfect for business use with full 12-month warranty. 💻 Shop now at nornex.no",
    platforms: ["FACEBOOK", "INSTAGRAM"],
    scheduledFor: new Date(Date.now() + 1000 * 60 * 60 * 24),
    status: "SCHEDULED" as PostStatus,
  },
  {
    id: "3",
    content:
      "Thank you for helping us recycle over 15,000 devices this year! Together we're making a difference. 🌍♻️",
    platforms: ["FACEBOOK", "LINKEDIN"],
    scheduledFor: new Date(Date.now() - 1000 * 60 * 60 * 48),
    status: "PUBLISHED" as PostStatus,
  },
];

// Mock analytics
const mockAnalytics = {
  totalPosts: 156,
  totalReach: 45200,
  engagement: 3.8,
  followers: 5570,
};

export default function SocialMediaPage() {
  const [showNewPost, setShowNewPost] = useState(false);
  const [newPost, setNewPost] = useState({
    content: "",
    platforms: [] as string[],
    scheduledFor: "",
  });

  const platformIcons: Record<SocialPlatform, typeof Facebook> = {
    FACEBOOK: Facebook,
    INSTAGRAM: Instagram,
    LINKEDIN: Linkedin,
    TWITTER: Twitter,
    YOUTUBE: Youtube,
  };

  const platformColors: Record<SocialPlatform, string> = {
    FACEBOOK: "text-blue-600 bg-blue-100",
    INSTAGRAM: "text-pink-600 bg-pink-100",
    LINKEDIN: "text-blue-700 bg-blue-100",
    TWITTER: "text-sky-500 bg-sky-100",
    YOUTUBE: "text-red-600 bg-red-100",
  };

  const statusColors: Record<PostStatus, string> = {
    DRAFT: "bg-gray-100 text-gray-700",
    SCHEDULED: "bg-yellow-100 text-yellow-700",
    PUBLISHED: "bg-green-100 text-green-700",
    FAILED: "bg-red-100 text-red-700",
  };

  const togglePlatform = (platform: string) => {
    setNewPost((prev) => ({
      ...prev,
      platforms: prev.platforms.includes(platform)
        ? prev.platforms.filter((p) => p !== platform)
        : [...prev.platforms, platform],
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-gray-900 text-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/admin-secure">
                <Button variant="ghost" size="icon" className="text-white">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              <div>
                <h1 className="text-xl font-bold">Social Media Management</h1>
                <p className="text-sm text-gray-400">
                  Manage accounts and schedule posts
                </p>
              </div>
            </div>
            <Button onClick={() => setShowNewPost(true)}>
              <Plus className="w-4 h-4 mr-2" />
              New Post
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Analytics Overview */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="py-4">
              <div className="flex items-center space-x-3">
                <Send className="w-8 h-8 text-blue-500" />
                <div>
                  <p className="text-sm text-gray-500">Total Posts</p>
                  <p className="text-2xl font-bold">{mockAnalytics.totalPosts}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="py-4">
              <div className="flex items-center space-x-3">
                <BarChart3 className="w-8 h-8 text-green-500" />
                <div>
                  <p className="text-sm text-gray-500">Total Reach</p>
                  <p className="text-2xl font-bold">
                    {mockAnalytics.totalReach.toLocaleString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="py-4">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-8 h-8 text-purple-500" />
                <div>
                  <p className="text-sm text-gray-500">Engagement Rate</p>
                  <p className="text-2xl font-bold">{mockAnalytics.engagement}%</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="py-4">
              <div className="flex items-center space-x-3">
                <Instagram className="w-8 h-8 text-pink-500" />
                <div>
                  <p className="text-sm text-gray-500">Total Followers</p>
                  <p className="text-2xl font-bold">
                    {mockAnalytics.followers.toLocaleString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Connected Accounts */}
          <Card>
            <CardHeader>
              <CardTitle>Connected Accounts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockAccounts.map((account) => {
                  const Icon = platformIcons[account.platform];
                  return (
                    <div
                      key={account.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <div
                          className={`p-2 rounded-full ${
                            platformColors[account.platform]
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-medium">{account.accountName}</p>
                          <p className="text-sm text-gray-500">
                            {account.followers.toLocaleString()} followers
                          </p>
                        </div>
                      </div>
                      <Badge variant={account.isActive ? "success" : "secondary"}>
                        {account.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                  );
                })}
                <Button variant="outline" className="w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Connect Account
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Scheduled Posts */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Scheduled Posts</CardTitle>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Calendar className="w-4 h-4 mr-2" />
                    Calendar View
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockPosts.map((post) => (
                  <div
                    key={post.id}
                    className="border rounded-lg p-4 hover:shadow-sm transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex space-x-2">
                        {post.platforms.map((platform) => {
                          const Icon =
                            platformIcons[platform as SocialPlatform];
                          return (
                            <div
                              key={platform}
                              className={`p-1.5 rounded-full ${
                                platformColors[platform as SocialPlatform]
                              }`}
                            >
                              <Icon className="w-4 h-4" />
                            </div>
                          );
                        })}
                      </div>
                      <Badge className={statusColors[post.status]}>
                        {post.status}
                      </Badge>
                    </div>
                    <p className="text-gray-700 text-sm mb-3">{post.content}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="w-4 h-4 mr-1" />
                        {new Date(post.scheduledFor).toLocaleString()}
                      </div>
                      {post.status === "SCHEDULED" && (
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-600"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* New Post Modal */}
        {showNewPost && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <Card className="w-full max-w-2xl mx-4">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Create New Post</CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowNewPost(false)}
                  >
                    <XCircle className="w-5 h-5" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Platforms
                  </label>
                  <div className="flex space-x-2">
                    {mockAccounts
                      .filter((a) => a.isActive)
                      .map((account) => {
                        const Icon = platformIcons[account.platform];
                        const isSelected = newPost.platforms.includes(
                          account.platform
                        );
                        return (
                          <button
                            key={account.id}
                            onClick={() => togglePlatform(account.platform)}
                            className={`p-3 rounded-lg border-2 transition-all ${
                              isSelected
                                ? "border-green-500 bg-green-50"
                                : "border-gray-200 hover:border-gray-300"
                            }`}
                          >
                            <Icon
                              className={`w-6 h-6 ${
                                isSelected
                                  ? "text-green-600"
                                  : "text-gray-400"
                              }`}
                            />
                          </button>
                        );
                      })}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Post Content
                  </label>
                  <Textarea
                    placeholder="What would you like to share?"
                    value={newPost.content}
                    onChange={(e) =>
                      setNewPost({ ...newPost, content: e.target.value })
                    }
                    rows={4}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {newPost.content.length}/280 characters
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Schedule For
                  </label>
                  <Input
                    type="datetime-local"
                    value={newPost.scheduledFor}
                    onChange={(e) =>
                      setNewPost({ ...newPost, scheduledFor: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Media (optional)
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">
                      Drag and drop images or click to upload
                    </p>
                  </div>
                </div>
                <div className="flex space-x-4 pt-4">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => setShowNewPost(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="flex-1"
                    disabled={
                      !newPost.content || newPost.platforms.length === 0
                    }
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    Schedule Post
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
}
