import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Mountain, 
  Calendar, 
  Compass, 
  Clock, 
  MapPin, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  AlertTriangle, 
  Sparkles, 
  Navigation, 
  Camera, 
  Info, 
  PhoneCall,
  Flame,
  Snowflake,
  Share2,
  Check
} from 'lucide-react';
import { circuitsData, circuitsList } from '../data/circuitsData';

export default function CircuitDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState('');
  const [copied, setCopied] = useState(false);

  // Retrieve circuit data by slug/id
  const circuit = id ? circuitsData[id.toLowerCase()] : null;

  useEffect(() => {
    if (circuit?.heroImage) {
      setSelectedImage(circuit.heroImage);
    }
    // Scroll to top on id change
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id, circuit]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${circuit?.title} - Aryavarta Travel`,
        text: circuit?.description,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Helper for difficulty badge styling
  const getDifficultyBadge = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'moderate':
        return {
          bg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
          dot: 'bg-emerald-400',
          icon: Compass
        };
      case 'challenging':
        return {
          bg: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
          dot: 'bg-amber-400',
          icon: Mountain
        };
      case 'advanced':
        return {
          bg: 'bg-orange-500/20 text-orange-300 border-orange-500/40',
          dot: 'bg-orange-400',
          icon: Flame
        };
      case 'extreme':
        return {
          bg: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
          dot: 'bg-rose-400',
          icon: Snowflake
        };
      default:
        return {
          bg: 'bg-slate-500/20 text-slate-300 border-slate-500/40',
          dot: 'bg-slate-400',
          icon: Mountain
        };
    }
  };

  // Not found fallback
  if (!circuit) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center px-4 py-16 bg-slate-900 text-white">
        <div className="max-w-lg text-center space-y-6">
          <div className="w-20 h-20 mx-auto rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Mountain className="w-10 h-10" />
          </div>
          <h1 className="text-3xl font-bold font-serif text-white">Circuit Not Found</h1>
          <p className="text-slate-400 text-sm leading-relaxed">
            We couldn't locate the Himalayan circuit <code className="text-amber-400 bg-slate-800 px-2 py-0.5 rounded font-mono">"{id}"</code>. 
            It may have been relocated or is under seasonal maintenance.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/packages"
              className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-sm transition-all shadow-lg shadow-amber-500/20 inline-flex items-center justify-center"
            >
              Browse All Packages
            </Link>
            <Link
              to="/"
              className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm transition-all border border-slate-700 inline-flex items-center justify-center"
            >
              Return Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const diffStyle = getDifficultyBadge(circuit.difficulty);
  const DiffIcon = diffStyle.icon;
  const otherCircuits = circuitsList.filter((c) => c.id !== circuit.id);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-amber-500 selection:text-slate-950">
      
      {/* Top Breadcrumb Navigation */}
      <div className="bg-slate-900/80 border-b border-slate-800 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center space-x-2 overflow-x-auto whitespace-nowrap scrollbar-none py-1">
            <Link to="/" className="hover:text-amber-400 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-slate-400">Iconic Circuits</span>
            <span>/</span>
            <span className="text-amber-400 font-medium truncate max-w-[200px] sm:max-w-none">
              {circuit.title}
            </span>
          </div>

          <div className="flex items-center space-x-3 shrink-0 ml-4">
            <button
              onClick={handleShare}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors border border-slate-700/60"
              title="Share this circuit"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copied ? 'Link Copied!' : 'Share'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Hero Banner Section */}
      <section className="relative overflow-hidden min-h-[520px] lg:min-h-[580px] flex items-end">
        {/* Hero Background Image with Multi-layer Gradients */}
        <div className="absolute inset-0 z-0">
          <img
            src={selectedImage || circuit.heroImage}
            alt={circuit.title}
            className="w-full h-full object-cover object-center transition-all duration-700 filter brightness-90 transform scale-[1.02]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/40 to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 w-full">
          <div className="max-w-3xl space-y-4">
            {/* Badges strip */}
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30 backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 mr-1.5 text-amber-400" />
                Iconic Ladakh Circuit
              </span>

              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border backdrop-blur-md ${diffStyle.bg}`}>
                <DiffIcon className="w-3.5 h-3.5 mr-1.5" />
                Difficulty: {circuit.difficulty}
              </span>

              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/20 text-sky-300 border border-sky-500/30 backdrop-blur-md">
                <Calendar className="w-3.5 h-3.5 mr-1.5 text-sky-400" />
                Best Season: {circuit.bestTime}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-serif text-white tracking-tight leading-tight drop-shadow-md">
              {circuit.title}
            </h1>

            {/* Subtitle / Tagline */}
            <p className="text-base sm:text-lg text-slate-300 font-light leading-relaxed max-w-2xl drop-shadow">
              {circuit.tagline || circuit.description}
            </p>

            {/* Quick Hero CTA */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                to="/packages"
                className="inline-flex items-center px-6 py-3.5 rounded-xl font-semibold text-sm bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 transition-all shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>View Packages for this Route</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
              <Link
                to="/enquiry"
                className="inline-flex items-center px-5 py-3.5 rounded-xl font-semibold text-sm bg-slate-900/80 hover:bg-slate-800 text-white border border-slate-700/80 backdrop-blur-md transition-all hover:border-slate-600"
              >
                <Compass className="w-4 h-4 mr-2 text-amber-400" />
                Customize Custom Expedition
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stat Bar Card */}
      <section className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="bg-slate-900/90 border border-slate-800 backdrop-blur-xl rounded-2xl p-4 sm:p-6 shadow-2xl shadow-black/60 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-slate-800">
          
          <div className="flex items-center space-x-3.5 pt-2 sm:pt-0">
            <div className="w-11 h-11 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
              <Mountain className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-wider font-semibold text-slate-400">Max Altitude</p>
              <p className="text-sm sm:text-base font-bold text-white mt-0.5">{circuit.altitude || 'High Himalayan Pass'}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3.5 pt-2 sm:pt-0 sm:pl-6">
            <div className="w-11 h-11 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 shrink-0">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-wider font-semibold text-slate-400">Ideal Period</p>
              <p className="text-sm sm:text-base font-bold text-white mt-0.5">{circuit.bestTime}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3.5 pt-2 sm:pt-0 sm:pl-6">
            <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-wider font-semibold text-slate-400">Suggested Duration</p>
              <p className="text-sm sm:text-base font-bold text-white mt-0.5">{circuit.duration || '5 - 7 Days'}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3.5 pt-2 sm:pt-0 sm:pl-6">
            <div className={`w-11 h-11 rounded-xl border flex items-center justify-center shrink-0 ${diffStyle.bg}`}>
              <DiffIcon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-wider font-semibold text-slate-400">Terrain Rating</p>
              <p className="text-sm sm:text-base font-bold text-white mt-0.5">{circuit.difficulty}</p>
            </div>
          </div>

        </div>
      </section>

      {/* Main Content Area */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* Left Column: Comprehensive Circuit Details (2 Cols on lg) */}
          <div className="lg:col-span-2 space-y-12">

            {/* Overview / Narrative */}
            <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 sm:p-8 space-y-4">
              <div className="flex items-center space-x-2 text-amber-400 text-xs font-semibold uppercase tracking-wider">
                <Compass className="w-4 h-4" />
                <span>The Journey</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-serif text-white">
                Circuit Overview
              </h2>
              <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                {circuit.overview || circuit.description}
              </p>
              {circuit.distance && (
                <div className="pt-2 flex items-center text-xs text-slate-400">
                  <Navigation className="w-4 h-4 mr-2 text-amber-400" />
                  <span>Estimated Total Circuit Distance: <strong className="text-slate-200">{circuit.distance}</strong></span>
                </div>
              )}
            </div>

            {/* Highlights List */}
            <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-2 text-amber-400 text-xs font-semibold uppercase tracking-wider">
                    <Sparkles className="w-4 h-4" />
                    <span>Top Experiences</span>
                  </div>
                  <h2 className="text-2xl font-bold font-serif text-white mt-1">
                    Route Highlights
                  </h2>
                </div>
                <span className="text-xs bg-slate-800 text-amber-400 px-3 py-1 rounded-full border border-slate-700 font-medium">
                  {circuit.highlights?.length || 0} Key Sights
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {circuit.highlights?.map((highlight, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-3 p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-amber-500/40 transition-colors group"
                  >
                    <div className="w-6 h-6 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0 mt-0.5 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-medium text-slate-200 group-hover:text-white transition-colors">
                      {highlight}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Circuit Trail / Route Sequence */}
            {circuit.route && (
              <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 sm:p-8 space-y-6">
                <div className="flex items-center space-x-2 text-amber-400 text-xs font-semibold uppercase tracking-wider">
                  <Navigation className="w-4 h-4" />
                  <span>Trail Mapping</span>
                </div>
                <h2 className="text-2xl font-bold font-serif text-white">
                  Expedition Route Sequence
                </h2>
                
                {/* Visual Route Nodes */}
                <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-2.5 sm:before:left-3.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-gradient-to-b before:from-amber-400 before:via-sky-400 before:to-emerald-400">
                  {circuit.route.split('→').map((stop, i) => (
                    <div key={i} className="relative group">
                      <div className="absolute -left-[23px] sm:-left-[27px] top-1.5 w-4 h-4 rounded-full bg-slate-950 border-2 border-amber-400 group-hover:scale-125 transition-transform" />
                      <div className="bg-slate-950/80 border border-slate-800/80 rounded-xl p-3.5 hover:border-slate-700 transition-colors">
                        <div className="flex items-center justify-between">
                          <span className="text-xs uppercase tracking-wider text-amber-400 font-semibold">
                            Waypoint 0{i + 1}
                          </span>
                        </div>
                        <p className="text-sm font-semibold text-slate-100 mt-0.5">
                          {stop.trim()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Key Landmarks / Attractions Cards */}
            {circuit.keyAttractions && circuit.keyAttractions.length > 0 && (
              <div className="space-y-6">
                <div>
                  <div className="flex items-center space-x-2 text-amber-400 text-xs font-semibold uppercase tracking-wider">
                    <MapPin className="w-4 h-4" />
                    <span>Must-Visit Landmarks</span>
                  </div>
                  <h2 className="text-2xl font-bold font-serif text-white mt-1">
                    Key Attractions on this Circuit
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {circuit.keyAttractions.map((attraction, idx) => (
                    <div
                      key={idx}
                      className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 hover:border-amber-500/40 transition-all flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-base text-white font-serif">
                            {attraction.name}
                          </h3>
                          {attraction.altitude && (
                            <span className="text-[11px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-mono border border-slate-700">
                              {attraction.altitude}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-400 leading-relaxed">
                          {attraction.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Photo Gallery Grid */}
            {circuit.gallery && circuit.gallery.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center space-x-2 text-amber-400 text-xs font-semibold uppercase tracking-wider">
                      <Camera className="w-4 h-4" />
                      <span>Visual Dispatch</span>
                    </div>
                    <h2 className="text-2xl font-bold font-serif text-white mt-1">
                      Route Photo Gallery
                    </h2>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {circuit.gallery.map((imgUrl, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setSelectedImage(imgUrl)}
                      className={`relative rounded-xl overflow-hidden aspect-video border-2 transition-all ${
                        selectedImage === imgUrl
                          ? 'border-amber-400 ring-2 ring-amber-400/40 scale-[1.02]'
                          : 'border-slate-800 hover:border-slate-600 opacity-80 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={imgUrl}
                        alt={`${circuit.title} thumbnail ${i + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Travel Advice & Tips */}
            {circuit.travelTips && (
              <div className="bg-slate-900/40 border border-amber-500/30 rounded-2xl p-6 sm:p-8 space-y-4">
                <div className="flex items-center space-x-2 text-amber-400">
                  <AlertTriangle className="w-5 h-5 shrink-0" />
                  <h3 className="text-base font-semibold text-white">
                    High-Altitude Expedition Advice
                  </h3>
                </div>
                <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300">
                  {circuit.travelTips.map((tip, idx) => (
                    <li key={idx} className="flex items-start space-x-2.5">
                      <span className="text-amber-400 font-bold mt-0.5">•</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

          </div>

          {/* Right Column: Sticky Booking & Route Booking Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 space-y-6">
              
              {/* Main CTA Card */}
              <div className="bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-6 sm:p-7 shadow-xl shadow-black/80 space-y-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

                <div className="space-y-2">
                  <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-400 text-[11px] font-semibold border border-amber-500/20">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Handcrafted By Local Experts</span>
                  </div>
                  <h3 className="text-xl font-bold font-serif text-white">
                    Experience This Circuit
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Our all-inclusive Ladakh packages feature certified local drivers, medical oxygen, permits, handpicked hotels, and 24x7 basecamp coordination.
                  </p>
                </div>

                {/* Primary CTA Button required by prompt */}
                <div className="space-y-3 pt-2">
                  <Link
                    to="/packages"
                    className="w-full flex items-center justify-center px-6 py-4 rounded-xl font-bold text-sm bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 transition-all shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 transform hover:-translate-y-0.5 active:translate-y-0 text-center"
                  >
                    <span>View Packages for this Route</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>

                  <a
                    href="https://wa.me/919622971598?text=Hi%20Aryavarta%20Travel!%20I%20am%20interested%20in%20planning%20the%20circuit:%20"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center px-6 py-3 rounded-xl font-semibold text-xs bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 transition-colors"
                  >
                    <PhoneCall className="w-3.5 h-3.5 mr-2" />
                    <span>Direct WhatsApp Inquiry</span>
                  </a>
                </div>

                {/* Trust Badges */}
                <div className="border-t border-slate-800 pt-5 space-y-3">
                  <div className="flex items-center text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 mr-2.5 shrink-0" />
                    <span>100% Certified Born-in-Leh Guides</span>
                  </div>
                  <div className="flex items-center text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 mr-2.5 shrink-0" />
                    <span>Portable Medical Oxygen Cylinder in Vehicle</span>
                  </div>
                  <div className="flex items-center text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 mr-2.5 shrink-0" />
                    <span>Hassle-Free Inner Line Permits Included</span>
                  </div>
                  <div className="flex items-center text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 mr-2.5 shrink-0" />
                    <span>ALTOA Registered Mountain Operator</span>
                  </div>
                </div>

              </div>

              {/* Need Advice Mini Card */}
              <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-5 text-center space-y-3">
                <Info className="w-5 h-5 text-sky-400 mx-auto" />
                <h4 className="text-sm font-semibold text-white">Have questions on altitude or fitness?</h4>
                <p className="text-xs text-slate-400">
                  Our route captains can customize the itinerary pacing to match your comfort and travel dates.
                </p>
                <Link
                  to="/enquiry"
                  className="inline-block text-xs font-semibold text-amber-400 hover:text-amber-300 underline underline-offset-4"
                >
                  Request a Free Custom Route Consultation →
                </Link>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* Explore Other Iconic Circuits Carousel / Grid */}
      <section className="bg-slate-900/60 border-t border-slate-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-amber-400 text-xs font-semibold uppercase tracking-wider">
                Discover More of Ladakh
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold font-serif text-white mt-1">
                Other Iconic Circuits
              </h2>
            </div>
            <Link
              to="/packages"
              className="inline-flex items-center text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors"
            >
              <span>View All Ladakh Tours</span>
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {otherCircuits.map((other) => {
              const otherDiff = getDifficultyBadge(other.difficulty);
              const OtherIcon = otherDiff.icon;
              return (
                <Link
                  key={other.id}
                  to={`/circuits/${other.id}`}
                  className="group bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden hover:border-amber-500/50 transition-all flex flex-col hover:-translate-y-1"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={other.heroImage}
                      alt={other.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
                    <div className="absolute top-2.5 right-2.5">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold border backdrop-blur-md ${otherDiff.bg}`}>
                        <OtherIcon className="w-3 h-3 mr-1" />
                        {other.difficulty}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <h3 className="font-serif font-bold text-base text-white group-hover:text-amber-400 transition-colors">
                        {other.title}
                      </h3>
                      <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                        {other.tagline || other.description}
                      </p>
                    </div>

                    <div className="border-t border-slate-900 pt-3 flex items-center justify-between text-xs text-slate-400">
                      <span className="flex items-center">
                        <Calendar className="w-3.5 h-3.5 mr-1 text-amber-400" />
                        {other.bestTime}
                      </span>
                      <span className="text-amber-400 font-semibold group-hover:translate-x-1 transition-transform inline-flex items-center">
                        Explore →
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

        </div>
      </section>

    </div>
  );
}
