import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  User,
  ShieldCheck,
  ArrowRight,
  Heart,
  Briefcase,
  GraduationCap,
  MapPin,
  Sparkles,
  Lock,
  CheckCircle2
} from 'lucide-react';

export const SignupView: React.FC = () => {
  const { setCurrentView, signupUser, showToast } = useApp();

  const [role, setRole] = useState<'groom' | 'bride'>('groom');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState<number>(27);
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [city, setCity] = useState('');
  const [education, setEducation] = useState('');
  const [profession, setProfession] = useState('');
  const [incomeRange, setIncomeRange] = useState('₹15 - 25 LPA');
  const [bio, setBio] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRoleChange = (newRole: 'groom' | 'bride') => {
    setRole(newRole);
    setGender(newRole === 'groom' ? 'male' : 'female');
  };

  const handleQuickFill = () => {
    if (role === 'groom') {
      setFullName('Aditya Kashyap');
      setEmail('aditya.kashyap@example.com');
      setAge(28);
      setCity('Pune');
      setEducation('B.Tech + MBA (NMIMS)');
      setProfession('Strategy & Operations Lead');
      setBio('Grounded professional who enjoys badminton, weekend road trips, and values thoughtful family conversations.');
    } else {
      setFullName('Sneha Kulkarni');
      setEmail('sneha.kulkarni@example.com');
      setAge(26);
      setCity('Bengaluru');
      setEducation('M.Sc in Data Science');
      setProfession('AI Research Engineer');
      setBio('Curious technologist passionate about music, books, and looking for an emotionally mature, kind-hearted companion.');
    }
    showToast('Form pre-filled with realistic sample credentials!');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (age < 18) {
      setError('Members must be at least 18 years of age to register.');
      return;
    }
    if (!fullName.trim() || !email.trim() || !city.trim() || !education.trim() || !profession.trim()) {
      setError('Please fill in all mandatory fields marked with an asterisk (*).');
      return;
    }
    if (!agreeTerms) {
      setError('Please accept the platform guidelines to proceed.');
      return;
    }

    setError('');
    setIsSubmitting(true);

    setTimeout(() => {
      signupUser({
        fullName: fullName.trim(),
        email: email.trim(),
        gender,
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
      setIsSubmitting(false);
      setCurrentView('dashboard');
    }, 700);
  };

  return (
    <div className="min-h-[85vh] py-12 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-50 text-rose-700 border border-rose-200 text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-rose-600" />
          <span>Matrimonial Profile Registration</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-slate-900">
          Begin Your Matrimonial Journey
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto">
          Create your profile to explore compatible candidates, curate your shortlist, and connect with dignity.
        </p>
      </div>

      {/* Main Registration Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-6">
        {/* Role Toggle Strip */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              1. I am registering as:
            </label>
            <button
              type="button"
              onClick={handleQuickFill}
              className="text-xs text-rose-600 font-bold flex items-center gap-1 hover:underline cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Auto-Fill Demo Details</span>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => handleRoleChange('groom')}
              className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                role === 'groom'
                  ? 'border-rose-600 bg-rose-50/50 shadow-xs ring-1 ring-rose-500'
                  : 'border-slate-200 bg-slate-50 hover:bg-white'
              }`}
            >
              <div className="font-bold text-sm text-slate-900">
                Groom (Seeking Bride)
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Primary male discovery access with curated bride recommendations.
              </p>
            </button>

            <button
              type="button"
              onClick={() => handleRoleChange('bride')}
              className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                role === 'bride'
                  ? 'border-rose-600 bg-rose-50/50 shadow-xs ring-1 ring-rose-500'
                  : 'border-slate-200 bg-slate-50 hover:bg-white'
              }`}
            >
              <div className="font-bold text-sm text-slate-900">
                Bride (Seeking Groom)
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Female discovery access with privacy protections.
              </p>
            </button>
          </div>
        </div>

        {error && (
          <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5 text-xs">
          <div className="font-bold text-slate-800 uppercase tracking-wider pt-2 border-t border-slate-100">
            2. Personal & Professional Details:
          </div>

          {/* Row: Name and Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-800 mb-1">Full Name *</label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Aditya Kashyap"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-rose-500 text-xs text-slate-900"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-800 mb-1">Email Address *</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. aditya@example.com"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-rose-500 text-xs text-slate-900"
              />
            </div>
          </div>

          {/* Row: Age and City */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-800 mb-1">Age (Years) *</label>
              <input
                type="number"
                min="18"
                max="65"
                required
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-rose-500 text-xs text-slate-900"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-800 mb-1">Current City *</label>
              <input
                type="text"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="e.g. Pune, Bengaluru, Mumbai"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-rose-500 text-xs text-slate-900"
              />
            </div>
          </div>

          {/* Row: Education and Profession */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-800 mb-1">Highest Qualification *</label>
              <input
                type="text"
                required
                value={education}
                onChange={(e) => setEducation(e.target.value)}
                placeholder="e.g. B.Tech / MBA / MBBS"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-rose-500 text-xs text-slate-900"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-800 mb-1">Profession / Designation *</label>
              <input
                type="text"
                required
                value={profession}
                onChange={(e) => setProfession(e.target.value)}
                placeholder="e.g. Senior Software Engineer"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-rose-500 text-xs text-slate-900"
              />
            </div>
          </div>

          {/* Income range */}
          <div>
            <label className="block font-semibold text-slate-800 mb-1">Annual Compensation</label>
            <select
              value={incomeRange}
              onChange={(e) => setIncomeRange(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-rose-500 text-xs text-slate-900 bg-white"
            >
              <option value="₹8 - 12 LPA">₹8 - 12 LPA</option>
              <option value="₹12 - 18 LPA">₹12 - 18 LPA</option>
              <option value="₹18 - 25 LPA">₹18 - 25 LPA</option>
              <option value="₹25 - 40 LPA">₹25 - 40 LPA</option>
              <option value="₹40+ LPA">₹40+ LPA</option>
            </select>
          </div>

          {/* Bio */}
          <div>
            <label className="block font-semibold text-slate-800 mb-1">About Me & Family Background</label>
            <textarea
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell prospective partners about your personality, upbringing, passions, and life vision..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-rose-500 text-xs text-slate-900"
            />
          </div>

          {/* Agree Terms */}
          <div className="pt-2">
            <label className="flex items-start gap-2.5 cursor-pointer text-slate-600">
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="mt-0.5 rounded text-rose-600 focus:ring-rose-500"
              />
              <span className="text-[11px] leading-relaxed">
                I confirm that I am registering for genuine matrimonial intentions. I agree to Best Sathi's matrimonial code of conduct and privacy terms.
              </span>
            </label>
          </div>

          {/* Submit */}
          <div className="pt-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Registering Member Profile...</span>
                </>
              ) : (
                <>
                  <span>Create Account & Enter Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>

        <div className="text-center pt-3 border-t border-slate-100 text-xs text-slate-600">
          Already registered?{' '}
          <button
            onClick={() => setCurrentView('login')}
            className="text-rose-600 font-bold hover:underline cursor-pointer"
          >
            Sign In Here
          </button>
        </div>
      </div>
    </div>
  );
};
