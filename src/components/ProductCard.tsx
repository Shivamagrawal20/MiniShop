import React from 'react';
import { DollarSign, Info, Trash2 } from 'lucide-react';
import { Product } from '../types';
import { useProducts } from '../context/ProductContext';
import toast from 'react-hot-toast';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { removeProduct } = useProducts();
  const defaultImage = 'https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=600';
  
  const handleDelete = async () => {
    if (!product.id) return;
    
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const success = await removeProduct(product.id);
        if (success) {
          toast.success('Product deleted successfully');
        } else {
          toast.error('Failed to delete product');
        }
      } catch (error) {
        toast.error('An error occurred while deleting the product');
      }
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg border border-gray-100 animate-slide-in group">
      <div className="aspect-square overflow-hidden relative">
        <img 
          src={product.image_url || defaultImage} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            (e.target as HTMLImageElement).src = defaultImage;
          }}
        />
        <div className="absolute bottom-0 right-0 bg-primary-600 text-white px-3 py-1.5 text-sm font-bold rounded-tl-md flex items-center">
          <DollarSign className="h-3.5 w-3.5 mr-1" />
          {Number(product.price).toFixed(2)}
        </div>
      </div>
      
      <div className="p-4 sm:p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800 line-clamp-1">{product.name}</h3>
          <button
            onClick={handleDelete}
            className="text-gray-400 hover:text-red-500 transition-colors duration-200 p-1 rounded-full hover:bg-red-50"
            title="Delete product"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </div>
        
        <p className="text-gray-600 text-sm sm:text-base mb-4 line-clamp-3">{product.description}</p>
        
        <div className="flex items-center text-xs sm:text-sm text-gray-500">
          <Info className="h-3.5 w-3.5 mr-1" />
          <span>
            Added: {product.created_at 
              ? new Date(product.created_at).toLocaleDateString() 
              : 'Recently'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;