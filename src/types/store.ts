export type Category = 
  | 'All'
  | 'Outerwear'
  | 'Dresses & Gowns'
  | 'Tailoring'
  | 'Knitwear'
  | 'Shirts & Tops'
  | 'Accessories';

export type Gender = 'All' | 'Women' | 'Men' | 'Unisex';

export interface ProductColor {
  name: string;
  hex: string;
  twClass: string;
}

export interface ProductSize {
  size: string;
  inStock: boolean;
  stockCount: number;
}

export interface Product {
  id: string;
  title: string;
  subtitle: string;
  category: Category;
  gender: Gender;
  price: number;
  originalPrice?: number;
  image: string;
  secondaryImage?: string;
  gallery: string[];
  description: string;
  details: string[];
  materials: string;
  origin: string;
  fit: string;
  colors: ProductColor[];
  sizes: ProductSize[];
  badge?: string;
  rating: number;
  reviewCount: number;
  featured?: boolean;
}

export interface CartItem {
  id: string; // unique item id: productId-size-color
  product: Product;
  selectedSize: string;
  selectedColor: ProductColor;
  quantity: number;
  addedAt: number;
}

export type CurrencyCode = 'USD' | 'EUR' | 'GBP';

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  rate: number; // relative to USD
}

export interface FilterState {
  category: Category;
  gender: Gender;
  size: string;
  colorHex?: string;
  minPrice: number;
  maxPrice: number;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'newest' | 'rating';
  searchQuery: string;
}

export interface CheckoutForm {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  apartment?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
  shippingMethod: 'standard' | 'express';
  paymentMethod: 'card' | 'apple_pay' | 'klarna';
  cardNumber: string;
  cardExpiry: string;
  cardCvc: string;
}

export interface OrderConfirmation {
  orderId: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  currency: CurrencyConfig;
  customer: CheckoutForm;
  estimatedDelivery: string;
}
