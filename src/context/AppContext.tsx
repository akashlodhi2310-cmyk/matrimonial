import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Profile,
  MembershipPlan,
  DemoUser,
  Inquiry,
  Conversation,
  ChatMessage,
  PlanId
} from '../types';
import { INITIAL_PROFILES } from '../data/initialProfiles';
import { INITIAL_PLANS } from '../data/membershipPlans';

interface AppContextType {
  // Navigation / View
  currentView: string;
  selectedProfileId: string | null;
  setCurrentView: (view: string, profileId?: string) => void;

  // Profiles
  profiles: Profile[];
  visibleProfiles: Profile[];
  getProfileById: (id: string) => Profile | undefined;
  isProfileUnlocked: (profileId: string) => boolean;

  // Auth & Customer Management
  currentUser: DemoUser | null;
  customers: DemoUser[];
  switchCustomerUser: (user: DemoUser) => void;
  loginAsDemoGroom: () => void;
  loginAsDemoBride: () => void;
  loginAsAdmin: () => void;
  loginCustom: (email: string, role: 'groom' | 'bride', name?: string) => void;
  signupUser: (user: Omit<DemoUser, 'id' | 'membership' | 'createdAt'>) => void;
  logout: () => void;

  // Membership & Plans
  plans: MembershipPlan[];
  upgradePlan: (planId: PlanId) => void;
  unlockProfileWithCredit: (profileId: string) => boolean;
  unlockProfileMessaging: (profileId: string) => { success: boolean; message: string };
  unlockContactDetails: (profileId: string) => { success: boolean; message: string };

  // Profile Unlock Modal (for viewing complete profile)
  unlockModalProfile: Profile | null;
  openUnlockModal: (profile: Profile) => void;
  closeUnlockModal: () => void;
  targetUnlockProfileId: string | null;

  // Shortlists
  shortlistedIds: string[];
  toggleShortlist: (profileId: string) => void;
  isShortlisted: (profileId: string) => boolean;

  // Inquiries
  inquiries: Inquiry[];
  sendInquiry: (profileId: string, message: string) => void;

  // Messages / Chat
  conversations: Conversation[];
  messages: Record<string, ChatMessage[]>;
  activeConversationProfileId: string | null;
  setActiveConversationProfileId: (id: string | null) => void;
  sendMessage: (profileId: string, text: string) => void;

  // Admin Actions
  isAdmin: boolean;
  adminAddProfile: (profile: Omit<Profile, 'id' | 'createdAt'>) => void;
  adminUpdateProfile: (id: string, updates: Partial<Profile>) => void;
  adminDeleteProfile: (id: string) => void;
  adminToggleProfileVisibility: (id: string) => void;
  adminUpdatePlan: (planId: PlanId, updates: Partial<MembershipPlan>) => void;
  resetAllDemoData: () => void;

  // Toast notifications
  toastMessage: string | null;
  showToast: (msg: string) => void;

  // Checkout modal state
  checkoutPlan: MembershipPlan | null;
  openCheckout: (plan: MembershipPlan) => void;
  closeCheckout: () => void;

  // Inquiry modal state
  inquiryProfile: Profile | null;
  openInquiryModal: (profile: Profile) => void;
  closeInquiryModal: () => void;

  // Auth modal state
  authModalOpen: boolean;
  authModalInitialTab: 'login' | 'signup';
  authModalRole: 'groom' | 'bride';
  openAuthModal: (tab?: 'login' | 'signup', role?: 'groom' | 'bride') => void;
  closeAuthModal: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  PROFILES: 'bestsathi_profiles_v2',
  PLANS: 'bestsathi_plans_v2',
  USER: 'bestsathi_user_v2',
  CUSTOMERS: 'bestsathi_customers_v2',
  SHORTLISTS: 'bestsathi_shortlists_v2',
  INQUIRIES: 'bestsathi_inquiries_v2',
  CONVERSATIONS: 'bestsathi_conversations_v2',
  MESSAGES: 'bestsathi_messages_v2',
};

// Initial Registered Customers in Database
const INITIAL_CUSTOMERS: DemoUser[] = [
  {
    id: 'user-groom-01',
    fullName: 'Arjun Verma',
    email: 'arjun.verma@example.com',
    gender: 'male',
    role: 'groom',
    age: 29,
    city: 'Bengaluru',
    education: 'B.Tech + MBA',
    profession: 'Product Strategy Lead',
    bio: 'Tech enthusiast who loves classical music, weekend cycling, and thoughtful conversations over good coffee.',
    photoUrl: '/src/assets/images/profile_rohit_portrait_1792322224570.jpg',
    membership: {
      planId: 'connect',
      planName: 'CONNECT (₹299)',
      purchasedAt: '2026-03-20T10:00:00Z',
      validUntil: '2026-04-20T10:00:00Z',
      remainingMessages: 1,
      unlockedProfileIds: ['sathi-bride-01'],
      unlockedContactProfileIds: [],
    },
    createdAt: '2026-03-20T10:00:00Z',
  },
  {
    id: 'user-bride-01',
    fullName: 'Pooja Kulkarni',
    email: 'pooja.kulkarni@example.com',
    gender: 'female',
    role: 'bride',
    age: 27,
    city: 'Pune',
    education: 'M.Sc Biotechnology',
    profession: 'Research Scientist',
    bio: 'Biotech researcher who values traditional warmth, mutual understanding, and quiet weekends with family.',
    photoUrl: '/src/assets/images/profile_diya_portrait_1792322224546.jpg',
    membership: {
      planId: 'premium',
      planName: 'PREMIUM (₹699)',
      purchasedAt: '2026-03-21T10:00:00Z',
      validUntil: '2026-06-21T10:00:00Z',
      remainingMessages: 4,
      unlockedProfileIds: ['sathi-groom-01'],
      unlockedContactProfileIds: ['sathi-groom-01'],
    },
    createdAt: '2026-03-21T10:00:00Z',
  },
  {
    id: 'user-groom-02',
    fullName: 'Rohan Mehra',
    email: 'rohan.mehra@example.com',
    gender: 'male',
    role: 'groom',
    age: 30,
    city: 'Mumbai',
    education: 'Chartered Accountant (CA)',
    profession: 'Senior VP - Corporate Finance',
    bio: 'Finance professional looking for an educated partner with shared cultural values.',
    photoUrl: '/src/assets/images/profile_rohit_portrait_1792322224570.jpg',
    membership: {
      planId: 'free',
      planName: 'Standard Registration',
      remainingMessages: 0,
      unlockedProfileIds: [],
      unlockedContactProfileIds: [],
    },
    createdAt: '2026-03-23T14:15:00Z',
  },
  {
    id: 'user-groom-03',
    fullName: 'Sameer Nair',
    email: 'sameer.nair@example.com',
    gender: 'male',
    role: 'groom',
    age: 28,
    city: 'Hyderabad',
    education: 'M.S. Software Systems',
    profession: 'Principal Cloud Architect',
    bio: 'Passionate about travel, classical concerts, and building scalable tech.',
    photoUrl: '/src/assets/images/profile_rohit_portrait_1792322224570.jpg',
    membership: {
      planId: 'elite',
      planName: 'ELITE (₹1,499)',
      purchasedAt: '2026-03-25T09:30:00Z',
      validUntil: '2026-09-25T09:30:00Z',
      remainingMessages: 13,
      unlockedProfileIds: ['sathi-bride-02', 'sathi-bride-03'],
      unlockedContactProfileIds: ['sathi-bride-02'],
    },
    createdAt: '2026-03-25T09:30:00Z',
  }
];

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation
  const [currentView, setCurrentViewState] = useState<string>('home');
  const [selectedProfileId, setSelectedProfileId] = useState<string | null>(null);

  // Core Data
  const [profiles, setProfiles] = useState<Profile[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PROFILES);
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_PROFILES;
  });

  const [plans, setPlans] = useState<MembershipPlan[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PLANS);
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_PLANS;
  });

  const [customers, setCustomers] = useState<DemoUser[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CUSTOMERS);
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_CUSTOMERS;
  });

  const [currentUser, setCurrentUser] = useState<DemoUser | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.USER);
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_CUSTOMERS[0]; // Default logged in as Arjun Verma
  });

  const [shortlistedIds, setShortlistedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SHORTLISTS);
      if (saved) return JSON.parse(saved);
    } catch {}
    return ['sathi-bride-01', 'sathi-bride-03'];
  });

  const [inquiries, setInquiries] = useState<Inquiry[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.INQUIRIES);
      if (saved) return JSON.parse(saved);
    } catch {}
    return [
      {
        id: 'inq-01',
        fromUserId: 'user-groom-01',
        toProfileId: 'sathi-bride-01',
        profileName: 'Ananya Sharma',
        profilePhoto: '/src/assets/images/profile_ananya_portrait_1792322191115.jpg',
        message: 'Namaste Ananya ji, I read your profile with keen interest and felt our educational backgrounds and values align wonderfully. Would love to connect and know more about your journey.',
        createdAt: '2026-03-24T11:00:00Z',
        status: 'Interest Expressed',
      }
    ];
  });

  const [conversations, setConversations] = useState<Conversation[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CONVERSATIONS);
      if (saved) return JSON.parse(saved);
    } catch {}
    return [
      {
        id: 'conv-sathi-bride-01',
        profileId: 'sathi-bride-01',
        profileName: 'Ananya Sharma',
        profilePhoto: '/src/assets/images/profile_ananya_portrait_1792322191115.jpg',
        profileProfession: 'Senior Software Engineer',
        profileCity: 'Bengaluru',
        lastMessageText: 'Namaste! Thank you for reaching out. Yes, I noticed we both share a love for Hindustani music!',
        lastMessageAt: '2026-03-24T14:30:00Z',
        unread: false,
      }
    ];
  });

  const [messages, setMessages] = useState<Record<string, ChatMessage[]>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.MESSAGES);
      if (saved) return JSON.parse(saved);
    } catch {}
    return {
      'sathi-bride-01': [
        {
          id: 'msg-01',
          conversationId: 'conv-sathi-bride-01',
          sender: 'user',
          text: 'Hello Ananya, warm greetings from Arjun! It was lovely reading your bio. I noticed you enjoy weekend trails in Karnataka.',
          timestamp: '2026-03-24T12:00:00Z',
        },
        {
          id: 'msg-02',
          conversationId: 'conv-sathi-bride-01',
          sender: 'profile',
          text: 'Namaste Arjun! Thank you for reaching out. Yes, I noticed we both share a love for Hindustani music and quiet morning coffee trails.',
          timestamp: '2026-03-24T14:30:00Z',
        }
      ]
    };
  });

  const [activeConversationProfileId, setActiveConversationProfileId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [checkoutPlan, setCheckoutPlan] = useState<MembershipPlan | null>(null);
  const [inquiryProfile, setInquiryProfile] = useState<Profile | null>(null);
  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);
  const [authModalInitialTab, setAuthModalInitialTab] = useState<'login' | 'signup'>('login');
  const [authModalRole, setAuthModalRole] = useState<'groom' | 'bride'>('groom');

  // Specific Profile Unlock Flow state
  const [unlockModalProfile, setUnlockModalProfile] = useState<Profile | null>(null);
  const [targetUnlockProfileId, setTargetUnlockProfileId] = useState<string | null>(null);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PROFILES, JSON.stringify(profiles));
    } catch {}
  }, [profiles]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PLANS, JSON.stringify(plans));
    } catch {}
  }, [plans]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CUSTOMERS, JSON.stringify(customers));
    } catch {}
  }, [customers]);

  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(currentUser));
        // Update user inside customers list as well
        setCustomers((prev) =>
          prev.map((c) => (c.id === currentUser.id ? currentUser : c))
        );
      } else {
        localStorage.removeItem(STORAGE_KEYS.USER);
      }
    } catch {}
  }, [currentUser]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.SHORTLISTS, JSON.stringify(shortlistedIds));
    } catch {}
  }, [shortlistedIds]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(inquiries));
    } catch {}
  }, [inquiries]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CONVERSATIONS, JSON.stringify(conversations));
    } catch {}
  }, [conversations]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(messages));
    } catch {}
  }, [messages]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 4000);
  };

  const setCurrentView = (view: string, profileId?: string) => {
    setCurrentViewState(view);
    if (profileId) {
      setSelectedProfileId(profileId);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getProfileById = (id: string) => {
    return profiles.find((p) => p.id === id);
  };

  const visibleProfiles = profiles.filter((p) => p.isVisible);

  // Check if profile details are unlocked for the current user
  const isProfileUnlocked = (profileId: string) => {
    if (!currentUser) return false;
    return currentUser.membership.unlockedProfileIds.includes(profileId);
  };

  const openUnlockModal = (profile: Profile) => {
    setUnlockModalProfile(profile);
    setTargetUnlockProfileId(profile.id);
  };

  const closeUnlockModal = () => {
    setUnlockModalProfile(null);
  };

  // Unlock Profile directly using existing membership credit
  const unlockProfileWithCredit = (profileId: string): boolean => {
    if (!currentUser) {
      setCurrentView('login');
      return false;
    }

    if (currentUser.membership.unlockedProfileIds.includes(profileId)) {
      showToast('Profile is already unlocked.');
      setCurrentView('profile-detail', profileId);
      closeUnlockModal();
      return true;
    }

    if (currentUser.membership.remainingMessages <= 0) {
      showToast('You have 0 unlocks remaining. Please choose a membership plan.');
      return false;
    }

    const updatedUser: DemoUser = {
      ...currentUser,
      membership: {
        ...currentUser.membership,
        remainingMessages: currentUser.membership.remainingMessages - 1,
        unlockedProfileIds: [...currentUser.membership.unlockedProfileIds, profileId],
      }
    };

    setCurrentUser(updatedUser);
    closeUnlockModal();
    const target = getProfileById(profileId);
    showToast(`Complete profile unlocked for ${target?.displayName || 'candidate'}!`);
    setCurrentView('profile-detail', profileId);
    return true;
  };

  // Shortlisting
  const toggleShortlist = (profileId: string) => {
    const isCurrently = shortlistedIds.includes(profileId);
    if (isCurrently) {
      setShortlistedIds((prev) => prev.filter((id) => id !== profileId));
      showToast('Profile removed from shortlist');
    } else {
      setShortlistedIds((prev) => [...prev, profileId]);
      showToast('Profile added to your shortlist');
    }
  };

  const isShortlisted = (profileId: string) => shortlistedIds.includes(profileId);

  // Inquiries
  const sendInquiry = (profileId: string, message: string) => {
    const target = getProfileById(profileId);
    if (!target) return;

    const newInquiry: Inquiry = {
      id: `inq-${Date.now()}`,
      fromUserId: currentUser?.id || 'guest',
      toProfileId: profileId,
      profileName: target.displayName,
      profilePhoto: target.photos[0] || '',
      message,
      createdAt: new Date().toISOString(),
      status: 'Interest Expressed',
    };

    setInquiries((prev) => [newInquiry, ...prev]);
    showToast(`Inquiry sent to ${target.displayName} successfully!`);
    setInquiryProfile(null);
  };

  // Membership upgrades & unlock target profile
  const upgradePlan = (planId: PlanId) => {
    const targetPlan = plans.find((p) => p.id === planId);
    if (!targetPlan) return;

    const profileToUnlock = targetUnlockProfileId;

    let updatedUser: DemoUser;

    if (!currentUser) {
      updatedUser = {
        ...INITIAL_CUSTOMERS[0],
        membership: {
          planId,
          planName: `${targetPlan.name} (₹${targetPlan.price})`,
          purchasedAt: new Date().toISOString(),
          validUntil: new Date(Date.now() + targetPlan.validityDays * 86400000).toISOString(),
          remainingMessages: Math.max(0, targetPlan.messageUnlockLimit - (profileToUnlock ? 1 : 0)),
          unlockedProfileIds: profileToUnlock ? [profileToUnlock] : [],
          unlockedContactProfileIds: targetPlan.contactUnlockAllowed && profileToUnlock ? [profileToUnlock] : [],
        }
      };
      setCustomers((prev) => [updatedUser, ...prev]);
    } else {
      const alreadyUnlocked = profileToUnlock && currentUser.membership.unlockedProfileIds.includes(profileToUnlock);
      const deductForTarget = profileToUnlock && !alreadyUnlocked ? 1 : 0;

      const newUnlocked = profileToUnlock && !alreadyUnlocked
        ? [...currentUser.membership.unlockedProfileIds, profileToUnlock]
        : currentUser.membership.unlockedProfileIds;

      const newContactUnlocked = targetPlan.contactUnlockAllowed && profileToUnlock
        ? Array.from(new Set([...currentUser.membership.unlockedContactProfileIds, profileToUnlock]))
        : currentUser.membership.unlockedContactProfileIds;

      updatedUser = {
        ...currentUser,
        membership: {
          planId,
          planName: `${targetPlan.name} (₹${targetPlan.price})`,
          purchasedAt: new Date().toISOString(),
          validUntil: new Date(Date.now() + targetPlan.validityDays * 86400000).toISOString(),
          remainingMessages: currentUser.membership.remainingMessages + targetPlan.messageUnlockLimit - deductForTarget,
          unlockedProfileIds: newUnlocked,
          unlockedContactProfileIds: newContactUnlocked,
        }
      };
    }

    setCurrentUser(updatedUser);
    setCheckoutPlan(null);
    closeUnlockModal();

    if (profileToUnlock) {
      const targetP = getProfileById(profileToUnlock);
      showToast(`Payment successful! ${targetPlan.name} activated & ${targetP?.displayName || 'profile'} unlocked!`);
      setCurrentView('profile-detail', profileToUnlock);
      setTargetUnlockProfileId(null);
    } else {
      showToast(`Payment successful! Upgraded to ${targetPlan.name} membership.`);
    }
  };

  // Unlock Profile Messaging
  const unlockProfileMessaging = (profileId: string): { success: boolean; message: string } => {
    if (!currentUser) {
      setCurrentView('login');
      return { success: false, message: 'Please sign in or register to unlock messaging.' };
    }

    if (currentUser.membership.unlockedProfileIds.includes(profileId)) {
      return { success: true, message: 'Messaging already unlocked for this profile.' };
    }

    if (currentUser.membership.remainingMessages <= 0) {
      const target = getProfileById(profileId);
      if (target) openUnlockModal(target);
      return {
        success: false,
        message: 'No remaining messaging credits. Please choose a membership plan.'
      };
    }

    const updatedUser: DemoUser = {
      ...currentUser,
      membership: {
        ...currentUser.membership,
        remainingMessages: currentUser.membership.remainingMessages - 1,
        unlockedProfileIds: [...currentUser.membership.unlockedProfileIds, profileId],
      }
    };
    setCurrentUser(updatedUser);

    showToast(`Messaging unlocked for ${getProfileById(profileId)?.displayName || 'profile'}! (1 credit used)`);
    return { success: true, message: 'Unlocked successfully.' };
  };

  // Unlock Contact Details
  const unlockContactDetails = (profileId: string): { success: boolean; message: string } => {
    if (!currentUser) {
      setCurrentView('login');
      return { success: false, message: 'Please sign in to access contact information.' };
    }

    const currentPlanId = currentUser.membership.planId;
    if (currentPlanId === 'free' || currentPlanId === 'connect') {
      const target = getProfileById(profileId);
      if (target) openUnlockModal(target);
      return {
        success: false,
        message: 'Contact details unlock requires a PREMIUM or ELITE membership plan.'
      };
    }

    const target = getProfileById(profileId);
    if (!target) return { success: false, message: 'Profile not found' };

    if (!target.allowsContactUnlock) {
      return { success: false, message: 'The member has restricted contact details display.' };
    }

    if (currentUser.membership.unlockedContactProfileIds.includes(profileId)) {
      return { success: true, message: 'Contact details already unlocked.' };
    }

    const updatedUser: DemoUser = {
      ...currentUser,
      membership: {
        ...currentUser.membership,
        unlockedContactProfileIds: [...currentUser.membership.unlockedContactProfileIds, profileId],
      }
    };
    setCurrentUser(updatedUser);
    showToast(`Verified contact details revealed for ${target.displayName}.`);
    return { success: true, message: 'Contact details unlocked.' };
  };

  // Send Chat Message
  const sendMessage = (profileId: string, text: string) => {
    if (!text.trim()) return;

    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      conversationId: `conv-${profileId}`,
      sender: 'user',
      text: text.trim(),
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => ({
      ...prev,
      [profileId]: [...(prev[profileId] || []), newMsg],
    }));

    setConversations((prev) =>
      prev.map((c) =>
        c.profileId === profileId
          ? {
              ...c,
              lastMessageText: text.trim(),
              lastMessageAt: new Date().toISOString(),
            }
          : c
      )
    );

    setTimeout(() => {
      const target = getProfileById(profileId);
      const demoReplyMsg: ChatMessage = {
        id: `msg-reply-${Date.now()}`,
        conversationId: `conv-${profileId}`,
        sender: 'profile',
        text: `Namaste! Thank you for your thoughtful message. As this is a Best Sathi demo profile for ${target?.displayName || 'the member'}, our family appreciates your interest and would be happy to discuss values and preferences.`,
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => ({
        ...prev,
        [profileId]: [...(prev[profileId] || []), demoReplyMsg],
      }));

      setConversations((prev) =>
        prev.map((c) =>
          c.profileId === profileId
            ? {
                ...c,
                lastMessageText: demoReplyMsg.text,
                lastMessageAt: demoReplyMsg.timestamp,
                unread: true,
              }
            : c
        )
      );
    }, 1500);
  };

  // Auth & Customer Switching
  const switchCustomerUser = (user: DemoUser) => {
    setCurrentUser(user);
    showToast(`Switched active view to customer: ${user.fullName} (${user.role.toUpperCase()})`);
  };

  const loginAsDemoGroom = () => {
    const groom = customers.find((c) => c.role === 'groom') || INITIAL_CUSTOMERS[0];
    setCurrentUser(groom);
    showToast(`Signed in as Customer Groom (${groom.fullName})`);
    setAuthModalOpen(false);
  };

  const loginAsDemoBride = () => {
    const bride = customers.find((c) => c.role === 'bride') || INITIAL_CUSTOMERS[1];
    setCurrentUser(bride);
    showToast(`Signed in as Customer Bride (${bride.fullName})`);
    setAuthModalOpen(false);
  };

  const loginAsAdmin = () => {
    setCurrentView('admin');
    showToast('Switched to Best Sathi Administrator Portal');
  };

  const loginCustom = (email: string, role: 'groom' | 'bride', name?: string) => {
    // Check if customer already exists
    const existing = customers.find((c) => c.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      setCurrentUser(existing);
      showToast(`Welcome back, ${existing.fullName}!`);
    } else {
      const newUser: DemoUser = {
        id: `cust-${Date.now()}`,
        fullName: name || (role === 'groom' ? 'Aditya Sengupta' : 'Shreya Deshpande'),
        email,
        gender: role === 'groom' ? 'male' : 'female',
        role,
        age: 28,
        city: 'Mumbai',
        education: 'Master Degree',
        profession: 'Professional',
        bio: 'Seeking a compassionate life partner on Best Sathi.',
        photoUrl: role === 'groom'
          ? '/src/assets/images/profile_rohit_portrait_1792322224570.jpg'
          : '/src/assets/images/profile_ananya_portrait_1792322191115.jpg',
        membership: {
          planId: 'free',
          planName: 'Free Registration',
          remainingMessages: 0,
          unlockedProfileIds: [],
          unlockedContactProfileIds: [],
        },
        createdAt: new Date().toISOString(),
      };
      setCustomers((prev) => [newUser, ...prev]);
      setCurrentUser(newUser);
      showToast(`Welcome to Best Sathi, ${newUser.fullName}!`);
    }
    setAuthModalOpen(false);
  };

  const signupUser = (userData: Omit<DemoUser, 'id' | 'membership' | 'createdAt'>) => {
    const newUser: DemoUser = {
      ...userData,
      id: `cust-${Date.now()}`,
      membership: {
        planId: 'free',
        planName: 'Standard Registration',
        remainingMessages: 0,
        unlockedProfileIds: [],
        unlockedContactProfileIds: [],
      },
      createdAt: new Date().toISOString(),
    };
    setCustomers((prev) => [newUser, ...prev]);
    setCurrentUser(newUser);
    showToast(`Profile created successfully! Welcome ${newUser.fullName}.`);
    setAuthModalOpen(false);
    setCurrentView('dashboard');
  };

  const logout = () => {
    setCurrentUser(null);
    showToast('Signed out of Best Sathi session.');
    setCurrentView('home');
  };

  // Admin Actions
  const adminAddProfile = (newProfileData: Omit<Profile, 'id' | 'createdAt'>) => {
    const newProfile: Profile = {
      ...newProfileData,
      id: `sathi-custom-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    setProfiles((prev) => [newProfile, ...prev]);
    showToast(`Demo Profile "${newProfile.displayName}" added successfully!`);
  };

  const adminUpdateProfile = (id: string, updates: Partial<Profile>) => {
    setProfiles((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
    );
    showToast('Profile updated successfully in dataset.');
  };

  const adminDeleteProfile = (id: string) => {
    setProfiles((prev) => prev.filter((p) => p.id !== id));
    showToast('Sample profile deleted from demo dataset.');
  };

  const adminToggleProfileVisibility = (id: string) => {
    setProfiles((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isVisible: !p.isVisible } : p))
    );
    showToast('Profile visibility updated.');
  };

  const adminUpdatePlan = (planId: PlanId, updates: Partial<MembershipPlan>) => {
    setPlans((prev) =>
      prev.map((pl) => (pl.id === planId ? { ...pl, ...updates } : pl))
    );
    showToast('Membership plan pricing and configuration saved.');
  };

  const resetAllDemoData = () => {
    localStorage.removeItem(STORAGE_KEYS.PROFILES);
    localStorage.removeItem(STORAGE_KEYS.PLANS);
    localStorage.removeItem(STORAGE_KEYS.CUSTOMERS);
    localStorage.removeItem(STORAGE_KEYS.USER);
    localStorage.removeItem(STORAGE_KEYS.SHORTLISTS);
    localStorage.removeItem(STORAGE_KEYS.INQUIRIES);
    localStorage.removeItem(STORAGE_KEYS.CONVERSATIONS);
    localStorage.removeItem(STORAGE_KEYS.MESSAGES);
    setProfiles(INITIAL_PROFILES);
    setPlans(INITIAL_PLANS);
    setCustomers(INITIAL_CUSTOMERS);
    setCurrentUser(INITIAL_CUSTOMERS[0]);
    setShortlistedIds(['sathi-bride-01', 'sathi-bride-03']);
    setInquiries([]);
    showToast('Demo dataset & customer records reset to seed state.');
  };

  // Modals
  const openCheckout = (plan: MembershipPlan) => setCheckoutPlan(plan);
  const closeCheckout = () => setCheckoutPlan(null);

  const openInquiryModal = (profile: Profile) => setInquiryProfile(profile);
  const closeInquiryModal = () => setInquiryProfile(null);

  const openAuthModal = (tab: 'login' | 'signup' = 'login', role: 'groom' | 'bride' = 'groom') => {
    setAuthModalInitialTab(tab);
    setAuthModalRole(role);
    setAuthModalOpen(true);
  };
  const closeAuthModal = () => setAuthModalOpen(false);

  const isAdmin = currentView === 'admin';

  return (
    <AppContext.Provider
      value={{
        currentView,
        selectedProfileId,
        setCurrentView,
        profiles,
        visibleProfiles,
        getProfileById,
        isProfileUnlocked,
        currentUser,
        customers,
        switchCustomerUser,
        loginAsDemoGroom,
        loginAsDemoBride,
        loginAsAdmin,
        loginCustom,
        signupUser,
        logout,
        plans,
        upgradePlan,
        unlockProfileWithCredit,
        unlockProfileMessaging,
        unlockContactDetails,
        unlockModalProfile,
        openUnlockModal,
        closeUnlockModal,
        targetUnlockProfileId,
        shortlistedIds,
        toggleShortlist,
        isShortlisted,
        inquiries,
        sendInquiry,
        conversations,
        messages,
        activeConversationProfileId,
        setActiveConversationProfileId,
        sendMessage,
        isAdmin,
        adminAddProfile,
        adminUpdateProfile,
        adminDeleteProfile,
        adminToggleProfileVisibility,
        adminUpdatePlan,
        resetAllDemoData,
        toastMessage,
        showToast,
        checkoutPlan,
        openCheckout,
        closeCheckout,
        inquiryProfile,
        openInquiryModal,
        closeInquiryModal,
        authModalOpen,
        authModalInitialTab,
        authModalRole,
        openAuthModal,
        closeAuthModal,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
