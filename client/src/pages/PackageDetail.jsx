import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Clock, Mountain, MapPin, Star, Check, X, AlertTriangle, 
  ShieldCheck, Calendar, Users, ArrowLeft, ChevronRight, Phone, Sparkles
} from 'lucide-react';
import api from '../api/axios'; // Apna path check kar lena (agar api folder src me hai toh)
import ItineraryTimeline from '../components/ItineraryTimeline';

export default function PackageDetail() {
  const { id } = useParams(); // Ye slug ya id hoga URL se
  const navigate = useNavigate();

  const [pkg, setPkg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [activeImage, setActiveImage] = useState('');
  const [guestsCount, setGuestsCount] = useState(2);
  const [selectedDate, setSelectedDate] = useState('');

  // 1. Backend se data fetch karna
  useEffect(() => {
    const fetchPackage = async () => {
      try {
        // Backend API call (id ya slug ke through)
        const response = await api.get(`/packages/${id}`);
        setPkg(response.data);
        setActiveImage(response.data.coverImage);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching package:", err);
        setError("Package not found or server error.");
        setLoading(false);
      }
    };
    fetchPackage();
  }, [id]);

  if (loading) return <div className="min-h-screen flex items-center justify-center text-xl font-bold">Loading Package Details...</div>;
  if (error || !pkg) return <div className="min-h-screen flex items-center justify-center text-xl text-rose-600 font-bold">{error}</div>;

  // 2. Data Formatting (Backend data ko UI ke hisaab se ready karna)
  const durationText = `${pkg.durationDays} Days / ${pkg.durationNights} Nights`;
  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency', currency: 'INR', maximumFractionDigits: 0,
  }).format(pkg.pricePerAdult);

  const formattedTotalPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency', currency: 'INR', maximumFractionDigits: 0,
  }).format(pkg.pricePerAdult * guestsCount);

  const waMessage = encodeURIComponent(
    `Hello Aryavarta Travel! I am interested in booking the "${pkg.title}" (${durationText}) for ${guestsCount} travelers on ${selectedDate || 'upcoming dates'}. Please share availability and best quotation.`
  );
  const waUrl = `https://wa.me/919876543210?text=${waMessage}`; // Aage ise settings se dynamic karenge

  // 3. Book Now Click (Data ko state me pass karke booking page pe bhejna)
  const handleBookNow = () => {
    navigate('/booking', { 
      state: { 
        packageData: pkg, 
        guests: guestsCount, 
        travelDate: selectedDate 
      } 
    });
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* Breadcrumb Bar */}
      <div className="bg-slate-900 text-slate-300 py-3 px-4 sm:px-6 lg:px-8 border-b border-slate-800 text-xs">
        <div className="max-w-7xl mx-auto flex items-center space-x-2">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <Link to="/packages" className="hover:text-white transition-colors">Packages</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <span className="text-amber-400 truncate max-w-xs sm:max-w-md">{pkg.title}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        
        {/* Back Link */}
        <div className="mb-4">
          <Link to="/packages" className="inline-flex items-center text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-1.5" /> Back to All Packages
          </Link>
        </div>

        {/* Title & Key Badges Header */}
        <div className="mb-6">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            {pkg.permitRequired && (
              <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Permit Required
              </span>
            )}
            <span className="bg-sky-100 text-sky-800 text-xs font-semibold px-3 py-1 rounded-full flex items-center">
              <Mountain className="w-3.5 h-3.5 mr-1 text-sky-600" />
              Altitude: {pkg.altitudeInfo || 'N/A'}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-serif leading-tight">
            {pkg.title}
          </h1>

          <div className="flex items-center text-xs sm:text-sm text-slate-600 mt-2">
            <MapPin className="w-4 h-4 text-amber-600 mr-1.5 flex-shrink-0" />
            <span>Route: <strong>{pkg.route?.join(' → ')}</strong></span>
          </div>
        </div>

        {/* IMAGE GALLERY */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-10">
          <div className="lg:col-span-8 relative rounded-2xl overflow-hidden h-[340px] sm:h-[480px] bg-slate-900 shadow-md">
            <img src={activeImage} alt={pkg.title} className="w-full h-full object-cover transition-all duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none"></div>
            <div className="absolute bottom-4 left-4 text-xs bg-slate-950/70 backdrop-blur-md text-white px-3 py-1.5 rounded-lg border border-white/20">
              {durationText} Expedition
            </div>
          </div>

          <div className="lg:col-span-4 flex lg:flex-col gap-3 overflow-x-auto pb-2 lg:pb-0">
            {/* Cover image ko bhi thumbnail me dikha rahe hain */}
            <button onClick={() => setActiveImage(pkg.coverImage)} className={`relative rounded-xl overflow-hidden flex-shrink-0 w-28 lg:w-full h-24 sm:h-28 border-2 transition-all ${activeImage === pkg.coverImage ? 'border-amber-500' : 'border-transparent opacity-75'}`}>
               <img src={pkg.coverImage} alt="Cover" className="w-full h-full object-cover" />
            </button>
            {/* Baaki gallery images */}
            {pkg.galleryImages?.map((imgUrl, idx) => (
              <button key={idx} onClick={() => setActiveImage(imgUrl)} className={`relative rounded-xl overflow-hidden flex-shrink-0 w-28 lg:w-full h-24 sm:h-28 border-2 transition-all ${activeImage === imgUrl ? 'border-amber-500' : 'border-transparent opacity-75'}`}>
                <img src={imgUrl} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Quick Specs Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-5 bg-white rounded-2xl border border-slate-200/80 shadow-sm mb-10">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600"><Clock className="w-5 h-5" /></div>
            <div>
              <div className="text-[11px] text-slate-500 uppercase font-semibold">Duration</div>
              <div className="text-sm font-bold text-slate-900">{durationText}</div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600"><Calendar className="w-5 h-5" /></div>
            <div>
              <div className="text-[11px] text-slate-500 uppercase font-semibold">Best Season</div>
              <div className="text-sm font-bold text-slate-900">{pkg.bestSeason?.join(', ')}</div>
            </div>
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* Warning Badges */}
            <div className="space-y-4">
              <div className="bg-amber-50 border-l-4 border-amber-500 p-4 sm:p-5 rounded-r-2xl">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-amber-900 uppercase tracking-wide">Acclimatization Advisory</h4>
                    <p className="text-xs sm:text-sm text-amber-800 mt-1">Please ensure you take proper rest on Day 1 for acclimatization. Stay hydrated.</p>
                  </div>
                </div>
              </div>

              {pkg.permitRequired && (
                <div className="bg-emerald-50 border-l-4 border-emerald-500 p-4 sm:p-5 rounded-r-2xl">
                  <div className="flex items-start space-x-3">
                    <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-bold text-emerald-900 uppercase tracking-wide">Inner Line Permits (ILP) Included</h4>
                      <p className="text-xs sm:text-sm text-emerald-800 mt-1">Permissions are managed by us. Carry original ID proof.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Overview */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6">
              <div>
                <h3 className="text-xl font-bold text-slate-900 font-serif mb-3">Trip Overview</h3>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">{pkg.fullDescription || pkg.shortDescription}</p>
              </div>
            </div>

            {/* DAY-WISE ITINERARY TIMELINE */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-sm">
              <ItineraryTimeline itinerary={pkg.itinerary} />
            </div>

            {/* INCLUSIONS & EXCLUSIONS */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-8">
              <div>
                <h3 className="text-xl font-bold text-slate-900 font-serif mb-4 flex items-center"><span className="w-3 h-3 rounded-full bg-emerald-500 mr-2"></span>Inclusions</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {pkg.inclusions?.map((inc, i) => (
                    <div key={i} className="flex items-start space-x-2.5 text-xs sm:text-sm text-slate-700 bg-emerald-50/50 p-2.5 rounded-xl border border-emerald-100">
                      <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" /> <span>{inc}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100">
                <h3 className="text-xl font-bold text-slate-900 font-serif mb-4 flex items-center"><span className="w-3 h-3 rounded-full bg-rose-500 mr-2"></span>Exclusions</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {pkg.exclusions?.map((exc, i) => (
                    <div key={i} className="flex items-start space-x-2.5 text-xs sm:text-sm text-slate-700 bg-rose-50/50 p-2.5 rounded-xl border border-rose-100">
                      <X className="w-4 h-4 text-rose-500 flex-shrink-0 mt-0.5" /> <span>{exc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Sticky Booking Widget */}
          <div className="lg:col-span-4 sticky top-24">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden p-6 sm:p-7 space-y-6">
              
              <div>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">Starting Price Per Person</span>
                <div className="flex items-baseline space-x-2 mt-1">
                  <span className="text-3xl font-extrabold text-slate-900 font-serif">{formattedPrice}</span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Travelers / Guests</label>
                <div className="flex items-center justify-between border border-slate-200 rounded-xl p-2 bg-slate-50">
                  <span className="text-sm font-semibold text-slate-800 ml-2">{guestsCount} {guestsCount === 1 ? 'Adult' : 'Adults'}</span>
                  <div className="flex items-center space-x-2">
                    <button type="button" onClick={() => setGuestsCount(Math.max(1, guestsCount - 1))} className="w-8 h-8 rounded-lg bg-white border border-slate-300 font-bold hover:bg-slate-100">-</button>
                    <button type="button" onClick={() => setGuestsCount(guestsCount + 1)} className="w-8 h-8 rounded-lg bg-white border border-slate-300 font-bold hover:bg-slate-100">+</button>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200/80 flex items-center justify-between text-xs">
                <span className="text-amber-900 font-medium">Estimated Total:</span>
                <strong className="text-amber-900 font-bold text-sm">{formattedTotalPrice}</strong>
              </div>

              <div className="space-y-3 pt-2">
                <button type="button" onClick={handleBookNow} className="w-full py-3.5 px-4 rounded-xl bg-slate-900 hover:bg-amber-600 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center space-x-2">
                  <Calendar className="w-4 h-4 mr-1" /> <span>Book Now</span>
                </button>

                <a href={waUrl} target="_blank" rel="noopener noreferrer" className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center space-x-2">
                  <Phone className="w-4 h-4 mr-1" /> <span>Book on WhatsApp</span>
                </a>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}