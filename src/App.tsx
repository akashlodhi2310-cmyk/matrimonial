/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { DemoNoticeBanner } from './components/DemoNoticeBanner';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';
import { CheckoutModal } from './components/CheckoutModal';
import { InquiryModal } from './components/InquiryModal';
import { AuthModal } from './components/AuthModal';
import { UnlockProfileModal } from './components/UnlockProfileModal';

// Views
import { LandingView } from './views/LandingView';
import { ExploreView } from './views/ExploreView';
import { ProfileDetailView } from './views/ProfileDetailView';
import { MembershipView } from './views/MembershipView';
import { MessagesView } from './views/MessagesView';
import { DashboardView } from './views/DashboardView';
import { HowItWorksView } from './views/HowItWorksView';
import { AdminView } from './views/AdminView';
import { LoginView } from './views/LoginView';
import { SignupView } from './views/SignupView';

const MainContent: React.FC = () => {
  const { currentView } = useApp();

  return (
    <main className="flex-1 min-h-[calc(100vh-140px)]">
      {currentView === 'home' && <LandingView />}
      {currentView === 'explore' && <ExploreView />}
      {currentView === 'profile-detail' && <ProfileDetailView />}
      {currentView === 'membership' && <MembershipView />}
      {currentView === 'messages' && <MessagesView />}
      {currentView === 'dashboard' && <DashboardView />}
      {currentView === 'how-it-works' && <HowItWorksView />}
      {currentView === 'admin' && <AdminView />}
      {currentView === 'login' && <LoginView />}
      {currentView === 'signup' && <SignupView />}
    </main>
  );
};

export default function App() {
  return (
    <AppProvider>
      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-rose-600 selection:text-white">
        <DemoNoticeBanner />
        <Navbar />
        <MainContent />
        <Footer />

        {/* Global Floating Modals & Feedback */}
        <UnlockProfileModal />
        <CheckoutModal />
        <InquiryModal />
        <AuthModal />
        <Toast />
      </div>
    </AppProvider>
  );
}
