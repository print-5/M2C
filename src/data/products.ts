export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  stock: number;
  status: 'Active' | 'Inactive' | 'Out of Stock';
  sales: number;
  image: string;
  description?: string;
  rating?: number;
  reviews?: number;
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Handwoven Cotton Kitchen Towel Set',
    category: 'Kitchen Towels',
    price: 25.99,
    originalPrice: 32.99,
    stock: 45,
    status: 'Active',
    sales: 127,
    image: '/assets/images/categories/towels/tc1.jpg',
    description: 'Premium handwoven cotton kitchen towels with superior absorbency',
    rating: 4.8,
    reviews: 89
  },
  {
    id: '2',
    name: 'Organic Bath Towel Set',
    category: 'Bath Towels',
    price: 89.99,
    originalPrice: 109.99,
    stock: 23,
    status: 'Active',
    sales: 89,
    image: '/assets/images/categories/towels/tc2.jpg',
    description: 'Luxurious organic cotton bath towels for ultimate comfort',
    rating: 4.9,
    reviews: 156
  },
  {
    id: '3',
    name: 'Heritage Tea Towel Collection',
    category: 'Kitchen Towels',
    price: 35.99,
    originalPrice: 42.99,
    stock: 0,
    status: 'Out of Stock',
    sales: 156,
    image: '/assets/images/categories/towels/tc3.jpg',
    description: 'Traditional heritage design tea towels with vintage charm',
    rating: 4.7,
    reviews: 203
  },
  {
    id: '4',
    name: 'Premium Cotton T-Shirt',
    category: 'Clothing',
    price: 29.99,
    originalPrice: 39.99,
    stock: 78,
    status: 'Active',
    sales: 245,
    image: '/assets/images/categories/cs1.jpg',
    description: 'Soft premium cotton t-shirt with perfect fit',
    rating: 4.6,
    reviews: 134
  },
  {
    id: '5',
    name: 'Denim Jeans - Slim Fit',
    category: 'Clothing',
    price: 79.99,
    originalPrice: 99.99,
    stock: 34,
    status: 'Active',
    sales: 98,
    image: '/assets/images/categories/cs2.jpg',
    description: 'Classic slim fit denim jeans with modern styling',
    rating: 4.5,
    reviews: 87
  },
  {
    id: '6',
    name: 'Leather Wallet',
    category: 'Accessories',
    price: 49.99,
    originalPrice: 64.99,
    stock: 56,
    status: 'Active',
    sales: 167,
    image: '/assets/images/categories/cs3.jpg',
    description: 'Genuine leather wallet with multiple card slots',
    rating: 4.8,
    reviews: 92
  }
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getProductsByIds = (ids: string[]): Product[] => {
  return products.filter(product => ids.includes(product.id));
};

export const getActiveProducts = (): Product[] => {
  return products.filter(product => product.status === 'Active');
};