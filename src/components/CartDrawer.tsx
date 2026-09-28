import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, MessageCircle, ArrowRight, ShieldCheck, Check, Sparkles } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  onShopClick: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onShopClick,
}) => {
  const [giftNote, setGiftNote] = useState('');
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'checkout' | 'confirmed'>('cart');
  const [shippingInfo, setShippingInfo] = useState({
    fullName: '',
    address: '',
    city: '',
    phone: '',
  });

  if (!isOpen) return null;

  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const freeShippingThreshold = 50;
  const progressToFreeShipping = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  const formattedWhatsappCart = encodeURIComponent(
    `Hello Twist & Bloom Studio! I would like to place an order:\n\n` +
      items
        .map(
          (it, i) =>
            `${i + 1}. ${it.product.name} (Qty: ${it.quantity}${
              it.selectedColor ? `, Color: ${it.selectedColor}` : ''
            }) - $${it.product.price * it.quantity}`
        )
        .join('\n') +
      `\n\nSubtotal: $${subtotal}\n${giftNote ? `Gift Note: "${giftNote}"\n` : ''}` +
      `\nPlease share payment and delivery details!`
  );

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!shippingInfo.fullName || !shippingInfo.address || !shippingInfo.phone) return;
    setCheckoutStep('confirmed');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white border-l border-[#E8DFD8] shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-5 border-b border-[#EAE1D9] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#D97C65]" />
              <h2 className="text-base font-serif font-bold text-[#2C2420]">
                Your Shopping Bag
              </h2>
              <span className="text-xs text-[#7A6C64] tabular-nums">
                ({items.reduce((acc, i) => acc + i.quantity, 0)} items)
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 text-[#8E7E76] hover:text-[#2C2420] rounded-full hover:bg-[#FAF4EF]"
              aria-label="Close bag"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-5 space-y-5">
            {checkoutStep === 'confirmed' ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 bg-[#EDF4EE] text-[#487352] rounded-full flex items-center justify-center mx-auto">
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-[#2C2420]">
                  Order Placed Successfully!
                </h3>
                <p className="text-xs sm:text-sm text-[#685850]">
                  Thank you, <strong className="text-[#2C2420]">{shippingInfo.fullName}</strong>. Your handmade package is now queued in our studio workshop.
                </p>
                <div className="p-4 bg-[#FAF7F2] rounded-xl border border-[#E9DFD8] text-left text-xs space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-[#7A6C64]">Delivery To:</span>
                    <span className="font-semibold text-[#2C2420]">{shippingInfo.address}, {shippingInfo.city}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#7A6C64]">Total Amount:</span>
                    <span className="font-bold text-[#2C2420] tabular-nums">${subtotal}</span>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => {
                      onClearCart();
                      setCheckoutStep('cart');
                      onClose();
                    }}
                    className="w-full py-2.5 rounded-lg text-xs font-semibold text-white bg-[#D97C65] hover:bg-[#C66B54]"
                  >
                    Back to Studio Store
                  </button>
                </div>
              </div>
            ) : checkoutStep === 'checkout' ? (
              <form onSubmit={handleCheckoutSubmit} className="space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-[#EAE1D9]">
                  <span className="text-xs font-bold text-[#2C2420]">Shipping & Contact</span>
                  <button
                    type="button"
                    onClick={() => setCheckoutStep('cart')}
                    className="text-xs text-[#D97C65] hover:underline"
                  >
                    ← Back to Items
                  </button>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#5F524A] mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={shippingInfo.fullName}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, fullName: e.target.value })}
                    placeholder="Eleanor Vance"
                    className="w-full px-3 py-2 text-xs border border-[#DDD3CB] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#D97C65]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#5F524A] mb-1">Phone / WhatsApp Number *</label>
                  <input
                    type="tel"
                    required
                    value={shippingInfo.phone}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })}
                    placeholder="+1 (555) 019-2831"
                    className="w-full px-3 py-2 text-xs border border-[#DDD3CB] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#D97C65]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#5F524A] mb-1">Street Address *</label>
                  <input
                    type="text"
                    required
                    value={shippingInfo.address}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
                    placeholder="742 Evergreen Terrace"
                    className="w-full px-3 py-2 text-xs border border-[#DDD3CB] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#D97C65]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#5F524A] mb-1">City & Postal Code</label>
                  <input
                    type="text"
                    value={shippingInfo.city}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                    placeholder="Springfield, 97477"
                    className="w-full px-3 py-2 text-xs border border-[#DDD3CB] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#D97C65]"
                  />
                </div>

                <div className="p-3.5 bg-[#FAF7F2] rounded-xl border border-[#E9DFD8] text-xs text-[#5F524A]">
                  <div className="flex justify-between font-semibold text-[#2C2420]">
                    <span>Total Due (Payment on delivery or link):</span>
                    <span className="tabular-nums">${subtotal}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-lg text-xs font-semibold text-white bg-[#D97C65] hover:bg-[#C66B54] transition-colors shadow-xs"
                >
                  Complete Order (${subtotal})
                </button>
              </form>
            ) : items.length === 0 ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-14 h-14 bg-[#FAF0EC] text-[#D97C65] rounded-full flex items-center justify-center mx-auto">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <h3 className="text-base font-serif font-bold text-[#2C2420]">
                  Your bag is currently empty
                </h3>
                <p className="text-xs text-[#7A6C64] max-w-xs mx-auto">
                  Discover our handmade pipe-cleaner bouquets, whimsical keychains, and glowing floral lamps.
                </p>
                <button
                  onClick={() => {
                    onClose();
                    onShopClick();
                  }}
                  className="px-5 py-2.5 rounded-lg text-xs font-semibold text-white bg-[#D97C65] hover:bg-[#C66B54]"
                >
                  Browse Creations
                </button>
              </div>
            ) : (
              <>
                {/* Free Shipping Meter */}
                <div className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#E9DFD8] space-y-1.5">
                  <div className="flex items-center justify-between text-xs text-[#5F524A]">
                    <span className="font-medium">
                      {subtotal >= freeShippingThreshold ? (
                        <span className="text-[#366847] font-semibold flex items-center gap-1">
                          <Sparkles className="w-3.5 h-3.5" /> Free Artisan Gift Wrap &amp; Shipping Unlocked!
                        </span>
                      ) : (
                        <span>
                          Add <strong className="tabular-nums text-[#2C2420]">${(freeShippingThreshold - subtotal).toFixed(0)}</strong> more for free gift wrapping &amp; delivery
                        </span>
                      )}
                    </span>
                    <span className="text-[11px] text-[#8E7E76] tabular-nums font-semibold">
                      {Math.round(progressToFreeShipping)}%
                    </span>
                  </div>
                  <div className="w-full bg-[#EAE0D8] h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-[#D97C65] h-full transition-all duration-300"
                      style={{ width: `${progressToFreeShipping}%` }}
                    />
                  </div>
                </div>

                {/* Items List */}
                <div className="space-y-4 divide-y divide-[#F0E8E1]">
                  {items.map((it) => (
                    <div key={it.id} className="pt-3 first:pt-0 flex gap-3.5 items-center">
                      <img
                        src={it.product.image}
                        alt={it.product.name}
                        referrerPolicy="no-referrer"
                        className="w-16 h-16 object-cover rounded-xl border border-[#E8DFD8] bg-[#F5EFEB] shrink-0"
                      />

                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-serif font-bold text-[#2C2420] truncate">
                          {it.product.name}
                        </h4>
                        {it.selectedColor && (
                          <div className="text-[11px] text-[#7A6C64]">
                            Color: {it.selectedColor}
                          </div>
                        )}
                        <div className="text-xs font-semibold text-[#2C2420] tabular-nums mt-0.5">
                          ${it.product.price}
                        </div>

                        {/* Quantity controls */}
                        <div className="flex items-center gap-2 mt-2">
                          <div className="flex items-center border border-[#DDD3CB] rounded-md bg-white">
                            <button
                              onClick={() => onUpdateQuantity(it.id, -1)}
                              className="px-2 py-0.5 text-xs text-[#5F524A] hover:bg-[#FAF4EF]"
                              aria-label="Decrease quantity"
                            >
                              -
                            </button>
                            <span className="px-2 py-0.5 text-xs font-semibold text-[#2C2420] tabular-nums">
                              {it.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(it.id, 1)}
                              className="px-2 py-0.5 text-xs text-[#5F524A] hover:bg-[#FAF4EF]"
                              aria-label="Increase quantity"
                            >
                              +
                            </button>
                          </div>

                          <button
                            onClick={() => onRemoveItem(it.id)}
                            className="p-1 text-[#9E9088] hover:text-[#9B2C2C] rounded transition-colors"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Gift Note Input */}
                <div className="pt-3 border-t border-[#F0E8E1] space-y-1.5">
                  <label className="block text-xs font-semibold text-[#5F524A]">
                    Complimentary Handwritten Calligraphy Note
                  </label>
                  <input
                    type="text"
                    value={giftNote}
                    onChange={(e) => setGiftNote(e.target.value)}
                    placeholder="e.g. 'Happy 25th Birthday Emma! Love, Mom'"
                    className="w-full px-3 py-2 text-xs border border-[#DDD3CB] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#D97C65]"
                  />
                </div>
              </>
            )}
          </div>

          {/* Footer Actions */}
          {items.length > 0 && checkoutStep === 'cart' && (
            <div className="p-5 border-t border-[#EAE1D9] bg-[#FAF7F2] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#7A6C64]">Subtotal:</span>
                <span className="text-xl font-bold font-serif text-[#2C2420] tabular-nums">
                  ${subtotal}
                </span>
              </div>

              <div className="space-y-2">
                <button
                  onClick={() => setCheckoutStep('checkout')}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-lg text-xs font-semibold text-white bg-[#D97C65] hover:bg-[#C66B54] transition-all shadow-xs cursor-pointer"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <a
                  href={`https://wa.me/?text=${formattedWhatsappCart}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-semibold text-[#245034] bg-[#EBF3ED] hover:bg-[#DDECE0] border border-[#CFDFD3] transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-[#2E553B]" />
                  <span>Order Directly on WhatsApp</span>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
