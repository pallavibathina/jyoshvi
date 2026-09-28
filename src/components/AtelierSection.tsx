import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import lookbookCraftImage from '../assets/images/lookbook_atelier_tailoring_1790582034691.jpg';

export const AtelierSection: React.FC = () => {
  const { setIsLookbookOpen } = useStore();

  const pressQuotes = [
    {
      quote: "Atelier Violette proves that architectural restraint and the imperial chromatic violet hue can redefine contemporary ready-to-wear.",
      author: "Vogue Paris",
      role: "Autumn Fashion Review",
      date: "September 2026",
    },
    {
      quote: "The drape of the Como silk slip and the double-faced Biella coat are unmatched in contemporary luxury tailoring.",
      author: "The Business of Fashion",
      role: "Atelier Spotlight",
      date: "August 2026",
    },
    {
      quote: "Uncompromising natural fiber purity with a silhouette that commands the room without shouting.",
      author: "Harper's Bazaar",
      role: "Designers of the Year",
      date: "July 2026",
    },
  ];

  return (
    <section className="py-20 bg-white border-t border-purple-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Split Editorial Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left: Artisanal Photography */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/3] bg-zinc-100 border border-purple-200 shadow-xl overflow-hidden group">
              <img
                src={lookbookCraftImage}
                alt="Artisanal tailoring workshop at Atelier Violette"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white text-xs">
                <span className="uppercase tracking-[0.2em] font-semibold text-purple-300">
                  Biella & Como Artisanal Milled
                </span>
                <p className="font-serif text-lg text-white font-normal mt-0.5">
                  Natural horn buttons, unlined hand-split seams, and 45-degree true bias cutting.
                </p>
              </div>
            </div>
          </div>

          {/* Right: Atelier Manifesto */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-purple-800">
              <span className="w-8 h-[1px] bg-purple-700 inline-block" />
              <span>The Atelier Standard</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl text-[#0F0E17] font-normal leading-tight">
              An Architectural Approach to Modern Dressing
            </h2>

            <p className="text-zinc-600 text-sm sm:text-base leading-relaxed font-light">
              We reject fleeting micro-trends. Instead, every piece in the Atelier Violette archive is conceived as a sculpture: engineered around structural volume, precise drape, and our signature palette of deep royal amethysts, soft lilac mist, and pristine optic whites.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="border-l-2 border-purple-800 pl-4 py-1">
                <div className="font-serif text-2xl font-bold text-purple-950 tabular-nums">
                  100%
                </div>
                <div className="text-xs text-zinc-500 uppercase tracking-wider font-semibold mt-0.5">
                  Zero Synthetic Fibers
                </div>
              </div>
              <div className="border-l-2 border-purple-800 pl-4 py-1">
                <div className="font-serif text-2xl font-bold text-purple-950 tabular-nums">
                  620<span className="text-sm font-normal">gsm</span>
                </div>
                <div className="text-xs text-zinc-500 uppercase tracking-wider font-semibold mt-0.5">
                  Double-Faced Wool
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setIsLookbookOpen(true)}
                className="px-6 py-3.5 bg-purple-900 hover:bg-purple-950 text-white text-xs font-semibold tracking-widest uppercase transition-colors inline-flex items-center gap-2 cursor-pointer shadow-md"
              >
                <span>Read Full Craft Dossier</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

        {/* Editorial Press Quotes Section (Adjacency to Proof) */}
        <div className="mt-20 pt-16 border-t border-purple-100">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-purple-800">
              Critical Acclaim
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-zinc-950 font-normal mt-1">
              Editorial Perspectives
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pressQuotes.map((item, idx) => (
              <div 
                key={idx} 
                className="p-6 bg-[#FAF9FC] border border-purple-100/80 flex flex-col justify-between"
              >
                <p className="font-serif text-base text-zinc-800 italic leading-relaxed">
                  "{item.quote}"
                </p>
                <div className="mt-6 pt-4 border-t border-purple-100 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-semibold text-purple-950">{item.author}</div>
                    <div className="text-[11px] text-zinc-500">{item.role}</div>
                  </div>
                  <span className="text-[11px] text-zinc-400 font-mono">{item.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
