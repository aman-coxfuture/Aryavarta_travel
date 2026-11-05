import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Compass, Phone, Menu, X, ShieldCheck, MapPin, Calendar, MessageCircle } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Tour Packages', path: '/packages' },
    { name: 'Custom Trip', path: '/enquiry' },
    { name: 'Travel Policies', path: '/policies' },
    { name: 'Contact & Booking', path: '/booking' },
  ];

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      {/* Top mini advisory bar (desktop only) */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4 border-b border-slate-800 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <span className="flex items-center text-amber-400">
              <ShieldCheck className="w-3.5 h-3.5 mr-1 flex-shrink-0" />
              100% Local Ladakh Certified Guides & Drivers
            </span>
            <span className="flex items-center">
              <MapPin className="w-3.5 h-3.5 mr-1 text-slate-400 flex-shrink-0" />
              Basecamp: Main Bazaar, Leh 194101, Ladakh
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-slate-400">24x7 Helpline:</span>
            <a href="tel:+919622971598" className="text-white font-medium hover:text-amber-400 transition-colors">
              +91 9622971598
            </a>
            <span className="text-slate-600">|</span>
            <a 
              href="https://wa.me/919622971598?text=Hi%20Aryavarta%20Travel!%20I%20am%20inquiring%20about%20a%20Ladakh%20expedition." 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-emerald-400 hover:text-emerald-300 flex items-center font-medium transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 mr-1 flex-shrink-0" /> WhatsApp Us
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-slate-900/95 backdrop-blur-md shadow-lg shadow-black/10 py-2.5 sm:py-3' 
          : 'bg-slate-900/85 backdrop-blur-sm py-3 sm:py-4'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2.5 sm:space-x-3 group min-w-0" onClick={() => setIsOpen(false)}>
              <div className="h-10 sm:h-12 w-auto p-0.5 bg-white rounded-xl shadow-md border border-white/20 flex items-center justify-center overflow-hidden flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
                <img
                  src="/logo.png"
                  alt="Aryavarta Travel"
                  className="h-9 sm:h-11 w-auto max-w-[110px] sm:max-w-[130px] object-contain rounded-lg flex-shrink-0"
                />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-lg sm:text-2xl font-bold tracking-tight text-white font-serif leading-none truncate">
                  Aryavarta <span className="text-amber-400">Tour</span>
                </span>
                <span className="text-[9px] sm:text-[10px] tracking-widest uppercase font-semibold text-slate-400 mt-1 truncate">
                  And Travel Ladakh
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive(link.path)
                      ? 'text-amber-400 bg-white/10 font-semibold'
                      : 'text-slate-200 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Desktop CTA Button */}
            <div className="hidden sm:flex items-center space-x-3">
              <Link
                to="/booking"
                className="inline-flex items-center justify-center px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 shadow-md shadow-amber-500/20 hover:shadow-amber-500/35 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <Calendar className="w-4 h-4 mr-1.5" />
                Book Now
              </Link>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex lg:hidden items-center space-x-2">
              <Link
                to="/booking"
                className="sm:hidden px-3 py-1.5 rounded-lg text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 shadow-sm transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Book
              </Link>
              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 focus:outline-none transition-colors"
                aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={isOpen}
              >
                {isOpen ? <X className="w-6 h-6 text-amber-400" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Backdrop Overlay */}
        {isOpen && (
          <div
            className="fixed inset-0 top-[60px] sm:top-[68px] bg-slate-950/70 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
        )}

        {/* Mobile Dropdown Menu */}
        {isOpen && (
          <div className="lg:hidden relative z-50 bg-slate-900/98 border-t border-slate-800 px-4 pt-4 pb-8 space-y-2 animate-fadeIn shadow-2xl max-h-[calc(100vh-70px)] overflow-y-auto">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-3 rounded-xl text-base font-semibold transition-colors ${
                  isActive(link.path)
                    ? 'text-amber-400 bg-white/10'
                    : 'text-slate-200 hover:bg-white/5 hover:text-white'
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            <div className="pt-4 border-t border-slate-800 flex flex-col space-y-2.5">
              <Link
                to="/booking"
                onClick={() => setIsOpen(false)}
                className="w-full text-center py-3.5 rounded-xl text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 font-bold text-sm shadow-md hover:from-amber-300 hover:to-amber-400 transition-colors flex items-center justify-center space-x-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Your Tour Now</span>
              </Link>
              <a
                href="https://wa.me/919622971598?text=Hi%20Aryavarta%20Travel!%20I%20want%20to%20plan%20a%20trip%20to%20Ladakh."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm flex items-center justify-center space-x-2 shadow-sm transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat with Local Expert on WhatsApp</span>
              </a>
              <a
                href="tel:+919622971598"
                className="w-full text-center py-2.5 rounded-xl text-slate-300 hover:text-white text-xs font-medium flex items-center justify-center space-x-1.5"
              >
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span>Call Us: +91 9622971598</span>
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
