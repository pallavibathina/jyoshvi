import React from 'react';
import { X, Sparkles, ShieldCheck, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ATELIER_STORIES } from '../data/products';
import lookbookImage from '../assets/images/lookbook_atelier_tailoring_1790582034691.jpg';

export const LookbookModal: React.FC = () => {
  const { isLookbookOpen, setIsLookbookOpen } = useStore();

  if (!isLookbookOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={() => setIsLookbookOpen(false)} 
      />

      <div className="min-h-full flex items-center justify-center p-3 sm:p-6 lg:p-8">
        <div 
          className="relative bg-white w-full max-w-4xl shadow-2xl border border-purple-200 overflow-hidden animate-in fade-in duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close */}
          <button
            onClick={() => setIsLookbookOpen(false)}
            className="absolute top-4 right-4 z-20 p-2 bg-white/90 hover:bg-white text-zinc-600 hover:text-zinc-950 rounded-full transition-colors shadow-sm"
            aria-label="Close lookbook"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Banner Hero Image */}
          <div className="relative aspect-[16/9] sm:aspect-[21/9] bg-zinc-900 overflow-hidden">
            <img 
              src={lookbookImage} 
              alt="Atelier Violette artisanal tailoring" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <span className="text-xs uppercase tracking-[0.25em] font-semibold text-purple-300">
                L’Atelier et Le Savoir-Faire
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-white font-normal mt-1">
                The Anatomy of Violette Craftsmanship
              </h2>
            </div>
          </div>

          {/* Editorial Content */}
          <div className="p-6 sm:p-10 space-y-8">
            <div className="max-w-2xl text-zinc-600 leading-relaxed font-light text-base">
              Atelier Violette was established as an antidote to disposable trends. Every garment is an architectural composition realized in double-faced natural fibers, zero-synthetic interlinings, and bespoke purple natural vat dyes developed across Northern Italy.
            </div>

            {/* 3 Narrative Pillars */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-purple-100">
              {ATELIER_STORIES.map((story) => (
                <div key={story.id} className="space-y-2 bg-[#FAF9FC] p-5 border border-purple-100/70">
                  <div className="text-[11px] font-semibold tracking-widest uppercase text-purple-800">
                    {story.subtitle}
                  </div>
                  <h3 className="font-serif text-lg font-medium text-zinc-950 leading-snug">
                    {story.title}
                  </h3>
                  <p className="text-xs text-zinc-600 leading-relaxed font-light">
                    {story.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Certifications and provenance */}
            <div className="p-4 bg-purple-50/60 border border-purple-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-2 text-purple-950 font-medium">
                <ShieldCheck className="w-4 h-4 text-purple-800" />
                <span>Certified GOTS Mongolian Cashmere · GRS Recycled Linings · Zero Plastic Packaging</span>
              </div>
              <button
                onClick={() => setIsLookbookOpen(false)}
                className="px-6 py-2 bg-purple-900 text-white font-semibold uppercase tracking-wider hover:bg-purple-950 transition-colors self-end sm:self-auto cursor-pointer"
              >
                Explore Collection
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
