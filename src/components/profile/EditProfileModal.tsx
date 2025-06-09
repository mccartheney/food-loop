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
      <div className="fixed inset-0 z-40 bg-black bg-opacity-30 backdrop-blur-sm" onClick={onClose} />
      
      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <AnimatePresence>
          <motion.div
            ref={modalRef}
            className="modern-card rounded-2xl w-full max-w-md max-h-[90vh] flex flex-col shadow-2xl pointer-events-auto"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Header */}
            <div className="border-b border-white/20 p-6 flex items-center justify-between">
              <h3 className="font-semibold text-xl gradient-text">Editar Perfil</h3>
              <button 
                className="text-gray-600 hover:text-gray-800 transition-colors p-1 rounded-full hover:bg-gray-100" 
                onClick={onClose}
                disabled={isLoading}
              >
                <FiX size={20} />
              </button>
            </div>
            
            {/* Form */}
            <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
              <div className="flex-1 overflow-y-auto p-6 space-y-8">
                
                {/* Profile Image Section */}
                <div className="flex flex-col items-center space-y-4">
                  <div className="relative">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-1 shadow-xl">
                      <div className="w-full h-full rounded-full bg-white p-1">
                        <div className="w-full h-full rounded-full overflow-hidden bg-gray-100">
                          {imagePreview ? (
                            <img
                              src={imagePreview}
                              alt="Profile preview"
                              className="w-full h-full object-cover rounded-full"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                              <FiUser size={28} />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <motion.button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="absolute -bottom-1 -right-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white p-2.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
                      disabled={isLoading}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <FiCamera size={14} />
                    </motion.button>
                  </div>
                  
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  
                  <div className="text-center">
                    <div className="font-semibold text-lg text-gray-800">{profile.user.name}</div>
                    <div className="text-gray-500">@{profile.user.email.split('@')[0]}</div>
                  </div>
                  
                  {errors.profileImg && (
                    <div className="text-red-500 text-xs text-center">{errors.profileImg}</div>
                  )}
                </div>

                {/* Bio Section */}
                <div className="space-y-3">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <FiUser size={18} />
                    Bio
                  </label>
                  <textarea
                    ref={bioTextareaRef}
                    value={formData.bio}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    placeholder="Conte um pouco sobre você..."
                    className="w-full px-4 py-3 glass-effect border border-white/30 rounded-xl focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/50 resize-none h-28 placeholder-gray-500"
                    maxLength={500}
                    disabled={isLoading}
                  />
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>{errors.bio && <span className="text-red-500">{errors.bio}</span>}</span>
                    <span className="font-medium">{formData.bio.length}/500</span>
                  </div>
                </div>

                {/* Address Section */}
                <div className="space-y-3">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <FiMapPin size={18} />
                    Localização
                  </label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    placeholder="Onde você está localizado?"
                    className="w-full px-4 py-3 glass-effect border border-white/30 rounded-xl focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/50 placeholder-gray-500"
                    maxLength={200}
                    disabled={isLoading}
                  />
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>{errors.address && <span className="text-red-500">{errors.address}</span>}</span>
                    <span className="font-medium">{formData.address.length}/200</span>
                  </div>
                </div>

                {/* Submit Error */}
                {errors.submit && (
                  <motion.div 
                    className="text-red-500 text-sm text-center bg-red-50/80 backdrop-blur-sm p-4 rounded-xl border border-red-200"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {errors.submit}
                  </motion.div>
                )}
              </div>

              {/* Footer Actions */}
              <div className="border-t border-white/20 p-6 flex gap-4">
                <motion.button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-6 py-3 text-gray-700 glass-effect border border-white/30 rounded-xl hover:bg-white/20 transition-all duration-200 font-semibold"
                  disabled={isLoading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Cancelar
                </motion.button>
                <motion.button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 font-semibold"
                  disabled={isLoading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isLoading ? (
                    <>
                      <FiLoader className="animate-spin" size={18} />
                      Salvando...
                    </>
                  ) : (
                    <>
                      <FiSave size={18} />
                      Salvar Alterações
                    </>
                  )}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
}
