import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Compass, MapPin, Calendar, ShieldCheck, HeartHandshake, Sparkles, 
  ArrowRight, PhoneCall, Star, Clock, Mountain, ChevronRight,
  ChevronDown, Info, CheckCircle2, Users, Award
} from 'lucide-react';
// MOCK_PACKAGES hata diya hai, baaki abhi ke liye rahenge
import { MOCK_DESTINATIONS, MOCK_TESTIMONIALS, MOCK_FAQS } from '../data/packages';
import PackageCard from '../components/PackageCard';
import api from '../api/axios'; // Backend connect karne ke liye

export default function Home() {
  const [openFaq, setOpenFaq] = useState(null);
  
  // Backend data ke liye states
  const [featuredPackages, setFeaturedPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  // Backend se packages fetch karo
  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const response = await api.get('/packages');
        // Home page pe hum sirf pehle 4 packages dikhayenge
        setFeaturedPackages(response.data.slice(0, 4));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching featured packages:", error);
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="relative overflow-hidden">
      {/* HERO SECTION */}
      <section className="relative min-h-[92vh] flex items-center justify-center bg-slate-950 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center scale-105 transition-transform duration-1000 ease-out"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?auto=format&fit=crop&w=2000&q=85')` }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-900/40"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-transparent to-slate-950/70"></div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-24 pb-20">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md border border-white/20 text-amber-300 text-xs sm:text-sm font-semibold px-4 py-1.5 rounded-full mb-6 shadow-xl animate-fadeIn">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Curated Expeditions in The Land of High Passes</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight leading-[1.1] mb-6 font-serif">
            Discover The Untamed Magic Of <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-200">Ladakh</span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-200 max-w-3xl mx-auto font-light leading-relaxed mb-10 drop-shadow-md">
            Journey beyond the ordinary. Experience Pangong’s sapphire waters, traverse ancient silk route valleys, and touch the sky on world-record mountain passes with authentic Ladakhi hosts.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
            <a href="#featured-packages" className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-xl text-base font-bold text-slate-950 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 hover:from-amber-300 hover:to-amber-400 shadow-xl shadow-amber-500/25 hover:shadow-amber-500/40 transition-all transform hover:-translate-y-1">
              <span>Explore Packages</span>
              <ArrowRight className="w-5 h-5 ml-2" />
            </a>
            <Link to="/enquiry" className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-xl text-base font-semibold text-white bg-slate-900/80 hover:bg-slate-900 border border-white/30 backdrop-blur-md shadow-xl transition-all hover:border-amber-400">
              Custom Itinerary
            </Link>
          </div>

          <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto text-left">
            <div className="glass-panel-dark p-3.5 rounded-xl flex items-center space-x-3 text-slate-200">
              <ShieldCheck className="w-6 h-6 text-emerald-400 flex-shrink-0" />
              <div>
                <div className="text-xs font-bold text-white">All Permits Handled</div>
                <div className="text-[11px] text-slate-400">Zero DC office hassles</div>
              </div>
            </div>
            <div className="glass-panel-dark p-3.5 rounded-xl flex items-center space-x-3 text-slate-200">
              <Award className="w-6 h-6 text-amber-400 flex-shrink-0" />
              <div>
                <div className="text-xs font-bold text-white">100% Local Guides</div>
                <div className="text-[11px] text-slate-400">Native Himalayan experts</div>
              </div>
            </div>
            <div className="glass-panel-dark p-3.5 rounded-xl flex items-center space-x-3 text-slate-200">
              <Mountain className="w-6 h-6 text-sky-400 flex-shrink-0" />
              <div>
                <div className="text-xs font-bold text-white">Oxygen in Vehicles</div>
                <div className="text-[11px] text-slate-400">Comprehensive safety</div>
              </div>
            </div>
            <div className="glass-panel-dark p-3.5 rounded-xl flex items-center space-x-3 text-slate-200">
              <Star className="w-6 h-6 text-yellow-400 fill-yellow-400 flex-shrink-0" />
              <div>
                <div className="text-xs font-bold text-white">4.9/5 Rating</div>
                <div className="text-[11px] text-slate-400">Over 1,200+ travelers</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED PACKAGES SECTION (UPDATED) */}
      <section id="featured-packages" className="py-20 bg-slate-50 relative scroll-mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-amber-600 mb-2">
                <Compass className="w-4 h-4" />
                <span>Handpicked Itineraries</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-serif">
                Featured Ladakh Packages
              </h2>
              <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-2xl">
                Carefully crafted with mandatory acclimatization days, certified mountain drivers, and guaranteed hotel comfort.
              </p>
            </div>

            <div className="mt-4 md:mt-0">
              <Link to="/packages" className="inline-flex items-center text-sm font-bold text-slate-900 hover:text-amber-600 transition-colors group">
                <span>View All Packages</span>
                <ArrowRight className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Cards Grid */}
          {loading ? (
            <div className="text-center py-20">
              <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-slate-500 font-medium">Loading Expeditions...</p>
            </div>
          ) : featuredPackages.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {featuredPackages.map((pkg) => (
                <PackageCard key={pkg._id} pkg={pkg} />
              ))}
            </div>
          ) : (
            <div className="text-center py-10 bg-white rounded-xl border border-slate-200">
              <p className="text-slate-500">No packages available right now. Please check back later.</p>
            </div>
          )}
        </div>
      </section>

      {/* POPULAR DESTINATIONS SECTION */}
      <section className="py-20 bg-white border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-amber-600 mb-2">
              <MapPin className="w-4 h-4" />
              <span>Explore The High Realm</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-serif">
              Iconic Ladakh Destinations
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2">
              From mirror-like saline lakes to centuries-old cliffside gompas and soaring high passes.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
            {MOCK_DESTINATIONS.map((dest) => (
              <div key={dest.id} className="group relative bg-slate-50 rounded-2xl p-3 border border-slate-200/80 hover:border-amber-400 hover:shadow-xl transition-all text-center flex flex-col items-center">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden mb-3 border-2 border-amber-400/50 shadow-md group-hover:scale-105 transition-transform duration-300">
                  <img src={dest.image} alt={dest.name} className="w-full h-full object-cover" loading="lazy" />
                </div>
                <h3 className="font-bold text-slate-900 text-sm group-hover:text-amber-600 transition-colors">{dest.name}</h3>
                <span className="text-[11px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full mt-1">{dest.altitude}</span>
                <p className="text-[11px] text-slate-500 mt-2 line-clamp-2">{dest.tagline}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-amber-400 text-xs font-bold uppercase tracking-widest mb-2 block">The Aryavarta Advantage</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-serif">Why Discerning Travelers Choose Us</h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2">High-altitude travel in the trans-Himalayas requires impeccable safety, local relationships, and deep geographical expertise.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-7 hover:border-amber-400/60 transition-colors shadow-lg">
              <div className="w-14 h-14 rounded-2xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 mb-6"><Users className="w-7 h-7" /></div>
              <h3 className="text-xl font-bold text-white mb-2">100% Native Ladakh Team</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Born and raised in the valleys of Leh, Nubra, and Kargil. Our drivers and expedition leads understand every twist of the passes, changing weather patterns, and local monastery customs.</p>
              <ul className="mt-4 space-y-2 text-xs text-slate-300">
                <li className="flex items-center"><CheckCircle2 className="w-4 h-4 text-emerald-400 mr-2" /> Seasoned high-altitude drivers</li>
                <li className="flex items-center"><CheckCircle2 className="w-4 h-4 text-emerald-400 mr-2" /> Fluent in Ladakhi, Hindi, and English</li>
              </ul>
            </div>
            <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-7 hover:border-amber-400/60 transition-colors shadow-lg">
              <div className="w-14 h-14 rounded-2xl bg-emerald-400/10 border border-emerald-400/30 flex items-center justify-center text-emerald-400 mb-6"><ShieldCheck className="w-7 h-7" /></div>
              <h3 className="text-xl font-bold text-white mb-2">All Permits & Clearances Handled</h3>
              <p className="text-slate-400 text-sm leading-relaxed">No waiting in long queues at the Leh DC Office. We procure your official Inner Line Permits (ILP), Protected Area Clearances, and Ladakh Ecology passes before your arrival.</p>
              <ul className="mt-4 space-y-2 text-xs text-slate-300">
                <li className="flex items-center"><CheckCircle2 className="w-4 h-4 text-emerald-400 mr-2" /> Pre-issued printed permit sets in cab</li>
                <li className="flex items-center"><CheckCircle2 className="w-4 h-4 text-emerald-400 mr-2" /> Includes Pangong, Nubra, Turtuk, Tso Moriri</li>
              </ul>
            </div>
            <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-7 hover:border-amber-400/60 transition-colors shadow-lg">
              <div className="w-14 h-14 rounded-2xl bg-sky-400/10 border border-sky-400/30 flex items-center justify-center text-sky-400 mb-6"><PhoneCall className="w-7 h-7" /></div>
              <h3 className="text-xl font-bold text-white mb-2">24x7 Safety & Oxygen Support</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Your health is our first priority. Every Aryavarta vehicle is outfitted with a portable medical oxygen cylinder, pulse oximeter, and emergency first aid supplies with quick basecamp access.</p>
              <ul className="mt-4 space-y-2 text-xs text-slate-300">
                <li className="flex items-center"><CheckCircle2 className="w-4 h-4 text-emerald-400 mr-2" /> Daily SpO2 level monitoring</li>
                <li className="flex items-center"><CheckCircle2 className="w-4 h-4 text-emerald-400 mr-2" /> Direct tie-up with SNM Hospital Leh</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ALTITUDE BANNER */}
      <section className="py-12 bg-amber-500/10 border-b border-amber-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-amber-200 shadow-md flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-amber-500/10 rounded-xl text-amber-600 flex-shrink-0 mt-1"><Info className="w-8 h-8" /></div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-100 px-2.5 py-0.5 rounded-full">Mandatory Medical Protocol</span>
                <h3 className="text-xl font-bold text-slate-900 mt-1">The 24-Hour Acclimatization Golden Rule</h3>
                <p className="text-slate-600 text-sm mt-1 leading-relaxed max-w-3xl">Leh sits at 11,500 feet (3,500m) above sea level. Per medical safety guidelines, travelers flying directly into Leh must rest completely for the first 24 to 48 hours without exertion. All our itineraries are carefully designed with this medical requirement built-in.</p>
              </div>
            </div>
            <div className="flex-shrink-0">
              <Link to="/policies" className="inline-flex items-center px-5 py-2.5 rounded-xl text-xs font-bold text-amber-900 bg-amber-100 hover:bg-amber-200 transition-colors">
                Read Altitude Guidelines <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-amber-600 text-xs font-bold uppercase tracking-widest mb-2 block">Traveler Stories</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-serif">Loved by Explorers Worldwide</h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2">Read how fellow travelers experienced the trans-Himalayas with our dedicated team.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {MOCK_TESTIMONIALS.map((t) => (
              <div key={t.id} className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/90 shadow-md flex flex-col justify-between">
                <div>
                  <div className="flex items-center space-x-1 text-amber-400 mb-4">
                    {[...Array(t.rating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400" />)}
                  </div>
                  <p className="text-slate-700 text-sm leading-relaxed italic">"{t.comment}"</p>
                </div>
                <div className="mt-6 pt-5 border-t border-slate-100 flex items-center space-x-3">
                  <img src={t.avatar} alt={t.name} className="w-11 h-11 rounded-full object-cover border border-amber-400/40" />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{t.name}</h4>
                    <p className="text-[11px] text-slate-500">{t.location} • {t.trip}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQS */}
      <section className="py-20 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-amber-600 text-xs font-bold uppercase tracking-widest mb-2 block">Got Questions?</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-serif">Ladakh Travel FAQs</h2>
          </div>
          <div className="space-y-4">
            {MOCK_FAQS.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div key={index} className="border border-slate-200 rounded-2xl overflow-hidden transition-all">
                  <button type="button" onClick={() => toggleFaq(index)} className="w-full text-left p-5 flex items-center justify-between bg-slate-50 hover:bg-slate-100/80 transition-colors">
                    <span className="font-bold text-slate-900 text-base sm:text-lg pr-4">{faq.q}</span>
                    <ChevronDown className={`w-5 h-5 text-slate-500 transition-transform ${isOpen ? 'rotate-180 text-amber-600' : ''}`} />
                  </button>
                  {isOpen && <div className="p-5 pt-3 text-slate-600 text-sm leading-relaxed bg-white border-t border-slate-100">{faq.a}</div>}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="py-20 bg-gradient-to-tr from-slate-950 via-slate-900 to-indigo-950 text-white relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl sm:text-5xl font-extrabold font-serif tracking-tight text-white mb-6">Ready to Touch The Himalayan Skies?</h2>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto mb-10">Tell us your travel dates and group preferences. Our local team in Leh will craft a personalized itinerary within 3 hours.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/booking" className="w-full sm:w-auto px-8 py-4 rounded-xl text-base font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 shadow-xl shadow-amber-500/25 transition-all">Start Planning Trip</Link>
            <a href="https://wa.me/919876543210?text=Hi%20Aryavarta%20Travel!%20I%20am%20ready%20to%20plan%20my%20Ladakh%20trip." target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto px-8 py-4 rounded-xl text-base font-semibold text-white bg-emerald-600 hover:bg-emerald-500 shadow-xl transition-all flex items-center justify-center space-x-2">
              <span>Instant WhatsApp Query</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}