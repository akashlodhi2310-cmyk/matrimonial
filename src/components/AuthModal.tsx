import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, UserCheck, Shield, Heart, AlertCircle, ArrowRight, Sparkles } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const {
    authModalOpen,
    authModalInitialTab,
    authModalRole,
    closeAuthModal,
    loginCustom,
    loginAsDemoGroom,
    loginAsDemoBride,
    loginAsAdmin,
    signupUser
  } = useApp();

  const [tab, setTab] = useState<'login' | 'signup'>(authModalInitialTab);
  const [role, setRole] = useState<'groom' | 'bride'>(authModalRole);

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Signup form state
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState<number>(27);
  const [city, setCity] = useState('');
  const [education, setEducation] = useState('');
  const [profession, setProfession] = useState('');
  const [bio, setBio] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!authModalOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail.trim()) {
      setErrorMsg('Please enter your email address.');
      return;
    }
    setErrorMsg('');
    loginCustom(loginEmail.trim(), role);
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (age < 18) {
      setErrorMsg('Only individuals aged 18 and above are eligible to register on Best Sathi.');
      return;
    }
    if (!fullName.trim() || !email.trim() || !city.trim() || !education.trim() || !profession.trim()) {
      setErrorMsg('Please complete all required profile fields.');
      return;
    }

    setErrorMsg('');
    signupUser({
      fullName: fullName.trim(),
      email: email.trim(),
      gender: role === 'groom' ? 'male' : 'female',
      role,
      age: Number(age),
      city: city.trim(),
      education: education.trim(),
      profession: profession.trim(),
      bio: bio.trim() || 'Looking for an understanding and values-driven life partner on Best Sathi.',
      photoUrl: role === 'groom'
        ? '/src/assets/images/profile_rohit_portrait_1792322224570.jpg'
        : '/src/assets/images/profile_ananya_portrait_1792322191115.jpg',
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full border border-slate-200 shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-slate-200 bg-slate-50 flex items-center justify-between shrink-0">
          <div>
            <div className="text-[10px] uppercase tracking-widest text-rose-600 font-bold flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              <span>Best Sathi Matrimonial</span>
            </div>
            <h2 className="font-serif text-2xl font-bold text-slate-900 mt-0.5">
              {tab === 'login' ? 'Welcome Back' : 'Create Your Profile'}
            </h2>
          </div>
          <button
            onClick={closeAuthModal}
            className="text-slate-400 hover:text-slate-700 p-1.5 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Demo Fill Strip */}
        <div className="bg-slate-100/70 border-b border-slate-200 px-6 py-2.5 flex items-center justify-between gap-2 shrink-0">
          <span className="text-[11px] text-slate-600 font-semibold flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-rose-600" />
            <span>Instant Demo:</span>
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={loginAsDemoGroom}
              className="px-2.5 py-1 text-[11px] font-bold bg-slate-900 text-white rounded-lg hover:bg-black transition-colors cursor-pointer"
            >
              Groom
            </button>
            <button
              type="button"
              onClick={loginAsDemoBride}
              className="px-2.5 py-1 text-[11px] font-bold bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors cursor-pointer"
            >
              Bride
            </button>
            <button
              type="button"
              onClick={loginAsAdmin}
              className="px-2.5 py-1 text-[11px] font-bold border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors cursor-pointer"
            >
              Admin
            </button>
          </div>
        </div>

        {/* Tab switch */}
        <div className="flex border-b border-slate-200 text-xs font-semibold shrink-0">
          <button
            type="button"
            onClick={() => {
              setTab('login');
              setErrorMsg('');
            }}
            className={`flex-1 py-3 text-center transition-colors border-b-2 cursor-pointer ${
              tab === 'login'
                ? 'border-rose-600 text-rose-600 font-bold bg-white'
                : 'border-transparent text-slate-500 hover:text-slate-900 bg-slate-50'
            }`}
          >
            Sign In to Existing Account
          </button>
          <button
            type="button"
            onClick={() => {
              setTab('signup');
              setErrorMsg('');
            }}
            className={`flex-1 py-3 text-center transition-colors border-b-2 cursor-pointer ${
              tab === 'signup'
                ? 'border-rose-600 text-rose-600 font-bold bg-white'
                : 'border-transparent text-slate-500 hover:text-slate-900 bg-slate-50'
            }`}
          >
            Register New Profile
          </button>
        </div>

        {/* Scrollable Form Content */}
        <div className="p-6 overflow-y-auto space-y-4">
          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Role selector */}
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1.5">
              Registration Category
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setRole('groom')}
                className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                  role === 'groom'
                    ? 'border-rose-600 bg-rose-50/50 shadow-xs ring-1 ring-rose-500'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="text-xs font-bold text-slate-900">Looking for a Bride</div>
                <div className="text-[11px] text-slate-500 mt-0.5">Primary Groom account</div>
              </button>

              <button
                type="button"
                onClick={() => setRole('bride')}
                className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                  role === 'bride'
                    ? 'border-rose-600 bg-rose-50/50 shadow-xs ring-1 ring-rose-500'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="text-xs font-bold text-slate-900">Looking for a Groom</div>
                <div className="text-[11px] text-slate-500 mt-0.5">Female Bride account</div>
              </button>
            </div>
          </div>

          {tab === 'login' ? (
            /* Login Form */
            <form onSubmit={handleLoginSubmit} className="space-y-4 pt-1">
              <div>
                <label className="block text-xs font-semibold text-slate-800 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="e.g. yourname@example.com"
                  required
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-rose-500 text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-800 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="Enter password (demo mode)"
                  required
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-rose-500 text-slate-900"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Enter Best Sathi</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            /* Signup Form */
            <form onSubmit={handleSignupSubmit} className="space-y-3 pt-1">
              <div>
                <label className="block text-xs font-semibold text-slate-800 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Vikramaditya Rathore"
                  required
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-rose-500 text-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-800 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="vikram@example.com"
                    required
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-rose-500 text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-800 mb-1">
                    Age (18+ only) *
                  </label>
                  <input
                    type="number"
                    min="18"
                    max="70"
                    value={age}
                    onChange={(e) => setAge(parseInt(e.target.value) || 18)}
                    required
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-rose-500 text-slate-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-800 mb-1">
                    Current City *
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="e.g. Mumbai, Bengaluru"
                    required
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-rose-500 text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-800 mb-1">
                    Highest Qualification *
                  </label>
                  <input
                    type="text"
                    value={education}
                    onChange={(e) => setEducation(e.target.value)}
                    placeholder="e.g. B.Tech / MBA / MBBS"
                    required
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-rose-500 text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-800 mb-1">
                  Profession / Occupation *
                </label>
                <input
                  type="text"
                  value={profession}
                  onChange={(e) => setProfession(e.target.value)}
                  placeholder="e.g. Lead Software Architect"
                  required
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-rose-500 text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-800 mb-1">
                  About Yourself
                </label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows={2}
                  placeholder="Share a short introduction about your lifestyle and family values..."
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-rose-500 text-slate-900"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                <span>Complete Registration</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
