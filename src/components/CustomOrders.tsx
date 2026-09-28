import React, { useState } from 'react';
import { Sparkles, Upload, Check, MessageCircle, Info, Clock, AlertCircle } from 'lucide-react';
import { CustomOrderRequest } from '../types';

interface CustomOrdersProps {
  onSubmitRequest: (order: CustomOrderRequest) => void;
}

const PRODUCT_TYPES = [
  { id: 'Custom Bouquet', label: 'Bespoke Bouquet', basePrice: 38, icon: '💐' },
  { id: 'Animal Keychain', label: 'Fluffy Keychain Charm', basePrice: 15, icon: '🧸' },
  { id: 'Floral Lamp', label: 'Enchanted Night Lamp', basePrice: 48, icon: '🪔' },
  { id: 'Potted Arrangement', label: 'Ceramic Potted Blooms', basePrice: 24, icon: '🌸' },
  { id: 'Pet Portrait Sculpture', label: 'Pet Likeness Sculpture', basePrice: 35, icon: '🐶' },
  { id: 'Party / Event Favors', label: 'Bulk Favors & Return Gifts', basePrice: 12, icon: '🎁' },
];

const COLOR_OPTIONS = [
  { name: 'Rose Blush', hex: '#F4ACB7' },
  { name: 'Lavender Mist', hex: '#C2BBF0' },
  { name: 'Sage Green', hex: '#95D5B2' },
  { name: 'Sunshine Yellow', hex: '#FFE169' },
  { name: 'Sky Periwinkle', hex: '#A2D2FF' },
  { name: 'Peach Coral', hex: '#FFB4A2' },
  { name: 'Mocha Tan', hex: '#DDBEA9' },
  { name: 'Pure White & Gold', hex: '#F8F9FA' },
];

export const CustomOrders: React.FC<CustomOrdersProps> = ({ onSubmitRequest }) => {
  const [customerName, setCustomerName] = useState('');
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');
  const [productType, setProductType] = useState('Custom Bouquet');
  const [selectedColors, setSelectedColors] = useState<string[]>(['Rose Blush', 'Lavender Mist']);
  const [quantity, setQuantity] = useState(1);
  const [occasion, setOccasion] = useState('Birthday');
  const [customMessage, setCustomMessage] = useState('');
  const [needByDate, setNeedByDate] = useState('');
  const [referenceImage, setReferenceImage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedOrder, setSubmittedOrder] = useState<CustomOrderRequest | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const toggleColor = (name: string) => {
    if (selectedColors.includes(name)) {
      if (selectedColors.length > 1) {
        setSelectedColors(selectedColors.filter((c) => c !== name));
      }
    } else {
      setSelectedColors([...selectedColors, name]);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setReferenceImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const activeTypeObj = PRODUCT_TYPES.find((p) => p.id === productType) || PRODUCT_TYPES[0];
  const estimatedTotal = activeTypeObj.basePrice * quantity;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!customerName.trim() || (!contact.trim() && !email.trim())) {
      setErrorMsg('Please enter your name and at least one contact method (phone/WhatsApp or email).');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const newOrder: CustomOrderRequest = {
        id: `TB-CUST-${Math.floor(1000 + Math.random() * 9000)}`,
        customerName,
        contact,
        email,
        productType,
        colorPalette: selectedColors,
        quantity,
        specialInstructions: customMessage,
        referenceImage: referenceImage || undefined,
        occasion,
        needByDate: needByDate || undefined,
        estimatedPrice: estimatedTotal,
        submittedAt: new Date().toLocaleDateString(),
      };

      onSubmitRequest(newOrder);
      setSubmittedOrder(newOrder);
      setIsSubmitting(false);
    }, 600);
  };

  return (
    <section id="custom-orders" className="py-16 md:py-24 bg-[#F8F4EE] border-y border-[#E9DFD8]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#A4604E]">
            Personalized Studio
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#2C2420]">
            Customize Your Dream Creation
          </h2>
          <p className="text-sm sm:text-base text-[#685850]">
            Have a special vision in mind? Tell us your favorite colors, flowers, or pet photos.
            Maya will sculpt your bespoke pipe-cleaner keepsake from scratch.
          </p>
        </div>

        {/* Success Modal or Active Form */}
        {submittedOrder ? (
          <div className="bg-white rounded-2xl p-8 border border-[#E3D8D0] shadow-sm text-center max-w-2xl mx-auto space-y-6 animate-in fade-in">
            <div className="w-16 h-16 bg-[#EDF4EE] text-[#487352] rounded-full flex items-center justify-center mx-auto">
              <Check className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-serif font-bold text-[#2C2420]">
                Custom Request Received!
              </h3>
              <p className="text-sm text-[#685850]">
                Thank you, <strong className="text-[#2C2420]">{submittedOrder.customerName}</strong>. Your reference ID is{' '}
                <span className="font-mono font-bold text-[#D97C65]">{submittedOrder.id}</span>.
              </p>
              <p className="text-xs text-[#7A6C64]">
                Our lead artisan will review your design notes and reach out within 2 hours with wire mockups and finalized timeline.
              </p>
            </div>

            {/* Request Summary Receipt */}
            <div className="p-4 bg-[#FAF7F2] rounded-xl border border-[#E9DFD8] text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-[#7A6C64]">Item Type:</span>
                <span className="font-semibold text-[#2C2420]">{submittedOrder.productType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#7A6C64]">Quantity:</span>
                <span className="font-semibold text-[#2C2420] tabular-nums">{submittedOrder.quantity}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#7A6C64]">Color Palette:</span>
                <span className="font-semibold text-[#2C2420]">
                  {submittedOrder.colorPalette.join(', ')}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-[#EAE0D8]">
                <span className="text-[#7A6C64]">Estimated Cost:</span>
                <span className="font-bold text-[#2C2420] tabular-nums text-sm">
                  ${submittedOrder.estimatedPrice}
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={`https://wa.me/?text=${encodeURIComponent(
                  `Hi Maya! I just submitted custom order ${submittedOrder.id} for "${submittedOrder.productType}" (${submittedOrder.colorPalette.join(', ')}). Here is my inquiry!`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold text-[#2E553B] bg-[#EBF3ED] hover:bg-[#DDECE0] border border-[#CFDFD3]"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Send via WhatsApp</span>
              </a>

              <button
                onClick={() => {
                  setSubmittedOrder(null);
                  setCustomerName('');
                  setContact('');
                  setEmail('');
                  setCustomMessage('');
                  setReferenceImage(null);
                }}
                className="px-5 py-2.5 rounded-lg text-xs font-semibold text-[#2C2420] bg-white border border-[#DDD3CB] hover:bg-[#FAF4EF]"
              >
                Create Another Request
              </button>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl p-6 sm:p-10 border border-[#E6DDD5] shadow-xs space-y-8"
          >
            {errorMsg && (
              <div className="p-3.5 rounded-lg bg-[#FDF2F2] border border-[#F8D7D7] text-xs text-[#9B2C2C] flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Step 1: Product Type */}
            <div className="space-y-3">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#7A6C64]">
                1. Select Creation Type
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {PRODUCT_TYPES.map((pt) => {
                  const isSelected = productType === pt.id;
                  return (
                    <button
                      type="button"
                      key={pt.id}
                      onClick={() => setProductType(pt.id)}
                      className={`p-3.5 text-left rounded-xl border transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[#2C2420] bg-[#2C2420] text-white shadow-xs'
                          : 'border-[#EAE1D9] bg-[#FAF7F2] text-[#443832] hover:bg-white hover:border-[#DDD3CB]'
                      }`}
                    >
                      <div className="text-xl mb-1">{pt.icon}</div>
                      <div className="text-xs font-semibold">{pt.label}</div>
                      <div
                        className={`text-[11px] mt-0.5 tabular-nums ${
                          isSelected ? 'text-[#E8DDD5]' : 'text-[#8E7E76]'
                        }`}
                      >
                        From ${pt.basePrice}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Preferred Colors */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-[#7A6C64]">
                  2. Preferred Color Palette
                </label>
                <span className="text-[11px] text-[#8E7E76]">Select 1 to 4 shades</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {COLOR_OPTIONS.map((c) => {
                  const isSelected = selectedColors.includes(c.name);
                  return (
                    <button
                      type="button"
                      key={c.name}
                      onClick={() => toggleColor(c.name)}
                      className={`flex items-center gap-2 p-2.5 rounded-lg border text-xs font-medium transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[#D97C65] bg-[#FDF7F5] text-[#2C2420] ring-1 ring-[#D97C65]'
                          : 'border-[#EAE1D9] bg-white text-[#5F524A] hover:bg-[#FAF7F2]'
                      }`}
                    >
                      <span
                        className="w-4 h-4 rounded-full border border-black/15 shrink-0"
                        style={{ backgroundColor: c.hex }}
                      />
                      <span className="truncate">{c.name}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-[#D97C65] ml-auto shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Quantity & Occasion */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[#7A6C64]">
                  3. Quantity
                </label>
                <div className="flex items-center border border-[#DDD3CB] rounded-lg bg-white overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-3 py-2 text-sm font-semibold text-[#5F524A] hover:bg-[#FAF4EF]"
                  >
                    -
                  </button>
                  <span className="flex-1 py-2 text-xs font-semibold text-center text-[#2C2420] tabular-nums">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="px-3 py-2 text-sm font-semibold text-[#5F524A] hover:bg-[#FAF4EF]"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[#7A6C64]">
                  Occasion
                </label>
                <select
                  value={occasion}
                  onChange={(e) => setOccasion(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-[#DDD3CB] rounded-lg text-[#2C2420] focus:ring-1 focus:ring-[#D97C65] focus:outline-none"
                >
                  <option value="Birthday">Birthday</option>
                  <option value="Anniversary">Anniversary</option>
                  <option value="Valentine's Day">Valentine's Day</option>
                  <option value="Graduation">Graduation</option>
                  <option value="Friendship Gift">Friendship Gift</option>
                  <option value="Wedding / Return Gifts">Wedding / Return Gifts</option>
                  <option value="Just Because">Just Because</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[#7A6C64]">
                  Needed By Date (Optional)
                </label>
                <input
                  type="date"
                  value={needByDate}
                  onChange={(e) => setNeedByDate(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-[#DDD3CB] rounded-lg text-[#2C2420] focus:ring-1 focus:ring-[#D97C65] focus:outline-none"
                />
              </div>
            </div>

            {/* Step 4: Custom Message & Instructions */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[#7A6C64]">
                4. Custom Message / Design Notes
              </label>
              <textarea
                rows={3}
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                placeholder="Describe your vision (e.g. 'I want 5 purple tulips and 2 white daisies with a miniature floppy-eared bunny charm holding a red heart. Please write Happy 21st Chloe on the card.')"
                className="w-full p-3 text-xs bg-white border border-[#DDD3CB] rounded-lg text-[#2C2420] placeholder-[#9E9088] focus:ring-1 focus:ring-[#D97C65] focus:outline-none leading-relaxed"
              />
            </div>

            {/* Step 5: Reference Image Upload */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#7A6C64]">
                5. Upload Reference Image (Optional)
              </label>
              <div className="border-2 border-dashed border-[#DDD3CB] rounded-xl p-4 text-center hover:bg-[#FAF7F2] transition-colors relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  aria-label="Upload reference photo"
                />
                {referenceImage ? (
                  <div className="flex items-center justify-center gap-3">
                    <img
                      src={referenceImage}
                      alt="Uploaded reference"
                      className="w-16 h-16 object-cover rounded-lg border border-[#DDD3CB]"
                    />
                    <div className="text-left">
                      <span className="text-xs font-semibold text-[#2C2420] block">
                        Reference image attached
                      </span>
                      <span className="text-[11px] text-[#7A6C64]">
                        Click or drag to replace
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-1 py-2">
                    <Upload className="w-5 h-5 mx-auto text-[#A4604E]" />
                    <p className="text-xs font-medium text-[#2C2420]">
                      Click to upload photos of a pet, flower type, or room color scheme
                    </p>
                    <p className="text-[11px] text-[#8E7E76]">PNG, JPG, or WEBP up to 5MB</p>
                  </div>
                )}
              </div>
            </div>

            {/* Step 6: Contact Information */}
            <div className="space-y-3 pt-2 border-t border-[#EAE1D9]">
              <label className="text-xs font-bold uppercase tracking-wider text-[#7A6C64]">
                6. Your Contact Details
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Your Full Name *"
                    className="w-full px-3 py-2 text-xs bg-white border border-[#DDD3CB] rounded-lg text-[#2C2420] focus:ring-1 focus:ring-[#D97C65] focus:outline-none"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    placeholder="WhatsApp / Phone Number"
                    className="w-full px-3 py-2 text-xs bg-white border border-[#DDD3CB] rounded-lg text-[#2C2420] focus:ring-1 focus:ring-[#D97C65] focus:outline-none"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email Address"
                    className="w-full px-3 py-2 text-xs bg-white border border-[#DDD3CB] rounded-lg text-[#2C2420] focus:ring-1 focus:ring-[#D97C65] focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Summary & Submit */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#EAE1D9]">
              <div>
                <span className="text-xs text-[#7A6C64] block">Estimated Artisan Quote:</span>
                <span className="text-2xl font-bold font-serif text-[#2C2420] tabular-nums">
                  ${estimatedTotal}
                </span>
                <span className="text-[11px] text-[#7A6C64] ml-1">
                  (Final price confirmed before crafting)
                </span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 rounded-lg text-xs font-semibold text-white bg-[#D97C65] hover:bg-[#C66B54] transition-all shadow-sm hover:shadow cursor-pointer disabled:opacity-50"
              >
                <Sparkles className="w-4 h-4" />
                <span>{isSubmitting ? 'Submitting...' : 'Submit Custom Request'}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};
