import React, { useState } from 'react';
import { Search, Heart, ShoppingBag, Menu, X, ChevronDown } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Category } from '../types/store';

export const Navbar: React.FC = () => {
  const { 
    cartTotalCount, 
    wishlist, 
    currency, 
    setCurrencyCode, 
    setIsCartOpen, 
    setIsWishlistOpen, 
    setIsSearchOpen,
    setIsLookbookOpen,
    setCategory,
  } = useStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);

  const handleNavClick = (category: Category, e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    setCategory(category);
    setMobileMenuOpen(false);
    const catalogElement = document.getElementById('catalog-section');
    if (catalogElement) {
      catalogElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-purple-100 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Zone 1: Wordmark (Single text element in high-fashion serif) */}
          <div className="flex items-center">
            <button
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setCategory('All');
              }}
              className="text-left group cursor-pointer"
            >
              <span className="font-serif text-2xl sm:text-3xl font-semibold tracking-[0.2em] text-[#0F0E17] group-hover:text-purple-800 transition-colors uppercase">
                Atelier Violette
              </span>
            </button>
          </div>

          {/* Zone 2: Navigation Links (Text with subtle hover underlines) */}
          <nav className="hidden lg:flex items-center space-x-8 text-sm tracking-widest uppercase font-medium text-zinc-700">
            <button
              onClick={(e) => handleNavClick('All', e)}
              className="hover:text-purple-800 transition-colors pb-1 border-b border-transparent hover:border-purple-700 cursor-pointer"
            >
              New Arrivals
            </button>
            <button
              onClick={(e) => handleNavClick('Outerwear', e)}
              className="hover:text-purple-800 transition-colors pb-1 border-b border-transparent hover:border-purple-700 cursor-pointer"
            >
              Outerwear
            </button>
            <button
              onClick={(e) => handleNavClick('Dresses & Gowns', e)}
              className="hover:text-purple-800 transition-colors pb-1 border-b border-transparent hover:border-purple-700 cursor-pointer"
            >
              Silks & Gowns
            </button>
            <button
              onClick={(e) => handleNavClick('Tailoring', e)}
              className="hover:text-purple-800 transition-colors pb-1 border-b border-transparent hover:border-purple-700 cursor-pointer"
            >
              Tailoring
            </button>
            <button
              onClick={(e) => handleNavClick('Knitwear', e)}
              className="hover:text-purple-800 transition-colors pb-1 border-b border-transparent hover:border-purple-700 cursor-pointer"
            >
              Knitwear
            </button>
            <button
              onClick={() => setIsLookbookOpen(true)}
              className="hover:text-purple-800 transition-colors pb-1 border-b border-transparent hover:border-purple-700 cursor-pointer text-purple-700 font-semibold"
            >
              Atelier Craft
            </button>
          </nav>

          {/* Zone 3: Primary Actions (Currency, Search, Wishlist, Cart) */}
          <div className="flex items-center space-x-3 sm:space-x-5">
            {/* Currency Selector */}
            <div className="relative hidden sm:block">
              <button
                onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
                className="flex items-center space-x-1 text-xs font-semibold tracking-wider text-zinc-700 hover:text-purple-900 px-2 py-1.5 rounded transition-colors"
                aria-label="Select Currency"
              >
                <span>{currency.code} ({currency.symbol})</span>
                <ChevronDown className="w-3 h-3 text-zinc-400" />
              </button>

              {currencyDropdownOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-10" 
                    onClick={() => setCurrencyDropdownOpen(false)} 
                  />
                  <div className="absolute right-0 mt-1 w-28 bg-white border border-purple-100 shadow-xl py-1 z-20 text-xs">
                    {(['USD', 'EUR', 'GBP'] as const).map((code) => (
                      <button
                        key={code}
                        onClick={() => {
                          setCurrencyCode(code);
                          setCurrencyDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 font-medium hover:bg-purple-50 transition-colors flex items-center justify-between ${
                          currency.code === code ? 'text-purple-800 bg-purple-50/60 font-semibold' : 'text-zinc-700'
                        }`}
                      >
                        <span>{code}</span>
                        <span className="text-zinc-400">
                          {code === 'USD' ? '$' : code === 'EUR' ? '€' : '£'}
                        </span>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-zinc-700 hover:text-purple-800 transition-colors"
              aria-label="Search Collection"
            >
              <Search className="w-5 h-5 stroke-[1.75]" />
            </button>

            {/* Wishlist Trigger */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="p-2 text-zinc-700 hover:text-purple-800 transition-colors relative"
              aria-label="Saved Items"
            >
              <Heart className="w-5 h-5 stroke-[1.75]" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-purple-700 text-white text-[10px] font-medium rounded-full flex items-center justify-center tabular-nums">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Shopping Bag Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2 px-3 py-2 bg-purple-900 hover:bg-purple-950 text-white rounded text-xs tracking-wider uppercase font-semibold transition-colors shadow-sm"
              aria-label="Shopping Bag"
            >
              <ShoppingBag className="w-4 h-4 stroke-[2]" />
              <span className="hidden sm:inline">Bag</span>
              <span className="bg-purple-800 text-purple-100 px-1.5 py-0.5 rounded text-[10px] font-bold tabular-nums">
                {cartTotalCount}
              </span>
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-zinc-700 hover:text-purple-900"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-purple-100 bg-white px-4 pt-3 pb-6 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="grid grid-cols-2 gap-2 text-xs uppercase tracking-wider font-semibold text-zinc-700 pt-1">
            <button
              onClick={(e) => handleNavClick('All', e)}
              className="text-left py-2 px-3 hover:bg-purple-50 rounded text-purple-900"
            >
              New Arrivals
            </button>
            <button
              onClick={(e) => handleNavClick('Outerwear', e)}
              className="text-left py-2 px-3 hover:bg-purple-50 rounded"
            >
              Outerwear
            </button>
            <button
              onClick={(e) => handleNavClick('Dresses & Gowns', e)}
              className="text-left py-2 px-3 hover:bg-purple-50 rounded"
            >
              Silks & Gowns
            </button>
            <button
              onClick={(e) => handleNavClick('Tailoring', e)}
              className="text-left py-2 px-3 hover:bg-purple-50 rounded"
            >
              Tailoring
            </button>
            <button
              onClick={(e) => handleNavClick('Knitwear', e)}
              className="text-left py-2 px-3 hover:bg-purple-50 rounded"
            >
              Knitwear
            </button>
            <button
              onClick={() => {
                setIsLookbookOpen(true);
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 px-3 hover:bg-purple-50 rounded text-purple-700"
            >
              Atelier Craft
            </button>
          </div>

          <div className="pt-3 border-t border-purple-100 flex items-center justify-between text-xs">
            <span className="text-zinc-500 font-medium">Select Currency:</span>
            <div className="flex gap-2 font-semibold">
              {(['USD', 'EUR', 'GBP'] as const).map(code => (
                <button
                  key={code}
                  onClick={() => setCurrencyCode(code)}
                  className={`px-2 py-1 rounded text-xs ${currency.code === code ? 'bg-purple-800 text-white' : 'bg-zinc-100 text-zinc-700'}`}
                >
                  {code}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
