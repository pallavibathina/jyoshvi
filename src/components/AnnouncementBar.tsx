import React, { useState } from 'react';
import { X, Sparkles, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const AnnouncementBar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const { freeShippingThreshold, formatPrice, setIsLookbookOpen } = useStore();

  if (!isVisible) return null;

  return (
    <div className="bg-[#210F35] text-white text-xs tracking-wider border-b border-purple-950/40 px-4 py-2 relative z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="hidden sm:flex items-center gap-2 text-purple-200/80 font-normal">
          <Sparkles className="w-3.5 h-3.5 text-purple-300" />
          <span>Autumn / Winter 2026 Atelier Capsule</span>
        </div>

        <div className="flex-1 text-center font-medium">
          <span>Complimentary Express Courier on orders over {formatPrice(freeShippingThreshold)}</span>
          <span className="mx-2 text-purple-400/60 hidden md:inline">·</span>
          <button 
            onClick={() => setIsLookbookOpen(true)}
            className="hidden md:inline-flex items-center gap-1 text-purple-200 hover:text-white underline underline-offset-2 transition-colors cursor-pointer"
          >
            Read The Atelier Story
            <ArrowRight className="w-3 h-3 inline" />
          </button>
        </div>

        <button
          onClick={() => setIsVisible(false)}
          className="text-purple-300/80 hover:text-white transition-colors p-1 -mr-1"
          aria-label="Dismiss banner"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
