'use client';

import { signIn } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';

const LoginForm: React.FC = () => {
  const handleGoogleSignIn = () => {
    signIn('google', { callbackUrl: '/dashboard' });
  };
  
  return (
    // Add a full-height container with flex centering
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50">
      <div className="max-w-[450px] w-full mx-4 md:mx-auto p-10 bg-white rounded-xl shadow-lg animate-[fade-in_0.5s_ease-out]">
        <h1 className="text-[1.75rem] font-bold text-center mb-7 text-gray-800">
          Log in to your account
        </h1>
        
        <div className="flex flex-col items-center">
          <button 
            type="button" 
            onClick={handleGoogleSignIn}
            className="flex items-center justify-center gap-3 w-full py-4 px-6 bg-primary hover:bg-primary-focus text-white rounded-lg transition-all hover:-translate-y-0.5 hover:shadow-md font-medium"
          >
            <Image 
              src="/google.svg" 
              alt="Google" 
              width={18} 
              height={18} 
            />
            Sign in with Google
          </button>
        </div>
        
        <p className="text-center mt-8 text-sm text-gray-500">
          Don't have an account yet?{' '}
          <Link href="/auth/register" className="text-primary font-medium hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;