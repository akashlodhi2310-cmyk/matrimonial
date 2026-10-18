import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Menu,
  X,
  Heart,
  MessageSquare,
  User,
  Shield,
  LogOut,
  ChevronDown,
  Sparkles,
  Compass
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    currentUser,
    logout,
    shortlistedIds,
    conversations
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const handleNavClick = (viewId: string) => {
    setCurrentView(viewId);
    setMobileMenuOpen(false);
    setProfileDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-[0_1px_3px_0_rgba(0,0,0,0.03)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-6">
        {/* Zone 1: Brand Wordmark with Customer Portal Tag if Logged In */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => handleNavClick(currentUser ? 'dashboard' : 'home')}
            className="text-left group cursor-pointer"
          >
            <div className="font-serif text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 group-hover:text-rose-600 transition-colors whitespace-nowrap">
              Best Sathi<span className="text-rose-600">.</span>
            </div>
            <div className="text-[10px] tracking-widest uppercase text-slate-400 font-semibold -mt-1">
              bestsathi.com
            </div>
          </button>

          {currentUser && (
            <span className="hidden sm:inline-flex items-center px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 text-[10px] font-bold uppercase tracking-wider border border-rose-200">
              Customer Portal
            </span>
          )}
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 text-xs font-semibold text-slate-600">
          {currentUser ? (
            /* Logged In Customer Navigation */
            <>
              <button
                onClick={() => handleNavClick('dashboard')}
                className={`py-1.5 transition-colors whitespace-nowrap border-b-2 cursor-pointer ${
                  currentView === 'dashboard'
                    ? 'border-rose-600 text-rose-600 font-bold'
                    : 'border-transparent hover:text-slate-900'
                }`}
              >
                My Dashboard
              </button>

              <button
                onClick={() => handleNavClick('explore')}
                className={`py-1.5 transition-colors whitespace-nowrap border-b-2 cursor-pointer ${
                  currentView === 'explore'
                    ? 'border-rose-600 text-rose-600 font-bold'
                    : 'border-transparent hover:text-slate-900'
                }`}
              >
                Browse Matches
              </button>

              <button
                onClick={() => handleNavClick('messages')}
                className={`py-1.5 transition-colors whitespace-nowrap border-b-2 flex items-center gap-1.5 cursor-pointer ${
                  currentView === 'messages'
                    ? 'border-rose-600 text-rose-600 font-bold'
                    : 'border-transparent hover:text-slate-900'
                }`}
              >
                <span>Messages</span>
                <span className="font-mono text-[10px] bg-rose-600 text-white px-1.5 py-0.2 rounded-full">
                  {conversations.length}
                </span>
              </button>

              <button
                onClick={() => handleNavClick('membership')}
                className={`py-1.5 transition-colors whitespace-nowrap border-b-2 cursor-pointer ${
                  currentView === 'membership'
                    ? 'border-rose-600 text-rose-600 font-bold'
                    : 'border-transparent hover:text-slate-900'
                }`}
              >
                Upgrade Plan
              </button>
            </>
          ) : (
            /* Visitor Navigation */
            <>
              <button
                onClick={() => handleNavClick('home')}
                className={`py-1.5 transition-colors whitespace-nowrap border-b-2 cursor-pointer ${
                  currentView === 'home'
                    ? 'border-rose-600 text-rose-600 font-bold'
                    : 'border-transparent hover:text-slate-900'
                }`}
              >
                Home
              </button>

              <button
                onClick={() => handleNavClick('explore')}
                className={`py-1.5 transition-colors whitespace-nowrap border-b-2 cursor-pointer ${
                  currentView === 'explore'
                    ? 'border-rose-600 text-rose-600 font-bold'
                    : 'border-transparent hover:text-slate-900'
                }`}
              >
                Explore Profiles
              </button>

              <button
                onClick={() => handleNavClick('membership')}
                className={`py-1.5 transition-colors whitespace-nowrap border-b-2 cursor-pointer ${
                  currentView === 'membership'
                    ? 'border-rose-600 text-rose-600 font-bold'
                    : 'border-transparent hover:text-slate-900'
                }`}
              >
                Membership Plans
              </button>

              <button
                onClick={() => handleNavClick('how-it-works')}
                className={`py-1.5 transition-colors whitespace-nowrap border-b-2 cursor-pointer ${
                  currentView === 'how-it-works'
                    ? 'border-rose-600 text-rose-600 font-bold'
                    : 'border-transparent hover:text-slate-900'
                }`}
              >
                How It Works
              </button>
            </>
          )}
        </nav>

        {/* Zone 3: Actions & Customer Profile Capsule */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          {currentUser ? (
            /* Logged In Customer User Capsule */
            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-3 pl-2 pr-3 py-1.5 rounded-2xl border border-slate-200 hover:border-slate-300 bg-white transition-all shadow-sm cursor-pointer"
              >
                <div className="w-9 h-9 rounded-full overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                  <img
                    src={currentUser.photoUrl}
                    alt={currentUser.fullName}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="text-left">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-slate-900 truncate max-w-[130px]">
                      {currentUser.fullName}
                    </span>
                    <span className="text-[10px] font-bold uppercase bg-slate-900 text-white px-1.5 py-0.2 rounded">
                      {currentUser.role === 'groom' ? 'Groom' : 'Bride'}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-[10px] text-slate-500 font-mono">
                    <span className="text-rose-600 font-bold font-sans">
                      {currentUser.membership.planName.split(' ')[0]}
                    </span>
                    <span>·</span>
                    <span className="text-emerald-700 font-bold">
                      {currentUser.membership.remainingMessages} Unlocks Left
                    </span>
                  </div>
                </div>

                <ChevronDown className="w-4 h-4 text-slate-400 shrink-0 ml-1" />
              </button>

              {/* Customer Dropdown */}
              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white border border-slate-200 rounded-2xl shadow-xl py-2 z-50 text-xs">
                  <div className="px-4 py-3 border-b border-slate-100 bg-slate-50">
                    <p className="font-bold text-sm text-slate-900">{currentUser.fullName}</p>
                    <p className="text-[11px] text-slate-500 truncate">{currentUser.email}</p>
                    <div className="mt-2 p-2 bg-white rounded-xl border border-slate-200 space-y-1">
                      <div className="flex justify-between text-[11px]">
                        <span className="text-slate-500">Active Plan:</span>
                        <span className="font-bold text-rose-600">{currentUser.membership.planName}</span>
                      </div>
                      <div className="flex justify-between text-[11px]">
                        <span className="text-slate-500">Remaining Credits:</span>
                        <span className="font-bold text-emerald-700 font-mono">
                          {currentUser.membership.remainingMessages} Unlocks
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleNavClick('dashboard')}
                    className="w-full px-4 py-2.5 text-left flex items-center gap-2.5 hover:bg-slate-50 text-slate-700 cursor-pointer"
                  >
                    <User className="w-4 h-4 text-slate-500" />
                    <span>Customer Dashboard</span>
                  </button>

                  <button
                    onClick={() => handleNavClick('explore')}
                    className="w-full px-4 py-2 text-left flex items-center justify-between hover:bg-slate-50 text-slate-700 cursor-pointer"
                  >
                    <span className="flex items-center gap-2.5">
                      <Compass className="w-4 h-4 text-slate-500" />
                      <span>Browse All Matches</span>
                    </span>
                  </button>

                  <button
                    onClick={() => handleNavClick('membership')}
                    className="w-full px-4 py-2 text-left flex items-center gap-2.5 hover:bg-slate-50 text-rose-600 font-semibold cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4 text-rose-600" />
                    <span>Top-up / Upgrade Plan</span>
                  </button>

                  <div className="border-t border-slate-100 my-1" />

                  <button
                    onClick={() => handleNavClick('admin')}
                    className="w-full px-4 py-2 text-left flex items-center gap-2.5 hover:bg-slate-50 text-slate-600 cursor-pointer"
                  >
                    <Shield className="w-4 h-4 text-slate-400" />
                    <span>Admin Portal Demo</span>
                  </button>

                  <button
                    onClick={() => {
                      setProfileDropdownOpen(false);
                      logout();
                    }}
                    className="w-full px-4 py-2 text-left flex items-center gap-2.5 hover:bg-rose-50 text-rose-700 cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Visitor CTA */
            <div className="flex items-center gap-3">
              <button
                onClick={() => handleNavClick('login')}
                className="text-xs font-semibold text-slate-700 hover:text-slate-900 px-3 py-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                Sign In
              </button>
              <button
                onClick={() => handleNavClick('signup')}
                className="px-5 py-2.5 text-xs font-semibold tracking-wide text-white bg-rose-600 hover:bg-rose-700 rounded-xl transition-all shadow-sm hover:shadow-md whitespace-nowrap shrink-0 cursor-pointer"
              >
                Create Account
              </button>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex items-center gap-2 md:hidden">
          {currentUser && (
            <button
              onClick={() => handleNavClick('dashboard')}
              className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-700"
            >
              <User className="w-5 h-5" />
            </button>
          )}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-700 hover:text-slate-900 transition-colors"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-lg">
          <div className="flex flex-col space-y-1">
            {currentUser ? (
              <>
                <button
                  onClick={() => handleNavClick('dashboard')}
                  className={`text-left px-3 py-2 rounded-xl text-xs font-bold ${
                    currentView === 'dashboard' ? 'bg-slate-900 text-white' : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  Customer Dashboard
                </button>
                <button
                  onClick={() => handleNavClick('explore')}
                  className={`text-left px-3 py-2 rounded-xl text-xs font-bold ${
                    currentView === 'explore' ? 'bg-slate-900 text-white' : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  Browse Matches
                </button>
                <button
                  onClick={() => handleNavClick('messages')}
                  className={`text-left px-3 py-2 rounded-xl text-xs font-bold ${
                    currentView === 'messages' ? 'bg-slate-900 text-white' : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  Messages ({conversations.length})
                </button>
                <button
                  onClick={() => handleNavClick('membership')}
                  className={`text-left px-3 py-2 rounded-xl text-xs font-bold ${
                    currentView === 'membership' ? 'bg-slate-900 text-white' : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  Membership Plans
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => handleNavClick('home')}
                  className="text-left px-3 py-2 rounded-xl text-xs font-semibold text-slate-700"
                >
                  Home
                </button>
                <button
                  onClick={() => handleNavClick('explore')}
                  className="text-left px-3 py-2 rounded-xl text-xs font-semibold text-slate-700"
                >
                  Explore Profiles
                </button>
                <button
                  onClick={() => handleNavClick('membership')}
                  className="text-left px-3 py-2 rounded-xl text-xs font-semibold text-slate-700"
                >
                  Membership Plans
                </button>
              </>
            )}

            <button
              onClick={() => handleNavClick('admin')}
              className="text-left px-3 py-2 rounded-xl text-xs text-rose-600 font-semibold hover:bg-slate-50"
            >
              Admin Portal Demo
            </button>
          </div>

          <div className="pt-3 border-t border-slate-100">
            {currentUser ? (
              <div className="space-y-2">
                <div className="text-xs text-slate-600 px-2 font-medium">
                  Logged in as <span className="font-bold text-slate-900">{currentUser.fullName}</span> ({currentUser.membership.planName})
                </div>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    logout();
                  }}
                  className="w-full text-left px-3 py-2 text-xs text-rose-700 hover:bg-rose-50 rounded-xl font-bold"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2 pt-2">
                <button
                  onClick={() => handleNavClick('login')}
                  className="w-full text-center py-2.5 text-xs font-semibold text-slate-700 border border-slate-200 rounded-xl"
                >
                  Sign In
                </button>
                <button
                  onClick={() => handleNavClick('signup')}
                  className="w-full text-center py-2.5 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-xl shadow-sm"
                >
                  Create Account
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
