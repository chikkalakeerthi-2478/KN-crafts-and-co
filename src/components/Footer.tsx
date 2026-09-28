import React from 'react';
import { Heart, Instagram, Youtube, Mail, Phone, MapPin, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#261E1A] text-[#D8CDC5] pt-16 pb-12 border-t border-[#3B302B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#3E332E]">
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <span className="text-2xl font-serif font-bold text-white tracking-tight block">
              Twist &amp; Bloom
            </span>
            <p className="text-xs text-[#B5A59B] leading-relaxed max-w-sm">
              Artisanal handmade studio specializing in everlasting pipe-cleaner floral bouquets,
              chubby animal keychains, and ambient night lamps. Crafted petal by petal with love
              in small studio batches.
            </p>
            <div className="flex items-center gap-3 pt-1">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-[#352B26] hover:bg-[#D97C65] text-white flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-[#352B26] hover:bg-[#D97C65] text-white flex items-center justify-center transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider">
              Explore
            </h4>
            <ul className="space-y-2 text-xs text-[#B5A59B]">
              <li>
                <a href="#home" className="hover:text-white transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  Our Story
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-white transition-colors">
                  Handmade Catalog
                </a>
              </li>
              <li>
                <a href="#custom-orders" className="hover:text-white transition-colors">
                  Custom Orders
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-white transition-colors">
                  Studio Gallery
                </a>
              </li>
              <li>
                <a href="#occasions" className="hover:text-white transition-colors">
                  Occasions Guide
                </a>
              </li>
            </ul>
          </div>

          {/* Craft Categories */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider">
              Craft Specialities
            </h4>
            <ul className="space-y-2 text-xs text-[#B5A59B]">
              <li>Bespoke Pipe-Cleaner Bouquets</li>
              <li>Plush Animal Bag Keychains</li>
              <li>Lily &amp; Daisy Bedside Lamps</li>
              <li>Ceramic Potted Forever Blooms</li>
              <li>Custom Pet Likeness Sculptures</li>
              <li>Event &amp; Wedding Favors</li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider">
              Studio Workshop
            </h4>
            <div className="space-y-2 text-xs text-[#B5A59B]">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#D97C65] shrink-0 mt-0.5" />
                <span>42 Blossom Mews, Artisan Quarter (Appointments only)</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#D97C65] shrink-0" />
                <a href="mailto:hello@twistandbloomstudio.com" className="hover:text-white">
                  hello@twistandbloomstudio.com
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#D97C65] shrink-0" />
                <a href="https://wa.me/" className="hover:text-white">
                  WhatsApp: Studio Line
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8A796F]">
          <div className="flex items-center gap-1">
            <span>© {new Date().getFullYear()} Twist &amp; Bloom Handmade Crafts Studio.</span>
            <span>All rights reserved.</span>
          </div>
          <div className="flex items-center gap-2">
            <span>Handmade with</span>
            <Heart className="w-3.5 h-3.5 text-[#D97C65] fill-current" />
            <span>and everlasting chenille love.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
