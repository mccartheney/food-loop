'use client';

import { useState } from 'react';
import Image from 'next/image';
import { FiGrid, FiTag } from 'react-icons/fi';

interface Post {
  id: string;
  imageUrl: string;
}

interface ProfileTabsProps {
  posts: Post[];
}

export default function ProfileTabs({ posts }: ProfileTabsProps) {
  const [activeTab, setActiveTab] = useState<'posts' | 'tagged'>('posts');
  
  return (
    <>
      <div className="border-t flex">
        <button 
          onClick={() => setActiveTab('posts')} 
          className={`flex-1 py-3 flex justify-center items-center ${
            activeTab === 'posts' ? 'text-primary border-t-2 border-primary' : 'text-gray-500'
          }`}
        >
          <FiGrid size={18} />
        </button>
        <button 
          onClick={() => setActiveTab('tagged')} 
          className={`flex-1 py-3 flex justify-center items-center ${
            activeTab === 'tagged' ? 'text-primary border-t-2 border-primary' : 'text-gray-500'
          }`}
        >
          <FiTag size={18} />
        </button>
      </div>
      
      <div className="grid grid-cols-3 gap-1">
        {activeTab === 'posts' ? (
          posts.length > 0 ? (
            posts.map(post => (
              <div key={post.id} className="aspect-square bg-base-200 relative">
                <Image
                  src={post.imageUrl}
                  alt="Post"
                  fill
                  className="object-cover"
                />
              </div>
            ))
          ) : (
            <div className="col-span-3 py-12 text-center text-gray-500">
              Nenhuma publicação ainda.
            </div>
          )
        ) : (
          <div className="col-span-3 py-12 text-center text-gray-500">
            Fotos com você aparecerão aqui.
          </div>
        )}
      </div>
    </>
  );
}