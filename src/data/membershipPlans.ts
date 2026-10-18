import { MembershipPlan } from '../types';

export const INITIAL_PLANS: MembershipPlan[] = [
  {
    id: 'connect',
    name: 'CONNECT',
    price: 299,
    validityDays: 30,
    description: 'Essential discovery pack to initiate your search with dedicated messaging.',
    messageUnlockLimit: 1,
    contactUnlockAllowed: false,
    benefits: [
      'Explore all curated demonstration profiles',
      'Shortlist unlimited profiles of interest',
      'Unlock direct messaging for 1 selected profile',
      'Submit personalized demo inquiries'
    ],
    active: true,
    displayOrder: 1,
  },
  {
    id: 'premium',
    name: 'PREMIUM',
    price: 699,
    validityDays: 90,
    description: 'Our most balanced membership for serious seekers looking to connect meaningfully.',
    messageUnlockLimit: 5,
    contactUnlockAllowed: true,
    isRecommended: true,
    benefits: [
      'All Connect benefits included',
      'Messaging access for up to 5 selected profiles',
      'Contact-detail unlocks for eligible consented profiles',
      'Refined filters (Education, City, Lifestyle)',
      'Quarterly membership validity'
    ],
    active: true,
    displayOrder: 2,
  },
  {
    id: 'elite',
    name: 'ELITE',
    price: 1499,
    validityDays: 180,
    description: 'Comprehensive access with maximum conversation allowances and concierge assistance.',
    messageUnlockLimit: 15,
    contactUnlockAllowed: true,
    benefits: [
      'All Premium benefits included',
      'Messaging access for up to 15 selected profiles',
      'Eligible contact unlocks, subject to consent',
      'Priority match recommendations',
      'Priority customer assistance & direct WhatsApp support',
      'Extended 6-month validity period'
    ],
    active: true,
    displayOrder: 3,
  },
];
