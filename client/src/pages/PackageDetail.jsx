import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Clock, Mountain, MapPin, Check, X, AlertTriangle, 
  ShieldCheck, Calendar, ArrowLeft, ChevronRight, Phone, Compass, Footprints
} from 'lucide-react';
import api from '../api/axios';
import ItineraryTimeline from '../components/ItineraryTimeline';

export default function PackageDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [pkg, setPkg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [activeImage, setActiveImage] = useState('');
  const [guestsCount, setGuestsCount] = useState(2);
  const [selectedDate, setSelectedDate] = useState('');

  // Fetch package details by id or slug
  useEffect(() => {
    const fetchPackage = async () => {
      try {
        const response = await api.get(`/packages/${id}`);
        setPkg(response.data);
        setActiveImage(response.data.coverImage || '');
        setLoading(false);
      } catch (err) {
        console.error("Error fetching package:", err);
        setError("Package not found or server error.");
        setLoading(false);
      }
    };
    fetchPackage();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-base sm:text-lg font-bold text-slate-700">
        <div className="flex items-center space-x-2">
          <div className="w-5 h-5 border-2 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
          <span>Loading Package Details...</span>
        </div>
      </div>
    );
  }

  if (error || !pkg) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
        <p className="text-xl text-rose-600 font-bold mb-4">{error || "Package not found."}</p>
        <Link 
          to="/packages" 
          className="inline-flex items-center px-4 py-2 rounded-xl bg-slate-900 text-white text-sm font-semibold hover:bg-amber-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> View All Packages
        </Link>
      </div>
    );
  }

  // Formatting helpers
  const durationText = `${pkg.durationDays} Days / ${pkg.durationNights} Nights`;
  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency', currency: 'INR', maximumFractionDigits: 0,
  }).format(pkg.pricePerAdult || 0);

  const formattedTotalPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency', currency: 'INR', maximumFractionDigits: 0,
  }).format((pkg.pricePerAdult || 0) * guestsCount);

  const waMessage = encodeURIComponent(
    `Hello Aryavarta Travel! I am interested in booking the "${pkg.title}" (${durationText}) for ${guestsCount} travelers on ${selectedDate || 'upcoming dates'}. Please share availability and best quotation.`
  );
  const waUrl = `https://wa.me/919876543210?text=${waMessage}`;

  const handleBookNow = () => {
    navigate('/booking', { 
      state: { 
        packageData: pkg, 
        guests: guestsCount, 
        travelDate: selectedDate 
      } 
    });
  };

  // Safe checks for optional data
  const isTrek = pkg.title?.toLowerCase().includes('trek') || pkg.slug?.toLowerCase().includes('trek');
  const hasAltitude = Boolean(pkg.altitudeInfo && pkg.altitudeInfo.trim().length > 0);
  const hasRoute = Boolean(pkg.route && pkg.route.length > 0);
  const hasGallery = Boolean(pkg.galleryImages && pkg.galleryImages.length > 0);
  const hasInclusions = Boolean(pkg.inclusions && pkg.inclusions.length > 0);
  const hasExclusions = Boolean(pkg.exclusions && pkg.exclusions.length > 0);
  const hasBestSeason = Boolean(pkg.bestSeason && pkg.bestSeason.length > 0);

  const coverImageUrl = pkg.coverImage || 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=1200&q=80';
  const currentMainImage = activeImage || coverImageUrl;

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
          <div className="flex flex-wrap items-center gap-2 mb-2.5">
            {/* Trek Badge */}
            {isTrek && (
              <span className="bg-amber-100 text-amber-900 border border-amber-200 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center shadow-xs">
                <Compass className="w-3.5 h-3.5 mr-1 text-amber-700 flex-shrink-0" />
                Himalayan Trek
              </span>
            )}

            {/* Permit Badge - ONLY shown if permitRequired is true */}
            {pkg.permitRequired === true && (
              <span className="bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center shadow-xs">
                <ShieldCheck className="w-3.5 h-3.5 mr-1 text-emerald-600 flex-shrink-0" />
                Inner Line Permits Included
              </span>
            )}

            {/* Altitude Badge - ONLY shown if altitudeInfo is non-empty */}
            {hasAltitude && (
              <span className="bg-sky-100 text-sky-800 border border-sky-200 text-xs font-semibold px-3 py-1 rounded-full flex items-center shadow-xs">
                <Mountain className="w-3.5 h-3.5 mr-1 text-sky-600 flex-shrink-0" />
                Altitude: {pkg.altitudeInfo}
              </span>
            )}
          </div>

          <h1 className="text-xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 font-serif leading-tight break-words">
            {pkg.title}
          </h1>

          {/* Route Display - Only rendered if route exists */}
          {hasRoute && (
            <div className="flex items-center text-xs sm:text-sm text-slate-600 mt-2.5">
              <MapPin className="w-4 h-4 text-amber-600 mr-1.5 flex-shrink-0" />
              <span className="break-words">Route: <strong>{pkg.route.join(' → ')}</strong></span>
            </div>
          )}
        </div>

        {/* IMAGE GALLERY */}
        <div className="mb-8 sm:mb-10">
          {hasGallery ? (
            /* Multi-Image Gallery Layout */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4">
              <div className="lg:col-span-8 relative rounded-2xl overflow-hidden h-64 sm:h-96 md:h-[450px] bg-slate-900 shadow-md">
                <img 
                  src={currentMainImage} 
                  alt={pkg.title} 
                  className="w-full h-full object-cover transition-all duration-500" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none"></div>
                <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 text-xs bg-slate-950/70 backdrop-blur-md text-white px-3 py-1.5 rounded-lg border border-white/20">
                  {durationText} Expedition
                </div>
              </div>

              <div className="lg:col-span-4 flex lg:flex-col gap-2.5 sm:gap-3 overflow-x-auto pb-2 lg:pb-0 scrollbar-thin">
                {/* Cover image thumbnail */}
                <button 
                  type="button" 
                  onClick={() => setActiveImage(coverImageUrl)} 
                  className={`relative rounded-xl overflow-hidden flex-shrink-0 w-24 sm:w-28 lg:w-full h-20 sm:h-24 lg:h-28 border-2 transition-all cursor-pointer ${
                    currentMainImage === coverImageUrl ? 'border-amber-500 shadow-md scale-[1.01]' : 'border-transparent opacity-75 hover:opacity-100'
                  }`}
                >
                  <img src={coverImageUrl} alt="Cover Thumbnail" className="w-full h-full object-cover" />
                </button>
                {/* Gallery thumbnails */}
                {pkg.galleryImages.map((imgUrl, idx) => (
                  <button 
                    key={idx} 
                    type="button" 
                    onClick={() => setActiveImage(imgUrl)} 
                    className={`relative rounded-xl overflow-hidden flex-shrink-0 w-24 sm:w-28 lg:w-full h-20 sm:h-24 lg:h-28 border-2 transition-all cursor-pointer ${
                      currentMainImage === imgUrl ? 'border-amber-500 shadow-md scale-[1.01]' : 'border-transparent opacity-75 hover:opacity-100'
                    }`}
                  >
                    <img src={imgUrl} alt={`Gallery Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* Single Image Full-Width Layout */
            <div className="relative rounded-2xl overflow-hidden h-64 sm:h-96 md:h-[450px] bg-slate-900 shadow-md">
              <img 
                src={currentMainImage} 
                alt={pkg.title} 
                className="w-full h-full object-cover" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none"></div>
              <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 text-xs bg-slate-950/70 backdrop-blur-md text-white px-3 py-1.5 rounded-lg border border-white/20">
                {durationText} Expedition
              </div>
            </div>
          )}
        </div>

        {/* Quick Specs Grid - Dynamically adapts columns based on available data */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 p-4 sm:p-5 bg-white rounded-2xl border border-slate-200/80 shadow-sm mb-8 sm:mb-10">
          {/* Duration Spec */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 flex-shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] text-slate-500 uppercase font-semibold">Duration</div>
              <div className="text-xs sm:text-sm font-bold text-slate-900">{durationText}</div>
            </div>
          </div>

          {/* Best Season Spec */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 flex-shrink-0">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] text-slate-500 uppercase font-semibold">Best Season</div>
              <div className="text-xs sm:text-sm font-bold text-slate-900">
                {hasBestSeason ? pkg.bestSeason.join(', ') : 'May - October'}
              </div>
            </div>
          </div>

          {/* Max Altitude Spec - ONLY if present */}
          {hasAltitude ? (
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center text-sky-600 flex-shrink-0">
                <Mountain className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <div className="text-[11px] text-slate-500 uppercase font-semibold">Max Altitude</div>
                <div className="text-xs sm:text-sm font-bold text-slate-900 truncate" title={pkg.altitudeInfo}>
                  {pkg.altitudeInfo}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600 flex-shrink-0">
                <Compass className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[11px] text-slate-500 uppercase font-semibold">Experience</div>
                <div className="text-xs sm:text-sm font-bold text-slate-900">Guided Ladakh Circuit</div>
              </div>
            </div>
          )}

          {/* Tour Category / Type */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 flex-shrink-0">
              {isTrek ? <Footprints className="w-5 h-5" /> : <ShieldCheck className="w-5 h-5" />}
            </div>
            <div>
              <div className="text-[11px] text-slate-500 uppercase font-semibold">Tour Style</div>
              <div className="text-xs sm:text-sm font-bold text-slate-900">
                {isTrek ? 'Mountain Trek' : 'Private SUV Tour'}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          
          {/* Left Column: Details & Itinerary */}
          <div className="lg:col-span-8 space-y-6 sm:space-y-8">
            
            {/* Contextual Advisory Banners */}
            <div className="space-y-3 sm:space-y-4">
              {/* Acclimatization advisory */}
              <div className="bg-amber-50 border-l-4 border-amber-500 p-4 sm:p-5 rounded-r-2xl">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-amber-900 uppercase tracking-wide">
                      Acclimatization Advisory
                    </h4>
                    <p className="text-xs sm:text-sm text-amber-800 mt-1">
                      Leh sits at 11,500 ft. Complete rest on Day 1 is mandatory to prevent Altitude Mountain Sickness (AMS). Keep yourself hydrated with warm water.
                    </p>
                  </div>
                </div>
              </div>

              {/* Inner Line Permit Advisory - ONLY shown if permitRequired is true */}
              {pkg.permitRequired === true && (
                <div className="bg-emerald-50 border-l-4 border-emerald-500 p-4 sm:p-5 rounded-r-2xl">
                  <div className="flex items-start space-x-3">
                    <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-emerald-900 uppercase tracking-wide">
                        Inner Line Permits (ILP) Included
                      </h4>
                      <p className="text-xs sm:text-sm text-emerald-800 mt-1">
                        All protected area travel permits, green fees, and wildlife passes are pre-arranged by our team. Please carry original government photo ID.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Trek Specific Advisory - Rendered for Treks */}
              {isTrek && (
                <div className="bg-sky-50 border-l-4 border-sky-500 p-4 sm:p-5 rounded-r-2xl">
                  <div className="flex items-start space-x-3">
                    <Compass className="w-5 h-5 text-sky-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-sky-900 uppercase tracking-wide">
                        Trekking Gear & Physical Preparation
                      </h4>
                      <p className="text-xs sm:text-sm text-sky-800 mt-1">
                        Sturdy ankle-support hiking boots, windproof outer layer, warm fleece, trekking poles, and a 20-30L daypack are recommended. Mules/porters handle expedition luggage.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Trip Overview / Description */}
            <div className="bg-white rounded-2xl p-4 sm:p-6 md:p-8 border border-slate-200/80 shadow-sm space-y-4">
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-serif">
                Trip Overview
              </h3>
              <div className="text-slate-600 text-xs sm:text-sm md:text-base leading-relaxed whitespace-pre-line">
                {pkg.fullDescription || pkg.shortDescription || 'Experience the beauty of Ladakh with our curated itinerary.'}
              </div>
            </div>

            {/* DAY-WISE ITINERARY TIMELINE (Supports 8 & 10 days cleanly) */}
            <div className="bg-white rounded-2xl p-4 sm:p-6 md:p-8 border border-slate-200/80 shadow-sm overflow-hidden">
              <ItineraryTimeline itinerary={pkg.itinerary} />
            </div>

            {/* INCLUSIONS & EXCLUSIONS - Only rendered if at least one exists */}
            {(hasInclusions || hasExclusions) && (
              <div className="bg-white rounded-2xl p-4 sm:p-6 md:p-8 border border-slate-200/80 shadow-sm space-y-6 sm:space-y-8">
                {hasInclusions && (
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-serif mb-3 sm:mb-4 flex items-center">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 mr-2 flex-shrink-0"></span>
                      What's Included
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                      {pkg.inclusions.map((inc, i) => (
                        <div key={i} className="flex items-start space-x-2.5 text-xs sm:text-sm text-slate-700 bg-emerald-50/50 p-2.5 rounded-xl border border-emerald-100">
                          <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" /> 
                          <span>{inc}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {hasExclusions && (
                  <div className={hasInclusions ? 'pt-4 sm:pt-6 border-t border-slate-100' : ''}>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-serif mb-3 sm:mb-4 flex items-center">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500 mr-2 flex-shrink-0"></span>
                      What's Excluded
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                      {pkg.exclusions.map((exc, i) => (
                        <div key={i} className="flex items-start space-x-2.5 text-xs sm:text-sm text-slate-700 bg-rose-50/50 p-2.5 rounded-xl border border-rose-100">
                          <X className="w-4 h-4 text-rose-500 flex-shrink-0 mt-0.5" /> 
                          <span>{exc}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

          </div>

          {/* Right Column: Sticky Booking Widget */}
          <div className="lg:col-span-4 relative lg:sticky top-auto lg:top-24 w-full">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden p-5 sm:p-7 space-y-5 sm:space-y-6">
              
              <div>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
                  Starting Price Per Person
                </span>
                <div className="flex items-baseline space-x-2 mt-1">
                  <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-serif">
                    {formattedPrice}
                  </span>
                  <span className="text-xs text-slate-500">/ adult</span>
                </div>
              </div>

              {/* Guests Count Selector */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  Travelers / Guests
                </label>
                <div className="flex items-center justify-between border border-slate-200 rounded-xl p-2 bg-slate-50">
                  <span className="text-sm font-semibold text-slate-800 ml-2">
                    {guestsCount} {guestsCount === 1 ? 'Adult' : 'Adults'}
                  </span>
                  <div className="flex items-center space-x-2">
                    <button 
                      type="button" 
                      onClick={() => setGuestsCount(Math.max(1, guestsCount - 1))} 
                      className="w-8 h-8 rounded-lg bg-white border border-slate-300 font-bold hover:bg-slate-100 transition-colors flex items-center justify-center cursor-pointer"
                    >
                      -
                    </button>
                    <button 
                      type="button" 
                      onClick={() => setGuestsCount(guestsCount + 1)} 
                      className="w-8 h-8 rounded-lg bg-white border border-slate-300 font-bold hover:bg-slate-100 transition-colors flex items-center justify-center cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Estimated Total Calculation */}
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200/80 flex items-center justify-between text-xs">
                <span className="text-amber-900 font-medium">Estimated Total ({guestsCount} {guestsCount === 1 ? 'Adult' : 'Adults'}):</span>
                <strong className="text-amber-900 font-bold text-sm sm:text-base">{formattedTotalPrice}</strong>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-2">
                <button 
                  type="button" 
                  onClick={handleBookNow} 
                  className="w-full py-3.5 px-4 rounded-xl bg-slate-900 hover:bg-amber-600 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <Calendar className="w-4 h-4 mr-1 flex-shrink-0" /> 
                  <span>Book Expedition</span>
                </button>

                <a 
                  href={waUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <Phone className="w-4 h-4 mr-1 flex-shrink-0" /> 
                  <span>Book on WhatsApp</span>
                </a>
              </div>

              <div className="text-[11px] text-slate-400 text-center pt-1">
                ⚡ Instant confirmation & 100% transparent high-altitude pricing.
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
