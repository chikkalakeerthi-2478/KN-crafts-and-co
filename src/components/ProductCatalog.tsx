import React, { useState, useMemo } from 'react';
import { Search, ShoppingBag, Eye, Star, Filter, Check, Heart } from 'lucide-react';
import { Product, ProductCategory } from '../types';

interface ProductCatalogProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  initialCategory?: ProductCategory;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const CATEGORIES: ProductCategory[] = [
  'All',
  'Keychains',
  'Bouquets',
  'Lamps',
  'Flowers',
  'Gift Sets',
  'Custom Orders',
];

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  products,
  onSelectProduct,
  onAddToCart,
  initialCategory = 'All',
  searchQuery,
  onSearchChange,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>(initialCategory);
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');
  const [addedNotice, setAddedNotice] = useState<string | null>(null);

  const filteredProducts = useMemo(() => {
    return products
      .filter((item) => {
        const matchesCategory =
          selectedCategory === 'All' ? true : item.category === selectedCategory;
        const matchesSearch =
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.occasionTags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      });
  }, [products, selectedCategory, searchQuery, sortBy]);

  const handleQuickAdd = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product);
    setAddedNotice(product.id);
    setTimeout(() => setAddedNotice(null), 1800);
  };

  return (
    <section id="products" className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
        <div className="text-xs font-semibold uppercase tracking-wider text-[#A4604E]">
          Artisan Collection
        </div>
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#2C2420]">
          Handcrafted Pipe-Cleaner Creations
        </h2>
        <p className="text-sm sm:text-base text-[#6B5A52]">
          Every piece is sculpted with premium velvet chenille wire, designed to bring lasting warmth,
          cozy charm, and joyful color to any space.
        </p>
      </div>

      {/* Controls Bar: Categories & Search/Sort */}
      <div className="space-y-4 mb-10">
        {/* Interactive Segmented Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none justify-start sm:justify-center">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#2C2420] text-white shadow-xs'
                  : 'bg-white text-[#685850] hover:bg-[#F3EBE4] hover:text-[#2C2420] border border-[#E8DFD8]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search & Sort Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-[#EAE1D9]">
          {/* Search Input */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#8E7E76]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search bouquets, keychains, lamps..."
              className="w-full pl-9 pr-4 py-2 text-xs bg-white border border-[#DDD3CB] rounded-lg text-[#2C2420] placeholder-[#9E9088] focus:outline-none focus:ring-1 focus:ring-[#D97C65] focus:border-[#D97C65]"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-[#8E7E76] hover:text-[#2C2420]"
              >
                Clear
              </button>
            )}
          </div>

          {/* Results count & Sort */}
          <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4 text-xs text-[#685850]">
            <span className="tabular-nums font-medium">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'creation' : 'creations'}
            </span>

            <div className="flex items-center gap-2">
              <label htmlFor="sort-select" className="text-[#8E7E76] whitespace-nowrap">
                Sort by:
              </label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-white border border-[#DDD3CB] rounded-md px-2.5 py-1.5 text-xs text-[#2C2420] focus:outline-none focus:ring-1 focus:ring-[#D97C65]"
              >
                <option value="featured">Featured Picks</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="py-16 text-center bg-white rounded-2xl border border-[#E9DFD8] p-8">
          <p className="text-base text-[#6B5A52] font-medium">
            No creations found matching "{searchQuery}".
          </p>
          <p className="mt-1 text-xs text-[#8E7E76]">
            Try a different keyword or browse our full collection.
          </p>
          <button
            onClick={() => {
              onSearchChange('');
              setSelectedCategory('All');
            }}
            className="mt-4 px-4 py-2 text-xs font-semibold text-white bg-[#D97C65] rounded-md hover:bg-[#C66B54]"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProducts.map((product) => {
            const isAdded = addedNotice === product.id;

            return (
              <div
                key={product.id}
                onClick={() => onSelectProduct(product)}
                className="group bg-white rounded-2xl border border-[#E8DFD8] overflow-hidden hover:shadow-md transition-all duration-300 hover:-translate-y-1 flex flex-col cursor-pointer"
              >
                {/* Product Image Area */}
                <div className="relative aspect-4/3 overflow-hidden bg-[#F5EFEB]">
                  <img
                    src={product.image}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
                  />

                  {/* Fallback pattern container if image ever fails */}
                  <div className="absolute inset-0 -z-10 flex items-center justify-center bg-radial from-[#F5EFEB] to-[#E9DFD8]">
                    <span className="text-xs text-[#8E7E76] font-medium">Twist & Bloom Studio</span>
                  </div>

                  {/* Top Subtle Label (Anti-badge spam, single text line) */}
                  <div className="absolute top-3 left-3 text-[11px] font-semibold text-[#2C2420] bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-md border border-[#E5DDD5]">
                    {product.category}
                  </div>

                  {/* Quick Action Overlay button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectProduct(product);
                    }}
                    className="absolute bottom-3 right-3 bg-white/95 text-[#2C2420] hover:bg-white p-2 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Quick preview"
                    aria-label={`Quick preview ${product.name}`}
                  >
                    <Eye className="w-4 h-4 text-[#685850]" />
                  </button>
                </div>

                {/* Card Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    {/* Unboxed Metadata: Rating & Craft Time */}
                    <div className="flex items-center gap-2 text-xs text-[#7A6C64] mb-1.5">
                      <span className="flex items-center gap-1 font-semibold text-[#D49339]">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span className="tabular-nums">{product.rating.toFixed(1)}</span>
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="tabular-nums">({product.reviewsCount})</span>
                      <span aria-hidden="true">·</span>
                      <span>{product.craftTimeHours}h craft</span>
                    </div>

                    <h3 className="text-base font-serif font-bold text-[#2C2420] group-hover:text-[#D97C65] transition-colors line-clamp-1">
                      {product.name}
                    </h3>

                    <p className="mt-1.5 text-xs text-[#6B5A52] line-clamp-2 leading-relaxed">
                      {product.shortDescription}
                    </p>
                  </div>

                  {/* Price & Action Row */}
                  <div className="pt-3 border-t border-[#F0E8E1] flex items-center justify-between gap-3">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-lg font-bold text-[#2C2420] tabular-nums">
                        ${product.price}
                      </span>
                      {product.originalPrice && (
                        <span className="text-xs text-[#9E9088] line-through tabular-nums">
                          ${product.originalPrice}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectProduct(product);
                        }}
                        className="px-2.5 py-1.5 text-xs font-medium text-[#685850] hover:text-[#2C2420] hover:bg-[#F5EFEB] rounded-md transition-colors"
                      >
                        Details
                      </button>

                      <button
                        onClick={(e) => handleQuickAdd(product, e)}
                        className={`inline-flex items-center gap-1 px-3.5 py-1.5 text-xs font-semibold rounded-md transition-all whitespace-nowrap shadow-2xs ${
                          isAdded
                            ? 'bg-[#487352] text-white'
                            : 'bg-[#D97C65] hover:bg-[#C66B54] text-white'
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Added!</span>
                          </>
                        ) : (
                          <>
                            <ShoppingBag className="w-3.5 h-3.5" />
                            <span>Add</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};
