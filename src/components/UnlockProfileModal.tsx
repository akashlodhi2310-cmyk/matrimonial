import React from 'react';
import { useApp } from '../context/AppContext';
import { X, Lock, Unlock, Check, Sparkles, ShieldCheck, ArrowRight } from 'lucide-react';

export const UnlockProfileModal: React.FC = () => {
  const {
    unlockModalProfile,
    closeUnlockModal,
    currentUser,
    plans,
    openCheckout,
    unlockProfileWithCredit
  } = useApp();

  if (!unlockModalProfile) return null;

  const remainingCredits = currentUser?.membership.remainingMessages || 0;

  const handleSelectPlan = (plan: any) => {
    openCheckout(plan);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full border border-slate-200 shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="bg-slate-900 text-white p-6 sm:p-7 relative shrink-0">
          <button
            onClick={closeUnlockModal}
            className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-4 sm:gap-5">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 border-rose-500/50 shrink-0 bg-slate-800 shadow-md">
              <img
                src={unlockModalProfile.photos[0]}
                alt={unlockModalProfile.displayName}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-widest text-amber-400 font-bold flex items-center gap-1.5">
                <Lock className="w-3 h-3 text-amber-400" />
                <span>Complete Profile & Contact Access Locked</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold mt-1 text-white">
                {unlockModalProfile.displayName}
              </h2>
              <p className="text-xs text-slate-300 mt-1">
                {unlockModalProfile.age} yrs · {unlockModalProfile.city} · {unlockModalProfile.profession}
              </p>
            </div>
          </div>
        </div>

        {/* Existing Credits Option if user has remaining unlocks */}
        {currentUser && remainingCredits > 0 && (
          <div className="bg-emerald-50 border-b border-emerald-200 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
            <div className="text-xs text-emerald-950">
              <span className="font-bold">Active Membership Credit:</span> You have{' '}
              <span className="font-mono font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md">
                {remainingCredits} unlock credit{remainingCredits > 1 ? 's' : ''}
              </span>{' '}
              available.
            </div>
            <button
              onClick={() => unlockProfileWithCredit(unlockModalProfile.id)}
              className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-colors shadow-sm flex items-center gap-2 whitespace-nowrap cursor-pointer"
            >
              <Unlock className="w-4 h-4" />
              <span>Unlock Instantly</span>
            </button>
          </div>
        )}

        {/* Plans Grid */}
        <div className="p-6 sm:p-7 overflow-y-auto space-y-4">
          <div className="flex items-center justify-between">
            <div className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Choose a Membership Package to Unlock:
            </div>
            <span className="text-[11px] text-slate-500">100% demo simulation</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {plans.map((plan) => {
              const isRec = plan.isRecommended;
              return (
                <div
                  key={plan.id}
                  className={`p-5 rounded-2xl border flex flex-col justify-between transition-all ${
                    isRec
                      ? 'border-rose-500 bg-rose-50/40 shadow-lg ring-1 ring-rose-500'
                      : 'border-slate-200 bg-white hover:border-slate-300 shadow-sm'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-serif font-bold text-base text-slate-900">
                        {plan.name}
                      </h4>
                      {isRec && (
                        <span className="text-[9px] font-extrabold uppercase bg-rose-600 text-white px-2 py-0.5 rounded-full shadow-xs">
                          Popular
                        </span>
                      )}
                    </div>

                    <div className="font-serif text-2xl sm:text-3xl font-extrabold text-slate-900 tabular-nums">
                      ₹{plan.price}
                      <span className="text-[10px] text-slate-500 font-sans font-normal block mt-0.5">
                        Valid for {plan.validityDays} days
                      </span>
                    </div>

                    <ul className="space-y-1.5 text-[11px] text-slate-600 border-t border-slate-100 pt-3">
                      <li className="flex items-center gap-1.5 font-semibold text-rose-700">
                        <Check className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                        <span>{plan.messageUnlockLimit} Profile Unlock{plan.messageUnlockLimit > 1 ? 's' : ''}</span>
                      </li>
                      <li className="flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{plan.contactUnlockAllowed ? 'Direct phone unlock' : 'Messaging only'}</span>
                      </li>
                    </ul>
                  </div>

                  <div className="pt-5">
                    <button
                      onClick={() => handleSelectPlan(plan)}
                      className={`w-full py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-sm flex items-center justify-center gap-1.5 ${
                        isRec
                          ? 'bg-rose-600 hover:bg-rose-700 text-white'
                          : 'bg-slate-900 hover:bg-black text-white'
                      }`}
                    >
                      <span>Choose {plan.name}</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-[11px] text-slate-600 flex items-center justify-center gap-2 text-center">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Interactive Demo: Clicking a plan opens simulated checkout and immediately unlocks the profile.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
