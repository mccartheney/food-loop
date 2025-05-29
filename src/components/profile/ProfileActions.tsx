'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface ProfileActionsProps {
  userId: string;
}

export default function ProfileActions({ userId }: ProfileActionsProps) {
  const router = useRouter();
  const [isFollowing, setIsFollowing] = useState(false);
  
  const handleFollowToggle = () => {
    setIsFollowing(!isFollowing);
  };
  
  const handleMessageClick = () => {
    router.push('/app/messages');
    

  };
  
  return (
    <div className="flex gap-2 mt-4">
      <button 
        onClick={handleFollowToggle} 
        className={`btn btn-sm flex-1 ${isFollowing ? 'btn-outline' : 'btn-primary'}`}
      >
        {isFollowing ? 'Friend' : 'Add Friend'}
      </button>
      <button 
        onClick={handleMessageClick}
        className="btn btn-sm btn-outline flex-1"
      >
        Messages
      </button>
      <button className="btn btn-sm btn-outline btn-square">⋯</button>
    </div>
  );
}