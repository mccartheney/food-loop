'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { FiAlertCircle, FiHome, FiRefreshCw } from 'react-icons/fi';

export default function AuthError() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  const getErrorMessage = (error: string | null) => {
    switch (error) {
      case 'Configuration':
        return 'Erro de configuração do servidor. Tente novamente mais tarde.';
      case 'AccessDenied':
        return 'Acesso negado. Você não tem permissão para acessar esta aplicação.';
      case 'Verification':
        return 'Token de verificação inválido ou expirado.';
      case 'Default':
        return 'Ocorreu um erro durante a autenticação.';
      default:
        return 'Erro desconhecido durante a autenticação.';
    }
  };

  const getErrorDetails = (error: string | null) => {
    switch (error) {
      case 'Configuration':
        return 'Verifique se todas as variáveis de ambiente estão configuradas corretamente.';
      case 'AccessDenied':
        return 'Entre em contato com o administrador se você deveria ter acesso.';
      case 'Verification':
        return 'Tente fazer login novamente.';
      default:
        return 'Tente fazer login novamente ou entre em contato com o suporte.';
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-100">
      <div className="max-w-md w-full mx-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 text-center">
          {/* Logo Section */}
          <div className="mb-6">
            <div className="mx-auto w-12 h-12 mb-4 flex items-center justify-center">
              <Image
                src="/logo.svg"
                alt="Food Loop Logo"
                width={48}
                height={48}
                priority
              />
            </div>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Food Loop</h2>
          </div>

          <div className="mb-6">
            <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <FiAlertCircle className="w-8 h-8 text-red-500" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Erro de Autenticação
            </h1>
            <p className="text-gray-600">
              {getErrorMessage(error)}
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-700">
              {getErrorDetails(error)}
            </p>
            {error && (
              <p className="text-xs text-gray-500 mt-2">
                Código do erro: {error}
              </p>
            )}
          </div>

          <div className="space-y-3">
            <Link
              href="/auth/login"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <FiRefreshCw className="w-4 h-4" />
              Tentar Novamente
            </Link>
            
            <Link
              href="/"
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <FiHome className="w-4 h-4" />
              Voltar ao Início
            </Link>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-500">
              Se o problema persistir, entre em contato com o suporte técnico.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
