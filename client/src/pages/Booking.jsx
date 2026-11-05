import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { 
  Calendar, Users, Phone, Mail, User, MessageCircle, 
  CheckCircle2, MapPin, Clock, Car, Check, ArrowRight,
  AlertTriangle, ChevronDown, Sparkles
} from 'lucide-react';
import api from '../api/axios';

export default function Booking() {
  const location = useLocation();
  const navigate = useNavigate();

  // If user navigated from PackageDetail, packageData will be in location.state
  const initialPackage = location.state?.packageData || null;
  const initialGuests = location.state?.guests || 2;
  const initialDate = location.state?.travelDate || '';

  const [packages, setPackages] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState(initialPackage);
  const [loadingPackages, setLoadingPackages] = useState(!initialPackage);
  const [fetchError, setFetchError] = useState(null);

  // Form fields
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    travelDate: initialDate,
    guests: initialGuests,
    vehicleType: 'Innova Crysta (Luxury Comfort)',
    specialRequests: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // If user lands on /booking without selecting a package (no location.state),
  // fetch all packages from api.get('/packages') and pre-select the first one
  useEffect(() => {
    if (location.state?.packageData) {
      setSelectedPackage(location.state.packageData);
      setLoadingPackages(false);
      return;
    }

    const fetchAllPackages = async () => {
      try {
        setLoadingPackages(true);
        setFetchError(null);
        const response = await api.get('/packages');
        const pkgList = Array.isArray(response.data) ? response.data : [];
        setPackages(pkgList);
        if (pkgList.length > 0) {
          // Pre-select the first package
          setSelectedPackage(pkgList[0]);
        } else {
          setFetchError("No packages are currently available. Please check back soon.");
        }
      } catch (err) {
        console.error("Error fetching packages:", err);
        setFetchError("Failed to load packages. Please check your connection and try again.");
      } finally {
        setLoadingPackages(false);
      }
    };

    fetchAllPackages();
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePackageChange = (e) => {
    const selectedId = e.target.value;
    const found = packages.find((p) => p._id === selectedId);
    if (found) {
      setSelectedPackage(found);
    }
  };

  // Backend API Call for Booking Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedPackage?._id) {
      alert("Please select a package before submitting.");
      return;
    }

    setIsSubmitting(true);
    
    try {
      const payload = {
        packageId: selectedPackage._id,
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        travelDate: formData.travelDate,
        guests: formData.guests,
        message: `Vehicle: ${formData.vehicleType}. Requests: ${formData.specialRequests}`,
        source: 'form'
      };

      await api.post('/bookings', payload);
      setIsSubmitted(true);
    } catch (error) {
      console.error("Booking Error:", error);
      alert(error.response?.data?.message || "Booking failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // WhatsApp instant link (Dynamic number fetch from settings if available)
  const getWaNumber = () => {
    const settings = JSON.parse(localStorage.getItem('siteSettings'));
    return settings?.whatsappNumber || '919622971598'; // Tera number
  };

  const waDirectMessage = encodeURIComponent(
    `Hello Aryavarta Travel! I'd like to book/enquire about ${selectedPackage?.title || 'a Ladakh expedition'} for ${formData.guests} people around ${formData.travelDate || 'upcoming season'}. My name is ${formData.name || 'Traveler'}.`
  );
  const waDirectUrl = `https://wa.me/${getWaNumber()}?text=${waDirectMessage}`;

  // Loading state when fetching packages
  if (loadingPackages) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 py-24">
        <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <h3 className="text-lg font-bold text-slate-800 font-serif">Loading Expedition Packages...</h3>
        <p className="text-slate-500 text-xs mt-1">Please wait while we retrieve available Ladakh tours</p>
      </div>
    );
  }

  // Error / empty packages state
  if (!selectedPackage) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 px-4 py-24 text-center">
        <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertTriangle className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800 font-serif mb-2">No Packages Available</h2>
        <p className="text-slate-600 text-sm max-w-md mx-auto mb-6">
          {fetchError || "We could not find any available packages right now. Please browse all packages or contact us directly."}
        </p>
        <div className="flex items-center justify-center gap-3">
          <Link to="/packages" className="px-6 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-colors">
            Browse Packages
          </Link>
          <Link to="/" className="px-6 py-2.5 bg-white border border-slate-300 text-slate-700 rounded-xl text-xs font-bold hover:bg-slate-50 transition-colors">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* Header Banner */}
      <div className="bg-slate-900 text-white py-14 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1800&q=80')` }}
        ></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span className="text-amber-400 text-xs font-bold uppercase tracking-widest block mb-2">Hassle-Free Reservations</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-serif">Reserve Your Ladakh Expedition</h1>
          <p className="text-slate-300 text-sm mt-2 max-w-xl mx-auto">
            Lock in your travel dates with zero immediate payment required. Our Leh basecamp team will contact you within 3 business hours.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
        
        {/* TOP: SELECTED PACKAGE SUMMARY & DROPDOWN */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200/90 p-5 sm:p-6 mb-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="flex items-center space-x-4 w-full lg:w-auto">
            {selectedPackage.coverImage ? (
              <img 
                src={selectedPackage.coverImage} 
                alt={selectedPackage.title} 
                className="w-20 h-20 rounded-xl object-cover border border-slate-200 flex-shrink-0 shadow-sm" 
              />
            ) : (
              <div className="w-20 h-20 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400 flex-shrink-0">
                <MapPin className="w-8 h-8" />
              </div>
            )}
            <div>
              <span className="text-[11px] font-bold text-amber-600 uppercase tracking-wider block">
                Selected Expedition Package
              </span>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                {selectedPackage.title}
              </h2>
              <div className="flex items-center space-x-4 text-xs text-slate-500 mt-1">
                <span className="flex items-center">
                  <Clock className="w-3.5 h-3.5 mr-1 text-slate-400" />
                  {selectedPackage.durationDays || 'N/A'} Days / {selectedPackage.durationNights || 'N/A'} Nights
                </span>
                <span className="text-slate-900 font-bold">
                  ₹{Number(selectedPackage.pricePerAdult || 0).toLocaleString('en-IN')}{' '}
                  <span className="text-slate-500 font-normal">/ person</span>
                </span>
              </div>
            </div>
          </div>
          
          {/* Dropdown to select/change package if packages were fetched */}
          {packages.length > 0 ? (
            <div className="w-full lg:w-auto min-w-0 sm:min-w-[320px]">
              <label htmlFor="top-package-select" className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1.5 flex items-center justify-between">
                <span>Choose Package</span>
                <span className="text-[10px] text-amber-600 font-semibold lowercase">({packages.length} available)</span>
              </label>
              <div className="relative">
                <select
                  id="top-package-select"
                  value={selectedPackage._id}
                  onChange={handlePackageChange}
                  className="w-full pl-3.5 pr-8 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold bg-white text-slate-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all cursor-pointer"
                >
                  {packages.map((pkg) => (
                    <option key={pkg._id} value={pkg._id}>
                      {pkg.title} ({pkg.durationDays}D/{pkg.durationNights}N — ₹{Number(pkg.pricePerAdult || 0).toLocaleString('en-IN')})
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ) : (
            <div className="text-xs text-slate-500 bg-slate-50 p-3 rounded-xl border border-slate-200">
               Package ID: <span className="font-mono text-slate-800">{selectedPackage._id?.substring(0, 8)}...</span>
            </div>
          )}
        </div>

        {/* Layout: Main Form (Left) & Side WhatsApp/Summary (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          
          {/* Main Booking Form */}
          <div className="lg:col-span-8 w-full">
            <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-4 sm:p-6 md:p-8">
              
              {isSubmitted ? (
                /* Success Confirmation State */
                <div className="text-center py-10 space-y-4">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 font-serif">Julley! Booking Request Received</h3>
                  <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed">
                    Thank you, <strong>{formData.name}</strong>! We have received your booking request for <strong>{selectedPackage.title}</strong>. Our local destination manager will contact you on <strong>{formData.phone}</strong> shortly.
                  </p>
                  <div className="pt-6">
                    <Link to="/" className="px-6 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold inline-block hover:bg-slate-800 transition-colors">
                      Back to Home
                    </Link>
                  </div>
                </div>
              ) : (
                /* The Booking Form */
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 font-serif mb-1">Traveler Information</h3>
                    <p className="text-slate-500 text-xs">
                      Please enter your contact details accurately so we can issue your Inner Line Permit draft.
                    </p>
                  </div>

                  {/* Dropdown for package selection within form if landed without state */}
                  {packages.length > 0 && (
                    <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200/90">
                      <label htmlFor="form-package-select" className="text-xs font-bold text-amber-950 uppercase tracking-wider block mb-1.5 flex items-center justify-between">
                        <span>Select Tour Package *</span>
                        <span className="text-[11px] text-amber-700 font-medium">{selectedPackage.durationDays}D/{selectedPackage.durationNights}N</span>
                      </label>
                      <select
                        id="form-package-select"
                        value={selectedPackage._id}
                        onChange={handlePackageChange}
                        className="w-full px-3 py-2.5 rounded-xl border border-amber-300 text-sm font-semibold bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-sm"
                      >
                        {packages.map((pkg) => (
                          <option key={pkg._id} value={pkg._id}>
                            {pkg.title} ({pkg.durationDays} Days / {pkg.durationNights} Nights) — ₹{Number(pkg.pricePerAdult || 0).toLocaleString('en-IN')} / person
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Full Name */}
                    <div>
                      <label className="text-xs font-bold text-slate-700 uppercase block mb-1.5">Full Name *</label>
                      <div className="relative">
                        <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input 
                          type="text" 
                          name="name" 
                          required 
                          value={formData.name} 
                          onChange={handleChange} 
                          placeholder="e.g. Rahul Verma" 
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50" 
                        />
                      </div>
                    </div>

                    {/* Phone Number - Updated with Validation */}
                    <div>
                      <label className="text-xs font-bold text-slate-700 uppercase block mb-1.5">WhatsApp / Mobile Number *</label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input 
                          type="tel" 
                          name="phone" 
                          required 
                          pattern="[0-9]{10}"
                          maxLength="10"
                          title="Please enter a valid 10-digit mobile number (without +91)"
                          value={formData.phone} 
                          onChange={handleChange} 
                          placeholder="e.g. 9876543210" 
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50" 
                        />
                      </div>
                    </div>

                    {/* Email Address */}
                    <div>
                      <label className="text-xs font-bold text-slate-700 uppercase block mb-1.5">Email Address *</label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input 
                          type="email" 
                          name="email" 
                          required 
                          title="Please enter a valid email address"
                          value={formData.email} 
                          onChange={handleChange} 
                          placeholder="rahul@example.com" 
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50" 
                        />
                      </div>
                    </div>

                    {/* Travel Date */}
                    <div>
                      <label className="text-xs font-bold text-slate-700 uppercase block mb-1.5">Target Travel Date *</label>
                      <div className="relative">
                        <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input 
                          type="date" 
                          name="travelDate" 
                          required 
                          value={formData.travelDate} 
                          onChange={handleChange} 
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50" 
                        />
                      </div>
                    </div>

                    {/* Number of Guests */}
                    <div>
                      <label className="text-xs font-bold text-slate-700 uppercase block mb-1.5">Number of Guests</label>
                      <div className="relative">
                        <Users className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <select 
                          name="guests" 
                          value={formData.guests} 
                          onChange={handleChange} 
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                        >
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15].map((n) => (
                            <option key={n} value={n}>{n} {n === 1 ? 'Traveler' : 'Travelers'}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Vehicle Preference */}
                    <div>
                      <label className="text-xs font-bold text-slate-700 uppercase block mb-1.5">Preferred Vehicle</label>
                      <div className="relative">
                        <Car className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <select 
                          name="vehicleType" 
                          value={formData.vehicleType} 
                          onChange={handleChange} 
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                        >
                          <option value="Innova Crysta (Luxury Comfort)">Toyota Innova Crysta (Recommended)</option>
                          <option value="Mahindra Scorpio 4x4">Mahindra Scorpio 4x4</option>
                          <option value="Force Tempo Traveller">Force Tempo Traveller (Large Groups)</option>
                          <option value="Royal Enfield Himalayan">Royal Enfield Himalayan Bikes</option>
                          <option value="Royal Enfield Himalayan">BMW Bikes</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Special Requests */}
                  <div>
                    <label className="text-xs font-bold text-slate-700 uppercase block mb-1.5">Special Requirements (Optional)</label>
                    <textarea 
                      name="specialRequests" 
                      rows="3" 
                      value={formData.specialRequests} 
                      onChange={handleChange} 
                      placeholder="e.g. Jain food preferences, need extra oxygen cylinder..." 
                      className="w-full p-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <button 
                    type="submit" 
                    disabled={isSubmitting} 
                    className="w-full py-4 rounded-xl bg-slate-900 hover:bg-amber-600 text-white font-bold text-base shadow-xl transition-all flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Sending Your Request...</span>
                    ) : (
                      <>
                        <span>Submit Booking Request (No Advance Required)</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Right Column: Reservation Summary & WhatsApp Card */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Quick Reservation Summary Card */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-md space-y-4">
              <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2">
                Reservation Overview
              </h4>
              <div className="space-y-2.5 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Selected Package:</span>
                  <span className="font-semibold text-slate-900 text-right max-w-[190px] truncate" title={selectedPackage.title}>
                    {selectedPackage.title}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Duration:</span>
                  <span className="font-semibold text-slate-900">
                    {selectedPackage.durationDays || 'N/A'} Days / {selectedPackage.durationNights || 'N/A'} Nights
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Guests:</span>
                  <span className="font-semibold text-slate-900">
                    {formData.guests} {formData.guests === 1 ? 'Traveler' : 'Travelers'}
                  </span>
                </div>
                {formData.travelDate && (
                  <div className="flex justify-between">
                    <span>Target Date:</span>
                    <span className="font-semibold text-slate-900">{formData.travelDate}</span>
                  </div>
                )}
                <div className="pt-2 border-t border-slate-100 flex justify-between items-center text-sm">
                  <span className="font-bold text-slate-900">Estimated Total:</span>
                  <span className="font-extrabold text-amber-600 text-base">
                    ₹{(Number(selectedPackage.pricePerAdult || 0) * Number(formData.guests || 1)).toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
              <div className="text-[11px] text-slate-500 bg-slate-50 p-2.5 rounded-lg border border-slate-200 space-y-1">
                <div>✓ Zero upfront payment required to hold booking.</div>
                <div>✓ Inner Line Permits & driver confirmed upon chat.</div>
              </div>
            </div>

            {/* Side WhatsApp Card */}
            <div className="bg-gradient-to-br from-emerald-950 via-slate-900 to-slate-950 text-white rounded-2xl p-6 sm:p-7 shadow-xl border border-emerald-500/30 relative overflow-hidden">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mb-4">
                <MessageCircle className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold font-serif text-white mb-2">Or Book Directly Via WhatsApp</h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6">
                Prefer talking over text? Skip the form entirely. Connect directly with our on-ground expedition manager in Leh for instant availability.
              </p>
              <a 
                href={waDirectUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-full py-3.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shadow-lg transition-all flex items-center justify-center space-x-2"
              >
                <MessageCircle className="w-5 h-5 text-slate-950 fill-slate-950" />
                <span>Chat on WhatsApp Now</span>
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}