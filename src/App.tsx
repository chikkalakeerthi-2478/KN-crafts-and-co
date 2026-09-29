import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutUs } from './components/AboutUs';
import { WhyChooseUs } from './components/WhyChooseUs';
import { ProductCatalog } from './components/ProductCatalog';
import { CustomOrders } from './components/CustomOrders';
import { Occasions } from './components/Occasions';
import { Gallery } from './components/Gallery';
import { CustomerReviews } from './components/CustomerReviews';
import { ContactUs } from './components/ContactUs';
import { Footer } from './components/Footer';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { ChatBot } from './components/ChatBot';
import { PRODUCTS } from './data/products';
import { Product, CartItem, CustomOrderRequest, ProductCategory } from './types';

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSection, setActiveSection] = useState('home');

  // Track active section for top navigation highlighting
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'products', 'custom-orders', 'gallery', 'occasions', 'reviews', 'contact'];
      const scrollY = window.scrollY + 120;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollY >= top && scrollY < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cart operations
  const handleAddToCart = (product: Product, quantity = 1, color?: string) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedColor === (color || product.colors[0]?.name)
      );

      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex].quantity += quantity;
        return next;
      }

      return [
        ...prev,
        {
          id: `${product.id}-${Date.now()}`,
          product,
          quantity,
          selectedColor: color || product.colors[0]?.name,
        },
      ];
    });
  };

  const handleUpdateQuantity = (cartItemId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === cartItemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleOccasionClick = (occasionName: string) => {
    setSearchQuery(occasionName);
    const prodEl = document.getElementById('products');
    if (prodEl) {
      prodEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollTo = (elementId: string) => {
    const el = document.getElementById(elementId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCustomOrderSubmit = (request: CustomOrderRequest) => {
    console.log('Custom Order Submitted:', request);
  };

  const cartTotalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2C2420] flex flex-col font-sans selection:bg-[#F3C4B8] selection:text-[#3B251E]">
      {/* 3-Zone Sticky Navigation */}
      <Navbar
        cartCount={cartTotalItems}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSearch={() => {
          handleScrollTo('products');
          const searchInput = document.querySelector('input[type="text"]') as HTMLInputElement;
          if (searchInput) searchInput.focus();
        }}
        activeSection={activeSection}
      />

      <main className="flex-1">
        {/* 1. Home / Hero */}
        <Hero
          onShopNow={() => handleScrollTo('products')}
          onCustomize={() => handleScrollTo('custom-orders')}
        />

        {/* 2. About Us */}
        <AboutUs />

        {/* 3. Why Choose Us */}
        <WhyChooseUs />

        {/* 4. Our Products */}
        <ProductCatalog
          products={PRODUCTS}
          onSelectProduct={(p) => setSelectedProduct(p)}
          onAddToCart={(p) => handleAddToCart(p, 1)}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        {/* 5. Custom Orders */}
        <CustomOrders onSubmitRequest={handleCustomOrderSubmit} />

        {/* 6. Occasions Guide */}
        <Occasions onSelectOccasion={handleOccasionClick} />

        {/* 7. Gallery */}
        <Gallery onCustomClick={() => handleScrollTo('custom-orders')} />

        {/* 8. Customer Reviews */}
        <CustomerReviews />

        {/* 9. Contact Us */}
        <ContactUs />
      </main>

      {/* Footer */}
      <Footer />

      {/* Product Details Modal */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Slide-over Shopping Bag Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
        onShopClick={() => handleScrollTo('products')}
      />

      {/* Floating Studio AI Assistant Chatbot (n8n Webhook) */}
      <ChatBot />
    </div>
  );
}
