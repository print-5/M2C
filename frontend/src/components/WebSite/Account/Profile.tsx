import { UserProfile } from './types';

interface ProfileProps {
  editedProfile: UserProfile;
  setEditedProfile: (profile: UserProfile) => void;
  isEditing: boolean;
}

const Profile = ({ editedProfile, setEditedProfile, isEditing }: ProfileProps) => {
  return (
    <div className="space-y-8">
      {/* Profile Form */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Personal Information */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-6">Personal Information</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">First Name</label>
                <input
                  type="text"
                  placeholder="Enter your first name"
                  value={editedProfile.firstName}
                  onChange={(e) => setEditedProfile({ ...editedProfile, firstName: e.target.value })}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-slate-50 disabled:text-slate-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Last Name</label>
                <input
                  type="text"
                  placeholder="Enter your last name"
                  value={editedProfile.lastName}
                  onChange={(e) => setEditedProfile({ ...editedProfile, lastName: e.target.value })}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-slate-50 disabled:text-slate-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
              <input
                type="email"
                placeholder="Enter your email address"
                value={editedProfile.email}
                onChange={(e) => setEditedProfile({ ...editedProfile, email: e.target.value })}
                disabled={!isEditing}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-slate-50 disabled:text-slate-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Phone Number</label>
              <input
                type="tel"
                placeholder="Enter your phone number"
                value={editedProfile.phone}
                onChange={(e) => setEditedProfile({ ...editedProfile, phone: e.target.value })}
                disabled={!isEditing}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-slate-50 disabled:text-slate-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Date of Birth</label>
                <input
                  type="date"
                  value={editedProfile.dateOfBirth}
                  onChange={(e) => setEditedProfile({ ...editedProfile, dateOfBirth: e.target.value })}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-slate-50 disabled:text-slate-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Gender</label>
                <select
                  value={editedProfile.gender}
                  onChange={(e) => setEditedProfile({ ...editedProfile, gender: e.target.value })}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-slate-50 disabled:text-slate-500"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                  <option value="prefer-not-to-say">Prefer not to say</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Address Information */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-6">Address Information</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Address Line 1</label>
                <input
                  type="text"
                  placeholder="Enter your address line 1"
                  value={editedProfile.address.addressLine1}
                  onChange={(e) => setEditedProfile({ 
                    ...editedProfile, 
                    address: { ...editedProfile.address, addressLine1: e.target.value }
                  })}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-slate-50 disabled:text-slate-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Address Line 2</label>
                <input
                  type="text"
                  placeholder="Enter your address line 2"
                  value={editedProfile.address.addressLine2}
                  onChange={(e) => setEditedProfile({ 
                    ...editedProfile, 
                    address: { ...editedProfile.address, addressLine2: e.target.value }
                  })}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-slate-50 disabled:text-slate-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Landmark <span className="text-xs text-slate-500">(Optional)</span></label>
              <input
                type="text"
                placeholder="Enter a landmark (e.g., near the park)"
                value={editedProfile.address.landmark}
                onChange={(e) => setEditedProfile({ 
                  ...editedProfile, 
                  address: { ...editedProfile.address, landmark: e.target.value }
                })}
                disabled={!isEditing}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-slate-50 disabled:text-slate-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">City</label>
                <input
                  type="text"
                  placeholder="Enter your city"
                  value={editedProfile.address.city}
                  onChange={(e) => setEditedProfile({ 
                    ...editedProfile, 
                    address: { ...editedProfile.address, city: e.target.value }
                  })}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-slate-50 disabled:text-slate-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">State</label>
                <input
                  type="text"
                  placeholder="Enter your state"
                  value={editedProfile.address.state}
                  onChange={(e) => setEditedProfile({ 
                    ...editedProfile, 
                    address: { ...editedProfile.address, state: e.target.value }
                  })}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-slate-50 disabled:text-slate-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">ZIP Code</label>
                <input
                  type="text"
                  placeholder="Enter your ZIP code"
                  value={editedProfile.address.zipCode}
                  onChange={(e) => setEditedProfile({ 
                    ...editedProfile, 
                    address: { ...editedProfile.address, zipCode: e.target.value }
                  })}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-slate-50 disabled:text-slate-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Country</label>
                <select
                  value={editedProfile.address.country}
                  onChange={(e) => setEditedProfile({ 
                    ...editedProfile, 
                    address: { ...editedProfile.address, country: e.target.value }
                  })}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-slate-50 disabled:text-slate-500"
                >
                  <option value="United States">United States</option>
                  <option value="Canada">Canada</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="India">India</option>
                  <option value="Australia">Australia</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
