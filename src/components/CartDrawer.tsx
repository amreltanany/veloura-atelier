import React from 'react';
import { X, Trash2, ArrowRight, ShoppingBag, Truck } from 'lucide-react';
import { CartItem } from '../types/bakery';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (cartItemId: string, newQty: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
}) => {
  if (!isOpen) return null;

  const FREE_DELIVERY_THRESHOLD = 75;
  const subtotal = cart.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
  const remainingForFreeDelivery = Math.max(0, FREE_DELIVERY_THRESHOLD - subtotal);
  const freeDeliveryProgress = Math.min(100, (subtotal / FREE_DELIVERY_THRESHOLD) * 100);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between border-l border-[#EDE4D6] animate-in slide-in-from-right duration-250">
          {/* Header */}
          <div className="p-6 border-b border-[#EDE4D6] flex items-center justify-between bg-[#FAF8F5]">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-[#92542B]" />
              <h2 className="font-serif text-xl font-semibold text-[#231F1E]">
                Shopping Bag
              </h2>
              <span className="text-xs text-[#8A7E75] font-mono tabular-nums">
                ({cart.reduce((sum, item) => sum + item.quantity, 0)} items)
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-[#7A6F68] hover:text-[#231F1E] rounded-md transition-colors cursor-pointer"
              aria-label="Close cart drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Complimentary Chilled Delivery Progress Gauge */}
          <div className="bg-[#FAF5EE] px-6 py-3 border-b border-[#ECE3D5] text-xs">
            <div className="flex items-center justify-between text-[#7D4520] font-medium mb-1.5">
              <div className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5" />
                <span>
                  {remainingForFreeDelivery === 0
                    ? 'Complimentary Chilled Courier unlocked!'
                    : `Add $${remainingForFreeDelivery.toFixed(2)} more for complimentary courier delivery`}
                </span>
              </div>
              <span className="font-mono tabular-nums font-semibold">
                {Math.round(freeDeliveryProgress)}%
              </span>
            </div>
            <div className="w-full bg-[#E8DEC\-D] bg-[#E5DCD0] h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-[#92542B] h-full transition-all duration-300"
                style={{ width: `${freeDeliveryProgress}%` }}
              />
            </div>
          </div>

          {/* Itemized List */}
          <div className="flex-1 overflow-y-auto p-6 divide-y divide-[#EDE4D6]">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-3 py-16">
                <div className="w-14 h-14 rounded-full bg-[#FAF5EE] flex items-center justify-center text-[#92542B]">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-lg font-medium text-[#231F1E]">
                  Your bag is currently empty
                </h3>
                <p className="text-xs text-[#7A6F68] max-w-xs leading-relaxed">
                  Discover our freshly baked signature cakes or formulate a custom recipe in the Atelier Studio.
                </p>
                <button
                  onClick={onClose}
                  className="mt-2 px-5 py-2.5 text-xs font-semibold text-[#231F1E] bg-[#F1EAE0] hover:bg-[#E8DFD3] rounded-md transition-colors cursor-pointer"
                >
                  Explore Bakery Menu
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.cartItemId} className="py-4 first:pt-0 last:pb-0 flex gap-4">
                  {/* Thumbnail */}
                  <div className="w-20 h-20 rounded-lg overflow-hidden bg-[#FAF7F2] shrink-0 border border-[#EDE4D6]">
                    <img
                      src={item.image}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-serif text-sm font-semibold text-[#231F1E] leading-snug">
                          {item.name}
                        </h4>
                        <button
                          type="button"
                          onClick={() => onRemoveItem(item.cartItemId)}
                          className="text-[#A3968B] hover:text-[#92542B] p-1 transition-colors cursor-pointer"
                          aria-label={`Remove ${item.name}`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Customization Tags */}
                      <div className="text-[11px] text-[#7A6F68] space-y-0.5 mt-1">
                        {item.selectedSize && <div>Size: {item.selectedSize}</div>}
                        {item.sweetnessLevel && <div>Sweetness: {item.sweetnessLevel}</div>}
                        {item.dietaryOption && item.dietaryOption !== 'Standard Recipe' && (
                          <div className="text-[#92542B] font-medium">{item.dietaryOption}</div>
                        )}
                        {item.inscription && (
                          <div className="italic text-[#7D4520]">
                            Piped: &ldquo;{item.inscription}&rdquo;
                          </div>
                        )}
                        {item.candlesCount && item.candlesCount > 0 ? (
                          <div>{item.candlesCount} Gold candles included</div>
                        ) : null}
                      </div>
                    </div>

                    {/* Quantity & Unit Price */}
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center border border-[#EDE4D6] rounded bg-[#FAF8F5]">
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.cartItemId, item.quantity - 1)}
                          className="px-2 py-0.5 text-xs text-[#5F5651] hover:text-[#231F1E] cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <span className="px-2 py-0.5 text-xs font-mono font-medium text-[#231F1E] tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.cartItemId, item.quantity + 1)}
                          className="px-2 py-0.5 text-xs text-[#5F5651] hover:text-[#231F1E] cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>

                      <span className="font-mono tabular-nums text-sm font-semibold text-[#231F1E]">
                        ${(item.unitPrice * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Action */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-[#EDE4D6] bg-[#FAF8F5] space-y-4">
              <div className="space-y-1.5 text-xs text-[#5F5651]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono tabular-nums font-medium text-[#231F1E]">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Courier Chilled Delivery</span>
                  <span className="font-mono tabular-nums font-medium text-[#231F1E]">
                    {subtotal >= FREE_DELIVERY_THRESHOLD ? (
                      <span className="text-[#2F7E4D] font-semibold">Complimentary</span>
                    ) : (
                      '$9.50'
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-semibold text-[#231F1E] pt-2 border-t border-[#ECE3D5]">
                  <span>Estimated Total</span>
                  <span className="font-mono tabular-nums text-lg text-[#92542B]">
                    ${(subtotal + (subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : 9.5)).toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  onClose();
                  onProceedToCheckout();
                }}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-6 bg-[#92542B] hover:bg-[#7D4520] active:scale-[0.99] text-white text-sm font-semibold rounded-lg shadow-sm transition-all cursor-pointer whitespace-nowrap"
              >
                <span>Proceed to Seamless Checkout</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>

              <p className="text-[11px] text-center text-[#8A7E75]">
                Select delivery or boutique pickup slot in the next step.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
