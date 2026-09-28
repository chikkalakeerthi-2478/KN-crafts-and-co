import React from 'react';
import { Sparkles, Palette, ShieldCheck, HeartHandshake, Eye } from 'lucide-react';
import tulipPotImg from '../assets/images/pipe_cleaner_tulip_pot_1790578603951.jpg';

export const AboutUs: React.FC = () => {
  return (
    <section id="about" className="py-16 md:py-24 bg-white border-y border-[#E9DFD8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Visual Side */}
          <div className="lg:col-span-5 relative order-2 lg:order-1">
            <div className="relative rounded-2xl overflow-hidden shadow-md border border-[#EBE1D9] bg-[#FAF7F2]">
              <img
                src={tulipPotImg}
                alt="Artisan studio table with pipe-cleaner potted flowers and craft tools"
                referrerPolicy="no-referrer"
                className="w-full h-[400px] object-cover"
              />
              <div className="p-5 bg-[#FAF7F2] border-t border-[#EBE1D9]">
                <div className="flex items-center justify-between text-xs text-[#7A6C64]">
                  <span>Studio Craft Batch #42</span>
                  <span>Handcrafted in Small Runs</span>
                </div>
                <p className="mt-2 text-sm text-[#2C2420] font-medium">
                  "Every chenille wire is hand-spun with patience. Unlike real flowers that fade in days, our blooms preserve your happiest memories forever."
                </p>
                <div className="mt-2 text-xs font-semibold text-[#D97C65]">
                  — Maya Lin, Founder & Lead Artisan
                </div>
              </div>
            </div>
          </div>

          {/* Narrative & Craft Pillars Side */}
          <div className="lg:col-span-7 space-y-6 text-left order-1 lg:order-2">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#A4604E]">
              Our Craft Story
            </div>

            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#2C2420] text-balance">
              Turning Ordinary Chenille Stems Into Timeless Works of Heart
            </h2>

            <p className="text-base text-[#6B5A52] leading-relaxed">
              Twist &amp; Bloom was born from a simple belief: the most precious gifts are the ones
              touched by human hands. What started at a cozy studio worktable twisting fuzzy craft
              wires has blossomed into a beloved handmade studio creating botanical wonders,
              comforting bedtime night lights, and cheerful miniature companions.
            </p>

            <p className="text-base text-[#6B5A52] leading-relaxed">
              Every single flower petal, bunny ear, and lamp branch is sculpted using premium,
              high-density velvet chenille wire. We never use mass-produced plastic molds or
              glued factory parts. The wire core allows you to gently reshape, bend, and pose
              your flowers — making every piece an adaptable living sculpture for your home.
            </p>

            {/* 4 Pillars Grid */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#EFE5DD]">
                <div className="w-8 h-8 rounded-lg bg-[#FCECE5] text-[#D97C65] flex items-center justify-center mb-2.5">
                  <Palette className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-[#2C2420]">Bespoke Color Harmony</h3>
                <p className="mt-1 text-xs text-[#73645B] leading-relaxed">
                  Carefully blended pastel palettes inspired by nature’s softest morning light.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#EFE5DD]">
                <div className="w-8 h-8 rounded-lg bg-[#EDF4EE] text-[#5F856C] flex items-center justify-center mb-2.5">
                  <Eye className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-[#2C2420]">Obsessive Detail</h3>
                <p className="mt-1 text-xs text-[#73645B] leading-relaxed">
                  Layered petal curvature, hand-stitched beads, and durable gold hardware.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#EFE5DD]">
                <div className="w-8 h-8 rounded-lg bg-[#F2F0F9] text-[#8B81B3] flex items-center justify-center mb-2.5">
                  <Sparkles className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-[#2C2420]">Everlasting Keepsakes</h3>
                <p className="mt-1 text-xs text-[#73645B] leading-relaxed">
                  No water, no wilting, no pollen allergies — pure tactile warmth for years.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#EFE5DD]">
                <div className="w-8 h-8 rounded-lg bg-[#FDF5E6] text-[#D49339] flex items-center justify-center mb-2.5">
                  <HeartHandshake className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-[#2C2420]">Personalized Touch</h3>
                <p className="mt-1 text-xs text-[#73645B] leading-relaxed">
                  Every order includes custom calligraphy, personalized ribbons, or pet likenesses.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
