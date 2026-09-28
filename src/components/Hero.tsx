import React from 'react';
import { ArrowRight, Heart, Sparkles, ShieldCheck, Clock } from 'lucide-react';
import heroBouquetImg from '../assets/images/hero_pipe_cleaner_bouquet_1790578565494.jpg';

interface HeroProps {
  onShopNow: () => void;
  onCustomize: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onShopNow, onCustomize }) => {
  return (
    <section id="home" className="relative overflow-hidden pt-8 pb-16 md:pt-14 md:pb-24">
      {/* Subtle organic background glow */}
      <div className="absolute top-0 right-1/4 -z-10 w-96 h-96 bg-[#FCECE5] rounded-full blur-3xl opacity-60 pointer-events-none" />
      <div className="absolute bottom-10 left-1/6 -z-10 w-80 h-80 bg-[#EDF4EE] rounded-full blur-3xl opacity-50 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Brand Story & CTAs */}
          <div className="lg:col-span-6 space-y-6 text-left">
            {/* Unboxed natural editorial tag */}
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#A4604E]">
              <span>Artisanal Chenille Studio</span>
              <span aria-hidden="true">·</span>
              <span>100% Hand-Twisted</span>
              <span aria-hidden="true">·</span>
              <span>Everlasting Blooms</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#2C2420] leading-[1.12] text-balance">
              Handmade with Love, Crafted Just for You
            </h1>

            <p className="text-base sm:text-lg text-[#6B5A52] leading-relaxed max-w-xl">
              Welcome to Twist &amp; Bloom. We transform plush velvet pipe cleaners into
              everlasting botanical bouquets, whimsical animal keychains, and ambient glowing
              floral lamps — thoughtfully personalized for your most cherished moments.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={onShopNow}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-[#D97C65] hover:bg-[#C66B54] rounded-lg transition-all shadow-sm hover:shadow hover:-translate-y-0.5 whitespace-nowrap"
              >
                <span>Shop Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onCustomize}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-[#2C2420] bg-white hover:bg-[#FAF4EF] border border-[#DDD3CB] rounded-lg transition-all shadow-xs hover:-translate-y-0.5 whitespace-nowrap"
              >
                <Sparkles className="w-4 h-4 text-[#D97C65]" />
                <span>Customize Your Gift</span>
              </button>
            </div>

            {/* Quiet trust markers */}
            <div className="pt-6 border-t border-[#E9DFD8] grid grid-cols-3 gap-4 text-left">
              <div>
                <div className="text-2xl font-serif font-bold text-[#2C2420] tabular-nums">100%</div>
                <div className="text-xs text-[#7A6C64]">Hand-sculpted art</div>
              </div>
              <div>
                <div className="text-2xl font-serif font-bold text-[#2C2420] tabular-nums">5,000+</div>
                <div className="text-xs text-[#7A6C64]">Everlasting blooms</div>
              </div>
              <div>
                <div className="text-2xl font-serif font-bold text-[#2C2420] tabular-nums">4.9/5</div>
                <div className="text-xs text-[#7A6C64]">Customer happiness</div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              {/* Main Photo Card */}
              <div className="relative rounded-2xl overflow-hidden shadow-lg border border-[#E9DFD8] bg-white group">
                <img
                  src={heroBouquetImg}
                  alt="Handcrafted pipe-cleaner pastel flower bouquet with tulips and daisies"
                  referrerPolicy="no-referrer"
                  className="w-full h-[360px] sm:h-[460px] object-cover transition-transform duration-700 group-hover:scale-103"
                />

                {/* Floating Artisan Note Card */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-xl border border-[#EBE1D9] shadow-sm flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#FBF0EC] text-[#D97C65] flex items-center justify-center shrink-0">
                      <Heart className="w-5 h-5 fill-current" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-[#2C2420]">
                        Spring Pastel Symphony
                      </div>
                      <div className="text-xs text-[#7A6C64]">
                        Everlasting velvet blooms · Never withers
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-base font-bold text-[#2C2420] tabular-nums">$38</span>
                    <span className="block text-[11px] text-[#2C7A4D] font-medium">In Stock</span>
                  </div>
                </div>
              </div>

              {/* Decorative side badge */}
              <div className="hidden sm:flex absolute -top-4 -right-4 bg-white px-3.5 py-2 rounded-xl shadow-md border border-[#E9DFD8] items-center gap-2">
                <Clock className="w-4 h-4 text-[#D97C65]" />
                <span className="text-xs font-semibold text-[#2C2420]">
                  Twisted with 4.5 hrs of artisan care
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
