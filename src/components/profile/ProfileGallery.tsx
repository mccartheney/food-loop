'use client';

import { useState } from 'react';
import Image from 'next/image';
import { FiGrid, FiTag } from 'react-icons/fi';

interface Post {
  id: string;
  imageUrl: string;
  likes: number;
  comments: number;
}

interface ProfileGalleryProps {
  posts: Post[];
}

export default function ProfileGallery({ posts }: ProfileGalleryProps) {
  const [activeTab, setActiveTab] = useState<'posts' | 'tagged'>('posts');

  return (
    <>
      {/* Abas */}
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

      {/* Grade de Posts */}
      <div className="grid grid-cols-3 gap-1">
        {activeTab === 'posts' ? (
          posts.map((post) => (
            <div key={post.id} className="aspect-square bg-base-200 relative">
              {post.imageUrl ? (
                <Image
                  src={post.imageUrl}
                  alt="Post"
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-base-content">
                  📷
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="col-span-3 py-12 text-center text-gray-500">
            Nenhuma foto em que você aparece.
          </div>
        )}
      </div>
    </>
  );
}