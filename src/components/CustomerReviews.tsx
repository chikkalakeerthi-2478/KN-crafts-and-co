import React, { useState } from 'react';
import { Star, CheckCircle2, MessageSquarePlus, X } from 'lucide-react';
import { Review } from '../types';
import { REVIEWS } from '../data/products';

export const CustomerReviews: React.FC = () => {
  const [reviewsList, setReviewsList] = useState<Review[]>(REVIEWS);
  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [productName, setProductName] = useState('Whimsical Spring Pastel Bouquet');
  const [rating, setRating] = useState(5);
  const [occasion, setOccasion] = useState('Birthday');
  const [comment, setComment] = useState('');
  const [submittedThanks, setSubmittedThanks] = useState(false);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) return;

    const newRev: Review = {
      id: `rev-${Date.now()}`,
      name,
      rating,
      date: 'Just now',
      verified: true,
      productName,
      occasion,
      comment,
      avatarText: name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .slice(0, 2)
        .toUpperCase(),
    };

    setReviewsList([newRev, ...reviewsList]);
    setSubmittedThanks(true);
    setTimeout(() => {
      setSubmittedThanks(false);
      setModalOpen(false);
      setName('');
      setComment('');
    }, 1200);
  };

  return (
    <section id="reviews" className="py-16 md:py-24 bg-[#F8F4EE] border-y border-[#E9DFD8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
          <div className="space-y-2 text-center md:text-left">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#A4604E]">
              Kind Words From Customers
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#2C2420]">
              Loved by Gift Givers Worldwide
            </h2>
            <div className="flex items-center justify-center md:justify-start gap-2 text-xs text-[#7A6C64]">
              <div className="flex text-[#D49339]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="font-bold text-[#2C2420] tabular-nums">4.9 / 5.0</span>
              <span aria-hidden="true">·</span>
              <span className="tabular-nums">Based on 320+ handmade orders</span>
            </div>
          </div>

          <button
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-[#2C2420] bg-white hover:bg-[#FAF4EF] border border-[#DDD3CB] rounded-lg shadow-2xs transition-colors"
          >
            <MessageSquarePlus className="w-4 h-4 text-[#D97C65]" />
            <span>Write a Review</span>
          </button>
        </div>

        {/* Review Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviewsList.map((rev) => (
            <div
              key={rev.id}
              className="p-6 rounded-2xl bg-white border border-[#E8DFD8] shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                {/* Rating & Verified badge */}
                <div className="flex items-center justify-between">
                  <div className="flex text-[#D49339]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>

                  <div className="flex items-center gap-1 text-[11px] text-[#345E42] font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Verified Craft Buyer</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-[#4E4038] leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>

              {/* Author & Occasion */}
              <div className="pt-3 border-t border-[#F0E8E1] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#FAF0EC] text-[#D97C65] font-serif font-bold text-xs flex items-center justify-center">
                    {rev.avatarText}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#2C2420]">{rev.name}</div>
                    <div className="text-[11px] text-[#8E7E76]">{rev.productName}</div>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[11px] font-medium text-[#D97C65] block">
                    {rev.occasion}
                  </span>
                  <span className="text-[10px] text-[#9E9088]">{rev.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Leave Review Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 border border-[#E8DFD8] shadow-2xl relative space-y-4">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 text-[#8E7E76] hover:text-[#2C2420]"
              aria-label="Close review dialog"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-serif font-bold text-[#2C2420]">
              Share Your Experience
            </h3>

            {submittedThanks ? (
              <div className="p-6 text-center space-y-2">
                <CheckCircle2 className="w-12 h-12 text-[#487352] mx-auto" />
                <p className="text-sm font-semibold text-[#2C2420]">
                  Thank you for supporting our handmade studio!
                </p>
                <p className="text-xs text-[#7A6C64]">
                  Your review has been added to our wall of love.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitReview} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-semibold text-[#5F524A] mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Maya S."
                    className="w-full px-3 py-2 text-xs border border-[#DDD3CB] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#D97C65]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#5F524A] mb-1">
                    Product Ordered
                  </label>
                  <input
                    type="text"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-[#DDD3CB] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#D97C65]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#5F524A] mb-1">
                      Rating (1-5 Stars)
                    </label>
                    <select
                      value={rating}
                      onChange={(e) => setRating(Number(e.target.value))}
                      className="w-full px-3 py-2 text-xs border border-[#DDD3CB] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#D97C65]"
                    >
                      <option value={5}>5 Stars - Outstanding</option>
                      <option value={4}>4 Stars - Great</option>
                      <option value={3}>3 Stars - Good</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#5F524A] mb-1">
                      Occasion
                    </label>
                    <input
                      type="text"
                      value={occasion}
                      onChange={(e) => setOccasion(e.target.value)}
                      placeholder="e.g. Birthday"
                      className="w-full px-3 py-2 text-xs border border-[#DDD3CB] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#D97C65]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#5F524A] mb-1">
                    Your Review *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Tell us what you loved about the pipe-cleaner craft..."
                    className="w-full p-2.5 text-xs border border-[#DDD3CB] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#D97C65]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-lg text-xs font-semibold text-white bg-[#D97C65] hover:bg-[#C66B54] transition-colors"
                >
                  Submit Review
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
