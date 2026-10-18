import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Lock, Mail, ArrowRight, Eye, EyeOff, ShieldCheck, Sparkles, User } from 'lucide-react';

export const LoginView: React.FC = () => {
  const { setCurrentView, loginCustom, loginAsDemoGroom, loginAsDemoBride, showToast } = useApp();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState<'groom' | 'bride'>('groom');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setError('Please enter your email or member ID.');
      return;
    }
    setError('');
    setIsSubmitting(true);

    setTimeout(() => {
      loginCustom(email.trim(), selectedRole);
      setIsSubmitting(false);
      setCurrentView('dashboard');
    }, 600);
  };

  const handleQuickGroom = () => {
    setEmail('arjun.verma@example.com');
    setPassword('••••••••');
    setSelectedRole('groom');
    loginAsDemoGroom();
    setCurrentView('dashboard');
  };

  const handleQuickBride = () => {
    setEmail('pooja.kulkarni@example.com');
    setPassword('••••••••');
    setSelectedRole('bride');
    loginAsDemoBride();
    setCurrentView('dashboard');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 text-rose-700 border border-rose-200 text-xs font-semibold uppercase tracking-wider">
            <span>Best Sathi Authentication</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-slate-900">
            Welcome Back
          </h1>
          <p className="text-xs sm:text-sm text-slate-600">
            Sign in to access your matches, conversations, and shortlist.
          </p>
        </div>

        {/* Quick Demo Fill Bar */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2.5 text-xs">
          <div className="flex items-center justify-between text-[11px] font-bold text-slate-900">
            <span className="flex items-center gap-1.5 text-rose-600">
              <Sparkles className="w-3.5 h-3.5" />
              <span>One-Click Demo Personas:</span>
            </span>
            <span className="text-slate-500 font-normal">Instant sign-in</span>
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={handleQuickGroom}
              className="py-2.5 px-3 rounded-xl bg-white border border-slate-200 hover:border-rose-400 text-left transition-colors cursor-pointer shadow-xs"
            >
              <div className="font-bold text-rose-600 text-[11px]">Demo Groom</div>
              <div className="text-[10px] text-slate-500 truncate">Arjun Verma (29, B.Tech)</div>
            </button>
            <button
              type="button"
              onClick={handleQuickBride}
              className="py-2.5 px-3 rounded-xl bg-white border border-slate-200 hover:border-rose-400 text-left transition-colors cursor-pointer shadow-xs"
            >
              <div className="font-bold text-rose-600 text-[11px]">Demo Bride</div>
              <div className="text-[10px] text-slate-500 truncate">Pooja Kulkarni (27, M.Sc)</div>
            </button>
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5">
          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {/* Account Category */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1.5">
                Sign In As
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedRole('groom')}
                  className={`py-2 px-3 rounded-xl border text-center font-bold transition-all cursor-pointer ${
                    selectedRole === 'groom'
                      ? 'border-rose-600 bg-rose-600 text-white shadow-xs'
                      : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-white'
                  }`}
                >
                  Groom
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedRole('bride')}
                  className={`py-2 px-3 rounded-xl border text-center font-bold transition-all cursor-pointer ${
                    selectedRole === 'bride'
                      ? 'border-rose-600 bg-rose-600 text-white shadow-xs'
                      : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-white'
                  }`}
                >
                  Bride
                </button>
              </div>
            </div>

            {/* Email field */}
            <div>
              <label className="block text-xs font-semibold text-slate-800 mb-1">
                Email Address or Member ID
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. arjun.verma@example.com"
                  required
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-rose-500 text-xs text-slate-900"
                />
              </div>
            </div>

            {/* Password field */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-slate-800">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => showToast('Demo password reset is simulated. Any password works for testing.')}
                  className="text-[11px] text-rose-600 hover:underline cursor-pointer"
                >
                  Forgot?
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-rose-500 text-xs text-slate-900"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-slate-600">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded text-rose-600 focus:ring-rose-500"
                />
                <span className="text-xs">Remember this device</span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 mt-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Switch to Signup */}
          <div className="text-center pt-2 border-t border-slate-100 text-xs text-slate-600">
            Don't have a profile yet?{' '}
            <button
              onClick={() => setCurrentView('signup')}
              className="text-rose-600 font-bold hover:underline cursor-pointer"
            >
              Register New Account
            </button>
          </div>
        </div>

        <div className="text-center text-[11px] text-slate-500 flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Best Sathi Demo Security · Simulated Authentication</span>
        </div>
      </div>
    </div>
  );
};
