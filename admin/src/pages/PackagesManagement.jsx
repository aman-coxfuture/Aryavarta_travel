import React, { useState, useEffect } from 'react';
import { 
  Package, Plus, Edit3, Trash2, Eye, EyeOff, Image as ImageIcon, 
  UploadCloud, Clock, Mountain, Check, X, Save, AlertCircle,
  Calendar, ShieldCheck, MapPin, Utensils, Hotel, Sparkles, Layers
} from 'lucide-react';
import api from '../api/axios'; // Backend API

export default function PackagesManagement() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [isBuilderOpen, setIsBuilderOpen] = useState(false);
  const [editingPackageId, setEditingPackageId] = useState(null);
  const [toastMessage, setToastMessage] = useState('');
  
  // Image File state for Cloudinary upload
  const [imageFile, setImageFile] = useState(null);

  // Clean, empty Form State - No dummy/placeholder values
  const initialFormState = {
    title: '',
    slug: '',
    duration: '',
    startingPrice: '',
    maxAltitude: '',
    route: '',
    shortDescription: '',
    fullDescription: '',
    bestSeason: '',
    permitRequired: false,
    inclusions: '',
    exclusions: '',
    image: '',
    itinerary: [
      { 
        day: 1, 
        title: '', 
        description: '', 
        meals: '', 
        stay: '' 
      },
    ],
  };

  const [formData, setFormData] = useState(initialFormState);

  // 1. Fetch Packages from Backend
  const fetchPackages = async () => {
    try {
      setLoading(true);
      const res = await api.get('/admin/packages');
      setPackages(res.data);
    } catch (error) {
      console.error("Error fetching packages:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  // Helper to parse comma / newline separated text into string arrays
  const parseList = (val) => {
    if (Array.isArray(val)) return val;
    if (!val || typeof val !== 'string') return [];
    return val
      .split(/[\n,]+/)
      .map((s) => s.trim())
      .filter((s) => s.length > 0);
  };

  // Helper to parse route strings like "Leh - Nubra - Pangong"
  const parseRoute = (val) => {
    if (Array.isArray(val)) return val;
    if (!val || typeof val !== 'string') return [];
    return val
      .split(/[-–—→,]+/)
      .map((s) => s.trim())
      .filter((s) => s.length > 0);
  };

  // 2. Toggle Publish / Draft
  const handleToggleStatus = async (pkg) => {
    try {
      const newStatus = !pkg.isActive;
      await api.put(`/admin/packages/${pkg._id}`, { isActive: newStatus });
      
      setPackages((prev) =>
        prev.map((p) => (p._id === pkg._id ? { ...p, isActive: newStatus } : p))
      );
      showToast(`Package "${pkg.title}" ${newStatus ? 'Published Live' : 'Moved to Draft'}`);
    } catch (error) {
      alert("Failed to update status");
    }
  };

  // 3. Delete Package
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to deactivate/delete this tour package?')) {
      try {
        await api.delete(`/admin/packages/${id}`);
        setPackages((prev) => prev.filter((p) => p._id !== id));
        showToast('Package deactivated successfully');
      } catch (error) {
        alert("Failed to delete package");
      }
    }
  };

  // 4. Open Edit Mode (maps all existing backend package data to form fields)
  const handleEdit = (pkg) => {
    setEditingPackageId(pkg._id);
    setImageFile(null);
    
    const durationStr = `${pkg.durationDays || ''} Days / ${pkg.durationNights || ''} Nights`.trim();
    
    setFormData({
      title: pkg.title || '',
      slug: pkg.slug || '',
      duration: durationStr === 'Days / Nights' ? '' : durationStr,
      startingPrice: pkg.pricePerAdult ?? '',
      shortDescription: pkg.shortDescription || '',
      fullDescription: pkg.fullDescription || '',
      maxAltitude: pkg.altitudeInfo || '',
      route: Array.isArray(pkg.route) ? pkg.route.join(' - ') : (pkg.route || ''),
      bestSeason: Array.isArray(pkg.bestSeason) ? pkg.bestSeason.join(', ') : (pkg.bestSeason || ''),
      permitRequired: Boolean(pkg.permitRequired),
      inclusions: Array.isArray(pkg.inclusions) ? pkg.inclusions.join('\n') : (pkg.inclusions || ''),
      exclusions: Array.isArray(pkg.exclusions) ? pkg.exclusions.join('\n') : (pkg.exclusions || ''),
      image: pkg.coverImage || '',
      itinerary: (pkg.itinerary && pkg.itinerary.length > 0)
        ? pkg.itinerary.map((item, idx) => ({
            day: item.day || idx + 1,
            title: item.title || '',
            description: item.description || '',
            meals: Array.isArray(item.meals) ? item.meals.join(', ') : (item.meals || ''),
            stay: item.stay || '',
          }))
        : initialFormState.itinerary,
    });
    
    setIsBuilderOpen(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Open Create Mode (cleans state completely)
  const handleOpenCreate = () => {
    setEditingPackageId(null);
    setImageFile(null);
    setFormData(initialFormState);
    setIsBuilderOpen(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Dynamic Itinerary Builder Functions
  const handleAddDay = () => {
    const nextDayNum = formData.itinerary.length + 1;
    setFormData((prev) => ({
      ...prev,
      itinerary: [
        ...prev.itinerary, 
        { 
          day: nextDayNum, 
          title: '', 
          description: '', 
          meals: '', 
          stay: '' 
        }
      ],
    }));
  };

  const handleDeleteDay = (indexToDelete) => {
    if (formData.itinerary.length <= 1) {
      alert('A tour package must have at least 1 day in its itinerary.');
      return;
    }
    const updatedItinerary = formData.itinerary
      .filter((_, idx) => idx !== indexToDelete)
      .map((item, idx) => ({ ...item, day: idx + 1 }));

    setFormData((prev) => ({ ...prev, itinerary: updatedItinerary }));
  };

  const handleDayChange = (index, field, value) => {
    const updated = [...formData.itinerary];
    updated[index] = { ...updated[index], [field]: value };
    setFormData((prev) => ({ ...prev, itinerary: updated }));
  };

  // 5. Save Package (Create or Update with Cloudinary Image Upload & Full Schema Mapping)
  const handleSavePackage = async (targetStatus) => {
    if (!formData.title.trim()) {
      alert('Please provide a package title.');
      return;
    }

    setIsSubmitting(true);
    try {
      let finalImageUrl = formData.image;

      // Step 1: Upload image to Cloudinary if new file selected
      if (imageFile) {
        try {
          const imgData = new FormData();
          imgData.append('image', imageFile);
          const uploadRes = await api.post('/admin/upload', imgData, {
            headers: { 'Content-Type': 'multipart/form-data' },
          });
          if (uploadRes.data?.url) {
            finalImageUrl = uploadRes.data.url;
          }
        } catch (uploadErr) {
          console.error("Cloudinary upload error:", uploadErr);
          alert("Image upload failed: " + (uploadErr.response?.data?.message || uploadErr.message));
          setIsSubmitting(false);
          return;
        }
      }

      // Step 2: Duration string parsing
      const daysMatch = formData.duration.match(/(\d+)\s*Days?/i);
      const nightsMatch = formData.duration.match(/(\d+)\s*Nights?/i);
      const plainNumMatch = formData.duration.match(/^(\d+)$/);
      let durationDays = 1;
      let durationNights = 0;

      if (daysMatch) {
        durationDays = parseInt(daysMatch[1]);
        durationNights = nightsMatch ? parseInt(nightsMatch[1]) : Math.max(0, durationDays - 1);
      } else if (plainNumMatch) {
        durationDays = parseInt(plainNumMatch[1]);
        durationNights = Math.max(0, durationDays - 1);
      } else if (formData.itinerary.length > 0) {
        durationDays = formData.itinerary.length;
        durationNights = Math.max(0, durationDays - 1);
      }

      // Slug generation / preservation
      const cleanSlug = (formData.slug?.trim() || formData.title)
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');

      // Step 3: Map Itinerary with Meals & Stay fields (cleanly, without default dummy values)
      const mappedItinerary = formData.itinerary.map((item, idx) => ({
        day: Number(item.day) || idx + 1,
        title: item.title?.trim() || `Day ${idx + 1}`,
        description: item.description?.trim() || '',
        meals: parseList(item.meals),
        stay: item.stay?.trim() || '',
      }));

      // Fallback image if user left image field blank to satisfy database schema
      const resolvedCoverImage = finalImageUrl || 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=1200&q=80';

      // Step 4: Construct complete payload object matching backend Package model
      const payload = {
        title: formData.title.trim(),
        slug: cleanSlug,
        shortDescription: formData.shortDescription?.trim() || `${formData.title.trim()} expedition across Ladakh.`,
        fullDescription: formData.fullDescription?.trim() || formData.shortDescription?.trim() || `${formData.title.trim()} tour package.`,
        durationDays: durationDays,
        durationNights: durationNights,
        pricePerAdult: Number(formData.startingPrice) || 0,
        route: parseRoute(formData.route),
        itinerary: mappedItinerary,
        inclusions: parseList(formData.inclusions),
        exclusions: parseList(formData.exclusions),
        bestSeason: parseList(formData.bestSeason),
        altitudeInfo: formData.maxAltitude?.trim() || '',
        permitRequired: Boolean(formData.permitRequired),
        coverImage: resolvedCoverImage,
        isActive: targetStatus === 'Published',
      };

      // Step 5: API Call (PUT or POST)
      if (editingPackageId) {
        await api.put(`/admin/packages/${editingPackageId}`, payload);
        showToast('Package updated successfully!');
      } else {
        await api.post('/admin/packages', payload);
        showToast('New package created successfully!');
      }

      fetchPackages();
      setIsBuilderOpen(false);
    } catch (error) {
      console.error("Save package error:", error);
      alert(error.response?.data?.message || "Failed to save package");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading && packages.length === 0) {
    return (
      <div className="p-12 text-center text-slate-700 font-bold flex items-center justify-center space-x-2">
        <div className="w-5 h-5 border-2 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
        <span>Loading Packages Catalogue...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-slate-900 text-white text-xs px-4 py-3 rounded-xl shadow-2xl border border-amber-500/50 flex items-center space-x-2 animate-bounce">
          <Check className="w-4 h-4 text-emerald-400" />
          <span className="font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Page Title & Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600">Tour Catalogue</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-serif">Package Management</h1>
        </div>
        <div>
          {!isBuilderOpen ? (
            <button 
              type="button"
              onClick={handleOpenCreate} 
              className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm shadow-md flex items-center space-x-2 cursor-pointer transition-colors"
            >
              <Plus className="w-4 h-4" /> <span>Add New Package</span>
            </button>
          ) : (
            <button 
              type="button"
              onClick={() => setIsBuilderOpen(false)} 
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs sm:text-sm cursor-pointer transition-colors"
            >
              Back to List
            </button>
          )}
        </div>
      </div>

      {/* COMPREHENSIVE PACKAGE BUILDER FORM (Spacious, larger font & padding) */}
      {isBuilderOpen && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xl p-5 sm:p-7 md:p-9 space-y-7 sm:space-y-9 animate-fadeIn">
          
          {/* Form Header */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-serif">
                {editingPackageId ? 'Edit Package Details' : 'Create New Tour Package'}
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                Fill in the package information, day-by-day itinerary, inclusions, and logistics below.
              </p>
            </div>
            <button 
              type="button"
              onClick={() => setIsBuilderOpen(false)} 
              className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Section 1: Basic Information */}
          <div className="space-y-5">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center text-amber-700">
              <Package className="w-4 h-4 mr-2" /> 1. Core Package Details
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              <div className="sm:col-span-2">
                <label className="text-sm font-semibold text-slate-700 block mb-1.5">Package Title *</label>
                <input 
                  type="text" 
                  value={formData.title} 
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })} 
                  placeholder="e.g. Romantic Leh Ladakh Honeymoon Tour"
                  className="w-full p-3 rounded-xl border border-slate-300 text-base text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-colors" 
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-700 block mb-1.5">Starting Price Per Person (₹) *</label>
                <input 
                  type="number" 
                  value={formData.startingPrice} 
                  onChange={(e) => setFormData({ ...formData, startingPrice: e.target.value === '' ? '' : Number(e.target.value) })} 
                  placeholder="e.g. 25000"
                  className="w-full p-3 rounded-xl border border-slate-300 text-base font-bold text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-colors" 
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-700 block mb-1.5">Duration *</label>
                <input 
                  type="text" 
                  value={formData.duration} 
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })} 
                  placeholder="e.g. 8 Days / 7 Nights" 
                  className="w-full p-3 rounded-xl border border-slate-300 text-base text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-colors" 
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-700 block mb-1.5">Max Altitude</label>
                <input 
                  type="text" 
                  value={formData.maxAltitude} 
                  onChange={(e) => setFormData({ ...formData, maxAltitude: e.target.value })} 
                  placeholder="e.g. 17,582 ft (Khardung La)"
                  className="w-full p-3 rounded-xl border border-slate-300 text-base text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-colors" 
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-700 block mb-1.5">Route (Hyphen or comma separated)</label>
                <input 
                  type="text" 
                  value={formData.route} 
                  onChange={(e) => setFormData({ ...formData, route: e.target.value })} 
                  placeholder="e.g. Leh - Nubra - Turtuk - Pangong - Leh"
                  className="w-full p-3 rounded-xl border border-slate-300 text-base text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-colors" 
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-sm font-semibold text-slate-700 block mb-1.5">Best Season (Comma separated)</label>
                <input 
                  type="text" 
                  value={formData.bestSeason} 
                  onChange={(e) => setFormData({ ...formData, bestSeason: e.target.value })} 
                  placeholder="e.g. May, June, July, August, September, October"
                  className="w-full p-3 rounded-xl border border-slate-300 text-base text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-colors" 
                />
              </div>

              <div className="flex items-center pt-1 sm:pt-6">
                <label className="flex items-center space-x-3 cursor-pointer select-none bg-slate-50 p-3.5 rounded-xl border border-slate-200/90 w-full hover:bg-slate-100 transition-colors">
                  <input 
                    type="checkbox" 
                    checked={formData.permitRequired} 
                    onChange={(e) => setFormData({ ...formData, permitRequired: e.target.checked })} 
                    className="w-5 h-5 text-amber-600 rounded border-slate-300 focus:ring-amber-500 cursor-pointer"
                  />
                  <span className="text-sm font-bold text-slate-800">Inner Line Permits (ILP) Required</span>
                </label>
              </div>
            </div>
          </div>

          {/* Section 2: Descriptions */}
          <div className="space-y-5 pt-6 border-t border-slate-100">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center text-amber-700">
              <Layers className="w-4 h-4 mr-2" /> 2. Descriptions & Pricing Notes
            </h3>

            <div className="space-y-5">
              <div>
                <label className="text-sm font-semibold text-slate-700 block mb-1.5">
                  Short Description * <span className="text-xs text-slate-400 font-normal">(Brief 1-2 sentence summary for package cards)</span>
                </label>
                <input 
                  type="text" 
                  value={formData.shortDescription} 
                  onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })} 
                  placeholder="e.g. An enchanting romantic journey through high-altitude desert dunes, starlit camps, and azure lakes."
                  className="w-full p-3 rounded-xl border border-slate-300 text-base text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-colors" 
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-700 block mb-1.5">
                  Full Description * <span className="text-xs text-slate-400 font-normal">(Comprehensive overview, highlights, and tiered pricing)</span>
                </label>
                <textarea 
                  rows="4" 
                  value={formData.fullDescription} 
                  onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })} 
                  placeholder="Enter detailed description. You can also include tiered pricing like:&#10;Tiered Pricing:&#10;• 2 Adults: ₹42,500 per person&#10;• 4 Adults: ₹32,000 per person"
                  className="w-full p-3 rounded-xl border border-slate-300 text-base text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-colors" 
                />
              </div>
            </div>
          </div>

          {/* Section 3: Inclusions & Exclusions */}
          <div className="space-y-5 pt-6 border-t border-slate-100">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center text-amber-700">
              <ShieldCheck className="w-4 h-4 mr-2" /> 3. Inclusions & Exclusions
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="text-sm font-semibold text-slate-700 block mb-1.5">
                  Inclusions <span className="text-xs text-slate-400 font-normal">(Comma or line-separated)</span>
                </label>
                <textarea 
                  rows="4" 
                  value={formData.inclusions} 
                  onChange={(e) => setFormData({ ...formData, inclusions: e.target.value })} 
                  placeholder="e.g. Boutique Hotel Stay, Daily Breakfast & Dinner, Dedicated Innova Crysta, Inner Line Permits, Oxygen Cylinder..."
                  className="w-full p-3 rounded-xl border border-slate-300 text-base text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-colors" 
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-700 block mb-1.5">
                  Exclusions <span className="text-xs text-slate-400 font-normal">(Comma or line-separated)</span>
                </label>
                <textarea 
                  rows="4" 
                  value={formData.exclusions} 
                  onChange={(e) => setFormData({ ...formData, exclusions: e.target.value })} 
                  placeholder="e.g. Airfare to and from Leh, Lunches, Personal expenses, Monastery entry tickets, Travel insurance..."
                  className="w-full p-3 rounded-xl border border-slate-300 text-base text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-colors" 
                />
              </div>
            </div>
          </div>

          {/* Section 4: Dynamic Day-by-Day Itinerary Builder */}
          <div className="space-y-5 pt-6 border-t border-slate-100">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center text-amber-700">
                  <Calendar className="w-4 h-4 mr-2" /> 4. Day-by-Day Dynamic Itinerary ({formData.itinerary.length} Days)
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Specify day titles, activities, daily meal plans, and night stay locations.
                </p>
              </div>
              <button 
                type="button" 
                onClick={handleAddDay} 
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold flex items-center self-start sm:self-auto cursor-pointer transition-colors shadow-xs"
              >
                <Plus className="w-4 h-4 mr-1.5" /> Add Day {formData.itinerary.length + 1}
              </button>
            </div>
            
            <div className="space-y-4">
              {formData.itinerary.map((item, index) => (
                <div key={index} className="p-5 rounded-2xl border border-slate-200 bg-slate-50/70 hover:bg-slate-50 transition-colors space-y-4">
                  
                  {/* Day Header Row */}
                  <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
                    <span className="font-extrabold text-sm text-amber-800 bg-amber-100 border border-amber-200 px-3 py-1 rounded-lg">
                      Day {item.day}
                    </span>
                    <button 
                      type="button" 
                      onClick={() => handleDeleteDay(index)} 
                      className="text-rose-500 hover:text-rose-700 hover:bg-rose-100/70 p-1.5 rounded-lg transition-colors cursor-pointer"
                      title={`Delete Day ${item.day}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Title and Stay Inputs */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-semibold text-slate-700 block mb-1.5">Day Title *</label>
                      <input 
                        type="text" 
                        placeholder="e.g. Arrival at Leh & Acclimatization" 
                        value={item.title} 
                        onChange={(e) => handleDayChange(index, 'title', e.target.value)} 
                        className="w-full p-3 rounded-xl border border-slate-300 text-base text-slate-900 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-colors" 
                      />
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-slate-700 block mb-1.5 flex items-center">
                        <Hotel className="w-4 h-4 mr-1.5 text-amber-600" /> Night Stay / Accommodation
                      </label>
                      <input 
                        type="text" 
                        placeholder="e.g. Hotel in Leh / Luxury Camp in Nubra" 
                        value={item.stay || ''} 
                        onChange={(e) => handleDayChange(index, 'stay', e.target.value)} 
                        className="w-full p-3 rounded-xl border border-slate-300 text-base text-slate-900 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-colors" 
                      />
                    </div>
                  </div>

                  {/* Meals Input */}
                  <div>
                    <label className="text-sm font-semibold text-slate-700 block mb-1.5 flex items-center">
                      <Utensils className="w-4 h-4 mr-1.5 text-emerald-600" /> Meals Included (Comma separated)
                    </label>
                    <input 
                      type="text" 
                      placeholder="e.g. Breakfast, Dinner" 
                      value={item.meals || ''} 
                      onChange={(e) => handleDayChange(index, 'meals', e.target.value)} 
                      className="w-full p-3 rounded-xl border border-slate-300 text-base text-slate-900 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-colors" 
                    />
                  </div>

                  {/* Day Description */}
                  <div>
                    <label className="text-sm font-semibold text-slate-700 block mb-1.5">Day Activities & Sightseeing Description</label>
                    <textarea 
                      rows="3" 
                      placeholder="Describe high passes traversed, monasteries visited, hiking segments, evening camp experiences..." 
                      value={item.description} 
                      onChange={(e) => handleDayChange(index, 'description', e.target.value)} 
                      className="w-full p-3 rounded-xl border border-slate-300 text-base text-slate-900 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-colors" 
                    />
                  </div>

                </div>
              ))}
            </div>
          </div>

          {/* Section 5: Cover Image & Cloudinary Upload */}
          <div className="space-y-5 pt-6 border-t border-slate-100">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center text-amber-700">
              <ImageIcon className="w-4 h-4 mr-2" /> 5. Package Cover Image
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="border-2 border-dashed border-slate-300 rounded-2xl p-6 text-center bg-slate-50 flex flex-col items-center justify-center space-y-3">
                <UploadCloud className="w-10 h-10 text-amber-500" />
                <span className="text-sm font-bold text-slate-800">Upload to Cloudinary</span>
                <p className="text-xs text-slate-500 max-w-xs">
                  Select a photo from your computer (JPG, PNG, WebP). It will be uploaded to Cloudinary upon saving.
                </p>
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      setImageFile(file);
                      setFormData({ ...formData, image: URL.createObjectURL(file) });
                    }
                  }} 
                  className="text-sm file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-slate-900 file:text-white hover:file:bg-slate-800 cursor-pointer pt-1"
                />
                {imageFile && (
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                    ✓ New file selected: {imageFile.name}
                  </span>
                )}
                
                <div className="w-full pt-4 border-t border-slate-200 text-left">
                  <label className="text-sm font-semibold text-slate-700 block mb-1.5">Or direct image URL:</label>
                  <input 
                    type="text" 
                    value={formData.image} 
                    onChange={(e) => {
                      setImageFile(null);
                      setFormData({ ...formData, image: e.target.value });
                    }} 
                    placeholder="https://images.unsplash.com/photo-..." 
                    className="w-full p-3 rounded-xl border border-slate-300 text-base text-slate-900 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-colors" 
                  />
                </div>
              </div>

              <div>
                <span className="text-sm font-semibold text-slate-700 block mb-2">Live Image Preview</span>
                {formData.image ? (
                  <div className="relative h-56 w-full rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-slate-900">
                    <img 
                      src={formData.image} 
                      alt="Preview" 
                      className="h-full w-full object-cover" 
                    />
                    <div className="absolute bottom-3 left-3 text-xs bg-slate-950/80 backdrop-blur-sm text-white px-3 py-1.5 rounded-lg border border-white/20">
                      {formData.duration || 'Expedition'}
                    </div>
                  </div>
                ) : (
                  <div className="h-56 w-full rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 flex flex-col items-center justify-center text-slate-400 text-sm">
                    <ImageIcon className="w-10 h-10 mb-2 opacity-40 text-slate-400" />
                    <span className="font-medium">No cover image selected</span>
                    <span className="text-xs text-slate-400 mt-0.5">Upload a file or enter an image URL to preview</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Save Action Buttons */}
          <div className="pt-6 border-t border-slate-200 flex flex-wrap justify-end gap-3 sm:gap-4">
            <button 
              type="button" 
              onClick={() => setIsBuilderOpen(false)} 
              className="px-6 py-3 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 text-sm font-bold cursor-pointer transition-colors"
            >
              Cancel
            </button>
            <button 
              type="button" 
              disabled={isSubmitting} 
              onClick={() => handleSavePackage('Draft')} 
              className="px-6 py-3 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 text-sm font-bold disabled:opacity-50 cursor-pointer transition-colors"
            >
              {isSubmitting ? 'Saving...' : 'Save as Draft'}
            </button>
            <button 
              type="button" 
              disabled={isSubmitting} 
              onClick={() => handleSavePackage('Published')} 
              className="px-7 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-sm font-bold shadow-md disabled:opacity-50 cursor-pointer transition-colors"
            >
              {isSubmitting ? 'Publishing...' : 'Publish Live'}
            </button>
          </div>

        </div>
      )}

      {/* Packages Catalogue Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="py-3.5 px-4 font-semibold text-slate-600">Package</th>
                <th className="py-3.5 px-4 font-semibold text-slate-600">Duration</th>
                <th className="py-3.5 px-4 font-semibold text-slate-600">Price / Adult</th>
                <th className="py-3.5 px-4 font-semibold text-slate-600">Permits</th>
                <th className="py-3.5 px-4 font-semibold text-slate-600">Status</th>
                <th className="py-3.5 px-4 text-right font-semibold text-slate-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {packages.map((pkg) => (
                <tr key={pkg._id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3.5 px-4 flex items-center space-x-3">
                    <img 
                      src={pkg.coverImage} 
                      className="w-12 h-12 rounded-xl object-cover flex-shrink-0 shadow-xs border border-slate-200" 
                      alt={pkg.title} 
                    />
                    <div className="min-w-0">
                      <span className="font-bold text-slate-900 block truncate max-w-xs">{pkg.title}</span>
                      <span className="text-xs text-slate-500 truncate block">{pkg.slug}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-medium text-slate-700 whitespace-nowrap">
                    {pkg.durationDays}D / {pkg.durationNights}N
                  </td>
                  <td className="py-3.5 px-4 font-bold text-slate-900 whitespace-nowrap">
                    ₹{pkg.pricePerAdult?.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    {pkg.permitRequired ? (
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        Required
                      </span>
                    ) : (
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600">
                        None
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span className={`px-2.5 py-1 rounded-full font-bold text-xs ${
                      pkg.isActive 
                        ? 'bg-emerald-100 text-emerald-800' 
                        : 'bg-slate-100 text-slate-600 border border-slate-200'
                    }`}>
                      {pkg.isActive ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right space-x-2 whitespace-nowrap">
                    <button 
                      type="button"
                      onClick={() => handleToggleStatus(pkg)} 
                      title={pkg.isActive ? 'Move to Draft' : 'Publish Live'} 
                      className="p-2 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
                    >
                      {pkg.isActive ? <EyeOff className="w-4 h-4 text-slate-600" /> : <Eye className="w-4 h-4 text-emerald-600" />}
                    </button>
                    <button 
                      type="button"
                      onClick={() => handleEdit(pkg)} 
                      title="Edit Package" 
                      className="p-2 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer text-slate-700"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button 
                      type="button"
                      onClick={() => handleDelete(pkg._id)} 
                      title="Deactivate Package" 
                      className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {packages.length === 0 && (
                <tr>
                  <td colSpan="6" className="py-8 text-center text-slate-500">
                    No packages found. Click "Add New Package" above to create one.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
