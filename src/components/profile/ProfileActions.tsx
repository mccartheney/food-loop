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
    // Aqui você implementará a chamada para a API quando o backend estiver pronto
    setIsFollowing(!isFollowing);
  };
  
  const handleMessageClick = () => {
    // Redirecionar para a página de mensagens com este usuário
    router.push(`/messages/${userId}`);
  };
  
  return (
    <div className="flex gap-2 mt-4">
      <button 
        onClick={handleFollowToggle} 
        className={`btn btn-sm flex-1 ${isFollowing ? 'btn-outline' : 'btn-primary'}`}
      >
        {isFollowing ? 'Seguindo' : 'Seguir'}
      </button>
      <button 
        onClick={handleMessageClick}
        className="btn btn-sm btn-outline flex-1"
      >
        Mensagem
      </button>
      <button className="btn btn-sm btn-outline btn-square">⋯</button>
    </div>
  );
}