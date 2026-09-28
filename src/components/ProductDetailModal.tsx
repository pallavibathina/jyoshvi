import React, { useState } from 'react';
import { X, Heart, ShieldCheck, Truck, RotateCcw, Ruler, Check, ChevronRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductColor } from '../types/store';

export const ProductDetailModal: React.FC = () => {
  const { 
    activeProductModal, 
    setActiveProductModal, 
    formatPrice, 
    addToCart, 
    toggleWishlist, 
    isInWishlist,
    setIsSizeGuideOpen 
  } = useStore();

  if (!activeProductModal) return null;

  const product = activeProductModal;
  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState<string>(
    product.sizes.find(s => s.inStock)?.size || product.sizes[0].size
  );
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'materials' | 'shipping'>('details');

  const isFavorited = isInWishlist(product.id);
  const currentSizeObj = product.sizes.find(s => s.size === selectedSize);
  const images = product.gallery && product.gallery.length > 0 ? product.gallery : [product.image];

  const handleAddToCart = () => {
    if (!currentSizeObj?.inStock) return;
    addToCart(product, selectedSize, selectedColor, quantity);
    setActiveProductModal(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Dimmed backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={() => setActiveProductModal(null)} 
      />

      <div className="min-h-full flex items-center justify-center p-3 sm:p-6 lg:p-8">
        <div 
          className="relative bg-white w-full max-w-4xl shadow-2xl border border-purple-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top Close Button */}
          <button
            onClick={() => setActiveProductModal(null)}
            className="absolute top-4 right-4 z-20 p-2 bg-white/90 hover:bg-white text-zinc-600 hover:text-zinc-950 rounded-full transition-colors shadow-sm"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            
            {/* Gallery Left Column */}
            <div className="bg-[#FAF9FC] p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-purple-100">
              <div className="relative aspect-[3/4] overflow-hidden bg-zinc-100">
                <img
                  src={images[activeImageIndex] || product.image}
                  alt={product.title}
                  className="w-full h-full object-cover object-center"
                  referrerPolicy="no-referrer"
                />

                {product.badge && (
                  <div className="absolute top-3 left-3 bg-white/95 px-2.5 py-1 text-[10px] tracking-wider uppercase font-semibold text-purple-950 border border-purple-200">
                    {product.badge}
                  </div>
                )}
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="flex gap-2 mt-4">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`w-16 h-20 border overflow-hidden transition-all ${
                        activeImageIndex === idx 
                          ? 'border-purple-800 ring-1 ring-purple-800' 
                          : 'border-zinc-200 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img 
                        src={img} 
                        alt={`${product.title} preview ${idx + 1}`} 
                        className="w-full h-full object-cover" 
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Garment Fit Note */}
              <div className="mt-4 pt-4 border-t border-purple-100 text-[11px] text-zinc-500 flex items-center justify-between">
                <span>Fit: <strong className="text-zinc-700 font-semibold">{product.fit}</strong></span>
                <button
                  onClick={() => setIsSizeGuideOpen(true)}
                  className="text-purple-800 hover:underline flex items-center gap-1 font-semibold"
                >
                  <Ruler className="w-3.5 h-3.5" />
                  <span>Size Chart</span>
                </button>
              </div>
            </div>

            {/* Contiguous Purchase Module Right Column */}
            <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div>
                {/* Breadcrumbs / Category */}
                <div className="text-[11px] uppercase tracking-widest font-semibold text-purple-800">
                  {product.category} · {product.origin}
                </div>

                <h1 className="font-serif text-2xl sm:text-3xl text-zinc-900 font-medium mt-1 leading-snug">
                  {product.title}
                </h1>

                <p className="text-xs text-zinc-500 font-normal mt-1">
                  {product.subtitle}
                </p>

                {/* Price & Installment note */}
                <div className="mt-4 flex items-baseline gap-3">
                  <span className="text-2xl font-semibold text-zinc-950 tabular-nums">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-zinc-400 line-through tabular-nums">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                  <span className="text-xs text-purple-700 font-medium">
                    (VAT & duties included)
                  </span>
                </div>

                {/* Color Selector */}
                <div className="mt-6">
                  <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider mb-2">
                    <span className="text-purple-950">Color:</span>
                    <span className="text-zinc-600 font-medium">{selectedColor.name}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {product.colors.map((c) => (
                      <button
                        key={c.name}
                        onClick={() => setSelectedColor(c)}
                        className={`w-7 h-7 rounded-full border transition-all ${
                          selectedColor.name === c.name
                            ? 'ring-2 ring-purple-800 ring-offset-2 scale-105'
                            : 'border-zinc-300 hover:scale-105'
                        }`}
                        style={{ backgroundColor: c.hex }}
                        aria-label={c.name}
                      />
                    ))}
                  </div>
                </div>

                {/* Size Selector */}
                <div className="mt-6">
                  <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider mb-2">
                    <span className="text-purple-950">Select Size:</span>
                    {currentSizeObj && currentSizeObj.stockCount <= 3 && currentSizeObj.inStock && (
                      <span className="text-amber-700 font-semibold text-[11px] lowercase italic">
                        Only {currentSizeObj.stockCount} pieces remaining
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-5 gap-2">
                    {product.sizes.map((s) => (
                      <button
                        key={s.size}
                        disabled={!s.inStock}
                        onClick={() => setSelectedSize(s.size)}
                        className={`py-2 text-xs font-semibold border text-center transition-all ${
                          selectedSize === s.size
                            ? 'bg-purple-900 text-white border-purple-900 shadow-sm'
                            : s.inStock
                            ? 'bg-white border-purple-200 text-zinc-800 hover:border-purple-600'
                            : 'bg-zinc-100 border-zinc-200 text-zinc-300 line-through cursor-not-allowed'
                        }`}
                      >
                        {s.size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity & CTA Buttons */}
                <div className="mt-6 flex gap-3">
                  {/* Quantity Stepper */}
                  <div className="flex items-center border border-purple-200 bg-zinc-50">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-3 text-zinc-600 hover:text-zinc-950 transition-colors"
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <span className="px-3 text-xs font-semibold text-zinc-900 tabular-nums">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-3 text-zinc-600 hover:text-zinc-950 transition-colors"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>

                  {/* Add to Bag Primary CTA */}
                  <button
                    disabled={!currentSizeObj?.inStock}
                    onClick={handleAddToCart}
                    className={`flex-1 py-3.5 px-6 text-xs font-semibold tracking-widest uppercase transition-all duration-200 flex items-center justify-center gap-2 ${
                      currentSizeObj?.inStock
                        ? 'bg-purple-900 hover:bg-purple-950 text-white cursor-pointer shadow-md'
                        : 'bg-zinc-200 text-zinc-400 cursor-not-allowed'
                    }`}
                  >
                    <span>{currentSizeObj?.inStock ? 'Add to Shopping Bag' : 'Sold Out'}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>

                  {/* Wishlist Button */}
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className={`p-3.5 border transition-colors ${
                      isFavorited
                        ? 'bg-purple-50 border-purple-700 text-purple-900'
                        : 'border-purple-200 text-zinc-700 hover:bg-purple-50'
                    }`}
                    aria-label="Save to wishlist"
                  >
                    <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
                  </button>
                </div>

                {/* Micro Guarantee Icons */}
                <div className="mt-5 grid grid-cols-2 gap-2 text-[11px] text-zinc-600 pt-4 border-t border-purple-100">
                  <div className="flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-purple-800" />
                    <span>Complimentary Express Delivery</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <RotateCcw className="w-3.5 h-3.5 text-purple-800" />
                    <span>30-Day Atelier Returns</span>
                  </div>
                </div>
              </div>

              {/* Informational Tabs */}
              <div className="border-t border-purple-100 pt-4">
                <div className="flex border-b border-purple-100 text-xs font-semibold uppercase tracking-wider mb-3">
                  <button
                    onClick={() => setActiveTab('details')}
                    className={`pb-2 mr-4 border-b-2 transition-colors ${
                      activeTab === 'details'
                        ? 'border-purple-800 text-purple-950'
                        : 'border-transparent text-zinc-400 hover:text-zinc-700'
                    }`}
                  >
                    Description
                  </button>
                  <button
                    onClick={() => setActiveTab('materials')}
                    className={`pb-2 mr-4 border-b-2 transition-colors ${
                      activeTab === 'materials'
                        ? 'border-purple-800 text-purple-950'
                        : 'border-transparent text-zinc-400 hover:text-zinc-700'
                    }`}
                  >
                    Composition
                  </button>
                  <button
                    onClick={() => setActiveTab('shipping')}
                    className={`pb-2 border-b-2 transition-colors ${
                      activeTab === 'shipping'
                        ? 'border-purple-800 text-purple-950'
                        : 'border-transparent text-zinc-400 hover:text-zinc-700'
                    }`}
                  >
                    Care & Delivery
                  </button>
                </div>

                <div className="text-xs text-zinc-600 leading-relaxed min-h-[70px]">
                  {activeTab === 'details' && (
                    <div className="space-y-1.5">
                      <p>{product.description}</p>
                      <ul className="list-disc list-inside space-y-1 text-zinc-500 mt-2">
                        {product.details.map((d, i) => (
                          <li key={i}>{d}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {activeTab === 'materials' && (
                    <div className="space-y-2">
                      <p><strong className="text-zinc-800">Materials:</strong> {product.materials}</p>
                      <p><strong className="text-zinc-800">Provenance:</strong> {product.origin}</p>
                      <p className="text-zinc-500">Every fabric is authenticated and sourced in compliance with our zero-synthetic environmental mandate.</p>
                    </div>
                  )}

                  {activeTab === 'shipping' && (
                    <div className="space-y-2">
                      <p>All pieces are dispatched in recycled violet linen presentation boxes with bespoke garment covers.</p>
                      <p><strong className="text-zinc-800">Care Instructions:</strong> Specialist luxury dry clean only. Store on contoured wooden hangers.</p>
                    </div>
                  )}
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
