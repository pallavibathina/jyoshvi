import React from 'react';
import { ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import heroCoatImage from '../assets/images/product_tailored_purple_coat_1790581989698.jpg';

export const Hero: React.FC = () => {
  const { setActiveProductModal, products, formatPrice, setIsLookbookOpen } = useStore();

  const featuredProduct = products.find(p => p.id === 'coat-amethyst-tailored') || products[0];

  const scrollToCatalog = () => {
    const el = document.getElementById('catalog-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden bg-white border-b border-purple-100">
      {/* Subtle architectural ambient gradient accent */}
      <div 
        className="absolute top-0 right-0 -mr-40 -mt-40 w-[600px] h-[600px] rounded-full bg-purple-100/60 blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div 
        className="absolute bottom-0 left-0 -ml-40 -mb-40 w-[500px] h-[500px] rounded-full bg-purple-50/70 blur-3xl pointer-events-none" 
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Haute Couture Editorial Copy */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-purple-800">
              <span className="w-8 h-[1px] bg-purple-700 inline-block" />
              <span>Autumn / Winter 2026 Ready-To-Wear</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#0F0E17] leading-[1.08] tracking-tight font-normal">
              A Study in Tailored <br />
              <span className="italic font-medium text-purple-900">Amethyst Wool</span> & Pure Silk
            </h1>

            <p className="text-zinc-600 text-base sm:text-lg leading-relaxed max-w-xl font-light">
              Architectural silhouettes engineered with uncompromising precision. Milled in Biella and hand-cut in small artisanal batches, our collection bridges deep chromatic purple tones with luminous white silk.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                onClick={scrollToCatalog}
                className="px-8 py-4 bg-purple-900 hover:bg-purple-950 text-white text-xs font-semibold tracking-widest uppercase transition-all duration-200 flex items-center justify-center gap-2 group cursor-pointer shadow-md hover:shadow-lg"
              >
                <span>Explore The Collection</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => setIsLookbookOpen(true)}
                className="px-8 py-4 bg-white border border-purple-200 hover:border-purple-800 hover:bg-purple-50 text-purple-900 text-xs font-semibold tracking-widest uppercase transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-purple-700" />
                <span>Atelier Craft Dossier</span>
              </button>
            </div>

            {/* Micro Trust Points (Unboxed metadata with separators) */}
            <div className="pt-6 border-t border-purple-100 flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-zinc-500 font-medium">
              <div className="flex items-center gap-1.5 text-zinc-700">
                <ShieldCheck className="w-4 h-4 text-purple-800" />
                <span>100% Traceable Italian Wool</span>
              </div>
              <span className="text-purple-300">·</span>
              <span>Zero-Waste Hand Bias Cut</span>
              <span className="text-purple-300">·</span>
              <span>Complimentary Worldwide Express</span>
            </div>
          </div>

          {/* Right Column: Hero Fashion Spotlight */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none group">
              {/* Decorative subtle border frame */}
              <div className="absolute -inset-3 bg-purple-100/50 rounded-2xl transform rotate-1 group-hover:rotate-0 transition-transform duration-500 -z-10" />

              <div className="relative bg-[#FBFBFE] border border-purple-100 rounded-xl overflow-hidden shadow-xl">
                {/* Hero Product Image */}
                <div className="relative aspect-[3/4] overflow-hidden bg-zinc-100">
                  <img
                    src={heroCoatImage}
                    alt="The Amethyst Double-Breasted Cashmere Coat"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                  
                  {/* Floating Luxury Detail Badge */}
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1.5 text-[11px] font-semibold tracking-wider uppercase text-purple-950 border border-purple-200">
                    Atelier Exclusive · No. 01
                  </div>

                  {/* Overlaid Product Caption */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <p className="text-[11px] font-medium tracking-widest uppercase text-purple-200">
                      Signature Outerwear
                    </p>
                    <h2 className="font-serif text-xl sm:text-2xl font-normal leading-tight text-white mt-1">
                      {featuredProduct.title}
                    </h2>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="font-sans font-semibold text-lg text-white tabular-nums">
                        {formatPrice(featuredProduct.price)}
                      </div>
                      <button
                        onClick={() => setActiveProductModal(featuredProduct)}
                        className="px-4 py-2 bg-white text-purple-950 text-xs font-semibold tracking-wider uppercase hover:bg-purple-100 transition-colors cursor-pointer"
                      >
                        Quick View
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
