import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Profile, MembershipPlan, PlanId, DemoUser } from '../types';
import {
  Shield,
  Plus,
  Trash2,
  Edit2,
  Eye,
  EyeOff,
  Check,
  X,
  RefreshCw,
  Sparkles,
  Users,
  CreditCard,
  Search,
  ArrowRight,
  UserCheck,
  Lock,
  Unlock,
  Calendar,
  ExternalLink
} from 'lucide-react';

export const AdminView: React.FC = () => {
  const {
    profiles,
    plans,
    inquiries,
    customers,
    currentUser,
    switchCustomerUser,
    adminAddProfile,
    adminUpdateProfile,
    adminDeleteProfile,
    adminToggleProfileVisibility,
    adminUpdatePlan,
    resetAllDemoData,
    setCurrentView
  } = useApp();

  const [activeTab, setActiveTab] = useState<'customers' | 'profiles' | 'add-profile' | 'plans' | 'inquiries'>('customers');
  const [customerSearch, setCustomerSearch] = useState('');
  const [profileSearch, setProfileSearch] = useState('');

  // New Profile Form State
  const [newName, setNewName] = useState('');
  const [newGender, setNewGender] = useState<'female' | 'male'>('female');
  const [newAge, setNewAge] = useState<number>(26);
  const [newCity, setNewCity] = useState('Bengaluru');
  const [newEducation, setNewEducation] = useState('B.Tech in Computer Science');
  const [newProfession, setNewProfession] = useState('Senior Product Designer');
  const [newBio, setNewBio] = useState('Passionate about art and architecture. Values empathy, learning, and close family bonds.');
  const [newPhoto, setNewPhoto] = useState('/src/assets/images/profile_ananya_portrait_1792322191115.jpg');

  // Edit Plan State
  const [editingPlanId, setEditingPlanId] = useState<PlanId | null>(null);
  const [editPlanPrice, setEditPlanPrice] = useState<number>(0);
  const [editPlanMessages, setEditPlanMessages] = useState<number>(1);

  // Filter customers in table
  const displayedCustomers = customers.filter((c) =>
    c.fullName.toLowerCase().includes(customerSearch.toLowerCase()) ||
    c.email.toLowerCase().includes(customerSearch.toLowerCase()) ||
    c.city.toLowerCase().includes(customerSearch.toLowerCase()) ||
    c.profession.toLowerCase().includes(customerSearch.toLowerCase())
  );

  // Filter profiles in table
  const displayedProfiles = profiles.filter((p) =>
    p.displayName.toLowerCase().includes(profileSearch.toLowerCase()) ||
    p.city.toLowerCase().includes(profileSearch.toLowerCase()) ||
    p.profession.toLowerCase().includes(profileSearch.toLowerCase())
  );

  const handleCreateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    adminAddProfile({
      displayName: newName.trim(),
      gender: newGender,
      age: Number(newAge),
      height: "5' 6\"",
      city: newCity.trim(),
      state: 'Karnataka',
      religion: 'Hindu',
      community: 'General',
      motherTongue: 'Hindi',
      education: newEducation.trim(),
      collegeOrUniversity: 'BITS Pilani',
      profession: newProfession.trim(),
      companyOrSector: 'Enterprise Firm',
      incomeRange: '₹18 - 25 LPA',
      bio: newBio.trim(),
      interests: ['Reading', 'Travel', 'Art'],
      photos: [newPhoto],
      familyDetails: {
        fatherOccupation: 'Senior Executive',
        motherOccupation: 'Educationist',
        familyType: 'Nuclear',
        familyValues: 'Moderate',
        siblings: '1 Sibling',
        nativePlace: newCity.trim(),
      },
      partnerPreferences: {
        ageRange: [25, 32],
        preferredCities: [newCity.trim(), 'Mumbai', 'Delhi NCR'],
        education: 'Graduate / Post Graduate',
        profession: 'Professional or Entrepreneur',
      },
      isSample: true,
      allowsContactUnlock: true,
      contactDetails: {
        phone: '+91 98XXX X0000',
        email: `${newName.toLowerCase().replace(/\s+/g, '.')}@bestsathi-sample.com`,
        guardianPhone: '+91 94XXX X0000',
      },
      isVisible: true,
    });

    setNewName('');
    setActiveTab('profiles');
  };

  const startEditPlan = (plan: MembershipPlan) => {
    setEditingPlanId(plan.id);
    setEditPlanPrice(plan.price);
    setEditPlanMessages(plan.messageUnlockLimit);
  };

  const saveEditPlan = (planId: PlanId) => {
    adminUpdatePlan(planId, {
      price: editPlanPrice,
      messageUnlockLimit: editPlanMessages,
    });
    setEditingPlanId(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Top Banner */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-rose-400 font-bold">
            <Shield className="w-4 h-4" />
            <span>Best Sathi Admin Portal (Demo Mode)</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white">
            Customer Directory & Platform Management
          </h1>
          <p className="text-xs text-slate-300">
            Track registered customers, monitor member activity, manage candidate profiles, and configure pricing plans.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={resetAllDemoData}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer border border-slate-700"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Demo State</span>
          </button>
          <button
            onClick={() => setCurrentView('dashboard')}
            className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer shadow-sm"
          >
            Customer View
          </button>
        </div>
      </div>

      {/* KPI Stats Bar */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold flex items-center justify-between">
            <span>Total Customers</span>
            <Users className="w-4 h-4 text-rose-600" />
          </div>
          <div className="font-serif text-3xl font-extrabold text-slate-900 mt-1 tabular-nums">
            {customers.length}
          </div>
          <div className="text-[11px] text-slate-500 mt-0.5">
            {customers.filter((c) => c.role === 'groom').length} Grooms · {customers.filter((c) => c.role === 'bride').length} Brides
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold flex items-center justify-between">
            <span>Candidate Profiles</span>
            <UserCheck className="w-4 h-4 text-rose-600" />
          </div>
          <div className="font-serif text-3xl font-extrabold text-slate-900 mt-1 tabular-nums">
            {profiles.length}
          </div>
          <div className="text-[11px] text-slate-500 mt-0.5">
            {profiles.filter((p) => p.isVisible).length} Active in Catalog
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold flex items-center justify-between">
            <span>Paid Subscriptions</span>
            <CreditCard className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="font-serif text-3xl font-extrabold text-emerald-600 mt-1 tabular-nums">
            {customers.filter((c) => c.membership.planId !== 'free').length}
          </div>
          <div className="text-[11px] text-slate-500 mt-0.5">Connect, Premium, & Royal</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold flex items-center justify-between">
            <span>Inquiries Logged</span>
            <Sparkles className="w-4 h-4 text-amber-500" />
          </div>
          <div className="font-serif text-3xl font-extrabold text-amber-500 mt-1 tabular-nums">
            {inquiries.length}
          </div>
          <div className="text-[11px] text-slate-500 mt-0.5">Customer marriage interests</div>
        </div>
      </div>

      {/* Admin Tabs */}
      <div className="flex border-b border-slate-200 text-xs font-semibold gap-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('customers')}
          className={`py-3 px-4 border-b-2 transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'customers'
              ? 'border-rose-600 text-rose-600 font-bold'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          <span>Registered Customers ({customers.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('profiles')}
          className={`py-3 px-4 border-b-2 transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'profiles'
              ? 'border-rose-600 text-rose-600 font-bold'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <UserCheck className="w-3.5 h-3.5" />
          <span>Candidate Profiles Directory ({profiles.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('add-profile')}
          className={`py-3 px-4 border-b-2 transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'add-profile'
              ? 'border-rose-600 text-rose-600 font-bold'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add New Candidate</span>
        </button>

        <button
          onClick={() => setActiveTab('plans')}
          className={`py-3 px-4 border-b-2 transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'plans'
              ? 'border-rose-600 text-rose-600 font-bold'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <CreditCard className="w-3.5 h-3.5" />
          <span>Membership Packages ({plans.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('inquiries')}
          className={`py-3 px-4 border-b-2 transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'inquiries'
              ? 'border-rose-600 text-rose-600 font-bold'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Customer Inquiries ({inquiries.length})</span>
        </button>
      </div>

      {/* ======================================================== */}
      {/* TAB 1: REGISTERED CUSTOMERS                              */}
      {/* ======================================================== */}
      {activeTab === 'customers' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="font-serif text-xl font-bold text-slate-900">
                Registered Customer Accounts
              </h2>
              <p className="text-xs text-slate-600">
                View all visitors who registered as Grooms or Brides, their active plan, and profiles they have unlocked.
              </p>
            </div>

            <div className="relative max-w-sm w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={customerSearch}
                onChange={(e) => setCustomerSearch(e.target.value)}
                placeholder="Search customers by name, email, or city..."
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-rose-500 text-slate-800"
              />
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 overflow-x-auto shadow-xs">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/75 text-slate-600 uppercase text-[10px] tracking-wider">
                  <th className="py-3.5 px-4 font-bold">Customer</th>
                  <th className="py-3.5 px-4 font-bold">Role</th>
                  <th className="py-3.5 px-4 font-bold">Location & Profession</th>
                  <th className="py-3.5 px-4 font-bold">Membership Tier</th>
                  <th className="py-3.5 px-4 font-bold text-center">Unlocks Left</th>
                  <th className="py-3.5 px-4 font-bold text-center">Unlocked Profiles</th>
                  <th className="py-3.5 px-4 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {displayedCustomers.map((cust) => {
                  const isCurrentActive = currentUser?.id === cust.id;
                  return (
                    <tr key={cust.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full overflow-hidden border border-slate-200 shrink-0 bg-slate-100">
                            <img
                              src={cust.photoUrl}
                              alt={cust.fullName}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <div className="font-bold text-slate-900 flex items-center gap-1.5">
                              <span>{cust.fullName}</span>
                              {isCurrentActive && (
                                <span className="text-[9px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.2 rounded">
                                  Current Active
                                </span>
                              )}
                            </div>
                            <div className="text-[11px] text-slate-500 font-mono">{cust.email}</div>
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          cust.role === 'groom' ? 'bg-slate-100 text-slate-800' : 'bg-rose-100 text-rose-800'
                        }`}>
                          {cust.role}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-slate-700">
                        <div className="font-medium text-slate-900">{cust.city}</div>
                        <div className="text-[11px] text-slate-500 truncate max-w-[160px]">{cust.profession}</div>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                          cust.membership.planId === 'elite'
                            ? 'bg-amber-100 text-amber-900 border border-amber-300'
                            : cust.membership.planId === 'premium'
                            ? 'bg-purple-100 text-purple-900 border border-purple-300'
                            : cust.membership.planId === 'connect'
                            ? 'bg-blue-100 text-blue-900 border border-blue-300'
                            : 'bg-slate-100 text-slate-700'
                        }`}>
                          {cust.membership.planName}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-center font-mono font-bold text-sm text-rose-600">
                        {cust.membership.remainingMessages}
                      </td>

                      <td className="py-3.5 px-4 text-center">
                        <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-full text-xs">
                          {cust.membership.unlockedProfileIds.length} Profiles
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => {
                            switchCustomerUser(cust);
                            setCurrentView('dashboard');
                          }}
                          className="px-3 py-1.5 bg-slate-900 hover:bg-black text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer shadow-xs"
                        >
                          Switch & View As Customer
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 2: PROFILES CATALOG                                  */}
      {/* ======================================================== */}
      {activeTab === 'profiles' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="relative max-w-sm w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={profileSearch}
                onChange={(e) => setProfileSearch(e.target.value)}
                placeholder="Search candidates by name, city, or profession..."
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-rose-500 text-slate-800"
              />
            </div>

            <button
              onClick={() => setActiveTab('add-profile')}
              className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 self-start sm:self-auto cursor-pointer shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Add Candidate Profile</span>
            </button>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 overflow-x-auto shadow-xs">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/75 text-slate-600 uppercase text-[10px] tracking-wider">
                  <th className="py-3 px-4">Profile</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Location</th>
                  <th className="py-3 px-4">Profession</th>
                  <th className="py-3 px-4">Visibility</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {displayedProfiles.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden border border-slate-200 shrink-0 bg-slate-100">
                          <img
                            src={p.photos[0]}
                            alt={p.displayName}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-bold text-slate-900">{p.displayName}</div>
                          <div className="text-[11px] text-slate-500">{p.age} yrs · {p.education.slice(0, 24)}</div>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-4 capitalize font-semibold text-rose-600">
                      {p.gender === 'female' ? 'Bride' : 'Groom'}
                    </td>

                    <td className="py-3 px-4 text-slate-700">{p.city}</td>

                    <td className="py-3 px-4 text-slate-700">{p.profession}</td>

                    <td className="py-3 px-4">
                      <button
                        onClick={() => adminToggleProfileVisibility(p.id)}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold transition-colors cursor-pointer ${
                          p.isVisible
                            ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                            : 'bg-slate-100 text-slate-600 border border-slate-300'
                        }`}
                      >
                        {p.isVisible ? (
                          <>
                            <Eye className="w-3 h-3 text-emerald-600" />
                            <span>Live / Visible</span>
                          </>
                        ) : (
                          <>
                            <EyeOff className="w-3 h-3 text-slate-500" />
                            <span>Hidden</span>
                          </>
                        )}
                      </button>
                    </td>

                    <td className="py-3 px-4 text-right space-x-2">
                      <button
                        onClick={() => setCurrentView('profile-detail', p.id)}
                        className="px-2.5 py-1 text-xs text-rose-600 hover:bg-rose-50 rounded-lg border border-rose-200 cursor-pointer"
                      >
                        Preview
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Remove profile for "${p.displayName}" from the demonstration dataset?`)) {
                            adminDeleteProfile(p.id);
                          }
                        }}
                        className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg cursor-pointer"
                        title="Delete Profile"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 3: ADD PROFILE FORM                                  */}
      {/* ======================================================== */}
      {activeTab === 'add-profile' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs max-w-2xl space-y-6">
          <div>
            <h3 className="font-serif text-xl font-bold text-slate-900">
              Add New Candidate Profile
            </h3>
            <p className="text-xs text-slate-600">
              Create a sample bride or groom candidate record for the discovery catalog.
            </p>
          </div>

          <form onSubmit={handleCreateProfile} className="space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-800 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. Radhika Singhania"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-rose-500 text-slate-800"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-800 mb-1">Category *</label>
                <select
                  value={newGender}
                  onChange={(e) => setNewGender(e.target.value as any)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-rose-500 text-slate-800"
                >
                  <option value="female">Bride (Female)</option>
                  <option value="male">Groom (Male)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-800 mb-1">Age *</label>
                <input
                  type="number"
                  min="18"
                  max="60"
                  required
                  value={newAge}
                  onChange={(e) => setNewAge(Number(e.target.value))}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-rose-500 text-slate-800"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-800 mb-1">City *</label>
                <input
                  type="text"
                  required
                  value={newCity}
                  onChange={(e) => setNewCity(e.target.value)}
                  placeholder="e.g. Pune, Mumbai, Jaipur"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-rose-500 text-slate-800"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-800 mb-1">Education *</label>
                <input
                  type="text"
                  required
                  value={newEducation}
                  onChange={(e) => setNewEducation(e.target.value)}
                  placeholder="e.g. MBA in Finance / B.Tech"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-rose-500 text-slate-800"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-800 mb-1">Profession *</label>
                <input
                  type="text"
                  required
                  value={newProfession}
                  onChange={(e) => setNewProfession(e.target.value)}
                  placeholder="e.g. Management Consultant"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-rose-500 text-slate-800"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-800 mb-1">Candidate Portrait Photograph</label>
              <select
                value={newPhoto}
                onChange={(e) => setNewPhoto(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-rose-500 text-slate-800"
              >
                <option value="/src/assets/images/profile_ananya_portrait_1792322191115.jpg">Portrait 1 (Ananya Style)</option>
                <option value="/src/assets/images/profile_priya_portrait_1792322192372.jpg">Portrait 2 (Dr. Priya Style)</option>
                <option value="/src/assets/images/profile_meera_portrait_1792322191571.jpg">Portrait 3 (Meera Style)</option>
                <option value="/src/assets/images/profile_diya_portrait_1792322224546.jpg">Portrait 4 (Diya Style)</option>
                <option value="/src/assets/images/profile_tanvi_portrait_1792322224446.jpg">Portrait 5 (Tanvi Style)</option>
                <option value="/src/assets/images/profile_kavya_portrait_1792322224590.jpg">Portrait 6 (Kavya Style)</option>
                <option value="/src/assets/images/profile_rohit_portrait_1792322224570.jpg">Portrait 7 (Rohit Groom Style)</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-800 mb-1">Brief Bio & Values</label>
              <textarea
                rows={3}
                value={newBio}
                onChange={(e) => setNewBio(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-rose-500 text-slate-800"
              />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setActiveTab('profiles')}
                className="px-4 py-2 border border-slate-200 rounded-xl hover:bg-slate-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl cursor-pointer shadow-xs"
              >
                Save to Database
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 4: MEMBERSHIP PLANS                                   */}
      {/* ======================================================== */}
      {activeTab === 'plans' && (
        <div className="space-y-6">
          <div>
            <h3 className="font-serif text-xl font-bold text-slate-900">
              Membership Packages & Pricing
            </h3>
            <p className="text-xs text-slate-600">
              Configure package prices and messaging unlock quotas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan) => {
              const isEditing = editingPlanId === plan.id;
              return (
                <div
                  key={plan.id}
                  className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-slate-900">{plan.name}</span>
                    <span className="text-[10px] uppercase font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full">
                      {plan.validityDays} Days Validity
                    </span>
                  </div>

                  {isEditing ? (
                    <div className="space-y-3 pt-2">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-800">
                          Display Price (₹)
                        </label>
                        <input
                          type="number"
                          value={editPlanPrice}
                          onChange={(e) => setEditPlanPrice(Number(e.target.value))}
                          className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-800">
                          Message Unlock Limit
                        </label>
                        <input
                          type="number"
                          value={editPlanMessages}
                          onChange={(e) => setEditPlanMessages(Number(e.target.value))}
                          className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200"
                        />
                      </div>
                      <div className="flex gap-2 pt-2">
                        <button
                          onClick={() => saveEditPlan(plan.id)}
                          className="flex-1 py-1.5 bg-rose-600 text-white text-xs font-bold rounded-lg cursor-pointer"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingPlanId(null)}
                          className="px-3 py-1.5 border border-slate-200 text-xs rounded-lg cursor-pointer"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="font-serif text-3xl font-extrabold text-slate-900 tabular-nums">
                        ₹{plan.price}
                      </div>

                      <div className="text-xs text-slate-700 space-y-1">
                        <div>Messaging Allowance: <strong>{plan.messageUnlockLimit} Profile{plan.messageUnlockLimit > 1 ? 's' : ''}</strong></div>
                        <div>Contact Access: <strong>{plan.contactUnlockAllowed ? 'Eligible' : 'Not Included'}</strong></div>
                      </div>

                      <ul className="text-[11px] text-slate-600 space-y-1 border-t border-slate-100 pt-3">
                        {plan.benefits.map((b, i) => (
                          <li key={i}>· {b}</li>
                        ))}
                      </ul>

                      <button
                        onClick={() => startEditPlan(plan)}
                        className="w-full py-2 border border-slate-300 text-slate-800 hover:bg-slate-50 text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                        <span>Edit Pricing & Quota</span>
                      </button>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 5: CUSTOMER INQUIRIES & ACTIVITY                     */}
      {/* ======================================================== */}
      {activeTab === 'inquiries' && (
        <div className="space-y-4">
          <div>
            <h2 className="font-serif text-xl font-bold text-slate-900">
              Customer Inquiries Log
            </h2>
            <p className="text-xs text-slate-600">
              Review all formal expressions of interest initiated by customer accounts.
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs divide-y divide-slate-100">
            {inquiries.map((inq) => (
              <div key={inq.id} className="p-5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-slate-200">
                    <img
                      src={inq.profilePhoto}
                      alt={inq.profileName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-bold text-xs text-slate-900">
                      Inquiry Sent to: {inq.profileName}
                    </div>
                    <p className="text-xs text-slate-600 italic max-w-lg mt-0.5">
                      "{inq.message}"
                    </p>
                    <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                      {new Date(inq.createdAt).toLocaleString()} · From Customer: {inq.fromUserId}
                    </div>
                  </div>
                </div>

                <span className="px-3 py-1 bg-emerald-50 text-emerald-800 text-[10px] font-bold rounded-full">
                  {inq.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
