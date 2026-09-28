import React, { useState, useEffect } from 'react';
import { X, Star, ShoppingBag, Heart, ShieldCheck, Check, MessageCircle, Ruler, Sparkles, Feather } from 'lucide-react';
import { Product } from '../types';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number, color?: string) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  if (!product) return null;

  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || '');
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    setSelectedColor(product.colors[0]?.name || '');
    setQuantity(1);
    setIsAdded(false);
  }, [product]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleAdd = () => {
    onAddToCart(product, quantity, selectedColor);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      onClose();
    }, 900);
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Twist & Bloom Studio! I want to order the "${product.name}" ($${product.price}) in "${selectedColor}" color (Qty: ${quantity}). Please let me know how to proceed!`
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      {/* Modal Dialog */}
      <div
        className="bg-white rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl border border-[#E8DFD8] relative max-h-[90vh] flex flex-col md:flex-row"
        role="dialog"
        aria-modal="true"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white/80 hover:bg-white text-[#5F524A] hover:text-[#2C2420] rounded-full shadow-xs transition-colors"
          aria-label="Close details"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left: Product Image */}
        <div className="md:w-1/2 relative bg-[#F7F2EC] flex items-center justify-center min-h-[260px] md:min-h-full">
          <img
            src={product.image}
            alt={product.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover max-h-[380px] md:max-h-full"
          />
          <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-md text-[11px] font-semibold text-[#2C2420] border border-[#E3D9D0]">
            {product.category} · {product.craftTimeHours}h Handcraft
          </div>
        </div>

        {/* Right: Product Details & Purchase Form */}
        <div className="md:w-1/2 p-6 overflow-y-auto space-y-5 flex-1">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#7A6C64] mb-1">
              <span className="flex items-center gap-1 font-semibold text-[#D49339]">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span className="tabular-nums">{product.rating.toFixed(1)}</span>
              </span>
              <span aria-hidden="true">·</span>
              <span className="tabular-nums">{product.reviewsCount} customer reviews</span>
              <span aria-hidden="true">·</span>
              <span className="text-[#366847] font-medium">100% Handmade</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#2C2420] leading-snug">
              {product.name}
            </h2>

            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-[#2C2420] tabular-nums">
                ${product.price}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-[#9E9088] line-through tabular-nums">
                  ${product.originalPrice}
                </span>
              )}
              <span className="text-xs text-[#366847] font-medium ml-1">
                Tax included · Free standard gift packaging
              </span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-[#6B5A52] leading-relaxed">
            {product.detailedDescription}
          </p>

          {/* Color Palette Selector */}
          {product.colors && product.colors.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-[#2C2420]">
                <span>Color Palette</span>
                <span className="text-[#7A6C64] font-normal">{selectedColor}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c.name)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
                      selectedColor === c.name
                        ? 'border-[#2C2420] bg-[#2C2420] text-white shadow-2xs'
                        : 'border-[#DDD3CB] bg-white text-[#5F524A] hover:bg-[#F8F3EE]'
                    }`}
                  >
                    <span
                      className="w-3 h-3 rounded-full border border-black/15 shrink-0"
                      style={{ backgroundColor: c.hex }}
                    />
                    <span>{c.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Specs & Dimensions */}
          <div className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#EAE0D8] space-y-2 text-xs text-[#5F524A]">
            <div className="flex items-center gap-2">
              <Ruler className="w-3.5 h-3.5 text-[#D97C65] shrink-0" />
              <span>
                <strong className="font-semibold text-[#2C2420]">Dimensions:</strong> {product.dimensions}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Feather className="w-3.5 h-3.5 text-[#5F856C] shrink-0" />
              <span>
                <strong className="font-semibold text-[#2C2420]">Materials:</strong> {product.materials.join(', ')}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#D49339] shrink-0" />
              <span>
                <strong className="font-semibold text-[#2C2420]">Care:</strong> Dust gently with soft brush; flexible wire stems can be gently repositioned.
              </span>
            </div>
          </div>

          {/* Quantity and Actions */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-[#DDD3CB] rounded-lg bg-white overflow-hidden">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-1.5 text-sm font-semibold text-[#5F524A] hover:bg-[#F3EBE4]"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="px-3 py-1.5 text-xs font-semibold text-[#2C2420] tabular-nums min-w-[28px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-3 py-1.5 text-sm font-semibold text-[#5F524A] hover:bg-[#F3EBE4]"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAdd}
                className={`flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-xs font-semibold transition-all shadow-xs ${
                  isAdded
                    ? 'bg-[#3A6B48] text-white'
                    : 'bg-[#D97C65] hover:bg-[#C66B54] text-white'
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Bag!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Bag · ${(product.price * quantity).toFixed(0)}</span>
                  </>
                )}
              </button>
            </div>

            {/* Direct WhatsApp Action */}
            <a
              href={`https://wa.me/?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-medium text-[#2E553B] bg-[#EBF3ED] hover:bg-[#DCECE0] border border-[#CFDFD3] transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-[#2E553B]" />
              <span>Direct Order via WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
