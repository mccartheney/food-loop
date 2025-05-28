'use client';

import { useRouter } from 'next/navigation';
import { FiArrowLeft, FiSettings } from 'react-icons/fi';

interface ProfileHeaderProps {
  username: string;
}

export default function ProfileHeader({ username }: ProfileHeaderProps) {
  const router = useRouter();
  
  return (
    <header className="sticky top-0 z-10 bg-white border-b p-4 flex items-center">
      <button 
        onClick={() => router.back()} 
        className="btn btn-ghost btn-sm btn-circle"
      >
        <FiArrowLeft size={20} />
      </button>
      <h1 className="text-lg font-medium ml-4">{username}</h1>
      <div className="ml-auto">
        <button className="btn btn-ghost btn-sm btn-circle">
          <FiSettings size={20} />
        </button>
      </div>
    </header>
  );
}