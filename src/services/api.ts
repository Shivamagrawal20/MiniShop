import { Product } from '../types';

const API_URL = 'http://localhost:3000/api';

export const fetchAllProducts = async (): Promise<Product[]> => {
  const response = await fetch(`${API_URL}/products`);
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  return response.json();
};

export const createProduct = async (product: Product): Promise<Product> => {
  const response = await fetch(`${API_URL}/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  });
  
  if (!response.ok) {
    throw new Error('Failed to create product');
  }
  
  return response.json();
};