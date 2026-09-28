import React, { useRef, useEffect } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Product } from '../types/store';

export const SearchModal: React.FC = () => {
  const { 
    isSearchOpen, 
    setIsSearchOpen, 
    filters, 
    setSearchQuery, 
    filteredProducts, 
    formatPrice, 
    setActiveProductModal 
  } = useStore();

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const popularKeywords = ['Cashmere', 'Double-Breasted', 'Silk Gown', 'Amethyst', 'Trouser', 'Mohair'];

  const handleSelectProduct = (product: Product) => {
    setIsSearchOpen(false);
    setActiveProductModal(product);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={() => setIsSearchOpen(false)} 
      />

      <div className="min-h-full flex items-start justify-center pt-16 sm:pt-24 p-4">
        <div 
          className="relative bg-white w-full max-w-2xl shadow-2xl border border-purple-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Search Input Bar */}
          <div className="p-4 sm:p-6 border-b border-purple-100 flex items-center gap-3">
            <Search className="w-5 h-5 text-purple-800 flex-shrink-0" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search garments by name, fiber, or silhouette..."
              value={filters.searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 text-base sm:text-lg focus:outline-none placeholder:text-zinc-400 font-light"
            />
            {filters.searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-xs text-zinc-400 hover:text-zinc-800 font-semibold uppercase tracking-wider"
              >
                Clear
              </button>
            )}
            <button
              onClick={() => setIsSearchOpen(false)}
              className="p-1 text-zinc-400 hover:text-zinc-800"
              aria-label="Close search"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Suggestions */}
          <div className="px-6 py-3 bg-purple-50/50 border-b border-purple-100 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-zinc-500 font-medium">Trending searches:</span>
            {popularKeywords.map((kw) => (
              <button
                key={kw}
                onClick={() => setSearchQuery(kw)}
                className="px-2.5 py-1 bg-white border border-purple-200 hover:border-purple-800 hover:text-purple-900 text-zinc-700 transition-colors font-medium rounded-sm"
              >
                {kw}
              </button>
            ))}
          </div>

          {/* Search Results */}
          <div className="p-6 max-h-[60vh] overflow-y-auto">
            {filteredProducts.length === 0 ? (
              <div className="py-12 text-center text-zinc-500 text-sm">
                No atelier creations match your search inquiry.
              </div>
            ) : (
              <div className="space-y-3">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-purple-900 mb-2">
                  Matching Archive Pieces ({filteredProducts.length}):
                </div>
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => handleSelectProduct(product)}
                    className="flex items-center gap-4 p-2.5 hover:bg-purple-50/70 border border-transparent hover:border-purple-200 transition-colors cursor-pointer group"
                  >
                    <div className="w-14 h-16 bg-zinc-100 border border-purple-100 flex-shrink-0 overflow-hidden">
                      <img 
                        src={product.image} 
                        alt={product.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform" 
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-serif text-base text-zinc-900 font-medium group-hover:text-purple-900 truncate">
                        {product.title}
                      </h4>
                      <p className="text-xs text-zinc-500 truncate">
                        {product.category} · {product.materials}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-zinc-900 tabular-nums">
                        {formatPrice(product.price)}
                      </div>
                      <span className="text-[11px] text-purple-700 font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        View Piece <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
