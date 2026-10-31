import React, { useState, useMemo, useEffect } from 'react';
import { 
  Compass, Search, SlidersHorizontal, X, Filter, RotateCcw,
  Sparkles, Mountain, Calendar, Clock
} from 'lucide-react';
import api from '../api/axios'; // Apna path check kar lena
import PackageCard from '../components/PackageCard';

export default function Packages() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDuration, setSelectedDuration] = useState('ALL');
  const [selectedSeason, setSelectedSeason] = useState('ALL');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [sortBy, setSortBy] = useState('POPULAR');

  // 1. Backend se data fetch karo
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await api.get('/packages');
        
        // Backend data ko Frontend UI ke hisaab se map kar rahe hain
        const mappedData = response.data.map(pkg => ({
          ...pkg,
          // UI fields mapping
          startingPrice: pkg.pricePerAdult || 0,
          image: pkg.coverImage,
          durationText: `${pkg.durationDays} Days / ${pkg.durationNights} Nights`,
          route: Array.isArray(pkg.route) ? pkg.route.join(' → ') : pkg.route,
          overview: pkg.shortDescription || '',
          bestSeason: Array.isArray(pkg.bestSeason) ? pkg.bestSeason : [],
          
          // Fallback values (kyunki backend me ye fields nahi hain abhi)
          rating: pkg.rating || 5.0,
          reviewsCount: pkg.reviewsCount || 15,
          category: pkg.category || 'All Packages',
          isBestseller: pkg.isBestseller || false
        }));

        setPackages(mappedData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching packages:", error);
        setLoading(false);
      }
    };
    fetchPackages();
  }, []);

  // Filter categories (UI ke liye)
  const categories = [
    { label: 'All Packages', value: 'ALL' },
    { label: 'High Mountain Lakes', value: 'High Mountain Lakes' },
    { label: 'Extreme Adventure', value: 'Extreme Adventure & Bike' },
    { label: 'Cultural', value: 'Cultural & Monasteries' },
  ];

  // 2. Filtering & Sorting logic (Ab real data par chalega)
  const filteredPackages = useMemo(() => {
    return packages.filter((pkg) => {
      // Search term
      if (searchTerm) {
        const query = searchTerm.toLowerCase();
        const matchesTitle = pkg.title.toLowerCase().includes(query);
        const matchesRoute = pkg.route.toLowerCase().includes(query);
        const matchesOverview = pkg.overview.toLowerCase().includes(query);
        if (!matchesTitle && !matchesRoute && !matchesOverview) return false;
      }

      // Duration filter
      if (selectedDuration !== 'ALL') {
        if (selectedDuration === 'SHORT' && pkg.durationDays > 5) return false;
        if (selectedDuration === 'MEDIUM' && (pkg.durationDays < 6 || pkg.durationDays > 7)) return false;
        if (selectedDuration === 'LONG' && pkg.durationDays < 8) return false;
      }

      // Season filter
      if (selectedSeason !== 'ALL') {
        if (selectedSeason === 'SUMMER' && !pkg.bestSeason.includes('May') && !pkg.bestSeason.includes('June')) return false;
        if (selectedSeason === 'WINTER' && !pkg.bestSeason.includes('January')) return false;
      }

      // Category filter
      if (selectedCategory !== 'ALL' && pkg.category !== selectedCategory) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'PRICE_LOW_HIGH') return a.startingPrice - b.startingPrice;
      if (sortBy === 'PRICE_HIGH_LOW') return b.startingPrice - a.startingPrice;
      if (sortBy === 'DURATION') return a.durationDays - b.durationDays;
      return (b.rating * b.reviewsCount) - (a.rating * a.reviewsCount);
    });
  }, [packages, searchTerm, selectedDuration, selectedSeason, selectedCategory, sortBy]);

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedDuration('ALL');
    setSelectedSeason('ALL');
    setSelectedCategory('ALL');
    setSortBy('POPULAR');
  };

  const hasActiveFilters = 
    searchTerm !== '' || selectedDuration !== 'ALL' || 
    selectedSeason !== 'ALL' || selectedCategory !== 'ALL' || sortBy !== 'POPULAR';

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <h2 className="text-xl font-bold text-slate-700">Loading Expeditions...</h2>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* Page Header Banner */}
      <div className="bg-slate-900 text-white relative py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-25"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=1800&q=80')` }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent"></div>
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-3.5 py-1 rounded-full text-amber-300 text-xs font-semibold mb-4">
            <Compass className="w-4 h-4" />
            <span>All-Inclusive Ladakh Expeditions</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-serif tracking-tight text-white mb-3">
            Explore All Ladakh Packages
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto">
            From 5-day cultural retreats to 9-day extreme winter expeditions. Every tour includes pre-arranged Inner Line Permits and high-altitude emergency safety.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-7 relative z-20">
        {/* Search & Filter Top Bar (Same as before) */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200/80 p-4 sm:p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            <div className="md:col-span-5 relative">
              <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search Pangong, Nubra, Chadar..." className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/50 text-sm" />
              {searchTerm && <button onClick={() => setSearchTerm('')} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400"><X className="w-4 h-4" /></button>}
            </div>
            <div className="md:col-span-2">
              <select value={selectedDuration} onChange={(e) => setSelectedDuration(e.target.value)} className="w-full px-3 py-3 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50">
                <option value="ALL">All Durations</option>
                <option value="SHORT">Short (Up to 5 Days)</option>
                <option value="MEDIUM">Standard (6 - 7 Days)</option>
                <option value="LONG">Extended (8+ Days)</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <select value={selectedSeason} onChange={(e) => setSelectedSeason(e.target.value)} className="w-full px-3 py-3 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50">
                <option value="ALL">All Seasons</option>
                <option value="SUMMER">May - Oct (Summer)</option>
                <option value="WINTER">Jan - Feb (Chadar/Winter)</option>
              </select>
            </div>
            <div className="md:col-span-3">
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="w-full px-3 py-3 rounded-xl border border-slate-200 bg-white text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500/50">
                <option value="POPULAR">Sort: Most Popular</option>
                <option value="PRICE_LOW_HIGH">Price: Low to High</option>
                <option value="PRICE_HIGH_LOW">Price: High to Low</option>
                <option value="DURATION">Duration: Short to Long</option>
              </select>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-slate-100 flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-slate-500 mr-2 flex items-center"><Filter className="w-3.5 h-3.5 mr-1" /> Category:</span>
            {categories.map((cat) => (
              <button key={cat.value} onClick={() => setSelectedCategory(cat.value)} className={`text-xs px-3.5 py-1.5 rounded-full font-medium transition-all ${selectedCategory === cat.value ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}>
                {cat.label}
              </button>
            ))}
            {hasActiveFilters && (
              <button onClick={resetFilters} className="ml-auto text-xs text-amber-700 hover:text-amber-800 font-semibold flex items-center space-x-1">
                <RotateCcw className="w-3.5 h-3.5 mr-1" /> <span>Reset Filters</span>
              </button>
            )}
          </div>
        </div>

        {/* Results Counter */}
        <div className="mb-6 flex items-center justify-between text-sm text-slate-600">
          <span>Showing <strong className="text-slate-900">{filteredPackages.length}</strong> verified Ladakh packages</span>
        </div>

        {/* Packages Grid */}
        {filteredPackages.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPackages.map((pkg) => (
              // PackageCard me real data jayega
              <PackageCard key={pkg._id} pkg={pkg} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-lg mx-auto">
            <Mountain className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-slate-900 mb-1">No matching packages found</h3>
            <p className="text-slate-500 text-sm mb-6">Try adjusting your search criteria or resetting filters.</p>
            <button onClick={resetFilters} className="inline-flex items-center px-5 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800">
              <RotateCcw className="w-4 h-4 mr-1.5" /> Reset All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}