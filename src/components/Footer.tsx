import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { LegalModals, LegalModalType } from './LegalModals';
import { Shield, Heart, ArrowUp, RefreshCw } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setCurrentView, resetAllDemoData } = useApp();
  const [modalType, setModalType] = useState<LegalModalType>(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <footer className="bg-slate-950 text-slate-300 border-t border-slate-900 pt-14 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
            {/* Col 1: Brand & Tagline */}
            <div className="md:col-span-1 space-y-4">
              <div>
                <span className="font-serif text-2xl font-bold tracking-tight text-white">
                  Best Sathi<span className="text-rose-600">.</span>
                </span>
                <div className="text-[10px] tracking-widest uppercase text-rose-400 font-bold">
                  bestsathi.com
                </div>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-serif italic text-base">
                "Your Search for a Life Partner Begins Here."
              </p>
              <p className="text-xs text-slate-400 leading-relaxed">
                A refined Indian matrimonial discovery platform crafted for intentional, family-oriented life partnerships.
              </p>
            </div>

            {/* Col 2: Navigation Discovery */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-rose-400">
                Discovery
              </h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li>
                  <button
                    onClick={() => setCurrentView('explore')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Browse Female Profiles
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setCurrentView('how-it-works')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    How Best Sathi Works
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setCurrentView('membership')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Compare Membership Plans
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setCurrentView('dashboard')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Member Dashboard
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 3: Trust & Safety */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-rose-400">
                Trust & Guidelines
              </h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li>
                  <button
                    onClick={() => setModalType('safety')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Safety & Etiquette Guidelines
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setModalType('privacy')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Privacy Policy
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setModalType('terms')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Terms & Conditions
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setModalType('refund')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Membership & Refund Policy
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 4: Platform Concierge & Admin */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-rose-400">
                Concierge & Admin
              </h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li>
                  <button
                    onClick={() => setModalType('about')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    About Best Sathi
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setModalType('contact')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Concierge & Help Desk
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setCurrentView('admin')}
                    className="hover:text-rose-400 transition-colors flex items-center gap-1.5 cursor-pointer font-medium"
                  >
                    <Shield className="w-3.5 h-3.5 text-rose-500" />
                    <span>Demo Administrator Console</span>
                  </button>
                </li>
                <li className="pt-2">
                  <button
                    onClick={resetAllDemoData}
                    className="text-[11px] text-slate-500 hover:text-slate-300 flex items-center gap-1 transition-colors cursor-pointer"
                    title="Reset all demo profiles and mock state"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Reset Local Demo Data</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <div>
              © 2026 Best Sathi (bestsathi.com). All rights reserved. Interactive Matrimonial MVP.
            </div>

            <div className="flex items-center gap-4">
              <span className="text-[11px]">
                Preloaded sample records for demonstration purposes only.
              </span>
              <button
                onClick={scrollToTop}
                className="p-2 rounded-full bg-slate-900 hover:bg-slate-800 text-slate-200 transition-colors cursor-pointer"
                aria-label="Scroll to top"
              >
                <ArrowUp className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Render Legal / Info Modal */}
      <LegalModals type={modalType} onClose={() => setModalType(null)} />
    </>
  );
};
