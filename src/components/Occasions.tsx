import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { OCCASIONS_LIST } from '../data/products';

interface OccasionsProps {
  onSelectOccasion: (occasion: string) => void;
}

export const Occasions: React.FC<OccasionsProps> = ({ onSelectOccasion }) => {
  return (
    <section id="occasions" className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
        <div className="text-xs font-semibold uppercase tracking-wider text-[#A4604E]">
          Celebrations &amp; Milestones
        </div>
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#2C2420]">
          Gifts for Every Meaningful Moment
        </h2>
        <p className="text-sm sm:text-base text-[#6B5A52]">
          From heartwarming birthdays to festive celebrations, explore hand-sculpted keepsakes designed to delight.
        </p>
      </div>

      {/* Occasions Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {OCCASIONS_LIST.map((item) => (
          <div
            key={item.id}
            onClick={() => onSelectOccasion(item.id)}
            className="group p-5 rounded-2xl bg-white border border-[#E8DFD8] hover:border-[#D97C65]/50 hover:shadow-md transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="text-3xl mb-3">{item.icon}</div>
              <h3 className="text-base font-serif font-bold text-[#2C2420] group-hover:text-[#D97C65] transition-colors">
                {item.title}
              </h3>
              <p className="mt-2 text-xs text-[#6B5A52] leading-relaxed">
                {item.description}
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-[#F0E8E1] flex items-center justify-between text-xs font-semibold text-[#D97C65]">
              <span>Explore Gifts</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
