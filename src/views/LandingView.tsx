import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Sparkles,
  ArrowRight,
  Compass,
  Star,
  Check,
  Heart
} from 'lucide-react';

export const LandingView: React.FC = () => {
  const {
    setCurrentView,
    plans,
    openCheckout,
    currentUser
  } = useApp();

  return (
    <div className="space-y-20 sm:space-y-28 pb-20">
      {/* 1. EDITORIAL HERO SECTION */}
      <section className="relative pt-10 sm:pt-16 pb-4">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-50 text-rose-700 border border-rose-200 text-xs font-semibold tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5 text-rose-600" />
            <span>Best Sathi · bestsathi.com</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12]">
            Your Search for a Life Partner <br className="hidden sm:inline" />
            <span className="text-rose-600 italic">Begins Here.</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl mx-auto">
            A contemporary matrimonial discovery platform. Discover genuine backgrounds, verify compatibility, and connect with complete privacy and dignity.
          </p>

          {/* Simple, Non-Confusing CTAs */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3.5 max-w-md mx-auto">
            <button
              onClick={() => setCurrentView('explore')}
              className="w-full sm:w-auto px-8 py-3.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md hover:shadow-rose-500/20 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Explore Profiles</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {currentUser ? (
              <button
                onClick={() => setCurrentView('dashboard')}
                className="w-full sm:w-auto px-7 py-3.5 bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 text-xs font-bold rounded-xl transition-colors text-center shadow-xs cursor-pointer flex items-center justify-center gap-2"
              >
                <Compass className="w-4 h-4 text-rose-600" />
                <span>Go to My Dashboard</span>
              </button>
            ) : (
              <button
                onClick={() => setCurrentView('signup')}
                className="w-full sm:w-auto px-7 py-3.5 bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 text-xs font-bold rounded-xl transition-colors text-center shadow-xs cursor-pointer"
              >
                Create Free Account
              </button>
            )}
          </div>
        </div>

        {/* Hero Editorial Image Showcase */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 sm:mt-14">
          <div className="relative rounded-3xl overflow-hidden border border-slate-200/80 shadow-2xl aspect-[16/9] sm:aspect-[21/9]">
            <img
              src="/images/hero_couple_wedding_1792322189869.jpg"
              alt="Best Sathi Matrimonial"
              className="w-full h-full object-cover"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white text-left max-w-xl">
              <div className="text-[11px] uppercase tracking-wider text-rose-300 font-bold flex items-center gap-1.5">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span>Refined Matrimonial Discovery</span>
              </div>
              <p className="font-serif text-lg sm:text-2xl font-bold mt-1 text-white leading-snug">
                Where compatibility meets tradition, trust, and family values.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THREE CORE PILLARS */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
          <div className="text-xs uppercase tracking-widest text-rose-600 font-bold">
            Why Best Sathi
          </div>
          <h2 className="font-serif text-3xl font-bold text-slate-900">
            A Thoughtful Approach to Marriage
          </h2>
          <p className="text-xs text-slate-600">
            Designed for genuine candidates and families looking for meaningful lifetime companionship.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-7 rounded-3xl border border-slate-200 space-y-3 shadow-sm hover:border-slate-300 transition-all hover:shadow-md">
            <div className="w-10 h-10 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center font-serif text-base font-bold border border-rose-100">
              01
            </div>
            <h3 className="font-serif text-xl font-bold text-slate-900">
              Curated Profiles
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every profile features structured information covering education, profession, current city, values, and family background.
            </p>
          </div>

          <div className="bg-white p-7 rounded-3xl border border-slate-200 space-y-3 shadow-sm hover:border-slate-300 transition-all hover:shadow-md">
            <div className="w-10 h-10 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center font-serif text-base font-bold border border-rose-100">
              02
            </div>
            <h3 className="font-serif text-xl font-bold text-slate-900">
              Strict Contact Privacy
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Photos are visible while sensitive details and phone numbers are locked until unlocked with membership packages.
            </p>
          </div>

          <div className="bg-white p-7 rounded-3xl border border-slate-200 space-y-3 shadow-sm hover:border-slate-300 transition-all hover:shadow-md">
            <div className="w-10 h-10 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center font-serif text-base font-bold border border-rose-100">
              03
            </div>
            <h3 className="font-serif text-xl font-bold text-slate-900">
              Flexible Memberships
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Choose from 3 clear packages starting from ₹299. Dedicated profile unlocks and direct messaging with no auto-debit traps.
            </p>
          </div>
        </div>
      </section>

      {/* 3. THREE MEMBERSHIP PACKAGES */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <div className="text-xs uppercase tracking-widest text-rose-600 font-bold">
            Simple & Transparent Pricing
          </div>
          <h2 className="font-serif text-3xl font-bold text-slate-900">
            Membership Packages
          </h2>
          <p className="text-xs text-slate-600">
            Clear packages with dedicated profile unlock allowances. (Simulated demo checkout).
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {plans.map((plan) => {
            const isRec = plan.isRecommended;
            return (
              <div
                key={plan.id}
                className={`relative rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all ${
                  isRec
                    ? 'bg-slate-900 text-white border-2 border-rose-500 shadow-xl'
                    : 'bg-white text-slate-900 border border-slate-200 shadow-sm hover:border-slate-300'
                }`}
              >
                {isRec && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-rose-600 text-white text-[10px] font-extrabold uppercase tracking-wider rounded-full shadow-md">
                    Most Popular
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <h4 className="font-serif text-xl font-bold">{plan.name}</h4>
                    <p className={`text-xs mt-1 ${isRec ? 'text-slate-300' : 'text-slate-600'}`}>
                      {plan.description}
                    </p>
                  </div>

                  <div className="border-t border-b py-3 border-inherit/20">
                    <div className="flex items-baseline gap-1.5">
                      <span className="font-serif text-3xl sm:text-4xl font-extrabold tabular-nums">
                        ₹{plan.price}
                      </span>
                      <span className={`text-xs ${isRec ? 'text-slate-400' : 'text-slate-500'}`}>
                        / {plan.validityDays} days
                      </span>
                    </div>
                  </div>

                  <ul className="space-y-2.5 text-xs">
                    {plan.benefits.slice(0, 4).map((benefit, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <Check className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${isRec ? 'text-rose-400' : 'text-rose-600'}`} />
                        <span className={isRec ? 'text-slate-200' : 'text-slate-700'}>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6">
                  <button
                    onClick={() => openCheckout(plan)}
                    className={`w-full py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-sm ${
                      isRec
                        ? 'bg-rose-600 hover:bg-rose-700 text-white'
                        : 'bg-slate-900 hover:bg-black text-white'
                    }`}
                  >
                    Select {plan.name}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. GET STARTED / AUTH CTA */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 border border-slate-800 text-center space-y-4 shadow-xl">
          <div className="w-12 h-12 rounded-2xl bg-rose-600/20 text-rose-400 flex items-center justify-center mx-auto border border-rose-500/30">
            <Heart className="w-6 h-6 fill-current" />
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
            Ready to Begin Your Matrimonial Journey?
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto leading-relaxed">
            Join Best Sathi today to discover compatible life partners, manage shortlists, and connect with dignity.
          </p>

          <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => setCurrentView('signup')}
              className="w-full sm:w-auto px-8 py-3.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors shadow-md cursor-pointer"
            >
              Register Free Profile
            </button>
            <button
              onClick={() => setCurrentView('login')}
              className="w-full sm:w-auto px-8 py-3.5 bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 text-xs font-bold uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
            >
              Sign In to Account
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
