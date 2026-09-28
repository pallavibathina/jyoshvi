import React, { useState } from 'react';
import { X, ShieldCheck, CheckCircle2, CreditCard, Truck, ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { CheckoutForm, OrderConfirmation } from '../types/store';

export const CheckoutModal: React.FC = () => {
  const { 
    isCheckoutOpen, 
    setIsCheckoutOpen, 
    cart, 
    cartSubtotal, 
    discountAmount, 
    appliedPromo, 
    freeShippingThreshold, 
    formatPrice, 
    processOrder, 
    lastOrder, 
    clearLastOrder 
  } = useStore();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  const [form, setForm] = useState<CheckoutForm>({
    email: 'client@haute-couture.com',
    firstName: 'Eleanor',
    lastName: 'Vance',
    address: '450 Avenue Montaigne',
    apartment: 'Apt 4B',
    city: 'Paris',
    state: 'Île-de-France',
    postalCode: '75008',
    country: 'France',
    phone: '+33 1 42 68 55 00',
    shippingMethod: 'standard',
    paymentMethod: 'card',
    cardNumber: '4242 •••• •••• 9284',
    cardExpiry: '11/28',
    cardCvc: '842',
  });

  const [confirmedOrder, setConfirmedOrder] = useState<OrderConfirmation | null>(lastOrder);

  if (!isCheckoutOpen) return null;

  const isFreeShip = appliedPromo === 'VIPFREESHIP' || cartSubtotal >= freeShippingThreshold;
  const shippingCost = form.shippingMethod === 'express' ? 25 : (isFreeShip ? 0 : 20);
  const finalTotal = Math.max(0, cartSubtotal - discountAmount + shippingCost);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const confirmation = processOrder(form);
    setConfirmedOrder(confirmation);
    setStep(4);
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    clearLastOrder();
    setStep(1);
    setConfirmedOrder(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={handleClose} 
      />

      <div className="min-h-full flex items-center justify-center p-3 sm:p-6 lg:p-8">
        <div 
          className="relative bg-white w-full max-w-3xl shadow-2xl border border-purple-200 overflow-hidden animate-in fade-in duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="px-6 py-4 border-b border-purple-100 flex items-center justify-between bg-[#FAF9FC]">
            <div className="flex items-center gap-3">
              <span className="font-serif text-xl tracking-widest uppercase font-semibold text-zinc-950">
                Atelier Violette
              </span>
              <span className="text-zinc-300">|</span>
              <span className="text-xs font-semibold uppercase tracking-wider text-purple-900">
                {step === 4 ? 'Order Confirmed' : 'Haute Couture Checkout'}
              </span>
            </div>
            <button
              onClick={handleClose}
              className="p-1.5 text-zinc-400 hover:text-zinc-950 transition-colors"
              aria-label="Close checkout"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Stepper (Steps 1 to 3) */}
          {step < 4 && (
            <div className="px-6 py-3 bg-purple-50/50 border-b border-purple-100 flex justify-center items-center gap-6 text-xs uppercase tracking-wider font-semibold">
              <span className={step >= 1 ? 'text-purple-900' : 'text-zinc-400'}>
                1. Delivery
              </span>
              <span className="text-purple-200">→</span>
              <span className={step >= 2 ? 'text-purple-900' : 'text-zinc-400'}>
                2. Shipping
              </span>
              <span className="text-purple-200">→</span>
              <span className={step >= 3 ? 'text-purple-900' : 'text-zinc-400'}>
                3. Payment
              </span>
            </div>
          )}

          <div className="p-6 sm:p-8">
            {/* Step 1: Delivery Address */}
            {step === 1 && (
              <form onSubmit={(e) => { e.preventDefault(); setStep(2); }} className="space-y-4">
                <h3 className="font-serif text-xl text-zinc-950 font-normal">
                  Contact & Concierge Delivery
                </h3>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2.5 text-sm border border-purple-200 focus:outline-none focus:border-purple-800"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      required
                      value={form.firstName}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2.5 text-sm border border-purple-200 focus:outline-none focus:border-purple-800"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      required
                      value={form.lastName}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2.5 text-sm border border-purple-200 focus:outline-none focus:border-purple-800"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 mb-1">
                    Street Address & Suite
                  </label>
                  <input
                    type="text"
                    name="address"
                    required
                    value={form.address}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2.5 text-sm border border-purple-200 focus:outline-none focus:border-purple-800"
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      required
                      value={form.city}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2.5 text-sm border border-purple-200 focus:outline-none focus:border-purple-800"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 mb-1">
                      Postal Code
                    </label>
                    <input
                      type="text"
                      name="postalCode"
                      required
                      value={form.postalCode}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2.5 text-sm border border-purple-200 focus:outline-none focus:border-purple-800"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 mb-1">
                      Country
                    </label>
                    <input
                      type="text"
                      name="country"
                      required
                      value={form.country}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2.5 text-sm border border-purple-200 focus:outline-none focus:border-purple-800"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 mb-1">
                    Phone for Courier Updates
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={form.phone}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2.5 text-sm border border-purple-200 focus:outline-none focus:border-purple-800"
                  />
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    type="submit"
                    className="px-8 py-3.5 bg-purple-900 hover:bg-purple-950 text-white text-xs font-semibold tracking-widest uppercase transition-colors flex items-center gap-2 cursor-pointer shadow-md"
                  >
                    <span>Continue to Shipping</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}

            {/* Step 2: Shipping Options */}
            {step === 2 && (
              <div className="space-y-6">
                <h3 className="font-serif text-xl text-zinc-950 font-normal">
                  Select Courier Method
                </h3>

                <div className="space-y-3">
                  <label 
                    onClick={() => setForm(prev => ({ ...prev, shippingMethod: 'standard' }))}
                    className={`block p-4 border cursor-pointer transition-all ${
                      form.shippingMethod === 'standard' 
                        ? 'border-purple-900 bg-purple-50/40 ring-1 ring-purple-900' 
                        : 'border-purple-100 hover:border-purple-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Truck className="w-5 h-5 text-purple-900" />
                        <div>
                          <div className="text-sm font-semibold text-zinc-900">
                            Complimentary Insured Courier
                          </div>
                          <div className="text-xs text-zinc-500">
                            Dispatched from Milan Atelier · 3–5 Business Days
                          </div>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-purple-900 uppercase">
                        {isFreeShip ? 'Complimentary' : formatPrice(20)}
                      </span>
                    </div>
                  </label>

                  <label 
                    onClick={() => setForm(prev => ({ ...prev, shippingMethod: 'express' }))}
                    className={`block p-4 border cursor-pointer transition-all ${
                      form.shippingMethod === 'express' 
                        ? 'border-purple-900 bg-purple-50/40 ring-1 ring-purple-900' 
                        : 'border-purple-100 hover:border-purple-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Sparkles className="w-5 h-5 text-purple-900" />
                        <div>
                          <div className="text-sm font-semibold text-zinc-900">
                            White Glove Priority Air Express
                          </div>
                          <div className="text-xs text-zinc-500">
                            Direct courier delivery with garment steam & hanger · 1–2 Business Days
                          </div>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-zinc-900 uppercase tabular-nums">
                        {formatPrice(25)}
                      </span>
                    </div>
                  </label>
                </div>

                <div className="pt-4 flex justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-6 py-3.5 border border-purple-200 text-zinc-700 text-xs font-semibold tracking-wider uppercase hover:bg-purple-50 transition-colors flex items-center gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="px-8 py-3.5 bg-purple-900 hover:bg-purple-950 text-white text-xs font-semibold tracking-widest uppercase transition-colors flex items-center gap-2 cursor-pointer shadow-md"
                  >
                    <span>Proceed to Payment</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Payment */}
            {step === 3 && (
              <form onSubmit={handleCompleteOrder} className="space-y-6">
                <h3 className="font-serif text-xl text-zinc-950 font-normal">
                  Secure Payment Method
                </h3>

                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setForm(prev => ({ ...prev, paymentMethod: 'card' }))}
                    className={`p-3 border text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors ${
                      form.paymentMethod === 'card'
                        ? 'border-purple-900 bg-purple-900 text-white'
                        : 'border-purple-200 text-zinc-700 hover:bg-purple-50'
                    }`}
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>Credit Card</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setForm(prev => ({ ...prev, paymentMethod: 'apple_pay' }))}
                    className={`p-3 border text-xs font-semibold uppercase tracking-wider transition-colors ${
                      form.paymentMethod === 'apple_pay'
                        ? 'border-purple-900 bg-purple-900 text-white'
                        : 'border-purple-200 text-zinc-700 hover:bg-purple-50'
                    }`}
                  >
                     Pay
                  </button>

                  <button
                    type="button"
                    onClick={() => setForm(prev => ({ ...prev, paymentMethod: 'klarna' }))}
                    className={`p-3 border text-xs font-semibold uppercase tracking-wider transition-colors ${
                      form.paymentMethod === 'klarna'
                        ? 'border-purple-900 bg-purple-900 text-white'
                        : 'border-purple-200 text-zinc-700 hover:bg-purple-50'
                    }`}
                  >
                    Klarna 4x
                  </button>
                </div>

                <div className="space-y-3 p-4 bg-[#FAF9FC] border border-purple-100">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 mb-1">
                      Card Number
                    </label>
                    <input
                      type="text"
                      name="cardNumber"
                      required
                      value={form.cardNumber}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2.5 text-sm border border-purple-200 bg-white font-mono focus:outline-none focus:border-purple-800"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 mb-1">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        name="cardExpiry"
                        required
                        value={form.cardExpiry}
                        onChange={handleInputChange}
                        className="w-full px-3.5 py-2.5 text-sm border border-purple-200 bg-white font-mono focus:outline-none focus:border-purple-800"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 mb-1">
                        Security Code (CVC)
                      </label>
                      <input
                        type="text"
                        name="cardCvc"
                        required
                        value={form.cardCvc}
                        onChange={handleInputChange}
                        className="w-full px-3.5 py-2.5 text-sm border border-purple-200 bg-white font-mono focus:outline-none focus:border-purple-800"
                      />
                    </div>
                  </div>
                </div>

                {/* Total Summary */}
                <div className="p-4 bg-purple-50/50 border border-purple-200 flex justify-between items-center text-sm">
                  <div>
                    <div className="font-semibold text-zinc-900">Total Authorization:</div>
                    <div className="text-xs text-zinc-500">Including all duties and insured courier</div>
                  </div>
                  <div className="font-serif text-2xl font-bold text-purple-950 tabular-nums">
                    {formatPrice(finalTotal)}
                  </div>
                </div>

                <div className="pt-2 flex justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="px-6 py-3.5 border border-purple-200 text-zinc-700 text-xs font-semibold tracking-wider uppercase hover:bg-purple-50 transition-colors flex items-center gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>

                  <button
                    type="submit"
                    className="px-8 py-3.5 bg-purple-900 hover:bg-purple-950 text-white text-xs font-semibold tracking-widest uppercase transition-colors flex items-center gap-2 cursor-pointer shadow-md"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>Authorize Payment</span>
                  </button>
                </div>
              </form>
            )}

            {/* Step 4: Confirmed Order Screen */}
            {step === 4 && confirmedOrder && (
              <div className="text-center space-y-6 py-4">
                <div className="w-16 h-16 bg-purple-50 text-purple-900 border border-purple-200 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div>
                  <span className="text-xs font-semibold tracking-[0.2em] uppercase text-purple-800">
                    Order Confirmation
                  </span>
                  <h3 className="font-serif text-3xl text-zinc-950 font-normal mt-1">
                    Merci, {confirmedOrder.customer.firstName}.
                  </h3>
                  <p className="text-xs text-zinc-500 mt-1">
                    Your bespoke commission has been registered. Reference: <strong className="font-mono text-purple-950">{confirmedOrder.orderId}</strong>
                  </p>
                </div>

                {/* Order Breakdown Box */}
                <div className="bg-[#FAF9FC] border border-purple-100 p-6 text-left max-w-lg mx-auto space-y-4">
                  <div className="flex justify-between items-center text-xs pb-3 border-b border-purple-100">
                    <div>
                      <span className="text-zinc-500">Delivery Address:</span>
                      <p className="font-medium text-zinc-900">
                        {confirmedOrder.customer.address}, {confirmedOrder.customer.city}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-zinc-500">Estimated Dispatch:</span>
                      <p className="font-medium text-purple-900">
                        {confirmedOrder.estimatedDelivery}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="font-semibold text-zinc-950 uppercase tracking-wider mb-2">
                      Acquired Items ({confirmedOrder.items.length}):
                    </div>
                    {confirmedOrder.items.map((it) => (
                      <div key={it.id} className="flex justify-between items-center py-1">
                        <div className="flex items-center gap-2">
                          <span className="text-purple-900 font-bold tabular-nums">
                            {it.quantity}x
                          </span>
                          <span className="text-zinc-800 font-medium">
                            {it.product.title} ({it.selectedSize})
                          </span>
                        </div>
                        <span className="font-semibold text-zinc-900 tabular-nums">
                          {formatPrice(it.product.price * it.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-3 border-t border-purple-200 flex justify-between items-baseline text-sm">
                    <span className="font-semibold text-zinc-900">Total Settled:</span>
                    <span className="font-bold text-lg text-purple-950 tabular-nums">
                      {formatPrice(confirmedOrder.total)}
                    </span>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={handleClose}
                    className="px-8 py-3.5 bg-purple-900 hover:bg-purple-950 text-white text-xs font-semibold tracking-widest uppercase transition-colors inline-block cursor-pointer shadow-md"
                  >
                    Return to Atelier Store
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};
