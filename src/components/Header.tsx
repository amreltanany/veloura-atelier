import React, { useEffect, useState } from 'react';
import { Menu, ShoppingBag, X } from 'lucide-react';
import { CartItem } from '../types/bakery';
import { scrollToElement } from '../smooth-scroll';

interface HeaderProps {
  cart: CartItem[];
  onOpenCart: () => void;
  activeView: 'home' | 'builder' | 'catalog';
  onNavigate: (view: 'home' | 'builder' | 'catalog', categoryFilter?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  cart,
  onOpenCart,
  activeView,
  onNavigate,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenuOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // "Our Craft" lives on the home view; from the studio or catalog, go home first.
  const goToCraft = (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuOpen(false);
    if (activeView !== 'home') onNavigate('home');
    setTimeout(() => {
      scrollToElement(document.getElementById('craftsmanship'));
    }, activeView === 'home' ? 0 : 120);
  };
  const go = (view: 'home' | 'builder' | 'catalog', filter?: string) => {
    setMenuOpen(false);
    onNavigate(view, filter);
  };

  const totalItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalAmount = cart.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#ECE3D5] transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 sm:gap-8 px-4 sm:px-6 lg:px-12 py-4">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => onNavigate('home')}
          className="text-left font-serif text-2xl lg:text-3xl tracking-tight text-[#231F1E] hover:text-[#92542B] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
        >
          VÈLÔURÁ
        </button>

        {/* Zone 2: 4-5 clean single-line text navigation links */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-[#5F5651]">
          <button
            onClick={() => onNavigate('home')}
            className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer hover:text-[#231F1E] ${
              activeView === 'home' ? 'text-[#92542B] font-semibold' : ''
            }`}
          >
            Collections
          </button>
          <button
            onClick={() => onNavigate('catalog', 'signature-cakes')}
            className="transition-colors whitespace-nowrap shrink-0 cursor-pointer hover:text-[#231F1E]"
          >
            Signature Cakes
          </button>
          <button
            onClick={() => onNavigate('catalog', 'viennoiserie')}
            className="transition-colors whitespace-nowrap shrink-0 cursor-pointer hover:text-[#231F1E]"
          >
            Viennoiserie
          </button>
          <button
            onClick={() => onNavigate('builder')}
            className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer hover:text-[#231F1E] ${
              activeView === 'builder' ? 'text-[#92542B] font-semibold' : ''
            }`}
          >
            Custom Studio
          </button>
          <a
            href="#craftsmanship"
            onClick={goToCraft}
            className="transition-colors whitespace-nowrap shrink-0 hover:text-[#231F1E]"
          >
            Our Craft
          </a>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onOpenCart}
            className="flex items-center gap-2 sm:gap-2.5 px-3 sm:px-4 py-2 text-xs font-semibold text-white bg-[#231F1E] rounded-md hover:bg-[#3D3532] active:scale-[0.98] transition-all cursor-pointer whitespace-nowrap shrink-0"
            aria-label="View shopping bag"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Bag</span>
            <span className="font-mono tabular-nums text-[#D8C7B4]">
              ({totalItemCount})
            </span>
            {totalItemCount > 0 && (
              <>
                <span className="hidden sm:inline text-[#88786B]">·</span>
                <span className="hidden sm:inline font-mono tabular-nums text-white">${totalAmount.toFixed(2)}</span>
              </>
            )}
          </button>
          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            className="lg:hidden p-2 rounded-md text-[#231F1E] hover:bg-[#F1EAE0] cursor-pointer"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="lg:hidden border-t border-[#ECE3D5] bg-[#FAF8F5] px-6 py-3 flex flex-col text-sm font-medium text-[#231F1E]" aria-label="Menu">
          <button onClick={() => go('home')} className="text-left py-3 border-b border-[#F1EAE0] cursor-pointer">Collections</button>
          <button onClick={() => go('catalog', 'signature-cakes')} className="text-left py-3 border-b border-[#F1EAE0] cursor-pointer">Signature Cakes</button>
          <button onClick={() => go('catalog', 'viennoiserie')} className="text-left py-3 border-b border-[#F1EAE0] cursor-pointer">Viennoiserie</button>
          <button onClick={() => go('builder')} className="text-left py-3 border-b border-[#F1EAE0] cursor-pointer">Custom Studio</button>
          <a href="#craftsmanship" onClick={goToCraft} className="py-3">Our Craft</a>
        </nav>
      )}
    </header>
  );
};
