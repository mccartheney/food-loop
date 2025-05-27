'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';

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
      
      // API call to create the ONG
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
      
      // Redirect after successful signup
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
          <svg width="18" height="18" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
            <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
            <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
            <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
            <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
          </svg>
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