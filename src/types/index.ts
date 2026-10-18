export type Gender = 'female' | 'male';

export interface PartnerPreferences {
  ageRange: [number, number];
  preferredCities: string[];
  education: string;
  profession: string;
}

export interface ProfileFamilyDetails {
  fatherOccupation: string;
  motherOccupation: string;
  familyType: 'Nuclear' | 'Joint' | 'Extended';
  familyValues: 'Traditional' | 'Moderate' | 'Liberal';
  siblings: string;
  nativePlace: string;
}

export interface ProfileContactDetails {
  phone: string;
  email: string;
  guardianPhone: string;
}

export interface Profile {
  id: string;
  displayName: string;
  gender: Gender;
  age: number;
  height: string;
  city: string;
  state: string;
  religion: string;
  community: string;
  motherTongue: string;
  education: string;
  collegeOrUniversity: string;
  profession: string;
  companyOrSector: string;
  incomeRange: string;
  bio: string;
  interests: string[];
  photos: string[];
  familyDetails: ProfileFamilyDetails;
  partnerPreferences: PartnerPreferences;
  isSample: boolean;
  allowsContactUnlock: boolean;
  contactDetails: ProfileContactDetails;
  createdAt: string;
  isVisible: boolean;
}

export type PlanId = 'connect' | 'premium' | 'elite';

export interface MembershipPlan {
  id: PlanId;
  name: string;
  price: number;
  validityDays: number;
  description: string;
  messageUnlockLimit: number;
  contactUnlockAllowed: boolean;
  isRecommended?: boolean;
  benefits: string[];
  active: boolean;
  displayOrder: number;
}

export interface UserMembership {
  planId: 'free' | PlanId;
  planName: string;
  purchasedAt?: string;
  validUntil?: string;
  remainingMessages: number;
  unlockedProfileIds: string[];
  unlockedContactProfileIds: string[];
}

export interface DemoUser {
  id: string;
  fullName: string;
  email: string;
  gender: Gender;
  role: 'groom' | 'bride';
  age: number;
  city: string;
  education: string;
  profession: string;
  bio: string;
  photoUrl: string;
  membership: UserMembership;
  createdAt: string;
}

export interface Inquiry {
  id: string;
  fromUserId: string;
  toProfileId: string;
  profileName: string;
  profilePhoto: string;
  message: string;
  createdAt: string;
  status: 'Sent' | 'Delivered' | 'Interest Expressed';
}

export interface ChatMessage {
  id: string;
  conversationId: string;
  sender: 'user' | 'profile';
  text: string;
  timestamp: string;
}

export interface Conversation {
  id: string;
  profileId: string;
  profileName: string;
  profilePhoto: string;
  profileProfession: string;
  profileCity: string;
  lastMessageText: string;
  lastMessageAt: string;
  unread: boolean;
}
