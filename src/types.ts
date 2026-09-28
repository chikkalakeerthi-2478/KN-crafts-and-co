export type ProductCategory =
  | 'All'
  | 'Keychains'
  | 'Bouquets'
  | 'Lamps'
  | 'Flowers'
  | 'Gift Sets'
  | 'Custom Orders';

export interface Product {
  id: string;
  name: string;
  category: Exclude<ProductCategory, 'All'>;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  shortDescription: string;
  detailedDescription: string;
  image: string;
  materials: string[];
  dimensions: string;
  colors: { name: string; hex: string }[];
  occasionTags: string[];
  inStock: boolean;
  featured?: boolean;
  craftTimeHours: number;
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  selectedColor?: string;
  customNote?: string;
}

export interface CustomOrderRequest {
  id: string;
  customerName: string;
  contact: string;
  email: string;
  productType: string;
  colorPalette: string[];
  quantity: number;
  specialInstructions: string;
  referenceImage?: string;
  occasion: string;
  needByDate?: string;
  estimatedPrice: number;
  submittedAt: string;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  date: string;
  verified: boolean;
  productName: string;
  occasion: string;
  comment: string;
  avatarText: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Bouquets' | 'Lamps' | 'Keychains' | 'Studio' | 'Special';
  image: string;
  description: string;
  likes: number;
}
