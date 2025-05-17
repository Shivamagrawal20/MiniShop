import { Product } from '../types';

const API_URL = 'http://localhost:3000/api';

export const fetchAllProducts = async (): Promise<Product[]> => {
  try {
    console.log('Fetching products from:', `${API_URL}/products`);
    const response = await fetch(`${API_URL}/products`);
    console.log('Response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error response:', errorText);
      throw new Error(`Failed to fetch products: ${response.status} ${errorText}`);
    }
    
    const data = await response.json();
    console.log('Fetched products:', data);
    return data;
  } catch (error) {
    console.error('Error in fetchAllProducts:', error);
    throw error;
  }
};

export const createProduct = async (product: Product): Promise<Product> => {
  try {
    console.log('Creating product:', product);
    const response = await fetch(`${API_URL}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error response:', errorText);
      throw new Error(`Failed to create product: ${response.status} ${errorText}`);
    }
    
    const data = await response.json();
    console.log('Created product:', data);
    return data;
  } catch (error) {
    console.error('Error in createProduct:', error);
    throw error;
  }
};

export const deleteProduct = async (id: number): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/products/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error response:', errorText);
      throw new Error(`Failed to delete product: ${response.status} ${errorText}`);
    }
  } catch (error) {
    console.error('Error in deleteProduct:', error);
    throw error;
  }
};