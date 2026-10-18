import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ProfileCard } from '../components/ProfileCard';
import {
  User,
  Heart,
  MessageSquare,
  Send,
  Shield,
  Sparkles,
  Lock,
  Unlock,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Compass,
  Filter
} from 'lucide-react';

export const DashboardView: React.FC = () => {
  const {
    currentUser,
    visibleProfiles,
    shortlistedIds,
    inquiries,
    conversations,
    setCurrentView,
    plans,
    openCheckout,
    getProfileById,
    isProfileUnlocked,
    setActiveConversationProfileId
  } = useApp();

  const [activeTab, setActiveTab] = useState<'matches' | 'shortlists' | 'inquiries'>('matches');
  const [filterGender, setFilterGender] = useState<'all' | 'female' | 'male'>(
    currentUser?.role === 'groom' ? 'female' : 'male'
  );

  if (!currentUser) {
    return (
      <div className="max-w-md mx-auto my-20 p-8 bg-white rounded-3xl border border-slate-200 text-center space-y-4 shadow-sm">
        <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto border border-rose-100">
          <User className="w-6 h-6" />
        </div>
        <h2 className="font-serif text-2xl font-bold text-slate-900">Sign-In Required</h2>
        <p className="text-xs text-slate-600 leading-relaxed">
          Please sign in to access your customer dashboard, manage shortlists, and unlock candidate profiles.
        </p>
        <button
          onClick={() => setCurrentView('login')}
          className="px-6 py-2.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
        >
          Go to Sign In
        </button>
      </div>
    );
  }

  // Filter profiles for user's preference
  const targetProfiles = visibleProfiles.filter((p) => {
    if (filterGender !== 'all' && p.gender !== filterGender) return false;
    return true;
  });

  const shortlistedProfiles = shortlistedIds
    .map((id) => getProfileById(id))
    .filter(Boolean) as typeof visibleProfiles;

  const unlockedCount = currentUser.membership.unlockedProfileIds.length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* 1. CUSTOMER PORTAL HEADER HERO */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden border border-slate-800">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4 sm:gap-5">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 border-rose-500/60 shadow-md shrink-0 bg-slate-800">
              <img
                src={currentUser.photoUrl}
                alt={currentUser.fullName}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase tracking-widest text-rose-400 font-bold flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  <span>Customer Dashboard</span>
                </span>
                <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded-full text-slate-300 font-mono">
                  ID: {currentUser.id}
                </span>
              </div>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                Namaste, {currentUser.fullName}
              </h1>
              <p className="text-xs text-slate-300">
                {currentUser.role === 'groom' ? 'Groom Account' : 'Bride Account'} · {currentUser.city} · {currentUser.profession}
              </p>
            </div>
          </div>

          {/* Customer Membership Pill Widget */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="space-y-1">
              <div className="text-[10px] uppercase tracking-wider text-rose-300 font-bold">
                Current Plan
              </div>
              <div className="font-bold text-sm text-white flex items-center gap-2">
                <span>{currentUser.membership.planName}</span>
              </div>
              <div className="text-xs text-emerald-400 font-mono font-bold flex items-center gap-1">
                <Unlock className="w-3.5 h-3.5" />
                <span>{currentUser.membership.remainingMessages} Unlocks Remaining</span>
              </div>
            </div>

            <button
              onClick={() => setCurrentView('membership')}
              className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md whitespace-nowrap cursor-pointer"
            >
              Upgrade Plan
            </button>
          </div>
        </div>

        {/* Quick Demo Workflow Reminder Strip */}
        <div className="mt-6 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-rose-400 shrink-0" />
            <span>
              <strong>Matrimonial Privacy Rule:</strong> Photos are visible, but full backgrounds & contact details remain locked until unlocked via membership plans.
            </span>
          </div>
          <div className="text-rose-300 text-[11px] font-mono shrink-0">
            {unlockedCount} of {visibleProfiles.length} Profiles Unlocked
          </div>
        </div>
      </div>

      {/* 2. STATS OVERVIEW CARDS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold">Available Matches</div>
          <div className="font-serif text-2xl font-extrabold text-slate-900 mt-1 tabular-nums">
            {targetProfiles.length}
          </div>
          <div className="text-[11px] text-slate-500 mt-0.5">Registered candidate records</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold">Profiles Unlocked</div>
          <div className="font-serif text-2xl font-extrabold text-emerald-600 mt-1 tabular-nums">
            {unlockedCount}
          </div>
          <div className="text-[11px] text-slate-500 mt-0.5">Full education & bio visible</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold">Shortlisted</div>
          <div className="font-serif text-2xl font-extrabold text-rose-600 mt-1 tabular-nums">
            {shortlistedIds.length}
          </div>
          <div className="text-[11px] text-slate-500 mt-0.5">Saved for review</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold">Unlocks Left</div>
          <div className="font-serif text-2xl font-extrabold text-amber-500 mt-1 tabular-nums">
            {currentUser.membership.remainingMessages}
          </div>
          <div className="text-[11px] text-slate-500 mt-0.5">In your current plan</div>
        </div>
      </div>

      {/* 3. TABS NAVIGATION */}
      <div className="flex border-b border-slate-200 text-xs font-semibold gap-2">
        <button
          onClick={() => setActiveTab('matches')}
          className={`py-3 px-4 border-b-2 transition-colors cursor-pointer ${
            activeTab === 'matches'
              ? 'border-rose-600 text-rose-600 font-bold'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          Registered Matches ({targetProfiles.length})
        </button>

        <button
          onClick={() => setActiveTab('shortlists')}
          className={`py-3 px-4 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'shortlists'
              ? 'border-rose-600 text-rose-600 font-bold'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <span>Shortlisted Profiles</span>
          <span className="font-mono text-[10px] bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded">
            {shortlistedIds.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('inquiries')}
          className={`py-3 px-4 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'inquiries'
              ? 'border-rose-600 text-rose-600 font-bold'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <span>My Inquiries</span>
          <span className="font-mono text-[10px] bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded">
            {inquiries.length}
          </span>
        </button>
      </div>

      {/* 4. TAB: REGISTERED MATCHES (Profiles showing photo, but information locked) */}
      {activeTab === 'matches' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-serif text-2xl font-bold text-slate-900">
                Registered Candidate Profiles
              </h2>
              <p className="text-xs text-slate-600 mt-0.5">
                Click <strong>"View Complete Profile"</strong> on any candidate to open the 3 membership packages and unlock their complete background.
              </p>
            </div>

            {/* Gender Toggle for testing */}
            <div className="flex items-center gap-1.5 p-1 bg-white border border-slate-200 rounded-xl self-start sm:self-auto text-xs shadow-xs">
              <button
                onClick={() => setFilterGender('female')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
                  filterGender === 'female' ? 'bg-rose-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Brides ({visibleProfiles.filter((p) => p.gender === 'female').length})
              </button>
              <button
                onClick={() => setFilterGender('male')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
                  filterGender === 'male' ? 'bg-rose-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Grooms ({visibleProfiles.filter((p) => p.gender === 'male').length})
              </button>
              <button
                onClick={() => setFilterGender('all')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
                  filterGender === 'all' ? 'bg-rose-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All
              </button>
            </div>
          </div>

          {/* Profiles Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {targetProfiles.map((profile) => (
              <ProfileCard key={profile.id} profile={profile} />
            ))}
          </div>
        </div>
      )}

      {/* TAB: SHORTLISTS */}
      {activeTab === 'shortlists' && (
        <div className="space-y-6">
          <h2 className="font-serif text-2xl font-bold text-slate-900">
            Your Shortlisted Candidates ({shortlistedProfiles.length})
          </h2>

          {shortlistedProfiles.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {shortlistedProfiles.map((profile) => (
                <ProfileCard key={profile.id} profile={profile} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 max-w-md mx-auto space-y-3 shadow-xs">
              <Heart className="w-10 h-10 text-slate-300 mx-auto" />
              <h4 className="font-serif text-lg font-bold text-slate-900">No Shortlists Yet</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Click the heart icon on any registered match to save them to your personal shortlist.
              </p>
            </div>
          )}
        </div>
      )}

      {/* TAB: INQUIRIES */}
      {activeTab === 'inquiries' && (
        <div className="space-y-6">
          <h2 className="font-serif text-2xl font-bold text-slate-900">
            Your Sent Inquiries ({inquiries.length})
          </h2>

          {inquiries.length > 0 ? (
            <div className="bg-white rounded-3xl border border-slate-200 divide-y divide-slate-100 overflow-hidden shadow-xs">
              {inquiries.map((inq) => (
                <div key={inq.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl overflow-hidden border border-slate-200 shrink-0 bg-slate-100">
                      <img
                        src={inq.profilePhoto}
                        alt={inq.profileName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="space-y-1">
                      <div className="font-serif font-bold text-sm text-slate-900">
                        Inquiry to {inq.profileName}
                      </div>
                      <p className="text-xs text-slate-600 italic max-w-lg">
                        "{inq.message}"
                      </p>
                      <div className="text-[10px] text-slate-400 font-mono">
                        Sent on {new Date(inq.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-end sm:self-auto">
                    <span className="px-3 py-1 bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-semibold rounded-full flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{inq.status}</span>
                    </span>

                    <button
                      onClick={() => setCurrentView('profile-detail', inq.toProfileId)}
                      className="px-3 py-1.5 text-xs font-semibold text-rose-600 hover:bg-rose-50 border border-rose-200 rounded-xl transition-colors cursor-pointer"
                    >
                      View Profile
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 max-w-md mx-auto space-y-3 shadow-xs">
              <Send className="w-10 h-10 text-slate-300 mx-auto" />
              <h4 className="font-serif text-lg font-bold text-slate-900">No Inquiries Sent Yet</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                When you unlock a candidate's profile, you can express interest by sending a formal inquiry.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
