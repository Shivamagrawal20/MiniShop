import React, { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { useProducts } from '../context/ProductContext';

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState('');
  const { searchProducts } = useProducts();
  
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      searchProducts(query);
    }, 300);
    
    return () => clearTimeout(delayDebounceFn);
  }, [query, searchProducts]);
  
  const handleClear = () => {
    setQuery('');
    searchProducts('');
  };
  
  return (
    <div className="relative w-full">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Search className="h-4 w-4 text-gray-400" />
      </div>
      
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search products..."
        className="w-full pl-10 pr-10 py-2 sm:py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm sm:text-base"
      />
      
      {query && (
        <button
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
          onClick={handleClear}
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;