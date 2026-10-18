import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Heart,
  MessageSquare,
  Lock,
  Unlock,
  Send,
  MapPin,
  Briefcase,
  GraduationCap,
  Users,
  Calendar,
  Sparkles,
  ArrowLeft,
  ShieldCheck,
  Check,
  Phone,
  Mail,
  AlertCircle
} from 'lucide-react';

export const ProfileDetailView: React.FC = () => {
  const {
    selectedProfileId,
    getProfileById,
    setCurrentView,
    isShortlisted,
    toggleShortlist,
    openInquiryModal,
    unlockProfileMessaging,
    unlockContactDetails,
    currentUser,
    openCheckout,
    plans,
    openAuthModal,
    setActiveConversationProfileId,
    openUnlockModal
  } = useApp();

  const [activePhotoIndex, setActivePhotoIndex] = useState(0);

  const profile = selectedProfileId ? getProfileById(selectedProfileId) : undefined;

  if (!profile) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="font-serif text-2xl font-bold text-slate-900">Profile Not Found</h2>
        <p className="text-xs text-slate-600">The selected profile record is not present in our active demonstration database.</p>
        <button
          onClick={() => setCurrentView('explore')}
          className="px-5 py-2.5 bg-rose-600 text-white text-xs font-bold rounded-xl hover:bg-rose-700 transition-colors cursor-pointer"
        >
          Return to Profiles Directory
        </button>
      </div>
    );
  }

  const shortlisted = isShortlisted(profile.id);
  const isMessagingUnlocked = currentUser?.membership.unlockedProfileIds.includes(profile.id) || false;
  const isContactUnlocked = currentUser?.membership.unlockedContactProfileIds.includes(profile.id) || false;
  const remainingCredits = currentUser?.membership.remainingMessages || 0;
  const userPlanId = currentUser?.membership.planId || 'free';

  const handleStartChat = () => {
    if (!currentUser) {
      openAuthModal('login');
      return;
    }

    if (isMessagingUnlocked) {
      setActiveConversationProfileId(profile.id);
      setCurrentView('messages');
      return;
    }

    // Try unlock
    const res = unlockProfileMessaging(profile.id);
    if (res.success) {
      setActiveConversationProfileId(profile.id);
      setCurrentView('messages');
    } else {
      openUnlockModal(profile);
    }
  };

  const handleUnlockContact = () => {
    if (!currentUser) {
      openAuthModal('login');
      return;
    }

    if (userPlanId === 'free' || userPlanId === 'connect') {
      const premiumPlan = plans.find((p) => p.id === 'premium') || plans[1];
      openCheckout(premiumPlan);
      return;
    }

    unlockContactDetails(profile.id);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Back button & Breadcrumb */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setCurrentView('explore')}
          className="flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-rose-600 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Explore Profiles</span>
        </button>

        {profile.isSample && (
          <div className="px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-[11px] font-semibold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-rose-600" />
            <span>Sample Demonstration Profile</span>
          </div>
        )}
      </div>

      {/* Main Profile Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Photo Gallery & Primary CTAs */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl p-4 border border-slate-200 shadow-sm space-y-4">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-slate-100">
              <img
                src={profile.photos[activePhotoIndex] || profile.photos[0]}
                alt={profile.displayName}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

              <button
                onClick={() => toggleShortlist(profile.id)}
                className={`absolute top-4 right-4 p-3 rounded-full backdrop-blur-md transition-all cursor-pointer ${
                  shortlisted
                    ? 'bg-rose-600 text-white shadow-md'
                    : 'bg-white/80 hover:bg-white text-slate-700 hover:text-rose-600'
                }`}
                title={shortlisted ? 'Shortlisted' : 'Add to Shortlist'}
              >
                <Heart className={`w-5 h-5 ${shortlisted ? 'fill-current' : ''}`} />
              </button>

              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h1 className="font-serif text-2xl sm:text-3xl font-bold">
                  {profile.displayName}
                </h1>
                <div className="text-xs text-slate-200 flex items-center gap-1.5 mt-1">
                  <span>{profile.age} yrs</span>
                  <span>·</span>
                  <span>{profile.height}</span>
                  <span>·</span>
                  <span>{profile.city}, {profile.state}</span>
                </div>
              </div>
            </div>

            {/* Actions Grid */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <button
                onClick={() => openInquiryModal(profile)}
                className="py-3 px-4 bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <Send className="w-4 h-4 text-rose-600" />
                <span>Send Inquiry</span>
              </button>

              <button
                onClick={handleStartChat}
                className="py-3 px-4 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <MessageSquare className="w-4 h-4" />
                <span>{isMessagingUnlocked ? 'Open Chat' : 'Start Chat'}</span>
              </button>
            </div>

            {/* Messaging Entitlement Notice */}
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-700 space-y-1">
              <div className="flex items-center justify-between font-bold">
                <span className="text-slate-900">Profile Unlock Status:</span>
                <span className="font-mono text-xs text-rose-600">{remainingCredits} unlock{remainingCredits === 1 ? '' : 's'} available</span>
              </div>
              <p className="text-slate-500">
                {isMessagingUnlocked
                  ? '✓ Complete profile & messaging already unlocked for this candidate.'
                  : remainingCredits > 0
                  ? 'Initiating a conversation or viewing full details uses 1 profile unlock.'
                  : 'Upgrade to Connect, Premium or Royal to unlock candidate conversations.'}
              </p>
            </div>
          </div>

          {/* Direct Contact Information Component */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {isContactUnlocked ? (
                  <Unlock className="w-5 h-5 text-emerald-600" />
                ) : (
                  <Lock className="w-5 h-5 text-rose-600" />
                )}
                <h3 className="font-serif text-lg font-bold text-slate-900">
                  Direct Contact Information
                </h3>
              </div>
              <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${isContactUnlocked ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-50 text-rose-700 border border-rose-200'}`}>
                {isContactUnlocked ? 'Unlocked' : 'Protected'}
              </span>
            </div>

            {isContactUnlocked ? (
              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-3">
                <div className="text-xs text-emerald-900 font-semibold">
                  Verified Contact Details (Demonstration Mode):
                </div>
                <div className="space-y-2 text-xs text-slate-800">
                  <div className="flex items-center gap-2 font-mono">
                    <Phone className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Candidate: {profile.contactDetails.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 font-mono">
                    <Phone className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Guardian: {profile.contactDetails.guardianPhone}</span>
                  </div>
                  <div className="flex items-center gap-2 font-mono">
                    <Mail className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Email: {profile.contactDetails.email}</span>
                  </div>
                </div>
                <p className="text-[10px] text-emerald-700 italic">
                  Revealed under your active {currentUser?.membership.planName} tier.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-xs text-slate-600 leading-relaxed">
                  Candidate phone number, verified email address, and family representative telephone are hidden to preserve confidentiality.
                </p>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 space-y-1">
                  <div className="font-bold text-slate-900">
                    Unlock Requirements:
                  </div>
                  <p className="text-[11px] text-slate-600">
                    Direct contact unlock is available on <strong>PREMIUM (₹699)</strong> or <strong>ROYAL (₹1,499)</strong> tiers.
                  </p>
                </div>

                <button
                  onClick={handleUnlockContact}
                  className="w-full py-2.5 px-4 bg-slate-900 hover:bg-black text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <Unlock className="w-3.5 h-3.5" />
                  <span>
                    {userPlanId === 'premium' || userPlanId === 'elite'
                      ? 'Reveal Verified Contact Details'
                      : 'Upgrade to Premium to Unlock (₹699)'}
                  </span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: In-depth Editorial Profile Data */}
        <div className="lg:col-span-7 space-y-6">
          {/* About & Biography */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-900">
              About {profile.displayName}
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {profile.bio}
            </p>

            {/* Interests & Passions */}
            <div className="pt-2">
              <div className="text-[11px] uppercase tracking-wider font-bold text-rose-600 mb-2">
                Interests & Activities:
              </div>
              <div className="flex flex-wrap gap-2">
                {profile.interests.map((interest, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-slate-100 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Education & Career Background */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5">
            <h3 className="font-serif text-xl font-bold text-slate-900 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-rose-600" />
              <span>Career & Education</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Profession</div>
                <div className="font-bold text-sm text-slate-900 mt-0.5">{profile.profession}</div>
                <div className="text-slate-600 mt-0.5">{profile.companyOrSector}</div>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Education</div>
                <div className="font-bold text-sm text-slate-900 mt-0.5">{profile.education}</div>
                <div className="text-slate-600 mt-0.5">{profile.collegeOrUniversity}</div>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Annual Compensation</div>
                <div className="font-bold text-sm text-rose-600 mt-0.5">{profile.incomeRange}</div>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Location</div>
                <div className="font-bold text-sm text-slate-900 mt-0.5">{profile.city}, {profile.state}</div>
              </div>
            </div>
          </div>

          {/* Family & Cultural Background */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5">
            <h3 className="font-serif text-xl font-bold text-slate-900 flex items-center gap-2">
              <Users className="w-5 h-5 text-rose-600" />
              <span>Family & Cultural Background</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-semibold">Religion & Community</span>
                <span className="font-bold text-slate-900">{profile.religion} · {profile.community}</span>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-semibold">Mother Tongue</span>
                <span className="font-bold text-slate-900">{profile.motherTongue}</span>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-semibold">Father's Profession</span>
                <span className="font-bold text-slate-900">{profile.familyDetails.fatherOccupation}</span>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-semibold">Mother's Profession</span>
                <span className="font-bold text-slate-900">{profile.familyDetails.motherOccupation}</span>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-semibold">Family Type & Values</span>
                <span className="font-bold text-slate-900">{profile.familyDetails.familyType} Family · {profile.familyDetails.familyValues} Values</span>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-semibold">Native Place</span>
                <span className="font-bold text-slate-900">{profile.familyDetails.nativePlace}</span>
              </div>
            </div>
          </div>

          {/* Desired Partner Preferences */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-serif text-xl font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-rose-600" />
              <span>Desired Partner Expectations</span>
            </h3>

            <div className="space-y-3 text-xs text-slate-700">
              <div className="flex items-start gap-2">
                <span className="font-bold text-slate-900 w-28 shrink-0">Age Preference:</span>
                <span>{profile.partnerPreferences.ageRange[0]} to {profile.partnerPreferences.ageRange[1]} years</span>
              </div>

              <div className="flex items-start gap-2">
                <span className="font-bold text-slate-900 w-28 shrink-0">Preferred Cities:</span>
                <span>{profile.partnerPreferences.preferredCities.join(', ')}</span>
              </div>

              <div className="flex items-start gap-2">
                <span className="font-bold text-slate-900 w-28 shrink-0">Education:</span>
                <span>{profile.partnerPreferences.education}</span>
              </div>

              <div className="flex items-start gap-2">
                <span className="font-bold text-slate-900 w-28 shrink-0">Profession:</span>
                <span>{profile.partnerPreferences.profession}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
