import React, { useState } from 'react';
import { ArrowRight, Check, Sparkles } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const Footer: React.FC = () => {
  const { setCategory, setIsLookbookOpen, setIsSizeGuideOpen } = useStore();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setSubscribed(true);
    setNewsletterEmail('');
    setTimeout(() => setSubscribed(false), 5000);
  };

  const handleNav = (cat: any) => {
    setCategory(cat);
    const el = document.getElementById('catalog-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#FAF9FC] border-t border-purple-200 text-zinc-800">
      
      {/* Newsletter VIP Club Bar */}
      <div className="border-b border-purple-100 bg-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-purple-800">
            <Sparkles className="w-3.5 h-3.5 text-purple-700" />
            <span>The Violette Salon</span>
          </div>

          <h3 className="font-serif text-2xl sm:text-3xl text-zinc-950 font-normal">
            Private Capsule Invitations & Editorial Dispatches
          </h3>

          <p className="text-xs sm:text-sm text-zinc-500 max-w-lg mx-auto font-light leading-relaxed">
            Receive private preview access to limited artisanal production runs and private salon appointments before public release.
          </p>

          {subscribed ? (
            <div className="p-4 bg-purple-50 border border-purple-200 text-xs font-semibold text-purple-950 max-w-md mx-auto flex items-center justify-center gap-2">
              <Check className="w-4 h-4 text-purple-700" />
              <span>You have been registered for private preview access.</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex max-w-md mx-auto gap-2 pt-2">
              <input
                type="email"
                required
                placeholder="Enter your email address..."
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="flex-1 px-4 py-3 text-xs border border-purple-200 focus:outline-none focus:border-purple-800 bg-white"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-purple-900 hover:bg-purple-950 text-white text-xs font-semibold uppercase tracking-wider transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                <span>Join</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Main Footer Directory */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <span className="font-serif text-2xl tracking-[0.2em] uppercase font-bold text-zinc-950">
              Atelier Violette
            </span>
            <p className="text-xs text-zinc-500 leading-relaxed max-w-sm font-light">
              Haute couture and ready-to-wear tailored from Biella double-faced virgin wool and Como silk. Produced in limited numbered batches in Northern Italy.
            </p>
            <div className="pt-2 text-xs text-purple-900 font-medium space-y-1">
              <div>Salons: Paris · Milan · New York · London</div>
              <div>Bespoke Inquiries: concierge@atelier-violette.com</div>
            </div>
          </div>

          {/* Navigation Collections */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-purple-950">
              Collections
            </h4>
            <ul className="space-y-2 text-xs text-zinc-600">
              <li>
                <button onClick={() => handleNav('All')} className="hover:text-purple-800 transition-colors">
                  New Arrivals
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('Outerwear')} className="hover:text-purple-800 transition-colors">
                  Cashmere Coats
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('Dresses & Gowns')} className="hover:text-purple-800 transition-colors">
                  Mulberry Silk Gowns
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('Tailoring')} className="hover:text-purple-800 transition-colors">
                  Italian Tailoring
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('Knitwear')} className="hover:text-purple-800 transition-colors">
                  Mongolian Knitwear
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('Accessories')} className="hover:text-purple-800 transition-colors">
                  Leather Goods & Scarves
                </button>
              </li>
            </ul>
          </div>

          {/* Client Concierge */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-purple-950">
              Client Concierge
            </h4>
            <ul className="space-y-2 text-xs text-zinc-600">
              <li>
                <button onClick={() => setIsSizeGuideOpen(true)} className="hover:text-purple-800 transition-colors">
                  Atelier Size Guide
                </button>
              </li>
              <li>
                <button onClick={() => setIsLookbookOpen(true)} className="hover:text-purple-800 transition-colors">
                  Savoir-Faire & Craft
                </button>
              </li>
              <li>
                <span className="text-zinc-600">Complimentary Global Courier</span>
              </li>
              <li>
                <span className="text-zinc-600">30-Day Atelier Returns</span>
              </li>
              <li>
                <span className="text-zinc-600">Garment Restoration Service</span>
              </li>
            </ul>
          </div>

          {/* Boutiques */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-purple-950">
              Flagship Salons
            </h4>
            <div className="space-y-2 text-xs text-zinc-500">
              <div>
                <strong className="text-zinc-800 block">Paris</strong>
                <span>450 Avenue Montaigne, 75008</span>
              </div>
              <div>
                <strong className="text-zinc-800 block">Milano</strong>
                <span>Via Montenapoleone 18, 20121</span>
              </div>
              <div>
                <strong className="text-zinc-800 block">New York</strong>
                <span>740 Madison Avenue, NY 10065</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright & legal */}
        <div className="mt-12 pt-8 border-t border-purple-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <div>
            © {new Date().getFullYear()} Atelier Violette S.r.l. All rights reserved.
          </div>
          <div className="flex gap-6">
            <span className="hover:text-purple-900 cursor-pointer">Privacy Charter</span>
            <span className="hover:text-purple-900 cursor-pointer">Terms of Service</span>
            <span className="hover:text-purple-900 cursor-pointer">Code of Ethics</span>
            <span className="hover:text-purple-900 cursor-pointer">Accessibility</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
