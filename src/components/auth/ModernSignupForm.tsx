'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
// import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { FiUser, FiMail, FiMapPin, FiEye, FiEyeOff, FiHeart, FiCheck } from 'react-icons/fi';
import styles from './styles.module.css';

interface SignupFormData {
  name: string;
  email: string;
  address: string;
  password?: string;
  confirmPassword?: string;
}

const ModernSignupForm: React.FC = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [useEmailPassword, setUseEmailPassword] = useState(false);
  const [formData, setFormData] = useState<SignupFormData>({
    name: '',
    email: '',
    address: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState<Partial<SignupFormData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<SignupFormData> = {};

    if (!formData.name || formData.name.length < 2) {
      newErrors.name = 'Nome da empresa é obrigatório (mín. 2 caracteres)';
    }

    if (!formData.email || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      newErrors.email = 'Email válido é obrigatório';
    }

    if (!formData.address || formData.address.length < 5) {
      newErrors.address = 'Morada é obrigatória (mín. 5 caracteres)';
    }

    if (!formData.password || formData.password.length < 6) {
      newErrors.password = 'Palavra-passe é obrigatória (mín. 6 caracteres)';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Palavras-passe não coincidem';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name as keyof SignupFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    try {
      setIsSubmitting(true);
      
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          address: formData.address,
          password: formData.password
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro ao criar conta');
      }
      
      setSubmitSuccess(true);
      
      setTimeout(() => {
        router.push('/app');
      }, 2000);
      
    } catch (error) {
      console.error('Erro no registro:', error);
      alert('Erro ao criar conta. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setIsGoogleLoading(true);
    try {
      await signIn('google', { callbackUrl: '/app' });
    } catch (error) {
      console.error('Google sign up error:', error);
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <motion.div 
      className={`${styles.authCard} ${styles.fadeInUp}`}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Logo Section */}
      <motion.div 
        className={styles.logoSection}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <motion.div 
          className={styles.logoContainer}
          whileHover={{ scale: 1.05, rotate: 5 }}
          transition={{ duration: 0.2 }}
        >
          <FiHeart size={40} className="text-white" />
        </motion.div>
        <h1 className={styles.logoText}>Food Loop</h1>
        <p className={styles.logoSubtext}>Conectando sabores, evitando desperdícios</p>
      </motion.div>

      {/* Form Title */}
      <motion.h2 
        className={styles.formTitle}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        Criar nova conta
      </motion.h2>

      {/* Success Message */}
      {submitSuccess && (
        <motion.div 
          className={styles.successMessage}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <FiCheck className="inline mr-2" />
          Conta criada com sucesso! Redirecionando...
        </motion.div>
      )}

      {/* Registration Methods Toggle */}
      {!submitSuccess && (
        <motion.div
          className="mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="flex bg-white/10 rounded-lg p-1 backdrop-blur-sm">
            <button
              type="button"
              onClick={() => setUseEmailPassword(false)}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                !useEmailPassword 
                  ? 'bg-white/20 text-white shadow-sm' 
                  : 'text-white/70 hover:text-white'
              }`}
            >
              Registro Rápido
            </button>
            <button
              type="button"
              onClick={() => setUseEmailPassword(true)}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                useEmailPassword 
                  ? 'bg-white/20 text-white shadow-sm' 
                  : 'text-white/70 hover:text-white'
              }`}
            >
              Com Palavra-passe
            </button>
          </div>
        </motion.div>
      )}

      {!submitSuccess && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          {/* Quick Registration (Google Only) */}
          {!useEmailPassword ? (
            <div className="space-y-4">
              <motion.button
                type="button"
                onClick={handleGoogleSignUp}
                disabled={isGoogleLoading}
                className={styles.googleButton}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isGoogleLoading ? (
                  <>
                    <div className={styles.loadingSpinner} />
                    Criando conta...
                  </>
                ) : (
                  <>
                    <Image 
                      src="/google.svg" 
                      alt="Google" 
                      width={20} 
                      height={20} 
                    />
                    Criar conta com Google
                  </>
                )}
              </motion.button>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <p className="text-white/80 text-sm text-center">
                  ⚡ <span className="font-semibold">Registo rápido:</span> Use sua conta Google para começar imediatamente!
                </p>
              </div>
            </div>
          ) : (
            /* Full Registration Form */
            <form onSubmit={onSubmit} className="space-y-4">
              {/* Company Name */}
              <div className={styles.formGroup}>
                <label htmlFor="name" className={styles.formLabel}>
                  Nome da Empresa
                </label>
                <div className="relative">
                  <FiUser 
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60" 
                    size={18} 
                  />
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Ex: Padaria Central"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`${styles.formInput} pl-11 ${errors.name ? styles.error : ''}`}
                  />
                </div>
                {errors.name && (
                  <p className={styles.errorMessage}>
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className={styles.formGroup}>
                <label htmlFor="email" className={styles.formLabel}>
                  Email da Empresa
                </label>
                <div className="relative">
                  <FiMail 
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60" 
                    size={18} 
                  />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="empresa@email.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`${styles.formInput} pl-11 ${errors.email ? styles.error : ''}`}
                  />
                </div>
                {errors.email && (
                  <p className={styles.errorMessage}>
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Address */}
              <div className={styles.formGroup}>
                <label htmlFor="address" className={styles.formLabel}>
                  Morada
                </label>
                <div className="relative">
                  <FiMapPin 
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60" 
                    size={18} 
                  />
                  <input
                    id="address"
                    name="address"
                    type="text"
                    placeholder="Rua, Cidade, Código Postal"
                    value={formData.address}
                    onChange={handleInputChange}
                    className={`${styles.formInput} pl-11 ${errors.address ? styles.error : ''}`}
                  />
                </div>
                {errors.address && (
                  <p className={styles.errorMessage}>
                    {errors.address}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className={styles.formGroup}>
                <label htmlFor="password" className={styles.formLabel}>
                  Palavra-passe
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`${styles.formInput} pr-11 ${errors.password ? styles.error : ''}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white transition-colors"
                  >
                    {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                  </button>
                </div>
                {errors.password && (
                  <p className={styles.errorMessage}>
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div className={styles.formGroup}>
                <label htmlFor="confirmPassword" className={styles.formLabel}>
                  Confirmar Palavra-passe
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className={`${styles.formInput} pr-11 ${errors.confirmPassword ? styles.error : ''}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white transition-colors"
                  >
                    {showConfirmPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className={styles.errorMessage}>
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className={styles.primaryButton}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? (
                  <>
                    <div className={styles.loadingSpinner} />
                    Criando conta...
                  </>
                ) : (
                  'Criar conta'
                )}
              </motion.button>

              {/* Divider */}
              <div className={styles.divider}>
                <div className={styles.dividerLine}></div>
                <span className={styles.dividerText}>ou</span>
                <div className={styles.dividerLine}></div>
              </div>

              {/* Google Signup */}
              <motion.button
                type="button"
                onClick={handleGoogleSignUp}
                disabled={isGoogleLoading}
                className={styles.googleButton}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isGoogleLoading ? (
                  <>
                    <div className={styles.loadingSpinner} />
                    Criando conta...
                  </>
                ) : (
                  <>
                    <Image 
                      src="/google.svg" 
                      alt="Google" 
                      width={20} 
                      height={20} 
                    />
                    Criar conta com Google
                  </>
                )}
              </motion.button>
            </form>
          )}
        </motion.div>
      )}

      {/* Footer Link */}
      {!submitSuccess && (
        <motion.div 
          className={styles.footerLink}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          Já tem conta?{' '}
          <Link href="/auth/login">
            Entrar
          </Link>
        </motion.div>
      )}

      {/* Info Message */}
      {!submitSuccess && !useEmailPassword && (
        <motion.div
          className="mt-6 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
            <p className="text-white/80 text-sm">
              🌱 <span className="font-semibold">Missão:</span> Reduzir o desperdício alimentar, uma refeição de cada vez!
            </p>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ModernSignupForm;
