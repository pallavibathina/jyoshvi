import React, { useState } from 'react';
import { Heart, Eye, ShoppingBag, Check } from 'lucide-react';
import { Product, ProductColor } from '../types/store';
import { useStore } from '../context/StoreContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { 
    formatPrice, 
    toggleWishlist, 
    isInWishlist, 
    setActiveProductModal, 
    addToCart 
  } = useStore();

  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0]);
  const [quickAddOpen, setQuickAddOpen] = useState(false);
  const [addedSuccess, setAddedSuccess] = useState(false);

  const isFavorited = isInWishlist(product.id);

  const handleQuickAdd = (sizeStr: string, e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, sizeStr, selectedColor, 1);
    setAddedSuccess(true);
    setTimeout(() => {
      setAddedSuccess(false);
      setQuickAddOpen(false);
    }, 1200);
  };

  return (
    <div className="group relative flex flex-col bg-white border border-purple-100/70 hover:border-purple-300 transition-all duration-300 hover:shadow-lg">
      
      {/* Visual Slot (Image & Overlays) */}
      <div 
        className="relative aspect-[3/4] w-full overflow-hidden bg-[#F6F5F9] cursor-pointer"
        onClick={() => setActiveProductModal(product)}
      >
        <img
          src={product.image}
          alt={product.title}
          className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          referrerPolicy="no-referrer"
          loading="lazy"
        />

        {/* Editorial Subdued Badge (Max 1 subtle text tag) */}
        {product.badge && (
          <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-2.5 py-1 text-[10px] tracking-wider uppercase font-semibold text-purple-950 border border-purple-100">
            {product.badge}
          </div>
        )}

        {/* Top-Right Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-colors ${
            isFavorited 
              ? 'bg-purple-900 text-white shadow-sm' 
              : 'bg-white/80 text-zinc-700 hover:text-purple-900 hover:bg-white'
          }`}
          aria-label={isFavorited ? 'Remove from wishlist' : 'Save to wishlist'}
        >
          <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
        </button>

        {/* Bottom Quick-Action Bar on Hover */}
        <div className="absolute inset-x-3 bottom-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setActiveProductModal(product);
            }}
            className="flex-1 py-2.5 bg-white/95 hover:bg-white text-zinc-900 text-xs font-semibold tracking-wider uppercase flex items-center justify-center gap-1.5 shadow-md transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setQuickAddOpen(!quickAddOpen);
            }}
            className="p-2.5 bg-purple-900 hover:bg-purple-950 text-white shadow-md transition-colors"
            aria-label="Quick Add to Bag"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Size Drawer Popover */}
        {quickAddOpen && (
          <div 
            className="absolute inset-x-0 bottom-0 bg-white/98 backdrop-blur-md p-3 border-t border-purple-200 z-20 animate-in fade-in slide-in-from-bottom-2 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-purple-950">
                Select Size:
              </span>
              <button
                onClick={() => setQuickAddOpen(false)}
                className="text-zinc-400 hover:text-zinc-700 text-xs font-bold"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-4 gap-1.5">
              {product.sizes.map((s) => (
                <button
                  key={s.size}
                  disabled={!s.inStock}
                  onClick={(e) => handleQuickAdd(s.size, e)}
                  className={`py-1.5 text-xs font-medium border text-center transition-all ${
                    !s.inStock
                      ? 'border-zinc-200 bg-zinc-50 text-zinc-300 line-through cursor-not-allowed'
                      : 'border-purple-200 hover:border-purple-800 hover:bg-purple-900 hover:text-white text-zinc-800 cursor-pointer'
                  }`}
                >
                  {s.size}
                </button>
              ))}
            </div>

            {addedSuccess && (
              <div className="mt-2 text-[11px] text-center font-medium text-emerald-700 flex items-center justify-center gap-1">
                <Check className="w-3 h-3" />
                <span>Added to Shopping Bag</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Metadata & Pricing */}
      <div className="p-4 flex flex-col flex-1 justify-between bg-white">
        <div>
          {/* Subtle Category & Origin text (Unboxed metadata with separator) */}
          <div className="flex items-center gap-1.5 text-[11px] font-medium tracking-widest uppercase text-purple-800 mb-1">
            <span>{product.category}</span>
            <span className="text-purple-300">·</span>
            <span className="text-zinc-400 font-normal">{product.origin.split('in ')[1] || 'Italy'}</span>
          </div>

          {/* Product Title */}
          <h3 
            onClick={() => setActiveProductModal(product)}
            className="font-serif text-lg text-zinc-900 hover:text-purple-900 transition-colors font-medium cursor-pointer leading-snug line-clamp-1"
          >
            {product.title}
          </h3>

          <p className="text-xs text-zinc-500 font-light mt-0.5 line-clamp-1">
            {product.subtitle}
          </p>
        </div>

        {/* Color preview swatches & Price */}
        <div className="mt-4 pt-3 border-t border-purple-50 flex items-center justify-between">
          {/* Color swatch selection */}
          <div className="flex items-center gap-1.5">
            {product.colors.map((c) => (
              <button
                key={c.name}
                onClick={() => setSelectedColor(c)}
                title={c.name}
                className={`w-3.5 h-3.5 rounded-full border transition-all ${
                  selectedColor.name === c.name
                    ? 'ring-2 ring-purple-700 ring-offset-1 scale-110'
                    : 'border-zinc-300 hover:scale-105'
                }`}
                style={{ backgroundColor: c.hex }}
                aria-label={`Color: ${c.name}`}
              />
            ))}
            <span className="text-[10px] text-zinc-400 font-medium ml-1 truncate max-w-[80px]">
              {selectedColor.name}
            </span>
          </div>

          {/* Price (tabular numerals) */}
          <div className="flex items-baseline gap-1.5">
            {product.originalPrice && (
              <span className="text-xs text-zinc-400 line-through tabular-nums">
                {formatPrice(product.originalPrice)}
              </span>
            )}
            <span className="text-sm font-semibold text-zinc-900 tabular-nums">
              {formatPrice(product.price)}
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};
