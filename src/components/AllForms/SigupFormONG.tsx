'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import Image from 'next/image';

interface SignupFormData {
  name: string;
  email: string;
  address: string;
}

const SignupFormONG: React.FC = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<SignupFormData>();
  
  const onSubmit = async (data: SignupFormData) => {
    try {
      setIsSubmitting(true);
      
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          address: data.address,
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error creating account');
      }
      
      setSubmitSuccess(true);
      
      setTimeout(() => {
        router.push('/dashboard');
      }, 1500);
      
    } catch (error) {
      console.error('Error signing up:', error);
      alert('Error creating account. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn = () => {
    signIn('google', { callbackUrl: '/dashboard' });
  };
  
  return (
    <div className="max-w-[450px] w-full mx-auto my-8 p-10 bg-white rounded-xl shadow-lg animate-[fade-in_0.5s_ease-out]">
      <h1 className="text-[1.75rem] font-bold text-center mb-7 text-gray-800">
        Register your ONG
      </h1>
      
      {submitSuccess && (
        <div className="bg-green-100 text-green-700 p-4 rounded-lg mb-6 text-center font-medium">
          ONG registered successfully! Redirecting...
        </div>
      )}
      
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-sm font-medium text-gray-600">
            ONG name
          </label>
          <input
            id="name"
            type="text"
            className={`p-3.5 border ${errors.name ? 'border-red-500' : 'border-gray-200'} rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all`}
            {...register('name', { 
              required: 'ONG name is required',
            })}
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
          )}
        </div>
        
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm font-medium text-gray-600">
            ONG email
          </label>
          <input
            id="email"
            type="email"
            className={`p-3.5 border ${errors.email ? 'border-red-500' : 'border-gray-200'} rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all`}
            {...register('email', { 
              required: 'ONG email is required',
              pattern: { 
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address'
              }
            })}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>
        
        <div className="flex flex-col gap-2">
          <label htmlFor="address" className="text-sm font-medium text-gray-600">
            Address
          </label>
          <input
            id="address"
            type="text"
            className={`p-3.5 border ${errors.address ? 'border-red-500' : 'border-gray-200'} rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all`}
            {...register('address', { 
              required: 'Address is required',
            })}
          />
          {errors.address && (
            <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>
          )}
        </div>
        
        <button 
          type="submit" 
          disabled={isSubmitting}
          className="bg-primary hover:bg-primary-focus text-white font-semibold py-3.5 px-6 rounded-lg mt-2 transition-all hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 disabled:bg-primary-content disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Registering...' : 'Register ONG'}
        </button>
        
        <div className="flex items-center text-gray-500 my-4">
          <div className="flex-1 border-b border-gray-200"></div>
          <span className="px-3 text-sm">or</span>
          <div className="flex-1 border-b border-gray-200"></div>
        </div>
        
        <button 
          type="button" 
          onClick={handleGoogleSignIn}
          className="flex items-center justify-center gap-3 w-full py-3.5 px-6 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all hover:shadow-sm"
        >
          <Image 
            src="/google.svg" 
            alt="Google" 
            width={18} 
            height={18} 
          />
          Register with Google
        </button>
      </form>
      
      <p className="text-center mt-6 text-sm text-gray-500">
        Already registered your ONG?{' '}
        <Link href="/login" className="text-primary font-medium hover:underline">
          Log in
        </Link>
      </p>
    </div>
  );
};

export default SignupFormONG;