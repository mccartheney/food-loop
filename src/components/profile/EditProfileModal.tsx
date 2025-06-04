'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiUser, FiMapPin, FiCamera, FiSave, FiLoader } from 'react-icons/fi';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: {
    bio: string | null;
    address: string | null;
    profileImg: string | null;
    user: {
      name: string;
      email: string;
    };
  };
  onUpdate: (updatedData: { bio: string; address: string; profileImg?: string }) => Promise<void>;
}

export default function EditProfileModal({ 
  isOpen, 
  onClose, 
  profile, 
  onUpdate 
}: EditProfileModalProps) {
  const [formData, setFormData] = useState({
    bio: profile.bio || '',
    address: profile.address || '',
    profileImg: profile.profileImg || '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [imagePreview, setImagePreview] = useState<string | null>(profile.profileImg);

  const modalRef = useRef<HTMLDivElement>(null);
  const bioTextareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Reset form data when profile changes
  useEffect(() => {
    setFormData({
      bio: profile.bio || '',
      address: profile.address || '',
      profileImg: profile.profileImg || '',
    });
    setImagePreview(profile.profileImg);
    setErrors({});
  }, [profile]);

  // Focus bio textarea when modal opens
  useEffect(() => {
    if (isOpen && bioTextareaRef.current) {
      setTimeout(() => {
        bioTextareaRef.current?.focus();
      }, 300);
    }
  }, [isOpen]);

  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (formData.bio.length > 500) {
      newErrors.bio = 'Bio cannot exceed 500 characters';
    }

    if (formData.address.length > 200) {
      newErrors.address = 'Address cannot exceed 200 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setErrors(prev => ({ ...prev, profileImg: 'Please select a valid image file' }));
      return;
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      setErrors(prev => ({ ...prev, profileImg: 'Image size cannot exceed 5MB' }));
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setImagePreview(result);
      setFormData(prev => ({ ...prev, profileImg: result }));
      setErrors(prev => ({ ...prev, profileImg: '' }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      await onUpdate({
        bio: formData.bio.trim(),
        address: formData.address.trim(),
        profileImg: formData.profileImg,
      });
      onClose();
    } catch (error) {
      console.error('Error updating profile:', error);
      setErrors({ submit: 'Failed to update profile. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Background overlay */}
      <div className="fixed inset-0 z-40 bg-black bg-opacity-50" onClick={onClose} />
      
      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <AnimatePresence>
          <motion.div
            ref={modalRef}
            className="bg-white rounded-xl w-full max-w-md max-h-[90vh] flex flex-col shadow-2xl pointer-events-auto"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Header */}
            <div className="border-b p-4 flex items-center justify-between">
              <h3 className="font-semibold text-lg">Edit Profile</h3>
              <button 
                className="text-gray-600 hover:text-gray-800 transition-colors" 
                onClick={onClose}
                disabled={isLoading}
              >
                <FiX size={24} />
              </button>
            </div>
            
            {/* Form */}
            <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
              <div className="flex-1 overflow-y-auto p-4 space-y-6">
                
                {/* Profile Image Section */}
                <div className="flex flex-col items-center space-y-3">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-full bg-base-200 border-2 border-base-300 overflow-hidden">
                      {imagePreview ? (
                        <img
                          src={imagePreview}
                          alt="Profile preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          <FiUser size={24} />
                        </div>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="absolute -bottom-1 -right-1 bg-primary text-white p-2 rounded-full hover:bg-primary-focus transition-colors"
                      disabled={isLoading}
                    >
                      <FiCamera size={12} />
                    </button>
                  </div>
                  
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  
                  <div className="text-center">
                    <div className="font-medium">{profile.user.name}</div>
                    <div className="text-sm text-gray-500">{profile.user.email}</div>
                  </div>
                  
                  {errors.profileImg && (
                    <div className="text-red-500 text-xs text-center">{errors.profileImg}</div>
                  )}
                </div>

                {/* Bio Section */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <FiUser size={16} />
                    Bio
                  </label>
                  <textarea
                    ref={bioTextareaRef}
                    value={formData.bio}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    placeholder="Tell us about yourself..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary resize-none h-24"
                    maxLength={500}
                    disabled={isLoading}
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>{errors.bio && <span className="text-red-500">{errors.bio}</span>}</span>
                    <span>{formData.bio.length}/500</span>
                  </div>
                </div>

                {/* Address Section */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <FiMapPin size={16} />
                    Location
                  </label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    placeholder="Where are you located?"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    maxLength={200}
                    disabled={isLoading}
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>{errors.address && <span className="text-red-500">{errors.address}</span>}</span>
                    <span>{formData.address.length}/200</span>
                  </div>
                </div>

                {/* Submit Error */}
                {errors.submit && (
                  <div className="text-red-500 text-sm text-center bg-red-50 p-3 rounded-lg">
                    {errors.submit}
                  </div>
                )}
              </div>

              {/* Footer Actions */}
              <div className="border-t p-4 flex gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  disabled={isLoading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-focus transition-colors flex items-center justify-center gap-2"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <FiLoader className="animate-spin" size={16} />
                      Saving...
                    </>
                  ) : (
                    <>
                      <FiSave size={16} />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
}
