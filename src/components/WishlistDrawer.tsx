import React from 'react';
import { X, Trash2, ShoppingBag, Heart } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const WishlistDrawer: React.FC = () => {
  const { 
    isWishlistOpen, 
    setIsWishlistOpen, 
    wishlistProducts, 
    toggleWishlist, 
    addToCart, 
    formatPrice,
    setActiveProductModal 
  } = useStore();

  if (!isWishlistOpen) return null;

  const handleMoveToBag = (product: any) => {
    const availableSize = product.sizes.find((s: any) => s.inStock)?.size || product.sizes[0].size;
    addToCart(product, availableSize, product.colors[0], 1);
    toggleWishlist(product.id);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity" 
        onClick={() => setIsWishlistOpen(false)} 
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white border-l border-purple-200 shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="p-6 border-b border-purple-100 flex items-center justify-between bg-[#FAF9FC]">
            <div className="flex items-center gap-2">
              <span className="font-serif text-xl font-normal text-zinc-950 uppercase tracking-wider">
                Saved Creations
              </span>
              <span className="bg-purple-900 text-white text-[11px] font-semibold px-2 py-0.5 rounded-full tabular-nums">
                {wishlistProducts.length}
              </span>
            </div>
            <button
              onClick={() => setIsWishlistOpen(false)}
              className="p-2 text-zinc-400 hover:text-zinc-950 transition-colors"
              aria-label="Close wishlist"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-5">
            {wishlistProducts.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-4">
                <div className="w-14 h-14 bg-purple-50 rounded-full flex items-center justify-center text-purple-800 mb-4">
                  <Heart className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl text-zinc-900 font-normal">
                  No saved creations yet
                </h3>
                <p className="text-xs text-zinc-500 mt-1 max-w-xs">
                  Click the heart icon on any garment to preserve your curated favorites for later.
                </p>
                <button
                  onClick={() => setIsWishlistOpen(false)}
                  className="mt-6 px-6 py-2.5 bg-purple-900 text-white text-xs font-semibold tracking-wider uppercase hover:bg-purple-950 transition-colors"
                >
                  Browse Catalog
                </button>
              </div>
            ) : (
              wishlistProducts.map((product) => (
                <div 
                  key={product.id} 
                  className="flex gap-4 pb-5 border-b border-purple-100 last:border-0"
                >
                  <div 
                    className="w-20 h-24 bg-zinc-100 border border-purple-100 flex-shrink-0 overflow-hidden cursor-pointer"
                    onClick={() => {
                      setActiveProductModal(product);
                      setIsWishlistOpen(false);
                    }}
                  >
                    <img 
                      src={product.image} 
                      alt={product.title} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 
                          onClick={() => {
                            setActiveProductModal(product);
                            setIsWishlistOpen(false);
                          }}
                          className="font-serif text-base text-zinc-900 font-medium leading-snug cursor-pointer hover:text-purple-900 line-clamp-1"
                        >
                          {product.title}
                        </h4>
                        <button
                          onClick={() => toggleWishlist(product.id)}
                          className="text-zinc-400 hover:text-red-600 transition-colors p-1"
                          aria-label="Remove from wishlist"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-xs text-zinc-500 mt-0.5">
                        {product.category} · {product.origin}
                      </div>

                      <div className="font-semibold text-sm text-zinc-900 mt-2 tabular-nums">
                        {formatPrice(product.price)}
                      </div>
                    </div>

                    <button
                      onClick={() => handleMoveToBag(product)}
                      className="mt-3 py-2 px-3 bg-purple-900 hover:bg-purple-950 text-white text-xs font-semibold tracking-wider uppercase flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Move to Bag</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
