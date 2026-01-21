'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/UI/Card';
import { Button } from '@/components/UI/Button';
import { User, Mail, Lock, Bell, Shield, Trash2, Save, Upload, Eye, EyeOff } from 'lucide-react';

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  bio: string;
  avatar?: string;
}

const mockProfile: UserProfile = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@artisanhomegoods.com',
  phone: '+1 (555) 123-4567',
  bio: 'Passionate artisan creating beautiful home goods with traditional craftsmanship techniques.'
};

export default function AccountSettings() {
  const [profile, setProfile] = useState<UserProfile>(mockProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleInputChange = (field: keyof UserProfile, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-red-800">Account Settings</h1>
          <p className="text-slate-600">Manage your personal account information and preferences</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="border border-red-200">
            <CardHeader className="bg-red-50 border-b border-red-200">
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center text-red-800">
                  <User className="w-5 h-5 mr-2" />
                  Profile Information
                </CardTitle>
                <Button 
                  onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                  variant={isEditing ? 'default' : 'outline'}
                  className={isEditing ? 'bg-red-800 hover:bg-red-700' : 'hover:bg-red-50 hover:border-red-300'}
                >
                  {isEditing ? (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </>
                  ) : (
                    'Edit Profile'
                  )}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">First Name</label>
                  <input
                    type="text"
                    value={profile.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-red-200 rounded-lg focus:ring-2 focus:ring-red-700 focus:border-red-700 disabled:bg-red-50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Last Name</label>
                  <input
                    type="text"
                    value={profile.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-red-200 rounded-lg focus:ring-2 focus:ring-red-700 focus:border-red-700 disabled:bg-red-50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-red-200 rounded-lg focus:ring-2 focus:ring-red-700 focus:border-red-700 disabled:bg-red-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  value={profile.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-red-200 rounded-lg focus:ring-2 focus:ring-red-700 focus:border-red-700 disabled:bg-red-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Bio</label>
                <textarea
                  value={profile.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  disabled={!isEditing}
                  rows={3}
                  className="w-full px-3 py-2 border border-red-200 rounded-lg focus:ring-2 focus:ring-red-700 focus:border-red-700 disabled:bg-red-50"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="border border-red-200">
            <CardHeader className="bg-red-50 border-b border-red-200">
              <CardTitle className="flex items-center text-red-800">
                <Lock className="w-5 h-5 mr-2" />
                Change Password
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Current Password</label>
                <div className="relative">
                  <input
                    type={showCurrentPassword ? 'text' : 'password'}
                    className="w-full px-3 py-2 pr-10 border border-red-200 rounded-lg focus:ring-2 focus:ring-red-700 focus:border-red-700"
                    placeholder="Enter current password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showCurrentPassword ? (
                      <EyeOff className="w-4 h-4 text-slate-400" />
                    ) : (
                      <Eye className="w-4 h-4 text-slate-400" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">New Password</label>
                <div className="relative">
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    className="w-full px-3 py-2 pr-10 border border-red-200 rounded-lg focus:ring-2 focus:ring-red-700 focus:border-red-700"
                    placeholder="Enter new password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showNewPassword ? (
                      <EyeOff className="w-4 h-4 text-slate-400" />
                    ) : (
                      <Eye className="w-4 h-4 text-slate-400" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Confirm New Password</label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    className="w-full px-3 py-2 pr-10 border border-red-200 rounded-lg focus:ring-2 focus:ring-red-700 focus:border-red-700"
                    placeholder="Confirm new password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-4 h-4 text-slate-400" />
                    ) : (
                      <Eye className="w-4 h-4 text-slate-400" />
                    )}
                  </button>
                </div>
              </div>

              <Button className="bg-red-800 hover:bg-red-700">
                Update Password
              </Button>
            </CardContent>
          </Card>

          <Card className="border border-red-200">
            <CardHeader className="bg-red-50 border-b border-red-200">
              <CardTitle className="flex items-center text-red-800">
                <Bell className="w-5 h-5 mr-2" />
                Notification Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-red-800">Email Notifications</p>
                    <p className="text-sm text-slate-600">Receive notifications via email</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-800"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-red-800">Order Updates</p>
                    <p className="text-sm text-slate-600">Get notified about new orders</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-800"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-red-800">Marketing Updates</p>
                    <p className="text-sm text-slate-600">Receive marketing and promotional emails</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-800"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-red-800">Low Stock Alerts</p>
                    <p className="text-sm text-slate-600">Get alerted when inventory is low</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-800"></div>
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border border-red-200">
            <CardHeader className="bg-red-50 border-b border-red-200">
              <CardTitle className="text-red-800">Profile Picture</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="w-32 h-32 mx-auto bg-red-50 rounded-full flex items-center justify-center mb-4">
                <User className="w-12 h-12 text-red-400" />
              </div>
              <Button variant="outline" className="w-full mb-2 hover:bg-red-50 hover:border-red-300">
                <Upload className="w-4 h-4 mr-2" />
                Upload Photo
              </Button>
              <Button variant="outline" className="w-full hover:bg-red-50 hover:border-red-300">
                Remove Photo
              </Button>
              <p className="text-xs text-slate-500 mt-2">
                JPG, PNG or GIF. Max size 2MB.
              </p>
            </CardContent>
          </Card>

          <Card className="border border-red-200">
            <CardHeader className="bg-red-50 border-b border-red-200">
              <CardTitle className="flex items-center text-red-800">
                <Shield className="w-5 h-5 mr-2" />
                Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-red-800">Two-Factor Authentication</p>
                  <p className="text-sm text-slate-600">Add an extra layer of security</p>
                </div>
                <Button variant="outline" size="sm" className="hover:bg-red-50 hover:border-red-300">
                  Enable
                </Button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-red-800">Login Sessions</p>
                  <p className="text-sm text-slate-600">Manage active sessions</p>
                </div>
                <Button variant="outline" size="sm" className="hover:bg-red-50 hover:border-red-300">
                  View
                </Button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-red-800">Download Data</p>
                  <p className="text-sm text-slate-600">Export your account data</p>
                </div>
                <Button variant="outline" size="sm" className="hover:bg-red-50 hover:border-red-300">
                  Export
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-red-300">
            <CardHeader className="bg-red-50 border-b border-red-200">
              <CardTitle className="flex items-center text-red-800">
                <Trash2 className="w-5 h-5 mr-2" />
                Danger Zone
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="font-medium text-red-800 mb-2">Delete Account</p>
                <p className="text-sm text-slate-600 mb-4">
                  Permanently delete your account and all associated data. This action cannot be undone.
                </p>
                <Button variant="outline" className="w-full border-red-300 text-red-800 hover:bg-red-50">
                  Delete Account
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
