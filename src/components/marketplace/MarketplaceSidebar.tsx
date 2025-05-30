import React from 'react';

interface MarketplaceSidebarProps {
  searchQuery: string;
  onSearch: (query: string) => void;
}

const MarketplaceSidebar: React.FC<MarketplaceSidebarProps> = ({
  searchQuery,
  onSearch,
}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="font-medium text-lg mb-2">Search or market place</h3>
      
      <div className="form-control mb-4">
        <input
          type="text"
          placeholder="Search"
          className="input input-bordered w-full"
          value={searchQuery}
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
      
      <div className="mb-4">
        <h4 className="font-medium mb-2">Your pantrie</h4>
        <ul className="space-y-2">
          {['Beans', 'Pasta', 'Rice', 'Spices', 'Flour', 'Oils', 'Sauces', 'Meats', 'Dairy', 'Fruits', 'Vegetables', 'Snacks'].map((item, index) => (
            <li key={index}>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="checkbox checkbox-sm checkbox-primary" />
                <span className="text-sm">{item}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MarketplaceSidebar;