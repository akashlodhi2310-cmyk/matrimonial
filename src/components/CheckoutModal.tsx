import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Check, ShieldCheck, AlertCircle, Sparkles, CreditCard, Lock } from 'lucide-react';

export const CheckoutModal: React.FC = () => {
  const { checkoutPlan, closeCheckout, upgradePlan, showToast } = useApp();
  const [isProcessing, setIsProcessing] = useState(false);

  if (!checkoutPlan) return null;

  const handleSimulatePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      upgradePlan(checkoutPlan.id);
    }, 900);
  };

  const handleSimulateFailure = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      showToast('Simulated payment was cancelled.');
      closeCheckout();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full border border-slate-200 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-slate-900 text-white p-6 sm:p-7 relative">
          <button
            onClick={closeCheckout}
            className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="text-[11px] uppercase tracking-widest text-rose-400 font-bold flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Membership Activation Checkout</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold mt-1.5 text-white">
            {checkoutPlan.name} Membership
          </h2>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="font-serif text-3xl sm:text-4xl font-extrabold text-white tabular-nums">
              ₹{checkoutPlan.price}
            </span>
            <span className="text-xs text-slate-300">
              / for {checkoutPlan.validityDays} days validity
            </span>
          </div>
        </div>

        {/* Demo Mode Notice Banner */}
        <div className="bg-rose-50/70 border-b border-rose-100 px-6 py-3.5 flex items-start gap-3">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
          <div className="text-xs text-rose-950 leading-relaxed">
            <span className="font-bold">Interactive Demo Mode:</span> No real card or bank details required. Click simulate to activate entitlements immediately and unlock member profiles.
          </div>
        </div>

        {/* Plan Benefits Summary */}
        <div className="p-6 sm:p-7 space-y-5">
          <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            Included in this plan:
          </h4>
          <ul className="space-y-2.5 text-xs text-slate-700">
            {checkoutPlan.benefits.map((benefit, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <div className="w-4 h-4 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                </div>
                <span className="leading-snug">{benefit}</span>
              </li>
            ))}
          </ul>

          <div className="border-t border-slate-100 pt-4 space-y-2">
            <div className="flex justify-between text-xs text-slate-500">
              <span>Plan Base Price</span>
              <span className="font-mono tabular-nums font-semibold text-slate-800">₹{checkoutPlan.price}</span>
            </div>
            <div className="flex justify-between text-xs text-slate-500">
              <span>Platform Access & Profile Unlocks</span>
              <span className="text-emerald-700 font-semibold">Included</span>
            </div>
            <div className="flex justify-between text-sm font-bold text-slate-900 pt-2 border-t border-slate-200">
              <span>Total Payable (Simulated)</span>
              <span className="font-serif text-xl font-extrabold text-rose-600 tabular-nums">₹{checkoutPlan.price}</span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="space-y-3 pt-2">
            <button
              onClick={handleSimulatePayment}
              disabled={isProcessing}
              className="w-full py-3.5 px-4 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
            >
              {isProcessing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Activating Demo Membership...</span>
                </>
              ) : (
                <>
                  <CreditCard className="w-4 h-4" />
                  <span>Simulate Successful Payment (₹{checkoutPlan.price})</span>
                </>
              )}
            </button>

            <button
              onClick={handleSimulateFailure}
              disabled={isProcessing}
              className="w-full py-2.5 px-4 text-xs font-semibold text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors text-center cursor-pointer"
            >
              Cancel / Close
            </button>
          </div>

          <div className="text-[11px] text-center text-slate-500 flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Encrypted Demo Simulator · Best Sathi bestsathi.com</span>
          </div>
        </div>
      </div>
    </div>
  );
};
