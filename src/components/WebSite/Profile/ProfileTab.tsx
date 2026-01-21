"use client";

import { useRef, useState, useEffect } from "react";
import {
  User,
  Camera,
  MapPin,
  Calendar,
  Phone,
  Mail,
  ChevronDown,
  User2,
} from "lucide-react";
import Dropdown from "@/components/UI/Dropdown";
import DatePicker from "@/components/UI/DatePicker";
import type { UserProfile } from "./types";

interface ProfileTabProps {
  editedProfile: UserProfile;
  setEditedProfile: (profile: UserProfile) => void;
  isEditing: boolean;
}

export default function ProfileTab({
  editedProfile,
  setEditedProfile,
  isEditing,
}: ProfileTabProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setEditedProfile({ ...editedProfile, avatar: result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    if (field.includes(".")) {
      const [parent, child] = field.split(".");
      setEditedProfile({
        ...editedProfile,
        [parent]: {
          ...(editedProfile as any)[parent],
          [child]: value,
        },
      });
    } else {
      setEditedProfile({
        ...editedProfile,
        [field]: value,
      });
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <div className="flex items-center gap-3 mb-6">
        <User className="w-6 h-6 text-gray-600" />
        <h2 className="text-xl font-bold text-slate-900">
          Profile Information
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Personal Information */}
        <div className="border-2 border-dashed border-slate-200 p-4 rounded-lg pt-6">
          <div className="flex items-center gap-2 mb-4">
            <User2 className="w-5 h-5 text-gray-600" />
            <h3 className="text-lg font-semibold text-slate-900">
              Personal Information
            </h3>
          </div>
          {/* Avatar Section */}
          <div className="flex items-center gap-6 mb-4 p-4 bg-slate-50 rounded-lg">
            <div className="relative">
              <div className="w-20 h-20 bg-slate-200 rounded-full flex items-center justify-center overflow-hidden">
                {editedProfile.avatar ? (
                  <img
                    src={editedProfile.avatar}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-8 h-8 text-slate-400" />
                )}
              </div>
              {isEditing && (
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute -bottom-1 -right-1 w-8 h-8 bg-gray-600 text-white rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"
                >
                  <Camera className="w-4 h-4" />
                </button>
              )}
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">Profile Picture</h3>
              <p className="text-sm text-slate-600">
                Upload a photo to personalize your account
              </p>
              {isEditing && (
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="mt-2 text-sm text-gray-600 hover:text-gray-700"
                >
                  Change Photo
                </button>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="hidden"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                First Name
              </label>
              <input
                type="text"
                value={editedProfile.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                disabled={!isEditing}
                placeholder="Enter your first name"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 disabled:bg-slate-50 disabled:text-slate-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Last Name
              </label>
              <input
                type="text"
                value={editedProfile.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                disabled={!isEditing}
                placeholder="Enter your last name"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 disabled:bg-slate-50 disabled:text-slate-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                <Mail className="w-4 h-4 inline mr-2" />
                Email Address
              </label>
              <input
                type="email"
                value={editedProfile.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                disabled={!isEditing}
                placeholder="Enter your email address"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 disabled:bg-slate-50 disabled:text-slate-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                <Phone className="w-4 h-4 inline mr-2" />
                Phone Number
              </label>
              <input
                type="tel"
                value={editedProfile.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                disabled={!isEditing}
                placeholder="Enter your phone number"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 disabled:bg-slate-50 disabled:text-slate-500"
              />
            </div>
            <div>
              <DatePicker
                label="Date of Birth"
                value={editedProfile.dateOfBirth}
                onChange={(value) => handleInputChange("dateOfBirth", value)}
                placeholder="Select your date of birth"
              />
            </div>
            <div>
              <Dropdown
                label="Gender"
                value={editedProfile.gender}
                options={[
                  { value: "male", label: "Male" },
                  { value: "female", label: "Female" },
                  { value: "other", label: "Other" },
                ]}
                onChange={(value) =>
                  handleInputChange("gender", value as string)
                }
                placeholder="Select gender"
              />
            </div>
          </div>
        </div>
        {/* Address Information */}
        <div className="border-2 border-dashed border-slate-200 p-4 rounded-lg pt-6">
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="w-5 h-5 text-gray-600" />
            <h3 className="text-lg font-semibold text-slate-900">
              Address Information
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Address Line 1
              </label>
              <input
                type="text"
                value={editedProfile.address.addressLine1}
                onChange={(e) =>
                  handleInputChange("address.addressLine1", e.target.value)
                }
                disabled={!isEditing}
                placeholder="Street address, P.O. box, company name"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 disabled:bg-slate-50 disabled:text-slate-500"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Address Line 2
              </label>
              <input
                type="text"
                value={editedProfile.address.addressLine2}
                onChange={(e) =>
                  handleInputChange("address.addressLine2", e.target.value)
                }
                disabled={!isEditing}
                placeholder="Apartment, suite, unit, building, floor, etc."
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 disabled:bg-slate-50 disabled:text-slate-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Landmark
              </label>
              <input
                type="text"
                value={editedProfile.address.landmark}
                onChange={(e) =>
                  handleInputChange("address.landmark", e.target.value)
                }
                disabled={!isEditing}
                placeholder="Nearby landmark"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 disabled:bg-slate-50 disabled:text-slate-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                City
              </label>
              <input
                type="text"
                value={editedProfile.address.city}
                onChange={(e) =>
                  handleInputChange("address.city", e.target.value)
                }
                disabled={!isEditing}
                placeholder="City"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 disabled:bg-slate-50 disabled:text-slate-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                State
              </label>
              <input
                type="text"
                value={editedProfile.address.state}
                onChange={(e) =>
                  handleInputChange("address.state", e.target.value)
                }
                disabled={!isEditing}
                placeholder="State/Province"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 disabled:bg-slate-50 disabled:text-slate-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                ZIP Code
              </label>
              <input
                type="text"
                value={editedProfile.address.zipCode}
                onChange={(e) =>
                  handleInputChange("address.zipCode", e.target.value)
                }
                disabled={!isEditing}
                placeholder="ZIP/Postal code"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 disabled:bg-slate-50 disabled:text-slate-500"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
