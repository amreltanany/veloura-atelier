import React, { useState } from 'react';
import { X, Check, Flame, Wheat, Clock, HeartHandshake, Sparkles } from 'lucide-react';
import { Product, CartItem } from '../types/bakery';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (item: CartItem) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  if (!product) return null;

  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0);
  const [sweetnessLevel, setSweetnessLevel] = useState<'100%' | '75%' | '50%'>('75%');
  const [dietaryOption, setDietaryOption] = useState<'standard' | 'gluten-free'>('standard');
  const [inscription, setInscription] = useState('');
  const [candlesCount, setCandlesCount] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const currentSize = product.availableSizes
    ? product.availableSizes[selectedSizeIndex]
    : { label: 'Standard', servings: product.servings, priceMultiplier: 1 };

  const dietarySurcharge = dietaryOption === 'gluten-free' ? 6 : 0;
  const candleSurcharge = candlesCount > 0 ? (candlesCount === 1 ? 2 : candlesCount === 5 ? 4 : 6) : 0;
  const calculatedUnitPrice = product.price * currentSize.priceMultiplier + dietarySurcharge + candleSurcharge;
  const totalPrice = calculatedUnitPrice * quantity;

  const handleAddToCart = () => {
    const cartItem: CartItem = {
      cartItemId: `${product.id}-${Date.now()}`,
      productId: product.id,
      name: product.name,
      frenchName: product.frenchName,
      image: product.image,
      unitPrice: calculatedUnitPrice,
      quantity,
      selectedSize: currentSize.label,
      sweetnessLevel,
      inscription: inscription.trim() || undefined,
      candlesCount,
      dietaryOption: dietaryOption !== 'standard' ? 'Gluten-Free Flour' : 'Standard Recipe',
      isCustomRecipe: false,
    };
    onAddToCart(cartItem);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-[#EDE4D6] overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 text-[#7A6F68] hover:text-[#231F1E] bg-white/80 hover:bg-white rounded-full transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 max-h-[90vh] overflow-y-auto">
          {/* Left Column: Image & Tasting Notes */}
          <div className="md:col-span-5 bg-[#FAF7F2] p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#ECE3D5]">
            <div className="space-y-4">
              <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-[#F3ECE1] shadow-xs">
                <img
                  src={product.image}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-2">
                <p className="font-serif italic text-sm text-[#7D4520]">
                  {product.frenchName}
                </p>
                <p className="text-xs text-[#5F5651] leading-relaxed">
                  {product.description}
                </p>
              </div>
            </div>

            {/* Flavor & Allergen Profile */}
            <div className="pt-6 border-t border-[#ECE3D5] space-y-3 mt-6">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-[#8A7E75]">
                  Flavor Notes
                </p>
                <div className="flex flex-wrap gap-1.5 mt-1 text-xs text-[#5F5651]">
                  {product.flavorNotes.map((note, idx) => (
                    <span key={idx}>
                      {note}
                      {idx < product.flavorNotes.length - 1 ? ' ·' : ''}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-[#8A7E75]">
                  Allergens & Dietary
                </p>
                <p className="text-xs text-[#7A6F68] mt-0.5">
                  {product.allergens.join(', ')}
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs text-[#92542B] pt-1">
                <Clock className="w-3.5 h-3.5" />
                <span>{product.prepTime}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Customization Controls */}
          <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs text-[#8A7E75]">
                  <span className="uppercase tracking-wider font-medium text-[#92542B]">
                    Recipe Customization
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{currentSize.servings}</span>
                </div>
                <h2 className="font-serif text-2xl font-bold text-[#231F1E]">
                  {product.name}
                </h2>
              </div>

              {/* 1. Size / Portion Selector */}
              {product.availableSizes && product.availableSizes.length > 1 && (
                <div className="mt-6 space-y-2">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#7A6F68]">
                    Select Size & Servings
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {product.availableSizes.map((size, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setSelectedSizeIndex(idx)}
                        className={`text-left p-2.5 rounded-lg border text-xs transition-all cursor-pointer ${
                          selectedSizeIndex === idx
                            ? 'border-[#92542B] bg-[#FAF5EE] text-[#231F1E] font-medium'
                            : 'border-[#EDE4D6] hover:border-[#D8C7B4] text-[#5F5651]'
                        }`}
                      >
                        <div className="font-semibold text-sm">{size.label}</div>
                        <div className="text-[11px] text-[#8A7E75]">{size.servings}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* 2. Sweetness Calibration */}
              <div className="mt-6 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#7A6F68]">
                    Sweetness Level Calibration
                  </label>
                  <span className="text-xs font-mono font-medium text-[#92542B]">
                    {sweetnessLevel}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { label: 'Classic (100%)', val: '100%' as const, desc: 'Authentic French recipe' },
                    { label: 'Subtle (75%)', val: '75%' as const, desc: 'Balanced & less sweet' },
                    { label: 'Delicate (50%)', val: '50%' as const, desc: 'Fruit & tea forward' },
                  ].map((option) => (
                    <button
                      key={option.val}
                      type="button"
                      onClick={() => setSweetnessLevel(option.val)}
                      className={`p-2 rounded-lg border text-left text-xs transition-all cursor-pointer ${
                        sweetnessLevel === option.val
                          ? 'border-[#92542B] bg-[#FAF5EE] text-[#231F1E] font-semibold'
                          : 'border-[#EDE4D6] hover:border-[#D8C7B4] text-[#5F5651]'
                      }`}
                    >
                      <div>{option.label}</div>
                      <div className="text-[10px] text-[#8A7E75] font-normal leading-tight mt-0.5">
                        {option.desc}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Inscription Plaque */}
              <div className="mt-6 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#7A6F68]">
                    Piped Plaque Message (Complimentary)
                  </label>
                  <span className="text-[11px] text-[#8A7E75]">Max 32 chars</span>
                </div>
                <input
                  type="text"
                  maxLength={32}
                  placeholder="e.g., Joyeux Anniversaire Claire!"
                  value={inscription}
                  onChange={(e) => setInscription(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm rounded-lg border border-[#EDE4D6] focus:border-[#92542B] focus:outline-none transition-colors"
                />
              </div>

              {/* 4. Luxury Beeswax Candles */}
              <div className="mt-6 space-y-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#7A6F68]">
                  Celebration Candles
                </label>
                <div className="flex items-center gap-2">
                  {[
                    { count: 0, label: 'None' },
                    { count: 1, label: '1 Gold Taper (+$2)' },
                    { count: 5, label: 'Set of 5 (+$4)' },
                    { count: 10, label: 'Set of 10 (+$6)' },
                  ].map((opt) => (
                    <button
                      key={opt.count}
                      type="button"
                      onClick={() => setCandlesCount(opt.count)}
                      className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-all cursor-pointer ${
                        candlesCount === opt.count
                          ? 'border-[#92542B] bg-[#FAF5EE] text-[#92542B]'
                          : 'border-[#EDE4D6] text-[#5F5651] hover:border-[#D8C7B4]'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Actions: Quantity & Add to Bag */}
            <div className="pt-6 border-t border-[#ECE3D5] flex items-center justify-between gap-4">
              <div className="flex items-center border border-[#EDE4D6] rounded-lg overflow-hidden bg-[#FAF8F5]">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 text-sm font-semibold text-[#5F5651] hover:text-[#231F1E] hover:bg-[#F1EAE0] transition-colors cursor-pointer"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="px-3 py-2 text-sm font-mono font-medium text-[#231F1E] tabular-nums min-w-[32px] text-center">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 text-sm font-semibold text-[#5F5651] hover:text-[#231F1E] hover:bg-[#F1EAE0] transition-colors cursor-pointer"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              <button
                type="button"
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-[#92542B] hover:bg-[#7D4520] active:scale-[0.99] rounded-lg transition-all shadow-sm cursor-pointer whitespace-nowrap"
              >
                <span>Add Customized Cake</span>
                <span className="text-[#F3D6B5]">·</span>
                <span className="font-mono tabular-nums font-bold">
                  ${totalPrice.toFixed(2)}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
