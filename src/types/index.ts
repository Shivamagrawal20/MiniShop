export interface Product {
  id?: number;
  name: string;
  price: number;
  description: string;
  image_url: string;
  created_at?: string;
}

export interface ProductContextType {
  products: Product[];
  loading: boolean;
  error: string | null;
  fetchProducts: () => Promise<void>;
  addProduct: (product: Product) => Promise<boolean>;
  searchProducts: (query: string) => void;
}