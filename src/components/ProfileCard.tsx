import React from 'react';
import { Profile } from '../types';
import { useApp } from '../context/AppContext';
import { Heart, MapPin, Briefcase, GraduationCap, ChevronRight, Lock, Unlock, Sparkles } from 'lucide-react';

interface ProfileCardProps {
  profile: Profile;
  onSelect?: (profile: Profile) => void;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({ profile, onSelect }) => {
  const {
    setCurrentView,
    isShortlisted,
    toggleShortlist,
    isProfileUnlocked,
    openUnlockModal
  } = useApp();

  const shortlisted = isShortlisted(profile.id);
  const unlocked = isProfileUnlocked(profile.id);

  const handleCardClick = () => {
    if (unlocked) {
      if (onSelect) {
        onSelect(profile);
      } else {
        setCurrentView('profile-detail', profile.id);
      }
    } else {
      // Trigger the 3 membership plans unlock popup
      openUnlockModal(profile);
    }
  };

  return (
    <div className="group relative bg-white rounded-3xl border border-slate-200 hover:border-slate-300 shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_28px_rgba(0,0,0,0.08)] transition-all duration-300 flex flex-col overflow-hidden">
      {/* Top Media Container: PHOTO ALWAYS VISIBLE */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-slate-100">
        <img
          src={profile.photos[0]}
          alt={profile.displayName}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={(e) => {
            (e.target as HTMLElement).style.display = 'none';
          }}
        />

        {/* Subtle gradient scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20 pointer-events-none" />

        {/* Unlocked / Locked status badge */}
        <div className="absolute top-3 left-3">
          {unlocked ? (
            <div className="px-2.5 py-1 bg-emerald-600/90 backdrop-blur-md rounded-lg text-[10px] font-bold tracking-wider text-white uppercase flex items-center gap-1 shadow-sm">
              <Unlock className="w-3 h-3" />
              <span>Full Details Unlocked</span>
            </div>
          ) : (
            <div className="px-2.5 py-1 bg-slate-900/80 backdrop-blur-md rounded-lg text-[10px] font-bold tracking-wider text-amber-300 uppercase flex items-center gap-1 border border-white/20">
              <Lock className="w-3 h-3 text-amber-400" />
              <span>Details Locked</span>
            </div>
          )}
        </div>

        {/* Shortlist Floating Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleShortlist(profile.id);
          }}
          className={`absolute top-3 right-3 p-2.5 rounded-full backdrop-blur-md transition-all cursor-pointer ${
            shortlisted
              ? 'bg-rose-600 text-white shadow-md'
              : 'bg-white/85 hover:bg-white text-slate-700 hover:text-rose-600'
          }`}
          title={shortlisted ? 'Remove from Shortlist' : 'Add to Shortlist'}
          aria-label={shortlisted ? 'Remove from Shortlist' : 'Add to Shortlist'}
        >
          <Heart className={`w-4 h-4 ${shortlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Bottom overlay: Photo, Name, Age, City */}
        <div className="absolute bottom-3.5 left-4 right-4 text-white">
          <h3 className="font-serif text-xl sm:text-2xl font-bold leading-tight drop-shadow-sm">
            {profile.displayName}
          </h3>
          <div className="text-xs text-slate-200 font-medium flex items-center gap-1.5 mt-0.5">
            <span>{profile.age} yrs</span>
            <span aria-hidden="true">·</span>
            <span>{profile.height}</span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-0.5">
              <MapPin className="w-3 h-3 text-amber-300" />
              {profile.city}
            </span>
          </div>
        </div>
      </div>

      {/* Information Container: HIDE/LOCK IF NOT UNLOCKED */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
        {unlocked ? (
          /* UNLOCKED: Complete details visible */
          <div className="space-y-2.5">
            <div className="text-xs text-slate-700 space-y-1">
              <div className="flex items-center gap-1.5 font-semibold text-slate-900">
                <Briefcase className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                <span className="truncate">{profile.profession}</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-600">
                <GraduationCap className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="truncate">{profile.education}</span>
              </div>
            </div>

            <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
              {profile.bio}
            </p>
          </div>
        ) : (
          /* LOCKED: Information hidden until complete profile is unlocked */
          <div className="space-y-2">
            <div className="p-3 bg-slate-50 rounded-2xl border border-dashed border-slate-300 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                <Lock className="w-3.5 h-3.5 text-rose-600" />
                <span>Information Hidden</span>
              </div>
              <span className="text-[10px] uppercase font-bold text-rose-600 tracking-wider">
                Unlock with Plan
              </span>
            </div>
            <p className="text-[11px] text-slate-500 italic leading-relaxed">
              Education, company details, family background & contact numbers are locked.
            </p>
          </div>
        )}

        {/* Action Button: View Complete Profile */}
        <div className="pt-2 border-t border-slate-100">
          <button
            onClick={handleCardClick}
            className={`w-full py-2.5 px-4 text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-sm ${
              unlocked
                ? 'bg-slate-900 hover:bg-black text-white'
                : 'bg-rose-600 hover:bg-rose-700 text-white'
            }`}
          >
            {unlocked ? (
              <>
                <Unlock className="w-3.5 h-3.5" />
                <span>View Full Profile</span>
              </>
            ) : (
              <>
                <Lock className="w-3.5 h-3.5 text-rose-200" />
                <span>View Complete Profile</span>
              </>
            )}
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
