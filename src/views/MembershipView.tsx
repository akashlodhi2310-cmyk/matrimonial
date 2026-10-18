import React from 'react';
import { useApp } from '../context/AppContext';
import { Check, X, ShieldCheck, Sparkles, HelpCircle, ArrowRight } from 'lucide-react';

export const MembershipView: React.FC = () => {
  const { plans, currentUser, openCheckout, setCurrentView } = useApp();

  const comparisonFeatures = [
    { title: 'Browse All Curated Profiles', connect: true, premium: true, elite: true },
    { title: 'Unlimited Shortlisting', connect: true, premium: true, elite: true },
    { title: 'Personalized Marriage Inquiries', connect: true, premium: true, elite: true },
    { title: 'Direct Messaging Unlocks', connect: '1 Profile', premium: '5 Profiles', elite: '15 Profiles' },
    { title: 'Consented Contact Detail Unlocks', connect: false, premium: true, elite: true },
    { title: 'Advanced Profile & City Filters', connect: false, premium: true, elite: true },
    { title: 'Priority Profile Recommendations', connect: false, premium: false, elite: true },
    { title: 'Concierge Helpline Support', connect: false, premium: false, elite: true },
    { title: 'Membership Validity Period', connect: '30 Days', premium: '90 Days', elite: '180 Days' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="text-xs uppercase tracking-widest text-rose-600 font-bold">
          Transparent Memberships
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-slate-900">
          Invest in Your Forever
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Choose a straightforward membership package with dedicated conversation allowances and verified contact access. No automatic recurring charges.
        </p>

        {/* Current User Active Plan Notice if logged in */}
        {currentUser && (
          <div className="pt-3">
            <div className="inline-flex flex-wrap items-center justify-center gap-3 px-5 py-2.5 rounded-2xl bg-white border border-slate-200 shadow-sm text-xs">
              <span className="text-slate-500">Your Active Tier:</span>
              <span className="font-bold text-rose-600 uppercase tracking-wide">
                {currentUser.membership.planName}
              </span>
              <span className="text-slate-300">|</span>
              <span className="font-mono text-slate-800 font-bold">
                {currentUser.membership.remainingMessages} Unlock{currentUser.membership.remainingMessages === 1 ? '' : 's'} Remaining
              </span>
              {currentUser.membership.validUntil && (
                <>
                  <span className="text-slate-300">|</span>
                  <span className="text-slate-500">
                    Valid till {new Date(currentUser.membership.validUntil).toLocaleDateString()}
                  </span>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {/* 3 Pricing Packages */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        {plans.map((plan) => {
          const isRec = plan.isRecommended;
          const isCurrentActive = currentUser?.membership.planId === plan.id;

          return (
            <div
              key={plan.id}
              className={`relative rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 ${
                isRec
                  ? 'bg-slate-900 text-white border-2 border-rose-500 shadow-2xl scale-[1.03]'
                  : 'bg-white text-slate-900 border border-slate-200 shadow-sm hover:border-slate-300'
              }`}
            >
              {isRec && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 bg-rose-600 text-white text-[11px] font-extrabold uppercase tracking-wider rounded-full shadow-md">
                  Most Popular
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <h3 className="font-serif text-2xl font-bold">
                    {plan.name}
                  </h3>
                  <p className={`text-xs mt-1 leading-relaxed ${isRec ? 'text-slate-300' : 'text-slate-600'}`}>
                    {plan.description}
                  </p>
                </div>

                <div className="border-t border-b py-4 my-2 border-inherit/20">
                  <div className="flex items-baseline gap-2">
                    <span className="font-serif text-4xl sm:text-5xl font-extrabold tabular-nums">
                      ₹{plan.price}
                    </span>
                    <span className={`text-xs ${isRec ? 'text-slate-400' : 'text-slate-500'}`}>
                      / {plan.validityDays} days validity
                    </span>
                  </div>
                </div>

                {/* Benefits */}
                <div className="space-y-3">
                  <div className={`text-xs font-bold uppercase tracking-wider ${isRec ? 'text-rose-400' : 'text-rose-600'}`}>
                    Key Benefits:
                  </div>
                  <ul className="space-y-3 text-xs">
                    {plan.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <div
                          className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                            isRec ? 'bg-rose-500/20 text-rose-400' : 'bg-rose-50 text-rose-600'
                          }`}
                        >
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </div>
                        <span className={isRec ? 'text-slate-200' : 'text-slate-700'}>
                          {benefit}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-8">
                <button
                  onClick={() => openCheckout(plan)}
                  className={`w-full py-3.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-sm ${
                    isCurrentActive
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                      : isRec
                      ? 'bg-rose-600 hover:bg-rose-700 text-white'
                      : 'bg-slate-900 hover:bg-black text-white'
                  }`}
                >
                  {isCurrentActive ? 'Active Plan (Top-Up)' : `Subscribe to ${plan.name}`}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Feature Comparison Matrix */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-6">
        <div>
          <h2 className="font-serif text-2xl font-bold text-slate-900">
            Detailed Plan Entitlements & Comparison
          </h2>
          <p className="text-xs text-slate-600 mt-1">
            Compare all messaging allowances, contact access permissions, and concierge features side by side.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-900">
                <th className="py-4 pr-4 font-bold text-sm">Feature / Benefit</th>
                <th className="py-4 px-4 font-bold text-center">CONNECT (₹299)</th>
                <th className="py-4 px-4 font-bold text-center text-rose-600 bg-rose-50/50">PREMIUM (₹699)</th>
                <th className="py-4 pl-4 font-bold text-center">ROYAL (₹1,499)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {comparisonFeatures.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3.5 pr-4 font-semibold text-slate-900">{item.title}</td>

                  {/* Connect */}
                  <td className="py-3.5 px-4 text-center">
                    {typeof item.connect === 'boolean' ? (
                      item.connect ? (
                        <Check className="w-4 h-4 text-emerald-600 mx-auto" />
                      ) : (
                        <X className="w-4 h-4 text-slate-300 mx-auto" />
                      )
                    ) : (
                      <span className="font-semibold text-slate-900">{item.connect}</span>
                    )}
                  </td>

                  {/* Premium */}
                  <td className="py-3.5 px-4 text-center bg-rose-50/50">
                    {typeof item.premium === 'boolean' ? (
                      item.premium ? (
                        <Check className="w-4 h-4 text-rose-600 mx-auto stroke-[2.5]" />
                      ) : (
                        <X className="w-4 h-4 text-slate-300 mx-auto" />
                      )
                    ) : (
                      <span className="font-bold text-rose-600">{item.premium}</span>
                    )}
                  </td>

                  {/* Elite */}
                  <td className="py-3.5 pl-4 text-center">
                    {typeof item.elite === 'boolean' ? (
                      item.elite ? (
                        <Check className="w-4 h-4 text-emerald-600 mx-auto" />
                      ) : (
                        <X className="w-4 h-4 text-slate-300 mx-auto" />
                      )
                    ) : (
                      <span className="font-semibold text-slate-900">{item.elite}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
