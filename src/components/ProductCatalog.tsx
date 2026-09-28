import React, { useState } from 'react';
import { SlidersHorizontal, RotateCcw, Grid3X3, LayoutGrid } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from './ProductCard';
import { CATEGORIES, PRODUCTS } from '../data/products';
import { Category, Gender } from '../types/store';

export const ProductCatalog: React.FC = () => {
  const { 
    filteredProducts, 
    filters, 
    setCategory, 
    setGender, 
    setSizeFilter, 
    setSortBy, 
    resetFilters 
  } = useStore();

  const [gridCols, setGridCols] = useState<3 | 4>(3);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const allSizes = ['All', 'XS', 'S', 'M', 'L', 'XL'];
  const genders: Gender[] = ['All', 'Women', 'Men', 'Unisex'];

  const hasActiveFilters = 
    filters.category !== 'All' || 
    filters.gender !== 'All' || 
    filters.size !== 'All' || 
    filters.searchQuery !== '';

  return (
    <section id="catalog-section" className="py-14 bg-[#FAF9FC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 border-b border-purple-100 gap-4">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-purple-800">
              The Collection
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#0F0E17] font-normal mt-1">
              Curated Ready-to-Wear
            </h2>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <span className="text-zinc-500 font-medium">
              Showing <span className="font-semibold text-purple-950 tabular-nums">{filteredProducts.length}</span> of {PRODUCTS.length} creations
            </span>

            {/* Grid density toggle */}
            <div className="hidden lg:flex items-center border border-purple-200 bg-white p-0.5 rounded">
              <button
                onClick={() => setGridCols(3)}
                className={`p-1.5 rounded transition-colors ${gridCols === 3 ? 'bg-purple-900 text-white' : 'text-zinc-500 hover:text-zinc-900'}`}
                aria-label="3 Column Grid"
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setGridCols(4)}
                className={`p-1.5 rounded transition-colors ${gridCols === 4 ? 'bg-purple-900 text-white' : 'text-zinc-500 hover:text-zinc-900'}`}
                aria-label="4 Column Grid"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Filter Navigation Bar (Interactive segmented controls as per guidelines) */}
        <div className="pt-6 pb-6 flex flex-wrap items-center justify-between gap-4">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0 scrollbar-none w-full lg:w-auto">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 text-xs uppercase tracking-wider font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  filters.category === cat
                    ? 'bg-purple-900 text-white shadow-sm'
                    : 'bg-white hover:bg-purple-50 text-zinc-700 border border-purple-100/80'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Secondary Controls: Filter Toggle & Sort Dropdown */}
          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
            <button
              onClick={() => setFiltersOpen(!filtersOpen)}
              className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold tracking-wider uppercase border transition-colors cursor-pointer ${
                filtersOpen || hasActiveFilters
                  ? 'bg-purple-50 border-purple-700 text-purple-900'
                  : 'bg-white border-purple-200 text-zinc-700 hover:border-purple-400'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Refine</span>
              {hasActiveFilters && (
                <span className="w-2 h-2 rounded-full bg-purple-700" />
              )}
            </button>

            {/* Sort Selector */}
            <div className="flex items-center gap-2 bg-white border border-purple-200 px-3 py-1.5">
              <span className="text-[11px] font-semibold tracking-wider uppercase text-zinc-400">
                Sort:
              </span>
              <select
                value={filters.sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent text-xs font-semibold text-zinc-800 focus:outline-none cursor-pointer"
              >
                <option value="featured">Atelier Curated</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">New Arrivals</option>
              </select>
            </div>
          </div>
        </div>

        {/* Expandable Refinement Panel */}
        {filtersOpen && (
          <div className="mb-8 p-5 bg-white border border-purple-200/80 shadow-sm animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              
              {/* Gender / Silhouette Filter */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-purple-950 mb-2">
                  Silhouette / Gender
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {genders.map((g) => (
                    <button
                      key={g}
                      onClick={() => setGender(g)}
                      className={`px-3 py-1.5 text-xs font-medium border transition-colors ${
                        filters.gender === g
                          ? 'bg-purple-900 text-white border-purple-900'
                          : 'bg-zinc-50 border-zinc-200 text-zinc-700 hover:bg-purple-50'
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Filter */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-purple-950 mb-2">
                  Size Availability
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {allSizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSizeFilter(s)}
                      className={`px-3 py-1.5 text-xs font-medium border transition-colors ${
                        filters.size === s
                          ? 'bg-purple-900 text-white border-purple-900'
                          : 'bg-zinc-50 border-zinc-200 text-zinc-700 hover:bg-purple-50'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Reset action */}
              <div className="flex items-end justify-start sm:justify-end">
                {hasActiveFilters && (
                  <button
                    onClick={resetFilters}
                    className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-purple-800 hover:text-purple-950 hover:bg-purple-50 border border-purple-200 transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset All Filters</span>
                  </button>
                )}
              </div>

            </div>
          </div>
        )}

        {/* Product Cards Grid */}
        {filteredProducts.length > 0 ? (
          <div
            className={`grid gap-6 sm:gap-8 ${
              gridCols === 4 
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4' 
                : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
            }`}
          >
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          /* Empty Search / Filter Fallback */
          <div className="py-20 text-center bg-white border border-dashed border-purple-200 p-8 max-w-lg mx-auto">
            <p className="font-serif text-2xl text-zinc-800 font-normal">
              No matching pieces found
            </p>
            <p className="text-xs text-zinc-500 mt-2 mb-6">
              Try adjusting your selected filters or search terms to explore our ready-to-wear archive.
            </p>
            <button
              onClick={resetFilters}
              className="px-6 py-2.5 bg-purple-900 text-white text-xs font-semibold tracking-wider uppercase hover:bg-purple-950 transition-colors inline-flex items-center gap-2"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
