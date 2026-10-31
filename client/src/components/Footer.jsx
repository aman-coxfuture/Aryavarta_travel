import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, MapPin, Phone, Mail, MessageCircle, ShieldCheck, Heart, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300 relative border-t border-slate-800">
      {/* Prayer flag decorative ribbon */}
      <div className="prayer-flag-strip"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-12">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="h-12 w-auto p-0.5 bg-white rounded-xl shadow-md border border-white/20 flex items-center justify-center overflow-hidden">
                <img
                  src="/logo.png"
                  alt="Aryavarta Travel"
                  className="h-11 w-auto object-contain rounded-lg"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold tracking-tight text-white font-serif leading-none">
                  Aryavarta <span className="text-amber-400">Tour</span>
                </span>
                <span className="text-[10px] tracking-widest uppercase font-semibold text-slate-400 mt-1">
                 And Travel Ladakh
                </span>
              </div>
            </Link>

            <p className="text-slate-400 text-sm leading-relaxed pr-6">
              Aryavarta Travel is Ladakh’s premier mountain tour operator, born in the heart of Leh. We specialize in bespoke high-altitude expeditions, family monastery trails, bike adventures, and the legendary Chadar Frozen River Trek with 100% certified local guides and on-ground safety back-up.
            </p>

            <div className="flex items-center space-x-3 pt-2">
              <div className="flex items-center text-xs bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-slate-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400 mr-2 flex-shrink-0" />
                <span>ALTOA Registered Ladakh Operator</span>
              </div>
              <div className="flex items-center text-xs bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-slate-300">
                <ShieldCheck className="w-4 h-4 text-amber-400 mr-2 flex-shrink-0" />
                <span>Govt. Dept. of Tourism Approved</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="hover:text-amber-400 transition-colors flex items-center">
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link to="/packages" className="hover:text-amber-400 transition-colors flex items-center">
                  <span>All Ladakh Packages</span>
                </Link>
              </li>
              <li>
                <Link to="/enquiry" className="hover:text-amber-400 transition-colors flex items-center">
                  <span>Tailor-Made Custom Trip</span>
                </Link>
              </li>
              <li>
                <Link to="/booking" className="hover:text-amber-400 transition-colors flex items-center">
                  <span>Book / Enquire Online</span>
                </Link>
              </li>
              <li>
                <Link to="/policies" className="hover:text-amber-400 transition-colors flex items-center">
                  <span>Cancellation & Permit Terms</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Top Ladakh Circuits */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
              Iconic Circuits
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <Link to="/circuits/pangong-nubra" className="hover:text-amber-400 transition-colors">
                  Pangong Tso & Nubra Valley
                </Link>
              </li>
              <li>
                <Link to="/circuits/zanskar-shinku" className="hover:text-amber-400 transition-colors">
                  Zanskar & Shinku La Pass
                </Link>
              </li>
              <li>
                <Link to="/circuits/tso-moriri" className="hover:text-amber-400 transition-colors">
                  Tso Moriri & Nomad Plateau
                </Link>
              </li>
              <li>
                <Link to="/circuits/royal-enfield" className="hover:text-amber-400 transition-colors">
                  Royal Enfield Bike Tour
                </Link>
              </li>
              <li>
                <Link to="/circuits/chadar-trek" className="hover:text-amber-400 transition-colors">
                  Chadar Frozen River Trek
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Basecamp Info */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
              Basecamp Contact
            </h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-start">
                <MapPin className="w-4 h-4 text-amber-400 mr-2.5 mt-1 flex-shrink-0" />
                <span>Office address:- Skalzangling opposite Head post office ( near Singay Namgail chowk )
PIN code 194101 
UT Ladakh !</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-4 h-4 text-amber-400 mr-2.5 flex-shrink-0" />
                <a href="tel:+919876543210" className="hover:text-white transition-colors">
                  +91 9622971598
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="w-4 h-4 text-amber-400 mr-2.5 flex-shrink-0" />
                <a href="mailto:info@aryavartatravel.com" className="hover:text-white transition-colors">
                  Stanzinnamgail7@gmail.com
                </a>
              </li>
              <li className="pt-2">
                <a
                  href="https://wa.me/919876543210?text=Hi%20Aryavarta%20Travel!%20I%20want%20to%20plan%20a%20trip%20to%20Ladakh."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-3.5 py-2 rounded-lg bg-emerald-600/20 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-600/30 text-xs font-semibold transition-colors"
                >
                  <MessageCircle className="w-4 h-4 mr-2 text-emerald-400" />
                  Instant WhatsApp Booking
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom line */}
        
<div className="border-t border-slate-800/80 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">

  <div className="text-center sm:text-left">
    <p>
      © {new Date().getFullYear()} Aryavarta Travel Pvt. Ltd. All rights reserved.
    </p>

    <p className="mt-2">
      Designed & Developed by{" "}
      <span className="font-semibold text-slate-300">
        CoxFuture Technology
      </span>
    </p>
  </div>

  <p className="mt-3 sm:mt-0 flex items-center">
    Handcrafted with
    <Heart className="w-3.5 h-3.5 text-red-500 mx-1 fill-red-500" />
    in Ladakh, Himalayas
  </p>

</div>

      </div>
    </footer>
  );
}
