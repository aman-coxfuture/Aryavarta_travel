import React, { useState, useEffect } from 'react';
import { 
  Package, Plus, Edit3, Trash2, Eye, EyeOff, Image as ImageIcon, 
  UploadCloud, Clock, Mountain, Check, X, Save, Send, AlertCircle
} from 'lucide-react';
import api from '../api/axios'; // Backend API

export default function PackagesManagement() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [isBuilderOpen, setIsBuilderOpen] = useState(false);
  const [editingPackageId, setEditingPackageId] = useState(null);
  const [toastMessage, setToastMessage] = useState('');
  
  // Image File state (Real Upload ke liye)
  const [imageFile, setImageFile] = useState(null);

  // Default Form State (Backend fields ke hisaab se)
  const initialFormState = {
    title: '',
    duration: '6 Days / 5 Nights',
    startingPrice: 24999,
    category: 'High Mountain Lakes',
    maxAltitude: '17,582 ft',
    route: 'Leh - Nubra - Pangong - Leh',
    image: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=600&q=80', // Default fallback image
    itinerary: [
      { day: 1, title: 'Arrival at Leh & Rest', description: 'Acclimatization.' },
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
    setTimeout(() => setToastMessage(''), 3000);
  };

  // 2. Toggle Publish / Draft
  const handleToggleStatus = async (pkg) => {
    try {
      const newStatus = !pkg.isActive; // true -> false, false -> true
      await api.put(`/admin/packages/${pkg._id}`, { isActive: newStatus });
      
      setPackages((prev) =>
        prev.map((p) => (p._id === pkg._id ? { ...p, isActive: newStatus } : p))
      );
      showToast(`Package "${pkg.title}" ${newStatus ? 'Published' : 'Moved to Draft'}`);
    } catch (error) {
      alert("Failed to update status");
    }
  };

  // 3. Delete Package (Soft Delete)
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this tour package?')) {
      try {
        await api.delete(`/admin/packages/${id}`);
        setPackages((prev) => prev.filter((p) => p._id !== id));
        showToast('Package deleted successfully');
      } catch (error) {
        alert("Failed to delete package");
      }
    }
  };

  // 4. Open Edit Mode
  const handleEdit = (pkg) => {
    setEditingPackageId(pkg._id);
    setImageFile(null); // Purani file state clear karo
    
    // Backend data ko wapas form format me map karo
    const durationStr = `${pkg.durationDays} Days / ${pkg.durationNights} Nights`;
    
    setFormData({
      title: pkg.title,
      duration: durationStr,
      startingPrice: pkg.pricePerAdult,
      category: pkg.category || 'High Mountain Lakes',
      maxAltitude: pkg.altitudeInfo || '',
      route: Array.isArray(pkg.route) ? pkg.route.join(' - ') : pkg.route,
      image: pkg.coverImage || initialFormState.image,
      itinerary: pkg.itinerary || [],
    });
    
    setIsBuilderOpen(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Open Create Mode
  const handleOpenCreate = () => {
    setEditingPackageId(null);
    setImageFile(null);
    setFormData(initialFormState);
    setIsBuilderOpen(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Itinerary Builder Functions
  const handleAddDay = () => {
    const nextDayNum = formData.itinerary.length + 1;
    setFormData((prev) => ({
      ...prev,
      itinerary: [
        ...prev.itinerary, 
        { day: nextDayNum, title: '', description: '' }
      ],
    }));
  };

  const handleDeleteDay = (indexToDelete) => {
    if (formData.itinerary.length <= 1) {
      alert('A package must have at least 1 day itinerary.');
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

  // 5. Save Package (Create ya Update)
  const handleSavePackage = async (targetStatus) => {
    if (!formData.title.trim()) {
      alert('Please provide a package title.');
      return;
    }

    setIsSubmitting(true);
    try {
      let finalImageUrl = formData.image;

      // Step 1: Agar admin ne nayi image select ki hai, toh upload karo
      if (imageFile) {
        const imgData = new FormData();
        imgData.append('image', imageFile);
        const uploadRes = await api.post('/admin/upload', imgData);
        finalImageUrl = uploadRes.data.url;
      }

      // Step 2: Duration string se Days/Nights extract karo (e.g. "6 Days / 5 Nights")
      const daysMatch = formData.duration.match(/(\d+)\s*Days/i);
      const nightsMatch = formData.duration.match(/(\d+)\s*Nights/i);
      const durationDays = daysMatch ? parseInt(daysMatch[1]) : 1;
      const durationNights = nightsMatch ? parseInt(nightsMatch[1]) : 0;

      // Step 3: Backend Model ke hisaab se payload ready karo
      const payload = {
        title: formData.title,
        slug: formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'), // Auto slug
        shortDescription: formData.title + ' Tour', // Fallback
        fullDescription: formData.title + ' Tour', // Fallback
        durationDays: durationDays,
        durationNights: durationNights,
        pricePerAdult: formData.startingPrice,
        route: formData.route.split('-').map(r => r.trim()), // string to array
        itinerary: formData.itinerary.map(item => ({ 
          ...item, 
          meals: item.meals || ['Breakfast', 'Dinner'], 
          stay: item.stay || 'Hotel' 
        })),
        altitudeInfo: formData.maxAltitude,
        coverImage: finalImageUrl,
        isActive: targetStatus === 'Published',
        permitRequired: false, 
        inclusions: ["Hotels", "Breakfast"], // Fallback
        exclusions: ["Flights", "Lunch"] // Fallback
      };

      // Step 4: API Call
      if (editingPackageId) {
        await api.put(`/admin/packages/${editingPackageId}`, payload);
        showToast('Package updated successfully!');
      } else {
        await api.post('/admin/packages', payload);
        showToast('New package created successfully!');
      }

      fetchPackages(); // List refresh
      setIsBuilderOpen(false);
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to save package");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading && packages.length === 0) {
    return <div className="p-10 text-center font-bold">Loading Packages...</div>;
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

      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600">Tour Catalogue</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-serif">Package Management</h1>
        </div>
        <div>
          {!isBuilderOpen ? (
            <button onClick={handleOpenCreate} className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md flex items-center space-x-2">
              <Plus className="w-4 h-4" /> <span>Add New Package</span>
            </button>
          ) : (
            <button onClick={() => setIsBuilderOpen(false)} className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs">
              Back to List
            </button>
          )}
        </div>
      </div>

      {/* FORM BUILDER */}
      {isBuilderOpen && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xl p-6 sm:p-8 space-y-8 animate-fadeIn">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <h2 className="text-xl font-bold text-slate-900 font-serif">
              {editingPackageId ? 'Edit Package' : 'Create New Package'}
            </h2>
            <button onClick={() => setIsBuilderOpen(false)} className="p-2 text-slate-400 hover:text-slate-600"><X className="w-5 h-5" /></button>
          </div>

          {/* Basic Inputs */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              <div className="sm:col-span-2">
                <label className="text-xs font-bold text-slate-700 block mb-1">Package Title *</label>
                <input type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full p-2.5 rounded-xl border border-slate-200 text-sm" />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Starting Price (₹) *</label>
                <input type="number" value={formData.startingPrice} onChange={(e) => setFormData({ ...formData, startingPrice: Number(e.target.value) })} className="w-full p-2.5 rounded-xl border border-slate-200 text-sm font-bold" />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Duration Text *</label>
                <input type="text" value={formData.duration} onChange={(e) => setFormData({ ...formData, duration: e.target.value })} placeholder="6 Days / 5 Nights" className="w-full p-2.5 rounded-xl border border-slate-200 text-sm" />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Max Altitude</label>
                <input type="text" value={formData.maxAltitude} onChange={(e) => setFormData({ ...formData, maxAltitude: e.target.value })} className="w-full p-2.5 rounded-xl border border-slate-200 text-sm" />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Route</label>
                <input type="text" value={formData.route} onChange={(e) => setFormData({ ...formData, route: e.target.value })} className="w-full p-2.5 rounded-xl border border-slate-200 text-sm" />
              </div>
            </div>
          </div>

          {/* Itinerary Builder */}
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900">Dynamic Itinerary</h3>
              <button type="button" onClick={handleAddDay} className="px-3.5 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-bold flex items-center"><Plus className="w-3.5 h-3.5 mr-1" /> Add Day</button>
            </div>
            
            <div className="space-y-3">
              {formData.itinerary.map((item, index) => (
                <div key={index} className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs">Day {item.day}</span>
                    <button type="button" onClick={() => handleDeleteDay(index)} className="text-rose-500 hover:bg-rose-100 p-1 rounded"><Trash2 className="w-4 h-4" /></button>
                  </div>
                  <input type="text" placeholder="Day Title" value={item.title} onChange={(e) => handleDayChange(index, 'title', e.target.value)} className="w-full p-2 rounded-lg border border-slate-200 text-xs" />
                  <textarea rows="2" placeholder="Description" value={item.description} onChange={(e) => handleDayChange(index, 'description', e.target.value)} className="w-full p-2 rounded-lg border border-slate-200 text-xs" />
                </div>
              ))}
            </div>
          </div>

          {/* Image Upload (Real) */}
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <h3 className="text-sm font-bold text-slate-900">Cover Image</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center bg-slate-50">
                <UploadCloud className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      setImageFile(file);
                      // Preview ke liye temporary URL banayein
                      setFormData({ ...formData, image: URL.createObjectURL(file) });
                    }
                  }} 
                  className="text-xs"
                />
              </div>
              <div>
                <span className="text-xs font-bold block mb-2">Current Preview</span>
                <img src={formData.image} alt="Preview" className="h-32 w-full object-cover rounded-xl border" />
              </div>
            </div>
          </div>

          {/* Save Buttons */}
          <div className="pt-6 border-t flex justify-end gap-3">
            <button type="button" onClick={() => setIsBuilderOpen(false)} className="px-5 py-2.5 rounded-xl border text-xs font-bold">Cancel</button>
            <button type="button" disabled={isSubmitting} onClick={() => handleSavePackage('Draft')} className="px-5 py-2.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-xs font-bold disabled:opacity-50">
              {isSubmitting ? 'Saving...' : 'Save as Draft'}
            </button>
            <button type="button" disabled={isSubmitting} onClick={() => handleSavePackage('Published')} className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-xs font-bold shadow-md disabled:opacity-50">
              {isSubmitting ? 'Publishing...' : 'Publish Live'}
            </button>
          </div>
        </div>
      )}

      {/* Packages Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 border-b">
            <tr>
              <th className="py-3 px-4">Package</th>
              <th className="py-3 px-4">Price</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {packages.map((pkg) => (
              <tr key={pkg._id} className="hover:bg-slate-50">
                <td className="py-3 px-4 flex items-center space-x-3">
                  <img src={pkg.coverImage} className="w-10 h-10 rounded-lg object-cover" />
                  <span className="font-bold text-slate-800">{pkg.title}</span>
                </td>
                <td className="py-3 px-4">₹{pkg.pricePerAdult}</td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 rounded-full font-bold ${pkg.isActive ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200'}`}>
                    {pkg.isActive ? 'Published' : 'Draft'}
                  </span>
                </td>
                <td className="py-3 px-4 text-right space-x-2">
                  <button onClick={() => handleToggleStatus(pkg)} className="p-1.5 bg-slate-100 rounded-lg">{pkg.isActive ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}</button>
                  <button onClick={() => handleEdit(pkg)} className="p-1.5 bg-slate-100 rounded-lg"><Edit3 className="w-4 h-4" /></button>
                  <button onClick={() => handleDelete(pkg._id)} className="p-1.5 text-rose-500 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}