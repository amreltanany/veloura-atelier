/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { CustomCakeBuilder } from './components/CustomCakeBuilder';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderConfirmationModal } from './components/OrderConfirmationModal';
import { CraftsmanshipSection } from './components/CraftsmanshipSection';
import { Footer } from './components/Footer';
import { PRODUCTS } from './data/products';
import { Product, CartItem, Order, CategoryId } from './types/bakery';
import { Sparkles, ArrowRight, Check, Filter } from 'lucide-react';

export default function App() {
  // Navigation & View state
  const [activeView, setActiveView] = useState<'home' | 'builder' | 'catalog'>('home');
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('all');

  // Cart state with localStorage persistence
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('atelier_farine_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Modal states
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);

  // Quick feedback toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('atelier_farine_cart', JSON.stringify(cart));
    } catch {
      // Storage unavailable
    }
  }, [cart]);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const handleAddToCart = (item: CartItem) => {
    setCart((prevCart) => {
      // Check if duplicate standard item exists with exact same options
      const existingIdx = prevCart.findIndex(
        (i) =>
          !i.isCustomRecipe &&
          i.productId === item.productId &&
          i.selectedSize === item.selectedSize &&
          i.sweetnessLevel === item.sweetnessLevel &&
          i.inscription === item.inscription &&
          i.candlesCount === item.candlesCount
      );

      if (existingIdx > -1) {
        const updated = [...prevCart];
        updated[existingIdx].quantity += item.quantity;
        return updated;
      }
      return [item, ...prevCart];
    });

    showToast(`Added "${item.name}" to your shopping bag.`);
  };

  const handleQuickAdd = (product: Product) => {
    const defaultSize = product.availableSizes ? product.availableSizes[0].label : 'Standard';
    const cartItem: CartItem = {
      cartItemId: `${product.id}-${Date.now()}`,
      productId: product.id,
      name: product.name,
      frenchName: product.frenchName,
      image: product.image,
      unitPrice: product.price,
      quantity: 1,
      selectedSize: defaultSize,
      sweetnessLevel: '75%',
      isCustomRecipe: false,
    };
    handleAddToCart(cartItem);
  };

  const handleUpdateQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.cartItemId === cartItemId ? { ...item, quantity: newQty } : item))
    );
  };

  const handleRemoveItem = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
  };

  const handleOrderComplete = (order: Order) => {
    setConfirmedOrder(order);
    setCart([]);
    setIsCheckoutOpen(false);
  };

  const handleNavigate = (view: 'home' | 'builder' | 'catalog', categoryFilter?: string) => {
    setActiveView(view);
    if (categoryFilter) {
      setSelectedCategory(categoryFilter as CategoryId);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Filtered products list
  const filteredProducts =
    selectedCategory === 'all'
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === selectedCategory);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#231F1E]">
      {/* Top Banner: Single clean announcement */}
      <div className="bg-[#231F1E] text-[#D8C7B4] py-2 px-6 text-center text-xs tracking-wide border-b border-[#38312E]">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2">
          <span className="font-medium text-[#F3D6B5]">Fresh Morning Bake</span>
          <span aria-hidden="true" className="text-[#6D5F54]">·</span>
          <span>Complimentary refrigerated courier delivery on all orders over $75</span>
        </div>
      </div>

      {/* Top Navigation Bar adhering strictly to 3-Zone contract */}
      <Header
        cart={cart}
        onOpenCart={() => setIsCartOpen(true)}
        activeView={activeView}
        onNavigate={handleNavigate}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeView === 'home' && (
          <>
            {/* Hero Showcase */}
            <Hero
              onExploreCatalog={() => {
                const el = document.getElementById('catalog-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              onOpenCustomBuilder={() => {
                setActiveView('builder');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* Featured Product Catalog Section */}
            <section id="catalog-section" className="py-16 px-6 lg:px-12 max-w-7xl mx-auto space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#EDE4D6] pb-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-[#92542B]">
                    <span>Seasonal Collection</span>
                    <span aria-hidden="true">·</span>
                    <span>Handcrafted Daily</span>
                  </div>
                  <h2 className="font-serif text-3xl font-semibold text-[#231F1E]">
                    Signature Cakes & Viennoiserie
                  </h2>
                  <p className="text-xs sm:text-sm text-[#7A6F68] max-w-xl">
                    Every recipe can be customized for sweetness level, dietary preferences, and celebratory piping text.
                  </p>
                </div>

                {/* Filter Tabs */}
                <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#F1EAE0] rounded-lg text-xs">
                  {[
                    { id: 'all', label: 'All Items' },
                    { id: 'signature-cakes', label: 'Signature Cakes' },
                    { id: 'viennoiserie', label: 'Viennoiserie' },
                    { id: 'custom-studio', label: 'Custom Studio' },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setSelectedCategory(tab.id as CategoryId)}
                      className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
                        selectedCategory === tab.id
                          ? 'bg-white text-[#231F1E] shadow-xs font-semibold'
                          : 'text-[#6D635C] hover:text-[#231F1E]'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 3-Column Product Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onSelect={(p) => setSelectedProduct(p)}
                    onQuickAdd={handleQuickAdd}
                  />
                ))}
              </div>
            </section>

            {/* Custom Cake Builder Feature Spotlight */}
            <section className="py-14 px-6 lg:px-12 bg-[#FAF5EE] border-t border-b border-[#ECE3D5]">
              <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-[#92542B]">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>The Atelier Recipe Studio</span>
                  </div>
                  <h2 className="font-serif text-3xl sm:text-4xl text-[#231F1E] font-medium [text-wrap:balance]">
                    Need a bespoke recipe for a celebration?
                  </h2>
                  <p className="text-sm text-[#5F5651] max-w-lg leading-relaxed">
                    Formulate your dream centerpiece in our interactive studio: choose from
                    single to 3-tier architectures, select foundation sponges like Sicilian Bronte Pistachio
                    or Valrhona 70%, customize fillings, outer glazes, and preview your calligraphy piping in real-time.
                  </p>
                  <div className="pt-2">
                    <button
                      onClick={() => {
                        setActiveView('builder');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="inline-flex items-center gap-2 px-6 py-3.5 text-xs font-semibold text-white bg-[#92542B] hover:bg-[#7D4520] active:scale-[0.99] rounded-lg transition-all shadow-sm cursor-pointer whitespace-nowrap"
                    >
                      <Sparkles className="w-4 h-4 text-[#F3D6B5]" />
                      <span>Launch Interactive Cake Customizer</span>
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </button>
                  </div>
                </div>

                <div className="lg:col-span-5 relative">
                  <div className="rounded-xl overflow-hidden border border-[#EDE4D6] shadow-md bg-white aspect-[4/3]">
                    <img
                      src="/src/assets/images/cake_berry_pistachio_1793892278361.jpg"
                      alt="Custom Sicilian pistachio and alpine strawberry cake preview"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Craftsmanship & Ingredient Integrity */}
            <CraftsmanshipSection />
          </>
        )}

        {/* Custom Studio View */}
        {activeView === 'builder' && (
          <CustomCakeBuilder
            onAddToCart={(item) => {
              handleAddToCart(item);
              setIsCartOpen(true);
            }}
            onNavigateHome={() => setActiveView('home')}
          />
        )}

        {/* Catalog View */}
        {activeView === 'catalog' && (
          <section className="py-12 px-6 lg:px-12 max-w-7xl mx-auto space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#EDE4D6] pb-6">
              <div className="space-y-1">
                <span className="text-xs font-medium uppercase tracking-wider text-[#92542B]">
                  Pâtisserie & Boulangerie
                </span>
                <h1 className="font-serif text-3xl font-bold text-[#231F1E]">
                  Complete Menu Catalog
                </h1>
              </div>

              {/* Category Pills/Buttons */}
              <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#F1EAE0] rounded-lg text-xs">
                {[
                  { id: 'all', label: 'All Creations' },
                  { id: 'signature-cakes', label: 'Signature Cakes' },
                  { id: 'viennoiserie', label: 'Viennoiserie & Breads' },
                  { id: 'custom-studio', label: 'Custom Gala Tiers' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedCategory(tab.id as CategoryId)}
                    className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
                      selectedCategory === tab.id
                        ? 'bg-white text-[#231F1E] shadow-xs font-semibold'
                        : 'text-[#6D635C] hover:text-[#231F1E]'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onSelect={(p) => setSelectedProduct(p)}
                  onQuickAdd={handleQuickAdd}
                />
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[#231F1E] text-white px-5 py-3 rounded-xl shadow-xl border border-[#3D3532] animate-in fade-in slide-in-from-bottom-3 duration-200 text-xs">
          <div className="w-5 h-5 rounded-full bg-[#92542B] flex items-center justify-center shrink-0">
            <Check className="w-3.5 h-3.5 text-[#F3D6B5]" />
          </div>
          <span>{toastMessage}</span>
          <button
            onClick={() => setIsCartOpen(true)}
            className="ml-2 font-semibold text-[#F3D6B5] hover:underline cursor-pointer"
          >
            View Bag
          </button>
        </div>
      )}

      {/* Product Customization / Detail Modal */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Slide-over Shopping Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={() => setIsCheckoutOpen(true)}
      />

      {/* Multi-Step Seamless Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        onOrderComplete={handleOrderComplete}
      />

      {/* Order Confirmation & Live Tracking Modal */}
      <OrderConfirmationModal
        order={confirmedOrder}
        onClose={() => setConfirmedOrder(null)}
        onContinueShopping={() => {
          setConfirmedOrder(null);
          setActiveView('home');
        }}
      />
    </div>
  );
}
