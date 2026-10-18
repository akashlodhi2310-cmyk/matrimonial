import React from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck } from 'lucide-react';

export const DemoNoticeBanner: React.FC = () => {
  const { currentUser, loginAsDemoGroom, loginAsDemoBride, loginAsAdmin } = useApp();

  return (
    <div className="bg-slate-900 text-slate-200 border-b border-slate-800 text-xs py-2 px-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-rose-400 shrink-0" />
          <span className="font-semibold text-white tracking-wide">
            Interactive Business Demo: bestsathi.com
          </span>
          <span className="text-slate-500 hidden sm:inline">·</span>
          <span className="text-slate-400 hidden sm:inline">
            Demonstration data & simulated membership.
          </span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="text-slate-400 hidden lg:inline">Quick Test Persona:</span>
          <button
            onClick={loginAsDemoGroom}
            className={`px-2.5 py-1 text-xs rounded-lg transition-colors cursor-pointer ${
              currentUser?.role === 'groom' && currentUser?.id === 'user-groom-01'
                ? 'bg-rose-600 text-white font-semibold shadow-sm'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
            }`}
          >
            Demo Groom
          </button>
          <button
            onClick={loginAsDemoBride}
            className={`px-2.5 py-1 text-xs rounded-lg transition-colors cursor-pointer ${
              currentUser?.role === 'bride'
                ? 'bg-rose-600 text-white font-semibold shadow-sm'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
            }`}
          >
            Demo Bride
          </button>
          <button
            onClick={loginAsAdmin}
            className="px-2.5 py-1 text-xs rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 transition-colors cursor-pointer font-medium"
          >
            Admin View
          </button>
        </div>
      </div>
    </div>
  );
};
