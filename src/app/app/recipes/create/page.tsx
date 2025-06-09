'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import RecipeCreateForm from '@/components/recipes/RecipeCreateForm';

export default function CreateRecipePage() {
  const router = useRouter();
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            </div>
            <p className="text-gray-600 font-medium">Carregando...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (!session?.user) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-md">
            <h1 className="text-2xl font-bold mb-4 text-gray-800">Faça login</h1>
            <p className="text-gray-600 mb-6">
              Você precisa fazer login para criar receitas.
            </p>
            <button 
              onClick={() => router.push('/auth/login')}
              className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
            >
              Ir para login
            </button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
        <div className="max-w-4xl mx-auto py-8 px-4">
          {/* Header */}
          <motion.div 
            className="text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              ✨ Criar Nova Receita
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Compartilhe sua receita favorita com a comunidade e inspire outros a cozinhar!
            </p>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <RecipeCreateForm 
              userEmail={session.user.email || ''}
              onSuccess={(recipeId) => {
                router.push(`/app/recipes/${recipeId}`);
              }}
              onCancel={() => {
                router.push('/app/recipes');
              }}
            />
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
}
