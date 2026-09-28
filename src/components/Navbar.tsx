import React, { useState, useEffect } from 'react';
import { ShoppingBag, Search, Menu, X, Sparkles, MessageCircle } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenSearch: () => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onOpenSearch,
  activeSection,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Products', href: '#products' },
    { label: 'Custom Orders', href: '#custom-orders' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Occasions', href: '#occasions' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FAF7F2]/95 backdrop-blur-md shadow-xs border-b border-[#E9DFD8]'
            : 'bg-[#FAF7F2] border-b border-[#E9DFD8]/60'
        }`}
      >
        {/* Subtle Announcement Bar */}
        <div className="bg-[#F6ECE6] border-b border-[#EADBD3] text-[#7C483B] text-xs py-1.5 px-4 text-center">
          <div className="max-w-6xl mx-auto flex items-center justify-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#D97C65] shrink-0" />
            <span className="font-medium truncate">
              Spring Craft Offer: Free handwritten calligraphy gift note with every bouquet & lamp
            </span>
          </div>
        </div>

        {/* 3-Zone Navigation Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          {/* Zone 1: Single text wordmark */}
          <a
            href="#home"
            className="text-2xl sm:text-2xl font-serif font-bold text-[#2C2420] tracking-tight hover:opacity-90 transition-opacity whitespace-nowrap"
          >
            Twist & Bloom
          </a>

          {/* Zone 2: Clean text navigation links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#685850]">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`transition-colors py-1 relative hover:text-[#2C2420] ${
                  activeSection === link.href.substring(1)
                    ? 'text-[#D97C65] font-semibold'
                    : ''
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: Primary interactive controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenSearch}
              className="p-2 text-[#685850] hover:text-[#2C2420] hover:bg-[#F3EBE4] rounded-full transition-colors"
              title="Search crafts"
              aria-label="Search crafts"
            >
              <Search className="w-5 h-5" />
            </button>

            <a
              href="https://wa.me/?text=Hello%20Twist%20%26%20Bloom%20Studio!%20I'm%20interested%20in%20ordering%20a%20handmade%20pipe-cleaner%20craft."
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#2C2420] bg-[#EBF3ED] hover:bg-[#DDECE0] text-[#345E42] border border-[#CFDFD3] rounded-md transition-colors whitespace-nowrap"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp Us</span>
            </a>

            <button
              onClick={onOpenCart}
              className="relative flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-white bg-[#D97C65] hover:bg-[#C66B54] rounded-md transition-all shadow-xs whitespace-nowrap"
              aria-label="View shopping bag"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Bag</span>
              {cartCount > 0 && (
                <span className="inline-flex items-center justify-center bg-white text-[#D97C65] font-bold text-[11px] rounded-full min-w-[18px] h-[18px] px-1 tabular-nums">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile menu hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#685850] hover:text-[#2C2420] hover:bg-[#F3EBE4] rounded-md"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#FAF7F2] border-b border-[#E9DFD8] px-4 pt-3 pb-6 space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-base font-medium text-[#5A4B43] hover:text-[#2C2420] hover:bg-[#F3EBE4] rounded-md transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-3 border-t border-[#E9DFD8] flex gap-2">
              <a
                href="https://wa.me/?text=Hello%20Twist%20%26%20Bloom%20Studio!%20I'm%20interested%20in%20ordering%20a%20handmade%20craft."
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center py-2 text-xs font-medium text-[#2E553B] bg-[#EBF3ED] rounded-md"
              >
                WhatsApp Inquiry
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
