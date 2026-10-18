import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { ProfileCard } from '../components/ProfileCard';
import { Search, Filter, X, RotateCcw, Users, Sparkles, SlidersHorizontal } from 'lucide-react';

export const ExploreView: React.FC = () => {
  const { visibleProfiles, currentUser } = useApp();

  // Search & Filters State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGender, setSelectedGender] = useState<'all' | 'female' | 'male'>(
    currentUser?.role === 'bride' ? 'male' : 'female'
  );
  const [selectedCity, setSelectedCity] = useState<string>('all');
  const [selectedEducation, setSelectedEducation] = useState<string>('all');
  const [minAge, setMinAge] = useState<number>(20);
  const [maxAge, setMaxAge] = useState<number>(45);
  const [sortBy, setSortBy] = useState<'recent' | 'age-asc' | 'age-desc'>('recent');

  // Derive unique cities and educations dynamically from dataset
  const availableCities = useMemo(() => {
    const set = new Set(visibleProfiles.map((p) => p.city));
    return Array.from(set).sort();
  }, [visibleProfiles]);

  const availableEducations = useMemo(() => {
    const list = visibleProfiles.map((p) => p.education.split(' ')[0]);
    return Array.from(new Set(list)).sort();
  }, [visibleProfiles]);

  // Filter logic
  const filteredProfiles = useMemo(() => {
    return visibleProfiles.filter((profile) => {
      // Gender filter
      if (selectedGender !== 'all' && profile.gender !== selectedGender) {
        return false;
      }

      // Age range
      if (profile.age < minAge || profile.age > maxAge) {
        return false;
      }

      // City filter
      if (selectedCity !== 'all' && profile.city.toLowerCase() !== selectedCity.toLowerCase()) {
        return false;
      }

      // Education filter
      if (selectedEducation !== 'all' && !profile.education.toLowerCase().includes(selectedEducation.toLowerCase())) {
        return false;
      }

      // Search query (name, profession, city, community)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = profile.displayName.toLowerCase().includes(query);
        const matchesCity = profile.city.toLowerCase().includes(query);
        const matchesProf = profile.profession.toLowerCase().includes(query);
        const matchesBio = profile.bio.toLowerCase().includes(query);
        if (!matchesName && !matchesCity && !matchesProf && !matchesBio) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'age-asc') return a.age - b.age;
      if (sortBy === 'age-desc') return b.age - a.age;
      // Default: recent
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [visibleProfiles, selectedGender, minAge, maxAge, selectedCity, selectedEducation, searchQuery, sortBy]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedGender(currentUser?.role === 'bride' ? 'male' : 'female');
    setSelectedCity('all');
    setSelectedEducation('all');
    setMinAge(20);
    setMaxAge(45);
    setSortBy('recent');
  };

  const isFiltered =
    searchQuery !== '' ||
    selectedCity !== 'all' ||
    selectedEducation !== 'all' ||
    minAge !== 20 ||
    maxAge !== 45 ||
    sortBy !== 'recent';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header with Dynamic Dataset Count */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="text-xs uppercase tracking-widest text-rose-600 font-bold">
            Curated Discovery Catalog
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 mt-1">
            Explore Verified Profiles
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Displaying <span className="font-bold text-rose-600">{filteredProfiles.length}</span> out of{' '}
            <span className="font-bold text-slate-900">{visibleProfiles.length}</span> active profiles in the database.
          </p>
        </div>

        {/* Perspective toggle (Bride / Groom / All) */}
        <div className="flex items-center gap-1.5 p-1 bg-white border border-slate-200 rounded-xl self-start md:self-auto text-xs shadow-xs">
          <button
            onClick={() => setSelectedGender('female')}
            className={`px-3.5 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
              selectedGender === 'female'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Bride Profiles ({visibleProfiles.filter((p) => p.gender === 'female').length})
          </button>
          <button
            onClick={() => setSelectedGender('male')}
            className={`px-3.5 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
              selectedGender === 'male'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Groom Profiles ({visibleProfiles.filter((p) => p.gender === 'male').length})
          </button>
          <button
            onClick={() => setSelectedGender('all')}
            className={`px-3.5 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
              selectedGender === 'all'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All ({visibleProfiles.length})
          </button>
        </div>
      </div>

      {/* Filter and Search Bar Container */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        {/* Row 1: Search input and quick sorter */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          <div className="md:col-span-8 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by candidate name, city (e.g. Bengaluru), profession (e.g. Architect, Engineer)..."
              className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-rose-500 bg-slate-50/50 text-slate-900 placeholder:text-slate-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="md:col-span-4 flex items-center gap-2">
            <label className="text-xs font-semibold text-slate-600 shrink-0">
              Sort By:
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full py-2.5 px-3 text-xs rounded-xl border border-slate-200 bg-slate-50/50 focus:outline-none focus:border-rose-500 text-slate-800"
            >
              <option value="recent">Recently Added</option>
              <option value="age-asc">Age (Youngest First)</option>
              <option value="age-desc">Age (Mature First)</option>
            </select>
          </div>
        </div>

        {/* Row 2: Secondary Filters (City, Education, Age Range) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-slate-100">
          {/* City select */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-700 uppercase tracking-wider mb-1">
              City
            </label>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full py-2 px-3 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-rose-500 text-slate-800"
            >
              <option value="all">All Cities</option>
              {availableCities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          {/* Education select */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Education
            </label>
            <select
              value={selectedEducation}
              onChange={(e) => setSelectedEducation(e.target.value)}
              className="w-full py-2 px-3 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-rose-500 text-slate-800"
            >
              <option value="all">All Qualifications</option>
              {availableEducations.map((edu) => (
                <option key={edu} value={edu}>
                  {edu}
                </option>
              ))}
            </select>
          </div>

          {/* Age range slider */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-[11px] font-semibold text-slate-700 uppercase tracking-wider">
                Age Range
              </label>
              <span className="font-mono text-xs text-rose-600 font-bold">
                {minAge} – {maxAge} yrs
              </span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="range"
                min="20"
                max="45"
                value={minAge}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  if (val <= maxAge) setMinAge(val);
                }}
                className="w-full accent-rose-600"
              />
              <input
                type="range"
                min="20"
                max="45"
                value={maxAge}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  if (val >= minAge) setMaxAge(val);
                }}
                className="w-full accent-rose-600"
              />
            </div>
          </div>
        </div>

        {/* Clear filters row if active */}
        {isFiltered && (
          <div className="pt-2 flex items-center justify-between text-xs text-slate-500 border-t border-slate-100">
            <span>Filters currently applied</span>
            <button
              onClick={resetFilters}
              className="flex items-center gap-1 text-rose-600 font-bold hover:underline cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Clear All Filters</span>
            </button>
          </div>
        )}
      </div>

      {/* Profiles Grid or Empty State */}
      {filteredProfiles.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProfiles.map((profile) => (
            <ProfileCard key={profile.id} profile={profile} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 max-w-lg mx-auto space-y-4 shadow-xs">
          <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto border border-rose-100">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-xl font-bold text-slate-900">
            No Matching Profiles Found
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            We couldn't find any profiles matching your current search parameters or age criteria.
          </p>
          <button
            onClick={resetFilters}
            className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
          >
            Reset Filters to Show All Profiles
          </button>
        </div>
      )}
    </div>
  );
};
