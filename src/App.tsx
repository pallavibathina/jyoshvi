import React from 'react';
import { StoreProvider } from './context/StoreContext';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductCatalog } from './components/ProductCatalog';
import { AtelierSection } from './components/AtelierSection';
import { Footer } from './components/Footer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { SearchModal } from './components/SearchModal';
import { SizeGuideModal } from './components/SizeGuideModal';
import { LookbookModal } from './components/LookbookModal';
import { CheckoutModal } from './components/CheckoutModal';
import { ToastContainer } from './components/ToastContainer';

export default function App() {
  return (
    <StoreProvider>
      <div className="min-h-screen flex flex-col bg-[#FAF9FC] text-[#0F0E17]">
        {/* Top Promotional Bar */}
        <AnnouncementBar />

        {/* Global Navigation Bar */}
        <Navbar />

        {/* Main Content */}
        <main className="flex-1">
          {/* Campaign Focal Hero */}
          <Hero />

          {/* Product Catalog & Refinement Explorer */}
          <ProductCatalog />

          {/* Atelier Craftsmanship & Editorial Acclaim */}
          <AtelierSection />
        </main>

        {/* Luxury Fashion Footer */}
        <Footer />

        {/* Modals & Slide-over Drawers */}
        <ProductDetailModal />
        <CartDrawer />
        <WishlistDrawer />
        <SearchModal />
        <SizeGuideModal />
        <LookbookModal />
        <CheckoutModal />
        <ToastContainer />
      </div>
    </StoreProvider>
  );
}
