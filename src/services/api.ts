import { Product } from '../types';

const STORAGE_KEY = 'ecommerce_products';

// Default realistic products so the catalog is beautifully populated right away
const INITIAL_PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Wireless Noise-Canceling Headphones',
    price: 199.99,
    description: 'Premium over-ear wireless headphones with active noise cancellation, 30-hour battery life, and ultra-comfortable plush ear cushions.',
    image_url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
    created_at: new Date(Date.now() - 86400000 * 3).toISOString(),
  },
  {
    id: 2,
    name: 'Minimalist Leather Backpack',
    price: 89.50,
    description: 'Crafted from premium water-resistant vegan leather. Features a dedicated 15-inch padded laptop compartment and ergonomic shoulder straps.',
    image_url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=80',
    created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: 3,
    name: 'Mechanical RGB Gaming Keyboard',
    price: 129.00,
    description: 'Compact 75% mechanical keyboard featuring hot-swappable tactile switches, customizable per-key RGB backlighting, and CNC aluminum casing.',
    image_url: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=80',
    created_at: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: 4,
    name: 'Smart Fitness & Health Watch',
    price: 149.95,
    description: 'Track your workouts, heart rate, sleep metrics, and blood oxygen with a vibrant 1.4" AMOLED display and 7-day battery life.',
    image_url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80',
    created_at: new Date(Date.now() - 3600000 * 12).toISOString(),
  },
  {
    id: 5,
    name: 'Artisan Ceramic Pour-Over Set',
    price: 45.00,
    description: 'Handcrafted stoneware dripper with heat-retaining double wall design for crafting pure, balanced pour-over coffee at home.',
    image_url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&auto=format&fit=crop&q=80',
    created_at: new Date(Date.now() - 3600000 * 6).toISOString(),
  },
  {
    id: 6,
    name: 'Modern Dimmable Desk Lamp',
    price: 59.99,
    description: 'Sleek architectural LED task light with touch-sensitive dimming, 5 color temperature modes, and an integrated fast wireless charger.',
    image_url: 'https://images.unsplash.com/photo-1534972195531-a756b1126f24?w=800&auto=format&fit=crop&q=80',
    created_at: new Date(Date.now() - 3600000 * 2).toISOString(),
  },
];

// Helper to simulate natural asynchronous network latency
const simulateLatency = (ms: number = 200) => new Promise((resolve) => setTimeout(resolve, ms));

const getStoredProducts = (): Product[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_PRODUCTS));
      return INITIAL_PRODUCTS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_PRODUCTS;
  } catch {
    return INITIAL_PRODUCTS;
  }
};

const saveProducts = (products: Product[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  } catch (error) {
    console.error('Error saving products:', error);
  }
};

export const fetchAllProducts = async (): Promise<Product[]> => {
  await simulateLatency(200);
  const products = getStoredProducts();
  return [...products].sort((a, b) => {
    const timeA = a.created_at ? new Date(a.created_at).getTime() : (a.id || 0);
    const timeB = b.created_at ? new Date(b.created_at).getTime() : (b.id || 0);
    return timeB - timeA;
  });
};

export const createProduct = async (product: Product): Promise<Product> => {
  await simulateLatency(250);
  const current = getStoredProducts();
  const newProduct: Product = {
    ...product,
    id: Date.now(),
    price: Number(product.price) || 0,
    created_at: new Date().toISOString(),
  };

  const updated = [newProduct, ...current];
  saveProducts(updated);
  return newProduct;
};

export const deleteProduct = async (id: number): Promise<void> => {
  await simulateLatency(150);
  const current = getStoredProducts();
  const updated = current.filter((p) => p.id !== id);
  saveProducts(updated);
};