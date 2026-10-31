import React, { useState, useEffect } from 'react';
import { 
  Settings as SettingsIcon, Save, MessageCircle, Mail, Phone, 
  MapPin, ShieldCheck, Check, Globe, Loader2, User
} from 'lucide-react';
import api from '../api/axios'; // Backend API connect

export default function Settings() {
  // Default state (UI fields ke hisaab se)
  const [settings, setSettings] = useState({
    whatsappNumber: '',
    businessEmail: '',
    supportPhone: '',
    currency: 'INR (₹)',
    officeAddress: '',
    delhiOfficeAddress: '',
    permitFeePerPerson: 0,
    environmentalTaxPerPerson: 0
  });

  const [adminName, setAdminName] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  
  const [savedToast, setSavedToast] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Initialize admin profile from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('adminUser');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.name) setAdminName(parsed.name);
        if (parsed.email) setAdminEmail(parsed.email);
      }
    } catch (err) {
      console.error("Failed to parse adminUser from localStorage", err);
    }
  }, []);

  // 1. Fetch Settings from Backend
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await api.get('/admin/settings');
        const data = res.data;
        
        // Backend data ko UI fields ke hisaab se map karo
        setSettings((prev) => ({
          ...prev,
          whatsappNumber: data.whatsappNumber || '',
          businessEmail: data.businessEmail || '',
          supportPhone: data.businessPhone || '', // Backend me businessPhone hai
          officeAddress: data.address || '',       // Backend me address hai
          // Extra fields (agar backend me save hain toh aayenge)
          delhiOfficeAddress: data.delhiOfficeAddress || prev.delhiOfficeAddress,
          permitFeePerPerson: data.permitFeePerPerson || prev.permitFeePerPerson,
          environmentalTaxPerPerson: data.environmentalTaxPerPerson || prev.environmentalTaxPerPerson,
        }));
      } catch (error) {
        console.error("Error fetching settings", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // 2. Save Settings to Backend
  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      // 1. Update Admin Profile API Call
      const profileRes = await api.put('/auth/profile', {
        name: adminName,
        email: adminEmail,
      });

      // Update localStorage with updated admin credentials
      let existingUser = {};
      try {
        const stored = localStorage.getItem('adminUser');
        if (stored) existingUser = JSON.parse(stored);
      } catch (err) {
        console.error(err);
      }

      const updatedUserData = {
        ...existingUser,
        name: adminName,
        email: adminEmail,
        ...(profileRes.data?.role && { role: profileRes.data.role }),
      };

      localStorage.setItem('adminUser', JSON.stringify(updatedUserData));

      if (profileRes.data?.token) {
        localStorage.setItem('adminToken', profileRes.data.token);
      }

      // 2. UI data ko wapas backend format me map karo
      const payload = {
        whatsappNumber: settings.whatsappNumber,
        businessEmail: settings.businessEmail,
        businessPhone: settings.supportPhone,
        address: settings.officeAddress,
        // Extra fields
        delhiOfficeAddress: settings.delhiOfficeAddress,
        permitFeePerPerson: settings.permitFeePerPerson,
        environmentalTaxPerPerson: settings.environmentalTaxPerPerson
      };

      await api.put('/admin/settings', payload);
      
      setSavedToast(true);
      setTimeout(() => {
        setSavedToast(false);
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to save settings. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-10 text-center font-bold">Loading Settings...</div>;

  return (
    <div className="space-y-6 max-w-4xl">
      
      {/* Toast */}
      {savedToast && (
        <div className="fixed top-5 right-5 z-50 bg-slate-900 text-white text-xs px-4 py-3 rounded-xl shadow-2xl border border-emerald-500/50 flex items-center space-x-2 animate-bounce">
          <Check className="w-4 h-4 text-emerald-400" />
          <span className="font-semibold">Profile and business settings successfully updated!</span>
        </div>
      )}

      {/* Page Header */}
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-amber-600">
          Configuration & Contact Sync
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-serif">
          Business Settings
        </h1>
        <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
          Update your admin profile credentials, official WhatsApp contact, emails, and basecamp addresses.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        
        {/* Admin Profile Settings */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-5">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-2 flex items-center">
            <User className="w-4 h-4 text-amber-600 mr-2" />
            Admin Profile Settings
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Admin Name */}
            <div>
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wide block mb-1.5">
                Admin Name *
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  name="adminName"
                  required
                  value={adminName}
                  onChange={(e) => setAdminName(e.target.value)}
                  placeholder="e.g. Stanzin Norbu"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                />
              </div>
              <span className="text-[11px] text-slate-400 mt-1 block">
                Displayed in the top-right profile header and activity logs.
              </span>
            </div>

            {/* Admin Email */}
            <div>
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wide block mb-1.5">
                Admin Email *
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  name="adminEmail"
                  required
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  placeholder="admin@aryavartatravel.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                />
              </div>
              <span className="text-[11px] text-slate-400 mt-1 block">
                Used for admin authentication and credential management.
              </span>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-5">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-2 flex items-center">
            <MessageCircle className="w-4 h-4 text-emerald-600 mr-2" />
            Direct Communication Channels
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* WhatsApp Number */}
            <div>
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wide block mb-1.5">
                Official WhatsApp Business Number *
              </label>
              <div className="relative">
                <MessageCircle className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  name="whatsappNumber"
                  required
                  value={settings.whatsappNumber}
                  onChange={handleChange}
                  placeholder="+919876543210"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                />
              </div>
              <span className="text-[11px] text-slate-400 mt-1 block">
                Powers the floating WhatsApp button on all pages.
              </span>
            </div>

            {/* Business Email */}
            <div>
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wide block mb-1.5">
                Business & Booking Email *
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  name="businessEmail"
                  required
                  value={settings.businessEmail}
                  onChange={handleChange}
                  placeholder="booking@aryavartatravel.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                />
              </div>
            </div>

            {/* 24x7 Helpline Phone */}
            <div>
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wide block mb-1.5">
                24x7 Emergency Helpline Phone *
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  name="supportPhone"
                  required
                  value={settings.supportPhone}
                  onChange={handleChange}
                  placeholder="+91 98765 43210"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                />
              </div>
            </div>

            {/* Currency */}
            <div>
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wide block mb-1.5">
                Default Currency
              </label>
              <input
                type="text"
                disabled
                value={settings.currency}
                className="w-full p-2.5 rounded-xl border border-slate-200 text-sm bg-slate-50 text-slate-500"
              />
            </div>
          </div>
        </div>

        {/* Physical Office Addresses */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-5">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-2 flex items-center">
            <MapPin className="w-4 h-4 text-amber-600 mr-2" />
            Official Physical Addresses
          </h2>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wide block mb-1.5">
                Leh Basecamp Office Address *
              </label>
              <textarea
                name="officeAddress"
                rows="2"
                required
                value={settings.officeAddress}
                onChange={handleChange}
                className="w-full p-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50"
              ></textarea>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wide block mb-1.5">
                New Delhi Representative Office Address
              </label>
              <textarea
                name="delhiOfficeAddress"
                rows="2"
                value={settings.delhiOfficeAddress}
                onChange={handleChange}
                className="w-full p-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50"
              ></textarea>
            </div>
          </div>
        </div>

        {/* High Altitude Regulatory Fees */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-5">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-2 flex items-center">
            <ShieldCheck className="w-4 h-4 text-sky-600 mr-2" />
            Ladakh Tourism & Environmental Dues
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wide block mb-1.5">
                Leh DC Office Inner Line Permit Fee (₹ per traveler)
              </label>
              <input
                type="number"
                name="permitFeePerPerson"
                value={settings.permitFeePerPerson}
                onChange={handleChange}
                className="w-full p-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wide block mb-1.5">
                Ladakh Ecology & Wildlife Fee (₹ per traveler)
              </label>
              <input
                type="number"
                name="environmentalTaxPerPerson"
                value={settings.environmentalTaxPerPerson}
                onChange={handleChange}
                className="w-full p-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50"
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-amber-600 text-white font-bold text-sm shadow-md transition-all flex items-center space-x-2 disabled:opacity-70"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            <span>{saving ? 'Saving...' : 'Save Settings Changes'}</span>
          </button>
        </div>

      </form>

    </div>
  );
}