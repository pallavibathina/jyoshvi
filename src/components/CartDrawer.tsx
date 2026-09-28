import React, { useState } from 'react';
import { X, Trash2, ArrowRight, ShieldCheck, Sparkles, Check } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const CartDrawer: React.FC = () => {
  const { 
    isCartOpen, 
    setIsCartOpen, 
    cart, 
    cartTotalCount, 
    cartSubtotal, 
    discountAmount, 
    appliedPromo, 
    applyPromoCode, 
    removePromoCode, 
    freeShippingThreshold, 
    distanceToFreeShipping, 
    updateQuantity, 
    removeFromCart, 
    formatPrice, 
    setIsCheckoutOpen 
  } = useStore();

  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState(false);

  if (!isCartOpen) return null;

  const isFreeShipping = distanceToFreeShipping === 0 || appliedPromo === 'VIPFREESHIP';
  const progressPercent = Math.min(100, Math.round((cartSubtotal / freeShippingThreshold) * 100));
  const shippingEstimate = isFreeShipping ? 0 : 20;
  const finalTotal = Math.max(0, cartSubtotal - discountAmount + (cart.length > 0 ? shippingEstimate : 0));

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const ok = applyPromoCode(promoInput);
    if (!ok) {
      setPromoError(true);
      setTimeout(() => setPromoError(false), 2500);
    } else {
      setPromoInput('');
      setPromoError(false);
    }
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity" 
        onClick={() => setIsCartOpen(false)} 
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white border-l border-purple-200 shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="p-6 border-b border-purple-100 flex items-center justify-between bg-[#FAF9FC]">
            <div className="flex items-center gap-2">
              <span className="font-serif text-xl font-normal text-zinc-950 uppercase tracking-wider">
                Shopping Bag
              </span>
              <span className="bg-purple-900 text-white text-[11px] font-semibold px-2 py-0.5 rounded-full tabular-nums">
                {cartTotalCount}
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-zinc-400 hover:text-zinc-950 transition-colors"
              aria-label="Close bag"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="px-6 py-3.5 bg-purple-50/70 border-b border-purple-100 text-xs">
            <div className="flex justify-between items-center mb-1.5 font-medium">
              {isFreeShipping ? (
                <span className="text-purple-950 font-semibold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-purple-700" />
                  <span>Complimentary Express Courier Unlocked</span>
                </span>
              ) : (
                <span className="text-zinc-600">
                  Add <strong className="text-purple-900 font-semibold tabular-nums">{formatPrice(distanceToFreeShipping)}</strong> for Complimentary Express Delivery
                </span>
              )}
              <span className="text-purple-800 font-semibold tabular-nums">
                {progressPercent}%
              </span>
            </div>
            <div className="w-full h-1.5 bg-purple-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-purple-800 rounded-full transition-all duration-500 ease-out" 
                style={{ width: `${progressPercent}%` }} 
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-5">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-4">
                <div className="w-14 h-14 bg-purple-50 rounded-full flex items-center justify-center text-purple-800 mb-4">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl text-zinc-900 font-normal">
                  Your bag is empty
                </h3>
                <p className="text-xs text-zinc-500 mt-1 max-w-xs">
                  Discover our seasonal ready-to-wear archive crafted from Italian wools and Como silks.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-6 px-6 py-2.5 bg-purple-900 text-white text-xs font-semibold tracking-wider uppercase hover:bg-purple-950 transition-colors"
                >
                  Explore Creations
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div 
                  key={item.id} 
                  className="flex gap-4 pb-5 border-b border-purple-100 last:border-0"
                >
                  {/* Thumbnail */}
                  <div className="w-20 h-24 bg-zinc-100 border border-purple-100 flex-shrink-0 overflow-hidden">
                    <img 
                      src={item.product.image} 
                      alt={item.product.title} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="font-serif text-base text-zinc-900 font-medium leading-snug line-clamp-1">
                          {item.product.title}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-zinc-400 hover:text-red-600 transition-colors p-1"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Selected attributes */}
                      <div className="flex items-center gap-2 mt-1 text-[11px] text-zinc-500">
                        <span>Size: <strong className="text-zinc-800">{item.selectedSize}</strong></span>
                        <span>·</span>
                        <div className="flex items-center gap-1">
                          <span 
                            className="w-2.5 h-2.5 rounded-full inline-block border border-zinc-300" 
                            style={{ backgroundColor: item.selectedColor.hex }} 
                          />
                          <span>{item.selectedColor.name}</span>
                        </div>
                      </div>
                    </div>

                    {/* Quantity controls & Price */}
                    <div className="flex justify-between items-center mt-3">
                      <div className="flex items-center border border-purple-200 text-xs">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-2 py-1 text-zinc-500 hover:text-zinc-900"
                        >
                          -
                        </button>
                        <span className="px-2 font-semibold text-zinc-800 tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-1 text-zinc-500 hover:text-zinc-900"
                        >
                          +
                        </button>
                      </div>

                      <span className="font-semibold text-sm text-zinc-900 tabular-nums">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                    </div>

                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Summary */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-purple-200 bg-[#FAF9FC] space-y-4">
              
              {/* Promo Code Input */}
              <div>
                {appliedPromo ? (
                  <div className="flex items-center justify-between bg-purple-100/70 border border-purple-200 px-3 py-2 text-xs">
                    <div className="flex items-center gap-1.5 text-purple-900 font-semibold">
                      <Check className="w-3.5 h-3.5 text-purple-700" />
                      <span>Code: {appliedPromo}</span>
                    </div>
                    <button
                      onClick={removePromoCode}
                      className="text-purple-700 hover:text-purple-950 text-xs underline font-medium"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyPromo} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Promo Code (try VIOLETTE15)"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      className="flex-1 text-xs px-3 py-2 border border-purple-200 focus:outline-none focus:border-purple-800 bg-white uppercase font-medium"
                    />
                    <button
                      type="submit"
                      className="px-3.5 py-2 bg-purple-900 text-white text-xs font-semibold uppercase tracking-wider hover:bg-purple-950 transition-colors"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {promoError && (
                  <p className="text-[11px] text-red-600 mt-1 font-medium">
                    Invalid code. Use <span className="font-mono">VIOLETTE15</span> or <span className="font-mono">PURPLE10</span>
                  </p>
                )}
              </div>

              {/* Subtotal & Calculations */}
              <div className="space-y-1.5 text-xs text-zinc-600 pt-2 border-t border-purple-100">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium text-zinc-900 tabular-nums">
                    {formatPrice(cartSubtotal)}
                  </span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-purple-800 font-medium">
                    <span>Atelier Privilege Discount</span>
                    <span className="tabular-nums">-{formatPrice(discountAmount)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Express Courier</span>
                  <span className="font-medium text-zinc-900 tabular-nums">
                    {isFreeShipping ? 'Complimentary' : formatPrice(shippingEstimate)}
                  </span>
                </div>

                <div className="flex justify-between text-sm font-semibold text-zinc-950 pt-2 border-t border-purple-200">
                  <span>Estimated Total</span>
                  <span className="text-base text-purple-950 tabular-nums font-bold">
                    {formatPrice(finalTotal)}
                  </span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleProceedToCheckout}
                className="w-full py-3.5 bg-purple-900 hover:bg-purple-950 text-white text-xs font-semibold tracking-widest uppercase transition-colors flex items-center justify-center gap-2 shadow-md cursor-pointer"
              >
                <span>Proceed to Secure Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-zinc-500 font-medium pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-purple-800" />
                <span>256-Bit Encrypted Atelier Checkout · Free Returns</span>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
