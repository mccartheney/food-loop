'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FiUpload, FiX, FiPlus, FiMinus, FiSave, FiArrowLeft } from 'react-icons/fi';
import Image from 'next/image';

interface RecipeCreateFormProps {
  userEmail: string;
  onSuccess: (recipeId: string) => void;
  onCancel: () => void;
}

interface Step {
  id: string;
  description: string;
}

interface Ingredient {
  id: string;
  name: string;
  quantity: string;
}

export default function RecipeCreateForm({ userEmail, onSuccess, onCancel }: RecipeCreateFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    cookTime: 30,
    difficulty: 'medium' as 'easy' | 'medium' | 'hard',
    servings: 2,
    category: 'Prato Principal'
  });

  const [steps, setSteps] = useState<Step[]>([
    { id: '1', description: '' }
  ]);

  const [ingredients, setIngredients] = useState<Ingredient[]>([
    { id: '1', name: '', quantity: '' }
  ]);

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async (): Promise<string | null> => {
    if (!imageFile) return null;

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append('file', imageFile);
      formData.append('email', userEmail);

      const response = await fetch('/api/upload/recipe', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Failed to upload image');

      const data = await response.json();
      return data.url;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    } finally {
      setUploading(false);
    }
  };

  const addStep = () => {
    const newStep: Step = {
      id: Date.now().toString(),
      description: ''
    };
    setSteps([...steps, newStep]);
  };

  const removeStep = (id: string) => {
    if (steps.length > 1) {
      setSteps(steps.filter(step => step.id !== id));
    }
  };

  const updateStep = (id: string, description: string) => {
    setSteps(steps.map(step => 
      step.id === id ? { ...step, description } : step
    ));
  };

  const addIngredient = () => {
    const newIngredient: Ingredient = {
      id: Date.now().toString(),
      name: '',
      quantity: ''
    };
    setIngredients([...ingredients, newIngredient]);
  };

  const removeIngredient = (id: string) => {
    if (ingredients.length > 1) {
      setIngredients(ingredients.filter(ingredient => ingredient.id !== id));
    }
  };

  const updateIngredient = (id: string, field: 'name' | 'quantity', value: string) => {
    setIngredients(ingredients.map(ingredient => 
      ingredient.id === id ? { ...ingredient, [field]: value } : ingredient
    ));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setSubmitting(true);
      setError(null);

      // Validate form
      if (!formData.name.trim()) {
        throw new Error('Nome da receita é obrigatório');
      }

      if (!formData.description.trim()) {
        throw new Error('Descrição é obrigatória');
      }

      if (steps.every(step => !step.description.trim())) {
        throw new Error('Pelo menos um passo é obrigatório');
      }

      // Upload image if provided
      let imageUrl = null;
      if (imageFile) {
        imageUrl = await uploadImage();
      }

      // Prepare recipe data
      const recipeData = {
        email: userEmail,
        name: formData.name.trim(),
        description: formData.description.trim(),
        steps: steps.filter(step => step.description.trim()).map(step => step.description.trim()),
        ingredients: ingredients.filter(ing => ing.name.trim()).map(ing => ({
          name: ing.name.trim(),
          quantity: ing.quantity.trim() || '1'
        })),
        img: imageUrl,
        cookTime: formData.cookTime,
        difficulty: formData.difficulty,
        servings: formData.servings,
        category: formData.category
      };

      // Submit recipe
      const response = await fetch('/api/recipes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(recipeData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create recipe');
      }

      const data = await response.json();
      if (data.success) {
        onSuccess(data.recipe.id);
      } else {
        throw new Error('Failed to create recipe');
      }

    } catch (error) {
      console.error('Error creating recipe:', error);
      setError(error instanceof Error ? error.message : 'Failed to create recipe');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            type="button"
            onClick={onCancel}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <FiArrowLeft size={20} />
            Voltar
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {/* Basic Info */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Recipe Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Nome da Receita *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Ex: Bacalhau à Brás"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Descrição *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Descreva sua receita..."
                rows={4}
                required
              />
            </div>

            {/* Recipe Details */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Tempo (min)
                </label>
                <input
                  type="number"
                  value={formData.cookTime}
                  onChange={(e) => setFormData({...formData, cookTime: parseInt(e.target.value)})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  min="1"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Porções
                </label>
                <input
                  type="number"
                  value={formData.servings}
                  onChange={(e) => setFormData({...formData, servings: parseInt(e.target.value)})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  min="1"
                />
              </div>
            </div>

            {/* Difficulty */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Dificuldade
              </label>
              <select
                value={formData.difficulty}
                onChange={(e) => setFormData({...formData, difficulty: e.target.value as 'easy' | 'medium' | 'hard'})}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              >
                <option value="easy">Fácil</option>
                <option value="medium">Médio</option>
                <option value="hard">Difícil</option>
              </select>
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Categoria
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              >
                <option value="Prato Principal">Prato Principal</option>
                <option value="Sobremesa">Sobremesa</option>
                <option value="Lanche">Lanche</option>
                <option value="Sopa">Sopa</option>
                <option value="Entrada">Entrada</option>
                <option value="Acompanhamento">Acompanhamento</option>
              </select>
            </div>
          </div>

          {/* Right Column - Image Upload */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Foto da Receita
            </label>
            <div 
              className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-400 transition-colors cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              {imagePreview ? (
                <div className="relative">
                  <Image
                    src={imagePreview}
                    alt="Preview"
                    width={300}
                    height={200}
                    className="mx-auto rounded-lg object-cover"
                  />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setImageFile(null);
                      setImagePreview(null);
                    }}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                  >
                    <FiX size={16} />
                  </button>
                </div>
              ) : (
                <div className="py-12">
                  <FiUpload className="mx-auto text-gray-400 mb-4" size={48} />
                  <p className="text-gray-600">Clique para adicionar uma foto</p>
                  <p className="text-sm text-gray-400 mt-2">PNG, JPG até 5MB</p>
                </div>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageSelect}
              className="hidden"
            />
          </div>
        </div>

        {/* Ingredients */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Ingredientes</h3>
            <button
              type="button"
              onClick={addIngredient}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
            >
              <FiPlus size={16} />
              Adicionar
            </button>
          </div>
          <div className="space-y-3">
            {ingredients.map((ingredient, index) => (
              <div key={ingredient.id} className="flex gap-3">
                <input
                  type="text"
                  value={ingredient.name}
                  onChange={(e) => updateIngredient(ingredient.id, 'name', e.target.value)}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Nome do ingrediente"
                />
                <input
                  type="text"
                  value={ingredient.quantity}
                  onChange={(e) => updateIngredient(ingredient.id, 'quantity', e.target.value)}
                  className="w-32 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Qtd"
                />
                {ingredients.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeIngredient(ingredient.id)}
                    className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                  >
                    <FiMinus size={16} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Steps */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Modo de Preparo</h3>
            <button
              type="button"
              onClick={addStep}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
            >
              <FiPlus size={16} />
              Adicionar Passo
            </button>
          </div>
          <div className="space-y-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-semibold">
                  {index + 1}
                </div>
                <textarea
                  value={step.description}
                  onChange={(e) => updateStep(step.id, e.target.value)}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder={`Passo ${index + 1}...`}
                  rows={3}
                />
                {steps.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeStep(step.id)}
                    className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                  >
                    <FiMinus size={16} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="flex gap-4 pt-6">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 py-3 px-6 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={submitting || uploading}
            className="flex-1 py-3 px-6 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {submitting ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Criando...
              </>
            ) : (
              <>
                <FiSave size={16} />
                Criar Receita
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
