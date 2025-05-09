import { Product } from '../types';

// In-memory storage
let products: Product[] = [];
let nextId = 1;

export const fetchAllProducts = async (): Promise<Product[]> => {
  return products;
};

export const createProduct = async (product: Product): Promise<Product> => {
  const newProduct = {
    ...product,
    id: nextId++,
    created_at: new Date().toISOString()
  };
  products.push(newProduct);
  return newProduct;
};