import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { Product, ProductContextType } from '../types';
import { fetchAllProducts, createProduct } from '../services/api';

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};

interface ProductProviderProps {
  children: ReactNode;
}

export const ProductProvider: React.FC<ProductProviderProps> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await fetchAllProducts();
      setProducts(data);
      setFilteredProducts(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch products');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const addProduct = async (product: Product): Promise<boolean> => {
    try {
      setLoading(true);
      const newProduct = await createProduct(product);
      setProducts((prev) => [...prev, newProduct]);
      setFilteredProducts((prev) => [...prev, newProduct]);
      return true;
    } catch (err) {
      setError('Failed to add product');
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const searchProducts = (query: string) => {
    if (!query.trim()) {
      setFilteredProducts(products);
      return;
    }
    
    const lowerQuery = query.toLowerCase();
    const filtered = products.filter(
      (product) => 
        product.name.toLowerCase().includes(lowerQuery) || 
        product.description.toLowerCase().includes(lowerQuery)
    );
    
    setFilteredProducts(filtered);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const value = {
    products: filteredProducts,
    loading,
    error,
    fetchProducts,
    addProduct,
    searchProducts
  };

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
};