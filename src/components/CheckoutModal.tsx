import React, { useState } from 'react';
import {
  X,
  Check,
  ShieldCheck,
  Truck,
  Store,
  Calendar,
  Clock,
  CreditCard,
  Lock,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { CartItem, CustomerDetails, DeliverySlot, Order } from '../types/bakery';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onOrderComplete: (order: Order) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cart,
  onOrderComplete,
}) => {
  if (!isOpen || cart.length === 0) return null;

  // Checkout Steps: 1. Fulfillment -> 2. Recipient -> 3. Payment
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Delivery / Pickup details
  const [fulfillmentType, setFulfillmentType] = useState<'delivery' | 'pickup'>('delivery');
  const [selectedDate, setSelectedDate] = useState<string>(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [selectedTimeWindow, setSelectedTimeWindow] = useState<string>('9:00 AM – 12:00 PM (Morning Fresh)');

  // Customer contact & shipping
  const [fullName, setFullName] = useState('Claire Dubois');
  const [email, setEmail] = useState('claire.dubois@example.com');
  const [phone, setPhone] = useState('+1 (555) 234-8971');
  const [address, setAddress] = useState('742 Evergreen Terrace');
  const [suite, setSuite] = useState('Apt 4B');
  const [city, setCity] = useState('New York');
  const [postalCode, setPostalCode] = useState('10012');
  const [deliveryNotes, setDeliveryNotes] = useState('Please leave with concierge / doorman.');
  const [giftMessage, setGiftMessage] = useState('Wishing you a celebration as sweet as this confection! With love.');

  // Payment
  const [paymentMethod, setPaymentMethod] = useState<'express-apple-pay' | 'card' | 'pickup-cash'>('card');
  const [cardNumber, setCardNumber] = useState('•••• •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('08/28');
  const [cardCvc, setCardCvc] = useState('883');

  // Pricing
  const subtotal = cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const isFreeDelivery = subtotal >= 75 || fulfillmentType === 'pickup';
  const deliveryFee = isFreeDelivery ? 0 : 9.5;
  const tax = Number((subtotal * 0.08875).toFixed(2));
  const finalTotal = subtotal + deliveryFee + tax;

  const handleSubmitOrder = (overrideMethod?: 'express-apple-pay') => {
    setIsSubmitting(true);

    setTimeout(() => {
      const orderId = `AF-${Math.floor(100000 + Math.random() * 900000)}`;
      const deliverySlot: DeliverySlot = {
        date: selectedDate,
        timeWindow: selectedTimeWindow,
        type: fulfillmentType,
      };

      const customer: CustomerDetails = {
        fullName,
        email,
        phone,
        address,
        suite,
        city,
        postalCode,
        deliveryNotes,
        giftMessage,
        paymentMethod: overrideMethod || paymentMethod,
      };

      const newOrder: Order = {
        id: orderId,
        createdAt: new Date().toISOString(),
        items: [...cart],
        subtotal,
        deliveryFee,
        tax,
        total: finalTotal,
        deliverySlot,
        customer,
        status: 'confirmed',
      };

      setIsSubmitting(false);
      onOrderComplete(newOrder);
    }, 850);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-[#EDE4D6] overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="px-6 py-4 border-b border-[#EDE4D6] bg-[#FAF8F5] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-serif text-lg font-bold text-[#231F1E]">
              Seamless Checkout
            </span>
            <span className="text-xs text-[#8A7E75] hidden sm:inline">
              · 256-Bit SSL Encrypted
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[#7A6F68] hover:text-[#231F1E] rounded-md transition-colors cursor-pointer"
            aria-label="Close checkout"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progression Bar */}
        <div className="grid grid-cols-3 border-b border-[#EDE4D6] bg-[#FAF7F2] text-xs">
          {[
            { num: 1, label: '1. Fulfillment & Time' },
            { num: 2, label: '2. Recipient & Card Note' },
            { num: 3, label: '3. Payment & Review' },
          ].map((s) => (
            <button
              key={s.num}
              type="button"
              onClick={() => setStep(s.num as any)}
              className={`py-3 px-2 text-center font-medium transition-colors cursor-pointer ${
                step === s.num
                  ? 'border-b-2 border-[#92542B] text-[#92542B] font-semibold bg-white'
                  : step > s.num
                  ? 'text-[#2F7E4D]'
                  : 'text-[#8A7E75]'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 max-h-[80vh] overflow-y-auto">
          {/* Main Checkout Form Left Column */}
          <div className="lg:col-span-7 p-6 sm:p-8 space-y-6">
            {/* Express Checkout Button at Top */}
            <div className="p-4 rounded-xl bg-[#FAF6F0] border border-[#E8DEC\-D] border-[#E8DEC8] space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#7D4520]">
                <span>Instant Express Checkout</span>
                <span className="text-[11px] font-normal lowercase text-[#8A7E75]">1-tap authorization</span>
              </div>
              <button
                type="button"
                disabled={isSubmitting}
                onClick={() => handleSubmitOrder('express-apple-pay')}
                className="w-full py-3 bg-[#111] hover:bg-black text-white text-xs font-semibold rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs active:scale-[0.99]"
              >
                <span>Pay with</span>
                <span className="font-bold text-sm tracking-tight"> Pay</span>
                <span className="text-white/60">/ Google Pay</span>
                <span className="text-white/40">·</span>
                <span className="font-mono tabular-nums">${finalTotal.toFixed(2)}</span>
              </button>
            </div>

            {/* STEP 1: Fulfillment & Schedule */}
            {step === 1 && (
              <div className="space-y-6 animate-in fade-in duration-150">
                <div className="space-y-1">
                  <h3 className="font-serif text-lg font-semibold text-[#231F1E]">
                    Choose Fulfillment Mode
                  </h3>
                  <p className="text-xs text-[#7A6F68]">
                    We bake fresh in the early morning for your specified arrival slot.
                  </p>
                </div>

                {/* Delivery vs Pickup Radio Cards */}
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setFulfillmentType('delivery')}
                    className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                      fulfillmentType === 'delivery'
                        ? 'border-[#92542B] bg-[#FAF5EE] ring-1 ring-[#92542B]'
                        : 'border-[#EDE4D6] hover:border-[#D8C7B4]'
                    }`}
                  >
                    <div className="flex items-center gap-2 text-sm font-semibold text-[#231F1E]">
                      <Truck className="w-4 h-4 text-[#92542B]" />
                      <span>Chilled Courier</span>
                    </div>
                    <p className="text-[11px] text-[#7A6F68] mt-1 leading-normal">
                      Delivered in temperature-controlled insulated eco-boxes directly to your door.
                    </p>
                    <span className="inline-block mt-2 text-xs font-mono font-medium text-[#92542B]">
                      {subtotal >= 75 ? 'Free Delivery' : '$9.50 fee'}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFulfillmentType('pickup')}
                    className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                      fulfillmentType === 'pickup'
                        ? 'border-[#92542B] bg-[#FAF5EE] ring-1 ring-[#92542B]'
                        : 'border-[#EDE4D6] hover:border-[#D8C7B4]'
                    }`}
                  >
                    <div className="flex items-center gap-2 text-sm font-semibold text-[#231F1E]">
                      <Store className="w-4 h-4 text-[#92542B]" />
                      <span>Atelier Pickup</span>
                    </div>
                    <p className="text-[11px] text-[#7A6F68] mt-1 leading-normal">
                      Collect freshly boxed from our Paris Atelier counter (14 Rue de Bretagne).
                    </p>
                    <span className="inline-block mt-2 text-xs font-mono font-medium text-[#2F7E4D]">
                      Free Pickup
                    </span>
                  </button>
                </div>

                {/* Date & Time Slot */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-[#7A6F68] flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#92542B]" />
                      <span>Preparation Date</span>
                    </label>
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-[#EDE4D6] focus:border-[#92542B] focus:outline-none bg-white"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-[#7A6F68] flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#92542B]" />
                      <span>Arrival Window</span>
                    </label>
                    <select
                      value={selectedTimeWindow}
                      onChange={(e) => setSelectedTimeWindow(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-[#EDE4D6] focus:border-[#92542B] focus:outline-none bg-white"
                    >
                      <option value="9:00 AM – 12:00 PM (Morning Fresh)">
                        9:00 AM – 12:00 PM (Morning Fresh)
                      </option>
                      <option value="1:00 PM – 4:00 PM (Afternoon)">
                        1:00 PM – 4:00 PM (Afternoon)
                      </option>
                      <option value="5:00 PM – 8:00 PM (Evening Celebration)">
                        5:00 PM – 8:00 PM (Evening Celebration)
                      </option>
                    </select>
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="flex items-center gap-2 px-6 py-2.5 bg-[#231F1E] text-white text-xs font-semibold rounded-lg hover:bg-[#3D3532] transition-colors cursor-pointer"
                  >
                    <span>Continue to Recipient Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: Recipient, Shipping & Gift Note */}
            {step === 2 && (
              <div className="space-y-5 animate-in fade-in duration-150">
                <div className="space-y-1">
                  <h3 className="font-serif text-lg font-semibold text-[#231F1E]">
                    Recipient & Delivery Address
                  </h3>
                  <p className="text-xs text-[#7A6F68]">
                    We will send SMS tracking updates upon baker dispatch.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-[#7A6F68] uppercase">Full Name</label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-[#EDE4D6] focus:border-[#92542B] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-[#7A6F68] uppercase">Phone Number</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-[#EDE4D6] focus:border-[#92542B] focus:outline-none"
                    />
                  </div>

                  <div className="sm:col-span-2 space-y-1">
                    <label className="text-[11px] font-semibold text-[#7A6F68] uppercase">Email Receipt</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-[#EDE4D6] focus:border-[#92542B] focus:outline-none"
                    />
                  </div>

                  {fulfillmentType === 'delivery' && (
                    <>
                      <div className="sm:col-span-2 space-y-1">
                        <label className="text-[11px] font-semibold text-[#7A6F68] uppercase">Street Address</label>
                        <input
                          type="text"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          className="w-full px-3 py-2 text-xs rounded-lg border border-[#EDE4D6] focus:border-[#92542B] focus:outline-none"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold text-[#7A6F68] uppercase">Apt / Suite / Floor</label>
                        <input
                          type="text"
                          value={suite}
                          onChange={(e) => setSuite(e.target.value)}
                          className="w-full px-3 py-2 text-xs rounded-lg border border-[#EDE4D6] focus:border-[#92542B] focus:outline-none"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold text-[#7A6F68] uppercase">Postal Code</label>
                        <input
                          type="text"
                          value={postalCode}
                          onChange={(e) => setPostalCode(e.target.value)}
                          className="w-full px-3 py-2 text-xs rounded-lg border border-[#EDE4D6] focus:border-[#92542B] focus:outline-none"
                        />
                      </div>
                    </>
                  )}
                </div>

                {/* Handwritten Letterpress Gift Card */}
                <div className="pt-2 border-t border-[#EDE4D6] space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold uppercase tracking-wider text-[#7A6F68]">
                      Letterpress Gift Card Message (Complimentary)
                    </label>
                    <span className="text-[11px] text-[#8A7E75]">Embossed gold foil</span>
                  </div>
                  <textarea
                    rows={2}
                    value={giftMessage}
                    onChange={(e) => setGiftMessage(e.target.value)}
                    placeholder="Write a heartfelt note to accompany the cake..."
                    className="w-full p-2.5 text-xs rounded-lg border border-[#EDE4D6] focus:border-[#92542B] focus:outline-none"
                  />
                </div>

                <div className="pt-4 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-xs text-[#7A6F68] hover:text-[#231F1E] font-medium cursor-pointer"
                  >
                    Back to Fulfillment
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="flex items-center gap-2 px-6 py-2.5 bg-[#231F1E] text-white text-xs font-semibold rounded-lg hover:bg-[#3D3532] transition-colors cursor-pointer"
                  >
                    <span>Proceed to Payment</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Payment & Authorization */}
            {step === 3 && (
              <div className="space-y-6 animate-in fade-in duration-150">
                <div className="space-y-1">
                  <h3 className="font-serif text-lg font-semibold text-[#231F1E]">
                    Secure Payment Authorization
                  </h3>
                  <p className="text-xs text-[#7A6F68]">
                    No immediate charge until the baking schedule is confirmed.
                  </p>
                </div>

                {/* Method selector */}
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3 rounded-lg border text-left text-xs transition-all cursor-pointer flex items-center gap-2.5 ${
                      paymentMethod === 'card'
                        ? 'border-[#92542B] bg-[#FAF5EE] font-semibold text-[#231F1E]'
                        : 'border-[#EDE4D6] text-[#5F5651]'
                    }`}
                  >
                    <CreditCard className="w-4 h-4 text-[#92542B]" />
                    <span>Credit / Debit Card</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('pickup-cash')}
                    className={`p-3 rounded-lg border text-left text-xs transition-all cursor-pointer flex items-center gap-2.5 ${
                      paymentMethod === 'pickup-cash'
                        ? 'border-[#92542B] bg-[#FAF5EE] font-semibold text-[#231F1E]'
                        : 'border-[#EDE4D6] text-[#5F5651]'
                    }`}
                  >
                    <Store className="w-4 h-4 text-[#92542B]" />
                    <span>Pay at Atelier Pick-up</span>
                  </button>
                </div>

                {paymentMethod === 'card' && (
                  <div className="p-4 rounded-xl border border-[#EDE4D6] bg-[#FAF8F5] space-y-3">
                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold text-[#7A6F68] uppercase">Card Number</label>
                      <div className="relative">
                        <input
                          type="text"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          className="w-full px-3 py-2 text-xs rounded-lg border border-[#EDE4D6] focus:border-[#92542B] focus:outline-none bg-white font-mono"
                        />
                        <Lock className="w-3.5 h-3.5 text-[#92542B] absolute right-3 top-2.5" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold text-[#7A6F68] uppercase">Expiry</label>
                        <input
                          type="text"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          className="w-full px-3 py-2 text-xs rounded-lg border border-[#EDE4D6] focus:border-[#92542B] focus:outline-none bg-white font-mono"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold text-[#7A6F68] uppercase">CVC</label>
                        <input
                          type="text"
                          value={cardCvc}
                          onChange={(e) => setCardCvc(e.target.value)}
                          className="w-full px-3 py-2 text-xs rounded-lg border border-[#EDE4D6] focus:border-[#92542B] focus:outline-none bg-white font-mono"
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div className="pt-2 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="text-xs text-[#7A6F68] hover:text-[#231F1E] font-medium cursor-pointer"
                  >
                    Back to Recipient
                  </button>
                  <button
                    type="button"
                    disabled={isSubmitting}
                    onClick={() => handleSubmitOrder()}
                    className="flex items-center gap-2 px-8 py-3 bg-[#92542B] hover:bg-[#7D4520] active:scale-[0.99] text-white text-sm font-semibold rounded-lg shadow-sm transition-all cursor-pointer whitespace-nowrap"
                  >
                    {isSubmitting ? (
                      <span>Reserving Bakery Slot...</span>
                    ) : (
                      <>
                        <ShieldCheck className="w-4 h-4 text-[#F3D6B5]" />
                        <span>Authorize & Place Order</span>
                        <span className="text-[#F3D6B5]">·</span>
                        <span className="font-mono tabular-nums font-bold">
                          ${finalTotal.toFixed(2)}
                        </span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Order Summary & Review */}
          <div className="lg:col-span-5 bg-[#FAF7F2] p-6 sm:p-8 border-t lg:border-t-0 lg:border-l border-[#EDE4D6] flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-[#EDE4D6] pb-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#92542B]">
                  Order Summary
                </span>
                <span className="text-xs text-[#7A6F68] font-mono tabular-nums">
                  {cart.length} item{cart.length > 1 ? 's' : ''}
                </span>
              </div>

              {/* Items overview */}
              <div className="space-y-3 max-h-60 overflow-y-auto pr-1 divide-y divide-[#EDE4D6]">
                {cart.map((item) => (
                  <div key={item.cartItemId} className="pt-3 first:pt-0 flex items-start gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      className="w-12 h-12 rounded object-cover border border-[#EDE4D6] shrink-0"
                    />
                    <div className="flex-1 text-xs">
                      <div className="font-semibold text-[#231F1E] leading-snug">{item.name}</div>
                      <div className="text-[11px] text-[#7A6F68]">
                        Qty: {item.quantity} · {item.selectedSize || 'Standard'}
                      </div>
                      {item.inscription && (
                        <div className="text-[10px] italic text-[#7D4520]">
                          &ldquo;{item.inscription}&rdquo;
                        </div>
                      )}
                    </div>
                    <span className="font-mono tabular-nums text-xs font-medium text-[#231F1E]">
                      ${(item.unitPrice * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Delivery Window Summary */}
              <div className="p-3 rounded-lg bg-white border border-[#EDE4D6] text-xs space-y-1">
                <div className="flex items-center gap-1.5 text-[#92542B] font-semibold">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Scheduled {fulfillmentType === 'delivery' ? 'Delivery' : 'Pickup'}</span>
                </div>
                <div className="text-[#231F1E] font-medium">{selectedDate}</div>
                <div className="text-[11px] text-[#7A6F68]">{selectedTimeWindow}</div>
              </div>
            </div>

            {/* Price Calculations */}
            <div className="pt-4 border-t border-[#EDE4D6] space-y-2 text-xs">
              <div className="flex justify-between text-[#5F5651]">
                <span>Items Subtotal</span>
                <span className="font-mono tabular-nums font-medium text-[#231F1E]">
                  ${subtotal.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-[#5F5651]">
                <span>Courier Service Fee</span>
                <span className="font-mono tabular-nums font-medium text-[#231F1E]">
                  {deliveryFee === 0 ? (
                    <span className="text-[#2F7E4D] font-semibold">Complimentary</span>
                  ) : (
                    `$${deliveryFee.toFixed(2)}`
                  )}
                </span>
              </div>
              <div className="flex justify-between text-[#5F5651]">
                <span>State & Local Tax (NYC 8.875%)</span>
                <span className="font-mono tabular-nums font-medium text-[#231F1E]">
                  ${tax.toFixed(2)}
                </span>
              </div>
              <div className="pt-2 border-t border-[#EDE4D6] flex justify-between text-base font-bold text-[#231F1E]">
                <span>Total Amount Due</span>
                <span className="font-mono tabular-nums text-xl text-[#92542B]">
                  ${finalTotal.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
