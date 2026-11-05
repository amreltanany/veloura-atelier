import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { CartItem } from '../types/bakery';

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
  const totalItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalAmount = cart.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#ECE3D5] transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-6 lg:px-12 py-4">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => onNavigate('home')}
          className="text-left font-serif text-2xl lg:text-3xl tracking-tight text-[#231F1E] hover:text-[#92542B] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
        >
          Atelier Farine
        </button>

        {/* Zone 2: 4-5 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#5F5651]">
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
            className="transition-colors whitespace-nowrap shrink-0 hover:text-[#231F1E]"
          >
            Our Craft
          </a>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenCart}
            className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-white bg-[#231F1E] rounded-md hover:bg-[#3D3532] active:scale-[0.98] transition-all cursor-pointer whitespace-nowrap shrink-0"
            aria-label="View shopping bag"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Bag</span>
            <span className="font-mono tabular-nums text-[#D8C7B4]">
              ({totalItemCount})
            </span>
            {totalItemCount > 0 && (
              <>
                <span className="text-[#88786B]">·</span>
                <span className="font-mono tabular-nums text-white">${totalAmount.toFixed(2)}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
