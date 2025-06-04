'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FiUpload, FiX, FiMapPin, FiTag, FiDollarSign, FiGrid, FiFileText } from 'react-icons/fi';
import DashboardLayout from '@/components/dashboard/DashboardLayout';

// Categories for the dropdown
const CATEGORIES = [
  'Food',
  'Vegetables',
  'Fruits',
  'Dairy',
  'Meat',
  'Bakery',
  'Beverages',
  'Snacks',
  'Prepared Foods',
  'Canned Goods',
  'Condiments',
  'Grains',
  'Spices',
];

// Conditions for the dropdown
const CONDITIONS = [
  'New',
  'Very Good',
  'Good',
  'Acceptable',
  'Expiring Soon'
];

interface FormData {
  title: string;
  description: string;
  price: string;
  category: string;
  condition: string;
  location: string;
  tags: string[];
  isOrganic: boolean;
  isVegan: boolean;
}

export default function AddListingPage() {
  const router = useRouter();
  const [images, setImages] = useState<File[]>([]);
  const [previewURLs, setPreviewURLs] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState('');
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    price: '',
    category: '',
    condition: '',
    location: '',
    tags: [],
    isOrganic: false,
    isVegan: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newImages = [...images];
    const newPreviewURLs = [...previewURLs];

    for (let i = 0; i < files.length; i++) {
      if (newImages.length < 10) {  // Limit to 10 images
        newImages.push(files[i]);
        newPreviewURLs.push(URL.createObjectURL(files[i]));
      }
    }

    setImages(newImages);
    setPreviewURLs(newPreviewURLs);
  };

  const removeImage = (index: number) => {
    const newImages = [...images];
    const newPreviewURLs = [...previewURLs];
    
    URL.revokeObjectURL(newPreviewURLs[index]);
    newImages.splice(index, 1);
    newPreviewURLs.splice(index, 1);
    
    setImages(newImages);
    setPreviewURLs(newPreviewURLs);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const addTag = () => {
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()]
      }));
      setCurrentTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.price.trim()) newErrors.price = 'Price is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (images.length === 0) newErrors.images = 'At least one image is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // In a real app, you would upload the images and send the form data to your API
      console.log('Form data:', formData);
      console.log('Images to upload:', images);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Redirect to marketplace on success
      router.push('/app/marketplace');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error creating your listing. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <DashboardLayout>
      {/* Increased max-width significantly to make the component wider */}
      <div className="max-w-6xl mx-auto py-6 px-6 sm:px-8 lg:px-12">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="p-7 bg-primary text-white">
            <h1 className="text-2xl font-bold">Create Food Listing</h1>
            <p className="mt-1 text-sm opacity-90">Share your surplus food with others in your community</p>
          </div>

          <form onSubmit={handleSubmit} className="p-7 space-y-8">
            {/* Images Section */}
            <div className="space-y-4">
              <div className="flex items-center text-lg font-medium">
                <FiUpload className="mr-2" /> Photos
              </div>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-6 gap-4 mb-4">
                  {previewURLs.map((url, index) => (
                    <div key={index} className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
                      <Image
                        src={url}
                        alt={`Preview ${index + 1}`}
                        fill
                        style={{ objectFit: 'cover' }}
                        className="w-full h-full"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 bg-black bg-opacity-50 rounded-full p-1 text-white hover:bg-opacity-70"
                      >
                        <FiX size={16} />
                      </button>
                    </div>
                  ))}
                  
                  {images.length < 10 && (
                    <motion.label
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="aspect-square flex flex-col items-center justify-center bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200"
                    >
                      <FiUpload size={24} className="text-gray-500" />
                      <span className="mt-2 text-sm text-gray-500">Add Photo</span>
                      <input 
                        type="file" 
                        accept="image/*" 
                        multiple 
                        onChange={handleImageUpload} 
                        className="hidden" 
                      />
                    </motion.label>
                  )}
                </div>
                <div className="text-sm text-gray-500">
                  {images.length > 0 ? (
                    `${images.length} of 10 photos uploaded`
                  ) : (
                    'Add up to 10 photos of your food item'
                  )}
                </div>
                {errors.images && (
                  <div className="text-sm text-error mt-1">{errors.images}</div>
                )}
              </div>
            </div>

            {/* Title & Description Section */}
            <div className="space-y-4">
              <div className="flex items-center text-lg font-medium">
                <FiFileText className="mr-2" /> Details
              </div>
              
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-medium">Title</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="What are you offering? e.g. 'Organic Apples'"
                  className={`input input-bordered w-full px-5 ${errors.title ? 'input-error' : ''}`}
                />
                {errors.title && (
                  <div className="text-sm text-error mt-1">{errors.title}</div>
                )}
              </div>
              
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-medium">Description</span>
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe your food item, including quantity, freshness, and any other relevant details"
                  className="textarea textarea-bordered w-full h-32 px-5"
                />
              </div>
            </div>

            {/* Price & Category Section - Changed to 3 columns on larger screens */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-medium flex items-center">
                      <FiDollarSign className="mr-1" /> Price
                    </span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">€</span>
                    <input
                      type="text"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      placeholder="0.00"
                      className={`input input-bordered w-full pl-8 ${errors.price ? 'input-error' : ''}`}
                    />
                  </div>
                  {errors.price && (
                    <div className="text-sm text-error mt-1">{errors.price}</div>
                  )}
                </div>
                
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-medium flex items-center">
                      <FiGrid className="mr-1" /> Category
                    </span>
                  </label>
                  <select 
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className={`select select-bordered w-full ${errors.category ? 'select-error' : ''}`}
                  >
                    <option value="">Select a category</option>
                    {CATEGORIES.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                  {errors.category && (
                    <div className="text-sm text-error mt-1">{errors.category}</div>
                  )}
                </div>

                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-medium">Condition</span>
                  </label>
                  <select 
                    name="condition"
                    value={formData.condition}
                    onChange={handleChange}
                    className="select select-bordered w-full"
                  >
                    <option value="">Select condition</option>
                    {CONDITIONS.map(condition => (
                      <option key={condition} value={condition}>{condition}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-medium flex items-center">
                    <FiMapPin className="mr-1" /> Location
                  </span>
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Where is this item available?"
                  className="input input-bordered w-full px-5"
                />
              </div>
            </div>

            {/* Tags Section */}
            <div className="space-y-4">
              <div className="flex items-center text-lg font-medium">
                <FiTag className="mr-2" /> Tags
              </div>
              
              <div className="form-control">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={currentTag}
                    onChange={(e) => setCurrentTag(e.target.value)}
                    placeholder="Add keywords (e.g., organic, gluten-free)"
                    className="input input-bordered flex-1 px-5"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addTag();
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={addTag}
                    className="btn btn-primary px-6"
                  >
                    Add
                  </button>
                </div>
                
                <div className="flex flex-wrap gap-2 mt-3">
                  {formData.tags.map(tag => (
                    <div key={tag} className="badge badge-primary gap-1">
                      {tag}
                      <button 
                        type="button" 
                        onClick={() => removeTag(tag)} 
                        className="ml-1"
                      >
                        <FiX size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Additional Options */}
            <div className="space-y-4">
              <div className="flex items-center text-lg font-medium">
                Additional Information
              </div>
              
              <div className="flex gap-6">
                <div className="form-control">
                  <label className="label cursor-pointer justify-start gap-3">
                    <input 
                      type="checkbox" 
                      name="isOrganic"
                      checked={formData.isOrganic}
                      onChange={handleCheckboxChange}
                      className="checkbox checkbox-primary" 
                    />
                    <span className="label-text">Organic</span>
                  </label>
                </div>
                
                <div className="form-control">
                  <label className="label cursor-pointer justify-start gap-3">
                    <input 
                      type="checkbox" 
                      name="isVegan"
                      checked={formData.isVegan}
                      onChange={handleCheckboxChange}
                      className="checkbox checkbox-primary" 
                    />
                    <span className="label-text">Vegan</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Submit Button - Wider but not substantially taller */}
            <div className="pt-6 border-t mt-4 flex justify-center">
              <motion.button
                type="submit"
                className="btn btn-primary w-full md:w-3/4 lg:w-2/3 px-12"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="loading loading-spinner loading-sm mr-2"></span>
                    Creating...
                  </>
                ) : (
                  'CREATE LISTING'
                )}
              </motion.button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}