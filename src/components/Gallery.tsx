import React, { useState } from 'react';
import { Heart, Maximize2, X, Sparkles } from 'lucide-react';
import { GalleryItem } from '../types';
import { GALLERY_ITEMS } from '../data/products';

interface GalleryProps {
  onCustomClick: () => void;
}

export const Gallery: React.FC<GalleryProps> = ({ onCustomClick }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [items, setItems] = useState<GalleryItem[]>(GALLERY_ITEMS);
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);

  const categories = ['All', 'Bouquets', 'Keychains', 'Lamps', 'Studio', 'Special'];

  const filteredItems =
    activeCategory === 'All'
      ? items
      : items.filter((i) => i.category === activeCategory);

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, likes: item.likes + 1 } : item
      )
    );
  };

  return (
    <section id="gallery" className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
        <div className="text-xs font-semibold uppercase tracking-wider text-[#A4604E]">
          Studio Showcase
        </div>
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#2C2420]">
          Gallery of Handcrafted Creations
        </h2>
        <p className="text-sm sm:text-base text-[#6B5A52]">
          A visual glimpse into our completed commissions, seasonal arrangements, and studio worktables.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center justify-center gap-1.5 overflow-x-auto pb-4 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
              activeCategory === cat
                ? 'bg-[#2C2420] text-white shadow-2xs'
                : 'bg-white text-[#685850] hover:bg-[#F3EBE4] border border-[#E8DFD8]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setActiveItem(item)}
            className="group relative rounded-2xl overflow-hidden bg-white border border-[#E8DFD8] shadow-2xs hover:shadow-md transition-all duration-300 cursor-pointer"
          >
            <div className="aspect-4/3 overflow-hidden bg-[#F5EFEB]">
              <img
                src={item.image}
                alt={item.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
              />
            </div>

            {/* Hover overlay with details */}
            <div className="p-4 bg-white flex items-center justify-between border-t border-[#F0E8E1]">
              <div>
                <span className="text-[11px] font-semibold text-[#8E7E76] uppercase tracking-wider block">
                  {item.category}
                </span>
                <h3 className="text-sm font-serif font-bold text-[#2C2420] group-hover:text-[#D97C65] transition-colors">
                  {item.title}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => handleLike(item.id, e)}
                  className="flex items-center gap-1 text-xs text-[#7A6C64] hover:text-[#D97C65] p-1.5 rounded-md hover:bg-[#FAF4EF] transition-colors"
                  aria-label="Like creation"
                >
                  <Heart className="w-3.5 h-3.5 fill-current text-[#D97C65]" />
                  <span className="tabular-nums text-[11px]">{item.likes}</span>
                </button>
                <div className="p-1.5 text-[#7A6C64] group-hover:text-[#2C2420]">
                  <Maximize2 className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {activeItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in"
          onClick={() => setActiveItem(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border border-[#E8DFD8] relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveItem(null)}
              className="absolute top-3 right-3 z-10 p-2 bg-white/80 hover:bg-white text-[#2C2420] rounded-full shadow-xs"
              aria-label="Close image preview"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="aspect-16/10 bg-[#F5EFEB]">
              <img
                src={activeItem.image}
                alt={activeItem.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-6 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-[#D97C65] uppercase tracking-wider">
                    {activeItem.category}
                  </span>
                  <h3 className="text-xl font-serif font-bold text-[#2C2420]">
                    {activeItem.title}
                  </h3>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-[#685850]">
                  <Heart className="w-4 h-4 fill-current text-[#D97C65]" />
                  <span className="tabular-nums font-semibold">{activeItem.likes} likes</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#685850] leading-relaxed">
                {activeItem.description}
              </p>

              <div className="pt-3 border-t border-[#EAE1D9] flex items-center justify-between">
                <span className="text-xs text-[#8E7E76]">
                  Interested in a custom variation?
                </span>
                <button
                  onClick={() => {
                    setActiveItem(null);
                    onCustomClick();
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#D97C65] hover:bg-[#C66B54] rounded-lg shadow-2xs"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Request Similar Order</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
