import React from 'react';
import { Heart, Sparkles, Feather, DollarSign, Award, Gift } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const reasons = [
    {
      icon: Feather,
      title: '100% Handmade Art',
      description: 'Every stem, petal, and ear is bent, looped, and woven by real artisan hands without industrial shortcuts.',
      accent: 'text-[#D97C65] bg-[#FCECE5]',
    },
    {
      icon: Sparkles,
      title: 'Custom Designs',
      description: 'Your favorite flowers, pet portraits, or color palettes brought to life exactly the way you picture them.',
      accent: 'text-[#8B81B3] bg-[#F2F0F9]',
    },
    {
      icon: Award,
      title: 'Carefully Crafted',
      description: 'Premium high-density plush velvet wire with sturdy interior floral cores that hold shape for years.',
      accent: 'text-[#5F856C] bg-[#EDF4EE]',
    },
    {
      icon: DollarSign,
      title: 'Affordable Gifts',
      description: 'Artisanal heirloom-grade keepsakes designed to fit student, family, and celebration budgets.',
      accent: 'text-[#D49339] bg-[#FDF5E6]',
    },
    {
      icon: Heart,
      title: 'Made with Love',
      description: 'Each piece carries human warmth, gentle intention, and meticulous patience that factory gifts lack.',
      accent: 'text-[#D97C65] bg-[#FCECE5]',
    },
    {
      icon: Gift,
      title: 'Perfect for Occasions',
      description: 'Everlasting flowers that never wilt — serving as a timeless reminder of your love and friendship.',
      accent: 'text-[#5F856C] bg-[#EDF4EE]',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white border-y border-[#E9DFD8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#A4604E]">
            Artisan Promise
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#2C2420]">
            Why Choose Twist &amp; Bloom
          </h2>
          <p className="text-sm sm:text-base text-[#6B5A52]">
            We pour tactile wonder and enduring craftsmanship into every single creation that leaves our studio.
          </p>
        </div>

        {/* 6 Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <div
                key={reason.title}
                className="p-6 rounded-2xl bg-[#FAF7F2] border border-[#E9DFD8] hover:border-[#DDD3CB] hover:bg-white transition-all duration-300 hover:shadow-xs group"
              >
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-105 ${reason.accent}`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div className="text-xs font-mono text-[#8E7E76] mb-1">
                  0{index + 1}
                </div>
                <h3 className="text-lg font-serif font-bold text-[#2C2420] mb-2">
                  {reason.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#685850] leading-relaxed">
                  {reason.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
