import React, { useState } from 'react';
import { useProducts } from '../context/ProductContext';
import { Product } from '../types';
import toast from 'react-hot-toast';

const initialState: Product = {
  name: '',
  price: 0,
  description: '',
  image_url: '',
};

const ProductSubmission: React.FC = () => {
  const [product, setProduct] = useState<Product>(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof Product, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addProduct } = useProducts();

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof Product, string>> = {};
    
    if (!product.name.trim()) {
      newErrors.name = 'Product name is required';
    }
    
    if (product.price <= 0) {
      newErrors.price = 'Price must be greater than 0';
    }
    
    if (!product.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (product.description.length < 10) {
      newErrors.description = 'Description must be at least 10 characters';
    }
    
    if (product.image_url && !isValidUrl(product.image_url)) {
      newErrors.image_url = 'Please enter a valid URL';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const isValidUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProduct(prev => ({
      ...prev,
      [name]: name === 'price' ? parseFloat(value) || 0 : value,
    }));
    
    if (errors[name as keyof Product]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const success = await addProduct(product);
      
      if (success) {
        toast.success('Product added successfully!');
        setProduct(initialState);
      } else {
        toast.error('Failed to add product. Please try again.');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">Add a New Product</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4 sm:space-y-5">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Product Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={product.name}
              onChange={handleChange}
              className={`w-full px-4 py-2 sm:py-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter product name"
            />
            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
          </div>
          
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
              Price ($) *
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={product.price || ''}
              onChange={handleChange}
              step="0.01"
              min="0"
              className={`w-full px-4 py-2 sm:py-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                errors.price ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="0.00"
            />
            {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price}</p>}
          </div>
          
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description *
            </label>
            <textarea
              id="description"
              name="description"
              value={product.description}
              onChange={handleChange}
              rows={4}
              className={`w-full px-4 py-2 sm:py-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                errors.description ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Describe your product"
            />
            {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
          </div>
          
          <div>
            <label htmlFor="image_url" className="block text-sm font-medium text-gray-700 mb-1">
              Image URL (optional)
            </label>
            <input
              type="text"
              id="image_url"
              name="image_url"
              value={product.image_url}
              onChange={handleChange}
              className={`w-full px-4 py-2 sm:py-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                errors.image_url ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="https://example.com/image.jpg"
            />
            {errors.image_url && <p className="mt-1 text-sm text-red-600">{errors.image_url}</p>}
            <p className="mt-1 text-xs text-gray-500">
              Enter a URL for your product image. Leave blank to use a default image.
            </p>
          </div>
        </div>
        
        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto px-6 py-3 bg-primary-600 text-white font-medium rounded-lg shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Adding Product...' : 'Add Product'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductSubmission;