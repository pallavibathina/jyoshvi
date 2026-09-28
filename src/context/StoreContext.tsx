import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Product, 
  CartItem, 
  CurrencyConfig, 
  FilterState, 
  Category, 
  Gender, 
  CheckoutForm, 
  OrderConfirmation,
  ProductColor
} from '../types/store';
import { PRODUCTS, CURRENCIES } from '../data/products';

interface ToastMessage {
  id: string;
  title: string;
  subtitle?: string;
  type?: 'success' | 'info';
}

interface StoreContextType {
  // Products & Filtering
  products: Product[];
  filteredProducts: Product[];
  filters: FilterState;
  setCategory: (category: Category) => void;
  setGender: (gender: Gender) => void;
  setSizeFilter: (size: string) => void;
  setSortBy: (sort: FilterState['sortBy']) => void;
  setSearchQuery: (query: string) => void;
  resetFilters: () => void;

  // Currency
  currency: CurrencyConfig;
  setCurrencyCode: (code: 'USD' | 'EUR' | 'GBP') => void;
  formatPrice: (amountInUSD: number) => string;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, size: string, color: ProductColor, quantity?: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, newQty: number) => void;
  clearCart: () => void;
  cartTotalCount: number;
  cartSubtotal: number;
  discountAmount: number;
  promoCode: string;
  appliedPromo: string | null;
  applyPromoCode: (code: string) => boolean;
  removePromoCode: () => void;
  freeShippingThreshold: number;
  distanceToFreeShipping: number;

  // Wishlist
  wishlist: string[]; // product IDs
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  wishlistProducts: Product[];

  // UI Modals & Drawers
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isSizeGuideOpen: boolean;
  setIsSizeGuideOpen: (open: boolean) => void;
  isLookbookOpen: boolean;
  setIsLookbookOpen: (open: boolean) => void;
  activeProductModal: Product | null;
  setActiveProductModal: (product: Product | null) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  
  // Checkout & Orders
  lastOrder: OrderConfirmation | null;
  processOrder: (form: CheckoutForm) => OrderConfirmation;
  clearLastOrder: () => void;

  // Toasts
  toasts: ToastMessage[];
  showToast: (title: string, subtitle?: string) => void;
  removeToast: (id: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const FREE_SHIPPING_THRESHOLD_USD = 250;

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Currency
  const [currency, setCurrency] = useState<CurrencyConfig>(CURRENCIES.USD);

  // Cart & Wishlist persisted in localStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('atelier_violette_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('atelier_violette_wishlist');
      return saved ? JSON.parse(saved) : ['coat-amethyst-tailored'];
    } catch {
      return ['coat-amethyst-tailored'];
    }
  });

  // UI state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isLookbookOpen, setIsLookbookOpen] = useState(false);
  const [activeProductModal, setActiveProductModal] = useState<Product | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [lastOrder, setLastOrder] = useState<OrderConfirmation | null>(null);

  // Promo Code
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = (title: string, subtitle?: string) => {
    const id = `${Date.now()}-${Math.random()}`;
    setToasts(prev => [...prev.slice(-3), { id, title, subtitle, type: 'success' }]);
    setTimeout(() => {
      removeToast(id);
    }, 3800);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('atelier_violette_cart', JSON.stringify(cart));
    } catch {
      // storage unavailable
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('atelier_violette_wishlist', JSON.stringify(wishlist));
    } catch {
      // storage unavailable
    }
  }, [wishlist]);

  // Filters
  const [filters, setFilters] = useState<FilterState>({
    category: 'All',
    gender: 'All',
    size: 'All',
    minPrice: 0,
    maxPrice: 2000,
    sortBy: 'featured',
    searchQuery: '',
  });

  const setCategory = (category: Category) => {
    setFilters(prev => ({ ...prev, category }));
  };

  const setGender = (gender: Gender) => {
    setFilters(prev => ({ ...prev, gender }));
  };

  const setSizeFilter = (size: string) => {
    setFilters(prev => ({ ...prev, size }));
  };

  const setSortBy = (sortBy: FilterState['sortBy']) => {
    setFilters(prev => ({ ...prev, sortBy }));
  };

  const setSearchQuery = (searchQuery: string) => {
    setFilters(prev => ({ ...prev, searchQuery }));
  };

  const resetFilters = () => {
    setFilters({
      category: 'All',
      gender: 'All',
      size: 'All',
      minPrice: 0,
      maxPrice: 2000,
      sortBy: 'featured',
      searchQuery: '',
    });
  };

  const setCurrencyCode = (code: 'USD' | 'EUR' | 'GBP') => {
    if (CURRENCIES[code]) {
      setCurrency(CURRENCIES[code]);
    }
  };

  const formatPrice = (amountInUSD: number) => {
    const converted = amountInUSD * currency.rate;
    return `${currency.symbol}${Math.round(converted).toLocaleString()}`;
  };

  // Cart operations
  const addToCart = (product: Product, size: string, color: ProductColor, quantity = 1) => {
    const itemId = `${product.id}-${size}-${color.name}`;
    setCart(prev => {
      const existingIndex = prev.findIndex(item => item.id === itemId);
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity,
        };
        return next;
      }
      return [
        ...prev,
        {
          id: itemId,
          product,
          selectedSize: size,
          selectedColor: color,
          quantity,
          addedAt: Date.now(),
        },
      ];
    });

    showToast(`Added to Bag`, `${product.title} (${size}, ${color.name})`);
    setIsCartOpen(true);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart(prev => prev.filter(item => item.id !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart(prev =>
      prev.map(item => (item.id === cartItemId ? { ...item, quantity: newQty } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedPromo(null);
  };

  const cartTotalCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartSubtotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);

  // Promo calculation
  const applyPromoCode = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'VIOLETTE15' || clean === 'PURPLE10' || clean === 'VIPFREESHIP') {
      setAppliedPromo(clean);
      setPromoCode('');
      showToast('Offer Applied', `${clean} successfully deducted`);
      return true;
    }
    return false;
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
  };

  let discountAmount = 0;
  if (appliedPromo === 'VIOLETTE15') {
    discountAmount = Math.round(cartSubtotal * 0.15);
  } else if (appliedPromo === 'PURPLE10') {
    discountAmount = Math.round(cartSubtotal * 0.1);
  }

  const freeShippingThreshold = FREE_SHIPPING_THRESHOLD_USD;
  const distanceToFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);

  // Wishlist
  const toggleWishlist = (productId: string) => {
    setWishlist(prev => {
      const exists = prev.includes(productId);
      const prod = PRODUCTS.find(p => p.id === productId);
      if (exists) {
        showToast('Removed from Wishlist', prod?.title);
        return prev.filter(id => id !== productId);
      } else {
        showToast('Saved to Wishlist', prod?.title);
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const wishlistProducts = PRODUCTS.filter(p => wishlist.includes(p.id));

  // Filtered Products computation
  const filteredProducts = PRODUCTS.filter(product => {
    // Category
    if (filters.category !== 'All' && product.category !== filters.category) {
      return false;
    }
    // Gender
    if (filters.gender !== 'All' && product.gender !== filters.gender && product.gender !== 'Unisex') {
      return false;
    }
    // Size
    if (filters.size !== 'All') {
      const hasSize = product.sizes.some(s => s.size === filters.size && s.inStock);
      if (!hasSize) return false;
    }
    // Search Query
    if (filters.searchQuery.trim()) {
      const q = filters.searchQuery.toLowerCase();
      const match =
        product.title.toLowerCase().includes(q) ||
        product.subtitle.toLowerCase().includes(q) ||
        product.category.toLowerCase().includes(q) ||
        product.materials.toLowerCase().includes(q) ||
        product.origin.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  }).sort((a, b) => {
    if (filters.sortBy === 'price-asc') return a.price - b.price;
    if (filters.sortBy === 'price-desc') return b.price - a.price;
    if (filters.sortBy === 'rating') return b.rating - a.rating;
    if (filters.sortBy === 'newest') return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    return 0; // featured default
  });

  // Process Order
  const processOrder = (form: CheckoutForm): OrderConfirmation => {
    const isFreeShip = appliedPromo === 'VIPFREESHIP' || cartSubtotal >= freeShippingThreshold;
    const shippingCost = form.shippingMethod === 'express' ? 25 : (isFreeShip ? 0 : 20);
    const finalTotal = Math.max(0, cartSubtotal - discountAmount + shippingCost);

    const confirmation: OrderConfirmation = {
      orderId: `AV-${Math.floor(10000 + Math.random() * 90000)}`,
      date: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
      items: [...cart],
      subtotal: cartSubtotal,
      discount: discountAmount,
      shipping: shippingCost,
      total: finalTotal,
      currency,
      customer: form,
      estimatedDelivery: form.shippingMethod === 'express' ? '2-3 Business Days' : '4-6 Business Days',
    };

    setLastOrder(confirmation);
    clearCart();
    return confirmation;
  };

  const clearLastOrder = () => setLastOrder(null);

  return (
    <StoreContext.Provider
      value={{
        products: PRODUCTS,
        filteredProducts,
        filters,
        setCategory,
        setGender,
        setSizeFilter,
        setSortBy,
        setSearchQuery,
        resetFilters,
        currency,
        setCurrencyCode,
        formatPrice,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotalCount,
        cartSubtotal,
        discountAmount,
        promoCode,
        appliedPromo,
        applyPromoCode,
        removePromoCode,
        freeShippingThreshold,
        distanceToFreeShipping,
        wishlist,
        toggleWishlist,
        isInWishlist,
        wishlistProducts,
        isCartOpen,
        setIsCartOpen,
        isWishlistOpen,
        setIsWishlistOpen,
        isSearchOpen,
        setIsSearchOpen,
        isSizeGuideOpen,
        setIsSizeGuideOpen,
        isLookbookOpen,
        setIsLookbookOpen,
        activeProductModal,
        setActiveProductModal,
        isCheckoutOpen,
        setIsCheckoutOpen,
        lastOrder,
        processOrder,
        clearLastOrder,
        toasts,
        showToast,
        removeToast,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
