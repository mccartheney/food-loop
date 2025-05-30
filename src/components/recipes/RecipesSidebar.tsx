import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';

interface RecipeSidebarProps {
  favorites: string[];
}

const RecipeSidebar: React.FC<RecipeSidebarProps> = ({ favorites }) => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="form-control mb-4">
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-full pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      <h3 className="font-medium text-base mb-2">Your favorites</h3>
      <ul className="space-y-1">
        {favorites.map((favorite, index) => (
          <li key={index} className="flex items-center gap-2 cursor-pointer py-1">
            <label className="flex items-center gap-2 cursor-pointer w-full">
              <input type="checkbox" className="checkbox checkbox-xs checkbox-primary" />
              <span className="text-sm">{favorite}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeSidebar;