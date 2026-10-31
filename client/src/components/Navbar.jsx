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
      {/* Top mini advisory bar */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4 border-b border-slate-800 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <span className="flex items-center text-amber-400">
              <ShieldCheck className="w-3.5 h-3.5 mr-1" />
              100% Local Ladakh Certified Guides & Drivers
            </span>
            <span className="flex items-center">
              <MapPin className="w-3.5 h-3.5 mr-1 text-slate-400" />
              Basecamp: Main Bazaar, Leh 194101, Ladakh
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-slate-400">24x7 Helpline:</span>
            <a href="tel:+919876543210" className="text-white font-medium hover:text-amber-400 transition-colors">
              +91 9622971598
            </a>
            <span className="text-slate-600">|</span>
            <a 
              href="https://wa.me/9622971598?text=Hi%20Aryavarta%20Travel!%20I%20am%20inquiring%20about%20a%20Ladakh%20expedition." 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-emerald-400 hover:text-emerald-300 flex items-center font-medium"
            >
              <MessageCircle className="w-3.5 h-3.5 mr-1" /> WhatsApp Us
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-slate-900/95 backdrop-blur-md shadow-lg shadow-black/10 py-3' 
          : 'bg-slate-900/80 backdrop-blur-sm py-4'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="h-11 sm:h-12 w-auto p-0.5 bg-white rounded-xl shadow-md border border-white/20 flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform duration-300">
                <img
                  src="/logo.png"
                  alt="Aryavarta Travel"
                  className="h-10 sm:h-11 w-auto object-contain rounded-lg"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-bold tracking-tight text-white font-serif leading-none">
                  Aryavarta <span className="text-amber-400">Tour</span>
                </span>
                <span className="text-[10px] tracking-widest uppercase font-semibold text-slate-400 mt-1">
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
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive(link.path)
                      ? 'text-amber-400 bg-white/10 font-semibold'
                      : 'text-slate-200 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* CTA Button */}
            <div className="hidden sm:flex items-center space-x-3">
              <Link
                to="/booking"
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 shadow-md shadow-amber-500/20 hover:shadow-amber-500/35 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <Calendar className="w-4 h-4 mr-1.5" />
                Book Now
              </Link>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex lg:hidden">
              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 focus:outline-none"
                aria-label="Toggle menu"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isOpen && (
          <div className="lg:hidden bg-slate-900/98 border-t border-slate-800 px-4 pt-3 pb-6 space-y-2 animate-fadeIn shadow-2xl">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`block px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                  isActive(link.path)
                    ? 'text-amber-400 bg-white/10 font-semibold'
                    : 'text-slate-200 hover:bg-white/5'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-3 border-t border-slate-800 flex flex-col space-y-2">
              <Link
                to="/booking"
                className="w-full text-center py-3 rounded-xl text-slate-950 bg-amber-400 font-semibold text-sm shadow-md hover:bg-amber-300 transition-colors"
              >
                Book Now
              </Link>
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm flex items-center justify-center space-x-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat with Local Expert on WhatsApp</span>
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
