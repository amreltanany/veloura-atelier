import React, { useState } from 'react';
import {
  CheckCircle2,
  Calendar,
  Clock,
  MapPin,
  Sparkles,
  Printer,
  ChevronRight,
  Flame,
  ChefHat,
  Truck,
  Heart,
  Store,
} from 'lucide-react';
import { Order } from '../types/bakery';

interface OrderConfirmationModalProps {
  order: Order | null;
  onClose: () => void;
  onContinueShopping: () => void;
}

export const OrderConfirmationModal: React.FC<OrderConfirmationModalProps> = ({
  order,
  onClose,
  onContinueShopping,
}) => {
  if (!order) return null;

  const [currentStage, setCurrentStage] = useState<number>(0);

  const stages = [
    {
      title: 'Order Confirmed',
      desc: 'Recipe and slot reserved in our morning baking schedule.',
      icon: CheckCircle2,
      time: 'Just now',
    },
    {
      title: 'Baking & Gentle Chilling',
      desc: 'Sponges baked with AOP French butter and slow-chilled for crumb structure.',
      icon: Flame,
      time: 'In progress',
    },
    {
      title: 'Artisan Decorating & Piping',
      desc: 'Swiss meringue smoothing, gold leaf leafing, and handwritten inscription plaque.',
      icon: ChefHat,
      time: 'Upcoming',
    },
    {
      title: order.deliverySlot.type === 'delivery' ? 'Handed to Courier' : 'Ready at Boutique',
      desc:
        order.deliverySlot.type === 'delivery'
          ? 'Insulated cold-courier delivery with temperature guarantee.'
          : 'Safely boxed at 14 Rue de Bretagne, Paris.',
      icon: order.deliverySlot.type === 'delivery' ? Truck : Store,
      time: order.deliverySlot.timeWindow,
    },
  ];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-[#EDE4D6] overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Banner with Success Notice */}
        <div className="bg-[#FAF5EE] p-8 text-center border-b border-[#ECE3D5] space-y-2">
          <div className="w-12 h-12 rounded-full bg-[#92542B] text-white flex items-center justify-center mx-auto shadow-sm">
            <CheckCircle2 className="w-6 h-6 text-[#F3D6B5]" />
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#231F1E]">
            Merci! Your Order is Confirmed
          </h2>

          <div className="flex items-center justify-center gap-2 text-xs text-[#7A6F68]">
            <span>Order Reference:</span>
            <span className="font-mono font-bold text-[#92542B] tracking-wide">
              {order.id}
            </span>
            <span aria-hidden="true">·</span>
            <span>A confirmation receipt was sent to {order.customer.email}</span>
          </div>
        </div>

        {/* Live Baking & Fulfillment Tracker */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#92542B]">
                Live Atelier Progress
              </span>
              <button
                type="button"
                onClick={() => setCurrentStage((prev) => (prev + 1) % stages.length)}
                className="text-[11px] text-[#7A6F68] hover:text-[#92542B] underline cursor-pointer"
              >
                Simulate next status
              </button>
            </div>

            <div className="space-y-3 relative pl-4 border-l-2 border-[#ECE3D5]">
              {stages.map((stage, idx) => {
                const Icon = stage.icon;
                const isCurrent = idx === currentStage;
                const isCompleted = idx < currentStage;

                return (
                  <div key={idx} className="relative flex items-start gap-3.5">
                    {/* Step Marker */}
                    <div
                      className={`absolute -left-[23px] top-0.5 w-4 h-4 rounded-full flex items-center justify-center text-[10px] transition-colors ${
                        isCompleted
                          ? 'bg-[#2F7E4D] text-white'
                          : isCurrent
                          ? 'bg-[#92542B] text-white ring-4 ring-[#FAF5EE]'
                          : 'bg-[#E5DCD0] text-[#7A6F68]'
                      }`}
                    >
                      {isCompleted ? '✓' : idx + 1}
                    </div>

                    <div className="flex-1 space-y-0.5">
                      <div className="flex items-center justify-between">
                        <span
                          className={`text-xs font-semibold ${
                            isCurrent
                              ? 'text-[#92542B]'
                              : isCompleted
                              ? 'text-[#231F1E]'
                              : 'text-[#8A7E75]'
                          }`}
                        >
                          {stage.title}
                        </span>
                        <span className="text-[11px] font-mono text-[#8A7E75]">{stage.time}</span>
                      </div>
                      <p className="text-[11px] text-[#7A6F68] leading-tight">{stage.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Fulfillment Schedule Details Card */}
          <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#EDE4D6] grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#8A7E75] block">
                {order.deliverySlot.type === 'delivery' ? 'Delivery Address' : 'Pick-up Location'}
              </span>
              <p className="font-semibold text-[#231F1E]">{order.customer.fullName}</p>
              {order.deliverySlot.type === 'delivery' ? (
                <p className="text-[#5F5651]">
                  {order.customer.address} {order.customer.suite}, {order.customer.postalCode}
                </p>
              ) : (
                <p className="text-[#5F5651]">VÈLÔURÁ Boutique, 14 Rue de Bretagne</p>
              )}
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#8A7E75] block">
                Scheduled Arrival Window
              </span>
              <p className="font-semibold text-[#231F1E]">{order.deliverySlot.date}</p>
              <p className="text-[#5F5651]">{order.deliverySlot.timeWindow}</p>
            </div>
          </div>

          {/* Embossed Card Message if present */}
          {order.customer.giftMessage && (
            <div className="p-4 rounded-xl bg-[#FAF5EE] border border-[#E8DEC8] space-y-1">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[#7D4520] block">
                Embossed Gift Note Enclosed
              </span>
              <p className="font-serif italic text-xs text-[#231F1E]">
                &ldquo;{order.customer.giftMessage}&rdquo;
              </p>
            </div>
          )}

          {/* Itemized Order Breakdown */}
          <div className="space-y-2 border-t border-[#EDE4D6] pt-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#8A7E75] block">
              Items Prepared
            </span>
            <div className="space-y-2 divide-y divide-[#EDE4D6]">
              {order.items.map((item) => (
                <div key={item.cartItemId} className="pt-2 flex justify-between text-xs">
                  <div>
                    <span className="font-semibold text-[#231F1E]">{item.name}</span>
                    <span className="text-[#8A7E75] ml-1.5 font-mono">x{item.quantity}</span>
                    {item.inscription && (
                      <div className="text-[11px] italic text-[#7D4520]">
                        Plaque: &ldquo;{item.inscription}&rdquo;
                      </div>
                    )}
                  </div>
                  <span className="font-mono tabular-nums text-[#231F1E]">
                    ${(item.unitPrice * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-[#EDE4D6] flex justify-between text-sm font-bold text-[#231F1E]">
              <span>Total Paid</span>
              <span className="font-mono tabular-nums text-[#92542B]">
                ${order.total.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="p-6 border-t border-[#EDE4D6] bg-[#FAF8F5] flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-[#5F5651] hover:text-[#231F1E] border border-[#EDE4D6] hover:border-[#D8C7B4] rounded-lg transition-colors cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Receipt</span>
          </button>

          <button
            type="button"
            onClick={() => {
              onClose();
              onContinueShopping();
            }}
            className="px-6 py-2.5 bg-[#231F1E] hover:bg-[#3D3532] text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
          >
            Continue Exploring Bakery
          </button>
        </div>
      </div>
    </div>
  );
};
