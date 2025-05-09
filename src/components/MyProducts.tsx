import React, { useState, useEffect } from 'react';
import { useProducts } from '../context/ProductContext';
import ProductCard from './ProductCard';
import SearchBar from './SearchBar';
import { AlertCircle, Loader2 } from 'lucide-react';

const MyProducts: React.FC = () => {
  const { products, loading, error, fetchProducts } = useProducts();
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchProducts();
    setIsRefreshing(false);
  };
  
  useEffect(() => {
    fetchProducts();
  }, []);
  
  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">My Products</h2>
        <div className="w-full sm:w-96">
          <SearchBar />
        </div>
      </div>
      
      {loading && !isRefreshing && (
        <div className="flex flex-col items-center justify-center py-12">
          <Loader2 className="h-8 w-8 text-primary-500 animate-spin mb-4" />
          <p className="text-gray-600">Loading products...</p>
        </div>
      )}
      
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-r-lg">
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0" />
            <p className="text-red-700">{error}</p>
          </div>
          <button 
            onClick={handleRefresh}
            className="mt-2 text-sm text-primary-600 hover:text-primary-800 font-medium"
          >
            Try again
          </button>
        </div>
      )}
      
      {!loading && !error && products.length === 0 && (
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <h3 className="text-lg sm:text-xl font-medium text-gray-900 mb-2">No products found</h3>
          <p className="text-gray-600 mb-4">
            You haven't added any products yet. Head over to the Product Submission tab to add your first product.
          </p>
        </div>
      )}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default MyProducts;