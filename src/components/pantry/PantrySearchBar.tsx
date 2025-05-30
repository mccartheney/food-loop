// src/components/pantry/PantrySearchBar.tsx
import { FormEvent } from 'react';
import { motion } from 'framer-motion';
import { FiSearch, FiX } from 'react-icons/fi';

interface PantrySearchBarProps {
  searchTerm: string;
  searchCategory: 'all' | 'name' | 'type';
  onSearchTermChange: (value: string) => void;
  onSearchCategoryChange: (value: 'all' | 'name' | 'type') => void;
  onClearSearch: () => void;
  onSearch: (e: FormEvent) => void;
  totalItems: number;
  filteredCount: number;
}

export default function PantrySearchBar({
  searchTerm,
  searchCategory,
  onSearchTermChange,
  onSearchCategoryChange,
  onClearSearch,
  onSearch,
  totalItems,
  filteredCount,
}: PantrySearchBarProps) {
  return (
    <motion.div
      className="card bg-base-200 shadow-lg mb-6 p-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.5 }}
      whileHover={{ boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
    >
      <form onSubmit={onSearch} className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search your pantry..."
            className="input input-bordered w-full pl-10"
            value={searchTerm}
            onChange={e => onSearchTermChange(e.target.value)}
          />
          {searchTerm && (
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={onClearSearch}
            >
              <FiX className="text-gray-400 hover:text-gray-600" />
            </button>
          )}
        </div>
        <select
          className="select select-bordered"
          value={searchCategory}
          onChange={e => onSearchCategoryChange(e.target.value as 'all' | 'name' | 'type')}
        >
          <option value="all">All Fields</option>
          <option value="name">Name</option>
          <option value="type">Type</option>
        </select>
      </form>
      <div className="mt-2 text-xs text-gray-500">
        {searchTerm ? (
          <span>Found {filteredCount} items matching "{searchTerm}"</span>
        ) : (
          <span>Showing all {totalItems} items</span>
        )}
      </div>
    </motion.div>
  );
}
