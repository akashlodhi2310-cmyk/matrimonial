import React from 'react';
import { useApp } from '../context/AppContext';
import {
  UserPlus,
  Search,
  MessageCircle,
  ShieldCheck,
  Lock,
  HeartHandshake,
  ArrowRight,
  Sparkles
} from 'lucide-react';

export const HowItWorksView: React.FC = () => {
  const { setCurrentView, openAuthModal, currentUser } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="text-xs uppercase tracking-widest text-rose-600 font-bold">
          The Journey to Companionship
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-slate-900">
          How Best Sathi Connects Hearts
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          A dignified, structured pathway combining modern matrimonial preferences with traditional family values.
        </p>
      </div>

      {/* 3 Step Visual Deep Dive */}
      <div className="space-y-8">
        {/* Step 1 */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xs grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-4 flex justify-center">
            <div className="w-24 h-24 rounded-3xl bg-rose-50 text-rose-600 flex items-center justify-center font-serif text-4xl font-bold border border-rose-200">
              01
            </div>
          </div>
          <div className="md:col-span-8 space-y-3">
            <div className="text-xs uppercase tracking-wider font-bold text-rose-600">
              Step One: Onboarding
            </div>
            <h3 className="font-serif text-2xl font-bold text-slate-900">
              Create Your Account & Define Partner Criteria
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Begin with your verified email and personal credentials. Enter your educational credentials, professional field, cultural traditions, and family expectations. Only adult candidates aged 18 and above are eligible.
            </p>
          </div>
        </div>

        {/* Step 2 */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xs grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-4 flex justify-center order-first md:order-last">
            <div className="w-24 h-24 rounded-3xl bg-rose-50 text-rose-600 flex items-center justify-center font-serif text-4xl font-bold border border-rose-200">
              02
            </div>
          </div>
          <div className="md:col-span-8 space-y-3">
            <div className="text-xs uppercase tracking-wider font-bold text-rose-600">
              Step Two: Discovery
            </div>
            <h3 className="font-serif text-2xl font-bold text-slate-900">
              Explore Curated Profiles & Shortlist Matches
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Use intelligent filters across cities, professions, and academic backgrounds to explore eligible candidates. Review detailed bios and family contexts, curate your personal shortlist, and prepare customized introductory messages.
            </p>
          </div>
        </div>

        {/* Step 3 */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xs grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-4 flex justify-center">
            <div className="w-24 h-24 rounded-3xl bg-rose-50 text-rose-600 flex items-center justify-center font-serif text-4xl font-bold border border-rose-200">
              03
            </div>
          </div>
          <div className="md:col-span-8 space-y-3">
            <div className="text-xs uppercase tracking-wider font-bold text-rose-600">
              Step Three: Meaningful Connection
            </div>
            <h3 className="font-serif text-2xl font-bold text-slate-900">
              Connect Through Flexible Memberships
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Choose from our Connect (₹299), Premium (₹699), or Royal (₹1,499) memberships. Unlock direct messaging with selected candidates, exchange family perspectives, and receive verified contact phone numbers once mutual consent is established.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Box */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 text-center space-y-4 border border-slate-800 shadow-xl">
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
          Ready to Start Your Journey?
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
          Explore curated demonstration profiles or create your personalized profile today.
        </p>
        <div className="pt-2">
          <button
            onClick={() => {
              if (currentUser) {
                setCurrentView('explore');
              } else {
                openAuthModal('signup', 'groom');
              }
            }}
            className="px-8 py-3.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md cursor-pointer"
          >
            Find Your Sathi Now
          </button>
        </div>
      </div>
    </div>
  );
};
