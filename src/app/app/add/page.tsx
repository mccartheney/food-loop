'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FiUpload, FiX, FiMapPin, FiTag, FiDollarSign, FiGrid, FiFileText, FiCheck } from 'react-icons/fi';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import AddListingHeader from '@/components/add/AddListingHeader';
import LocationMapPicker from '@/components/add/LocationMapPicker';
import styles from './styles.module.css';

// Categories for the dropdown
const CATEGORIES = [
  'Comida',
  'Vegetais',
  'Frutas',
  'Laticínios',
  'Carne',
  'Padaria',
  'Bebidas',
  'Lanches',
  'Comida Preparada',
  'Enlatados',
  'Condimentos',
  'Grãos',
  'Especiarias',
];

// Conditions for the dropdown
const CONDITIONS = [
  'Novo',
  'Muito Bom',
  'Bom',
  'Aceitável',
  'Expira Em Breve'
];

interface LocationData {
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  city: string;
  country: string;
}

interface FormData {
  title: string;
  description: string;
  price: string;
  category: string;
  condition: string;
  location: LocationData | null;
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
    location: null,
    tags: [],
    isOrganic: false,
    isVegan: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [formProgress, setFormProgress] = useState(0);

  // Calcular progresso do formulário
  useEffect(() => {
    const fields = [
      formData.title.trim(),
      formData.description.trim(),
      formData.price.trim(),
      formData.category,
      formData.condition,
      formData.location,
      images.length > 0
    ];
    
    const completed = fields.filter(Boolean).length;
    const progress = Math.round((completed / fields.length) * 100);
    setFormProgress(progress);
  }, [formData, images]);

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

  const handleLocationSelect = (location: LocationData) => {
    setFormData(prev => ({ ...prev, location }));
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

    if (!formData.title.trim()) newErrors.title = 'Título é obrigatório';
    if (!formData.price.trim()) newErrors.price = 'Preço é obrigatório';
    if (!formData.category) newErrors.category = 'Categoria é obrigatória';
    if (images.length === 0) newErrors.images = 'Pelo menos uma foto é obrigatória';
    if (!formData.location) newErrors.location = 'Localização é obrigatória';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // Em uma app real, enviaria os dados para a API
      console.log('Form data:', {
        ...formData,
        location: formData.location
      });
      console.log('Images to upload:', images);
      
      // Simular API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Redirect to marketplace on success
      router.push('/app/marketplace');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Houve um erro ao criar sua oferta. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <DashboardLayout>
      <motion.div 
        className="container mx-auto p-4 md:p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <AddListingHeader />

        {/* Form Container */}
        <motion.div 
          className={`${styles.formContainer} rounded-2xl overflow-hidden`}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {/* Progress Bar */}
          <div className="p-6 border-b border-gray-200/50">
            <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
              <span>Progresso do Formulário</span>
              <span>{formProgress}%</span>
            </div>
            <div className={`${styles.progressBar} h-2 rounded-full`}>
              <motion.div 
                className={`${styles.progressFill} h-full rounded-full`}
                initial={{ width: '0%' }}
                animate={{ width: `${formProgress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-8">
            {/* Images Section */}
            <motion.div 
              className={`${styles.formSection} rounded-2xl p-6 space-y-4`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <div className={`${styles.sectionHeader}`}>
                <FiUpload className={styles.sectionIcon} size={24} />
                <h2 className="text-lg font-semibold">Fotos</h2>
              </div>
              
              <div className={`${styles.imageUploadArea} rounded-xl p-6`}>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-4">
                  {previewURLs.map((url, index) => (
                    <motion.div 
                      key={index} 
                      className={`${styles.imagePreview} relative aspect-square rounded-xl overflow-hidden`}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.1 * index }}
                    >
                      <Image
                        src={url}
                        alt={`Preview ${index + 1}`}
                        fill
                        style={{ objectFit: 'cover' }}
                        className="w-full h-full"
                      />
                      <motion.button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <FiX size={14} />
                      </motion.button>
                    </motion.div>
                  ))}
                  
                  {images.length < 10 && (
                    <motion.label
                      className={`${styles.uploadButton} aspect-square flex flex-col items-center justify-center rounded-xl cursor-pointer`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <FiUpload size={24} className="text-gray-500 mb-2" />
                      <span className="text-sm text-gray-600 text-center">Adicionar Foto</span>
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
                
                <div className="text-sm text-gray-600 text-center">
                  {images.length > 0 ? (
                    `${images.length} de 10 fotos carregadas`
                  ) : (
                    'Adicione até 10 fotos do seu item'
                  )}
                </div>
                
                {errors.images && (
                  <div className={`${styles.errorText} text-center`}>{errors.images}</div>
                )}
              </div>
            </motion.div>

            {/* Title & Description Section */}
            <motion.div 
              className={`${styles.formSection} rounded-2xl p-6 space-y-4`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <div className={`${styles.sectionHeader}`}>
                <FiFileText className={styles.sectionIcon} size={24} />
                <h2 className="text-lg font-semibold">Detalhes</h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Título
                  </label>
                  <motion.input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="O que você está oferecendo? Ex: 'Maçãs Orgânicas'"
                    className={`${styles.inputField} ${errors.title ? styles.errorField : ''} w-full px-4 py-3 rounded-xl`}
                    whileFocus={{ scale: 1.01 }}
                  />
                  {errors.title && (
                    <div className={styles.errorText}>{errors.title}</div>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Descrição
                  </label>
                  <motion.textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Descreva seu item, incluindo quantidade, frescor e outros detalhes relevantes"
                    className={`${styles.textareaField} w-full px-4 py-3 rounded-xl h-32`}
                    whileFocus={{ scale: 1.01 }}
                  />
                </div>
              </div>
            </motion.div>

            {/* Price & Category Section */}
            <motion.div 
              className={`${styles.formSection} rounded-2xl p-6 space-y-4`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              <div className={`${styles.sectionHeader}`}>
                <FiGrid className={styles.sectionIcon} size={24} />
                <h2 className="text-lg font-semibold">Categoria e Preço</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FiDollarSign className="inline mr-1" /> Preço
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">€</span>
                    <motion.input
                      type="text"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      placeholder="0.00"
                      className={`${styles.inputField} ${errors.price ? styles.errorField : ''} w-full pl-8 pr-4 py-3 rounded-xl`}
                      whileFocus={{ scale: 1.01 }}
                    />
                  </div>
                  {errors.price && (
                    <div className={styles.errorText}>{errors.price}</div>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Categoria
                  </label>
                  <motion.select 
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className={`${styles.selectField} ${errors.category ? styles.errorField : ''} w-full px-4 py-3 rounded-xl`}
                    whileFocus={{ scale: 1.01 }}
                  >
                    <option value="">Selecione uma categoria</option>
                    {CATEGORIES.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </motion.select>
                  {errors.category && (
                    <div className={styles.errorText}>{errors.category}</div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Condição
                  </label>
                  <motion.select 
                    name="condition"
                    value={formData.condition}
                    onChange={handleChange}
                    className={`${styles.selectField} w-full px-4 py-3 rounded-xl`}
                    whileFocus={{ scale: 1.01 }}
                  >
                    <option value="">Selecione a condição</option>
                    {CONDITIONS.map(condition => (
                      <option key={condition} value={condition}>{condition}</option>
                    ))}
                  </motion.select>
                </div>
              </div>
            </motion.div>

            {/* Location Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <LocationMapPicker 
                onLocationSelect={handleLocationSelect}
                initialLocation={formData.location || undefined}
              />
              {errors.location && (
                <div className={`${styles.errorText} mt-2 text-center`}>{errors.location}</div>
              )}
            </motion.div>

            {/* Tags Section */}
            <motion.div 
              className={`${styles.formSection} rounded-2xl p-6 space-y-4`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9, duration: 0.5 }}
            >
              <div className={`${styles.sectionHeader}`}>
                <FiTag className={styles.sectionIcon} size={24} />
                <h2 className="text-lg font-semibold">Tags</h2>
              </div>
              
              <div className="space-y-4">
                <div className="flex gap-2">
                  <motion.input
                    type="text"
                    value={currentTag}
                    onChange={(e) => setCurrentTag(e.target.value)}
                    placeholder="Adicione palavras-chave (ex: orgânico, sem glúten)"
                    className={`${styles.tagInput} flex-1 px-4 py-3 rounded-xl`}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addTag();
                      }
                    }}
                    whileFocus={{ scale: 1.01 }}
                  />
                  <motion.button
                    type="button"
                    onClick={addTag}
                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl disabled:opacity-50"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={!currentTag.trim()}
                  >
                    Adicionar
                  </motion.button>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag, index) => (
                    <motion.div 
                      key={tag} 
                      className={`${styles.tag} px-3 py-1 rounded-full flex items-center gap-2`}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {tag}
                      <motion.button 
                        type="button" 
                        onClick={() => removeTag(tag)}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.8 }}
                      >
                        <FiX size={14} />
                      </motion.button>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Additional Options */}
            <motion.div 
              className={`${styles.formSection} rounded-2xl p-6 space-y-4`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              <div className={`${styles.sectionHeader}`}>
                <FiCheck className={styles.sectionIcon} size={24} />
                <h2 className="text-lg font-semibold">Informações Adicionais</h2>
              </div>
              
              <div className="flex gap-8">
                <motion.label 
                  className="flex items-center gap-3 cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                >
                  <input 
                    type="checkbox" 
                    name="isOrganic"
                    checked={formData.isOrganic}
                    onChange={handleCheckboxChange}
                    className={`${styles.checkbox} w-5 h-5 rounded`}
                  />
                  <span className="text-gray-700">Orgânico</span>
                </motion.label>
                
                <motion.label 
                  className="flex items-center gap-3 cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                >
                  <input 
                    type="checkbox" 
                    name="isVegan"
                    checked={formData.isVegan}
                    onChange={handleCheckboxChange}
                    className={`${styles.checkbox} w-5 h-5 rounded`}
                  />
                  <span className="text-gray-700">Vegano</span>
                </motion.label>
              </div>
            </motion.div>

            {/* Submit Button */}
            <motion.div 
              className="pt-6 flex justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.5 }}
            >
              <motion.button
                type="submit"
                className={`${styles.submitButton} w-full md:w-3/4 lg:w-1/2 px-8 py-4 rounded-xl font-semibold text-lg`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className={`${styles.loadingSpinner} inline-block w-5 h-5 mr-3`}>⟳</span>
                    Criando Oferta...
                  </>
                ) : (
                  'CRIAR OFERTA'
                )}
              </motion.button>
            </motion.div>
          </form>
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
}
