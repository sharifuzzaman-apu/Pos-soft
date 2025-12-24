'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Modal from '@/components/ui/Modal';
import Input from '@/components/ui/Input';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

export default function UserProfile({
  user = {
    name: 'Admin User',
    email: 'admin@possoft.com',
    phone: '+880 1234-567890',
    role: 'Administrator',
    avatar: null,
    status: 'active',
  },
  onLogout,
  onUpdateProfile,
  size = 'sm',
  showDropdown = true,
  className = '',
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState(user);

  const closeDropdown = () => setIsDropdownOpen(false);
  const openProfileModal = () => {
    setIsProfileModalOpen(true);
    closeDropdown();
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSaveProfile = () => {
    if (onUpdateProfile) {
      onUpdateProfile(formData);
    }
    setIsEditMode(false);
  };

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
    closeDropdown();
  };

  // Avatar component
  const Avatar = ({ className: avatarClass = '' }) => (
    <div
      className={`bg-gradient-to-br from-purple-600 to-blue-500 rounded-full flex items-center justify-center ${avatarClass}`}
    >
      {user.avatar ? (
        <img
          src={user.avatar}
          alt={user.name}
          className="w-full h-full rounded-full object-cover"
        />
      ) : (
        <span className="text-white font-semibold">
          {user.name?.charAt(0)?.toUpperCase() || 'U'}
        </span>
      )}
    </div>
  );

  if (!showDropdown) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <Avatar className="w-8 h-8" />
        <div className="hidden sm:block">
          <p className="text-sm font-medium text-gray-900">{user.name}</p>
          <Badge variant="success" size="sm">
            {user.status}
          </Badge>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {/* Profile Button */}
      <Button
        variant="secondary"
        size={size}
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="flex items-center gap-2"
      >
        <Avatar className="w-8 h-8" />
        <span className="hidden sm:block font-medium">{user.name}</span>
        {isDropdownOpen ? (
          <FaChevronUp className="text-xs" />
        ) : (
          <FaChevronDown className="text-xs" />
        )}
      </Button>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={closeDropdown} />
          <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-20 animate-slide-down">
            {/* User Info */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center gap-3 mb-3">
                <Avatar className="w-12 h-12" />
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">{user.name}</p>
                  <p className="text-xs text-gray-600">{user.role}</p>
                </div>
              </div>
              <Badge
                variant={user.status === 'active' ? 'success' : 'gray'}
                size="sm"
              >
                {user.status === 'active' ? 'Active' : 'Inactive'}
              </Badge>
            </div>

            {/* Contact Info */}
            <div className="p-4 border-b border-gray-200 space-y-2">
              <div className="text-sm text-gray-600">
                <p className="font-semibold text-gray-900">Email</p>
                <p>{user.email}</p>
              </div>
              {user.phone && (
                <div className="text-sm text-gray-600">
                  <p className="font-semibold text-gray-900">Phone</p>
                  <p>{user.phone}</p>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="p-2 space-y-1">
              <Button
                variant="outline"
                size="sm"
                onClick={openProfileModal}
                className="w-full justify-between"
              >
                <span>View Profile</span>
                <span className="text-xs text-gray-500">Open</span>
              </Button>

              <Button
                variant="outline"
                size="sm"
                className="w-full justify-between"
              >
                <span>Settings</span>
                <span className="text-xs text-gray-500">Manage</span>
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="w-full justify-between text-red-600 hover:bg-red-50 hover:border-red-200"
              >
                <span>Logout</span>
                <span className="text-xs">Exit</span>
              </Button>
            </div>
          </div>
        </>
      )}

      {/* Profile Modal */}
      <Modal
        isOpen={isProfileModalOpen}
        onClose={() => {
          setIsProfileModalOpen(false);
          setIsEditMode(false);
          setFormData(user);
        }}
        title="User Profile"
        size="md"
      >
        <div className="space-y-6">
          {/* Avatar Section */}
          <div className="flex flex-col items-center">
            <Avatar className="w-24 h-24" />
            <Badge variant="success" size="sm" className="mt-2">
              {user.status}
            </Badge>
          </div>

          {/* Profile Form */}
          {isEditMode ? (
            <div className="space-y-4">
              <Input
                name="name"
                label="Full Name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
              <Input
                name="email"
                type="email"
                label="Email Address"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              <Input
                name="phone"
                type="tel"
                label="Phone Number"
                value={formData.phone}
                onChange={handleInputChange}
              />
              <Input
                name="role"
                label="Role"
                value={formData.role}
                onChange={handleInputChange}
                disabled
              />

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <Button
                  variant="primary"
                  onClick={handleSaveProfile}
                  className="flex-1"
                >
                  Save Changes
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => {
                    setIsEditMode(false);
                    setFormData(user);
                  }}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* View Mode */}
              <div>
                <label className="label">Full Name</label>
                <p className="text-gray-900 font-medium">{user.name}</p>
              </div>
              <div>
                <label className="label">Email Address</label>
                <p className="text-gray-900 font-medium">{user.email}</p>
              </div>
              {user.phone && (
                <div>
                  <label className="label">Phone Number</label>
                  <p className="text-gray-900 font-medium">{user.phone}</p>
                </div>
              )}
              <div>
                <label className="label">Role</label>
                <Badge variant="purple">{user.role}</Badge>
              </div>

              {/* Edit Button */}
              <div className="pt-4">
                <Button
                  variant="primary"
                  onClick={() => setIsEditMode(true)}
                  className="w-full"
                >
                  <span>Edit Profile</span>
                </Button>
              </div>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
}
